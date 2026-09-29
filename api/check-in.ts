const MAX_BODY_LENGTH = 24000;
const STAGING_API_BASE = "https://staging-api.terrasatch.com";
const PRODUCTION_API_BASE = "https://api.terrasatch.com";
const FORM_ID = "OUTFIELD-CHECKIN";
const FORM_VERSION = 3;

type ApiRequest = {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => void;
};

const header = (request: ApiRequest, name: string) => {
  const value = request.headers[name] ?? request.headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
};

const sameOrigin = (request: ApiRequest) => {
  const origin = header(request, "origin");
  const host = header(request, "host");
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
};

const parseBody = (request: ApiRequest): Record<string, unknown> => {
  if (typeof request.body === "string") {
    return JSON.parse(request.body) as Record<string, unknown>;
  }
  if (request.body && typeof request.body === "object") {
    return request.body as Record<string, unknown>;
  }
  return {};
};

const baseUrl = () => {
  const configured = process.env.TERRASATCH_FEEDBACK_API_BASE_URL?.trim();
  const candidate = (
    configured ||
    (process.env.VERCEL_ENV === "production" ? PRODUCTION_API_BASE : STAGING_API_BASE)
  ).replace(/\/$/, "");

  if (process.env.VERCEL_ENV === "production") {
    const upstream = new URL(candidate);
    if (
      upstream.protocol !== "https:" ||
      upstream.hostname !== "api.terrasatch.com"
    ) {
      throw new Error(
        "Production feedback upstream must use https://api.terrasatch.com",
      );
    }
  }

  return candidate;
};

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader(
    "Cache-Control",
    "private, no-store, no-cache, max-age=0, must-revalidate",
  );
  response.setHeader("X-Content-Type-Options", "nosniff");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }
  if (!sameOrigin(request)) {
    return response.status(403).json({ error: "Request origin was not accepted." });
  }

  try {
    const payload = parseBody(request);
    if (JSON.stringify(payload).length > MAX_BODY_LENGTH) {
      return response.status(413).json({ error: "Submission is too large." });
    }

    const honeypot = payload.website;
    if (typeof honeypot === "string" && honeypot.trim()) {
      return response.status(201).json({
        accepted: true,
        response_id: "discarded",
        form_id: FORM_ID,
        form_version: FORM_VERSION,
        distribution_id: "DIRECT",
      });
    }

    const completionSeconds = Number(payload.completion_seconds);
    if (!Number.isFinite(completionSeconds) || completionSeconds < 5) {
      return response.status(429).json({
        error: "Please take a little more time before submitting.",
      });
    }

    const token = payload.turnstile_token;
    if (typeof token !== "string" || !token || token.length > 2048) {
      return response.status(400).json({
        error: "Complete the human verification before submitting.",
      });
    }

    const { website: _website, ...surveyPayload } = payload;

    const upstream = await fetch(
      baseUrl() + `/api/v1/feedback/forms/${FORM_ID}/responses`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyPayload),
        credentials: "omit",
        redirect: "error",
        signal: AbortSignal.timeout(10_000),
      },
    );
    const body = await upstream
      .json()
      .catch(() => ({ error: "Invalid upstream response." }));
    return response.status(upstream.status).json(body);
  } catch {
    return response.status(502).json({
      error: "TerraSatch feedback service is temporarily unavailable.",
    });
  }
}

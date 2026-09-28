const MAX_BODY_LENGTH = 16000;
const DEFAULT_API_BASE = "https://staging-api.terrasatch.com";
const FORM_ID = "OUTFIELD-CHECKIN";

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

const baseUrl = () =>
  (process.env.TERRASATCH_FEEDBACK_API_BASE_URL || DEFAULT_API_BASE).replace(/\/$/, "");

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

    const upstream = await fetch(
      baseUrl() + `/api/v1/feedback/forms/${FORM_ID}/responses`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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

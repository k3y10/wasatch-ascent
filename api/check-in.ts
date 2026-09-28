const MAX_BODY_LENGTH = 24000;
const DEFAULT_API_BASE = "https://staging-api.terrasatch.com";
const FORM_ID = "OUTFIELD-CHECKIN";
const FORM_VERSION = 2;
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

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

type TurnstileResult = {
  success?: boolean;
  hostname?: string;
  "error-codes"?: string[];
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

const isSafeTestEnvironment = () =>
  process.env.VERCEL_ENV === "preview" ||
  process.env.VERCEL_ENV === "development" ||
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "test";

const turnstileSecret = () =>
  process.env.TURNSTILE_SECRET_KEY?.trim() ||
  (isSafeTestEnvironment() ? TURNSTILE_TEST_SECRET : "");

const requestIp = (request: ApiRequest) => {
  const forwarded = header(request, "x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "";
  return header(request, "x-real-ip")?.trim() || "";
};

const verifyTurnstile = async (
  token: unknown,
  request: ApiRequest,
): Promise<TurnstileResult> => {
  const secret = turnstileSecret();
  if (!secret) {
    throw new Error("Turnstile is not configured.");
  }
  if (typeof token !== "string" || !token || token.length > 2048) {
    return { success: false, "error-codes": ["missing-input-response"] };
  }

  const body: Record<string, string> = {
    secret,
    response: token,
  };
  const remoteip = requestIp(request);
  if (remoteip) body.remoteip = remoteip;

  const validation = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });
  if (!validation.ok) {
    throw new Error("Turnstile validation service failed.");
  }
  return (await validation.json()) as TurnstileResult;
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

    const verification = await verifyTurnstile(payload.turnstile_token, request);
    if (!verification.success) {
      return response.status(400).json({
        error: "Human verification failed. Please try again.",
      });
    }

    const {
      turnstile_token: _turnstileToken,
      website: _website,
      ...surveyPayload
    } = payload;

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
  } catch (error) {
    const message =
      error instanceof Error && error.message === "Turnstile is not configured."
        ? "Human verification is not configured for this environment."
        : "TerraSatch feedback service is temporarily unavailable.";
    return response.status(502).json({ error: message });
  }
}

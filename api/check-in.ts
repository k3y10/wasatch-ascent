const MAX_BODY_LENGTH = 16000;
const DEFAULT_API_BASE = "https://staging-api.terrasatch.com";
const SURVEY_SLUG = "outdoor-field-check-in-fall-2026";
const GIVEAWAY_SLUG = "ski-day-2026-27";

type ApiRequest = {
  method?: string;
  body?: unknown;
  query?: Record<string, string | string[] | undefined>;
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
  try { return new URL(origin).host === host; } catch { return false; }
};

const parseBody = (request: ApiRequest): Record<string, unknown> => {
  if (typeof request.body === "string") return JSON.parse(request.body) as Record<string, unknown>;
  if (request.body && typeof request.body === "object") return request.body as Record<string, unknown>;
  return {};
};

const baseUrl = () =>
  (process.env.TERRASATCH_FEEDBACK_API_BASE_URL || DEFAULT_API_BASE).replace(/\/$/, "");

const upstreamJson = async (path: string, init?: RequestInit) => {
  const upstream = await fetch(baseUrl() + path, {
    ...init,
    headers: { Accept: "application/json", ...(init?.headers || {}) },
    credentials: "omit",
    redirect: "error",
    signal: AbortSignal.timeout(10_000),
  });
  const body = await upstream.json().catch(() => ({ error: "Invalid upstream response." }));
  return { upstream, body };
};

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader("Cache-Control", "private, no-store, no-cache, max-age=0, must-revalidate");
  response.setHeader("X-Content-Type-Options", "nosniff");

  if (request.method === "GET") {
    const raw = request.query?.resource;
    const resource = Array.isArray(raw) ? raw[0] : raw;
    const path =
      resource === "survey"
        ? `/api/v1/feedback/campaigns/${SURVEY_SLUG}`
        : resource === "giveaway"
          ? `/api/v1/feedback/giveaways/${GIVEAWAY_SLUG}`
          : null;
    if (!path) return response.status(400).json({ error: "Unknown feedback resource." });
    try {
      const result = await upstreamJson(path);
      return response.status(result.upstream.status).json(result.body);
    } catch {
      return response.status(502).json({ error: "TerraSatch feedback service is temporarily unavailable." });
    }
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "GET, POST");
    return response.status(405).json({ error: "Method not allowed." });
  }
  if (!sameOrigin(request)) return response.status(403).json({ error: "Request origin was not accepted." });

  try {
    const raw = parseBody(request);
    if (JSON.stringify(raw).length > MAX_BODY_LENGTH) {
      return response.status(413).json({ error: "Submission is too large." });
    }
    const { kind, ...payload } = raw;
    const path =
      kind === "survey"
        ? `/api/v1/feedback/campaigns/${SURVEY_SLUG}/responses`
        : kind === "giveaway"
          ? `/api/v1/feedback/giveaways/${GIVEAWAY_SLUG}/entries`
          : null;
    if (!path) return response.status(400).json({ error: "Unknown submission type." });
    const result = await upstreamJson(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.status(result.upstream.status).json(result.body);
  } catch {
    return response.status(400).json({ error: "The submission could not be processed." });
  }
}

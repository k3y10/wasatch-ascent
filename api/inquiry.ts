const FOUNDER_EMAIL = "mccunekeaton@gmail.com";
const MAX_BODY_LENGTH = 24000;

type ApiRequest = {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ApiResponse;
  json: (payload: Record<string, unknown>) => void;
};

type InquiryMode = "pilot" | "investor";

const getHeader = (request: ApiRequest, name: string) => {
  const value = request.headers[name] ?? request.headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
};

const clean = (value: unknown, max = 2000) => String(value ?? "").trim().slice(0, max);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"]/g, (character) => {
    const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
    return entities[character] ?? character;
  });

const parseBody = (request: ApiRequest): Record<string, unknown> => {
  if (typeof request.body === "string") return JSON.parse(request.body) as Record<string, unknown>;
  if (request.body && typeof request.body === "object") return request.body as Record<string, unknown>;
  return {};
};

const buildFallbackMailto = (mode: InquiryMode, fields: Record<string, string>) => {
  const subject = mode === "pilot" ? "TerraSatch 14-day Discovery Phase inquiry" : "TerraSatch Fall 2026 investor interest";
  const body = Object.entries(fields)
    .filter(([key, value]) => key !== "website" && value)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  return `mailto:${FOUNDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const sameOrigin = (request: ApiRequest) => {
  const origin = getHeader(request, "origin");
  const host = getHeader(request, "host");
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
};

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader("Cache-Control", "private, no-store, no-cache, max-age=0, must-revalidate");
  response.setHeader("X-Content-Type-Options", "nosniff");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, error: "Method not allowed." });
  }

  if (!sameOrigin(request)) {
    return response.status(403).json({ ok: false, error: "Request origin was not accepted." });
  }

  try {
    const raw = parseBody(request);
    if (JSON.stringify(raw).length > MAX_BODY_LENGTH) {
      return response.status(413).json({ ok: false, error: "Inquiry is too large." });
    }

    const mode = clean(raw.mode, 20) as InquiryMode;
    if (mode !== "pilot" && mode !== "investor") {
      return response.status(400).json({ ok: false, error: "Choose a valid inquiry type." });
    }

    const fields = Object.fromEntries(
      Object.entries(raw).map(([key, value]) => [key, clean(value, key === "notes" ? 3000 : 300)]),
    ) as Record<string, string>;

    if (fields.website) {
      return response.status(200).json({ ok: true });
    }

    if (!fields.name || !fields.organization || !emailPattern.test(fields.email ?? "")) {
      return response.status(400).json({ ok: false, error: "Name, organization, and a valid email are required." });
    }

    const fallbackMailto = buildFallbackMailto(mode, fields);
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.TERRASATCH_INQUIRY_FROM;

    if (!apiKey || !from) {
      return response.status(503).json({
        ok: false,
        error: "Email delivery is not configured yet.",
        fallbackMailto,
      });
    }

    const title = mode === "pilot" ? "14-day Discovery Phase inquiry" : "Fall 2026 investor interest";
    const entries = Object.entries(fields).filter(
      ([key, value]) => !["website", "mode"].includes(key) && value,
    );
    const text = entries.map(([key, value]) => `${key}: ${value}`).join("\n");
    const html = `<h1>${escapeHtml(title)}</h1><table>${entries
      .map(
        ([key, value]) =>
          `<tr><th style="text-align:left;vertical-align:top;padding:6px 12px 6px 0">${escapeHtml(key)}</th><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
      )
      .join("")}</table>`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [FOUNDER_EMAIL],
        reply_to: fields.email,
        subject: `TerraSatch · ${title} · ${fields.organization}`,
        text,
        html,
      }),
    });

    if (!resendResponse.ok) {
      return response.status(502).json({
        ok: false,
        error: "The inquiry could not be delivered automatically.",
        fallbackMailto,
      });
    }

    return response.status(200).json({ ok: true });
  } catch {
    return response.status(400).json({ ok: false, error: "The inquiry could not be processed." });
  }
}


import { createHmac, timingSafeEqual } from "node:crypto";

type HeaderValue = string | string[] | undefined;

type ApiRequest = {
  method?: string;
  headers: Record<string, HeaderValue>;
  body?: unknown;
};

type ApiResponse = {
  status: (statusCode: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string | string[]) => void;
};

type DemoAccessSubmission = {
  name: string;
  email: string;
  organization: string;
  interest: DemoInterest;
  notes: string;
  acknowledged: boolean;
  website: string;
};

type DemoInterest =
  | "radio"
  | "avalanche"
  | "wildfire"
  | "mapping"
  | "edge"
  | "integration"
  | "pilot"
  | "strategic"
  | "other";

const SESSION_COOKIE = "terrasatch_demo_session";
const SESSION_SUBJECT = "public-demo";
const SESSION_TTL_SECONDS = 60 * 60 * 8;
const MAX_BODY_LENGTH = 12000;
const DEMO_INQUIRY_TO = process.env.TERRASATCH_INQUIRY_TO || "mccunekeaton@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const interestLabels: Record<DemoInterest, string> = {
  radio: "TerraListen / radio workflows",
  avalanche: "Avalanche & snow operations",
  wildfire: "Wildfire / incident operations",
  mapping: "Terrain intelligence / mapping",
  edge: "Edge / offline field systems",
  integration: "API / data integration",
  pilot: "Pilot / field evaluation",
  strategic: "Strategic / investment conversation",
  other: "Other",
};

const getHeader = (headers: ApiRequest["headers"], name: string): string | undefined => {
  const value = headers[name] ?? headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
};

const constantTimeMatches = (provided: string, expected: string): boolean => {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(providedBuffer, expectedBuffer);
};

const sign = (value: string, secret: string): string =>
  createHmac("sha256", secret).update(value).digest("base64url");

const createSessionToken = (secret: string): string => {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const encodedSubject = Buffer.from(SESSION_SUBJECT, "utf8").toString("base64url");
  const payload = `v2.${expiresAt}.${encodedSubject}`;
  return `${payload}.${sign(payload, secret)}`;
};

const verifySessionToken = (token: string, secret: string): boolean => {
  const [version, expiresAtValue, encodedSubject, signature, ...remainder] = token.split(".");
  if (version !== "v2" || remainder.length > 0 || !expiresAtValue || !encodedSubject || !signature) {
    return false;
  }

  const payload = `${version}.${expiresAtValue}.${encodedSubject}`;
  if (!constantTimeMatches(signature, sign(payload, secret))) {
    return false;
  }

  const expiresAt = Number(expiresAtValue);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) {
    return false;
  }

  try {
    const subject = Buffer.from(encodedSubject, "base64url").toString("utf8");
    return constantTimeMatches(subject, SESSION_SUBJECT);
  } catch {
    return false;
  }
};

const parseCookies = (cookieHeader: string | undefined): Record<string, string> => {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader.split(";").reduce<Record<string, string>>((cookies, pair) => {
    const separatorIndex = pair.indexOf("=");
    if (separatorIndex === -1) {
      return cookies;
    }

    const name = pair.slice(0, separatorIndex).trim();
    const value = pair.slice(separatorIndex + 1).trim();
    cookies[name] = value;
    return cookies;
  }, {});
};

const clean = (value: unknown, max: number): string => String(value ?? "").trim().slice(0, max);

const readSubmission = (body: unknown): DemoAccessSubmission | null => {
  let value = body;

  if (typeof value === "string") {
    try {
      value = JSON.parse(value) as unknown;
    } catch {
      return null;
    }
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const raw = value as Record<string, unknown>;
  if (JSON.stringify(raw).length > MAX_BODY_LENGTH) {
    return null;
  }

  const interest = clean(raw.interest, 40) as DemoInterest;
  if (!(interest in interestLabels)) {
    return null;
  }

  return {
    name: clean(raw.name, 120),
    email: clean(raw.email, 240).toLowerCase(),
    organization: clean(raw.organization, 200),
    interest,
    notes: clean(raw.notes, 1500),
    acknowledged: raw.acknowledged === true,
    website: clean(raw.website, 300),
  };
};

const isSameOrigin = (request: ApiRequest): boolean => {
  const origin = getHeader(request.headers, "origin");
  if (!origin) {
    return true;
  }

  const host = getHeader(request.headers, "x-forwarded-host") || getHeader(request.headers, "host");
  if (!host) {
    return false;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
};

const sessionCookie = (token: string, maxAge: number): string => {
  const secure = process.env.VERCEL || process.env.NODE_ENV === "production" ? "; Secure" : "";
  const expires =
    maxAge === 0
      ? "; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
      : `; Expires=${new Date(Date.now() + maxAge * 1000).toUTCString()}`;

  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${expires}${secure}`;
};

const setCommonHeaders = (response: ApiResponse) => {
  response.setHeader("Cache-Control", "private, no-store, no-cache, max-age=0, must-revalidate");
  response.setHeader("Pragma", "no-cache");
  response.setHeader("Expires", "0");
  response.setHeader("Vary", "Cookie");
  response.setHeader("X-Content-Type-Options", "nosniff");
};

const escapeHtml = (value: string): string =>
  value.replace(/[&<>\"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
    };
    return entities[character] ?? character;
  });

const deliverDemoRequest = async (submission: DemoAccessSubmission): Promise<boolean> => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.TERRASATCH_INQUIRY_FROM;

  if (!apiKey || !from) {
    return false;
  }

  const entries: Array<[string, string]> = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Organization", submission.organization],
    ["Interest", interestLabels[submission.interest]],
    ["Notes", submission.notes || "—"],
    ["Demo notice acknowledged", submission.acknowledged ? "Yes" : "No"],
  ];

  const text = entries.map(([key, value]) => `${key}: ${value}`).join("\n");
  const html = `<h1>Public demo access</h1><table>${entries
    .map(
      ([key, value]) =>
        `<tr><th style="text-align:left;vertical-align:top;padding:6px 12px 6px 0">${escapeHtml(key)}</th><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>`;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [DEMO_INQUIRY_TO],
        reply_to: submission.email,
        subject: `TerraSatch · Public demo access · ${submission.organization}`,
        text,
        html,
      }),
    });

    return resendResponse.ok;
  } catch {
    return false;
  }
};

export default async function handler(request: ApiRequest, response: ApiResponse) {
  setCommonHeaders(response);

  const sessionSecret = process.env.TERRASATCH_DEMO_SESSION_SECRET;
  if (!sessionSecret || sessionSecret.length < 32) {
    return response.status(503).json({
      authenticated: false,
      error: "Demo access has not been configured for this environment.",
    });
  }

  const method = request.method?.toUpperCase();

  if (method === "GET") {
    const token = parseCookies(getHeader(request.headers, "cookie"))[SESSION_COOKIE];
    if (!token || !verifySessionToken(token, sessionSecret)) {
      return response.status(401).json({ authenticated: false });
    }

    return response.status(200).json({
      authenticated: true,
      user: { access: SESSION_SUBJECT },
    });
  }

  if (method === "POST") {
    if (!isSameOrigin(request)) {
      return response.status(403).json({ authenticated: false, error: "Request origin was not accepted." });
    }

    const submission = readSubmission(request.body);
    if (!submission || submission.website) {
      return response.status(400).json({
        authenticated: false,
        error: "Please complete the demo access form.",
      });
    }

    if (!submission.name || !submission.organization || !EMAIL_PATTERN.test(submission.email)) {
      return response.status(400).json({
        authenticated: false,
        error: "Name, organization, and a valid email are required.",
      });
    }

    if (!submission.acknowledged) {
      return response.status(400).json({
        authenticated: false,
        error: "Please acknowledge the demo-use notice before continuing.",
      });
    }

    const notificationDelivered = await deliverDemoRequest(submission);
    if (!notificationDelivered) {
      console.warn("Demo access granted, but the notification email could not be delivered.");
    }

    const token = createSessionToken(sessionSecret);
    response.setHeader("Set-Cookie", sessionCookie(token, SESSION_TTL_SECONDS));
    return response.status(200).json({
      authenticated: true,
      user: { access: SESSION_SUBJECT },
      notificationDelivered,
    });
  }

  if (method === "DELETE") {
    if (!isSameOrigin(request)) {
      return response.status(403).json({ authenticated: false, error: "Request origin was not accepted." });
    }

    response.setHeader("Clear-Site-Data", '"cache"');
    response.setHeader("Set-Cookie", sessionCookie("", 0));
    return response.status(200).json({ authenticated: false });
  }

  response.setHeader("Allow", ["GET", "POST", "DELETE"]);
  return response.status(405).json({ authenticated: false, error: "Method not allowed." });
}

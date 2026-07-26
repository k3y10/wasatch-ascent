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

type Credentials = {
  username: string;
  password: string;
};

const SESSION_COOKIE = "terrasatch_demo_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

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

const createSessionToken = (username: string, secret: string): string => {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const encodedUsername = Buffer.from(username, "utf8").toString("base64url");
  const payload = `v1.${expiresAt}.${encodedUsername}`;
  return `${payload}.${sign(payload, secret)}`;
};

const verifySessionToken = (token: string, secret: string): string | null => {
  const [version, expiresAtValue, encodedUsername, signature, ...remainder] = token.split(".");
  if (version !== "v1" || remainder.length > 0 || !expiresAtValue || !encodedUsername || !signature) {
    return null;
  }

  const payload = `${version}.${expiresAtValue}.${encodedUsername}`;
  if (!constantTimeMatches(signature, sign(payload, secret))) {
    return null;
  }

  const expiresAt = Number(expiresAtValue);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) {
    return null;
  }

  try {
    return Buffer.from(encodedUsername, "base64url").toString("utf8");
  } catch {
    return null;
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

const readCredentials = (body: unknown): Credentials | null => {
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

  const candidate = value as Partial<Credentials>;
  return typeof candidate.username === "string" && typeof candidate.password === "string"
    ? { username: candidate.username, password: candidate.password }
    : null;
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

export default function handler(request: ApiRequest, response: ApiResponse) {
  setCommonHeaders(response);

  const configuredUsername = process.env.TERRASATCH_DEMO_USERNAME;
  const configuredPassword = process.env.TERRASATCH_DEMO_PASSWORD;
  const sessionSecret = process.env.TERRASATCH_DEMO_SESSION_SECRET;

  if (!configuredUsername || !configuredPassword || !sessionSecret || sessionSecret.length < 32) {
    return response.status(503).json({
      authenticated: false,
      error: "Demo access has not been configured for this environment.",
    });
  }

  const method = request.method?.toUpperCase();

  if (method === "GET") {
    const token = parseCookies(getHeader(request.headers, "cookie"))[SESSION_COOKIE];
    const username = token ? verifySessionToken(token, sessionSecret) : null;

    if (!username || !constantTimeMatches(username, configuredUsername)) {
      return response.status(401).json({ authenticated: false });
    }

    return response.status(200).json({
      authenticated: true,
      user: { username },
    });
  }

  if (method === "POST") {
    if (!isSameOrigin(request)) {
      return response.status(403).json({ authenticated: false, error: "Request origin was not accepted." });
    }

    const credentials = readCredentials(request.body);
    const usernameMatches = credentials
      ? constantTimeMatches(credentials.username, configuredUsername)
      : false;
    const passwordMatches = credentials
      ? constantTimeMatches(credentials.password, configuredPassword)
      : false;
    const isValid = Boolean(credentials && usernameMatches && passwordMatches);

    if (!isValid) {
      return response.status(401).json({
        authenticated: false,
        error: "Access denied.",
      });
    }

    const token = createSessionToken(configuredUsername, sessionSecret);
    response.setHeader("Set-Cookie", sessionCookie(token, SESSION_TTL_SECONDS));
    return response.status(200).json({
      authenticated: true,
      user: { username: configuredUsername },
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

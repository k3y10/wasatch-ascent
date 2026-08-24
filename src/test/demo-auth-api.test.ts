import { afterEach, beforeEach, describe, expect, it } from "vitest";
import handler from "../../api/demo-auth";

type MockResponse = {
  statusCode: number;
  headers: Record<string, string | string[]>;
  body: unknown;
  status: (statusCode: number) => MockResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string | string[]) => void;
};

const createResponse = (): MockResponse => {
  const response: MockResponse = {
    statusCode: 200,
    headers: {},
    body: undefined,
    status(statusCode) {
      response.statusCode = statusCode;
      return response;
    },
    json(body) {
      response.body = body;
    },
    setHeader(name, value) {
      response.headers[name] = value;
    },
  };

  return response;
};

const requestHeaders = {
  host: "terrasatch.example",
  origin: "https://terrasatch.example",
};

describe("demo auth API", () => {
  const previousEnvironment = {
    username: process.env.TERRASATCH_DEMO_USERNAME,
    password: process.env.TERRASATCH_DEMO_PASSWORD,
    secret: process.env.TERRASATCH_DEMO_SESSION_SECRET,
    vercel: process.env.VERCEL,
  };

  beforeEach(() => {
    process.env.TERRASATCH_DEMO_USERNAME = "terrain-operator";
    process.env.TERRASATCH_DEMO_PASSWORD = "ridge-line-access";
    process.env.TERRASATCH_DEMO_SESSION_SECRET = "a-32-character-minimum-session-secret";
    delete process.env.VERCEL;
  });

  afterEach(() => {
    process.env.TERRASATCH_DEMO_USERNAME = previousEnvironment.username;
    process.env.TERRASATCH_DEMO_PASSWORD = previousEnvironment.password;
    process.env.TERRASATCH_DEMO_SESSION_SECRET = previousEnvironment.secret;
    process.env.VERCEL = previousEnvironment.vercel;
  });

  it("rejects credentials that do not match the environment", () => {
    const response = createResponse();
    handler(
      {
        method: "POST",
        headers: requestHeaders,
        body: { username: "terrain-operator", password: "wrong-key" },
      },
      response,
    );

    expect(response.statusCode).toBe(401);
    expect(response.headers["Set-Cookie"]).toBeUndefined();
  });

  it("issues an HTTP-only session and accepts it on the next request", () => {
    const loginResponse = createResponse();
    handler(
      {
        method: "POST",
        headers: requestHeaders,
        body: { username: "terrain-operator", password: "ridge-line-access" },
      },
      loginResponse,
    );

    const setCookie = String(loginResponse.headers["Set-Cookie"]);
    expect(loginResponse.statusCode).toBe(200);
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie).toContain("SameSite=Strict");
    expect(setCookie).toContain("Expires=");
    expect(setCookie).not.toContain("ridge-line-access");

    const sessionResponse = createResponse();
    handler(
      {
        method: "GET",
        headers: { cookie: setCookie.split(";")[0] },
      },
      sessionResponse,
    );

    expect(sessionResponse.statusCode).toBe(200);
    expect(sessionResponse.body).toEqual({
      authenticated: true,
      user: { username: "terrain-operator" },
    });
  });

  it("clears the session cookie when signing out", () => {
    const response = createResponse();
    handler({ method: "DELETE", headers: requestHeaders }, response);

    const setCookie = String(response.headers["Set-Cookie"]);
    expect(response.statusCode).toBe(200);
    expect(setCookie).toContain("Max-Age=0");
    expect(setCookie).toContain("Expires=Thu, 01 Jan 1970 00:00:00 GMT");
    expect(response.headers["Clear-Site-Data"]).toBe('"cache"');
    expect(response.headers["Cache-Control"]).toContain("no-store");
  });

  it("fails closed when the environment is incomplete", () => {
    delete process.env.TERRASATCH_DEMO_SESSION_SECRET;
    const response = createResponse();

    handler({ method: "GET", headers: {} }, response);

    expect(response.statusCode).toBe(503);
    expect(response.body).toEqual({
      authenticated: false,
      error: "Demo access has not been configured for this environment.",
    });
  });
});

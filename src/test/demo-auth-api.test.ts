import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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

const validSubmission = {
  name: "Demo Evaluator",
  email: "evaluator@example.com",
  organization: "Mountain Ops Example",
  interest: "avalanche",
  notes: "Evaluating field observation and terrain workflows.",
  acknowledged: true,
  website: "",
};

describe("demo auth API", () => {
  const previousEnvironment = {
    secret: process.env.TERRASATCH_DEMO_SESSION_SECRET,
    resend: process.env.RESEND_API_KEY,
    inquiryFrom: process.env.TERRASATCH_INQUIRY_FROM,
    vercel: process.env.VERCEL,
  };

  beforeEach(() => {
    process.env.TERRASATCH_DEMO_SESSION_SECRET = "a-32-character-minimum-session-secret";
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.TERRASATCH_INQUIRY_FROM = "TerraSatch <demo@example.com>";
    delete process.env.VERCEL;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ id: "email_123" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
  });

  afterEach(() => {
    process.env.TERRASATCH_DEMO_SESSION_SECRET = previousEnvironment.secret;
    process.env.RESEND_API_KEY = previousEnvironment.resend;
    process.env.TERRASATCH_INQUIRY_FROM = previousEnvironment.inquiryFrom;
    process.env.VERCEL = previousEnvironment.vercel;
    vi.unstubAllGlobals();
  });

  it("rejects an incomplete demo access submission", async () => {
    const response = createResponse();

    await handler(
      {
        method: "POST",
        headers: requestHeaders,
        body: { ...validSubmission, email: "not-an-email" },
      },
      response,
    );

    expect(response.statusCode).toBe(400);
    expect(response.headers["Set-Cookie"]).toBeUndefined();
  });

  it("requires acknowledgement of the demo-use notice", async () => {
    const response = createResponse();

    await handler(
      {
        method: "POST",
        headers: requestHeaders,
        body: { ...validSubmission, acknowledged: false },
      },
      response,
    );

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      authenticated: false,
      error: "Please acknowledge the demo-use notice before continuing.",
    });
  });

  it("delivers the request, issues an HTTP-only session, and accepts it on the next request", async () => {
    const loginResponse = createResponse();

    await handler(
      {
        method: "POST",
        headers: requestHeaders,
        body: validSubmission,
      },
      loginResponse,
    );

    const setCookie = String(loginResponse.headers["Set-Cookie"]);
    expect(loginResponse.statusCode).toBe(200);
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie).toContain("SameSite=Strict");
    expect(setCookie).toContain("Expires=");
    expect(setCookie).not.toContain(validSubmission.email);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({ method: "POST" }),
    );

    const sessionResponse = createResponse();
    await handler(
      {
        method: "GET",
        headers: { cookie: setCookie.split(";")[0] },
      },
      sessionResponse,
    );

    expect(sessionResponse.statusCode).toBe(200);
    expect(sessionResponse.body).toEqual({
      authenticated: true,
      user: { access: "public-demo" },
    });
  });

  it("still issues a demo session if the notification email cannot be delivered", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: "delivery failed" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    const response = createResponse();

    await handler(
      {
        method: "POST",
        headers: requestHeaders,
        body: validSubmission,
      },
      response,
    );

    expect(response.statusCode).toBe(200);
    expect(String(response.headers["Set-Cookie"])).toContain("terrasatch_demo_session=");
    expect(response.body).toEqual({
      authenticated: true,
      user: { access: "public-demo" },
      notificationDelivered: false,
    });
  });

  it("clears the session cookie when signing out", async () => {
    const response = createResponse();
    await handler({ method: "DELETE", headers: requestHeaders }, response);

    const setCookie = String(response.headers["Set-Cookie"]);
    expect(response.statusCode).toBe(200);
    expect(setCookie).toContain("Max-Age=0");
    expect(setCookie).toContain("Expires=Thu, 01 Jan 1970 00:00:00 GMT");
    expect(response.headers["Clear-Site-Data"]).toBe('"cache"');
    expect(response.headers["Cache-Control"]).toContain("no-store");
  });

  it("fails closed when the session secret is incomplete", async () => {
    delete process.env.TERRASATCH_DEMO_SESSION_SECRET;
    const response = createResponse();

    await handler({ method: "GET", headers: {} }, response);

    expect(response.statusCode).toBe(503);
    expect(response.body).toEqual({
      authenticated: false,
      error: "Demo access has not been configured for this environment.",
    });
  });
});

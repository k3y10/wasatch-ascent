import { afterEach, describe, expect, it, vi } from "vitest";

import handler from "../../api/inquiry";

type MockResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body: Record<string, unknown> | undefined;
  setHeader: (name: string, value: string) => void;
  status: (code: number) => MockResponse;
  json: (payload: Record<string, unknown>) => void;
};

const createResponse = (): MockResponse => {
  const response: MockResponse = {
    statusCode: 200,
    headers: {},
    body: undefined,
    setHeader(name, value) {
      response.headers[name] = value;
    },
    status(code) {
      response.statusCode = code;
      return response;
    },
    json(payload) {
      response.body = payload;
    },
  };
  return response;
};

const validRequest = {
  method: "POST",
  headers: { origin: "https://www.terrasatch.com", host: "www.terrasatch.com" },
  body: {
    mode: "pilot",
    name: "Pat Operator",
    email: "pat@example.com",
    organization: "Example Rescue",
    notes: "Multilingual radio pilot",
  },
};

afterEach(() => {
  delete process.env.RESEND_API_KEY;
  delete process.env.TERRASATCH_INQUIRY_FROM;
  delete process.env.TERRASATCH_INQUIRY_TO;
  delete process.env.TERRASATCH_FOUNDER_EMAIL;
  delete process.env.TERRASATCH_INQUIRY_FALLBACK_TO;
  vi.unstubAllGlobals();
});

describe("inquiry API", () => {
  it("returns a TerraSatch-domain mail fallback when delivery is not configured", async () => {
    const response = createResponse();

    await handler(validRequest, response);

    expect(response.statusCode).toBe(503);
    expect(response.body?.fallbackMailto).toContain("mailto:ops@terrasatch.com");
  });

  it("sends general website inquiries to the TerraSatch operations mailbox", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.TERRASATCH_INQUIRY_FROM = "TerraSatch <inquiries@terrasatch.com>";
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const response = createResponse();

    await handler(validRequest, response);

    expect(response.statusCode).toBe(200);
    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const payload = JSON.parse(String(request.body)) as {
      to: string[];
      reply_to: string;
    };
    expect(payload.to).toEqual(["ops@terrasatch.com"]);
    expect(payload.reply_to).toBe("pat@example.com");
  });

  it("rejects cross-origin submissions", async () => {
    const response = createResponse();

    await handler(
      { ...validRequest, headers: { origin: "https://attacker.example", host: "www.terrasatch.com" } },
      response,
    );

    expect(response.statusCode).toBe(403);
  });

  it("accepts launch registrations without an organization", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.TERRASATCH_INQUIRY_FROM = "TerraSatch <inquiries@terrasatch.com>";
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const response = createResponse();

    await handler(
      {
        ...validRequest,
        body: {
          mode: "launch",
          name: "Independent Operator",
          email: "operator@example.com",
          preferredPlan: "individual",
        },
      },
      response,
    );

    expect(response.statusCode).toBe(200);
    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(String(request.body)).toContain("preferredPlan");
    expect(String(request.body)).toContain("individual");
  });

  it("routes investor inquiries to the TerraSatch founder mailbox", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.TERRASATCH_INQUIRY_FROM = "TerraSatch <inquiries@terrasatch.com>";
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const response = createResponse();

    await handler(
      {
        ...validRequest,
        body: {
          mode: "investor",
          name: "Investor Example",
          email: "investor@example.com",
          organization: "Example Capital",
        },
      },
      response,
    );

    expect(response.statusCode).toBe(200);
    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const payload = JSON.parse(String(request.body)) as { to: string[] };
    expect(payload.to).toEqual(["keaton@terrasatch.com"]);
  });

  it("uses the private Gmail mailbox only after primary automated delivery fails", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.TERRASATCH_INQUIRY_FROM = "TerraSatch <inquiries@terrasatch.com>";
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const response = createResponse();

    await handler(validRequest, response);

    expect(response.statusCode).toBe(200);
    const primary = JSON.parse(String((fetchMock.mock.calls[0]?.[1] as RequestInit).body)) as { to: string[] };
    const fallback = JSON.parse(String((fetchMock.mock.calls[1]?.[1] as RequestInit).body)) as { to: string[] };
    expect(primary.to).toEqual(["ops@terrasatch.com"]);
    expect(fallback.to).toEqual(["mccunekeaton@gmail.com"]);
  });


});

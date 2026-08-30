import { afterEach, describe, expect, it, vi } from "vitest";
import { DemoAuthError, getDemoSession, requestDemoAccess, signOutOfDemos } from "@/lib/demo-auth";

const demoRequest = {
  name: "Demo Evaluator",
  email: "evaluator@example.com",
  organization: "Mountain Ops Example",
  interest: "avalanche" as const,
  notes: "Evaluating avalanche workflows.",
  acknowledged: true,
  website: "",
};

describe("demo auth client", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("treats an unauthorized session check as signed out", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ authenticated: false }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(getDemoSession()).resolves.toBeNull();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/demo-auth",
      expect.objectContaining({
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
      }),
    );
  });

  it("returns an authorized public-demo session after a successful request", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ authenticated: true, user: { access: "public-demo" } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(requestDemoAccess(demoRequest)).resolves.toEqual({ access: "public-demo" });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/demo-auth",
      expect.objectContaining({
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify(demoRequest),
      }),
    );
  });

  it("surfaces the server message when a request is rejected", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            authenticated: false,
            error: "Please acknowledge the demo-use notice before continuing.",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        ),
      ),
    );

    await expect(requestDemoAccess({ ...demoRequest, acknowledged: false })).rejects.toEqual(
      expect.objectContaining<Partial<DemoAuthError>>({
        message: "Please acknowledge the demo-use notice before continuing.",
        status: 400,
      }),
    );
  });

  it("closes the server session and confirms it is gone", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ authenticated: false }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ authenticated: false }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }),
      );
    vi.stubGlobal("fetch", fetchMock);

    await expect(signOutOfDemos()).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "/api/demo-auth",
      expect.objectContaining({
        method: "DELETE",
        credentials: "same-origin",
        cache: "no-store",
      }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/api/demo-auth",
      expect.objectContaining({ method: "GET", cache: "no-store" }),
    );
  });

  it("fails sign-out when the session cookie is still accepted", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ authenticated: false }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ authenticated: true, user: { access: "public-demo" } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );
    vi.stubGlobal("fetch", fetchMock);

    await expect(signOutOfDemos()).rejects.toEqual(
      expect.objectContaining<Partial<DemoAuthError>>({
        status: 409,
      }),
    );
  });
});

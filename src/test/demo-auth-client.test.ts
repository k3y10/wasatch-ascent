import { afterEach, describe, expect, it, vi } from "vitest";
import { DemoAuthError, getDemoSession, signInToDemos, signOutOfDemos } from "@/lib/demo-auth";

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
      expect.objectContaining({ method: "GET", credentials: "same-origin" }),
    );
  });

  it("returns the authorized operator after a successful sign in", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ authenticated: true, user: { username: "terrain-operator" } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    await expect(signInToDemos("terrain-operator", "ridge-line-access")).resolves.toEqual({
      username: "terrain-operator",
    });
  });

  it("returns a useful generic message for rejected credentials", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ authenticated: false, error: "Access denied." }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    await expect(signInToDemos("wrong", "wrong")).rejects.toEqual(
      expect.objectContaining<Partial<DemoAuthError>>({
        message: "Access denied. Check your TerraSatch demo credentials.",
        status: 401,
      }),
    );
  });

  it("closes the server session", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ authenticated: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(signOutOfDemos()).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/demo-auth",
      expect.objectContaining({ method: "DELETE", credentials: "same-origin" }),
    );
  });
});

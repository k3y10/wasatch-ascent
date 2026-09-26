// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
import handler from "../../api/public-api";

const response = () => {
  const result = { setHeader: vi.fn(), status: vi.fn(), json: vi.fn() };
  result.status.mockReturnValue(result);
  return result;
};
afterEach(() => vi.unstubAllGlobals());

it("rejects arbitrary upstream URLs and prototype keys", async () => {
  const fetch = vi.fn(); vi.stubGlobal("fetch", fetch);
  for (const resource of ["https://example.com/private", "constructor", "__proto__"]) {
    const res = response();
    await handler({ method: "GET", query: { resource } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
  }
  expect(fetch).not.toHaveBeenCalled();
});

it("reads only the fixed public endpoint without browser credentials", async () => {
  const fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: "healthy" }) });
  vi.stubGlobal("fetch", fetch);
  const res = response();
  await handler({ method: "GET", query: { resource: "health" } }, res);
  expect(fetch).toHaveBeenCalledWith("https://api.terrasatch.com/api/v1/health", expect.objectContaining({
    credentials: "omit", redirect: "error", headers: { Accept: "application/json" },
  }));
  expect(res.status).toHaveBeenCalledWith(200);
});

it("reports upstream failure without fabricating health", async () => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("timeout")));
  const res = response();
  await handler({ method: "GET", query: { resource: "health" } }, res);
  expect(res.status).toHaveBeenCalledWith(502);
});


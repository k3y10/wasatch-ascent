import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import ApiLivePreview from "@/components/ApiLivePreview";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it("shows a degraded health payload as needing attention, even on HTTP 200", async () => {
  vi.stubGlobal("fetch", vi.fn(async (url: string) => ({
    ok: true,
    json: async () => url.endsWith("openapi.json") ? { paths: {} } : { status: "degraded" },
  })));
  render(<ApiLivePreview apiBase="https://api.example.com" />);
  await waitFor(() => expect(screen.getByText("API needs attention")).toBeInTheDocument());
  expect(screen.queryByText("API healthy")).not.toBeInTheDocument();
});

it("offers public links when the browser cannot reach the API", async () => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network unavailable")));
  render(<ApiLivePreview apiBase="https://api.example.com" />);
  await waitFor(() => expect(screen.getByText("Browser check unavailable")).toBeInTheDocument());
  expect(screen.getByRole("link", { name: /Open health endpoint/ })).toHaveAttribute(
    "href", "https://api.example.com/api/v1/health",
  );
});

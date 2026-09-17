import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PricingEstimator from "@/components/PricingEstimator";
import { FALLBACK_PLANS, catalogMatchesPublicPricing } from "@/lib/plan-catalog";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

describe("published pricing and checkout isolation", () => {
  it("keeps all prices and request links visible when the catalog is offline", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    render(<PricingEstimator />);
    for (const price of ["$24", "$399", "From $1,999", "Custom"]) expect(screen.getByText(price, { selector: "span" })).toBeVisible();
    await waitFor(() => expect(screen.queryByText("Checking secure checkout availability")).not.toBeInTheDocument());
    expect(screen.getAllByRole("link", { name: /Request Trial Access/ })).toHaveLength(2);
    expect(screen.queryByText(/planning range/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Start 30-Day Trial/ })).not.toBeInTheDocument();
  });
  it("requires deliberate checkout enablement even with a matching catalog", async () => {
    vi.stubEnv("VITE_TERRASATCH_CHECKOUT_ENABLED", "false");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => FALLBACK_PLANS }));
    render(<PricingEstimator />);
    await waitFor(() => expect(screen.queryByText("Checking secure checkout availability")).not.toBeInTheDocument());
    expect(screen.getAllByRole("link", { name: /Request Trial Access/ })).toHaveLength(2);
    expect(screen.queryByText(/planning range/i)).not.toBeInTheDocument();
  });
  it("rejects stale prices, duplicate plans, invented cadences and changed trial terms", () => {
    expect(catalogMatchesPublicPricing(FALLBACK_PLANS)).toBe(true);
    for (const change of [{ monthly_amount_cents: 4900 }, { annual_amount_cents: 58800 }, { trial_days: 7 }, { self_service: false }]) {
      expect(catalogMatchesPublicPricing(FALLBACK_PLANS.map(plan => plan.code === "field" ? { ...plan, ...change } : plan))).toBe(false);
    }
    expect(catalogMatchesPublicPricing([...FALLBACK_PLANS, FALLBACK_PLANS[0]])).toBe(false);
    expect(catalogMatchesPublicPricing({ plans: FALLBACK_PLANS })).toBe(false);
    expect(catalogMatchesPublicPricing(null)).toBe(false);
  });
});

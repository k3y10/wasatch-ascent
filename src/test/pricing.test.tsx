import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PricingEstimator from "@/components/PricingEstimator";
import { FALLBACK_PLANS, catalogMatchesPitchModel } from "@/lib/plan-catalog";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

describe("published pricing and checkout isolation", () => {
  it("keeps all prices and request links visible when the catalog is offline", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    render(<PricingEstimator />);
    for (const price of ["$49", "$500", "$50,000", "$125,000"]) expect(screen.getByText(price)).toBeVisible();
    await waitFor(() => expect(screen.queryByText("Checking secure checkout availability")).not.toBeInTheDocument());
    expect(screen.getAllByRole("link", { name: /Request Trial Access/ })).toHaveLength(2);
    expect(screen.queryByRole("button", { name: /Start 30-Day Trial/ })).not.toBeInTheDocument();
  });
  it("requires deliberate checkout enablement even with a matching catalog", async () => {
    vi.stubEnv("VITE_TERRASATCH_CHECKOUT_ENABLED", "false");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => FALLBACK_PLANS }));
    render(<PricingEstimator />);
    await waitFor(() => expect(screen.queryByText("Checking secure checkout availability")).not.toBeInTheDocument());
    expect(screen.getAllByRole("link", { name: /Request Trial Access/ })).toHaveLength(2);
  });
  it("rejects stale prices, duplicate plans, invented cadences and changed trial terms", () => {
    expect(catalogMatchesPitchModel(FALLBACK_PLANS)).toBe(true);
    for (const change of [{ monthly_amount_cents: 9900 }, { annual_amount_cents: 58800 }, { trial_days: 7 }, { self_service: false }]) {
      expect(catalogMatchesPitchModel(FALLBACK_PLANS.map(plan => plan.code === "field" ? { ...plan, ...change } : plan))).toBe(false);
    }
    expect(catalogMatchesPitchModel([...FALLBACK_PLANS, FALLBACK_PLANS[0]])).toBe(false);
    expect(catalogMatchesPitchModel({ plans: FALLBACK_PLANS })).toBe(false);
    expect(catalogMatchesPitchModel(null)).toBe(false);
  });
});

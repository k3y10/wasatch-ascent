import { describe, expect, it } from "vitest";

import { calculateDeploymentEstimate } from "@/lib/deployment-estimate";

describe("calculateDeploymentEstimate", () => {
  it("returns a transparent total for the default deployment", () => {
    const estimate = calculateDeploymentEstimate({
      radios: 25,
      teams: 6,
      channels: 12,
      communications: 50_000,
      documents: 2_500,
      workflows: 10,
      languages: 8,
    });

    expect(estimate.monthly).toBe(4_675);
    expect(estimate.lineItems).toHaveLength(8);
    expect(estimate.lineItems.reduce((sum, item) => sum + item.amount, 0)).toBe(
      estimate.monthly,
    );
  });

  it("does not charge a language fee for the included first language", () => {
    const estimate = calculateDeploymentEstimate({
      radios: 0,
      teams: 0,
      channels: 0,
      communications: 0,
      documents: 0,
      workflows: 0,
      languages: 1,
    });

    expect(estimate.monthly).toBe(750);
    expect(estimate.lineItems.at(-1)?.amount).toBe(0);
  });
});

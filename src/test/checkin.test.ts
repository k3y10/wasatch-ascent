import { describe, expect, it } from "vitest";
import {
  FORM_ID,
  FORM_VERSION,
  normalizeDistribution,
  spendOptionsFor,
} from "@/lib/checkin";

describe("native check-in helpers", () => {
  it("uses a stable form ID and version", () => {
    expect(FORM_ID).toBe("OUTFIELD-CHECKIN");
    expect(FORM_VERSION).toBe(1);
  });

  it("keeps safe first-party distribution IDs and rejects arbitrary values", () => {
    expect(normalizeDistribution("brighton-qr-01")).toBe("BRIGHTON-QR-01");
    expect(normalizeDistribution("https://example.com/?bad=1")).toBe("DIRECT");
    expect(normalizeDistribution(null)).toBe("DIRECT");
  });

  it("branches spending ranges by audience without asking willingness-to-pay", () => {
    expect(spendOptionsFor("recreation").map(([value]) => value)).toContain("100_249");
    expect(spendOptionsFor("work").map(([value]) => value)).toContain("10k_25k");
    expect(spendOptionsFor("both").map(([value]) => value)).toContain("10k_25k");
  });
});

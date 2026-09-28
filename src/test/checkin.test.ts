import { describe, expect, it } from "vitest";
import { normalizeSource, spendOptionsFor } from "@/lib/checkin";

describe("native check-in helpers", () => {
  it("keeps safe QR source codes and rejects arbitrary values", () => {
    expect(normalizeSource("Brighton-01")).toBe("brighton-01");
    expect(normalizeSource("https://example.com/?bad=1")).toBe("direct");
  });

  it("branches spending ranges by audience without asking TerraSatch willingness-to-pay", () => {
    expect(spendOptionsFor("recreation").map(([value]) => value)).toContain("100_249");
    expect(spendOptionsFor("work").map(([value]) => value)).toContain("10k_25k");
    expect(spendOptionsFor("both").map(([value]) => value)).toContain("10k_25k");
  });
});

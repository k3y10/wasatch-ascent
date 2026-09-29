import { describe, expect, it } from "vitest";
import {
  FORM_ID,
  FORM_VERSION,
  buildQuestionPlan,
  newSurveyDraft,
  normalizeDistribution,
  spendOptionsFor,
} from "@/lib/checkin";

describe("native adaptive check-in helpers", () => {
  it("uses one stable generic form with an explicit adaptive version", () => {
    expect(FORM_ID).toBe("OUTFIELD-CHECKIN");
    expect(FORM_VERSION).toBe(3);
  });

  it("starts contact fields empty so they remain optional", () => {
    const draft = newSurveyDraft();
    expect(draft.contact_email).toBe("");
    expect(draft.contact_phone).toBe("");
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

  it("adds radio and pain follow-ups only when they are relevant", () => {
    const draft = newSurveyDraft();
    draft.audience = "recreation";
    draft.tools = ["phone_apps", "radio"];
    draft.primary_hassle = "losing_service";

    const plan = buildQuestionPlan(draft);
    expect(plan).toContain("tool_follow_up");
    expect(plan).toContain("pain_follow_up");
    expect(plan).not.toContain("time_burden");
  });

  it("adds current time burden for work and both branches", () => {
    const work = newSurveyDraft();
    work.audience = "work";
    work.tools = ["phone_apps"];
    work.primary_hassle = "nothing_major";

    const both = newSurveyDraft();
    both.audience = "both";
    both.tools = ["satellite"];
    both.primary_hassle = "locations";

    expect(buildQuestionPlan(work)).toContain("time_burden");
    expect(buildQuestionPlan(work)).not.toContain("pain_follow_up");
    expect(buildQuestionPlan(both)).toContain("time_burden");
    expect(buildQuestionPlan(both)).toContain("tool_follow_up");
    expect(buildQuestionPlan(both)).toContain("pain_follow_up");
  });
});

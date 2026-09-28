export const FORM_ID = "OUTFIELD-CHECKIN";
export const FORM_VERSION = 1;

export type Audience = "recreation" | "work" | "both";
export type SurveyDraft = {
  audience: Audience | "";
  primary_tool: string;
  primary_hassle: string;
  connectivity: string;
  spend_band: string;
  concept_interest: string;
  comment: string;
};

export const normalizeDistribution = (value: string | null) => {
  const normalized = (value ?? "").trim().toUpperCase();
  return /^[A-Z0-9][A-Z0-9_-]{0,99}$/.test(normalized) ? normalized : "DIRECT";
};

export const spendOptionsFor = (audience: Audience | "") =>
  audience === "recreation"
    ? [
        ["zero", "$0"],
        ["under_50", "Under $50"],
        ["50_99", "$50–$99"],
        ["100_249", "$100–$249"],
        ["250_499", "$250–$499"],
        ["500_plus", "$500+"],
        ["not_sure", "Not sure"],
      ]
    : [
        ["under_1k", "Under $1,000"],
        ["1k_5k", "$1,000–$4,999"],
        ["5k_10k", "$5,000–$9,999"],
        ["10k_25k", "$10,000–$24,999"],
        ["25k_50k", "$25,000–$49,999"],
        ["50k_plus", "$50,000+"],
        ["not_sure", "Not sure"],
      ];

const readJson = async <T>(response: Response): Promise<T> => {
  const body = (await response.json()) as T & { error?: string; detail?: string };
  if (!response.ok) {
    throw new Error(
      body.error || body.detail || "TerraSatch could not complete that request.",
    );
  }
  return body;
};

export const submitSurvey = (distributionId: string, draft: SurveyDraft) =>
  fetch("/api/check-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ distribution_id: distributionId, ...draft }),
  }).then((response) =>
    readJson<{
      accepted: boolean;
      response_id: string;
      form_id: string;
      form_version: number;
      distribution_id: string;
    }>(response),
  );

export const SURVEY_SLUG = "outdoor-field-check-in-fall-2026";
export const GIVEAWAY_SLUG = "ski-day-2026-27";

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

export type GiveawayMeta = {
  slug: string;
  title: string;
  active: boolean;
  official_rules_url?: string | null;
  survey_entry_required: boolean;
};

export const normalizeSource = (value: string | null) => {
  const normalized = (value ?? "").trim().toLowerCase();
  return /^[a-z0-9][a-z0-9_-]{0,99}$/.test(normalized) ? normalized : "direct";
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
  if (!response.ok) throw new Error(body.error || body.detail || "TerraSatch could not complete that request.");
  return body;
};

export const submitSurvey = (sourceCode: string, draft: SurveyDraft) =>
  fetch("/api/check-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind: "survey", source_code: sourceCode, ...draft }),
  }).then((response) => readJson<{ accepted: boolean; response_id: string }>(response));

export const getGiveaway = () =>
  fetch("/api/check-in?resource=giveaway", { cache: "no-store" }).then((response) =>
    readJson<GiveawayMeta>(response),
  );

export const submitGiveaway = (payload: {
  name: string;
  email: string;
  resort_preference: "brighton" | "snowbird" | "either";
  rules_accepted: boolean;
}) =>
  fetch("/api/check-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind: "giveaway", ...payload }),
  }).then((response) => readJson<{ accepted: boolean; entry_id: string }>(response));

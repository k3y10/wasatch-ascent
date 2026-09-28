export const FORM_ID = "OUTFIELD-CHECKIN";
export const FORM_VERSION = 2;

export type Audience = "recreation" | "work" | "both";
export type QuestionId =
  | "audience"
  | "activity_context"
  | "tools"
  | "connectivity"
  | "primary_hassle"
  | "tool_follow_up"
  | "pain_follow_up"
  | "time_burden"
  | "spend_band"
  | "concept_interest";

export type SurveyDraft = {
  audience: Audience | "";
  activity_context: string;
  tools: string[];
  connectivity: string;
  primary_hassle: string;
  tool_follow_up: string;
  pain_follow_up: string;
  time_burden: string;
  spend_band: string;
  concept_interest: string;
  comment: string;
  started_at: string;
};

export const newSurveyDraft = (): SurveyDraft => ({
  audience: "",
  activity_context: "",
  tools: [],
  connectivity: "",
  primary_hassle: "",
  tool_follow_up: "",
  pain_follow_up: "",
  time_burden: "",
  spend_band: "",
  concept_interest: "",
  comment: "",
  started_at: new Date().toISOString(),
});

export const normalizeDistribution = (value: string | null) => {
  const normalized = (value ?? "").trim().toUpperCase();
  return /^[A-Z0-9][A-Z0-9_-]{0,99}$/.test(normalized) ? normalized : "DIRECT";
};

export const recreationActivities = [
  ["backcountry_snow", "Backcountry / snow"],
  ["hiking_climbing", "Hiking / climbing"],
  ["biking_trail", "Biking / trail"],
  ["hunting_fishing", "Hunting / fishing"],
  ["camping_overland", "Camping / overland"],
  ["mixed_outdoor", "A mix of activities"],
  ["other", "Other"],
] as const;

export const workActivities = [
  ["ski_patrol_avalanche", "Ski patrol / avalanche"],
  ["sar_emergency", "SAR / emergency response"],
  ["guiding_outdoor_ops", "Guiding / outdoor operations"],
  ["land_wildfire_watershed", "Land / wildfire / watershed"],
  ["utilities_infrastructure", "Utilities / infrastructure"],
  ["research_inspection", "Research / inspection"],
  ["other", "Other field work"],
] as const;

export const bothActivities = [
  ["backcountry_snow", "Backcountry / snow"],
  ["hiking_climbing", "Hiking / climbing"],
  ["ski_patrol_avalanche", "Ski patrol / avalanche"],
  ["sar_emergency", "SAR / emergency response"],
  ["guiding_outdoor_ops", "Guiding / outdoor operations"],
  ["land_wildfire_watershed", "Land / natural resources"],
  ["mixed_outdoor", "A mix of recreation and work"],
  ["other", "Other"],
] as const;

export const activityOptionsFor = (audience: Audience | "") =>
  audience === "work"
    ? workActivities
    : audience === "both"
      ? bothActivities
      : recreationActivities;

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

export const toolFollowUpKind = (draft: SurveyDraft) => {
  if (draft.tools.includes("radio")) return "radio";
  if (draft.tools.includes("satellite")) return "satellite";
  return null;
};

export const buildQuestionPlan = (draft: SurveyDraft): QuestionId[] => {
  const plan: QuestionId[] = [
    "audience",
    "activity_context",
    "tools",
    "connectivity",
    "primary_hassle",
  ];

  if (toolFollowUpKind(draft)) plan.push("tool_follow_up");
  if (draft.primary_hassle && draft.primary_hassle !== "nothing_major") {
    plan.push("pain_follow_up");
  }
  if (draft.audience === "work" || draft.audience === "both") {
    plan.push("time_burden");
  }

  plan.push("spend_band", "concept_interest");
  return plan;
};

export const branchPathFor = (draft: SurveyDraft) => [
  `audience:${draft.audience || "unknown"}`,
  `activity:${draft.activity_context || "unknown"}`,
  `connectivity:${draft.connectivity || "unknown"}`,
  `pain:${draft.primary_hassle || "unknown"}`,
  ...draft.tools.map((tool) => `tool:${tool}`),
  ...(draft.tool_follow_up ? [`tool_follow_up:${draft.tool_follow_up}`] : []),
  ...(draft.pain_follow_up ? [`pain_follow_up:${draft.pain_follow_up}`] : []),
  ...(draft.time_burden ? [`time_burden:${draft.time_burden}`] : []),
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

export const submitSurvey = (
  distributionId: string,
  draft: SurveyDraft,
  {
    turnstileToken,
    honeypot,
  }: {
    turnstileToken: string;
    honeypot: string;
  },
) => {
  const started = Date.parse(draft.started_at);
  const completionSeconds = Number.isFinite(started)
    ? Math.max(0, Math.floor((Date.now() - started) / 1000))
    : 0;

  return fetch("/api/check-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      distribution_id: distributionId,
      audience: draft.audience,
      activity_context: draft.activity_context,
      tools: draft.tools,
      connectivity: draft.connectivity,
      primary_hassle: draft.primary_hassle,
      tool_follow_up: draft.tool_follow_up || null,
      pain_follow_up: draft.pain_follow_up || null,
      time_burden: draft.time_burden || null,
      spend_band: draft.spend_band,
      concept_interest: draft.concept_interest,
      questions_shown: buildQuestionPlan(draft),
      started_at: draft.started_at,
      completion_seconds: completionSeconds,
      comment: draft.comment,
      turnstile_token: turnstileToken,
      website: honeypot,
    }),
  }).then((response) =>
    readJson<{
      accepted: boolean;
      response_id: string;
      form_id: string;
      form_version: number;
      distribution_id: string;
    }>(response),
  );
};

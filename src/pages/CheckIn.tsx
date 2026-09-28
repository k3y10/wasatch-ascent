import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mountain,
  Radio,
  ShieldCheck,
  Signal,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  activityOptionsFor,
  buildQuestionPlan,
  FORM_VERSION,
  newSurveyDraft,
  normalizeDistribution,
  spendOptionsFor,
  submitSurvey,
  toolFollowUpKind,
  type QuestionId,
  type SurveyDraft,
} from "@/lib/checkin";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";

const optionSets = {
  audience: [
    ["recreation", "Recreation"],
    ["work", "Work / field operations"],
    ["both", "Both"],
  ],
  tools: [
    ["phone_apps", "Phone / outdoor apps"],
    ["radio", "Radio"],
    ["gps_watch", "GPS / watch"],
    ["satellite", "Satellite device"],
    ["paper_notes", "Paper map / notes"],
    ["camera", "Camera / photos"],
    ["other", "Other"],
  ],
  connectivity: [
    ["often", "Often"],
    ["sometimes", "Sometimes"],
    ["rarely", "Rarely"],
    ["never", "Never"],
  ],
  primary_hassle: [
    ["losing_service", "Losing cell service"],
    ["locations", "Keeping track of locations"],
    ["recording", "Recording what happened"],
    ["updating_others", "Keeping other people updated"],
    ["switching_apps", "Switching between tools"],
    ["finding_later", "Finding information later"],
    ["nothing_major", "Nothing major"],
    ["other", "Something else"],
  ],
  time_burden: [
    ["under_15m", "Under 15 minutes"],
    ["15_30m", "15–30 minutes"],
    ["30_60m", "30–60 minutes"],
    ["1_2h", "1–2 hours"],
    ["2h_plus", "More than 2 hours"],
    ["not_sure", "Not sure"],
  ],
  concept_interest: [
    ["definitely", "Definitely"],
    ["would_try", "I'd try it"],
    ["maybe", "Maybe"],
    ["probably_not", "Probably not"],
  ],
} as const;

const radioFollowUp = [
  ["radio_only", "It mostly stays on the radio"],
  ["written_down", "Someone writes it down"],
  ["manual_entry", "Someone enters it into a system"],
  ["recorded_system", "It is already captured / recorded"],
  ["mixed", "A mix of those"],
  ["not_sure", "Not sure"],
] as const;

const satelliteFollowUp = [
  ["messaging", "Messaging"],
  ["tracking", "Location tracking"],
  ["sos", "SOS / emergency"],
  ["weather", "Weather"],
  ["mixed", "A mix of these"],
  ["other", "Something else"],
] as const;

const painOptions = {
  losing_service: [
    ["communicate", "Communicating"],
    ["navigate", "Navigating / maps"],
    ["capture", "Recording information"],
    ["sync", "Syncing or sharing data"],
    ["coordinate", "Coordinating people"],
    ["other", "Something else"],
  ],
  locations: [
    ["own_position", "My own position / route"],
    ["team_positions", "Other people's positions"],
    ["incidents", "Incidents / hazards"],
    ["observations", "Observations / photos"],
    ["history", "Past locations later"],
    ["other", "Something else"],
  ],
  recording: [
    ["notes_app", "Notes / an app"],
    ["paper", "Paper / field notebook"],
    ["photos", "Photos"],
    ["radio_only", "Mostly stays in conversation / radio"],
    ["multiple_places", "Several different places"],
    ["nowhere_consistent", "There is no consistent place"],
  ],
  updating_others: [
    ["radio", "Radio"],
    ["text", "Text / SMS"],
    ["group_app", "Group or team app"],
    ["call", "Phone call"],
    ["in_person", "In-person briefing"],
    ["mixed", "A mix of these"],
  ],
  switching_apps: [
    ["two", "2 tools"],
    ["three_four", "3–4 tools"],
    ["five_six", "5–6 tools"],
    ["seven_plus", "7+ tools"],
  ],
  finding_later: [
    ["difficult", "Usually difficult"],
    ["inconsistent", "Hit or miss"],
    ["okay", "Usually manageable"],
    ["easy", "Usually easy"],
  ],
  other: [
    ["communication", "Communication"],
    ["navigation", "Navigation / location"],
    ["documentation", "Documentation"],
    ["coordination", "Coordination"],
    ["handoff", "Handoffs / reporting"],
    ["other", "Something else"],
  ],
} as const;

type Option = readonly [string, string];

type Question = {
  key: QuestionId;
  eyebrow: string;
  title: string;
  detail: string;
  options: readonly Option[];
  multi?: boolean;
};

const painQuestion = (draft: SurveyDraft): Question => {
  const key = draft.primary_hassle as keyof typeof painOptions;
  const options = painOptions[key] ?? painOptions.other;
  const titles: Partial<Record<keyof typeof painOptions, string>> = {
    losing_service: "When coverage drops, what becomes hardest?",
    locations: "What is hardest to keep track of?",
    recording: "Where do useful observations usually end up?",
    updating_others: "How are updates usually passed along?",
    switching_apps: "How many tools do you typically move between?",
    finding_later: "How easy is it to find that information again later?",
    other: "Which part is closest to the problem?",
  };

  return {
    key: "pain_follow_up",
    eyebrow: "One level deeper",
    title: titles[key] ?? titles.other ?? "What creates the friction?",
    detail: "This helps us understand the workflow behind the answer you just gave.",
    options,
  };
};

const questionFor = (key: QuestionId, draft: SurveyDraft): Question => {
  switch (key) {
    case "audience":
      return {
        key,
        eyebrow: "Start here",
        title: "What brings you outside most?",
        detail: "We'll use this to ask only the questions that fit what you actually do.",
        options: optionSets.audience,
      };
    case "activity_context":
      return {
        key,
        eyebrow: "Your context",
        title:
          draft.audience === "work"
            ? "What kind of field work best matches you?"
            : draft.audience === "both"
              ? "Which setting best represents the mix you do?"
              : "What kind of time outside are you thinking about most?",
        detail: "Pick the closest match. It does not have to describe everything you do.",
        options: activityOptionsFor(draft.audience),
      };
    case "tools":
      return {
        key,
        eyebrow: "Your setup",
        title: "Which tools do you regularly rely on?",
        detail: "Choose all that apply. We'll only follow up on the ones that matter.",
        options: optionSets.tools,
        multi: true,
      };
    case "connectivity":
      return {
        key,
        eyebrow: "Connectivity",
        title: "How often are you somewhere with weak or no cell service?",
        detail: "Think about a normal season or work cycle, not just your most remote day.",
        options: optionSets.connectivity,
      };
    case "primary_hassle":
      return {
        key,
        eyebrow: "The friction",
        title: "What creates the most hassle for you?",
        detail: "Choose the one problem that costs the most time, attention, or effort.",
        options: optionSets.primary_hassle,
      };
    case "tool_follow_up":
      return toolFollowUpKind(draft) === "radio"
        ? {
            key,
            eyebrow: "Radio workflow",
            title: "After useful information is said over the radio, what usually happens to it?",
            detail: "We're trying to understand what happens after the transmission.",
            options: radioFollowUp,
          }
        : {
            key,
            eyebrow: "Satellite workflow",
            title: "What do you mainly use your satellite device for?",
            detail: "Choose the closest match.",
            options: satelliteFollowUp,
          };
    case "pain_follow_up":
      return painQuestion(draft);
    case "time_burden":
      return {
        key,
        eyebrow: "Current workload",
        title:
          "On a typical field day or shift, how much time goes into organizing, transferring, documenting, or reporting field information?",
        detail: "Estimate the current workload, not what you hope it could become.",
        options: optionSets.time_burden,
      };
    case "spend_band":
      return {
        key,
        eyebrow: "What you already use",
        title:
          draft.audience === "recreation"
            ? "About how much do you spend each year on outdoor apps, navigation, communication, or similar tools?"
            : "About how much does your team spend each year on communication, mapping, reporting, or field tools?",
        detail: "We're measuring today's cost — not asking what you would pay for TerraSatch.",
        options: spendOptionsFor(draft.audience),
      };
    case "concept_interest":
      return {
        key,
        eyebrow: "Last one",
        title: "Would this be useful in the way you work outside?",
        detail:
          "Imagine your communications, locations, photos, and observations automatically becoming organized notes, maps, timelines, and reports.",
        options: optionSets.concept_interest,
      };
  }
};

const StepOptions = ({
  options,
  value,
  multi,
  onChange,
}: {
  options: readonly Option[];
  value: string | string[];
  multi?: boolean;
  onChange: (value: string) => void;
}) => {
  const selected = (optionValue: string) =>
    Array.isArray(value) ? value.includes(optionValue) : value === optionValue;

  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {options.map(([optionValue, label]) => (
        <button
          key={optionValue}
          type="button"
          aria-pressed={selected(optionValue)}
          onClick={() => onChange(optionValue)}
          className={[
            "min-h-14 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition",
            selected(optionValue)
              ? "border-[#ef8611] bg-[#fff3e1] text-[#171717] shadow-sm"
              : "border-black/10 bg-white text-[#252525] hover:border-[#ef8611]/60 hover:bg-[#fffaf4]",
          ].join(" ")}
        >
          <span className="flex items-center justify-between gap-3">
            {label}
            {selected(optionValue) ? <CheckCircle2 className="size-4 text-[#df7600]" /> : null}
          </span>
          {multi ? <span className="sr-only">Toggle selection</span> : null}
        </button>
      ))}
    </div>
  );
};

const resolveTurnstileSiteKey = () => {
  const configured = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined)?.trim();
  if (configured) return configured;
  if (typeof window === "undefined") return "";
  const hostname = window.location.hostname;
  const preview =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".vercel.app");
  return preview ? TURNSTILE_TEST_SITE_KEY : "";
};

const Turnstile = ({
  onToken,
  resetSignal,
}: {
  onToken: (token: string) => void;
  resetSignal: number;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);
  const [ready, setReady] = useState(Boolean(window.turnstile));
  const siteKey = resolveTurnstileSiteKey();

  useEffect(() => {
    if (window.turnstile) {
      setReady(true);
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-terrasatch-turnstile="true"]',
    );
    const loaded = () => setReady(true);

    if (existing) {
      existing.addEventListener("load", loaded);
      return () => existing.removeEventListener("load", loaded);
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.dataset.terrasatchTurnstile = "true";
    script.addEventListener("load", loaded);
    document.head.appendChild(script);

    return () => script.removeEventListener("load", loaded);
  }, []);

  useEffect(() => {
    if (!ready || !siteKey || !containerRef.current || widgetId.current) return;
    widgetId.current =
      window.turnstile?.render(containerRef.current, {
        sitekey: siteKey,
        theme: "light",
        size: "flexible",
        appearance: "interaction-only",
        callback: (token: string) => onToken(token),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      }) ?? null;
  }, [onToken, ready, siteKey]);

  useEffect(() => {
    if (resetSignal > 0 && widgetId.current) {
      window.turnstile?.reset(widgetId.current);
    }
  }, [resetSignal]);

  if (!siteKey) {
    return (
      <p className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
        Human verification is not configured for this environment yet.
      </p>
    );
  }

  return <div ref={containerRef} className="min-h-1" aria-label="Human verification" />;
};

const CheckIn = () => {
  const [params] = useSearchParams();
  const distributionId = useMemo(
    () => normalizeDistribution(params.get("d") ?? params.get("src")),
    [params],
  );
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<SurveyDraft>(() => newSurveyDraft());
  const [pending, setPending] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [website, setWebsite] = useState("");

  const plan = useMemo(() => buildQuestionPlan(draft), [draft]);
  const safeStep = Math.min(step, Math.max(plan.length - 1, 0));
  const currentKey = plan[safeStep];
  const current = questionFor(currentKey, draft);
  const progress = Math.round(((safeStep + 1) / plan.length) * 100);

  useEffect(() => {
    if (step >= plan.length) setStep(Math.max(0, plan.length - 1));
  }, [plan.length, step]);

  const currentValue: string | string[] =
    currentKey === "tools" ? draft.tools : draft[currentKey];

  const answered = Array.isArray(currentValue)
    ? currentValue.length > 0
    : Boolean(currentValue);

  const setCurrent = (value: string) => {
    setDraft((previous) => {
      if (currentKey === "tools") {
        const tools = previous.tools.includes(value)
          ? previous.tools.filter((item) => item !== value)
          : [...previous.tools, value];
        const needsToolFollowUp = tools.includes("radio") || tools.includes("satellite");
        return {
          ...previous,
          tools,
          tool_follow_up: needsToolFollowUp ? previous.tool_follow_up : "",
        };
      }

      const next = { ...previous, [currentKey]: value } as SurveyDraft;
      if (currentKey === "audience") {
        next.activity_context = "";
        next.spend_band = "";
        if (value === "recreation") next.time_burden = "";
      }
      if (currentKey === "primary_hassle") next.pain_follow_up = "";
      return next;
    });
    setError("");
  };

  const back = () => {
    setError("");
    setStep((value) => Math.max(0, value - 1));
  };

  const next = async () => {
    if (!answered) {
      setError(current.multi ? "Choose at least one option to continue." : "Choose one option to continue.");
      return;
    }

    if (safeStep < plan.length - 1) {
      setStep((value) => value + 1);
      return;
    }

    if (!turnstileToken) {
      setError("Complete the human verification before submitting.");
      return;
    }

    setPending(true);
    setError("");
    try {
      await submitSurvey(distributionId, draft, {
        turnstileToken,
        honeypot: website,
      });
      setComplete(true);
    } catch (submitError) {
      setTurnstileToken("");
      setTurnstileReset((value) => value + 1);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit the check-in.",
      );
    } finally {
      setPending(false);
    }
  };

  const segmentLabel =
    draft.audience === "work"
      ? "Field operations"
      : draft.audience === "both"
        ? "Recreation + field work"
        : draft.audience === "recreation"
          ? "Outdoor recreation"
          : "Adaptive check-in";

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#171717]">
      <div
        className="pointer-events-none fixed inset-0 opacity-70"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 12%, rgba(239,134,17,.10), transparent 20%), repeating-radial-gradient(ellipse at 88% -8%, transparent 0 44px, rgba(239,134,17,.045) 45px 46px)",
        }}
      />

      <div className="relative mx-auto min-h-screen w-full max-w-4xl px-5 py-6 sm:px-8 sm:py-8">
        <header className="flex items-center justify-between gap-4 border-b border-black/10 pb-5">
          <Link to="/" className="group flex items-center gap-3" aria-label="TerraSatch home">
            <span className="h-9 w-1 rounded-full bg-[#ef8611] transition group-hover:h-11" aria-hidden="true" />
            <div>
              <p className="font-display text-xl font-bold tracking-[0.11em] sm:text-2xl">
                TERRASATCH
              </p>
              <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-black/50 sm:text-[9px]">
                Listen · Watch · Learn · Adapt
              </p>
            </div>
          </Link>
          <span className="rounded-full border border-[#ef8611]/35 bg-white/75 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-black/55 sm:text-[10px]">
            About 60 seconds
          </span>
        </header>

        <div className="py-9 sm:py-14">
          <div className="mb-5 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#cf6900]">
              Outdoor & field customer discovery
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">
              A few questions that adapt to what you actually do outside.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-black/55 sm:text-base">
              No account, name, or email. We ask different follow-ups based on your answers so the questions stay relevant.
            </p>
          </div>

          <section className="overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_24px_70px_rgba(25,20,12,.09)]">
            <div className="h-1.5 bg-[#ef8611]" />

            {complete ? (
              <div className="p-7 sm:p-11">
                <div className="flex size-12 items-center justify-center rounded-full bg-[#fff0dc] text-[#dc7200]">
                  <CheckCircle2 className="size-6" />
                </div>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#cf6900]">
                  Complete
                </p>
                <h2 className="mt-2 max-w-xl font-display text-4xl font-bold leading-tight sm:text-5xl">
                  Thanks — that's exactly the kind of feedback we need.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/60">
                  Your response was saved anonymously. We use these answers in aggregate to understand real outdoor and field workflows, current friction, connectivity, time, and existing tool costs.
                </p>
                <Button asChild className="mt-7 bg-[#171717] text-white hover:bg-black">
                  <Link to="/">Back to TerraSatch</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#171717] px-5 py-4 text-white sm:px-7">
                  <div className="flex items-center gap-2.5">
                    {safeStep < 2 ? (
                      <Mountain className="size-4 text-[#f5a542]" />
                    ) : safeStep < 5 ? (
                      <Radio className="size-4 text-[#f5a542]" />
                    ) : (
                      <Signal className="size-4 text-[#f5a542]" />
                    )}
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
                        {segmentLabel}
                      </p>
                      <p className="text-xs font-semibold text-white/85">
                        Question {safeStep + 1} of {plan.length}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
                    {progress}% complete
                  </span>
                </div>

                <div className="h-1 bg-black/5">
                  <div
                    className="h-full bg-[#ef8611] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="p-6 sm:p-8 lg:p-10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#cf6900]">
                    {current.eyebrow}
                  </p>
                  <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-[1.04] sm:text-4xl">
                    {current.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/55">
                    {current.detail}
                  </p>

                  <div className="mt-7">
                    <StepOptions
                      options={current.options}
                      value={currentValue}
                      multi={current.multi}
                      onChange={setCurrent}
                    />
                  </div>

                  {currentKey === "concept_interest" ? (
                    <div className="mt-7 space-y-5 border-t border-black/10 pt-6">
                      <div>
                        <label htmlFor="feedback-comment" className="text-sm font-semibold text-black/75">
                          Anything you wish your outdoor or field tools did better?{" "}
                          <span className="font-normal text-black/40">Optional</span>
                        </label>
                        <Textarea
                          id="feedback-comment"
                          value={draft.comment}
                          onChange={(event) =>
                            setDraft((previous) => ({
                              ...previous,
                              comment: event.target.value.slice(0, 1000),
                            }))
                          }
                          className="mt-2 min-h-24 border-black/15 bg-[#fbfaf7] text-black"
                          placeholder="A sentence is plenty."
                        />
                      </div>

                      <div className="relative h-0 overflow-hidden" aria-hidden="true">
                        <label htmlFor="feedback-website">Website</label>
                        <input
                          id="feedback-website"
                          name="website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={website}
                          onChange={(event) => setWebsite(event.target.value)}
                        />
                      </div>

                      <div className="rounded-2xl border border-black/10 bg-[#faf8f3] p-4">
                        <div className="mb-3 flex items-start gap-3">
                          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#cf6900]" />
                          <div>
                            <p className="text-sm font-semibold">Spam protection</p>
                            <p className="mt-1 text-xs leading-relaxed text-black/50">
                              Human verification protects the discovery data without asking for personal information.
                            </p>
                          </div>
                        </div>
                        <Turnstile onToken={setTurnstileToken} resetSignal={turnstileReset} />
                      </div>
                    </div>
                  ) : null}

                  {error ? (
                    <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                      {error}
                    </p>
                  ) : null}

                  <div className="mt-8 flex items-center justify-between gap-3 border-t border-black/10 pt-5">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={back}
                      disabled={safeStep === 0 || pending}
                      className="text-black/55"
                    >
                      <ArrowLeft data-icon="inline-start" /> Back
                    </Button>
                    <Button
                      type="button"
                      onClick={next}
                      disabled={pending}
                      className="bg-[#ef8611] text-black hover:bg-[#ff9b2b]"
                    >
                      {currentKey === "concept_interest"
                        ? pending
                          ? "Submitting…"
                          : "Submit check-in"
                        : "Continue"}
                      {!pending ? <ArrowRight data-icon="inline-end" /> : null}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </section>

          <div className="mt-5 flex flex-col gap-2 text-xs text-black/45 sm:flex-row sm:items-center sm:justify-between">
            <span>Anonymous by default · no account required</span>
            <span>TerraSatch · Turn field information into finished work.</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckIn;

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Mountain, Radio, Signal } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { normalizeSource, spendOptionsFor, submitSurvey, type SurveyDraft } from "@/lib/checkin";

const initialDraft: SurveyDraft = {
  audience: "",
  primary_tool: "",
  primary_hassle: "",
  connectivity: "",
  spend_band: "",
  concept_interest: "",
  comment: "",
};

const optionSets = {
  audience: [
    ["recreation", "Recreation"],
    ["work", "Work / field operations"],
    ["both", "Both"],
  ],
  primary_tool: [
    ["phone_apps", "Phone / outdoor apps"],
    ["radio", "Radio"],
    ["gps_watch", "GPS / watch"],
    ["satellite", "Satellite device"],
    ["paper_notes", "Paper map / notes"],
    ["other", "Other"],
  ],
  primary_hassle: [
    ["losing_service", "Losing cell service"],
    ["locations", "Keeping track of locations"],
    ["recording", "Recording what happened"],
    ["updating_others", "Keeping other people updated"],
    ["switching_apps", "Switching between apps"],
    ["finding_later", "Finding information later"],
    ["nothing_major", "Nothing major"],
    ["other", "Other"],
  ],
  connectivity: [
    ["often", "Often"],
    ["sometimes", "Sometimes"],
    ["rarely", "Rarely"],
    ["never", "Never"],
  ],
  concept_interest: [
    ["definitely", "Definitely"],
    ["would_try", "I'd try it"],
    ["maybe", "Maybe"],
    ["probably_not", "Probably not"],
  ],
} as const;

const StepOptions = ({
  options,
  value,
  onChange,
}: {
  options: readonly (readonly [string, string])[];
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="grid gap-2.5 sm:grid-cols-2">
    {options.map(([optionValue, label]) => (
      <button
        key={optionValue}
        type="button"
        onClick={() => onChange(optionValue)}
        className={[
          "min-h-14 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition",
          value === optionValue
            ? "border-[#f28c18] bg-[#fff4e5] text-[#171717] shadow-sm"
            : "border-black/10 bg-white text-[#252525] hover:border-[#f28c18]/60 hover:bg-[#fffaf3]",
        ].join(" ")}
      >
        <span className="flex items-center justify-between gap-3">
          {label}
          {value === optionValue ? <CheckCircle2 className="size-4 text-[#e97f08]" /> : null}
        </span>
      </button>
    ))}
  </div>
);

const CheckIn = () => {
  const [params] = useSearchParams();
  const source = useMemo(() => normalizeSource(params.get("src")), [params]);
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<SurveyDraft>(initialDraft);
  const [pending, setPending] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");

  const spendOptions = spendOptionsFor(draft.audience);
  const steps = [
    {
      key: "audience" as const,
      eyebrow: "Start here",
      title: "What brings you outside most?",
      detail: "This keeps the rest of the check-in relevant to you.",
      options: optionSets.audience,
    },
    {
      key: "primary_tool" as const,
      eyebrow: "Your setup",
      title: "What do you rely on most while you're out?",
      detail: "Pick the one you reach for first.",
      options: optionSets.primary_tool,
    },
    {
      key: "primary_hassle" as const,
      eyebrow: "The friction",
      title: "What's the biggest hassle?",
      detail: "Choose the thing that creates the most friction for you.",
      options: optionSets.primary_hassle,
    },
    {
      key: "connectivity" as const,
      eyebrow: "Connectivity",
      title: "How often are you somewhere with weak or no cell service?",
      detail: "Think about a normal season, not just your most remote day.",
      options: optionSets.connectivity,
    },
    {
      key: "spend_band" as const,
      eyebrow: "What you already use",
      title:
        draft.audience === "recreation"
          ? "About how much do you spend each year on outdoor apps, navigation, communication, or similar tools?"
          : "About how much does your team spend each year on communication, mapping, reporting, or field tools?",
      detail: "We're measuring what already exists — not asking what you would pay for TerraSatch.",
      options: spendOptions,
    },
    {
      key: "concept_interest" as const,
      eyebrow: "Last one",
      title: "Would this be useful?",
      detail:
        "Imagine your communications, locations, photos and observations automatically becoming organized notes, maps, timelines and reports.",
      options: optionSets.concept_interest,
    },
  ];

  const current = steps[step];
  const currentValue = draft[current.key];

  const setCurrent = (value: string) => {
    setDraft((previous) => ({ ...previous, [current.key]: value }));
    setError("");
  };

  const back = () => {
    setError("");
    setStep((value) => Math.max(0, value - 1));
  };

  const next = async () => {
    if (!currentValue) {
      setError("Choose one option to continue.");
      return;
    }
    if (step < steps.length - 1) {
      setStep((value) => value + 1);
      return;
    }
    setPending(true);
    setError("");
    try {
      await submitSurvey(source, draft);
      setComplete(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit the check-in.");
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#151515]">
      <div
        className="pointer-events-none fixed inset-0 opacity-60"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(242,140,24,.13), transparent 22%), repeating-radial-gradient(ellipse at 80% 0%, transparent 0 34px, rgba(242,140,24,.055) 35px 36px)",
        }}
      />
      <div className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col px-5 py-7 sm:px-8 sm:py-10">
        <header className="flex items-center justify-between gap-4 border-b border-black/10 pb-5">
          <Link to="/" className="flex items-center gap-3" aria-label="TerraSatch home">
            <img src="/terralisten-sasquatch-listening.webp" alt="" className="size-12 object-contain" />
            <div>
              <p className="font-display text-2xl font-bold tracking-[0.08em]">TERRASATCH</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/55">
                Listen · Watch · Learn · Adapt
              </p>
            </div>
          </Link>
          <span className="hidden rounded-full border border-[#f28c18]/40 bg-white/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-black/60 sm:inline-flex">
            About 1 minute
          </span>
        </header>

        <div className="flex flex-1 items-center py-8 sm:py-12">
          <section className="w-full overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_24px_80px_rgba(28,24,18,.10)]">
            <div className="h-2 bg-[#f28c18]" />
            {complete ? (
              <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_.58fr] lg:items-center">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#d66f00]">Complete</p>
                  <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[.9] sm:text-6xl">
                    You're done. Thanks.
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-black/65">
                    Your check-in was saved without asking for your name or email. It helps TerraSatch understand how information actually moves outside and in field operations.
                  </p>
                  <div className="mt-7 rounded-2xl bg-[#151515] p-6 text-white">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f5a542]">
                      TerraSatch field feedback
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-bold uppercase">
                      Thanks for helping us understand the field.
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      We use these responses in aggregate to understand tools, friction, connectivity and existing spend across outdoor and field work.
                    </p>
                  </div>
                </div>
                <img
                  src="/terralisten-sasquatch-listening.webp"
                  alt="Satchy holding a field radio"
                  className="mx-auto w-full max-w-[250px] object-contain"
                />
              </div>
            ) : (
              <div className="grid lg:grid-cols-[.32fr_.68fr]">
                <aside className="border-b border-black/10 bg-[#171717] p-6 text-white lg:border-b-0 lg:border-r lg:p-8">
                  <div className="flex items-center gap-2 text-[#f5a542]">
                    {step === 0 ? <Mountain className="size-4" /> : step < 3 ? <Radio className="size-4" /> : <Signal className="size-4" />}
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]">60-second check-in</span>
                  </div>
                  <h1 className="mt-5 font-display text-4xl font-bold uppercase leading-[.9]">
                    Outdoor & field check-in<span className="text-[#f28c18]">.</span>
                  </h1>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">
                    Six quick questions about the tools you actually use, what gets annoying, and what could be easier.
                  </p>
                  <div className="mt-8">
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-white/50">
                      <span>Question {step + 1} of 6</span>
                      <span>{Math.round(((step + 1) / 6) * 100)}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[#f28c18] transition-all"
                        style={{ width: `${((step + 1) / 6) * 100}%` }}
                      />
                    </div>
                  </div>
                  <p className="mt-8 text-xs leading-relaxed text-white/45">
                    Anonymous by default. No name or email is requested.
                  </p>
                </aside>

                <div className="p-6 sm:p-9 lg:p-10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d66f00]">{current.eyebrow}</p>
                  <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-[1.02] sm:text-4xl">{current.title}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/55">{current.detail}</p>
                  <div className="mt-7">
                    <StepOptions options={current.options} value={currentValue} onChange={setCurrent} />
                  </div>
                  {step === 5 ? (
                    <div className="mt-6">
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
                  ) : null}
                  {error ? <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
                  <div className="mt-8 flex items-center justify-between gap-3 border-t border-black/10 pt-5">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={back}
                      disabled={step === 0 || pending}
                      className="text-black/60"
                    >
                      <ArrowLeft data-icon="inline-start" /> Back
                    </Button>
                    <Button
                      type="button"
                      onClick={next}
                      disabled={pending}
                      className="bg-[#f28c18] text-black hover:bg-[#ff9d2e]"
                    >
                      {step === 5 ? (pending ? "Submitting…" : "Submit check-in") : "Continue"}
                      {!pending ? <ArrowRight data-icon="inline-end" /> : null}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        <footer className="flex flex-col gap-2 border-t border-black/10 pt-5 text-xs text-black/45 sm:flex-row sm:items-center sm:justify-between">
          <span>TerraSatch · Turn field information into finished work.</span>
          <span className="font-mono uppercase tracking-[0.12em]">Source: {source}</span>
        </footer>
      </div>
    </main>
  );
};

export default CheckIn;

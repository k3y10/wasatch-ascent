import { FormEvent, useState } from "react";
import {
  BrainCircuit,
  CheckCircle2,
  Eye,
  Gauge,
  LoaderCircle,
  Radio,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitInquiry } from "@/lib/inquiry";

const pilotLimits = [
  "One small team with up to five participants",
  "14 calendar days / two working weeks with guided onboarding",
  "One real workflow using radio, mobile, or already-supported integrations",
  "A Satchy findings summary with observed friction and estimated staff-time opportunity",
  "No custom provider engineering or production SLA during the evaluation",
];

const discoveryStages = [
  {
    title: "Listen",
    detail: "Connect the approved signals, messages, observations, and records needed to understand one real workflow.",
    icon: Radio,
  },
  {
    title: "Watch",
    detail: "Observe how work moves between people and systems: handoffs, waiting, repeated entry, missing context, and review steps.",
    icon: Eye,
  },
  {
    title: "Learn",
    detail: "Satchy groups recurring patterns and ties findings back to the source record instead of inventing a generic efficiency score.",
    icon: BrainCircuit,
  },
  {
    title: "Adapt",
    detail: "Review the findings with your team, estimate staff-time opportunity, and decide what should be simplified, automated, or left human-controlled.",
    icon: Gauge,
  },
];

const PilotSection = () => {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [pilot, setPilot] = useState({
    name: "",
    email: "",
    organization: "",
    industry: "",
    workflow: "",
    website: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!pilot.name || !pilot.email || !pilot.organization || !pilot.industry) {
      toast.error("Complete the required evaluation fields.");
      return;
    }

    setPending(true);
    try {
      const { result } = await submitInquiry({
        mode: "pilot",
        scope:
          "free 14-day Satchy evaluation; one small team; one real workflow; guided onboarding; radio, mobile, and supported integrations where configured; workflow-friction findings and estimated staff-time opportunity; no custom provider engineering or production SLA",
        ...pilot,
      });
      if (result.fallbackMailto) {
        toast("Opening your email app so the founder still receives the inquiry.");
        window.location.assign(result.fallbackMailto);
        return;
      }
      if (!result.ok) throw new Error(result.error || "Unable to submit inquiry.");
      toast.success("14-day Satchy evaluation request sent to Keaton.");
      setSent(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit evaluation request.");
    } finally {
      setPending(false);
    }
  };

  return (
    <section id="pilot" className="content-auto relative scroll-mt-24 overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-terrain-deep to-background" />
      <div className="absolute inset-0 topo-overlay opacity-35" />
      <div className="container relative mx-auto px-6">
        <div className="grid gap-14 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
          <div>
            <div className="flex size-12 items-center justify-center rounded-full border border-primary/45 bg-primary/10">
              <Radio className="size-6 text-primary" aria-hidden="true" />
            </div>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              14-day Satchy evaluation · no card required
            </p>
            <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-none lg:text-6xl">
              Deploy Satchy into one workflow<span className="text-primary">.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-frost-dim">
              Two working weeks is enough time to connect one approved workflow, let Satchy observe how information actually moves, and return evidence-backed opportunities to reduce repeated work, handoff delay, context loss, and reporting friction.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              The goal is workflow improvement, not employee scoring. Your team reviews the findings and decides what changes, what stays manual, and what requires human approval.
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {pilotLimits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {sent ? (
            <div className="flex min-h-80 flex-col items-center justify-center gap-4 border-y border-primary/30 py-10 text-center" role="status">
              <CheckCircle2 className="size-9 text-primary" aria-hidden="true" />
              <h3 className="font-display text-3xl font-bold uppercase">Evaluation request received</h3>
              <p className="text-sm text-muted-foreground">Keaton will review the workflow and follow up directly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border-y border-primary/30 py-8">
              <FieldGroup>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="pilot-name">Name *</FieldLabel>
                    <Input id="pilot-name" autoComplete="name" value={pilot.name} onChange={(event) => setPilot({ ...pilot, name: event.target.value })} required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="pilot-email">Work email *</FieldLabel>
                    <Input id="pilot-email" type="email" autoComplete="email" value={pilot.email} onChange={(event) => setPilot({ ...pilot, email: event.target.value })} required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="pilot-org">Organization *</FieldLabel>
                    <Input id="pilot-org" autoComplete="organization" value={pilot.organization} onChange={(event) => setPilot({ ...pilot, organization: event.target.value })} required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="pilot-industry">Industry / operation *</FieldLabel>
                    <Input id="pilot-industry" value={pilot.industry} onChange={(event) => setPilot({ ...pilot, industry: event.target.value })} placeholder="Resort, utility, field service..." required />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="pilot-workflow">What single workflow should Satchy evaluate?</FieldLabel>
                  <Textarea
                    id="pilot-workflow"
                    value={pilot.workflow}
                    onChange={(event) => setPilot({ ...pilot, workflow: event.target.value })}
                    placeholder="For example: turn patrol calls, map updates, and end-of-shift notes into one reviewed incident record without duplicate entry."
                  />
                </Field>
                <input className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" value={pilot.website} onChange={(event) => setPilot({ ...pilot, website: event.target.value })} />
                <Button type="submit" size="lg" disabled={pending}>
                  {pending ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : <Send data-icon="inline-start" />}
                  {pending ? "Sending request..." : "Start the 14-day Satchy evaluation"}
                </Button>
              </FieldGroup>
            </form>
          )}
        </div>

        <div className="mt-14 grid border-y border-border/70 md:grid-cols-2 xl:grid-cols-4">
          {discoveryStages.map(({ title, detail, icon: Icon }, index) => (
            <article
              key={title}
              className="border-b border-border/70 py-7 md:px-7 md:odd:border-r xl:border-b-0 xl:border-r xl:odd:border-r xl:first:pl-0 xl:last:border-r-0 xl:last:pr-0"
            >
              <div className="flex items-center justify-between gap-4">
                <Icon className="size-6 text-primary" aria-hidden="true" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-primary/70">0{index + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold uppercase">
                {title}<span className="text-primary">.</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PilotSection;

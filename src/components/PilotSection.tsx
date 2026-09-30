import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, Radio, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitInquiry } from "@/lib/inquiry";

const pilotLimits = [
  "Day 1–2: map the current workflow and agree on what success looks like",
  "Days 3–12: run one real workflow with approved inputs and supported connections",
  "Measure repeated steps, handoffs, processing time, and where context gets lost",
  "Finish with a Discovery Report: findings, estimated impact, and recommended next steps",
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
      toast.error("Complete the required discovery fields.");
      return;
    }

    setPending(true);
    try {
      const { result } = await submitInquiry({
        mode: "pilot",
        scope: "14-day Discovery Phase; one scoped workflow; baseline and success criteria; approved inputs and supported connections; measure repeated steps, handoffs, processing time, and potential cost impact; final Discovery Report and rollout recommendation; no custom provider engineering or production SLA",
        ...pilot,
      });
      if (result.fallbackMailto) {
        toast("Your request has not been sent. Send the draft in your email app to contact Keaton.");
        window.location.assign(result.fallbackMailto);
        return;
      }
      if (!result.ok) throw new Error(result.error || "Unable to submit inquiry.");
      toast.success("Discovery request sent to Keaton.");
      setSent(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit discovery request.");
    } finally {
      setPending(false);
    }
  };

  return (
    <section id="pilot" className="content-auto relative scroll-mt-24 overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-terrain-deep to-background" />
      <div className="absolute inset-0 topo-overlay opacity-35" />
      <div className="container relative mx-auto grid gap-14 px-6 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
        <div>
          <div className="flex size-12 items-center justify-center rounded-full border border-primary/45 bg-primary/10">
            <Radio className="size-6 text-primary" aria-hidden="true" />
          </div>
          <h2 className="mt-6 font-display text-5xl font-bold uppercase leading-none lg:text-6xl">
            Start with a 14-day Discovery Phase<span className="text-primary">.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-frost-dim">
            The first 14 days are not a generic free trial. We use them to understand how you work today, map one
            real workflow, establish a baseline, and connect the approved inputs that matter. Then we measure where
            Satchy reduces repeated work, missing context, and unnecessary handoffs.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            At the end, you receive a Discovery Report with what changed, estimated time and cost impact, gaps we found,
            recommended integrations, and a practical rollout path. Continue into a paid plan only if the findings justify it.
            Savings are measured with you and are not guaranteed.
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
            <h3 className="font-display text-3xl font-bold uppercase">Discovery request received</h3>
            <p className="text-sm text-muted-foreground">Keaton will confirm the workflow, success measures, scope, and start date with you.</p>
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
                <FieldLabel htmlFor="pilot-workflow">Which workflow should the Discovery Phase focus on?</FieldLabel>
                <Textarea id="pilot-workflow" value={pilot.workflow} onChange={(event) => setPilot({ ...pilot, workflow: event.target.value })} placeholder="For example: turn calls, copied notes, and three separate updates into one reviewed record." />
              </Field>
              <input className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" value={pilot.website} onChange={(event) => setPilot({ ...pilot, website: event.target.value })} />
              <Button type="submit" size="lg" disabled={pending}>
                {pending ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : <Send data-icon="inline-start" />}
                {pending ? "Sending request..." : "Request a 14-day Discovery Phase"}
              </Button>
            </FieldGroup>
          </form>
        )}
      </div>
    </section>
  );
};

export default PilotSection;


import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, Send, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackFunnelEvent } from "@/lib/funnel-analytics";
import { submitInquiry } from "@/lib/inquiry";

const evaluationSteps = [
  ["Tell us one workflow", "Share the operational problem you want to evaluate."],
  ["Review a controlled test", "Use approved sample data with the people who know the workflow."],
  ["Decide what is worth keeping", "Scope a rollout only if the evaluation produces clear value."],
];

const PilotSection = () => {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [pilot, setPilot] = useState({
    name: "",
    email: "",
    organization: "",
    workflow: "",
    website: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!pilot.name || !pilot.email || !pilot.organization || !pilot.workflow) {
      toast.error("Complete the required exploration fields.");
      return;
    }

    setPending(true);
    try {
      const { result } = await submitInquiry({
        mode: "pilot",
        scope: "Free 30-day exploration; one small team; one workflow; approved sample data; no custom integration or production SLA",
        ...pilot,
      });
      if (result.fallbackMailto) {
        toast("Opening your email app so the founder still receives the inquiry.");
        window.location.assign(result.fallbackMailto);
        return;
      }
      if (!result.ok) throw new Error(result.error || "Unable to submit inquiry.");
      trackFunnelEvent({ stage: "convert", action: "exploration-request-submitted", source: "exploration-form" });
      toast.success("Exploration request sent to Keaton.");
      setSent(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit exploration request.");
    } finally {
      setPending(false);
    }
  };

  return (
    <section id="pilot" className="content-auto relative scroll-mt-24 overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-terrain-deep to-background" />
      <div className="absolute inset-0 topo-overlay opacity-30" />

      <div className="container relative mx-auto grid gap-12 px-6 xl:grid-cols-[0.8fr_1.2fr] xl:items-start">
        <div className="max-w-xl">
          <div className="flex size-12 items-center justify-center rounded-full border border-primary/45 bg-primary/10">
            <Users className="size-6 text-primary" aria-hidden="true" />
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">For operational teams</p>
          <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-none lg:text-6xl">
            Explore TerraSatch with your team<span className="text-primary">.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-frost-dim">
            This is not an account signup. It is a no-cost, 30-day evaluation of one real workflow using approved sample data.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            TerraListen and Satchy can build context around the terminology, locations, and workflow your organization chooses to provide. Your team reviews the result and decides whether it is useful.
          </p>

          <div className="mt-8 border-y border-border/70">
            {evaluationSteps.map(([title, detail], index) => (
              <div key={title} className="grid grid-cols-[2.25rem_1fr] gap-4 border-b border-border/70 py-4 last:border-b-0">
                <span className="font-mono text-[10px] tracking-[0.18em] text-primary">0{index + 1}</span>
                <div>
                  <p className="font-display text-base font-bold uppercase">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">
            One team · one workflow · approved sample data · no production commitment
          </p>
        </div>

        {sent ? (
          <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-xl border border-primary/30 bg-background/70 p-8 text-center" role="status">
            <CheckCircle2 className="size-9 text-primary" aria-hidden="true" />
            <h3 className="font-display text-3xl font-bold uppercase">Exploration request received</h3>
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
              Keaton will review the workflow and follow up directly about the most useful next step.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-xl border border-primary/30 bg-background/75 p-5 shadow-[var(--shadow-elevated)] sm:p-7">
            <div className="mb-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Free 30-day exploration</p>
              <h3 className="mt-2 font-display text-3xl font-bold uppercase">Tell us what you want to evaluate</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                We review each request manually. No credit card, software account, or production commitment is required.
              </p>
            </div>

            <FieldGroup>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="pilot-name">Name *</FieldLabel>
                  <Input
                    id="pilot-name"
                    autoComplete="name"
                    value={pilot.name}
                    onChange={(event) => setPilot({ ...pilot, name: event.target.value })}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="pilot-email">Work email *</FieldLabel>
                  <Input
                    id="pilot-email"
                    type="email"
                    autoComplete="email"
                    value={pilot.email}
                    onChange={(event) => setPilot({ ...pilot, email: event.target.value })}
                    required
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="pilot-org">Organization *</FieldLabel>
                <Input
                  id="pilot-org"
                  autoComplete="organization"
                  value={pilot.organization}
                  onChange={(event) => setPilot({ ...pilot, organization: event.target.value })}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="pilot-workflow">What would you like to evaluate? *</FieldLabel>
                <Textarea
                  id="pilot-workflow"
                  value={pilot.workflow}
                  onChange={(event) => setPilot({ ...pilot, workflow: event.target.value })}
                  placeholder="For example: turn patrol radio observations into a searchable incident timeline and shift handoff."
                  className="min-h-28"
                  required
                />
                <FieldDescription>Keep it simple. One workflow or operational problem is enough to start.</FieldDescription>
              </Field>

              <input
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={pilot.website}
                onChange={(event) => setPilot({ ...pilot, website: event.target.value })}
              />

              <Button type="submit" size="lg" className="w-full" disabled={pending}>
                {pending ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : <Send data-icon="inline-start" />}
                {pending ? "Sending request..." : "Request free exploration"}
              </Button>
            </FieldGroup>
          </form>
        )}
      </div>
    </section>
  );
};

export default PilotSection;

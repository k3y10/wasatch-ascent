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
  ["Tell us the workflow", "Share one real operational problem you want to test."],
  ["We set up a controlled evaluation", "Use approved sample data and the context your organization chooses to provide."],
  ["You review the result", "Only discuss rollout if the workflow proves useful."],
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
      toast.error("Complete the required evaluation fields.");
      return;
    }

    setPending(true);
    try {
      const { result } = await submitInquiry({
        mode: "pilot",
        scope: "Free 30-day evaluation; one individual or small team; one workflow; approved sample data; no custom integration or production SLA",
        ...pilot,
      });
      if (result.fallbackMailto) {
        toast("Opening your email app so the founder still receives the request.");
        window.location.assign(result.fallbackMailto);
        return;
      }
      if (!result.ok) throw new Error(result.error || "Unable to submit request.");
      trackFunnelEvent({ stage: "convert", action: "evaluation-request-submitted", source: "evaluation-form" });
      toast.success("Evaluation request sent to Keaton.");
      setSent(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit evaluation request.");
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
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Free 30-day evaluation</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
            Evaluate TerraSatch in your field<span className="text-primary">.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-frost-dim">
            This is not an account signup. Choose one real workflow and evaluate whether TerraListen and Satchy make the information easier to capture, connect, and review.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The evaluation uses approved sample data and the field context you choose to provide. You stay in control of what is tested and whether anything moves forward.
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
            One person or crew · one workflow · approved sample data · no production commitment
          </p>
        </div>

        {sent ? (
          <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-xl border border-primary/30 bg-background/70 p-8 text-center" role="status">
            <CheckCircle2 className="size-9 text-primary" aria-hidden="true" />
            <h3 className="font-display text-3xl font-bold uppercase">Evaluation request received</h3>
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
              Keaton will review the workflow and follow up directly about the most useful next step.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-xl border border-primary/30 bg-background/75 p-5 shadow-[var(--shadow-elevated)] sm:p-7">
            <div className="mb-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Request an evaluation</p>
              <h3 className="mt-2 font-display text-3xl font-bold uppercase">Tell us what you want to test</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                No credit card, software account, or production commitment is required.
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
                  <FieldLabel htmlFor="pilot-email">Email *</FieldLabel>
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
                <FieldLabel htmlFor="pilot-org">Organization or personal use case *</FieldLabel>
                <Input
                  id="pilot-org"
                  autoComplete="organization"
                  value={pilot.organization}
                  onChange={(event) => setPilot({ ...pilot, organization: event.target.value })}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="pilot-workflow">What workflow should we evaluate? *</FieldLabel>
                <Textarea
                  id="pilot-workflow"
                  value={pilot.workflow}
                  onChange={(event) => setPilot({ ...pilot, workflow: event.target.value })}
                  placeholder="For example: turn patrol radio observations into a searchable incident timeline and shift handoff."
                  className="min-h-28"
                  required
                />
                <FieldDescription>One workflow or operational problem is enough to start.</FieldDescription>
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
                {pending ? "Sending request..." : "Request free 30-day evaluation"}
              </Button>
            </FieldGroup>
          </form>
        )}
      </div>
    </section>
  );
};

export default PilotSection;

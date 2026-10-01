import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, Radio, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitInquiry } from "@/lib/inquiry";

const discoverySteps = [
  "Start with one real workflow and define what success looks like",
  "Use TerraSatch and Satchy during your first 14 days",
  "Let Satchy identify repeated work, handoffs, missing context, and useful patterns",
  "Receive a Discovery Report without being automatically moved into a paid subscription",
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
    if (!pilot.name || !pilot.email || !pilot.industry) {
      toast.error("Complete the required Open Beta fields.");
      return;
    }

    setPending(true);
    try {
      const { result } = await submitInquiry({
        mode: "open_beta",
        scope:
          "TerraSatch Open Beta access; first 14 days treated as Discovery; no payment information required; beta access does not automatically convert to a paid subscription",
        ...pilot,
      });
      if (result.fallbackMailto) {
        toast("Your request has not been sent. Send the draft in your email app to contact TerraSatch.");
        window.location.assign(result.fallbackMailto);
        return;
      }
      if (!result.ok) throw new Error(result.error || "Unable to submit Open Beta request.");
      toast.success("Open Beta request received.");
      setSent(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit Open Beta request.");
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
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Open Beta</p>
          <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-none lg:text-6xl">
            Join TerraSatch Open Beta<span className="text-primary">.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-frost-dim">
            TerraSatch is actively being developed with real-world users. Open Beta access is currently free, and no payment
            information is required. Some features, integrations, and workflows may change as the platform develops.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Your first 14 days are treated as a Discovery period. Satchy uses that window to understand how TerraSatch fits your
            workflow and prepare a Discovery Report. Reaching day 14 does not automatically charge you or end your Open Beta access.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {discoverySteps.map((item) => (
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
            <h3 className="font-display text-3xl font-bold uppercase">Open Beta request received</h3>
            <p className="max-w-lg text-sm text-muted-foreground">
              Thanks for helping us build TerraSatch. The TerraSatch team will follow up with access and workspace details. No payment information was collected.
            </p>
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
                  <FieldLabel htmlFor="pilot-email">Email *</FieldLabel>
                  <Input id="pilot-email" type="email" autoComplete="email" value={pilot.email} onChange={(event) => setPilot({ ...pilot, email: event.target.value })} required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="pilot-org">Organization</FieldLabel>
                  <Input id="pilot-org" autoComplete="organization" value={pilot.organization} onChange={(event) => setPilot({ ...pilot, organization: event.target.value })} placeholder="Optional for individual users" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="pilot-industry">Field / operation *</FieldLabel>
                  <Input id="pilot-industry" value={pilot.industry} onChange={(event) => setPilot({ ...pilot, industry: event.target.value })} placeholder="Resort, SAR, utility, guide..." required />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="pilot-workflow">What would you like to test with Satchy?</FieldLabel>
                <Textarea id="pilot-workflow" value={pilot.workflow} onChange={(event) => setPilot({ ...pilot, workflow: event.target.value })} placeholder="For example: turn field calls, notes, and updates into one reviewed operational record." />
              </Field>
              <input className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" value={pilot.website} onChange={(event) => setPilot({ ...pilot, website: event.target.value })} />
              <Button type="submit" size="lg" disabled={pending}>
                {pending ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : <Send data-icon="inline-start" />}
                {pending ? "Sending request..." : "Request Open Beta Access"}
              </Button>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Open Beta access is free. No card is required, and submitting this form does not enroll you in a paid subscription.
              </p>
            </FieldGroup>
          </form>
        )}
      </div>
    </section>
  );
};

export default PilotSection;

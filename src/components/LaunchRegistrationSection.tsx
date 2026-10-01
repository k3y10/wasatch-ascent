import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, Rocket, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitInquiry } from "@/lib/inquiry";

const LaunchRegistrationSection = () => {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [registration, setRegistration] = useState({
    name: "",
    email: "",
    organization: "",
    preferredPlan: "team",
    website: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!registration.name || !registration.email || !registration.preferredPlan) {
      toast.error("Complete the required launch registration fields.");
      return;
    }

    setPending(true);
    try {
      const { result } = await submitInquiry({
        mode: "launch",
        ...registration,
      });
      if (result.fallbackMailto) {
        toast("Your registration has not been sent. Send the draft in your email app to contact TerraSatch.");
        window.location.assign(result.fallbackMailto);
        return;
      }
      if (!result.ok) throw new Error(result.error || "Unable to register for launch.");
      toast.success("Registered for TerraSatch subscription launch.");
      setSent(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to register for launch.");
    } finally {
      setPending(false);
    }
  };

  return (
    <section id="launch" className="content-auto relative scroll-mt-24 overflow-hidden py-24">
      <div className="absolute inset-0 bg-terrain-deep" />
      <div className="absolute inset-0 topo-overlay opacity-25" />
      <div className="container relative mx-auto grid gap-12 px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl">
          <div className="flex size-12 items-center justify-center rounded-full border border-primary/45 bg-primary/10">
            <Rocket className="size-6 text-primary" aria-hidden="true" />
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Subscription launch</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
            Want TerraSatch when subscriptions launch<span className="text-primary">?</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-frost-dim">
            Register your interest now and we will let you know before paid subscriptions become available.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            This is not a purchase or subscription. We do not collect payment information here, and you will not be charged automatically.
            Planned pricing may change before launch.
          </p>
        </div>

        {sent ? (
          <div className="flex min-h-72 flex-col items-center justify-center gap-4 border-y border-primary/30 py-10 text-center" role="status">
            <CheckCircle2 className="size-9 text-primary" aria-hidden="true" />
            <h3 className="font-display text-3xl font-bold uppercase">You're registered for launch</h3>
            <p className="max-w-lg text-sm text-muted-foreground">
              We will let you know before TerraSatch paid subscriptions become available. No payment information was collected.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="border-y border-primary/30 py-8">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="launch-name">Name *</FieldLabel>
                <Input id="launch-name" autoComplete="name" value={registration.name} onChange={(event) => setRegistration({ ...registration, name: event.target.value })} required />
              </Field>
              <Field>
                <FieldLabel htmlFor="launch-email">Email *</FieldLabel>
                <Input id="launch-email" type="email" autoComplete="email" value={registration.email} onChange={(event) => setRegistration({ ...registration, email: event.target.value })} required />
              </Field>
              <Field>
                <FieldLabel htmlFor="launch-org">Organization</FieldLabel>
                <Input id="launch-org" autoComplete="organization" value={registration.organization} onChange={(event) => setRegistration({ ...registration, organization: event.target.value })} placeholder="Optional for Individual" />
              </Field>
              <Field>
                <FieldLabel>Plan you're interested in *</FieldLabel>
                <Select value={registration.preferredPlan} onValueChange={(preferredPlan) => setRegistration({ ...registration, preferredPlan })}>
                  <SelectTrigger aria-label="Preferred TerraSatch launch plan">
                    <SelectValue placeholder="Choose a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual · planned $24/month</SelectItem>
                    <SelectItem value="team">Team · planned $399/month</SelectItem>
                    <SelectItem value="operations">Operations · planned from $1,999/month</SelectItem>
                    <SelectItem value="not-sure">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <input className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" value={registration.website} onChange={(event) => setRegistration({ ...registration, website: event.target.value })} />
              <Button type="submit" size="lg" disabled={pending}>
                {pending ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : <Send data-icon="inline-start" />}
                {pending ? "Registering..." : "Register for Subscription Launch"}
              </Button>
            </FieldGroup>
          </form>
        )}
      </div>
    </section>
  );
};

export default LaunchRegistrationSection;

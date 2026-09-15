import { FormEvent, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Building2, Check, Loader2, Radio, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createBillingCheckout, formatUsd, type BillingInterval } from "@/lib/billing";
import { cn } from "@/lib/utils";

type SelfServicePlanCode = "field" | "team" | "operations";

type PricingPlan = {
  code: SelfServicePlanCode | "enterprise";
  name: string;
  description: string;
  monthlyCents: number | null;
  annualCents: number | null;
  points: string[];
  icon: LucideIcon;
  featured?: boolean;
};

const pricingPlans: PricingPlan[] = [
  {
    code: "field",
    name: "Field",
    description: "For small professional field teams that need a focused TerraListen deployment.",
    monthlyCents: 9_900,
    annualCents: 99_000,
    points: [
      "1 operating site",
      "Up to 3 members",
      "Up to 2 paired Edge devices",
      "Up to 4 configured channels",
      "15 processing hours per month",
      "14-day operational-history target",
    ],
    icon: Radio,
  },
  {
    code: "team",
    name: "Team",
    description: "For active teams that need shared radio intelligence, handoffs, and reporting.",
    monthlyCents: 34_900,
    annualCents: 349_000,
    points: [
      "1 primary operating site",
      "Up to 10 members",
      "Up to 6 Edge devices",
      "Up to 12 configured channels",
      "75 processing hours per month",
      "90-day operational-history target",
    ],
    icon: Users,
    featured: true,
  },
  {
    code: "operations",
    name: "Operations",
    description: "For larger mountain, response, land, utility, and field operations.",
    monthlyCents: 99_900,
    annualCents: 999_000,
    points: [
      "Up to 3 operating sites",
      "Up to 30 members",
      "Up to 20 Edge devices",
      "Up to 40 configured channels",
      "250 processing hours per month",
      "Priority support and advanced controls",
    ],
    icon: ShieldCheck,
  },
  {
    code: "enterprise",
    name: "Organization",
    description: "For multi-site or higher-assurance deployments that need a scoped agreement.",
    monthlyCents: null,
    annualCents: null,
    points: [
      "Custom multi-site deployment",
      "Larger Edge fleets and operating groups",
      "Custom retention and integrations",
      "Security and data-governance requirements",
      "Implementation and support plan",
      "Optional SLA and private deployment scope",
    ],
    icon: Building2,
  },
];

const inputClass =
  "h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary";

const PricingEstimator = () => {
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [form, setForm] = useState({ displayName: "", email: "", organizationName: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedAmount = useMemo(() => {
    if (!selectedPlan) return null;
    return interval === "monthly" ? selectedPlan.monthlyCents : selectedPlan.annualCents;
  }, [interval, selectedPlan]);

  const openTrial = (plan: PricingPlan) => {
    setError("");
    setSelectedPlan(plan);
  };

  const submitTrial = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPlan || selectedPlan.code === "enterprise") return;
    setSubmitting(true);
    setError("");
    try {
      const checkout = await createBillingCheckout({
        display_name: form.displayName,
        email: form.email,
        organization_name: form.organizationName,
        plan_code: selectedPlan.code,
        billing_interval: interval,
      });
      window.location.assign(checkout.checkout_url);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "TerraSatch could not start Checkout. Please try again.",
      );
      setSubmitting(false);
    }
  };

  return (
    <section id="cost" className="content-auto relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-terrain-deep via-terrain-surface to-background" />
      <div className="absolute inset-0 topo-overlay opacity-35" />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
            30 days free · card required · $0 today
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl lg:text-6xl">
            Start small. Scale when the workflow proves itself<span className="text-primary">.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-frost-dim">
            Choose the operating level that fits your team. Your selected subscription begins after the 30-day trial unless you cancel before the trial ends.
          </p>
        </div>

        <div className="mx-auto mt-9 flex w-fit rounded-lg border border-border/80 bg-background/70 p-1" aria-label="Billing interval">
          <button
            type="button"
            onClick={() => setInterval("monthly")}
            className={cn(
              "rounded-md px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] transition",
              interval === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setInterval("annual")}
            className={cn(
              "rounded-md px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] transition",
              interval === "annual" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Annual · 2 months included
          </button>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border/70 bg-border/70 lg:grid-cols-4">
          {pricingPlans.map(({ code, name, description, monthlyCents, annualCents, points, icon: Icon, featured }) => {
            const amount = interval === "monthly" ? monthlyCents : annualCents;
            const cadence = amount === null ? "Custom agreement" : interval === "monthly" ? "per month" : "per year";
            return (
              <article
                key={code}
                className={cn(
                  "relative flex min-h-full flex-col bg-background/95 p-7",
                  featured && "bg-terrain-surface",
                )}
              >
                {featured && (
                  <span className="absolute right-5 top-5 rounded-full border border-primary/50 bg-primary/10 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-primary">
                    Recommended
                  </span>
                )}
                <Icon className={cn("size-7 text-foreground/55", featured && "text-primary")} aria-hidden="true" />
                <h3 className="mt-5 font-display text-3xl font-bold uppercase">{name}</h3>
                <p className="mt-2 min-h-16 text-sm leading-relaxed text-muted-foreground">{description}</p>

                <div className="mt-6 border-y border-border/70 py-5">
                  <p className="font-display text-4xl font-bold text-primary">
                    {amount === null ? "Custom" : formatUsd(amount)}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{cadence}</p>
                  {amount !== null && (
                    <p className="mt-3 text-xs text-muted-foreground">30-day free trial · $0 charged today</p>
                  )}
                </div>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  {code === "enterprise" ? (
                    <Button asChild variant="outline" className="w-full">
                      <a href="#pilot">Discuss organization scope</a>
                    </Button>
                  ) : (
                    <Button className="w-full" onClick={() => openTrial(pricingPlans.find((plan) => plan.code === code)!)}>
                      Start 30-Day Trial
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col justify-between gap-5 border-l border-primary pl-6 md:flex-row md:items-center">
          <div>
            <p className="font-display text-xl font-bold uppercase">Still evaluating?</p>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The founder-reviewed limited pilot remains available for organizations that want to validate one workflow before choosing a subscription or deployment scope.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <a href="#pilot">Apply for limited pilot</a>
          </Button>
        </div>
      </div>

      <Dialog open={selectedPlan !== null} onOpenChange={(open) => !open && !submitting && setSelectedPlan(null)}>
        <DialogContent className="max-w-xl border-border/80 bg-background">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase">
              Start {selectedPlan?.name ?? "TerraSatch"} trial
            </DialogTitle>
            <DialogDescription>
              30 days free. Stripe securely collects the payment method. TerraSatch does not store card data.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-border/70 bg-terrain-surface/50 p-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Today</span>
              <strong>$0</strong>
            </div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <span className="text-muted-foreground">After 30 days</span>
              <strong>
                {selectedAmount === null ? "Custom" : formatUsd(selectedAmount)}
                {selectedAmount !== null ? (interval === "monthly" ? "/month" : "/year") : ""}
              </strong>
            </div>
          </div>

          <form className="mt-2 space-y-4" onSubmit={submitTrial}>
            <label className="block text-sm font-medium">
              Your name
              <input
                className={cn(inputClass, "mt-2")}
                required
                autoComplete="name"
                value={form.displayName}
                onChange={(event) => setForm((current) => ({ ...current, displayName: event.target.value }))}
              />
            </label>
            <label className="block text-sm font-medium">
              Work email
              <input
                className={cn(inputClass, "mt-2")}
                required
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              />
            </label>
            <label className="block text-sm font-medium">
              Organization
              <input
                className={cn(inputClass, "mt-2")}
                required
                autoComplete="organization"
                value={form.organizationName}
                onChange={(event) => setForm((current) => ({ ...current, organizationName: event.target.value }))}
              />
            </label>

            {error && (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
                {error}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="animate-spin" aria-hidden="true" /> : null}
              {submitting ? "Opening secure Checkout" : "Continue to secure Checkout"}
            </Button>
            <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
              By continuing, you authorize Stripe to store your payment method for the selected subscription. You can cancel during the trial to avoid the first charge.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PricingEstimator;

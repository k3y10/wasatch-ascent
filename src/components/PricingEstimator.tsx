import { FormEvent, useEffect, useMemo, useState } from "react";
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
import {
  createBillingCheckout,
  formatUsd,
  getBillingPlans,
  type BillingInterval,
  type BillingPlan,
  type PlanCode,
} from "@/lib/billing";
import { cn } from "@/lib/utils";

const planIcons: Record<PlanCode, LucideIcon> = {
  field: Radio,
  team: Users,
  operations: ShieldCheck,
  enterprise: Building2,
};

const inputClass =
  "h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary";

const plural = (count: number, singular: string, pluralForm = `${singular}s`) =>
  `${count} ${count === 1 ? singular : pluralForm}`;

const planPoints = (plan: BillingPlan) => {
  const entitlement = plan.entitlements;
  if (plan.code === "enterprise") {
    return [
      "Custom multi-site deployment",
      "Custom member and operating-group capacity",
      "Custom Edge fleet capacity",
      "Custom monitored-channel capacity",
      "Custom processing and retention scope",
      "API access and priority support",
    ];
  }

  const points = [
    entitlement.max_sites === null
      ? "Custom operating-site capacity"
      : plural(entitlement.max_sites, "operating site"),
    entitlement.max_members === null
      ? "Custom member capacity"
      : `Up to ${plural(entitlement.max_members, "member")}`,
    entitlement.max_edge_devices === null
      ? "Custom Edge fleet"
      : `Up to ${plural(entitlement.max_edge_devices, "Edge device")}`,
    entitlement.max_channels === null
      ? "Custom channel capacity"
      : `Up to ${plural(entitlement.max_channels, "configured channel")}`,
    entitlement.included_processing_hours === null
      ? "Custom processing capacity"
      : `${entitlement.included_processing_hours} processing hours per month`,
    entitlement.retention_days === null
      ? "Custom operational-history retention"
      : `${entitlement.retention_days}-day operational-history target`,
  ];

  if (entitlement.api_access) points.push("API access included");
  if (entitlement.priority_support) points.push("Priority support included");
  return points;
};

const isSelfServicePlan = (
  plan: BillingPlan,
): plan is BillingPlan & { code: Exclude<PlanCode, "enterprise"> } =>
  plan.self_service && plan.code !== "enterprise";

const PricingEstimator = () => {
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<BillingPlan | null>(null);
  const [form, setForm] = useState({ displayName: "", email: "", organizationName: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getBillingPlans()
      .then((catalog) => {
        if (!active) return;
        setPlans(catalog);
        setPlansError("");
      })
      .catch(() => {
        if (!active) return;
        setPlansError("Subscription pricing is temporarily unavailable. The limited pilot path remains open.");
      })
      .finally(() => {
        if (active) setPlansLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const selectedAmount = useMemo(() => {
    if (!selectedPlan) return null;
    return interval === "monthly"
      ? selectedPlan.monthly_amount_cents
      : selectedPlan.annual_amount_cents;
  }, [interval, selectedPlan]);

  const trialDays = useMemo(
    () => plans.find((plan) => plan.self_service)?.trial_days ?? null,
    [plans],
  );

  const openTrial = (plan: BillingPlan) => {
    if (!isSelfServicePlan(plan)) return;
    setError("");
    setSelectedPlan(plan);
  };

  const submitTrial = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPlan || !isSelfServicePlan(selectedPlan)) return;
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
            {trialDays ? `${trialDays} days free · card required · $0 today` : "Subscription plans · secure Stripe Checkout"}
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl lg:text-6xl">
            Start small. Scale when the workflow proves itself<span className="text-primary">.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-frost-dim">
            Choose the operating level that fits your team. Self-service subscriptions begin after the free trial unless you cancel before it ends.
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
            Annual
          </button>
        </div>

        {plansLoading ? (
          <div className="mt-12 grid place-items-center rounded-xl border border-border/70 bg-background/75 px-6 py-16 text-muted-foreground">
            <Loader2 className="mb-3 size-6 animate-spin text-primary" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.16em]">Loading subscription catalog</span>
          </div>
        ) : plansError ? (
          <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-border/70 bg-background/80 p-8 text-center">
            <p className="text-sm leading-relaxed text-muted-foreground">{plansError}</p>
            <Button asChild variant="outline" className="mt-5">
              <a href="#pilot">Apply for limited pilot</a>
            </Button>
          </div>
        ) : (
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border/70 bg-border/70 lg:grid-cols-4">
            {plans.map((plan) => {
              const Icon = planIcons[plan.code];
              const amount = interval === "monthly" ? plan.monthly_amount_cents : plan.annual_amount_cents;
              const cadence = amount === null ? "Custom agreement" : interval === "monthly" ? "per month" : "per year";
              const points = planPoints(plan);
              return (
                <article
                  key={plan.code}
                  className={cn(
                    "relative flex min-h-full flex-col bg-background/95 p-7",
                    plan.recommended && "bg-terrain-surface",
                  )}
                >
                  {plan.recommended && (
                    <span className="absolute right-5 top-5 rounded-full border border-primary/50 bg-primary/10 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-primary">
                      Recommended
                    </span>
                  )}
                  <Icon className={cn("size-7 text-foreground/55", plan.recommended && "text-primary")} aria-hidden="true" />
                  <h3 className="mt-5 font-display text-3xl font-bold uppercase">{plan.name}</h3>
                  <p className="mt-2 min-h-16 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>

                  <div className="mt-6 border-y border-border/70 py-5">
                    <p className="font-display text-4xl font-bold text-primary">
                      {amount === null ? "Custom" : formatUsd(amount)}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{cadence}</p>
                    {amount !== null && plan.trial_days > 0 && (
                      <p className="mt-3 text-xs text-muted-foreground">
                        {plan.trial_days}-day free trial · $0 charged today
                      </p>
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
                    {!isSelfServicePlan(plan) ? (
                      <Button asChild variant="outline" className="w-full">
                        <a href="#pilot">Discuss organization scope</a>
                      </Button>
                    ) : (
                      <Button className="w-full" onClick={() => openTrial(plan)}>
                        Start {plan.trial_days}-Day Trial
                        <ArrowRight data-icon="inline-end" />
                      </Button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

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
              {selectedPlan?.trial_days ?? 0} days free. Stripe securely collects the payment method. TerraSatch does not store card data.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-border/70 bg-terrain-surface/50 p-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Today</span>
              <strong>$0</strong>
            </div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <span className="text-muted-foreground">After trial</span>
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

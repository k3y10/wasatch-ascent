import { FormEvent, useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  Check,
  Loader2,
  Radio,
  ShieldCheck,
  Users,
} from "lucide-react";
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

const planPositioning: Record<
  PlanCode,
  {
    displayName: string;
    audience: string;
    summary: string;
    why: string;
    examples: string[];
  }
> = {
  field: {
    displayName: "Individual / Field",
    audience: "Solo operator or very small field crew",
    summary: "The lowest-cost way to run TerraListen for one focused field workflow without paying for team-scale capacity.",
    why: "Choose this when one person or a very small crew owns the radios, review, and daily workflow.",
    examples: ["Solo guides", "Independent field operators", "Small evaluation crews"],
  },
  team: {
    displayName: "Team",
    audience: "One operating team sharing the same workflow",
    summary: "Built for a patrol, guide, SAR, or field team that needs more people, radios, Edge devices, and shared history.",
    why: "Choose this when the workflow belongs to a team instead of one operator.",
    examples: ["Ski patrol", "SAR teams", "Guide operations"],
  },
  operations: {
    displayName: "Operations",
    audience: "Larger, multi-shift, or multi-site operations",
    summary: "For persistent operational use with significantly more channels, hardware, processing capacity, and site coverage.",
    why: "Choose this when TerraListen is becoming part of regular operations across shifts, teams, or locations.",
    examples: ["Mountain operations", "Incident teams", "Multi-site field programs"],
  },
  enterprise: {
    displayName: "Organization",
    audience: "Departments, agencies, and custom deployments",
    summary: "A scoped annual deployment for organizations that need custom limits, integrations, governance, or support.",
    why: "Choose this when your deployment no longer fits a fixed self-service plan.",
    examples: ["Agencies", "Multiple departments", "Custom integrations"],
  },
};

const inputClass =
  "h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary";

const formatCapacity = (value: number | null, fallback = "Custom") =>
  value === null ? fallback : String(value);

const isSelfServicePlan = (
  plan: BillingPlan,
): plan is BillingPlan & { code: Exclude<PlanCode, "enterprise"> } =>
  plan.self_service && plan.code !== "enterprise";

const annualSavings = (plan: BillingPlan) => {
  if (plan.monthly_amount_cents === null || plan.annual_amount_cents === null) return null;
  const savings = plan.monthly_amount_cents * 12 - plan.annual_amount_cents;
  return savings > 0 ? savings : null;
};

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
    <section id="cost" className="content-auto relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-terrain-deep via-terrain-surface to-background" />
      <div className="absolute inset-0 topo-overlay opacity-30" />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl lg:text-6xl">
            Pick the way you operate<span className="text-primary">.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-frost-dim sm:text-lg">
            Individual is for one operator or a very small field crew. Team adds shared people, radios, and history. Operations adds multi-site and higher-volume capacity. Organization is custom.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Self-service plans include a {trialDays ?? 30}-day free trial. A card is required to start, nothing is charged today, and billing begins after the trial unless you cancel first.
          </p>
        </div>

        <div className="mx-auto mt-9 flex w-fit rounded-lg border border-border/80 bg-background/75 p-1" aria-label="Billing interval">
          <button
            type="button"
            onClick={() => setInterval("monthly")}
            className={cn(
              "rounded-md px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition",
              interval === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setInterval("annual")}
            className={cn(
              "rounded-md px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition",
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
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => {
              const Icon = planIcons[plan.code];
              const positioning = planPositioning[plan.code];
              const amount = interval === "monthly" ? plan.monthly_amount_cents : plan.annual_amount_cents;
              const cadence = amount === null ? "Custom annual scope" : interval === "monthly" ? "/ month" : "/ year";
              const savings = annualSavings(plan);
              const entitlement = plan.entitlements;

              return (
                <article
                  key={plan.code}
                  className={cn(
                    "relative flex min-h-full flex-col rounded-xl border bg-background/90 p-6 shadow-sm backdrop-blur-sm transition",
                    plan.recommended
                      ? "border-primary/70 bg-terrain-surface/90 shadow-lg shadow-black/10"
                      : "border-border/75",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex size-10 items-center justify-center rounded-lg border border-border/70 bg-background/70">
                      <Icon className={cn("size-5 text-foreground/60", plan.recommended && "text-primary")} aria-hidden="true" />
                    </div>
                    {plan.recommended && (
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-primary">
                        Recommended
                      </span>
                    )}
                  </div>

                  <div className="mt-5">
                    <h3 className="font-display text-2xl font-bold uppercase leading-tight">{positioning.displayName}</h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/80">{positioning.audience}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{positioning.summary}</p>
                  </div>

                  <div className="mt-6 rounded-lg border border-border/70 bg-terrain-deep/55 p-4">
                    <div className="flex items-end gap-2">
                      <span className="font-display text-4xl font-bold text-primary">
                        {amount === null ? "Custom" : formatUsd(amount)}
                      </span>
                      <span className="pb-1 text-xs font-medium text-muted-foreground">{cadence}</span>
                    </div>
                    {amount !== null && plan.trial_days > 0 ? (
                      <div className="mt-3 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground">
                        <strong className="text-foreground">$0 today</strong> · {plan.trial_days}-day free trial · card required
                        {interval === "annual" && savings ? (
                          <span className="mt-1 block text-primary">Save {formatUsd(savings)} versus monthly billing.</span>
                        ) : null}
                      </div>
                    ) : (
                      <p className="mt-3 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground">
                        Scoped with your organization before deployment.
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Included capacity</p>
                    <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      <div className="border-b border-border/50 pb-2">
                        <dt className="text-xs text-muted-foreground">Sites</dt>
                        <dd className="mt-0.5 font-semibold text-foreground">{formatCapacity(entitlement.max_sites)}</dd>
                      </div>
                      <div className="border-b border-border/50 pb-2">
                        <dt className="text-xs text-muted-foreground">People</dt>
                        <dd className="mt-0.5 font-semibold text-foreground">{entitlement.max_members === null ? "Custom" : `Up to ${entitlement.max_members}`}</dd>
                      </div>
                      <div className="border-b border-border/50 pb-2">
                        <dt className="text-xs text-muted-foreground">Edge devices</dt>
                        <dd className="mt-0.5 font-semibold text-foreground">{entitlement.max_edge_devices === null ? "Custom" : `Up to ${entitlement.max_edge_devices}`}</dd>
                      </div>
                      <div className="border-b border-border/50 pb-2">
                        <dt className="text-xs text-muted-foreground">Radio channels</dt>
                        <dd className="mt-0.5 font-semibold text-foreground">{entitlement.max_channels === null ? "Custom" : `Up to ${entitlement.max_channels}`}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-5 space-y-2 text-sm text-foreground/80">
                    <div className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>
                        {entitlement.included_processing_hours === null
                          ? "Custom processing capacity"
                          : `${entitlement.included_processing_hours} processing hours / month`}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>
                        {entitlement.retention_days === null
                          ? "Custom operational history"
                          : `${entitlement.retention_days}-day operational history`}
                      </span>
                    </div>
                    {entitlement.api_access && (
                      <div className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>API access included</span>
                      </div>
                    )}
                    {entitlement.priority_support && (
                      <div className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>Priority support included</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 border-t border-border/60 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-foreground">Why this tier</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{positioning.why}</p>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {positioning.examples.join(" · ")}
                    </p>
                  </div>

                  <div className="mt-auto pt-7">
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

        {!plansLoading && !plansError && (
          <div className="mt-8 rounded-xl border border-border/70 bg-background/55 px-6 py-5">
            <p className="font-display text-lg font-bold uppercase">What changes as you move up?</p>
            <p className="mt-2 max-w-5xl text-sm leading-relaxed text-muted-foreground">
              You are mainly buying more shared operational capacity: more people can work in the same organization, more Edge devices and radio channels can stay connected, more processing is included, history lasts longer, and Operations expands beyond a single site. Organization adds custom limits, integrations, governance, API access, and support.
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-col justify-between gap-5 border-l border-primary pl-6 md:flex-row md:items-center">
          <div>
            <p className="font-display text-xl font-bold uppercase">Not sure which tier fits yet?</p>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The limited pilot remains available for organizations that want to validate one workflow before choosing a subscription or deployment scope.
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
              Start {selectedPlan ? planPositioning[selectedPlan.code].displayName : "TerraSatch"} trial
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

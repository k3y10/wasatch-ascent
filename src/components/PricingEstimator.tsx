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

type SelfServicePlanCode = "field" | "team";

const planPositioning: Record<
  PlanCode,
  {
    audience: string;
    summary: string;
    why: string;
    examples: string[];
    modelRange: string;
  }
> = {
  field: {
    audience: "One person · one field workflow · one radio or channel",
    summary: "A hands-free field notebook for people who want to keep moving. Capture observations by voice or radio, keep the original record, and organize what you saw by time, location, route, and map context.",
    why: "Use Individual when you want a personal TerraSatch workspace for your own routes, observations, notes, summaries, and field history without paying for shared team administration.",
    examples: ["Hunters & foragers", "Hikers & climbers", "Guides & field engineers", "Researchers & inspectors"],
    modelRange: "$29–$79 / month planning range",
  },
  team: {
    audience: "A crew sharing radios, observations, routes, and maps",
    summary: "The same field capture workflow, shared across a working team. Multiple people contribute observations into common channels, maps, history, and operational context.",
    why: "Use Team when the information no longer belongs to one person and several operators need to work from the same field record.",
    examples: ["Ski patrol", "SAR teams", "Guide operations", "Field crews"],
    modelRange: "$250–$750 / month planning range",
  },
  operations: {
    audience: "One operating site, team, or department",
    summary: "A recurring annual deployment for organizations using TerraSatch as part of regular field operations, with greater user, radio, channel, retention, and support capacity.",
    why: "Use an Annual Site license when TerraSatch moves from an individual or small-team tool into an operational system owned by a department or site.",
    examples: ["Mountain operations", "Snow safety departments", "Engineering field programs", "Public-safety operations"],
    modelRange: "$25K–$60K / year planning range",
  },
  enterprise: {
    audience: "Multiple teams, sites, integrations, or higher-assurance deployments",
    summary: "A custom deployment for organizations that need multi-site coordination, integrations, extended retention, private hosting, security controls, or broader operational support.",
    why: "Use Enterprise when the deployment spans locations or requires infrastructure, governance, integrations, and support beyond a standard site license.",
    examples: ["Agencies", "Multi-site operators", "Large field organizations", "Government & defense operations"],
    modelRange: "$75K–$250K+ / year planning range",
  },
};

const inputClass =
  "h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary";

const formatCapacity = (value: number | null, prefix = "") =>
  value === null ? "Custom" : `${prefix}${value}`;

const isSelfServicePlan = (
  plan: BillingPlan,
): plan is BillingPlan & { code: SelfServicePlanCode } =>
  plan.self_service && (plan.code === "field" || plan.code === "team");

const planPrice = (plan: BillingPlan) => {
  if (plan.monthly_amount_cents !== null) {
    return { amount: formatUsd(plan.monthly_amount_cents), cadence: "/ month", interval: "monthly" as const };
  }
  if (plan.annual_amount_cents !== null) {
    return { amount: formatUsd(plan.annual_amount_cents), cadence: "/ year", interval: "annual" as const };
  }
  return { amount: "Custom", cadence: "annual scope", interval: null };
};

const PricingEstimator = () => {
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

  const trialDays = useMemo(
    () => plans.find((plan) => plan.self_service)?.trial_days ?? 30,
    [plans],
  );

  const selectedPrice = selectedPlan ? planPrice(selectedPlan) : null;

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
        billing_interval: "monthly",
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
            Start with your field notes. Scale to the organization<span className="text-primary">.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-frost-dim sm:text-lg">
            Talk, observe, and keep moving. TerraSatch turns field communication into an organized record, from one person's routes and observations to shared team and organization-wide operations.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Individual and Team can begin with a {trialDays}-day trial. Card required, $0 today. Site and Enterprise deployments are scoped before contracting.
          </p>
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
              const price = planPrice(plan);
              const entitlement = plan.entitlements;

              return (
                <article
                  key={plan.code}
                  className={cn(
                    "relative flex min-h-full flex-col rounded-xl border bg-background/92 p-6 shadow-sm backdrop-blur-sm",
                    plan.recommended
                      ? "border-primary/70 bg-terrain-surface/95 shadow-lg shadow-black/10"
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
                    <h3 className="font-display text-2xl font-bold uppercase leading-tight">{plan.name}</h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-foreground/80">{positioning.audience}</p>
                    <p className="mt-3 min-h-24 text-sm leading-relaxed text-muted-foreground">{positioning.summary}</p>
                  </div>

                  <div className="mt-6 rounded-lg border border-border/70 bg-terrain-deep/55 p-4">
                    <div className="flex items-end gap-2">
                      <span className="font-display text-4xl font-bold text-primary">{price.amount}</span>
                      <span className="pb-1 text-xs font-medium text-muted-foreground">{price.cadence}</span>
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{positioning.modelRange}</p>
                    {isSelfServicePlan(plan) ? (
                      <p className="mt-3 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground">
                        <strong className="text-foreground">$0 today</strong> · {plan.trial_days}-day free trial · card required
                      </p>
                    ) : (
                      <p className="mt-3 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground">
                        Planning-model base price. Final annual scope is set from deployment requirements.
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Operating capacity</p>
                    <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      <div className="border-b border-border/50 pb-2">
                        <dt className="text-xs text-muted-foreground">Sites</dt>
                        <dd className="mt-0.5 font-semibold text-foreground">{formatCapacity(entitlement.max_sites)}</dd>
                      </div>
                      <div className="border-b border-border/50 pb-2">
                        <dt className="text-xs text-muted-foreground">People</dt>
                        <dd className="mt-0.5 font-semibold text-foreground">{formatCapacity(entitlement.max_members, "Up to ")}</dd>
                      </div>
                      <div className="border-b border-border/50 pb-2">
                        <dt className="text-xs text-muted-foreground">Edge devices</dt>
                        <dd className="mt-0.5 font-semibold text-foreground">{formatCapacity(entitlement.max_edge_devices, "Up to ")}</dd>
                      </div>
                      <div className="border-b border-border/50 pb-2">
                        <dt className="text-xs text-muted-foreground">Radio channels</dt>
                        <dd className="mt-0.5 font-semibold text-foreground">{formatCapacity(entitlement.max_channels, "Up to ")}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-5 space-y-2 text-sm text-foreground/80">
                    <div className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{entitlement.included_processing_hours === null ? "Processing scoped to deployment" : `${entitlement.included_processing_hours} processing hours / month`}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{entitlement.retention_days === null ? "Retention scoped to deployment" : `${entitlement.retention_days}-day operational history`}</span>
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
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{positioning.examples.join(" · ")}</p>
                  </div>

                  <div className="mt-auto pt-7">
                    {isSelfServicePlan(plan) ? (
                      <Button className="w-full" onClick={() => openTrial(plan)}>
                        Start {plan.trial_days}-Day Trial
                        <ArrowRight data-icon="inline-end" />
                      </Button>
                    ) : (
                      <Button asChild variant="outline" className="w-full">
                        <a href="#pilot">Discuss deployment scope</a>
                      </Button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border/70 bg-border/70 md:grid-cols-4">
          {[
            ["Individual", "Voice or radio field notes organized around your routes, locations, observations, and personal history."],
            ["Team", "Shared users, radios, observations, maps, history, and administration for one working crew."],
            ["Annual Site", "A recurring operational deployment for a site, department, or larger field program."],
            ["Enterprise", "Multi-site coordination, integrations, private infrastructure, security controls, and higher-touch support."],
          ].map(([title, copy]) => (
            <div key={title} className="bg-background/90 p-5">
              <p className="font-display text-base font-bold uppercase">{title}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          These are planning-model prices used in the TerraSatch pitch and financial model. Site and enterprise pricing remains flexible until completed purchases validate onboarding, support burden, deployment scope, and renewal value.
        </p>
      </div>

      <Dialog open={selectedPlan !== null} onOpenChange={(open) => !open && !submitting && setSelectedPlan(null)}>
        <DialogContent className="max-w-xl border-border/80 bg-background">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase">
              Start {selectedPlan?.name ?? "TerraSatch"} trial
            </DialogTitle>
            <DialogDescription>
              {selectedPlan?.trial_days ?? 30} days free. Stripe securely collects the payment method. TerraSatch does not store card data.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-border/70 bg-terrain-surface/50 p-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Today</span>
              <strong>$0</strong>
            </div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <span className="text-muted-foreground">After trial</span>
              <strong>{selectedPrice ? `${selectedPrice.amount}${selectedPrice.cadence}` : "—"}</strong>
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
              By continuing, you authorize Stripe to store your payment method for the monthly subscription. Cancel during the trial to avoid the first charge.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PricingEstimator;

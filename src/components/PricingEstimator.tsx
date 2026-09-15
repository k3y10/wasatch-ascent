import { FormEvent, useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  Check,
  Loader2,
  MapPinned,
  Radio,
  ShieldCheck,
  Sparkles,
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

const FALLBACK_PLANS: BillingPlan[] = [
  {
    code: "field",
    name: "Individual",
    description: "Personal TerraSatch access for one field user.",
    monthly_amount_cents: 4_900,
    annual_amount_cents: null,
    trial_days: 30,
    self_service: true,
    recommended: false,
    entitlements: {
      max_sites: 1,
      max_members: 1,
      max_edge_devices: 1,
      max_channels: 1,
      included_processing_hours: 15,
      retention_days: 14,
      api_access: false,
      priority_support: false,
    },
  },
  {
    code: "team",
    name: "Team",
    description: "Shared TerraSatch access for one working crew.",
    monthly_amount_cents: 50_000,
    annual_amount_cents: null,
    trial_days: 30,
    self_service: true,
    recommended: true,
    entitlements: {
      max_sites: 1,
      max_members: 10,
      max_edge_devices: 6,
      max_channels: 12,
      included_processing_hours: 75,
      retention_days: 90,
      api_access: true,
      priority_support: false,
    },
  },
  {
    code: "operations",
    name: "Annual Site",
    description: "Recurring TerraSatch deployment for one operating site or department.",
    monthly_amount_cents: null,
    annual_amount_cents: 5_000_000,
    trial_days: 0,
    self_service: false,
    recommended: false,
    entitlements: {
      max_sites: 1,
      max_members: 30,
      max_edge_devices: 20,
      max_channels: 40,
      included_processing_hours: 250,
      retention_days: 365,
      api_access: true,
      priority_support: true,
    },
  },
  {
    code: "enterprise",
    name: "Enterprise",
    description: "Multi-site or higher-assurance TerraSatch deployment.",
    monthly_amount_cents: null,
    annual_amount_cents: 12_500_000,
    trial_days: 0,
    self_service: false,
    recommended: false,
    entitlements: {
      max_sites: null,
      max_members: null,
      max_edge_devices: null,
      max_channels: null,
      included_processing_hours: null,
      retention_days: null,
      api_access: true,
      priority_support: true,
    },
  },
];

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
    audience: "One person taking Satchy into the field",
    summary:
      "Use your radio or voice as a hands-free field notebook. Satchy captures what you say, keeps the original record, and organizes observations around time, location, route, and map context while you keep moving.",
    why:
      "Built for people working or exploring on their own who want useful field records without stopping to type into forms.",
    examples: [
      "Hunters & foragers",
      "Hikers & climbers",
      "Guides & researchers",
      "Engineers & inspectors",
    ],
    modelRange: "$29–$79 / month planning range",
  },
  team: {
    audience: "A crew taking Satchy into the same operation",
    summary:
      "Multiple people and radios contribute to one shared field record. Satchy connects calls, observations, routes, maps, history, and summaries so the team sees the same operational picture.",
    why:
      "Built for crews that need field communication to become shared information instead of staying inside separate radios, notebooks, or memories.",
    examples: ["Ski patrol", "SAR teams", "Guide operations", "Field crews"],
    modelRange: "$250–$750 / month planning range",
  },
  operations: {
    audience: "One site or department using TerraSatch operationally",
    summary:
      "A recurring annual deployment for organizations using TerraSatch across shifts, crews, radios, routes, observations, and reporting with greater capacity, retention, administration, and support.",
    why:
      "Built for a department or site where TerraSatch becomes part of the regular operating workflow rather than a single-user tool.",
    examples: [
      "Mountain operations",
      "Snow safety",
      "Engineering programs",
      "Public-safety operations",
    ],
    modelRange: "$25K–$60K / year planning range",
  },
  enterprise: {
    audience: "Multiple teams, sites, systems, or higher-assurance operations",
    summary:
      "A scoped deployment for organizations that need multi-site coordination, integrations, extended retention, private infrastructure, security controls, or broader operational support.",
    why:
      "Built for organizations that need TerraSatch connected to larger operational systems, data sources, sensors, mapping, or approved automation workflows.",
    examples: ["Agencies", "Multi-site operators", "Large field organizations", "Government & defense"],
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
    return { amount: formatUsd(plan.monthly_amount_cents), cadence: "/ month" };
  }
  if (plan.annual_amount_cents !== null) {
    return { amount: formatUsd(plan.annual_amount_cents), cadence: "/ year" };
  }
  return { amount: "Custom", cadence: "annual scope" };
};

const catalogMatchesPitchModel = (catalog: BillingPlan[]) => {
  const byCode = Object.fromEntries(catalog.map((plan) => [plan.code, plan])) as Partial<
    Record<PlanCode, BillingPlan>
  >;
  return (
    byCode.field?.monthly_amount_cents === 4_900 &&
    byCode.team?.monthly_amount_cents === 50_000 &&
    byCode.operations?.annual_amount_cents === 5_000_000 &&
    byCode.enterprise?.annual_amount_cents === 12_500_000
  );
};

const PricingEstimator = () => {
  const [plans, setPlans] = useState<BillingPlan[]>(FALLBACK_PLANS);
  const [catalogOnline, setCatalogOnline] = useState(false);
  const [catalogChecking, setCatalogChecking] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<BillingPlan | null>(null);
  const [form, setForm] = useState({ displayName: "", email: "", organizationName: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getBillingPlans()
      .then((catalog) => {
        if (!active) return;
        if (catalogMatchesPitchModel(catalog)) {
          setPlans(catalog);
          setCatalogOnline(true);
        } else {
          setPlans(FALLBACK_PLANS);
          setCatalogOnline(false);
        }
      })
      .catch(() => {
        if (!active) return;
        setPlans(FALLBACK_PLANS);
        setCatalogOnline(false);
      })
      .finally(() => {
        if (active) setCatalogChecking(false);
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
    if (!isSelfServicePlan(plan) || !catalogOnline) return;
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
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
            Choose how Satchy goes with you
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl lg:text-6xl">
            Take Satchy into the field<span className="text-primary">.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-frost-dim sm:text-lg">
            Every TerraSatch plan starts with the same idea: speak into a radio or voice input, keep moving, and let Satchy turn what you report into organized field intelligence.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Your plan determines how many people, radios, channels, sites, and operational workflows can share that experience.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-3 md:grid-cols-4">
          {[
            { icon: Radio, label: "1. Speak", copy: "Radio or voice input from the field" },
            { icon: Sparkles, label: "2. Satchy", copy: "Understands and structures what you report" },
            { icon: MapPinned, label: "3. Map it", copy: "Adds route, time, location, and observation context" },
            { icon: Check, label: "4. Use it", copy: "Search, summarize, share, report, or act on the record" },
          ].map(({ icon: Icon, label, copy }) => (
            <div key={label} className="rounded-lg border border-border/70 bg-background/72 p-4 text-left backdrop-blur-sm">
              <Icon className="size-4 text-primary" aria-hidden="true" />
              <p className="mt-3 font-display text-sm font-bold uppercase text-foreground">{label}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>

        {!catalogOnline && !catalogChecking && (
          <div className="mx-auto mt-6 max-w-3xl rounded-lg border border-primary/20 bg-primary/5 px-5 py-4 text-center text-xs leading-relaxed text-muted-foreground">
            Pricing is shown from the current TerraSatch plan model. Secure self-service checkout is not enabled in this preview yet, so Individual and Team trial requests route through the evaluation path until billing is connected.
          </div>
        )}

        {catalogChecking && (
          <div className="mx-auto mt-6 flex max-w-3xl items-center justify-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
            Checking secure checkout availability
          </div>
        )}

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
                  <p className="mt-3 min-h-28 text-sm leading-relaxed text-muted-foreground">{positioning.summary}</p>
                </div>

                <div className="mt-6 rounded-lg border border-border/70 bg-terrain-deep/55 p-4">
                  <div className="flex items-end gap-2">
                    <span className="font-display text-4xl font-bold text-primary">{price.amount}</span>
                    <span className="pb-1 text-xs font-medium text-muted-foreground">{price.cadence}</span>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{positioning.modelRange}</p>
                  {isSelfServicePlan(plan) ? (
                    <p className="mt-3 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground">
                      <strong className="text-foreground">$0 today</strong> · {plan.trial_days}-day trial · card required once secure checkout is enabled
                    </p>
                  ) : (
                    <p className="mt-3 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground">
                      Planning-model base price. Final annual scope is set from deployment requirements.
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Included scale</p>
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
                    <span>
                      {entitlement.included_processing_hours === null
                        ? "Processing scoped to deployment"
                        : `${entitlement.included_processing_hours} processing hours / month`}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>
                      {entitlement.retention_days === null
                        ? "Retention scoped to deployment"
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
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-foreground">Made for</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{positioning.why}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{positioning.examples.join(" · ")}</p>
                </div>

                <div className="mt-auto pt-7">
                  {isSelfServicePlan(plan) && catalogOnline ? (
                    <Button className="w-full" onClick={() => openTrial(plan)}>
                      Start {plan.trial_days}-Day Trial
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                  ) : isSelfServicePlan(plan) ? (
                    <Button asChild className="w-full">
                      <a href="#pilot">
                        Request Trial Access
                        <ArrowRight data-icon="inline-end" />
                      </a>
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

        <p className="mx-auto mt-7 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          Prices use the current TerraSatch pitch and financial planning model. Site and enterprise scope remains flexible as deployments validate onboarding, infrastructure, support, and renewal requirements.
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
              Organization or use case
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

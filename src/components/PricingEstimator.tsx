import { FALLBACK_PLANS, catalogMatchesPublicPricing } from "@/lib/plan-catalog";
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

const planPositioning: Record<
  PlanCode,
  {
    audience: string;
    summary: string;
    why: string;
    examples: string[];
    highlights: string[];
  }
> = {
  field: {
    audience: "Take Satchy into the field.",
    summary:
      "Talk. Keep moving. Satchy takes the field notes. Your words become searchable observations connected to your map, routes, and field history.",
    why:
      "Built for people working or exploring on their own who want useful field records without stopping to type into forms.",
    examples: [
      "Hunters & foragers",
      "Hikers & climbers",
      "Guides & researchers",
      "Engineers & inspectors",
    ],
    highlights: ["Personal field notebook", "Your observations, map & history", "One personal Edge connection"],
  },
  team: {
    audience: "Give the whole crew Satchy.",
    summary:
      "Bring everyone’s radio and voice observations into a shared map. Turn the team’s field history into assignments, approvals, shift handoffs, and reports.",
    why:
      "Built for crews that need field communication to become shared information instead of staying inside separate radios, notebooks, or memories.",
    examples: ["Ski patrol", "SAR teams", "Guide operations", "Field crews"],
    highlights: ["Up to 10 people", "Shared radios, map & observations", "Crew handoffs & review workflows"],
  },
  operations: {
    audience: "Deploy Satchy into the operation.",
    summary:
      "Connect crews and shifts across one site. Add capacity, longer history, administration, and support around the way your department works.",
    why:
      "Built for a department or site where TerraSatch becomes part of the regular operating workflow rather than a single-user tool.",
    examples: [
      "Mountain operations",
      "Snow safety",
      "Engineering programs",
      "Public-safety operations",
    ],
    highlights: ["Site-level Satchy deployment", "Department workflows & APIs", "Scoped integrations & priority support"],
  },
  enterprise: {
    audience: "Connect the organization.",
    summary:
      "Coordinate sites and departments with scoped integrations, private infrastructure, security controls, extended retention, and custom workflows.",
    why:
      "Built for organizations that need TerraSatch connected to larger operational systems, data sources, sensors, mapping, or approved automation workflows.",
    examples: ["Agencies", "Multi-site operators", "Large field organizations", "Government & defense"],
    highlights: ["Multi-site deployment", "Private infrastructure & governance", "Custom integrations & support"],
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
    return { amount: `${plan.code === "operations" ? "From " : ""}${formatUsd(plan.monthly_amount_cents)}`, cadence: "/ month" };
  }
  if (plan.annual_amount_cents !== null) {
    return { amount: formatUsd(plan.annual_amount_cents), cadence: "/ year" };
  }
  return { amount: "Custom", cadence: "scoped to your organization" };
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
        if (catalogMatchesPublicPricing(catalog)) {
          // The published model stays stable; API availability gates checkout only.
          setPlans(FALLBACK_PLANS);
          setCatalogOnline(import.meta.env.VITE_TERRASATCH_CHECKOUT_ENABLED === "true");
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
    <section id="cost" className="pricing-section relative scroll-mt-24 overflow-hidden py-24 sm:py-28">
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
            Every TerraSatch plan starts with the same idea: speak into a radio or voice input, keep moving, and let Satchy turn what you report into map-aware observations and useful next steps.
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
            { icon: Check, label: "4. Use it", copy: "Review, assign, share, report, and track what happens next" },
          ].map(({ icon: Icon, label, copy }) => (
            <div key={label} className="rounded-lg border border-border/70 bg-background/72 p-4 text-left backdrop-blur-sm">
              <Icon className="size-4 text-primary" aria-hidden="true" />
              <p className="mt-3 font-display text-sm font-bold uppercase text-foreground">{label}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-5xl rounded-xl border border-primary/30 bg-background p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">One observation. More useful work.</p>
          <blockquote className="mt-3 font-display text-2xl font-semibold sm:text-3xl">“Fresh elk tracks heading northeast. Two sets.”</blockquote>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Keep the original words. Add time, location, route position, and an editable wildlife observation. Find it again when you need it.</p>
          <a href="/workspace" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline underline-offset-4">Open your field workspace <ArrowRight className="size-4" aria-hidden="true" /></a>
          <p className="mt-2 text-xs text-muted-foreground">Example observation · workspace requires an activated account and connected sources</p>
        </div>

        {!catalogOnline && !catalogChecking && (
          <div className="mx-auto mt-6 max-w-3xl rounded-lg border border-primary/20 bg-primary/5 px-5 py-4 text-center text-xs leading-relaxed text-muted-foreground">
            Trial access is by request while secure checkout is being prepared. Explore the plans below; requesting access does not charge your card.
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
                  <p className="mt-2 min-h-10 text-sm font-semibold leading-relaxed text-foreground/80">{positioning.audience}</p>
                  <p className="mt-3 min-h-24 xl:min-h-32 text-sm leading-relaxed text-muted-foreground">{positioning.summary}</p>
                </div>

                <div className="mt-6 min-h-44 rounded-lg border border-border/70 bg-terrain-deep/55 p-4">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-display text-3xl font-bold text-primary">{price.amount}</span>
                    <span className="pb-1 text-xs font-medium text-muted-foreground">{price.cadence}</span>
                  </div>

                  {isSelfServicePlan(plan) ? (
                    <p className="mt-3 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground">
                      {catalogOnline ? "$0 today" : "Planned trial"} · {plan.trial_days} days · card required at checkout. Charges begin after the trial unless canceled.
                    </p>
                  ) : (
                    <p className="mt-3 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground">
                      {plan.code === "operations" ? "Starting software price. Agents, integrations, automation, retention, and support determine final scope." : "A proposal built around your sites, security, integrations, and support needs."}
                    </p>
                  )}
                </div>

                <ul className="mt-5 space-y-2 text-sm">
                  {positioning.highlights.map(item => <li className="flex gap-2" key={item}><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><span>{item}</span></li>)}
                </ul>
                <details className="mt-6">
                  <summary className="cursor-pointer text-sm font-semibold text-foreground">Capacity &amp; plan details</summary>
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

                </details>
                <div className="mt-6 border-t border-border/60 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-foreground">Made for</p>

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

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="rounded-xl border border-border bg-background/80 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Scope by operational capability</p>
            <h3 className="mt-3 font-display text-2xl">Satchy Agents</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">A Satchy Agent connects an authorized radio, Edge device, or workflow to your field record and reviewable next steps. Scope agents around the work you need covered—not AI tokens.</p>
            <p className="mt-3 text-xs text-muted-foreground">Agent allowances and additional-agent pricing are being evaluated with pilot deployments. No add-on charge is enabled.</p>
          </article>
          <article className="rounded-xl border border-border bg-background/80 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Operations &amp; Enterprise · scoped roadmap</p>
            <h3 className="mt-3 font-display text-2xl">Drone &amp; system orchestration</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Discuss telemetry, imagery, mission preparation, and human-approved workflows as a separate integration. Autonomous operations are not included in Individual or Team.</p>
            <p className="mt-3 text-xs text-muted-foreground">Availability, supported equipment, approval policies, and implementation costs require an agreed scope. No autonomous dispatch is offered in this preview.</p>
          </article>
        </div>

        <p className="mx-auto mt-7 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          Early access: confirm connected sources and available workflows during onboarding. Hardware and custom implementation are scoped separately. The experience grows with: people, radios, channels, sites, retention, workflows, administration, integrations, and support. Availability and final scope are confirmed during evaluation.
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
              Email
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

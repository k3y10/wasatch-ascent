import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  Check,
  Cpu,
  Radio,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PricingPlan = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  points: string[];
  icon: LucideIcon;
  featured?: boolean;
  checkoutUrl?: string;
  cta: string;
};

const INDIVIDUAL_CHECKOUT_URL = (
  import.meta.env.VITE_TERRASATCH_INDIVIDUAL_CHECKOUT_URL as string | undefined
)?.trim();
const TEAM_CHECKOUT_URL = (
  import.meta.env.VITE_TERRASATCH_TEAM_CHECKOUT_URL as string | undefined
)?.trim();

const pricingPlans: PricingPlan[] = [
  {
    name: "Individual",
    price: "$24",
    cadence: "After discovery · per month",
    description:
      "Start with the 14-day Discovery Phase. If the findings justify continuing, keep the same workspace on the Individual plan.",
    points: [
      "1 site · 1 member · 1 Edge device",
      "1 active channel",
      "15 included processing hours",
      "14-day operational retention",
    ],
    icon: Radio,
    checkoutUrl: INDIVIDUAL_CHECKOUT_URL,
    cta: "Start discovery phase",
  },
  {
    name: "Team",
    price: "$399",
    cadence: "After discovery · per month",
    description:
      "Begin with a 14-day Discovery Phase for one real team workflow, then continue with the same workspace if the measured value is there.",
    points: [
      "1 site · up to 10 members",
      "Up to 6 Edge devices · 12 channels",
      "75 included processing hours",
      "90-day retention + API access",
    ],
    icon: Users,
    featured: true,
    checkoutUrl: TEAM_CHECKOUT_URL,
    cta: "Start discovery phase",
  },
  {
    name: "Operations",
    price: "From $1,999",
    cadence: "Per month · scoped deployment",
    description:
      "For a patrol, center, department, or operational team that needs a larger controlled deployment and higher-touch support.",
    points: [
      "Up to 30 members",
      "Up to 20 Edge devices · 40 channels",
      "250 included processing hours",
      "365-day retention + priority support",
    ],
    icon: Cpu,
    cta: "Scope operations",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "Multi-site · annual / contract",
    description:
      "For multi-site, private-hosting, security, integration, data-governance, and higher-assurance operating requirements.",
    points: [
      "Multi-site operating model",
      "Custom retention and integrations",
      "Security and deployment review",
      "Implementation and support plan",
    ],
    icon: Building2,
    cta: "Talk with TerraSatch",
  },
];

const PricingEstimator = () => (
  <section id="cost" className="content-auto relative overflow-hidden py-28">
    <div className="absolute inset-0 bg-gradient-to-b from-terrain-deep via-terrain-surface to-background" />
    <div className="absolute inset-0 topo-overlay opacity-35" />

    <div className="container relative mx-auto px-6">
      <div className="max-w-4xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
          Discovery first · subscription second
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl lg:text-6xl">
          Prove the workflow before you pay to scale<span className="text-primary">.</span>
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-frost-dim">
          Every new Individual or Team deployment starts with a guided 14-day Discovery Phase. We map the current workflow,
          establish a baseline, connect relevant approved inputs, and measure repeated work, handoffs, and time saved. At day 14,
          review the Discovery Report before choosing whether to continue into a paid subscription.
        </p>
      </div>

      <div className="mt-12 grid border-y border-border/70 md:grid-cols-2 xl:grid-cols-4">
        {pricingPlans.map(({ name, price, cadence, description, points, icon: Icon, featured, checkoutUrl, cta }) => (
          <article
            key={name}
            className={cn(
              "border-b border-border/70 py-8 md:odd:border-r md:px-7 xl:border-b-0 xl:border-r xl:first:pl-0 xl:last:border-r-0 xl:last:pr-0",
              featured && "bg-primary/[0.025]",
            )}
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{cadence}</p>
                <h3 className="mt-2 font-display text-3xl font-bold uppercase">{name}</h3>
              </div>
              <Icon
                className={cn("size-8 text-foreground/60", featured && "text-primary")}
                aria-hidden="true"
              />
            </div>
            <p className="mt-6 font-display text-4xl font-bold text-primary">{price}</p>
            <p className="mt-4 min-h-24 text-sm leading-relaxed text-muted-foreground">{description}</p>
            <ul className="mt-6 flex min-h-40 flex-col gap-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="mt-6 w-full"
              variant={featured ? "default" : "outline"}
            >
              <a href={checkoutUrl || "/#pilot"}>
                {checkoutUrl ? cta : name === "Individual" || name === "Team" ? "Request evaluation" : cta}
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-8 border-l border-primary pl-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
            <p className="font-display text-2xl font-bold uppercase">Discovery first. One account if you continue.</p>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            If you continue after discovery, Stripe handles payment collection while TerraSatch keeps organization membership,
            plan entitlements, API access, sites, and Edge device assignment tied to the same account. Confirm renewal pricing and
            cancellation terms at checkout. Stablecoin invoice billing is being validated and is not yet offered through this page.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Button asChild size="lg" variant="outline">
            <a href="https://api.terrasatch.com/portal/login" target="_blank" rel="noreferrer">
              Existing workspace
            </a>
          </Button>
          <Button asChild size="lg">
            <a href="/#pilot">
              Start Discovery Phase
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default PricingEstimator;

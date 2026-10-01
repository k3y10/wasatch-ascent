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
  href: string;
  cta: string;
};

const pricingPlans: PricingPlan[] = [
  {
    name: "Individual",
    price: "$24",
    cadence: "Planned launch · per month",
    description:
      "After Discovery, register for the Individual plan you want at launch. Billing will not begin while TerraSatch remains in Open Beta.",
    points: [
      "1 site · 1 member · 1 Edge device",
      "1 active channel",
      "15 included processing hours",
      "14-day operational retention",
    ],
    icon: Radio,
    href: "/#launch",
    cta: "Register for launch",
  },
  {
    name: "Team",
    price: "$399",
    cadence: "Planned launch · per month",
    description:
      "Use Discovery with a real team workflow, then register the Team plan you want at launch. No billing begins during Open Beta.",
    points: [
      "1 site · up to 10 members",
      "Up to 6 Edge devices · 12 channels",
      "75 included processing hours",
      "90-day retention + API access",
    ],
    icon: Users,
    featured: true,
    href: "/#launch",
    cta: "Register for launch",
  },
  {
    name: "Operations",
    price: "From $1,999",
    cadence: "Planned launch · scoped deployment",
    description:
      "For a patrol, center, department, or operational team that expects a larger controlled deployment and higher-touch support.",
    points: [
      "Up to 30 members",
      "Up to 20 Edge devices · 40 channels",
      "250 included processing hours",
      "365-day retention + priority support",
    ],
    icon: Cpu,
    href: "/#launch",
    cta: "Register interest",
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
    href: "/#founder-connect",
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
          Open Beta now · subscriptions later
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl lg:text-6xl">
          Use TerraSatch before billing launches<span className="text-primary">.</span>
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-frost-dim">
          TerraSatch is currently in Open Beta. Your first 14 days are a Discovery period so Satchy can learn how the platform fits
          your workflow and produce a Discovery Report. Open Beta access is free, no payment information is required, and your beta
          access does not automatically become a paid subscription.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Pricing below is planned launch pricing and may change as the product develops. At the end of Discovery, choose the plan
          you want at launch. We will notify you before TerraSatch leaves Open Beta so you can review the plan and current pricing
          before any billing is activated.
        </p>
      </div>

      <div className="mt-12 grid border-y border-border/70 md:grid-cols-2 xl:grid-cols-4">
        {pricingPlans.map(({ name, price, cadence, description, points, icon: Icon, featured, href, cta }) => (
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
            <Button asChild className="mt-6 w-full" variant={featured ? "default" : "outline"}>
              <a href={href}>
                {cta}
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
            <p className="font-display text-2xl font-bold uppercase">One workspace from beta to subscription.</p>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Open Beta does not require Stripe or a card. Day 14 records your intended launch plan only. When TerraSatch moves beyond
            Open Beta, existing users can review and activate that plan for the same workspace so their Satchy context, Discovery
            history, integrations, and operational records remain with the account.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Button asChild size="lg" variant="outline">
            <a href="/#launch">Register for Launch</a>
          </Button>
          <Button asChild size="lg">
            <a href="/#pilot">
              Join Open Beta
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default PricingEstimator;

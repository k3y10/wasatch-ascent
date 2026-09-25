import type { LucideIcon } from "lucide-react";
import { ArrowRight, Building2, Check, Database, Gauge, Radio, Route, Users } from "lucide-react";
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
};

const pricingPlans: PricingPlan[] = [
  {
    name: "14-day Satchy evaluation",
    price: "$0",
    cadence: "Two working weeks · no card required",
    description:
      "A guided evaluation designed to prove whether Satchy can improve one real workflow before any paid rollout or production commitment.",
    points: [
      "One small team and one real workflow",
      "Radio, mobile, and supported integrations where configured",
      "Satchy workflow-friction findings + estimated staff-time opportunity",
      "No card, custom provider engineering, or production SLA",
    ],
    icon: Radio,
    featured: true,
  },
  {
    name: "Team rollout",
    price: "Scoped quote",
    cadence: "Monthly or annual",
    description: "Defined only after a successful evaluation, using measured traffic and the minimum operational scope needed.",
    points: [
      "Active radios, teams, and channels",
      "Processed audio and retention volume",
      "Approved documents and review workflows",
      "Support matched to operating hours",
    ],
    icon: Users,
  },
  {
    name: "Organization",
    price: "Annual scope",
    cadence: "Custom agreement",
    description: "For multiple sites, departments, languages, integrations, or higher-assurance operating needs.",
    points: [
      "Multiple locations and operating groups",
      "Language and data-governance requirements",
      "Integrations, retention, and reporting",
      "Implementation and support plan",
    ],
    icon: Building2,
  },
];

const costDrivers = [
  {
    title: "Connected scope",
    detail: "Active radios, channels, teams, and operating locations.",
    icon: Radio,
  },
  {
    title: "Actual usage",
    detail: "Hours of audio processed and how often teams use the workflow.",
    icon: Gauge,
  },
  {
    title: "Operational memory",
    detail: "Retention, documents, reports, and approved workflow history.",
    icon: Database,
  },
  {
    title: "Complexity",
    detail: "Languages, integrations, custom routing, and support requirements.",
    icon: Route,
  },
];

const PricingEstimator = () => (
  <section id="cost" className="content-auto relative overflow-hidden py-28">
    <div className="absolute inset-0 bg-gradient-to-b from-terrain-deep via-terrain-surface to-background" />
    <div className="absolute inset-0 topo-overlay opacity-35" />

    <div className="container relative mx-auto px-6">
      <div className="max-w-4xl">
        <h2 className="font-display text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl lg:text-6xl">
          Simple scope. Honest pricing<span className="text-primary">.</span>
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-frost-dim">
          TerraSatch is priced from measured operating needs, not an oversized list of inputs. Start with one workflow,
          let Satchy show where the friction actually is, then quote only the processing, retention, integrations, and support the team will use.
        </p>
      </div>

      <div className="mt-12 grid border-y border-border/70 bg-background/35 lg:grid-cols-3">
        {pricingPlans.map(({ name, price, cadence, description, points, icon: Icon, featured }) => (
          <article
            key={name}
            className="border-b border-border/70 py-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{cadence}</p>
                <h3 className="mt-2 font-display text-3xl font-bold uppercase">{name}</h3>
              </div>
              <Icon className={cn("size-8 text-foreground/60", featured && "text-primary")} aria-hidden="true" />
            </div>
            <p className="mt-6 font-display text-4xl font-bold text-primary">{price}</p>
            <p className="mt-4 min-h-20 text-sm leading-relaxed text-muted-foreground">{description}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="font-display text-3xl font-bold uppercase">
          What changes the quote<span className="text-primary">.</span>
        </h3>
        <div className="mt-7 grid gap-7 border-t border-border/70 pt-8 md:grid-cols-2 xl:grid-cols-4">
          {costDrivers.map(({ title, detail, icon: Icon }) => (
            <div key={title} className="flex items-start gap-4">
              <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h4 className="font-display text-lg font-bold uppercase">{title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col justify-between gap-6 border-l border-primary pl-6 lg:flex-row lg:items-center">
        <div>
          <p className="font-display text-2xl font-bold uppercase">Measure before you scale.</p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The 14-day evaluation remains $0 with no card required because the workflow, users, integrations, and support are explicitly capped.
            Paid pricing is confirmed only after Satchy has enough real operating context to show what is useful and what the organization would actually keep.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href="#pilot">
              Start the 14-day evaluation
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="mailto:mccunekeaton@gmail.com?subject=TerraSatch%20deployment%20inquiry">Discuss a rollout</a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default PricingEstimator;

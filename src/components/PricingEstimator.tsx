import { ArrowRight, Building2, Check, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackFunnelEvent } from "@/lib/funnel-analytics";

const rolloutOptions = [
  {
    name: "Team rollout",
    scope: "Scoped quote",
    description: "For a team or site that has already validated a useful TerraSatch workflow.",
    points: [
      "Only the radios, channels, and workflows the team uses",
      "Retention and reporting matched to the operation",
      "Support scoped around real operating needs",
    ],
    icon: Users,
  },
  {
    name: "Organization",
    scope: "Annual scope",
    description: "For multiple sites, departments, languages, integrations, or higher-assurance requirements.",
    points: [
      "Multiple operating groups or locations",
      "Integration, governance, and retention requirements",
      "Implementation and support plan defined together",
    ],
    icon: Building2,
  },
];

const PricingEstimator = () => (
  <section id="cost" className="content-auto relative overflow-hidden py-20 sm:py-24">
    <div className="absolute inset-0 bg-gradient-to-b from-terrain-deep via-terrain-surface to-background" />
    <div className="absolute inset-0 topo-overlay opacity-30" />

    <div className="container relative mx-auto px-6">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">After a successful evaluation</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-[0.95] text-foreground sm:text-5xl lg:text-6xl">
            Scope only what your operation needs<span className="text-primary">.</span>
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground lg:text-right">
          Production pricing comes after the workflow proves useful. We scope the radios, processing, retention, integrations, and support your team actually needs.
        </p>
      </div>

      <div className="mt-10 grid border-y border-border/70 lg:grid-cols-2">
        {rolloutOptions.map(({ name, scope, description, points, icon: Icon }) => (
          <article key={name} className="border-b border-border/70 py-8 lg:border-b-0 lg:border-r lg:px-10 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">{scope}</p>
                <h3 className="mt-2 font-display text-3xl font-bold uppercase">{name}</h3>
              </div>
              <Icon className="size-7 text-primary" aria-hidden="true" />
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{description}</p>
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

      <div className="mt-10 flex flex-col justify-between gap-5 border-l border-primary pl-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-xl font-bold uppercase">Already completed an evaluation?</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The next conversation is deployment scope, not another signup flow.
          </p>
        </div>
        <Button asChild>
          <a
            href="mailto:mccunekeaton@gmail.com?subject=TerraSatch%20rollout%20inquiry"
            onClick={() => trackFunnelEvent({ stage: "convert", action: "discuss-rollout", source: "rollout-section" })}
          >
            Discuss rollout
            <ArrowRight data-icon="inline-end" />
          </a>
        </Button>
      </div>
    </div>
  </section>
);

export default PricingEstimator;

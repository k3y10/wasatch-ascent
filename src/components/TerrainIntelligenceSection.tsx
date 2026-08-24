import { ArrowRight, Camera, MapPinned, Radio, Snowflake, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import OperationalSnapshot from "@/components/OperationalSnapshot";

const terrainInputs = [
  {
    label: "Survey the cell",
    detail: "Drone imagery, elevation models, aspect, slope, and repeatable terrain context for the area crews are discussing.",
    icon: Camera,
  },
  {
    label: "Join field evidence",
    detail: "Snowpit profiles, patrol notes, radio observations, and uncertainty stay attached to the location where they were collected.",
    icon: Snowflake,
  },
  {
    label: "Compare regional context",
    detail: "Forecast zones, weather, wind loading, and published observations help a reviewer see what changed around the local report.",
    icon: Wind,
  },
];

const TerrainIntelligenceSection = () => (
  <section id="watch" className="scroll-mt-20 relative overflow-hidden bg-terrain-deep py-28">
    <div className="absolute inset-0 topo-overlay opacity-35" />
    <div className="container relative mx-auto px-6">
      <div className="grid gap-12 xl:grid-cols-[0.85fr_1.15fr] xl:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Watch · AvyTS terrain intelligence</p>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-bold uppercase leading-[0.9] text-foreground sm:text-6xl lg:text-7xl">
            See the terrain around the call<span className="text-primary">.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-frost-dim">
            TerraSatch turns a field report into more than a pin on a map. AvyTS resolves the signal against an
            inspectable terrain cell, then carries the observation into the regional picture a forecaster, patrol
            lead, or backcountry team needs to review.
          </p>
        </div>

        <OperationalSnapshot
          src="/showcase/avyts-regional-terrain.webp"
          alt="AvyTS regional terrain demo showing mapped avalanche regions, a selected Wyoming forecast area, terrain cells, and evidence controls"
          width={1587}
          height={947}
          label="AvyTS · Regional terrain"
          title="Local evidence in regional context"
          description="Reviewers can keep provider geometry, mapped observations, cell terrain, and the selected forecast region visible in one operating picture. Illustrative product preview."
          mediaClassName="aspect-[4/3] sm:aspect-[1587/947]"
          imageClassName="object-[57%_center] sm:object-center"
        />
      </div>

      <div className="mt-16 grid border-y border-border/70 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border-b border-border/70 py-8 lg:border-b-0 lg:border-r lg:pr-10">
          <MapPinned className="size-7 text-primary" aria-hidden="true" />
          <h3 className="mt-5 font-display text-3xl font-bold uppercase leading-none">
            From drone cell to regional awareness<span className="text-primary">.</span>
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Drone surveys and repeated field work create a grounded local view. The point is not automated judgment;
            it is better evidence, better context, and a clearer handoff for the person accountable for the decision.
          </p>
          <Button asChild variant="outline" className="mt-7">
            <a href="/demo-access">
              View operational examples
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
        </div>

        <div className="lg:pl-10">
          {terrainInputs.map(({ label, detail, icon: Icon }, index) => (
            <article key={label} className="flex gap-5 border-b border-border/70 py-7 last:border-b-0">
              <div className="flex size-10 shrink-0 items-center justify-center border border-primary/35 bg-primary/10">
                <Icon className="size-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">0{index + 1}</p>
                <h4 className="mt-1 font-display text-2xl font-bold uppercase">{label}</h4>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{detail}</p>
              </div>
            </article>
          ))}
          <div className="flex gap-5 py-7">
            <div className="flex size-10 shrink-0 items-center justify-center border border-primary/35 bg-primary/10">
              <Radio className="size-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">04</p>
              <h4 className="mt-1 font-display text-2xl font-bold uppercase">Keep humans in command</h4>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                TerraListen and AvyTS prepare a traceable record, briefing, or follow-up queue. A qualified reviewer
                remains responsible for publishing operational guidance and taking action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TerrainIntelligenceSection;


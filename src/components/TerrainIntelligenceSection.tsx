import { ArrowRight, Camera, Layers3, MapPinned, Radio, Snowflake, Wind } from "lucide-react";
import fieldOpsBanner from "@/assets/field-ops-banner.jpg";
import { Button } from "@/components/ui/button";

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
  <section id="terrain-intelligence" className="content-auto relative overflow-hidden bg-terrain-deep py-28">
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

        <div className="relative min-h-[25rem] overflow-hidden border border-primary/30 bg-terrain-surface shadow-[var(--shadow-elevated)] sm:min-h-[31rem]">
          <img
            src={fieldOpsBanner}
            alt="Backcountry team traveling through representative avalanche terrain"
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-terrain-deep via-terrain-deep/35 to-terrain-deep/10" />
          <div className="absolute inset-0 radio-grid" />
          <div className="absolute inset-x-[17%] bottom-[19%] top-[22%] border border-primary/60 bg-primary/10" aria-hidden="true" />
          <div className="absolute left-[17%] top-[22%] size-2 -translate-x-1/2 -translate-y-1/2 bg-primary shadow-[0_0_0_5px_hsl(var(--primary)/0.2)]" aria-hidden="true" />

          <div className="absolute left-4 top-4 flex items-center gap-2 border border-primary/40 bg-terrain-deep/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
            <Layers3 className="size-3.5" aria-hidden="true" /> Example AvyTS terrain cell
          </div>
          <div className="absolute left-[22%] top-[28%] border border-border/70 bg-background/90 px-2 py-1 font-mono text-[10px] text-foreground">
            Cell 12B · NE 38°
          </div>
          <div className="absolute bottom-4 left-4 right-4 grid gap-px border border-border/70 bg-border/70 sm:grid-cols-3">
            <div className="bg-terrain-deep/95 p-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Field signal</p>
              <p className="mt-1 text-xs text-foreground">Radio observation + snowpit</p>
            </div>
            <div className="bg-terrain-deep/95 p-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Terrain model</p>
              <p className="mt-1 text-xs text-foreground">Slope · aspect · exposure</p>
            </div>
            <div className="bg-terrain-deep/95 p-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Regional context</p>
              <p className="mt-1 text-xs text-foreground">Forecast · weather · observations</p>
            </div>
          </div>
        </div>
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

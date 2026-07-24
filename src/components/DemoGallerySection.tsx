import { ArrowUpRight, ExternalLink, MonitorPlay, Radio, Sparkles } from "lucide-react";

type DemoItem = {
  name: string;
  eyebrow: string;
  description: string;
  url: string;
  status: string;
  accent: "primary" | "green" | "blue";
  capabilities: string[];
};

const demos: DemoItem[] = [
  {
    name: "Wasatch Relay",
    eyebrow: "FLAGSHIP PRODUCT · RADIO INTELLIGENCE",
    description: "See how a field call becomes a structured, reviewable operational record with SherpAI in the loop.",
    url: import.meta.env.VITE_WASATCH_RELAY_DEMO_URL || "https://ai-radio-demo.vercel.app/",
    status: "Local preview · port 3001",
    accent: "primary",
    capabilities: ["Radio intake", "SherpAI extraction", "Human review"],
  },
  {
    name: "AvyTS",
    eyebrow: "TERRAIN SYSTEM · SNOW OPERATIONS",
    description: "Explore the avalanche terrain intelligence workflow that anchors TerraSatch field decision support.",
    url: import.meta.env.VITE_AVYTS_DEMO_URL || "https://avy.terrasatch.com",
    status: "Public preview",
    accent: "green",
    capabilities: ["Snowpack context", "Terrain exposure", "Field outputs"],
  },
  {
    name: "PyroTS",
    eyebrow: "TERRAIN SYSTEM · FIRE OPERATIONS",
    description: "Review the wildfire intelligence surface for incident context, fuels, smoke, and evidence-linked operations.",
    url: import.meta.env.VITE_PYROTS_DEMO_URL || "https://pyro.terrasatch.com",
    status: "Public preview",
    accent: "blue",
    capabilities: ["Incident picture", "Smoke and fuels", "Crew coordination"],
  },
];

const DemoGallerySection = () => {
  return (
    <section id="demos" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 topo-overlay opacity-40" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <MonitorPlay className="h-3.5 w-3.5" />
            <span className="font-mono text-[10px]">INTERACTIVE PRODUCT PREVIEWS</span>
          </div>
          <h2 className="font-display mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Step inside the <span className="text-primary">workflows</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Scroll through live product surfaces and test how TerraSatch turns field signals into useful terrain intelligence.
          </p>
        </div>

        <div className="mx-auto mb-10 flex max-w-5xl flex-col items-start gap-4 rounded-xl border border-primary/25 bg-primary/5 px-5 py-4 md:flex-row md:items-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Radio className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-3">
              <span className="font-display text-lg font-bold text-foreground">Wasatch Relay leads the stack</span>
              <span className="signal-badge signal-badge-amber text-[9px]">FIRST PRODUCT</span>
            </div>
            <p className="text-sm text-muted-foreground">Start with the AI radio workflow, then move through the terrain systems it can enrich.</p>
          </div>
          <a href="#wasatch-relay-demo" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:text-foreground">
            Start here <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10">
          {demos.map((demo, index) => (
            <DemoFrame key={demo.name} demo={demo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const DemoFrame = ({ demo, index }: { demo: DemoItem; index: number }) => {
  return (
    <article id={index === 0 ? "wasatch-relay-demo" : undefined} className="glass-card-elevated hud-frame overflow-hidden rounded-2xl">
      <div className="grid lg:grid-cols-[minmax(250px,0.34fr)_minmax(0,0.66fr)]">
        <div className="flex flex-col justify-between gap-8 border-b border-border/50 bg-background/35 p-6 md:p-8 lg:border-b-0 lg:border-r">
          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className={`signal-badge text-[9px] ${demo.accent === "primary" ? "signal-badge-amber" : "signal-badge-green"}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {demo.status}
              </span>
              <span className="font-mono text-xs text-muted-foreground">0{index + 1} / 0{demos.length}</span>
            </div>
            <div className="mb-2 font-mono text-[10px] tracking-[0.16em] text-primary">{demo.eyebrow}</div>
            <h3 className="font-display mb-3 text-3xl font-bold text-foreground md:text-4xl">{demo.name}</h3>
            <p className="leading-relaxed text-muted-foreground">{demo.description}</p>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Workflow checkpoints
            </div>
            <div className="grid gap-2">
              {demo.capabilities.map((capability) => (
                <div key={capability} className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/30 px-3 py-2 text-sm text-secondary-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {capability}
                </div>
              ))}
            </div>
            <a href={demo.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground">
              Open full preview <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="relative min-w-0 bg-black/30 p-2 md:p-3">
          <div className="mb-2 flex items-center justify-between px-2 font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground">
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-signal-green animate-pulse-glow" /> Embedded preview</span>
            <span className="hidden truncate sm:inline">{demo.url}</span>
          </div>
          <iframe
            src={demo.url}
            title={`${demo.name} interactive preview`}
            loading={index === 0 ? "eager" : "lazy"}
            allow="microphone; geolocation; clipboard-read; clipboard-write"
            className="h-[480px] w-full rounded-lg border border-border/50 bg-background md:h-[600px]"
          />
        </div>
      </div>
    </article>
  );
};

export default DemoGallerySection;
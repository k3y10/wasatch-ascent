import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const roadmap = [
  { stage: "Now", title: "TerraListen", detail: "AI radio agent + human-authorized routing" },
  { stage: "Next", title: "Operational outputs", detail: "Documents, workflows, and field integrations" },
  { stage: "Expand", title: "Terrain modules", detail: "TerraGrid + AvyTS, PyroTS, HydroTS, GeoTS, InfraTS" },
  { stage: "Future", title: "Field intelligence", detail: "SherpAI, AR views, and partner APIs" },
];


const EngagementSection = () => (
  <section className="relative overflow-hidden py-24 sm:py-28">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-terrain-deep to-background" />
    <div className="absolute inset-0 topo-overlay opacity-35" />
    <div className="container relative mx-auto px-6">
        <div id="roadmap" className="scroll-mt-24">
          <h2 className="max-w-4xl font-display text-4xl font-bold uppercase leading-none sm:text-5xl lg:text-6xl">
            TerraListen now. TerraSatch over time<span className="text-primary">.</span>
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-frost-dim">
            The radio agent is the front door. The terrain platform remains the long view.
          </p>
          <div className="relative mt-12 grid gap-8 lg:grid-cols-4">
            <div className="absolute left-[12.5%] right-[12.5%] top-3 hidden h-px bg-primary/55 lg:block" />
            {roadmap.map((item) => (
              <article key={item.stage} className="relative border-l border-border/70 pl-5 lg:border-l-0 lg:pl-0">
                <span className="relative mb-5 block size-6 rounded-full border-4 border-background bg-primary" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{item.stage}</p>
                <h3 className="mt-2 font-display text-2xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>


      <div id="founder-connect" className="mt-16 grid scroll-mt-24 gap-8 border-t border-border/70 pt-12 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <span id="investors" className="block scroll-mt-24" aria-hidden="true" />
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Investors · partners · operators</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none sm:text-5xl">Connect with Keaton<span className="text-primary">.</span></h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-frost-dim">Interested in TerraSatch as an investor, strategic partner, operator, or potential customer? Reach out to Keaton directly. Private materials and deeper company information can be shared with the right people after an initial conversation.</p>
        </div>
        <Button asChild size="lg">
          <a href="https://www.linkedin.com/in/keaton-m/" target="_blank" rel="noopener noreferrer">Connect with Keaton<ArrowUpRight data-icon="inline-end" /></a>
        </Button>
      </div>
    </div>
  </section>
);

export default EngagementSection;

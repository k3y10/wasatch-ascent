import { ArrowDown, ArrowRight, Files, MapPinned, Radio, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero-wasatch.jpg";
import topoTexture from "@/assets/topo-texture.jpg";
import { Button } from "@/components/ui/button";
import { trackFunnelEvent } from "@/lib/funnel-analytics";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    label: "Listen",
    description: "Capture authorized radio traffic and field observations without occupying the channel.",
    icon: Radio,
  },
  {
    label: "Watch",
    description: "Resolve each report against terrain, weather, forecast zones, and the current operating picture.",
    icon: MapPinned,
  },
  {
    label: "Learn",
    description: "Connect calls, snowpits, drone cells, documents, and shift records into durable operational memory.",
    icon: Files,
  },
  {
    label: "Adapt",
    description: "Prepare reviewable alerts, briefings, handoffs, and reports for approved human action.",
    icon: ShieldCheck,
  },
];

const CapabilityRail = () => (
  <div className="relative overflow-hidden border-y border-border/70 bg-terrain-deep py-16">
    <img src={topoTexture} alt="" className="absolute inset-0 size-full object-cover opacity-25" aria-hidden="true" />
    <div className="container relative mx-auto px-6">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <h2 className="max-w-4xl font-display text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl lg:text-6xl">
          Listen<span className="text-primary">.</span> Watch<span className="text-primary">.</span> Learn
          <span className="text-primary">.</span> Adapt<span className="text-primary">.</span>
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:text-right">
          One operating loop from radio signal to reviewed field action.
        </p>
      </div>

      <div className="mt-10 grid border-y border-border/70 md:grid-cols-2 xl:grid-cols-4">
        {capabilities.map(({ label, description, icon: Icon }, index) => (
          <article
            key={label}
            className="border-b border-border/70 py-7 md:px-7 md:odd:border-r xl:border-b-0 xl:border-r xl:odd:border-r xl:first:pl-0 xl:last:border-r-0 xl:last:pr-0"
          >
            <div className="flex items-center justify-between gap-4">
              <Icon className={cn("size-7", index === 0 ? "text-primary" : "text-foreground/55")} aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-primary/70">0{index + 1}</span>
            </div>
            <h3 className="mt-6 font-display text-3xl font-bold uppercase leading-none">
              {label}<span className="text-primary">.</span>
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{description}</p>
          </article>
        ))}
      </div>
    </div>
  </div>
);

const HeroSection = () => (
  <section id="terralisten" className="relative overflow-hidden pt-16">
    <div className="relative overflow-hidden border-b border-primary/20">
      <img
        src={heroImage}
        alt="Wasatch Range at sunset"
        className="absolute inset-0 size-full object-cover"
        width={1920}
        height={1080}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05080f]/95 via-[#05080f]/68 to-[#05080f]/18" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05080f]/82 via-transparent to-[#05080f]/24" />

      <div className="container relative mx-auto grid min-h-[680px] items-center gap-4 px-6 py-14 md:grid-cols-[0.95fr_1.05fr] lg:min-h-[720px] lg:py-16">
        <div className="relative z-10 max-w-2xl animate-fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-primary sm:text-xs">
            TerraSatch field intelligence platform
          </p>
          <h1 className="max-w-[12ch] font-display text-6xl font-bold uppercase leading-[0.82] tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-[6.75rem]">
            Turn field communication into field intelligence<span className="text-primary">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200 sm:text-xl">
            TerraSatch helps remote teams turn authorized radio communications and field observations into searchable, mapped,
            reviewable operational records. TerraListen captures the signal while Satchy helps organize the context for human review.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a
                href="#listen"
                onClick={() => trackFunnelEvent({ stage: "demonstrate", action: "see-terralisten-work", source: "hero" })}
              >
                See TerraListen work
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/25 bg-black/20 text-white hover:bg-white/10 hover:text-white">
              <a
                href="#pilot"
                onClick={() => trackFunnelEvent({ stage: "validate", action: "start-free-exploration", source: "hero" })}
              >
                Start free exploration
                <ArrowDown data-icon="inline-end" />
              </a>
            </Button>
          </div>

          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.24em] text-slate-400">
            Listen <span className="text-primary">&middot;</span> Watch <span className="text-primary">&middot;</span> Learn <span className="text-primary">&middot;</span> Adapt
          </p>
        </div>

        <div className="relative -mb-14 flex -translate-y-2 self-end justify-center sm:-translate-y-4 md:-mr-10 md:-translate-y-8 lg:-mr-16 lg:-translate-y-10">
          <img
            src="/terralisten-sasquatch-listening.png"
            alt="Satchy, TerraSatch's Sasquatch AI agent, listening to a field radio"
            className="w-full max-w-[390px] object-contain md:max-w-[560px] lg:max-w-[650px]"
            width={1254}
            height={1254}
            fetchPriority="high"
          />
        </div>
      </div>
    </div>

    <CapabilityRail />
  </section>
);

export default HeroSection;

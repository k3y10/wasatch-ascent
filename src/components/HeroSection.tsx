import { ArrowDown, ArrowRight, Files, MapPinned, Radio, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero-wasatch.jpg";
import topoTexture from "@/assets/topo-texture.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const capabilities = [
  { label: "Listen", description: "Capture authorized radio traffic and field observations without occupying the channel.", icon: Radio },
  { label: "Watch", description: "Resolve each report against terrain, weather, forecast zones, and the current operating picture.", icon: MapPinned },
  { label: "Learn", description: "Connect calls, snowpits, drone cells, documents, and shift records into durable operational memory.", icon: Files },
  { label: "Adapt", description: "Prepare reviewable alerts, briefings, handoffs, and reports for approved human action.", icon: ShieldCheck },
];

const CapabilityRail = () => (
  <div className="relative overflow-hidden border-y border-border/70 bg-terrain-deep py-16">
    <img src={topoTexture} alt="" className="absolute inset-0 size-full object-cover opacity-25" aria-hidden="true" />
    <div className="container relative mx-auto px-6">
      <h2 className="font-display text-4xl font-bold uppercase text-foreground sm:text-5xl lg:text-6xl">Listen<span className="text-primary">.</span> Watch<span className="text-primary">.</span> Learn<span className="text-primary">.</span> Adapt<span className="text-primary">.</span></h2>
      <div className="mt-10 grid border-y border-border/70 md:grid-cols-2 xl:grid-cols-4">
        {capabilities.map(({ label, description, icon: Icon }, index) => (
          <article key={label} className="border-b border-border/70 py-7 md:px-7 xl:border-b-0 xl:border-r">
            <Icon className={cn("size-7", index === 0 ? "text-primary" : "text-foreground/55")} />
            <h3 className="mt-6 font-display text-3xl font-bold uppercase">{label}<span className="text-primary">.</span></h3>
            <p className="mt-3 text-sm text-muted-foreground">{description}</p>
          </article>
        ))}
      </div>
    </div>
  </div>
);

const HeroSection = () => (
  <section id="terralisten" className="relative overflow-hidden pt-16">
    <div className="relative overflow-hidden border-b border-primary/20">
      <img src={heroImage} alt="Wasatch Range at sunset" className="absolute inset-0 size-full object-cover" fetchPriority="high" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05080f]/95 via-[#05080f]/68 to-[#05080f]/18" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05080f]/82 via-transparent to-[#05080f]/24" />
      <div className="container relative mx-auto grid min-h-[680px] items-center gap-4 px-6 py-14 md:grid-cols-[0.95fr_1.05fr] lg:min-h-[720px]">
        <div className="relative z-10 max-w-2xl animate-fade-in">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">TerraSatch field intelligence platform</p>
          <h1 className="max-w-[12ch] font-display text-6xl font-bold uppercase leading-[0.82] tracking-tight text-white sm:text-7xl lg:text-8xl">AI for teams beyond the edge of coverage<span className="text-primary">.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">TerraSatch connects field signal, terrain, and human judgment for backcountry teams and remote operations. Satchy is our Sasquatch AI agent, working through TerraListen to turn authorized radio traffic into a mapped, reviewable operational record without interrupting the channel.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><a href="#terralisten">Explore TerraListen <ArrowRight /></a></Button>
            <Button asChild variant="outline" size="lg" className="border-white/25 bg-black/20 text-white hover:bg-white/10"><a href="#how-it-works">See how it works <ArrowDown /></a></Button>
          </div>
          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.24em] text-slate-400">Listen <span className="text-primary">·</span> Watch <span className="text-primary">·</span> Learn <span className="text-primary">·</span> Adapt</p>
        </div>
        <div className="relative flex translate-y-0 justify-center self-center pt-8 md:translate-y-0 md:-mr-8 lg:-mr-12 lg:pt-0">
          <img src="/terralisten-sasquatch-listening.webp" alt="Satchy TerraSatch Sasquatch AI agent with radio" className="w-full max-w-[360px] object-contain md:max-w-[500px] lg:max-w-[560px]" fetchPriority="high" />
        </div>
      </div>
    </div>
    <CapabilityRail />
  </section>
);

export default HeroSection;

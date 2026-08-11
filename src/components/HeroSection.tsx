import { ArrowDown, ArrowRight, Files, Mountain, Radio, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero-wasatch.jpg";
import topoTexture from "@/assets/topo-texture.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    label: "Listen",
    description: "Capture authorized radio traffic in parallel without occupying the channel.",
    icon: Radio,
  },
  {
    label: "Watch",
    description: "Place every call against time, location, terrain, and operating context.",
    icon: Mountain,
  },
  {
    label: "Learn",
    description: "Build a searchable, multilingual record from conversations and documents.",
    icon: Files,
  },
  {
    label: "Adapt",
    description: "Prepare alerts, handoffs, and reports for human review and approved action.",
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
      <div className="absolute inset-0 bg-gradient-to-r from-background/98 via-background/78 to-terrain-deep/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-background/28" />

      <div className="container relative mx-auto grid min-h-[680px] items-center gap-4 px-6 py-14 md:grid-cols-[0.95fr_1.05fr] lg:min-h-[720px] lg:py-16">
        <div className="relative z-10 max-w-2xl animate-fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <h1 className="max-w-[10ch] font-display text-6xl font-bold uppercase leading-[0.82] tracking-tight text-foreground sm:text-7xl lg:text-8xl xl:text-[6.75rem]">
            AI that hears the field<span className="text-primary">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-frost sm:text-xl">
            TerraListen turns authorized radio traffic into a multilingual, reviewable operational record&mdash;without
            interrupting the channel.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#pilot">
                Start a limited pilot
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#how-it-works">
                See how it works
                <ArrowDown data-icon="inline-end" />
              </a>
            </Button>
          </div>

          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            TerraListen <span className="text-primary">&middot;</span> A TerraSatch capability
          </p>
        </div>

        <div className="relative -mb-14 flex self-end justify-center md:-mr-10 lg:-mr-16">
          <img
            src="/terralisten-sasquatch-listening.webp"
            alt="TerraListen Sasquatch listening to a field radio"
            className="w-full max-w-[390px] object-contain md:max-w-[560px] lg:max-w-[650px]"
            width={1200}
            height={1200}
            fetchPriority="high"
            style={{
              WebkitMaskImage: "radial-gradient(ellipse at center, black 58%, transparent 78%)",
              maskImage: "radial-gradient(ellipse at center, black 58%, transparent 78%)",
            }}
          />
        </div>
      </div>
    </div>

    <CapabilityRail />
  </section>
);

export default HeroSection;


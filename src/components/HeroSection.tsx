import { ArrowRight, Files, Mountain, Radio, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero-wasatch.jpg";
import topoTexture from "@/assets/topo-texture.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    label: "Listen",
    description: "Radio, voice, multilingual.",
    detail: "TerraListen",
    icon: Radio,
  },
  {
    label: "Watch",
    description: "Terrain, weather, sensors.",
    detail: "Live field awareness",
    icon: Mountain,
  },
  {
    label: "Learn",
    description: "Context, documents, workflows.",
    detail: "Operational memory",
    icon: Files,
  },
  {
    label: "Adapt",
    description: "Alerts, briefings, human-approved action.",
    detail: "Decisions with oversight",
    icon: ShieldCheck,
  },
];

const waveformBars = [
  4, 5, 6, 8, 7, 10, 12, 9, 14, 20, 12, 18, 28, 16, 11, 22, 34, 18, 25, 52, 78, 108, 58, 82,
  42, 22, 36, 66, 32, 19, 26, 44, 24, 16, 22, 31, 18, 14, 16, 22, 14, 11, 9, 8, 7, 6, 5, 4,
];

const HeroWaveform = () => (
  <div className="flex w-full items-center" aria-label="TerraListen live radio signal" role="img">
    <span className="size-2 shrink-0 rounded-full bg-primary shadow-[0_0_16px_hsl(var(--primary)/0.8)]" />
    <span className="h-px min-w-4 flex-1 bg-primary/80" />
    <div className="flex h-28 items-center gap-[3px] px-2 sm:gap-1">
      {waveformBars.map((height, index) => (
        <span
          key={`${height}-${index}`}
          className="radio-wave-bar w-px shrink-0 bg-primary sm:w-0.5"
          style={{ height, animationDelay: `${index * 28}ms` }}
        />
      ))}
    </div>
    <span className="h-px min-w-4 flex-1 bg-primary/80" />
    <span className="size-2 shrink-0 rounded-full bg-primary shadow-[0_0_16px_hsl(var(--primary)/0.8)]" />
  </div>
);

const CapabilityRail = () => (
  <div className="relative overflow-hidden border-y border-border/70 bg-terrain-deep py-12 sm:py-16">
    <img
      src={topoTexture}
      alt=""
      className="absolute inset-0 size-full object-cover opacity-45"
      aria-hidden="true"
    />
    <img
      src="/terralisten-sasquatch.png"
      alt=""
      className="absolute -bottom-24 right-0 hidden w-80 grayscale opacity-[0.08] mix-blend-luminosity lg:block"
      aria-hidden="true"
    />

    <div className="container relative mx-auto px-6">
      <h2 className="max-w-5xl font-display text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl lg:text-6xl">
        Listen<span className="text-primary">.</span> Watch<span className="text-primary">.</span> Learn
        <span className="text-primary">.</span> Adapt<span className="text-primary">.</span>
      </h2>

      <div className="relative mt-10 grid md:grid-cols-2 xl:grid-cols-4">
        <div className="absolute left-[12.5%] right-[12.5%] top-0 hidden h-px bg-primary/70 xl:block" />
        {capabilities.map(({ label, description, detail, icon: Icon }, index) => (
          <article
            key={label}
            className="relative border-t border-border/70 py-7 md:px-7 md:odd:border-r xl:border-t-0 xl:border-r xl:odd:border-r xl:first:pl-0 xl:last:border-r-0 xl:last:pr-0"
          >
            <div className="absolute -top-2 left-0 size-4 rounded-full border-2 border-primary bg-terrain-deep md:left-7 xl:left-1/2 xl:-translate-x-1/2" />
            <Icon className={cn("size-10", index === 0 ? "text-primary" : "text-foreground/65")} aria-hidden="true" />
            <h3 className="mt-5 font-display text-3xl font-bold uppercase leading-none">
              {label}<span className="text-primary">.</span>
            </h3>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground">
              {description}
            </p>
            <p
              className={cn(
                "mt-3 text-xs uppercase",
                index === 0
                  ? "font-semibold tracking-[0.16em] text-primary"
                  : "tracking-[0.12em] text-foreground/55",
              )}
            >
              {detail}
            </p>
          </article>
        ))}
      </div>
    </div>
  </div>
);

const HeroSection = () => (
  <section id="terralisten" className="relative overflow-hidden pt-16">
    <div className="relative flex min-h-[560px] items-center overflow-hidden border-b border-primary/20 sm:min-h-[590px] lg:min-h-[600px]">
      <img
        src={heroImage}
        alt="Wasatch Range at sunset"
        className="absolute inset-0 size-full object-cover"
        width={1920}
        height={1080}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/48 to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/88 via-transparent to-background/22" />

      <div className="container relative mx-auto px-6 py-16 sm:py-20">
        <div className="max-w-2xl animate-fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <h1 className="max-w-[10ch] font-display text-6xl font-bold uppercase leading-[0.82] tracking-tight text-foreground sm:text-7xl lg:text-8xl xl:text-[6.75rem]">
            AI that<br />hears<br />the field<span className="text-primary">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-frost sm:text-xl">
            TerraListen turns authorized radio traffic into multilingual, evidence-linked action&mdash;without interrupting
            the channel.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#pilot">
                Start a limited pilot
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#cost">Estimate your deployment</a>
            </Button>
          </div>

          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            TerraListen <span className="text-primary">&middot;</span> A TerraSatch capability
          </p>
        </div>

        <div className="mt-10 lg:absolute lg:bottom-10 lg:left-[58%] lg:right-6 lg:mt-0">
          <HeroWaveform />
        </div>
      </div>
    </div>

    <CapabilityRail />
  </section>
);

export default HeroSection;


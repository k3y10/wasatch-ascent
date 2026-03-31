import arHudVision from "@/assets/ar-hud-vision.jpg";
import { Glasses, Eye, Mountain, Radio, Shield } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const hudFeatures = [
  {
    icon: Mountain,
    title: "Terrain Hazard Overlay",
    desc: "Avalanche paths, rockfall corridors, and instability zones rendered as transparent wireframes directly onto the slope ahead.",
  },
  {
    icon: Eye,
    title: "Real-Time Conditions",
    desc: "Live snowpack data, wind vectors, temperature gradients, and AvyTS hazard scores streaming to your field of view.",
  },
  {
    icon: Radio,
    title: "Team & Comms Layer",
    desc: "See teammate positions, active radio channels, and mission-critical alerts without taking your eyes off the terrain.",
  },
  {
    icon: Shield,
    title: "Safe Corridor Routing",
    desc: "AI-computed safe travel corridors highlighted in real time, adapting as conditions change throughout the day.",
  },
];

const ARVisionSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 topo-overlay opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <span className="font-mono text-[10px]">FUTURE VISION</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Augmented <span className="text-primary">Field Intelligence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The next frontier — terrain intelligence projected through shield-based glass frames
            and AR goggles, putting hazard awareness directly in your line of sight.
          </p>
        </ScrollReveal>

        {/* Hero image */}
        <ScrollReveal>
          <div className="max-w-5xl mx-auto glass-card-elevated rounded-2xl overflow-hidden hud-frame mb-12">
            <div className="glass-highlight rounded-2xl">
              <div className="relative">
                <img
                  src={arHudVision}
                  alt="AR HUD terrain overlay showing avalanche path corridors and elevation data through ski goggles"
                  className="w-full object-cover"
                  loading="lazy"
                  width={1920}
                  height={768}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="flex items-center gap-3 mb-2">
                    <Glasses className="w-5 h-5 text-primary" />
                    <span className="font-mono text-[10px] text-primary tracking-widest">AI/AR VISUALIZATION HUD</span>
                  </div>
                  <p className="text-foreground font-display text-lg md:text-xl font-bold max-w-xl">
                    See hazards before you reach them. Navigate with terrain intelligence projected in real time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Feature cards */}
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-4">
          {hudFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={i * 0.1}>
                <div className="glass-card-elevated rounded-xl p-6 h-full group hover:shadow-[var(--shadow-glow)] transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1.5">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Aspirational note */}
        <ScrollReveal delay={0.5} className="mt-12 text-center">
          <div className="glass-card rounded-xl px-8 py-4 inline-block">
            <span className="font-mono text-[11px] text-muted-foreground">
              RESEARCH & DEVELOPMENT — ACTIVE PILOT PROGRAM
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ARVisionSection;

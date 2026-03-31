import fieldOpsBanner from "@/assets/field-ops-banner.jpg";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const useCases = [
  {
    title: "Ski Resorts & Patrol",
    desc: "Hazard mapping and daily briefings with AvyTS overlays for controlled slope management.",
    icon: "⛰️",
  },
  {
    title: "Backcountry Guides",
    desc: "Education, route planning, and field operations with terrain-aware decision support.",
    icon: "🎿",
  },
  {
    title: "Search & Rescue",
    desc: "Rapid terrain analysis and operational planning for mountain rescue teams.",
    icon: "🚁",
  },
  {
    title: "Avalanche Centers",
    desc: "Leveraging AvyTS analytics and forecast integration for regional warnings.",
    icon: "⛷️",
  },
  {
    title: "Land Managers",
    desc: "Comprehensive terrain tracking, ecosystem insights, and environmental compliance.",
    icon: "🏔️",
  },
  {
    title: "Wildfire Response",
    desc: "Real-time hazard assessment, fuel analysis, and evacuation planning.",
    icon: "🔥",
  },
];

const FieldOpsSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <span className="font-mono text-[10px]">PURPOSE-BUILT</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built for Every <span className="text-primary">Team</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you run a patrol, guide in the backcountry, respond to emergencies,
            or manage terrain — TerraSatch scales to your mission.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-5xl mx-auto glass-card-elevated rounded-2xl overflow-hidden hud-frame">
            <div className="glass-highlight rounded-2xl">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={fieldOpsBanner}
                  alt="Field operations team on a snowy ridge in the Wasatch Range"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={1920}
                  height={768}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <div className="font-mono text-[10px] text-primary/70 tracking-widest">FIELD OPERATIONS</div>
                  <div className="font-display text-2xl font-bold text-foreground">Wasatch Range — Active Patrol</div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {useCases.map((item, i) => (
                    <ScrollReveal key={item.title} delay={i * 0.08}>
                      <div className="glass-card rounded-xl p-5 h-full hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                        <div className="text-2xl mb-3">{item.icon}</div>
                        <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FieldOpsSection;

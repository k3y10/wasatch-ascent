import {
  Radar, Satellite, Radio, Cpu, Shield, Globe, Wifi, Layers, Code, Glasses, Zap
} from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const techCategories = [
  {
    group: "Field Hardware",
    items: [
      {
        icon: Radar,
        title: "Drone Mapping & Photogrammetry",
        desc: "High-resolution aerial capture for corridor mapping and rapid situational awareness.",
        tags: ["Ortho", "GeoTIFF", "LAS/LAZ"],
      },
      {
        icon: Layers,
        title: "LiDAR Elevation & 3D Surface",
        desc: "Centimeter-grade elevation, slope, and aspect models for engineering-grade analyses.",
        tags: ["Point Cloud", "DEM", "Aspect"],
      },
      {
        icon: Zap,
        title: "GPR Subsurface Intelligence",
        desc: "Ground-penetrating radar reveals layer density, permafrost, and buried structure changes.",
        tags: ["Layer Density", "Permafrost", "Subsurface"],
      },
    ],
  },
  {
    group: "Connectivity",
    items: [
      {
        icon: Satellite,
        title: "Starlink & LEO Backhaul",
        desc: "Dual-dish Starlink plus Ka/Ku-band LEO uplinks keep telemetry and AI updates flowing with <50ms latency.",
        tags: ["<50ms", "Failover", "Encrypted"],
      },
      {
        icon: Wifi,
        title: "Wireless Mesh & LoRa",
        desc: "Self-healing mesh nodes, LoRaWAN beacons, and microwave relays push awareness across ridgelines.",
        tags: ["5-20mi Range", "Multi-Band", "Mesh"],
      },
      {
        icon: Radio,
        title: "AI Radio Comms (SDR)",
        desc: "AI-driven SDR stack tunes spectrum, prioritizes mission-critical packets, and bridges voice-to-data channels.",
        tags: ["Channel Hop", "Voice/Data", "Diagnostics"],
      },
    ],
  },
  {
    group: "Intelligence",
    items: [
      {
        icon: Cpu,
        title: "Edge Computing",
        desc: "Edge-deployed AvyTS micro-models process field data locally with offline-first sync for remote teams.",
        tags: ["Offline-First", "Local AI", "Auto-Sync"],
      },
      {
        icon: Globe,
        title: "Real-Time Data Fusion",
        desc: "Continuous ingestion of drone, LiDAR, GPR, and IoT feeds into a single decision graph.",
        tags: ["Streaming", "Petabyte", "Sub-Second"],
      },
      {
        icon: Shield,
        title: "Blockchain + Quantum-Safe",
        desc: "Immutable audit trails for field observations and flight logs with quantum-resistant hashing.",
        tags: ["Tamper-Proof", "Smart Contracts", "QR Keys"],
      },
      {
        icon: Glasses,
        title: "AI/AR Visualization HUD",
        desc: "Overlays for mobile, AR goggles, and command nodes to highlight hazards and safe corridors in real time.",
        tags: ["Shield Glass", "Goggles", "Command"],
      },
      {
        icon: Code,
        title: "API-First Architecture",
        desc: "RESTful and GraphQL APIs expose AvyTS outputs, live telemetry, and decision logs for partner integration.",
        tags: ["REST", "GraphQL", "SDKs"],
      },
    ],
  },
];

const TechStackSection = () => {
  return (
    <section id="tech" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 topo-overlay opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <span className="font-mono text-[10px]">ENTERPRISE STACK</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Core <span className="text-primary">Technology</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built on cutting-edge AI, distributed systems, and field-grade hardware to deliver
            the most advanced terrain intelligence platform available.
          </p>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto space-y-12">
          {techCategories.map((cat, ci) => (
            <div key={cat.group}>
              <ScrollReveal delay={ci * 0.1}>
                <div className="font-mono text-[11px] text-primary/60 tracking-widest mb-4 uppercase">
                  {cat.group}
                </div>
              </ScrollReveal>

              <div className={`grid gap-4 ${cat.items.length > 3 ? "sm:grid-cols-2 lg:grid-cols-3" : `sm:grid-cols-2 lg:grid-cols-${cat.items.length}`}`}>
                {cat.items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <ScrollReveal key={item.title} delay={ci * 0.1 + i * 0.08}>
                      <div className="glass-card-elevated rounded-xl p-6 h-full group hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:translate-y-[-2px]">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display font-bold text-sm text-foreground mb-1.5">
                              {item.title}
                            </h3>
                            <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">
                              {item.desc}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="font-mono text-[9px] text-primary/70 bg-primary/5 rounded px-2 py-0.5 border border-primary/10"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;

import { useState, useEffect, useCallback } from "react";
import fieldOpsBanner from "@/assets/field-ops-banner.jpg";
import envWildfire from "@/assets/env-wildfire.jpg";
import envWater from "@/assets/env-water.jpg";
import envGeology from "@/assets/env-geology.jpg";
import envInfrastructure from "@/assets/env-infrastructure.jpg";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const environments = [
  {
    key: "avalanche",
    label: "Avalanche",
    module: "AvyTS",
    image: fieldOpsBanner,
    headline: "Snowpack & Avalanche Intelligence",
    desc: "Layer-aware views to understand instability, slabs, and avalanche paths. Real-time snowpack modeling and weak-layer detection for patrol and backcountry teams.",
    tags: ["Snowpit Reconstruction", "Storm-Cycle Timeline", "Weak-Layer Detection"],
    color: "from-primary/15",
  },
  {
    key: "wildfire",
    label: "Wildfire",
    module: "PyroTS",
    image: envWildfire,
    headline: "Wildfire Risk & Burn Analysis",
    desc: "Fuel load assessment, burn-scar mapping, and live spread modeling using multispectral imaging fused with terrain-aware weather inputs.",
    tags: ["Fire Risk Scoring", "Burn Mapping", "Fuel Analysis"],
    color: "from-primary/15",
  },
  {
    key: "water",
    label: "Water",
    module: "HydroTS",
    image: envWater,
    headline: "Hydrology & Watershed Modeling",
    desc: "Watershed modeling, flood forecasting, and streamflow prediction built on synchronized elevation, precipitation, and groundwater telemetry.",
    tags: ["Watershed Analysis", "Flood Modeling", "Water Resources"],
    color: "from-primary/15",
  },
  {
    key: "geology",
    label: "Geology",
    module: "GeoTS",
    image: envGeology,
    headline: "Geological Mapping & Rockfall",
    desc: "Geological mapping, rock anchoring intelligence, and rockfall path modeling combining morphology, subsurface data, and historical activity.",
    tags: ["Slope Stability", "Rockfall Paths", "Geological Mapping"],
    color: "from-primary/15",
  },
  {
    key: "infrastructure",
    label: "Infrastructure",
    module: "InfraTS",
    image: envInfrastructure,
    headline: "Infrastructure & Environmental",
    desc: "Asset monitoring, inspection automation, and environmental compliance scoring for roads, utilities, and sensitive sites.",
    tags: ["Asset Monitoring", "Inspection", "Environmental Compliance"],
    color: "from-amber-500/20",
  },
];

const FieldOpsSection = () => {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % environments.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const env = environments[active];

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
          <div
            className="max-w-5xl mx-auto glass-card-elevated rounded-2xl overflow-hidden hud-frame"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="glass-highlight rounded-2xl">
              {/* Image slideshow */}
              <div className="relative h-72 md:h-96 overflow-hidden">
                {environments.map((e, i) => (
                  <img
                    key={e.key}
                    src={e.image}
                    alt={e.headline}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                    style={{ opacity: i === active ? 1 : 0 }}
                    loading="lazy"
                    width={1920}
                    height={768}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-r ${env.color} to-transparent transition-colors duration-1000`} />

                {/* HUD overlay text */}
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="font-mono text-[10px] text-primary/70 tracking-widest mb-1">
                    {env.module} — ACTIVE MODULE
                  </div>
                  <div
                    className="font-display text-2xl md:text-3xl font-bold text-foreground transition-opacity duration-500"
                    key={env.key + "-headline"}
                  >
                    {env.headline}
                  </div>
                </div>
              </div>

              {/* Content area */}
              <div className="p-8">
                {/* Environment tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {environments.map((e, i) => (
                    <button
                      key={e.key}
                      onClick={() => setActive(i)}
                      className={`
                        font-mono text-[11px] tracking-wider px-4 py-2 rounded-lg transition-all duration-300 border
                        ${i === active
                          ? "bg-primary/15 text-primary border-primary/30 shadow-[var(--shadow-glow)]"
                          : "glass-card text-muted-foreground border-border/50 hover:text-foreground hover:border-border"
                        }
                      `}
                    >
                      {e.label.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                  {env.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {env.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] text-primary/70 bg-primary/5 rounded px-3 py-1 border border-primary/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Progress dots */}
                <div className="flex gap-1.5 mt-6">
                  {environments.map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-500 cursor-pointer"
                      style={{
                        width: i === active ? 32 : 8,
                        backgroundColor: i === active
                          ? "hsl(var(--primary))"
                          : "hsl(var(--muted-foreground) / 0.2)",
                      }}
                      onClick={() => setActive(i)}
                    />
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

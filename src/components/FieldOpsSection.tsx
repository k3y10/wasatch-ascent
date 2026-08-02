import { useState, useEffect, useCallback } from "react";
import fieldOpsBanner from "@/assets/field-ops-banner.jpg";
import envWildfire from "@/assets/env-wildfire.jpg";
import envGeology from "@/assets/env-geology.jpg";
import envInfrastructure from "@/assets/env-infrastructure.jpg";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const environments = [
  {
    key: "avalanche",
    label: "Avalanche",
    module: "AVYTS + WASATCH RELAY",
    image: fieldOpsBanner,
    headline: "Avalanche Forecasting & Snow Safety",
    desc: "Recognize instability observations, weak-layer concerns, slope aspects, elevations, weather changes, mitigation activity, and travel decisions communicated over the radio.",
    tags: ["Mapped Observations", "Red-Flag Extraction", "Mitigation Timeline", "Forecast Handoff"],
    color: "from-sky-500/20",
  },
  {
    key: "patrol",
    label: "Ski Patrol",
    module: "MOUNTAIN OPERATIONS",
    image: fieldOpsBanner,
    headline: "Ski Patrol & Mountain Operations",
    desc: "Document incidents, closures, route checks, medical responses, lift and equipment conditions, mitigation work, and information needed at shift change.",
    tags: ["Incident Log", "Closure Status", "Medical Timeline", "Shift Handoff"],
    color: "from-blue-500/20",
  },
  {
    key: "transportation",
    label: "Transportation",
    module: "INFRATS + WASATCH RELAY",
    image: envInfrastructure,
    headline: "Canyon & Transportation Operations",
    desc: "Structure road conditions, closures, slide-path activity, equipment locations, traffic restrictions, weather impacts, and changing canyon conditions.",
    tags: ["Road Status", "Equipment Tracking", "Closure Timeline", "Mapped Hazards"],
    color: "from-amber-500/20",
  },
  {
    key: "wildfire",
    label: "Wildfire",
    module: "PYROTS + WASATCH RELAY",
    image: envWildfire,
    headline: "Wildfire, Forestry & Fuels Teams",
    desc: "Organize fire behavior, crew locations, hazards, access routes, equipment, containment activity, and changing field conditions from authorized communications.",
    tags: ["Crew Updates", "Hazard Extraction", "Resource Timeline", "Operational Map"],
    color: "from-orange-500/20",
  },
  {
    key: "sar",
    label: "Search & Rescue",
    module: "INCIDENT SUPPORT",
    image: envGeology,
    headline: "Search & Rescue Coordination",
    desc: "Capture assignments, clues, locations, team movement, medical information, changing search areas, and critical decisions in a searchable incident record.",
    tags: ["Team Assignments", "Clue Log", "Search Map", "Incident Summary"],
    color: "from-red-500/20",
  },
  {
    key: "infrastructure",
    label: "Utilities",
    module: "INFRATS + WASATCH RELAY",
    image: envInfrastructure,
    headline: "Utilities & Remote Infrastructure",
    desc: "Record inspections, outages, asset conditions, access problems, maintenance activity, and field crew updates without replacing established radio procedures.",
    tags: ["Inspection Record", "Outage Timeline", "Asset Events", "Crew Handoff"],
    color: "from-yellow-500/20",
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
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const env = environments[active];

  return (
    <section id="field-ops" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <span className="font-mono text-[10px]">OPERATION-SPECIFIC RADIO AGENTS</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Configure the Agent for <span className="text-primary">Each Team</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The radio workflow remains consistent while call signs, terminology, event types, alert rules,
            maps, reports, and retention policies are configured around the organization using it.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div
            className="max-w-5xl mx-auto glass-card-elevated rounded-2xl overflow-hidden hud-frame"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="glass-highlight rounded-2xl">
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

                <div className="absolute bottom-6 left-6 md:left-8 right-6 md:right-8">
                  <div className="font-mono text-[10px] text-primary/70 tracking-widest mb-1">
                    {env.module}
                  </div>
                  <div
                    className="font-display text-2xl md:text-3xl font-bold text-foreground transition-opacity duration-500"
                    key={env.key + "-headline"}
                  >
                    {env.headline}
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  {environments.map((e, i) => (
                    <button
                      key={e.key}
                      onClick={() => setActive(i)}
                      className={`font-mono text-[10px] tracking-wider px-3.5 py-2 rounded-lg transition-all duration-300 border ${
                        i === active
                          ? "bg-primary/15 text-primary border-primary/30 shadow-[var(--shadow-glow)]"
                          : "glass-card text-muted-foreground border-border/50 hover:text-foreground hover:border-border"
                      }`}
                    >
                      {e.label.toUpperCase()}
                    </button>
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed mb-5 max-w-3xl">
                  {env.desc}
                </p>

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

                <div className="flex gap-1.5 mt-6">
                  {environments.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Show use case ${i + 1}`}
                      className="h-1 rounded-full transition-all duration-500 cursor-pointer"
                      style={{
                        width: i === active ? 32 : 8,
                        backgroundColor:
                          i === active
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

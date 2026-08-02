import {
  Braces,
  CloudUpload,
  Database,
  Layers3,
  Plane,
  Radio,
  Satellite,
  ScanLine,
  Snowflake,
} from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const stages = [
  {
    status: "WORKING PROTOTYPE",
    statusClass: "signal-badge-green",
    title: "Wasatch Relay foundation",
    description:
      "Radio and audio ingestion, transcription, structured event extraction, map-linked updates, timelines, searchable records, and generated summaries.",
    items: ["Radio workflow", "SherpAI extraction", "Maps and timelines", "Reports and handoffs"],
  },
  {
    status: "PILOT DEVELOPMENT",
    statusClass: "signal-badge-amber",
    title: "Organization-specific deployments",
    description:
      "Multiple authorized channels, configurable call signs, custom field language, alert rules, permissions, offline buffering, and customer system integrations.",
    items: ["Channel profiles", "Keyword and event rules", "Team permissions", "Dispatch and GIS integration"],
  },
  {
    status: "RESEARCH ROADMAP",
    statusClass: "",
    title: "Expanded terrain sensing",
    description:
      "AI-assisted snowpit interpretation, drone terrain-cell surveys, remote field synchronization, forecast assimilation, LiDAR, and future sensor payload research.",
    items: ["AI snowpit review", "Drone cell surveys", "Starlink field sync", "Forecast and observation fusion"],
  },
];

const snowpitFlow = [
  {
    icon: Snowflake,
    step: "Ground truth",
    text: "A qualified field operator records snowpit layers, hardness, grain information, test results, photos, temperature, aspect, elevation, and location.",
  },
  {
    icon: Braces,
    step: "AI-assisted interpretation",
    text: "SherpAI structures the pit, compares it with prior observations and weather context, and flags areas that require professional review.",
  },
  {
    icon: Plane,
    step: "Terrain-cell survey",
    text: "A drone documents the surrounding cell for surface conditions, avalanche evidence, wind effects, terrain features, and access information.",
  },
  {
    icon: Satellite,
    step: "Remote synchronization",
    text: "Snowpit, drone, radio, and weather information synchronize through available connectivity, including Starlink-supported field nodes where appropriate.",
  },
  {
    icon: Layers3,
    step: "Operational layer update",
    text: "Verified observations are combined into a mapped record with timestamps, source information, forecast context, and confidence indicators.",
  },
];

const RoadmapSection = () => {
  return (
    <section id="roadmap" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 topo-overlay opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-terrain-surface/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <span className="font-mono text-[10px]">CAPABILITY STAGES</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Build the Radio Layer First. Expand the <span className="text-primary">Terrain Layer</span> Next.
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            TerraSatch separates what can be demonstrated today from what must be developed and tested with
            qualified partners. The AI-radio agent is the initial operating product; advanced sensing remains a staged roadmap.
          </p>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-5 mb-20">
          {stages.map((stage, index) => (
            <ScrollReveal key={stage.title} delay={index * 0.08}>
              <div className="glass-card-elevated rounded-2xl p-6 h-full hud-frame">
                <div className={`signal-badge ${stage.statusClass} w-fit mb-5`}>
                  <span className="font-mono text-[9px]">{stage.status}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{stage.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{stage.description}</p>
                <div className="space-y-2.5">
                  {stage.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-secondary-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              <div>
                <div className="font-mono text-[10px] text-primary/70 tracking-widest mb-2">AVYTS RESEARCH CONCEPT</div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  AI Snowpit Analysis + Drone Terrain-Cell Survey
                </h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                The drone supports surrounding surface and terrain observations. Snowpack structure still depends on
                qualified ground measurements unless a future validated sensor payload can provide additional subsurface information.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-5 gap-3 mb-8">
            {snowpitFlow.map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.step} delay={index * 0.06}>
                  <div className="glass-card rounded-xl p-5 h-full relative overflow-hidden group hover:border-primary/30 transition-colors">
                    <div className="font-mono text-[9px] text-primary/50 mb-4">{String(index + 1).padStart(2, "0")}</div>
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-display font-bold text-sm text-foreground mb-2">{item.step}</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal>
            <div className="glass-card rounded-2xl p-6 md:p-8 grid md:grid-cols-4 gap-5">
              {[
                { icon: Radio, title: "Radio observations", text: "Field reports continue to update the same operational record." },
                { icon: CloudUpload, title: "Remote upload", text: "Buffer locally and synchronize when approved connectivity is available." },
                { icon: Database, title: "Shared server record", text: "Keep source data, AI output, corrections, and timestamps together." },
                { icon: ScanLine, title: "Forecast context", text: "Compare verified observations with weather and forecasting information." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-sm text-foreground">{item.title}</div>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;

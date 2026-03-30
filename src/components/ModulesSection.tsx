import avytsLogo from "@/assets/avyts-logo.png";
import pyrotsLogo from "@/assets/pyrots-logo.png";
import hydrotsLogo from "@/assets/hydrots-logo.png";
import geotsLogo from "@/assets/geots-logo.png";
import infratsLogo from "@/assets/infrats-logo.png";
import { useState } from "react";

const modules = [
  {
    id: "avyts",
    name: "AvyTS",
    full: "Avalanche Terrain Systems",
    logo: avytsLogo,
    status: "ACTIVE",
    color: "from-amber-400 to-orange-500",
    borderColor: "border-amber/30",
    desc: "Real-time avalanche terrain exposure analysis, snowpack modeling, and backcountry risk classification across the Wasatch and beyond.",
    metrics: [
      { label: "Zones Tracked", value: "2,847" },
      { label: "Risk Models", value: "12" },
      { label: "Update Freq", value: "15min" },
    ],
  },
  {
    id: "pyrots",
    name: "PyroTS",
    full: "Wildfire Terrain Systems",
    logo: pyrotsLogo,
    status: "ACTIVE",
    color: "from-red-500 to-orange-600",
    borderColor: "border-signal-red/30",
    desc: "Wildfire behavior prediction, terrain-driven fire spread modeling, and suppression resource optimization for complex fire environments.",
    metrics: [
      { label: "Fire Zones", value: "1,203" },
      { label: "Spread Models", value: "8" },
      { label: "Sensors", value: "340" },
    ],
  },
  {
    id: "hydrots",
    name: "HydroTS",
    full: "Water Terrain Systems",
    logo: hydrotsLogo,
    status: "ACTIVE",
    color: "from-cyan-400 to-blue-500",
    borderColor: "border-frost/30",
    desc: "Watershed hydrology, streamflow prediction, flood risk assessment, and water resource terrain analysis for mountain and valley systems.",
    metrics: [
      { label: "Watersheds", value: "489" },
      { label: "Stream Gauges", value: "1,847" },
      { label: "Forecast Range", value: "72h" },
    ],
  },
  {
    id: "geots",
    name: "GeoTS",
    full: "Geological Terrain Systems",
    logo: geotsLogo,
    status: "BETA",
    color: "from-green-500 to-emerald-600",
    borderColor: "border-forest/30",
    desc: "Subsurface geological modeling, landslide susceptibility mapping, and terrain stability analysis for construction and resource planning.",
    metrics: [
      { label: "Geological Layers", value: "24" },
      { label: "Stability Index", value: "0.94" },
      { label: "Coverage", value: "18K mi²" },
    ],
  },
  {
    id: "infrats",
    name: "InfraTS",
    full: "Infrastructure Terrain Systems",
    logo: infratsLogo,
    status: "BETA",
    color: "from-amber-500 to-yellow-600",
    borderColor: "border-amber-dim/40",
    desc: "Infrastructure vulnerability modeling against terrain hazards—roads, utilities, pipelines, and built assets in mountain and slope environments.",
    metrics: [
      { label: "Assets Tracked", value: "12,400" },
      { label: "Risk Layers", value: "16" },
      { label: "Alert Zones", value: "892" },
    ],
  },
];

const ModulesSection = () => {
  const [activeModule, setActiveModule] = useState(modules[0].id);
  const active = modules.find((m) => m.id === activeModule)!;

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 topo-overlay" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <span className="font-mono text-[10px]">MODULAR ARCHITECTURE</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terrain System <span className="text-primary">Modules</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Five specialized terrain intelligence engines. Each independently deployable,
            collectively powerful.
          </p>
        </div>

        {/* Module selector pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl transition-all duration-500 ${
                activeModule === mod.id
                  ? "glass-card-elevated border-primary/40 shadow-[var(--shadow-glow)]"
                  : "glass-card hover:border-primary/20"
              }`}
            >
              <img src={mod.logo} alt={mod.name} className="w-7 h-7 rounded-md" loading="lazy" />
              <span className={`font-display font-semibold text-sm tracking-wide ${
                activeModule === mod.id ? "text-primary" : "text-muted-foreground"
              }`}>
                {mod.name}
              </span>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                mod.status === "ACTIVE"
                  ? "bg-signal-green/10 text-signal-green"
                  : "bg-primary/10 text-primary"
              }`}>
                {mod.status}
              </span>
            </button>
          ))}
        </div>

        {/* Active module detail card */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card-elevated rounded-2xl overflow-hidden hud-frame">
            <div className="glass-highlight rounded-2xl">
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0">
                    <img
                      src={active.logo}
                      alt={active.name}
                      className="w-24 h-24 rounded-xl shadow-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-3xl font-bold text-foreground">
                        {active.name}
                      </h3>
                      <span className={`text-[10px] font-mono px-2 py-1 rounded-full ${
                        active.status === "ACTIVE"
                          ? "bg-signal-green/10 text-signal-green border border-signal-green/30"
                          : "bg-primary/10 text-primary border border-primary/30"
                      }`}>
                        {active.status}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground mb-4 tracking-wider uppercase">
                      {active.full}
                    </p>
                    <p className="text-secondary-foreground/80 leading-relaxed mb-6">
                      {active.desc}
                    </p>

                    {/* Metrics bar */}
                    <div className="grid grid-cols-3 gap-4">
                      {active.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="glass-card rounded-lg p-3 text-center"
                        >
                          <div className="font-display text-xl font-bold text-primary">
                            {metric.value}
                          </div>
                          <div className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase mt-1">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;

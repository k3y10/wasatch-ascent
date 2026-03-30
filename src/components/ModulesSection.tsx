import avytsLogo from "@/assets/avyts-logo.png";
import pyrotsLogo from "@/assets/pyrots-logo.png";
import hydrotsLogo from "@/assets/hydrots-logo.png";
import geotsLogo from "@/assets/geots-logo.png";
import infratsLogo from "@/assets/infrats-logo.png";
import terrainAvalanche from "@/assets/terrain-avalanche.jpg";
import terrainWildfire from "@/assets/terrain-wildfire.jpg";
import terrainWater from "@/assets/terrain-water.jpg";
import terrainGeology from "@/assets/terrain-geology.jpg";
import terrainInfrastructure from "@/assets/terrain-infrastructure.jpg";
import { useState } from "react";

const modules = [
  {
    id: "avyts",
    name: "Avalanche",
    full: "AvyTS — Avalanche Terrain Systems",
    logo: avytsLogo,
    image: terrainAvalanche,
    status: "PILOT",
    desc: "Layer-aware snowpack modeling, weak-layer detection, and slope stability scoring. Originally built as Avalyze, now the flagship research pilot.",
    capabilities: ["Snowpit Reconstruction", "Storm-Cycle Timeline", "Weak-Layer Detection"],
    subtitle: "Drone-Linked Field Outputs",
  },
  {
    id: "pyrots",
    name: "Wildfire",
    full: "PyroTS — Wildfire Terrain Systems",
    logo: pyrotsLogo,
    image: terrainWildfire,
    status: "RESEARCH",
    desc: "Fuel load assessment, burn-scar mapping, and live fire spread modeling using multispectral imaging fused with terrain-aware weather inputs.",
    capabilities: ["Fire Risk Scoring", "Burn Mapping", "Fuel Analysis"],
    subtitle: "Evidence-Linked Outputs",
  },
  {
    id: "hydrots",
    name: "Water",
    full: "HydroTS — Water Terrain Systems",
    logo: hydrotsLogo,
    image: terrainWater,
    status: "RESEARCH",
    desc: "Watershed modeling, flood forecasting, and streamflow prediction built on synchronized elevation, precipitation, and groundwater telemetry.",
    capabilities: ["Watershed Analysis", "Flood Modeling", "Water Resources"],
    subtitle: "Persistent Outlook",
  },
  {
    id: "geots",
    name: "Geology",
    full: "GeoTS — Geological Terrain Systems",
    logo: geotsLogo,
    image: terrainGeology,
    status: "PLANNED",
    desc: "Geological mapping, rock anchoring intelligence, and rockfall path modeling combining morphology, subsurface data, and historical activity.",
    capabilities: ["Slope Stability", "Rockfall Paths", "Geological Mapping"],
    subtitle: "Terrain Intelligence",
  },
  {
    id: "infrats",
    name: "Infrastructure",
    full: "InfraTS — Infrastructure Terrain Systems",
    logo: infratsLogo,
    image: terrainInfrastructure,
    status: "PLANNED",
    desc: "Asset monitoring, inspection automation, and environmental compliance scoring for roads, utilities, and sensitive sites.",
    capabilities: ["Asset Monitoring", "Infrastructure Inspection", "Environmental Compliance"],
    subtitle: "Exposure Analysis",
  },
];

const statusStyles: Record<string, string> = {
  PILOT: "bg-signal-green/20 text-signal-green border-signal-green/40",
  RESEARCH: "bg-primary/15 text-primary border-primary/40",
  PLANNED: "bg-muted/80 text-muted-foreground border-border",
};

const ModulesSection = () => {
  const [activeModule, setActiveModule] = useState(modules[0].id);
  const active = modules.find((m) => m.id === activeModule)!;

  return (
    <section id="modules" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 topo-overlay" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-4">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <span className="font-mono text-[10px]">MODULAR ARCHITECTURE</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            What TerraSatch <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each module shares the same drone, LiDAR, GPR, and GIS foundation while delivering
            targeted analysis for specific terrain hazards.
          </p>
        </div>

        {/* Module terrain cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-12 mb-10 max-w-5xl mx-auto">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={`group relative rounded-xl overflow-hidden transition-all duration-500 aspect-[4/3] ${
                activeModule === mod.id
                  ? "ring-2 ring-primary shadow-[var(--shadow-glow)] scale-[1.02]"
                  : "opacity-70 hover:opacity-100 hover:scale-[1.01]"
              }`}
            >
              <img
                src={mod.image}
                alt={mod.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                width={768}
                height={512}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <img src={mod.logo} alt="" className="w-5 h-5 rounded" />
                  <span className="font-display font-bold text-sm text-white tracking-wide">
                    {mod.name}
                  </span>
                </div>
                <p className="text-[9px] font-mono text-white/60 leading-tight">
                  {mod.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Active module detail card */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card-elevated rounded-2xl overflow-hidden hud-frame">
            <div className="glass-highlight rounded-2xl">
              {/* Terrain image banner */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={active.image}
                  alt={active.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute bottom-4 left-6 md:left-8 flex items-center gap-4">
                  <img
                    src={active.logo}
                    alt={active.name}
                    className="w-16 h-16 rounded-xl shadow-lg ring-2 ring-background/50"
                    loading="lazy"
                  />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                        {active.full.split("—")[0].trim()}
                      </h3>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border backdrop-blur-sm ${statusStyles[active.status]}`}>
                        {active.status}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-white/70 tracking-wider">
                      {active.full.split("—")[1]?.trim()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-secondary-foreground/80 leading-relaxed mb-5">
                  {active.desc}
                </p>

                {/* Capabilities */}
                <div className="flex flex-wrap gap-2">
                  {active.capabilities.map((cap) => (
                    <span key={cap} className="signal-badge text-[9px] text-muted-foreground">
                      {cap}
                    </span>
                  ))}
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

import topoTexture from "@/assets/topo-texture.jpg";

const layers = [
  {
    label: "Signal Layer",
    sublabel: "Alerts & Forecasts",
    desc: "Custom alerts per zone, ridge, or route driven by incoming data and hazard logic.",
  },
  {
    label: "Ops Layer",
    sublabel: "Field Routes & Notes",
    desc: "Guides, patrollers, and SAR teams log real-world observations and route conditions.",
  },
  {
    label: "AvyTS Layer",
    sublabel: "Avalanche & Snowpack",
    desc: "Slabs, weak layers, terrain traps, and historical patterns with terrain-aware detail.",
  },
  {
    label: "Data Fusion Engine",
    sublabel: "Real-Time Ingestion",
    desc: "Continuous drone, LiDAR, GPR, and IoT feeds into a single decision graph.",
  },
  {
    label: "TerraGrid",
    sublabel: "Base Terrain Model",
    desc: "Unified terrain model from LiDAR, satellite DEMs, and drone orthomosaics.",
  },
  {
    label: "Geological Substrate",
    sublabel: "Bedrock & Soil",
    desc: "GPR subsurface intelligence revealing layer density and buried structure changes.",
  },
];

const TerrainVisualization = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={topoTexture}
          alt=""
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <span className="font-mono text-[10px]">LAYERED ARCHITECTURE</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Layered <span className="text-primary">Intelligence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A stack of interconnected layers, each adding critical context for
            field decision-making — from bedrock to real-time alerts.
          </p>
        </div>

        {/* Terrain layer stack */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {layers.map((layer, i) => (
              <div
                key={layer.label}
                className="relative group"
                style={{
                  transform: `perspective(800px) rotateX(25deg) translateY(${i * -8}px)`,
                  zIndex: 10 - i,
                }}
              >
                <div
                  className="glass-card rounded-xl px-6 py-4 mb-2 flex items-center justify-between transition-all duration-500 group-hover:translate-y-[-4px] group-hover:shadow-[var(--shadow-glow)]"
                  style={{ opacity: 1 - i * 0.08 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-3 h-3 rounded-full bg-primary/60 animate-pulse-glow"
                      style={{ animationDelay: `${i * 0.5}s` }}
                    />
                    <div>
                      <div className="font-display font-semibold text-sm text-foreground">
                        {layer.label}
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground">
                        {layer.sublabel}
                      </div>
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-primary/60 hidden sm:block max-w-[220px] text-right">
                    {layer.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerrainVisualization;

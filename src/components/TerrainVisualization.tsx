import topoTexture from "@/assets/topo-texture.jpg";

const TerrainVisualization = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* 3D terrain background */}
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
            <span className="font-mono text-[10px]">3D TERRAIN ENGINE</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Multi-Layer <span className="text-primary">Terrain Analysis</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Fuse elevation models, satellite imagery, weather data, and sensor networks
            into a unified terrain intelligence surface.
          </p>
        </div>

        {/* Terrain layer stack visualization */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {[
              { label: "Sensor Network", sublabel: "IoT + Weather Stations", offset: 0, opacity: 1 },
              { label: "Risk Modeling Layer", sublabel: "ML Predictions", offset: 1, opacity: 0.9 },
              { label: "Vegetation & Land Cover", sublabel: "Satellite Derived", offset: 2, opacity: 0.8 },
              { label: "Hydrological Network", sublabel: "Stream & Watershed", offset: 3, opacity: 0.7 },
              { label: "Digital Elevation Model", sublabel: "LiDAR 1m Resolution", offset: 4, opacity: 0.6 },
              { label: "Geological Substrate", sublabel: "Bedrock & Soil", offset: 5, opacity: 0.5 },
            ].map((layer, i) => (
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
                  style={{ opacity: layer.opacity }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-primary/60 animate-pulse-glow" style={{ animationDelay: `${i * 0.5}s` }} />
                    <div>
                      <div className="font-display font-semibold text-sm text-foreground">
                        {layer.label}
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground">
                        {layer.sublabel}
                      </div>
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-primary/60">
                    LAYER {String(6 - i).padStart(2, "0")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { value: "1m", label: "DEM Resolution" },
            { value: "18K", label: "Square Miles" },
            { value: "<15min", label: "Update Cycle" },
            { value: "99.7%", label: "Uptime SLA" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-5 text-center hud-frame">
              <div className="font-display text-2xl md:text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TerrainVisualization;

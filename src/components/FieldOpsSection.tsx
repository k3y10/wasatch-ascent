import terrainBanners from "@/assets/terrain-banners.png";

const FieldOpsSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <span className="font-mono text-[10px]">FIELD OPERATIONS</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built for the <span className="text-primary">Field</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From avalanche forecasters to wildfire incident commanders —
            terrain intelligence that deploys where you operate.
          </p>
        </div>

        {/* Terrain environments showcase */}
        <div className="max-w-5xl mx-auto glass-card-elevated rounded-2xl overflow-hidden hud-frame">
          <div className="glass-highlight rounded-2xl">
            <img
              src={terrainBanners}
              alt="Terrain environments - Snow, Fire, Water, Rock, Infrastructure"
              className="w-full object-cover"
              loading="lazy"
            />
            <div className="p-8">
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  {
                    title: "Backcountry Operations",
                    desc: "Ski patrol, SAR teams, and guides rely on real-time terrain exposure data.",
                    icon: "⛰️",
                  },
                  {
                    title: "Wildfire Suppression",
                    desc: "Terrain-driven fire behavior models for incident management teams.",
                    icon: "🔥",
                  },
                  {
                    title: "Infrastructure Planning",
                    desc: "Slope stability, flood risk, and geological hazard mapping for civil engineering.",
                    icon: "🏗️",
                  },
                ].map((item) => (
                  <div key={item.title} className="glass-card rounded-xl p-5">
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FieldOpsSection;

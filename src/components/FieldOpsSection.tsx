import terrainBanners from "@/assets/terrain-banners.png";

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
        <div className="text-center mb-16">
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
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {useCases.map((item) => (
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

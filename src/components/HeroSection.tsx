import heroImage from "@/assets/hero-wasatch.jpg";
import terrasatchLogo from "@/assets/terrasatch-logo.png";

const HeroSection = () => {
  return (
    <section id="platform" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Wasatch Range terrain"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-scan-line" />
      </div>

      {/* Topographic grid overlay */}
      <div className="absolute inset-0 topo-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <img
            src={terrasatchLogo}
            alt="TerraSatch"
            className="w-28 h-28 mx-auto mb-8 drop-shadow-2xl"
          />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <div className="signal-badge signal-badge-amber mx-auto mb-6 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            <span className="font-mono text-[10px]">WASATCH FRONT · UTAH</span>
          </div>
        </div>

        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in tracking-tight"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        >
          <span className="text-foreground">TERRAIN</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-amber-warm to-primary bg-clip-text text-transparent">
            INTELLIGENCE
          </span>
        </h1>

        <p
          className="max-w-2xl mx-auto text-lg md:text-xl text-frost-dim font-light leading-relaxed mb-4 animate-fade-in"
          style={{ animationDelay: "0.8s", opacity: 0 }}
        >
          Born in the Wasatch. Fusing drone flights, LiDAR, weather forecasts,
          and snowpack science into actionable terrain intelligence.
        </p>

        <p
          className="max-w-xl mx-auto text-sm text-muted-foreground font-mono tracking-wide mb-10 animate-fade-in"
          style={{ animationDelay: "0.9s", opacity: 0 }}
        >
          AI-Powered · Field-Grade · Decision Support
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
          style={{ animationDelay: "1s", opacity: 0 }}
        >
          <a
            href="#documents"
            className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-lg tracking-wide hover:shadow-[var(--shadow-amber)] transition-all duration-300 hover:scale-[1.02]"
          >
            Explore the Tech
          </a>
          <a
            href="#modules"
            className="px-8 py-3.5 rounded-lg glass-card text-foreground font-display font-semibold text-lg tracking-wide hover:border-primary/40 transition-all duration-300"
          >
            View Modules
          </a>
        </div>

        {/* HUD coordinates */}
        <div
          className="mt-16 flex justify-center gap-8 font-mono text-xs text-muted-foreground animate-fade-in"
          style={{ animationDelay: "1.2s", opacity: 0 }}
        >
          <span>40.7608° N</span>
          <span className="text-primary/40">|</span>
          <span>111.8910° W</span>
          <span className="text-primary/40">|</span>
          <span>ELV 4,226 ft</span>
          <span className="text-primary/40">|</span>
          <span>GRID UTM 12T</span>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;

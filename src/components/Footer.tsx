import terrasatchLogo from "@/assets/terrasatch-logo.png";

const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-border/50">
      <div className="absolute inset-0 topo-overlay opacity-50" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src={terrasatchLogo} alt="TerraSatch" className="w-8 h-8 rounded-lg" />
            <div>
              <span className="font-display text-sm font-bold tracking-wide text-foreground">
                TERRASATCH
              </span>
              <p className="text-[10px] font-mono text-muted-foreground">
                TERRAIN INTELLIGENCE · SALT LAKE CITY, UT
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 font-mono text-xs text-muted-foreground">
            <span>© 2026 TerraSatch</span>
            <span className="text-border">|</span>
            <span>Born in the Wasatch</span>
            <span className="text-border">|</span>
            <span className="text-primary/60">v4.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

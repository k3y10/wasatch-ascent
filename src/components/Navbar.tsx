import terrasatchLogo from "@/assets/terrasatch-logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={terrasatchLogo} alt="TerraSatch" className="w-10 h-10 rounded-lg" />
          <div>
            <span className="font-display text-lg font-bold tracking-wide text-foreground">
              TERRASATCH
            </span>
            <span className="hidden sm:inline ml-2 text-xs font-mono text-muted-foreground tracking-widest">
              TERRAIN INTELLIGENCE
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Platform", "Modules", "SherpAI", "Field Ops"].map((item) => (
            <button
              key={item}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wide"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="signal-badge signal-badge-green">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse-glow" />
            <span className="font-mono text-[10px]">SYSTEMS ONLINE</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

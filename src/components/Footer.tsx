const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 py-16">
      <div className="absolute inset-0 topo-overlay opacity-50" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <img src="/terrasatch-logo.webp" alt="Satchy" className="size-10 object-contain" />
            <div>
              <span className="font-display text-lg font-bold tracking-wide">TERRASATCH</span>
              <p className="mt-2 text-xs text-muted-foreground">AI-powered field intelligence for remote operations.</p>
            </div>
          </div>
          <div>
            <h3 className="font-display uppercase">Products</h3>
            <p className="mt-3 text-sm text-muted-foreground">TerraListen · AvyTS · PyroTS · Edge</p>
          </div>
          <div>
            <h3 className="font-display uppercase">Resources</h3>
            <p className="mt-3 text-sm text-muted-foreground">Demo · Documentation · Contact</p>
          </div>
        </div>
        <div className="mt-10 border-t border-border/30 pt-6 text-center text-[11px] text-muted-foreground">
          <p>© 2026 TerraSatch Inc. · LISTEN · WATCH · LEARN · ADAPT</p>
          <p className="mt-4">TerraSatch and AvyTS are decision-support tools, not replacements for training, education, or sound operational judgment.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

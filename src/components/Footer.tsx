const Footer = () => {
  return (
    <>
      <div className="hidden sm:block sm:h-[72px]" aria-hidden="true" />
      <footer className="relative sm:fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur-xl">
        <div className="container mx-auto flex min-h-[104px] flex-col justify-center gap-2 px-4 py-3 sm:min-h-[72px] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <img src="/terrasatch-logo.png" alt="TerraSatch" className="size-8 rounded-lg" width={1254} height={1254} />
            <div className="leading-tight">
              <span className="block font-display text-sm font-bold tracking-wide text-foreground">TERRASATCH</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                Listen · Watch · Learn · Adapt
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] text-muted-foreground sm:justify-end">
            <a href="/#pilot" className="transition-colors hover:text-primary">Evaluate</a>
            <a href="/demo-access" className="transition-colors hover:text-primary">Demo</a>
            <a href="/investors" className="transition-colors hover:text-primary">Investors</a>
            <a href="/api" className="transition-colors hover:text-primary">API</a>
            <a href="/edge" className="transition-colors hover:text-primary">Edge</a>
            <span>© 2026 TerraSatch</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

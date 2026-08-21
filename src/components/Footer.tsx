import terrasatchLogo from "@/assets/terrasatch-logo.png";

const PixelSatchy = () => (
  <div className="satchy-pixel-sprite" aria-hidden="true">
    <svg className="satchy-frame satchy-frame-1" viewBox="0 0 48 48" shapeRendering="crispEdges">
      <rect x="18" y="7" width="12" height="5" className="fill-foreground" />
      <rect x="15" y="12" width="18" height="7" className="fill-foreground" />
      <rect x="12" y="19" width="24" height="15" className="fill-foreground" />
      <rect x="9" y="21" width="5" height="11" className="fill-foreground" />
      <rect x="34" y="20" width="5" height="12" className="fill-foreground" />
      <rect x="14" y="34" width="8" height="6" className="fill-foreground" />
      <rect x="27" y="34" width="7" height="8" className="fill-foreground" />
      <rect x="21" y="13" width="3" height="2" className="fill-primary" />
      <rect x="29" y="20" width="4" height="8" className="fill-primary" />
      <rect x="30" y="21" width="2" height="2" className="fill-background" />
      <rect x="16" y="18" width="3" height="12" className="fill-muted-foreground" />
      <rect x="31" y="13" width="3" height="4" className="fill-muted-foreground" />
    </svg>

    <svg className="satchy-frame satchy-frame-2" viewBox="0 0 48 48" shapeRendering="crispEdges">
      <rect x="18" y="7" width="12" height="5" className="fill-foreground" />
      <rect x="15" y="12" width="18" height="7" className="fill-foreground" />
      <rect x="12" y="19" width="24" height="15" className="fill-foreground" />
      <rect x="10" y="19" width="5" height="12" className="fill-foreground" />
      <rect x="34" y="23" width="5" height="10" className="fill-foreground" />
      <rect x="11" y="34" width="9" height="8" className="fill-foreground" />
      <rect x="27" y="34" width="8" height="6" className="fill-foreground" />
      <rect x="21" y="13" width="3" height="2" className="fill-primary" />
      <rect x="29" y="20" width="4" height="8" className="fill-primary" />
      <rect x="30" y="21" width="2" height="2" className="fill-background" />
      <rect x="16" y="18" width="3" height="12" className="fill-muted-foreground" />
      <rect x="31" y="13" width="3" height="4" className="fill-muted-foreground" />
    </svg>

    <svg className="satchy-frame satchy-frame-3" viewBox="0 0 48 48" shapeRendering="crispEdges">
      <rect x="18" y="7" width="12" height="5" className="fill-foreground" />
      <rect x="15" y="12" width="18" height="7" className="fill-foreground" />
      <rect x="12" y="19" width="24" height="15" className="fill-foreground" />
      <rect x="9" y="22" width="5" height="10" className="fill-foreground" />
      <rect x="34" y="19" width="5" height="12" className="fill-foreground" />
      <rect x="13" y="34" width="8" height="7" className="fill-foreground" />
      <rect x="28" y="34" width="8" height="7" className="fill-foreground" />
      <rect x="21" y="13" width="3" height="2" className="fill-primary" />
      <rect x="29" y="20" width="4" height="8" className="fill-primary" />
      <rect x="30" y="21" width="2" height="2" className="fill-background" />
      <rect x="16" y="18" width="3" height="12" className="fill-muted-foreground" />
      <rect x="31" y="13" width="3" height="4" className="fill-muted-foreground" />
    </svg>

    <svg className="satchy-frame satchy-frame-4" viewBox="0 0 48 48" shapeRendering="crispEdges">
      <rect x="18" y="7" width="12" height="5" className="fill-foreground" />
      <rect x="15" y="12" width="18" height="7" className="fill-foreground" />
      <rect x="12" y="19" width="24" height="15" className="fill-foreground" />
      <rect x="10" y="23" width="5" height="10" className="fill-foreground" />
      <rect x="34" y="19" width="5" height="12" className="fill-foreground" />
      <rect x="14" y="34" width="7" height="6" className="fill-foreground" />
      <rect x="28" y="34" width="9" height="8" className="fill-foreground" />
      <rect x="21" y="13" width="3" height="2" className="fill-primary" />
      <rect x="29" y="20" width="4" height="8" className="fill-primary" />
      <rect x="30" y="21" width="2" height="2" className="fill-background" />
      <rect x="16" y="18" width="3" height="12" className="fill-muted-foreground" />
      <rect x="31" y="13" width="3" height="4" className="fill-muted-foreground" />
    </svg>
  </div>
);

const Footer = () => {
  return (
    <>
      <div className="h-[118px] sm:h-[96px]" aria-hidden="true" />
      <footer className="fixed inset-x-0 bottom-0 z-40 min-h-[118px] overflow-hidden border-t border-border/60 bg-background/94 shadow-[0_-12px_32px_-22px_hsl(var(--foreground)/0.35)] backdrop-blur-xl sm:min-h-[96px]">
        <style>{`
          @keyframes satchy-cross-footer {
            from { transform: translateX(-72px); }
            to { transform: translateX(calc(100vw + 72px)); }
          }

          @keyframes satchy-frame-one {
            0%, 24.99% { opacity: 1; }
            25%, 100% { opacity: 0; }
          }
          @keyframes satchy-frame-two {
            0%, 24.99% { opacity: 0; }
            25%, 49.99% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
          @keyframes satchy-frame-three {
            0%, 49.99% { opacity: 0; }
            50%, 74.99% { opacity: 1; }
            75%, 100% { opacity: 0; }
          }
          @keyframes satchy-frame-four {
            0%, 74.99% { opacity: 0; }
            75%, 100% { opacity: 1; }
          }

          .satchy-pixel-runner {
            animation: satchy-cross-footer 20s linear infinite;
            image-rendering: pixelated;
          }
          .satchy-pixel-sprite {
            position: relative;
            width: 58px;
            height: 58px;
            filter: drop-shadow(0 2px 0 hsl(var(--background))) drop-shadow(0 0 8px hsl(var(--primary) / 0.12));
          }
          .satchy-frame {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }
          .satchy-frame-1 { animation: satchy-frame-one 0.72s steps(1, end) infinite; }
          .satchy-frame-2 { animation: satchy-frame-two 0.72s steps(1, end) infinite; }
          .satchy-frame-3 { animation: satchy-frame-three 0.72s steps(1, end) infinite; }
          .satchy-frame-4 { animation: satchy-frame-four 0.72s steps(1, end) infinite; }

          @media (prefers-reduced-motion: reduce) {
            .satchy-pixel-runner { animation: none !important; transform: translateX(calc(100vw - 92px)); }
            .satchy-frame { animation: none !important; opacity: 0; }
            .satchy-frame-1 { opacity: 1; }
          }
        `}</style>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-foreground/[0.035]"
          style={{ clipPath: "polygon(0 80%, 9% 54%, 17% 72%, 28% 35%, 39% 70%, 52% 42%, 64% 74%, 78% 28%, 89% 63%, 100% 45%, 100% 100%, 0 100%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-primary/[0.035]"
          style={{ clipPath: "polygon(0 70%, 12% 46%, 24% 74%, 37% 39%, 49% 77%, 62% 48%, 73% 70%, 86% 34%, 100% 62%, 100% 100%, 0 100%)" }}
          aria-hidden="true"
        />

        <div className="satchy-pixel-runner pointer-events-none absolute bottom-0 left-0 z-0" aria-hidden="true">
          <PixelSatchy />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img src={terrasatchLogo} alt="TerraSatch" className="size-8 rounded-lg" />
              <div className="leading-tight">
                <span className="block font-display text-sm font-bold tracking-wide text-foreground">TERRASATCH</span>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                  Listen · Watch · Learn · Adapt
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] text-muted-foreground sm:justify-end">
              <span>© 2026 TerraSatch</span>
              <span>Born in the Wasatch</span>
              <a href="mailto:mccunekeaton@gmail.com" className="transition-colors hover:text-primary">
                Founder inquiries
              </a>
            </div>
          </div>

          <p className="mt-2 border-t border-border/35 pt-2 text-[9px] leading-snug text-muted-foreground/70 sm:text-[10px]">
            <span className="font-semibold text-signal-amber">Important Safety Notice:</span>{" "}
            TerraSatch and AvyTS are decision-support tools, not replacements for avalanche education, proper training, or sound judgment. Always follow local advisories and use appropriate safety equipment.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

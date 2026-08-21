import terrasatchLogo from "@/assets/terrasatch-logo.png";

const BIGFOOT_SPRITE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACACAMAAADTa0c4AAADAFBMVEUAAAAWAAAmFw0zHxFGLDqCW0EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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";

const Footer = () => {
  return (
    <>
      <div className="h-[118px] sm:h-[96px]" aria-hidden="true" />
      <footer className="fixed inset-x-0 bottom-0 z-40 min-h-[118px] overflow-visible border-t border-border/60 bg-background/94 shadow-[0_-12px_32px_-22px_hsl(var(--foreground)/0.35)] backdrop-blur-xl sm:min-h-[96px]">
        <style>{`
          @keyframes bigfoot-patrol-position {
            0%, 2% { transform: translateX(8px); }
            48%, 52% { transform: translateX(calc(100vw - 56px)); }
            98%, 100% { transform: translateX(8px); }
          }
          @keyframes bigfoot-patrol-facing {
            0%, 49.9% { transform: scaleX(1); }
            50%, 99.9% { transform: scaleX(-1); }
            100% { transform: scaleX(1); }
          }
          @keyframes bigfoot-walk-frames {
            from { background-position-x: 0; }
            to { background-position-x: -384px; }
          }
          .bigfoot-runner {
            animation: bigfoot-patrol-position 20s linear infinite;
            will-change: transform;
          }
          .bigfoot-facing {
            animation: bigfoot-patrol-facing 20s steps(1, end) infinite;
            transform-origin: center;
          }
          .bigfoot-sprite {
            width: 48px;
            height: 96px;
            background-image: url('${BIGFOOT_SPRITE}');
            background-repeat: no-repeat;
            background-size: 384px 192px;
            background-position: 0 0;
            animation: bigfoot-walk-frames 0.78s steps(8, end) infinite;
            image-rendering: pixelated;
            filter: drop-shadow(0 2px 0 hsl(var(--background) / 0.9));
          }
          @media (prefers-reduced-motion: reduce) {
            .bigfoot-runner { animation: none !important; transform: translateX(calc(100vw - 56px)); }
            .bigfoot-facing { animation: none !important; transform: scaleX(-1); }
            .bigfoot-sprite { animation: none !important; background-position-x: 0; }
          }
        `}</style>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 overflow-hidden bg-foreground/[0.035]"
          style={{ clipPath: "polygon(0 80%, 9% 54%, 17% 72%, 28% 35%, 39% 70%, 52% 42%, 64% 74%, 78% 28%, 89% 63%, 100% 45%, 100% 100%, 0 100%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12 overflow-hidden bg-primary/[0.035]"
          style={{ clipPath: "polygon(0 70%, 12% 46%, 24% 74%, 37% 39%, 49% 77%, 62% 48%, 73% 70%, 86% 34%, 100% 62%, 100% 100%, 0 100%)" }}
          aria-hidden="true"
        />

        <div className="bigfoot-runner pointer-events-none absolute -top-[74px] left-0 z-50" aria-hidden="true">
          <div className="bigfoot-facing"><div className="bigfoot-sprite" /></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img src={terrasatchLogo} alt="TerraSatch" className="size-8 rounded-lg" />
              <div className="leading-tight">
                <span className="block font-display text-sm font-bold tracking-wide text-foreground">TERRASATCH</span>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Listen · Watch · Learn · Adapt</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] text-muted-foreground sm:justify-end">
              <span>© 2026 TerraSatch</span>
              <span>Born in the Wasatch</span>
              <a href="mailto:mccunekeaton@gmail.com" className="transition-colors hover:text-primary">Founder inquiries</a>
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

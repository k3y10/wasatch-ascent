import terrasatchLogo from "@/assets/terrasatch-logo.png";

const Footer = () => {
  return (
    <>
      <div className="h-[118px] sm:h-[96px]" aria-hidden="true" />
      <footer className="fixed inset-x-0 bottom-0 z-40 min-h-[118px] overflow-hidden border-t border-border/60 bg-background/94 shadow-[0_-12px_32px_-22px_hsl(var(--foreground)/0.35)] backdrop-blur-xl sm:min-h-[96px]">
        <style>{`
          @keyframes satch-footer-cross {
            from { transform: translateX(-14vw); }
            to { transform: translateX(112vw); }
          }

          @keyframes satch-footer-bob {
            0%, 100% { transform: translateY(1px) rotate(-1.5deg); }
            50% { transform: translateY(-3px) rotate(1.5deg); }
          }

          .satch-footer-walker {
            animation: satch-footer-cross 24s linear infinite;
          }

          .satch-footer-bob {
            animation: satch-footer-bob 0.8s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .satch-footer-walker,
            .satch-footer-bob {
              animation: none !important;
            }
            .satch-footer-walker {
              transform: translateX(82vw);
            }
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

        <div className="satch-footer-walker pointer-events-none absolute bottom-1 left-0 z-0 w-14 opacity-20 sm:w-16" aria-hidden="true">
          <div className="satch-footer-bob">
            <img
              src="/terralisten-sasquatch-listening.webp"
              alt=""
              className="w-full grayscale contrast-150 brightness-125"
              loading="lazy"
            />
          </div>
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

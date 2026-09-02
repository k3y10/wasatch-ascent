import { ExternalLink } from "lucide-react";

const WHITEPAPER_PATH = "/documents/TerraSatch-Whitepaper.pdf";

const DocumentsSection = () => (
  <section id="documents" className="content-auto relative overflow-hidden py-24">
    <div className="absolute inset-0 topo-overlay opacity-30" />
    <div className="container relative mx-auto px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="font-display text-5xl font-bold uppercase leading-none sm:text-6xl">
            Research, when you need the depth<span className="text-primary">.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            The homepage stays focused. Technical architecture, operating model, modules, validation boundaries,
            and roadmap remain available in the current TerraSatch whitepaper.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border/70 bg-background/70 shadow-2xl shadow-black/10 backdrop-blur-sm">
          <div className="flex flex-col gap-4 border-b border-border/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-foreground">TerraSatch Whitepaper</h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary/80">
                Version 2.0 &middot; August 30, 2026
              </p>
            </div>
            <a
              href={WHITEPAPER_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Open PDF
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="bg-muted/20 p-2 sm:p-3">
            <iframe
              src={`${WHITEPAPER_PATH}#view=FitH`}
              title="TerraSatch Whitepaper Version 2.0"
              className="h-[72vh] min-h-[640px] w-full rounded-lg bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DocumentsSection;

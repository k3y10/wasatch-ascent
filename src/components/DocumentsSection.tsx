import { Download, ExternalLink } from "lucide-react";

const WHITEPAPER_PATH = "/documents/TerraSatch-Whitepaper.pdf?v=2-20260830";

const DocumentsSection = () => (
  <section id="documents" aria-labelledby="whitepaper-heading" className="content-auto relative overflow-hidden py-24">
    <div className="absolute inset-0 topo-overlay opacity-30" />
    <div className="container relative mx-auto px-6">
      <div className="mx-auto max-w-6xl">
        <h2 id="whitepaper-heading" className="font-display text-5xl font-bold uppercase leading-none sm:text-6xl">
          TerraSatch Whitepaper<span className="text-primary">.</span>
        </h2>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border/70 bg-background/70">
          <div className="flex flex-col gap-4 border-b border-border/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="font-mono text-xs leading-relaxed uppercase tracking-[0.12em] text-muted-foreground">
              Version 2.0 &middot; August 30, 2026 &middot; 31 pages
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={WHITEPAPER_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Open PDF
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
              <a
                href={WHITEPAPER_PATH}
                download="TerraSatch-Whitepaper-v2.pdf"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Download PDF
                <Download className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="bg-muted/20 p-2 sm:p-3">
            <iframe
              src={`${WHITEPAPER_PATH}#view=FitH`}
              title="TerraSatch Whitepaper, Version 2.0, August 30, 2026"
              loading="lazy"
              className="h-[75vh] min-h-[480px] w-full rounded-lg bg-white sm:min-h-[640px]"
            />
          </div>
          <p className="px-5 pb-5 pt-2 text-sm text-muted-foreground sm:px-6">
            If the preview is unavailable, choose Open PDF to read the full whitepaper in your browser.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default DocumentsSection;

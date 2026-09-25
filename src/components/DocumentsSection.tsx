import { ArrowRight, FileText } from "lucide-react";

const DocumentsSection = () => (
  <section id="documents" className="content-auto relative overflow-hidden py-24">
    <div className="absolute inset-0 topo-overlay opacity-30" />
    <div className="container relative mx-auto grid gap-12 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Current publication · August 2026</p>
        <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-none sm:text-6xl">
          TerraSatch + Satchy whitepaper<span className="text-primary">.</span>
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          The current 31-page TerraSatch whitepaper explains the platform, Satchy agent, TerraListen workflow, Listen · Watch · Learn · Adapt operating loop, terrain modules, architecture, and human-review model.
        </p>
      </div>

      <a
        href="/documents/TerraSatch-Whitepaper.pdf"
        className="group flex items-center gap-5 border-y border-border/70 py-7 transition-colors hover:text-primary"
      >
        <FileText className="size-7 shrink-0 text-primary" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-2xl font-bold uppercase text-foreground transition-colors group-hover:text-primary">
            TerraSatch + Satchy Whitepaper
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Current platform architecture, Satchy field-intelligence workflow, TerraListen, domain modules, operational memory, integrations, and human-review boundaries.
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-primary/70">
            v2.0 · August 30, 2026 · 31-page PDF
          </p>
        </div>
        <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
      </a>
    </div>
  </section>
);

export default DocumentsSection;

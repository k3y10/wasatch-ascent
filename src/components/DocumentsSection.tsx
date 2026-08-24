import { ExternalLink, FileText } from "lucide-react";

const documents = [
  {
    title: "TerraSatch V1 Whitepaper",
    description: "Platform overview, mission, architecture, modules, and roadmap.",
    version: "v1.3",
    date: "March 2026",
    file: "/documents/TerraSatch-Whitepaper.pdf",
  },
  {
    title: "AvyTS Module Whitepaper",
    description: "Avalanche terrain intelligence, snowpack modeling, and field workflows.",
    version: "v1.1.0",
    date: "March 2026",
    file: "/documents/AvyTS-Whitepaper.pdf",
  },
  {
    title: "SherpAI V1 Whitepaper",
    description: "Terrain intelligence automation, briefings, and domain-constrained field support.",
    version: "v1.0.0",
    date: "March 2026",
    file: "/documents/SherpAI-Whitepaper.pdf",
  },
];

const DocumentsSection = () => (
  <section id="documents" className="content-auto relative overflow-hidden py-24">
    <div className="absolute inset-0 topo-overlay opacity-30" />
    <div className="container relative mx-auto grid gap-12 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
      <div>
        <h2 className="font-display text-5xl font-bold uppercase leading-none sm:text-6xl">
          Research, when you need the depth<span className="text-primary">.</span>
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          The homepage stays focused. Technical architecture and module research remain available in the whitepapers.
        </p>
      </div>

      <div className="border-y border-border/70">
        {documents.map((document) => (
          <a
            key={document.title}
            href={document.file}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 border-b border-border/70 py-6 transition-colors last:border-b-0 hover:text-primary"
          >
            <FileText className="size-6 shrink-0 text-primary" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-2xl font-bold uppercase text-foreground transition-colors group-hover:text-primary">
                {document.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{document.description}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-primary/70">
                {document.version} &middot; {document.date}
              </p>
            </div>
            <ExternalLink className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default DocumentsSection;


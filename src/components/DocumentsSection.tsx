import { FileText, Download, ExternalLink } from "lucide-react";

const documents = [
  {
    title: "TerraSatch V1 Whitepaper",
    description: "Platform overview — terrain intelligence for safer decisions. Mission, architecture, modules, and roadmap.",
    version: "v1.3",
    date: "March 2026",
    file: "/documents/TerraSatch-Whitepaper.pdf",
  },
  {
    title: "AvyTS Module Whitepaper",
    description: "Avalanche terrain intelligence and SherpAI operational agent. Snowpack modeling, risk classification, and field workflows.",
    version: "v1.1.0",
    date: "March 2026",
    file: "/documents/AvyTS-Whitepaper.pdf",
  },
  {
    title: "SherpAI V1 Whitepaper",
    description: "Terrain intelligence operator — automation, briefings, domain-constrained AI copilot for field operations.",
    version: "v1.0.0",
    date: "March 2026",
    file: "/documents/SherpAI-Whitepaper.pdf",
  },
];

const DocumentsSection = () => {
  return (
    <section id="documents" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 topo-overlay opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <span className="font-mono text-[10px]">DOCUMENTATION</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Research & <span className="text-primary">Whitepapers</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Review our technical documentation, module specifications, and platform architecture.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-4">
          {documents.map((doc) => (
            <a
              key={doc.title}
              href={doc.file}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-elevated rounded-xl overflow-hidden hud-frame group hover:shadow-[var(--shadow-glow)] transition-all duration-500"
            >
              <div className="glass-highlight rounded-xl p-6 flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {doc.description}
                  </p>
                  <div className="flex gap-3 mt-2">
                    <span className="font-mono text-[10px] text-primary/70">{doc.version}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{doc.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0">
                  <span className="text-xs font-mono hidden sm:block">VIEW PDF</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocumentsSection;

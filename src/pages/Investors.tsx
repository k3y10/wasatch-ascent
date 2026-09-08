import AmbientParticles from "@/components/AmbientParticles";
import DocumentsSection from "@/components/DocumentsSection";
import EngagementSection from "@/components/EngagementSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PartnersSection from "@/components/PartnersSection";

const Investors = () => (
  <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <AmbientParticles />
    <Navbar />

    <main className="pt-16">
      <section className="relative overflow-hidden border-b border-border/60 py-20 sm:py-24">
        <div className="absolute inset-0 topo-overlay opacity-35" />
        <div className="container relative mx-auto px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Investor information</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
            TerraSatch founder round and company materials<span className="text-primary">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            This path is for investor and strategic interest. Product evaluation for operational teams remains on the main TerraSatch site.
          </p>
          <a href="/#pilot" className="mt-5 inline-block text-sm font-medium text-primary underline underline-offset-4">
            Looking to evaluate TerraSatch with your team? Start here instead.
          </a>
        </div>
      </section>

      <EngagementSection />
      <PartnersSection />
      <DocumentsSection />
    </main>

    <Footer />
  </div>
);

export default Investors;

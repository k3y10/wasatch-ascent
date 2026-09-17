import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DataFusionSection from "@/components/DataFusionSection";
import TerraListenSection from "@/components/TerraListenSection";
import TerrainIntelligenceSection from "@/components/TerrainIntelligenceSection";
import LearnAdaptSection from "@/components/LearnAdaptSection";
import PilotSection from "@/components/PilotSection";
import PricingEstimator from "@/components/PricingEstimator";
import Footer from "@/components/Footer";
import AmbientParticles from "@/components/AmbientParticles";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const Index = () => {
  useEffect(() => {
    const scrollToHash = () => {
      const section = window.location.hash.replace("#", "");
      if (!section) return;

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <AmbientParticles />
      <Navbar />
      <HeroSection />
      <div className="amber-line" />
      <ScrollReveal><DataFusionSection /></ScrollReveal>
      <div className="amber-line" />
      <ScrollReveal><TerraListenSection /></ScrollReveal>
      <div className="amber-line" />
      <ScrollReveal><TerrainIntelligenceSection /></ScrollReveal>
      <div className="amber-line" />
      <ScrollReveal><LearnAdaptSection /></ScrollReveal>
      <div className="amber-line" />
      <ScrollReveal><PilotSection /></ScrollReveal>
      <div className="amber-line" />
      <PricingEstimator />
      <Footer />
    </div>
  );
};

export default Index;

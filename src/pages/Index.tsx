import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TerraListenSection from "@/components/TerraListenSection";
import TerrainIntelligenceSection from "@/components/TerrainIntelligenceSection";
import DataFusionSection from "@/components/DataFusionSection";
import LearnAdaptSection from "@/components/LearnAdaptSection";
import ConnectedStackSection from "@/components/ConnectedStackSection";
import PricingEstimator from "@/components/PricingEstimator";
import PilotSection from "@/components/PilotSection";
import DocumentsSection from "@/components/DocumentsSection";
import EngagementSection from "@/components/EngagementSection";
import Footer from "@/components/Footer";
import AmbientParticles from "@/components/AmbientParticles";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
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
      <ScrollReveal><ConnectedStackSection /></ScrollReveal>
      <div className="amber-line" />
      <ScrollReveal><PricingEstimator /></ScrollReveal>
      <div className="amber-line" />
      <ScrollReveal><PilotSection /></ScrollReveal>
      <div className="amber-line" />
      <ScrollReveal><EngagementSection /></ScrollReveal>
      <div className="amber-line" />
      <ScrollReveal><DocumentsSection /></ScrollReveal>
      <Footer />
    </div>
  );
};

export default Index;

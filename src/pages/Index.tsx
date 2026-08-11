import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TerraListenSection from "@/components/TerraListenSection";
import PricingEstimator from "@/components/PricingEstimator";
import ModulesSection from "@/components/ModulesSection";
import SherpAISection from "@/components/SherpAISection";
import DataFusionSection from "@/components/DataFusionSection";
import TerrainVisualization from "@/components/TerrainVisualization";
import TechStackSection from "@/components/TechStackSection";
import ARVisionSection from "@/components/ARVisionSection";
import FieldOpsSection from "@/components/FieldOpsSection";
import OriginSection from "@/components/OriginSection";
import TeamSection from "@/components/TeamSection";
import DocumentsSection from "@/components/DocumentsSection";
import PartnersSection from "@/components/PartnersSection";
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
      <ScrollReveal><TerraListenSection /></ScrollReveal>
      <div className="amber-line" />
      <ScrollReveal><PricingEstimator /></ScrollReveal>
      <div className="amber-line" />
      <ScrollReveal><ModulesSection /></ScrollReveal>
      <div className="amber-line" />
      <ScrollReveal><SherpAISection /></ScrollReveal>
      <div className="amber-line" />
      <ScrollReveal><DataFusionSection /></ScrollReveal>
      <div className="amber-line" />
      <ScrollReveal><TerrainVisualization /></ScrollReveal>
      <div className="amber-line" />
      <TechStackSection />
      <div className="amber-line" />
      <ARVisionSection />
      <div className="amber-line" />
      <FieldOpsSection />
      <div className="amber-line" />
      <ScrollReveal><OriginSection /></ScrollReveal>
      <div className="amber-line" />
      <TeamSection />
      <div className="amber-line" />
      <ScrollReveal><EngagementSection /></ScrollReveal>
      <div className="amber-line" />
      <ScrollReveal><PartnersSection /></ScrollReveal>
      <div className="amber-line" />
      <ScrollReveal><DocumentsSection /></ScrollReveal>
      <Footer />
    </div>
  );
};

export default Index;


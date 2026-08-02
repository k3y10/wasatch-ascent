import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RadioAgentSection from "@/components/RadioAgentSection";
import SherpAISection from "@/components/SherpAISection";
import FieldOpsSection from "@/components/FieldOpsSection";
import PilotProgramSection from "@/components/PilotProgramSection";
import RoadmapSection from "@/components/RoadmapSection";
import ModulesSection from "@/components/ModulesSection";
import DataFusionSection from "@/components/DataFusionSection";
import TerrainVisualization from "@/components/TerrainVisualization";
import TechStackSection from "@/components/TechStackSection";
import ARVisionSection from "@/components/ARVisionSection";
import OriginSection from "@/components/OriginSection";
import TeamSection from "@/components/TeamSection";
import DocumentsSection from "@/components/DocumentsSection";
import PartnersSection from "@/components/PartnersSection";
import Footer from "@/components/Footer";
import AmbientParticles from "@/components/AmbientParticles";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AmbientParticles />
      <Navbar />
      <HeroSection />
      <div className="amber-line" />
      <RadioAgentSection />
      <div className="amber-line" />
      <SherpAISection />
      <div className="amber-line" />
      <FieldOpsSection />
      <div className="amber-line" />
      <PilotProgramSection />
      <div className="amber-line" />
      <RoadmapSection />
      <div className="amber-line" />
      <ModulesSection />
      <div className="amber-line" />
      <DataFusionSection />
      <div className="amber-line" />
      <TerrainVisualization />
      <div className="amber-line" />
      <TechStackSection />
      <div className="amber-line" />
      <ARVisionSection />
      <div className="amber-line" />
      <OriginSection />
      <div className="amber-line" />
      <TeamSection />
      <div className="amber-line" />
      <PartnersSection />
      <div className="amber-line" />
      <DocumentsSection />
      <Footer />
    </div>
  );
};

export default Index;

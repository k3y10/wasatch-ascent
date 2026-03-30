import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModulesSection from "@/components/ModulesSection";
import SherpAISection from "@/components/SherpAISection";
import TerrainVisualization from "@/components/TerrainVisualization";
import FieldOpsSection from "@/components/FieldOpsSection";
import Footer from "@/components/Footer";
import AmbientParticles from "@/components/AmbientParticles";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AmbientParticles />
      <Navbar />
      <HeroSection />
      <div className="amber-line" />
      <ModulesSection />
      <div className="amber-line" />
      <SherpAISection />
      <div className="amber-line" />
      <TerrainVisualization />
      <div className="amber-line" />
      <FieldOpsSection />
      <Footer />
    </div>
  );
};

export default Index;

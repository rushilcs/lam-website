import { Navbar } from "../components/Navbar";
import { AboutSection } from "../components/AboutSection";
import { ReasoningSection } from "../components/ReasoningSection";
import { ConceptsSection } from "../components/ConceptsSection";
import { ConceptsPortfolio } from "../components/ConceptsPortfolio";
import { EvidenceSection } from "../components/EvidenceSection";
import { Chatbot } from "../components/Chatbot";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <AboutSection />
        <ReasoningSection />
        <ConceptsSection />
        <ConceptsPortfolio />
        <EvidenceSection />
      </main>
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

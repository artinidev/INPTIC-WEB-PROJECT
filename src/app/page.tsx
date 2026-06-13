import React from "react";
import { Navbar } from "../components/ui/Navbar";
import { HeroSection } from "../sections/HeroSection";
import { WhoWeAre } from "../sections/WhoWeAre";
import { AcademicPrograms } from "../sections/AcademicPrograms";
import { ProfessionalTraining } from "../sections/ProfessionalTraining";
import { LearnAnywhere } from "../sections/LearnAnywhere";
import { ResearchInnovation } from "../sections/ResearchInnovation";
import { IndustryPartnerships } from "../sections/IndustryPartnerships";
import { StudentLife } from "../sections/StudentLife";
import { NewsAnnouncements } from "../sections/NewsAnnouncements";
import { FAQSection } from "../sections/FAQSection";
import { FinalCTA } from "../sections/FinalCTA";
import { Footer } from "../sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WhoWeAre />
        <AcademicPrograms />
        <ProfessionalTraining />
        <LearnAnywhere />
        <ResearchInnovation />
        <IndustryPartnerships />
        <StudentLife />
        <NewsAnnouncements />
        <FAQSection />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}

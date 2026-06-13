"use client";
import React from "react";
import { useScrollFadeUp } from "../hooks/useScrollFadeUp";
import { useTranslation } from "../i18n/LanguageContext";
import { 
  GraduationCap, 
  Award, 
  Microscope, 
  TrendingUp, 
  Briefcase, 
  Code 
} from "lucide-react";

export const WhoWeAre: React.FC = () => {
  const ref = useScrollFadeUp();
  const { t } = useTranslation();

  // Highlight items from json (usually 6 items)
  const highlights = (t("whoWeAre.highlights") as string[]) || [
    "Engineering Education",
    "Professional Certifications",
    "Research & Innovation",
    "Continuous Professional Development",
    "Industry Partnerships",
    "Digital Skills Development"
  ];

  // Map icons
  const icons = [
    <GraduationCap key="0" size={24} />,
    <Award key="1" size={24} />,
    <Microscope key="2" size={24} />,
    <TrendingUp key="3" size={24} />,
    <Briefcase key="4" size={24} />,
    <Code key="5" size={24} />
  ];

  // Create base items
  const baseItems = highlights.map((text, idx) => ({
    id: `item-${idx}`,
    text,
    icon: icons[idx % icons.length]
  }));

  // We have 6 items. To make a rich 3-row layout, we can stagger them.
  // Row 1: 0, 1, 2, 3, 4, 5
  // Row 2: 2, 3, 4, 5, 0, 1
  // Row 3: 4, 5, 0, 1, 2, 3

  const row1 = [...baseItems];
  const row2 = [...baseItems.slice(2), ...baseItems.slice(0, 2)];
  const row3 = [...baseItems.slice(4), ...baseItems.slice(0, 4)];

  // Helper to render a track consisting of two identical halves for seamless infinite CSS scroll (-50% transform)
  const renderTrack = (items: typeof baseItems, direction: "left" | "right") => {
    // Duplicate the items so the track has exactly two identical halves.
    // Ensure the array is long enough to fill a 4K screen (e.g. at least 12 items per half).
    // Our base is 6 items. We'll duplicate it twice to make a half of 12 items.
    const half = [...items, ...items];
    const fullTrack = [...half, ...half];

    return (
      <div className={`nx-pill-track animate-${direction}`}>
        {fullTrack.map((item, i) => (
          <div key={`${item.id}-${i}`} className="nx-pill-card">
            <div className="nx-pill-icon">
              {item.icon}
            </div>
            <span className="nx-pill-text">{item.text}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="nx-who-section" id="who-we-are" ref={ref}>
      <div className="nx-who-header">
        <span className="nx-industry-label nx-fade-up">INPTIC</span>
        <h2 className="nx-industry-title nx-fade-up nx-fade-up-delay-1" style={{color: "var(--color-text)", marginTop: "1.5rem"}}>
          {t("whoWeAre.title")}
        </h2>
        <p className="nx-industry-desc nx-fade-up nx-fade-up-delay-2" style={{color: "var(--color-text-muted)", margin: "0 auto", maxWidth: "100%"}}>
          {t("whoWeAre.description")}
        </p>
      </div>

      <div className="nx-pill-marquee-wrapper nx-fade-up nx-fade-up-delay-3">
        {renderTrack(row1, "left")}
        {renderTrack(row2, "right")}
        {renderTrack(row3, "left")}
      </div>
    </section>
  );
};

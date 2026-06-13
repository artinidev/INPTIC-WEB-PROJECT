"use client";
import React, { useState, useEffect } from "react";
import { useScrollFadeUp } from "../hooks/useScrollFadeUp";
import Image from "next/image";
import { GraduationCap, Microscope } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";

const programImages = [
  "/academic-engineering.jpg",
  "/academic-masters.jpg"
];

export const AcademicPrograms: React.FC = () => {
  const ref = useScrollFadeUp();
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();

  const programs = [
    {
      icon: <GraduationCap size={20} style={{ marginInlineEnd: "0.5rem" }} />,
      title: t("academic.programs.0.title"),
      label: "BAC+5",
      text: t("academic.programs.0.description"),
      image: programImages[0],
      link: "#apply-engineering"
    },
    {
      icon: <Microscope size={20} style={{ marginInlineEnd: "0.5rem" }} />,
      title: t("academic.programs.1.title"),
      label: "Post-Grad",
      text: t("academic.programs.1.description"),
      image: programImages[1],
      link: "#apply-masters"
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % programs.length);
    }, 3000); // Auto-rotate every 3 seconds

    return () => clearInterval(timer);
  }, [programs.length]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="nx-section" id="academic-programs" ref={ref}>
      <div className="nx-container">
        <div className="nx-grid-center" style={{maxWidth: "640px", marginBottom: "3.5rem"}}>
          <span className="nx-section-label nx-fade-up">{t("academic.label")}</span>
          <h2 className="nx-section-title nx-fade-up nx-fade-up-delay-1">{t("academic.title")}</h2>
          <p className="nx-section-sub nx-fade-up nx-fade-up-delay-2">
            {t("academic.subtitle")}
          </p>
        </div>

        <div className="nx-tab-slider nx-fade-up nx-fade-up-delay-2">
          {/* Background Images Layer */}
          <div className="nx-tab-slider-bg-layer">
            {programs.map((p, i) => (
              <Image 
                key={`bg-${i}`}
                src={p.image}
                alt={p.title}
                fill
                className={`nx-tab-slider-bg ${i === activeIndex ? "active" : ""}`}
                sizes="(max-width: 768px) 100vw, 100vw"
              />
            ))}
          </div>

          {/* Foreground Tab Panel */}
          <div className="nx-tab-slider-panel">
            {programs.map((p, i) => {
              const isActive = i === activeIndex;
              return (
                <div 
                  key={`tab-${i}`} 
                  className={`nx-tab-item ${isActive ? "active" : ""}`}
                  onClick={() => handleTabClick(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleTabClick(i);
                  }}
                >
                  <div className="nx-section-label" style={{ marginBottom: "0.5rem" }}>
                    {p.label}
                  </div>
                  <h3 className="nx-tab-title">{p.title}</h3>
                  
                  {/* Expanding Content */}
                  <div className="nx-tab-content">
                    <div className="nx-tab-inner">
                      <p className="nx-tab-desc">{p.text}</p>
                      <a 
                        href={p.link} 
                        className="nx-btn-primary" 
                        style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", display: "inline-flex", alignItems: "center" }}
                      >
                        {p.icon} {t("academic.cta")}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";
import React from "react";
import Image from "next/image";
import { useScrollFadeUp } from "../hooks/useScrollFadeUp";
import { useTranslation } from "../i18n/LanguageContext";

export const ResearchInnovation: React.FC = () => {
  const ref = useScrollFadeUp();
  const { t } = useTranslation();

  return (
    <section className="nx-section nx-section-alt" id="research" ref={ref}>
      <div className="nx-container">
        <div className="nx-feature-row">
          <div
            className="nx-feature-img nx-fade-up"
            style={{ position: "relative", overflow: "hidden" }}
          >
            <Image 
              src="/life-science.jpg" 
              alt="Research & Innovation" 
              fill 
              style={{ objectFit: "cover" }} 
            />
          </div>
          <div>
            <span className="nx-section-label nx-fade-up">{t("research.label")}</span>
            <h2 className="nx-section-title nx-fade-up nx-fade-up-delay-1">{t("research.title")}</h2>
            <p className="nx-section-sub nx-fade-up nx-fade-up-delay-2" style={{marginBottom: "2.5rem"}}>
              {t("research.subtitle")}
            </p>
            <a href="#research" className="nx-btn-primary nx-btn-primary-lg nx-fade-up nx-fade-up-delay-3"
              style={{display: "inline-flex"}}>
              {t("research.cta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";
import React from "react";
import { useScrollFadeUp } from "../hooks/useScrollFadeUp";
import { useTranslation } from "../i18n/LanguageContext";

export const FinalCTA: React.FC = () => {
  const ref = useScrollFadeUp();
  const { t } = useTranslation();

  return (
    <section className="nx-cta-section nx-section-alt" id="apply" ref={ref}>
      <div className="nx-cta-glow" />
      <div className="nx-container" style={{position: "relative", zIndex: 1}}>
        <div style={{maxWidth: "640px", margin: "0 auto"}}>
          <span className="nx-section-label nx-fade-up">Get Started</span>
          <h2 className="nx-section-title nx-fade-up nx-fade-up-delay-1" style={{marginBottom: "1.25rem"}}>
            {t("finalCta.title")}
          </h2>
          <p className="nx-section-sub nx-fade-up nx-fade-up-delay-2" style={{margin: "0 auto 2.5rem", textAlign: "center"}}>
            {t("finalCta.description")}
          </p>
          <div className="nx-fade-up nx-fade-up-delay-3" style={{display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap"}}>
            <a href="#apply" className="nx-btn-primary nx-btn-primary-lg">{t("finalCta.ctaPrimary")} →</a>
            <a href="#contact" className="nx-btn-outline-lg">{t("finalCta.ctaSecondary")}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

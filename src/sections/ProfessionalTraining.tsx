"use client";
import React from "react";
import { useScrollFadeUp } from "../hooks/useScrollFadeUp";
import { Monitor, Globe, Settings, BarChart, Brain, MessageSquare } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";


export const ProfessionalTraining: React.FC = () => {
  const ref = useScrollFadeUp();
  const { t } = useTranslation();

  const areas = [
    { icon: <Monitor size={24} />, title: t("training.areas.0.title"), text: t("training.areas.0.description") },
    { icon: <Globe size={24} />, title: t("training.areas.1.title"), text: t("training.areas.1.description") },
    { icon: <Settings size={24} />, title: t("training.areas.2.title"), text: t("training.areas.2.description") },
    { icon: <BarChart size={24} />, title: t("training.areas.3.title"), text: t("training.areas.3.description") },
    { icon: <Brain size={24} />, title: t("training.areas.4.title"), text: t("training.areas.4.description") },
    { icon: <MessageSquare size={24} />, title: t("training.areas.5.title"), text: t("training.areas.5.description") },
  ];

  return (
    <section className="nx-section nx-section-alt" id="professional-training" ref={ref}>
      <div className="nx-container">
        <div className="nx-grid-center" style={{maxWidth: "640px", marginBottom: "3.5rem"}}>
          <span className="nx-section-label nx-fade-up">{t("training.label")}</span>
          <h2 className="nx-section-title nx-fade-up nx-fade-up-delay-1">{t("training.title")}</h2>
          <p className="nx-section-sub nx-fade-up nx-fade-up-delay-2">
            {t("training.subtitle")}
          </p>
        </div>

        <div className="nx-grid-3">
          {areas.map((area, i) => (
            <div key={i} className={`nx-card nx-fade-up nx-fade-up-delay-${Math.min(i + 1, 4)}`}>
              <div className="nx-card-icon">{area.icon}</div>
              <div className="nx-card-title">{area.title}</div>
              <p className="nx-card-text">{area.text}</p>
            </div>
          ))}
        </div>

        <div className="nx-fade-up" style={{textAlign: "center", marginTop: "3rem"}}>
          <a href="#training-catalog" className="nx-btn-primary nx-btn-primary-lg">{t("training.cta")} →</a>
        </div>
      </div>
    </section>
  );
};

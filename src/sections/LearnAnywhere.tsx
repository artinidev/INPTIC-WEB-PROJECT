"use client";
import React from "react";
import Image from "next/image";
import { useScrollFadeUp } from "../hooks/useScrollFadeUp";
import { useTranslation } from "../i18n/LanguageContext";

export const LearnAnywhere: React.FC = () => {
  const ref = useScrollFadeUp();
  const { t } = useTranslation();

  return (
    <section className="nx-section" id="elearning" ref={ref}>
      <div className="nx-container">
        <div className="nx-feature-row reverse">
          <div>
            <span className="nx-section-label nx-fade-up">{t("elearning.label")}</span>
            <h2 className="nx-section-title nx-fade-up nx-fade-up-delay-1">{t("elearning.title")}</h2>
            <p className="nx-section-sub nx-fade-up nx-fade-up-delay-2" style={{marginBottom: "2.5rem"}}>
              {t("elearning.description")}
            </p>
            <ul className="nx-check-list nx-fade-up nx-fade-up-delay-3" style={{marginBottom: "2.5rem"}}>
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i} className="nx-check-item">
                  <span className="nx-check-icon">✓</span>
                  {t(`elearning.features.${i}`)}
                </li>
              ))}
            </ul>
            <a href="https://inptic-elearning.com" target="_blank" rel="noopener noreferrer"
              className="nx-btn-primary nx-btn-primary-lg nx-fade-up nx-fade-up-delay-4"
              style={{display: "inline-flex"}}>
              {t("elearning.cta")}
            </a>
          </div>

          <div
            className="nx-feature-img nx-fade-up nx-fade-up-delay-1"
            style={{ position: "relative", overflow: "hidden" }}
          >
            <Image 
              src="/elearning.jpg" 
              alt="INPTIC E-Learning Platform" 
              fill 
              style={{ objectFit: "cover" }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

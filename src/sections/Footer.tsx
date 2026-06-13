"use client";
import React from "react";
import { useTranslation } from "../i18n/LanguageContext";

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const links = [
    { label: t("footer.links.academic"), href: "#academic-programs" },
    { label: t("footer.links.training"), href: "#professional-training" },
    { label: t("footer.links.elearning"), href: "https://inptic-elearning.com" },
    { label: t("footer.links.research"), href: "#research" },
    { label: t("footer.links.studentServices"), href: "#student-life" },
    { label: t("footer.links.contactPage"), href: "#contact" },
  ];

  return (
    <footer className="nx-footer">
      <div className="nx-container">
        <div className="nx-footer-grid">
          <div>
            <div className="nx-nav-logo" style={{marginBottom: "1.25rem"}}>INPTIC</div>
            <p style={{color: "var(--color-text-muted)", fontSize: "0.9375rem", maxWidth: "340px", lineHeight: 1.7, marginBottom: "1.5rem"}}>
              {t("footer.tagline")}
            </p>
            <div style={{display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--color-text-dim)", fontSize: "0.9rem"}}>
              <span>📍 {t("footer.address")}</span>
              <span>📞 +213 23 89 04 36</span>
              <a href="mailto:contact@inptic.edu.dz" style={{color: "var(--color-text-dim)", transition: "color var(--transition-fast)"}}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--color-primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-dim)")}>
                ✉ contact@inptic.edu.dz
              </a>
            </div>
          </div>
          <div>
            <div style={{fontWeight: 600, color: "var(--color-text)", marginBottom: "1.25rem", fontSize: "0.9375rem"}}>{t("footer.quickLinks")}</div>
            <ul className="nx-footer-links">
              {links.map((l, i) => (
                <li key={i}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{fontWeight: 600, color: "var(--color-text)", marginBottom: "1.25rem", fontSize: "0.9375rem"}}>{t("footer.location")}</div>
            <div style={{width: "100%", height: "200px", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", background: "var(--color-bg-alt)"}}>
              <iframe 
                src="https://maps.google.com/maps?q=36.6624384,3.1451475&hl=en&z=14&output=embed"
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="INPTIC Campus Map"
              />
            </div>
          </div>
        </div>
        <div className="nx-footer-bottom">
          <span>© {new Date().getFullYear()} INPTIC. {t("footer.rights")}</span>
          <a href="https://inptic.edu.dz" target="_blank" rel="noopener noreferrer"
            style={{color: "var(--color-text-dim)", transition: "color var(--transition-fast)"}}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--color-primary)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-dim)")}>
            inptic.edu.dz
          </a>
        </div>
      </div>
    </footer>
  );
};

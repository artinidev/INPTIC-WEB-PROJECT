"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpen, MonitorPlay, Briefcase, ChevronDown, Menu, X } from "lucide-react";
import { useTranslation } from "../../i18n/LanguageContext";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isProgramsHovered, setIsProgramsHovered] = useState(false);
  const [activeMegaItem, setActiveMegaItem] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const megaMenuItems = [
    {
      id: "bachelors",
      icon: <GraduationCap size={20} />,
      title: t("nav.mega.bachelors.title"),
      desc: t("nav.mega.bachelors.desc"),
      href: "#academic-programs",
      featuredImg: "/news-admissions.png",
      featuredTitle: t("nav.mega.bachelors.featuredTitle"),
      featuredDesc: t("nav.mega.bachelors.featuredDesc"),
      featuredBtn: t("nav.mega.bachelors.featuredBtn"),
      featuredLink: "#apply"
    },
    {
      id: "masters",
      icon: <BookOpen size={20} />,
      title: t("nav.mega.masters.title"),
      desc: t("nav.mega.masters.desc"),
      href: "#academic-programs",
      featuredImg: "/news-academic.png",
      featuredTitle: t("nav.mega.masters.featuredTitle"),
      featuredDesc: t("nav.mega.masters.featuredDesc"),
      featuredBtn: t("nav.mega.masters.featuredBtn"),
      featuredLink: "#academic-programs"
    },
    {
      id: "training",
      icon: <Briefcase size={20} />,
      title: t("nav.mega.training.title"),
      desc: t("nav.mega.training.desc"),
      href: "#professional-training",
      featuredImg: "/news-events.png",
      featuredTitle: t("nav.mega.training.featuredTitle"),
      featuredDesc: t("nav.mega.training.featuredDesc"),
      featuredBtn: t("nav.mega.training.featuredBtn"),
      featuredLink: "#professional-training"
    },
    {
      id: "elearning",
      icon: <MonitorPlay size={20} />,
      title: t("nav.mega.elearning.title"),
      desc: t("nav.mega.elearning.desc"),
      href: "https://inptic-elearning.com",
      featuredImg: "/slide-1.jpg", 
      featuredTitle: t("nav.mega.elearning.featuredTitle"),
      featuredDesc: t("nav.mega.elearning.featuredDesc"),
      featuredBtn: t("nav.mega.elearning.featuredBtn"),
      featuredLink: "https://inptic-elearning.com"
    }
  ];

  return (
    <nav className={`nx-nav${scrolled ? " scrolled" : ""}`}>
      <div className="nx-container">
        <div className="nx-nav-inner" style={{ position: "relative" }}>
          <a href="/" className="nx-nav-logo">INPTIC</a>
          
          <ul className="nx-nav-links" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            <li 
              onMouseEnter={() => setIsProgramsHovered(true)}
              onMouseLeave={() => {
                setIsProgramsHovered(false);
                setTimeout(() => setActiveMegaItem(0), 300);
              }}
            >
              <a href="#academic-programs" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", cursor: "pointer" }}>
                {t("nav.programs")}
                <ChevronDown size={14} style={{ transform: isProgramsHovered ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
              </a>
              
              <AnimatePresence>
                {isProgramsHovered && (
                  <>
                    <div style={{ position: "absolute", top: "calc(100% - 1rem)", right: 0, width: "1080px", height: "2.5rem", zIndex: 99 }} />
                    
                    <motion.div
                      style={{ 
                        position: "absolute", 
                        top: "calc(100% + 1rem)", 
                        right: language === 'ar' ? 'auto' : 0, 
                        left: language === 'ar' ? 0 : 'auto',
                        width: "1080px", 
                        background: "#ffffff", 
                        borderRadius: "16px", 
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05)", 
                        border: "1px solid rgba(0,0,0,0.04)", 
                        display: "flex", 
                        flexDirection: language === 'ar' ? "row-reverse" : "row",
                        overflow: "hidden", 
                        zIndex: 100, 
                        cursor: "default", 
                        textAlign: language === 'ar' ? "right" : "left" 
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {/* Left Grid: Programs */}
                      <div style={{ flex: 1.8, padding: "2.5rem 3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
                        {megaMenuItems.map((item, index) => (
                          <a 
                            key={item.id}
                            href={item.href} 
                            onMouseEnter={() => setActiveMegaItem(index)}
                            style={{ 
                              display: "flex", 
                              flexDirection: language === 'ar' ? "row-reverse" : "row",
                              gap: "1.25rem", 
                              alignItems: "flex-start", 
                              textDecoration: "none",
                              padding: "1.25rem",
                              borderRadius: "12px",
                              transition: "all 0.2s ease",
                              background: activeMegaItem === index ? "#f9f9fb" : "transparent",
                              border: "1px solid",
                              borderColor: activeMegaItem === index ? "rgba(0,0,0,0.05)" : "transparent",
                            }}
                          >
                            <div style={{ 
                              width: "44px", height: "44px", borderRadius: "10px", 
                              background: activeMegaItem === index ? "#ffffff" : "#f4f4f4", 
                              display: "flex", alignItems: "center", justifyContent: "center", 
                              color: "var(--color-primary)", flexShrink: 0, 
                              boxShadow: activeMegaItem === index ? "0 4px 12px rgba(0,0,0,0.05)" : "none", 
                              transition: "all 0.2s ease" 
                            }}>
                              {item.icon}
                            </div>
                            <div>
                              <h4 style={{ fontSize: "1rem", fontWeight: 700, color: activeMegaItem === index ? "var(--color-primary)" : "#111111", marginBottom: "0.35rem", transition: "color 0.2s ease" }}>{item.title}</h4>
                              <p style={{ fontSize: "0.85rem", color: "#666666", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                            </div>
                          </a>
                        ))}
                      </div>

                      {/* Right Side: Featured Highlight */}
                      <div style={{ flex: 1, background: "#f9f9fb", padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "center", borderLeft: language === 'ar' ? "none" : "1px solid rgba(0,0,0,0.04)", borderRight: language === 'ar' ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeMegaItem}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15 }}
                            style={{ display: "flex", flexDirection: "column", alignItems: language === 'ar' ? "flex-end" : "flex-start" }}
                          >
                            <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", position: "relative", marginBottom: "1.5rem" }}>
                              <Image 
                                src={megaMenuItems[activeMegaItem].featuredImg} 
                                alt={megaMenuItems[activeMegaItem].featuredTitle} 
                                fill 
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <h4 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111111", marginBottom: "0.5rem" }}>{megaMenuItems[activeMegaItem].featuredTitle}</h4>
                            <p style={{ fontSize: "0.9rem", color: "#555555", marginBottom: "1.5rem", lineHeight: 1.6 }}>{megaMenuItems[activeMegaItem].featuredDesc}</p>
                            <a href={megaMenuItems[activeMegaItem].featuredLink} className="nx-btn-ghost" style={{ fontSize: "0.85rem", padding: "0.5rem 1.25rem" }}>{megaMenuItems[activeMegaItem].featuredBtn}</a>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

            </li>
            <li><a href="#professional-training">{t("nav.training")}</a></li>
            <li><a href="#research">{t("nav.research")}</a></li>
            <li><a href="#student-life">{t("nav.studentLife")}</a></li>
          </ul>

          <div className="nx-nav-actions">
            {/* Desktop-only items */}
            <div className="nx-nav-desktop-actions">
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value as any)}
                style={{ background: "transparent", border: "none", outline: "none", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", color: scrolled ? "var(--color-text)" : "#fff" }}
              >
                <option value="en" style={{ color: "#000" }}>EN</option>
                <option value="fr" style={{ color: "#000" }}>FR</option>
                <option value="ar" style={{ color: "#000" }}>AR</option>
              </select>
            </div>

            {/* Always visible "Apply Now" CTA */}
            <a href="#apply" className="nx-btn-primary" style={{ background: "#0066FF", color: "#FFFFFF" }}>{t("nav.applyNow")}</a>

            {/* Mobile Hamburger Menu Toggle */}
            <button className="nx-mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: "70px", /* Height of scrolled navbar */
              left: 0,
              right: 0,
              height: "calc(100vh - 70px)",
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              padding: "2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              zIndex: 99,
              textAlign: language === 'ar' ? "right" : "left",
              overflowY: "auto"
            }}
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <li>
                <div style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700, color: "var(--color-primary)", marginBottom: "0.5rem" }}>{t("nav.programs")}</div>
                <ul style={{ listStyle: "none", padding: language === 'ar' ? "0 1rem 0 0" : "0 0 0 1rem", margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <li><a href="#academic-programs" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--color-text)", textDecoration: "none" }}>{t("nav.mega.bachelors.title")}</a></li>
                  <li><a href="#academic-programs" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--color-text)", textDecoration: "none" }}>{t("nav.mega.masters.title")}</a></li>
                </ul>
              </li>
              <li><a href="#professional-training" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", textDecoration: "none" }}>{t("nav.training")}</a></li>
              <li><a href="#research" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", textDecoration: "none" }}>{t("nav.research")}</a></li>
              <li><a href="#student-life" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", textDecoration: "none" }}>{t("nav.studentLife")}</a></li>
              <li><a href="#contact" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", textDecoration: "none" }}>Contact Us</a></li>
            </ul>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "auto", paddingBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: language === 'ar' ? "flex-end" : "flex-start" }}>
                <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-text-muted)" }}>Language:</span>
                <select 
                  value={language} 
                  onChange={(e) => {
                    setLanguage(e.target.value as any);
                    setIsMobileMenuOpen(false);
                  }}
                  style={{ background: "#f4f4f4", border: "none", padding: "0.5rem 1rem", borderRadius: "8px", outline: "none", fontSize: "1rem", fontWeight: 600, cursor: "pointer", color: "var(--color-text)" }}
                >
                  <option value="en">English (EN)</option>
                  <option value="fr">Français (FR)</option>
                  <option value="ar">العربية (AR)</option>
                </select>
              </div>
              <a href="https://inptic-elearning.com" onClick={() => setIsMobileMenuOpen(false)} className="nx-btn-ghost" style={{ textAlign: "center", width: "100%", padding: "1rem" }} target="_blank" rel="noopener noreferrer">{t("nav.elearning")}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, animate, AnimatePresence } from "framer-motion";
import { useTranslation } from "../i18n/LanguageContext";

const promoImages = [
  "/news-events.png",
  "/news-academic.png",
  "/life-innovation.jpg"
];

const PromoGadget = () => {
  const [activePromo, setActivePromo] = useState(0);
  const { t, language } = useTranslation();
  
  // Create localized events array based on image list and same promo title/cta structure
  const promoEvents = promoImages.map((img, i) => ({
    id: i + 1,
    title: t("hero.promo.title"), // You can expand this to array if you add unique event titles
    cta: t("hero.promo.cta"),
    image: img
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePromo((current) => (current + 1) % promoEvents.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [promoEvents.length]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      style={{
        position: "absolute",
        top: "8rem",
        right: language === "ar" ? "auto" : "3rem",
        left: language === "ar" ? "3rem" : "auto",
        zIndex: 20,
        width: "300px",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "160px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePromo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image 
              src={promoEvents[activePromo].image} 
              alt={promoEvents[activePromo].title} 
              fill 
              style={{ objectFit: "cover" }} 
            />
            {/* Gradient overlay for text readability */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)" }} />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem", color: "white" }}>
          <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "1px", color: "#38bdf8", marginBottom: "0.25rem", fontWeight: 600 }}>Upcoming Event</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`title-${activePromo}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem", lineHeight: 1.2 }}>
                {promoEvents[activePromo].title}
              </div>
              <a href="#event" style={{ fontSize: "0.8rem", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: "0.25rem", color: "white", textDecoration: "none" }}>
                {promoEvents[activePromo].cta} <span style={{ color: "#38bdf8" }}>→</span>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Carousel dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", padding: "0.75rem", background: "rgba(0,0,0,0.3)" }}>
        {promoEvents.map((_, i) => (
          <div 
            key={i} 
            style={{ 
              width: "6px", height: "6px", borderRadius: "50%", 
              background: i === activePromo ? "#38bdf8" : "rgba(255,255,255,0.3)",
              transition: "background 0.3s ease",
              cursor: "pointer"
            }} 
            onClick={() => setActivePromo(i)}
          />
        ))}
      </div>
    </motion.div>
  );
};

const AnimatedStat = ({ target = 15000, duration = 3 }: { target?: number, duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (node) {
      const controls = animate(0, target, {
        duration: duration,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value).toLocaleString();
        },
      });
      return () => controls.stop();
    }
  }, [target, duration]);

  return <span ref={nodeRef} style={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1 }}>0</span>;
};

const slideImages = [
  "/slide-1.jpg",
  "/slide-2.jpg",
  "/slide-3.jpg"
];

export const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const { t, language } = useTranslation();

  const slides = [
    {
      image: slideImages[1],
      tag: t("hero.slides.1.tag"),
      title: t("hero.slides.1.title"),
      sub: t("hero.slides.1.sub"),
    },
    {
      image: slideImages[2],
      tag: t("hero.slides.2.tag"),
      title: t("hero.slides.2.title"),
      sub: t("hero.slides.2.sub"),
    },
    {
      image: slideImages[0],
      tag: t("hero.slides.0.tag"),
      title: t("hero.slides.0.title"),
      sub: t("hero.slides.0.sub"),
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(activeIndex);
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleDotClick = (index: number) => {
    if (index === activeIndex) return;
    setPrevIndex(activeIndex);
    setActiveIndex(index);
  };

  return (
    <section className="nx-hero" id="home">
      {/* Background Images Layer */}
      {slides.map((slide, i) => (
        <div key={`bg-${i}`} className={`nx-hero-slide-bg ${i === activeIndex ? "active" : ""}`}>
          <Image 
            src={slide.image} 
            alt={slide.title} 
            fill 
            priority={i === 0} 
            className="nx-hero-img" 
            sizes="100vw"
            quality={100}
            unoptimized={true}
          />
        </div>
      ))}

      {/* Gradient Overlay for Text Readability */}
      <div className="nx-hero-overlay" />

      {/* Content Layer */}
      <div className="nx-container nx-hero-content-wrapper">
        <div className="nx-hero-text-block">
          {slides.map((slide, i) => (
            <div 
              key={`content-${i}`} 
              className={`nx-hero-slide-content ${i === activeIndex ? "active" : i === prevIndex ? "leaving" : ""}`}
            >
              <div className="nx-hero-tag">
                <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-primary)"}} />
                {slide.tag}
              </div>

              <h1 className="nx-hero-title">{slide.title}</h1>
              <p className="nx-hero-sub">{slide.sub}</p>

              <div className="nx-hero-cta">
                <a href="#apply" className="nx-btn-primary nx-btn-primary-lg">{t("hero.ctaPrimary")}</a>
                <a href="#academic-programs" className="nx-btn-outline-lg">{t("hero.ctaSecondary")}</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="nx-container nx-hero-nav">
        {slides.map((_, i) => (
          <button 
            key={`dot-${i}`} 
            className={`nx-hero-dot ${i === activeIndex ? "active" : ""}`} 
            onClick={() => handleDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{ border: "none", padding: 0 }}
          />
        ))}
      </div>

      <PromoGadget />

      {/* Bottom Right Stats Gadget (Beside Logo) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "3rem",
          right: language === "ar" ? "auto" : "15rem",
          left: language === "ar" ? "15rem" : "auto",
          zIndex: 20,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.2)",
          padding: "1rem 2rem",
          borderRadius: "100px",
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
          color: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
            <AnimatedStat target={15000} duration={3} />
            <span style={{ fontWeight: 700, fontSize: "1.5rem", color: "#38bdf8", lineHeight: 1 }}>+</span>
          </div>
          <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.9, marginTop: "4px" }}>Alumni Network</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
            <AnimatedStat target={50} duration={2} />
            <span style={{ fontWeight: 700, fontSize: "1.5rem", color: "#38bdf8", lineHeight: 1 }}>+</span>
          </div>
          <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.9, marginTop: "4px" }}>Industry Partners</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
            <AnimatedStat target={25} duration={2.5} />
            <span style={{ fontWeight: 700, fontSize: "1.5rem", color: "#38bdf8", lineHeight: 1 }}>+</span>
          </div>
          <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.9, marginTop: "4px" }}>Years Excellence</span>
        </div>
      </motion.div>

      {/* Bottom Right Floating Logo */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "3rem",
          right: language === "ar" ? "auto" : "4rem",
          left: language === "ar" ? "4rem" : "auto",
          zIndex: 20,
        }}
      >
        <Image 
          src="/hero-logo.png" 
          alt="INPTIC Logo" 
          width={150} 
          height={150} 
          style={{ objectFit: "contain", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))" }} 
        />
      </motion.div>
    </section>
  );
};

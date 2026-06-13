"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useScrollFadeUp } from "../hooks/useScrollFadeUp";
import { motion, useAnimationFrame, useMotionValue, useSpring } from "framer-motion";
import { useTranslation } from "../i18n/LanguageContext";

const industryImages = [
  "/industry-partner.png",
  "/industry-internship.png",
  "/industry-research.png",
  "/industry-career.png",
  "/industry-engagement.png"
];

export const IndustryPartnerships: React.FC = () => {
  const ref = useScrollFadeUp();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [totalWidth, setTotalWidth] = useState(0);
  const { t, language } = useTranslation();

  const benefits = t("industry.benefits") as {title: string, desc: string}[];
  const initialCards = Array.isArray(benefits) ? benefits.map((b, i) => ({
    title: b.title,
    text: b.desc,
    image: industryImages[i]
  })) : [];
  
  const cards = [...initialCards, ...initialCards];
  
  const x = useMotionValue(0);
  const baseVelocity = language === "ar" ? 0.5 : -0.5; // Reverse direction for RTL

  // Smooth spring for velocity to ease in/out when pausing/resuming
  const velocityObj = useSpring(baseVelocity, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isHovered || isDragging) {
      velocityObj.set(0);
    } else {
      velocityObj.set(baseVelocity);
    }
  }, [isHovered, isDragging, velocityObj]);

  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        // Because the track contains 2 duplicated sets of items,
        // exactly 1 loop is half of the total scroll width of the track element.
        setTotalWidth(trackRef.current.scrollWidth / 2);
      }
    };
    
    updateWidth();
    window.addEventListener("resize", updateWidth);
    // Slight delay to ensure images/fonts loaded and width settled
    setTimeout(updateWidth, 250);
    
    return () => window.removeEventListener("resize", updateWidth);
  }, [cards.length]);

  useAnimationFrame((time, delta) => {
    if (!trackRef.current || totalWidth === 0) return;
    
    const currentVelocity = velocityObj.get();
    
    // Only process animation if there is velocity and we aren't actively dragging
    if (Math.abs(currentVelocity) > 0.01 && !isDragging) {
      let nextX = x.get() + currentVelocity * (delta / 16);
      
      // Wrap the value seamlessly
      if (nextX <= -totalWidth) {
        nextX += totalWidth;
      } else if (nextX >= totalWidth) {
        nextX -= totalWidth;
      }
      
      x.set(nextX);
    }
  });

  return (
    <section className="nx-industry-section" id="partnerships" ref={ref}>
      <div className="nx-industry-layout">
        
        {/* Left Column (Sticky on Desktop) */}
        <div className="nx-industry-sticky" style={{ textAlign: language === "ar" ? "right" : "left" }}>
          <span className="nx-industry-label nx-fade-up">{t("industry.label")}</span>
          <h2 className="nx-industry-title nx-fade-up nx-fade-up-delay-1">
            {t("industry.subtitle")}
          </h2>
          <p className="nx-industry-desc nx-fade-up nx-fade-up-delay-2">
            {t("industry.description")}
          </p>
          <div className="nx-fade-up nx-fade-up-delay-3">
            <a href="#partner" className="nx-industry-btn" style={{flexDirection: language === 'ar' ? 'row-reverse' : 'row'}}>
              <span>{t("industry.cta") || "Partner with us"}</span> <ArrowRight size={18} style={{transform: language === 'ar' ? 'rotate(180deg)' : 'none'}} />
            </a>
          </div>
        </div>

        {/* Right Column (Framer Motion Infinite Carousel) */}
        <div className="nx-industry-carousel-wrapper nx-fade-up nx-fade-up-delay-2">
          <motion.div 
            className="nx-industry-scroller"
            ref={trackRef}
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -10000, right: 10000 }} // Allow infinite dragging in limits
            dragElastic={0} // Makes dragging feel direct 1:1
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onDrag={(e, info) => {
              if (totalWidth === 0) return;
              // When dragging manually, ensure we still wrap around if dragged too far
              let dragX = x.get();
              if (dragX <= -totalWidth) {
                x.set(dragX + totalWidth);
              } else if (dragX >= totalWidth) {
                x.set(dragX - totalWidth);
              }
            }}
          >
            {cards.map((card, idx) => (
              <div className="nx-industry-card" key={`card-${idx}`}>
                <div className="nx-industry-card-img">
                  <Image 
                    src={card.image} 
                    alt={card.title} 
                    fill 
                    sizes="(max-width: 768px) 85vw, 380px"
                  />
                  <div className="nx-industry-card-overlay"></div>
                </div>
                <div className="nx-industry-card-content">
                  <h3 className="nx-industry-card-title">{card.title}</h3>
                  <p className="nx-industry-card-text">{card.text}</p>
                  <div className="nx-industry-card-arrow">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

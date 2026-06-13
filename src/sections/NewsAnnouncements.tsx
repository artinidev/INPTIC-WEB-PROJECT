"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollFadeUp } from "../hooks/useScrollFadeUp";
import { useTranslation } from "../i18n/LanguageContext";

const newsImages = [
  "/admissions.jpg",
  "/news-events.png",
  "/news-academic.png"
];

const StackCard = ({ 
  item, 
  index, 
  total
}: { 
  item: { title: string, description: string, category: string, date: string, image: string, link: string }; 
  index: number; 
  total: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of THIS specific card against the viewport.
  // It starts when the top of the card hits the top of the viewport (which is where it sticks!).
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "start -100%"] 
  });

  // Scale down the card to 0.9 and fade it out as the user scrolls past it and the new card covers it.
  const isLast = index === total - 1;
  const targetScale = isLast ? 1 : 0.9;
  const targetOpacity = isLast ? 1 : 0.3;

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, targetOpacity]);

  return (
    <div 
      className="nx-news-sticky-item" 
      ref={cardRef}
      style={{ 
        // No offset! All cards stick at exactly 120px so they perfectly cover each other.
        top: `120px`,
        zIndex: index 
      }}
    >
      <motion.div 
        className="nx-news-stack-card"
        style={{ scale, opacity }}
      >
        <div className="nx-news-stack-content">
          <h3 className="nx-news-stack-title">{item.title}</h3>
          <p className="nx-news-stack-desc">{item.description}</p>
          
          <div className="nx-news-divider"></div>

          <div className="nx-news-stack-meta-grid">
            <div className="nx-news-stack-meta-item">
              <span className="nx-news-stack-meta-label">Category</span>
              <span className="nx-news-stack-meta-value">{item.category}</span>
            </div>
            <div className="nx-news-stack-meta-item">
              <span className="nx-news-stack-meta-label">Date</span>
              <span className="nx-news-stack-meta-value">{item.date}</span>
            </div>
          </div>
        </div>
        
        <div className="nx-news-stack-img-wrapper">
          <Image 
            src={item.image} 
            alt={item.title} 
            fill 
            sizes="(max-width: 900px) 100vw, 50vw"
            className="nx-news-stack-img"
          />
        </div>
      </motion.div>
    </div>
  );
};

export const NewsAnnouncements: React.FC = () => {
  const fadeUpRef = useScrollFadeUp();
  const { t } = useTranslation();

  const newsData = t("news.items") as {category: string, date: string, title: string, description: string}[];
  const newsItems = Array.isArray(newsData) ? newsData.map((item, i) => ({
    ...item,
    link: "#",
    image: newsImages[i]
  })) : [];

  return (
    <section className="nx-news-stack-section" id="news" ref={fadeUpRef as any}>
      <div className="nx-container">
        
        <div className="nx-news-stack-header" style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem"}}>
          <div>
            <span className="nx-parallax-label nx-fade-up">{t("news.label")}</span>
            <h2 className="nx-parallax-title nx-fade-up nx-fade-up-delay-1" style={{ marginBottom: 0 }}>{t("news.title")}</h2>
          </div>
          <a href="#news-catalog" className="nx-btn-ghost nx-fade-up nx-fade-up-delay-2" style={{ borderColor: 'rgba(0,0,0,0.2)', color: '#111' }}>
            View All News →
          </a>
        </div>

        <div className="nx-news-stack-container">
          {newsItems.map((item, index) => (
            <StackCard 
              key={index} 
              item={item} 
              index={index} 
              total={newsItems.length} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

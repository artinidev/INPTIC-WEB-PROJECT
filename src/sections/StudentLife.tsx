"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useScrollFadeUp } from "../hooks/useScrollFadeUp";
import { useTranslation } from "../i18n/LanguageContext";

const activityImages = [
  "/life-science.jpg",
  "/life-innovation.jpg",
  "/life-events.jpg",
  "/life-sports.jpg",
  "/life-community.jpg"
];

const ParallaxCard = ({ activity }: { activity: { id: string, title: string, text: string, image: string } }) => {
  return (
    <div className="nx-parallax-card">
      <div className="nx-parallax-img-wrapper">
        <Image 
          src={activity.image} 
          alt={activity.title} 
          fill 
          sizes="(max-width: 768px) 100vw, 50vw"
          className="nx-parallax-img"
        />
      </div>
      <div className="nx-parallax-content">
        <div className="nx-parallax-num">{activity.id}</div>
        <h3 className="nx-parallax-card-title">{activity.title}</h3>
        <p className="nx-parallax-card-text">{activity.text}</p>
      </div>
    </div>
  );
};

export const StudentLife: React.FC = () => {
  const ref = useScrollFadeUp();
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();

  const activitiesData = t("studentLife.activities") as {title: string, desc: string}[];
  const activities = Array.isArray(activitiesData) ? activitiesData.map((act, i) => ({
    id: `0${i + 1}`,
    title: act.title,
    text: act.desc,
    image: activityImages[i]
  })) : [];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref as any,
    offset: ["start end", "end start"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Left column translates UP
  const leftY = useTransform(smoothProgress, [0, 1], [150, -150]);
  // Right column translates DOWN (or slower up) to create the opposing parallax feel
  const rightY = useTransform(smoothProgress, [0, 1], [-150, 150]);

  const leftColumn = [activities[0], activities[2], activities[4]];
  const rightColumn = [activities[1], activities[3]];

  return (
    <section className="nx-parallax-section" id="student-life" ref={ref as any}>
      <div className="nx-container">
        
        <div className="nx-parallax-header">
          <span className="nx-parallax-label nx-fade-up">{t("studentLife.label")}</span>
          <h2 className="nx-parallax-title nx-fade-up nx-fade-up-delay-1">
            {t("studentLife.title")}
          </h2>
          <p className="nx-parallax-desc nx-fade-up nx-fade-up-delay-2">
            {t("studentLife.subtitle")}
          </p>
        </div>

        <div className="nx-parallax-layout">
          {/* Left Column */}
          <motion.div 
            className="nx-parallax-col nx-parallax-col-left"
            style={{ y: isMobile ? 0 : leftY }}
          >
            {leftColumn.map(activity => (
              <ParallaxCard key={activity.id} activity={activity} />
            ))}
          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="nx-parallax-col nx-parallax-col-right"
            style={{ y: isMobile ? 0 : rightY }}
          >
            {rightColumn.map(activity => (
              <ParallaxCard key={activity.id} activity={activity} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

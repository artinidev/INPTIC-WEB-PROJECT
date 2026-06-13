"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useScrollFadeUp } from "../hooks/useScrollFadeUp";
import { useTranslation } from "../i18n/LanguageContext";

export const FAQSection: React.FC = () => {
  const ref = useScrollFadeUp();
  const [openId, setOpenId] = useState<string | null>(null);
  const { t } = useTranslation();

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="nx-section nx-section-alt" id="faq" ref={ref}>
      <div className="nx-container">
        <div style={{ textAlign: "center", marginBottom: "4rem", maxWidth: "600px", marginInline: "auto" }}>
          <span className="nx-section-label nx-fade-up">{t("faq.label")}</span>
          <h2 className="nx-section-title nx-fade-up nx-fade-up-delay-1" style={{ marginBottom: "1rem" }}>
            {t("faq.title")}
          </h2>
          <p className="nx-section-sub nx-fade-up nx-fade-up-delay-2" style={{ margin: "0 auto" }}>
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="nx-fade-up nx-fade-up-delay-3" style={{ maxWidth: "800px", margin: "0 auto" }}>
          {(t("faq.items") as {question: string, answer: string}[]).map((faq, index) => {
            const id = `faq-${index}`;
            const isOpen = openId === id;
            
            return (
              <motion.div 
                key={id} 
                onClick={() => toggleFaq(id)}
                initial={false}
                animate={{
                  boxShadow: isOpen ? "0 20px 40px rgba(0,0,0,0.08)" : "0 4px 12px rgba(0,0,0,0.02)",
                  borderColor: isOpen ? "var(--color-primary)" : "var(--color-border)",
                }}
                whileHover={{
                  y: isOpen ? 0 : -4,
                  boxShadow: isOpen ? "0 20px 40px rgba(0,0,0,0.08)" : "0 20px 32px rgba(0,0,0,0.06)",
                  borderColor: isOpen ? "var(--color-primary)" : "var(--color-primary)"
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  background: "var(--color-bg-card)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.5rem 2rem",
                  marginBottom: "1rem",
                  cursor: "pointer"
                }}
              >
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    textAlign: "left",
                    color: isOpen ? "var(--color-primary)" : "var(--color-text)",
                    transition: "color var(--transition-fast)",
                    pointerEvents: "none"
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{ fontSize: "1.125rem", fontWeight: 600, paddingRight: "1rem" }}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ flexShrink: 0, color: isOpen ? "var(--color-primary)" : "var(--color-text-muted)", background: isOpen ? "var(--color-primary-dim)" : "transparent", padding: "0.5rem", borderRadius: "50%" }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ paddingTop: "1.5rem", color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: 1.6 }}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

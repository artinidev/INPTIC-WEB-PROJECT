"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import enData from "../locales/en.json";

type Language = "en" | "fr" | "ar";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
  isLoading: false,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [dictionary, setDictionary] = useState<any>(enData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check local storage for saved language
    const saved = localStorage.getItem("app_lang") as Language;
    if (saved && ["en", "fr", "ar"].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const setLanguage = async (lang: Language) => {
    setIsLoading(true);
    try {
      let data;
      if (lang === "en") {
        data = (await import("../locales/en.json")).default;
      } else if (lang === "fr") {
        data = (await import("../locales/fr.json")).default;
      } else if (lang === "ar") {
        data = (await import("../locales/ar.json")).default;
      }
      
      setDictionary(data);
      setLanguageState(lang);
      localStorage.setItem("app_lang", lang);
      
      // Handle RTL
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
        document.documentElement.setAttribute("lang", lang);
      }
    } catch (error) {
      console.error("Failed to load language file", error);
    } finally {
      setIsLoading(false);
    }
  };

  const t = (keyString: string) => {
    const keys = keyString.split(".");
    let current = dictionary;
    for (const key of keys) {
      if (current[key] === undefined) {
        return keyString;
      }
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);

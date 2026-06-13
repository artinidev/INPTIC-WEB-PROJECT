"use client";
import { useEffect, useRef } from "react";

export const useScrollFadeUp = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(".nx-fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = (entry.target as HTMLElement).querySelectorAll(".nx-fade-up");
            targets.forEach((t, i) => setTimeout(() => t.classList.add("visible"), i * 100));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
};

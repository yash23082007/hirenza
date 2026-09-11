"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useOncePerView";

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollTop / scrollHeight)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left pointer-events-none transition-transform duration-75 ease-out"
      style={{
        transform: `scaleX(${scrollProgress})`,
        background: "linear-gradient(90deg, #A97CF8 0%, #F38CB8 50%, #FDCC92 100%)",
      }}
    />
  );
}

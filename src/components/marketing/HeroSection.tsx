"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { TOTAL_ALL_PROBLEMS, TOTAL_COMPANIES, TOTAL_PATTERNS } from "@/data/stats";

const techIcons = [
  { name: "Java", color: "#f89820" },
  { name: "Python", color: "#3776ab" },
  { name: "React", color: "#61dafb" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "C++", color: "#00599c" },
  { name: "Git", color: "#f05032" },
  { name: "K8s", color: "#326ce5" },
  { name: "Docker", color: "#2496ed" },
  { name: "AWS", color: "#ff9900" },
  { name: "Go", color: "#00add8" },
  { name: "Node", color: "#339933" },
  { name: "Rust", color: "#ce412b" },
];

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    let frameId = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updatePosition = () => {
      if (!heroRef.current) return;
      const scrolled = window.scrollY;
      
      // Hero exit on scrolling: upward motion instead of downward (parallax reversed)
      // Orbit fades and scales down
      heroRef.current.style.setProperty("--hero-opacity", reduceMotion ? "1" : String(Math.max(0, 1 - scrolled / 400)));
      heroRef.current.style.setProperty("--hero-offset", reduceMotion ? "0px" : `${-scrolled * 0.15}px`);
      heroRef.current.style.setProperty("--orbit-opacity", reduceMotion ? "1" : String(Math.max(0, 1 - scrolled / 300)));
      heroRef.current.style.setProperty("--orbit-scale", reduceMotion ? "1" : String(Math.max(0.8, 1 - scrolled / 1000)));
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        frameId = window.requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    updatePosition();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Orbital Rings - Fade/Scale on Scroll */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ 
          opacity: "var(--orbit-opacity, 1)", 
          transform: "scale(var(--orbit-scale, 1))",
          willChange: "opacity, transform",
          animation: "fadeIn 1.5s ease-out 0.8s backwards" 
        }}
      >
        <div className="relative w-[1200px] h-[1200px] md:w-[1600px] md:h-[1600px]">
          {/* Orbital circles */}
          {[300, 450, 600, 750].map((radius, i) => (
            <div
              key={i}
              className="orbital-ring absolute top-1/2 left-1/2"
              style={{
                width: radius * 2,
                height: radius * 2,
                marginLeft: -radius,
                marginTop: -radius,
                opacity: 0.2 + (0.1 * i),
                animation: `spin ${60 + i * 20}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
              }}
            />
          ))}

          {/* Floating tech icons */}
          {techIcons.map((icon, i) => {
            const angle = (i / techIcons.length) * 360 + (i * 15); // Irregular positions
            const radius = 280 + (i % 4) * 140;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            return (
              <div
                key={icon.name}
                className="absolute flex items-center justify-center"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                  animation: `orbitPath ${100 + i * 15}s linear infinite, floatIcon ${5 + (i % 4)}s ease-in-out infinite`,
                  animationDelay: `-${i * 5}s, -${i * 2}s`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[11px] font-bold opacity-30 hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: `${icon.color}15`, color: icon.color, border: `1px solid ${icon.color}30` }}
                >
                  {icon.name.substring(0, 4)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ambient Violet/Fuchsia/Indigo Glow Orb */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, rgba(108, 71, 255, 0.14) 0%, rgba(187, 30, 245, 0.07) 45%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Hero Content - Staggered Entrance */}
      <div
        ref={heroRef}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center"
        style={{ 
          opacity: "var(--hero-opacity, 1)", 
          transform: "translate3d(0, var(--hero-offset, 0px), 0)", 
          willChange: "opacity, transform" 
        }}
      >
        {/* Eyebrow Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface-2/60 backdrop-blur-sm mb-8 text-xs md:text-sm font-medium text-secondary flex-wrap justify-center"
          style={{ animation: "slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s backwards" }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{TOTAL_ALL_PROBLEMS}+ catalog questions</span>
          <span className="text-muted">•</span>
          <span>{TOTAL_COMPANIES} company archives</span>
          <span className="text-muted">•</span>
          <span>{TOTAL_PATTERNS} patterns</span>
          <span className="text-muted">•</span>
          <span className="text-purple-1 font-semibold">100% offline-ready</span>
        </div>

        {/* Main Heading */}
        <h1 
          className="text-5xl md:text-7xl lg:text-[84px] font-extrabold leading-[0.95] tracking-tight mb-6"
          style={{ animation: "slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards" }}
        >
          Prep like it&apos;s{" "}
          <span className="text-brand-gradient">production.</span>
        </h1>

        {/* Description */}
        <p 
          className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed text-balance"
          style={{ animation: "slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s backwards" }}
        >
          Sheets, patterns, SQL, system design, and your own progress engine — free, offline-first, no account required.
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center gap-4"
          style={{ animation: "slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards" }}
        >
          <Link
            href="/preparation"
            className="cta-button inline-flex items-center gap-3 px-8 py-4 text-base font-semibold"
          >
            Open the cockpit
            <ArrowRight size={18} />
          </Link>
          <a
            href="#features"
            className="cta-dark inline-flex items-center gap-2 px-6 py-4 text-sm font-semibold"
          >
            Take the 60-sec tour
          </a>
        </div>
      </div>

      {/* Inline styles for animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
        @keyframes orbitPath {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(15px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(15px) rotate(-360deg); }
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .orbital-ring,
          [style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

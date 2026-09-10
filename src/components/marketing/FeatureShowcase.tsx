"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

export function RevealSection({ 
  children, 
  className = "", 
  delay = 0,
  id
}: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      id={id}
      ref={ref}
      className={`reveal-section ${visible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function FeatureShowcase({
  label,
  title,
  description,
  children,
  reverse = false,
}: {
  label: string;
  title: string;
  description: string;
  children: ReactNode;
  reverse?: boolean;
}) {
  return (
    <RevealSection className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${reverse ? "md:direction-rtl" : ""}`}>
          {/* Text Side */}
          <div className={reverse ? "md:order-2" : ""}>
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-1 mb-3 block">{label}</span>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold leading-tight mb-5 tracking-tight">
              {title}
            </h2>
            <p className="text-secondary text-base md:text-lg leading-relaxed">{description}</p>
          </div>

          {/* Visual Side */}
          <div className={reverse ? "md:order-1" : ""}>
            {children}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

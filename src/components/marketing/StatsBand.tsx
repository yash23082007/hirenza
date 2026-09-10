"use client";

import { useEffect, useState, useRef } from "react";
import { 
  TOTAL_ALL_PROBLEMS, 
  TOTAL_COMPANIES, 
  TOTAL_PATTERNS, 
  TOTAL_DSA_SHEETS, 
  TOTAL_SQL_QUESTIONS 
} from "@/data/stats";
import { Database, Target, Building2, BookOpen, ShieldCheck, Sparkles } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function Counter({ end, suffix = "", duration = 1200 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeProgress * end));
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function StatsBand() {
  const stats = [
    {
      label: "Practice Problems",
      value: <Counter end={TOTAL_ALL_PROBLEMS} suffix="+" />,
      icon: <Target size={18} className="text-purple-400" />,
      sub: "LeetCode, GFG & SQL",
    },
    {
      label: "Target Companies",
      value: <Counter end={TOTAL_COMPANIES} />,
      icon: <Building2 size={18} className="text-cyan-400" />,
      sub: "FAANG & Top Tech",
    },
    {
      label: "Algorithmic Patterns",
      value: <Counter end={TOTAL_PATTERNS} />,
      icon: <Sparkles size={18} className="text-amber-400" />,
      sub: "Archetypes & Intuition",
    },
    {
      label: "Curated Sheets",
      value: <Counter end={TOTAL_DSA_SHEETS} />,
      icon: <BookOpen size={18} className="text-emerald-400" />,
      sub: "Striver, NeetCode & Babbar",
    },
    {
      label: "Production SQL",
      value: <Counter end={TOTAL_SQL_QUESTIONS} suffix="+" />,
      icon: <Database size={18} className="text-pink-400" />,
      sub: "CTEs, Joins & Windows",
    },
    {
      label: "Browser Storage",
      value: <span>100%</span>,
      icon: <ShieldCheck size={18} className="text-violet-400" />,
      sub: "Zero telemetry or logins",
    },
  ];

  return (
    <section className="py-12 border-y border-border bg-surface-1/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-surface-2/60 border border-border hover:border-purple-500/20 transition-all group"
            >
              <div className="p-2.5 rounded-xl bg-surface-3 border border-border group-hover:border-purple-500/30 transition-colors mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-primary font-mono mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-primary mb-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-muted">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

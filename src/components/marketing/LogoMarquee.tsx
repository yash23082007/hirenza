"use client";

import {
  Code2,
  Database,
  Cpu,
  Layers,
  Terminal,
  Server,
  Workflow,
  Globe,
  Binary,
  ShieldCheck,
} from "lucide-react";

interface MarqueeItem {
  name: string;
  type: "company" | "tech";
  icon: React.ReactNode;
  label?: string;
}

const items: MarqueeItem[] = [
  { name: "Google", type: "company", icon: <Binary className="w-4 h-4 text-blue-400" />, label: "Target Patterns" },
  { name: "React & Next.js", type: "tech", icon: <Globe className="w-4 h-4 text-cyan-400" /> },
  { name: "Amazon", type: "company", icon: <Workflow className="w-4 h-4 text-amber-400" />, label: "Target Patterns" },
  { name: "Distributed Systems", type: "tech", icon: <Server className="w-4 h-4 text-purple-400" /> },
  { name: "Microsoft", type: "company", icon: <Layers className="w-4 h-4 text-sky-400" />, label: "Target Patterns" },
  { name: "PostgreSQL & SQL", type: "tech", icon: <Database className="w-4 h-4 text-indigo-400" /> },
  { name: "Meta", type: "company", icon: <Code2 className="w-4 h-4 text-blue-500" />, label: "Target Patterns" },
  { name: "Docker & Kubernetes", type: "tech", icon: <Cpu className="w-4 h-4 text-emerald-400" /> },
  { name: "Apple", type: "company", icon: <ShieldCheck className="w-4 h-4 text-slate-300" />, label: "Target Patterns" },
  { name: "TypeScript & Node", type: "tech", icon: <Terminal className="w-4 h-4 text-yellow-400" /> },
  { name: "Flipkart", type: "company", icon: <Workflow className="w-4 h-4 text-orange-400" />, label: "Target Patterns" },
];

export function LogoMarquee() {
  return (
    <section className="relative w-full border-y border-border-soft/60 bg-surface-1/40 py-3.5 overflow-hidden backdrop-blur-xs select-none">
      {/* Edge gradient masks for seamless fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex items-center">
        <div className="hidden lg:flex items-center gap-2 pl-6 pr-4 shrink-0 text-xs uppercase tracking-wider font-semibold text-muted border-r border-border-soft mr-4">
          <span className="w-2 h-2 rounded-full bg-purple-1 animate-pulse" />
          <span>Practice Tracks</span>
        </div>

        <div className="flex overflow-hidden">
          <div className="animate-marquee flex items-center gap-3 sm:gap-5">
            {/* First track */}
            {items.map((item, idx) => (
              <div
                key={`t1-${idx}`}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  item.type === "company"
                    ? "bg-surface-2 border-border text-primary hover:border-purple-1/40"
                    : "bg-surface-1 border-border-soft text-secondary hover:text-primary"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
                {item.label && (
                  <span className="text-[10px] text-muted uppercase tracking-tight bg-surface-3 px-1.5 py-0.5 rounded">
                    {item.label}
                  </span>
                )}
              </div>
            ))}

            {/* Duplicate track for seamless infinite loop */}
            {items.map((item, idx) => (
              <div
                key={`t2-${idx}`}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  item.type === "company"
                    ? "bg-surface-2 border-border text-primary hover:border-purple-1/40"
                    : "bg-surface-1 border-border-soft text-secondary hover:text-primary"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
                {item.label && (
                  <span className="text-[10px] text-muted uppercase tracking-tight bg-surface-3 px-1.5 py-0.5 rounded">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Search, Command, CheckCircle2, ArrowRight, CornerDownLeft, Sparkles } from "lucide-react";

interface DemoScenario {
  query: string;
  category: string;
  resultTitle: string;
  resultMeta: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    query: "two pointers",
    category: "Algorithmic Pattern",
    resultTitle: "Two Pointers · 8 Problems",
    resultMeta: "Trap Rain Water, 3Sum, Container With Most Water",
    difficulty: "Medium",
  },
  {
    query: "google",
    category: "Company Track",
    resultTitle: "Google DSA Readiness Track",
    resultMeta: "Top 25 high-frequency onsite interview problems",
    difficulty: "Hard",
  },
  {
    query: "lru cache",
    category: "Problem Search",
    resultTitle: "LRU Cache (Design)",
    resultMeta: "Doubly Linked List + Hash Map implementation",
    difficulty: "Medium",
  },
  {
    query: "window functions",
    category: "SQL Sheet",
    resultTitle: "SQL: DENSE_RANK & ROW_NUMBER",
    resultMeta: "Department Top Three Salaries & Running Totals",
    difficulty: "Medium",
  },
];

export function PaletteDemo() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayedText(DEMO_SCENARIOS[0].query);
      return;
    }

    const currentScenario = DEMO_SCENARIOS[scenarioIndex];
    let charIndex = 0;
    setIsTyping(true);
    setDisplayedText("");

    const typeInterval = setInterval(() => {
      if (charIndex <= currentScenario.query.length) {
        setDisplayedText(currentScenario.query.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);

        // Pause before next scenario
        const pauseTimeout = setTimeout(() => {
          setScenarioIndex((prev) => (prev + 1) % DEMO_SCENARIOS.length);
        }, 2600);

        return () => clearTimeout(pauseTimeout);
      }
    }, 110);

    return () => clearInterval(typeInterval);
  }, [scenarioIndex]);

  const active = DEMO_SCENARIOS[scenarioIndex];

  const handleOpenRealPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 my-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-1/10 border border-purple-1/30 text-purple-1 text-xs font-mono mb-3">
          <Command size={13} />
          <span>Instant Navigation</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-3">
          Everything accessible in two keystrokes
        </h2>
        <p className="text-sm md:text-base text-secondary max-w-xl mx-auto">
          Jump to any of 600+ problems, 124 patterns, or company tracks from anywhere in the app with zero page loads.
        </p>
      </div>

      {/* Simulated Command Palette Mockup */}
      <div className="relative rounded-2xl border border-border bg-surface-1 shadow-2xl overflow-hidden max-w-2xl mx-auto">
        <div className="p-4 border-b border-border flex items-center gap-3 bg-surface-2/70">
          <Search size={18} className="text-muted flex-shrink-0" />
          <div className="flex-1 font-mono text-sm text-primary flex items-center">
            <span>{displayedText}</span>
            {isTyping && (
              <span className="w-1.5 h-4 bg-purple-1 ml-0.5 animate-pulse inline-block" />
            )}
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-3 text-muted border border-border">
            ESC to close
          </span>
        </div>

        {/* Results Body */}
        <div className="p-3 space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-muted px-3 pt-1">
            Matching Result · {active.category}
          </div>

          <div className="p-3.5 rounded-xl bg-purple-1/10 border border-purple-1/30 flex items-center justify-between gap-4 transition-all">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-purple-1/20 border border-purple-1/40 flex items-center justify-center text-purple-1 flex-shrink-0">
                <Sparkles size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-primary truncate flex items-center gap-2">
                  <span>{active.resultTitle}</span>
                  <span
                    className={`text-[10px] px-2 py-0.2 rounded font-mono ${
                      active.difficulty === "Easy"
                        ? "text-emerald-400 bg-emerald-500/10"
                        : active.difficulty === "Medium"
                        ? "text-amber-400 bg-amber-500/10"
                        : "text-rose-400 bg-rose-500/10"
                    }`}
                  >
                    {active.difficulty}
                  </span>
                </div>
                <p className="text-xs text-secondary truncate">{active.resultMeta}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-mono text-purple-1 flex-shrink-0">
              <span>Jump</span>
              <CornerDownLeft size={12} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-surface-2/40 border border-border/50 flex items-center justify-between opacity-60 text-xs">
            <span className="text-secondary">Explore all algorithmic patterns</span>
            <span className="font-mono text-muted">/preparation/20-patterns</span>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="px-4 py-3 bg-surface-2 border-t border-border flex items-center justify-between gap-4 flex-wrap">
          <span className="text-xs text-secondary font-mono">
            Navigation powered by Fuse.js offline index
          </span>
          <button
            onClick={handleOpenRealPalette}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-primary text-background font-semibold text-xs hover:opacity-90 transition-opacity"
          >
            <span>Try ⌘K live now</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}

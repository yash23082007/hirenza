import type { Metadata } from "next";
import Link from "next/link";
import { MarketingNavbar } from "@/components/navigation/MarketingNavbar";
import { Footer } from "@/components/marketing/Footer";
import { CheckCircle2, Clock, Compass, ArrowUpRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Roadmap — Engineering Plan & Future Milestones",
  description: "Explore what we have shipped and what is coming next in Hirenza: Daily challenges, round simulators, and PWA capabilities.",
};

interface RoadmapItem {
  title: string;
  description: string;
  quarter: string;
  tag: string;
}

const SHIPPED: RoadmapItem[] = [
  {
    title: "4-State Problem Lifecycle Engine",
    description: "Todo, In-Progress, Solved, and Mastered state machine persisted directly to browser localStorage.",
    quarter: "Q3 2026",
    tag: "Core Engine",
  },
  {
    title: "Leitner Spaced Repetition Intervals",
    description: "Automated due-date calculation based on problem difficulty and decay curve.",
    quarter: "Q3 2026",
    tag: "Retention",
  },
  {
    title: "Global ⌘K Command Palette",
    description: "Zero-latency client-side fuzzy search across all 600+ problems and 124 patterns with Fuse.js.",
    quarter: "Q3 2026",
    tag: "Productivity",
  },
  {
    title: "Target Company Readiness Algorithm",
    description: "Deterministic weighted formula evaluating candidate coverage of high-frequency interview archives.",
    quarter: "Q3 2026",
    tag: "Analytics",
  },
];

const IN_PROGRESS: RoadmapItem[] = [
  {
    title: "Daily Coding Challenge (Wordle Mechanic)",
    description: "Deterministic daily problem seed for all users worldwide with streak freezing and history ribbons.",
    quarter: "Q3 2026",
    tag: "Gamification",
  },
  {
    title: "Technical & HR Flashcards Mode",
    description: "Flip card Leitner box grading (Again / Hard / Easy) with keyboard shortcuts (Space / 1 / 2 / 3).",
    quarter: "Q3 2026",
    tag: "Practice",
  },
  {
    title: "Focus Mode & Pomodoro Sheet Timer",
    description: "25/50 minute distraction-free timer sessions logging solve velocity to local activity heatmaps.",
    quarter: "Q3 2026",
    tag: "Deep Work",
  },
  {
    title: "Sharable Candidate Prep Card",
    description: "Export high-resolution 1200×630 scorecard PNGs directly from client canvas with readiness breakdown.",
    quarter: "Q3 2026",
    tag: "Social Proof",
  },
];

const PLANNED: RoadmapItem[] = [
  {
    title: "30 / 60 / 90-Day Plan Generator",
    description: "Algorithmic curriculum generator tailored to target company, target role, available hours, and interview deadline.",
    quarter: "Q4 2026",
    tag: "Curriculum",
  },
  {
    title: "Company Round Timed Simulator",
    description: "Simulate multi-round interviews matching real company formats with countdown constraints.",
    quarter: "Q4 2026",
    tag: "Mock Exam",
  },
  {
    title: "Weakest-Pattern Algorithmic Radar",
    description: "Detect low-mastery sub-topics (e.g., DP or Graph cycles) compared against overall user average.",
    quarter: "Q4 2026",
    tag: "Insights",
  },
  {
    title: "PWA Offline Service Worker",
    description: "Full offline asset caching and service worker installability for studying on campus or transit with zero Wi-Fi.",
    quarter: "Q4 2026",
    tag: "Offline",
  },
];

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-background">
      <MarketingNavbar />

      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-1/10 border border-purple-1/30 text-purple-1 text-xs font-mono mb-4">
            <Compass size={12} />
            <span>Public Product Roadmap</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-primary">
            What We&apos;re Building
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Hirenza is built transparently in the open. Here is our strategic roadmap for transforming technical interview preparation into a unified, privacy-first platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Shipped */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <h2 className="text-lg font-bold text-primary">Shipped</h2>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live
              </span>
            </div>
            <div className="space-y-4">
              {SHIPPED.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-xl p-5 bg-surface-1/50 hover:border-border-hover transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-purple-1 uppercase tracking-wider">{item.tag}</span>
                    <span className="text-xs text-muted font-mono">{item.quarter}</span>
                  </div>
                  <h3 className="text-base font-bold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs text-secondary leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-amber-400" />
                <h2 className="text-lg font-bold text-primary">In Progress</h2>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Active Sprint
              </span>
            </div>
            <div className="space-y-4">
              {IN_PROGRESS.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-xl p-5 bg-surface-1/50 hover:border-amber-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">{item.tag}</span>
                    <span className="text-xs text-muted font-mono">{item.quarter}</span>
                  </div>
                  <h3 className="text-base font-bold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs text-secondary leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Planned */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-purple-1" />
                <h2 className="text-lg font-bold text-primary">Next Milestones</h2>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-1/10 text-purple-1 border border-purple-1/20">
                Late 2026
              </span>
            </div>
            <div className="space-y-4">
              {PLANNED.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-xl p-5 bg-surface-1/50 hover:border-purple-1/30 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">{item.tag}</span>
                    <span className="text-xs text-muted font-mono">{item.quarter}</span>
                  </div>
                  <h3 className="text-base font-bold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs text-secondary leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center border-t border-border pt-12">
          <h3 className="text-xl font-bold text-primary mb-2">Suggest a feature or report a gap</h3>
          <p className="text-sm text-secondary mb-6">
            Our backlog is driven by candid engineering feedback on GitHub Issues.
          </p>
          <Link
            href="https://github.com/yash23082007/hirenza/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-1 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <span>Open a GitHub Issue</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

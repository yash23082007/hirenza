"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { detectWeakestPattern } from "@/lib/insights";
import { AlertCircle, Target, ArrowRight, ExternalLink, Sparkles, Lock } from "lucide-react";

export function WeakestPatternWidget() {
  const { topicMastery, data } = useProgress();

  const totalSolved = Object.values(data.statuses).filter(
    (s) => s === "solved" || s === "mastered"
  ).length;

  const report = detectWeakestPattern(topicMastery, totalSolved);

  if (!report.unlocked) {
    const progress = Math.min(100, Math.round((report.solvedCount / report.requiredCount) * 100));

    return (
      <div className="card p-6 border border-border bg-surface-2/60 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-muted" />
            <h3 className="text-sm font-bold text-primary">Algorithmic Weakness Radar</h3>
          </div>
          <span className="text-xs font-mono text-muted">
            {report.solvedCount} / {report.requiredCount} Solved
          </span>
        </div>

        <p className="text-xs text-secondary leading-relaxed">
          Solve at least {report.requiredCount} problems to unlock algorithmic weakness detection and targeted pattern recommendations.
        </p>

        <div className="w-full bg-surface-3 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-purple-1 h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  if (!report.weakestPattern) return null;

  const { name, slug, userPercent, meanPercent, gap, recommendedProblems } = report.weakestPattern;

  return (
    <div className="card p-6 border border-border bg-surface-2/80 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <AlertCircle size={15} />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-amber-400 block leading-none">
              Focus Recommendation
            </span>
            <h3 className="text-sm font-bold text-primary mt-0.5">{name}</h3>
          </div>
        </div>

        <Link
          href={`/preparation/20-patterns/${slug}`}
          className="text-xs font-mono text-purple-1 hover:underline inline-flex items-center gap-1"
        >
          <span>Deep-Dive</span>
          <ArrowRight size={12} />
        </Link>
      </div>

      <div className="p-3 rounded-xl bg-surface-3/60 border border-border flex items-center justify-between text-xs font-mono">
        <div>
          <span className="text-muted block text-[10px] uppercase">Current Mastery</span>
          <span className="font-bold text-primary">{userPercent}%</span>
        </div>
        <div className="text-center">
          <span className="text-muted block text-[10px] uppercase">Your Mean</span>
          <span className="font-bold text-secondary">{meanPercent}%</span>
        </div>
        <div className="text-right">
          <span className="text-muted block text-[10px] uppercase">Mastery Gap</span>
          <span className="font-bold text-amber-400">-{gap}%</span>
        </div>
      </div>

      <div>
        <span className="text-[11px] font-mono text-muted uppercase tracking-wider block mb-2">
          Recommended Problems to Close Gap:
        </span>
        <div className="space-y-2">
          {recommendedProblems.map((prob, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-surface-3 border border-border flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                    prob.difficulty === "Easy"
                      ? "text-emerald-400 bg-emerald-500/10"
                      : prob.difficulty === "Medium"
                      ? "text-amber-400 bg-amber-500/10"
                      : "text-rose-400 bg-rose-500/10"
                  }`}
                >
                  {prob.difficulty}
                </span>
                <span className="truncate text-secondary font-medium">{prob.title}</span>
              </div>

              {prob.url && (
                <Link
                  href={prob.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-primary transition-colors ml-2 flex-shrink-0"
                  aria-label={`Solve ${prob.title}`}
                >
                  <ExternalLink size={12} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

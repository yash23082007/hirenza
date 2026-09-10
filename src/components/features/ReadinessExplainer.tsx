"use client";

import { useState } from "react";
import { Info, X, Calculator } from "lucide-react";

interface ReadinessWeights {
  companySolved: number;
  companyTotal: number;
  patternsSolved: number;
  patternsTotal: number;
  coreSolved: number;
  coreTotal: number;
  systemSolved: number;
  systemTotal: number;
  companyName: string;
}

export function ReadinessExplainer({
  companySolved,
  companyTotal,
  patternsSolved,
  patternsTotal,
  coreSolved,
  coreTotal,
  systemSolved,
  systemTotal,
  companyName,
}: ReadinessWeights) {
  const [isOpen, setIsOpen] = useState(false);

  // Component ratios
  const compRatio = companyTotal > 0 ? companySolved / companyTotal : 0;
  const patRatio = patternsTotal > 0 ? patternsSolved / patternsTotal : 0;
  const coreRatio = coreTotal > 0 ? coreSolved / coreTotal : 0;
  const sysRatio = systemTotal > 0 ? systemSolved / systemTotal : 0;

  // Contributions
  const compContrib = Math.round(0.45 * compRatio * 100);
  const patContrib = Math.round(0.25 * patRatio * 100);
  const coreContrib = Math.round(0.15 * coreRatio * 100);
  const sysContrib = Math.round(0.15 * sysRatio * 100);

  const totalScore = Math.min(100, compContrib + patContrib + coreContrib + sysContrib);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-purple-1 hover:text-purple-300 inline-flex items-center gap-1 font-mono transition-colors"
        aria-label="View readiness formula"
      >
        <Info size={13} />
        <span className="underline underline-offset-2">Formula</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-surface-1 p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-1/10 flex items-center justify-center text-purple-1">
                  <Calculator size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">Readiness Algorithm</h3>
                  <p className="text-xs text-muted font-mono">Transparent scoring · Zero black boxes</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface-3 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Total Score Banner */}
            <div className="p-4 rounded-2xl bg-surface-2 border border-border flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-muted uppercase block">Calculated Total</span>
                <span className="text-3xl font-mono font-extrabold text-primary">{totalScore}%</span>
              </div>
              <div className="text-right text-xs font-mono text-secondary">
                <span>Sum of weighted modules</span>
                <div className="text-emerald-400 font-bold mt-0.5">Target: {companyName}</div>
              </div>
            </div>

            {/* Formula Breakdown Items */}
            <div className="space-y-4">
              {/* 1. Company High-Frequency */}
              <div className="p-3.5 rounded-xl border border-border bg-surface-2/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary">
                    1. {companyName} High-Frequency DSA (45% Weight)
                  </span>
                  <span className="font-mono font-bold text-purple-1">+{compContrib}% pts</span>
                </div>
                <div className="w-full bg-surface-3 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-1 h-full rounded-full transition-all"
                    style={{ width: `${Math.round(compRatio * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-muted">
                  <span>{companySolved} of {companyTotal} company problems solved</span>
                  <span>{Math.round(compRatio * 100)}% mastery</span>
                </div>
              </div>

              {/* 2. Algorithmic Patterns */}
              <div className="p-3.5 rounded-xl border border-border bg-surface-2/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary">
                    2. Core Algorithmic Patterns (25% Weight)
                  </span>
                  <span className="font-mono font-bold text-cyan-400">+{patContrib}% pts</span>
                </div>
                <div className="w-full bg-surface-3 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all"
                    style={{ width: `${Math.round(patRatio * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-muted">
                  <span>{patternsSolved} of {patternsTotal} pattern problems solved</span>
                  <span>{Math.round(patRatio * 100)}% mastery</span>
                </div>
              </div>

              {/* 3. Core CS Fundamentals */}
              <div className="p-3.5 rounded-xl border border-border bg-surface-2/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary">
                    3. Core CS: OS, DBMS, Networks (15% Weight)
                  </span>
                  <span className="font-mono font-bold text-emerald-400">+{coreContrib}% pts</span>
                </div>
                <div className="w-full bg-surface-3 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all"
                    style={{ width: `${Math.round(coreRatio * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-muted">
                  <span>{coreSolved} of {coreTotal} questions reviewed</span>
                  <span>{Math.round(coreRatio * 100)}% mastery</span>
                </div>
              </div>

              {/* 4. System Design & SQL */}
              <div className="p-3.5 rounded-xl border border-border bg-surface-2/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary">
                    4. System Design & SQL Queries (15% Weight)
                  </span>
                  <span className="font-mono font-bold text-amber-400">+{sysContrib}% pts</span>
                </div>
                <div className="w-full bg-surface-3 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all"
                    style={{ width: `${Math.round(sysRatio * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-muted">
                  <span>{systemSolved} of {systemTotal} topics completed</span>
                  <span>{Math.round(sysRatio * 100)}% mastery</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 rounded-xl bg-purple-1 text-white font-semibold text-xs hover:opacity-90 transition-opacity"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState, useMemo } from "react";
import { dsaPatterns } from "@/data";
import { ExternalLink, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { SearchBar } from "@/components/ui/primitives/SearchBar";
import { SectionHeading } from "@/components/ui/primitives/SectionHeading";

export function PatternsClient({ patternId }: { patternId?: string }) {
  const [search, setSearch] = useState("");
  const [expandedPattern, setExpandedPattern] = useState<string | null>(patternId || null);
  const { isCompleted, toggleComplete } = useProgress();

  const filteredPatterns = useMemo(() => {
    return dsaPatterns.filter(
      p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.problems.some(prob => prob.title.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search]);

  // Overall Stats
  const totalProblemsCount = useMemo(() => {
    return dsaPatterns.reduce((sum, p) => sum + p.problems.length, 0);
  }, []);

  const totalSolvedCount = useMemo(() => {
    return dsaPatterns.reduce(
      (total, pattern) =>
        total +
        pattern.problems.filter((_, index) => isCompleted(`pat-${pattern.id}-${index}`)).length,
      0
    );
  }, [isCompleted]);

  const masteryPercent =
    totalProblemsCount > 0 ? Math.round((totalSolvedCount / totalProblemsCount) * 100) : 0;

  const [openAll, setOpenAll] = useState(false);

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Algorithmic Archetypes"
        title="20 Essential DSA Patterns"
        subtitle="Master the fundamental problem patterns that unlock hundreds of coding interview questions across top tech companies."
        badge={`${totalProblemsCount} Problems`}
      />

      {/* Progress & Search Banner (Hynts Parity §47) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5 bg-gradient-to-br from-surface-1 to-surface-2 border border-purple-500/20 rounded-2xl md:col-span-1 flex items-center gap-5">
          <ProgressRing
            completed={totalSolvedCount}
            total={totalProblemsCount}
            size={80}
            strokeWidth={6}
          />
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400 block">
              Mastery Index
            </span>
            <div className="text-xl font-extrabold text-primary">{masteryPercent}%</div>
            <p className="text-xs text-muted mt-0.5">
              {totalSolvedCount} of {totalProblemsCount} solved
            </p>
          </div>
        </div>

        <div className="card p-5 md:col-span-2 flex items-center bg-surface-1 border border-border rounded-2xl">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search pattern name, description, or specific problem..."
            className="w-full"
          />
        </div>
      </div>

      {/* Accordions Control Bar */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-muted font-medium">
          {filteredPatterns.length} Core Patterns
        </span>
        <button
          type="button"
          onClick={() => setOpenAll(!openAll)}
          className="text-xs text-muted hover:text-primary transition-colors cursor-pointer"
        >
          {openAll ? "Collapse All" : "Expand All"}
        </button>
      </div>

      {/* Patterns Grid */}
      <div className="space-y-4">
        {filteredPatterns.map((pattern, idx) => {
          const isExpanded = openAll || expandedPattern === pattern.id || !!search;
          const solvedInPattern = pattern.problems.filter((_, problemIndex) =>
            isCompleted(`pat-${pattern.id}-${problemIndex}`)
          ).length;
          const patternPercent =
            pattern.problems.length > 0
              ? Math.round((solvedInPattern / pattern.problems.length) * 100)
              : 0;

          return (
            <div
              key={pattern.id}
              className="card overflow-hidden border border-border hover:border-purple-500/30 transition-all rounded-2xl bg-surface-1"
            >
              <div
                role="button"
                tabIndex={0}
                className="p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-surface-2/60 hover:bg-surface-2 transition-colors"
                onClick={() => setExpandedPattern(isExpanded ? null : pattern.id)}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedPattern(isExpanded ? null : pattern.id);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 text-sm font-bold text-purple-300">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-base font-bold text-primary">{pattern.name}</h3>
                      <span className="text-[11px] bg-surface-3 text-muted px-2 py-0.5 rounded-full border border-border-soft">
                        {pattern.problems.length} problems
                      </span>
                    </div>
                    <p className="text-xs text-secondary max-w-2xl leading-relaxed">
                      {pattern.description}
                    </p>
                    {pattern.sourceReference && (
                      <span className="text-[10px] text-muted block mt-1">
                        Source: {pattern.sourceReference}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-bold text-primary">
                      {solvedInPattern} / {pattern.problems.length}
                    </span>
                    <div className="w-20 h-1.5 bg-surface-3 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-purple-1 rounded-full transition-all"
                        style={{ width: `${patternPercent}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-1.5 bg-surface-3 rounded-lg text-muted hover:text-secondary">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-3 border-t border-border-soft bg-surface-1 animate-in fade-in duration-150">
                  <div className="space-y-2 mt-1">
                    {pattern.problems.map((problem, pIdx) => {
                      const progressId = `pat-${pattern.id}-${pIdx}`;
                      const isSolved = isCompleted(progressId);

                      return (
                        <div
                          key={pIdx}
                          id={`problem-pat-${pattern.id}-${pIdx}`}
                          className={`flex items-center justify-between p-3.5 rounded-xl border transition-all scroll-mt-24 target:ring-2 target:ring-purple-1/60 target:bg-purple-900/10 ${
                            isSolved
                              ? "bg-green-950/20 border-green-500/30"
                              : "bg-surface-2 border-border-soft hover:border-border"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <button
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                toggleComplete(progressId, {
                                  module: "patterns",
                                  topic: pattern.name,
                                  difficulty: problem.difficulty,
                                });
                              }}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                                isSolved
                                  ? "bg-purple-1 border-purple-1"
                                  : "border-border hover:border-purple-1/60 bg-surface-3"
                              }`}
                              title={isSolved ? "Mark Incomplete" : "Mark Solved"}
                              aria-label={isSolved ? "Mark incomplete" : "Mark solved"}
                            >
                              {isSolved && (
                                <CheckCircle2 size={13} className="text-white stroke-[2.5]" />
                              )}
                            </button>

                            <span
                              className={`text-sm font-medium truncate ${
                                isSolved ? "text-muted line-through" : "text-primary"
                              }`}
                            >
                              {problem.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                problem.difficulty === "Easy"
                                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                  : problem.difficulty === "Medium"
                                  ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                  : "bg-red-500/10 text-red-400 border border-red-500/20"
                              }`}
                            >
                              {problem.difficulty}
                            </span>

                            {problem.leetcodeUrl && (
                              <a
                                href={problem.leetcodeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted hover:text-purple-300 p-1 transition-colors"
                                title="Solve on LeetCode"
                                aria-label={`Solve ${problem.title} on LeetCode`}
                              >
                                <ExternalLink size={13} />
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

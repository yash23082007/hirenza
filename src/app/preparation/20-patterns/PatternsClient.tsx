"use client";

import { useState, useMemo } from "react";
import { dsaPatterns } from "@/data";
import { ExternalLink, Search, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

export function PatternsClient({ patternId }: { patternId?: string }) {
  const [search, setSearch] = useState("");
  const [expandedPattern, setExpandedPattern] = useState<string | null>(patternId || null);
  const { isCompleted, toggleComplete } = useProgress();

  const filteredPatterns = useMemo(() => {
    return dsaPatterns.filter(p => 
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
      (total, pattern) => total + pattern.problems.filter((_, index) => isCompleted(`pat-${pattern.id}-${index}`)).length,
      0
    );
  }, [isCompleted]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">20 Essential DSA Patterns</h1>
        <p className="text-secondary">Master the algorithmic archetypes that unlock hundreds of coding interview questions across FAANG and top-tier tech.</p>
      </div>

      {/* Progress & Search Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-5 bg-gradient-to-br from-surface-1 to-surface-2 border-purple-500/20 md:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Mastery Index</span>
            <span className="text-xl font-extrabold text-purple-1">
              {totalProblemsCount > 0 ? Math.round((totalSolvedCount / totalProblemsCount) * 100) : 0}%
            </span>
          </div>
          <div className="w-full h-2 bg-surface-3 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all"
              style={{ width: `${totalProblemsCount > 0 ? (totalSolvedCount / totalProblemsCount) * 100 : 0}%` }}
            />
          </div>
          <p className="text-xs text-muted">{totalSolvedCount} / {totalProblemsCount} Pattern Problems Solved</p>
        </div>

        <div className="card p-5 md:col-span-2 flex items-center bg-surface-2">
          <div className="flex items-center gap-3 bg-surface-3 border border-border rounded-xl px-4 py-3 w-full">
            <Search size={16} className="text-muted shrink-0" />
            <input
              type="text"
              placeholder="Search pattern name, description, or specific problem title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent flex-1 text-xs outline-none placeholder:text-muted"
            />
          </div>
        </div>
      </div>

      {/* Patterns Grid */}
      <div className="space-y-4">
        {filteredPatterns.map((pattern, idx) => {
          const isExpanded = expandedPattern === pattern.id || !!search;
          const solvedInPattern = pattern.problems.filter((_, problemIndex) => isCompleted(`pat-${pattern.id}-${problemIndex}`)).length;
          const patternPercent = pattern.problems.length > 0 
            ? Math.round((solvedInPattern / pattern.problems.length) * 100) 
            : 0;

          return (
            <div key={pattern.id} className="card overflow-hidden border-border hover:border-purple-500/30 transition-all">
              <div 
                className="p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                onClick={() => setExpandedPattern(isExpanded ? null : pattern.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 text-sm font-bold text-purple-1">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-base font-bold text-primary">{pattern.name}</h3>
                      <span className="text-[11px] bg-surface-3 text-muted px-2 py-0.5 rounded-full border border-border">
                        {pattern.problems.length} problems
                      </span>
                    </div>
                    <p className="text-xs text-secondary max-w-2xl leading-relaxed">{pattern.description}</p>
                    {pattern.sourceReference && (
                      <span className="text-[10px] text-muted block mt-1">Source: {pattern.sourceReference}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-bold text-primary">{solvedInPattern} / {pattern.problems.length}</span>
                    <div className="w-20 h-1.5 bg-surface-3 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-purple-1 rounded-full" style={{ width: `${patternPercent}%` }} />
                    </div>
                  </div>
                  <div className="p-1.5 bg-surface-3 rounded-lg text-muted hover:text-secondary">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-border bg-surface-2/40">
                  <div className="space-y-2 mt-2">
                    {pattern.problems.map((problem, pIdx) => {
                      const progressId = `pat-${pattern.id}-${pIdx}`;
                      const isSolved = isCompleted(progressId);

                      return (
                        <div
                          key={pIdx}
                          className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                            isSolved ? "bg-green-950/20 border-green-500/30" : "bg-surface-2 border-border-soft hover:border-border"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleComplete(progressId, {
                                  module: "patterns",
                                  topic: pattern.name,
                                  difficulty: problem.difficulty,
                                });
                              }}
                              className={`p-1 rounded-md transition-colors ${
                                isSolved ? "text-emerald-400 bg-emerald-500/10" : "text-muted hover:text-secondary"
                              }`}
                              title={isSolved ? "Solved" : "Mark as Solved"}
                            >
                              <CheckCircle2 size={16} />
                            </button>
                            <span className={`text-xs font-semibold truncate ${isSolved ? "line-through text-emerald-300 opacity-80" : "text-primary"}`}>
                              {problem.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              problem.difficulty === "Easy" ? "bg-green-500/10 text-green-400" :
                              problem.difficulty === "Medium" ? "bg-orange-500/10 text-orange-400" :
                              "bg-red-500/10 text-red-400"
                            }`}>
                              {problem.difficulty}
                            </span>
                            {problem.leetcodeUrl && (
                              <a
                                href={problem.leetcodeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 bg-surface-3 hover:bg-surface-hover rounded-lg text-purple-1 transition-colors"
                                title="Solve on LeetCode"
                              >
                                <ExternalLink size={12} />
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

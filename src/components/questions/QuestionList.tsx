"use client";

import { useState } from "react";
import { Check, Star, ExternalLink, Lightbulb, Clock, Layers } from "lucide-react";
import { Question } from "@/data";
import { useProgress } from "@/hooks/useProgress";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { QuestionRow } from "@/components/ui/primitives/QuestionRow";
import { FilterTabs, type TabItem } from "@/components/ui/primitives/FilterTabs";

interface QuestionListProps {
  questions: Question[];
  title?: string;
  storageKey?: string;
}

export function QuestionList({ questions, storageKey = "default" }: QuestionListProps) {
  const { isCompleted, isBookmarked, toggleComplete, toggleBookmark } = useProgress();
  const [filter, setFilter] = useState<"All" | "Easy" | "Medium" | "Hard" | "Bookmarked">("All");

  const getFullId = (id: number | string) => {
    const strId = String(id);
    if (storageKey === "sql" && !strId.startsWith("sql-")) return `sql-${strId}`;
    if (storageKey === "package-wise" && !strId.startsWith("pkg-")) return `pkg-${strId}`;
    if (storageKey === "core-subjects" && !strId.startsWith("cs-")) return `cs-${strId}`;
    return strId;
  };

  const completedCount = questions.filter(q => isCompleted(getFullId(q.id))).length;
  const bookmarkedCount = questions.filter(q => isBookmarked(getFullId(q.id))).length;

  const filtered = questions.filter(q => {
    const fid = getFullId(q.id);
    if (filter === "All") return true;
    if (filter === "Bookmarked") return isBookmarked(fid);
    return q.difficulty === filter;
  });

  const filterTabs: TabItem<"All" | "Easy" | "Medium" | "Hard" | "Bookmarked">[] = [
    { id: "All", label: "All", count: questions.length },
    { id: "Easy", label: "Easy", count: questions.filter(q => q.difficulty === "Easy").length },
    { id: "Medium", label: "Medium", count: questions.filter(q => q.difficulty === "Medium").length },
    { id: "Hard", label: "Hard", count: questions.filter(q => q.difficulty === "Hard").length },
    { id: "Bookmarked", label: "Bookmarked", count: bookmarkedCount },
  ];

  return (
    <div>
      {/* Overall Progress Ring & Stats Header */}
      <div className="card p-5 sm:p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-surface-1 border border-border rounded-2xl">
        <div className="flex items-center gap-5">
          <ProgressRing completed={completedCount} total={questions.length} size={92} strokeWidth={7} />
          <div>
            <h3 className="text-base font-bold text-primary">Sheet Progress</h3>
            <p className="text-xs text-muted mt-0.5">
              {completedCount} of {questions.length} problems solved
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <Check size={13} /> {completedCount} Done
              </span>
              <span className="text-muted">•</span>
              <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
                <Star size={13} className="fill-amber-400" /> {bookmarkedCount} Starred
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown counters */}
        <div className="grid grid-cols-3 gap-2 w-full sm:w-auto text-center sm:text-left">
          <div className="px-3 py-2 bg-surface-2 rounded-xl border border-border-soft">
            <span className="text-[10px] text-muted uppercase tracking-wider block">Easy</span>
            <span className="text-sm font-bold text-emerald-400">
              {questions.filter(q => q.difficulty === "Easy" && isCompleted(getFullId(q.id))).length}
              <span className="text-xs font-normal text-muted">/{questions.filter(q => q.difficulty === "Easy").length}</span>
            </span>
          </div>
          <div className="px-3 py-2 bg-surface-2 rounded-xl border border-border-soft">
            <span className="text-[10px] text-muted uppercase tracking-wider block">Medium</span>
            <span className="text-sm font-bold text-amber-400">
              {questions.filter(q => q.difficulty === "Medium" && isCompleted(getFullId(q.id))).length}
              <span className="text-xs font-normal text-muted">/{questions.filter(q => q.difficulty === "Medium").length}</span>
            </span>
          </div>
          <div className="px-3 py-2 bg-surface-2 rounded-xl border border-border-soft">
            <span className="text-[10px] text-muted uppercase tracking-wider block">Hard</span>
            <span className="text-sm font-bold text-red-400">
              {questions.filter(q => q.difficulty === "Hard" && isCompleted(getFullId(q.id))).length}
              <span className="text-xs font-normal text-muted">/{questions.filter(q => q.difficulty === "Hard").length}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Difficulty Filter Tabs */}
      <FilterTabs tabs={filterTabs} activeTab={filter} onChange={setFilter} className="mb-4" />

      {/* Table Column Headers */}
      <div className="hidden sm:flex items-center justify-between px-6 py-2.5 bg-surface-2/80 border border-b-0 border-border rounded-t-xl text-[10px] font-bold uppercase tracking-wider text-muted select-none">
        <div className="flex items-center gap-5">
          <span className="w-5 text-center">STATUS</span>
          <span className="w-6 text-center">#</span>
          <span>PROBLEM</span>
        </div>
        <div className="flex items-center gap-8 pr-2">
          <span>REVISION</span>
          <span>LEVEL</span>
          <span className="w-4"></span>
        </div>
      </div>

      {/* Questions list */}
      <div className="border border-border rounded-xl sm:rounded-t-none overflow-hidden divide-y divide-border-soft bg-surface-1">
        {filtered.map((q, idx) => {
          const fid = getFullId(q.id);
          const solved = isCompleted(fid);
          const starred = isBookmarked(fid);

          return (
            <QuestionRow
              key={q.id}
              id={fid}
              index={idx + 1}
              title={q.title}
              subtitle={q.topic}
              difficulty={q.difficulty}
              solved={solved}
              bookmarked={starred}
              onToggleComplete={() =>
                toggleComplete(fid, {
                  module: storageKey,
                  topic: q.topic,
                  difficulty: q.difficulty,
                })
              }
              onToggleBookmark={() => toggleBookmark(fid)}
              expandableContent={
                <div className="space-y-3">
                  {/* Practice Links */}
                  {q.urls && q.urls.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs font-semibold text-muted">Solve on:</span>
                      {q.urls.map((link, i) => (
                        <a
                          key={i}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-3 border border-border hover:border-purple-1/40 hover:text-purple-300 text-xs font-medium text-primary transition-all shadow-sm"
                        >
                          <span>{link.label}</span>
                          <ExternalLink size={12} className="text-muted" />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Hint */}
                  {q.hint && (
                    <div className="flex items-start gap-2 text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl">
                      <Lightbulb size={15} className="shrink-0 mt-0.5 text-amber-400" />
                      <div>
                        <strong className="font-semibold block mb-0.5">Hint:</strong>
                        <span>{q.hint}</span>
                      </div>
                    </div>
                  )}

                  {/* Approach & Complexity */}
                  <div className="text-xs text-secondary space-y-2">
                    <p>
                      <strong className="text-primary font-medium">Approach & Strategy:</strong>{" "}
                      {q.approach ||
                        "Identify the fundamental data structure or algorithmic pattern. Formulate the brute-force baseline, then eliminate redundant iterations through hashing, two pointers, or memoization."}
                    </p>

                    {q.complexity && (
                      <div className="flex items-center gap-4 text-muted pt-1">
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-purple-400" />
                          <span>Time: <strong className="text-primary font-mono">{q.complexity.time}</strong></span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Layers size={13} className="text-cyan-400" />
                          <span>Space: <strong className="text-primary font-mono">{q.complexity.space}</strong></span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              }
            />
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-secondary border border-border rounded-xl bg-surface-1">
          <p className="mb-2 text-sm">No questions match this filter.</p>
          <button
            onClick={() => setFilter("All")}
            className="text-purple-400 hover:underline text-xs font-medium cursor-pointer"
          >
            Show all questions
          </button>
        </div>
      )}
    </div>
  );
}

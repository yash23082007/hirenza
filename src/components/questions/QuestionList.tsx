"use client";

import { useState } from "react";
import { Star, ChevronDown, ChevronRight, Check, ExternalLink, Lightbulb, Clock, Layers } from "lucide-react";
import { Question } from "@/data";
import { useProgress } from "@/hooks/useProgress";
import { ProgressRing } from "@/components/ui/ProgressRing";

interface QuestionListProps {
  questions: Question[];
  title?: string;
  storageKey?: string;
}

export function QuestionList({ questions, storageKey = "default" }: QuestionListProps) {
  const { isCompleted, isBookmarked, toggleComplete, toggleBookmark } = useProgress();
  const [filter, setFilter] = useState<"All" | "Easy" | "Medium" | "Hard" | "Bookmarked">("All");
  const [expandedId, setExpandedId] = useState<number | string | null>(null);

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

  const diffBadge = (d: string) => {
    switch (d) {
      case "Easy":
        return "bg-green-500/10 text-green-400 border border-green-500/20";
      case "Medium":
        return "bg-orange-500/10 text-orange-400 border border-orange-500/20";
      case "Hard":
        return "bg-red-500/10 text-red-400 border border-red-500/20";
      default:
        return "bg-surface-3 text-secondary";
    }
  };

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
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {(["All", "Easy", "Medium", "Hard", "Bookmarked"] as const).map(f => {
          const count =
            f === "All"
              ? questions.length
              : f === "Bookmarked"
              ? bookmarkedCount
              : questions.filter(q => q.difficulty === f).length;

          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                filter === f
                  ? "bg-purple-1 text-white shadow-sm ring-1 ring-purple-1"
                  : "bg-surface-2 text-secondary border border-border hover:border-purple-1/30 hover:text-primary"
              }`}
            >
              <span>{f}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  filter === f ? "bg-white/20 text-white" : "bg-surface-3 text-muted"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

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
          const isExpanded = expandedId === q.id;

          return (
            <div key={q.id} className="transition-colors">
              {/* Row Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 hover:bg-surface-hover/70 transition-colors gap-3">
                {/* Left: Checkbox + Number + Title */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Accessible Checkbox */}
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={solved}
                    aria-label={`Mark ${q.title} as ${solved ? "unsolved" : "solved"}`}
                    onClick={() =>
                      toggleComplete(fid, {
                        module: storageKey,
                        topic: q.topic,
                        difficulty: q.difficulty,
                      })
                    }
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                      solved
                        ? "bg-purple-1 border-purple-1"
                        : "border-border hover:border-purple-1/60 bg-surface-2"
                    }`}
                  >
                    {solved && <Check size={12} className="text-white stroke-[3]" />}
                  </button>

                  <span className="text-xs text-muted w-6 shrink-0 font-mono">
                    {idx + 1}.
                  </span>

                  {/* Title & Clickable Drawer Toggle */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setExpandedId(isExpanded ? null : q.id);
                      }
                    }}
                    className="cursor-pointer min-w-0 flex-1 group"
                  >
                    <span
                      className={`text-sm font-medium transition-colors block truncate ${
                        solved
                          ? "text-muted line-through"
                          : "text-primary group-hover:text-purple-400"
                      }`}
                    >
                      {q.title}
                    </span>
                    {q.topic && (
                      <span className="text-[11px] text-muted block truncate mt-0.5">
                        {q.topic}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Star + Difficulty + Chevron */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Star Bookmark */}
                  <button
                    type="button"
                    onClick={() => toggleBookmark(fid)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      starred
                        ? "text-yellow-400 bg-yellow-400/10"
                        : "text-muted hover:text-yellow-400 hover:bg-surface-3"
                    }`}
                    aria-label={starred ? `Remove bookmark from ${q.title}` : `Bookmark ${q.title}`}
                  >
                    <Star size={15} className={starred ? "fill-yellow-400" : ""} />
                  </button>

                  {/* Difficulty Badge */}
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${diffBadge(
                      q.difficulty
                    )}`}
                  >
                    {q.difficulty}
                  </span>

                  {/* Chevron Toggle */}
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="p-1 text-muted hover:text-primary rounded cursor-pointer"
                    aria-label={isExpanded ? "Collapse details" : "Expand details"}
                  >
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                </div>
              </div>

              {/* Expanded Content Drawer */}
              {isExpanded && (
                <div className="px-6 py-4 bg-surface-2/60 border-t border-border-soft/60 text-sm space-y-3 animate-in fade-in duration-150">
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
              )}
            </div>
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

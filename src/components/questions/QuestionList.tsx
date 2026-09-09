"use client";

import { useState, useEffect } from "react";
import { Star, ChevronDown, ChevronRight, Check } from "lucide-react";
import { Question } from "@/data";

interface QuestionListProps {
  questions: Question[];
  title?: string;
  storageKey?: string;
}

export function QuestionList({ questions: initialQuestions, storageKey = "default" }: QuestionListProps) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [filter, setFilter] = useState<"All" | "Easy" | "Medium" | "Hard" | "Bookmarked">("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    let nextQuestions = initialQuestions;
    try {
      const stored = localStorage.getItem(`hirenza-questions-state:${storageKey}`);
      const state = stored ? JSON.parse(stored) : {};
      nextQuestions = initialQuestions.map(q => ({
          ...q,
          completed: state.completed?.[q.id] || false,
          bookmarked: state.bookmarked?.[q.id] || false,
        }));
    } catch {
      nextQuestions = initialQuestions;
    }
    const updateId = window.setTimeout(() => setQuestions(nextQuestions), 0);
    return () => window.clearTimeout(updateId);
  }, [initialQuestions, storageKey]);

  const saveState = (updated: Question[]) => {
    const state = {
      completed: Object.fromEntries(updated.filter(q => q.completed).map(q => [q.id, true])),
      bookmarked: Object.fromEntries(updated.filter(q => q.bookmarked).map(q => [q.id, true])),
    };
    try {
      localStorage.setItem(`hirenza-questions-state:${storageKey}`, JSON.stringify(state));
    } catch {
      // Progress remains available for the current session when storage is unavailable.
    }
  };

  const toggleComplete = (id: number) => {
    const updated = questions.map(q => q.id === id ? { ...q, completed: !q.completed } : q);
    setQuestions(updated);
    saveState(updated);
  };

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = questions.map(q => q.id === id ? { ...q, bookmarked: !q.bookmarked } : q);
    setQuestions(updated);
    saveState(updated);
  };

  const filtered = questions.filter(q => {
    if (filter === "All") return true;
    if (filter === "Bookmarked") return q.bookmarked;
    return q.difficulty === filter;
  });

  const completedCount = questions.filter(q => q.completed).length;
  const progress = questions.length === 0 ? 0 : Math.round((completedCount / questions.length) * 100);

  const diffColor = (d: string) => {
    switch (d) {
      case "Easy": return "badge-easy";
      case "Medium": return "badge-medium";
      case "Hard": return "badge-hard";
      default: return "";
    }
  };

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-secondary">Overall Progress</span>
          <span className="text-sm text-secondary">{completedCount}/{questions.length}</span>
        </div>
        <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-1 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["All", "Easy", "Medium", "Hard", "Bookmarked"] as const).map(f => {
          const count = f === "All" ? questions.length
            : f === "Bookmarked" ? questions.filter(q => q.bookmarked).length
            : questions.filter(q => q.difficulty === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-purple-1/15 text-purple-1 border border-purple-1/30"
                  : "bg-surface-2 text-secondary border border-border hover:border-purple-1/20"
              }`}
            >
              {f}{count > 0 && <span className="ml-1 opacity-60">{count}</span>}
            </button>
          );
        })}
      </div>

      {/* Questions */}
      <div className="border border-border rounded-xl overflow-hidden">
        {filtered.map(q => (
          <div key={q.id}>
            <div
              className="question-row cursor-pointer"
              role="button"
              tabIndex={0}
              aria-expanded={expandedId === q.id}
              onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setExpandedId(expandedId === q.id ? null : q.id);
                }
              }}
            >
              {/* Checkbox */}
              <div className="flex items-center justify-center" onClick={(e) => { e.stopPropagation(); toggleComplete(q.id); }}>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                  q.completed ? "bg-purple-1 border-purple-1" : "border-border hover:border-purple-1/50"
                }`}>
                  {q.completed && <Check size={12} className="text-white" />}
                </div>
              </div>

              {/* Number */}
              <span className="text-sm text-muted">{q.id}.</span>

              {/* Title */}
              <span className={`text-sm truncate ${q.completed ? "text-muted line-through" : "text-primary"}`}>
                {q.title}
              </span>

              {/* Star/Bookmark */}
              <button
                onClick={(e) => toggleBookmark(q.id, e)}
                className="flex items-center justify-center"
                aria-label={q.bookmarked ? `Remove bookmark from ${q.title}` : `Bookmark ${q.title}`}
              >
                <Star
                  size={16}
                  className={`transition-colors ${q.bookmarked ? "text-yellow-400 fill-yellow-400" : "text-muted hover:text-yellow-400"}`}
                />
              </button>

              {/* Difficulty */}
              <span className={`text-xs px-2 py-1 rounded-full text-center ${diffColor(q.difficulty)}`}>
                {q.difficulty}
              </span>

              {/* Chevron */}
              <div className="flex items-center justify-center text-muted">
                {expandedId === q.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
            </div>

            {/* Expanded Content */}
            <div
              className="overflow-hidden transition-all duration-300 bg-surface-2/50"
              style={{ maxHeight: expandedId === q.id ? "200px" : "0" }}
            >
              <div className="px-24 py-4 text-sm text-secondary">
                <p className="mb-2"><strong>Topic:</strong> {q.topic || "General"}</p>
                <p className="mb-2"><strong>Difficulty:</strong> {q.difficulty}</p>
                <p><strong>Approach:</strong> Review the relevant concept and practice with examples before attempting.</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-secondary">
          <p className="mb-2">No questions match this filter.</p>
          <button onClick={() => setFilter("All")} className="text-purple-1 hover:underline text-sm">
            Show all questions
          </button>
        </div>
      )}
    </div>
  );
}

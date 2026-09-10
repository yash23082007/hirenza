"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { hrQuestionsData } from "@/data";
import { useProgress } from "@/hooks/useProgress";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { QuestionRow } from "@/components/ui/primitives/QuestionRow";
import { FilterTabs } from "@/components/ui/primitives/FilterTabs";
import { SearchBar } from "@/components/ui/primitives/SearchBar";
import { SectionHeading } from "@/components/ui/primitives/SectionHeading";
import { Timer, Play, Pause, RotateCcw, Lightbulb, Check, Star } from "lucide-react";

export default function HRQuestionsPage() {
  const { isCompleted, isBookmarked, toggleComplete, toggleBookmark } = useProgress();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"All" | "Easy" | "Medium" | "Hard" | "Bookmarked">("All");

  // 90-second Practice Timer State
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTimerRunning]);

  const startTimer = () => setIsTimerRunning(true);
  const pauseTimer = () => setIsTimerRunning(false);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(90);
  };

  const categories = useMemo(() => ["All", ...new Set(hrQuestionsData.map(q => q.category))], []);

  const totalQuestions = hrQuestionsData.length;
  const completedCount = useMemo(
    () => hrQuestionsData.filter(q => isCompleted(`hr-${q.id}`)).length,
    [isCompleted]
  );
  const bookmarkedCount = useMemo(
    () => hrQuestionsData.filter(q => isBookmarked(`hr-${q.id}`)).length,
    [isBookmarked]
  );

  const filteredQuestions = useMemo(() => {
    return hrQuestionsData.filter(q => {
      const qKey = `hr-${q.id}`;
      const matchesSearch =
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        (q.tips && q.tips.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;

      let matchesTab = true;
      if (activeTab === "Easy" || activeTab === "Medium" || activeTab === "Hard") {
        matchesTab = q.difficulty === activeTab;
      } else if (activeTab === "Bookmarked") {
        matchesTab = isBookmarked(qKey);
      }

      return matchesSearch && matchesCategory && matchesTab;
    });
  }, [search, selectedCategory, activeTab, isBookmarked]);

  const tabs = [
    { id: "All", label: "All", count: totalQuestions },
    {
      id: "Easy",
      label: "Easy",
      count: hrQuestionsData.filter(q => q.difficulty === "Easy").length,
    },
    {
      id: "Medium",
      label: "Medium",
      count: hrQuestionsData.filter(q => q.difficulty === "Medium").length,
    },
    {
      id: "Hard",
      label: "Hard",
      count: hrQuestionsData.filter(q => q.difficulty === "Hard").length,
    },
    { id: "Bookmarked", label: "Bookmarked", count: bookmarkedCount },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <SectionHeading
        eyebrow="Behavioral & Leadership"
        title="HR & Behavioral Interview Questions"
        subtitle="Master behavioral rounds with the STAR method (Situation, Task, Action, Result) and a dedicated 90-second response pacing trainer."
        badge={`${totalQuestions} Questions`}
      />

      {/* Progress Ring & Stats Header (Hynts Parity §74-75) */}
      <div className="card p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-surface-1 border border-border rounded-2xl">
        <div className="flex items-center gap-5">
          <ProgressRing
            completed={completedCount}
            total={totalQuestions}
            size={88}
            strokeWidth={7}
          />
          <div>
            <h3 className="text-base font-bold text-primary">HR Prep Progress</h3>
            <p className="text-xs text-muted mt-0.5">
              {completedCount} of {totalQuestions} answers prepared
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

        {/* Difficulty Breakdown */}
        <div className="grid grid-cols-3 gap-2.5 w-full sm:w-auto text-center">
          <div className="px-4 py-2.5 bg-surface-2 rounded-xl border border-border-soft">
            <span className="text-[10px] text-muted uppercase tracking-wider block font-medium">
              Easy
            </span>
            <span className="text-sm font-bold text-emerald-400">
              {hrQuestionsData.filter(q => q.difficulty === "Easy" && isCompleted(`hr-${q.id}`)).length}
              <span className="text-xs font-normal text-muted">
                /{hrQuestionsData.filter(q => q.difficulty === "Easy").length}
              </span>
            </span>
          </div>
          <div className="px-4 py-2.5 bg-surface-2 rounded-xl border border-border-soft">
            <span className="text-[10px] text-muted uppercase tracking-wider block font-medium">
              Medium
            </span>
            <span className="text-sm font-bold text-amber-400">
              {hrQuestionsData.filter(q => q.difficulty === "Medium" && isCompleted(`hr-${q.id}`)).length}
              <span className="text-xs font-normal text-muted">
                /{hrQuestionsData.filter(q => q.difficulty === "Medium").length}
              </span>
            </span>
          </div>
          <div className="px-4 py-2.5 bg-surface-2 rounded-xl border border-border-soft">
            <span className="text-[10px] text-muted uppercase tracking-wider block font-medium">
              Hard
            </span>
            <span className="text-sm font-bold text-red-400">
              {hrQuestionsData.filter(q => q.difficulty === "Hard" && isCompleted(`hr-${q.id}`)).length}
              <span className="text-xs font-normal text-muted">
                /{hrQuestionsData.filter(q => q.difficulty === "Hard").length}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* 90-Second Speech Simulator Bar */}
      <div className="card p-5 sm:p-6 bg-gradient-to-br from-surface-1 to-surface-2 border border-purple-500/20 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 shrink-0">
              <Timer size={24} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-purple-400 block">
                Mock Response Trainer
              </span>
              <h3 className="text-base font-bold text-primary">90-Second Answer Pacing Timer</h3>
              <p className="text-xs text-muted mt-0.5">
                Top interviewers expect behavioral answers structured between 60 to 90 seconds.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <div
                className={`text-3xl font-mono font-extrabold ${
                  timerSeconds <= 15 ? "text-red-400 animate-pulse" : "text-purple-300"
                }`}
              >
                {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, "0")}
              </div>
              <span className="text-[10px] text-muted uppercase font-bold">Remaining</span>
            </div>

            <div className="flex items-center gap-2">
              {!isTimerRunning ? (
                <button
                  type="button"
                  onClick={startTimer}
                  className="p-3 bg-purple-1 text-white rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                  title="Start Timer"
                  aria-label="Start Timer"
                >
                  <Play size={16} fill="currentColor" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={pauseTimer}
                  className="p-3 bg-amber-500 text-white rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                  title="Pause Timer"
                  aria-label="Pause Timer"
                >
                  <Pause size={16} fill="currentColor" />
                </button>
              )}
              <button
                type="button"
                onClick={resetTimer}
                className="p-3 bg-surface-3 hover:bg-surface-hover border border-border text-secondary rounded-xl transition-colors cursor-pointer"
                title="Reset to 90s"
                aria-label="Reset Timer"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* STAR Method Guidelines */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-border-soft">
          <div className="bg-surface-3/40 p-3 rounded-xl border border-border-soft">
            <span className="text-xs font-bold text-purple-400 block mb-0.5">1. Situation (15s)</span>
            <p className="text-[11px] text-muted">Context, team scale, and the specific challenge.</p>
          </div>
          <div className="bg-surface-3/40 p-3 rounded-xl border border-border-soft">
            <span className="text-xs font-bold text-indigo-400 block mb-0.5">2. Task (15s)</span>
            <p className="text-[11px] text-muted">Your direct responsibility or core goal.</p>
          </div>
          <div className="bg-surface-3/40 p-3 rounded-xl border border-border-soft">
            <span className="text-xs font-bold text-cyan-400 block mb-0.5">3. Action (40s)</span>
            <p className="text-[11px] text-muted">Engineering decisions, actions, and initiatives.</p>
          </div>
          <div className="bg-surface-3/40 p-3 rounded-xl border border-border-soft">
            <span className="text-xs font-bold text-emerald-400 block mb-0.5">4. Result (20s)</span>
            <p className="text-[11px] text-muted">Metrics, business impact, and key takeaways.</p>
          </div>
        </div>
      </div>

      {/* Controls: Search & Difficulty Tabs */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search questions (e.g., conflict, leadership, failure)..."
            className="flex-1"
          />
          <FilterTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={id =>
              setActiveTab(id as "All" | "Easy" | "Medium" | "Hard" | "Bookmarked")
            }
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-purple-1 text-white"
                  : "bg-surface-2 text-secondary border border-border-soft hover:border-purple-1/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table Column Header Row (Inventory §§74-75) */}
      <div className="hidden sm:flex items-center justify-between px-6 py-2.5 bg-surface-2/80 border border-b-0 border-border rounded-t-xl text-[10px] font-bold uppercase tracking-wider text-muted select-none">
        <div className="flex items-center gap-5">
          <span className="w-5 text-center">STATUS</span>
          <span className="w-6 text-center">#</span>
          <span>QUESTION</span>
        </div>
        <div className="flex items-center gap-8 pr-2">
          <span>REVISION</span>
          <span>LEVEL</span>
          <span className="w-4"></span>
        </div>
      </div>

      {/* Questions Table Container */}
      <div className="border border-border rounded-xl sm:rounded-t-none overflow-hidden divide-y divide-border-soft bg-surface-1">
        {filteredQuestions.map((q, idx) => {
          const qKey = `hr-${q.id}`;
          const solved = isCompleted(qKey);
          const bookmarked = isBookmarked(qKey);

          return (
            <QuestionRow
              key={q.id}
              id={qKey}
              index={idx + 1}
              title={q.question}
              difficulty={q.difficulty}
              categoryBadge={q.category}
              solved={solved}
              bookmarked={bookmarked}
              onToggleComplete={() =>
                toggleComplete(qKey, {
                  module: "hr-questions",
                  topic: q.category,
                  difficulty: q.difficulty,
                })
              }
              onToggleBookmark={() => toggleBookmark(qKey)}
              expandableContent={
                <div className="space-y-3">
                  {q.tips && (
                    <div className="flex items-start gap-2 text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                      <Lightbulb size={15} className="shrink-0 mt-0.5 text-amber-400" />
                      <div>
                        <strong className="text-amber-300 font-semibold block mb-0.5">
                          Response Strategy:
                        </strong>
                        <span>{q.tips}</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-border-soft flex items-center justify-between text-xs">
                    <span className="text-muted">
                      💡 Structure response into STAR components with quantifiable outcomes.
                    </span>
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        resetTimer();
                        startTimer();
                      }}
                      className="px-3 py-1.5 bg-purple-1 text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Play size={12} fill="currentColor" /> Practice Answer (90s)
                    </button>
                  </div>
                </div>
              }
            />
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="text-center py-16 text-secondary bg-surface-1">
            <p className="text-sm mb-2">No behavioral questions match this filter.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setActiveTab("All");
              }}
              className="text-purple-400 hover:underline text-xs font-semibold cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

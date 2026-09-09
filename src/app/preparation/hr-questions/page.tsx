"use client";

import { useState, useEffect, useRef } from "react";
import { hrQuestionsData } from "@/data";
import { Search, Lightbulb, Timer, Play, Pause, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";

export default function HRQuestionsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);

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

  const categories = ["All", ...new Set(hrQuestionsData.map(q => q.category))];
  
  const filtered = hrQuestionsData.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase()) || 
                          (q.tips && q.tips.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Behavioral & HR Interview Practice</h1>
        <p className="text-secondary">Master behavioral rounds using the STAR method (Situation, Task, Action, Result) with real-time 90-second speech pacing.</p>
      </div>

      {/* 90-Second Speech Simulator Bar */}
      <div className="card p-6 mb-8 bg-gradient-to-br from-surface-1 to-surface-2 border-purple-500/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-1 shrink-0">
              <Timer size={26} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-muted block">Mock Response Trainer</span>
              <h3 className="text-lg font-bold text-primary">90-Second Answer Pacing Timer</h3>
              <p className="text-xs text-muted mt-0.5">Top recruiters expect clear behavioral answers structured in 60 to 90 seconds.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className={`text-3xl font-mono font-extrabold ${timerSeconds <= 15 ? "text-red-400 animate-pulse" : "text-purple-1"}`}>
                {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, "0")}
              </div>
              <span className="text-[10px] text-muted uppercase font-bold">Remaining</span>
            </div>

            <div className="flex items-center gap-2">
              {!isTimerRunning ? (
                <button
                  onClick={startTimer}
                  className="p-3 bg-purple-1 text-white rounded-xl hover:opacity-90 transition-opacity"
                  title="Start Timer"
                >
                  <Play size={16} fill="currentColor" />
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="p-3 bg-amber-500 text-white rounded-xl hover:opacity-90 transition-opacity"
                  title="Pause Timer"
                >
                  <Pause size={16} fill="currentColor" />
                </button>
              )}
              <button
                onClick={resetTimer}
                className="p-3 bg-surface-3 hover:bg-surface-hover border border-border text-secondary rounded-xl transition-colors"
                title="Reset to 90s"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* STAR Method Guidelines */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-border">
          <div className="bg-surface-3/50 p-3 rounded-xl border border-border">
            <span className="text-xs font-bold text-purple-400 block mb-1">1. Situation (15s)</span>
            <p className="text-[11px] text-muted">Set the scene and provide context on the team/problem.</p>
          </div>
          <div className="bg-surface-3/50 p-3 rounded-xl border border-border">
            <span className="text-xs font-bold text-indigo-400 block mb-1">2. Task (15s)</span>
            <p className="text-[11px] text-muted">Explain your specific responsibility or challenge.</p>
          </div>
          <div className="bg-surface-3/50 p-3 rounded-xl border border-border">
            <span className="text-xs font-bold text-cyan-400 block mb-1">3. Action (40s)</span>
            <p className="text-[11px] text-muted">Detail the exact technical steps and initiatives you took.</p>
          </div>
          <div className="bg-surface-3/50 p-3 rounded-xl border border-border">
            <span className="text-xs font-bold text-emerald-400 block mb-1">4. Result (20s)</span>
            <p className="text-[11px] text-muted">Quantify the business impact, metrics, and learnings.</p>
          </div>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-3 bg-surface-2 border border-border rounded-xl px-4 py-3">
          <Search size={16} className="text-muted" />
          <input
            type="text"
            placeholder="Search behavioral questions (e.g. conflict, leadership, failure, teamwork)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent flex-1 text-xs outline-none placeholder:text-muted"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-purple-1 text-white shadow-sm"
                  : "bg-surface-2 text-secondary border border-border hover:border-purple-500/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filtered.map((q, idx) => {
          const isExpanded = activeQuestionId === q.id;

          return (
            <div 
              key={q.id} 
              className="border border-border rounded-2xl bg-surface-2 p-5 hover:border-purple-500/30 transition-all cursor-pointer"
              onClick={() => setActiveQuestionId(isExpanded ? null : q.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-xs font-bold text-muted w-6 pt-0.5">{idx + 1}.</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-primary leading-snug">{q.question}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-semibold bg-surface-3 px-2 py-0.5 rounded-md text-muted border border-border">
                        {q.category}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        q.difficulty === "Easy" ? "bg-green-500/10 text-green-400" :
                        q.difficulty === "Medium" ? "bg-orange-500/10 text-orange-400" :
                        "bg-red-500/10 text-red-400"
                      }`}>
                        {q.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-1 text-muted hover:text-secondary">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Expanded STAR Framework & Tips */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-border space-y-3 bg-surface-3/30 p-4 rounded-xl">
                  {q.tips && (
                    <div className="flex items-start gap-2.5">
                      <Lightbulb size={16} className="text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-xs leading-relaxed text-secondary">
                        <strong className="text-amber-300">Expert Response Strategy: </strong>
                        {q.tips}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-border-soft flex items-center justify-between text-xs">
                    <span className="text-muted">💡 Frame your response around a real project scenario.</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        resetTimer();
                        startTimer();
                      }}
                      className="px-3 py-1 bg-purple-1 text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1"
                    >
                      <Play size={11} fill="currentColor" /> Practice Answer (90s)
                    </button>
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

"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useProgress, ProblemStatus } from "@/hooks/useProgress";
import { getDailyChallenge, getDailyHistory, isFreezeTokenEligible } from "@/lib/daily";
import {
  Flame,
  Clock,
  CheckCircle2,
  Bookmark,
  ExternalLink,
  Shield,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Calendar,
} from "lucide-react";

const emptySubscribe = () => () => {};

export function DailyClient() {
  const { data, streak, getStatus, setStatus, isBookmarked, toggleBookmark } = useProgress();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [challenge] = useState(() => getDailyChallenge());
  const [history] = useState(() => getDailyHistory(7));
  const [timeLeft, setTimeLeft] = useState("");

  // Focus Timer state
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);

  useEffect(() => {
    // Countdown to midnight
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(
        `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Timer interval
  useEffect(() => {
    if (!timerRunning || timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((s) => {
        if (s <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  if (!mounted) return null;

  const currentStatus = getStatus(challenge.problem.id);
  const bookmarked = isBookmarked(challenge.problem.id);
  const isSolved = currentStatus === "solved" || currentStatus === "mastered";

  const handleStatusChange = (status: ProblemStatus) => {
    setStatus(challenge.problem.id, status, {
      topic: challenge.problem.topic,
      difficulty: challenge.problem.difficulty,
    });
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const currentStreak = streak?.current || 0;
  const freezeEligible = isFreezeTokenEligible(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-1/10 border border-purple-1/30 text-purple-1 text-xs font-mono mb-2">
            <Sparkles size={12} />
            <span>Daily Coding Challenge · {challenge.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
            Today&apos;s Engineering Problem
          </h1>
          <p className="text-sm text-secondary mt-1">
            Global deterministic challenge. Consistent practice beats binge prep.
          </p>
        </div>

        {/* Streak & Midnight Countdown */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface-2 border border-border">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500/30 animate-pulse" />
            <div>
              <div className="text-xs text-muted font-mono uppercase leading-none">Streak</div>
              <div className="text-lg font-extrabold text-primary leading-tight font-mono">
                {currentStreak} {currentStreak === 1 ? "day" : "days"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface-2 border border-border">
            <Clock className="w-5 h-5 text-cyan-400" />
            <div>
              <div className="text-xs text-muted font-mono uppercase leading-none">Resets in</div>
              <div className="text-sm font-bold text-primary font-mono leading-tight">
                {timeLeft || "--:--:--"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day History Ribbon */}
      <div className="border border-border rounded-2xl p-5 bg-surface-1">
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-muted flex items-center gap-1.5">
            <Calendar size={13} />
            <span>Last 7 Days Activity</span>
          </span>
          <div className="flex items-center gap-2 text-xs font-mono text-secondary">
            <Shield size={13} className={freezeEligible ? "text-emerald-400" : "text-muted"} />
            <span>Streak Freeze: {freezeEligible ? "Available" : "On Cooldown"}</span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {history.map((day) => {
            const dayStatus = data.statuses[day.problem.id];
            const solved = dayStatus === "solved" || dayStatus === "mastered";
            const isToday = day.date === challenge.date;

            return (
              <div
                key={day.date}
                className={`p-3 rounded-xl border flex flex-col items-center text-center transition-all ${
                  isToday
                    ? "border-purple-1/60 bg-purple-1/10 shadow-lg"
                    : solved
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : "border-border bg-surface-2/40"
                }`}
              >
                <span className="text-[11px] font-mono font-bold text-muted uppercase mb-1">
                  {day.displayLabel}
                </span>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
                    solved
                      ? "bg-emerald-500 text-black"
                      : isToday
                      ? "bg-purple-1 text-white"
                      : "bg-surface-3 text-muted"
                  }`}
                >
                  {solved ? <CheckCircle2 size={14} /> : <span className="text-xs font-mono">•</span>}
                </div>
                <span className="text-[10px] text-secondary font-mono truncate max-w-full">
                  {day.problem.difficulty}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Problem Card */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-1 p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-mono font-bold uppercase ${
                challenge.problem.difficulty === "Easy"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : challenge.problem.difficulty === "Medium"
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                  : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
              }`}
            >
              {challenge.problem.difficulty}
            </span>

            <span className="text-xs px-2.5 py-1 rounded-full font-mono bg-surface-3 text-secondary border border-border">
              {challenge.problem.topic}
            </span>

            {challenge.problem.pattern && (
              <span className="text-xs px-2.5 py-1 rounded-full font-mono bg-purple-1/10 text-purple-1 border border-purple-1/30">
                {challenge.problem.pattern}
              </span>
            )}
          </div>

          <button
            onClick={() => toggleBookmark(challenge.problem.id)}
            className={`p-2 rounded-xl border transition-colors ${
              bookmarked
                ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
                : "bg-surface-2 border-border text-muted hover:text-primary"
            }`}
            aria-label="Bookmark problem"
          >
            <Bookmark size={18} className={bookmarked ? "fill-amber-400" : ""} />
          </button>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">
            {challenge.problem.title}
          </h2>
          <p className="text-sm text-secondary">
            Master this algorithmic archetype. Recommended focus time: 25 minutes.
          </p>
        </div>

        {/* Focus Timer Bar */}
        <div className="p-4 rounded-2xl border border-border bg-surface-2/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-purple-1" />
            <div>
              <span className="text-xs text-muted font-mono uppercase block">Solve Clock</span>
              <span className="text-xl font-mono font-bold text-primary">{formatTimer(timerSeconds)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-3 border border-border text-xs font-mono font-semibold text-primary hover:border-purple-1/50 transition-colors"
            >
              {timerRunning ? <Pause size={13} /> : <Play size={13} />}
              <span>{timerRunning ? "Pause" : "Start Clock"}</span>
            </button>
            <button
              onClick={() => {
                setTimerRunning(false);
                setTimerSeconds(25 * 60);
              }}
              className="p-1.5 rounded-lg bg-surface-3 border border-border text-muted hover:text-primary transition-colors"
              aria-label="Reset timer"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Solve Links */}
        <div className="flex items-center gap-4 flex-wrap">
          {challenge.problem.leetcodeUrl && (
            <Link
              href={challenge.problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-background font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <span>Solve on LeetCode</span>
              <ExternalLink size={14} />
            </Link>
          )}

          {challenge.problem.gfgUrl && (
            <Link
              href={challenge.problem.gfgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-2 border border-border text-primary font-semibold text-sm hover:border-border-hover transition-colors"
            >
              <span>Solve on GeeksforGeeks</span>
              <ExternalLink size={14} />
            </Link>
          )}
        </div>

        {/* 4-State Toggle Selector */}
        <div className="border-t border-border pt-6">
          <div className="text-xs font-mono uppercase tracking-wider text-muted mb-3">
            Mark Your Problem Status
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {(["unsolved", "attempted", "solved", "review", "mastered"] as ProblemStatus[]).map((status) => {
              const isSelected = currentStatus === status;
              return (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold capitalize transition-all ${
                    isSelected
                      ? status === "solved" || status === "mastered"
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-md"
                        : status === "attempted"
                        ? "bg-amber-500/20 border-amber-500 text-amber-400 shadow-md"
                        : status === "review"
                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-md"
                        : "bg-surface-3 border-purple-1 text-primary shadow-md"
                      : "bg-surface-2 border-border text-secondary hover:border-border-hover"
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
          {isSolved && (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mt-3">
              <CheckCircle2 size={14} />
              <span>Today&apos;s challenge completed! Streak updated locally.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

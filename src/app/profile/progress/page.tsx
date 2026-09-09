"use client";

import { ActivityChart, StreakCalendar } from "@/components/dashboard/ActivityChart";
import { useProgress } from "@/hooks/useProgress";
import { TrendingUp } from "lucide-react";

export default function ProgressPage() {
  const { topicMastery, streak, data, moduleStats } = useProgress();

  const totalProblemsSolved = data.events.length;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Learning Progress</h1>
          <p className="text-secondary">Real-time mastery across all interview topics and modules.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-surface-2 border border-border px-4 py-2 rounded-xl text-center">
            <span className="text-xs text-muted block">Total Solved</span>
            <span className="text-xl font-bold text-purple-400">{totalProblemsSolved}</span>
          </div>
          <div className="bg-surface-2 border border-border px-4 py-2 rounded-xl text-center">
            <span className="text-xs text-muted block">Streak</span>
            <span className="text-xl font-bold text-brand-orange">{streak.current}d</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div>
          <StreakCalendar />
        </div>
      </div>

      {/* Real Topic Mastery */}
      <div className="bg-surface-2 border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-purple-400" />
            <h3 className="text-xl font-bold">Topic Mastery (Computed)</h3>
          </div>
          <span className="text-xs text-muted">Based on verified completed problems</span>
        </div>

        <div className="space-y-6">
          {topicMastery.map(t => (
            <div key={t.topic}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-primary">{t.topic}</span>
                <span className="text-muted font-mono">
                  {t.solved} / {t.total} ({t.percent}%)
                </span>
              </div>
              <div className="w-full bg-surface-3 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${t.color} transition-all duration-500`}
                  style={{ width: `${t.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Module Overview Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(moduleStats).map(([mod, stat]) => (
          <div key={mod} className="p-4 rounded-xl bg-surface-2 border border-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs uppercase tracking-wider text-muted font-bold">{mod}</span>
              <span className="text-xs font-mono text-purple-400">{stat.percent}%</span>
            </div>
            <div className="text-lg font-bold text-primary">
              {stat.solved} <span className="text-xs font-normal text-muted">/ {stat.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

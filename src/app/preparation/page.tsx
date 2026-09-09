"use client";

import { ActivityChart, StreakCalendar } from "@/components/dashboard/ActivityChart";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Dashboard</h1>
        <p className="text-secondary">Track your daily consistency and problem-solving metrics.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 mb-8">
        <ActivityChart />
        <StreakCalendar />
      </div>

      {/* Skill Analysis */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Skill Analysis</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "DSA", progress: 12, total: 455 },
            { name: "SQL", progress: 8, total: 110 },
            { name: "System Design", progress: 5, total: 50 },
            { name: "Core Subjects", progress: 15, total: 200 },
            { name: "Interview Questions", progress: 3, total: 100 },
          ].map(skill => (
            <div key={skill.name} className="border border-border rounded-xl bg-surface-2 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">{skill.name}</span>
                <span className="text-xs text-muted">{skill.progress}%</span>
              </div>
              <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
                <div className="h-full bg-purple-1 rounded-full transition-all" style={{ width: `${skill.progress}%` }} />
              </div>
              <p className="text-xs text-muted mt-2">{skill.total} questions</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category Breakdown */}
      <div>
        <h2 className="text-xl font-bold mb-4">Category Breakdown</h2>
        <div className="border border-border rounded-xl bg-surface-2 p-6">
          <div className="space-y-4">
            {[
              { name: "Arrays & Strings", solved: 45, total: 80 },
              { name: "Trees & Graphs", solved: 22, total: 60 },
              { name: "Dynamic Programming", solved: 15, total: 50 },
              { name: "SQL Queries", solved: 30, total: 110 },
            ].map(cat => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{cat.name}</span>
                  <span className="text-xs text-muted">{cat.solved}/{cat.total}</span>
                </div>
                <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-1 rounded-full" style={{ width: `${(cat.solved / cat.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

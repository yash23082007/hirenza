"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ActivityChart, StreakCalendar } from "@/components/dashboard/ActivityChart";
import { useProgress } from "@/hooks/useProgress";
import { Target, RotateCcw, ArrowUpRight, CheckCircle2, BookMarked, Sparkles } from "lucide-react";
import { companies } from "@/data/companies";

import { ReadinessExplainer } from "@/components/features/ReadinessExplainer";
import { WeakestPatternWidget } from "@/components/dashboard/WeakestPatternWidget";

export default function DashboardPage() {
  const { moduleStats, topicMastery, revisionQueue, data, allBookmarks } = useProgress();

  // Company Readiness Score (E7)
  const targetCompany = data.profile.targetCompany || "Google";
  const matchedCompany = companies.find(c => c.name.toLowerCase() === targetCompany.toLowerCase()) || companies[0];

  const readinessDetails = useMemo(() => {
    if (!matchedCompany) return { score: 0, compSolved: 0, compTotal: 1, patSolved: 0, patTotal: 1 };
    const companyProblems = matchedCompany.problems;
    const total = companyProblems.length || 1;
    const solved = companyProblems.filter(p => {
      const s = data.statuses[`comp-${p.id}`];
      return s === "solved" || s === "mastered";
    }).length;

    const highFreq = companyProblems.filter(p => p.frequency === "High");
    const highFreqSolved = highFreq.filter(p => {
      const s = data.statuses[`comp-${p.id}`];
      return s === "solved" || s === "mastered";
    }).length;

    const highFreqRatio = highFreq.length > 0 ? highFreqSolved / highFreq.length : 0;
    const generalRatio = solved / total;
    const coreRatio = (moduleStats["core-subjects"]?.percent || 0) / 100;
    const sdRatio = (moduleStats["system-design"]?.percent || 0) / 100;

    const weighted = (highFreqRatio * 0.45 + generalRatio * 0.25 + coreRatio * 0.15 + sdRatio * 0.15) * 100;
    return {
      score: Math.min(100, Math.round(weighted)),
      compSolved: highFreqSolved,
      compTotal: Math.max(1, highFreq.length),
      patSolved: moduleStats["20-patterns"]?.solved || 0,
      patTotal: moduleStats["20-patterns"]?.total || 1,
    };
  }, [matchedCompany, data.statuses, moduleStats]);

  const readinessScore = readinessDetails.score;

  // Interview countdown days
  const daysUntilInterview = useMemo(() => {
    if (!data.profile.targetDate) return null;
    const target = new Date(data.profile.targetDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 3600 * 24));
    return diff > 0 ? diff : null;
  }, [data.profile.targetDate]);

  const skillCards = [
    { name: "DSA Sheets", key: "dsa", href: "/preparation/dsa-sheets" },
    { name: "SQL Queries", key: "sql", href: "/preparation/sql-sheet" },
    { name: "System Design", key: "system-design", href: "/preparation/system-design" },
    { name: "Core Subjects", key: "core-subjects", href: "/preparation/core-subjects" },
    { name: "Package-wise DSA", key: "package-wise", href: "/preparation/package-wise-dsa" },
    { name: "Company DSA", key: "companies", href: "/preparation/company-wise-dsa" },
  ];

  return (
    <div className="space-y-8">
      {/* Header & Target Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Welcome back, {data.profile.name || "Builder"}
          </h1>
          <p className="text-secondary">
            Tracking verified consistency, target company readiness, and active revision.
          </p>
        </div>

        {/* Readiness Pill */}
        <div className="flex items-center gap-3 bg-surface-2 border border-border p-3 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-purple-1/15 flex items-center justify-center text-purple-400">
            <Target size={20} />
          </div>
          <div>
            <div className="text-xs text-muted flex items-center gap-2">
              <span>{matchedCompany?.name || "Company"} Target</span>
              {daysUntilInterview && (
                <span className="text-brand-orange font-semibold">• {daysUntilInterview}d left</span>
              )}
              <ReadinessExplainer
                companySolved={readinessDetails.compSolved}
                companyTotal={readinessDetails.compTotal}
                patternsSolved={readinessDetails.patSolved}
                patternsTotal={readinessDetails.patTotal}
                coreSolved={moduleStats["core-subjects"]?.solved || 0}
                coreTotal={moduleStats["core-subjects"]?.total || 1}
                systemSolved={moduleStats["system-design"]?.solved || 0}
                systemTotal={moduleStats["system-design"]?.total || 1}
                companyName={matchedCompany?.name || "Target"}
              />
            </div>
            <div className="text-lg font-bold text-primary">
              {readinessScore}% <span className="text-xs font-normal text-muted">Readiness Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Heatmap and Streak */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <ActivityChart />
        <StreakCalendar />
      </div>

      {/* Spaced Repetition Revision & Quick Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Revision Queue (E8) */}
        <div className="border border-border rounded-2xl bg-surface-2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                  <RotateCcw size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary">Spaced Repetition Queue</h3>
                  <p className="text-xs text-muted">Leitner memory intervals (+1d, +3d, +7d)</p>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-surface-3 text-secondary font-medium">
                {revisionQueue.length} Due
              </span>
            </div>

            {revisionQueue.length === 0 ? (
              <div className="py-6 text-center text-muted">
                <CheckCircle2 size={24} className="mx-auto text-green-400 mb-1" />
                <p className="text-xs font-medium text-secondary">All caught up on revisions!</p>
                <p className="text-[11px] text-muted">
                  Questions marked for review or solved earlier will automatically surface here.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {revisionQueue.slice(0, 4).map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-surface-1 border border-border text-xs"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="font-medium truncate text-primary">{item.title}</p>
                      <span className="text-muted text-[10px]">{item.moduleLabel}</span>
                    </div>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-medium shrink-0"
                    >
                      Revise <ArrowUpRight size={12} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted">
            <span>Memory Retention active</span>
            <Link href="/preparation/dsa-sheets" className="text-purple-400 hover:underline">
              Browse sheets →
            </Link>
          </div>
        </div>

        {/* Bookmarks & Target Plan */}
        <div className="border border-border rounded-2xl bg-surface-2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                  <BookMarked size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary">Saved for Review</h3>
                  <p className="text-xs text-muted">Direct access to flagged concepts</p>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-surface-3 text-secondary font-medium">
                {allBookmarks.length} Saved
              </span>
            </div>

            {allBookmarks.length === 0 ? (
              <div className="py-6 text-center text-muted">
                <Sparkles size={24} className="mx-auto text-yellow-400 mb-1" />
                <p className="text-xs font-medium text-secondary">No questions bookmarked yet.</p>
                <p className="text-[11px] text-muted">
                  Click the star on any question or topic to pin it here.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {allBookmarks.slice(0, 4).map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-surface-1 border border-border text-xs"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="font-medium truncate text-primary">{item.title}</p>
                      <span className="text-muted text-[10px]">{item.moduleLabel}</span>
                    </div>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-medium shrink-0"
                    >
                      Open <ArrowUpRight size={12} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted">
            <Link href="/profile/bookmarks" className="text-purple-400 hover:underline">
              View all bookmarks ({allBookmarks.length}) →
            </Link>
            <Link href="/profile" className="text-muted hover:text-primary">
              Target Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Algorithmic Focus & Weakness Radar */}
      <WeakestPatternWidget />

      {/* Real Skill Analysis */}
      <div>
        <h2 className="text-xl font-bold mb-4">Module Preparation Progress</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCards.map(skill => {
            const stat = moduleStats[skill.key] || { solved: 0, total: 1, percent: 0 };
            return (
              <Link
                key={skill.name}
                href={skill.href}
                className="border border-border rounded-xl bg-surface-2 p-4 hover:border-purple-1/30 transition-all group block"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold group-hover:text-purple-400 transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-xs text-muted font-mono">{stat.percent}%</span>
                </div>
                <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-1 rounded-full transition-all duration-500"
                    style={{ width: `${stat.percent}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs text-muted mt-2">
                  <span>{stat.solved} / {stat.total} solved</span>
                  <span className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    Practice <ArrowUpRight size={11} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Real Category Breakdown */}
      <div>
        <h2 className="text-xl font-bold mb-4">Real Topic Mastery Breakdown</h2>
        <div className="border border-border rounded-xl bg-surface-2 p-6">
          <div className="space-y-5">
            {topicMastery.map(cat => (
              <div key={cat.topic}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{cat.topic}</span>
                  <span className="text-xs text-muted">
                    {cat.solved}/{cat.total} ({cat.percent}%)
                  </span>
                </div>
                <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { dsaSheets, Problem } from "@/data";
import {
  BookOpen,
  ExternalLink,
  ArrowLeft,
  Search,
  CheckCircle2,
  Bookmark,
  Sparkles,
  RotateCcw,
  Star,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useProgress } from "@/hooks/useProgress";



export function DSASheetsClient({ sheetId }: { sheetId?: string }) {
  const { getStatus, setStatus, isBookmarked, toggleBookmark } = useProgress();

  const selectedSheet = useMemo(() => {
    return sheetId ? dsaSheets.find(s => s.id === sheetId) : null;
  }, [sheetId]);

  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"problems" | "revision">("problems");

  // Flattened problems for active sheet
  const allSheetProblems = useMemo(() => {
    if (!selectedSheet) return [];
    return selectedSheet.topics.flatMap(t => t.problems);
  }, [selectedSheet]);

  // Overall Stats
  const solvedCount = useMemo(() => {
    return allSheetProblems.filter(p => getStatus(p.id) === "solved" || getStatus(p.id) === "mastered").length;
  }, [allSheetProblems, getStatus]);

  const masteredCount = useMemo(() => {
    return allSheetProblems.filter(p => getStatus(p.id) === "mastered").length;
  }, [allSheetProblems, getStatus]);

  const reviewCount = useMemo(() => {
    return allSheetProblems.filter(p => getStatus(p.id) === "review").length;
  }, [allSheetProblems, getStatus]);

  const progressPercent = allSheetProblems.length > 0 
    ? Math.round((solvedCount / allSheetProblems.length) * 100) 
    : 0;

  // Find next problem to continue
  const nextProblem = useMemo(() => {
    return allSheetProblems.find(
      p => { const s = getStatus(p.id); return !s || s === "unsolved" || s === "attempted"; }
    );
  }, [allSheetProblems, getStatus]);

  if (selectedSheet) {
    const isProblemMatching = (p: Problem) => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (p.pattern && p.pattern.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDifficulty = difficultyFilter === "All" || p.difficulty === difficultyFilter;
      const status = getStatus(p.id) || "unsolved";
      const matchesStatus = statusFilter === "All" || status === statusFilter;
      const isReviewTab = activeTab === "revision" ? status === "review" : true;

      return matchesSearch && matchesDifficulty && matchesStatus && isReviewTab;
    };

    return (
      <div>
        {/* Back button */}
        <Link 
          href="/preparation/dsa-sheets"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-secondary mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to all sheets
        </Link>

        {/* Sheet Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                <BookOpen size={26} className="text-purple-1" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{selectedSheet.name}</h1>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                    selectedSheet.level === "Beginner" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                    selectedSheet.level === "Intermediate" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                    "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}>
                    {selectedSheet.level}
                  </span>
                </div>
                <p className="text-xs text-muted mb-2 font-medium">Curated by {selectedSheet.educator}</p>
                <p className="text-sm text-secondary max-w-3xl">{selectedSheet.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={selectedSheet.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-2 hover:bg-surface-hover border border-border text-secondary rounded-xl text-xs font-semibold transition-all"
              >
                Source Portal <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Action & Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Progress Card */}
          <div className="card p-5 md:col-span-2 bg-gradient-to-br from-surface-1 to-surface-2 border-purple-500/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">Completion Rate</span>
              <span className="text-lg font-extrabold text-purple-1">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-surface-3 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted">
              <span>{solvedCount} / {allSheetProblems.length} Solved</span>
              <span>{masteredCount} Mastered • {reviewCount} In Revision</span>
            </div>
          </div>

          {/* Quick Continue Card */}
          <div className="card p-5 md:col-span-2 flex flex-col justify-between bg-surface-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-400" /> Up Next to Solve
              </span>
              <p className="text-sm font-bold text-primary mt-1 truncate">
                {nextProblem ? nextProblem.title : "All problems completed! Great job!"}
              </p>
              {nextProblem && (
                <p className="text-xs text-muted mt-0.5">
                  Topic: {nextProblem.topic} • {nextProblem.difficulty}
                </p>
              )}
            </div>
            {nextProblem && (
              <div className="mt-3 flex items-center gap-2">
                {nextProblem.leetcodeUrl && (
                  <a
                    href={nextProblem.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setStatus(nextProblem.id, "attempted")}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-1 text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity"
                  >
                    Solve on LeetCode <ExternalLink size={12} />
                  </a>
                )}
                {nextProblem.gfgUrl && (
                  <a
                    href={nextProblem.gfgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setStatus(nextProblem.id, "attempted")}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity"
                  >
                    Solve on GFG <ExternalLink size={12} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* View Tabs & Filters */}
        <div className="card p-4 mb-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("problems")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeTab === "problems" ? "bg-purple-1 text-white" : "bg-surface-3 text-muted hover:text-secondary"
                }`}
              >
                <BookOpen size={13} /> All Sheet Problems
              </button>
              <button
                onClick={() => setActiveTab("revision")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeTab === "revision" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-surface-3 text-muted hover:text-secondary"
                }`}
              >
                <RotateCcw size={13} /> Revision Queue ({reviewCount})
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted">
              <Filter size={13} />
              <span>Filter View</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 bg-surface-3 border border-border rounded-xl px-3 py-2">
              <Search size={14} className="text-muted shrink-0" />
              <input
                type="text"
                placeholder="Search problem title or pattern..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent flex-1 text-xs outline-none placeholder:text-muted"
              />
            </div>

            <select
              value={difficultyFilter}
              onChange={e => setDifficultyFilter(e.target.value)}
              className="bg-surface-3 border border-border text-secondary rounded-xl px-3 py-2 text-xs outline-none"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-surface-3 border border-border text-secondary rounded-xl px-3 py-2 text-xs outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="unsolved">Unsolved</option>
              <option value="attempted">Attempted</option>
              <option value="solved">Solved</option>
              <option value="review">Needs Review</option>
              <option value="mastered">Mastered</option>
            </select>
          </div>
        </div>

        {/* Topics & Problems List */}
        <div className="space-y-6">
          {selectedSheet.topics.map((topic, topicIdx) => {
            const matchingProblems = topic.problems.filter(isProblemMatching);
            if (matchingProblems.length === 0 && (searchQuery || difficultyFilter !== "All" || statusFilter !== "All" || activeTab === "revision")) {
              return null;
            }

            const topicSolved = topic.problems.filter(p => getStatus(p.id) === "solved" || getStatus(p.id) === "mastered").length;

            return (
              <div key={topicIdx} className="card p-5">
                <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold">{topic.name}</h3>
                    <span className="text-xs bg-surface-3 px-2 py-0.5 rounded-full text-muted font-medium">
                      {topicSolved} / {topic.problems.length} done
                    </span>
                  </div>
                  <span className="text-xs text-muted">{matchingProblems.length} visible</span>
                </div>

                {matchingProblems.length > 0 ? (
                  <div className="space-y-2.5">
                    {matchingProblems.map((problem) => {
                      const status = getStatus(problem.id) || "unsolved";
                      const bookmarked = isBookmarked(problem.id);

                      return (
                        <div
                          key={problem.id}
                          className={`p-3.5 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                            status === "mastered" ? "bg-purple-950/20 border-purple-500/30" :
                            status === "solved" ? "bg-green-950/20 border-green-500/30" :
                            status === "review" ? "bg-amber-950/20 border-amber-500/30" :
                            status === "attempted" ? "bg-blue-950/20 border-blue-500/30" :
                            "bg-surface-2 border-border hover:border-border-soft"
                          }`}
                        >
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <button
                              onClick={() => toggleBookmark(problem.id)}
                              className={`p-1 mt-0.5 rounded-md transition-colors ${
                                bookmarked ? "text-amber-400 bg-amber-500/10" : "text-muted hover:text-secondary"
                              }`}
                              title={bookmarked ? "Bookmarked" : "Bookmark Problem"}
                            >
                              <Bookmark size={15} fill={bookmarked ? "currentColor" : "none"} />
                            </button>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="font-semibold text-sm text-primary">{problem.title}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                  problem.difficulty === "Easy" ? "bg-green-500/10 text-green-400" :
                                  problem.difficulty === "Medium" ? "bg-orange-500/10 text-orange-400" :
                                  "bg-red-500/10 text-red-400"
                                }`}>
                                  {problem.difficulty}
                                </span>
                                {problem.pattern && (
                                  <span className="text-[10px] bg-surface-3 px-2 py-0.5 rounded-full text-muted border border-border">
                                    {problem.pattern}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-3 text-xs text-muted">
                                {problem.leetcodeUrl && (
                                  <a
                                    href={problem.leetcodeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-1 hover:underline inline-flex items-center gap-1 font-medium"
                                  >
                                    LeetCode <ExternalLink size={10} />
                                  </a>
                                )}
                                {problem.gfgUrl && (
                                  <a
                                    href={problem.gfgUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-medium"
                                  >
                                    GeeksforGeeks <ExternalLink size={10} />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Status Selector Button Group */}
                          <div className="flex items-center gap-1 shrink-0 bg-surface-3 p-1 rounded-xl border border-border">
                            <button
                              onClick={() => setStatus(problem.id, "unsolved")}
                              className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                                status === "unsolved" ? "bg-surface-hover text-white" : "text-muted hover:text-secondary"
                              }`}
                              title="Unsolved"
                            >
                              Unsolved
                            </button>
                            <button
                              onClick={() => setStatus(problem.id, "attempted")}
                              className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                                status === "attempted" ? "bg-blue-600 text-white font-bold" : "text-muted hover:text-secondary"
                              }`}
                              title="Attempted"
                            >
                              Attempted
                            </button>
                            <button
                              onClick={() => setStatus(problem.id, "solved")}
                              className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 ${
                                status === "solved" ? "bg-emerald-600 text-white font-bold" : "text-muted hover:text-secondary"
                              }`}
                              title="Solved"
                            >
                              <CheckCircle2 size={12} /> Solved
                            </button>
                            <button
                              onClick={() => setStatus(problem.id, "review")}
                              className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 ${
                                status === "review" ? "bg-amber-600 text-white font-bold" : "text-muted hover:text-secondary"
                              }`}
                              title="Needs Review"
                            >
                              <RotateCcw size={12} /> Review
                            </button>
                            <button
                              onClick={() => setStatus(problem.id, "mastered")}
                              className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 ${
                                status === "mastered" ? "bg-purple-600 text-white font-bold" : "text-muted hover:text-secondary"
                              }`}
                              title="Mastered"
                            >
                              <Star size={12} fill="currentColor" /> Mastered
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-muted py-2">No problems match your search criteria in this topic.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Show all sheets catalog
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">DSA Preparation Sheets</h1>
        <p className="text-secondary">Battle-tested curricula from the world&apos;s best educators with interactive tracking, revision queues, and direct problem links.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {dsaSheets.map(sheet => {
          const totalProblems = sheet.topics.reduce((sum, t) => sum + t.problems.length, 0);
          const solvedInThisSheet = sheet.topics.flatMap(t => t.problems).filter(
            p => getStatus(p.id) === "solved" || getStatus(p.id) === "mastered"
          ).length;
          const percent = totalProblems > 0 ? Math.round((solvedInThisSheet / totalProblems) * 100) : 0;

          return (
            <div key={sheet.id} className="card p-6 flex flex-col justify-between hover:border-purple-500/40 transition-all">
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                      <BookOpen size={20} className="text-purple-1" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary">{sheet.name}</h3>
                      <p className="text-xs text-muted">by {sheet.educator}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                    sheet.level === "Beginner" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                    sheet.level === "Intermediate" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                    "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}>
                    {sheet.level}
                  </span>
                </div>

                <p className="text-xs text-secondary mb-5 leading-relaxed line-clamp-2">
                  {sheet.description}
                </p>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted mb-1.5">
                    <span>Progress</span>
                    <span className="font-semibold text-primary">{solvedInThisSheet} / {totalProblems} ({percent}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-1 rounded-full" style={{ width: `${percent}%` }} />
                  </div>
                </div>

                {/* Topics Preview */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {sheet.topics.slice(0, 4).map((t, idx) => (
                    <span key={idx} className="text-[11px] bg-surface-3 px-2 py-0.5 rounded-md text-muted border border-border">
                      {t.name} ({t.problems.length})
                    </span>
                  ))}
                  {sheet.topics.length > 4 && (
                    <span className="text-[11px] bg-surface-3 px-2 py-0.5 rounded-md text-muted">
                      +{sheet.topics.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <Link
                  href={`/preparation/dsa-sheets/${sheet.id}`}
                  className="flex-1 text-center py-2 bg-purple-1 text-white rounded-xl text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  Open Sheet & Tracker →
                </Link>
                <a
                  href={sheet.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-surface-3 hover:bg-surface-hover border border-border text-muted hover:text-secondary rounded-xl text-xs font-medium transition-colors"
                  title="Official Source"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import Image from "next/image";
import { ResourceCard } from "@/components/ui/primitives/ResourceCard";
import { useProgress } from "@/hooks/useProgress";
import { FocusTimer } from "@/components/features/FocusTimer";
import { ProgressRing } from "@/components/ui/ProgressRing";

export function DSASheetsClient({ sheetId }: { sheetId?: string }) {
  const { getStatus, setStatus, isBookmarked, toggleBookmark } = useProgress();

  const selectedSheet = useMemo(() => {
    return sheetId ? dsaSheets.find(s => s.id === sheetId) : null;
  }, [sheetId]);

  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"problems" | "revision">("problems");
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [openTopics, setOpenTopics] = useState<Record<string, boolean>>({});

  const toggleTopic = (topicName: string) => {
    setOpenTopics(prev => ({
      ...prev,
      [topicName]: prev[topicName] === false ? true : false,
    }));
  };

  const isTopicOpen = (topicName: string) => openTopics[topicName] !== false;

  const expandAllTopics = () => {
    if (!selectedSheet) return;
    const nextState: Record<string, boolean> = {};
    selectedSheet.topics.forEach(t => {
      nextState[t.name] = true;
    });
    setOpenTopics(nextState);
  };

  const collapseAllTopics = () => {
    if (!selectedSheet) return;
    const nextState: Record<string, boolean> = {};
    selectedSheet.topics.forEach(t => {
      nextState[t.name] = false;
    });
    setOpenTopics(nextState);
  };

  // Flattened problems for active sheet
  const allSheetProblems = useMemo(() => {
    if (!selectedSheet) return [];
    return selectedSheet.topics.flatMap(t => t.problems);
  }, [selectedSheet]);

  // Overall Stats
  const solvedCount = useMemo(() => {
    return allSheetProblems.filter(
      p => getStatus(p.id) === "solved" || getStatus(p.id) === "mastered"
    ).length;
  }, [allSheetProblems, getStatus]);

  const masteredCount = useMemo(() => {
    return allSheetProblems.filter(p => getStatus(p.id) === "mastered").length;
  }, [allSheetProblems, getStatus]);

  const reviewCount = useMemo(() => {
    return allSheetProblems.filter(p => getStatus(p.id) === "review").length;
  }, [allSheetProblems, getStatus]);

  const progressPercent =
    allSheetProblems.length > 0 ? Math.round((solvedCount / allSheetProblems.length) * 100) : 0;

  // Find next problem to continue
  const nextProblem = useMemo(() => {
    return allSheetProblems.find(p => {
      const s = getStatus(p.id);
      return !s || s === "unsolved" || s === "attempted";
    });
  }, [allSheetProblems, getStatus]);

  if (selectedSheet) {
    const isProblemMatching = (p: Problem) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

        {/* Sheet Header (Inventory §§43-46) */}
        <div className="mb-6 card p-5 sm:p-6 bg-surface-1 border border-border rounded-2xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                <BookOpen size={26} className="text-purple-300" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">
                    {selectedSheet.name}
                  </h1>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                      selectedSheet.level === "Beginner"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : selectedSheet.level === "Intermediate"
                        ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}
                  >
                    {selectedSheet.level}
                  </span>
                </div>

                {/* Byline (§46) */}
                <p className="text-xs text-muted mb-2 font-medium">
                  By {selectedSheet.educator} · {allSheetProblems.length} Problems
                </p>

                {/* Collapsible description (§45) */}
                <div className="text-sm text-secondary max-w-3xl leading-relaxed">
                  <p
                    className={
                      !isDescExpanded && selectedSheet.description.length > 140
                        ? "line-clamp-2"
                        : ""
                    }
                  >
                    {selectedSheet.description}
                  </p>
                  {selectedSheet.description.length > 140 && (
                    <button
                      type="button"
                      onClick={() => setIsDescExpanded(!isDescExpanded)}
                      className="text-xs text-purple-400 hover:text-purple-300 font-semibold mt-1 cursor-pointer"
                    >
                      {isDescExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
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

        {/* Action & Stats Banner (Inventory §47: Progress Ring) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Progress Card with ProgressRing */}
          <div className="card p-5 md:col-span-2 bg-gradient-to-br from-surface-1 to-surface-2 border border-purple-500/20 flex items-center gap-5 rounded-2xl">
            <ProgressRing
              completed={solvedCount}
              total={allSheetProblems.length}
              size={84}
              strokeWidth={7}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Completion Rate
                </span>
                <span className="text-base font-extrabold text-purple-300">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full h-2 bg-surface-3 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted">
                <span>
                  {solvedCount} / {allSheetProblems.length} Solved
                </span>
                <span>
                  {masteredCount} Mastered • {reviewCount} In Revision
                </span>
              </div>
            </div>
          </div>

          {/* Quick Continue Card */}
          <div className="card p-5 md:col-span-2 flex flex-col justify-between bg-surface-2 rounded-2xl">
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

        {/* Focus Timer & Pomodoro Bar */}
        <FocusTimer className="mb-6" />

        {/* View Tabs & Filters */}
        <div className="card p-4 mb-6 space-y-4 rounded-2xl bg-surface-1 border border-border">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("problems")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "problems"
                    ? "bg-purple-1 text-white"
                    : "bg-surface-3 text-muted hover:text-secondary"
                }`}
              >
                <BookOpen size={13} /> All Sheet Problems
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("revision")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "revision"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-surface-3 text-muted hover:text-secondary"
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

        {/* Accordions Header Controls */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs text-muted font-medium">
            {selectedSheet.topics.length} Problem Categories
          </span>
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={expandAllTopics}
              className="text-muted hover:text-primary transition-colors cursor-pointer"
            >
              Expand All
            </button>
            <span className="text-muted">•</span>
            <button
              type="button"
              onClick={collapseAllTopics}
              className="text-muted hover:text-primary transition-colors cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Topics & Problems List (Category Accordions §§48-49) */}
        <div className="space-y-4">
          {selectedSheet.topics.map((topic, topicIdx) => {
            const matchingProblems = topic.problems.filter(isProblemMatching);
            if (
              matchingProblems.length === 0 &&
              (searchQuery ||
                difficultyFilter !== "All" ||
                statusFilter !== "All" ||
                activeTab === "revision")
            ) {
              return null;
            }

            const topicSolved = topic.problems.filter(
              p => getStatus(p.id) === "solved" || getStatus(p.id) === "mastered"
            ).length;
            const isOpen = isTopicOpen(topic.name);
            const topicPercent =
              topic.problems.length > 0
                ? Math.round((topicSolved / topic.problems.length) * 100)
                : 0;

            return (
              <div
                key={topicIdx}
                className="card overflow-hidden border border-border rounded-2xl bg-surface-1 transition-all"
              >
                {/* Category Accordion Header (§48-49) */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleTopic(topic.name)}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleTopic(topic.name);
                    }
                  }}
                  className="flex items-center justify-between p-4 sm:p-5 bg-surface-2/70 hover:bg-surface-2 cursor-pointer transition-colors select-none gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="text-muted shrink-0">
                      {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                    <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold text-primary truncate">
                        {topic.name}
                      </h3>
                      <span className="text-xs bg-surface-3 px-2 py-0.5 rounded-full text-muted font-medium border border-border-soft shrink-0">
                        {topicSolved} / {topic.problems.length} done
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    {/* Mini Progress Bar */}
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-surface-3 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-1 rounded-full transition-all duration-300"
                          style={{ width: `${topicPercent}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-muted w-8 text-right">
                        {topicPercent}%
                      </span>
                    </div>
                    <span className="text-xs text-muted">{matchingProblems.length} visible</span>
                  </div>
                </div>

                {/* Collapsible Problems List */}
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-3 border-t border-border-soft/60 animate-in fade-in duration-150">
                    {matchingProblems.length > 0 ? (
                      <div className="space-y-2.5">
                        {matchingProblems.map(problem => {
                          const status = getStatus(problem.id) || "unsolved";
                          const bookmarked = isBookmarked(problem.id);

                          return (
                            <div
                              key={problem.id}
                              className={`p-3.5 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                                status === "mastered"
                                  ? "bg-purple-950/20 border-purple-500/30"
                                  : status === "solved"
                                  ? "bg-green-950/20 border-green-500/30"
                                  : status === "review"
                                  ? "bg-amber-950/20 border-amber-500/30"
                                  : status === "attempted"
                                  ? "bg-blue-950/20 border-blue-500/30"
                                  : "bg-surface-2 border-border hover:border-border-soft"
                              }`}
                            >
                              <div className="flex items-start gap-3 min-w-0 flex-1">
                                <button
                                  type="button"
                                  onClick={() => toggleBookmark(problem.id)}
                                  className={`p-1 mt-0.5 rounded-md transition-colors cursor-pointer ${
                                    bookmarked
                                      ? "text-amber-400 bg-amber-500/10"
                                      : "text-muted hover:text-secondary"
                                  }`}
                                  title={bookmarked ? "Bookmarked" : "Bookmark Problem"}
                                  aria-label={bookmarked ? "Remove bookmark" : "Bookmark problem"}
                                >
                                  <Bookmark
                                    size={15}
                                    fill={bookmarked ? "currentColor" : "none"}
                                  />
                                </button>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <span className="font-semibold text-sm text-primary">
                                      {problem.title}
                                    </span>
                                    <span
                                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                        problem.difficulty === "Easy"
                                          ? "bg-green-500/10 text-green-400"
                                          : problem.difficulty === "Medium"
                                          ? "bg-orange-500/10 text-orange-400"
                                          : "bg-red-500/10 text-red-400"
                                      }`}
                                    >
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
                                  type="button"
                                  onClick={() => setStatus(problem.id, "unsolved")}
                                  className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                                    status === "unsolved"
                                      ? "bg-surface-hover text-white"
                                      : "text-muted hover:text-secondary"
                                  }`}
                                  title="Unsolved"
                                >
                                  Unsolved
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setStatus(problem.id, "attempted")}
                                  className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                                    status === "attempted"
                                      ? "bg-blue-600 text-white font-bold"
                                      : "text-muted hover:text-secondary"
                                  }`}
                                  title="Attempted"
                                >
                                  Attempted
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setStatus(problem.id, "solved")}
                                  className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                                    status === "solved"
                                      ? "bg-emerald-600 text-white font-bold"
                                      : "text-muted hover:text-secondary"
                                  }`}
                                  title="Solved"
                                >
                                  <CheckCircle2 size={12} /> Solved
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setStatus(problem.id, "review")}
                                  className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                                    status === "review"
                                      ? "bg-amber-600 text-white font-bold"
                                      : "text-muted hover:text-secondary"
                                  }`}
                                  title="Needs Review"
                                >
                                  <RotateCcw size={12} /> Review
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setStatus(problem.id, "mastered")}
                                  className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                                    status === "mastered"
                                      ? "bg-purple-600 text-white font-bold"
                                      : "text-muted hover:text-secondary"
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
                      <p className="text-xs text-muted py-2">
                        No problems match your filter criteria in this category.
                      </p>
                    )}
                  </div>
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
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
          DSA Preparation Sheets
        </h1>
        <p className="text-secondary">
          Curated curricula from top engineers and educators with interactive tracking, revision
          queues, and direct problem links.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {dsaSheets.map(sheet => {
          const totalProblems = sheet.topics.reduce((sum, t) => sum + t.problems.length, 0);
          const solvedInThisSheet = sheet.topics
            .flatMap(t => t.problems)
            .filter(
              p => getStatus(p.id) === "solved" || getStatus(p.id) === "mastered"
            ).length;
          const percent =
            totalProblems > 0 ? Math.round((solvedInThisSheet / totalProblems) * 100) : 0;

          return (
            <ResourceCard
              key={sheet.id}
              title={sheet.name}
              description={`by ${sheet.educator} • ${sheet.description}`}
              badge={{
                text: sheet.level,
                variant: sheet.level === "Beginner" ? "green" : sheet.level === "Intermediate" ? "orange" : "purple",
              }}
              visual={
                sheet.banner ? (
                  <div className="relative w-full aspect-[16/9] overflow-hidden border border-border bg-surface-2 group-hover:scale-[1.01] transition-transform">
                    <Image
                      src={sheet.banner}
                      alt={`${sheet.name} banner`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      priority={sheet.id === "striver-a2z" || sheet.id === "neetcode-150"}
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mb-2">
                    <BookOpen size={20} className="text-purple-300" />
                  </div>
                )
              }
              tags={sheet.topics.slice(0, 4).map(t => `${t.name} (${t.problems.length})`)}
            >
              <div className="mt-2 mb-1">
                <div className="flex justify-between text-xs text-muted mb-1.5">
                  <span>Progress</span>
                  <span className="font-semibold text-primary">
                    {solvedInThisSheet} / {totalProblems} ({percent}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-1 rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              {sheet.topics.length > 4 && (
                <div className="mt-1 text-[11px] text-muted">
                  +{sheet.topics.length - 4} more topics
                </div>
              )}
              
              <div className="flex items-center gap-3 pt-4 mt-2">
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
            </ResourceCard>
          );
        })}
      </div>
    </div>
  );
}

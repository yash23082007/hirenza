"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { companies, Company, CompanyProblem } from "@/data";
import Link from "next/link";
import {
  Search,
  ExternalLink,
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Flame,
  GitCompare,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { ProgressRing } from "@/components/ui/ProgressRing";

export function CompanyWiseClient({ companyId }: { companyId?: string }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const selectedCompanyId = companyId || null;
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [highFreqOnly, setHighFreqOnly] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const { isCompleted, isBookmarked, toggleComplete, toggleBookmark } = useProgress();

  const handleSelectCompany = (id: string | null) => {
    if (id) {
      router.push(`/preparation/company-wise-dsa/${id}`);
    } else {
      router.push("/preparation/company-wise-dsa");
    }
  };

  const selectedCompany = useMemo(() => {
    return selectedCompanyId ? companies.find(c => c.id === selectedCompanyId) : null;
  }, [selectedCompanyId]);

  // Real Readiness Score for a company based on unified progress store
  const calculateReadiness = (company: Company) => {
    if (company.problems.length === 0) return 0;
    const solvedCount = company.problems.filter(p => isCompleted(`comp-${p.id}`)).length;
    return Math.round((solvedCount / company.problems.length) * 100);
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter(
      c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Group company problems by Topic / Category
  const groupedProblems = useMemo(() => {
    if (!selectedCompany) return {};
    const groups: Record<string, CompanyProblem[]> = {};
    selectedCompany.problems.forEach(p => {
      const cat = p.topic || "Core Problems";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    });
    return groups;
  }, [selectedCompany]);

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [cat]: prev[cat] === false ? true : false,
    }));
  };

  const isCategoryOpen = (cat: string) => openCategories[cat] !== false;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Company Wise DSA Preparation
          </h1>
          <p className="text-secondary">
            Target high-frequency interview patterns with automated Company Readiness Scores and
            curated problem archives.
          </p>
        </div>

        <Link
          href="/preparation/company-wise-dsa/compare"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-border text-xs font-mono font-bold text-primary hover:border-purple-1/40 transition-colors shrink-0"
        >
          <GitCompare size={15} className="text-purple-1" />
          <span>Compare Targets</span>
        </Link>
      </div>

      {/* Catalog View */}
      {!selectedCompany && (
        <>
          <div className="mb-6">
            <div className="flex items-center gap-3 bg-surface-2 border border-border rounded-xl px-4 py-3">
              <Search size={16} className="text-muted" />
              <input
                type="text"
                placeholder="Search companies (e.g. Google, Amazon, Microsoft, Meta, Apple, Flipkart...)"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCompanies.map(company => {
              const readiness = calculateReadiness(company);
              const solvedCount = company.problems.filter(p => isCompleted(`comp-${p.id}`)).length;

              return (
                <div
                  key={company.id}
                  onClick={() => handleSelectCompany(company.id)}
                  className="card p-6 cursor-pointer hover:border-purple-500/40 transition-all flex flex-col justify-between group rounded-2xl bg-surface-1 border border-border"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-surface-3 to-surface-2 border border-border flex items-center justify-center font-extrabold text-xl text-primary shadow-sm group-hover:scale-105 transition-transform">
                          {company.logo}
                        </div>
                        <div>
                          <h3 className="font-bold text-base group-hover:text-purple-400 transition-colors">
                            {company.name}
                          </h3>
                          <span className="text-[10px] text-muted font-mono block">
                            {company.problems.length} Curated Questions
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium mt-0.5">
                            <ShieldCheck size={11} /> 2026 Verified
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-extrabold text-purple-1 font-mono">
                          {readiness}%
                        </span>
                        <span className="text-[10px] text-muted block">Ready</span>
                      </div>
                    </div>

                    <p className="text-xs text-secondary leading-relaxed line-clamp-2 mb-4">
                      {company.description}
                    </p>

                    <div className="w-full h-1.5 bg-surface-3 rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full bg-purple-1 rounded-full transition-all"
                        style={{ width: `${readiness}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-muted">
                      <span>{solvedCount} solved</span>
                      <span className="flex items-center gap-1.5">
                        <span className="text-green-400 font-medium">
                          {company.difficultyBreakdown.easy}E
                        </span>
                        <span>•</span>
                        <span className="text-orange-400 font-medium">
                          {company.difficultyBreakdown.medium}M
                        </span>
                        <span>•</span>
                        <span className="text-red-400 font-medium">
                          {company.difficultyBreakdown.hard}H
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border-soft flex items-center justify-between text-xs font-semibold text-purple-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Open Company Track</span>
                    <span>→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Company Detail View (Inventory §§43-49 Chrome Parity) */}
      {selectedCompany && (
        <div>
          <button
            type="button"
            onClick={() => handleSelectCompany(null)}
            className="mb-6 inline-flex items-center gap-1.5 text-xs text-purple-1 hover:underline font-bold cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to all companies
          </button>

          {/* Company Readiness Card with ProgressRing */}
          <div className="card p-6 mb-6 bg-gradient-to-br from-surface-1 to-surface-2 border border-purple-500/20 rounded-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-surface-3 border border-border flex items-center justify-center font-extrabold text-3xl shadow-inner text-purple-400 shrink-0">
                  {selectedCompany.logo}
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-primary">
                    {selectedCompany.name} Tech Interview Hub
                  </h2>
                  <p className="text-xs text-muted font-medium mt-0.5">
                    Curated Interview Track · {selectedCompany.problems.length} Problems
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                      <ShieldCheck size={12} /> Verified for 2026 hiring cycle
                    </span>
                    <span className="text-[11px] text-muted">
                      Triaged from candidate debriefs
                    </span>
                  </div>
                  <div className="text-xs text-secondary mt-1 max-w-xl leading-relaxed">
                    <p
                      className={
                        !isDescExpanded && selectedCompany.description.length > 120
                          ? "line-clamp-2"
                          : ""
                      }
                    >
                      {selectedCompany.description}
                    </p>
                    {selectedCompany.description.length > 120 && (
                      <button
                        type="button"
                        onClick={() => setIsDescExpanded(!isDescExpanded)}
                        className="text-xs text-purple-400 hover:text-purple-300 font-semibold mt-0.5 cursor-pointer"
                      >
                        {isDescExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Readiness Score meter with ProgressRing */}
              <div className="flex items-center gap-5 bg-surface-3 p-4 rounded-2xl border border-border shrink-0">
                <ProgressRing
                  completed={
                    selectedCompany.problems.filter(p => isCompleted(`comp-${p.id}`)).length
                  }
                  total={selectedCompany.problems.length}
                  size={76}
                  strokeWidth={6}
                />
                <div className="text-xs text-muted space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-purple-400 block">
                    Readiness Score
                  </span>
                  <p>
                    Target: <strong>80%+</strong> to clear OA
                  </p>
                  <p>
                    Solved:{" "}
                    <strong>
                      {
                        selectedCompany.problems.filter(p => isCompleted(`comp-${p.id}`)).length
                      }
                    </strong>{" "}
                    / {selectedCompany.problems.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mt-6 pt-5 border-t border-border text-center">
              <div className="bg-surface-3/50 p-2.5 rounded-xl">
                <div className="text-lg font-bold">{selectedCompany.totalQuestions}</div>
                <div className="text-[11px] text-muted">Total Problems</div>
              </div>
              <div className="bg-green-500/5 p-2.5 rounded-xl border border-green-500/10">
                <div className="text-lg font-bold text-green-400">
                  {selectedCompany.difficultyBreakdown.easy}
                </div>
                <div className="text-[11px] text-muted">Easy</div>
              </div>
              <div className="bg-orange-500/5 p-2.5 rounded-xl border border-orange-500/10">
                <div className="text-lg font-bold text-orange-400">
                  {selectedCompany.difficultyBreakdown.medium}
                </div>
                <div className="text-[11px] text-muted">Medium</div>
              </div>
              <div className="bg-red-500/5 p-2.5 rounded-xl border border-red-500/10">
                <div className="text-lg font-bold text-red-400">
                  {selectedCompany.difficultyBreakdown.hard}
                </div>
                <div className="text-[11px] text-muted">Hard</div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 card p-3 bg-surface-2 rounded-xl">
            <div className="flex items-center gap-2">
              <select
                value={difficultyFilter}
                onChange={e => setDifficultyFilter(e.target.value)}
                className="bg-surface-3 border border-border text-secondary rounded-lg px-3 py-1.5 text-xs outline-none"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <button
                type="button"
                onClick={() => setHighFreqOnly(!highFreqOnly)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  highFreqOnly
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-surface-3 text-muted hover:text-secondary"
                }`}
              >
                <Flame size={12} /> High Frequency Only
              </button>
            </div>

            <span className="text-xs text-muted">
              {
                selectedCompany.problems.filter(p => {
                  if (difficultyFilter !== "All" && p.difficulty !== difficultyFilter) return false;
                  if (highFreqOnly && p.frequency !== "High") return false;
                  return true;
                }).length
              }{" "}
              problems shown
            </span>
          </div>

          {/* Category Accordions for Company Problems */}
          <div className="space-y-4">
            {Object.entries(groupedProblems).map(([category, problems]) => {
              const matchingProblems = problems.filter(p => {
                if (difficultyFilter !== "All" && p.difficulty !== difficultyFilter) return false;
                if (highFreqOnly && p.frequency !== "High") return false;
                return true;
              });

              if (matchingProblems.length === 0 && (difficultyFilter !== "All" || highFreqOnly)) {
                return null;
              }

              const catSolved = problems.filter(p => isCompleted(`comp-${p.id}`)).length;
              const isOpen = isCategoryOpen(category);
              const catPercent =
                problems.length > 0 ? Math.round((catSolved / problems.length) * 100) : 0;

              return (
                <div
                  key={category}
                  className="card overflow-hidden border border-border rounded-2xl bg-surface-1"
                >
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleCategory(category)}
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleCategory(category);
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
                          {category}
                        </h3>
                        <span className="text-xs bg-surface-3 px-2 py-0.5 rounded-full text-muted font-medium border border-border-soft shrink-0">
                          {catSolved} / {problems.length} done
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="hidden sm:flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-surface-3 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-1 rounded-full transition-all duration-300"
                            style={{ width: `${catPercent}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-muted w-8 text-right">
                          {catPercent}%
                        </span>
                      </div>
                      <span className="text-xs text-muted">{matchingProblems.length} visible</span>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-3 border-t border-border-soft space-y-2.5 animate-in fade-in duration-150">
                      {matchingProblems.map(problem => {
                        const progressId = `comp-${problem.id}`;
                        const isSolved = isCompleted(progressId);
                        const isStarred = isBookmarked(progressId);

                        return (
                          <div
                            key={problem.id}
                            className={`border rounded-xl p-4 transition-all flex items-center justify-between gap-4 ${
                              isSolved
                                ? "bg-green-950/15 border-green-500/30"
                                : "bg-surface-2 border-border hover:border-purple-500/20"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <button
                                type="button"
                                onClick={() =>
                                  toggleComplete(progressId, {
                                    module: "companies",
                                    topic: problem.topic,
                                    difficulty: problem.difficulty,
                                  })
                                }
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                  isSolved
                                    ? "bg-emerald-500 text-white"
                                    : "bg-surface-3 text-muted hover:text-secondary"
                                }`}
                                title={isSolved ? "Solved" : "Mark as Solved"}
                                aria-label={isSolved ? "Mark incomplete" : "Mark solved"}
                              >
                                <CheckCircle2 size={16} />
                              </button>

                              <button
                                type="button"
                                onClick={() => toggleBookmark(progressId)}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                  isStarred
                                    ? "text-amber-400 bg-amber-500/10"
                                    : "text-muted hover:text-secondary"
                                }`}
                                title={isStarred ? "Bookmarked" : "Bookmark"}
                                aria-label={isStarred ? "Remove bookmark" : "Bookmark"}
                              >
                                <Bookmark size={15} fill={isStarred ? "currentColor" : "none"} />
                              </button>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <h4
                                    className={`font-semibold text-sm ${
                                      isSolved
                                        ? "text-emerald-300 line-through opacity-85"
                                        : "text-primary"
                                    }`}
                                  >
                                    {problem.title}
                                  </h4>
                                  <span
                                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                      problem.difficulty === "Easy"
                                        ? "bg-green-500/10 text-green-400"
                                        : problem.difficulty === "Medium"
                                        ? "bg-orange-500/10 text-orange-400"
                                        : "bg-red-500/10 text-red-400"
                                    }`}
                                  >
                                    {problem.difficulty}
                                  </span>
                                  {problem.frequency === "High" && (
                                    <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full font-bold flex items-center gap-1">
                                      <Flame size={10} /> High Frequency
                                    </span>
                                  )}
                                  {problem.year && (
                                    <span className="text-[10px] text-muted bg-surface-3 px-2 py-0.5 rounded-md">
                                      {problem.year}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-3 text-xs text-muted">
                                  <span>Topic: {problem.topic}</span>
                                  {problem.pattern && <span>• Pattern: {problem.pattern}</span>}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {problem.leetcodeUrl && (
                                <a
                                  href={problem.leetcodeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-3 hover:bg-surface-hover text-purple-1 rounded-lg text-xs font-bold border border-border transition-colors"
                                >
                                  LeetCode <ExternalLink size={12} />
                                </a>
                              )}
                              {problem.gfgUrl && (
                                <a
                                  href={problem.gfgUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-3 hover:bg-surface-hover text-green-400 rounded-lg text-xs font-bold border border-border transition-colors"
                                >
                                  GFG <ExternalLink size={12} />
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

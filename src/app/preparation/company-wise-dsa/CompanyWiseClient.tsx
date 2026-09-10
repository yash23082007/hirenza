"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { companies, Company } from "@/data";
import { Search, ExternalLink, ArrowLeft, Bookmark, CheckCircle2, Flame } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

export function CompanyWiseClient({ companyId }: { companyId?: string }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const selectedCompanyId = companyId || null;
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [highFreqOnly, setHighFreqOnly] = useState(false);

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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Company Wise DSA Preparation</h1>
        <p className="text-secondary">
          Target high-frequency interview patterns with automated Company Readiness Scores and curated problem archives.
        </p>
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
                  className="card p-6 cursor-pointer hover:border-purple-500/40 transition-all flex flex-col justify-between group"
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
                          <p className="text-xs text-muted">{company.totalQuestions} Curated Questions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                            readiness >= 75
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : readiness >= 30
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : "bg-surface-3 text-muted border-border"
                          }`}
                        >
                          {readiness}% Ready
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-secondary mb-4 line-clamp-2 leading-relaxed">
                      {company.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${readiness}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-muted mt-1">
                        <span>{solvedCount} / {company.problems.length} Solved</span>
                        <span>Readiness Index</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border text-xs">
                    <div className="flex gap-2">
                      <span className="text-green-400 font-semibold">{company.difficultyBreakdown.easy}E</span>
                      <span className="text-orange-400 font-semibold">{company.difficultyBreakdown.medium}M</span>
                      <span className="text-red-400 font-semibold">{company.difficultyBreakdown.hard}H</span>
                    </div>
                    <span className="text-purple-1 font-bold group-hover:translate-x-1 transition-transform">
                      Start Practice →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Company Detail View */}
      {selectedCompany && (
        <div>
          <button
            onClick={() => handleSelectCompany(null)}
            className="mb-6 inline-flex items-center gap-1.5 text-xs text-purple-1 hover:underline font-bold cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to all companies
          </button>

          {/* Company Readiness Card */}
          <div className="card p-6 mb-6 bg-gradient-to-br from-surface-1 to-surface-2 border-purple-500/20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-surface-3 border border-border flex items-center justify-center font-extrabold text-3xl shadow-inner text-purple-400">
                  {selectedCompany.logo}
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold">{selectedCompany.name} Tech Interview Hub</h2>
                  <p className="text-xs text-secondary mt-0.5 max-w-xl">{selectedCompany.description}</p>
                </div>
              </div>

              {/* Readiness Score meter */}
              <div className="flex items-center gap-4 bg-surface-3 p-4 rounded-2xl border border-border">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-purple-1">
                    {calculateReadiness(selectedCompany)}%
                  </div>
                  <div className="text-[10px] uppercase font-bold text-muted mt-0.5">Readiness Score</div>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-xs text-muted space-y-0.5">
                  <p>Target: <strong>80%+</strong> to clear OA</p>
                  <p>
                    Solved:{" "}
                    <strong>
                      {selectedCompany.problems.filter(p => isCompleted(`comp-${p.id}`)).length}
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
                <div className="text-lg font-bold text-green-400">{selectedCompany.difficultyBreakdown.easy}</div>
                <div className="text-[11px] text-muted">Easy</div>
              </div>
              <div className="bg-orange-500/5 p-2.5 rounded-xl border border-orange-500/10">
                <div className="text-lg font-bold text-orange-400">{selectedCompany.difficultyBreakdown.medium}</div>
                <div className="text-[11px] text-muted">Medium</div>
              </div>
              <div className="bg-red-500/5 p-2.5 rounded-xl border border-red-500/10">
                <div className="text-lg font-bold text-red-400">{selectedCompany.difficultyBreakdown.hard}</div>
                <div className="text-[11px] text-muted">Hard</div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 card p-3 bg-surface-2">
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

          {/* Problems List */}
          <div className="space-y-2.5">
            {selectedCompany.problems
              .filter(p => {
                if (difficultyFilter !== "All" && p.difficulty !== difficultyFilter) return false;
                if (highFreqOnly && p.frequency !== "High") return false;
                return true;
              })
              .map(problem => {
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
                        onClick={() =>
                          toggleComplete(progressId, {
                            module: "companies",
                            topic: problem.topic,
                            difficulty: problem.difficulty,
                          })
                        }
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isSolved ? "bg-emerald-500 text-white" : "bg-surface-3 text-muted hover:text-secondary"
                        }`}
                        title={isSolved ? "Solved" : "Mark as Solved"}
                      >
                        <CheckCircle2 size={16} />
                      </button>

                      <button
                        onClick={() => toggleBookmark(progressId)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isStarred ? "text-amber-400 bg-amber-500/10" : "text-muted hover:text-secondary"
                        }`}
                        title={isStarred ? "Bookmarked" : "Bookmark"}
                      >
                        <Bookmark size={15} fill={isStarred ? "currentColor" : "none"} />
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h4
                            className={`font-semibold text-sm ${
                              isSolved ? "text-emerald-300 line-through opacity-85" : "text-primary"
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
        </div>
      )}
    </div>
  );
}

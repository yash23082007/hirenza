"use client";

import { useState } from "react";
import { codingProblems, codingContests, practiceRecommendations } from "@/data";
import { Code2, Trophy, Target, ExternalLink, ChevronDown, ChevronUp, Star } from "lucide-react";

export default function CodingPracticePage() {
  const [activeTab, setActiveTab] = useState<"problems" | "contests" | "plan">("problems");
  const [platformFilter, setPlatformFilter] = useState<string>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [skillLevel, setSkillLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [expandedContest, setExpandedContest] = useState<string | null>(null);

  const platforms = ["All", "LeetCode", "Codeforces", "CodeChef"];
  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const categories = ["All", ...new Set(codingProblems.map(p => p.category))];

  const filteredProblems = codingProblems.filter(p => {
    if (platformFilter !== "All" && p.platform !== platformFilter) return false;
    if (difficultyFilter !== "All" && p.difficulty !== difficultyFilter) return false;
    if (categoryFilter !== "All" && p.category !== categoryFilter) return false;
    return true;
  });

  const platformColors: Record<string, string> = {
    "LeetCode": "text-amber-400 bg-amber-500/10",
    "Codeforces": "text-blue-400 bg-blue-500/10",
    "CodeChef": "text-orange-400 bg-orange-500/10",
  };

  const diffColors: Record<string, string> = {
    Easy: "text-green-400 bg-green-500/10",
    Medium: "text-orange-400 bg-orange-500/10",
    Hard: "text-red-400 bg-red-500/10",
  };

  const stats = {
    total: codingProblems.length,
    leetcode: codingProblems.filter(p => p.platform === "LeetCode").length,
    codeforces: codingProblems.filter(p => p.platform === "Codeforces").length,
    codechef: codingProblems.filter(p => p.platform === "CodeChef").length,
    easy: codingProblems.filter(p => p.difficulty === "Easy").length,
    medium: codingProblems.filter(p => p.difficulty === "Medium").length,
    hard: codingProblems.filter(p => p.difficulty === "Hard").length,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Coding Practice</h1>
        <p className="text-secondary">Curated problems from LeetCode, Codeforces & CodeChef to build your competitive programming skills.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-purple-1">{stats.total}</p>
          <p className="text-xs text-muted mt-1">Total Problems</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-amber-400">{stats.leetcode}</p>
          <p className="text-xs text-muted mt-1">LeetCode</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">{stats.codeforces}</p>
          <p className="text-xs text-muted mt-1">Codeforces</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{stats.easy}</p>
          <p className="text-xs text-muted mt-1">Easy</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-orange-400">{stats.medium}</p>
          <p className="text-xs text-muted mt-1">Medium</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-red-400">{stats.hard}</p>
          <p className="text-xs text-muted mt-1">Hard</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border pb-3">
        <button
          onClick={() => setActiveTab("problems")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ${
            activeTab === "problems" ? "bg-surface-2 text-white" : "text-muted hover:text-secondary"
          }`}
        >
          <Code2 size={16} /> Problems
        </button>
        <button
          onClick={() => setActiveTab("contests")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ${
            activeTab === "contests" ? "bg-surface-2 text-white" : "text-muted hover:text-secondary"
          }`}
        >
          <Trophy size={16} /> Contests
        </button>
        <button
          onClick={() => setActiveTab("plan")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ${
            activeTab === "plan" ? "bg-surface-2 text-white" : "text-muted hover:text-secondary"
          }`}
        >
          <Target size={16} /> Practice Plan
        </button>
      </div>

      {/* Problems Tab */}
      {activeTab === "problems" && (
        <div>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <select
              value={platformFilter}
              onChange={e => setPlatformFilter(e.target.value)}
              className="bg-surface-2 border border-border text-white rounded-lg px-3 py-2 text-sm"
            >
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select
              value={difficultyFilter}
              onChange={e => setDifficultyFilter(e.target.value)}
              className="bg-surface-2 border border-border text-white rounded-lg px-3 py-2 text-sm"
            >
              {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="bg-surface-2 border border-border text-white rounded-lg px-3 py-2 text-sm"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <span className="text-sm text-muted self-center">{filteredProblems.length} problems</span>
          </div>

          {/* Problem List */}
          <div className="space-y-2">
            {filteredProblems.map(problem => (
              <div
                key={problem.id}
                className="grid grid-cols-[1fr_auto] items-center gap-3 p-3 border border-border rounded-lg bg-surface hover:bg-surface-2 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-sm hover:text-purple-1 truncate flex items-center gap-1"
                    >
                      {problem.title}
                      <ExternalLink size={12} className="shrink-0" />
                    </a>
                    {problem.frequency === "High" && <Star size={12} className="text-yellow-400 shrink-0" fill="currentColor" />}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${platformColors[problem.platform]}`}>
                      {problem.platform}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${diffColors[problem.difficulty]}`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-xs text-muted">{problem.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredProblems.length === 0 && (
            <p className="text-center text-muted py-12">No problems match your filters.</p>
          )}
        </div>
      )}

      {/* Contests Tab */}
      {activeTab === "contests" && (
        <div className="space-y-4">
          {codingContests.map(contest => (
            <div key={contest.id} className="card overflow-hidden">
              <div
                className="p-5 cursor-pointer"
                onClick={() => setExpandedContest(expandedContest === contest.id ? null : contest.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${platformColors[contest.platform]}`}>
                      <Trophy size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{contest.name}</h3>
                      <p className="text-xs text-muted mb-2">{contest.description}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${platformColors[contest.platform]}`}>
                          {contest.platform}
                        </span>
                        <span className="text-xs text-secondary">{contest.frequency}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {expandedContest === contest.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </div>
              {expandedContest === contest.id && (
                <div className="px-5 pb-5 border-t border-border pt-4">
                  <p className="text-sm text-secondary mb-3">
                    <strong className="text-white">Best for:</strong> {contest.bestFor}
                  </p>
                  <a
                    href={contest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-1 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Visit Contest Page <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Practice Plan Tab */}
      {activeTab === "plan" && (
        <div>
          {/* Skill Level Selector */}
          <div className="flex gap-2 mb-6">
            {(["beginner", "intermediate", "advanced"] as const).map(level => (
              <button
                key={level}
                onClick={() => setSkillLevel(level)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
                  skillLevel === level
                    ? "bg-purple-1 text-white"
                    : "bg-surface-2 text-muted hover:text-secondary border border-border"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Code2 size={18} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">LeetCode</h3>
                  <p className="text-xs text-muted">Structured problem solving</p>
                </div>
              </div>
              <p className="text-sm text-secondary leading-relaxed">
                {practiceRecommendations[skillLevel].leetCode}
              </p>
            </div>

            <div className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Code2 size={18} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Codeforces</h3>
                  <p className="text-xs text-muted">Competitive programming</p>
                </div>
              </div>
              <p className="text-sm text-secondary leading-relaxed">
                {practiceRecommendations[skillLevel].codeforces}
              </p>
            </div>

            <div className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Code2 size={18} className="text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">CodeChef</h3>
                  <p className="text-xs text-muted">Contest practice</p>
                </div>
              </div>
              <p className="text-sm text-secondary leading-relaxed">
                {practiceRecommendations[skillLevel].codechef}
              </p>
            </div>

            <div className="card p-5 border-purple-1/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Target size={18} className="text-purple-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Daily Target</h3>
                  <p className="text-xs text-muted">Recommended practice volume</p>
                </div>
              </div>
              <p className="text-sm text-secondary leading-relaxed font-medium">
                {practiceRecommendations[skillLevel].daily}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">Platform Links</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="card p-5 hover:border-amber-500/50 transition-colors">
                <p className="font-semibold text-sm mb-1">LeetCode</p>
                <p className="text-xs text-muted">Interview-focused problems</p>
              </a>
              <a href="https://codeforces.com" target="_blank" rel="noopener noreferrer" className="card p-5 hover:border-blue-500/50 transition-colors">
                <p className="font-semibold text-sm mb-1">Codeforces</p>
                <p className="text-xs text-muted">Competitive programming</p>
              </a>
              <a href="https://www.codechef.com" target="_blank" rel="noopener noreferrer" className="card p-5 hover:border-orange-500/50 transition-colors">
                <p className="font-semibold text-sm mb-1">CodeChef</p>
                <p className="text-xs text-muted">Contests & practice</p>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

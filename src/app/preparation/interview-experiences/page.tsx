"use client";

import { useState } from "react";
import { interviewExperiencesData } from "@/data";
import { Briefcase, Clock, ChevronDown, ChevronUp, MessageSquare, Lightbulb, CheckCircle2 } from "lucide-react";

export default function InterviewExperiencesPage() {
  const [expandedExp, setExpandedExp] = useState<string | null>(null);
  const [companyFilter, setCompanyFilter] = useState<string>("All");

  const companies = ["All", ...new Set(interviewExperiencesData.map(e => e.company))];
  
  const filtered = companyFilter === "All" 
    ? interviewExperiencesData 
    : interviewExperiencesData.filter(e => e.company === companyFilter);

  const diffColors: Record<string, string> = {
    Easy: "bg-green-500/10 text-green-400",
    Medium: "bg-orange-500/10 text-orange-400",
    Hard: "bg-red-500/10 text-red-400",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Interview Experiences</h1>
        <p className="text-secondary">Real interview round structures from top tech companies. Understand what to expect at each stage.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-purple-1">{interviewExperiencesData.length}</p>
          <p className="text-xs text-muted mt-1">Experiences</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-green-400">
            {interviewExperiencesData.filter(e => e.outcome === "Selected").length}
          </p>
          <p className="text-xs text-muted mt-1">Selections</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-orange-400">
            {new Set(interviewExperiencesData.map(e => e.company)).size}
          </p>
          <p className="text-xs text-muted mt-1">Companies</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">
            {interviewExperiencesData.reduce((sum, e) => sum + e.rounds.length, 0)}
          </p>
          <p className="text-xs text-muted mt-1">Total Rounds</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {companies.map(company => (
          <button
            key={company}
            onClick={() => setCompanyFilter(company)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              companyFilter === company 
                ? "bg-purple-1 text-white" 
                : "bg-surface-2 text-muted hover:text-secondary border border-border"
            }`}
          >
            {company}
          </button>
        ))}
      </div>

      {/* Experiences */}
      <div className="space-y-4">
        {filtered.map(exp => (
          <div key={exp.id} className="card overflow-hidden">
            {/* Header */}
            <div 
              className="p-5 cursor-pointer"
              onClick={() => setExpandedExp(expandedExp === exp.id ? null : exp.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-1/10 flex items-center justify-center shrink-0">
                    <Briefcase size={20} className="text-purple-1" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold">{exp.company}</h3>
                      {exp.outcome === "Selected" && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 flex items-center gap-1">
                          <CheckCircle2 size={10} /> Selected
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm flex-wrap">
                      <span className="text-secondary">{exp.role}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${diffColors[exp.difficulty]}`}>
                        {exp.difficulty}
                      </span>
                      <span className="text-xs text-muted">{exp.date}</span>
                    </div>
                    <p className="text-xs text-muted mt-2">
                      {exp.rounds.length} rounds • Topics: {exp.topics.slice(0, 3).join(", ")}{exp.topics.length > 3 ? ` +${exp.topics.length - 3} more` : ""}
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  {expandedExp === exp.id ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedExp === exp.id && (
              <div className="border-t border-border px-5 pb-5 pt-4">
                {/* Rounds */}
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
                    <MessageSquare size={14} /> Interview Rounds
                  </h4>
                  <div className="space-y-3">
                    {exp.rounds.map((round, idx) => (
                      <div key={idx} className="bg-surface-2 rounded-lg p-4 border border-border">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-purple-1/20 flex items-center justify-center text-xs font-bold text-purple-1">
                              {idx + 1}
                            </div>
                            <p className="font-semibold text-sm">{round.name}</p>
                          </div>
                          {round.duration && (
                            <div className="flex items-center gap-1 text-xs text-muted shrink-0">
                              <Clock size={12} />
                              {round.duration}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-secondary mb-2">{round.description}</p>
                        {round.sampleQuestions && round.sampleQuestions.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-border/50">
                            <p className="text-xs font-medium text-muted mb-1">Sample Questions:</p>
                            <ul className="space-y-1">
                              {round.sampleQuestions.map((q, qi) => (
                                <li key={qi} className="text-xs text-secondary flex items-start gap-1.5">
                                  <span className="text-purple-1 mt-0.5">→</span>
                                  <span className="italic">{q}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-muted mb-2">Topics Covered</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-surface-3 border border-border-soft rounded-lg"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                {exp.tips && exp.tips.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted mb-2 flex items-center gap-1">
                      <Lightbulb size={12} /> Tips from this experience
                    </p>
                    <div className="bg-surface-2 rounded-lg p-4 border border-border">
                      <ul className="space-y-1.5">
                        {exp.tips.map((tip, idx) => (
                          <li key={idx} className="text-xs text-secondary flex items-start gap-2">
                            <span className="text-green-400 mt-0.5">✓</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <span className="text-xs text-muted">By {exp.submittedBy}</span>
                  <span className="text-xs text-muted">{exp.date}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted py-12">No experiences found for this filter.</p>
      )}
    </div>
  );
}

"use client";

import { Suspense, useState, useMemo, useSyncExternalStore } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { interviewExperiencesData, InterviewExperience } from "@/data";
import {
  Briefcase,
  Clock,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Lightbulb,
  CheckCircle2,
  PlusCircle,
  X,
  ShieldCheck,
  Send,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/primitives/SectionHeading";
import { GiscusEmbed } from "@/components/community/GiscusEmbed";

function InterviewExperiencesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [expandedExp, setExpandedExp] = useState<string | null>(null);

  const companyFilter = searchParams.get("company") || "All";

  const handleSelectCompany = (company: string) => {
    if (company !== "All") {
      router.replace(
        `/preparation/interview-experiences?company=${encodeURIComponent(company)}`,
        { scroll: false }
      );
    } else {
      router.replace("/preparation/interview-experiences", { scroll: false });
    }
  };

  const allExperiences = interviewExperiencesData;

  const companies = useMemo(
    () => ["All", ...new Set(allExperiences.map(e => e.company))],
    [allExperiences]
  );

  const filtered = useMemo(() => {
    return companyFilter === "All"
      ? allExperiences
      : allExperiences.filter(e => e.company === companyFilter);
  }, [allExperiences, companyFilter]);

  const diffColors: Record<string, string> = {
    Easy: "bg-green-500/10 text-green-400 border border-green-500/20",
    Medium: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    Hard: "bg-red-500/10 text-red-400 border border-red-500/20",
  };

  const diffColors: Record<string, string> = {
    Easy: "bg-green-500/10 text-green-400 border border-green-500/20",
    Medium: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    Hard: "bg-red-500/10 text-red-400 border border-red-500/20",
  };

  return (
    <div className="space-y-6">
      {/* Section Heading with Submit Action (T8.4) */}
      <SectionHeading
        eyebrow="Community Interview Debriefs"
        title="Technical Interview Experiences"
        subtitle="Real round breakdowns from top tech companies. Understand what to expect at each stage from online assessments to system design and executive fit."
        actions={
          <button
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-1 hover:opacity-90 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <PlusCircle size={15} />
            <span>Submit Your Experience</span>
          </button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="card p-4 text-center rounded-2xl bg-surface-1 border border-border">
          <p className="text-2xl font-bold text-purple-300">{allExperiences.length}</p>
          <p className="text-xs text-muted mt-1">Verified Experiences</p>
        </div>
        <div className="card p-4 text-center rounded-2xl bg-surface-1 border border-border">
          <p className="text-2xl font-bold text-green-400">
            {allExperiences.filter(e => e.outcome === "Selected").length}
          </p>
          <p className="text-xs text-muted mt-1">Offer Selections</p>
        </div>
        <div className="card p-4 text-center rounded-2xl bg-surface-1 border border-border">
          <p className="text-2xl font-bold text-orange-400">
            {new Set(allExperiences.map(e => e.company)).size}
          </p>
          <p className="text-xs text-muted mt-1">Companies Tracked</p>
        </div>
        <div className="card p-4 text-center rounded-2xl bg-surface-1 border border-border">
          <p className="text-2xl font-bold text-blue-400">
            {allExperiences.reduce((sum, e) => sum + e.rounds.length, 0)}
          </p>
          <p className="text-xs text-muted mt-1">Total Rounds Analyzed</p>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-1.5">
        {companies.map(company => (
          <button
            key={company}
            type="button"
            onClick={() => handleSelectCompany(company)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              companyFilter === company
                ? "bg-purple-1 text-white shadow-sm"
                : "bg-surface-2 text-muted hover:text-secondary border border-border hover:border-purple-1/20"
            }`}
          >
            {company}
          </button>
        ))}
      </div>

      {/* Experiences List */}
      <div className="space-y-4">
        {filtered.map(exp => (
          <div
            key={exp.id}
            className="card overflow-hidden rounded-2xl bg-surface-1 border border-border hover:border-purple-500/30 transition-all"
          >
            {/* Header */}
            <div
              className="p-5 cursor-pointer hover:bg-surface-hover/50 transition-colors select-none"
              onClick={() => setExpandedExp(expandedExp === exp.id ? null : exp.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-purple-1/10 border border-purple-500/20 flex items-center justify-center shrink-0 text-purple-300">
                    <Briefcase size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-primary truncate">
                        {exp.company}
                      </h3>
                      {exp.outcome === "Selected" && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 flex items-center gap-1 font-medium">
                          <CheckCircle2 size={11} /> Offer Received
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-3 text-muted border border-border-soft flex items-center gap-1">
                        <ShieldCheck size={11} className="text-purple-400" />
                        {exp.verificationStatus === "verified"
                          ? `Verified ${exp.date}`
                          : exp.verificationStatus === "pending"
                            ? "Pending review"
                            : "Community report"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs sm:text-sm flex-wrap">
                      <span className="text-secondary font-medium">{exp.role}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          diffColors[exp.difficulty]
                        }`}
                      >
                        {exp.difficulty}
                      </span>
                      <span className="text-xs text-muted font-mono">{exp.date}</span>
                    </div>

                    <p className="text-xs text-muted mt-2 truncate">
                      {exp.rounds.length} rounds • Topics: {exp.topics.slice(0, 3).join(", ")}
                      {exp.topics.length > 3 ? ` +${exp.topics.length - 3} more` : ""}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 p-1 text-muted">
                  {expandedExp === exp.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedExp === exp.id && (
              <div className="border-t border-border px-5 pb-5 pt-4 bg-surface-2/40 animate-in fade-in duration-150">
                {/* Rounds */}
                <div className="mb-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-3 flex items-center gap-2">
                    <MessageSquare size={13} className="text-purple-400" /> Interview Rounds
                  </h4>
                  <div className="space-y-3">
                    {exp.rounds.map((round, idx) => (
                      <div
                        key={idx}
                        className="bg-surface-2 rounded-xl p-4 border border-border"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-purple-1/20 flex items-center justify-center text-xs font-bold text-purple-300">
                              {idx + 1}
                            </div>
                            <p className="font-semibold text-sm text-primary">{round.name}</p>
                          </div>
                          {round.duration && (
                            <div className="flex items-center gap-1 text-xs text-muted shrink-0">
                              <Clock size={12} />
                              {round.duration}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-secondary mb-2 leading-relaxed">
                          {round.description}
                        </p>
                        {round.sampleQuestions && round.sampleQuestions.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-border/50">
                            <p className="text-xs font-medium text-muted mb-1">
                              Sample Questions Asked:
                            </p>
                            <ul className="space-y-1">
                              {round.sampleQuestions.map((q, qi) => (
                                <li
                                  key={qi}
                                  className="text-xs text-secondary flex items-start gap-1.5"
                                >
                                  <span className="text-purple-400 mt-0.5 font-bold">→</span>
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
                  <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    Topics Tested
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 bg-surface-3 border border-border-soft rounded-lg text-primary font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                {exp.tips && exp.tips.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2 flex items-center gap-1.5">
                      <Lightbulb size={13} className="text-amber-400" /> Candidate Preparation Insights
                    </p>
                    <div className="bg-surface-2 rounded-xl p-4 border border-border">
                      <ul className="space-y-1.5">
                        {exp.tips.map((tip, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-secondary flex items-start gap-2"
                          >
                            <span className="text-green-400 mt-0.5 font-bold">✓</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs text-muted">
                  <span>
                    Submitted by: <strong>{exp.submittedBy}</strong>
                  </span>
                  <span className="font-mono">{exp.date}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted py-12">No experiences found for this filter.</p>
      )}

      {/* Submit Experience CTA */}
      <div className="card p-6 text-center rounded-2xl bg-surface-1 border border-border mt-6">
        <h3 className="text-base font-bold text-primary mb-1">Want to share your interview experience?</h3>
        <p className="text-xs text-muted mb-4">Help fellow candidates by contributing your debrief to our community archive.</p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSc_example_form/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-1 hover:opacity-90 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
        >
          <PlusCircle size={15} />
          Submit your experience
        </a>
      </div>

      {/* Community discussions (T8.1) */}
      <GiscusEmbed />
    </div>
  );
}

export default function InterviewExperiencesPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-muted">Loading interview experiences...</div>
      }
    >
      <InterviewExperiencesContent />
    </Suspense>
  );
}

"use client";

import { useState } from "react";
// import  from "next/link";
import { MarketingNavbar } from "@/components/navigation/MarketingNavbar";
import { Footer } from "@/components/marketing/Footer";
import { useProgress } from "@/hooks/useProgress";
import { generateStudyPlan, PlanAnswers, StudyPlan } from "@/lib/plan";
import {
  Compass,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Printer,
  ExternalLink,
  Target,
} from "lucide-react";

const COMPANIES = ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Flipkart", "General Tech"];
const ROLES = ["Backend Engineer", "Frontend Engineer", "Full Stack Engineer", "DevOps / SRE", "Mobile Engineer"];
const TIMELINES: { label: string; days: 30 | 60 | 90; sub: string }[] = [
  { label: "30-Day Sprint", days: 30, sub: "High-intensity crunch for upcoming onsites" },
  { label: "60-Day Standard", days: 60, sub: "Recommended cadence for structured depth" },
  { label: "90-Day Mastery", days: 90, sub: "Complete foundations + hard problems" },
];
const LEVELS: ("Beginner" | "Intermediate" | "Advanced")[] = ["Beginner", "Intermediate", "Advanced"];
const HOURS = [1, 2, 4];

export function OnboardingClient() {
  const { updateProfile } = useProgress();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<PlanAnswers>({
    targetCompany: "Google",
    role: "Backend Engineer",
    timelineDays: 60,
    level: "Intermediate",
    hoursPerDay: 2,
  });

  const [generatedPlan, setGeneratedPlan] = useState<StudyPlan | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Generate plan
      const plan = generateStudyPlan(answers);
      setGeneratedPlan(plan);

      // Calculate target date
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + answers.timelineDays);

      // Save to profile
      updateProfile({
        targetCompany: answers.targetCompany,
        hoursPerDay: answers.hoursPerDay,
        targetDate: targetDate.toISOString().split("T")[0],
      });
    }
  };

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-background">
      <MarketingNavbar />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        {!generatedPlan ? (
          /* Intake Wizard */
          <div className="rounded-3xl border border-border bg-surface-1 p-6 md:p-10 shadow-xl space-y-8">
            {/* Progress indicator */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-1 uppercase">
                <Compass size={14} />
                <span>Step {step} of 5 · Intake Blueprint</span>
              </div>
              <span className="text-xs font-mono text-muted">
                {Math.round((step / 5) * 100)}% Complete
              </span>
            </div>

            {/* Step 1: Target Company */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
                  Which company are you preparing for?
                </h2>
                <p className="text-sm text-secondary">
                  Your plan prioritizes problems and question categories frequently reported in this company&apos;s interview loops.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {COMPANIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setAnswers({ ...answers, targetCompany: c })}
                      className={`p-4 rounded-2xl border text-sm font-semibold text-center transition-all ${answers.targetCompany === c
                          ? "bg-purple-1 text-white border-purple-1 shadow-md"
                          : "bg-surface-2 border-border text-secondary hover:border-border-hover"
                        }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Role */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in">
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
                  What is your primary engineering focus?
                </h2>
                <p className="text-sm text-secondary">
                  Tailors system design topics, language fundamentals, and architectural questions to your target domain.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      onClick={() => setAnswers({ ...answers, role: r })}
                      className={`p-4 rounded-2xl border text-sm font-semibold text-left transition-all ${answers.role === r
                          ? "bg-purple-1 text-white border-purple-1 shadow-md"
                          : "bg-surface-2 border-border text-secondary hover:border-border-hover"
                        }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Timeline */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in">
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
                  What is your target preparation duration?
                </h2>
                <p className="text-sm text-secondary">
                  Determines curriculum velocity, weekly problem milestones, and spaced repetition intervals.
                </p>
                <div className="space-y-3 pt-2">
                  {TIMELINES.map((t) => (
                    <button
                      key={t.days}
                      onClick={() => setAnswers({ ...answers, timelineDays: t.days })}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${answers.timelineDays === t.days
                          ? "bg-purple-1 text-white border-purple-1 shadow-md"
                          : "bg-surface-2 border-border text-secondary hover:border-border-hover"
                        }`}
                    >
                      <div>
                        <div className="font-bold text-base">{t.label}</div>
                        <div className={`text-xs ${answers.timelineDays === t.days ? "text-white/80" : "text-muted"}`}>
                          {t.sub}
                        </div>
                      </div>
                      <Calendar size={18} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Level */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in">
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
                  How would you rate your current DSA proficiency?
                </h2>
                <p className="text-sm text-secondary">
                  Calibrates starting difficulty so you don&apos;t get stuck on Hard problems prematurely.
                </p>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {LEVELS.map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setAnswers({ ...answers, level: lvl })}
                      className={`p-4 rounded-2xl border text-sm font-semibold text-center transition-all ${answers.level === lvl
                          ? "bg-purple-1 text-white border-purple-1 shadow-md"
                          : "bg-surface-2 border-border text-secondary hover:border-border-hover"
                        }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Daily Bandwidth */}
            {step === 5 && (
              <div className="space-y-4 animate-in fade-in">
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
                  How many hours per day can you dedicate?
                </h2>
                <p className="text-sm text-secondary">
                  Realism is vital. We calculate your target completion velocity based on consistent daily practice.
                </p>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {HOURS.map((h) => (
                    <button
                      key={h}
                      onClick={() => setAnswers({ ...answers, hoursPerDay: h })}
                      className={`p-4 rounded-2xl border text-center transition-all ${answers.hoursPerDay === h
                          ? "bg-purple-1 text-white border-purple-1 shadow-md"
                          : "bg-surface-2 border-border text-secondary hover:border-border-hover"
                        }`}
                    >
                      <div className="text-2xl font-bold font-mono">{h} {h === 1 ? "hr" : "hrs"}</div>
                      <div className="text-xs text-muted font-mono mt-0.5">per day</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Wizard Navigation Footer */}
            <div className="flex items-center justify-between border-t border-border pt-6">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-border text-xs font-semibold text-secondary hover:text-primary transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-1 text-white text-xs font-semibold hover:opacity-90 transition-opacity ml-auto"
              >
                <span>{step === 5 ? "Generate Custom Plan" : "Continue"}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          /* Generated Plan View */
          <div className="space-y-8 animate-in fade-in">
            {/* Plan Header */}
            <div className="rounded-3xl border border-border bg-surface-1 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
                  <Sparkles size={12} />
                  <span>Personalized {generatedPlan.timelineDays}-Day Curriculum</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-primary">
                  {generatedPlan.targetCompany} Engineering Blueprint
                </h1>
                <p className="text-sm text-secondary mt-1">
                  Target: {generatedPlan.role} · {generatedPlan.totalWeeks} Weeks · ~{generatedPlan.estimatedHours} Total Practice Hours
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-border text-xs font-semibold text-primary hover:border-border-hover transition-colors"
                >
                  <Printer size={14} />
                  <span>Print Plan</span>
                </button>

                <Link
                  href="/preparation"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-1 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  <span>Go to Cockpit</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Weeks Accordion / List */}
            <div className="space-y-6">
              {generatedPlan.weeks.map((week) => (
                <div
                  key={week.weekNumber}
                  className="rounded-2xl border border-border bg-surface-1/60 p-6 md:p-8 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                    <div>
                      <span className="text-xs font-mono uppercase font-bold text-purple-1">
                        Week {week.weekNumber} Milestone
                      </span>
                      <h3 className="text-lg font-bold text-primary mt-0.5">{week.theme}</h3>
                    </div>
                    <span className="text-xs font-mono text-muted bg-surface-2 px-3 py-1 rounded-full border border-border">
                      {week.focusArea}
                    </span>
                  </div>

                  <div className="space-y-3 pt-2">
                    {week.tasks.map((task) => {
                      const isDone = Boolean(completedTasks[task.id]);

                      return (
                        <div
                          key={task.id}
                          className={`p-4 rounded-xl border flex items-start justify-between gap-4 transition-all ${isDone
                              ? "bg-emerald-500/5 border-emerald-500/30 opacity-70"
                              : "bg-surface-2 border-border hover:border-border-hover"
                            }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleTask(task.id)}
                              className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center transition-colors ${isDone
                                  ? "bg-emerald-500 border-emerald-500 text-black"
                                  : "border-border bg-surface-3 hover:border-purple-1"
                                }`}
                              aria-label="Mark task done"
                            >
                              {isDone && <CheckCircle2 size={14} />}
                            </button>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-bold ${isDone ? "line-through text-muted" : "text-primary"}`}>
                                  {task.title}
                                </span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-3 text-secondary">
                                  {task.category}
                                </span>
                              </div>
                              <p className="text-xs text-secondary mt-0.5 leading-relaxed">
                                {task.description}
                              </p>
                            </div>
                          </div>

                          <Link
                            href={task.deepLink}
                            className="inline-flex items-center gap-1 text-xs font-mono text-purple-1 hover:underline shrink-0"
                          >
                            <span>Open</span>
                            <ExternalLink size={12} />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

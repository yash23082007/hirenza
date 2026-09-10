"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { analyzeBullets } from "@/lib/ats";
import { FileText, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";

const SAMPLE_BULLETS = `Architected and deployed microservices using Go and gRPC, reducing P99 API latency by 34%.
Responsible for fixing bugs and worked on frontend React components.
Integrated Redis cluster caching layer handling 15,000+ RPS under peak load.
Automated CI/CD deployment pipeline with GitHub Actions, cutting release overhead by 45 minutes.`;

export function ATSLinterDemo() {
  const [text, setText] = useState(SAMPLE_BULLETS);

  const report = useMemo(() => {
    return analyzeBullets(text);
  }, [text]);

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 my-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <FileText size={13} />
          <span>Client-Side ATS Scanner</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-3">
          Test your resume bullets before applying
        </h2>
        <p className="text-sm md:text-base text-secondary max-w-xl mx-auto">
          Screening filters drop 75% of engineering resumes for lack of metrics and passive verbs. Paste your bullets below for instant client-side analysis.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 rounded-3xl border border-border bg-surface-1 p-6 md:p-8 shadow-xl">
        {/* Left: Interactive Input Area */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <label htmlFor="ats-bullet-input" className="text-xs font-mono uppercase tracking-wider text-muted font-bold">
                Experience Bullets (1 per line)
              </label>
              <button
                onClick={() => setText(SAMPLE_BULLETS)}
                className="text-[11px] font-mono text-purple-1 hover:underline cursor-pointer"
              >
                Reset to Sample
              </button>
            </div>

            <textarea
              id="ats-bullet-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              className="w-full rounded-2xl border border-border bg-surface-2 p-4 text-xs md:text-sm font-mono text-primary outline-none focus:border-purple-1/60 transition-colors resize-none leading-relaxed"
              placeholder="Paste your resume bullet points here..."
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <span className="text-xs text-muted font-mono">
              Evaluated 100% in browser · Zero network requests
            </span>
            <Link
              href="/preparation/resume-templates"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-1 hover:text-purple-300 transition-colors"
            >
              <span>Full Resume Guide</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Right: Instant Score & Audit Breakdown */}
        <div className="md:col-span-5 rounded-2xl border border-border bg-surface-2 p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-muted font-bold">
                ATS Scorecard
              </span>
              <span
                className={`text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-full ${
                  report.grade === "A"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : report.grade === "B"
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                }`}
              >
                Grade {report.grade}
              </span>
            </div>

            {/* Big Score Gauge */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-5xl font-extrabold font-mono text-primary">{report.score}</span>
              <span className="text-sm font-mono text-muted">/ 100</span>
            </div>

            <p className="text-xs text-secondary leading-relaxed mb-6">
              {report.summary}
            </p>

            {/* Metric Pills */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-3 text-xs">
                <span className="text-secondary flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Strong Action Verbs</span>
                </span>
                <span className="font-mono font-bold text-primary">
                  {report.strongVerbsCount} / {report.totalBullets}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-3 text-xs">
                <span className="text-secondary flex items-center gap-2">
                  <Sparkles size={14} className="text-purple-1" />
                  <span>Quantified Metrics</span>
                </span>
                <span className="font-mono font-bold text-primary">
                  {report.metricsCount} / {report.totalBullets}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-3 text-xs">
                <span className="text-secondary flex items-center gap-2">
                  <AlertTriangle size={14} className={report.weakPhrasesCount > 0 ? "text-amber-400" : "text-muted"} />
                  <span>Passive Phrasing</span>
                </span>
                <span className={`font-mono font-bold ${report.weakPhrasesCount > 0 ? "text-amber-400" : "text-emerald-400"}`}>
                  {report.weakPhrasesCount} flagged
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/preparation/resume-templates"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-1 text-white font-semibold text-xs hover:opacity-90 transition-opacity"
          >
            <span>Open ATS Resume Builder</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

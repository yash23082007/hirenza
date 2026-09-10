"use client";

import { useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { ShieldCheck, HardDrive, Download, EyeOff, FileJson, Check } from "lucide-react";

export function PrivacyPanel() {
  const { data, exportData } = useProgress();
  const [copied, setCopied] = useState(false);

  const solvedCount = Object.values(data.statuses).filter((s) => s === "solved" || s === "mastered").length;

  const handleExport = () => {
    exportData();
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 my-8">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-surface-2 via-surface-1 to-surface-2 p-8 md:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-1/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <ShieldCheck size={14} />
            <span>Private by Architecture</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Your prep data belongs to you. Not our database.
          </h2>
          <p className="text-base text-secondary leading-relaxed">
            Most platforms lock your progress behind an account, sell recruiter analytics, or paywall your history. Hirenza operates on a zero-server-state model. Everything is stored locally on your machine with 1-click JSON portability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="border border-border rounded-2xl p-6 bg-surface-1/60">
            <div className="w-10 h-10 rounded-xl bg-purple-1/10 flex items-center justify-center text-purple-1 mb-4">
              <EyeOff size={20} />
            </div>
            <h3 className="text-base font-bold text-primary mb-2">Zero Tracking or Telemetry</h3>
            <p className="text-xs text-secondary leading-relaxed">
              No tracking pixels, third-party analytics scripts, or session recordings. What you solve and when you solve it is strictly your business.
            </p>
          </div>

          <div className="border border-border rounded-2xl p-6 bg-surface-1/60">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
              <HardDrive size={20} />
            </div>
            <h3 className="text-base font-bold text-primary mb-2">Offline-First Local Storage</h3>
            <p className="text-xs text-secondary leading-relaxed">
              All problem statuses, bookmarks, revision intervals, and study streaks persist in standard browser <code className="text-primary font-mono">localStorage</code>.
            </p>
          </div>

          <div className="border border-border rounded-2xl p-6 bg-surface-1/60">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
              <FileJson size={20} />
            </div>
            <h3 className="text-base font-bold text-primary mb-2">1-Click JSON Portability</h3>
            <p className="text-xs text-secondary leading-relaxed">
              Switching laptops? Backing up before clearing cache? Export your complete state anytime as a verified JSON payload and restore it instantly.
            </p>
          </div>
        </div>

        {/* Live Export & Verification Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-surface-2">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Active local session: <strong className="font-mono text-emerald-400">{solvedCount}</strong> problems solved or in-progress
            </span>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-1 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            {copied ? <Check size={16} /> : <Download size={16} />}
            <span>{copied ? "JSON Exported!" : "Export Progress JSON"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { RevealSection } from "./FeatureShowcase";
import { ExternalLink, Code2 } from "lucide-react";
import Link from "next/link";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function CreatorSection() {
  return (
    <RevealSection className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Code2 size={13} />
            <span>The Engineering Story</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Built for <span className="text-brand-gradient">focused preparation.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-center bg-surface-2 border border-border rounded-3xl p-8 md:p-12">
          {/* Left - Profile */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-3xl font-extrabold text-white mb-4 shadow-lg shadow-purple-500/20 border border-purple-400/20">
              YV
            </div>
            <h3 className="text-xl font-bold text-primary">Yash Vijay</h3>
            <p className="text-xs text-purple-400 font-semibold mb-4">Creator & Software Engineer</p>
            
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/yash23082007"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface-3 border border-border text-secondary hover:text-primary hover:border-purple-500/30 transition-colors"
                title="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://linkedin.com/in/yash-vijay-b4369a285"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface-3 border border-border text-secondary hover:text-primary hover:border-purple-500/30 transition-colors"
                title="LinkedIn"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Right - Philosophy & Links */}
          <div className="space-y-4 text-secondary leading-relaxed">
            <p className="text-base md:text-lg text-primary font-medium">
              Technical interview preparation does not require paywalls, locked roadmaps, or telemetry.
            </p>
            <p className="text-sm md:text-base">
              Hirenza was built to eradicate the context-switching penalty. Rather than juggling disconnected spreadsheets, video playlists, and bookmark folders, all curated sheets, patterns, company archives, and SQL problems run in one unified offline-first cockpit.
            </p>
            <p className="text-sm md:text-base">
              Every feature runs 100% in your browser with zero AI gimmicks, zero tracking cookies, and transparent client-side storage.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/yash23082007"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-surface-3 hover:bg-surface-hover border border-border text-primary transition-all"
              >
                <GithubIcon size={14} />
                Connect on GitHub
              </a>
              <Link
                href="/preparation"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-md shadow-purple-600/20"
              >
                Launch Workspace →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}


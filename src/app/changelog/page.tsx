import type { Metadata } from "next";
import Link from "next/link";
import { MarketingNavbar } from "@/components/navigation/MarketingNavbar";
import { Footer } from "@/components/marketing/Footer";
import { GitCommit, Tag, Sparkles, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Changelog — What's New in Hirenza",
  description: "Detailed release notes and platform architecture updates across Hirenza's offline-first preparation engine.",
};

interface Release {
  version: string;
  date: string;
  tagline: string;
  highlights: {
    category: "Added" | "Changed" | "Fixed" | "Performance";
    items: string[];
  }[];
}

const RELEASES: Release[] = [
  {
    version: "2.1.0",
    date: "September 10, 2026",
    tagline: "Asynchronous Next 16 core, GitHub community band, and data integrity engine",
    highlights: [
      {
        category: "Added",
        items: [
          "Async params migration across all dynamic routes ([patternId], [companyId], [sheetId], [tech]) with strict notFound() error boundaries.",
          "Live GitHub community band with stars, forks, and MIT license telemetry.",
          "Client-side Privacy Engine panel with 1-click JSON progress export and import verification.",
          "Rotating technical announcement bar with localStorage dismissal tracking.",
          "Automated Vitest regression tests covering cross-module key collisions and catalog integrity.",
        ],
      },
      {
        category: "Fixed",
        items: [
          "Resolved cross-module problem collision between Arsh Goyal and Amazon tracks by namespacing IDs.",
          "Canonicalized all company problem progress keys to comp-* across dashboard and search palette.",
          "Migrated 20-Patterns client state onto global ProgressContext with one-way localStorage migration.",
        ],
      },
    ],
  },
  {
    version: "2.0.0",
    date: "August 28, 2026",
    tagline: "4-state problem lifecycle, Leitner spaced repetition, and company readiness engine",
    highlights: [
      {
        category: "Added",
        items: [
          "4-state tracking machine: Todo → In-Progress → Solved → Mastered.",
          "Leitner Box spaced repetition schedule automatically computing decay-resistant review intervals.",
          "Target Company Readiness score calculating high-frequency problem coverage and pattern distribution.",
          "Global ⌘K command palette with instant Fuse.js fuzzy indexing over 600+ questions.",
        ],
      },
      {
        category: "Changed",
        items: [
          "Complete voice de-cloning and engineering redesign with bespoke technical aesthetic.",
          "Dynamic data-driven sidebar navigation mapped directly from curriculum source files.",
        ],
      },
    ],
  },
  {
    version: "1.1.0",
    date: "August 1, 2026",
    tagline: "Flagship DSA sheets, production SQL challenges, and core engineering notes",
    highlights: [
      {
        category: "Added",
        items: [
          "Striver A2Z DSA sheet and NeetCode 150 structured curriculum tracks.",
          "Production SQL questions covering recursive CTEs, window functions, and indexing strategies.",
          "High-Level and Low-Level System Design architectural blueprints.",
          "Offline-first reference notes for Operating Systems, DBMS internals, and Computer Networks.",
        ],
      },
    ],
  },
  {
    version: "1.0.0",
    date: "July 15, 2026",
    tagline: "Initial release of Hirenza: Offline-first developer interview workspace",
    highlights: [
      {
        category: "Added",
        items: [
          "100% client-side data persistence with zero account or authentication requirement.",
          "High-signal curation of tech interview resources for software engineers.",
          "Dark-mode first interface with responsive CSS grid system.",
        ],
      },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-background">
      <MarketingNavbar />

      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-1/10 border border-purple-1/30 text-purple-1 text-xs font-mono mb-4">
            <Tag size={12} />
            <span>Public Release Log</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-primary">
            Platform Changelog
          </h1>
          <p className="text-lg text-secondary max-w-xl mx-auto">
            Transparent release history of Hirenza. Every improvement is client-side, offline-first, and documented.
          </p>
        </div>

        <div className="relative border-l border-border pl-6 md:pl-10 space-y-12">
          {RELEASES.map((release) => (
            <article key={release.version} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-surface-1 border-2 border-purple-1 flex items-center justify-center text-purple-1">
                <GitCommit size={14} />
              </div>

              <div className="card p-6 md:p-8 border-border bg-surface-1/60 hover:border-purple-1/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold font-mono text-primary">v{release.version}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-surface-2 border border-border text-muted font-mono">
                      {release.date}
                    </span>
                  </div>
                </div>

                <p className="text-sm font-medium text-primary mb-6">{release.tagline}</p>

                <div className="space-y-6">
                  {release.highlights.map((h, i) => (
                    <div key={i} className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-1 font-mono">
                        {h.category}
                      </span>
                      <ul className="space-y-1.5 list-disc list-inside text-xs text-secondary leading-relaxed">
                        {h.items.map((item, itemIdx) => (
                          <li key={itemIdx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center border-t border-border pt-12">
          <h3 className="text-xl font-bold text-primary mb-2">Want to shape the next release?</h3>
          <p className="text-sm text-secondary mb-6">
            Review our roadmap or connect with us on GitHub.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-1 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <span>View 2026 Roadmap</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="https://github.com/yash23082007"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-2 border border-border text-primary font-semibold text-sm hover:border-purple-1/40 transition-colors"
            >
              <span>GitHub Profile</span>
              <Sparkles size={16} className="text-purple-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

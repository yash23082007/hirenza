import { TOTAL_ALL_PROBLEMS, TOTAL_PATTERNS, TOTAL_COMPANIES } from "@/data/stats";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Hirenza — The Offline-First Tech Interview Prep OS",
  description: "Learn about Hirenza: an offline-first, client-side technical interview preparation OS built for engineers.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">About Hirenza</h1>
          <p className="text-xl text-secondary">The offline-first prep OS for power users.</p>
        </div>

        <div className="max-w-none space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-3 text-primary">Our Mission</h2>
            <p className="text-secondary leading-relaxed">
              Technical interview preparation has grown unnecessarily chaotic: fragmented spreadsheets, scattered video playlists, behind-the-paywall mock tests, and tracking cookies. Hirenza unifies every essential dimension — curated DSA sheets, high-frequency company archives, algorithmic patterns, system design blueprints, and production SQL — into one focused, offline-first application that runs entirely in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">Platform Capabilities</h2>
            <ul className="space-y-3 text-secondary">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">→</span>
                <span><strong className="text-primary">{TOTAL_ALL_PROBLEMS}+ curated problems</strong> cross-referenced from LeetCode, GeeksforGeeks, and DataLemur.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">→</span>
                <span><strong className="text-primary">{TOTAL_COMPANIES} company question tracks</strong> from Google, Amazon, Microsoft, Meta, Apple, and Flipkart with weighted readiness calculations.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">→</span>
                <span><strong className="text-primary">{TOTAL_PATTERNS} core algorithmic patterns</strong> to cultivate problem-solving intuition rather than rote memorization.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">→</span>
                <span><strong className="text-primary">Spaced repetition memory engine</strong> using automated Leitner intervals to ensure long-term retention before onsite rounds.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">→</span>
                <span><strong className="text-primary">Zero accounts & zero server telemetry</strong> — your progress is stored locally in your browser with one-click JSON backup and restore.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-primary">Architecture & Privacy</h2>
            <p className="text-secondary leading-relaxed mb-4">
              Hirenza is built with Next.js 16, React 19, TypeScript, and Tailwind CSS. We believe preparation tools should load instantly, function without internet access, and never lock candidate progress behind subscription paywalls or server logins.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/preparation"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-semibold text-white transition-colors"
              >
                Start Preparing
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

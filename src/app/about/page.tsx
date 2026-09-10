import { TOTAL_ALL_PROBLEMS, TOTAL_PATTERNS } from "@/data/stats";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Hirenza — your unfair advantage for tech interviews.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">About Hirenza</h1>
          <p className="text-xl text-secondary">Your unfair advantage for tech interviews</p>
        </div>

        <div className="max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-secondary leading-relaxed">
              Hirenza was built to solve a simple but frustrating problem: technical interview preparation was scattered across dozens of platforms, sheets, playlists, and resources. We wanted to create one focused workspace where candidates could prepare efficiently without context switching.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
            <ul className="space-y-3 text-secondary">
              <li className="flex items-start gap-3">
                <span className="text-purple-1 font-bold">→</span>
                <span><strong className="text-primary">{TOTAL_ALL_PROBLEMS}+ curated problems</strong> from LeetCode, GeeksforGeeks, and DataLemur organized by sheets, patterns, and companies</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-1 font-bold">→</span>
                <span><strong className="text-primary">Company-specific preparation</strong> with real interview patterns from Google, Amazon, Microsoft, Meta, Apple, and Netflix</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-1 font-bold">→</span>
                <span><strong className="text-primary">{TOTAL_PATTERNS} DSA patterns</strong> with practice problems following the Grokking methodology</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-1 font-bold">→</span>
                <span><strong className="text-primary">Complete interview prep</strong> including HR questions, role-wise tracks, resume guides, and cold email templates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-1 font-bold">→</span>
                <span><strong className="text-primary">Coding practice</strong> from LeetCode, Codeforces, and CodeChef with contest schedules</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Built by Engineers, for Engineers</h2>
            <p className="text-secondary leading-relaxed">
              Hirenza is built with modern web technologies (Next.js, TypeScript, Tailwind CSS) and follows the same design principles we apply to our engineering work: clean architecture, type safety, performance optimization, and attention to detail.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Open Source</h2>
            <p className="text-secondary leading-relaxed">
              We believe in giving back to the developer community. Hirenza is open source and we welcome contributions from engineers who want to help improve the platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

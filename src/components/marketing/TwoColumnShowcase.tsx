"use client";

import { RevealSection } from "@/components/marketing/FeatureShowcase";
import { DSASheetsMockup, CompanyWiseMockup } from "@/components/marketing/FeatureMockups";
import { TOTAL_COMPANIES } from "@/data/stats";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function TwoColumnShowcase() {
  return (
    <RevealSection className="py-16 md:py-24 border-y border-border/60 bg-surface-1/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 lg:divide-x divide-border gap-12 lg:gap-16 items-start">
          {/* Left Column: DSA Sheets (§§7–8) */}
          <div className="flex flex-col justify-between h-full space-y-6 lg:pr-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-3 block">
                DSA Curricula &amp; Tracking
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight mb-3">
                Systematic Progression with 4-State Tracking
              </h3>
              <p className="text-secondary text-sm md:text-base leading-relaxed mb-4">
                Move past binary checklists. Manage problems across Unsolved, Attempted, Review,
                and Mastered states backed by an automated Leitner spaced repetition queue.
              </p>
              <Link
                href="/preparation/dsa-sheets"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 hover:text-purple-200 transition-colors"
              >
                Explore 7 Curated Sheets <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Tilted 3D Mockup Container (§8) */}
            <div className="pt-2 [perspective:1200px]">
              <div className="transform-gpu transition-all duration-500 hover:scale-[1.01] hover:rotate-0 [transform:rotateX(2deg)_rotateY(-2deg)]">
                <DSASheetsMockup />
              </div>
            </div>
          </div>

          {/* Right Column: Company DSA Archives (§§9–10) */}
          <div className="flex flex-col justify-between h-full space-y-6 lg:pl-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-3 block">
                Company DSA Archives
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight mb-3">
                Targeted Archives for {TOTAL_COMPANIES} Engineering Leaders
              </h3>
              <p className="text-secondary text-sm md:text-base leading-relaxed mb-4">
                Weighted readiness scores calibrated from actual OA and technical onsite interview
                questions. Filter by frequency, difficulty, and algorithmic pattern.
              </p>
              <Link
                href="/preparation/company-wise-dsa"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 hover:text-purple-200 transition-colors"
              >
                View Company Tracks <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Company Search Mockup with Featured Border (§10) */}
            <div className="pt-2 [perspective:1200px]">
              <div className="transform-gpu transition-all duration-500 hover:scale-[1.01] hover:rotate-0 [transform:rotateX(2deg)_rotateY(2deg)]">
                <CompanyWiseMockup />
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

"use client";

import { RevealSection } from "./FeatureShowcase";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export function CreatorSection() {
  return (
    <RevealSection className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16 tracking-tight">
          One Of You,{" "}
          <span className="text-brand-gradient">Built For You.</span>
        </h2>

        <div className="grid md:grid-cols-[300px_1fr] gap-12 md:gap-16 items-start">
          {/* Left - Avatar & info */}
          <div className="text-center">
            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-purple-1 to-purple-2 flex items-center justify-center text-5xl font-extrabold text-white mb-5 border-4 border-purple-1/20">
              H
            </div>
            <p className="text-sm text-purple-1 font-semibold">Creator & Developer</p>
          </div>

          {/* Right - Story */}
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight">
              Hey, I built Hirenza.
            </h3>
            <div className="space-y-4 text-secondary leading-relaxed">
              <p>
                I built Hirenza because technical interview preparation became unnecessarily fragmented.
              </p>
              <p>
                Sheets here. Videos there. Notes somewhere else. Company questions in another tab. Resume tips scattered across a dozen blog posts.
              </p>
              <p>
                As a software engineer, I spent my evenings and weekends building what I wished existed during my own placement preparation — a completely free, focused platform that brings everything together.
              </p>
              <p className="text-primary font-semibold">
                You don&apos;t need a tier-1 college to land your dream job.
              </p>
              <p>
                You need the right direction, discipline, and the courage to keep going. Hirenza is designed to turn fragmented chaos into one focused preparation system.
              </p>
              <p>
                Let&apos;s crack it together — one skill, one resource, one question at a time.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <Link
                href="/preparation"
                className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Start Preparing <ArrowRight size={16} />
              </Link>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-sm text-secondary border border-border hover:border-purple-1/30 hover:text-primary transition-all"
              >
                <ExternalLink size={14} /> Connect
              </a>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

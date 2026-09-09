"use client";

import { useState } from "react";
import { packageWiseData, packageRanges } from "@/data/packageWise";
import { QuestionList } from "@/components/questions/QuestionList";
import type { Question } from "@/data";
import { Layers, ShieldAlert, Sparkles, Building, Target } from "lucide-react";

export default function PackageWisePage() {
  const [selectedRange, setSelectedRange] = useState("3-5 LPA");

  const questions: Question[] = (packageWiseData[selectedRange] || []).map((q) => ({
    id: parseInt(q.id.replace(/\D/g, "")),
    title: q.title,
    difficulty: q.difficulty,
    completed: false,
    bookmarked: false,
    topic: q.topic,
  }));

  const currentRange = packageRanges.find(r => r.range === selectedRange);

  const trackLabels: Record<string, { tier: string; badge: string; level: string }> = {
    "3-5 LPA": { tier: "Track 1: Foundational & Service", badge: "Service & IT", level: "Beginner – Core Algorithms" },
    "5-10 LPA": { tier: "Track 2: Product & High-Growth Startups", badge: "Fast-Paced Startups", level: "Intermediate – Data Structures" },
    "10-20 LPA": { tier: "Track 3: Top Product & Tech Enterprise", badge: "Enterprise Tech", level: "Medium-Hard – Trees & Graphs" },
    "20-40 LPA": { tier: "Track 4: Tier-2 Tech Giants & Scale-ups", badge: "High Scale", level: "Hard – DP & Graph Traversal" },
    "40-60 LPA": { tier: "Track 5: Tier-1 Tech Giants (FAANG)", badge: "FAANG Benchmark", level: "Advanced – Complex DP & Optimization" },
    "60+ LPA": { tier: "Track 6: High Frequency Trading & Quant", badge: "HFT & Quant", level: "Extreme – Hard Math & Interval DP" },
  };

  const trackMeta = trackLabels[selectedRange] || { tier: selectedRange, badge: "Track", level: "Engineering" };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Interview Complexity Tracks</h1>
        <p className="text-secondary">Structured problem tracks mapped to engineering hiring bars, from foundational enterprise IT to Tier-1 FAANG and Quant.</p>
      </div>

      {/* Track Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
        {packageRanges.map((pkg, idx) => {
          const isSelected = selectedRange === pkg.range;
          const meta = trackLabels[pkg.range];

          return (
            <button
              key={pkg.range}
              onClick={() => setSelectedRange(pkg.range)}
              className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                isSelected 
                  ? "bg-purple-950/30 border-purple-500/50 shadow-sm" 
                  : "bg-surface-2 border-border hover:border-purple-500/20"
              }`}
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-muted block mb-1">Tier {idx + 1}</span>
                <span className={`text-xs font-bold block truncate ${isSelected ? "text-purple-1" : "text-primary"}`}>
                  {meta ? meta.badge : pkg.range}
                </span>
              </div>
              <span className="text-[10px] text-muted mt-2 font-medium">({pkg.count} Questions)</span>
            </button>
          );
        })}
      </div>

      {/* Active Track Info Card */}
      {currentRange && (
        <div className="mb-6 p-5 border border-purple-500/20 rounded-2xl bg-gradient-to-br from-surface-1 to-surface-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-extrabold text-primary">{trackMeta.tier}</h2>
                <span className="text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded-full font-bold">
                  {trackMeta.level}
                </span>
              </div>
              <p className="text-xs text-secondary mt-1">
                <strong className="text-primary">Target Companies:</strong> {currentRange.description}
              </p>
            </div>
            <div className="bg-surface-3 px-4 py-2.5 rounded-xl border border-border text-center shrink-0">
              <span className="text-lg font-bold text-purple-1">{questions.length}</span>
              <span className="text-[10px] uppercase tracking-wider text-muted block font-semibold">Core Problems</span>
            </div>
          </div>
        </div>
      )}

      {/* Problem Tracker */}
      <QuestionList questions={questions} storageKey={`interview-track-${selectedRange}`} />
    </div>
  );
}

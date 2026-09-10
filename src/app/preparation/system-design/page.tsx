"use client";

import { useState } from "react";
import { systemDesignTopics, systemDesignCategories, type SystemDesignTopic } from "@/data/systemDesign";
import { useProgress } from "@/hooks/useProgress";
import { ProgressRing } from "@/components/ui/ProgressRing";
import {
  ExternalLink,
  Video,
  Check,
  Star,
  ChevronDown,
  ChevronRight,
  Layers,
  Sparkles,
  Building2,
} from "lucide-react";

export default function SystemDesignSheetPage() {
  const { isCompleted, isBookmarked, toggleComplete, toggleBookmark } = useProgress();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getFullId = (id: string) => `sd-${id}`;

  const completedCount = systemDesignTopics.filter(t => isCompleted(getFullId(t.id))).length;
  const bookmarkedCount = systemDesignTopics.filter(t => isBookmarked(getFullId(t.id))).length;

  const filtered = systemDesignTopics.filter(topic => {
    const fid = getFullId(topic.id);
    if (selectedFilter === "all") return true;
    if (selectedFilter === "bookmarked") return isBookmarked(fid);
    if (selectedFilter === "hld") return topic.designType === "HLD";
    if (selectedFilter === "lld") return topic.designType === "LLD";
    if (selectedFilter === "distributed") return topic.category === "Distributed Systems";
    return true;
  });

  const hldSolved = systemDesignTopics.filter(t => t.designType === "HLD" && isCompleted(getFullId(t.id))).length;
  const hldTotal = systemDesignTopics.filter(t => t.designType === "HLD").length;
  const lldSolved = systemDesignTopics.filter(t => t.designType === "LLD" && isCompleted(getFullId(t.id))).length;
  const lldTotal = systemDesignTopics.filter(t => t.designType === "LLD").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
          System Design Blueprint Sheet
        </h1>
        <p className="text-secondary text-sm md:text-base max-w-3xl">
          Architectural blueprints and low-level object-oriented models from real FAANG & Tier-1 interviews.
          Track progress across high-scale distributed systems and clean design patterns.
        </p>
      </div>

      {/* Progress Header */}
      <div className="card p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-surface-1 border border-border rounded-2xl">
        <div className="flex items-center gap-5">
          <ProgressRing completed={completedCount} total={systemDesignTopics.length} size={92} strokeWidth={7} />
          <div>
            <h3 className="text-base font-bold text-primary">System Design Mastery</h3>
            <p className="text-xs text-muted mt-0.5">
              {completedCount} of {systemDesignTopics.length} architectural blueprints reviewed
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <Check size={13} /> {completedCount} Done
              </span>
              <span className="text-muted">•</span>
              <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
                <Star size={13} className="fill-amber-400" /> {bookmarkedCount} Starred
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown counters */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 w-full sm:w-auto">
          <div className="px-4 py-2.5 bg-surface-2 rounded-xl border border-border-soft text-center sm:text-left">
            <span className="text-[10px] text-muted uppercase tracking-wider block font-semibold">High-Level (HLD)</span>
            <span className="text-base font-bold text-blue-400">
              {hldSolved} <span className="text-xs font-normal text-muted">/ {hldTotal}</span>
            </span>
          </div>
          <div className="px-4 py-2.5 bg-surface-2 rounded-xl border border-border-soft text-center sm:text-left">
            <span className="text-[10px] text-muted uppercase tracking-wider block font-semibold">Low-Level (LLD)</span>
            <span className="text-base font-bold text-orange-400">
              {lldSolved} <span className="text-xs font-normal text-muted">/ {lldTotal}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: "all", label: "All Topics", count: systemDesignTopics.length },
          { id: "hld", label: "HLD Blueprints", count: hldTotal },
          { id: "lld", label: "LLD & OOP", count: lldTotal },
          { id: "distributed", label: "Distributed Systems", count: systemDesignTopics.filter(t => t.category === "Distributed Systems").length },
          { id: "bookmarked", label: "Bookmarked", count: bookmarkedCount },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer inline-flex items-center gap-1.5 ${
              selectedFilter === tab.id
                ? "bg-purple-1 text-white shadow-sm ring-1 ring-purple-1"
                : "bg-surface-2 text-secondary border border-border hover:border-purple-1/30 hover:text-primary"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedFilter === tab.id ? "bg-white/20 text-white" : "bg-surface-3 text-muted"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table Column Headers */}
      <div className="hidden sm:flex items-center justify-between px-6 py-2.5 bg-surface-2/80 border border-b-0 border-border rounded-t-xl text-[10px] font-bold uppercase tracking-wider text-muted select-none">
        <div className="flex items-center gap-5">
          <span className="w-5 text-center">STATUS</span>
          <span className="w-6 text-center">#</span>
          <span>SYSTEM ARCHITECTURE TOPIC</span>
        </div>
        <div className="flex items-center gap-8 pr-2">
          <span>FREQUENT AT</span>
          <span>DESIGN TYPE</span>
          <span className="w-10 text-center">LINKS</span>
        </div>
      </div>

      {/* Checklist Rows */}
      <div className="border border-border rounded-xl sm:rounded-t-none overflow-hidden divide-y divide-border-soft bg-surface-1">
        {filtered.map((topic, idx) => {
          const fid = getFullId(topic.id);
          const solved = isCompleted(fid);
          const starred = isBookmarked(fid);
          const isExpanded = expandedId === topic.id;

          return (
            <div key={topic.id} className="transition-colors">
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 hover:bg-surface-hover/70 transition-colors gap-3">
                {/* Left: Checkbox + Number + Title */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={solved}
                    aria-label={`Mark ${topic.title} as ${solved ? "incomplete" : "complete"}`}
                    onClick={() =>
                      toggleComplete(fid, {
                        module: "system-design",
                        topic: topic.category,
                        difficulty: topic.designType === "HLD" ? "Hard" : "Medium",
                      })
                    }
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                      solved
                        ? "bg-purple-1 border-purple-1"
                        : "border-border hover:border-purple-1/60 bg-surface-2"
                    }`}
                  >
                    {solved && <Check size={12} className="text-white stroke-[3]" />}
                  </button>

                  <span className="text-xs text-muted w-6 shrink-0 font-mono text-center">
                    {idx + 1}.
                  </span>

                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedId(isExpanded ? null : topic.id)}
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setExpandedId(isExpanded ? null : topic.id);
                      }
                    }}
                    className="cursor-pointer min-w-0 flex-1 group"
                  >
                    <span
                      className={`text-sm font-semibold transition-colors block truncate ${
                        solved
                          ? "text-muted line-through"
                          : "text-primary group-hover:text-purple-400"
                      }`}
                    >
                      {topic.title}
                    </span>
                    <span className="text-[11px] text-muted block truncate mt-0.5">
                      {topic.description}
                    </span>
                  </div>
                </div>

                {/* Right: Company Chips + HLD/LLD Badge + Links */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* Company chips */}
                  <div className="hidden md:flex items-center gap-1">
                    {topic.companies.slice(0, 2).map(c => (
                      <span
                        key={c}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-surface-2 border border-border-soft text-secondary"
                      >
                        {c}
                      </span>
                    ))}
                    {topic.companies.length > 2 && (
                      <span className="text-[10px] text-muted">+{topic.companies.length - 2}</span>
                    )}
                  </div>

                  {/* Type Badge */}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      topic.designType === "HLD"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    }`}
                  >
                    {topic.designType}
                  </span>

                  {/* Star Bookmark */}
                  <button
                    type="button"
                    onClick={() => toggleBookmark(fid)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      starred
                        ? "text-yellow-400 bg-yellow-400/10"
                        : "text-muted hover:text-yellow-400 hover:bg-surface-3"
                    }`}
                    aria-label={starred ? `Remove bookmark from ${topic.title}` : `Bookmark ${topic.title}`}
                  >
                    <Star size={15} className={starred ? "fill-yellow-400" : ""} />
                  </button>

                  {/* Reference / Video Links */}
                  <div className="flex items-center gap-1">
                    {topic.referenceUrl && (
                      <a
                        href={topic.referenceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-muted hover:text-purple-400 hover:bg-surface-3 rounded transition-colors"
                        title="View Architecture Reference"
                        aria-label="View architecture reference"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {topic.videoUrl && (
                      <a
                        href={topic.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors"
                        title="Watch System Design Breakdown"
                        aria-label="Watch video breakdown"
                      >
                        <Video size={14} />
                      </a>
                    )}
                  </div>

                  {/* Chevron Toggle */}
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : topic.id)}
                    className="p-1 text-muted hover:text-primary rounded cursor-pointer"
                    aria-label={isExpanded ? "Collapse concepts" : "Expand concepts"}
                  >
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                </div>
              </div>

              {/* Expanded Concepts Drawer */}
              {isExpanded && (
                <div className="px-6 py-4 bg-surface-2/60 border-t border-border-soft text-xs space-y-3 animate-in fade-in duration-150">
                  <div>
                    <h4 className="font-semibold text-secondary mb-1.5 uppercase tracking-wider text-[10px]">
                      Architecture Overview & Blueprint Requirements
                    </h4>
                    <p className="text-muted leading-relaxed">{topic.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary mb-1.5 uppercase tracking-wider text-[10px]">
                      Key Architectural Concepts & Trade-offs
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {topic.keyConcepts.map((concept, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2 py-0.5 rounded bg-surface-3 text-secondary border border-border-soft text-[11px]"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2 text-[11px] text-muted border-t border-border-soft/60">
                    <span className="inline-flex items-center gap-1">
                      <Building2 size={12} className="text-purple-400" />
                      Targeted Companies: {topic.companies.join(", ")}
                    </span>
                    <span>•</span>
                    <span className="text-secondary font-medium">Category: {topic.category}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted">
          <p>No system design topics match this filter.</p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Check, Star, ChevronDown, ChevronRight, ExternalLink, Video } from "lucide-react";

export interface QuestionRowProps {
  id: string;
  index: number;
  title: string;
  subtitle?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  solved: boolean;
  bookmarked: boolean;
  onToggleComplete: () => void;
  onToggleBookmark: () => void;
  tags?: string[];
  externalUrl?: string;
  videoUrl?: string;
  categoryBadge?: string;
  type?: "HLD" | "LLD";
  expandableContent?: React.ReactNode;
}

export function QuestionRow({
  id,
  index,
  title,
  subtitle,
  difficulty,
  solved,
  bookmarked,
  onToggleComplete,
  onToggleBookmark,
  tags,
  externalUrl,
  videoUrl,
  categoryBadge,
  type,
  expandableContent,
}: QuestionRowProps) {
  const [expanded, setExpanded] = useState(false);

  const diffBadgeClass = (diff?: string) => {
    switch (diff) {
      case "Easy":
        return "bg-green-500/10 text-green-400 border border-green-500/20";
      case "Medium":
        return "bg-orange-500/10 text-orange-400 border border-orange-500/20";
      case "Hard":
        return "bg-red-500/10 text-red-400 border border-red-500/20";
      default:
        return "bg-surface-3 text-secondary border border-border-soft";
    }
  };

  const typeBadgeClass = (t?: string) => {
    switch (t) {
      case "HLD":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "LLD":
        return "bg-orange-500/10 text-orange-400 border border-orange-500/20";
      default:
        return "bg-surface-3 text-secondary border border-border-soft";
    }
  };

  const hasExpandable = Boolean(expandableContent);

  return (
    <div
      id={id ? `problem-${id}` : undefined}
      className="transition-colors scroll-mt-24 target:ring-2 target:ring-purple-1/60 target:bg-purple-900/10 rounded-xl"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 hover:bg-surface-hover/70 transition-colors gap-3">
        {/* Eye path: Checkbox -> Index -> Title */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <button
            type="button"
            role="checkbox"
            aria-checked={solved}
            aria-label={`Mark ${title} as ${solved ? "incomplete" : "complete"}`}
            onClick={onToggleComplete}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 cursor-pointer transition-all ${
              solved
                ? "bg-purple-1 border-purple-1"
                : "border-border hover:border-purple-1/60 bg-surface-2"
            }`}
          >
            {solved && <Check size={12} className="text-white stroke-[3]" />}
          </button>

          <span className="text-xs text-muted w-6 shrink-0 font-mono text-center">
            {index}.
          </span>

          <div
            role={hasExpandable ? "button" : undefined}
            tabIndex={hasExpandable ? 0 : undefined}
            aria-expanded={hasExpandable ? expanded : undefined}
            onClick={() => hasExpandable && setExpanded(!expanded)}
            onKeyDown={e => {
              if (hasExpandable && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                setExpanded(!expanded);
              }
            }}
            className={`min-w-0 flex-1 group ${hasExpandable ? "cursor-pointer" : ""}`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-semibold transition-colors block truncate ${
                  solved ? "text-muted line-through" : "text-primary group-hover:text-purple-400"
                }`}
              >
                {title}
              </span>
              {categoryBadge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-3 text-muted border border-border-soft shrink-0">
                  {categoryBadge}
                </span>
              )}
            </div>
            {subtitle && (
              <span className="text-[11px] text-muted block truncate mt-0.5">{subtitle}</span>
            )}
          </div>
        </div>

        {/* Right Controls: Tags -> Bookmark -> Difficulty -> Link / Chevron */}
        <div className="flex items-center gap-2.5 shrink-0">
          {tags && tags.length > 0 && (
            <div className="hidden md:flex items-center gap-1">
              {tags.slice(0, 2).map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[10px] px-2 py-0.5 rounded bg-surface-2 text-secondary border border-border-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Star Bookmark */}
          <button
            type="button"
            onClick={onToggleBookmark}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              bookmarked
                ? "text-yellow-400 bg-yellow-400/10"
                : "text-muted hover:text-yellow-400 hover:bg-surface-3"
            }`}
            aria-label={bookmarked ? `Remove bookmark from ${title}` : `Bookmark ${title}`}
          >
            <Star size={15} className={bookmarked ? "fill-yellow-400" : ""} />
          </button>

          {/* Difficulty Badge */}
          {difficulty && (
            <span
              className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${diffBadgeClass(
                difficulty
              )}`}
            >
              {difficulty}
            </span>
          )}

          {/* Type Badge (HLD/LLD) */}
          {type && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${typeBadgeClass(
                type
              )}`}
            >
              {type}
            </span>
          )}

          {/* External Link */}
          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-muted hover:text-purple-400 hover:bg-surface-3 rounded transition-colors"
              title="Open problem link"
              aria-label={`Open external link for ${title}`}
            >
              <ExternalLink size={14} />
            </a>
          )}

          {/* Video Link */}
          {videoUrl && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors"
              title="Watch breakdown video"
              aria-label={`Watch breakdown video for ${title}`}
            >
              <Video size={14} />
            </a>
          )}

          {/* Expand Chevron */}
          {hasExpandable && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="p-1 text-muted hover:text-primary rounded cursor-pointer"
              aria-label={expanded ? "Collapse details" : "Expand details"}
            >
              {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* Expandable Drawer */}
      {hasExpandable && expanded && (
        <div className="px-6 py-4 bg-surface-2/60 border-t border-border-soft text-xs space-y-2 animate-in fade-in duration-150">
          {expandableContent}
        </div>
      )}
    </div>
  );
}

"use client";

import { Search, X } from "lucide-react";
import React from "react";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  shortcutBadge?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  shortcutBadge,
  autoFocus = false,
}: SearchBarProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search
        size={16}
        className="absolute left-3.5 text-muted pointer-events-none transition-colors"
      />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-primary placeholder:text-muted focus:outline-none focus:border-purple-1/60 focus:ring-1 focus:ring-purple-1/60 transition-all"
      />
      <div className="absolute right-3 flex items-center gap-1.5">
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="p-1 text-muted hover:text-primary rounded-md transition-colors"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        ) : shortcutBadge ? (
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-muted bg-surface-3 border border-border-soft rounded">
            {shortcutBadge}
          </kbd>
        ) : null}
      </div>
    </div>
  );
}

"use client";

import { useTheme } from "@/hooks/useTheme";
import { useProgress } from "@/hooks/useProgress";
import { PanelLeft, ChevronDown, User, Settings, LogOut, Bookmark, BarChart3, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export function TopBar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { toggleTheme } = useTheme();
  const { data } = useProgress();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const displayName = data.profile.name || "Builder";
  const initial = displayName.trim().charAt(0).toUpperCase() || "B";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <div className="h-[68px] border-b border-border-soft flex items-center justify-between px-6 sticky top-0 bg-surface-1/95 backdrop-blur-sm z-30">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-surface-hover text-muted hover:text-primary transition-colors"
          aria-label="Toggle sidebar"
        >
          <PanelLeft size={18} />
        </button>
        <div className="w-px h-5 bg-border-soft" />
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted">Preparation</span>
          <ChevronDown size={12} className="text-muted" />
        </div>
      </div>

      {/* Center - Quick Command Palette Search trigger */}
      <button
        onClick={openSearch}
        className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-surface-2 border border-border text-muted hover:border-border-hover hover:text-primary transition-all text-xs w-64 md:w-80 justify-between group"
      >
        <div className="flex items-center gap-2">
          <Search size={14} className="group-hover:text-purple-400 transition-colors" />
          <span>Search questions, notes...</span>
        </div>
        <kbd className="text-[10px] px-1.5 py-0.5 rounded border border-border bg-surface-3 font-mono">
          ⌘K
        </kbd>
      </button>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          onClick={openSearch}
          className="sm:hidden p-2 rounded-lg hover:bg-surface-hover text-muted hover:text-primary transition-colors"
          aria-label="Search"
        >
          <Search size={18} />
        </button>

        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle theme"
        />

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            aria-label="Open profile menu"
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-hover transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-purple-1/20 flex items-center justify-center text-xs font-bold text-purple-1">
              {initial}
            </div>
            <span className="text-sm font-medium hidden md:inline">{displayName}</span>
            <ChevronDown size={12} className="text-muted" />
          </button>

          {profileOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-56 bg-surface-2 border border-border rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
            >
              <div className="px-4 py-2 border-b border-border/60">
                <p className="text-sm font-semibold truncate">{displayName}</p>
                <p className="text-xs text-muted truncate">{data.profile.email}</p>
              </div>
              <Link
                href="/profile"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-hover transition-colors"
              >
                <User size={14} /> Profile
              </Link>
              <Link
                href="/profile/progress"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-hover transition-colors"
              >
                <BarChart3 size={14} /> My Progress
              </Link>
              <Link
                href="/profile/bookmarks"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-hover transition-colors"
              >
                <Bookmark size={14} /> Bookmarks ({Object.keys(data.bookmarks).length})
              </Link>
              <Link
                href="/profile/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-hover transition-colors"
              >
                <Settings size={14} /> Settings
              </Link>
              <div className="border-t border-border-soft my-1" />
              <Link
                href="/"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-surface-hover transition-colors"
              >
                <LogOut size={14} /> Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useTheme } from "@/hooks/useTheme";
import { PanelLeft, ChevronDown, User, Settings, LogOut, Bookmark, BarChart3 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export function TopBar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      {/* Right */}
      <div className="flex items-center gap-3">
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
              H
            </div>
            <span className="text-sm font-medium hidden md:inline">Builder</span>
            <ChevronDown size={12} className="text-muted" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-surface-2 border border-border rounded-xl shadow-xl py-2 z-50"
              style={{ animation: "fadeInScale 0.15s ease-out" }}>
              <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-hover transition-colors">
                <User size={14} /> Profile
              </Link>
              <Link href="/profile/progress" className="flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-hover transition-colors">
                <BarChart3 size={14} /> My Progress
              </Link>
              <Link href="/profile/bookmarks" className="flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-hover transition-colors">
                <Bookmark size={14} /> Bookmarks
              </Link>
              <Link href="/profile/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-hover transition-colors">
                <Settings size={14} /> Settings
              </Link>
              <div className="border-t border-border-soft my-1" />
              <Link href="/" className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-surface-hover transition-colors">
                <LogOut size={14} /> Logout
              </Link>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.98) translateY(-4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

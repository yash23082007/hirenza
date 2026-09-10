"use client";

import { useTheme } from "@/hooks/useTheme";
import { useProgress } from "@/hooks/useProgress";
import {
  PanelLeft,
  ChevronDown,
  ChevronRight,
  Bookmark,
  Search,
  Download,
  Upload,
  RotateCcw,
  LayoutDashboard,
  Sliders,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BREADCRUMB_MAP: Record<string, string> = {
  preparation: "Preparation",
  "dsa-sheets": "DSA Sheets",
  "company-wise-dsa": "Company DSA",
  "20-patterns": "20 Patterns",
  "package-wise-dsa": "Package Wise",
  "sql-sheet": "SQL Sheet",
  "system-design": "System Design",
  "dsa-playlists": "DSA Playlists",
  "core-subjects": "Core Subjects",
  "system-design-playlists": "System Design Playlists",
  "role-wise": "Role Wise",
  "most-asked-questions": "Interview Questions",
  "interview-experiences": "Experiences",
  "hr-questions": "HR Questions",
  "coding-practice": "Coding Practice",
  "cold-email-templates": "Email Templates",
  "cool-notes": "Cool Notes",
  "resume-templates": "Resume Guide",
  profile: "Profile",
  bookmarks: "Bookmarks",
  progress: "Progress",
  settings: "Settings",
  daily: "Daily Challenge",
  flashcards: "Flashcards",
  simulator: "Round Simulator",
  compare: "Compare",
  onboarding: "Study Plan",
};

export function TopBar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { toggleTheme } = useTheme();
  const { data, exportData, importData, resetProgress } = useProgress();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

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

  const handleExport = () => {
    const jsonStr = exportData();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hirenza-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setProfileOpen(false);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importData(content);
        if (success) {
          alert("Progress imported successfully!");
        } else {
          alert("Failed to import progress: Invalid backup format.");
        }
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = "";
    setProfileOpen(false);
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Reset all local progress? This action clears all solved statuses and revisions stored in your browser."
      )
    ) {
      resetProgress();
      setProfileOpen(false);
    }
  };

  // Build topbar breadcrumbs Preparation › Section › Item
  const segments = (pathname || "").split("/").filter(Boolean);
  const breadcrumbItems = segments.map((seg, idx) => {
    const href = `/${segments.slice(0, idx + 1).join("/")}`;
    const label = BREADCRUMB_MAP[seg] || seg.replace(/-/g, " ");
    const isLast = idx === segments.length - 1;
    return { href, label, isLast };
  });

  return (
    <div className="h-[68px] border-b border-border-soft flex items-center justify-between px-6 sticky top-0 bg-surface-1/95 backdrop-blur-sm z-30">
      {/* Hidden file input for progress import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImportFile}
        className="hidden"
        aria-hidden="true"
      />

      {/* Left: Sidebar toggle + Dynamic Breadcrumb */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-surface-hover text-muted hover:text-primary transition-colors flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          <PanelLeft size={18} />
        </button>
        <div className="w-px h-5 bg-border-soft flex-shrink-0" />
        <nav aria-label="Header breadcrumbs" className="flex items-center gap-1.5 text-xs text-muted truncate">
          {breadcrumbItems.length === 0 ? (
            <span className="text-primary font-medium">Preparation</span>
          ) : (
            breadcrumbItems.map((item, idx) => (
              <span key={item.href} className="flex items-center gap-1.5 truncate">
                {idx > 0 && <ChevronRight size={11} className="text-muted/60 flex-shrink-0" />}
                {item.isLast ? (
                  <span className="text-primary font-semibold capitalize truncate">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors capitalize truncate hidden sm:inline"
                  >
                    {item.label}
                  </Link>
                )}
              </span>
            ))
          )}
        </nav>
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
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-1 to-purple-2 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              {initial}
            </div>
            <span className="text-sm font-medium hidden md:inline text-primary">{displayName}</span>
            <ChevronDown size={12} className="text-muted" />
          </button>

          {profileOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-64 bg-surface-2 border border-border rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
            >
              {/* Honest Profile Header */}
              <div className="px-4 py-2.5 border-b border-border/60">
                <p className="text-sm font-semibold truncate text-primary">{displayName}</p>
                <p className="text-[11px] text-muted leading-tight mt-0.5">
                  Local profile — data stays in your browser
                </p>
              </div>

              {/* Navigation Links */}
              <Link
                href="/preparation"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-secondary hover:text-primary hover:bg-surface-hover transition-colors"
              >
                <LayoutDashboard size={14} className="text-purple-400" /> Cockpit Dashboard
              </Link>
              <Link
                href="/profile/bookmarks"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-secondary hover:text-primary hover:bg-surface-hover transition-colors"
              >
                <Bookmark size={14} className="text-brand-orange" /> Bookmarks ({Object.keys(data.bookmarks).length})
              </Link>
              <Link
                href="/profile/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-secondary hover:text-primary hover:bg-surface-hover transition-colors"
              >
                <Sliders size={14} className="text-muted" /> Profile Settings
              </Link>

              <div className="border-t border-border-soft my-1.5" />

              {/* Honest Data Actions */}
              <button
                onClick={handleExport}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-secondary hover:text-primary hover:bg-surface-hover transition-colors text-left"
              >
                <Download size={14} className="text-emerald-400" /> Export progress (JSON)
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-secondary hover:text-primary hover:bg-surface-hover transition-colors text-left"
              >
                <Upload size={14} className="text-blue-400" /> Import progress
              </button>

              <div className="border-t border-border-soft my-1.5" />

              <button
                onClick={handleReset}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-surface-hover transition-colors text-left"
              >
                <RotateCcw size={14} /> Reset local progress
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

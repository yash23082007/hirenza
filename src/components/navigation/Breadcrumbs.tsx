"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const SEGMENT_NAMES: Record<string, string> = {
  preparation: "Cockpit",
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
  "cool-notes": "Notes",
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

export function Breadcrumbs() {
  const pathname = usePathname();

  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-muted flex-wrap">
      <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
        <Home size={12} />
        <span>Home</span>
      </Link>

      {segments.map((segment, idx) => {
        const href = `/${segments.slice(0, idx + 1).join("/")}`;
        const isLast = idx === segments.length - 1;
        const displayName = SEGMENT_NAMES[segment] || segment.replace(/-/g, " ");

        return (
          <div key={href} className="flex items-center gap-1.5">
            <ChevronRight size={11} className="text-muted/60" />
            {isLast ? (
              <span className="text-primary font-semibold capitalize">{displayName}</span>
            ) : (
              <Link href={href} className="hover:text-primary transition-colors capitalize">
                {displayName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

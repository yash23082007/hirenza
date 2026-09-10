"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, Zap, Tag, X, ArrowRight } from "lucide-react";

interface Announcement {
  id: string;
  icon: React.ReactNode;
  text: string;
  linkText: string;
  href: string;
  external?: boolean;
}

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "github-star",
    icon: <Star size={13} className="text-amber-400 fill-amber-400/30" />,
    text: "Hirenza is 100% free and open-source under MIT.",
    linkText: "Star us on GitHub",
    href: "https://github.com/yash23082007/hirenza",
    external: true,
  },
  {
    id: "daily-challenge",
    icon: <Zap size={13} className="text-purple-400 fill-purple-400/30" />,
    text: "Practice consistently with the new Daily Challenge.",
    linkText: "Solve Today's Problem",
    href: "/preparation/daily",
  },
  {
    id: "changelog-21",
    icon: <Tag size={13} className="text-cyan-400" />,
    text: "v2.1.0 is live: Async Next 16 core & zero data collisions.",
    linkText: "Read Changelog",
    href: "/changelog",
  },
];

export function AnnouncementBar() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const dismissedUntil = localStorage.getItem("hirenza-announcement-dismissed");
    if (!dismissedUntil || Date.now() > parseInt(dismissedUntil, 10)) {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    // Dismiss for 7 days
    localStorage.setItem("hirenza-announcement-dismissed", (Date.now() + 7 * 24 * 60 * 60 * 1000).toString());
  };

  if (!mounted || dismissed) return null;

  const current = ANNOUNCEMENTS[currentIndex];

  return (
    <aside aria-label="Announcement" className="relative z-40 bg-gradient-to-r from-purple-950/70 via-surface-2 to-purple-950/70 border-b border-purple-1/20 py-2 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center text-secondary">
          <span className="flex-shrink-0">{current.icon}</span>
          <span>{current.text}</span>
          <Link
            href={current.href}
            target={current.external ? "_blank" : undefined}
            rel={current.external ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-1 font-semibold text-primary hover:text-purple-1 underline underline-offset-2 ml-1"
          >
            <span>{current.linkText}</span>
            <ArrowRight size={11} />
          </Link>
        </div>

        <button
          onClick={handleDismiss}
          className="text-muted hover:text-primary transition-colors p-1 rounded-md hover:bg-surface-3 flex-shrink-0"
          aria-label="Dismiss announcement"
        >
          <X size={14} />
        </button>
      </div>
    </aside>
  );
}

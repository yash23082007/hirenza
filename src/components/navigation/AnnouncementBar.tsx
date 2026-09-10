"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Zap, Tag, ShieldCheck, X, ArrowRight } from "lucide-react";

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
    id: "daily-challenge",
    icon: <Zap size={13} className="text-purple-400 fill-purple-400/30" />,
    text: "Daily Challenge is live: practice one high-frequency question each day.",
    linkText: "Solve Today's Problem",
    href: "/preparation/daily",
  },
  {
    id: "private-architecture",
    icon: <ShieldCheck size={13} className="text-emerald-400" />,
    text: "Private by architecture: 100% offline-first, client storage, zero server tracking.",
    linkText: "Learn More",
    href: "/about",
  },
  {
    id: "algorithmic-patterns",
    icon: <Tag size={13} className="text-cyan-400" />,
    text: "Master 20 essential algorithmic patterns to tackle FAANG interview rounds.",
    linkText: "View Patterns",
    href: "/preparation/20-patterns",
  },
];

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getDismissedSnapshot(): boolean {
  if (typeof window === "undefined") return true;
  const dismissedUntil = localStorage.getItem("hirenza-announcement-dismissed");
  if (!dismissedUntil) return false;
  return Date.now() <= parseInt(dismissedUntil, 10);
}

function getServerSnapshot(): boolean {
  return true;
}

export function AnnouncementBar() {
  const isDismissed = useSyncExternalStore(subscribeStorage, getDismissedSnapshot, getServerSnapshot);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isDismissed) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isDismissed]);

  const handleDismiss = () => {
    localStorage.setItem(
      "hirenza-announcement-dismissed",
      (Date.now() + 7 * 24 * 60 * 60 * 1000).toString()
    );
    window.dispatchEvent(new Event("storage"));
  };

  if (isDismissed) return null;

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

"use client";

import { useState, useMemo, useSyncExternalStore, useEffect } from "react";
import { Calendar, Clock, ExternalLink, Download, Trophy } from "lucide-react";

export interface ContestItem {
  id: string;
  platform: "LeetCode" | "Codeforces" | "CodeChef" | "AtCoder";
  title: string;
  startTime: string; // ISO string
  durationMinutes: number;
  url: string;
}

// Deterministic contest schedules with relative offsets
const UPCOMING_CONTESTS: ContestItem[] = [
  {
    id: "lc-w-440",
    platform: "LeetCode",
    title: "LeetCode Weekly Contest 440",
    startTime: new Date(Date.UTC(2026, 8, 14, 2, 30, 0)).toISOString(),
    durationMinutes: 90,
    url: "https://leetcode.com/contest/",
  },
  {
    id: "cf-div2-998",
    platform: "Codeforces",
    title: "Codeforces Round 998 (Div. 2)",
    startTime: new Date(Date.UTC(2026, 8, 15, 14, 35, 0)).toISOString(),
    durationMinutes: 120,
    url: "https://codeforces.com/contests",
  },
  {
    id: "lc-bw-152",
    platform: "LeetCode",
    title: "LeetCode Biweekly Contest 152",
    startTime: new Date(Date.UTC(2026, 8, 20, 14, 30, 0)).toISOString(),
    durationMinutes: 90,
    url: "https://leetcode.com/contest/",
  },
  {
    id: "cc-start-178",
    platform: "CodeChef",
    title: "CodeChef Starters 178 (Div. 2 & 3)",
    startTime: new Date(Date.UTC(2026, 8, 21, 14, 30, 0)).toISOString(),
    durationMinutes: 120,
    url: "https://www.codechef.com/contests",
  },
  {
    id: "ac-abc-396",
    platform: "AtCoder",
    title: "AtCoder Beginner Contest 396",
    startTime: new Date(Date.UTC(2026, 8, 22, 12, 0, 0)).toISOString(),
    durationMinutes: 100,
    url: "https://atcoder.jp/contests/",
  },
];

function downloadIcsCalendar(contest: ContestItem) {
  const start = new Date(contest.startTime);
  const end = new Date(start.getTime() + contest.durationMinutes * 60 * 1000);

  const formatIcsDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//HIRENZA//Contest Calendar//EN",
    "BEGIN:VEVENT",
    `UID:${contest.id}@hirenza.prep`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${contest.title}`,
    `DESCRIPTION:Competitive programming contest on ${contest.platform}. Practice link: ${contest.url}`,
    `URL:${contest.url}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${contest.id}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function subscribeTime(callback: () => void) {
  const interval = setInterval(callback, 60000);
  return () => clearInterval(interval);
}

function getClientTime() {
  return Date.now();
}

function getServerTime() {
  return 0;
}

function getUpcomingContests(items: ContestItem[], now: number) {
  return items
    .filter(contest => new Date(contest.startTime).getTime() + contest.durationMinutes * 60000 > now)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
}

export function ContestTracker({ className = "" }: { className?: string }) {
  const [platformFilter, setPlatformFilter] = useState<string>("All");
  const [contests, setContests] = useState<ContestItem[]>(() => {
    if (typeof window === "undefined") return UPCOMING_CONTESTS;
    try {
      const cached = localStorage.getItem("hirenza-contests-cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.items) && parsed.items.length > 0) {
          return parsed.items;
        }
      }
    } catch {
      // Fall through to UPCOMING_CONTESTS
    }
    return UPCOMING_CONTESTS;
  });

  const now = useSyncExternalStore(subscribeTime, getClientTime, getServerTime);

  // Fetch live Codeforces upcoming rounds with 1-hour localStorage caching and offline degrade
  useEffect(() => {
    const fetchLiveContests = async () => {
      try {
        const cachedRaw = localStorage.getItem("hirenza-contests-cache");
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          // 1 hour cache validity
          if (Date.now() - (cached.timestamp || 0) < 3600000 && cached.items?.length) {
            return;
          }
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);

        const [cfResponse, lcResponse] = await Promise.all([
          fetch("https://codeforces.com/api/contest.list?gym=false", { signal: controller.signal }).catch(() => null),
          fetch("/api/contests", { signal: controller.signal }).catch(() => null)
        ]);
        clearTimeout(timeout);

        let upcomingCf: ContestItem[] = [];
        let upcomingLc: ContestItem[] = [];

        if (cfResponse?.ok) {
          const data = await cfResponse.json();
          if (data.status === "OK" && Array.isArray(data.result)) {
            upcomingCf = data.result
              .filter((c: { phase: string; startTimeSeconds: number }) => c.phase === "BEFORE" && c.startTimeSeconds)
              .slice(0, 5)
              .map((c: { id: number; name: string; startTimeSeconds: number; durationSeconds: number }) => ({
                id: `cf-${c.id}`,
                platform: "Codeforces" as const,
                title: c.name,
                startTime: new Date(c.startTimeSeconds * 1000).toISOString(),
                durationMinutes: Math.round(c.durationSeconds / 60),
                url: `https://codeforces.com/contest/${c.id}`,
              }));
          }
        }

        if (lcResponse?.ok) {
          const data = await lcResponse.json();
          if (data.success && Array.isArray(data.leetcode)) {
            upcomingLc = data.leetcode;
          }
        }

        if (upcomingCf.length > 0 || upcomingLc.length > 0) {
          const nonCfLc = UPCOMING_CONTESTS.filter(c => c.platform !== "Codeforces" && c.platform !== "LeetCode");
          const merged = [...upcomingCf, ...upcomingLc, ...nonCfLc].sort(
            (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
          );

          setContests(merged);
          localStorage.setItem(
            "hirenza-contests-cache",
            JSON.stringify({ timestamp: Date.now(), items: merged })
          );
        }
      } catch {
        // Offline or API unreachable: gracefully stay on default deterministic schedule
      }
    };

    fetchLiveContests();
  }, []);

  const filteredContests = useMemo(() => {
    const upcoming = getUpcomingContests(contests, now);
    if (platformFilter === "All") return upcoming;
    return upcoming.filter(c => c.platform === platformFilter);
  }, [platformFilter, contests, now]);

  const platformBadgeColor = (platform: ContestItem["platform"]) => {
    switch (platform) {
      case "LeetCode":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Codeforces":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "CodeChef":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "AtCoder":
        return "bg-purple-500/10 text-purple-300 border-purple-500/20";
      default:
        return "bg-surface-3 text-secondary border-border-soft";
    }
  };

  const formatCountdown = (isoString: string) => {
    if (!now) return "Upcoming";
    const diff = new Date(isoString).getTime() - now;
    if (diff <= 0) return "Live Now";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) return `in ${days}d ${hours}h`;
    return `in ${hours}h`;
  };

  return (
    <div
      className={`card p-5 sm:p-6 bg-surface-1 border border-border rounded-2xl ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-border-soft">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 shrink-0">
            <Trophy size={18} />
          </div>
          <div>
            <h3 className="text-base font-bold text-primary">Contest Radar & Calendar</h3>
            <p className="text-xs text-muted">
              Upcoming rounds across LeetCode, Codeforces, CodeChef, and AtCoder with one-click .ics export.
            </p>
          </div>
        </div>

        {/* Platform Filters */}
        <div className="flex flex-wrap gap-1.5">
          {["All", "LeetCode", "Codeforces", "CodeChef", "AtCoder"].map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setPlatformFilter(p)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                platformFilter === p
                  ? "bg-purple-1 text-white"
                  : "bg-surface-2 text-secondary border border-border-soft hover:border-purple-1/30"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Contests Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredContests.map(c => {
          const startDate = new Date(c.startTime);
          const dateString = startDate.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });
          const timeString = startDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={c.id}
              className="p-4 rounded-xl border border-border bg-surface-2/60 hover:bg-surface-2 hover:border-purple-1/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${platformBadgeColor(
                      c.platform
                    )}`}
                  >
                    {c.platform}
                  </span>
                  <span className="text-[11px] font-mono text-purple-400 font-semibold">
                    {formatCountdown(c.startTime)}
                  </span>
                </div>

                <h4 className="font-semibold text-sm text-primary mb-2 line-clamp-1">{c.title}</h4>

                <div className="space-y-1 text-xs text-muted mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-muted shrink-0" />
                    <span>
                      {dateString} at {timeString}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-muted shrink-0" />
                    <span>Duration: {c.durationMinutes} mins</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border-soft flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => downloadIcsCalendar(c)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-3 hover:bg-surface-hover text-secondary hover:text-primary text-xs font-medium border border-border-soft transition-colors cursor-pointer"
                  title="Add to Google Calendar / Outlook (.ics)"
                >
                  <Download size={11} />
                  <span>.ICS</span>
                </button>

                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-purple-1 hover:opacity-90 text-white text-xs font-semibold transition-opacity"
                >
                  <span>Portal</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

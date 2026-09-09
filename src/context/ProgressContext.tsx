"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { findCatalogItem, getAllCatalogItems, CatalogItem } from "@/data/catalog";

export type ProblemStatus = "unsolved" | "attempted" | "solved" | "review" | "mastered";

export interface ProgressEvent {
  date: string; // "YYYY-MM-DD"
  problemId: string;
  module: string;
  topic?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
}

export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  targetCompany: string;
  targetDate: string;
  hoursPerDay: number;
}

export interface ProgressData {
  version: 2;
  statuses: Record<string, ProblemStatus>;
  bookmarks: Record<string, boolean>;
  events: ProgressEvent[];
  profile: UserProfile;
}

const STORAGE_KEY = "hirenza-v2-progress";

const defaultProfile: UserProfile = {
  name: "Builder",
  email: "builder@example.com",
  bio: "Preparing for Tier-1 Tech & Product Engineering Roles",
  targetCompany: "Google",
  targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  hoursPerDay: 2,
};

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function loadInitialData(): ProgressData {
  if (typeof window === "undefined") {
    return { version: 2, statuses: {}, bookmarks: {}, events: [], profile: defaultProfile };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return {
          version: 2,
          statuses: parsed.statuses || {},
          bookmarks: parsed.bookmarks || {},
          events: parsed.events || [],
          profile: { ...defaultProfile, ...(parsed.profile || {}) },
        };
      }
    }
  } catch {
    // fallback to migration
  }

  // Legacy Migration
  const migratedStatuses: Record<string, ProblemStatus> = {};
  const migratedBookmarks: Record<string, boolean> = {};
  const migratedEvents: ProgressEvent[] = [];
  let migratedProfile: UserProfile = { ...defaultProfile };

  try {
    // 1. hirenza-dsa-status
    const dsaStatus = localStorage.getItem("hirenza-dsa-status");
    if (dsaStatus) {
      const parsed = JSON.parse(dsaStatus);
      Object.entries(parsed).forEach(([k, v]) => {
        migratedStatuses[k] = v as ProblemStatus;
        if (v === "solved" || v === "mastered") {
          migratedEvents.push({ date: getTodayString(), problemId: k, module: "dsa" });
        }
      });
    }

    // 2. hirenza-dsa-bookmarks
    const dsaBm = localStorage.getItem("hirenza-dsa-bookmarks");
    if (dsaBm) {
      const parsed = JSON.parse(dsaBm);
      Object.entries(parsed).forEach(([k, v]) => {
        if (v) migratedBookmarks[k] = true;
      });
    }

    // 3. QuestionList states
    ["sql", "package-wise", "core-subjects", "default"].forEach(key => {
      const raw = localStorage.getItem(`hirenza-questions-state:${key}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.completed) {
          Object.keys(parsed.completed).forEach(id => {
            const fullId = key === "sql" ? `sql-${id}` : key === "package-wise" ? `pkg-${id}` : key === "core-subjects" ? `cs-${id}` : String(id);
            migratedStatuses[fullId] = "solved";
            migratedEvents.push({ date: getTodayString(), problemId: fullId, module: key });
          });
        }
        if (parsed.bookmarked) {
          Object.keys(parsed.bookmarked).forEach(id => {
            const fullId = key === "sql" ? `sql-${id}` : key === "package-wise" ? `pkg-${id}` : key === "core-subjects" ? `cs-${id}` : String(id);
            migratedBookmarks[fullId] = true;
          });
        }
      }
    });

    // 4. hirenza-profile
    const profRaw = localStorage.getItem("hirenza-profile");
    if (profRaw) {
      const parsed = JSON.parse(profRaw);
      if (parsed) migratedProfile = { ...defaultProfile, ...parsed };
    }
  } catch {
    // ignore migration error
  }

  const result: ProgressData = {
    version: 2,
    statuses: migratedStatuses,
    bookmarks: migratedBookmarks,
    events: migratedEvents,
    profile: migratedProfile,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    // localStorage full or restricted
  }

  return result;
}

interface ProgressContextValue {
  data: ProgressData;
  isCompleted: (id: string | number) => boolean;
  isBookmarked: (id: string | number) => boolean;
  getStatus: (id: string | number) => ProblemStatus;
  setStatus: (id: string | number, status: ProblemStatus, meta?: { module?: string; topic?: string; difficulty?: "Easy" | "Medium" | "Hard" }) => void;
  toggleComplete: (id: string | number, meta?: { module?: string; topic?: string; difficulty?: "Easy" | "Medium" | "Hard" }) => void;
  toggleBookmark: (id: string | number) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  exportData: () => string;
  importData: (jsonStr: string) => boolean;
  resetProgress: () => void;
  streak: { current: number; longest: number; activeToday: boolean };
  heatmapData: Record<string, number>;
  moduleStats: Record<string, { solved: number; total: number; percent: number }>;
  topicMastery: { topic: string; solved: number; total: number; percent: number; color: string }[];
  allBookmarks: CatalogItem[];
  revisionQueue: (CatalogItem & { status: ProblemStatus; daysSince: number })[];
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ProgressData>(loadInitialData);

  // Sync to localStorage
  const persistData = useCallback((newData: ProgressData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      // Sync legacy keys for backward-compatibility
      localStorage.setItem("hirenza-dsa-status", JSON.stringify(newData.statuses));
      localStorage.setItem("hirenza-dsa-bookmarks", JSON.stringify(newData.bookmarks));
      localStorage.setItem("hirenza-profile", JSON.stringify(newData.profile));
    } catch {
      // storage unavailable
    }
  }, []);

  // Cross-tab sync
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setData(parsed);
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const normalizeId = (id: string | number): string => String(id);

  const getStatus = useCallback((id: string | number): ProblemStatus => {
    const strId = normalizeId(id);
    return data.statuses[strId] || "unsolved";
  }, [data.statuses]);

  const isCompleted = useCallback((id: string | number): boolean => {
    const s = getStatus(id);
    return s === "solved" || s === "mastered";
  }, [getStatus]);

  const isBookmarked = useCallback((id: string | number): boolean => {
    const strId = normalizeId(id);
    return !!data.bookmarks[strId];
  }, [data.bookmarks]);

  const setStatus = useCallback((id: string | number, status: ProblemStatus, meta?: { module?: string; topic?: string; difficulty?: "Easy" | "Medium" | "Hard" }) => {
    const strId = normalizeId(id);
    const today = getTodayString();

    const newStatuses = { ...data.statuses, [strId]: status };
    const newEvents = [...data.events];

    if (status === "solved" || status === "mastered") {
      // Record event if not already recorded today for this problem
      const exists = newEvents.some(e => e.problemId === strId && e.date === today);
      if (!exists) {
        newEvents.push({
          date: today,
          problemId: strId,
          module: meta?.module || "dsa",
          topic: meta?.topic,
          difficulty: meta?.difficulty,
        });
      }
    }

    persistData({
      ...data,
      statuses: newStatuses,
      events: newEvents,
    });
  }, [data, persistData]);

  const toggleComplete = useCallback((id: string | number, meta?: { module?: string; topic?: string; difficulty?: "Easy" | "Medium" | "Hard" }) => {
    const current = getStatus(id);
    const next: ProblemStatus = current === "solved" || current === "mastered" ? "unsolved" : "solved";
    setStatus(id, next, meta);
  }, [getStatus, setStatus]);

  const toggleBookmark = useCallback((id: string | number) => {
    const strId = normalizeId(id);
    const next = !data.bookmarks[strId];
    const newBookmarks = { ...data.bookmarks };
    if (next) {
      newBookmarks[strId] = true;
    } else {
      delete newBookmarks[strId];
    }
    persistData({
      ...data,
      bookmarks: newBookmarks,
    });
  }, [data, persistData]);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    const newProfile = { ...data.profile, ...updates };
    persistData({
      ...data,
      profile: newProfile,
    });
  }, [data, persistData]);

  const resetProgress = useCallback(() => {
    const fresh: ProgressData = {
      version: 2,
      statuses: {},
      bookmarks: {},
      events: [],
      profile: defaultProfile,
    };
    persistData(fresh);
  }, [persistData]);

  const exportData = useCallback((): string => {
    return JSON.stringify(data, null, 2);
  }, [data]);

  const importData = useCallback((jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === "object") {
        const validated: ProgressData = {
          version: 2,
          statuses: parsed.statuses || {},
          bookmarks: parsed.bookmarks || {},
          events: Array.isArray(parsed.events) ? parsed.events : [],
          profile: { ...defaultProfile, ...(parsed.profile || {}) },
        };
        persistData(validated);
        return true;
      }
    } catch {
      // invalid json
    }
    return false;
  }, [persistData]);

  // Derived: Streaks
  const streak = useMemo(() => {
    const uniqueDates = Array.from(new Set(data.events.map(e => e.date))).sort();
    if (uniqueDates.length === 0) {
      return { current: 0, longest: 0, activeToday: false };
    }

    const todayStr = getTodayString();
    const activeToday = uniqueDates.includes(todayStr);

    let current = 0;
    let longest = 0;
    let tempStreak = 0;

    // Calculate streaks by checking consecutive dates
    const dateObjs = uniqueDates.map(d => {
      const [y, m, day] = d.split("-").map(Number);
      return new Date(y, m - 1, day);
    });

    for (let i = 0; i < dateObjs.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const diffDays = Math.round((dateObjs[i].getTime() - dateObjs[i - 1].getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          tempStreak++;
        } else if (diffDays > 1) {
          tempStreak = 1;
        }
      }
      if (tempStreak > longest) longest = tempStreak;
    }

    // Check if the streak continues up to today or yesterday
    const lastDate = dateObjs[dateObjs.length - 1];
    const todayObj = new Date();
    todayObj.setHours(0, 0, 0, 0);
    const diffFromToday = Math.round((todayObj.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

    if (diffFromToday === 0 || diffFromToday === 1) {
      current = tempStreak;
    } else {
      current = 0;
    }

    return { current, longest: Math.max(longest, current), activeToday };
  }, [data.events]);

  // Derived: Heatmap { "YYYY-MM-DD": count }
  const heatmapData = useMemo(() => {
    const map: Record<string, number> = {};
    data.events.forEach(e => {
      map[e.date] = (map[e.date] || 0) + 1;
    });
    return map;
  }, [data.events]);

  // Derived: Module Stats
  const moduleStats = useMemo(() => {
    const catalog = getAllCatalogItems();
    const modules = ["dsa", "sql", "system-design", "core-subjects", "package-wise", "companies"] as const;
    const stats: Record<string, { solved: number; total: number; percent: number }> = {};

    modules.forEach(mod => {
      const items = catalog.filter(i => i.module === mod);
      const total = items.length || 1;
      const solved = items.filter(i => {
        const s = data.statuses[i.id];
        return s === "solved" || s === "mastered";
      }).length;
      stats[mod] = {
        solved,
        total,
        percent: Math.min(100, Math.round((solved / total) * 100)),
      };
    });

    return stats;
  }, [data.statuses]);

  // Derived: Topic Mastery
  const topicMastery = useMemo(() => {
    const catalog = getAllCatalogItems();
    const keyTopics = [
      { name: "Arrays & Strings", match: ["Array", "String", "Two Pointers", "Sliding Window"], color: "bg-emerald-500" },
      { name: "Trees & Graphs", match: ["Tree", "Graph", "BST", "Binary Tree", "Trie"], color: "bg-blue-500" },
      { name: "Dynamic Programming", match: ["Dynamic Programming", "DP"], color: "bg-purple-500" },
      { name: "System Design", match: ["HLD", "LLD", "Distributed Systems", "Databases"], color: "bg-amber-500" },
      { name: "SQL Queries", match: ["SELECT", "JOINs", "Aggregation", "Window Functions", "Subqueries"], color: "bg-cyan-500" },
    ];

    return keyTopics.map(cat => {
      const matchingItems = catalog.filter(item => {
        const top = (item.topic || "").toLowerCase();
        return cat.match.some(m => top.includes(m.toLowerCase()));
      });
      const total = matchingItems.length || 1;
      const solved = matchingItems.filter(i => {
        const s = data.statuses[i.id];
        return s === "solved" || s === "mastered";
      }).length;

      return {
        topic: cat.name,
        solved,
        total,
        percent: Math.min(100, Math.round((solved / total) * 100)),
        color: cat.color,
      };
    });
  }, [data.statuses]);

  // Derived: All Bookmarks
  const allBookmarks = useMemo(() => {
    const list: CatalogItem[] = [];
    Object.keys(data.bookmarks).forEach(id => {
      if (data.bookmarks[id]) {
        const item = findCatalogItem(id);
        if (item) {
          list.push(item);
        } else {
          list.push({
            id,
            title: `Item #${id}`,
            module: "dsa",
            moduleLabel: "Saved Item",
            href: "/preparation",
          });
        }
      }
    });
    return list;
  }, [data.bookmarks]);

  // Derived: Spaced Repetition Revision Queue
  const revisionQueue = useMemo(() => {
    const catalog = getAllCatalogItems();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueItems: (CatalogItem & { status: ProblemStatus; daysSince: number })[] = [];

    // 1. Items manually set to "review"
    // 2. Items solved whose latest event matches Leitner interval (+1, +3, +7, +16, +35 days)
    catalog.forEach(item => {
      const s = data.statuses[item.id];
      if (s === "review") {
        dueItems.push({ ...item, status: "review", daysSince: 0 });
      } else if (s === "solved") {
        const itemEvents = data.events.filter(e => e.problemId === item.id);
        if (itemEvents.length > 0) {
          const lastEventDate = itemEvents[itemEvents.length - 1].date;
          const [y, m, day] = lastEventDate.split("-").map(Number);
          const eventDate = new Date(y, m - 1, day);
          const diffDays = Math.round((today.getTime() - eventDate.getTime()) / (1000 * 3600 * 24));
          const intervals = [1, 3, 7, 16, 35];
          if (intervals.includes(diffDays) || diffDays >= 7) {
            dueItems.push({ ...item, status: "solved", daysSince: diffDays });
          }
        }
      }
    });

    return dueItems;
  }, [data.statuses, data.events]);

  const value: ProgressContextValue = {
    data,
    isCompleted,
    isBookmarked,
    getStatus,
    setStatus,
    toggleComplete,
    toggleBookmark,
    updateProfile,
    exportData,
    importData,
    resetProgress,
    streak,
    heatmapData,
    moduleStats,
    topicMastery,
    allBookmarks,
    revisionQueue,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}

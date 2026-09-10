"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { findCatalogItem, getAllCatalogItems, CatalogItem } from "@/data/catalog";
import { 
  ProgressDataSchema, 
  ValidatedProgressData, 
  ValidatedUserProfile, 
  ValidatedProblemStatus,
  ValidatedRevisionState,
  ValidatedProgressEvent
} from "@/lib/schema";
import { StorageService } from "@/lib/storage";

export type ProblemStatus = ValidatedProblemStatus;
export type UserProfile = ValidatedUserProfile;
export type ProgressData = ValidatedProgressData;
export type RevisionState = ValidatedRevisionState;
export type ProgressEvent = ValidatedProgressEvent;

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const REVIEW_INTERVALS = [1, 3, 7, 16, 35];

function calculateNextReviewAt(stage: number): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysToAdd = REVIEW_INTERVALS[Math.min(stage, REVIEW_INTERVALS.length - 1)];
  const nextDate = new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  return nextDate.toISOString();
}

function loadInitialData(): ProgressData {
  if (typeof window === "undefined") {
    return ProgressDataSchema.parse({ version: 2 });
  }

  const data = StorageService.loadProgress();
  if (data) return data;
  
  // Return default if parsing fails or no data
  return ProgressDataSchema.parse({ version: 2 });
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
  revisionQueue: (CatalogItem & { status: ProblemStatus; daysSince: number; nextReviewAt: string })[];
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ProgressData>(loadInitialData);

  const persistData = useCallback((newData: ProgressData) => {
    setData(newData);
    StorageService.saveProgress(newData);
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "hirenza-v2-progress" && e.newValue) {
        const loaded = StorageService.loadProgress();
        if (loaded) setData(loaded);
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
    const todayStr = getTodayString();
    const todayIso = new Date().toISOString();

    const newStatuses = { ...data.statuses, [strId]: status };
    const newEvents = [...data.events];
    const newRevisions = { ...data.revisions };

    // Record activity event
    if (status === "solved" || status === "mastered" || status === "review" || status === "attempted") {
      // Allow multiple events but let's just push one for today to keep it clean, or update existing for today
      const existingTodayIndex = newEvents.findIndex(e => e.problemId === strId && e.date.startsWith(todayStr));
      if (existingTodayIndex === -1) {
        newEvents.push({
          date: todayIso,
          problemId: strId,
          module: meta?.module || "dsa",
          topic: meta?.topic,
          difficulty: meta?.difficulty,
        });
      }
    }

    // Handle Revision Engine
    if (status === "solved") {
      const currentRev = newRevisions[strId];
      if (!currentRev) {
        // Initial solve
        newRevisions[strId] = {
          lastReviewedAt: todayIso,
          nextReviewAt: calculateNextReviewAt(0),
          reviewStage: 0,
          reviewCount: 1,
        };
      } else {
        // Repeated solve / review
        newRevisions[strId] = {
          ...currentRev,
          lastReviewedAt: todayIso,
          nextReviewAt: calculateNextReviewAt(currentRev.reviewStage + 1),
          reviewStage: currentRev.reviewStage + 1,
          reviewCount: currentRev.reviewCount + 1,
        };
        // Auto-promote to mastered
        if (currentRev.reviewStage + 1 >= 5) {
          newStatuses[strId] = "mastered";
        }
      }
    } else if (status === "unsolved") {
      // User explicitly reverts to unsolved. We don't wipe revision history (as requested), 
      // but we don't necessarily schedule it for review either unless it's re-solved.
    }

    // Sort events so latest are always at the end
    newEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    persistData({
      ...data,
      statuses: newStatuses,
      events: newEvents,
      revisions: newRevisions,
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
    persistData(ProgressDataSchema.parse({}));
  }, [persistData]);

  const exportData = useCallback((): string => {
    return JSON.stringify(data, null, 2);
  }, [data]);

  const importData = useCallback((jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      const validated = ProgressDataSchema.parse(parsed);
      persistData(validated);
      return true;
    } catch {
      return false;
    }
  }, [persistData]);

  const streak = useMemo(() => {
    // Extract YYYY-MM-DD from ISO strings
    const uniqueDates = Array.from(new Set(data.events.map(e => {
      return e.date.includes("T") ? e.date.split("T")[0] : e.date;
    }))).sort();
    
    if (uniqueDates.length === 0) {
      return { current: 0, longest: 0, activeToday: false };
    }

    const todayStr = getTodayString();
    const activeToday = uniqueDates.includes(todayStr);

    let current = 0;
    let longest = 0;
    let tempStreak = 0;

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

  const heatmapData = useMemo(() => {
    const map: Record<string, number> = {};
    data.events.forEach(e => {
      const d = e.date.includes("T") ? e.date.split("T")[0] : e.date;
      map[d] = (map[d] || 0) + 1;
    });
    return map;
  }, [data.events]);

  const moduleStats = useMemo(() => {
    const catalog = getAllCatalogItems();
    const modules = ["dsa", "sql", "system-design", "core-subjects", "package-wise", "companies"] as const;
    const stats: Record<string, { solved: number; total: number; percent: number }> = {};

    modules.forEach(mod => {
      const items = catalog.filter(i => i.module === mod);
      const total = items.length || 0; // Fixed empty data logic to 0 / 0
      const solved = items.filter(i => {
        const s = data.statuses[i.id];
        return s === "solved" || s === "mastered";
      }).length;
      stats[mod] = {
        solved,
        total,
        percent: total === 0 ? 0 : Math.min(100, Math.round((solved / total) * 100)),
      };
    });

    return stats;
  }, [data.statuses]);

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
      const total = matchingItems.length || 0; // Fix empty logic
      const solved = matchingItems.filter(i => {
        const s = data.statuses[i.id];
        return s === "solved" || s === "mastered";
      }).length;

      return {
        topic: cat.name,
        solved,
        total,
        percent: total === 0 ? 0 : Math.min(100, Math.round((solved / total) * 100)),
        color: cat.color,
      };
    });
  }, [data.statuses]);

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

  const revisionQueue = useMemo(() => {
    const catalog = getAllCatalogItems();
    const today = new Date();
    
    const dueItems: (CatalogItem & { status: ProblemStatus; daysSince: number; nextReviewAt: string })[] = [];

    catalog.forEach(item => {
      const s = data.statuses[item.id];
      const rev = data.revisions[item.id];
      
      if (s === "review") {
        dueItems.push({ ...item, status: "review", daysSince: 0, nextReviewAt: new Date().toISOString() });
      } else if (s === "solved" && rev) {
        const nextReviewDate = new Date(rev.nextReviewAt);
        if (nextReviewDate <= today) {
          const daysSince = Math.max(0, Math.floor((today.getTime() - new Date(rev.lastReviewedAt).getTime()) / (1000 * 3600 * 24)));
          dueItems.push({ ...item, status: "solved", daysSince, nextReviewAt: rev.nextReviewAt });
        }
      }
    });

    return dueItems;
  }, [data.statuses, data.revisions]);

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

import { getAllProblems, type Problem } from "@/data/dsaSheets";

export interface DailyChallengeInfo {
  date: string;
  problem: Problem;
  dayIndex: number;
  totalProblems: number;
}

/**
 * Format a Date object to YYYY-MM-DD string in local time.
 */
export function getLocalDateKey(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Deterministic integer hash function for date strings.
 * Guarantees identical challenge for every user worldwide on that date.
 */
function hashDateString(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Deterministically retrieves the challenge problem for any given YYYY-MM-DD date.
 */
export function getDailyChallenge(dateStr?: string): DailyChallengeInfo {
  const targetDate = dateStr || getLocalDateKey();
  const all = getAllProblems();
  const hash = hashDateString(targetDate);
  const index = hash % all.length;

  return {
    date: targetDate,
    problem: all[index],
    dayIndex: index,
    totalProblems: all.length,
  };
}

/**
 * Generates the past N days of daily challenges for the streak history ribbon.
 */
export function getDailyHistory(days = 7): { date: string; displayLabel: string; problem: Problem }[] {
  const result: { date: string; displayLabel: string; problem: Problem }[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = getLocalDateKey(d);
    const challenge = getDailyChallenge(key);
    
    // Format display: e.g. "Wed", "Today"
    const isToday = i === 0;
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const displayLabel = isToday ? "Today" : dayName;

    result.push({
      date: key,
      displayLabel,
      problem: challenge.problem,
    });
  }

  return result;
}

/**
 * Checks if a user is eligible for a streak freeze token (1 freeze per 7 days).
 */
export function isFreezeTokenEligible(lastFreezeTimestamp: number | null): boolean {
  if (!lastFreezeTimestamp) return true;
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  return Date.now() - lastFreezeTimestamp >= SEVEN_DAYS_MS;
}

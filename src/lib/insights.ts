import { dsaPatterns, Pattern } from "@/data/patterns";

export interface PatternMasteryInput {
  topic: string;
  solved: number;
  total: number;
  percent: number;
}

export interface WeakPatternReport {
  unlocked: boolean;
  solvedCount: number;
  requiredCount: number;
  weakestPattern?: {
    name: string;
    slug: string;
    userPercent: number;
    meanPercent: number;
    gap: number;
    recommendedProblems: {
      title: string;
      difficulty: "Easy" | "Medium" | "Hard";
      url?: string;
    }[];
  };
}

export function detectWeakestPattern(
  masteryList: PatternMasteryInput[],
  totalSolved: number,
  patternsCatalog: Pattern[] = dsaPatterns
): WeakPatternReport {
  const REQUIRED_SOLVES = 10;

  if (totalSolved < REQUIRED_SOLVES) {
    return {
      unlocked: false,
      solvedCount: totalSolved,
      requiredCount: REQUIRED_SOLVES,
    };
  }

  // Calculate overall average pattern solve percentage
  const validEntries = masteryList.filter((m) => m.total > 0);
  if (validEntries.length === 0) {
    return {
      unlocked: true,
      solvedCount: totalSolved,
      requiredCount: REQUIRED_SOLVES,
    };
  }

  const meanPercent = Math.round(
    validEntries.reduce((sum, item) => sum + item.percent, 0) / validEntries.length
  );

  // Find pattern with largest negative gap from mean (or lowest percent with remaining unsolved)
  let weakest: PatternMasteryInput | null = null;
  let maxGap = -1;

  for (const item of validEntries) {
    if (item.solved < item.total) {
      const gap = meanPercent - item.percent;
      if (gap > maxGap) {
        maxGap = gap;
        weakest = item;
      }
    }
  }

  // Fallback to absolute lowest if no gap > 0
  if (!weakest) {
    weakest = validEntries.reduce((min, curr) => (curr.percent < min.percent ? curr : min), validEntries[0]);
  }

  const matchedPattern = patternsCatalog.find(
    (p) => p.name.toLowerCase() === weakest?.topic.toLowerCase() || p.id === weakest?.topic.toLowerCase()
  ) || patternsCatalog[0];

  const recommendedProblems = (matchedPattern?.problems || []).slice(0, 3).map((prob) => ({
    title: prob.title,
    difficulty: prob.difficulty,
    url: prob.leetcodeUrl || prob.gfgUrl,
  }));

  return {
    unlocked: true,
    solvedCount: totalSolved,
    requiredCount: REQUIRED_SOLVES,
    weakestPattern: {
      name: matchedPattern?.name || weakest.topic,
      slug: matchedPattern?.id || "two-pointers",
      userPercent: weakest.percent,
      meanPercent,
      gap: Math.max(0, meanPercent - weakest.percent),
      recommendedProblems,
    },
  };
}

import { describe, it, expect } from "vitest";
import { getDailyChallenge, getDailyHistory, getLocalDateKey } from "../src/lib/daily";
import { generateStudyPlan } from "../src/lib/plan";
import { detectWeakestPattern } from "../src/lib/insights";
import { dsaSheets, companies, dsaPatterns, technologies } from "../src/data";

describe("Deterministic Daily Challenge Engine", () => {
  it("returns identical challenge for the same date seed", () => {
    const challenge1 = getDailyChallenge("2026-09-10");
    const challenge2 = getDailyChallenge("2026-09-10");

    expect(challenge1.problem.id).toBe(challenge2.problem.id);
    expect(challenge1.problem.title).toBe(challenge2.problem.title);
    expect(challenge1.dayIndex).toBe(challenge2.dayIndex);
  });

  it("returns different problem across adjacent dates", () => {
    const day1 = getDailyChallenge("2026-09-10");
    const day2 = getDailyChallenge("2026-09-11");

    expect(day1.problem.id).not.toBe(day2.problem.id);
  });

  it("produces correct history length with valid date keys", () => {
    const history = getDailyHistory(7);
    expect(history.length).toBe(7);
    for (const item of history) {
      expect(item.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(item.problem.title).toBeDefined();
    }
  });

  it("formats local date keys consistently", () => {
    const fixedDate = new Date(2026, 8, 10); // Sept 10, 2026
    const key = getLocalDateKey(fixedDate);
    expect(key).toBe("2026-09-10");
  });
});

describe("Study Plan Generator Engine", () => {
  it("generates structured 30-day plan", () => {
    const plan = generateStudyPlan({
      targetCompany: "Google",
      role: "SDE-1",
      timelineDays: 30,
      level: "Intermediate",
      hoursPerDay: 3,
    });

    expect(plan.timelineDays).toBe(30);
    expect(plan.totalWeeks).toBe(4);
    expect(plan.weeks.length).toBeGreaterThanOrEqual(4);
    expect(plan.weeks[0].tasks.length).toBeGreaterThan(0);

    for (const week of plan.weeks) {
      for (const task of week.tasks) {
        expect(task.deepLink.startsWith("/preparation")).toBe(true);
        expect(task.targetCount).toBeGreaterThan(0);
      }
    }
  });

  it("generates structured 60-day and 90-day plans with deeper coverage", () => {
    const plan60 = generateStudyPlan({
      targetCompany: "Amazon",
      role: "SDE-2",
      timelineDays: 60,
      level: "Advanced",
      hoursPerDay: 4,
    });

    const plan90 = generateStudyPlan({
      targetCompany: "Microsoft",
      role: "SDE-1",
      timelineDays: 90,
      level: "Beginner",
      hoursPerDay: 2,
    });

    expect(plan60.weeks.length).toBeGreaterThanOrEqual(8);
    expect(plan90.weeks.length).toBeGreaterThanOrEqual(8);
  });
});

describe("Weakest Pattern Insights Radar", () => {
  it("locks analysis when user has fewer than 10 total solves", () => {
    const report = detectWeakestPattern(
      [
        { topic: "Two Pointers", solved: 3, total: 10, percent: 30 },
        { topic: "Sliding Window", solved: 2, total: 10, percent: 20 },
      ],
      5 // < 10 solves
    );

    expect(report.unlocked).toBe(false);
    expect(report.requiredCount).toBe(10);
  });

  it("unlocks and identifies the pattern with the lowest percentage", () => {
    const report = detectWeakestPattern(
      [
        { topic: "Two Pointers", solved: 9, total: 10, percent: 90 },
        { topic: "Sliding Window", solved: 8, total: 10, percent: 80 },
        { topic: "Dynamic Programming", solved: 2, total: 10, percent: 20 },
      ],
      19 // >= 10 solves
    );

    expect(report.unlocked).toBe(true);
    expect(report.weakestPattern).toBeDefined();
    expect(report.weakestPattern?.name.toLowerCase()).toContain("dynamic programming");
    expect(report.weakestPattern?.userPercent).toBe(20);
  });
});

describe("Catalog & Navigation Integrity", () => {
  it("all sheets have non-empty problem topics and valid level badges", () => {
    for (const s of dsaSheets) {
      expect(s.topics.length).toBeGreaterThan(0);
      expect(["Beginner", "Intermediate", "Advanced"]).toContain(s.level);
    }
  });

  it("all companies have non-empty descriptions and logos", () => {
    for (const c of companies) {
      expect(c.description.length).toBeGreaterThan(10);
      expect(c.logo.length).toBeGreaterThan(0);
    }
  });

  it("all 20 patterns have valid descriptions and problem sets", () => {
    expect(dsaPatterns.length).toBeGreaterThanOrEqual(20);
    for (const p of dsaPatterns) {
      expect(p.problems.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(10);
    }
  });

  it("technologies list contains valid ids and names without duplicates", () => {
    const ids = technologies.map(t => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

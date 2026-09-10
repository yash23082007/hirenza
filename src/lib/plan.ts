export interface PlanAnswers {
  targetCompany: string;
  role: string;
  timelineDays: 30 | 60 | 90;
  level: "Beginner" | "Intermediate" | "Advanced";
  hoursPerDay: number;
}

export interface PlanTask {
  id: string;
  title: string;
  category: "DSA Pattern" | "Company Focus" | "System Design" | "SQL" | "Revision";
  targetCount: number;
  deepLink: string;
  description: string;
}

export interface PlanWeek {
  weekNumber: number;
  theme: string;
  focusArea: string;
  tasks: PlanTask[];
}

export interface StudyPlan {
  timelineDays: number;
  targetCompany: string;
  role: string;
  totalWeeks: number;
  estimatedHours: number;
  weeks: PlanWeek[];
}

export function generateStudyPlan(answers: PlanAnswers): StudyPlan {
  const weeksCount = Math.round(answers.timelineDays / 7);
  const totalHours = answers.timelineDays * answers.hoursPerDay;
  const compSlug = answers.targetCompany.toLowerCase().replace(/\s+/g, "-");

  const weeks: PlanWeek[] = [];

  // Week 1: Always Foundations & Two Pointers
  weeks.push({
    weekNumber: 1,
    theme: "Algorithmic Intuition & Linear Sequences",
    focusArea: "Two Pointers, Sliding Window, and Array Manipulation",
    tasks: [
      {
        id: "w1-t1",
        title: "Two Pointers & In-Place Modification",
        category: "DSA Pattern",
        targetCount: 8,
        deepLink: "/preparation/20-patterns/two-pointers",
        description: "Master 3Sum, Container With Most Water, and duplicate removal patterns.",
      },
      {
        id: "w1-t2",
        title: "Sliding Window Core Templates",
        category: "DSA Pattern",
        targetCount: 6,
        deepLink: "/preparation/20-patterns/sliding-window",
        description: "Solve longest substring without repeating characters & minimum window substring.",
      },
      {
        id: "w1-t3",
        title: "Striver A2Z - Easy Arrays",
        category: "DSA Pattern",
        targetCount: 10,
        deepLink: "/preparation/dsa-sheets/striver-a2z",
        description: "Solidify prefix sum, Kadane's algorithm, and Dutch National Flag sort.",
      },
    ],
  });

  // Week 2: Linked Lists & Binary Search
  weeks.push({
    weekNumber: 2,
    theme: "Search Space Reduction & Pointer Gymnastics",
    focusArea: "Binary Search on Answer & Fast/Slow Pointers",
    tasks: [
      {
        id: "w2-t1",
        title: "Fast & Slow Pointers (Floyd's Cycle)",
        category: "DSA Pattern",
        targetCount: 5,
        deepLink: "/preparation/20-patterns/fast-slow-pointers",
        description: "Detect cycle beginnings, middle nodes, and happy numbers.",
      },
      {
        id: "w2-t2",
        title: "Modified Binary Search Archetypes",
        category: "DSA Pattern",
        targetCount: 7,
        deepLink: "/preparation/dsa-sheets/striver-a2z",
        description: "Search in rotated sorted arrays and find peak elements.",
      },
      {
        id: "w2-t3",
        title: "SQL Window Functions & Ranking",
        category: "SQL",
        targetCount: 6,
        deepLink: "/preparation/sql-sheet",
        description: "Practice DENSE_RANK, ROW_NUMBER, and running totals.",
      },
    ],
  });

  // Week 3: Trees & Graphs
  weeks.push({
    weekNumber: 3,
    theme: "Hierarchical Traversal & Recursion",
    focusArea: "Binary Trees, BSTs, and Graph DFS/BFS",
    tasks: [
      {
        id: "w3-t1",
        title: "Tree Depth & Level Order Traversals",
        category: "DSA Pattern",
        targetCount: 8,
        deepLink: "/preparation/dsa-sheets/neetcode-150",
        description: "Lowest common ancestor, diameter of binary tree, and inverted trees.",
      },
      {
        id: "w3-t2",
        title: `${answers.targetCompany} Priority Archive - Part 1`,
        category: "Company Focus",
        targetCount: 6,
        deepLink: `/preparation/company-wise-dsa/${compSlug}`,
        description: `Solve the highest-frequency interview problems reported for ${answers.targetCompany}.`,
      },
      {
        id: "w3-t3",
        title: "System Design: Scaling & Caching Tiers",
        category: "System Design",
        targetCount: 3,
        deepLink: "/preparation/system-design",
        description: "Understand write-through vs write-back caching and Redis sharding.",
      },
    ],
  });

  // Week 4: Dynamic Programming & Company Simulation
  weeks.push({
    weekNumber: 4,
    theme: "Optimization & High-Frequency Archive",
    focusArea: `DP Patterns & ${answers.targetCompany} Onsite Simulations`,
    tasks: [
      {
        id: "w4-t1",
        title: "0/1 Knapsack & Longest Common Subsequence",
        category: "DSA Pattern",
        targetCount: 8,
        deepLink: "/preparation/20-patterns",
        description: "Identify overlapping subproblems and memoization states.",
      },
      {
        id: "w4-t2",
        title: `${answers.targetCompany} Priority Archive - Part 2`,
        category: "Company Focus",
        targetCount: 8,
        deepLink: `/preparation/company-wise-dsa/${compSlug}`,
        description: `Complete the remaining high-frequency problems tagged for ${answers.targetCompany}.`,
      },
      {
        id: "w4-t3",
        title: "Timed Interview Simulation",
        category: "Revision",
        targetCount: 4,
        deepLink: "/preparation/simulator",
        description: "Simulate 45-minute timed coding rounds under countdown constraints.",
      },
    ],
  });

  // If 60 or 90 days, add extra specialized weeks
  if (weeksCount >= 8) {
    weeks.push(
      {
        weekNumber: 5,
        theme: "Advanced Graphs & Topological Ordering",
        focusArea: "Dijkstra, Bellman-Ford, and Course Schedule DAGs",
        tasks: [
          {
            id: "w5-t1",
            title: "Topological Sort & Cycle Detection",
            category: "DSA Pattern",
            targetCount: 6,
            deepLink: "/preparation/dsa-sheets/striver-a2z",
            description: "Course schedule I & II, alien dictionary, and Kahns algorithm.",
          },
          {
            id: "w5-t2",
            title: "System Design: Microservices & Event-Driven Architecture",
            category: "System Design",
            targetCount: 4,
            deepLink: "/preparation/system-design",
            description: "Kafka event streaming, idempotent consumers, and database sharding.",
          },
        ],
      },
      {
        weekNumber: 6,
        theme: "System Design Deep Dive & Mock Rounds",
        focusArea: "Rate Limiters, URL Shorteners, and Distributed File Storage",
        tasks: [
          {
            id: "w6-t1",
            title: "Design a Distributed Rate Limiter",
            category: "System Design",
            targetCount: 2,
            deepLink: "/preparation/system-design",
            description: "Token bucket vs leaky bucket algorithms and Redis cell implementation.",
          },
          {
            id: "w6-t2",
            title: "Hard LeetCode Archetypes",
            category: "Company Focus",
            targetCount: 5,
            deepLink: `/preparation/company-wise-dsa/${compSlug}`,
            description: "Solve hard difficulty problems commonly encountered in round 3 and 4.",
          },
        ],
      },
      {
        weekNumber: 7,
        theme: "Behavioral Mastery & STAR Method Polish",
        focusArea: "HR Behavioral Q&A & Leadership Principles",
        tasks: [
          {
            id: "w7-t1",
            title: "HR Behavioral Flashcards Deck",
            category: "Revision",
            targetCount: 15,
            deepLink: "/preparation/flashcards",
            description: "Refine STAR stories for conflict resolution, project leadership, and failure.",
          },
        ],
      },
      {
        weekNumber: 8,
        theme: "Final Polish & High-Decay Problem Revision",
        focusArea: "Active Spaced Repetition Review Queue",
        tasks: [
          {
            id: "w8-t1",
            title: "Clear Revision Queue & Due Cards",
            category: "Revision",
            targetCount: 12,
            deepLink: "/preparation",
            description: "Review problems flagged in your Leitner spaced repetition queue.",
          },
        ],
      }
    );
  }

  return {
    timelineDays: answers.timelineDays,
    targetCompany: answers.targetCompany,
    role: answers.role,
    totalWeeks: weeks.length,
    estimatedHours: totalHours,
    weeks,
  };
}

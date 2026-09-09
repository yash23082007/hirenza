export interface PackageWiseProblem {
  id: string;
  title: string;
  leetcodeUrl: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  pattern: string;
  packageRange: string;
  frequency: "High" | "Medium" | "Low";
}

export const packageWiseData: Record<string, PackageWiseProblem[]> = {
  "3-5 LPA": [
    { id: "pkg1", title: "Two Sum", leetcodeUrl: "https://leetcode.com/problems/two-sum/", difficulty: "Easy", topic: "Arrays", pattern: "Hash Map", packageRange: "3-5 LPA", frequency: "High" },
    { id: "pkg2", title: "Valid Parentheses", leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/", difficulty: "Easy", topic: "Stack", pattern: "Stack", packageRange: "3-5 LPA", frequency: "High" },
    { id: "pkg3", title: "Reverse String", leetcodeUrl: "https://leetcode.com/problems/reverse-string/", difficulty: "Easy", topic: "Strings", pattern: "Two Pointers", packageRange: "3-5 LPA", frequency: "High" },
    { id: "pkg4", title: "Contains Duplicate", leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/", difficulty: "Easy", topic: "Arrays", pattern: "Hash Set", packageRange: "3-5 LPA", frequency: "High" },
    { id: "pkg5", title: "Maximum Subarray", leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/", difficulty: "Easy", topic: "Arrays", pattern: "Kadane's", packageRange: "3-5 LPA", frequency: "Medium" },
    { id: "pkg6", title: "Merge Two Sorted Lists", leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: "Easy", topic: "Linked List", pattern: "Merge", packageRange: "3-5 LPA", frequency: "Medium" },
    { id: "pkg7", title: "Best Time to Buy and Sell Stock", leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: "Easy", topic: "Arrays", pattern: "Greedy", packageRange: "3-5 LPA", frequency: "High" },
    { id: "pkg8", title: "Missing Number", leetcodeUrl: "https://leetcode.com/problems/missing-number/", difficulty: "Easy", topic: "Arrays", pattern: "Math", packageRange: "3-5 LPA", frequency: "Medium" },
  ],
  "5-10 LPA": [
    { id: "pkg9", title: "3Sum", leetcodeUrl: "https://leetcode.com/problems/3sum/", difficulty: "Medium", topic: "Arrays", pattern: "Two Pointers", packageRange: "5-10 LPA", frequency: "High" },
    { id: "pkg10", title: "Group Anagrams", leetcodeUrl: "https://leetcode.com/problems/group-anagrams/", difficulty: "Medium", topic: "Arrays", pattern: "Hash Map", packageRange: "5-10 LPA", frequency: "High" },
    { id: "pkg11", title: "Longest Substring Without Repeating Characters", leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium", topic: "Strings", pattern: "Sliding Window", packageRange: "5-10 LPA", frequency: "High" },
    { id: "pkg12", title: "Number of Islands", leetcodeUrl: "https://leetcode.com/problems/number-of-islands/", difficulty: "Medium", topic: "Graphs", pattern: "DFS", packageRange: "5-10 LPA", frequency: "High" },
    { id: "pkg13", title: "Merge Intervals", leetcodeUrl: "https://leetcode.com/problems/merge-intervals/", difficulty: "Medium", topic: "Arrays", pattern: "Sorting", packageRange: "5-10 LPA", frequency: "High" },
    { id: "pkg14", title: "Validate Binary Search Tree", leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/", difficulty: "Medium", topic: "Trees", pattern: "DFS", packageRange: "5-10 LPA", frequency: "Medium" },
    { id: "pkg15", title: "Course Schedule", leetcodeUrl: "https://leetcode.com/problems/course-schedule/", difficulty: "Medium", topic: "Graphs", pattern: "Topological Sort", packageRange: "5-10 LPA", frequency: "Medium" },
    { id: "pkg16", title: "Subsets", leetcodeUrl: "https://leetcode.com/problems/subsets/", difficulty: "Medium", topic: "Backtracking", pattern: "Backtracking", packageRange: "5-10 LPA", frequency: "Medium" },
  ],
  "10-20 LPA": [
    { id: "pkg17", title: "Trapping Rain Water", leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/", difficulty: "Hard", topic: "Arrays", pattern: "Two Pointers", packageRange: "10-20 LPA", frequency: "High" },
    { id: "pkg18", title: "Word Ladder", leetcodeUrl: "https://leetcode.com/problems/word-ladder/", difficulty: "Hard", topic: "Graphs", pattern: "BFS", packageRange: "10-20 LPA", frequency: "High" },
    { id: "pkg19", title: "Median of Two Sorted Arrays", leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/", difficulty: "Hard", topic: "Arrays", pattern: "Binary Search", packageRange: "10-20 LPA", frequency: "High" },
    { id: "pkg20", title: "Merge k Sorted Lists", leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "Hard", topic: "Linked List", pattern: "Heap", packageRange: "10-20 LPA", frequency: "High" },
    { id: "pkg21", title: "Minimum Window Substring", leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/", difficulty: "Hard", topic: "Strings", pattern: "Sliding Window", packageRange: "10-20 LPA", frequency: "High" },
    { id: "pkg22", title: "Regular Expression Matching", leetcodeUrl: "https://leetcode.com/problems/regular-expression-matching/", difficulty: "Hard", topic: "Dynamic Programming", pattern: "DP", packageRange: "10-20 LPA", frequency: "Medium" },
    { id: "pkg23", title: "Serialize and Deserialize Binary Tree", leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", difficulty: "Hard", topic: "Trees", pattern: "DFS", packageRange: "10-20 LPA", frequency: "Medium" },
    { id: "pkg24", title: "Find Median from Data Stream", leetcodeUrl: "https://leetcode.com/problems/find-median-from-data-stream/", difficulty: "Hard", topic: "Design", pattern: "Two Heaps", packageRange: "10-20 LPA", frequency: "Medium" },
  ],
  "20-40 LPA": [
    { id: "pkg25", title: "Alien Dictionary", leetcodeUrl: "https://leetcode.com/problems/alien-dictionary/", difficulty: "Hard", topic: "Graphs", pattern: "Topological Sort", packageRange: "20-40 LPA", frequency: "High" },
    { id: "pkg26", title: "Sliding Window Median", leetcodeUrl: "https://leetcode.com/problems/sliding-window-median/", difficulty: "Hard", topic: "Arrays", pattern: "Two Heaps", packageRange: "20-40 LPA", frequency: "High" },
    { id: "pkg27", title: "LRU Cache", leetcodeUrl: "https://leetcode.com/problems/lru-cache/", difficulty: "Medium", topic: "Design", pattern: "HashMap + DLL", packageRange: "20-40 LPA", frequency: "High" },
    { id: "pkg28", title: "Design Twitter", leetcodeUrl: "https://leetcode.com/problems/design-twitter/", difficulty: "Medium", topic: "Design", pattern: "HashMap + Heap", packageRange: "20-40 LPA", frequency: "Medium" },
    { id: "pkg29", title: "Bus Routes", leetcodeUrl: "https://leetcode.com/problems/bus-routes/", difficulty: "Hard", topic: "Graphs", pattern: "BFS", packageRange: "20-40 LPA", frequency: "Medium" },
    { id: "pkg30", title: "Critical Connections in a Network", leetcodeUrl: "https://leetcode.com/problems/critical-connections-in-a-network/", difficulty: "Hard", topic: "Graphs", pattern: "Tarjan's Bridge", packageRange: "20-40 LPA", frequency: "Medium" },
    { id: "pkg31", title: "First Missing Positive", leetcodeUrl: "https://leetcode.com/problems/first-missing-positive/", difficulty: "Hard", topic: "Arrays", pattern: "Cyclic Sort", packageRange: "20-40 LPA", frequency: "High" },
    { id: "pkg32", title: "Maximal Rectangle", leetcodeUrl: "https://leetcode.com/problems/maximal-rectangle/", difficulty: "Hard", topic: "Dynamic Programming", pattern: "Stack", packageRange: "20-40 LPA", frequency: "Medium" },
  ],
  "40-60 LPA": [
    { id: "pkg33", title: "Wildcard Matching", leetcodeUrl: "https://leetcode.com/problems/wildcard-matching/", difficulty: "Hard", topic: "Dynamic Programming", pattern: "DP", packageRange: "40-60 LPA", frequency: "High" },
    { id: "pkg34", title: "N-Queens", leetcodeUrl: "https://leetcode.com/problems/n-queens/", difficulty: "Hard", topic: "Backtracking", pattern: "Backtracking", packageRange: "40-60 LPA", frequency: "High" },
    { id: "pkg35", title: "The Skyline Problem", leetcodeUrl: "https://leetcode.com/problems/the-skyline-problem/", difficulty: "Hard", topic: "Arrays", pattern: "Divide and Conquer", packageRange: "40-60 LPA", frequency: "Medium" },
    { id: "pkg36", title: "Palindrome Partitioning II", leetcodeUrl: "https://leetcode.com/problems/palindrome-partitioning-ii/", difficulty: "Hard", topic: "Dynamic Programming", pattern: "DP", packageRange: "40-60 LPA", frequency: "Medium" },
    { id: "pkg37", title: "Largest Rectangle in Histogram", leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/", difficulty: "Hard", topic: "Arrays", pattern: "Stack", packageRange: "40-60 LPA", frequency: "High" },
    { id: "pkg38", title: "Distinct Subsequences", leetcodeUrl: "https://leetcode.com/problems/distinct-subsequences/", difficulty: "Hard", topic: "Dynamic Programming", pattern: "DP", packageRange: "40-60 LPA", frequency: "Medium" },
    { id: "pkg39", title: "Edit Distance", leetcodeUrl: "https://leetcode.com/problems/edit-distance/", difficulty: "Medium", topic: "Dynamic Programming", pattern: "DP", packageRange: "40-60 LPA", frequency: "High" },
    { id: "pkg40", title: "Max Points on a Line", leetcodeUrl: "https://leetcode.com/problems/max-points-on-a-line/", difficulty: "Hard", topic: "Math", pattern: "Geometry", packageRange: "40-60 LPA", frequency: "Medium" },
  ],
  "60+ LPA": [
    { id: "pkg41", title: "Candy", leetcodeUrl: "https://leetcode.com/problems/candy/", difficulty: "Hard", topic: "Greedy", pattern: "Greedy", packageRange: "60+ LPA", frequency: "High" },
    { id: "pkg42", title: "Best Time to Buy and Sell Stock III", leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/", difficulty: "Hard", topic: "Dynamic Programming", pattern: "DP", packageRange: "60+ LPA", frequency: "High" },
    { id: "pkg43", title: "Longest Valid Parentheses", leetcodeUrl: "https://leetcode.com/problems/longest-valid-parentheses/", difficulty: "Hard", topic: "Dynamic Programming", pattern: "DP + Stack", packageRange: "60+ LPA", frequency: "High" },
    { id: "pkg44", title: "Sudoku Solver", leetcodeUrl: "https://leetcode.com/problems/sudoku-solver/", difficulty: "Hard", topic: "Backtracking", pattern: "Backtracking", packageRange: "60+ LPA", frequency: "Medium" },
    { id: "pkg45", title: "Smallest Range Covering Elements from K Lists", leetcodeUrl: "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/", difficulty: "Hard", topic: "Arrays", pattern: "Sliding Window + Heap", packageRange: "60+ LPA", frequency: "Medium" },
    { id: "pkg46", title: "Burst Balloons", leetcodeUrl: "https://leetcode.com/problems/burst-balloons/", difficulty: "Hard", topic: "Dynamic Programming", pattern: "Interval DP", packageRange: "60+ LPA", frequency: "Medium" },
    { id: "pkg47", title: "Russian Doll Envelopes", leetcodeUrl: "https://leetcode.com/problems/russian-doll-envelopes/", difficulty: "Hard", topic: "Dynamic Programming", pattern: "DP + Sorting", packageRange: "60+ LPA", frequency: "Medium" },
    { id: "pkg48", title: "Number of Digit One", leetcodeUrl: "https://leetcode.com/problems/number-of-digit-one/", difficulty: "Hard", topic: "Math", pattern: "Math", packageRange: "60+ LPA", frequency: "Low" },
  ],
};

export const packageRanges = [
  { range: "3-5 LPA", count: 8, description: "Service-based companies: TCS, Infosys, Wipro, Cognizant" },
  { range: "5-10 LPA", count: 8, description: "Mid-tier product companies: Startups, Unicorns" },
  { range: "10-20 LPA", count: 8, description: "Top product companies: Adobe, Oracle, Samsung" },
  { range: "20-40 LPA", count: 8, description: "FAANG tier-2: Amazon, Microsoft, Uber, LinkedIn" },
  { range: "40-60 LPA", count: 8, description: "FAANG tier-1: Google, Meta, Apple, Netflix" },
  { range: "60+ LPA", count: 8, description: "HFT, Quant firms: Jane Street, Tower Research, Graviton" },
];

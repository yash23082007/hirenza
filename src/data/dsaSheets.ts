export interface Problem {
  id: string;
  title: string;
  leetcodeUrl?: string;
  gfgUrl?: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  pattern?: string;
  frequency?: "High" | "Medium" | "Low";
}

export interface DSASheet {
  id: string;
  name: string;
  educator: string;
  description: string;
  sourceUrl: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  topics: { name: string; problems: Problem[] }[];
}

export const dsaSheets: DSASheet[] = [
  {
    id: "striver-a2z",
    name: "Striver's A2Z DSA Sheet",
    educator: "Striver (TakeUForward)",
    description: "Complete A-to-Z DSA course covering 40+ topics. Best structured progression for placement prep.",
    sourceUrl: "https://takeuforward.org/strivers-a2z-dsa-course-sheet-2",
    level: "Beginner",
    topics: [
      {
        name: "Arrays - Easy",
        problems: [
          { id: "s1", title: "Largest Element in Array", gfgUrl: "https://www.geeksforgeeks.org/c-program-find-largest-element-array/", difficulty: "Easy", topic: "Arrays" },
          { id: "s2", title: "Second Largest Element", leetcodeUrl: "https://leetcode.com/problems/second-largest-digit-in-a-string/", difficulty: "Easy", topic: "Arrays" },
          { id: "s3", title: "Check if Array is Sorted and Rotated", leetcodeUrl: "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/", difficulty: "Easy", topic: "Arrays" },
          { id: "s4", title: "Remove Duplicates from Sorted Array", leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", difficulty: "Easy", topic: "Arrays", pattern: "Two Pointers" },
          { id: "s5", title: "Left Rotate Array by One", leetcodeUrl: "https://leetcode.com/problems/rotate-array/", difficulty: "Easy", topic: "Arrays" },
          { id: "s6", title: "Move Zeroes to End", leetcodeUrl: "https://leetcode.com/problems/move-zeroes/", difficulty: "Easy", topic: "Arrays", pattern: "Two Pointers" },
          { id: "s7", title: "Union of Two Sorted Arrays", gfgUrl: "https://www.geeksforgeeks.org/union-and-intersection-of-two-sorted-arrays-2/", difficulty: "Easy", topic: "Arrays" },
          { id: "s8", title: "Missing Number", leetcodeUrl: "https://leetcode.com/problems/missing-number/", difficulty: "Easy", topic: "Arrays", pattern: "Math" },
          { id: "s9", title: "Max Consecutive Ones", leetcodeUrl: "https://leetcode.com/problems/max-consecutive-ones/", difficulty: "Easy", topic: "Arrays" },
          { id: "s10", title: "Single Number (XOR)", leetcodeUrl: "https://leetcode.com/problems/single-number/", difficulty: "Easy", topic: "Arrays", pattern: "Bit Manipulation" },
        ],
      },
      {
        name: "Arrays - Medium",
        problems: [
          { id: "s11", title: "Two Sum", leetcodeUrl: "https://leetcode.com/problems/two-sum/", difficulty: "Medium", topic: "Arrays", pattern: "Hash Map" },
          { id: "s12", title: "Sort Colors (Dutch National Flag)", leetcodeUrl: "https://leetcode.com/problems/sort-colors/", difficulty: "Medium", topic: "Arrays", pattern: "Three Pointers" },
          { id: "s13", title: "Majority Element (>n/2)", leetcodeUrl: "https://leetcode.com/problems/majority-element/", difficulty: "Medium", topic: "Arrays", pattern: "Boyer-Moore" },
          { id: "s14", title: "Maximum Subarray Sum (Kadane's)", leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/", difficulty: "Medium", topic: "Arrays", pattern: "Kadane's Algorithm" },
          { id: "s15", title: "Best Time to Buy and Sell Stock", leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: "Easy", topic: "Arrays", pattern: "Sliding Window" },
          { id: "s16", title: "Rearrange Array by Sign", leetcodeUrl: "https://leetcode.com/problems/rearrange-array-elements-by-sign/", difficulty: "Medium", topic: "Arrays" },
          { id: "s17", title: "Next Permutation", leetcodeUrl: "https://leetcode.com/problems/next-permutation/", difficulty: "Medium", topic: "Arrays", frequency: "High" },
          { id: "s18", title: "Leaders in Array", gfgUrl: "https://www.geeksforgeeks.org/leaders-in-an-array/", difficulty: "Easy", topic: "Arrays" },
          { id: "s19", title: "Longest Consecutive Sequence", leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence/", difficulty: "Medium", topic: "Arrays", pattern: "Hash Set" },
          { id: "s20", title: "Set Matrix Zeroes", leetcodeUrl: "https://leetcode.com/problems/set-matrix-zeroes/", difficulty: "Medium", topic: "Arrays", frequency: "High" },
        ],
      },
      {
        name: "Binary Search",
        problems: [
          { id: "s21", title: "Binary Search", leetcodeUrl: "https://leetcode.com/problems/binary-search/", difficulty: "Easy", topic: "Binary Search", pattern: "Binary Search" },
          { id: "s22", title: "Lower Bound (GFG)", leetcodeUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", difficulty: "Easy", topic: "Binary Search", pattern: "Binary Search" },
          { id: "s23", title: "Search Insert Position", leetcodeUrl: "https://leetcode.com/problems/search-insert-position/", difficulty: "Easy", topic: "Binary Search", pattern: "Binary Search" },
          { id: "s24", title: "Find First and Last Position", leetcodeUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", difficulty: "Medium", topic: "Binary Search", pattern: "Binary Search" },
          { id: "s25", title: "Search in Rotated Sorted Array", leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/", difficulty: "Medium", topic: "Binary Search", pattern: "Binary Search" },
          { id: "s26", title: "Find Minimum in Rotated Sorted Array", leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", difficulty: "Medium", topic: "Binary Search", pattern: "Binary Search" },
          { id: "s27", title: "Single Element in Sorted Array", leetcodeUrl: "https://leetcode.com/problems/single-element-in-a-sorted-array/", difficulty: "Medium", topic: "Binary Search", pattern: "Binary Search" },
          { id: "s28", title: "Peak Element", leetcodeUrl: "https://leetcode.com/problems/find-peak-element/", difficulty: "Medium", topic: "Binary Search", pattern: "Binary Search" },
          { id: "s29", title: "Square Root using BS", leetcodeUrl: "https://leetcode.com/problems/sqrtx/", difficulty: "Easy", topic: "Binary Search", pattern: "Binary Search" },
          { id: "s30", title: "Koko Eating Bananas", leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas/", difficulty: "Medium", topic: "Binary Search", pattern: "Binary Search on Answer" },
        ],
      },
      {
        name: "Linked List",
        problems: [
          { id: "s31", title: "Introduction to LinkedList", gfgUrl: "https://www.geeksforgeeks.org/data-structures/linked-list/", difficulty: "Easy", topic: "Linked List" },
          { id: "s32", title: "Insert in LinkedList", gfgUrl: "https://www.geeksforgeeks.org/linked-list-set-2-introducing/", difficulty: "Easy", topic: "Linked List" },
          { id: "s33", title: "Delete Node in LinkedList", leetcodeUrl: "https://leetcode.com/problems/delete-node-in-a-linked-list/", difficulty: "Easy", topic: "Linked List" },
          { id: "s34", title: "Length of LinkedList (Iterative & Recursive)", gfgUrl: "https://www.geeksforgeeks.org/find-length-of-a-linked-list-iterative-and-recursive/", difficulty: "Easy", topic: "Linked List" },
          { id: "s35", title: "Middle of LinkedList", leetcodeUrl: "https://leetcode.com/problems/middle-of-the-linked-list/", difficulty: "Easy", topic: "Linked List", pattern: "Fast & Slow Pointers" },
          { id: "s36", title: "Reverse LinkedList (Iterative)", leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "Easy", topic: "Linked List" },
          { id: "s37", title: "Reverse LinkedList (Recursive)", leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "Easy", topic: "Linked List" },
          { id: "s38", title: "Detect Cycle in LinkedList", leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/", difficulty: "Easy", topic: "Linked List", pattern: "Fast & Slow Pointers" },
          { id: "s39", title: "Starting Point of Cycle", leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle-ii/", difficulty: "Medium", topic: "Linked List", pattern: "Fast & Slow Pointers" },
          { id: "s40", title: "Merge Two Sorted Lists", leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: "Easy", topic: "Linked List" },
        ],
      },
    ],
  },
  {
    id: "neetcode-150",
    name: "NeetCode 150 DSA Sheet",
    educator: "NeetCode",
    description: "150 problems organized by the 20 essential patterns. Gold standard for pattern-based prep.",
    sourceUrl: "https://neetcode.io/practice",
    level: "Advanced",
    topics: [
      {
        name: "Arrays & Hashing",
        problems: [
          { id: "n1", title: "Contains Duplicate", leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/", difficulty: "Easy", topic: "Arrays", pattern: "Hash Set" },
          { id: "n2", title: "Valid Anagram", leetcodeUrl: "https://leetcode.com/problems/valid-anagram/", difficulty: "Easy", topic: "Strings", pattern: "Hash Map" },
          { id: "n3", title: "Two Sum", leetcodeUrl: "https://leetcode.com/problems/two-sum/", difficulty: "Easy", topic: "Arrays", pattern: "Hash Map", frequency: "High" },
          { id: "n4", title: "Group Anagrams", leetcodeUrl: "https://leetcode.com/problems/group-anagrams/", difficulty: "Medium", topic: "Arrays", pattern: "Hash Map" },
          { id: "n5", title: "Top K Frequent Elements", leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "Medium", topic: "Arrays", pattern: "Heap" },
          { id: "n6", title: "Product of Array Except Self", leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/", difficulty: "Medium", topic: "Arrays", pattern: "Prefix Product" },
          { id: "n7", title: "Valid Sudoku", leetcodeUrl: "https://leetcode.com/problems/valid-sudoku/", difficulty: "Medium", topic: "Arrays", pattern: "Hash Set" },
          { id: "n8", title: "Longest Consecutive Sequence", leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence/", difficulty: "Medium", topic: "Arrays", pattern: "Hash Set" },
        ],
      },
      {
        name: "Two Pointers",
        problems: [
          { id: "n9", title: "Valid Palindrome", leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/", difficulty: "Easy", topic: "Strings", pattern: "Two Pointers" },
          { id: "n10", title: "Two Sum II (Sorted)", leetcodeUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", difficulty: "Medium", topic: "Arrays", pattern: "Two Pointers" },
          { id: "n11", title: "3Sum", leetcodeUrl: "https://leetcode.com/problems/3sum/", difficulty: "Medium", topic: "Arrays", pattern: "Two Pointers", frequency: "High" },
          { id: "n12", title: "Container With Most Water", leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/", difficulty: "Medium", topic: "Arrays", pattern: "Two Pointers", frequency: "High" },
          { id: "n13", title: "Trapping Rain Water", leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/", difficulty: "Hard", topic: "Arrays", pattern: "Two Pointers", frequency: "High" },
        ],
      },
      {
        name: "Sliding Window",
        problems: [
          { id: "n14", title: "Best Time to Buy and Sell Stock", leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: "Easy", topic: "Arrays", pattern: "Sliding Window" },
          { id: "n15", title: "Longest Substring Without Repeating", leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium", topic: "Strings", pattern: "Sliding Window" },
          { id: "n16", title: "Longest Repeating Character Replacement", leetcodeUrl: "https://leetcode.com/problems/longest-repeating-character-replacement/", difficulty: "Medium", topic: "Strings", pattern: "Sliding Window" },
          { id: "n17", title: "Permutation in String", leetcodeUrl: "https://leetcode.com/problems/permutation-in-string/", difficulty: "Medium", topic: "Strings", pattern: "Sliding Window" },
          { id: "n18", title: "Minimum Window Substring", leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/", difficulty: "Hard", topic: "Strings", pattern: "Sliding Window", frequency: "High" },
        ],
      },
      {
        name: "Stack",
        problems: [
          { id: "n19", title: "Valid Parentheses", leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/", difficulty: "Easy", topic: "Stack", pattern: "Monotonic Stack" },
          { id: "n20", title: "Min Stack", leetcodeUrl: "https://leetcode.com/problems/min-stack/", difficulty: "Medium", topic: "Stack" },
          { id: "n21", title: "Evaluate Reverse Polish Notation", leetcodeUrl: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", difficulty: "Medium", topic: "Stack" },
          { id: "n22", title: "Generate Parentheses", leetcodeUrl: "https://leetcode.com/problems/generate-parentheses/", difficulty: "Medium", topic: "Stack", pattern: "Backtracking", frequency: "High" },
          { id: "n23", title: "Daily Temperatures", leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/", difficulty: "Medium", topic: "Stack", pattern: "Monotonic Stack" },
        ],
      },
    ],
  },
  {
    id: "love-babbar",
    name: "Love Babbar DSA Sheet",
    educator: "Love Babbar (CodeHelp)",
    description: "450 curated problems organized by topic. Classic placement-focused sheet trusted by thousands.",
    sourceUrl: "https://www.geeksforgeeks.org/dsa-sheet-by-love-babbar/",
    level: "Beginner",
    topics: [
      {
        name: "Arrays",
        problems: [
          { id: "b1", title: "Reverse the array", gfgUrl: "https://www.geeksforgeeks.org/write-a-program-to-reverse-an-array-or-string/", difficulty: "Easy", topic: "Arrays" },
          { id: "b2", title: "Maximum and minimum of an array", gfgUrl: "https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/", difficulty: "Easy", topic: "Arrays" },
          { id: "b3", title: "Kth smallest element", leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "Medium", topic: "Arrays", pattern: "Quick Select" },
          { id: "b4", title: "Sort array of 0s, 1s, 2s", leetcodeUrl: "https://leetcode.com/problems/sort-colors/", difficulty: "Medium", topic: "Arrays", pattern: "Dutch National Flag" },
          { id: "b5", title: "Move all negative to beginning", gfgUrl: "https://www.geeksforgeeks.org/move-negative-numbers-beginning-positive-end-constant-extra-space/", difficulty: "Easy", topic: "Arrays" },
          { id: "b6", title: "Union and Intersection of arrays", gfgUrl: "https://www.geeksforgeeks.org/union-and-intersection-of-two-sorted-arrays-2/", difficulty: "Easy", topic: "Arrays" },
          { id: "b7", title: "Cycle detection in array (Rotation)", gfgUrl: "https://www.geeksforgeeks.org/cyclically-rotate-an-array-by-one/", difficulty: "Easy", topic: "Arrays" },
          { id: "b8", title: "Minimum number of jumps", leetcodeUrl: "https://leetcode.com/problems/jump-game-ii/", difficulty: "Medium", topic: "Arrays", pattern: "Greedy" },
        ],
      },
    ],
  },
  {
    id: "arsh-goyal",
    name: "Arsh Goyal DSA Sheet",
    educator: "Arsh Goyal",
    description: "280 high-frequency problems from actual interview experiences at top tech companies.",
    sourceUrl: "https://www.geeksforgeeks.org/dsa-sheet-by-arsh-goyal/",
    level: "Intermediate",
    topics: [
      {
        name: "High-Frequency Problems",
        problems: [
          { id: "a1", title: "Set Matrix Zeroes", leetcodeUrl: "https://leetcode.com/problems/set-matrix-zeroes/", difficulty: "Medium", topic: "Arrays", frequency: "High" },
          { id: "a2", title: "Pascal's Triangle", leetcodeUrl: "https://leetcode.com/problems/pascals-triangle/", difficulty: "Easy", topic: "Arrays", frequency: "High" },
          { id: "a3", title: "Next Permutation", leetcodeUrl: "https://leetcode.com/problems/next-permutation/", difficulty: "Medium", topic: "Arrays", frequency: "High" },
          { id: "a4", title: "Kadane's Algorithm", leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/", difficulty: "Medium", topic: "Arrays", pattern: "Kadane's", frequency: "High" },
          { id: "a5", title: "Sort Colors", leetcodeUrl: "https://leetcode.com/problems/sort-colors/", difficulty: "Medium", topic: "Arrays", frequency: "High" },
          { id: "a6", title: "Merge Intervals", leetcodeUrl: "https://leetcode.com/problems/merge-intervals/", difficulty: "Medium", topic: "Arrays", pattern: "Merge Intervals", frequency: "High" },
          { id: "a7", title: "Merge Sorted Arrays", leetcodeUrl: "https://leetcode.com/problems/merge-sorted-array/", difficulty: "Easy", topic: "Arrays", frequency: "High" },
        ],
      },
    ],
  },
  {
    id: "shradha-khapra",
    name: "Shradha Khapra DSA Sheet",
    educator: "Shradha Khapra (Apna College)",
    description: "375 problems for beginners to intermediate. Clear progression with video solutions.",
    sourceUrl: "https://www.apnacollege.in/",
    level: "Beginner",
    topics: [
      {
        name: "Fundamentals",
        problems: [
          { id: "sk1", title: "Sum of Array Elements", gfgUrl: "https://www.geeksforgeeks.org/program-to-find-sum-of-all-elements-in-an-array/", difficulty: "Easy", topic: "Arrays" },
          { id: "sk2", title: "Find minimum & maximum", gfgUrl: "https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/", difficulty: "Easy", topic: "Arrays" },
          { id: "sk3", title: "Reverse an Array", gfgUrl: "https://www.geeksforgeeks.org/write-a-program-to-reverse-an-array-or-string/", difficulty: "Easy", topic: "Arrays" },
          { id: "sk4", title: "Check palindrome string", leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/", difficulty: "Easy", topic: "Strings", pattern: "Two Pointers" },
          { id: "sk5", title: "Fibonacci Number", leetcodeUrl: "https://leetcode.com/problems/fibonacci-number/", difficulty: "Easy", topic: "Recursion", pattern: "Dynamic Programming" },
        ],
      },
    ],
  },
  {
    id: "rohit-negi",
    name: "Rohit Negi DSA Sheet",
    educator: "Rohit Negi (Coder Army)",
    description: "300 essential problems with emphasis on pattern recognition and concise focused prep.",
    sourceUrl: "https://coderarmy.in",
    level: "Intermediate",
    topics: [
      {
        name: "Core Problems",
        problems: [
          { id: "rn1", title: "Sliding Window Maximum", leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/", difficulty: "Hard", topic: "Arrays", pattern: "Sliding Window" },
          { id: "rn2", title: "Minimum Size Subarray Sum", leetcodeUrl: "https://leetcode.com/problems/minimum-size-subarray-sum/", difficulty: "Medium", topic: "Arrays", pattern: "Sliding Window" },
          { id: "rn3", title: "Find All Anagrams in String", leetcodeUrl: "https://leetcode.com/problems/find-all-anagrams-in-a-string/", difficulty: "Medium", topic: "Strings", pattern: "Sliding Window" },
          { id: "rn4", title: "Rotting Oranges (BFS)", leetcodeUrl: "https://leetcode.com/problems/rotting-oranges/", difficulty: "Medium", topic: "Graphs", pattern: "BFS" },
          { id: "rn5", title: "Word Ladder", leetcodeUrl: "https://leetcode.com/problems/word-ladder/", difficulty: "Hard", topic: "Graphs", pattern: "BFS", frequency: "High" },
        ],
      },
    ],
  },
  {
    id: "fraz",
    name: "Fraz DSA Sheet",
    educator: "Fraz (CodeWithFraz)",
    description: "120 must-do problems for maximum coverage with minimum problems.",
    sourceUrl: "https://www.youtube.com/@coderfraz",
    level: "Intermediate",
    topics: [
      {
        name: "Essential Problems",
        problems: [
          { id: "f1", title: "Two Sum", leetcodeUrl: "https://leetcode.com/problems/two-sum/", difficulty: "Easy", topic: "Arrays", pattern: "Hash Map" },
          { id: "f2", title: "Best Time to Buy Sell Stock", leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: "Easy", topic: "Arrays", pattern: "Greedy" },
          { id: "f3", title: "Contains Duplicate", leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/", difficulty: "Easy", topic: "Arrays", pattern: "Hash Set" },
          { id: "f4", title: "Product of Array Except Self", leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/", difficulty: "Medium", topic: "Arrays", pattern: "Prefix Product" },
          { id: "f5", title: "Maximum Subarray", leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/", difficulty: "Medium", topic: "Arrays", pattern: "Kadane's Algorithm" },
        ],
      },
    ],
  },
];

export function getAllProblems(): Problem[] {
  const problems: Problem[] = [];
  dsaSheets.forEach(sheet => {
    sheet.topics.forEach(topic => {
      problems.push(...topic.problems);
    });
  });
  return problems;
}

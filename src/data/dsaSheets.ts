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
  banner?: string;
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
    banner: "/banners/striver-a2z.webp",
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
      {
        name: "Recursion & Backtracking",
        problems: [
          { id: "s41", title: "Subset Sums", gfgUrl: "https://www.geeksforgeeks.org/subset-sum-problem-dp-25/", difficulty: "Easy", topic: "Recursion", pattern: "Recursion" },
          { id: "s42", title: "Subsets II (Unique Subsets)", leetcodeUrl: "https://leetcode.com/problems/subsets-ii/", difficulty: "Medium", topic: "Backtracking", pattern: "Backtracking" },
          { id: "s43", title: "Combination Sum", leetcodeUrl: "https://leetcode.com/problems/combination-sum/", difficulty: "Medium", topic: "Backtracking", pattern: "Backtracking" },
          { id: "s44", title: "Combination Sum II", leetcodeUrl: "https://leetcode.com/problems/combination-sum-ii/", difficulty: "Medium", topic: "Backtracking", pattern: "Backtracking" },
          { id: "s45", title: "Palindrome Partitioning", leetcodeUrl: "https://leetcode.com/problems/palindrome-partitioning/", difficulty: "Medium", topic: "Backtracking", pattern: "Backtracking" },
          { id: "s46", title: "N-Queens", leetcodeUrl: "https://leetcode.com/problems/n-queens/", difficulty: "Hard", topic: "Backtracking", pattern: "Backtracking", frequency: "High" },
          { id: "s47", title: "Sudoku Solver", leetcodeUrl: "https://leetcode.com/problems/sudoku-solver/", difficulty: "Hard", topic: "Backtracking", pattern: "Backtracking" },
          { id: "s48", title: "Rat in a Maze Problem", gfgUrl: "https://www.geeksforgeeks.org/rat-in-a-maze-backtracking-2/", difficulty: "Medium", topic: "Backtracking", pattern: "Backtracking" },
        ],
      },
      {
        name: "Stack & Queue",
        problems: [
          { id: "s49", title: "Implement Stack using Queues", leetcodeUrl: "https://leetcode.com/problems/implement-stack-using-queues/", difficulty: "Easy", topic: "Stack" },
          { id: "s50", title: "Implement Queue using Stacks", leetcodeUrl: "https://leetcode.com/problems/implement-queue-using-stacks/", difficulty: "Easy", topic: "Queue" },
          { id: "s51", title: "Valid Parentheses", leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/", difficulty: "Easy", topic: "Stack", pattern: "Stack" },
          { id: "s52", title: "Next Greater Element I", leetcodeUrl: "https://leetcode.com/problems/next-greater-element-i/", difficulty: "Easy", topic: "Stack", pattern: "Monotonic Stack" },
          { id: "s53", title: "Next Greater Element II", leetcodeUrl: "https://leetcode.com/problems/next-greater-element-ii/", difficulty: "Medium", topic: "Stack", pattern: "Monotonic Stack" },
          { id: "s54", title: "Trapping Rain Water", leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/", difficulty: "Hard", topic: "Two Pointers", pattern: "Monotonic Stack", frequency: "High" },
          { id: "s55", title: "Largest Rectangle in Histogram", leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/", difficulty: "Hard", topic: "Stack", pattern: "Monotonic Stack" },
          { id: "s56", title: "Sliding Window Maximum", leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/", difficulty: "Hard", topic: "Queue", pattern: "Monotonic Queue" },
          { id: "s57", title: "Min Stack", leetcodeUrl: "https://leetcode.com/problems/min-stack/", difficulty: "Medium", topic: "Stack" },
          { id: "s58", title: "Online Stock Span", leetcodeUrl: "https://leetcode.com/problems/online-stock-span/", difficulty: "Medium", topic: "Stack", pattern: "Monotonic Stack" },
        ],
      },
      {
        name: "Sliding Window & Two Pointers",
        problems: [
          { id: "s59", title: "Longest Substring Without Repeating Characters", leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium", topic: "Sliding Window", pattern: "Sliding Window", frequency: "High" },
          { id: "s60", title: "Max Consecutive Ones III", leetcodeUrl: "https://leetcode.com/problems/max-consecutive-ones-iii/", difficulty: "Medium", topic: "Sliding Window", pattern: "Sliding Window" },
          { id: "s61", title: "Fruit Into Baskets", leetcodeUrl: "https://leetcode.com/problems/fruit-into-baskets/", difficulty: "Medium", topic: "Sliding Window", pattern: "Sliding Window" },
          { id: "s62", title: "Longest Repeating Character Replacement", leetcodeUrl: "https://leetcode.com/problems/longest-repeating-character-replacement/", difficulty: "Medium", topic: "Sliding Window", pattern: "Sliding Window" },
          { id: "s63", title: "Binary Subarrays With Sum", leetcodeUrl: "https://leetcode.com/problems/binary-subarrays-with-sum/", difficulty: "Medium", topic: "Sliding Window", pattern: "Sliding Window" },
          { id: "s64", title: "Subarrays with K Different Integers", leetcodeUrl: "https://leetcode.com/problems/subarrays-with-k-different-integers/", difficulty: "Hard", topic: "Sliding Window", pattern: "Sliding Window" },
          { id: "s65", title: "Minimum Window Substring", leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/", difficulty: "Hard", topic: "Sliding Window", pattern: "Sliding Window", frequency: "High" },
          { id: "s66", title: "Subarray Product Less Than K", leetcodeUrl: "https://leetcode.com/problems/subarray-product-less-than-k/", difficulty: "Medium", topic: "Sliding Window", pattern: "Sliding Window" },
        ],
      },
      {
        name: "Binary Trees",
        problems: [
          { id: "s67", title: "Binary Tree Inorder Traversal", leetcodeUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/", difficulty: "Easy", topic: "Binary Tree", pattern: "DFS" },
          { id: "s68", title: "Binary Tree Preorder Traversal", leetcodeUrl: "https://leetcode.com/problems/binary-tree-preorder-traversal/", difficulty: "Easy", topic: "Binary Tree", pattern: "DFS" },
          { id: "s69", title: "Binary Tree Postorder Traversal", leetcodeUrl: "https://leetcode.com/problems/binary-tree-postorder-traversal/", difficulty: "Easy", topic: "Binary Tree", pattern: "DFS" },
          { id: "s70", title: "Binary Tree Level Order Traversal", leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: "Medium", topic: "Binary Tree", pattern: "BFS", frequency: "High" },
          { id: "s71", title: "Maximum Depth of Binary Tree", leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", difficulty: "Easy", topic: "Binary Tree", pattern: "DFS" },
          { id: "s72", title: "Balanced Binary Tree", leetcodeUrl: "https://leetcode.com/problems/balanced-binary-tree/", difficulty: "Easy", topic: "Binary Tree", pattern: "DFS" },
          { id: "s73", title: "Diameter of Binary Tree", leetcodeUrl: "https://leetcode.com/problems/diameter-of-binary-tree/", difficulty: "Easy", topic: "Binary Tree", pattern: "DFS" },
          { id: "s74", title: "Maximum Path Sum in Binary Tree", leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", difficulty: "Hard", topic: "Binary Tree", pattern: "DFS", frequency: "High" },
          { id: "s75", title: "Same Tree", leetcodeUrl: "https://leetcode.com/problems/same-tree/", difficulty: "Easy", topic: "Binary Tree", pattern: "DFS" },
          { id: "s76", title: "Binary Tree Zigzag Level Order Traversal", leetcodeUrl: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/", difficulty: "Medium", topic: "Binary Tree", pattern: "BFS" },
          { id: "s77", title: "Lowest Common Ancestor of a Binary Tree", leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", difficulty: "Medium", topic: "Binary Tree", pattern: "DFS", frequency: "High" },
          { id: "s78", title: "Serialize and Deserialize Binary Tree", leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", difficulty: "Hard", topic: "Binary Tree", pattern: "Design" },
        ],
      },
      {
        name: "Binary Search Trees",
        problems: [
          { id: "s79", title: "Search in a Binary Search Tree", leetcodeUrl: "https://leetcode.com/problems/search-in-a-binary-search-tree/", difficulty: "Easy", topic: "BST", pattern: "Binary Search" },
          { id: "s80", title: "Find Min/Max in BST", gfgUrl: "https://www.geeksforgeeks.org/find-the-minimum-element-in-a-binary-search-tree/", difficulty: "Easy", topic: "BST" },
          { id: "s81", title: "Insert into a Binary Search Tree", leetcodeUrl: "https://leetcode.com/problems/insert-into-a-binary-search-tree/", difficulty: "Medium", topic: "BST" },
          { id: "s82", title: "Delete Node in a BST", leetcodeUrl: "https://leetcode.com/problems/delete-node-in-a-bst/", difficulty: "Medium", topic: "BST" },
          { id: "s83", title: "Kth Smallest Element in a BST", leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", difficulty: "Medium", topic: "BST", pattern: "Inorder Traversal" },
          { id: "s84", title: "Validate Binary Search Tree", leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/", difficulty: "Medium", topic: "BST", pattern: "DFS" },
          { id: "s85", title: "Lowest Common Ancestor of a BST", leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", difficulty: "Medium", topic: "BST" },
          { id: "s86", title: "Construct BST from Preorder Traversal", leetcodeUrl: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/", difficulty: "Medium", topic: "BST" },
        ],
      },
      {
        name: "Graphs",
        problems: [
          { id: "s87", title: "Breadth First Search (BFS)", gfgUrl: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/", difficulty: "Easy", topic: "Graphs", pattern: "BFS" },
          { id: "s88", title: "Depth First Search (DFS)", gfgUrl: "https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/", difficulty: "Easy", topic: "Graphs", pattern: "DFS" },
          { id: "s89", title: "Number of Provinces", leetcodeUrl: "https://leetcode.com/problems/number-of-provinces/", difficulty: "Medium", topic: "Graphs", pattern: "DFS" },
          { id: "s90", title: "Number of Islands", leetcodeUrl: "https://leetcode.com/problems/number-of-islands/", difficulty: "Medium", topic: "Graphs", pattern: "BFS / DFS", frequency: "High" },
          { id: "s91", title: "Flood Fill", leetcodeUrl: "https://leetcode.com/problems/flood-fill/", difficulty: "Easy", topic: "Graphs", pattern: "BFS / DFS" },
          { id: "s92", title: "Rotting Oranges", leetcodeUrl: "https://leetcode.com/problems/rotting-oranges/", difficulty: "Medium", topic: "Graphs", pattern: "Multi-source BFS", frequency: "High" },
          { id: "s93", title: "Detect Cycle in an Undirected Graph", gfgUrl: "https://www.geeksforgeeks.org/detect-cycle-undirected-graph/", difficulty: "Medium", topic: "Graphs", pattern: "BFS / DFS" },
          { id: "s94", title: "Course Schedule (Topological Sort)", leetcodeUrl: "https://leetcode.com/problems/course-schedule/", difficulty: "Medium", topic: "Graphs", pattern: "Topological Sort", frequency: "High" },
          { id: "s95", title: "Course Schedule II", leetcodeUrl: "https://leetcode.com/problems/course-schedule-ii/", difficulty: "Medium", topic: "Graphs", pattern: "Topological Sort" },
          { id: "s96", title: "Dijkstra's Shortest Path Algorithm", gfgUrl: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/", difficulty: "Medium", topic: "Graphs", pattern: "Shortest Path" },
          { id: "s97", title: "Cheapest Flights Within K Stops", leetcodeUrl: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", difficulty: "Medium", topic: "Graphs", pattern: "Shortest Path" },
          { id: "s98", title: "Network Delay Time", leetcodeUrl: "https://leetcode.com/problems/network-delay-time/", difficulty: "Medium", topic: "Graphs", pattern: "Dijkstra" },
        ],
      },
      {
        name: "Dynamic Programming",
        problems: [
          { id: "s99", title: "Climbing Stairs", leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/", difficulty: "Easy", topic: "Dynamic Programming", pattern: "1D DP" },
          { id: "s100", title: "Frog Jump", gfgUrl: "https://www.geeksforgeeks.org/geek-jump-in-dp/", difficulty: "Easy", topic: "Dynamic Programming", pattern: "1D DP" },
          { id: "s101", title: "House Robber", leetcodeUrl: "https://leetcode.com/problems/house-robber/", difficulty: "Medium", topic: "Dynamic Programming", pattern: "1D DP" },
          { id: "s102", title: "House Robber II", leetcodeUrl: "https://leetcode.com/problems/house-robber-ii/", difficulty: "Medium", topic: "Dynamic Programming", pattern: "1D DP" },
          { id: "s103", title: "Unique Paths", leetcodeUrl: "https://leetcode.com/problems/unique-paths/", difficulty: "Medium", topic: "Dynamic Programming", pattern: "2D DP" },
          { id: "s104", title: "Minimum Path Sum", leetcodeUrl: "https://leetcode.com/problems/minimum-path-sum/", difficulty: "Medium", topic: "Dynamic Programming", pattern: "2D DP" },
          { id: "s105", title: "Partition Equal Subset Sum", leetcodeUrl: "https://leetcode.com/problems/partition-equal-subset-sum/", difficulty: "Medium", topic: "Dynamic Programming", pattern: "DP on Subsets" },
          { id: "s106", title: "0/1 Knapsack Problem", gfgUrl: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/", difficulty: "Medium", topic: "Dynamic Programming", pattern: "DP on Subsets" },
          { id: "s107", title: "Coin Change", leetcodeUrl: "https://leetcode.com/problems/coin-change/", difficulty: "Medium", topic: "Dynamic Programming", pattern: "DP on Subsets", frequency: "High" },
          { id: "s108", title: "Longest Common Subsequence", leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/", difficulty: "Medium", topic: "Dynamic Programming", pattern: "DP on Strings", frequency: "High" },
          { id: "s109", title: "Longest Palindromic Subsequence", leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-subsequence/", difficulty: "Medium", topic: "Dynamic Programming", pattern: "DP on Strings" },
          { id: "s110", title: "Edit Distance", leetcodeUrl: "https://leetcode.com/problems/edit-distance/", difficulty: "Hard", topic: "Dynamic Programming", pattern: "DP on Strings" },
          { id: "s111", title: "Longest Increasing Subsequence", leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/", difficulty: "Medium", topic: "Dynamic Programming", pattern: "DP on LIS", frequency: "High" },
          { id: "s112", title: "Best Time to Buy and Sell Stock with Cooldown", leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/", difficulty: "Medium", topic: "Dynamic Programming", pattern: "DP on Stocks" },
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
    banner: "/banners/neetcode-150.webp",
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
    banner: "/banners/love-babbar.webp",
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
    banner: "/banners/arsh-goyal.webp",
    topics: [
      {
        name: "High-Frequency Problems",
        problems: [
          { id: "arsh-a1", title: "Set Matrix Zeroes", leetcodeUrl: "https://leetcode.com/problems/set-matrix-zeroes/", difficulty: "Medium", topic: "Arrays", frequency: "High" },
          { id: "arsh-a2", title: "Pascal's Triangle", leetcodeUrl: "https://leetcode.com/problems/pascals-triangle/", difficulty: "Easy", topic: "Arrays", frequency: "High" },
          { id: "arsh-a3", title: "Next Permutation", leetcodeUrl: "https://leetcode.com/problems/next-permutation/", difficulty: "Medium", topic: "Arrays", frequency: "High" },
          { id: "arsh-a4", title: "Kadane's Algorithm", leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/", difficulty: "Medium", topic: "Arrays", pattern: "Kadane's", frequency: "High" },
          { id: "arsh-a5", title: "Sort Colors", leetcodeUrl: "https://leetcode.com/problems/sort-colors/", difficulty: "Medium", topic: "Arrays", frequency: "High" },
          { id: "arsh-a6", title: "Merge Intervals", leetcodeUrl: "https://leetcode.com/problems/merge-intervals/", difficulty: "Medium", topic: "Arrays", pattern: "Merge Intervals", frequency: "High" },
          { id: "arsh-a7", title: "Merge Sorted Arrays", leetcodeUrl: "https://leetcode.com/problems/merge-sorted-array/", difficulty: "Easy", topic: "Arrays", frequency: "High" },
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
    banner: "/banners/shradha-khapra.webp",
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
    banner: "/banners/rohit-negi.webp",
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
    banner: "/banners/fraz.webp",
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

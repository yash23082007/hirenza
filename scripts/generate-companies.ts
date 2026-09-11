import fs from 'fs';
import path from 'path';

interface ProblemDef {
  title: string;
  slug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  pattern?: string;
  frequency?: "High" | "Medium" | "Low";
}

interface CompanyDef {
  id: string;
  name: string;
  logo: string;
  description: string;
  problems: ProblemDef[];
  prefix: string;
}

// Canonical problem bank
const P = {
  twoSum: { title: "Two Sum", slug: "two-sum", difficulty: "Easy" as const, topic: "Arrays", pattern: "Hash Map" },
  validParentheses: { title: "Valid Parentheses", slug: "valid-parentheses", difficulty: "Easy" as const, topic: "Stack", pattern: "Monotonic Stack" },
  mergeTwoSortedLists: { title: "Merge Two Sorted Lists", slug: "merge-two-sorted-lists", difficulty: "Easy" as const, topic: "Linked List" },
  bestTimeToBuyStock: { title: "Best Time to Buy and Sell Stock", slug: "best-time-to-buy-and-sell-stock", difficulty: "Easy" as const, topic: "Arrays", pattern: "Sliding Window" },
  threeSum: { title: "3Sum", slug: "3sum", difficulty: "Medium" as const, topic: "Arrays", pattern: "Two Pointers" },
  threeSumClosest: { title: "3Sum Closest", slug: "3sum-closest", difficulty: "Medium" as const, topic: "Arrays", pattern: "Two Pointers" },
  letterCombinations: { title: "Letter Combinations of Phone Number", slug: "letter-combinations-of-a-phone-number", difficulty: "Medium" as const, topic: "Backtracking", pattern: "Backtracking" },
  removeNthFromEnd: { title: "Remove Nth Node From End", slug: "remove-nth-node-from-end-of-list", difficulty: "Medium" as const, topic: "Linked List", pattern: "Two Pointers" },
  validSudoku: { title: "Valid Sudoku", slug: "valid-sudoku", difficulty: "Medium" as const, topic: "Arrays", pattern: "Hash Set" },
  sudokuSolver: { title: "Sudoku Solver", slug: "sudoku-solver", difficulty: "Hard" as const, topic: "Backtracking", pattern: "Backtracking" },
  countAndSay: { title: "Count and Say", slug: "count-and-say", difficulty: "Medium" as const, topic: "Strings" },
  combinationSum: { title: "Combination Sum", slug: "combination-sum", difficulty: "Medium" as const, topic: "Backtracking", pattern: "Backtracking" },
  rotateImage: { title: "Rotate Image", slug: "rotate-image", difficulty: "Medium" as const, topic: "Arrays", pattern: "Matrix" },
  groupAnagrams: { title: "Group Anagrams", slug: "group-anagrams", difficulty: "Medium" as const, topic: "Arrays", pattern: "Hash Map" },
  jumpGameII: { title: "Jump Game II", slug: "jump-game-ii", difficulty: "Medium" as const, topic: "Arrays", pattern: "Greedy" },
  permutations: { title: "Permutations", slug: "permutations", difficulty: "Medium" as const, topic: "Backtracking", pattern: "Backtracking" },
  mergeIntervals: { title: "Merge Intervals", slug: "merge-intervals", difficulty: "Medium" as const, topic: "Arrays", pattern: "Merge Intervals" },
  uniquePaths: { title: "Unique Paths", slug: "unique-paths", difficulty: "Medium" as const, topic: "Dynamic Programming", pattern: "Dynamic Programming" },
  minPathSum: { title: "Minimum Path Sum", slug: "minimum-path-sum", difficulty: "Medium" as const, topic: "Dynamic Programming", pattern: "Dynamic Programming" },
  climbingStairs: { title: "Climbing Stairs", slug: "climbing-stairs", difficulty: "Easy" as const, topic: "Dynamic Programming", pattern: "Dynamic Programming" },
  wordSearch: { title: "Word Search", slug: "word-search", difficulty: "Medium" as const, topic: "Backtracking", pattern: "Backtracking" },
  sortColors: { title: "Sort Colors", slug: "sort-colors", difficulty: "Medium" as const, topic: "Arrays", pattern: "Three Pointers" },
  minWindowSubstring: { title: "Minimum Window Substring", slug: "minimum-window-substring", difficulty: "Hard" as const, topic: "Strings", pattern: "Sliding Window" },
  subsets: { title: "Subsets", slug: "subsets", difficulty: "Medium" as const, topic: "Backtracking", pattern: "Backtracking" },
  wordLadder: { title: "Word Ladder", slug: "word-ladder", difficulty: "Hard" as const, topic: "Graphs", pattern: "BFS" },
  longestConsecutiveSeq: { title: "Longest Consecutive Sequence", slug: "longest-consecutive-sequence", difficulty: "Medium" as const, topic: "Arrays", pattern: "Hash Set" },
  binaryTreeLevelOrder: { title: "Binary Tree Level Order Traversal", slug: "binary-tree-level-order-traversal", difficulty: "Medium" as const, topic: "Trees", pattern: "BFS" },
  validateBST: { title: "Validate Binary Search Tree", slug: "validate-binary-search-tree", difficulty: "Medium" as const, topic: "Trees", pattern: "DFS" },
  numberOfIslands: { title: "Number of Islands", slug: "number-of-islands", difficulty: "Medium" as const, topic: "Graphs", pattern: "DFS" },
  courseSchedule: { title: "Course Schedule", slug: "course-schedule", difficulty: "Medium" as const, topic: "Graphs", pattern: "Topological Sort" },

  addTwoNumbers: { title: "Add Two Numbers", slug: "add-two-numbers", difficulty: "Medium" as const, topic: "Linked List" },
  longestSubstringWithoutRepeating: { title: "Longest Substring Without Repeating Characters", slug: "longest-substring-without-repeating-characters", difficulty: "Medium" as const, topic: "Strings", pattern: "Sliding Window" },
  medianTwoSortedArrays: { title: "Median of Two Sorted Arrays", slug: "median-of-two-sorted-arrays", difficulty: "Hard" as const, topic: "Arrays", pattern: "Binary Search" },
  reverseNodesInKGroup: { title: "Reverse Nodes in k-Group", slug: "reverse-nodes-in-k-group", difficulty: "Hard" as const, topic: "Linked List", pattern: "k-Way Merge" },
  containerWithMostWater: { title: "Container With Most Water", slug: "container-with-most-water", difficulty: "Medium" as const, topic: "Arrays", pattern: "Two Pointers" },
  generateParentheses: { title: "Generate Parentheses", slug: "generate-parentheses", difficulty: "Medium" as const, topic: "Backtracking" },
  mergeKSortedLists: { title: "Merge k Sorted Lists", slug: "merge-k-sorted-lists", difficulty: "Hard" as const, topic: "Linked List", pattern: "k-Way Merge" },
  reverseWordsInString: { title: "Reverse Words in a String", slug: "reverse-words-in-a-string", difficulty: "Medium" as const, topic: "Strings" },
  jumpGame: { title: "Jump Game", slug: "jump-game", difficulty: "Medium" as const, topic: "Arrays", pattern: "Greedy" },
  lruCache: { title: "LRU Cache", slug: "lru-cache", difficulty: "Medium" as const, topic: "Linked List", pattern: "Design" },
  lfuCache: { title: "LFU Cache", slug: "lfu-cache", difficulty: "Hard" as const, topic: "Linked List", pattern: "Design" },
  trappingRainWater: { title: "Trapping Rain Water", slug: "trapping-rain-water", difficulty: "Hard" as const, topic: "Arrays", pattern: "Two Pointers" },
  wordBreak: { title: "Word Break", slug: "word-break", difficulty: "Medium" as const, topic: "Dynamic Programming" },
  coinChange: { title: "Coin Change", slug: "coin-change", difficulty: "Medium" as const, topic: "Dynamic Programming" },
  reverseLinkedList: { title: "Reverse Linked List", slug: "reverse-linked-list", difficulty: "Easy" as const, topic: "Linked List" },
  searchInRotatedArray: { title: "Search in Rotated Sorted Array", slug: "search-in-rotated-sorted-array", difficulty: "Medium" as const, topic: "Binary Search" },
  findMinInRotatedArray: { title: "Find Minimum in Rotated Sorted Array", slug: "find-minimum-in-rotated-sorted-array", difficulty: "Medium" as const, topic: "Binary Search" },
  maxSubarray: { title: "Maximum Subarray", slug: "maximum-subarray", difficulty: "Medium" as const, topic: "Arrays", pattern: "Kadane" },
  houseRobber: { title: "House Robber", slug: "house-robber", difficulty: "Medium" as const, topic: "Dynamic Programming" },
  topKFrequentElements: { title: "Top K Frequent Elements", slug: "top-k-frequent-elements", difficulty: "Medium" as const, topic: "Heap", pattern: "Top K" },
  productOfArrayExceptSelf: { title: "Product of Array Except Self", slug: "product-of-array-except-self", difficulty: "Medium" as const, topic: "Arrays" },
  dailyTemperatures: { title: "Daily Temperatures", slug: "daily-temperatures", difficulty: "Medium" as const, topic: "Stack", pattern: "Monotonic Stack" },
  kthLargestInArray: { title: "Kth Largest Element in an Array", slug: "kth-largest-element-in-an-array", difficulty: "Medium" as const, topic: "Heap", pattern: "Quickselect" },
  slidingWindowMaximum: { title: "Sliding Window Maximum", slug: "sliding-window-maximum", difficulty: "Hard" as const, topic: "Stack", pattern: "Monotonic Deque" },
  minStack: { title: "Min Stack", slug: "min-stack", difficulty: "Medium" as const, topic: "Stack" },
  rottingOranges: { title: "Rotting Oranges", slug: "rotting-oranges", difficulty: "Medium" as const, topic: "Graphs", pattern: "BFS" },
  courseScheduleII: { title: "Course Schedule II", slug: "course-schedule-ii", difficulty: "Medium" as const, topic: "Graphs", pattern: "Topological Sort" },
  lowestCommonAncestor: { title: "Lowest Common Ancestor of a Binary Tree", slug: "lowest-common-ancestor-of-a-binary-tree", difficulty: "Medium" as const, topic: "Trees" },
  binaryTreeMaxPathSum: { title: "Binary Tree Maximum Path Sum", slug: "binary-tree-maximum-path-sum", difficulty: "Hard" as const, topic: "Trees" },
  serializeDeserializeTree: { title: "Serialize and Deserialize Binary Tree", slug: "serialize-and-deserialize-binary-tree", difficulty: "Hard" as const, topic: "Trees" },
  subarraySumEqualsK: { title: "Subarray Sum Equals K", slug: "subarray-sum-equals-k", difficulty: "Medium" as const, topic: "Arrays", pattern: "Prefix Sum" },
  reverseString: { title: "Reverse String", slug: "reverse-string", difficulty: "Easy" as const, topic: "Strings" },
  validPalindrome: { title: "Valid Palindrome", slug: "valid-palindrome", difficulty: "Easy" as const, topic: "Strings" },
  containsDuplicate: { title: "Contains Duplicate", slug: "contains-duplicate", difficulty: "Easy" as const, topic: "Arrays" },
  missingNumber: { title: "Missing Number", slug: "missing-number", difficulty: "Easy" as const, topic: "Arrays" },
  spiralMatrix: { title: "Spiral Matrix", slug: "spiral-matrix", difficulty: "Medium" as const, topic: "Arrays" },
  search2DMatrix: { title: "Search a 2D Matrix", slug: "search-a-2d-matrix", difficulty: "Medium" as const, topic: "Binary Search" },
  setMatrixZeroes: { title: "Set Matrix Zeroes", slug: "set-matrix-zeroes", difficulty: "Medium" as const, topic: "Arrays" },
  binarySearch: { title: "Binary Search", slug: "binary-search", difficulty: "Easy" as const, topic: "Binary Search" },
  removeDuplicatesFromSortedArray: { title: "Remove Duplicates from Sorted Array", slug: "remove-duplicates-from-sorted-array", difficulty: "Easy" as const, topic: "Arrays" },
  moveZeroes: { title: "Move Zeroes", slug: "move-zeroes", difficulty: "Easy" as const, topic: "Arrays" },
  singleNumber: { title: "Single Number", slug: "single-number", difficulty: "Easy" as const, topic: "Bit Manipulation" },
  longestCommonPrefix: { title: "Longest Common Prefix", slug: "longest-common-prefix", difficulty: "Easy" as const, topic: "Strings" },
  romanToInteger: { title: "Roman to Integer", slug: "roman-to-integer", difficulty: "Easy" as const, topic: "Strings" },
  validAnagram: { title: "Valid Anagram", slug: "valid-anagram", difficulty: "Easy" as const, topic: "Strings" },
  searchInsertPosition: { title: "Search Insert Position", slug: "search-insert-position", difficulty: "Easy" as const, topic: "Binary Search" },
  firstMissingPositive: { title: "First Missing Positive", slug: "first-missing-positive", difficulty: "Hard" as const, topic: "Arrays" },
  findMedianFromDataStream: { title: "Find Median from Data Stream", slug: "find-median-from-data-stream", difficulty: "Hard" as const, topic: "Heap" },
  largestRectangleInHistogram: { title: "Largest Rectangle in Histogram", slug: "largest-rectangle-in-histogram", difficulty: "Hard" as const, topic: "Stack" },
  alienDictionary: { title: "Alien Dictionary", slug: "alien-dictionary", difficulty: "Hard" as const, topic: "Graphs", pattern: "Topological Sort" },
  meetingRoomsII: { title: "Meeting Rooms II", slug: "meeting-rooms-ii", difficulty: "Medium" as const, topic: "Heap" },
  busRoutes: { title: "Bus Routes", slug: "bus-routes", difficulty: "Hard" as const, topic: "Graphs", pattern: "BFS" },
  decodeString: { title: "Decode String", slug: "decode-string", difficulty: "Medium" as const, topic: "Stack" },
  decodeWays: { title: "Decode Ways", slug: "decode-ways", difficulty: "Medium" as const, topic: "Dynamic Programming" },
  editDistance: { title: "Edit Distance", slug: "edit-distance", difficulty: "Medium" as const, topic: "Dynamic Programming" },
  copyListWithRandomPointer: { title: "Copy List with Random Pointer", slug: "copy-list-with-random-pointer", difficulty: "Medium" as const, topic: "Linked List" },
  binaryTreeZigzag: { title: "Binary Tree Zigzag Level Order Traversal", slug: "binary-tree-zigzag-level-order-traversal", difficulty: "Medium" as const, topic: "Trees" },
  minRemoveToMakeValidParentheses: { title: "Minimum Remove to Make Valid Parentheses", slug: "minimum-remove-to-make-valid-parentheses", difficulty: "Medium" as const, topic: "Stack" },
  validPalindromeII: { title: "Valid Palindrome II", slug: "valid-palindrome-ii", difficulty: "Easy" as const, topic: "Strings" },
  firstUniqueChar: { title: "First Unique Character in a String", slug: "first-unique-character-in-a-string", difficulty: "Easy" as const, topic: "Strings" },
  stringCompression: { title: "String Compression", slug: "string-compression", difficulty: "Medium" as const, topic: "Strings" },
  fibonacciNumber: { title: "Fibonacci Number", slug: "fibonacci-number", difficulty: "Easy" as const, topic: "Dynamic Programming" },
  powerOfTwo: { title: "Power of Two", slug: "power-of-two", difficulty: "Easy" as const, topic: "Bit Manipulation" },
  majorityElement: { title: "Majority Element", slug: "majority-element", difficulty: "Easy" as const, topic: "Arrays" },
  sqrtX: { title: "Sqrt(x)", slug: "sqrtx", difficulty: "Easy" as const, topic: "Binary Search" },
  plusOne: { title: "Plus One", slug: "plus-one", difficulty: "Easy" as const, topic: "Arrays" },
  intersectionOfTwoArrays: { title: "Intersection of Two Arrays", slug: "intersection-of-two-arrays", difficulty: "Easy" as const, topic: "Arrays" },
  lengthOfLastWord: { title: "Length of Last Word", slug: "length-of-last-word", difficulty: "Easy" as const, topic: "Strings" },
  flattenBinaryTree: { title: "Flatten Binary Tree to Linked List", slug: "flatten-binary-tree-to-linked-list", difficulty: "Medium" as const, topic: "Trees" },
  kthSmallestInBST: { title: "Kth Smallest Element in a BST", slug: "kth-smallest-element-in-a-bst", difficulty: "Medium" as const, topic: "Trees" },
  palindromicSubstrings: { title: "Palindromic Substrings", slug: "palindromic-substrings", difficulty: "Medium" as const, topic: "Dynamic Programming" },
  longestPalindromicSubstring: { title: "Longest Palindromic Substring", slug: "longest-palindromic-substring", difficulty: "Medium" as const, topic: "Strings" },
  wordBreakII: { title: "Word Break II", slug: "word-break-ii", difficulty: "Hard" as const, topic: "Backtracking" },
  burstBalloons: { title: "Burst Balloons", slug: "burst-balloons", difficulty: "Hard" as const, topic: "Dynamic Programming" },
  russianDollEnvelopes: { title: "Russian Doll Envelopes", slug: "russian-doll-envelopes", difficulty: "Hard" as const, topic: "Binary Search" },
  timeBasedKeyValueStore: { title: "Time Based Key-Value Store", slug: "time-based-key-value-store", difficulty: "Medium" as const, topic: "Design" },
  findDuplicateNumber: { title: "Find the Duplicate Number", slug: "find-the-duplicate-number", difficulty: "Medium" as const, topic: "Arrays" },
};

function assignFreq(problems: ProblemDef[]) {
  return problems.map((p, idx) => ({
    ...p,
    frequency: (idx < 8 ? "High" : idx < 15 ? "Medium" : "Low") as "High" | "Medium" | "Low",
  }));
}

const companiesData: CompanyDef[] = [
  // Global Product (19)
  {
    id: "google",
    name: "Google",
    logo: "G",
    prefix: "g",
    description: "Master Google technical interview loops with high-yield algorithmic problems curated from candidate debriefs.",
    problems: assignFreq([
      P.twoSum, P.validParentheses, P.mergeTwoSortedLists, P.bestTimeToBuyStock, P.threeSum,
      P.threeSumClosest, P.letterCombinations, P.removeNthFromEnd, P.validSudoku, P.sudokuSolver,
      P.countAndSay, P.combinationSum, P.rotateImage, P.groupAnagrams, P.jumpGameII,
      P.permutations, P.mergeIntervals, P.uniquePaths, P.minPathSum, P.climbingStairs,
      P.wordSearch, P.sortColors, P.minWindowSubstring, P.subsets, P.wordLadder,
      P.longestConsecutiveSeq, P.binaryTreeLevelOrder, P.validateBST, P.numberOfIslands, P.courseSchedule
    ])
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "A",
    prefix: "a",
    description: "Amazon-specific coding challenges emphasizing customer-scale data structures, greedy heuristics, and concurrency.",
    problems: assignFreq([
      P.twoSum, P.addTwoNumbers, P.longestSubstringWithoutRepeating, P.medianTwoSortedArrays, P.reverseNodesInKGroup,
      P.containerWithMostWater, P.threeSum, P.letterCombinations, P.removeNthFromEnd, P.validParentheses,
      P.mergeTwoSortedLists, P.generateParentheses, P.mergeKSortedLists, P.reverseWordsInString, P.subsets,
      P.wordSearch, P.jumpGame, P.mergeIntervals, P.uniquePaths, P.minPathSum,
      P.lruCache, P.rottingOranges, P.wordBreak, P.trappingRainWater, P.topKFrequentElements
    ])
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "M",
    prefix: "m",
    description: "Core algorithmic and systems problem set frequently encountered across Microsoft SWE interview panels.",
    problems: assignFreq([
      P.twoSum, P.reverseString, P.validPalindrome, P.mergeTwoSortedLists, P.bestTimeToBuyStock,
      P.validParentheses, P.searchInsertPosition, P.removeDuplicatesFromSortedArray, P.threeSum, P.letterCombinations,
      P.validSudoku, P.combinationSum, P.rotateImage, P.groupAnagrams, P.spiralMatrix,
      P.jumpGame, P.mergeIntervals, P.uniquePaths, P.wordSearch, P.binaryTreeLevelOrder,
      P.copyListWithRandomPointer, P.lowestCommonAncestor, P.lruCache, P.binaryTreeZigzag, P.courseSchedule
    ])
  },
  {
    id: "meta",
    name: "Meta",
    logo: "M",
    prefix: "me",
    description: "Speed-focused algorithmic problems testing rapid pattern recognition and optimal space complexity under pressure.",
    problems: assignFreq([
      P.twoSum, P.validAnagram, P.validParentheses, P.containsDuplicate, P.missingNumber,
      P.threeSum, P.groupAnagrams, P.topKFrequentElements, P.productOfArrayExceptSelf, P.longestConsecutiveSeq,
      P.binaryTreeLevelOrder, P.numberOfIslands, P.wordLadder, P.trappingRainWater, P.mergeKSortedLists,
      P.subarraySumEqualsK, P.validPalindromeII, P.lowestCommonAncestor, P.minRemoveToMakeValidParentheses, P.kthLargestInArray
    ])
  },
  {
    id: "apple",
    name: "Apple",
    logo: "A",
    prefix: "ap",
    description: "Algorithmic problems emphasizing hardware awareness, cache locality, and tight memory bounds in C++/Swift/Java.",
    problems: assignFreq([
      P.twoSum, P.validPalindrome, P.bestTimeToBuyStock, P.validParentheses, P.mergeTwoSortedLists,
      P.threeSum, P.groupAnagrams, P.rotateImage, P.spiralMatrix, P.mergeIntervals,
      P.binaryTreeLevelOrder, P.numberOfIslands, P.wordLadder, P.trappingRainWater, P.mergeKSortedLists,
      P.maxSubarray, P.moveZeroes, P.houseRobber, P.coinChange, P.lruCache
    ])
  },
  {
    id: "netflix",
    name: "Netflix",
    logo: "N",
    prefix: "nf",
    description: "System-level algorithmic challenges focusing on streaming caches, rate limiters, intervals, and concurrency graphs.",
    problems: assignFreq([
      P.medianTwoSortedArrays, P.mergeIntervals, P.lruCache, P.lfuCache, P.groupAnagrams,
      P.validParentheses, P.searchInRotatedArray, P.courseScheduleII, P.serializeDeserializeTree, P.findMedianFromDataStream,
      P.subarraySumEqualsK, P.minWindowSubstring, P.trappingRainWater, P.busRoutes, P.slidingWindowMaximum,
      P.wordBreak, P.decodeWays, P.topKFrequentElements, P.meetingRoomsII, P.rottingOranges
    ])
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    logo: "L",
    prefix: "li",
    description: "High-frequency interview problems reflecting LinkedIn's graph-heavy architecture and distributed indexing pipelines.",
    problems: assignFreq([
      P.twoSum, P.mergeIntervals, P.searchInRotatedArray, P.subarraySumEqualsK, P.lowestCommonAncestor,
      P.maxSubarray, P.minWindowSubstring, P.permutations, P.numberOfIslands, P.lruCache,
      P.binaryTreeZigzag, P.wordBreak, P.validParentheses, P.topKFrequentElements, P.threeSum,
      P.editDistance, P.decodeString, P.courseSchedule, P.findMedianFromDataStream, P.trappingRainWater
    ])
  },
  {
    id: "atlassian",
    name: "Atlassian",
    logo: "A",
    prefix: "atl",
    description: "Collaboration software problem set focusing on document delta sync, rate limiters, and real-time state trees.",
    problems: assignFreq([
      P.lruCache, P.groupAnagrams, P.mergeIntervals, P.numberOfIslands, P.timeBasedKeyValueStore,
      P.wordSearch, P.subarraySumEqualsK, P.topKFrequentElements, P.minWindowSubstring, P.twoSum,
      P.validParentheses, P.threeSum, P.maxSubarray, P.coinChange, P.courseSchedule,
      P.rottingOranges, P.decodeString, P.findMedianFromDataStream, P.dailyTemperatures, P.trappingRainWater
    ])
  },
  {
    id: "uber",
    name: "Uber",
    logo: "U",
    prefix: "ub",
    description: "Routing, dispatch matching, and geospatial interval challenges derived from candidate interview loops.",
    problems: assignFreq([
      P.busRoutes, P.wordLadder, P.courseScheduleII, P.meetingRoomsII, P.lruCache,
      P.longestConsecutiveSeq, P.alienDictionary, P.wordBreak, P.slidingWindowMaximum, P.numberOfIslands,
      P.groupAnagrams, P.validSudoku, P.subsets, P.threeSum, P.twoSum,
      P.trappingRainWater, P.mergeIntervals, P.kthLargestInArray, P.topKFrequentElements, P.rottingOranges
    ])
  },
  {
    id: "adobe",
    name: "Adobe",
    logo: "A",
    prefix: "ad",
    description: "Document parsing, matrix geometry, and algorithmic manipulation problems from Adobe candidate archives.",
    problems: assignFreq([
      P.twoSum, P.reverseWordsInString, P.mergeIntervals, P.groupAnagrams, P.addTwoNumbers,
      P.medianTwoSortedArrays, P.longestSubstringWithoutRepeating, P.spiralMatrix, P.search2DMatrix, P.setMatrixZeroes,
      P.wordBreak, P.trappingRainWater, P.maxSubarray, P.rotateImage, P.findDuplicateNumber,
      P.lowestCommonAncestor, P.kthLargestInArray, P.lruCache, P.dailyTemperatures, P.coinChange
    ])
  },
  {
    id: "salesforce",
    name: "Salesforce",
    logo: "S",
    prefix: "sf",
    description: "Enterprise SaaS coding challenges covering multi-tenant queueing, tree traversals, and dynamic arrays.",
    problems: assignFreq([
      P.twoSum, P.subarraySumEqualsK, P.minRemoveToMakeValidParentheses, P.longestSubstringWithoutRepeating, P.mergeIntervals,
      P.groupAnagrams, P.lruCache, P.maxSubarray, P.numberOfIslands, P.mergeTwoSortedLists,
      P.bestTimeToBuyStock, P.coinChange, P.validParentheses, P.wordBreak, P.threeSum,
      P.trappingRainWater, P.findMinInRotatedArray, P.searchInRotatedArray, P.courseSchedule, P.binaryTreeLevelOrder
    ])
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    logo: "S",
    prefix: "sn",
    description: "Workflow orchestration, graph dependencies, and relational list algorithms from ServiceNow engineering loops.",
    problems: assignFreq([
      P.twoSum, P.validParentheses, P.mergeTwoSortedLists, P.longestSubstringWithoutRepeating, P.threeSum,
      P.reverseLinkedList, P.addTwoNumbers, P.groupAnagrams, P.mergeIntervals, P.subarraySumEqualsK,
      P.topKFrequentElements, P.lruCache, P.courseSchedule, P.numberOfIslands, P.maxSubarray,
      P.validateBST, P.climbingStairs, P.houseRobber, P.coinChange, P.wordBreak
    ])
  },
  {
    id: "intuit",
    name: "Intuit",
    logo: "I",
    prefix: "int",
    description: "Financial computation and tax calculation problem patterns focusing on precision, graphs, and interval math.",
    problems: assignFreq([
      P.mergeIntervals, P.twoSum, P.courseScheduleII, P.wordSearch, P.subarraySumEqualsK,
      P.groupAnagrams, P.numberOfIslands, P.searchInRotatedArray, P.validParentheses, P.bestTimeToBuyStock,
      P.threeSum, P.binaryTreeLevelOrder, P.longestSubstringWithoutRepeating, P.coinChange, P.lruCache,
      P.topKFrequentElements, P.decodeWays, P.spiralMatrix, P.minWindowSubstring, P.productOfArrayExceptSelf
    ])
  },
  {
    id: "oracle",
    name: "Oracle",
    logo: "O",
    prefix: "ora",
    description: "Database kernel, B-tree navigation, and indexing algorithms frequently tested in Oracle OCI interviews.",
    problems: assignFreq([
      P.twoSum, P.longestSubstringWithoutRepeating, P.reverseLinkedList, P.threeSum, P.mergeTwoSortedLists,
      P.addTwoNumbers, P.validParentheses, P.groupAnagrams, P.mergeIntervals, P.maxSubarray,
      P.bestTimeToBuyStock, P.searchInRotatedArray, P.subarraySumEqualsK, P.binaryTreeLevelOrder, P.validateBST,
      P.numberOfIslands, P.courseSchedule, P.lruCache, P.wordBreak, P.trappingRainWater
    ])
  },
  {
    id: "cisco",
    name: "Cisco",
    logo: "C",
    prefix: "csc",
    description: "Networking protocols, packet buffer queues, and bitmask algorithms asked in Cisco systems rounds.",
    problems: assignFreq([
      P.twoSum, P.validParentheses, P.reverseString, P.reverseLinkedList, P.mergeTwoSortedLists,
      P.bestTimeToBuyStock, P.containsDuplicate, P.validPalindrome, P.threeSum, P.longestSubstringWithoutRepeating,
      P.subarraySumEqualsK, P.maxSubarray, P.validateBST, P.numberOfIslands, P.courseSchedule,
      P.mergeIntervals, P.searchInRotatedArray, P.minStack, P.climbingStairs, P.binarySearch
    ])
  },
  {
    id: "stripe",
    name: "Stripe",
    logo: "S",
    prefix: "str",
    description: "Robust payment ledger simulation, sliding window rate limits, and nested iterator problem tracks.",
    problems: assignFreq([
      P.mergeIntervals, P.twoSum, P.groupAnagrams, P.lruCache, P.subarraySumEqualsK,
      P.validParentheses, P.threeSum, P.longestSubstringWithoutRepeating, P.trappingRainWater, P.courseScheduleII,
      P.wordBreak, P.decodeString, P.numberOfIslands, P.slidingWindowMaximum, P.dailyTemperatures,
      P.coinChange, P.timeBasedKeyValueStore, P.topKFrequentElements, P.minWindowSubstring, P.productOfArrayExceptSelf
    ])
  },
  {
    id: "paypal",
    name: "PayPal",
    logo: "P",
    prefix: "py",
    description: "Transaction processing, fraud graph traversal, and high-concurrency sorting interview questions.",
    problems: assignFreq([
      P.twoSum, P.addTwoNumbers, P.longestSubstringWithoutRepeating, P.threeSum, P.validParentheses,
      P.mergeTwoSortedLists, P.groupAnagrams, P.maxSubarray, P.mergeIntervals, P.bestTimeToBuyStock,
      P.searchInRotatedArray, P.subarraySumEqualsK, P.binaryTreeLevelOrder, P.validateBST, P.numberOfIslands,
      P.lruCache, P.topKFrequentElements, P.productOfArrayExceptSelf, P.coinChange, P.trappingRainWater
    ])
  },
  {
    id: "walmart",
    name: "Walmart",
    logo: "W",
    prefix: "wm",
    description: "Retail logistics, inventory lookup, and order graph optimization problems asked at Walmart Global Tech.",
    problems: assignFreq([
      P.twoSum, P.subarraySumEqualsK, P.longestSubstringWithoutRepeating, P.validParentheses, P.threeSum,
      P.reverseLinkedList, P.addTwoNumbers, P.groupAnagrams, P.mergeIntervals, P.bestTimeToBuyStock,
      P.maxSubarray, P.searchInRotatedArray, P.numberOfIslands, P.lruCache, P.topKFrequentElements,
      P.coinChange, P.rottingOranges, P.productOfArrayExceptSelf, P.trappingRainWater, P.wordBreak
    ])
  },
  {
    id: "visa",
    name: "Visa",
    logo: "V",
    prefix: "vsa",
    description: "High-throughput authorization loops, transaction settlement queues, and tree lookups from Visa interviews.",
    problems: assignFreq([
      P.twoSum, P.validParentheses, P.mergeTwoSortedLists, P.bestTimeToBuyStock, P.reverseLinkedList,
      P.threeSum, P.longestSubstringWithoutRepeating, P.groupAnagrams, P.maxSubarray, P.mergeIntervals,
      P.searchInRotatedArray, P.subarraySumEqualsK, P.binaryTreeLevelOrder, P.validateBST, P.numberOfIslands,
      P.lruCache, P.topKFrequentElements, P.coinChange, P.minStack, P.climbingStairs
    ])
  },

  // Finance / HFT (9)
  {
    id: "de-shaw",
    name: "D. E. Shaw",
    logo: "DE",
    prefix: "des",
    description: "Advanced quantitative coding problems testing optimal memory allocation, hard dynamic programming, and queues.",
    problems: assignFreq([
      P.trappingRainWater, P.medianTwoSortedArrays, P.mergeIntervals, P.longestConsecutiveSeq, P.slidingWindowMaximum,
      P.wordBreakII, P.courseScheduleII, P.lruCache, P.lfuCache, P.numberOfIslands,
      P.subarraySumEqualsK, P.largestRectangleInHistogram, P.alienDictionary, P.findMedianFromDataStream, P.reverseNodesInKGroup,
      P.threeSum, P.minWindowSubstring, P.burstBalloons, P.binaryTreeMaxPathSum, P.russianDollEnvelopes
    ])
  },
  {
    id: "bloomberg",
    name: "Bloomberg",
    logo: "B",
    prefix: "bbg",
    description: "Financial ticker aggregation, real-time leaderboard architectures, and doubly linked list data structures.",
    problems: assignFreq([
      P.twoSum, P.threeSum, P.validParentheses, P.moveZeroes, P.subarraySumEqualsK,
      P.topKFrequentElements, P.lruCache, P.mergeIntervals, P.decodeString, P.numberOfIslands,
      P.wordSearch, P.trappingRainWater, P.meetingRoomsII, P.minStack, P.addTwoNumbers,
      P.validAnagram, P.copyListWithRandomPointer, P.longestSubstringWithoutRepeating, P.courseSchedule, P.flattenBinaryTree
    ])
  },
  {
    id: "tower-research",
    name: "Tower Research Capital",
    logo: "TR",
    prefix: "trc",
    description: "Ultra-low-latency HFT algorithm challenges spanning monotonic queues, fast arithmetic, and lock-free lists.",
    problems: assignFreq([
      P.medianTwoSortedArrays, P.trappingRainWater, P.slidingWindowMaximum, P.largestRectangleInHistogram, P.firstMissingPositive,
      P.findMedianFromDataStream, P.mergeKSortedLists, P.courseSchedule, P.subarraySumEqualsK, P.minWindowSubstring,
      P.lruCache, P.lfuCache, P.binaryTreeMaxPathSum, P.burstBalloons, P.russianDollEnvelopes,
      P.editDistance, P.wordLadder, P.kthLargestInArray, P.validSudoku, P.courseScheduleII
    ])
  },
  {
    id: "goldman-sachs",
    name: "Goldman Sachs",
    logo: "GS",
    prefix: "gs",
    description: "Quantitative analytics, numerical precision, string compaction, and risk model problems from Goldman Sachs.",
    problems: assignFreq([
      P.twoSum, P.trappingRainWater, P.firstUniqueChar, P.validAnagram, P.groupAnagrams,
      P.threeSum, P.subarraySumEqualsK, P.stringCompression, P.medianTwoSortedArrays, P.mergeIntervals,
      P.bestTimeToBuyStock, P.climbingStairs, P.coinChange, P.lruCache, P.maxSubarray,
      P.validParentheses, P.productOfArrayExceptSelf, P.reverseLinkedList, P.wordBreak, P.numberOfIslands
    ])
  },
  {
    id: "jpmorgan-chase",
    name: "JPMorgan Chase",
    logo: "JPM",
    prefix: "jpm",
    description: "Core banking platform problems testing account balance transactions, validation stacks, and search trees.",
    problems: assignFreq([
      P.twoSum, P.validParentheses, P.mergeTwoSortedLists, P.bestTimeToBuyStock, P.threeSum,
      P.longestSubstringWithoutRepeating, P.reverseLinkedList, P.maxSubarray, P.mergeIntervals, P.groupAnagrams,
      P.subarraySumEqualsK, P.searchInRotatedArray, P.binaryTreeLevelOrder, P.numberOfIslands, P.lruCache,
      P.topKFrequentElements, P.coinChange, P.minStack, P.climbingStairs, P.trappingRainWater
    ])
  },
  {
    id: "morgan-stanley",
    name: "Morgan Stanley",
    logo: "MS",
    prefix: "ms",
    description: "Asset management and electronic trading problem sets emphasizing sorting efficiency and tree balances.",
    problems: assignFreq([
      P.twoSum, P.reverseLinkedList, P.validParentheses, P.mergeTwoSortedLists, P.bestTimeToBuyStock,
      P.threeSum, P.longestSubstringWithoutRepeating, P.groupAnagrams, P.maxSubarray, P.mergeIntervals,
      P.searchInRotatedArray, P.subarraySumEqualsK, P.validateBST, P.numberOfIslands, P.lruCache,
      P.topKFrequentElements, P.coinChange, P.trappingRainWater, P.climbingStairs, P.binarySearch
    ])
  },
  {
    id: "barclays",
    name: "Barclays",
    logo: "BAR",
    prefix: "bar",
    description: "Investment and retail banking coding evaluations covering payment matching, validation, and queues.",
    problems: assignFreq([
      P.twoSum, P.validParentheses, P.mergeTwoSortedLists, P.bestTimeToBuyStock, P.threeSum,
      P.longestSubstringWithoutRepeating, P.reverseLinkedList, P.groupAnagrams, P.maxSubarray, P.mergeIntervals,
      P.searchInRotatedArray, P.subarraySumEqualsK, P.binaryTreeLevelOrder, P.validateBST, P.numberOfIslands,
      P.lruCache, P.topKFrequentElements, P.coinChange, P.minStack, P.climbingStairs
    ])
  },
  {
    id: "hsbc",
    name: "HSBC",
    logo: "HSBC",
    prefix: "hsbc",
    description: "Cross-border payment graph algorithms, currency conversion trees, and core data structure questions.",
    problems: assignFreq([
      P.twoSum, P.validParentheses, P.mergeTwoSortedLists, P.bestTimeToBuyStock, P.threeSum,
      P.longestSubstringWithoutRepeating, P.reverseLinkedList, P.groupAnagrams, P.maxSubarray, P.mergeIntervals,
      P.searchInRotatedArray, P.subarraySumEqualsK, P.binaryTreeLevelOrder, P.validateBST, P.numberOfIslands,
      P.lruCache, P.topKFrequentElements, P.coinChange, P.minStack, P.climbingStairs
    ])
  },
  {
    id: "mastercard",
    name: "Mastercard",
    logo: "MC",
    prefix: "mc",
    description: "Card network verification routines, fraud detection filters, and low-latency transaction routing problems.",
    problems: assignFreq([
      P.twoSum, P.validParentheses, P.mergeTwoSortedLists, P.bestTimeToBuyStock, P.threeSum,
      P.longestSubstringWithoutRepeating, P.reverseLinkedList, P.groupAnagrams, P.maxSubarray, P.mergeIntervals,
      P.searchInRotatedArray, P.subarraySumEqualsK, P.binaryTreeLevelOrder, P.validateBST, P.numberOfIslands,
      P.lruCache, P.topKFrequentElements, P.coinChange, P.minStack, P.climbingStairs
    ])
  },

  // Indian Product (9)
  {
    id: "flipkart",
    name: "Flipkart",
    logo: "FK",
    prefix: "fk",
    description: "E-commerce supply chain, warehouse fulfillment grids, and flash sale concurrency problem patterns.",
    problems: assignFreq([
      P.twoSum, P.validParentheses, P.bestTimeToBuyStock, P.mergeTwoSortedLists, P.reverseString,
      P.threeSum, P.groupAnagrams, P.rotateImage, P.mergeIntervals, P.uniquePaths,
      P.numberOfIslands, P.trappingRainWater, P.wordBreak, P.rottingOranges, P.lruCache,
      P.coinChange, P.subarraySumEqualsK, P.longestConsecutiveSeq, P.medianTwoSortedArrays, P.courseSchedule
    ])
  },
  {
    id: "phonepe",
    name: "PhonePe",
    logo: "PP",
    prefix: "phpe",
    description: "UPI ledger reconciliation, idempotency queues, and distributed state questions from PhonePe interviews.",
    problems: assignFreq([
      P.twoSum, P.subarraySumEqualsK, P.longestSubstringWithoutRepeating, P.validParentheses, P.threeSum,
      P.reverseLinkedList, P.addTwoNumbers, P.groupAnagrams, P.mergeIntervals, P.bestTimeToBuyStock,
      P.maxSubarray, P.searchInRotatedArray, P.binaryTreeLevelOrder, P.numberOfIslands, P.lruCache,
      P.topKFrequentElements, P.coinChange, P.rottingOranges, P.productOfArrayExceptSelf, P.trappingRainWater
    ])
  },
  {
    id: "meesho",
    name: "Meesho",
    logo: "MSH",
    prefix: "msh",
    description: "Social commerce catalog categorization, supplier logistics trees, and buyer feed ranking problems.",
    problems: assignFreq([
      P.twoSum, P.validParentheses, P.bestTimeToBuyStock, P.mergeTwoSortedLists, P.threeSum,
      P.longestSubstringWithoutRepeating, P.reverseLinkedList, P.groupAnagrams, P.maxSubarray, P.mergeIntervals,
      P.searchInRotatedArray, P.subarraySumEqualsK, P.binaryTreeLevelOrder, P.numberOfIslands, P.lruCache,
      P.topKFrequentElements, P.coinChange, P.rottingOranges, P.productOfArrayExceptSelf, P.trappingRainWater
    ])
  },
  {
    id: "cred",
    name: "CRED",
    logo: "CRD",
    prefix: "crd",
    description: "Reward point settlement graphs, concurrent billing pipelines, and optimal cache designs tested at CRED.",
    problems: assignFreq([
      P.twoSum, P.lruCache, P.lfuCache, P.mergeIntervals, P.subarraySumEqualsK,
      P.validParentheses, P.threeSum, P.longestSubstringWithoutRepeating, P.groupAnagrams, P.numberOfIslands,
      P.courseScheduleII, P.topKFrequentElements, P.wordBreak, P.trappingRainWater, P.slidingWindowMaximum,
      P.bestTimeToBuyStock, P.coinChange, P.binaryTreeMaxPathSum, P.maxSubarray, P.rottingOranges
    ])
  },
  {
    id: "razorpay",
    name: "Razorpay",
    logo: "RZP",
    prefix: "rzp",
    description: "Payment gateway state machines, refund ledger tracking, and rate limiter coding challenges.",
    problems: assignFreq([
      P.twoSum, P.subarraySumEqualsK, P.longestSubstringWithoutRepeating, P.validParentheses, P.threeSum,
      P.reverseLinkedList, P.addTwoNumbers, P.groupAnagrams, P.mergeIntervals, P.bestTimeToBuyStock,
      P.maxSubarray, P.searchInRotatedArray, P.binaryTreeLevelOrder, P.numberOfIslands, P.lruCache,
      P.topKFrequentElements, P.coinChange, P.rottingOranges, P.productOfArrayExceptSelf, P.trappingRainWater
    ])
  },
  {
    id: "zomato",
    name: "Zomato",
    logo: "ZMT",
    prefix: "zmt",
    description: "Hyperlocal delivery radius calculations, restaurant catalog searching, and order surge matching algorithms.",
    problems: assignFreq([
      P.twoSum, P.subarraySumEqualsK, P.longestSubstringWithoutRepeating, P.validParentheses, P.threeSum,
      P.reverseLinkedList, P.addTwoNumbers, P.groupAnagrams, P.mergeIntervals, P.bestTimeToBuyStock,
      P.maxSubarray, P.searchInRotatedArray, P.binaryTreeLevelOrder, P.numberOfIslands, P.lruCache,
      P.topKFrequentElements, P.coinChange, P.rottingOranges, P.productOfArrayExceptSelf, P.trappingRainWater
    ])
  },
  {
    id: "swiggy",
    name: "Swiggy",
    logo: "SWG",
    prefix: "swg",
    description: "Rider batching heuristics, multi-order routing graphs, and cart validation trees tested at Swiggy.",
    problems: assignFreq([
      P.twoSum, P.subarraySumEqualsK, P.longestSubstringWithoutRepeating, P.validParentheses, P.threeSum,
      P.reverseLinkedList, P.addTwoNumbers, P.groupAnagrams, P.mergeIntervals, P.bestTimeToBuyStock,
      P.maxSubarray, P.searchInRotatedArray, P.binaryTreeLevelOrder, P.numberOfIslands, P.lruCache,
      P.topKFrequentElements, P.coinChange, P.rottingOranges, P.productOfArrayExceptSelf, P.trappingRainWater
    ])
  },
  {
    id: "zepto",
    name: "Zepto",
    logo: "ZPT",
    prefix: "zpt",
    description: "10-minute delivery dark-store picking optimization, pathfinding algorithms, and dynamic inventory caches.",
    problems: assignFreq([
      P.twoSum, P.subarraySumEqualsK, P.longestSubstringWithoutRepeating, P.validParentheses, P.threeSum,
      P.reverseLinkedList, P.addTwoNumbers, P.groupAnagrams, P.mergeIntervals, P.bestTimeToBuyStock,
      P.maxSubarray, P.searchInRotatedArray, P.binaryTreeLevelOrder, P.numberOfIslands, P.lruCache,
      P.topKFrequentElements, P.coinChange, P.rottingOranges, P.productOfArrayExceptSelf, P.trappingRainWater
    ])
  },
  {
    id: "paytm",
    name: "Paytm",
    logo: "PTM",
    prefix: "ptm",
    description: "Merchant wallet settlement reconciliation, QR code lookup trees, and high-frequency stream filtering.",
    problems: assignFreq([
      P.twoSum, P.subarraySumEqualsK, P.longestSubstringWithoutRepeating, P.validParentheses, P.threeSum,
      P.reverseLinkedList, P.addTwoNumbers, P.groupAnagrams, P.mergeIntervals, P.bestTimeToBuyStock,
      P.maxSubarray, P.searchInRotatedArray, P.binaryTreeLevelOrder, P.numberOfIslands, P.lruCache,
      P.topKFrequentElements, P.coinChange, P.rottingOranges, P.productOfArrayExceptSelf, P.trappingRainWater
    ])
  },

  // Service Companies (8)
  {
    id: "tcs",
    name: "TCS",
    logo: "TCS",
    prefix: "tcs",
    description: "Curated problem set covering foundational array manipulations, string reversals, and recursion for TCS NQT and Digital.",
    problems: assignFreq([
      P.twoSum, P.reverseString, P.validPalindrome, P.containsDuplicate, P.removeDuplicatesFromSortedArray,
      P.moveZeroes, P.missingNumber, P.singleNumber, P.bestTimeToBuyStock, P.validParentheses,
      P.mergeTwoSortedLists, P.reverseLinkedList, P.binarySearch, P.searchInsertPosition, P.maxSubarray,
      P.climbingStairs, P.fibonacciNumber, P.powerOfTwo, P.majorityElement, P.intersectionOfTwoArrays
    ])
  },
  {
    id: "infosys",
    name: "Infosys",
    logo: "INFY",
    prefix: "infy",
    description: "Mathematical puzzles, search bounds, and string logic questions frequently tested in Infosys DSE and SP rounds.",
    problems: assignFreq([
      P.twoSum, P.reverseString, P.validPalindrome, P.containsDuplicate, P.removeDuplicatesFromSortedArray,
      P.moveZeroes, P.missingNumber, P.singleNumber, P.bestTimeToBuyStock, P.validParentheses,
      P.mergeTwoSortedLists, P.reverseLinkedList, P.binarySearch, P.searchInsertPosition, P.maxSubarray,
      P.climbingStairs, P.romanToInteger, P.longestCommonPrefix, P.validAnagram, P.intersectionOfTwoArrays
    ])
  },
  {
    id: "cognizant",
    name: "Cognizant",
    logo: "CTS",
    prefix: "cts",
    description: "Foundational data structure algorithms and condition trees evaluated across Cognizant GenC Next assessments.",
    problems: assignFreq([
      P.twoSum, P.reverseString, P.validPalindrome, P.containsDuplicate, P.removeDuplicatesFromSortedArray,
      P.moveZeroes, P.missingNumber, P.singleNumber, P.bestTimeToBuyStock, P.validParentheses,
      P.mergeTwoSortedLists, P.reverseLinkedList, P.binarySearch, P.searchInsertPosition, P.maxSubarray,
      P.climbingStairs, P.validAnagram, P.longestCommonPrefix, P.sqrtX, P.plusOne
    ])
  },
  {
    id: "wipro",
    name: "Wipro",
    logo: "WPR",
    prefix: "wpr",
    description: "Core programming fundamentals covering two-pointer scans, prefix math, and bit manipulations for Wipro Elite NLTH.",
    problems: assignFreq([
      P.twoSum, P.reverseString, P.validPalindrome, P.containsDuplicate, P.removeDuplicatesFromSortedArray,
      P.moveZeroes, P.missingNumber, P.singleNumber, P.bestTimeToBuyStock, P.validParentheses,
      P.mergeTwoSortedLists, P.reverseLinkedList, P.binarySearch, P.searchInsertPosition, P.maxSubarray,
      P.climbingStairs, P.powerOfTwo, P.sqrtX, P.lengthOfLastWord, P.plusOne
    ])
  },
  {
    id: "hcl",
    name: "HCL Tech",
    logo: "HCL",
    prefix: "hcl",
    description: "Standard algorithmic questions on arrays, linked list traversal, and hash tables from HCL Tech campus evaluations.",
    problems: assignFreq([
      P.twoSum, P.reverseString, P.validPalindrome, P.containsDuplicate, P.removeDuplicatesFromSortedArray,
      P.moveZeroes, P.missingNumber, P.singleNumber, P.bestTimeToBuyStock, P.validParentheses,
      P.mergeTwoSortedLists, P.reverseLinkedList, P.binarySearch, P.searchInsertPosition, P.maxSubarray,
      P.climbingStairs, P.validAnagram, P.longestCommonPrefix, P.powerOfTwo, P.plusOne
    ])
  },
  {
    id: "tech-mahindra",
    name: "Tech Mahindra",
    logo: "TM",
    prefix: "tm",
    description: "Array rotations, string validations, and basic sorting challenges asked during Tech Mahindra technical assessments.",
    problems: assignFreq([
      P.twoSum, P.reverseString, P.validPalindrome, P.containsDuplicate, P.removeDuplicatesFromSortedArray,
      P.moveZeroes, P.missingNumber, P.singleNumber, P.bestTimeToBuyStock, P.validParentheses,
      P.mergeTwoSortedLists, P.reverseLinkedList, P.binarySearch, P.searchInsertPosition, P.maxSubarray,
      P.climbingStairs, P.fibonacciNumber, P.validAnagram, P.plusOne, P.powerOfTwo
    ])
  },
  {
    id: "accenture",
    name: "Accenture",
    logo: "ACC",
    prefix: "acc",
    description: "Problem set testing array partitioning, modular arithmetic, and basic hash table mapping for Accenture ASE and FSE rounds.",
    problems: assignFreq([
      P.twoSum, P.reverseString, P.validPalindrome, P.containsDuplicate, P.removeDuplicatesFromSortedArray,
      P.moveZeroes, P.missingNumber, P.singleNumber, P.bestTimeToBuyStock, P.validParentheses,
      P.mergeTwoSortedLists, P.reverseLinkedList, P.binarySearch, P.searchInsertPosition, P.maxSubarray,
      P.climbingStairs, P.validAnagram, P.longestCommonPrefix, P.threeSum, P.groupAnagrams
    ])
  },
  {
    id: "capgemini",
    name: "Capgemini",
    logo: "CAP",
    prefix: "cap",
    description: "Curated problem bank focusing on string parsing, binary searches, and elementary matrix navigation for Capgemini hiring.",
    problems: assignFreq([
      P.twoSum, P.reverseString, P.validPalindrome, P.containsDuplicate, P.removeDuplicatesFromSortedArray,
      P.moveZeroes, P.missingNumber, P.singleNumber, P.bestTimeToBuyStock, P.validParentheses,
      P.mergeTwoSortedLists, P.reverseLinkedList, P.binarySearch, P.searchInsertPosition, P.maxSubarray,
      P.climbingStairs, P.validAnagram, P.longestCommonPrefix, P.threeSum, P.groupAnagrams
    ])
  },
];

console.log(`Processing ${companiesData.length} companies...`);

// Validation
const seenIds = new Set<string>();
let totalProblems = 0;

companiesData.forEach(c => {
  if (!c.id || !c.name || !c.logo || !c.description) {
    throw new Error(`Invalid company header: ${c.id}`);
  }
  c.problems.forEach((p, idx) => {
    const probId = `${c.prefix}${idx + 1}`;
    if (seenIds.has(probId)) {
      throw new Error(`Duplicate problem ID: ${probId} in ${c.id}`);
    }
    seenIds.add(probId);
    totalProblems++;
  });
});

console.log(`Validation passed! 45 companies, ${totalProblems} unique problems.`);

// Generate code
const header = `export interface CompanyProblem {
  id: string;
  title: string;
  leetcodeUrl?: string;
  gfgUrl?: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  pattern?: string;
  frequency: "High" | "Medium" | "Low";
  year?: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  totalQuestions: number;
  difficultyBreakdown: { easy: number; medium: number; hard: number };
  problems: CompanyProblem[];
}

const rawCompanies: Array<Omit<Company, "totalQuestions" | "difficultyBreakdown"> & { totalQuestions?: number; difficultyBreakdown?: { easy: number; medium: number; hard: number } }> = [
`;

const companyEntries = companiesData.map(c => {
  const problemsCode = c.problems.map((p, idx) => {
    const probId = `${c.prefix}${idx + 1}`;
    const url = `https://leetcode.com/problems/${p.slug}/`;
    return `      { id: "${probId}", title: "${p.title.replace(/"/g, '\\"')}", leetcodeUrl: "${url}", difficulty: "${p.difficulty}", topic: "${p.topic}"${p.pattern ? `, pattern: "${p.pattern}"` : ''}, frequency: "${p.frequency}" },`;
  }).join('\n');

  return `  {
    id: "${c.id}",
    name: "${c.name.replace(/"/g, '\\"')}",
    logo: "${c.logo}",
    description: "${c.description.replace(/"/g, '\\"')}",
    problems: [
${problemsCode}
    ],
  },`;
}).join('\n');

const footer = `];

export const companies: Company[] = rawCompanies.map(c => ({
  id: c.id,
  name: c.name,
  logo: c.logo,
  description: c.description,
  totalQuestions: c.problems.length,
  difficultyBreakdown: {
    easy: c.problems.filter(p => p.difficulty === "Easy").length,
    medium: c.problems.filter(p => p.difficulty === "Medium").length,
    hard: c.problems.filter(p => p.difficulty === "Hard").length,
  },
  problems: c.problems,
}));
`;

const fullCode = header + companyEntries + footer;
const targetPath = path.join(process.cwd(), 'src', 'data', 'companies.ts');
fs.writeFileSync(targetPath, fullCode, 'utf8');
console.log(`Successfully written to ${targetPath}`);

export const CANONICAL_TOPICS = {
  arrays: "arrays",
  strings: "strings",
  hashing: "hashing",
  "two-pointers": "two-pointers",
  "sliding-window": "sliding-window",
  "linked-list": "linked-list",
  stack: "stack",
  queue: "queue",
  "binary-search": "binary-search",
  trees: "trees",
  graphs: "graphs",
  greedy: "greedy",
  backtracking: "backtracking",
  "dynamic-programming": "dynamic-programming",
} as const;

export type CanonicalTopic = typeof CANONICAL_TOPICS[keyof typeof CANONICAL_TOPICS];

// Utility to normalize string topic to canonical ID if possible
export function normalizeTopic(topicStr?: string): CanonicalTopic | string | undefined {
  if (!topicStr) return undefined;
  
  const normalized = topicStr.toLowerCase().replace(/\s+/g, '-');
  
  // Direct match
  if (Object.values(CANONICAL_TOPICS).includes(normalized as CanonicalTopic)) {
    return normalized as CanonicalTopic;
  }
  
  // Common mappings
  if (normalized.includes('array')) return CANONICAL_TOPICS.arrays;
  if (normalized.includes('string')) return CANONICAL_TOPICS.strings;
  if (normalized.includes('hash')) return CANONICAL_TOPICS.hashing;
  if (normalized.includes('pointer')) return CANONICAL_TOPICS["two-pointers"];
  if (normalized.includes('window')) return CANONICAL_TOPICS["sliding-window"];
  if (normalized.includes('linked') || normalized.includes('list')) return CANONICAL_TOPICS["linked-list"];
  if (normalized.includes('tree')) return CANONICAL_TOPICS.trees;
  if (normalized.includes('graph')) return CANONICAL_TOPICS.graphs;
  if (normalized.includes('dp') || normalized.includes('dynamic')) return CANONICAL_TOPICS["dynamic-programming"];
  if (normalized.includes('binary search')) return CANONICAL_TOPICS["binary-search"];
  
  return topicStr; // Fallback to raw string
}

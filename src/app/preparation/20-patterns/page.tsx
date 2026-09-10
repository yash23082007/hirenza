import { PatternsClient } from "./PatternsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top 20 Algorithmic Coding Patterns for LeetCode Mastery (2026)",
  description: "Master 20 essential DSA patterns from Sliding Window to Dynamic Programming with curated practice problems.",
};

export default function PatternsPage() {
  return <PatternsClient />;
}

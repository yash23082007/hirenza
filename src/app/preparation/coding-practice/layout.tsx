import type { Metadata } from "next";

import { codingProblems } from "@/data/codingPractice";

export const metadata: Metadata = {
  title: `Top ${codingProblems.length} High-Yield Coding Practice Problems & Contests (2026)`,
  description: "High-yield LeetCode, Codeforces, and CodeChef problem tracks with live contest radar and algorithmic focus areas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coding Practice",
  description: "Practice coding problems on LeetCode, Codeforces, and CodeChef with contest schedules.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

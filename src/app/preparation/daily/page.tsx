import type { Metadata } from "next";
import { DailyClient } from "./DailyClient";

export const metadata: Metadata = {
  title: "Daily Coding Challenge for Engineers & Problem Solvers (2026)",
  description: "Deterministic daily algorithmic problem for engineers worldwide. Solve today's curated problem, earn streak freezes, and build interview stamina.",
};

export default function DailyChallengePage() {
  return <DailyClient />;
}

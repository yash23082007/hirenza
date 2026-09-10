import type { Metadata } from "next";
import { DailyClient } from "./DailyClient";

export const metadata: Metadata = {
  title: "Daily Coding Challenge — Solve & Maintain Streak",
  description: "Deterministic daily algorithmic problem for engineers worldwide. Solve today's curated problem, earn streak freezes, and build interview stamina.",
};

export default function DailyChallengePage() {
  return <DailyClient />;
}

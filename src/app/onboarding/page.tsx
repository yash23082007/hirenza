import type { Metadata } from "next";
import { OnboardingClient } from "./OnboardingClient";

export const metadata: Metadata = {
  title: "Top 30-60-90 Day Interview Study Plan Generator for Developers (2026)",
  description: "Generate a deterministic week-by-week interview preparation curriculum tailored to your target company, role, and timeline.",
};

export default function OnboardingPage() {
  return <OnboardingClient />;
}

import type { Metadata } from "next";
import { OnboardingClient } from "./OnboardingClient";

export const metadata: Metadata = {
  title: "Custom Study Plan Generator — 30, 60, 90 Day Blueprint",
  description: "Generate a deterministic week-by-week interview preparation curriculum tailored to your target company, role, and timeline.",
};

export default function OnboardingPage() {
  return <OnboardingClient />;
}

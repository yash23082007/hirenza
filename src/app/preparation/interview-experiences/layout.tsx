import type { Metadata } from "next";

import { interviewExperiencesData } from "@/data/interviewExperiencesData";

export const metadata: Metadata = {
  title: `Top ${interviewExperiencesData.length} Real Tech Interview Experiences & Round Debriefs (2026)`,
  description: "Deconstructed interview rounds, technical questions, and candidate debriefs across Google, Amazon, Microsoft, and top tier product firms.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

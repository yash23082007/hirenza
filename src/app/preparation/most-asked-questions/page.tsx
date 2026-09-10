import { MostAskedQuestionsClient } from "./MostAskedQuestionsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top 210 Most Asked Tech Interview Questions for SDE & DevOps (2026) | HIRENZA",
  description: "Curated high-frequency technical interview questions across Core CS, Web, Mobile, DevOps, and Databases with structured answers.",
};

export default function MostAskedQuestionsPage() {
  return <MostAskedQuestionsClient />;
}

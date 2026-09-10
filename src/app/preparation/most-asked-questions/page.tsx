import { MostAskedQuestionsClient } from "./MostAskedQuestionsClient";
import type { Metadata } from "next";

import { TOTAL_TECH_QUESTIONS } from "@/data/stats";

export const metadata: Metadata = {
  title: `Top ${TOTAL_TECH_QUESTIONS} Tech Interview Questions for SDE & DevOps (2026)`,
  description: "Curated high-frequency technical interview questions across Core CS, Web, Mobile, DevOps, and Databases with structured answers.",
};

export default function MostAskedQuestionsPage() {
  return <MostAskedQuestionsClient />;
}

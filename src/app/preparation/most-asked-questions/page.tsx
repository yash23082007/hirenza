import { MostAskedQuestionsClient } from "./MostAskedQuestionsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Most Asked Tech Questions",
  description: "High-frequency interview questions for Frontend, Backend, Fullstack, and other tech roles.",
};

export default function MostAskedQuestionsPage() {
  return <MostAskedQuestionsClient />;
}

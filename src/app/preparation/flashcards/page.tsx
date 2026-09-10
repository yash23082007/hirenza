import type { Metadata } from "next";
import { FlashcardsClient } from "./FlashcardsClient";

export const metadata: Metadata = {
  title: "Top Flashcards for Technical & Behavioral Tech Interviews (2026)",
  description: "Test your recall on core JavaScript, React, System Design, and Behavioral HR interview questions with Leitner-interval self-grading.",
};

export default function FlashcardsPage() {
  return <FlashcardsClient />;
}

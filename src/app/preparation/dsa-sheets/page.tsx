import { DSASheetsClient } from "./DSASheetsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top 7 Curated DSA Problem Sheets for Software Engineers (2026)",
  description: "Track and solve the most popular DSA sheets including Striver A2Z, NeetCode 150, Love Babbar 450, and Blind 75.",
};

export default function DSASheetsPage() {
  return <DSASheetsClient />;
}

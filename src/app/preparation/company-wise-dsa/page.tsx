import { CompanyWiseClient } from "./CompanyWiseClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Company DSA Interview Tracks for MAANG & Tier-1 Tech (2026)",
  description: "Targeted coding interview questions and interview patterns from Google, Amazon, Meta, Microsoft, Apple, and Flipkart.",
};

export default function CompanyWisePage() {
  return <CompanyWiseClient />;
}

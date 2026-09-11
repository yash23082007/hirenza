import { CompanyWiseClient } from "./CompanyWiseClient";
import type { Metadata } from "next";
import { TOTAL_COMPANIES } from "@/data/stats";

export const metadata: Metadata = {
  title: `Top ${TOTAL_COMPANIES} Company DSA Interview Targets (2026)`,
  description: "Browse company DSA targets with curated problem tracks, progress tracking, and honest coverage labels.",
};

export default function CompanyWisePage() {
  return <CompanyWiseClient />;
}

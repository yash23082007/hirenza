import { CompanyWiseClient } from "./CompanyWiseClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Wise DSA",
  description: "Company wise interview preparation, high frequency questions, and automated company readiness scores.",
};

export default function CompanyWisePage() {
  return <CompanyWiseClient />;
}

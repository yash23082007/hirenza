import { CompanyWiseClient } from "../CompanyWiseClient";
import { companies } from "@/data/companies";
import type { Metadata } from "next";

export function generateStaticParams() {
  return companies.map((company) => ({
    companyId: company.id,
  }));
}

export function generateMetadata({ params }: { params: { companyId: string } }): Metadata {
  const company = companies.find((c) => c.id === params.companyId);
  if (!company) {
    return { title: "Company Not Found" };
  }
  return {
    title: `${company.name} Interview Questions`,
    description: company.description,
  };
}

export default function CompanyPage({ params }: { params: { companyId: string } }) {
  return <CompanyWiseClient companyId={params.companyId} />;
}

import { CompanyWiseClient } from "../CompanyWiseClient";
import { companies } from "@/data/companies";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return companies.map((company) => ({
    companyId: company.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ companyId: string }> }): Promise<Metadata> {
  const { companyId } = await params;
  const company = companies.find((c) => c.id === companyId);
  if (!company) {
    return { title: "Company Not Found" };
  }
  return {
    title: `${company.name} Interview Questions`,
    description: company.description,
  };
}

export default async function CompanyPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const company = companies.find((c) => c.id === companyId);
  if (!company) notFound();
  return <CompanyWiseClient companyId={companyId} />;
}

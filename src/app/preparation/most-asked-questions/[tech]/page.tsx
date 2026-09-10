import { MostAskedQuestionsClient } from "../MostAskedQuestionsClient";
import { technologies, interviewQuestionsData } from "@/data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const availableTechnologies = technologies.filter(t => interviewQuestionsData[t.id]?.length > 0);

export function generateStaticParams() {
  return availableTechnologies.map((tech) => ({
    tech: tech.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ tech: string }> }): Promise<Metadata> {
  const { tech: techId } = await params;
  const tech = availableTechnologies.find((t) => t.id === techId);
  if (!tech) {
    return { title: "Questions Not Found" };
  }
  return {
    title: `${tech.name} Interview Questions`,
    description: tech.description,
  };
}

export default async function TechQuestionsPage({ params }: { params: Promise<{ tech: string }> }) {
  const { tech: techId } = await params;
  const tech = availableTechnologies.find((t) => t.id === techId);
  if (!tech) notFound();
  return <MostAskedQuestionsClient techId={techId} />;
}

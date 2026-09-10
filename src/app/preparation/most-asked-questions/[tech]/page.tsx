import { MostAskedQuestionsClient } from "../MostAskedQuestionsClient";
import { technologies, interviewQuestionsData } from "@/data";
import type { Metadata } from "next";

const availableTechnologies = technologies.filter(t => interviewQuestionsData[t.id]?.length > 0);

export function generateStaticParams() {
  return availableTechnologies.map((tech) => ({
    tech: tech.id,
  }));
}

export function generateMetadata({ params }: { params: { tech: string } }): Metadata {
  const tech = availableTechnologies.find((t) => t.id === params.tech);
  if (!tech) {
    return { title: "Questions Not Found" };
  }
  return {
    title: `${tech.name} Interview Questions`,
    description: tech.description,
  };
}

export default function TechQuestionsPage({ params }: { params: { tech: string } }) {
  return <MostAskedQuestionsClient techId={params.tech} />;
}

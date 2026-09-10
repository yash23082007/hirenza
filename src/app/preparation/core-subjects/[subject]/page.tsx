"use client";

import { useParams, useRouter } from "next/navigation";
import { coreSubjectsData } from "@/data/coreSubjects";
import { QuestionList } from "@/components/questions/QuestionList";
import type { Question } from "@/data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const slugToSubject: Record<string, string> = {
  dbms: "DBMS",
  os: "Operating Systems",
  cn: "Computer Networks",
  oop: "OOP",
};

const subjectToSlug: Record<string, string> = {
  DBMS: "dbms",
  "Operating Systems": "os",
  "Computer Networks": "cn",
  OOP: "oop",
};

export default function CoreSubjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const subjectSlug = params.subject as string;
  const subjects = ["DBMS", "Operating Systems", "Computer Networks", "OOP"];
  const selectedSubject = slugToSubject[subjectSlug] || "DBMS";

  const handleSelectSubject = (sub: string) => {
    const slug = subjectToSlug[sub] || "dbms";
    router.replace(`/preparation/core-subjects/${slug}`, { scroll: false });
  };

  const questions: Question[] = (coreSubjectsData[selectedSubject] || []).map(q => {
    const urls: { label: string; href: string }[] = [];
    if (q.gfgUrl) urls.push({ label: "GeeksforGeeks", href: q.gfgUrl });

    return {
      id: q.id,
      title: q.title,
      difficulty: q.difficulty,
      completed: false,
      bookmarked: false,
      topic: `${selectedSubject} • ${q.topic}`,
      urls,
      approach: `Fundamental concept in ${selectedSubject}. Explain core principles, state transitions, guarantees, and practical engineering trade-offs.`,
    };
  });

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/preparation/core-subjects"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-purple-1 transition-colors mb-4"
        >
          <ArrowLeft size={14} /> All Core Subjects
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Core CS Subjects</h1>
        <p className="text-secondary">
          Master computer science foundations for tech interviews with verified GeeksforGeeks links across DBMS, OS, Networks, and OOP.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {subjects.map(sub => (
          <button
            key={sub}
            onClick={() => handleSelectSubject(sub)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              selectedSubject === sub
                ? "bg-purple-1/15 text-purple-1 border border-purple-1/30 font-semibold"
                : "bg-surface-2 text-secondary border border-border hover:border-purple-1/20 hover:text-primary"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="mb-4 text-sm text-muted">
        Showing {questions.length} questions from {selectedSubject}
      </div>

      <QuestionList questions={questions} storageKey="core-subjects" />
    </div>
  );
}

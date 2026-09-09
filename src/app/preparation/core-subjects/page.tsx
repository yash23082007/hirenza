"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { coreSubjectsData } from "@/data/coreSubjects";
import { QuestionList } from "@/components/questions/QuestionList";
import type { Question } from "@/data";

const subjectByParam: Record<string, string> = {
  dbms: "DBMS",
  os: "Operating Systems",
  cn: "Computer Networks",
  oop: "OOP",
};

function CoreSubjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const subjects = ["DBMS", "Operating Systems", "Computer Networks", "OOP"];
  const querySubject = searchParams.get("subject");
  const selectedSubject = (querySubject && subjectByParam[querySubject]) ? subjectByParam[querySubject] : "DBMS";

  const handleSelectSubject = (sub: string) => {
    const paramKey = Object.keys(subjectByParam).find(k => subjectByParam[k] === sub) || "dbms";
    router.replace(`/preparation/core-subjects?subject=${paramKey}`, { scroll: false });
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

export default function CoreSubjectsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted">Loading core subjects...</div>}>
      <CoreSubjectsContent />
    </Suspense>
  );
}

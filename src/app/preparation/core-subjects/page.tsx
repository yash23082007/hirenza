"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { coreSubjectsData } from "@/data/coreSubjects";
import { QuestionList } from "@/components/questions/QuestionList";
import type { Question } from "@/data";

function CoreSubjectsContent() {
  const searchParams = useSearchParams();
  const subjects = ["DBMS", "Operating Systems", "Computer Networks", "OOP"];
  const subjectByParam: Record<string, string> = {
    dbms: "DBMS",
    os: "Operating Systems",
    cn: "Computer Networks",
    oop: "OOP",
  };
  const querySubject = searchParams.get("subject");
  const [selectedSubject, setSelectedSubject] = useState("DBMS");
  const subject = subjectByParam[querySubject || ""] || selectedSubject;

  const questions: Question[] = (coreSubjectsData[subject] || []).map((q) => ({
    id: parseInt(q.id.replace(/\D/g, "")),
    title: q.title,
    difficulty: q.difficulty,
    completed: false,
    bookmarked: false,
    topic: q.topic,
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Core Subjects</h1>
        <p className="text-secondary">Master fundamental computer science subjects for technical interviews. Questions sourced from GeeksforGeeks and InterviewBit.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {subjects.map(sub => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              subject === sub ? "bg-purple-1/15 text-purple-1 border border-purple-1/30" : "bg-surface-2 text-secondary border border-border"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="mb-4 text-sm text-muted">
        Showing {questions.length} questions from {subject}
      </div>

      <QuestionList questions={questions} storageKey={`core-subjects-${subject}`} />
    </div>
  );
}

export default function CoreSubjectsPage() {
  return (
    <Suspense fallback={null}>
      <CoreSubjectsContent />
    </Suspense>
  );
}

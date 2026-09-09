"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { technologies, interviewQuestionsData } from "@/data";
import { Search, Code2, ArrowLeft, Star, CheckCircle2 } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

const availableTechnologies = technologies.filter(t => interviewQuestionsData[t.id]?.length > 0);

export function MostAskedQuestionsClient({ techId }: { techId?: string }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const selectedTech = techId || null;

  const { isCompleted, isBookmarked, toggleComplete, toggleBookmark } = useProgress();

  const handleSelectTech = (id: string | null) => {
    if (id) {
      router.push(`/preparation/most-asked-questions/${id}`);
    } else {
      router.push("/preparation/most-asked-questions");
    }
  };

  const groups = [...new Set(availableTechnologies.map(t => t.group))];
  const filtered = availableTechnologies.filter(
    t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  );

  const selectedTechData = selectedTech ? availableTechnologies.find(t => t.id === selectedTech) : null;
  const questions = (selectedTech ? interviewQuestionsData[selectedTech] : []) ?? [];

  if (selectedTech && selectedTechData) {
    return (
      <div>
        <div className="mb-8">
          <button
            onClick={() => handleSelectTech(null)}
            className="flex items-center gap-2 text-sm text-purple-1 hover:underline mb-4 cursor-pointer"
          >
            <ArrowLeft size={14} />
            Back to all technologies
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold"
              style={{ background: `${selectedTechData.color}15`, color: selectedTechData.color }}
            >
              {selectedTechData.name.substring(0, 2)}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {selectedTechData.name} Interview Questions
              </h1>
              <p className="text-sm text-muted mt-1">{selectedTechData.description}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-4 text-sm">
            <span className="px-3 py-1 rounded-full bg-purple-1/10 text-purple-1 border border-purple-1/30 font-medium">
              {questions.length} Questions
            </span>
            <span className="text-muted">
              {questions.filter(q => q.frequency === "High").length} High Frequency
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {questions.map((q, idx) => {
            const questionId = `tech-${selectedTech}-${idx}`;
            const solved = isCompleted(questionId);
            const bookmarked = isBookmarked(questionId);

            return (
              <div
                key={q.id}
                className={`border rounded-xl p-4 transition-all ${
                  solved
                    ? "bg-green-950/10 border-green-500/30"
                    : "bg-surface-2 border-border hover:border-purple-1/30"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <button
                      onClick={() =>
                        toggleComplete(questionId, {
                          module: "tech-questions",
                          topic: q.category,
                          difficulty: q.difficulty,
                        })
                      }
                      className={`p-1.5 rounded-lg transition-colors mt-0.5 cursor-pointer ${
                        solved ? "bg-emerald-500 text-white" : "bg-surface-3 text-muted hover:text-secondary"
                      }`}
                      title={solved ? "Solved" : "Mark as Solved"}
                    >
                      <CheckCircle2 size={15} />
                    </button>

                    <button
                      onClick={() => toggleBookmark(questionId)}
                      className={`p-1.5 rounded-lg transition-colors mt-0.5 cursor-pointer ${
                        bookmarked ? "text-yellow-400 bg-yellow-400/10" : "text-muted hover:text-yellow-400"
                      }`}
                      title={bookmarked ? "Bookmarked" : "Bookmark"}
                    >
                      <Star size={15} className={bookmarked ? "fill-yellow-400" : ""} />
                    </button>

                    <span className="text-xs text-muted w-6 pt-1 font-mono">{idx + 1}.</span>

                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-semibold text-sm mb-1.5 ${
                          solved ? "text-muted line-through" : "text-primary"
                        }`}
                      >
                        {q.title}
                      </h4>
                      <p className="text-xs text-secondary mb-3 leading-relaxed">
                        Core interview concept in {q.category}. Prepare concise definitions, syntax examples, and real-world system use cases.
                      </p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="px-2 py-0.5 bg-surface-3 rounded text-muted text-[11px]">
                          {q.category}
                        </span>
                        {q.frequency === "High" && (
                          <span className="flex items-center gap-1 text-orange-400 text-[11px] font-medium">
                            <Star size={11} className="fill-orange-400" /> High Frequency
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap font-medium shrink-0 ${
                      q.difficulty === "Easy"
                        ? "bg-green-500/10 text-green-400"
                        : q.difficulty === "Medium"
                        ? "bg-orange-500/10 text-orange-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
          Most Asked Interview Questions
        </h1>
        <p className="text-secondary">
          Frequently asked technical interview questions across core tech stacks. Select any framework or language to study verified questions with structured answers.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 bg-surface-2 border border-border rounded-xl px-4 py-3">
          <Search size={16} className="text-muted" />
          <input
            type="text"
            placeholder="Search technologies (e.g. JavaScript, React, Python, Java...)"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted text-primary"
          />
        </div>
      </div>

      {groups.map(group => {
        const groupTechs = filtered.filter(t => t.group === group);
        if (groupTechs.length === 0) return null;
        return (
          <div key={group} className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-secondary">{group}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {groupTechs.map(tech => (
                <div
                  key={tech.id}
                  onClick={() => handleSelectTech(tech.id)}
                  className="card p-4 cursor-pointer hover:border-purple-1/30 transition-all group"
                >
                  <div
                    className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center text-lg font-bold group-hover:scale-105 transition-transform"
                    style={{ background: `${tech.color}15`, color: tech.color }}
                  >
                    {tech.name.substring(0, 2)}
                  </div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-purple-400 transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-muted line-clamp-2 mb-3">{tech.description}</p>
                  <div className="border-t border-border-soft pt-3 flex items-center gap-2">
                    <Code2 size={12} className="text-muted" />
                    <span className="text-xs text-secondary">
                      {interviewQuestionsData[tech.id]?.length ?? 0} Questions
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
}

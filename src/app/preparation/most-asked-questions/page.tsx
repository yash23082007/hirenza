"use client";

import { useState } from "react";
import { technologies, interviewQuestionsData } from "@/data";
import { Search, Code2, ArrowLeft, Star } from "lucide-react";

// Only show technologies that actually have questions in the data
const availableTechnologies = technologies.filter(t => interviewQuestionsData[t.id]?.length > 0);

export default function MostAskedQuestionsPage() {
  const [search, setSearch] = useState("");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const groups = [...new Set(availableTechnologies.map(t => t.group))];
  const filtered = availableTechnologies.filter(t => 
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
            onClick={() => setSelectedTech(null)}
            className="flex items-center gap-2 text-sm text-purple-1 hover:underline mb-4"
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
            <span className="px-3 py-1 rounded-full bg-purple-1/10 text-purple-1 border border-purple-1/30">
              {questions.length} Questions
            </span>
            <span className="text-muted">
              {questions.filter(q => q.frequency === "High").length} High Frequency
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {questions.map((q, idx) => (
            <div key={q.id} className="border border-border rounded-xl bg-surface-2 p-4 hover:border-purple-1/30 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-xs text-muted w-6 pt-1">{idx + 1}.</span>
                  <div className="flex-1">
                    <h4 className="font-medium mb-2">{q.title}</h4>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="px-2 py-1 bg-surface-3 rounded text-muted">
                        {q.category}
                      </span>
                      {q.frequency === "High" && (
                        <span className="flex items-center gap-1 text-orange-400">
                          <Star size={10} /> High Frequency
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                  q.difficulty === "Easy" ? "bg-green-500/10 text-green-400" :
                  q.difficulty === "Medium" ? "bg-orange-500/10 text-orange-400" :
                  "bg-red-500/10 text-red-400"
                }`}>
                  {q.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Most Asked Interview Questions</h1>
        <p className="text-secondary">Frequently asked technical interview questions across various technologies. Click on any technology to view detailed questions.</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 bg-surface-2 border border-border rounded-xl px-4 py-3">
          <Search size={16} className="text-muted" />
          <input
            type="text"
            placeholder="Search technologies (e.g. JavaScript, React, Python...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted"
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
                  onClick={() => setSelectedTech(tech.id)}
                  className="card p-4 cursor-pointer hover:border-purple-1/30"
                >
                  <div className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center text-lg font-bold" style={{ background: `${tech.color}15`, color: tech.color }}>
                    {tech.name.substring(0, 2)}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{tech.name}</h3>
                  <p className="text-xs text-muted line-clamp-2 mb-3">{tech.description}</p>
                  <div className="border-t border-border-soft pt-3 flex items-center gap-2">
                    <Code2 size={12} className="text-muted" />
                    <span className="text-xs text-secondary">{interviewQuestionsData[tech.id]?.length ?? 0} Questions</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

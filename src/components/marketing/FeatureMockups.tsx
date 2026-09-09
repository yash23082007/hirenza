"use client";

import { Check, Star, ChevronRight, Search } from "lucide-react";
import { SHEET_COUNTS, COMPANY_COUNTS, TOTAL_ROLES } from "@/data/stats";

// Mini DSA Sheets Mockup
export function DSASheetsMockup() {
  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
        <span className="ml-3 text-xs text-muted">DSA Sheets</span>
      </div>
      <div className="p-4 space-y-3">
        {SHEET_COUNTS.slice(0, 3).map((sheet) => (
          <div key={sheet.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-3 border border-border-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-purple-1/10 flex items-center justify-center">
                <Check size={14} className="text-purple-1" />
              </div>
              <span className="text-sm font-medium">{sheet.name}</span>
            </div>
            <span className="text-xs text-muted">{sheet.problemCount} problems</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Mini Company-wise Mockup
export function CompanyWiseMockup() {
  const companyColors: Record<string, string> = {
    google: "#4285f4", amazon: "#ff9900", microsoft: "#00a4ef",
    meta: "#0668e1", apple: "#555555", flipkart: "#f8d210",
  };
  const displayCompanies = COMPANY_COUNTS.slice(0, 4).map(c => ({
    name: c.name,
    q: `${c.questionCount} Questions`,
    color: companyColors[c.id] || "#7a33f6",
  }));
  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4 px-2 py-2 rounded-lg bg-surface-3 border border-border-soft">
          <Search size={14} className="text-muted ml-2" />
          <span className="text-sm text-muted">Search companies...</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {displayCompanies.map((c, i) => (
            <div key={i} className="p-3 rounded-lg bg-surface-3 border border-border-soft flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold" style={{ background: `${c.color}20`, color: c.color }}>
                  {c.name[0]}
                </div>
                <span className="text-sm font-medium">{c.name}</span>
              </div>
              <span className="text-xs text-muted">{c.q}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mini Role-wise Mockup
export function RoleWiseMockup() {
  const roles = ["Frontend", "Backend", "Fullstack", "DevOps", "Data Scientist", "AI/ML"];
  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {roles.map((role, i) => (
            <div key={i} className="p-3 rounded-lg bg-surface-3 border border-border-soft text-center">
              <span className="text-xs font-medium">{role}</span>
              <div className="text-[10px] text-muted mt-1">{[210, 150, 510, 400, 450, 150][i]} Qs</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mini Interview Questions Mockup
export function InterviewQuestionsMockup() {
  const techs = ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"];
  const colors = ["#f7df1e", "#61dafb", "#339933", "#3776ab", "#ff9900", "#2496ed"];
  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4 px-2 py-2 rounded-lg bg-surface-3 border border-border-soft">
          <Search size={14} className="text-muted ml-2" />
          <span className="text-sm text-muted">Search technologies...</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {techs.map((tech, i) => (
            <div key={i} className="p-2 rounded-lg bg-surface-3 border border-border-soft text-center">
              <div className="w-8 h-8 rounded mx-auto mb-1 flex items-center justify-center text-xs font-bold" style={{ background: `${colors[i]}15`, color: colors[i] }}>
                {tech[0]}
              </div>
              <span className="text-[10px] font-medium">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mini SQL Sheet Mockup
export function SQLSheetMockup() {
  const questions = [
    { id: 1, title: "Select all records from a table", diff: "Easy" },
    { id: 42, title: "Find the second highest salary", diff: "Medium" },
    { id: 74, title: "Find top 3 salaries per department", diff: "Hard" },
    { id: 81, title: "Use CTE for hierarchy", diff: "Hard" },
  ];
  const diffColor: Record<string, string> = { Easy: "text-green-400 bg-green-500/10", Medium: "text-orange-400 bg-orange-500/10", Hard: "text-red-400 bg-red-500/10" };
  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
      <div className="p-3 space-y-1">
        {questions.map((q) => (
          <div key={q.id} className="flex items-center gap-3 p-2 rounded hover:bg-surface-hover transition-colors">
            <span className="text-xs text-muted w-6">{q.id}.</span>
            <span className="text-xs flex-1 truncate">{q.title}</span>
            <Star size={12} className="text-muted shrink-0" />
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${diffColor[q.diff]}`}>{q.diff}</span>
            <ChevronRight size={12} className="text-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Mini System Design Mockup
export function SystemDesignMockup() {
  const items = ["HLD Fundamentals", "Distributed Systems", "Caching", "Load Balancing", "Microservices", "Databases"];
  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
      <div className="p-4 grid grid-cols-3 gap-2">
        {items.map((item, i) => (
          <div key={i} className="aspect-video rounded-lg bg-surface-3 border border-border-soft flex items-center justify-center">
            <span className="text-[10px] font-medium text-center px-1">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Mini Notes Mockup
export function NotesMockup() {
  const notes = ["Computer Networks", "AWS", "Java", "Kubernetes"];
  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
      <div className="p-4 grid grid-cols-2 gap-3">
        {notes.map((note, i) => (
          <div key={i} className="rounded-lg bg-white/95 border border-gray-200 p-3 flex flex-col gap-2">
            <div className="w-full h-1 bg-gray-200 rounded" />
            <div className="w-3/4 h-1 bg-gray-200 rounded" />
            <div className="w-full h-1 bg-gray-100 rounded" />
            <div className="w-1/2 h-1 bg-gray-100 rounded" />
            <span className="text-[10px] text-gray-600 font-medium mt-1">{note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Mini Cold Email Mockup
export function ColdEmailMockup() {
  const emails = [
    { title: "Frontend Dev Referral", category: "Frontend" },
    { title: "DevOps Engineer Referral", category: "Cloud & DevOps" },
    { title: "Data Engineer Referral", category: "Data & AI/ML" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
      <div className="p-4 space-y-2">
        {emails.map((email, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-surface-3 border border-border-soft">
            <div className="w-8 h-8 rounded bg-orange-500/10 flex items-center justify-center text-orange-400">
              ✉
            </div>
            <div className="flex-1">
              <span className="text-xs font-medium block">{email.title}</span>
              <span className="text-[10px] text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">{email.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

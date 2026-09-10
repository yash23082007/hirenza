"use client";

import { useState, useEffect } from "react";
import { Check, Star, ChevronRight, Search } from "lucide-react";
import { SHEET_COUNTS, COMPANY_COUNTS } from "@/data/stats";

// 1. Mini DSA Sheets Mockup (Animated Solve & Progress Bar)
export function DSASheetsMockup() {
  const [solvedIndices, setSolvedIndices] = useState<number[]>([0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSolvedIndices(prev => {
        if (prev.length >= 3) return [0];
        return [...prev, prev.length];
      });
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <span className="ml-3 text-xs text-muted">DSA Sheets</span>
        </div>
        <span className="text-[10px] font-mono text-purple-400 font-semibold">
          {solvedIndices.length}/3 tracked
        </span>
      </div>
      <div className="p-4 space-y-3">
        {SHEET_COUNTS.slice(0, 3).map((sheet, idx) => {
          const isSolved = solvedIndices.includes(idx);
          return (
            <div
              key={sheet.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                isSolved
                  ? "bg-purple-950/20 border-purple-500/40"
                  : "bg-surface-3 border-border-soft"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded flex items-center justify-center transition-all ${
                    isSolved
                      ? "bg-purple-1 text-white scale-105"
                      : "bg-surface-2 text-muted"
                  }`}
                >
                  <Check size={14} className={isSolved ? "stroke-[3]" : "opacity-30"} />
                </div>
                <div>
                  <span className={`text-sm font-medium block ${isSolved ? "text-primary font-semibold" : "text-secondary"}`}>
                    {sheet.name}
                  </span>
                  <span className="text-[10px] text-muted">{sheet.educator}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted block">{sheet.problemCount} problems</span>
                <span className={`text-[10px] font-medium ${isSolved ? "text-green-400" : "text-muted"}`}>
                  {isSolved ? "In Progress" : "Queued"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const COMPANY_QUERIES = ["Google", "Amazon", "Meta", "Flipkart"] as const;

// 2. Mini Company-wise Mockup (Animated Typing & Filtering)
export function CompanyWiseMockup() {
  const companyColors: Record<string, string> = {
    google: "#4285f4", amazon: "#ff9900", microsoft: "#00a4ef",
    meta: "#0668e1", apple: "#555555", flipkart: "#f8d210",
  };
  const displayCompanies = COMPANY_COUNTS.slice(0, 4).map(c => ({
    id: c.id,
    name: c.name,
    q: `${c.questionCount} Questions`,
    color: companyColors[c.id] || "#7a33f6",
  }));

  const [queryIndex, setQueryIndex] = useState(0);
  const [charCount, setCharCount] = useState(COMPANY_QUERIES[0].length);

  useEffect(() => {
    let currentIdx = 0;
    let char = COMPANY_QUERIES[0].length;
    let isDeleting = false;

    const timer = setInterval(() => {
      const target = COMPANY_QUERIES[currentIdx];
      if (!isDeleting) {
        if (char < target.length) {
          char++;
          setCharCount(char);
        } else {
          // Pause at full word before deleting
          isDeleting = true;
        }
      } else {
        if (char > 0) {
          char--;
          setCharCount(char);
        } else {
          isDeleting = false;
          currentIdx = (currentIdx + 1) % COMPANY_QUERIES.length;
          setQueryIndex(currentIdx);
        }
      }
    }, 180);

    return () => clearInterval(timer);
  }, []);

  const displayedText = COMPANY_QUERIES[queryIndex].slice(0, charCount);

  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-surface-3 border border-border-soft">
          <Search size={14} className="text-muted" />
          <span className="text-sm text-primary font-mono flex-1">
            {displayedText}
            <span className="animate-pulse text-purple-400">|</span>
          </span>
          <span className="text-[10px] text-muted uppercase font-mono">live filter</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {displayCompanies.map((c, i) => {
            const isMatch = c.name.toLowerCase().includes(displayedText.toLowerCase());
            return (
              <div
                key={i}
                className={`p-3 rounded-lg border flex flex-col gap-2 transition-all duration-300 ${
                  isMatch
                    ? "bg-surface-2 border-brand-orange/70 shadow-md ring-1 ring-brand-orange/30 scale-[1.02]"
                    : "bg-surface-3 border-border-soft opacity-60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
                    style={{ background: `${c.color}20`, color: c.color }}
                  >
                    {c.name[0]}
                  </div>
                  <span className="text-sm font-medium">{c.name}</span>
                </div>
                <span className="text-xs text-muted">{c.q}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 3. Mini Role-wise Mockup (Animated Role Cycling)
export function RoleWiseMockup() {
  const roles = ["Frontend", "Backend", "Fullstack", "DevOps", "Data Scientist", "AI/ML"];
  const questions = [210, 150, 510, 400, 450, 150];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % roles.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {roles.map((role, i) => {
            const isActive = activeIdx === i;
            return (
              <div
                key={i}
                className={`p-3 rounded-lg border text-center transition-all duration-300 ${
                  isActive
                    ? "bg-purple-950/40 border-purple-500/60 ring-1 ring-purple-500/30 scale-105"
                    : "bg-surface-3 border-border-soft"
                }`}
              >
                <span className={`text-xs font-medium block ${isActive ? "text-white font-semibold" : "text-secondary"}`}>
                  {role}
                </span>
                <div className={`text-[10px] mt-1 ${isActive ? "text-purple-300 font-bold" : "text-muted"}`}>
                  {questions[i]} Qs
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 4. Mini Interview Questions Mockup (Animated Technology Selector)
export function InterviewQuestionsMockup() {
  const techs = ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"];
  const colors = ["#f7df1e", "#61dafb", "#339933", "#3776ab", "#ff9900", "#2496ed"];
  const [activeTech, setActiveTech] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTech(prev => (prev + 1) % techs.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [techs.length]);

  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4 px-2 py-2 rounded-lg bg-surface-3 border border-border-soft">
          <Search size={14} className="text-muted ml-2" />
          <span className="text-sm text-secondary">Technology Tracks ({techs[activeTech]})</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {techs.map((tech, i) => {
            const isActive = activeTech === i;
            return (
              <div
                key={i}
                className={`p-2 rounded-lg border text-center transition-all duration-300 ${
                  isActive
                    ? "bg-surface-1 border-purple-500/50 shadow-md ring-1 ring-purple-500/20 scale-105"
                    : "bg-surface-3 border-border-soft opacity-80"
                }`}
              >
                <div
                  className="w-8 h-8 rounded mx-auto mb-1 flex items-center justify-center text-xs font-bold transition-transform"
                  style={{
                    background: `${colors[i]}${isActive ? "35" : "15"}`,
                    color: colors[i],
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {tech[0]}
                </div>
                <span className={`text-[10px] font-medium block ${isActive ? "text-primary font-bold" : "text-secondary"}`}>
                  {tech}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 5. Mini SQL Sheet Mockup (Animated Checkbox & Star Toggle)
export function SQLSheetMockup() {
  const questions = [
    { id: 1, title: "Select all records from a table", diff: "Easy" },
    { id: 42, title: "Find the second highest salary", diff: "Medium" },
    { id: 74, title: "Find top 3 salaries per department", diff: "Hard" },
    { id: 81, title: "Use CTE for hierarchy", diff: "Hard" },
  ];
  const [tickedId, setTickedId] = useState<number>(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickedId(prev => {
        const ids = [1, 42, 74, 81];
        const nextIdx = (ids.indexOf(prev) + 1) % ids.length;
        return ids[nextIdx];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const diffColor: Record<string, string> = {
    Easy: "text-green-400 bg-green-500/10",
    Medium: "text-orange-400 bg-orange-500/10",
    Hard: "text-red-400 bg-red-500/10",
  };

  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
      <div className="p-3 space-y-1">
        {questions.map((q) => {
          const isTicked = q.id === tickedId;
          return (
            <div
              key={q.id}
              className={`flex items-center gap-3 p-2 rounded transition-all duration-300 ${
                isTicked ? "bg-surface-hover/90 border border-purple-500/30" : "hover:bg-surface-hover border border-transparent"
              }`}
            >
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                  isTicked ? "bg-purple-1 border-purple-1 text-white" : "border-border-soft bg-surface-3"
                }`}
              >
                {isTicked && <Check size={10} className="stroke-[3]" />}
              </div>
              <span className="text-xs text-muted w-6 font-mono">{q.id}.</span>
              <span className={`text-xs flex-1 truncate ${isTicked ? "text-primary font-semibold" : "text-secondary"}`}>
                {q.title}
              </span>
              <Star size={12} className={isTicked ? "text-amber-400 fill-amber-400" : "text-muted shrink-0"} />
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${diffColor[q.diff]}`}>
                {q.diff}
              </span>
              <ChevronRight size={12} className="text-muted" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 6. Mini System Design Mockup (Animated HLD vs LLD Architecture Cards)
export function SystemDesignMockup() {
  const items = [
    { title: "Distributed Cache", type: "HLD" },
    { title: "Load Balancer", type: "HLD" },
    { title: "Notification Engine", type: "HLD" },
    { title: "Parking Lot LLD", type: "LLD" },
    { title: "Rate Limiter", type: "HLD" },
    { title: "Snake & Ladder", type: "LLD" },
  ];
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem(prev => (prev + 1) % items.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
      <div className="p-4 grid grid-cols-3 gap-2">
        {items.map((item, i) => {
          const isActive = activeItem === i;
          return (
            <div
              key={i}
              className={`aspect-video rounded-lg border p-2 flex flex-col justify-between transition-all duration-300 ${
                isActive
                  ? "bg-surface-1 border-blue-500/60 shadow-lg ring-1 ring-blue-500/30 scale-105"
                  : "bg-surface-3 border-border-soft"
              }`}
            >
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded w-fit ${
                item.type === "HLD" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
              }`}>
                {item.type}
              </span>
              <span className={`text-[10px] font-medium leading-tight ${isActive ? "text-primary font-bold" : "text-secondary"}`}>
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 7. Mini Notes Mockup (Animated Shimmering Note Cards)
export function NotesMockup() {
  const notes = ["Computer Networks", "AWS Architecture", "Java Concurrency", "Kubernetes Clusters"];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % notes.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [notes.length]);

  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
      <div className="p-4 grid grid-cols-2 gap-3">
        {notes.map((note, i) => {
          const isActive = activeIdx === i;
          return (
            <div
              key={i}
              className={`rounded-lg p-3 flex flex-col gap-2 transition-all duration-300 border ${
                isActive
                  ? "bg-surface-1 border-purple-500/50 shadow-md ring-1 ring-purple-500/20 -translate-y-1"
                  : "bg-surface-3/80 border-border-soft"
              }`}
            >
              <div className="w-full h-1.5 bg-purple-500/20 rounded" />
              <div className="w-3/4 h-1 bg-border-soft rounded" />
              <div className="w-full h-1 bg-border-soft rounded" />
              <div className="w-1/2 h-1 bg-border-soft rounded" />
              <span className={`text-[10px] font-medium mt-1 ${isActive ? "text-primary font-semibold" : "text-secondary"}`}>
                {note}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 8. Mini Cold Email Mockup (Animated Template Expansion)
export function ColdEmailMockup() {
  const emails = [
    { title: "Frontend Dev Referral", category: "Frontend", snippet: "Hi [Lead], loved your work on the frontend architecture..." },
    { title: "DevOps Engineer Referral", category: "Cloud & DevOps", snippet: "Hi [Team], noticed your team is migrating to K8s..." },
    { title: "Data Engineer Referral", category: "Data & AI/ML", snippet: "Hi [Manager], followed your real-time pipeline tech blog..." },
  ];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % emails.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [emails.length]);

  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
      <div className="p-4 space-y-2.5">
        {emails.map((email, i) => {
          const isActive = activeIdx === i;
          return (
            <div
              key={i}
              className={`flex flex-col gap-1.5 p-3 rounded-lg border transition-all duration-300 ${
                isActive
                  ? "bg-surface-1 border-brand-orange/60 shadow-md ring-1 ring-brand-orange/20"
                  : "bg-surface-3 border-border-soft opacity-70"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-orange-400 text-xs">✉</span>
                  <span className={`text-xs ${isActive ? "text-primary font-semibold" : "text-secondary"}`}>
                    {email.title}
                  </span>
                </div>
                <span className="text-[9px] text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                  {email.category}
                </span>
              </div>
              {isActive && (
                <p className="text-[11px] font-mono text-muted pl-4 border-l border-brand-orange/40 animate-in fade-in duration-200">
                  &ldquo;{email.snippet}&rdquo;
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

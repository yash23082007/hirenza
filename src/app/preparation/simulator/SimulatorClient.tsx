"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { companies, Company, CompanyProblem } from "@/data/companies";
import { systemDesignTopics } from "@/data/systemDesign";
import { useProgress } from "@/hooks/useProgress";
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Building2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Trophy,
  AlertCircle,
  FileCode2,
} from "lucide-react";

interface RoundConfig {
  name: string;
  durationMinutes: number;
  problems: CompanyProblem[];
  systemDesignTopic?: string;
}

export function SimulatorClient() {
  const { setStatus } = useProgress();
  const [selectedCompany, setSelectedCompany] = useState<Company>(companies[0]);
  const [sessionActive, setSessionActive] = useState(false);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [rounds, setRounds] = useState<RoundConfig[]>([]);
  const [remainingSeconds, setRemainingSeconds] = useState(45 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [roundSubmissions, setRoundSubmissions] = useState<Record<string, boolean>>({});
  const [sessionComplete, setSessionComplete] = useState(false);
  const [scratchpad, setScratchpad] = useState("");

  const startSimulation = (company: Company) => {
    setSelectedCompany(company);

    const probs = company.problems || [];
    const r1Probs = probs.slice(0, 2);
    const r2Probs = probs.slice(2, 4);

    const sdTopic = systemDesignTopics[Math.floor(Math.random() * systemDesignTopics.length)]?.title || "Design a Distributed Cache";

    const assembledRounds: RoundConfig[] = [
      {
        name: "Round 1: Technical Coding Screening",
        durationMinutes: 45,
        problems: r1Probs,
      },
      {
        name: "Round 2: Algorithmic Architecture & Data Structures",
        durationMinutes: 45,
        problems: r2Probs,
      },
      {
        name: "Round 3: System Design & Scalability",
        durationMinutes: 45,
        problems: [],
        systemDesignTopic: sdTopic,
      },
    ];

    setRounds(assembledRounds);
    setCurrentRoundIndex(0);
    setRemainingSeconds(45 * 60);
    setTimerRunning(true);
    setSessionActive(true);
    setSessionComplete(false);
    setRoundSubmissions({});
  };

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && remainingSeconds > 0) {
      interval = setInterval(() => setRemainingSeconds((s) => s - 1), 1000);
    } else if (remainingSeconds === 0 && sessionActive) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, remainingSeconds, sessionActive]);

  const activeRound = rounds[currentRoundIndex];

  const handleNextRound = () => {
    // Log solved problems in active round
    if (activeRound?.problems) {
      activeRound.problems.forEach((p) => {
        if (roundSubmissions[p.id]) {
          setStatus(`comp-${p.id}`, "solved", {
            module: "companies",
            topic: p.topic,
            difficulty: p.difficulty,
          });
        }
      });
    }

    if (currentRoundIndex < rounds.length - 1) {
      const nextIdx = currentRoundIndex + 1;
      setCurrentRoundIndex(nextIdx);
      setRemainingSeconds(rounds[nextIdx].durationMinutes * 60);
      setTimerRunning(true);
    } else {
      setSessionActive(false);
      setSessionComplete(true);
    }
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const totalSolvedCount = Object.values(roundSubmissions).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-1/10 border border-purple-1/30 text-purple-1 text-xs font-mono mb-2">
            <Building2 size={12} />
            <span>Multi-Round Interview Simulator</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
            Company Round Simulator
          </h1>
          <p className="text-sm text-secondary mt-1">
            Simulate realistic timed hiring loops with countdown constraints matching real company interview bars.
          </p>
        </div>
      </div>

      {!sessionActive && !sessionComplete ? (
        /* Company Selection Card */
        <div className="rounded-3xl border border-border bg-surface-1 p-6 md:p-10 space-y-6 shadow-xl">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-2">Select Target Company Loop</h2>
            <p className="text-sm text-secondary">
              Each simulation configures 3 rounds (90–135 minutes total) with company-specific problem archives and system design prompts.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {companies.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCompany(c)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  selectedCompany.id === c.id
                    ? "bg-purple-1 text-white border-purple-1 shadow-lg"
                    : "bg-surface-2 border-border text-secondary hover:border-border-hover"
                }`}
              >
                <div className="text-lg font-bold">{c.name}</div>
                <div className={`text-xs mt-1 ${selectedCompany.id === c.id ? "text-white/80" : "text-muted font-mono"}`}>
                  {c.problems.length} Curated Questions
                </div>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <button
              onClick={() => startSimulation(selectedCompany)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-1 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <span>Begin {selectedCompany.name} Simulation</span>
              <Play size={16} />
            </button>
          </div>
        </div>
      ) : sessionActive && activeRound ? (
        /* Active Round In Progress */
        <div className="space-y-6 animate-in fade-in">
          {/* Round Header & Timer Bar */}
          <div className="rounded-3xl border border-border bg-surface-1 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-purple-1">
                Round {currentRoundIndex + 1} of {rounds.length} · {selectedCompany.name}
              </span>
              <h2 className="text-2xl font-bold text-primary mt-0.5">{activeRound.name}</h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-surface-2 border border-border">
                <Clock className={`w-5 h-5 ${remainingSeconds < 300 ? "text-rose-400 animate-pulse" : "text-purple-1"}`} />
                <span className="text-2xl font-mono font-bold text-primary">{formatTimer(remainingSeconds)}</span>
              </div>

              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="p-2 rounded-xl bg-surface-2 border border-border text-secondary hover:text-primary transition-colors"
                aria-label="Pause or resume timer"
              >
                {timerRunning ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
          </div>

          {/* Round Problems */}
          {activeRound.problems.length > 0 ? (
            <div className="space-y-4">
              {activeRound.problems.map((p, idx) => {
                const isChecked = Boolean(roundSubmissions[p.id]);

                return (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-border bg-surface-1 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-muted uppercase">Problem {idx + 1}</span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            p.difficulty === "Easy"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : p.difficulty === "Medium"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-rose-500/10 text-rose-400"
                          }`}
                        >
                          {p.difficulty}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-3 text-secondary">
                          {p.topic}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-primary">{p.title}</h3>
                    </div>

                    <div className="flex items-center gap-3">
                      {p.leetcodeUrl && (
                        <Link
                          href={p.leetcodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-2 border border-border text-xs font-semibold text-primary hover:border-purple-1/40 transition-colors"
                        >
                          <span>Solve Tab</span>
                          <ExternalLink size={12} />
                        </Link>
                      )}

                      <button
                        onClick={() =>
                          setRoundSubmissions((prev) => ({
                            ...prev,
                            [p.id]: !prev[p.id],
                          }))
                        }
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                          isChecked
                            ? "bg-emerald-500 text-black shadow-md"
                            : "bg-surface-3 border border-border text-secondary hover:border-border-hover"
                        }`}
                      >
                        <CheckCircle2 size={14} />
                        <span>{isChecked ? "Solved" : "Mark Solved"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* System Design Prompt */
            <div className="rounded-2xl border border-border bg-surface-1 p-6 space-y-4">
              <span className="text-xs font-mono uppercase font-bold text-cyan-400">
                System Design Challenge
              </span>
              <h3 className="text-2xl font-bold text-primary">{activeRound.systemDesignTopic}</h3>
              <p className="text-sm text-secondary leading-relaxed">
                Outline functional requirements, non-functional requirements (throughput, availability, latency), high-level architecture diagram, database schema, and potential bottlenecks.
              </p>
            </div>
          )}

          {/* Candidate Scratchpad */}
          <div className="rounded-2xl border border-border bg-surface-1 p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase font-bold">
              <FileCode2 size={14} />
              <span>Candidate Scratchpad (Pseudocode & Tradeoffs)</span>
            </div>
            <textarea
              value={scratchpad}
              onChange={(e) => setScratchpad(e.target.value)}
              rows={6}
              className="w-full rounded-xl border border-border bg-surface-2 p-4 font-mono text-xs text-primary outline-none focus:border-purple-1/50 resize-none leading-relaxed"
              placeholder="Draft your approach, edge cases, time/space complexity analysis here..."
            />
          </div>

          {/* Submit Round Button */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <button
              onClick={() => {
                if (window.confirm("Abort this interview simulation? Progress for this session will be discarded.")) {
                  setSessionActive(false);
                }
              }}
              className="text-xs text-muted hover:text-rose-400 transition-colors font-mono"
            >
              Abort Simulation
            </button>

            <button
              onClick={handleNextRound}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-1 text-white font-semibold text-xs hover:opacity-90 transition-opacity"
            >
              <span>{currentRoundIndex === rounds.length - 1 ? "Finish Interview Loop" : "Submit & Start Next Round"}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        /* Post-Interview Evaluation Summary */
        <div className="rounded-3xl border border-border bg-surface-1 p-6 md:p-10 space-y-6 animate-in fade-in shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Trophy size={24} />
            </div>
            <div>
              <span className="text-xs font-mono uppercase font-bold text-emerald-400">Simulation Complete</span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                {selectedCompany.name} Loop Results
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-border bg-surface-2">
              <span className="text-xs font-mono text-muted uppercase block">Coding Solves</span>
              <span className="text-2xl font-mono font-bold text-primary">{totalSolvedCount} / 4</span>
              <span className="text-[11px] text-secondary block mt-0.5">Problems completed</span>
            </div>

            <div className="p-4 rounded-xl border border-border bg-surface-2">
              <span className="text-xs font-mono text-muted uppercase block">Rounds Finished</span>
              <span className="text-2xl font-mono font-bold text-purple-1">3 / 3</span>
              <span className="text-[11px] text-secondary block mt-0.5">Coding + System Design</span>
            </div>

            <div className="p-4 rounded-xl border border-border bg-surface-2">
              <span className="text-xs font-mono text-muted uppercase block">Hiring Verdict</span>
              <span className={`text-lg font-bold ${totalSolvedCount >= 3 ? "text-emerald-400" : "text-amber-400"}`}>
                {totalSolvedCount >= 3 ? "Strong Hire Bar" : "Revision Recommended"}
              </span>
              <span className="text-[11px] text-secondary block mt-0.5">Based on round timings</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <button
              onClick={() => {
                setSessionComplete(false);
                setSessionActive(false);
              }}
              className="px-4 py-2 rounded-xl bg-surface-2 border border-border text-xs font-semibold text-secondary hover:text-primary transition-colors"
            >
              Simulate Another Company
            </button>
            <Link
              href="/preparation"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-1 text-white font-semibold text-xs hover:opacity-90 transition-opacity"
            >
              <span>Return to Cockpit</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

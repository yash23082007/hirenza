"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { companies, Company, CompanyProblem } from "@/data/companies";
import { useProgress } from "@/hooks/useProgress";
import {
  GitCompare,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Target,
  Sparkles,
  ArrowLeftRight,
} from "lucide-react";

export function CompanyCompareClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data, setStatus } = useProgress();

  const paramA = searchParams.get("a") || "google";
  const paramB = searchParams.get("b") || "amazon";

  const [companyAId, setCompanyAId] = useState(paramA);
  const [companyBId, setCompanyBId] = useState(paramB);

  const companyA = companies.find((c) => c.id.toLowerCase() === companyAId.toLowerCase()) || companies[0];
  const companyB = companies.find((c) => c.id.toLowerCase() === companyBId.toLowerCase()) || companies[1];

  const handleSelectA = (id: string) => {
    setCompanyAId(id);
    router.replace(`/preparation/company-wise-dsa/compare?a=${id}&b=${companyBId}`);
  };

  const handleSelectB = (id: string) => {
    setCompanyBId(id);
    router.replace(`/preparation/company-wise-dsa/compare?a=${companyAId}&b=${id}`);
  };

  // Compute Overlapping Problems (by title match or URL match)
  const overlapProblems = useMemo(() => {
    const list: { aProb: CompanyProblem; bProb: CompanyProblem }[] = [];
    const bTitles = new Map<string, CompanyProblem>();
    const bUrls = new Map<string, CompanyProblem>();

    companyB.problems.forEach((p) => {
      bTitles.set(p.title.trim().toLowerCase(), p);
      if (p.leetcodeUrl) bUrls.set(p.leetcodeUrl.trim().toLowerCase(), p);
    });

    companyA.problems.forEach((aProb) => {
      const match =
        bTitles.get(aProb.title.trim().toLowerCase()) ||
        (aProb.leetcodeUrl ? bUrls.get(aProb.leetcodeUrl.trim().toLowerCase()) : undefined);

      if (match) {
        list.push({ aProb, bProb: match });
      }
    });

    return list;
  }, [companyA, companyB]);

  // Topic distribution breakdown
  const getTopicBreakdown = (company: Company) => {
    const counts: Record<string, number> = {};
    company.problems.forEach((p) => {
      counts[p.topic] = (counts[p.topic] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const topicsA = getTopicBreakdown(companyA);
  const topicsB = getTopicBreakdown(companyB);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-1/10 border border-purple-1/30 text-purple-1 text-xs font-mono mb-2">
            <GitCompare size={12} />
            <span>Dual Company Benchmark</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
            Company Target Comparison
          </h1>
          <p className="text-sm text-secondary mt-1">
            Analyze hiring bars, algorithmic weight distribution, and high-yield overlapping questions.
          </p>
        </div>

        <Link
          href="/preparation/company-wise-dsa"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-primary transition-colors"
        >
          <span>All Companies</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 p-4 rounded-2xl border border-border bg-surface-1 shadow-md">
        <div className="space-y-1">
          <label className="text-[11px] font-mono text-muted uppercase font-bold block">
            Company A (Primary)
          </label>
          <select
            value={companyA.id}
            onChange={(e) => handleSelectA(e.target.value)}
            className="w-full bg-surface-2 border border-border text-primary rounded-xl px-3.5 py-2 text-sm font-semibold outline-none"
          >
            {companies.map((c) => (
              <option key={c.id} value={c.id} disabled={c.id === companyB.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center p-2 text-muted">
          <ArrowLeftRight size={18} />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-mono text-muted uppercase font-bold block">
            Company B (Comparative)
          </label>
          <select
            value={companyB.id}
            onChange={(e) => handleSelectB(e.target.value)}
            className="w-full bg-surface-2 border border-border text-primary rounded-xl px-3.5 py-2 text-sm font-semibold outline-none"
          >
            {companies.map((c) => (
              <option key={c.id} value={c.id} disabled={c.id === companyA.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overlapping Problem Set (The Highest ROI Section) */}
      <div className="rounded-3xl border border-border bg-surface-1 p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">
                High-Yield Overlapping Questions ({overlapProblems.length})
              </h2>
              <p className="text-xs text-secondary mt-0.5">
                Problems reported across BOTH {companyA.name} and {companyB.name}. Solving these provides 2x leverage.
              </p>
            </div>
          </div>
        </div>

        {overlapProblems.length > 0 ? (
          <div className="space-y-3">
            {overlapProblems.map(({ aProb, bProb }) => {
              const statusA = data.statuses[`comp-${aProb.id}`];
              const statusB = data.statuses[`comp-${bProb.id}`];
              const isSolved =
                statusA === "solved" || statusA === "mastered" || statusB === "solved" || statusB === "mastered";

              const handleMarkSolved = () => {
                setStatus(`comp-${aProb.id}`, "solved");
                setStatus(`comp-${bProb.id}`, "solved");
              };

              return (
                <div
                  key={aProb.id}
                  className="p-4 rounded-xl border border-border bg-surface-2/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          aProb.difficulty === "Easy"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : aProb.difficulty === "Medium"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-rose-500/10 text-rose-400"
                        }`}
                      >
                        {aProb.difficulty}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-3 text-secondary">
                        {aProb.topic}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-1/10 text-purple-1">
                        Shared Match
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-primary">{aProb.title}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    {aProb.leetcodeUrl && (
                      <Link
                        href={aProb.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-secondary hover:text-primary transition-colors"
                      >
                        <span>LeetCode</span>
                        <ExternalLink size={12} />
                      </Link>
                    )}

                    <button
                      onClick={handleMarkSolved}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        isSolved
                          ? "bg-emerald-500 text-black"
                          : "bg-surface-3 border border-border text-secondary hover:border-border-hover"
                      }`}
                    >
                      <CheckCircle2 size={13} />
                      <span>{isSolved ? "Solved" : "Mark Solved"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-secondary text-sm border border-dashed border-border rounded-2xl">
            No exact problem overlap between {companyA.name} and {companyB.name} archives. Each company tests distinct archetypes.
          </div>
        )}
      </div>

      {/* Side-by-Side Breakdown Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Company A Card */}
        <div className="rounded-3xl border border-border bg-surface-1 p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-muted">Profile A</span>
              <h2 className="text-2xl font-bold text-primary">{companyA.name}</h2>
            </div>
            <span className="text-sm font-mono font-bold text-purple-1">
              {companyA.problems.length} Problems
            </span>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted font-bold">
              Top 5 Algorithmic Focus Topics
            </h4>
            <div className="space-y-2">
              {topicsA.map(([topic, count]) => (
                <div key={topic} className="flex items-center justify-between p-2.5 rounded-xl bg-surface-2 text-xs">
                  <span className="text-secondary font-medium">{topic}</span>
                  <span className="font-mono font-bold text-primary">{count} problems</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={`/preparation/company-wise-dsa/${companyA.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-1 hover:underline"
            >
              <span>Explore full {companyA.name} track</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Company B Card */}
        <div className="rounded-3xl border border-border bg-surface-1 p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-muted">Profile B</span>
              <h2 className="text-2xl font-bold text-primary">{companyB.name}</h2>
            </div>
            <span className="text-sm font-mono font-bold text-cyan-400">
              {companyB.problems.length} Problems
            </span>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted font-bold">
              Top 5 Algorithmic Focus Topics
            </h4>
            <div className="space-y-2">
              {topicsB.map(([topic, count]) => (
                <div key={topic} className="flex items-center justify-between p-2.5 rounded-xl bg-surface-2 text-xs">
                  <span className="text-secondary font-medium">{topic}</span>
                  <span className="font-mono font-bold text-primary">{count} problems</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={`/preparation/company-wise-dsa/${companyB.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline"
            >
              <span>Explore full {companyB.name} track</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

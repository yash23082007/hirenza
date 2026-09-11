"use client";

import Link from "next/link";
import { ArrowUpRight, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { companies } from "@/data";
import { TOTAL_COMPANIES } from "@/data/stats";

export function CompanyDirectory() {
  const [query, setQuery] = useState("");

  const filteredCompanies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return companies;
    return companies.filter(company => company.name.toLowerCase().includes(normalizedQuery));
  }, [query]);

  return (
    <section className="border-y border-border/70 bg-surface-1/35 py-20 md:py-28" aria-labelledby="company-directory-title">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">Company DSA directory</p>
            <h2 id="company-directory-title" className="text-3xl font-extrabold tracking-tight text-primary md:text-5xl">
              Pick a target. See the work.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-secondary md:text-base">
              Browse {TOTAL_COMPANIES} target companies in one place. Curated tracks show their current problem depth; directory entries stay visible while coverage is expanded from public sources.
            </p>
          </div>

          <label className="flex min-h-11 w-full items-center gap-3 rounded-xl border border-border bg-surface-2 px-4 lg:max-w-sm">
            <Search size={17} className="shrink-0 text-muted" aria-hidden="true" />
            <span className="sr-only">Search companies</span>
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search companies"
              className="min-w-0 flex-1 bg-transparent text-sm text-primary outline-none placeholder:text-muted"
            />
          </label>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCompanies.map(company => {
            const hasCuratedTrack = company.problems.length > 0;
            return (
              <Link
                key={company.id}
                href={`/preparation/company-wise-dsa/${company.id}`}
                className="group rounded-2xl border border-border bg-surface-1 p-4 transition-transform duration-200 hover:-translate-y-1 hover:border-purple-1/50 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-1"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-soft bg-surface-3 text-base font-extrabold text-primary">
                      {company.logo}
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-primary group-hover:text-purple-300">{company.name}</h3>
                      <p className="mt-1 text-[11px] text-muted">
                        {hasCuratedTrack ? `${company.problems.length} questions` : "Coverage queued"}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-purple-300" aria-hidden="true" />
                </div>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider">
                  <ShieldCheck size={12} className={hasCuratedTrack ? "text-emerald-400" : "text-muted"} aria-hidden="true" />
                  <span className={hasCuratedTrack ? "text-emerald-400" : "text-muted"}>
                    {hasCuratedTrack ? "Curated track" : "Directory listing"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredCompanies.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted">No company matches “{query}”.</p>
        )}
      </div>
    </section>
  );
}

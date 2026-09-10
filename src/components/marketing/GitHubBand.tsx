import Link from "next/link";
import { Star, GitFork, ShieldCheck, ArrowUpRight } from "lucide-react";

interface GitHubStats {
  stars: number | null;
  forks: number | null;
  license: string;
}

async function getRepoStats(): Promise<GitHubStats> {
  try {
    const res = await fetch("https://api.github.com/repos/yash23082007/hirenza", {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Hirenza-Web",
      },
    });

    if (!res.ok) {
      return { stars: null, forks: null, license: "MIT" };
    }

    const data = await res.json();
    return {
      stars: typeof data.stargazers_count === "number" ? data.stargazers_count : null,
      forks: typeof data.forks_count === "number" ? data.forks_count : null,
      license: data.license?.spdx_id || "MIT",
    };
  } catch {
    return { stars: null, forks: null, license: "MIT" };
  }
}

export async function GitHubBand() {
  const stats = await getRepoStats();

  return (
    <section className="max-w-7xl mx-auto px-6 py-6 my-4">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-surface-2 via-surface-1 to-surface-2 p-6 md:p-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-purple-1/10 border border-purple-1/30 flex items-center justify-center text-purple-1 flex-shrink-0">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-xs uppercase font-mono font-bold tracking-wider text-purple-1">Open Source Platform</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">100% Free</span>
              </div>
              <h3 className="text-lg font-bold text-primary mt-1">
                Zero walled gardens. Transparent code, community inspected.
              </h3>
              <p className="text-sm text-secondary mt-0.5">
                Every line of tracker logic, curriculum curation, and question indexing is public under the {stats.license} license.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center flex-shrink-0">
            {stats.stars !== null ? (
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-1 border border-border text-sm font-mono text-secondary">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                <span className="font-bold text-primary">{stats.stars}</span>
                <span className="text-xs text-muted">stars</span>
              </div>
            ) : null}

            {stats.forks !== null ? (
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-1 border border-border text-sm font-mono text-secondary">
                <GitFork className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-primary">{stats.forks}</span>
                <span className="text-xs text-muted">forks</span>
              </div>
            ) : null}

            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-1 border border-border text-sm font-mono text-secondary">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-primary">{stats.license}</span>
              <span className="text-xs text-muted">license</span>
            </div>

            <Link
              href="https://github.com/yash23082007/hirenza"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-background font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <span>Star on GitHub</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

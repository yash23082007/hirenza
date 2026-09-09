"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Bookmark, ExternalLink, Trash2, Search, ArrowUpRight, Sparkles } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

export default function BookmarksPage() {
  const { allBookmarks, toggleBookmark } = useProgress();
  const [filterModule, setFilterModule] = useState<string>("All");
  const [search, setSearch] = useState("");

  const modules = useMemo(() => {
    const set = new Set(allBookmarks.map(b => b.module));
    return ["All", ...Array.from(set)];
  }, [allBookmarks]);

  const filteredBookmarks = useMemo(() => {
    return allBookmarks.filter(item => {
      const matchMod = filterModule === "All" || item.module === filterModule;
      const matchSearch =
        search === "" ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        (item.topic && item.topic.toLowerCase().includes(search.toLowerCase()));
      return matchMod && matchSearch;
    });
  }, [allBookmarks, filterModule, search]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Saved Bookmarks</h1>
          <p className="text-secondary">
            {allBookmarks.length} question{allBookmarks.length === 1 ? "" : "s"} and resource{allBookmarks.length === 1 ? "" : "s"} saved for revision.
          </p>
        </div>
      </div>

      {/* Filter and search controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search saved bookmarks..."
            className="w-full bg-surface-2 border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-primary placeholder:text-muted outline-none focus:border-purple-1/40"
          />
        </div>

        {modules.length > 2 && (
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {modules.map(mod => (
              <button
                key={mod}
                onClick={() => setFilterModule(mod)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  filterModule === mod
                    ? "bg-purple-1 text-white"
                    : "bg-surface-2 border border-border text-secondary hover:text-primary"
                }`}
              >
                {mod.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* List */}
      {filteredBookmarks.length === 0 ? (
        <div className="border border-border rounded-2xl bg-surface-2 p-12 text-center text-muted">
          <Sparkles size={32} className="mx-auto text-yellow-400 mb-2" />
          <h3 className="text-base font-semibold text-primary mb-1">
            {allBookmarks.length === 0 ? "No saved bookmarks yet" : "No bookmarks match your search"}
          </h3>
          <p className="text-xs text-secondary max-w-sm mx-auto mb-4">
            {allBookmarks.length === 0
              ? "Star any DSA question, SQL query, system design topic, or cool note to save it here for quick review."
              : "Try adjusting your search query or module filter."}
          </p>
          {allBookmarks.length === 0 && (
            <Link
              href="/preparation/dsa-sheets"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-1 text-white text-xs font-semibold hover:bg-purple-1/90 transition-colors"
            >
              Browse DSA Sheets <ArrowUpRight size={14} />
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredBookmarks.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-surface-2 border border-border rounded-xl hover:border-purple-1/30 transition-all group"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-lg bg-surface-3 flex items-center justify-center text-yellow-400 shrink-0">
                  <Bookmark size={18} className="fill-yellow-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={item.href}
                    className="font-medium text-primary group-hover:text-purple-400 transition-colors truncate block"
                  >
                    {item.title}
                  </Link>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-surface-3 text-secondary font-medium">
                      {item.moduleLabel}
                    </span>
                    {item.topic && <span className="text-muted truncate">• {item.topic}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 ml-4">
                {item.difficulty && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                      item.difficulty === "Easy"
                        ? "bg-green-500/10 text-green-400"
                        : item.difficulty === "Medium"
                        ? "bg-orange-500/10 text-orange-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {item.difficulty}
                  </span>
                )}

                {item.urls && item.urls.length > 0 && (
                  <a
                    href={item.urls[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted hover:text-primary rounded-lg hover:bg-surface-3 transition-colors"
                    title={`Open on ${item.urls[0].label}`}
                  >
                    <ExternalLink size={16} />
                  </a>
                )}

                <button
                  onClick={() => toggleBookmark(item.id)}
                  className="p-2 text-muted hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

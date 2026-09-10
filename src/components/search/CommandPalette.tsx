"use client";

import { useEffect, useState, useRef, useMemo, useDeferredValue } from "react";
import { useRouter } from "next/navigation";
import { Search, ExternalLink, Check, Star, X, Sparkles, BookOpen, Code2, Database, Layers, Building2 } from "lucide-react";
import Fuse from "fuse.js";
import { getAllCatalogItems, CatalogItem } from "@/data/catalog";
import { useProgress } from "@/hooks/useProgress";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const { isCompleted, isBookmarked, toggleComplete, toggleBookmark } = useProgress();

  // Lazy-load catalog items only when palette is active
  const allItems = useMemo(() => (isOpen ? getAllCatalogItems() : []), [isOpen]);
  const fuse = useMemo(() => {
    if (!isOpen || allItems.length === 0) return null;
    return new Fuse(allItems, {
      keys: [
        { name: "title", weight: 0.7 },
        { name: "topic", weight: 0.2 },
        { name: "moduleLabel", weight: 0.1 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
    });
  }, [isOpen, allItems]);

  const results = useMemo(() => {
    if (!isOpen) return [];
    if (!fuse || !deferredQuery.trim()) {
      return allItems.slice(0, 10);
    }
    return fuse.search(deferredQuery, { limit: 25 }).map(res => res.item);
  }, [isOpen, deferredQuery, fuse, allItems]);

  // Open/close keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
      setSelectedIndex(0);
      setQuery("");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus trap & return
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement | null;
      const timer = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(timer);
    } else if (previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement | undefined;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  const handleSelect = (item: CatalogItem) => {
    setIsOpen(false);
    router.push(item.href);
  };

  const handleKeyDownInList = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Tab") {
      // Focus trap within the palette
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'input, button, [href], [tabindex="0"]'
      );
      if (focusable && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = results[selectedIndex];
      if (current) {
        if ((e.metaKey || e.ctrlKey) && current.urls && current.urls.length > 0) {
          window.open(current.urls[0].href, "_blank", "noopener,noreferrer");
        } else {
          handleSelect(current);
        }
      }
    }
  };

  if (!isOpen) return null;

  const getModuleIcon = (module: string) => {
    switch (module) {
      case "dsa":
      case "package-wise":
        return <Code2 size={15} className="text-purple-400" />;
      case "sql":
        return <Database size={15} className="text-cyan-400" />;
      case "system-design":
        return <Layers size={15} className="text-amber-400" />;
      case "companies":
        return <Building2 size={15} className="text-emerald-400" />;
      default:
        return <BookOpen size={15} className="text-blue-400" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/70 backdrop-blur-sm transition-all"
      onClick={() => setIsOpen(false)}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Global search and navigation palette"
        className="w-full max-w-2xl bg-surface-1 border border-border-hover rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDownInList}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border gap-3">
          <Search size={20} className="text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search problems, patterns, SQL queries, system design, notes... (⌘K)"
            className="flex-1 bg-transparent text-primary placeholder:text-muted outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-muted hover:text-primary rounded-md transition-colors"
            >
              <X size={16} />
            </button>
          )}
          <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded border border-border text-muted bg-surface-2">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 space-y-1 flex-1 custom-scrollbar">
          {results.length === 0 ? (
            <div className="py-12 text-center text-muted">
              <p className="text-sm font-medium">No matching questions or topics found.</p>
              <p className="text-xs mt-1">Try searching by topic like &apos;Binary Search&apos;, &apos;LRU&apos;, or &apos;Google&apos;.</p>
            </div>
          ) : (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              const solved = isCompleted(item.id);
              const bookmarked = isBookmarked(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all ${
                    isSelected ? "bg-surface-2 border border-purple-1/40" : "hover:bg-surface-2/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-surface-3 flex items-center justify-center shrink-0">
                      {getModuleIcon(item.module)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium truncate ${solved ? "line-through text-muted" : "text-primary"}`}>
                          {item.title}
                        </span>
                        {item.difficulty && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 ${
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
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-muted">
                        <span>{item.moduleLabel}</span>
                        {item.topic && (
                          <>
                            <span>•</span>
                            <span className="truncate">{item.topic}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 ml-2" onClick={e => e.stopPropagation()}>
                    {item.urls && item.urls.length > 0 && (
                      <a
                        href={item.urls[0].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-muted hover:text-primary hover:bg-surface-3 rounded-lg transition-colors"
                        title={`Open on ${item.urls[0].label}`}
                        onClick={e => e.stopPropagation()}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    <button
                      onClick={() => toggleBookmark(item.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        bookmarked ? "text-yellow-400 bg-yellow-400/10" : "text-muted hover:text-yellow-400 hover:bg-surface-3"
                      }`}
                      title={bookmarked ? "Remove bookmark" : "Add bookmark"}
                    >
                      <Star size={14} className={bookmarked ? "fill-yellow-400" : ""} />
                    </button>
                    <button
                      onClick={() =>
                        toggleComplete(item.id, {
                          module: item.module,
                          topic: item.topic,
                          difficulty: item.difficulty,
                        })
                      }
                      className={`p-1.5 rounded-lg transition-colors ${
                        solved ? "text-green-400 bg-green-500/10" : "text-muted hover:text-green-400 hover:bg-surface-3"
                      }`}
                      title={solved ? "Mark unsolved" : "Mark solved"}
                    >
                      <Check size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-border bg-surface-2/40 flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-3">
            <span><strong className="text-secondary">↑↓</strong> to navigate</span>
            <span><strong className="text-secondary">↵</strong> to select</span>
            <span><strong className="text-secondary">⌘↵</strong> open link</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles size={12} className="text-purple-400" />
            <span>Fuzzy search active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

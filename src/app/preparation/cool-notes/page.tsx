"use client";

import { Suspense, useState, useMemo } from "react";
import { notes, type Note } from "@/data";
import { notesContent } from "@/data/notesContent";
import {
  Search,
  Sparkles,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Bookmark,
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { ResourceCard } from "@/components/ui/primitives/ResourceCard";

const PAGE_SIZE = 8;

function NoteReaderModal({
  note,
  onClose,
}: {
  note: Note;
  onClose: () => void;
}) {
  const [revisionMode, setRevisionMode] = useState(false);
  const { isBookmarked, toggleBookmark } = useProgress();

  // Find corresponding deep content or fallback to standard sections
  const content = useMemo(() => {
    return (
      notesContent.find(
        c =>
          c.id === note.id ||
          (note.id === "computer-networks" && c.id === "cn") ||
          (note.id === "operating-systems" && c.id === "os") ||
          (note.id === "low-level-design" && c.id === "lld")
      ) || {
        id: note.id,
        title: note.title,
        icon: "📘",
        sections: [
          {
            title: "Core Architecture & Key Concepts",
            keyPoints: [
              note.description,
              "Designed for rapid revision before technical screening loops.",
              "Focuses on trade-offs, scalability, and system invariants.",
            ],
            importantTerms: [note.tag, note.category, "Production Grade"],
          },
        ],
      }
    );
  }, [note]);

  const bookmarkKey = `note-${note.id}`;
  const bookmarked = isBookmarked(bookmarkKey);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${note.title} Reader`}
    >
      <div
        className="w-full max-w-3xl bg-surface-1 border border-border rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between gap-4 bg-surface-2/60">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${note.coverGradient} flex items-center justify-center text-white text-lg font-bold shrink-0 shadow-sm`}
            >
              {note.title.charAt(0)}
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-primary truncate">{note.title}</h2>
              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="text-purple-400 font-medium">{note.tag}</span>
                <span>•</span>
                <span>{note.pages} pages</span>
                <span>•</span>
                <span>{note.date}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleBookmark(bookmarkKey)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                bookmarked
                  ? "bg-amber-500/15 text-amber-400"
                  : "bg-surface-3 text-muted hover:text-primary hover:bg-surface-hover"
              }`}
              title={bookmarked ? "Remove Bookmark" : "Save Note"}
            >
              <Bookmark size={16} className={bookmarked ? "fill-amber-400" : ""} />
            </button>

            <button
              onClick={() => setRevisionMode(!revisionMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                revisionMode
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "bg-surface-3 hover:bg-surface-hover text-secondary border border-border"
              }`}
            >
              <Sparkles size={13} className="text-amber-400" />
              <span className="hidden sm:inline">{revisionMode ? "Standard Mode" : "Flashcard Mode"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-muted hover:text-primary rounded-lg hover:bg-surface-3 cursor-pointer"
              aria-label="Close reader"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Reader Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 custom-scrollbar">
          <div className="p-4 bg-surface-2 rounded-xl border border-border-soft">
            <p className="text-xs text-secondary leading-relaxed">{note.description}</p>
          </div>

          <div className="space-y-4">
            {content.sections.map((sec, sIdx) => (
              <div
                key={sIdx}
                className={`p-5 rounded-xl border transition-all ${
                  revisionMode
                    ? "bg-amber-950/10 border-amber-500/30"
                    : "bg-surface-2/70 border-border"
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="font-bold text-sm text-primary flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-purple-1/20 text-purple-400 flex items-center justify-center text-[10px]">
                      {sIdx + 1}
                    </span>
                    {sec.title}
                  </h3>
                  {revisionMode && (
                    <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      Flashcard Bullet
                    </span>
                  )}
                </div>

                <ul className="space-y-2 text-xs text-secondary mb-4 list-disc list-inside">
                  {sec.keyPoints.map((point, pIdx) => (
                    <li key={pIdx} className="leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>

                {sec.importantTerms && sec.importantTerms.length > 0 && (
                  <div className="pt-3 border-t border-border-soft flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-muted uppercase font-bold tracking-wider mr-1">
                      Key Terms:
                    </span>
                    {sec.importantTerms.map((term, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-surface-3 text-secondary border border-border-soft"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 border-t border-border bg-surface-2/60 flex items-center justify-between text-xs text-muted">
          <span>{note.category} Track • Free Offline Access</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-purple-1 hover:bg-purple-1/90 text-white font-medium cursor-pointer"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
}

function CoolNotesContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeReadingNote, setActiveReadingNote] = useState<Note | null>(null);

  const categories = useMemo(() => {
    return ["All", ...new Set(notes.map(n => n.category))];
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter(n => {
      const matchesCat = selectedCategory === "All" || n.category === selectedCategory;
      const matchesSearch =
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredNotes.length / PAGE_SIZE));
  const paginatedNotes = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredNotes.slice(start, start + PAGE_SIZE);
  }, [filteredNotes, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Active in-page reader modal */}
      {activeReadingNote && (
        <NoteReaderModal
          note={activeReadingNote}
          onClose={() => setActiveReadingNote(null)}
        />
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
          Engineering Revision Library
        </h1>
        <p className="text-secondary text-sm md:text-base max-w-3xl">
          Concise, high-yield revision summaries designed for final-round tech reviews.
          Covers low-level internals, OS concurrency, database engines, and cloud distributed architecture.
        </p>
      </div>

      {/* Controls Bar: Category Filter + Search + Count */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map(cat => {
            const count = cat === "All" ? notes.length : notes.filter(n => n.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer inline-flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? "bg-purple-1 text-white shadow-sm"
                    : "bg-surface-2 text-secondary border border-border hover:border-purple-1/30 hover:text-primary"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat ? "bg-white/20 text-white" : "bg-surface-3 text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 bg-surface-2 border border-border rounded-xl px-3.5 py-2 w-full md:w-72">
          <Search size={15} className="text-muted shrink-0" />
          <input
            type="text"
            placeholder="Search notes or tags..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent flex-1 text-xs outline-none text-primary placeholder:text-muted"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted border-b border-border-soft pb-2">
        <span>{filteredNotes.length} notes found</span>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Grid of Notes Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {paginatedNotes.map(note => (
          <ResourceCard
            key={note.id}
            title={note.title}
            description={note.description}
            onClick={() => setActiveReadingNote(note)}
            tags={[note.tag]}
            meta={
              <span className="inline-flex items-center gap-1 font-mono">
                <Calendar size={11} /> {note.date}
              </span>
            }
            actions={
              <span className="text-purple-400 font-bold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                Open Reader →
              </span>
            }
            visual={
              <div
                className={`w-full h-32 bg-gradient-to-br ${note.coverGradient} p-4 flex flex-col justify-between text-white shadow-inner relative overflow-hidden group-hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-xs">
                    {note.category}
                  </span>
                  <span className="text-[11px] font-medium opacity-90">{note.pages} pages</span>
                </div>
                <div className="text-4xl opacity-20 font-serif leading-none absolute -bottom-2 -right-2">
                  {note.title.charAt(0)}
                </div>
              </div>
            }
          />
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-16 text-muted">
          <p className="text-sm">No revision notes matched &quot;{searchQuery}&quot; in category &quot;{selectedCategory}&quot;.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-surface-2 border border-border text-secondary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Previous Page"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                currentPage === page
                  ? "bg-purple-1 text-white"
                  : "bg-surface-2 border border-border text-secondary hover:text-primary"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-surface-2 border border-border text-secondary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Next Page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function CoolNotesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted">Loading study notes...</div>}>
      <CoolNotesContent />
    </Suspense>
  );
}

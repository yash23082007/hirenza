"use client";

import { useState, useMemo } from "react";
import { notesContent, NoteContent, NoteSection } from "@/data";
import { FileText, ArrowLeft, BookOpen, Search, Bookmark, Sparkles, Hash, Check } from "lucide-react";

export default function CoolNotesPage() {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [bookmarkedPoints, setBookmarkedPoints] = useState<Record<string, boolean>>({});

  const selectedNote = useMemo(() => {
    return selectedNoteId ? notesContent.find(n => n.id === selectedNoteId) : null;
  }, [selectedNoteId]);

  const toggleBookmark = (id: string) => {
    setBookmarkedPoints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredSections = useMemo(() => {
    if (!selectedNote) return [];
    if (!search) return selectedNote.sections;
    return selectedNote.sections.filter(s => 
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.keyPoints.some(k => k.toLowerCase().includes(search.toLowerCase())) ||
      (s.importantTerms && s.importantTerms.some(t => t.toLowerCase().includes(search.toLowerCase())))
    );
  }, [selectedNote, search]);

  if (selectedNote) {
    return (
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => {
              setSelectedNoteId(null);
              setSearch("");
              setRevisionMode(false);
            }}
            className="text-xs font-bold text-purple-1 hover:underline flex items-center gap-1.5"
          >
            <ArrowLeft size={14} /> Back to all study notes
          </button>

          <button
            onClick={() => setRevisionMode(!revisionMode)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              revisionMode 
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" 
                : "bg-surface-2 hover:bg-surface-hover text-secondary border border-border"
            }`}
          >
            <Sparkles size={13} className="text-amber-400" />
            {revisionMode ? "Standard Reader Mode" : "Quick Revision Mode (Flashcards)"}
          </button>
        </div>

        {/* Note Header */}
        <div className="card p-6 mb-6 bg-gradient-to-br from-surface-1 to-surface-2 border-purple-500/20">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-surface-3 border border-border flex items-center justify-center text-3xl shadow-inner">
              {selectedNote.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{selectedNote.title}</h1>
              <p className="text-xs text-muted mt-1">{selectedNote.sections.length} Core Modules • Fast Revision & Concept Notes</p>
            </div>
          </div>
        </div>

        {/* Search & TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Table of Contents Sidebar */}
          <div className="card p-4 lg:col-span-1 sticky top-24 space-y-3 bg-surface-2 hidden lg:block">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted border-b border-border pb-2">
              <Hash size={14} /> Table of Contents
            </div>
            <div className="space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
              {selectedNote.sections.map((sec, i) => (
                <a
                  key={i}
                  href={`#sec-${i}`}
                  className="block text-xs py-1.5 px-2 rounded-lg text-secondary hover:text-purple-1 hover:bg-surface-3 transition-colors truncate"
                >
                  {i + 1}. {sec.title}
                </a>
              ))}
            </div>
          </div>

          {/* Main Sections Reader */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-3 bg-surface-2 border border-border rounded-xl px-4 py-2.5">
              <Search size={15} className="text-muted shrink-0" />
              <input
                type="text"
                placeholder="Search keywords in this note..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent flex-1 text-xs outline-none placeholder:text-muted"
              />
            </div>

            {filteredSections.map((section, idx) => (
              <div 
                key={idx} 
                id={`sec-${idx}`}
                className={`card p-6 border transition-all ${
                  revisionMode ? "bg-surface-2/80 border-purple-500/30" : "bg-surface-2 border-border"
                }`}
              >
                <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                  <h2 className="text-base font-bold flex items-center gap-2 text-primary">
                    <BookOpen size={16} className="text-purple-1" />
                    {section.title}
                  </h2>
                  <span className="text-[10px] text-muted bg-surface-3 px-2 py-0.5 rounded-full font-medium">
                    Module {idx + 1}
                  </span>
                </div>

                {/* Key Points */}
                <div className="mb-4">
                  <span className="text-xs font-bold text-muted uppercase tracking-wider block mb-2.5">
                    Core Concepts & Key Insights:
                  </span>
                  <ul className="space-y-2.5">
                    {section.keyPoints.map((point, pIdx) => {
                      const pointId = `${selectedNote.id}-${idx}-${pIdx}`;
                      const isBookmarked = !!bookmarkedPoints[pointId];

                      return (
                        <li key={pIdx} className="flex items-start gap-3 text-xs text-secondary leading-relaxed bg-surface-3/50 p-2.5 rounded-xl border border-border-soft">
                          <button
                            onClick={() => toggleBookmark(pointId)}
                            className={`mt-0.5 transition-colors ${
                              isBookmarked ? "text-amber-400" : "text-muted hover:text-secondary"
                            }`}
                            title={isBookmarked ? "Bookmarked Insight" : "Bookmark Insight"}
                          >
                            <Bookmark size={13} fill={isBookmarked ? "currentColor" : "none"} />
                          </button>
                          <span className="flex-1">{point}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Important Terms */}
                {section.importantTerms && section.importantTerms.length > 0 && (
                  <div className="pt-3 border-t border-border-soft">
                    <span className="text-[11px] font-bold text-muted uppercase tracking-wider block mb-2">
                      Key Terminology & Tags:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {section.importantTerms.map((term, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2.5 py-1 text-[11px] bg-surface-3 border border-border rounded-lg text-primary font-medium"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Catalog View
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Technical Study Notes</h1>
        <p className="text-secondary">Concise revision guides for Core CS, System Design, and Cloud Architecture with quick flashcards and bookmarks.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {notesContent.map(note => (
          <div 
            key={note.id} 
            onClick={() => setSelectedNoteId(note.id)}
            className="card p-6 cursor-pointer hover:border-purple-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="bg-surface-3/60 border border-border-soft rounded-2xl p-6 mb-4 aspect-square flex items-center justify-center group-hover:scale-[1.02] transition-transform shadow-inner">
                <div className="text-5xl">{note.icon}</div>
              </div>
              <h3 className="font-bold text-base mb-1 group-hover:text-purple-1 transition-colors">{note.title}</h3>
              <p className="text-xs text-muted">{note.sections.length} In-Depth Modules</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border mt-4 text-xs">
              <span className="text-muted font-medium">Click to study</span>
              <span className="text-purple-1 font-bold">Open Notes →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

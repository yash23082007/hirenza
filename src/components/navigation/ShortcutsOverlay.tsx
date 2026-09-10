"use client";

import { useEffect, useState } from "react";
import { Keyboard, X } from "lucide-react";

interface ShortcutItem {
  keys: string[];
  description: string;
  context: string;
}

const SHORTCUTS: ShortcutItem[] = [
  { keys: ["⌘", "K"], description: "Open global fuzzy search palette", context: "Everywhere" },
  { keys: ["?"], description: "Open keyboard shortcuts cheat sheet", context: "Everywhere" },
  { keys: ["Esc"], description: "Close modal / dismiss active overlay", context: "Everywhere" },
  { keys: ["Space"], description: "Flip active flashcard to reveal answer", context: "Flashcards" },
  { keys: ["1"], description: "Grade card as 'Again' (short interval)", context: "Flashcards" },
  { keys: ["2"], description: "Grade card as 'Hard' (medium interval)", context: "Flashcards" },
  { keys: ["3"], description: "Grade card as 'Easy' (mastered)", context: "Flashcards" },
  { keys: ["←", "→"], description: "Navigate previous / next flashcard", context: "Flashcards" },
];

export function ShortcutsOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard Shortcuts"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border border-border bg-surface-1 p-6 md:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-1/10 flex items-center justify-center text-purple-1">
              <Keyboard size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary">Keyboard Shortcuts</h3>
              <p className="text-xs text-muted font-mono">Press ? anytime to toggle this view</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface-3 transition-colors"
            aria-label="Close shortcuts dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-2.5">
          {SHORTCUTS.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-surface-2/60 border border-border text-xs"
            >
              <div className="space-y-0.5">
                <span className="text-primary font-medium">{item.description}</span>
                <span className="text-[10px] text-muted font-mono block">{item.context}</span>
              </div>

              <div className="flex items-center gap-1">
                {item.keys.map((k) => (
                  <kbd
                    key={k}
                    className="px-2 py-1 rounded bg-surface-3 border border-border text-xs font-mono font-bold text-secondary shadow-sm"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-border text-center text-xs text-muted font-mono">
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}

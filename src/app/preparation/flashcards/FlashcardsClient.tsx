"use client";

import { useState, useEffect, useCallback } from "react";
import { interviewQuestionsData } from "@/data/interviewQuestions";
import { hrQuestionsData } from "@/data/hrQuestions";
import {
  Layers,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Keyboard,
  Sparkles,
  Trophy,
} from "lucide-react";

interface Flashcard {
  id: string;
  front: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  back: string;
  deck: string;
}

type Grade = "again" | "hard" | "easy";

export function FlashcardsClient() {
  const [selectedDeck, setSelectedDeck] = useState<string>("react");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [grades, setGrades] = useState<Record<string, Grade>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem("hirenza-flashcard-grades");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [sessionCount, setSessionCount] = useState(0);

  // Build deck cards
  const getDeckCards = useCallback((): Flashcard[] => {
    if (selectedDeck === "hr") {
      return hrQuestionsData.map((q) => ({
        id: q.id,
        front: q.question,
        category: q.category,
        difficulty: q.difficulty,
        back: q.tips || "Structure your answer using Situation, Task, Action, and Result (STAR). Emphasize personal ownership and tangible outcomes.",
        deck: "HR Behavioral",
      }));
    }

    const techList = interviewQuestionsData[selectedDeck] || [];
    return techList.map((q) => ({
      id: `flash-${selectedDeck}-${q.id}`,
      front: q.question,
      category: q.category,
      difficulty: q.difficulty,
      back: `Core Concept: ${q.category}. Explain technical definition, real-world engineering trade-offs, and failure edge cases.`,
      deck: selectedDeck.toUpperCase(),
    }));
  }, [selectedDeck]);

  const cards = getDeckCards();
  const currentCard = cards[currentIndex] || cards[0];

  const handleGrade = useCallback(
    (grade: Grade) => {
      if (!currentCard) return;

      const newGrades = { ...grades, [currentCard.id]: grade };
      setGrades(newGrades);
      localStorage.setItem("hirenza-flashcard-grades", JSON.stringify(newGrades));
      setSessionCount((prev) => prev + 1);

      // Advance to next card
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
      }, 150);
    },
    [currentCard, grades, cards.length]
  );

  // Keyboard controls: Space to flip, 1: Again, 2: Hard, 3: Easy, Arrows: prev/next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is inside an input or textarea
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((f) => !f);
      } else if (e.key === "1") {
        e.preventDefault();
        handleGrade("again");
      } else if (e.key === "2") {
        e.preventDefault();
        handleGrade("hard");
      } else if (e.key === "3") {
        e.preventDefault();
        handleGrade("easy");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setIsFlipped(false);
        setCurrentIndex((i) => (i + 1) % cards.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIsFlipped(false);
        setCurrentIndex((i) => (i - 1 + cards.length) % cards.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGrade, cards.length]);

  const deckOptions = [
    { id: "react", label: "React Architecture", count: interviewQuestionsData["react"]?.length || 15 },
    { id: "javascript", label: "JavaScript Core", count: interviewQuestionsData["javascript"]?.length || 15 },
    { id: "node", label: "Node.js Backend", count: interviewQuestionsData["node"]?.length || 10 },
    { id: "python", label: "Python Essentials", count: interviewQuestionsData["python"]?.length || 10 },
    { id: "hr", label: "HR Behavioral (STAR)", count: hrQuestionsData.length },
  ];

  const currentGrade = currentCard ? grades[currentCard.id] : undefined;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-1/10 border border-purple-1/30 text-purple-1 text-xs font-mono mb-2">
            <Layers size={12} />
            <span>Spaced Recall Mode</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
            Interview Flashcards
          </h1>
          <p className="text-sm text-secondary mt-1">
            Active recall with Leitner interval self-grading. Spacebar flips, keys 1-3 grade.
          </p>
        </div>

        {/* Session Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-border">
            <Trophy className="w-4 h-4 text-purple-1" />
            <span className="text-xs font-mono text-secondary">
              Session: <strong className="text-primary font-bold">{sessionCount}</strong> reviewed
            </span>
          </div>
        </div>
      </div>

      {/* Deck Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {deckOptions.map((deck) => (
          <button
            key={deck.id}
            onClick={() => {
              setSelectedDeck(deck.id);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap border transition-all ${
              selectedDeck === deck.id
                ? "bg-purple-1 text-white border-purple-1 shadow-md"
                : "bg-surface-2 border-border text-secondary hover:border-border-hover"
            }`}
          >
            <span>{deck.label}</span>
            <span className="ml-1.5 opacity-60">({deck.count})</span>
          </button>
        ))}
      </div>

      {/* Flashcard Container */}
      <div className="relative min-h-[340px] flex flex-col justify-between rounded-3xl border border-border bg-gradient-to-b from-surface-1 to-surface-2 p-8 shadow-xl transition-all">
        {/* Card Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-muted uppercase">
              Card {currentIndex + 1} of {cards.length}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-surface-3 text-secondary border border-border">
              {currentCard?.category}
            </span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                currentCard?.difficulty === "Easy"
                  ? "text-emerald-400 bg-emerald-500/10"
                  : currentCard?.difficulty === "Medium"
                  ? "text-amber-400 bg-amber-500/10"
                  : "text-rose-400 bg-rose-500/10"
              }`}
            >
              {currentCard?.difficulty}
            </span>
          </div>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-3 border border-border text-xs font-mono text-secondary hover:text-primary transition-colors"
          >
            <RotateCw size={12} className={isFlipped ? "rotate-180 transition-transform" : ""} />
            <span>{isFlipped ? "Show Question" : "Flip (Space)"}</span>
          </button>
        </div>

        {/* Card Body */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="my-10 cursor-pointer text-center select-none"
        >
          {!isFlipped ? (
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary max-w-2xl mx-auto leading-relaxed">
                {currentCard?.front}
              </h2>
              <p className="text-xs text-muted font-mono flex items-center justify-center gap-1">
                <span>Click card or press Space to reveal key points</span>
              </p>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <Sparkles size={12} />
                <span>Talking Points & Key Answer</span>
              </div>
              <p className="text-lg md:text-xl text-primary font-medium max-w-2xl mx-auto leading-relaxed">
                {currentCard?.back}
              </p>
            </div>
          )}
        </div>

        {/* Card Footer: Navigation & Self-Grading */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          {/* Card Prev/Next buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentIndex((i) => (i - 1 + cards.length) % cards.length);
              }}
              className="p-2 rounded-xl bg-surface-3 border border-border text-secondary hover:text-primary transition-colors"
              aria-label="Previous card"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentIndex((i) => (i + 1) % cards.length);
              }}
              className="p-2 rounded-xl bg-surface-3 border border-border text-secondary hover:text-primary transition-colors"
              aria-label="Next card"
            >
              <ChevronRight size={16} />
            </button>
            {currentGrade && (
              <span className="text-xs font-mono text-muted ml-2 capitalize">
                Last graded: <strong className="text-primary">{currentGrade}</strong>
              </span>
            )}
          </div>

          {/* Grading Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleGrade("again")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-mono font-bold transition-all"
            >
              <AlertCircle size={14} />
              <span>[1] Again</span>
            </button>

            <button
              onClick={() => handleGrade("hard")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-mono font-bold transition-all"
            >
              <HelpCircle size={14} />
              <span>[2] Hard</span>
            </button>

            <button
              onClick={() => handleGrade("easy")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono font-bold transition-all"
            >
              <CheckCircle2 size={14} />
              <span>[3] Easy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Helper */}
      <div className="flex items-center justify-center gap-6 text-xs text-muted font-mono flex-wrap">
        <span className="flex items-center gap-1.5">
          <Keyboard size={13} />
          <span>Space: Flip</span>
        </span>
        <span>1: Again</span>
        <span>2: Hard</span>
        <span>3: Easy</span>
        <span>← / →: Navigate</span>
      </div>
    </div>
  );
}

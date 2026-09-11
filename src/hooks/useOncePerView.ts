"use client";

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

/**
 * A hook that starts an animation only when the element scrolls into view,
 * plays it once, then stops. Respects `prefers-reduced-motion`.
 *
 * @param totalSteps  Number of animation steps in one full cycle
 * @param intervalMs  Delay between each step
 * @returns { ref, currentStep, isAnimating, prefersReducedMotion }
 */
export function useOncePerView(totalSteps: number, intervalMs: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // IntersectionObserver: trigger animation when element enters viewport
  const startAnimation = useCallback(() => {
    if (hasAnimated || prefersReducedMotion) return;
    setIsAnimating(true);
    setHasAnimated(true);
  }, [hasAnimated, prefersReducedMotion]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startAnimation]);

  // Step through animation, then stop after one full cycle
  useEffect(() => {
    if (!isAnimating || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev + 1;
        if (next >= totalSteps) {
          setIsAnimating(false);
          return prev; // Stay at final state
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isAnimating, totalSteps, intervalMs, prefersReducedMotion]);

  return { ref, currentStep, isAnimating, prefersReducedMotion };
}

/**
 * Variant for typewriter-style animations (character by character typing + deletion).
 * Runs through all words once, ending on the last one fully typed.
 */
export function useOncePerViewTypewriter(words: readonly string[], charDelayMs: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const startAnimation = useCallback(() => {
    if (hasAnimated || prefersReducedMotion) return;
    setIsAnimating(true);
    setHasAnimated(true);
  }, [hasAnimated, prefersReducedMotion]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startAnimation]);

  useEffect(() => {
    if (!isAnimating || prefersReducedMotion) return;

    let currentWordIdx = 0;
    let currentChar = 0;
    let isDeleting = false;

    const timer = setInterval(() => {
      const target = words[currentWordIdx];

      if (!isDeleting) {
        if (currentChar < target.length) {
          currentChar++;
          setCharCount(currentChar);
        } else {
          // If last word, stop animation — keep it displayed
          if (currentWordIdx >= words.length - 1) {
            setIsAnimating(false);
            clearInterval(timer);
            return;
          }
          isDeleting = true;
        }
      } else {
        if (currentChar > 0) {
          currentChar--;
          setCharCount(currentChar);
        } else {
          isDeleting = false;
          currentWordIdx++;
          setWordIndex(currentWordIdx);
        }
      }
    }, charDelayMs);

    return () => clearInterval(timer);
  }, [isAnimating, words, charDelayMs, prefersReducedMotion]);

  const displayedText = prefersReducedMotion
    ? (words[0] || "")
    : (words[wordIndex]?.slice(0, charCount) || "");

  return { ref, wordIndex, displayedText, isAnimating, prefersReducedMotion };
}

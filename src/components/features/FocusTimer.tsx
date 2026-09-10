"use client";

import { useState, useEffect, useRef } from "react";
import { Clock, Play, Pause, RotateCcw, CheckCircle2 } from "lucide-react";

interface FocusTimerProps {
  onSessionComplete?: (durationMinutes: number) => void;
  className?: string;
}

export function FocusTimer({ onSessionComplete, className = "" }: FocusTimerProps) {
  const [mode, setMode] = useState<25 | 50 | 5>(25);
  const [isRunning, setIsRunning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  
  // Timestamp-based tracking to survive background tab throttling
  const targetTimeRef = useRef<number | null>(null);

  const startTimer = (durationMinutes: 25 | 50 | 5) => {
    setMode(durationMinutes);
    const totalSec = durationMinutes * 60;
    setRemainingSeconds(totalSec);
    targetTimeRef.current = Date.now() + totalSec * 1000;
    setIsRunning(true);
    setSessionCompleted(false);
  };

  const togglePause = () => {
    if (isRunning) {
      // Pause: calculate remaining seconds
      if (targetTimeRef.current) {
        const diff = Math.max(0, Math.round((targetTimeRef.current - Date.now()) / 1000));
        setRemainingSeconds(diff);
      }
      setIsRunning(false);
      targetTimeRef.current = null;
    } else {
      // Resume
      targetTimeRef.current = Date.now() + remainingSeconds * 1000;
      setIsRunning(true);
      setSessionCompleted(false);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    targetTimeRef.current = null;
    setRemainingSeconds(mode * 60);
    setSessionCompleted(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (!targetTimeRef.current) return;
      const secondsLeft = Math.round((targetTimeRef.current - Date.now()) / 1000);

      if (secondsLeft <= 0) {
        setRemainingSeconds(0);
        setIsRunning(false);
        setSessionCompleted(true);
        targetTimeRef.current = null;
        if (onSessionComplete) onSessionComplete(mode);
        clearInterval(interval);
      } else {
        setRemainingSeconds(secondsLeft);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isRunning, mode, onSessionComplete]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const progressPercent = Math.round(((mode * 60 - remainingSeconds) / (mode * 60)) * 100);

  return (
    <div
      className={`rounded-2xl border border-border bg-surface-2/80 backdrop-blur-sm p-4 shadow-lg transition-all ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: Mode Buttons & Icon */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-1/10 border border-purple-1/30 flex items-center justify-center text-purple-1 flex-shrink-0">
            <Clock size={18} />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
                Focus Session
              </span>
              {isRunning && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </div>

            <div className="flex items-center gap-1.5 mt-1">
              <button
                onClick={() => startTimer(25)}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                  mode === 25
                    ? "bg-purple-1 text-white"
                    : "bg-surface-3 text-secondary hover:text-primary"
                }`}
              >
                25m
              </button>
              <button
                onClick={() => startTimer(50)}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                  mode === 50
                    ? "bg-purple-1 text-white"
                    : "bg-surface-3 text-secondary hover:text-primary"
                }`}
              >
                50m
              </button>
              <button
                onClick={() => startTimer(5)}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                  mode === 5
                    ? "bg-emerald-500 text-white"
                    : "bg-surface-3 text-secondary hover:text-primary"
                }`}
              >
                5m Break
              </button>
            </div>
          </div>
        </div>

        {/* Center: Clock Display & Progress Bar */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <span className="text-2xl md:text-3xl font-mono font-black tracking-tight text-primary">
              {formattedTime}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={togglePause}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-purple-1 text-white text-xs font-mono font-bold hover:opacity-90 transition-opacity"
            >
              {isRunning ? <Pause size={13} /> : <Play size={13} />}
              <span>{isRunning ? "Pause" : "Start"}</span>
            </button>

            <button
              onClick={resetTimer}
              className="p-1.5 rounded-xl bg-surface-3 border border-border text-secondary hover:text-primary transition-colors"
              aria-label="Reset timer"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-surface-3 h-1 rounded-full overflow-hidden mt-3">
        <div
          className="bg-purple-1 h-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {sessionCompleted && (
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mt-2.5 animate-in fade-in">
          <CheckCircle2 size={14} />
          <span>Session complete! Great focus run. Take a 5m break or start another round.</span>
        </div>
      )}
    </div>
  );
}

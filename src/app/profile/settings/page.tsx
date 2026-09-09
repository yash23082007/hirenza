"use client";

import { useState } from "react";
import { Check, RotateCcw, Trash2 } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const storagePrefixes = ["hirenza-questions-state:"];

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [saved, setSaved] = useState(false);
  const [cleared, setCleared] = useState(false);

  const clearProgress = () => {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key && storagePrefixes.some(prefix => key.startsWith(prefix))) {
        localStorage.removeItem(key);
      }
    }
    setCleared(true);
    window.setTimeout(() => setCleared(false), 2500);
  };

  const resetLayout = () => {
    localStorage.removeItem("hirenza-sidebar-collapsed");
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-secondary">Control your workspace preferences and local preparation data.</p>
      </div>

      <div className="space-y-4">
        <section className="bg-surface-2 border border-border rounded-2xl p-6">
          <h2 className="font-semibold mb-1">Appearance</h2>
          <p className="text-sm text-secondary mb-5">Choose the theme used across Hirenza.</p>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-xl border border-border bg-surface-1 px-4 py-3 text-left hover:bg-surface-hover transition-colors"
            aria-pressed={theme === "light"}
          >
            <span className="text-sm font-medium">Light theme</span>
            <span className={`relative h-6 w-11 rounded-full transition-colors ${theme === "light" ? "bg-purple-1" : "bg-surface-3"}`}>
              <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${theme === "light" ? "translate-x-6" : "translate-x-1"}`} />
            </span>
          </button>
        </section>

        <section className="bg-surface-2 border border-border rounded-2xl p-6">
          <h2 className="font-semibold mb-1">Workspace</h2>
          <p className="text-sm text-secondary mb-5">Reset the saved sidebar layout on this device.</p>
          <button type="button" onClick={resetLayout} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface-hover transition-colors">
            {saved ? <Check size={15} /> : <RotateCcw size={15} />}
            {saved ? "Layout reset" : "Reset sidebar layout"}
          </button>
        </section>

        <section className="bg-surface-2 border border-red-500/20 rounded-2xl p-6">
          <h2 className="font-semibold mb-1">Local data</h2>
          <p className="text-sm text-secondary mb-5">Remove completed and bookmarked question state stored in this browser.</p>
          <button type="button" onClick={clearProgress} className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
            {cleared ? <Check size={15} /> : <Trash2 size={15} />}
            {cleared ? "Progress cleared" : "Clear progress data"}
          </button>
        </section>
      </div>
    </div>
  );
}

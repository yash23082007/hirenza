"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaRegistrar() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker in production or supporting browsers
    if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(reg => {
          console.debug("Hirenza ServiceWorker registered with scope:", reg.scope);
        })
        .catch(err => {
          console.debug("ServiceWorker registration omitted or failed:", err);
        });
    }

    // 2. Listen for PWA install opportunity
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Check if user previously dismissed
      const dismissed = localStorage.getItem("hirenza-pwa-dismissed");
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    setShowPrompt(false);
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("hirenza-pwa-dismissed", "true");
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm rounded-2xl bg-surface-1/95 backdrop-blur-md border border-purple-500/30 p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 shrink-0">
            <Download size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-primary">Install Hirenza App</h4>
            <p className="text-[11px] text-secondary mt-0.5 leading-snug">
              Access DSA sheets, flashcards, and timers offline without an active network connection.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="text-muted hover:text-primary transition-colors p-1"
          aria-label="Dismiss install prompt"
        >
          <X size={14} />
        </button>
      </div>

      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border-soft">
        <button
          type="button"
          onClick={handleInstallClick}
          className="flex-1 py-1.5 px-3 rounded-lg bg-purple-1 hover:bg-purple-2 text-white text-xs font-bold transition-colors text-center"
        >
          Install Offline App
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className="py-1.5 px-3 rounded-lg bg-surface-2 hover:bg-surface-3 text-muted hover:text-secondary text-xs font-medium transition-colors"
        >
          Later
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-surface-2 border border-border flex items-center justify-center text-2xl">
          ⚠️
        </div>
        <h2 className="text-2xl font-bold mb-3">Something went wrong</h2>
        <p className="text-secondary mb-8 text-sm leading-relaxed">
          An unexpected error occurred. This has been noted and we&apos;re working on it.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-purple-1 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <a
            href="/preparation"
            className="px-5 py-2.5 border border-border rounded-xl text-sm font-medium text-secondary hover:text-primary hover:border-purple-1/30 transition-all"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

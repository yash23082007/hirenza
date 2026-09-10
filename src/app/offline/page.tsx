import Link from "next/link";
import { WifiOff, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Offline Mode Active",
  description: "Hirenza operates offline-first. Your solves, revision queue, and sheets remain accessible without network connection.",
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background text-primary flex items-center justify-center p-6">
      <div className="max-w-md w-full card p-8 rounded-2xl bg-surface-1 border border-border text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
          <WifiOff size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-primary">Offline Mode Active</h1>
          <p className="text-xs text-secondary mt-2 leading-relaxed">
            No active network connection detected. Because Hirenza is built offline-first, your cached sheets, problem trackers, and bookmarks continue to function uninterrupted.
          </p>
        </div>

        <div className="bg-surface-2 p-4 rounded-xl border border-border-soft text-left space-y-2 text-xs text-muted">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 size={14} />
            <span className="font-medium">All progress writes to localStorage</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 size={14} />
            <span className="font-medium">Flashcards & Leitner intervals work offline</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 size={14} />
            <span className="font-medium">Zero server sync required to solve problems</span>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/preparation"
            className="cta-button inline-flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold"
          >
            <BookOpen size={14} />
            <span>Return to Cockpit</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

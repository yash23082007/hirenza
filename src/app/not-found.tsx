import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-7xl font-extrabold text-brand-gradient mb-4">404</div>
        <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
        <p className="text-secondary mb-8 text-sm leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/preparation"
            className="px-5 py-2.5 bg-purple-1 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 border border-border rounded-xl text-sm font-medium text-secondary hover:text-primary hover:border-purple-1/30 transition-all"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

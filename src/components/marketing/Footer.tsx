"use client";

import Link from "next/link";
import { HirenzaLogo } from "../ui/HirenzaLogo";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-16 mt-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-primary font-extrabold text-xl mb-4">
              <HirenzaLogo size={24} />
              <span>hirenza</span>
            </Link>
            <p className="text-sm text-secondary leading-relaxed mb-4">
              The open-source, offline-first interview preparation workspace for engineers. No paywalls, no tracking.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://github.com/yash23082007/hirenza"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-surface-2 border border-border text-secondary hover:text-primary transition-colors"
                aria-label="GitHub Repository"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com/in/yash-vijay-b4369a285"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-surface-2 border border-border text-secondary hover:text-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.96 0-1.74.78-1.74 1.74 0 .96.78 1.74 1.74 1.74.96 0 1.74-.78 1.74-1.74 0-.96-.78-1.74-1.74-1.74Z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4 font-mono">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/preparation" className="text-sm text-secondary hover:text-primary transition-colors">Preparation Hub</Link></li>
              <li><Link href="/preparation/dsa-sheets" className="text-sm text-secondary hover:text-primary transition-colors">DSA Sheets</Link></li>
              <li><Link href="/preparation/company-wise-dsa" className="text-sm text-secondary hover:text-primary transition-colors">Company Tracks</Link></li>
              <li><Link href="/preparation/20-patterns" className="text-sm text-secondary hover:text-primary transition-colors">Algorithmic Patterns</Link></li>
              <li><Link href="/preparation/sql-sheet" className="text-sm text-secondary hover:text-primary transition-colors">SQL Query Bank</Link></li>
              <li><Link href="/preparation/system-design" className="text-sm text-secondary hover:text-primary transition-colors">System Design</Link></li>
            </ul>
          </div>

          {/* Resources & Open Source */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4 font-mono">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/changelog" className="text-sm text-secondary hover:text-primary transition-colors">Changelog</Link></li>
              <li><Link href="/roadmap" className="text-sm text-secondary hover:text-primary transition-colors">Roadmap 2026</Link></li>
              <li><Link href="/preparation/role-wise" className="text-sm text-secondary hover:text-primary transition-colors">Role Blueprints</Link></li>
              <li><Link href="/preparation/cool-notes" className="text-sm text-secondary hover:text-primary transition-colors">Engineering Notes</Link></li>
              <li><Link href="/preparation/cold-email-templates" className="text-sm text-secondary hover:text-primary transition-colors">Outreach Formulas</Link></li>
              <li>
                <Link
                  href="https://github.com/yash23082007/hirenza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-1 hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Contribute Code</span>
                  <ArrowUpRight size={13} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Project & Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4 font-mono">Project</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-secondary hover:text-primary transition-colors">About Hirenza</Link></li>
              <li><Link href="/community" className="text-sm text-secondary hover:text-primary transition-colors">Community Discussions</Link></li>
              <li><Link href="/contact" className="text-sm text-secondary hover:text-primary transition-colors">Contact Maintainer</Link></li>
              <li><Link href="/privacy" className="text-sm text-secondary hover:text-primary transition-colors">Privacy Architecture</Link></li>
              <li><Link href="/terms" className="text-sm text-secondary hover:text-primary transition-colors">Open Source Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs text-muted font-mono">
            © 2026 Hirenza. Free & open source under MIT License.
          </span>
          <span className="text-xs text-muted">
            Crafted for engineers by Yash Vijay & community contributors
          </span>
        </div>
      </div>
    </footer>
  );
}

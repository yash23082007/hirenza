"use client";

import Link from "next/link";
import { HirenzaLogo } from "../ui/HirenzaLogo";

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
            <p className="text-sm text-secondary leading-relaxed">
              Your unfair advantage for tech interviews. Everything you need in one focused workspace.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/preparation" className="text-sm text-secondary hover:text-primary transition-colors">Preparation</Link></li>
              <li><Link href="/preparation/dsa-sheets" className="text-sm text-secondary hover:text-primary transition-colors">DSA Sheets</Link></li>
              <li><Link href="/preparation/company-wise-dsa" className="text-sm text-secondary hover:text-primary transition-colors">Company Wise</Link></li>
              <li><Link href="/preparation/sql-sheet" className="text-sm text-secondary hover:text-primary transition-colors">SQL Sheet</Link></li>
              <li><Link href="/preparation/system-design" className="text-sm text-secondary hover:text-primary transition-colors">System Design</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/preparation/role-wise" className="text-sm text-secondary hover:text-primary transition-colors">Role Wise</Link></li>
              <li><Link href="/preparation/most-asked-questions" className="text-sm text-secondary hover:text-primary transition-colors">Interview Questions</Link></li>
              <li><Link href="/preparation/cool-notes" className="text-sm text-secondary hover:text-primary transition-colors">Notes</Link></li>
              <li><Link href="/preparation/cold-email-templates" className="text-sm text-secondary hover:text-primary transition-colors">Email Templates</Link></li>
              <li><Link href="/preparation/resume-templates" className="text-sm text-secondary hover:text-primary transition-colors">Resume Templates</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/community" className="text-sm text-secondary hover:text-primary transition-colors">Community</Link></li>
              <li><Link href="/about" className="text-sm text-secondary hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-secondary hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-secondary hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-secondary hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm text-muted">© 2026 Hirenza. All rights reserved.</span>
          <span className="text-sm text-muted">Made with ❤️ for the developer community</span>
        </div>
      </div>
    </footer>
  );
}

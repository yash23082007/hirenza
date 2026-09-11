"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HirenzaLogo } from "../ui/HirenzaLogo";
import { useTheme } from "@/hooks/useTheme";
import { Menu, X, User, Search } from "lucide-react";

export function MarketingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        scrolled ? "top-4 w-[calc(100%_-_2rem)] md:w-[800px]" : "top-6 w-[calc(100%_-_2rem)] md:w-[900px]"
      }`}
      style={{ animation: "navbarEnter 0.8s cubic-bezier(0.22,1,0.36,1) forwards" }}
    >
      <div className="nav-pill px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between shadow-2xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-primary font-extrabold text-lg tracking-tight">
          <HirenzaLogo size={24} />
          <span>hirenza</span>
        </Link>

        {/* Center Nav - Desktop */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/preparation" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
            Preparation
          </Link>
          <Link href="/community" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
            Community
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-surface-3 border border-border text-secondary hover:text-primary hover:border-purple-1/50 transition-colors"
            aria-label="Search"
          >
            <Search size={16} />
          </button>
          <button
            onClick={toggleTheme}
            className="theme-toggle scale-90 origin-right"
            aria-label="Toggle theme"
          />
          <Link
            href="/profile"
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-surface-3 border border-border text-secondary hover:text-primary hover:border-purple-1/50 transition-colors"
            aria-label="Profile"
          >
            <User size={16} />
          </Link>
          <Link
            href="/preparation"
            className="cta-button text-xs px-4 py-1.5 hidden sm:inline-flex items-center font-semibold"
          >
            Get Started
          </Link>
          <button
            className="md:hidden p-1.5 text-secondary hover:text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden nav-pill mt-2 mx-2 p-4 flex flex-col gap-4">
          <Link href="/" className="text-sm font-medium text-secondary hover:text-primary" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link href="/preparation" className="text-sm font-medium text-secondary hover:text-primary" onClick={() => setMobileOpen(false)}>
            Preparation
          </Link>
          <Link href="/community" className="text-sm font-medium text-secondary hover:text-primary" onClick={() => setMobileOpen(false)}>
            Community
          </Link>
          <Link
            href="/preparation"
            className="inline-flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-full text-sm font-semibold w-fit"
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}

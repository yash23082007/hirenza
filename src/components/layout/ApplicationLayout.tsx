"use client";

import { Suspense, useEffect, useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ShortcutsOverlay } from "@/components/navigation/ShortcutsOverlay";
import { Menu } from "lucide-react";
import { ReactNode } from "react";

export function ApplicationLayout({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSidebarCollapsed(localStorage.getItem("hirenza-sidebar-collapsed") === "true");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleSidebar = () => {
    const next = !sidebarCollapsed;
    setSidebarCollapsed(next);
    localStorage.setItem("hirenza-sidebar-collapsed", String(next));
  };

  return (
    <div className="min-h-screen bg-background text-primary">
      <Suspense fallback={<aside className="w-[285px] border-r border-border hidden md:block" />}>
        <Sidebar
          collapsed={sidebarCollapsed}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />
      </Suspense>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "md:ml-[72px]" : "md:ml-[285px]"
        }`}
      >
        <TopBar onToggleSidebar={toggleSidebar} />

        {/* Mobile floating menu button (right-handed thumb zone) */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-40 w-13 h-13 rounded-full bg-purple-1 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <main className="w-full min-w-0 max-w-[1350px] p-4 sm:p-6 md:p-10">
          <Breadcrumbs />
          {children}
          <ShortcutsOverlay />
        </main>
      </div>
    </div>
  );
}

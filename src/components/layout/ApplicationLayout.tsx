"use client";

import { Suspense, useEffect, useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
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
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
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

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-purple-1 text-white flex items-center justify-center shadow-lg"
          aria-label="Open menu"
        >
          ☰
        </button>

        <main className="w-full min-w-0 max-w-[1350px] p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}

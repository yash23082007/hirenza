"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HirenzaLogo } from "../ui/HirenzaLogo";
import { dsaSheets } from "@/data/dsaSheets";
import {
  LayoutDashboard,
  BookOpen,
  Building2,
  Fingerprint,
  BadgeDollarSign,
  Database,
  Network,
  PlaySquare,
  Brain,
  GraduationCap,
  Users,
  Mail,
  Notebook,
  FileText,
  ChevronRight,
  Code2,
  X,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: { label: string; href: string }[];
}

const sheetsItems: NavItem[] = [
  {
    label: "DSA Sheets",
    icon: <BookOpen size={16} />,
    children: dsaSheets.map(sheet => ({
      label: sheet.name,
      href: `/preparation/dsa-sheets/${sheet.id}`,
    })),
  },
  { label: "Company Wise DSA", href: "/preparation/company-wise-dsa", icon: <Building2 size={16} /> },
  { label: "20 DSA Patterns", href: "/preparation/20-patterns", icon: <Fingerprint size={16} /> },
  { label: "Package Wise DSA", href: "/preparation/package-wise-dsa", icon: <BadgeDollarSign size={16} /> },
  { label: "SQL Sheet", href: "/preparation/sql-sheet", icon: <Database size={16} /> },
  { label: "System Design Sheet", href: "/preparation/system-design", icon: <Network size={16} /> },
];

const learningItems: NavItem[] = [
  {
    label: "DSA Playlists",
    icon: <PlaySquare size={16} />,
    children: [
      { label: "Love Babbar Playlist", href: "/preparation/dsa-playlists?playlist=lovebabbar" },
      { label: "Shradha Khapra Playlist", href: "/preparation/dsa-playlists?playlist=shradha" },
      { label: "Rohit Negi Playlist", href: "/preparation/dsa-playlists?playlist=rohit" },
    ],
  },
  {
    label: "Core Subjects",
    icon: <Brain size={16} />,
    children: [
      { label: "DBMS", href: "/preparation/core-subjects?subject=dbms" },
      { label: "Operating Systems", href: "/preparation/core-subjects?subject=os" },
      { label: "Computer Networks", href: "/preparation/core-subjects?subject=cn" },
      { label: "OOP", href: "/preparation/core-subjects?subject=oop" },
    ],
  },
  {
    label: "System Design Playlists",
    icon: <GraduationCap size={16} />,
    children: [
      { label: "HLD Fundamentals", href: "/preparation/system-design-playlists?playlist=hld" },
      { label: "LLD Fundamentals", href: "/preparation/system-design-playlists?playlist=lld" },
      { label: "Distributed Systems", href: "/preparation/system-design-playlists?playlist=distributed" },
    ],
  },
];

const resourceItems: NavItem[] = [
  { label: "Role Wise", href: "/preparation/role-wise", icon: <Users size={16} /> },
  { label: "Interview Questions", href: "/preparation/most-asked-questions", icon: <Code2 size={16} /> },
  { label: "Interview Experiences", href: "/preparation/interview-experiences", icon: <FileText size={16} /> },
  { label: "HR Questions", href: "/preparation/hr-questions", icon: <FileText size={16} /> },
  { label: "Coding Practice", href: "/preparation/coding-practice", icon: <Code2 size={16} /> },
  { label: "Cold Email Templates", href: "/preparation/cold-email-templates", icon: <Mail size={16} /> },
  { label: "Cool Notes", href: "/preparation/cool-notes", icon: <Notebook size={16} /> },
  { label: "Resume Guide", href: "/preparation/resume-templates", icon: <FileText size={16} /> },
];

export function Sidebar({ collapsed, mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseMobile();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, onCloseMobile]);

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    // Check if href has query params
    if (href.includes('?')) {
      const [path, queryString] = href.split('?');
      const targetParams = new URLSearchParams(queryString);
      
      // Check if current pathname matches
      if (pathname !== path) return false;
      
      // Check if all query params match
      for (const [key, value] of targetParams.entries()) {
        if (searchParams?.get(key) !== value) return false;
      }
      return true;
    }
    return pathname === href;
  };

  const isChildActive = (children?: { href: string }[]) =>
    children?.some(c => isActive(c.href));

  const renderNavItem = (item: NavItem, groupLabel: string) => {
    const hasChildren = item.children && item.children.length > 0;
    const expanded = expandedGroups[`${groupLabel}-${item.label}`] ?? Boolean(isChildActive(item.children));
    const active = isActive(item.href);

    return (
      <div key={item.label} title={collapsed ? item.label : undefined}>
        <div
          className={`sidebar-item ${active ? "active" : ""} ${collapsed ? "justify-center px-0" : ""}`}
          onClick={() => {
            if (hasChildren) {
              toggleGroup(`${groupLabel}-${item.label}`);
            }
          }}
          {...(hasChildren ? {
            role: "button",
            tabIndex: 0,
            "aria-expanded": expanded,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleGroup(`${groupLabel}-${item.label}`);
              }
            }
          } : {})}
        >
          <span className="text-muted shrink-0">{item.icon}</span>
          {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
          {!collapsed && hasChildren && (
            <ChevronRight
              size={14}
              className={`text-muted transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
            />
          )}
          {item.href && !hasChildren && (
            <Link href={item.href} className="absolute inset-0" onClick={onCloseMobile} aria-label={item.label} />
          )}
        </div>

        {/* Children */}
        {hasChildren && !collapsed && (
          <div
            className="overflow-hidden transition-all duration-200"
            style={{ maxHeight: expanded ? "500px" : "0" }}
          >
            <div className="ml-6 mt-1 space-y-0.5 border-l border-border-soft pl-3">
              {item.children!.map(child => (
                <Link
                  key={child.href + child.label}
                  href={child.href}
                  onClick={onCloseMobile}
                  className={`block px-3 py-1.5 rounded text-xs transition-colors ${
                    isActive(child.href)
                      ? "text-purple-1 font-medium"
                      : "text-muted hover:text-secondary"
                  }`}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-[72px] flex items-center px-4 border-b border-border-soft shrink-0">
        <Link href="/" className="flex items-center gap-2 text-primary font-extrabold text-lg">
          <HirenzaLogo size={24} />
          {!collapsed && <span>hirenza</span>}
        </Link>
        {mobileOpen && (
          <button onClick={onCloseMobile} className="ml-auto p-1 text-muted hover:text-primary">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-3 px-3 custom-scrollbar">
        {/* Dashboard */}
        <div className="mb-4">
          <Link
            href="/preparation"
            onClick={onCloseMobile}
            className={`sidebar-item ${pathname === "/preparation" || pathname === "/preparation/" ? "active" : ""}`}
          >
            <LayoutDashboard size={16} className="text-muted" />
            {!collapsed && <span>Dashboard</span>}
          </Link>
        </div>

        {/* Sheets Group */}
        <div className="mb-4">
          {!collapsed && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted px-3 mb-2 block">
              Sheets
            </span>
          )}
          <div className="space-y-0.5">
            {sheetsItems.map(item => renderNavItem(item, "sheets"))}
          </div>
        </div>

        {/* Start Learning Group */}
        <div className="mb-4">
          {!collapsed && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted px-3 mb-2 block">
              Start Learning
            </span>
          )}
          <div className="space-y-0.5">
            {learningItems.map(item => renderNavItem(item, "learning"))}
          </div>
        </div>

        {/* Resources Group */}
        <div className="mb-4">
          {!collapsed && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted px-3 mb-2 block">
              Resources
            </span>
          )}
          <div className="space-y-0.5">
            {resourceItems.map(item => renderNavItem(item, "resources"))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block fixed left-0 top-0 bottom-0 bg-sidebar border-r border-border-soft z-40 transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-[285px]"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={onCloseMobile} />
          <aside className="absolute left-0 top-0 bottom-0 w-[300px] bg-sidebar border-r border-border-soft">
            {sidebarContent}
          </aside>
        </div>
      )}

    </>
  );
}

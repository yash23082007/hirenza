"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { RevealSection } from "./FeatureShowcase";

const faqCategories = [
  "All",
  "Features & Functionality",
  "Content & Resources",
  "Account",
  "Career Preparation",
  "Community",
  "Security",
];

const faqData = [
  { q: "What does Hirenza offer?", a: "Hirenza is a complete interview preparation workspace that brings together DSA sheets, company-wise questions, SQL practice, system design resources, study notes, cold email templates, and resume tools — all in one focused platform.", category: "Features & Functionality" },
  { q: "Is Hirenza free?", a: "Yes, Hirenza is completely free. All resources, sheets, and tools are available at no cost. We believe interview preparation should be accessible to everyone.", category: "Account" },
  { q: "Can I track my interview preparation?", a: "Yes. The dashboard includes activity tracking, streak calendars, skill analysis, and category breakdowns so you can monitor your consistency and progress over time.", category: "Features & Functionality" },
  { q: "Can I save and bookmark questions?", a: "Absolutely. You can bookmark any question across all sheets and resources. Bookmarked questions are easily accessible from your saved questions section.", category: "Features & Functionality" },
  { q: "Can I access notes directly?", a: "Yes. All study notes are available directly in the platform — no downloading or searching required. Browse concise summaries on key topics right in the app.", category: "Content & Resources" },
  { q: "How do I use the DSA sheets?", a: "Navigate to the DSA Sheets section, choose an educator's sheet, and start solving problems in order. Mark questions as completed, track progress, and use bookmarks for revision.", category: "Content & Resources" },
  { q: "Does Hirenza support different roles?", a: "Yes. We have role-wise preparation for 7 tech roles including Frontend, Backend, Fullstack, Mobile, DevOps, Data Science, AI/ML, and more — with skills, responsibilities, and interview focus areas for each.", category: "Career Preparation" },
  { q: "Can I switch between dark and light mode?", a: "Yes. Use the theme toggle in the navigation bar to switch between dark and light modes. Your preference is saved automatically.", category: "Features & Functionality" },
  { q: "Do you provide resume templates?", a: "Yes. We offer ATS-friendly resume templates with both Markdown and LaTeX formats, designed for different engineering roles. View sample content and access Overleaf links for each template.", category: "Career Preparation" },
  { q: "How can I contribute to Hirenza?", a: "You can contribute by joining our community, sharing interview experiences, suggesting resources, or contributing to open-source features. Visit the Community page to get started.", category: "Community" },
];

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const filtered = activeCategory === "All"
    ? faqData
    : faqData.filter(f => f.category === activeCategory);

  const toggle = (index: number) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <RevealSection className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="grid md:grid-cols-[240px_1fr] gap-8 md:gap-12">
          {/* Categories */}
          <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
            {faqCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-purple-1/10 text-purple-1 border border-purple-1/20"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <div
                key={i}
                className={`border border-border rounded-xl overflow-hidden transition-colors ${
                  openItems.has(i) ? "border-purple-1/30" : ""
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm md:text-base hover:text-purple-1 transition-colors"
                >
                  {faq.q}
                  <span className="text-muted ml-4 shrink-0">
                    {openItems.has(i) ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openItems.has(i) ? "200px" : "0" }}
                >
                  <p className="px-5 pb-4 text-sm text-secondary leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

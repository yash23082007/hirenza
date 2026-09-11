"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { RevealSection } from "./FeatureShowcase";
import { faqCategories, faqData } from "@/data/faq";

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map(item => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <RevealSection className="py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium mb-3">
            <span>Clarifications</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-secondary text-sm md:text-base mt-2 max-w-xl mx-auto">
            Everything you need to know about Hirenza’s client-side architecture, data sourcing, and preparation tools.
          </p>
        </div>

        {/* Category Pill Tabs (Centered per Hynts visual DNA) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {faqCategories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenItems(new Set([0]));
                }}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                  isActive
                    ? "bg-text-primary text-background font-semibold shadow-sm"
                    : "bg-surface-2 text-secondary hover:text-primary border border-border"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filtered.map((faq, i) => {
            const isOpen = openItems.has(i);
            return (
              <div
                key={faq.q}
                className={`border border-border rounded-xl overflow-hidden transition-colors bg-surface-2/60 ${
                  isOpen ? "border-purple-1/40 bg-surface-2" : "hover:border-border-soft"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-sm md:text-base hover:text-purple-1 transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <span className="text-muted shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-surface-3">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? "240px" : "0" }}
                >
                  <p className="px-6 pb-5 text-sm text-secondary leading-relaxed border-t border-border-soft/60 pt-3">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}

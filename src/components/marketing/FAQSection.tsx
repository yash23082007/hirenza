"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { RevealSection } from "./FeatureShowcase";
import { faqCategories, faqData } from "@/data/faq";

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

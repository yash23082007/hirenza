"use client";

import { useState } from "react";
import { systemDesignTopics, systemDesignCategories, type SystemDesignTopic } from "@/data";
import { ExternalLink, Network } from "lucide-react";

export default function SystemDesignSheetPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const filtered = selectedCategory === "all" 
    ? systemDesignTopics 
    : systemDesignTopics.filter(t => {
        const catMap: Record<string, SystemDesignTopic["category"]> = {
          hld: "HLD",
          lld: "LLD",
          distributed: "Distributed Systems",
          databases: "Databases",
          caching: "Caching",
          messaging: "Messaging",
          networking: "Networking",
          microservices: "Microservices",
        };
        return t.category === catMap[selectedCategory];
      });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">System Design Sheet</h1>
        <p className="text-secondary">Master system design with curated questions from ByteByteGo, System Design Primer, and Educative. Covers HLD, LLD, distributed systems, and more.</p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {systemDesignCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === cat.id
                ? "bg-purple-1/15 text-purple-1 border border-purple-1/30"
                : "bg-surface-2 text-secondary border border-border hover:border-purple-1/20"
            }`}
          >
            {cat.name}
            <span className="ml-2 opacity-60">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      <div className="space-y-4">
        {filtered.map(topic => (
          <div key={topic.id} className="card p-6 hover:border-purple-1/30 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-1/10 flex items-center justify-center shrink-0">
                  <Network size={18} className="text-purple-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{topic.title}</h3>
                  <p className="text-sm text-secondary mb-2">{topic.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-purple-1/10 text-purple-1 rounded-full">
                      {topic.category}
                    </span>
                  </div>
                </div>
              </div>
              {topic.referenceUrl && (
                <a
                  href={topic.referenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-purple-1 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>

            {/* Key Concepts */}
            <div>
              <p className="text-xs font-semibold text-muted mb-2">Key Concepts:</p>
              <div className="flex flex-wrap gap-2">
                {topic.keyConcepts.map((concept, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-surface-3 border border-border-soft rounded"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-secondary">
          <p>No topics in this category yet.</p>
        </div>
      )}
    </div>
  );
}

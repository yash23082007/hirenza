import type { Metadata } from "next";
import Link from "next/link";
import { MarketingNavbar } from "@/components/navigation/MarketingNavbar";
import { Footer } from "@/components/marketing/Footer";
import { Users, MessageSquare, Briefcase, ArrowRight, ExternalLink } from "lucide-react";
import { GiscusEmbed } from "@/components/community/GiscusEmbed";

export const metadata: Metadata = {
  title: "Community Discussions & Engineering Circles",
  description: "Connect with developers preparing for tech interviews. Discuss algorithmic patterns, system design blueprints, and interview experiences.",
};

export default function CommunityPage() {
  const discussionCategories = [
    {
      title: "Interview Debriefs & Experiences",
      desc: "Detailed round-by-round walkthroughs of technical and manager rounds at top tech companies.",
      href: "/preparation/interview-experiences",
      icon: <Briefcase size={20} className="text-purple-300" />,
      actionText: "Browse Experiences",
      isInternal: true,
    },
    {
      title: "Algorithmic Intuition & DSA Q&A",
      desc: "Discuss edge cases, optimal complexities, and dynamic programming state transitions with peers.",
      href: "https://github.com/yash23082007/hirenza/discussions",
      icon: <MessageSquare size={20} className="text-cyan-400" />,
      actionText: "Open Discussions",
      isInternal: false,
    },
    {
      title: "System Design Blueprint Reviews",
      desc: "Critique high-level architectures, cache eviction choices, and database sharding schemes.",
      href: "https://github.com/yash23082007/hirenza/discussions",
      icon: <Users size={20} className="text-emerald-400" />,
      actionText: "View Architecture Threads",
      isInternal: false,
    },
  ];

  return (
    <main className="min-h-screen bg-background text-primary">
      <MarketingNavbar />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 font-mono font-medium mb-4">
            Engineer-to-Engineer Network
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Peer Prep &{" "}
            <span className="text-brand-gradient">Community Discussions</span>
          </h1>
          <p className="text-base md:text-lg text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
            Collaborate on challenging algorithms, share verified onsite round debriefs, and solve interview hurdles together.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/preparation/interview-experiences"
              className="cta-button inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
            >
              <span>Explore Interview Debriefs</span>
              <ArrowRight size={15} />
            </Link>
            <a
              href="https://github.com/yash23082007/hirenza/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-2 border border-border text-sm font-medium hover:bg-surface-3 transition-colors text-secondary hover:text-primary"
            >
              <MessageSquare size={15} />
              <span>GitHub Discussions</span>
              <ExternalLink size={13} className="text-muted" />
            </a>
          </div>
        </div>
      </section>

      {/* Discussion Channels Grid */}
      <section className="py-16 px-6 border-t border-border bg-surface-1/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Active Discussion Hubs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {discussionCategories.map((cat, idx) => (
              <div
                key={idx}
                className="card p-6 rounded-2xl bg-surface-1 border border-border hover:border-purple-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center mb-4">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-primary">{cat.title}</h3>
                  <p className="text-xs text-secondary leading-relaxed mb-6">
                    {cat.desc}
                  </p>
                </div>

                {cat.isInternal ? (
                  <Link
                    href={cat.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <span>{cat.actionText}</span>
                    <ArrowRight size={13} />
                  </Link>
                ) : (
                  <a
                    href={cat.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <span>{cat.actionText}</span>
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Community Norms</h2>
          <div className="space-y-3 text-xs text-secondary leading-relaxed">
            <p>
              • <strong className="text-primary">Respect Non-Disclosure Agreements:</strong> Do not post verbatim proprietary questions from active, ongoing online assessments. Post generalized concepts, archetypes, and interview format expectations.
            </p>
            <p>
              • <strong className="text-primary">Clarity Over Jargon:</strong> When presenting architectural blueprints, state functional requirements, data volume estimations, and specific latency SLAs first before prescribing distributed tools.
            </p>
            <p>
              • <strong className="text-primary">Constructive Code Reviews:</strong> Suggest asymptotic space and time optimizations respectfully, with concrete dry-run examples.
            </p>
          </div>
        </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <GiscusEmbed />
        </div>
      </section>

      <Footer />
    </main>
  );
}

import Link from "next/link";
import { MarketingNavbar } from "@/components/navigation/MarketingNavbar";
import { Footer } from "@/components/marketing/Footer";
import { Users, MessageSquare, Briefcase, ArrowRight } from "lucide-react";

export default function CommunityPage() {
  return (
    <main className="min-h-screen">
      <MarketingNavbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Join The Technical{" "}
            <span className="text-brand-gradient">Community</span>
          </h1>
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Connect with fellow candidates preparing for tech interviews. Share experiences, strategies, and resources.
          </p>
          <Link
            href="/preparation"
            className="cta-button inline-flex items-center gap-3 px-8 py-4 text-base font-semibold"
          >
            Start Preparing
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12">Discuss</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-border rounded-2xl p-6 bg-surface-2 hover:border-purple-1/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-1/10 flex items-center justify-center mb-4">
                <MessageSquare size={24} className="text-purple-1" />
              </div>
              <h3 className="text-lg font-bold mb-2">Discussion</h3>
              <p className="text-sm text-secondary">
                Share interview experiences, preparation strategies, and tips with the community.
              </p>
            </div>

            <div className="border border-border rounded-2xl p-6 bg-surface-2 hover:border-purple-1/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-1/10 flex items-center justify-center mb-4">
                <Users size={24} className="text-purple-1" />
              </div>
              <h3 className="text-lg font-bold mb-2">Interview Experiences</h3>
              <p className="text-sm text-secondary">
                Read and share real interview experiences from candidates at top tech companies.
              </p>
            </div>

            <div className="border border-border rounded-2xl p-6 bg-surface-2 hover:border-purple-1/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-1/10 flex items-center justify-center mb-4">
                <Briefcase size={24} className="text-purple-1" />
              </div>
              <h3 className="text-lg font-bold mb-2">Career Questions</h3>
              <p className="text-sm text-secondary">
                Get advice on career decisions, job search strategies, and professional growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Coming Soon</h2>
          <p className="text-secondary mb-8">
            Our community platform is currently in development. In the meantime, start preparing with our structured resources.
          </p>
          <Link
            href="/preparation"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-1 text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Explore Preparation
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

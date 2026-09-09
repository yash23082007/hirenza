import { MarketingNavbar } from "@/components/navigation/MarketingNavbar";
import { HeroSection } from "@/components/marketing/HeroSection";
import { FeatureShowcase, RevealSection } from "@/components/marketing/FeatureShowcase";
import {
  DSASheetsMockup,
  CompanyWiseMockup,
  RoleWiseMockup,
  InterviewQuestionsMockup,
  SQLSheetMockup,
  SystemDesignMockup,
  NotesMockup,
  ColdEmailMockup,
} from "@/components/marketing/FeatureMockups";
import { CreatorSection } from "@/components/marketing/CreatorSection";
import { FAQSection } from "@/components/marketing/FAQSection";
import { Footer } from "@/components/marketing/Footer";
import { TOTAL_COMPANIES } from "@/data/stats";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <MarketingNavbar />
      
      {/* Hero */}
      <HeroSection />

      {/* Feature Intro */}
      <RevealSection className="py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Your Unfair Advantage{" "}
            <span className="text-brand-gradient">Starts Here</span>
          </h2>
          <p className="text-lg text-secondary leading-relaxed">
            Stop jumping between scattered sheets, bookmarks, playlists and random interview resources. Hirenza brings the important pieces together.
          </p>
        </div>
      </RevealSection>

      {/* Feature Showcases */}
      <FeatureShowcase
        label="DSA Sheets"
        title="Curated DSA Sheets From Top Educators"
        description="Follow structured problem sets instead of solving random questions without a plan. Sheets from Striver, Love Babbar, Shradha Khapra and more — all in one place."
      >
        <DSASheetsMockup />
      </FeatureShowcase>

      <FeatureShowcase
        label="Company Preparation"
        title="Prepare For The Company You Actually Want"
        description={`Practice company-specific questions and focus on patterns that repeatedly matter. Target ${TOTAL_COMPANIES} top tech companies with curated problem sets.`}
        reverse
      >
        <CompanyWiseMockup />
      </FeatureShowcase>

      <FeatureShowcase
        label="Role Wise Sheets"
        title="Practice By Role, Not Just By Topic"
        description="Frontend, Backend, Fullstack, Mobile, DevOps, AI/ML — get dedicated interview question sheets tailored to your exact target role."
      >
        <RoleWiseMockup />
      </FeatureShowcase>

      <FeatureShowcase
        label="Interview Questions"
        title="Most Asked Interview Questions"
        description="Get comprehensive interview questions organized by technology and topic. Search for exactly what you need to prepare."
        reverse
      >
        <InterviewQuestionsMockup />
      </FeatureShowcase>

      <FeatureShowcase
        label="SQL Sheet"
        title="Top SQL Interview Queries"
        description="Master every SQL concept interviewers love — SELECT, JOINs, subqueries, aggregations, window functions — with progress tracking built in."
      >
        <SQLSheetMockup />
      </FeatureShowcase>

      <FeatureShowcase
        label="System Design"
        title="Master System Design With The Best"
        description="Learn HLD and LLD from curated playlists. Distributed systems, caching, messaging, load balancing, microservices — all organized for you."
        reverse
      >
        <SystemDesignMockup />
      </FeatureShowcase>

      <FeatureShowcase
        label="Notes"
        title="Curated Study Notes — All In One Place"
        description="Computer Networks, AWS, Java, Kubernetes and more — browse curated study summaries directly in the platform, no downloading or searching."
      >
        <NotesMockup />
      </FeatureShowcase>

      <FeatureShowcase
        label="Cold Email Templates"
        title="Cold Email Templates That Actually Work"
        description="Get professional email templates for job referrals, networking and career outreach — crafted for different roles and scenarios."
        reverse
      >
        <ColdEmailMockup />
      </FeatureShowcase>

      {/* Many More Coming */}
      <RevealSection className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Many more resources coming...
          </h3>
          <p className="text-secondary">
            We&apos;re constantly adding new sheets, playlists, and tools to help you prepare better.
          </p>
        </div>
      </RevealSection>

      {/* Creator */}
      <CreatorSection />

      {/* FAQ */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

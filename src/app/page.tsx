import { MarketingNavbar } from "@/components/navigation/MarketingNavbar";
import { LogoMarquee } from "@/components/marketing/LogoMarquee";
import { HeroSection } from "@/components/marketing/HeroSection";
import { StatsBand } from "@/components/marketing/StatsBand";
import { PrivacyPanel } from "@/components/marketing/PrivacyPanel";
import { PaletteDemo } from "@/components/marketing/PaletteDemo";
import { ATSLinterDemo } from "@/components/marketing/ATSLinterDemo";
import { FeatureShowcase, RevealSection } from "@/components/marketing/FeatureShowcase";
import { TwoColumnShowcase } from "@/components/marketing/TwoColumnShowcase";
import { CompanyDirectory } from "@/components/marketing/CompanyDirectory";
import {
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

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <MarketingNavbar />
      
      {/* Practice Tracks Marquee */}
      <div className="pt-[calc(var(--topbar-height)+var(--announcement-height))]">
        <LogoMarquee />
      </div>

      {/* Hero */}
      <HeroSection />

      {/* Metrics & Proof Band */}
      <StatsBand />

      {/* Feature Intro */}
      <RevealSection id="features" className="py-20 md:py-28 text-center scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Structured preparation.{" "}
            <span className="text-brand-gradient">Zero friction.</span>
          </h2>
          <p className="text-lg text-secondary leading-relaxed">
            Offline-first trackers, instant ⌘K search, spaced repetition intervals, and verifiable company readiness scores without subscriptions or tracking.
          </p>
        </div>
      </RevealSection>

      {/* Flagship Two-Column Showcase (Hynts §§6–10 Parity) */}
      <TwoColumnShowcase />

      <CompanyDirectory />

      <FeatureShowcase
        label="Role Wise Sheets"
        title="Competency Blueprints by Engineering Role"
        description="Targeted technical roadmaps and focus areas spanning Frontend, Backend, Fullstack, Mobile, DevOps, and Machine Learning."
      >
        <RoleWiseMockup />
      </FeatureShowcase>

      <FeatureShowcase
        label="Interview Questions"
        title="Filterable Tech Q&A with Global ⌘K Navigation"
        description="Deep-dive interview questions indexed by language and core concept. Jump directly to any problem across the platform using global ⌘K search."
        reverse
      >
        <InterviewQuestionsMockup />
      </FeatureShowcase>

      <FeatureShowcase
        label="SQL Sheet"
        title="Production SQL Patterns & Query Breakdown"
        description="Practice window functions, recursive CTEs, and complex joins with direct LeetCode problem links and unified progress tracking."
      >
        <SQLSheetMockup />
      </FeatureShowcase>

      <FeatureShowcase
        label="System Design"
        title="HLD & LLD Architectural Blueprints"
        description="Master distributed systems, caching tiers, event streaming, and object-oriented design patterns with curated engineering breakdowns."
        reverse
      >
        <SystemDesignMockup />
      </FeatureShowcase>

      <FeatureShowcase
        label="Notes"
        title="Offline-First Engineering Reference Notes"
        description="High-signal reference summaries covering Operating Systems, DBMS internals, Computer Networks, and Cloud fundamentals right in your browser cache."
      >
        <NotesMockup />
      </FeatureShowcase>

      <FeatureShowcase
        label="Cold Email Templates"
        title="ATS-Friendly Outreach & Referral Formulas"
        description="High-conversion outreach templates for engineering managers, founders, and recruiters with role-specific customization guides."
        reverse
      >
        <ColdEmailMockup />
      </FeatureShowcase>

      {/* Interactive Command Palette Showcase */}
      <PaletteDemo />

      {/* ATS Resume Linter Interactive Demo */}
      <ATSLinterDemo />

      {/* Privacy Architecture Panel */}
      <PrivacyPanel />

      {/* Creator */}
      <CreatorSection />

      {/* FAQ */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

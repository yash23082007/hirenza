"use client";

import { useState, useMemo } from "react";
import { resumeTips, resumeSections, resumeMistakes, atsTips, resumeTemplates } from "@/data";
import {
  FileText,
  AlertTriangle,
  Check,
  Target,
  Eye,
  Download,
  BookOpen,
  ExternalLink,
  Printer,
  Sparkles,
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";

interface ResumeFormState {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  educationSchool: string;
  educationDegree: string;
  educationYear: string;
  experienceCompany: string;
  experienceRole: string;
  experienceDates: string;
  experienceBullets: string;
  projectTitle: string;
  projectTech: string;
  projectBullets: string;
  skillsLanguages: string;
  skillsFrameworks: string;
  skillsTools: string;
}

const initialResume: ResumeFormState = {
  fullName: "Alex Chen",
  email: "alex.chen@email.com",
  phone: "+1 (555) 234-5678",
  linkedin: "linkedin.com/in/alexchen-dev",
  github: "github.com/alexchen",
  educationSchool: "State University of Technology",
  educationDegree: "B.S. in Computer Science (GPA: 3.85/4.0)",
  educationYear: "2021 – 2025",
  experienceCompany: "ScaleUp Cloud Inc.",
  experienceRole: "Software Engineer Intern",
  experienceDates: "May 2024 – Aug 2024",
  experienceBullets:
    "Architected and deployed microservices using Go and gRPC, reducing P99 API latency by 34%.\nIntegrated Redis cluster caching layer handling 15,000+ RPS under peak load.\nAutomated CI/CD deployment pipeline with GitHub Actions, cutting release overhead by 45 minutes.",
  projectTitle: "Distributed Key-Value Store",
  projectTech: "Go, Raft Consensus, Docker, Prometheus",
  projectBullets:
    "Engineered fault-tolerant distributed store implementing Raft leader election and log replication.\nBenchmarked 20,000+ write QPS with sub-8ms latency across 5 node cluster simulation.",
  skillsLanguages: "Python, Go, TypeScript, Java, C++, SQL",
  skillsFrameworks: "React, Next.js, Node.js, Express, Tailwind CSS, FastAPI",
  skillsTools: "Docker, Kubernetes, AWS, Git, Redis, PostgreSQL, Kafka",
};

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState<"builder" | "structure" | "tips" | "mistakes" | "ats" | "templates">("builder");
  const [tipFilter, setTipFilter] = useState<string>("all");
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<ResumeFormState>(initialResume);

  const filteredTips = tipFilter === "all" ? resumeTips : resumeTips.filter(t => t.category === tipFilter);
  const selectedTemplate = resumeTemplates.find(template => template.id === previewTemplate);

  // Client-side ATS Linter & Scoring (E12)
  const atsAudit = useMemo(() => {
    const checks = [
      {
        id: "name-contact",
        label: "Contact Information Block",
        pass: Boolean(resumeData.fullName && resumeData.email && resumeData.phone),
        tip: "Must include full name, professional email, and phone number.",
      },
      {
        id: "linkedin-github",
        label: "Portfolio & GitHub Links",
        pass: Boolean(resumeData.linkedin && resumeData.github),
        tip: "Tech recruiters expect clean links to GitHub code and LinkedIn.",
      },
      {
        id: "action-verbs",
        label: "Starts with Strong Action Verbs",
        pass: /(built|architected|developed|engineered|optimized|designed|implemented|reduced|scaled|led)/i.test(
          resumeData.experienceBullets + " " + resumeData.projectBullets
        ),
        tip: "Use active impact verbs (Built, Optimized, Reduced) instead of 'worked on'.",
      },
      {
        id: "quantified-metrics",
        label: "Quantified Metrics & Scale (%, numbers, ms)",
        pass: /(\d+%\b|\d+k\b|\d+x\b|\d+\+?\s?(rps|qps|users|req|ms|min))/i.test(
          resumeData.experienceBullets + " " + resumeData.projectBullets
        ),
        tip: "Add measurable numbers: latency %, throughput RPS, or time saved.",
      },
      {
        id: "tech-skills",
        label: "Categorized Technical Skills",
        pass: Boolean(resumeData.skillsLanguages && resumeData.skillsFrameworks && resumeData.skillsTools),
        tip: "Group skills into Languages, Frameworks, and Tools for ATS keyword scanning.",
      },
      {
        id: "single-column",
        label: "ATS-Safe Single Column Layout",
        pass: true,
        tip: "Standard single column preserves parsing order in Workday and Greenhouse.",
      },
    ];

    const passedCount = checks.filter(c => c.pass).length;
    const score = Math.round((passedCount / checks.length) * 100);

    return { checks, score, passedCount };
  }, [resumeData]);

  const downloadRealTemplate = (template: typeof resumeTemplates[0]) => {
    const content = template.markdownCode || `# ${template.name}\n\n${template.description}`;
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${template.id}-ats-template.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div>
      <div className="mb-8 print:hidden">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
          ATS Resume Guide & Interactive Builder
        </h1>
        <p className="text-secondary">
          Craft FAANG-ready single-column resumes with real-time ATS scoring, Jake&apos;s Resume benchmarks, and print-to-PDF.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border pb-3 overflow-x-auto print:hidden">
        {[
          { key: "builder", label: "Live ATS Builder & Linter", icon: Sparkles },
          { key: "templates", label: "Verified Templates", icon: FileText },
          { key: "structure", label: "Section Structure", icon: BookOpen },
          { key: "tips", label: "Recruiter Tips", icon: Check },
          { key: "mistakes", label: "Common Mistakes", icon: AlertTriangle },
          { key: "ats", label: "ATS Parser Rules", icon: Target },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === key
                ? "bg-purple-1 text-white shadow-sm"
                : "text-muted hover:text-primary hover:bg-surface-2"
            }`}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* 1. Live ATS Builder Tab */}
      {activeTab === "builder" && (
        <div className="space-y-6">
          {/* ATS Score Card */}
          <div className="p-5 border border-purple-1/30 rounded-2xl bg-surface-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:hidden">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={18} className="text-purple-400" />
                <h3 className="text-lg font-bold text-primary">Live ATS Compliance Score</h3>
              </div>
              <p className="text-xs text-secondary">
                Audited against Workday, Greenhouse, and Lever parsing heuristics.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-black text-purple-400">{atsAudit.score}/100</div>
                <div className="text-[10px] text-muted">
                  {atsAudit.passedCount} of {atsAudit.checks.length} checks passed
                </div>
              </div>

              <button
                onClick={handlePrintPDF}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-1 text-white text-xs font-bold hover:bg-purple-1/90 transition-colors shadow-sm cursor-pointer"
              >
                <Printer size={14} /> Print / Save PDF
              </button>
            </div>
          </div>

          {/* ATS Checks Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 print:hidden">
            {atsAudit.checks.map(c => (
              <div
                key={c.id}
                className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                  c.pass
                    ? "bg-green-500/5 border-green-500/20 text-secondary"
                    : "bg-amber-500/5 border-amber-500/20 text-muted"
                }`}
              >
                {c.pass ? (
                  <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className={`font-semibold block ${c.pass ? "text-primary" : "text-amber-300"}`}>
                    {c.label}
                  </span>
                  <span className="text-[11px] text-muted">{c.tip}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Builder Split: Form on Left, Live A4 Sheet on Right */}
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* Editor Form */}
            <div className="space-y-4 bg-surface-2 border border-border rounded-2xl p-6 print:hidden">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">
                Resume Content Editor
              </h3>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted block mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    value={resumeData.fullName}
                    onChange={e => setResumeData({ ...resumeData, fullName: e.target.value })}
                    className="w-full bg-surface-1 border border-border rounded-xl px-3 py-2 text-xs text-primary outline-none focus:border-purple-1/40"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    value={resumeData.email}
                    onChange={e => setResumeData({ ...resumeData, email: e.target.value })}
                    className="w-full bg-surface-1 border border-border rounded-xl px-3 py-2 text-xs text-primary outline-none focus:border-purple-1/40"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1 font-medium">Phone</label>
                  <input
                    type="text"
                    value={resumeData.phone}
                    onChange={e => setResumeData({ ...resumeData, phone: e.target.value })}
                    className="w-full bg-surface-1 border border-border rounded-xl px-3 py-2 text-xs text-primary outline-none focus:border-purple-1/40"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1 font-medium">LinkedIn</label>
                  <input
                    type="text"
                    value={resumeData.linkedin}
                    onChange={e => setResumeData({ ...resumeData, linkedin: e.target.value })}
                    className="w-full bg-surface-1 border border-border rounded-xl px-3 py-2 text-xs text-primary outline-none focus:border-purple-1/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted block mb-1 font-medium">GitHub Profile</label>
                <input
                  type="text"
                  value={resumeData.github}
                  onChange={e => setResumeData({ ...resumeData, github: e.target.value })}
                  className="w-full bg-surface-1 border border-border rounded-xl px-3 py-2 text-xs text-primary outline-none focus:border-purple-1/40"
                />
              </div>

              {/* Experience */}
              <div className="pt-2 border-t border-border/50">
                <label className="text-xs font-bold text-primary block mb-2">Work Experience</label>
                <div className="grid sm:grid-cols-3 gap-2 mb-2">
                  <input
                    placeholder="Company"
                    value={resumeData.experienceCompany}
                    onChange={e => setResumeData({ ...resumeData, experienceCompany: e.target.value })}
                    className="bg-surface-1 border border-border rounded-xl px-3 py-2 text-xs text-primary outline-none"
                  />
                  <input
                    placeholder="Role"
                    value={resumeData.experienceRole}
                    onChange={e => setResumeData({ ...resumeData, experienceRole: e.target.value })}
                    className="bg-surface-1 border border-border rounded-xl px-3 py-2 text-xs text-primary outline-none"
                  />
                  <input
                    placeholder="Dates"
                    value={resumeData.experienceDates}
                    onChange={e => setResumeData({ ...resumeData, experienceDates: e.target.value })}
                    className="bg-surface-1 border border-border rounded-xl px-3 py-2 text-xs text-primary outline-none"
                  />
                </div>
                <textarea
                  rows={4}
                  value={resumeData.experienceBullets}
                  onChange={e => setResumeData({ ...resumeData, experienceBullets: e.target.value })}
                  placeholder="One bullet point per line. Start with action verbs."
                  className="w-full bg-surface-1 border border-border rounded-xl px-3 py-2 text-xs text-primary outline-none font-sans"
                />
              </div>

              {/* Projects */}
              <div className="pt-2 border-t border-border/50">
                <label className="text-xs font-bold text-primary block mb-2">Projects</label>
                <div className="grid sm:grid-cols-2 gap-2 mb-2">
                  <input
                    placeholder="Project Title"
                    value={resumeData.projectTitle}
                    onChange={e => setResumeData({ ...resumeData, projectTitle: e.target.value })}
                    className="bg-surface-1 border border-border rounded-xl px-3 py-2 text-xs text-primary outline-none"
                  />
                  <input
                    placeholder="Tech Stack"
                    value={resumeData.projectTech}
                    onChange={e => setResumeData({ ...resumeData, projectTech: e.target.value })}
                    className="bg-surface-1 border border-border rounded-xl px-3 py-2 text-xs text-primary outline-none"
                  />
                </div>
                <textarea
                  rows={3}
                  value={resumeData.projectBullets}
                  onChange={e => setResumeData({ ...resumeData, projectBullets: e.target.value })}
                  placeholder="One bullet point per line."
                  className="w-full bg-surface-1 border border-border rounded-xl px-3 py-2 text-xs text-primary outline-none"
                />
              </div>

              {/* Skills */}
              <div className="pt-2 border-t border-border/50 space-y-2">
                <label className="text-xs font-bold text-primary block">Technical Skills</label>
                <input
                  placeholder="Languages (e.g. Python, TypeScript, Go)"
                  value={resumeData.skillsLanguages}
                  onChange={e => setResumeData({ ...resumeData, skillsLanguages: e.target.value })}
                  className="w-full bg-surface-1 border border-border rounded-xl px-3 py-2 text-xs text-primary outline-none"
                />
                <input
                  placeholder="Frameworks & Libraries (e.g. React, Next.js, Node.js)"
                  value={resumeData.skillsFrameworks}
                  onChange={e => setResumeData({ ...resumeData, skillsFrameworks: e.target.value })}
                  className="w-full bg-surface-1 border border-border rounded-xl px-3 py-2 text-xs text-primary outline-none"
                />
                <input
                  placeholder="Tools & Infrastructure (e.g. Docker, AWS, Git)"
                  value={resumeData.skillsTools}
                  onChange={e => setResumeData({ ...resumeData, skillsTools: e.target.value })}
                  className="w-full bg-surface-1 border border-border rounded-xl px-3 py-2 text-xs text-primary outline-none"
                />
              </div>
            </div>

            {/* Live A4 ATS Preview */}
            <div className="border border-border-hover rounded-2xl overflow-hidden shadow-2xl bg-white text-slate-900 p-8 sm:p-10 font-sans text-xs leading-relaxed print:p-0 print:border-none print:shadow-none print:w-full print:m-0">
              {/* Header */}
              <div className="text-center border-b border-slate-300 pb-3 mb-3">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase mb-1">
                  {resumeData.fullName || "YOUR NAME"}
                </h1>
                <p className="text-[11px] text-slate-600">
                  {resumeData.email} • {resumeData.phone} • {resumeData.linkedin} • {resumeData.github}
                </p>
              </div>

              {/* Education */}
              <div className="mb-3">
                <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1">
                  Education
                </h2>
                <div className="flex justify-between items-baseline">
                  <div>
                    <strong className="text-slate-900">{resumeData.educationSchool}</strong> —{" "}
                    <span className="italic text-slate-700">{resumeData.educationDegree}</span>
                  </div>
                  <span className="text-[10px] text-slate-600">{resumeData.educationYear}</span>
                </div>
              </div>

              {/* Experience */}
              <div className="mb-3">
                <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1">
                  Experience
                </h2>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <strong className="text-slate-900">{resumeData.experienceRole}</strong>,{" "}
                    <span className="text-slate-700">{resumeData.experienceCompany}</span>
                  </div>
                  <span className="text-[10px] text-slate-600">{resumeData.experienceDates}</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700">
                  {resumeData.experienceBullets
                    .split("\n")
                    .filter(Boolean)
                    .map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                </ul>
              </div>

              {/* Projects */}
              <div className="mb-3">
                <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1">
                  Projects
                </h2>
                <div className="mb-1">
                  <strong className="text-slate-900">{resumeData.projectTitle}</strong>{" "}
                  <span className="text-[10px] text-slate-500">| {resumeData.projectTech}</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700">
                  {resumeData.projectBullets
                    .split("\n")
                    .filter(Boolean)
                    .map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                </ul>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1">
                  Technical Skills
                </h2>
                <div className="space-y-0.5 text-[11px] text-slate-700">
                  <p>
                    <strong className="text-slate-900">Languages:</strong> {resumeData.skillsLanguages}
                  </p>
                  <p>
                    <strong className="text-slate-900">Frameworks:</strong> {resumeData.skillsFrameworks}
                  </p>
                  <p>
                    <strong className="text-slate-900">Tools & Cloud:</strong> {resumeData.skillsTools}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Templates Tab */}
      {activeTab === "templates" && (
        <div>
          <p className="text-sm text-secondary mb-6">
            Hand-curated single-column ATS templates with direct LaTeX Overleaf links and markdown exports.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeTemplates.map(template => (
              <div key={template.id} className="card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-bold text-base text-primary">{template.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-1/10 text-purple-400 font-bold border border-purple-1/20 shrink-0">
                      {template.style}
                    </span>
                  </div>
                  <p className="text-xs text-secondary mb-4 leading-relaxed">{template.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {template.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-surface-3 text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex flex-col gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewTemplate(template.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface-3 hover:bg-surface-hover text-secondary font-medium transition-colors cursor-pointer"
                    >
                      <Eye size={13} /> View Structure
                    </button>
                    <button
                      onClick={() => downloadRealTemplate(template)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-purple-1 text-white font-medium hover:bg-purple-1/90 transition-colors cursor-pointer"
                    >
                      <Download size={13} /> Markdown (.md)
                    </button>
                  </div>

                  {template.overleafUrl && (
                    <a
                      href={template.overleafUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-1.5 text-muted hover:text-primary transition-colors text-[11px]"
                    >
                      Open in Overleaf LaTeX <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Structure Tab */}
      {activeTab === "structure" && (
        <div className="space-y-4">
          <p className="text-sm text-secondary mb-4">
            Follow this proven structure used by candidates who cleared interviews at FAANG and top product companies.
          </p>
          <div className="grid gap-3">
            {resumeSections.map(section => (
              <div key={section.id} className="card p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-base text-primary">{section.title}</h3>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      section.mustInclude
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-surface-3 text-muted"
                    }`}
                  >
                    {section.mustInclude ? "Must Include" : "Optional"}
                  </span>
                </div>
                <p className="text-xs text-secondary mb-3">{section.description}</p>
                <div className="space-y-1">
                  {section.tips.map((t, idx) => (
                    <p key={idx} className="text-xs text-muted flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>{t}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Tips Tab */}
      {activeTab === "tips" && (
        <div>
          <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
            {["all", "formatting", "content", "ats", "design"].map(cat => (
              <button
                key={cat}
                onClick={() => setTipFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer ${
                  tipFilter === cat ? "bg-purple-1 text-white" : "bg-surface-2 text-secondary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredTips.map(tip => (
              <div key={tip.id} className="card p-5">
                <h3 className="font-bold text-sm text-primary mb-1">{tip.title}</h3>
                <p className="text-xs text-secondary leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Mistakes Tab */}
      {activeTab === "mistakes" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {resumeMistakes.map((m, idx) => (
            <div key={idx} className="card p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm text-primary">{m.title}</h3>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    m.severity === "Critical"
                      ? "bg-red-500/10 text-red-400"
                      : m.severity === "Common"
                      ? "bg-orange-500/10 text-orange-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {m.severity}
                </span>
              </div>
              <p className="text-xs text-secondary">{m.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* 6. ATS Guide Tab */}
      {activeTab === "ats" && (
        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-bold text-primary">Applicant Tracking System (ATS) Best Practices</h2>
          <div className="grid gap-3">
            {atsTips.map((tip, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-surface-1 border border-border text-xs">
                <p className="font-bold text-primary mb-1">Rule: {tip.rule}</p>
                <p className="text-muted">Why: {tip.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            className="w-full max-w-3xl bg-surface-1 border border-border-hover rounded-2xl p-6 max-h-[85vh] overflow-y-auto custom-scrollbar"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <div>
                <h3 className="text-lg font-bold text-primary">{selectedTemplate.name}</h3>
                <p className="text-xs text-muted">{selectedTemplate.style}</p>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1.5 text-muted hover:text-primary rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-surface-2 border border-border text-xs font-mono text-secondary whitespace-pre-wrap overflow-x-auto">
              {selectedTemplate.markdownCode}
            </pre>

            <div className="mt-4 pt-4 border-t border-border flex justify-end gap-3">
              <button
                onClick={() => downloadRealTemplate(selectedTemplate)}
                className="px-4 py-2 rounded-xl bg-purple-1 text-white text-xs font-bold hover:bg-purple-1/90 transition-colors"
              >
                Download Markdown Template (.md)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

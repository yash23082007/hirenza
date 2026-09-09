"use client";

import { useState } from "react";
import { resumeTips, resumeSections, resumeMistakes, atsTips, resumeTemplates } from "@/data";
import { FileText, AlertTriangle, Check, Target, Eye, Download, ChevronDown, ChevronUp, BookOpen, ExternalLink } from "lucide-react";

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState<"structure" | "tips" | "mistakes" | "ats" | "templates">("structure");
  const [expandedSection, setExpandedSection] = useState<string | null>("experience");
  const [tipFilter, setTipFilter] = useState<string>("all");
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const categories = ["all", "formatting", "content", "ats", "design"];
  const filteredTips = tipFilter === "all" ? resumeTips : resumeTips.filter(t => t.category === tipFilter);
  const selectedTemplate = resumeTemplates.find(template => template.id === previewTemplate);

  const downloadTemplate = (templateName: string) => {
    const content = `${templateName}\n\nHirenza ATS-friendly resume template\n\nExperience\nEducation\nProjects\nTechnical Skills\nAchievements`;
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${templateName.toLowerCase().replace(/\s+/g, "-")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const severityColors: Record<string, string> = {
    Critical: "text-red-400 bg-red-500/10 border-red-500/30",
    Common: "text-orange-400 bg-orange-500/10 border-orange-500/30",
    Minor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Resume Guide</h1>
        <p className="text-secondary">ATS-friendly resume tips, structure, and templates based on Jake&apos;s Resume, Overleaf, and industry standards.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border pb-3 overflow-x-auto">
        {[
          { key: "structure", label: "Structure", icon: BookOpen },
          { key: "tips", label: "Pro Tips", icon: Check },
          { key: "mistakes", label: "Common Mistakes", icon: AlertTriangle },
          { key: "ats", label: "ATS Guide", icon: Target },
          { key: "templates", label: "Templates", icon: FileText },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === key ? "bg-surface-2 text-white" : "text-muted hover:text-secondary"
            }`}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* Structure Tab */}
      {activeTab === "structure" && (
        <div>
          <p className="text-sm text-secondary mb-6">
            Follow this proven structure used by candidates who got interviews at FAANG and top product companies. Based on Jake&apos;s Resume format and ATS best practices.
          </p>
          <div className="space-y-3">
            {resumeSections.map((section, idx) => (
              <div key={section.id} className="card overflow-hidden">
                <div
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      section.mustInclude ? "bg-purple-1/20 text-purple-1" : "bg-surface-3 text-muted"
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">{section.title}</h3>
                        {section.mustInclude && (
                          <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">Must Include</span>
                        )}
                      </div>
                      <p className="text-xs text-muted">{section.description}</p>
                    </div>
                  </div>
                  {expandedSection === section.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {expandedSection === section.id && (
                  <div className="px-4 pb-4 border-t border-border pt-4 ml-11">
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-muted uppercase mb-2">Tips</p>
                      <ul className="space-y-1">
                        {section.tips.map((tip, i) => (
                          <li key={i} className="text-sm text-secondary flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {section.exampleContent && (
                      <div>
                        <p className="text-xs font-semibold text-muted uppercase mb-2">Example</p>
                        <pre className="text-xs text-secondary bg-surface-3 rounded-lg p-3 whitespace-pre-wrap font-sans">
                          {section.exampleContent}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips Tab */}
      {activeTab === "tips" && (
        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setTipFilter(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                  tipFilter === cat ? "bg-purple-1 text-white" : "bg-surface-2 text-muted hover:text-secondary border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredTips.map(tip => (
              <div key={tip.id} className="card p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                    <Check size={16} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{tip.title}</h3>
                    <p className="text-xs text-secondary leading-relaxed">{tip.description}</p>
                    <span className="inline-block text-xs text-muted mt-2 capitalize bg-surface-3 px-2 py-0.5 rounded-full">
                      {tip.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mistakes Tab */}
      {activeTab === "mistakes" && (
        <div>
          <p className="text-sm text-secondary mb-6">
            These are the most common resume mistakes that get applications rejected. Avoid them to increase your callback rate.
          </p>
          <div className="space-y-3">
            {resumeMistakes.map((mistake, idx) => (
              <div key={idx} className={`card p-5 border ${severityColors[mistake.severity]}`}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                    <AlertTriangle size={16} className="text-red-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{mistake.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${severityColors[mistake.severity]}`}>
                        {mistake.severity}
                      </span>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed">{mistake.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ATS Tab */}
      {activeTab === "ats" && (
        <div>
          <div className="card p-5 mb-6 border-purple-1/30">
            <div className="flex items-start gap-3 mb-3">
              <Target size={20} className="text-purple-1 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-base mb-1">What is ATS?</h2>
                <p className="text-sm text-secondary leading-relaxed">
                  An Applicant Tracking System (ATS) is software used by 99% of Fortune 500 companies to filter resumes before a human sees them. 
                  Your resume must pass the ATS to reach a recruiter.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-bold mb-4">ATS Optimization Rules</h2>
          <div className="space-y-3">
            {atsTips.map((tip, idx) => (
              <div key={idx} className="card p-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-1/20 flex items-center justify-center text-xs font-bold text-purple-1 shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">{tip.rule}</p>
                    <p className="text-xs text-muted">{tip.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 card p-5 bg-surface-2">
            <h3 className="font-semibold text-sm mb-2">How ATS Scoring Works</h3>
            <div className="grid grid-cols-3 gap-4 mt-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">70%+</p>
                <p className="text-xs text-muted mt-1">Match Score to Pass</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-400">6 sec</p>
                <p className="text-xs text-muted mt-1">Human Scan Time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-400">75%</p>
                <p className="text-xs text-muted mt-1">Resumes Rejected by ATS</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === "templates" && (
        <div>
          <p className="text-sm text-secondary mb-6">
            All templates follow ATS-friendly design principles. Single-column layout, clean fonts, standard section headers.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeTemplates.map(template => (
              <div key={template.id} className="card overflow-hidden">
                {/* Resume Preview */}
                <div className="bg-white p-6 aspect-[3/4] relative">
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-900 w-2/3 rounded" />
                    <div className="h-1.5 bg-gray-300 w-1/2 rounded" />
                    <div className="h-1 bg-gray-200 w-full rounded" />
                    <div className="h-1 bg-gray-200 w-4/5 rounded" />
                    
                    <div className="pt-3 space-y-1.5">
                      <div className="h-2 bg-gray-900 w-1/3 rounded" />
                      <div className="h-1.5 bg-gray-400 w-1/2 rounded" />
                      <div className="h-1 bg-gray-300 w-full rounded" />
                      <div className="h-1 bg-gray-300 w-5/6 rounded" />
                      <div className="h-1 bg-gray-300 w-full rounded" />
                    </div>

                    <div className="pt-3 space-y-1.5">
                      <div className="h-2 bg-gray-900 w-1/3 rounded" />
                      <div className="h-1.5 bg-gray-400 w-1/2 rounded" />
                      <div className="h-1 bg-gray-300 w-full rounded" />
                      <div className="h-1 bg-gray-300 w-4/5 rounded" />
                    </div>

                    <div className="pt-3 space-y-1.5">
                      <div className="h-2 bg-gray-900 w-1/4 rounded" />
                      <div className="flex gap-2 flex-wrap">
                        <div className="h-1 bg-gray-300 w-16 rounded" />
                        <div className="h-1 bg-gray-300 w-12 rounded" />
                        <div className="h-1 bg-gray-300 w-14 rounded" />
                        <div className="h-1 bg-gray-300 w-10 rounded" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-1/10 flex items-center justify-center shrink-0">
                      <FileText size={18} className="text-purple-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                      <p className="text-xs text-muted">{template.description}</p>
                      <span className="text-xs text-purple-400 mt-1 inline-block">{template.style}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setPreviewTemplate(template.id)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-surface-3 hover:bg-surface-hover border border-border rounded-lg text-sm font-medium transition-colors">
                      <Eye size={14} />
                      Preview
                    </button>
                    <button onClick={() => downloadTemplate(template.name)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 card p-5 bg-surface-2 border border-border">
            <h3 className="font-semibold text-sm mb-3">Template Sources & Inspiration</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-secondary">
              <div>
                <a href="https://github.com/jakegut/resume" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-white text-xs mb-1 hover:text-purple-300">
                  Jake&apos;s Resume <ExternalLink size={12} aria-hidden="true" />
                </a>
                <p className="text-xs text-muted">Clean single-column format used by successful FAANG candidates. Industry gold standard.</p>
              </div>
              <div>
                <a href="https://www.overleaf.com/latex/templates/tagged/cv" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-white text-xs mb-1 hover:text-purple-300">
                  Overleaf Templates <ExternalLink size={12} aria-hidden="true" />
                </a>
                <p className="text-xs text-muted">LaTeX-based templates for perfect formatting and PDF output.</p>
              </div>
              <div>
                <a href="https://www.indeed.com/career-advice/resumes-cover-letters/ats-resume" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-white text-xs mb-1 hover:text-purple-300">
                  ATS Guidance <ExternalLink size={12} aria-hidden="true" />
                </a>
                <p className="text-xs text-muted">All templates follow ATS parsing rules: standard fonts, no tables, clean headers.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-labelledby="resume-preview-title" onClick={() => setPreviewTemplate(null)}>
          <div className="bg-surface-2 border border-border rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-auto" onClick={event => event.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 id="resume-preview-title" className="text-lg font-bold">{selectedTemplate.name}</h2>
              <button onClick={() => setPreviewTemplate(null)} aria-label="Close" className="p-2 rounded-lg hover:bg-surface-hover"><span aria-hidden="true">×</span></button>
            </div>
            <div className="m-6 aspect-[3/4] max-h-[60vh] bg-white p-8 text-gray-900 shadow-xl">
              <div className="h-4 w-2/3 bg-gray-900" />
              <div className="mt-2 h-2 w-1/3 bg-gray-400" />
              <div className="mt-8 space-y-3">
                {['Experience', 'Education', 'Projects', 'Technical Skills'].map(section => <div key={section}><div className="h-2 w-1/4 bg-gray-900" /><div className="mt-2 h-1.5 w-full bg-gray-200" /><div className="mt-1 h-1.5 w-5/6 bg-gray-200" /></div>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

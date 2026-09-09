"use client";

import { useState, useMemo } from "react";
import { emailTemplates } from "@/data";
import { Mail, Copy, Check, Sparkles, Download } from "lucide-react";

export default function ColdEmailTemplatesPage() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("frontend-referral");
  const [copied, setCopied] = useState(false);

  // Dynamic Builder States
  const [formValues, setFormValues] = useState({
    yourName: "Alex Rivera",
    recipientName: "Sarah",
    company: "Stripe",
    role: "Frontend Engineer",
    experienceYears: "3",
    skills: "React, Next.js, TypeScript, GraphQL",
    metric1: "Reduced web app bundle size by 42%, cutting LCP from 2.8s to 0.9s",
    metric2: "Architected component design system adopted by 15+ engineering teams",
    metric3: "Scaled real-time dashboard handling 100K+ concurrent WebSockets",
    linkedinUrl: "https://linkedin.com/in/alex-rivera",
    portfolioUrl: "https://github.com/alex-rivera",
  });

  const selectedTemplate = useMemo(() => {
    return emailTemplates.find(t => t.id === selectedTemplateId) || emailTemplates[0];
  }, [selectedTemplateId]);

  // Generate personalized dynamic content
  const generatedContent = useMemo(() => {
    if (!selectedTemplate) return "";
    let text = selectedTemplate.content;
    text = text.replace(/\[Your Name\]/g, formValues.yourName);
    text = text.replace(/\[Name\]/g, formValues.recipientName);
    text = text.replace(/\[Company\]/g, formValues.company);
    text = text.replace(/\[X years\]/g, `${formValues.experienceYears} years`);
    text = text.replace(/\[specific skills\]/g, formValues.skills);
    text = text.replace(/\[Key achievement 1\]/g, formValues.metric1);
    text = text.replace(/\[Key achievement 2\]/g, formValues.metric2);
    text = text.replace(/\[Key achievement 3\]/g, formValues.metric3);
    text = text.replace(/\[Key technical achievement\]/g, formValues.metric1);
    text = text.replace(/\[Relevant project or impact\]/g, formValues.metric2);
    text = text.replace(/\[LinkedIn URL\]/g, formValues.linkedinUrl);
    text = text.replace(/\[Portfolio\/GitHub URL\]/g, formValues.portfolioUrl);
    return text;
  }, [selectedTemplate, formValues]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cold-email-${formValues.company.toLowerCase().replace(/\s+/g, "-")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };


  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Interactive Cold Email Builder</h1>
        <p className="text-secondary">High-converting cold email outreach templates for software engineering referrals and coffee chats with real-time field interpolation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Template Selection & Builder Form */}
        <div className="lg:col-span-5 space-y-6">
          {/* Template Picker */}
          <div className="card p-5 bg-surface-2 border-border space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <Mail size={14} className="text-purple-1" /> Select Email Archetype
            </span>
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
              {emailTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplateId(template.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                    selectedTemplateId === template.id
                      ? "bg-purple-950/30 border-purple-500/50 text-white font-bold"
                      : "bg-surface-3 border-border-soft text-secondary hover:border-border"
                  }`}
                >
                  <span className="truncate">{template.title}</span>
                  <span className="text-[10px] text-muted bg-surface-2 px-2 py-0.5 rounded-md shrink-0 ml-2">
                    {template.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Builder Inputs */}
          <div className="card p-5 bg-surface-2 border-border space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-400" /> Personalize Fields
              </span>
              <span className="text-[10px] text-purple-1 font-semibold">Live Real-Time Sync</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-muted block mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={formValues.yourName}
                  onChange={e => setFormValues(prev => ({ ...prev, yourName: e.target.value }))}
                  className="w-full bg-surface-3 border border-border rounded-lg px-3 py-1.5 text-xs text-primary outline-none focus:border-purple-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-muted block mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={formValues.recipientName}
                  onChange={e => setFormValues(prev => ({ ...prev, recipientName: e.target.value }))}
                  className="w-full bg-surface-3 border border-border rounded-lg px-3 py-1.5 text-xs text-primary outline-none focus:border-purple-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-muted block mb-1">Target Company</label>
                <input
                  type="text"
                  value={formValues.company}
                  onChange={e => setFormValues(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full bg-surface-3 border border-border rounded-lg px-3 py-1.5 text-xs text-primary outline-none focus:border-purple-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-muted block mb-1">Years of Exp.</label>
                <input
                  type="text"
                  value={formValues.experienceYears}
                  onChange={e => setFormValues(prev => ({ ...prev, experienceYears: e.target.value }))}
                  className="w-full bg-surface-3 border border-border rounded-lg px-3 py-1.5 text-xs text-primary outline-none focus:border-purple-1"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-muted block mb-1">Key Impact Metric / Highlight #1</label>
              <input
                type="text"
                value={formValues.metric1}
                onChange={e => setFormValues(prev => ({ ...prev, metric1: e.target.value }))}
                className="w-full bg-surface-3 border border-border rounded-lg px-3 py-1.5 text-xs text-primary outline-none focus:border-purple-1"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-muted block mb-1">Key Impact Metric / Highlight #2</label>
              <input
                type="text"
                value={formValues.metric2}
                onChange={e => setFormValues(prev => ({ ...prev, metric2: e.target.value }))}
                className="w-full bg-surface-3 border border-border rounded-lg px-3 py-1.5 text-xs text-primary outline-none focus:border-purple-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-muted block mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={formValues.linkedinUrl}
                  onChange={e => setFormValues(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                  className="w-full bg-surface-3 border border-border rounded-lg px-3 py-1.5 text-xs text-primary outline-none focus:border-purple-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-muted block mb-1">GitHub / Portfolio URL</label>
                <input
                  type="text"
                  value={formValues.portfolioUrl}
                  onChange={e => setFormValues(prev => ({ ...prev, portfolioUrl: e.target.value }))}
                  className="w-full bg-surface-3 border border-border rounded-lg px-3 py-1.5 text-xs text-primary outline-none focus:border-purple-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Generated Preview & Export Actions */}
        <div className="lg:col-span-7">
          <div className="card p-6 bg-surface-2 border-purple-500/20 sticky top-24 shadow-xl">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-muted block">Live Generated Preview</span>
                <h3 className="font-bold text-base text-primary">{selectedTemplate.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 bg-surface-3 hover:bg-surface-hover border border-border text-secondary rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download size={13} /> .txt
                </button>
                <button
                  onClick={handleCopy}
                  className="px-4 py-1.5 bg-purple-1 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                >
                  {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Email</>}
                </button>
              </div>
            </div>

            {/* Email Canvas Preview */}
            <div className="bg-surface-3/70 border border-border rounded-xl p-5 overflow-auto max-h-[60vh]">
              <pre className="whitespace-pre-wrap text-xs text-primary font-mono leading-relaxed select-all">
                {generatedContent}
              </pre>
            </div>

            <div className="mt-4 pt-3 border-t border-border-soft flex items-center justify-between text-[11px] text-muted">
              <span>💡 Tip: Keep referral emails under 150 words for maximum response rate.</span>
              <span className="text-emerald-400 font-semibold">Ready to Send</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

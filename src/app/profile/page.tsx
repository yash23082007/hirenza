"use client";

import { FormEvent, useState, useRef } from "react";
import { Check, Download, Upload, RotateCcw } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { ShareablePrepCard } from "@/components/profile/ShareablePrepCard";

export default function ProfilePage() {
  const { data, updateProfile, exportData, importData, resetProgress } = useProgress();
  const [name, setName] = useState(data.profile.name || "Builder");
  const [email, setEmail] = useState(data.profile.email || "builder@example.com");
  const [bio, setBio] = useState(data.profile.bio || "");
  const [targetCompany, setTargetCompany] = useState(data.profile.targetCompany || "Google");
  const [targetDate, setTargetDate] = useState(data.profile.targetDate || "");
  const [hoursPerDay, setHoursPerDay] = useState(data.profile.hoursPerDay || 2);
  const [saved, setSaved] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initial = (name.trim().charAt(0) || "B").toUpperCase();

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfile({
      name,
      email,
      bio,
      targetCompany,
      targetDate,
      hoursPerDay: Number(hoursPerDay),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleExport = () => {
    const jsonStr = exportData();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hirenza-progress-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const content = evt.target?.result as string;
      if (content) {
        const success = importData(content);
        if (success) {
          setImportStatus("Backup restored successfully!");
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus("Failed to restore backup: invalid JSON format.");
          setTimeout(() => setImportStatus(null), 3000);
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      resetProgress();
      setName("Builder");
      setEmail("builder@example.com");
      setBio("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-secondary">Manage your interview target, preferences, and data backup.</p>
      </div>

      {/* Shareable Prep Scorecard */}
      <ShareablePrepCard />

      <div className="bg-surface-2 border border-border rounded-2xl p-8 mb-6 mt-6">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-purple-1/20 flex items-center justify-center text-3xl font-bold text-purple-1">
            {initial}
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary">{name || "Builder"}</h2>
            <p className="text-secondary">{email || "builder@example.com"}</p>
            <p className="mt-3 text-xs text-muted">Targeting {targetCompany} • {hoursPerDay} hrs/day prep</p>
          </div>
        </div>

        <form className="grid gap-6" onSubmit={handleSave}>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <label htmlFor="display-name" className="text-sm font-medium">Display Name</label>
              <input
                id="display-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full bg-surface-1 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-1/50"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email-address" className="text-sm font-medium">Email Address</label>
              <input
                id="email-address"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-surface-1 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-1/50"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="grid gap-2">
              <label htmlFor="target-company" className="text-sm font-medium">Target Company</label>
              <select
                id="target-company"
                value={targetCompany}
                onChange={e => setTargetCompany(e.target.value)}
                className="w-full bg-surface-1 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-1/50"
              >
                <option value="Google">Google</option>
                <option value="Amazon">Amazon</option>
                <option value="Microsoft">Microsoft</option>
                <option value="Meta">Meta</option>
                <option value="Apple">Apple</option>
                <option value="Flipkart">Flipkart</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="target-date" className="text-sm font-medium">Target Interview Date</label>
              <input
                id="target-date"
                type="date"
                value={targetDate}
                onChange={e => setTargetDate(e.target.value)}
                className="w-full bg-surface-1 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-1/50 text-secondary"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="study-hours" className="text-sm font-medium">Daily Study Hours</label>
              <input
                id="study-hours"
                type="number"
                min="1"
                max="12"
                value={hoursPerDay}
                onChange={e => setHoursPerDay(Number(e.target.value))}
                className="w-full bg-surface-1 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-1/50"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="profile-bio" className="text-sm font-medium">Bio & Focus</label>
            <textarea
              id="profile-bio"
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full bg-surface-1 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-1/50"
              placeholder="e.g. Grinding Striver A2Z and System Design for upcoming SDE-2 rounds..."
            />
          </div>

          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-100 font-semibold rounded-xl transition-colors cursor-pointer"
            >
              {saved && <Check size={16} />}
              {saved ? "Saved" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Local-First Backup & Restore (E11) */}
      <div className="bg-surface-2 border border-border rounded-2xl p-8 mb-6">
        <h3 className="text-lg font-bold mb-2">Local Data Management</h3>
        <p className="text-sm text-secondary mb-6">
          Hirenza is 100% private and local-first. Your streak, solved problems, and bookmarks live in your browser.
          Export a backup anytime or transfer your progress to another laptop or device.
        </p>

        {importStatus && (
          <div className="mb-4 p-3 rounded-xl bg-purple-1/10 border border-purple-1/30 text-purple-300 text-sm font-medium">
            {importStatus}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:border-purple-1/40 bg-surface-1 text-sm font-medium text-primary hover:bg-surface-3 transition-colors cursor-pointer"
          >
            <Download size={16} className="text-purple-400" />
            Export Backup (.json)
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json,application/json"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:border-purple-1/40 bg-surface-1 text-sm font-medium text-primary hover:bg-surface-3 transition-colors cursor-pointer"
          >
            <Upload size={16} className="text-cyan-400" />
            Import Backup
          </button>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/20 hover:border-red-500/40 bg-red-500/5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors ml-auto cursor-pointer"
          >
            <RotateCcw size={16} />
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
}

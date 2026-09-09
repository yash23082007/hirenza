"use client";

import { FormEvent, useEffect, useState } from "react";
import { Check } from "lucide-react";

const profileStorageKey = "hirenza-profile";

export default function ProfilePage() {
  const [name, setName] = useState("Builder");
  const [email, setEmail] = useState("builder@example.com");
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let profile = null;
    try {
      profile = JSON.parse(localStorage.getItem(profileStorageKey) || "null");
    } catch {
      // Use the defaults when saved profile data is unavailable or invalid.
    }
    const updateId = window.setTimeout(() => {
      if (profile) {
        setName(profile.name || "Builder");
        setEmail(profile.email || "builder@example.com");
        setBio(profile.bio || "");
      }
    }, 0);
    return () => window.clearTimeout(updateId);
  }, []);

  const saveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      localStorage.setItem(profileStorageKey, JSON.stringify({ name, email, bio }));
    } catch {
      // The form remains usable for this session if storage is unavailable.
    }
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-secondary">Manage your personal information and preferences.</p>
      </div>

      <div className="bg-surface-2 border border-border rounded-2xl p-8 mb-6">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-purple-1/20 flex items-center justify-center text-3xl font-bold text-purple-1">
            H
          </div>
          <div>
            <h2 className="text-xl font-bold">Builder</h2>
            <p className="text-secondary">builder@example.com</p>
            <p className="mt-3 text-xs text-muted">Your avatar uses your initials.</p>
          </div>
        </div>

        <form className="grid gap-6" onSubmit={saveProfile}>
          <div className="grid gap-2">
            <label htmlFor="display-name" className="text-sm font-medium">Display Name</label>
            <input id="display-name" type="text" value={name} onChange={event => setName(event.target.value)} required className="w-full bg-surface-1 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-1/50" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email-address" className="text-sm font-medium">Email Address</label>
            <input id="email-address" type="email" value={email} onChange={event => setEmail(event.target.value)} required className="w-full bg-surface-1 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-1/50" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="profile-bio" className="text-sm font-medium">Bio</label>
            <textarea id="profile-bio" rows={3} value={bio} onChange={event => setBio(event.target.value)} className="w-full bg-surface-1 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-1/50" placeholder="Tell us about your preparation journey..." />
          </div>
          <div className="mt-2 flex justify-end">
            <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-100 font-semibold rounded-xl transition-colors">
              {saved && <Check size={16} />}
              {saved ? "Saved" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

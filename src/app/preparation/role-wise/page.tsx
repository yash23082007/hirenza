"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { roleWiseData } from "@/data";
import { Search, Users, Briefcase, Target, ArrowLeft } from "lucide-react";

function RoleWiseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryRole = searchParams.get("role");
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(queryRole || null);

  useEffect(() => {
    const r = searchParams.get("role");
    setSelectedRole(r || null);
  }, [searchParams]);

  const handleSelectRole = (roleId: string | null) => {
    setSelectedRole(roleId);
    if (roleId) {
      router.replace(`/preparation/role-wise?role=${roleId}`, { scroll: false });
    } else {
      router.replace("/preparation/role-wise", { scroll: false });
    }
  };

  const filtered = roleWiseData.filter(
    r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
  );

  const selectedRoleData = selectedRole ? roleWiseData.find(r => r.id === selectedRole) : null;

  if (selectedRoleData) {
    return (
      <div>
        <button
          onClick={() => handleSelectRole(null)}
          className="text-sm text-purple-1 hover:underline mb-6 flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to all roles
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-purple-1/10 flex items-center justify-center">
              <Users size={32} className="text-purple-1" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {selectedRoleData.name}
              </h1>
              <p className="text-sm text-muted mt-1">{selectedRoleData.description}</p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Target size={20} className="text-purple-1" />
            <h2 className="text-xl font-bold">Required Skills & Technologies</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {selectedRoleData.skills.map((skill, idx) => (
              <div key={idx} className="border border-border rounded-xl bg-surface-2 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-primary">{skill.name}</h4>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      skill.importance === "Must Have"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : skill.importance === "Good to Have"
                        ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {skill.importance}
                  </span>
                </div>
                <span className="text-xs text-muted">{skill.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Responsibilities Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase size={20} className="text-purple-1" />
            <h2 className="text-xl font-bold">Core Day-to-Day Responsibilities</h2>
          </div>
          <div className="border border-border rounded-xl bg-surface-2 p-5">
            <ul className="space-y-3">
              {selectedRoleData.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-purple-1 mt-0.5">•</span>
                  <span className="text-sm text-secondary leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interview Focus Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target size={20} className="text-purple-1" />
            <h2 className="text-xl font-bold">Hiring Bar & Interview Focus Areas</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {selectedRoleData.interviewFocus.map((focus, idx) => (
              <div key={idx} className="border border-border rounded-xl bg-surface-2 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted font-mono w-6">{idx + 1}.</span>
                  <span className="text-sm text-primary font-medium">{focus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
          Role-Wise Interview Preparation
        </h1>
        <p className="text-secondary">
          Comprehensive preparation guide for 7 core tech engineering roles with prioritized skill importance, daily responsibilities, and specific evaluation areas.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3 bg-surface-2 border border-border rounded-xl px-4 py-3">
          <Search size={16} className="text-muted" />
          <input
            type="text"
            placeholder="Search roles (e.g. Frontend, Backend, DevOps, Data Engineer...)"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted text-primary"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(role => (
          <div
            key={role.id}
            onClick={() => handleSelectRole(role.id)}
            className="card p-5 cursor-pointer hover:border-purple-1/30 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-1/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Users size={24} className="text-purple-1" />
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition-colors">
              {role.name}
            </h3>
            <p className="text-xs text-muted mb-4 line-clamp-2">{role.description}</p>
            <div className="flex items-center justify-between text-xs pt-3 border-t border-border-soft">
              <span className="text-purple-1 font-semibold">{role.skills.length} Skills</span>
              <span className="text-muted">{role.responsibilities.length} Responsibilities</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RoleWisePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted">Loading role guide...</div>}>
      <RoleWiseContent />
    </Suspense>
  );
}

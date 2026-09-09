"use client";

import { useState } from "react";
import { roleWiseData } from "@/data";
import { Search, Users, Briefcase, Target } from "lucide-react";

export default function RoleWisePage() {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const filtered = roleWiseData.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  );

  const selectedRoleData = selectedRole ? roleWiseData.find(r => r.id === selectedRole) : null;

  if (selectedRoleData) {
    return (
      <div>
        <button
          onClick={() => setSelectedRole(null)}
          className="text-sm text-purple-1 hover:underline mb-6 flex items-center gap-2"
        >
          ← Back to all roles
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
            <h2 className="text-xl font-bold">Required Skills</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {selectedRoleData.skills.map((skill, idx) => (
              <div key={idx} className="border border-border rounded-xl bg-surface-2 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{skill.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    skill.importance === "Must Have" ? "bg-red-500/10 text-red-400" :
                    skill.importance === "Good to Have" ? "bg-orange-500/10 text-orange-400" :
                    "bg-blue-500/10 text-blue-400"
                  }`}>
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
            <h2 className="text-xl font-bold">Key Responsibilities</h2>
          </div>
          <div className="border border-border rounded-xl bg-surface-2 p-5">
            <ul className="space-y-3">
              {selectedRoleData.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-purple-1 mt-1">•</span>
                  <span className="text-sm text-secondary">{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interview Focus Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target size={20} className="text-purple-1" />
            <h2 className="text-xl font-bold">Interview Focus Areas</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {selectedRoleData.interviewFocus.map((focus, idx) => (
              <div key={idx} className="border border-border rounded-xl bg-surface-2 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted w-6">{idx + 1}.</span>
                  <span className="text-sm">{focus}</span>
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
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Role-Wise Interview Preparation</h1>
        <p className="text-secondary">Comprehensive preparation guide for different tech roles. View required skills, responsibilities, and interview focus areas.</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3 bg-surface-2 border border-border rounded-xl px-4 py-3">
          <Search size={16} className="text-muted" />
          <input
            type="text"
            placeholder="Search roles (e.g. Frontend, Backend, DevOps...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(role => (
          <div 
            key={role.id} 
            onClick={() => setSelectedRole(role.id)}
            className="card p-5 cursor-pointer hover:border-purple-1/30"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-1/10 flex items-center justify-center mb-4">
              <Users size={24} className="text-purple-1" />
            </div>
            <h3 className="font-semibold mb-2">{role.name}</h3>
            <p className="text-xs text-muted mb-4 line-clamp-2">{role.description}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-purple-1 font-semibold">{role.skills.length} Skills</span>
              <span className="text-muted">{role.responsibilities.length} Responsibilities</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

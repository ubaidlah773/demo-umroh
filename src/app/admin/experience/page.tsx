"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Calendar,
  MapPin,
  CheckCircle2,
  Save,
  X,
  AlertTriangle,
} from "lucide-react";

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/experience");
      const data = await res.json();
      setExperiences(data.experiences || []);
    } catch (err) {
      console.error("Fetch experiences error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const moveItem = async (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= experiences.length) return;

    const updated = [...experiences];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;

    const items = updated.map((exp, idx) => ({
      id: exp.id,
      displayOrder: idx + 1,
    }));

    setExperiences(updated.map((exp, idx) => ({ ...exp, displayOrder: idx + 1 })));

    try {
      await fetch("/api/experience", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
    } catch (err) {
      console.error("Reorder error:", err);
      fetchExperiences();
    }
  };

  const handleSave = async (formData: any) => {
    try {
      const isNew = !formData.id;
      const url = isNew ? "/api/experience" : `/api/experience/${formData.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingItem(null);
        fetchExperiences();
      }
    } catch (err) {
      console.error("Save experience error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
      if (res.ok) {
        setExperiences((prev) => prev.filter((e) => e.id !== id));
        setDeletingId(null);
      }
    } catch (err) {
      console.error("Delete experience error:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-palette-secPurple/15 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-palette-primary tracking-tight flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-accent-blue" />
            <span>Work Experience Timeline</span>
          </h1>
          <p className="text-xs sm:text-sm text-palette-darkSec/80 mt-1">
            Manage your employment history, client roles, and verified responsibilities.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingItem({
              company: "",
              role: "",
              period: "",
              location: "Tuban, Indonesia",
              type: "Freelance",
              responsibilities: ["", ""],
              technologies: [],
              published: true,
            });
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold shadow-sm transition-all w-fit cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Experience List */}
      {loading ? (
        <div className="text-center py-20 text-palette-darkSec/60 text-xs font-mono">
          Loading timeline entries...
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, idx) => {
            const responsibilities =
              typeof exp.responsibilities === "string"
                ? JSON.parse(exp.responsibilities)
                : exp.responsibilities || [];
            const technologies =
              typeof exp.technologies === "string"
                ? JSON.parse(exp.technologies)
                : exp.technologies || [];

            return (
              <div
                key={exp.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-palette-secPurple/15 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:border-palette-secPurple/30 transition-all"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-base text-palette-primary">{exp.company}</span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                      {exp.type}
                    </span>
                    <span className="text-xs font-semibold text-palette-darkSec">
                      {exp.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-palette-darkSec/70 flex-wrap">
                    <span className="flex items-center gap-1.5 text-accent-blue font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-palette-secPurple" />
                      {exp.location}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-palette-darkSec/90">
                    {responsibilities.slice(0, 3).map((r: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                    {responsibilities.length > 3 && (
                      <li className="text-[11px] text-palette-darkSec/60 pl-5">
                        +{responsibilities.length - 3} more responsibilities
                      </li>
                    )}
                  </ul>

                  {technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-palette-secPurple/10">
                      {technologies.map((t: string) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-palette-altBg border border-palette-secPurple/15 text-palette-darkSec"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end lg:self-auto shrink-0">
                  <div className="flex items-center gap-1 bg-palette-altBg p-1 rounded-lg border border-palette-secPurple/15">
                    <button
                      type="button"
                      onClick={() => moveItem(idx, "up")}
                      disabled={idx === 0}
                      className="p-1 rounded text-palette-darkSec hover:text-palette-primary disabled:opacity-20 transition-colors cursor-pointer"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItem(idx, "down")}
                      disabled={idx === experiences.length - 1}
                      className="p-1 rounded text-palette-darkSec hover:text-palette-primary disabled:opacity-20 transition-colors cursor-pointer"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem({
                        ...exp,
                        responsibilities,
                        technologies,
                      });
                      setIsModalOpen(true);
                    }}
                    className="p-2 rounded-lg bg-accent-blue/10 hover:bg-accent-blue/20 text-accent-blue border border-accent-blue/20 transition-colors cursor-pointer"
                    title="Edit entry"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeletingId(exp.id)}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
                    title="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Experience Editor Modal */}
      {isModalOpen && editingItem && (
        <div
          className="fixed inset-0 z-50 bg-palette-primary/40 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border border-palette-secPurple/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-palette-secPurple/15">
              <h3 className="text-base font-bold text-palette-primary">
                {editingItem.id ? "Edit Experience Entry" : "Add Experience Entry"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-palette-darkSec/60 hover:text-palette-primary cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-palette-darkSec font-semibold mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.company}
                    onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    placeholder="e.g. Belajar Cerdas"
                    className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-palette-darkSec font-semibold mb-1">Position / Role *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.role}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    placeholder="e.g. Web Developer — Freelance"
                    className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-palette-darkSec font-semibold mb-1">Period *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.period}
                    onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                    placeholder="Mar 2026 – Jun 2026"
                    className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-palette-darkSec font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={editingItem.location}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="Tuban, Indonesia"
                    className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-palette-darkSec font-semibold mb-1">Employment Type</label>
                  <select
                    value={editingItem.type}
                    onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                  >
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Full-time">Full-time</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-palette-darkSec font-semibold">Responsibilities &amp; Contributions</label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingItem({
                        ...editingItem,
                        responsibilities: [...editingItem.responsibilities, ""],
                      })
                    }
                    className="text-accent-blue hover:underline text-[11px] font-mono cursor-pointer"
                  >
                    + Add bullet point
                  </button>
                </div>
                <div className="space-y-2">
                  {editingItem.responsibilities.map((r: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={r}
                        onChange={(e) => {
                          const updated = [...editingItem.responsibilities];
                          updated[i] = e.target.value;
                          setEditingItem({ ...editingItem, responsibilities: updated });
                        }}
                        placeholder="Describe responsibility or engineering contribution..."
                        className="flex-1 px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingItem.responsibilities.filter((_: any, idx: number) => idx !== i);
                          setEditingItem({ ...editingItem, responsibilities: updated });
                        }}
                        className="p-1.5 text-palette-darkSec/60 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-palette-darkSec font-semibold mb-1">
                  Technologies Used (Comma separated)
                </label>
                <input
                  type="text"
                  value={
                    Array.isArray(editingItem.technologies)
                      ? editingItem.technologies.join(", ")
                      : editingItem.technologies || ""
                  }
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Laravel, MySQL, JavaScript, Blade"
                  className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary font-mono focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-palette-secPurple/15">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-palette-darkSec hover:bg-palette-altBg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSave(editingItem)}
                className="px-5 py-2 rounded-lg bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold shadow-sm cursor-pointer transition-colors"
              >
                Save Experience
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div
          className="fixed inset-0 z-50 bg-palette-primary/40 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-2xl border border-palette-secPurple/20 max-w-md w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-palette-primary">Delete Experience Record?</h3>
              <p className="text-xs text-palette-darkSec/80 mt-1">
                Are you sure you want to remove this experience item from your portfolio?
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-palette-secPurple/15">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-palette-darkSec hover:bg-palette-altBg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deletingId)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

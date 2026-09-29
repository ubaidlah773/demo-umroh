"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  Award,
  Calendar,
  CheckCircle2,
  Save,
  X,
  BookOpen,
} from "lucide-react";

export default function AdminEducationPage() {
  const [educationList, setEducationList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const fetchEducation = async () => {
    try {
      const res = await fetch("/api/education");
      const data = await res.json();
      setEducationList(data.education || []);
    } catch (err) {
      console.error("Fetch education error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleSave = async (formData: any) => {
    try {
      const isNew = !formData.id;
      const url = isNew ? "/api/education" : `/api/education/${formData.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingItem(null);
        fetchEducation();
      }
    } catch (err) {
      console.error("Save education error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return;
    try {
      await fetch(`/api/education/${id}`, { method: "DELETE" });
      fetchEducation();
    } catch (err) {
      console.error("Delete education error:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-palette-secPurple/15 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-palette-primary tracking-tight flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-accent-blue" />
            <span>Education &amp; Credentials</span>
          </h1>
          <p className="text-xs sm:text-sm text-palette-darkSec/80 mt-1">
            Manage academic degrees, coursework, GPAs, certifications, and academic honors.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingItem({
              institution: "",
              degree: "",
              period: "",
              gradeLabel: "GPA",
              gradeValue: "",
              achievements: [],
              coursework: [],
              competencies: [],
            });
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold shadow-sm transition-all w-fit cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {/* Education Cards */}
      {loading ? (
        <div className="text-center py-20 text-palette-darkSec/60 text-xs font-mono">
          Loading credentials...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationList.map((item) => {
            const achievements =
              typeof item.achievements === "string"
                ? JSON.parse(item.achievements)
                : item.achievements || [];
            const coursework =
              typeof item.coursework === "string"
                ? JSON.parse(item.coursework)
                : item.coursework || [];
            const competencies =
              typeof item.competencies === "string"
                ? JSON.parse(item.competencies)
                : item.competencies || [];

            return (
              <div
                key={item.id}
                className="bg-white border border-palette-secPurple/15 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:border-palette-secPurple/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-palette-secPurple/15">
                    <span className="text-xs font-mono text-accent-blue flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingItem({
                            ...item,
                            achievements,
                            coursework,
                            competencies,
                          });
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-palette-altBg hover:bg-palette-secPurple/10 text-palette-darkSec hover:text-palette-primary border border-palette-secPurple/15 cursor-pointer transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-palette-altBg hover:bg-red-50 text-palette-darkSec hover:text-red-500 border border-palette-secPurple/15 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-palette-primary mt-3">{item.institution}</h3>
                  <span className="text-xs font-semibold text-palette-darkSec block">{item.degree}</span>

                  <div className="mt-3 p-3 rounded-lg bg-palette-altBg border border-palette-secPurple/15 flex items-center justify-between">
                    <span className="text-xs text-palette-darkSec/80 font-medium">{item.gradeLabel}</span>
                    <span className="text-sm font-bold text-accent-blue font-mono">
                      {item.gradeValue}
                    </span>
                  </div>

                  {achievements.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <span className="text-[11px] font-mono text-palette-darkSec/70 uppercase tracking-wider block font-bold">
                        Achievements
                      </span>
                      <ul className="space-y-1.5 text-xs text-palette-darkSec/90">
                        {achievements.map((ach: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {coursework.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <span className="text-[11px] font-mono text-palette-darkSec/70 uppercase tracking-wider block font-bold">
                        Coursework
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {coursework.map((cw: string) => (
                          <span
                            key={cw}
                            className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-palette-altBg border border-palette-secPurple/15 text-palette-darkSec"
                          >
                            {cw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {competencies.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <span className="text-[11px] font-mono text-palette-darkSec/70 uppercase tracking-wider block font-bold">
                        Competencies
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {competencies.map((comp: string) => (
                          <span
                            key={comp}
                            className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-palette-altBg border border-palette-secPurple/15 text-palette-darkSec"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Editor Modal */}
      {isModalOpen && editingItem && (
        <div
          className="fixed inset-0 z-50 bg-palette-primary/40 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border border-palette-secPurple/20 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-palette-secPurple/15">
              <h3 className="text-sm font-bold text-palette-primary">
                {editingItem.id ? "Edit Education Entry" : "Add Education Entry"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-palette-darkSec/60 hover:text-palette-primary cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs font-sans">
              <div>
                <label className="block text-palette-darkSec font-semibold mb-1">Institution *</label>
                <input
                  type="text"
                  required
                  value={editingItem.institution}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, institution: e.target.value })
                  }
                  placeholder="e.g. Universitas Negeri Semarang"
                  className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-palette-darkSec font-semibold mb-1">Degree / Program *</label>
                <input
                  type="text"
                  required
                  value={editingItem.degree}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, degree: e.target.value })
                  }
                  placeholder="e.g. Bachelor of Informatics"
                  className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-palette-darkSec font-semibold mb-1">Period</label>
                  <input
                    type="text"
                    value={editingItem.period}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, period: e.target.value })
                    }
                    placeholder="Aug 2021 – Jul 2025"
                    className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-palette-darkSec font-semibold mb-1">Grade Label</label>
                  <input
                    type="text"
                    value={editingItem.gradeLabel}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, gradeLabel: e.target.value })
                    }
                    placeholder="GPA / Final Score"
                    className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-palette-darkSec font-semibold mb-1">Grade Value</label>
                  <input
                    type="text"
                    value={editingItem.gradeValue}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, gradeValue: e.target.value })
                    }
                    placeholder="3.80 / 4.00"
                    className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-palette-darkSec font-semibold mb-1">
                  Achievements (One per line)
                </label>
                <textarea
                  rows={3}
                  value={
                    Array.isArray(editingItem.achievements)
                      ? editingItem.achievements.join("\n")
                      : editingItem.achievements || ""
                  }
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      achievements: e.target.value.split("\n").filter((s) => s.trim()),
                    })
                  }
                  placeholder="Finalist, DIMAS-TI Data Mining Competition 2023&#10;Published 7 research articles on machine learning"
                  className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary font-mono focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-palette-darkSec font-semibold mb-1">
                  Coursework / Competencies (Comma separated)
                </label>
                <input
                  type="text"
                  value={
                    Array.isArray(editingItem.coursework)
                      ? editingItem.coursework.join(", ")
                      : editingItem.coursework || ""
                  }
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      coursework: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Artificial Intelligence, Data Analysis, Research Methodology"
                  className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary font-mono focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-palette-secPurple/15">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-palette-darkSec hover:bg-palette-altBg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSave(editingItem)}
                className="px-4 py-1.5 rounded-lg bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold shadow-sm cursor-pointer transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

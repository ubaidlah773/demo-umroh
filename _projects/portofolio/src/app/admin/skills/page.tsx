"use client";

import React, { useState, useEffect } from "react";
import {
  Cpu,
  Plus,
  Edit2,
  Trash2,
  Layers,
  Save,
  X,
  ArrowUp,
  ArrowDown,
  Tag,
} from "lucide-react";

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);

  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any | null>(null);
  const [selectedCatId, setSelectedCatId] = useState<string>("");

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error("Fetch skills error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const saveCategory = async (catData: any) => {
    try {
      const isNew = !catData.id;
      const url = isNew ? "/api/skills/categories" : `/api/skills/categories/${catData.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(catData),
      });

      if (res.ok) {
        setCategoryModalOpen(false);
        setEditingCategory(null);
        fetchSkills();
      }
    } catch (err) {
      console.error("Save category error:", err);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category and all its skills?")) return;
    try {
      await fetch(`/api/skills/categories/${id}`, { method: "DELETE" });
      fetchSkills();
    } catch (err) {
      console.error("Delete category error:", err);
    }
  };

  const saveSkill = async (skillData: any) => {
    try {
      const isNew = !skillData.id;
      const url = isNew ? "/api/skills" : `/api/skills/${skillData.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skillData),
      });

      if (res.ok) {
        setSkillModalOpen(false);
        setEditingSkill(null);
        fetchSkills();
      }
    } catch (err) {
      console.error("Save skill error:", err);
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      await fetch(`/api/skills/${id}`, { method: "DELETE" });
      fetchSkills();
    } catch (err) {
      console.error("Delete skill error:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-palette-secPurple/15 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-palette-primary tracking-tight flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-accent-blue" />
            <span>Technical Stack &amp; Skills</span>
          </h1>
          <p className="text-xs sm:text-sm text-palette-darkSec/80 mt-1">
            Manage your programming languages, frameworks, databases, and tooling categories.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingCategory({ category: "", description: "" });
            setCategoryModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold shadow-sm transition-all w-fit cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill Category</span>
        </button>
      </div>

      {/* Categories & Skills Cards */}
      {loading ? (
        <div className="text-center py-20 text-palette-darkSec/60 text-xs font-mono">
          Loading technical stack...
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-palette-secPurple/15 rounded-2xl p-6 space-y-4 shadow-sm"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-palette-secPurple/15 gap-3">
                <div>
                  <h3 className="text-base font-bold text-palette-primary flex items-center gap-2">
                    <Layers className="w-4 h-4 text-accent-blue" />
                    <span>{cat.category}</span>
                  </h3>
                  <p className="text-xs text-palette-darkSec/80 mt-0.5">{cat.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCatId(cat.id);
                      setEditingSkill({ categoryId: cat.id, name: "", tag: "" });
                      setSkillModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 text-xs font-medium border border-accent-blue/20 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Skill</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingCategory(cat);
                      setCategoryModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-palette-darkSec hover:text-palette-primary bg-palette-altBg border border-palette-secPurple/15 cursor-pointer transition-colors"
                    title="Edit category"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteCategory(cat.id)}
                    className="p-1.5 rounded-lg text-palette-darkSec hover:text-red-500 bg-palette-altBg border border-palette-secPurple/15 cursor-pointer transition-colors"
                    title="Delete category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {cat.skills?.map((skill: any) => (
                  <div
                    key={skill.id}
                    className="p-3.5 rounded-xl bg-palette-altBg border border-palette-secPurple/15 hover:border-palette-secPurple/30 flex flex-col justify-between group transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-palette-darkSec/70">
                        {skill.tag || "Standard"}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingSkill(skill);
                            setSkillModalOpen(true);
                          }}
                          className="text-palette-darkSec hover:text-accent-blue cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteSkill(skill.id)}
                          className="text-palette-darkSec hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-palette-primary">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Modal */}
      {categoryModalOpen && editingCategory && (
        <div
          className="fixed inset-0 z-50 bg-palette-primary/40 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border border-palette-secPurple/20 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-palette-secPurple/15">
              <h3 className="text-sm font-bold text-palette-primary">
                {editingCategory.id ? "Edit Category" : "Add Skill Category"}
              </h3>
              <button
                type="button"
                onClick={() => setCategoryModalOpen(false)}
                className="text-palette-darkSec/60 hover:text-palette-primary cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-palette-darkSec font-semibold mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={editingCategory.category}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, category: e.target.value })
                  }
                  placeholder="e.g. Programming"
                  className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-palette-darkSec font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingCategory.description || ""}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, description: e.target.value })
                  }
                  placeholder="Short explanation of tools in this category..."
                  className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-palette-secPurple/15">
              <button
                type="button"
                onClick={() => setCategoryModalOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-palette-darkSec hover:bg-palette-altBg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => saveCategory(editingCategory)}
                className="px-4 py-1.5 rounded-lg bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold shadow-sm cursor-pointer transition-colors"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skill Modal */}
      {skillModalOpen && editingSkill && (
        <div
          className="fixed inset-0 z-50 bg-palette-primary/40 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border border-palette-secPurple/20 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-palette-secPurple/15">
              <h3 className="text-sm font-bold text-palette-primary">
                {editingSkill.id ? "Edit Skill" : "Add Technical Skill"}
              </h3>
              <button
                type="button"
                onClick={() => setSkillModalOpen(false)}
                className="text-palette-darkSec/60 hover:text-palette-primary cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-palette-darkSec font-semibold mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name}
                  onChange={(e) =>
                    setEditingSkill({ ...editingSkill, name: e.target.value })
                  }
                  placeholder="e.g. Laravel"
                  className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-palette-darkSec font-semibold mb-1">Category</label>
                <select
                  value={editingSkill.categoryId || selectedCatId}
                  onChange={(e) =>
                    setEditingSkill({ ...editingSkill, categoryId: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-palette-darkSec font-semibold mb-1">Tag / Discipline</label>
                <input
                  type="text"
                  value={editingSkill.tag || ""}
                  onChange={(e) =>
                    setEditingSkill({ ...editingSkill, tag: e.target.value })
                  }
                  placeholder="e.g. PHP Framework"
                  className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary font-mono focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-palette-secPurple/15">
              <button
                type="button"
                onClick={() => setSkillModalOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-palette-darkSec hover:bg-palette-altBg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => saveSkill(editingSkill)}
                className="px-4 py-1.5 rounded-lg bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold shadow-sm cursor-pointer transition-colors"
              >
                Save Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FolderKanban,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Star,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Image as ImageIcon,
  Copy,
  Layers,
} from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error("Fetch projects error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const togglePublished = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !current }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, published: !current } : p))
        );
      }
    } catch (err) {
      console.error("Toggle published error:", err);
    }
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !current }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, featured: !current } : p))
        );
      }
    } catch (err) {
      console.error("Toggle featured error:", err);
    }
  };

  const handleDuplicate = async (id: string) => {
    setDuplicatingId(id);
    try {
      const res = await fetch(`/api/projects/${id}/duplicate`, {
        method: "POST",
      });
      if (res.ok) {
        await fetchProjects();
      }
    } catch (err) {
      console.error("Duplicate error:", err);
    } finally {
      setDuplicatingId(null);
    }
  };

  const moveProject = async (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= projects.length) return;

    const newProjects = [...projects];
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIdx];
    newProjects[targetIdx] = temp;

    const items = newProjects.map((p, idx) => ({
      id: p.id,
      displayOrder: idx + 1,
      number: String(idx + 1).padStart(2, "0"),
    }));

    setProjects(
      newProjects.map((p, idx) => ({
        ...p,
        displayOrder: idx + 1,
        number: String(idx + 1).padStart(2, "0"),
      }))
    );

    try {
      await fetch("/api/projects/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
    } catch (err) {
      console.error("Reorder error:", err);
      fetchProjects();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setDeletingId(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase())) ||
      (p.technologies && p.technologies.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && p.published) ||
      (statusFilter === "draft" && !p.published);

    const cat = (p.category || "").toUpperCase();
    const matchesCategory =
      categoryFilter === "all" ||
      (categoryFilter === "WEB" && (cat === "WEB" || cat.includes("WEB") || cat.includes("LMS") || cat.includes("QUEUE") || cat === "")) ||
      (categoryFilter === "DESIGN" && (cat === "DESIGN" || cat.includes("DESIGN")));

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#7D6B91]/15 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#272838] tracking-tight flex items-center gap-2.5">
            <FolderKanban className="w-6 h-6 text-accent-blue" />
            <span>Project Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5D536B] mt-1 font-medium">
            Create, edit, duplicate, publish, reorder, and upload documentation images for your projects.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold shadow-accent-sm transition-all active:scale-[0.99] w-fit cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-[#5D536B]/60 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by title or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#7D6B91]/25 text-xs text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue shadow-card-subtle font-medium"
          />
        </div>

        {/* Filter Controls: Category Filter + Status Filter */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter Pills: [ ALL ] [ WEB ] [ DESIGN ] */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#7D6B91]/20 shadow-card-subtle">
            {[
              { id: "all", label: "All Types" },
              { id: "WEB", label: "WEB" },
              { id: "DESIGN", label: "DESIGN" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                  categoryFilter === tab.id
                    ? "bg-[#347FC4] text-white shadow-sm"
                    : "text-[#5D536B] hover:text-[#272838] hover:bg-[#EEF0F8]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#7D6B91]/20 shadow-card-subtle">
            {[
              { id: "all", label: "All Status" },
              { id: "published", label: "Live" },
              { id: "draft", label: "Drafts" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === tab.id
                    ? "bg-[#272838] text-white shadow-sm"
                    : "text-[#5D536B] hover:text-[#272838] hover:bg-[#EEF0F8]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects List Table / Cards */}
      {loading ? (
        <div className="text-center py-20 text-[#5D536B] text-xs font-mono font-semibold">
          Loading projects repository...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#7D6B91]/15 shadow-card-subtle p-8">
          <FolderKanban className="w-10 h-10 text-[#5D536B]/40 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-[#272838]">No projects found</h3>
          <p className="text-xs text-[#5D536B] mt-1 max-w-sm mx-auto">
            {search ? "No projects match your search query." : "No projects in this category or status filter."}
          </p>
          <Link
            href="/admin/projects/new"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold shadow-accent-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Project</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#7D6B91]/15 shadow-card-subtle overflow-hidden divide-y divide-[#7D6B91]/10">
          {filtered.map((project, idx) => (
            <div
              key={project.id}
              className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:bg-[#F7F8FC] transition-colors"
            >
              {/* Left Column: Number, Thumbnail, Info */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {/* Number & Cover Thumbnail */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-xs font-bold text-accent-blue bg-[#F7F8FC] border border-[#7D6B91]/20 px-2 py-1 rounded-md">
                    {project.number}
                  </span>
                  <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-[#EEF0F8] border border-[#7D6B91]/15">
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#5D536B]/40">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-[#272838]">{project.title}</span>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent-blue/10 text-accent-blue border border-accent-blue/20 flex items-center gap-1 font-semibold">
                        <Star className="w-2.5 h-2.5 fill-accent-blue" />
                        Featured
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EEF0F8] text-[#347FC4] border border-[#347FC4]/25">
                      {project.category?.toUpperCase() === "DESIGN" ? "DESIGN" : "WEB"}
                    </span>
                  </div>

                  <span className="text-xs text-[#5D536B] mt-1 line-clamp-1 font-medium">
                    {project.subtitle} • {project.period}
                  </span>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-[#5D536B]/70 mt-2 flex-wrap font-medium">
                    <span className="flex items-center gap-1 text-accent-blue font-bold">
                      <ImageIcon className="w-3 h-3" />
                      {project.images?.length || 0} Gallery Photos
                    </span>
                    <span>•</span>
                    <span className="truncate max-w-xs">{project.tools || project.technologies}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Controls, Ordering, Actions */}
              <div className="flex items-center gap-2.5 self-end lg:self-auto shrink-0 flex-wrap">
                {/* Featured Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleFeatured(project.id, project.featured)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer shadow-2xs ${
                    project.featured
                      ? "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100"
                      : "bg-[#EEF0F8] text-[#5D536B] border-[#7D6B91]/20 hover:bg-white hover:text-amber-500"
                  }`}
                  title={project.featured ? "Remove from Featured" : "Mark as Featured"}
                >
                  <Star className={`w-3.5 h-3.5 ${project.featured ? "fill-amber-500" : ""}`} />
                </button>

                {/* Publish Toggle Button */}
                <button
                  type="button"
                  onClick={() => togglePublished(project.id, project.published)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border cursor-pointer ${
                    project.published
                      ? "bg-accent-blue/10 text-accent-blue border-accent-blue/20 hover:bg-accent-blue/20"
                      : "bg-[#EEF0F8] text-[#5D536B] border-[#7D6B91]/20 hover:bg-white hover:text-[#272838]"
                  }`}
                  title={project.published ? "Click to set Draft" : "Click to Publish"}
                >
                  {project.published ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue" />
                      <span>Live</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Draft</span>
                    </>
                  )}
                </button>

                {/* Duplicate Project Button */}
                <button
                  type="button"
                  onClick={() => handleDuplicate(project.id)}
                  disabled={duplicatingId === project.id}
                  className="p-2 rounded-xl bg-white hover:bg-[#EEF0F8] text-[#5D536B] hover:text-[#347FC4] border border-[#7D6B91]/20 transition-colors cursor-pointer shadow-card-subtle disabled:opacity-50"
                  title="Duplicate Project"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                {/* Move Up/Down Buttons */}
                <div className="flex items-center gap-1 bg-[#F7F8FC] p-1 rounded-xl border border-[#7D6B91]/20 shadow-card-subtle">
                  <button
                    type="button"
                    onClick={() => moveProject(idx, "up")}
                    disabled={idx === 0}
                    className="p-1 rounded-lg text-[#5D536B] hover:text-[#272838] disabled:opacity-20 transition-colors cursor-pointer"
                    title="Move project up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveProject(idx, "down")}
                    disabled={idx === projects.length - 1}
                    className="p-1 rounded-lg text-[#5D536B] hover:text-[#272838] disabled:opacity-20 transition-colors cursor-pointer"
                    title="Move project down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Public Link */}
                <a
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white hover:bg-[#EEF0F8] text-[#5D536B] hover:text-[#272838] border border-[#7D6B91]/20 transition-colors cursor-pointer shadow-card-subtle"
                  title="View public case study"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Edit Button */}
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="p-2 rounded-xl bg-accent-blue/10 hover:bg-accent-blue/20 text-accent-blue border border-accent-blue/20 transition-colors cursor-pointer shadow-card-subtle"
                  title="Edit project content and documentation"
                >
                  <Edit2 className="w-4 h-4" />
                </Link>

                {/* Delete Trigger */}
                <button
                  type="button"
                  onClick={() => setDeletingId(project.id)}
                  className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer shadow-card-subtle"
                  title="Delete project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-2xl border border-[#7D6B91]/20 max-w-md w-full space-y-4 shadow-card-elevated">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-[#272838]">Delete Project?</h3>
              <p className="text-xs text-[#5D536B] mt-1 font-medium">
                Are you sure you want to delete this project and its documentation photos? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#7D6B91]/15">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5D536B] hover:bg-[#EEF0F8] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deletingId)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

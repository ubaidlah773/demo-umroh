"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MediaUploader, { GalleryItem } from "@/components/admin/MediaUploader";
import {
  Save,
  ArrowLeft,
  Globe,
  Github,
  Calendar,
  Layers,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface ProjectFormProps {
  initialData?: any;
  isNew?: boolean;
}

export default function ProjectForm({ initialData, isNew = false }: ProjectFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "basic" | "details" | "media" | "features" | "settings"
  >("basic");

  // Form states
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [shortDescription, setShortDescription] = useState(
    initialData?.shortDescription || ""
  );
  const [fullDescription, setFullDescription] = useState(
    initialData?.fullDescription || ""
  );

  const [role, setRole] = useState(initialData?.role || "Full Stack Developer");
  const [period, setPeriod] = useState(initialData?.period || "2026");
  const [category, setCategory] = useState(
    initialData?.category || "WEB"
  );
  const [tools, setTools] = useState(
    initialData?.tools || ""
  );
  const [technologies, setTechnologies] = useState(
    initialData?.technologies || "Laravel, MySQL, JavaScript"
  );

  const [projectUrl, setProjectUrl] = useState(initialData?.projectUrl || "");
  const [githubUrl, setGithubUrl] = useState(initialData?.githubUrl || "");

  const [featured, setFeatured] = useState(!!initialData?.featured);
  const [published, setPublished] = useState(
    initialData?.published !== undefined ? !!initialData.published : true
  );
  const [displayOrder, setDisplayOrder] = useState(
    initialData?.displayOrder || 1
  );
  const [mockupType, setMockupType] = useState(
    initialData?.mockupType || "belajar-cerdas"
  );
  const [badgeText, setBadgeText] = useState(initialData?.badgeText || "");

  // Highlights, Features, Dev Highlights
  const [highlights, setHighlights] = useState<string[]>(() => {
    try {
      if (initialData?.highlights) {
        return typeof initialData.highlights === "string"
          ? JSON.parse(initialData.highlights)
          : initialData.highlights;
      }
    } catch {}
    return [
      "Multi-role user experience with data boundaries",
      "Dynamic scheduling and relational data modeling",
      "Responsive and performant production deployment",
    ];
  });

  const [features, setFeatures] = useState<{ title: string; description: string }[]>(() => {
    try {
      if (initialData?.features) {
        return typeof initialData.features === "string"
          ? JSON.parse(initialData.features)
          : initialData.features;
      }
    } catch {}
    return [
      {
        title: "Role-Based Access Control",
        description: "Tailored workflows for distinct stakeholders with strict permission barriers.",
      },
    ];
  });

  // Gallery Images
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>(() => {
    if (initialData?.images && Array.isArray(initialData.images)) {
      return initialData.images.map((img: any, idx: number) => ({
        id: img.id,
        fileName: img.fileName,
        fileUrl: img.fileUrl,
        title: img.title || "",
        altText: img.altText || "",
        caption: img.caption || "",
        sortOrder: img.sortOrder || idx + 1,
        isCover: !!img.isCover,
        fileSize: img.fileSize,
        fileType: img.fileType,
      }));
    }
    return [];
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  const handleSubmit = async (publishStatus?: boolean) => {
    setSaving(true);
    setMessage(null);

    const isPub = publishStatus !== undefined ? publishStatus : published;

    // Pick cover image from gallery images if set, or keep existing
    const coverItem = galleryImages.find((img) => img.isCover);
    const resolvedCoverImage = coverItem?.fileUrl || galleryImages[0]?.fileUrl || initialData?.coverImage || null;

    const payload = {
      title,
      slug,
      subtitle,
      shortDescription,
      fullDescription: fullDescription || shortDescription,
      role,
      period,
      category,
      tools: tools || technologies,
      technologies,
      projectUrl,
      githubUrl,
      featured,
      published: isPub,
      displayOrder: Number(displayOrder),
      mockupType,
      badgeText,
      coverImage: resolvedCoverImage,
      highlights: JSON.stringify(highlights.filter((h) => h.trim())),
      features: JSON.stringify(features.filter((f) => f.title.trim())),
      images: galleryImages,
    };

    try {
      const url = isNew ? "/api/projects" : `/api/projects/${initialData.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save project.");
      }

      setMessage({ type: "success", text: "Project saved successfully!" });
      if (isNew && data.project?.id) {
        router.push(`/admin/projects/${data.project.id}`);
      } else {
        router.refresh();
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "An error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  const addHighlight = () => setHighlights([...highlights, ""]);
  const updateHighlight = (index: number, val: string) => {
    const updated = [...highlights];
    updated[index] = val;
    setHighlights(updated);
  };
  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const addFeature = () => setFeatures([...features, { title: "", description: "" }]);
  const updateFeature = (index: number, field: "title" | "description", val: string) => {
    const updated = [...features];
    updated[index] = { ...updated[index], [field]: val };
    setFeatures(updated);
  };
  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#7D6B91]/15 gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="p-2 rounded-xl bg-white hover:bg-[#EEF0F8] text-[#5D536B] hover:text-[#272838] border border-[#7D6B91]/20 shadow-card-subtle transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-[#272838] tracking-tight">
              {isNew ? "Create New Project" : `Edit Project: ${title || initialData?.title}`}
            </h1>
            <span className="text-xs text-[#5D536B] font-medium">
              {isNew ? "Define project specifications and upload gallery photos" : `Slug: /projects/${slug || initialData?.slug}`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isNew && (
            <a
              href={`/projects/${slug || initialData?.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#EEF0F8] text-[#5D536B] hover:text-[#272838] text-xs font-semibold border border-[#7D6B91]/20 shadow-card-subtle transition-colors"
            >
              <span>View Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={saving}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#EEF0F8] text-[#5D536B] hover:text-[#272838] text-xs font-semibold border border-[#7D6B91]/20 shadow-card-subtle disabled:opacity-50 transition-colors"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold shadow-accent-sm disabled:opacity-50 transition-all active:scale-[0.99]"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Publish Project"}</span>
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center gap-2.5 font-medium ${
            message.type === "success"
              ? "bg-accent-blue/10 border-accent-blue/20 text-accent-blue font-semibold"
              : "bg-red-50 border-red-200 text-red-600 font-semibold"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-accent-blue" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Editor Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#7D6B91]/15 overflow-x-auto pb-px">
        {[
          { id: "basic", label: "Basic Info" },
          { id: "details", label: "Details & Links" },
          { id: "media", label: `Documentation (${galleryImages.length})` },
          { id: "features", label: "Features & Highlights" },
          { id: "settings", label: "Settings" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "border-accent-blue text-accent-blue bg-[#EEF0F8] rounded-t-xl"
                : "border-transparent text-[#5D536B] hover:text-[#272838]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: BASIC INFORMATION */}
      {activeTab === "basic" && (
        <div className="bg-white p-6 rounded-2xl border border-[#7D6B91]/15 shadow-card-subtle space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-1.5">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (isNew && !slug) {
                    setSlug(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)+/g, "")
                    );
                  }
                }}
                placeholder="e.g. Belajar Cerdas"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-1.5">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. belajar-cerdas"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] font-mono focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#272838] mb-1.5">
              Subtitle / Category Headline
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Integrated School Management Platform"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue focus:bg-white font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#272838] mb-1.5">
              Short Description (Card Summary) <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Brief summary visible on portfolio homepage cards..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue focus:bg-white font-medium resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#272838] mb-1.5">
              Full Project Case Study Description
            </label>
            <textarea
              rows={5}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="Comprehensive architectural description for dedicated case study page..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue focus:bg-white font-medium resize-none"
            />
          </div>
        </div>
      )}

      {/* Tab 2: DETAILS & LINKS */}
      {activeTab === "details" && (
        <div className="bg-white p-6 rounded-2xl border border-[#7D6B91]/15 shadow-card-subtle space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-1.5">
                Your Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Web Developer — Freelance"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-1.5">
                Timeline / Period
              </label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="e.g. Mar 2026 – Jun 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue focus:bg-white font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#272838]">
                  Category Type
                </label>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCategory("WEB")}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      category.toUpperCase() === "WEB"
                        ? "bg-[#347FC4] text-white"
                        : "bg-[#EEF0F8] text-[#5D536B] hover:text-[#272838]"
                    }`}
                  >
                    WEB
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory("DESIGN")}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      category.toUpperCase() === "DESIGN"
                        ? "bg-[#347FC4] text-white"
                        : "bg-[#EEF0F8] text-[#5D536B] hover:text-[#272838]"
                    }`}
                  >
                    DESIGN
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="WEB, DESIGN, or custom descriptor"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-1.5">
                Tools / Design Stack
              </label>
              <input
                type="text"
                value={tools}
                onChange={(e) => setTools(e.target.value)}
                placeholder="e.g. Figma, Canva, Responsive Web Design"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] font-mono focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-1.5">
                Technologies / Tech Stack (Comma Separated)
              </label>
              <input
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="e.g. Laravel, MySQL, JavaScript, Blade, Tailwind CSS"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] font-mono focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#7D6B91]/10 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-1.5">
                Live Website URL
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-[#5D536B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder="https://belajarcerdas.id"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] font-mono focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-1.5">
                GitHub Repository URL
              </label>
              <div className="relative">
                <Github className="w-4 h-4 text-[#5D536B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/ubaidlah773/..."
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] font-mono focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: MEDIA & DOCUMENTATION GALLERY */}
      {activeTab === "media" && (
        <div className="bg-white p-6 rounded-2xl border border-[#7D6B91]/15 shadow-card-subtle space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#7D6B91]/10">
            <div>
              <h3 className="text-sm font-bold text-[#272838]">Project Documentation Photos</h3>
              <p className="text-xs text-[#5D536B] mt-0.5">
                Upload screenshots, dashboard mockups, before/after images, and mobile layouts.
              </p>
            </div>
            <span className="text-xs font-mono text-accent-blue bg-accent-blue/10 border border-accent-blue/20 px-2.5 py-1 rounded-xl font-bold">
              {galleryImages.length} images attached
            </span>
          </div>

          <MediaUploader
            images={galleryImages}
            onChange={setGalleryImages}
            projectId={initialData?.id}
          />
        </div>
      )}

      {/* Tab 4: FEATURES & HIGHLIGHTS */}
      {activeTab === "features" && (
        <div className="bg-white p-6 rounded-2xl border border-[#7D6B91]/15 shadow-card-subtle space-y-6">
          {/* Key Features */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#7D6B91]/10">
              <span className="text-xs font-mono uppercase tracking-wider text-[#272838] font-bold">
                Key Features
              </span>
              <button
                type="button"
                onClick={addFeature}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 text-xs font-bold border border-accent-blue/20 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Feature</span>
              </button>
            </div>

            <div className="space-y-3">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/15 flex items-start gap-3"
                >
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={feat.title}
                      onChange={(e) => updateFeature(idx, "title", e.target.value)}
                      placeholder="Feature Title (e.g. Multi-Role Dashboard)"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#7D6B91]/25 text-xs font-bold text-[#272838] focus:outline-none focus:border-accent-blue"
                    />
                    <textarea
                      rows={2}
                      value={feat.description}
                      onChange={(e) => updateFeature(idx, "description", e.target.value)}
                      placeholder="Feature explanation and technical capability..."
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#7D6B91]/25 text-xs text-[#5D536B] focus:outline-none focus:border-accent-blue resize-none font-medium"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFeature(idx)}
                    className="p-2 text-[#5D536B] hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-4 pt-6 border-t border-[#7D6B91]/10">
            <div className="flex items-center justify-between pb-2 border-b border-[#7D6B91]/10">
              <span className="text-xs font-mono uppercase tracking-wider text-[#272838] font-bold">
                Quick Highlights (Bullet Points)
              </span>
              <button
                type="button"
                onClick={addHighlight}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 text-xs font-bold border border-accent-blue/20 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Highlight</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {highlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={hl}
                    onChange={(e) => updateHighlight(idx, e.target.value)}
                    placeholder="e.g. Multi-role dashboards engineered for 5 distinct stakeholders"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-xs text-[#272838] focus:outline-none focus:border-accent-blue font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(idx)}
                    className="p-2 text-[#5D536B] hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: SETTINGS */}
      {activeTab === "settings" && (
        <div className="bg-white p-6 rounded-2xl border border-[#7D6B91]/15 shadow-card-subtle space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] font-mono focus:outline-none focus:border-accent-blue font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-1.5">
                Mockup Template Style
              </label>
              <select
                value={mockupType}
                onChange={(e) => setMockupType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] focus:outline-none focus:border-accent-blue font-medium"
              >
                <option value="belajar-cerdas">School / LMS Dashboard</option>
                <option value="lapas-tuban">Public Sector / Database CRUD</option>
                <option value="queue-system">Real-Time Queue Monitor</option>
                <option value="demo-lpk">Vocational Training Center</option>
                <option value="demo-umroh">Travel &amp; Pilgrimage Portal</option>
                <option value="coffee-shop">Modern Café &amp; Ordering Experience</option>
                <option value="custom">Clean Architecture Card</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-[#7D6B91]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded border-[#7D6B91]/40 text-accent-blue focus:ring-accent-blue bg-white"
              />
              <div>
                <span className="text-xs font-bold text-[#272838] block">
                  Published to Live Portfolio
                </span>
                <span className="text-[11px] text-[#5D536B] block">
                  If unchecked, project stays in draft mode.
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-[#7D6B91]/40 text-accent-blue focus:ring-accent-blue bg-white"
              />
              <div>
                <span className="text-xs font-bold text-[#272838] block">
                  Featured Project Badge
                </span>
                <span className="text-[11px] text-[#5D536B] block">
                  Highlights project on homepage.
                </span>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { FileText, Save, CheckCircle2, Sparkles, Plus, Trash2 } from "lucide-react";

export default function AdminAboutEditorPage() {
  const [headline, setHeadline] = useState("");
  const [supportingCopy, setSupportingCopy] = useState("");
  const [eyebrow, setEyebrow] = useState("");
  const [aboutEditorial, setAboutEditorial] = useState("");
  const [aboutSummary, setAboutSummary] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.settings) {
          const s = data.settings;
          setHeadline(s.headline || "");
          setSupportingCopy(s.supportingCopy || "");
          setEyebrow(s.eyebrow || "");
          setAboutEditorial(s.aboutEditorial || "");

          try {
            setAboutSummary(
              typeof s.aboutSummary === "string"
                ? JSON.parse(s.aboutSummary)
                : s.aboutSummary || []
            );
          } catch {
            setAboutSummary([]);
          }
        }
      } catch (err) {
        console.error("Fetch settings error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headline,
          supportingCopy,
          eyebrow,
          aboutEditorial,
          aboutSummary: JSON.stringify(aboutSummary.filter((p) => p.trim())),
        }),
      });

      if (res.ok) {
        setSuccessMessage("Hero and About Me content updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3500);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  const addParagraph = () => setAboutSummary([...aboutSummary, ""]);
  const updateParagraph = (idx: number, val: string) => {
    const updated = [...aboutSummary];
    updated[idx] = val;
    setAboutSummary(updated);
  };
  const removeParagraph = (idx: number) => {
    setAboutSummary(aboutSummary.filter((_, i) => i !== idx));
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-palette-lavender/70 font-mono text-xs">
        Loading about and hero content...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#7D6B91]/15 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#272838] tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-accent-blue" />
            <span>Hero &amp; About Editor</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5D536B] mt-1 font-medium">
            Customize homepage hero headlines, editorial statements, and professional summaries.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold shadow-accent-sm disabled:opacity-50 transition-all w-fit cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs flex items-center gap-2 font-bold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Hero Settings */}
        <div className="p-6 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-card-subtle space-y-5">
          <h2 className="text-base font-bold text-[#272838] flex items-center gap-2 pb-3 border-b border-[#7D6B91]/10">
            <Sparkles className="w-4 h-4 text-accent-blue" />
            <span>Hero Section Content</span>
          </h2>

          <div>
            <label className="block text-xs font-semibold text-[#272838] mb-1.5">
              Small Eyebrow Tag
            </label>
            <input
              type="text"
              value={eyebrow}
              onChange={(e) => setEyebrow(e.target.value)}
              placeholder="FULL STACK DEVELOPER"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] font-mono focus:border-accent-blue focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#272838] mb-1.5">
              Main Headline
            </label>
            <textarea
              rows={2}
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Building practical web systems that solve real-world problems."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] font-bold focus:border-accent-blue focus:bg-white focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#272838] mb-1.5">
              Supporting Copy / Paragraph
            </label>
            <textarea
              rows={3}
              value={supportingCopy}
              onChange={(e) => setSupportingCopy(e.target.value)}
              placeholder="Full Stack Developer experienced in building and maintaining web applications..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#5D536B] leading-relaxed focus:border-accent-blue focus:bg-white focus:outline-none resize-none font-medium"
            />
          </div>
        </div>

        {/* Section 2: About Me Settings */}
        <div className="p-6 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-card-subtle space-y-5">
          <h2 className="text-base font-bold text-[#272838] flex items-center gap-2 pb-3 border-b border-[#7D6B91]/10">
            <FileText className="w-4 h-4 text-accent-blue" />
            <span>About Me Editorial &amp; Summary</span>
          </h2>

          <div>
            <label className="block text-xs font-semibold text-[#272838] mb-1.5">
              Left Column Editorial Statement
            </label>
            <textarea
              rows={3}
              value={aboutEditorial}
              onChange={(e) => setAboutEditorial(e.target.value)}
              placeholder="Engineering reliable, database-driven web platforms that bridge human workflows and robust backend architectures."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-sm text-[#272838] font-semibold focus:border-accent-blue focus:bg-white focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-3 pt-3 border-t border-[#7D6B91]/10">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[#272838]">
                Professional Summary Paragraphs
              </label>
              <button
                type="button"
                onClick={addParagraph}
                className="inline-flex items-center gap-1.5 text-xs text-accent-blue hover:underline font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add paragraph</span>
              </button>
            </div>

            <div className="space-y-3">
              {aboutSummary.map((p, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <textarea
                    rows={3}
                    value={p}
                    onChange={(e) => updateParagraph(idx, e.target.value)}
                    placeholder="Enter summary paragraph from verified career experience..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-xs text-[#5D536B] leading-relaxed focus:border-accent-blue focus:bg-white focus:outline-none resize-none font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => removeParagraph(idx)}
                    className="p-2 text-[#5D536B]/60 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

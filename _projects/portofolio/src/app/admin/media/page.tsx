"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Upload,
  Search,
  Copy,
  Check,
  Trash2,
  Edit2,
  ExternalLink,
  Calendar,
  Layers,
  X,
  FileCheck,
} from "lucide-react";

export default function AdminMediaLibraryPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Edit metadata modal
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [previewItem, setPreviewItem] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      setMedia(data.media || []);
    } catch (err) {
      console.error("Fetch media error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);

    try {
      const formData = new FormData();
      Array.from(e.target.files).forEach((f) => formData.append("files", f));

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        fetchMedia();
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const copyUrl = (id: string, url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const saveMetadata = async () => {
    if (!editingItem) return;
    try {
      const res = await fetch(`/api/media/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          altText: editingItem.altText,
          caption: editingItem.caption,
        }),
      });

      if (res.ok) {
        setEditingItem(null);
        fetchMedia();
      }
    } catch (err) {
      console.error("Save metadata error:", err);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media item?")) return;
    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMedia((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error("Delete media error:", err);
    }
  };

  const filtered = media.filter(
    (m) =>
      m.fileName.toLowerCase().includes(search.toLowerCase()) ||
      (m.altText && m.altText.toLowerCase().includes(search.toLowerCase())) ||
      (m.caption && m.caption.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-palette-secPurple/15 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-palette-primary tracking-tight flex items-center gap-2.5">
            <ImageIcon className="w-6 h-6 text-accent-blue" />
            <span>Media Library</span>
          </h1>
          <p className="text-xs sm:text-sm text-palette-darkSec/80 mt-1">
            Browse, upload, inspect, copy links, and manage project documentation photos.
          </p>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold shadow-sm disabled:opacity-50 transition-all w-fit cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>{uploading ? "Uploading..." : "Upload New Files"}</span>
          </button>
        </div>
      </div>

      {/* Search and Counts */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-palette-darkSec/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by file name or caption..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-palette-secPurple/20 text-xs text-palette-primary placeholder-palette-darkSec/40 focus:outline-none focus:border-accent-blue transition-colors shadow-sm"
          />
        </div>

        <span className="text-xs font-mono text-palette-darkSec/70 self-start sm:self-auto">
          Showing {filtered.length} of {media.length} media assets
        </span>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="text-center py-20 text-palette-darkSec/60 text-xs font-mono">
          Loading media library assets...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-palette-secPurple/15 p-8 shadow-sm">
          <ImageIcon className="w-10 h-10 text-palette-darkSec/40 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-palette-primary">No media items found</h3>
          <p className="text-xs text-palette-darkSec/80 mt-1 max-w-sm mx-auto">
            Upload project documentation screenshots or clear your search filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-palette-secPurple/15 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-palette-secPurple/30 shadow-sm transition-all"
            >
              {/* Image Preview Container */}
              <div
                onClick={() => setPreviewItem(item)}
                className="relative aspect-[16/10] bg-palette-altBg cursor-pointer overflow-hidden"
              >
                <Image
                  src={item.fileUrl}
                  alt={item.altText || item.fileName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>

              {/* Metadata Info */}
              <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-palette-primary block truncate" title={item.fileName}>
                    {item.fileName}
                  </span>
                  {item.altText && (
                    <span className="text-[11px] text-palette-darkSec/80 block truncate" title={item.altText}>
                      {item.altText}
                    </span>
                  )}
                  {item.caption && (
                    <span className="text-[10px] text-palette-darkSec/60 italic block truncate mt-0.5">
                      &quot;{item.caption}&quot;
                    </span>
                  )}
                </div>

                <div className="pt-2 border-t border-palette-secPurple/10 flex items-center justify-between text-[10px] font-mono text-palette-darkSec/70">
                  <span>{(item.fileSize / 1024).toFixed(0)} KB</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="px-3 pb-3 flex items-center justify-between gap-1 border-t border-palette-secPurple/10 pt-2">
                <button
                  type="button"
                  onClick={() => copyUrl(item.id, item.fileUrl)}
                  className="flex-1 py-1.5 px-2 rounded bg-palette-altBg hover:bg-palette-secPurple/10 text-[11px] text-palette-darkSec hover:text-palette-primary border border-palette-secPurple/15 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  title="Copy direct file URL"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-accent-blue" />
                      <span className="text-accent-blue font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>URL</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setEditingItem(item)}
                  className="p-1.5 rounded bg-palette-altBg hover:bg-palette-secPurple/10 text-palette-darkSec hover:text-palette-primary border border-palette-secPurple/15 transition-colors cursor-pointer"
                  title="Edit metadata"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => deleteItem(item.id)}
                  className="p-1.5 rounded bg-palette-altBg hover:bg-red-50 text-palette-darkSec hover:text-red-500 border border-palette-secPurple/15 transition-colors cursor-pointer"
                  title="Delete media"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Metadata Modal */}
      {editingItem && (
        <div
          className="fixed inset-0 z-50 bg-palette-primary/40 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border border-palette-secPurple/20 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-palette-secPurple/15">
              <h3 className="text-sm font-bold text-palette-primary">Edit Image Metadata</h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-palette-darkSec/60 hover:text-palette-primary cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-palette-darkSec/70 font-mono mb-1">File Name</label>
                <input
                  type="text"
                  disabled
                  value={editingItem.fileName}
                  className="w-full px-3 py-2 rounded-lg bg-palette-altBg/60 border border-palette-secPurple/15 text-palette-darkSec/60 font-mono text-xs cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-palette-darkSec font-semibold mb-1">Alt Text (Accessibility)</label>
                <input
                  type="text"
                  value={editingItem.altText || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, altText: e.target.value })}
                  placeholder="Descriptive alt text for screen readers..."
                  className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-palette-darkSec font-semibold mb-1">Caption</label>
                <textarea
                  rows={2}
                  value={editingItem.caption || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  placeholder="Caption displayed in public gallery lightbox..."
                  className="w-full px-3 py-2 rounded-lg bg-palette-altBg border border-palette-secPurple/20 text-palette-primary focus:border-accent-blue focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-palette-secPurple/15">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-palette-darkSec hover:bg-palette-altBg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveMetadata}
                className="px-4 py-1.5 rounded-lg bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold shadow-sm cursor-pointer transition-colors"
              >
                Save Metadata
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Preview Modal */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 bg-palette-primary/90 flex flex-col items-center justify-center p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewItem(null)}
        >
          <div className="relative max-w-4xl max-h-[80vh] w-full aspect-[16/10] overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
            <Image
              src={previewItem.fileUrl}
              alt={previewItem.altText || previewItem.fileName}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          <div
            className="mt-4 text-center max-w-lg space-y-1"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-bold text-sm text-white block">{previewItem.fileName}</span>
            {previewItem.caption && (
              <p className="text-xs text-palette-lavender">{previewItem.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

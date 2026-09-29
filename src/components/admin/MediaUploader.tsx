"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  X,
  Star,
  ArrowUp,
  ArrowDown,
  FileText,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  Edit2,
  Trash2,
} from "lucide-react";

export interface GalleryItem {
  id?: string;
  fileName: string;
  fileUrl: string;
  title?: string;
  altText: string;
  caption?: string;
  sortOrder: number;
  isCover: boolean;
  fileSize?: number;
  fileType?: string;
}

interface MediaUploaderProps {
  images: GalleryItem[];
  onChange: (images: GalleryItem[]) => void;
  projectId?: string;
}

export default function MediaUploader({ images, onChange, projectId }: MediaUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingImageIdx, setEditingImageIdx] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await uploadFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await uploadFiles(Array.from(e.target.files));
    }
  };

  const uploadFiles = async (files: File[]) => {
    setErrorMessage("");
    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));
      if (projectId) formData.append("projectId", projectId);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      const uploadedFiles = data.files || (data.file ? [data.file] : []);
      const newGalleryItems: GalleryItem[] = uploadedFiles.map((f: any, idx: number) => ({
        id: f.id,
        fileName: f.fileName,
        fileUrl: f.fileUrl,
        title: f.altText || f.fileName,
        altText: f.altText || "Project documentation interface",
        caption: f.caption || "",
        sortOrder: images.length + idx + 1,
        isCover: images.length === 0 && idx === 0, // auto set first uploaded image as cover
        fileSize: f.fileSize,
        fileType: f.fileType,
      }));

      onChange([...images, ...newGalleryItems]);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload file(s).");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    // If removed item was cover, ensure at least first remaining item is cover
    if (images[index].isCover && updated.length > 0) {
      updated[0].isCover = true;
    }
    // Re-index sortOrder
    const reindexed = updated.map((item, i) => ({ ...item, sortOrder: i + 1 }));
    onChange(reindexed);
    if (editingImageIdx === index) setEditingImageIdx(null);
  };

  const setCoverImage = (index: number) => {
    const updated = images.map((item, i) => ({
      ...item,
      isCover: i === index,
    }));
    onChange(updated);
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Update sortOrder
    const reindexed = updated.map((item, i) => ({ ...item, sortOrder: i + 1 }));
    onChange(reindexed);
  };

  const updateMetadata = (index: number, field: "title" | "altText" | "caption", value: string) => {
    const updated = [...images];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-accent-blue bg-accent-blue/10"
            : "border-[#7D6B91]/30 bg-[#F7F8FC] hover:bg-[#EEF0F8] hover:border-accent-blue/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue">
            {uploading ? (
              <div className="w-6 h-6 border-2 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>

          <div>
            <span className="text-sm font-bold text-[#272838] block">
              {uploading ? "Uploading and optimizing documentation..." : "Drag and drop project documentation photos"}
            </span>
            <span className="text-xs text-[#5D536B] block mt-1 font-medium">
              or <strong className="text-accent-blue font-bold">browse from your computer</strong> (JPG, JPEG, PNG, WEBP, SVG up to 10MB)
            </span>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Gallery Image List with Cover and Ordering Controls */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#7D6B91]/10 text-xs font-mono text-[#5D536B]">
            <span className="font-bold text-[#272838]">PROJECT GALLERY ({images.length} IMAGES)</span>
            <span>Starred image is used as public card cover</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {images.map((img, idx) => (
              <div
                key={img.id || idx}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all bg-white ${
                  img.isCover
                    ? "border-accent-blue ring-2 ring-accent-blue/30 shadow-card-subtle"
                    : "border-[#7D6B91]/15 shadow-card-subtle hover:border-accent-blue/40"
                }`}
              >
                {/* Thumbnail & Filename */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-[#EEF0F8] border border-[#7D6B91]/15 shrink-0">
                    <Image
                      src={img.fileUrl}
                      alt={img.altText || "Preview"}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-[#5D536B] font-bold">#{idx + 1}</span>
                      <span className="text-xs font-bold text-[#272838] truncate max-w-xs">
                        {img.title || img.fileName}
                      </span>
                      {img.isCover && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent-blue/10 text-accent-blue border border-accent-blue/20 flex items-center gap-1 font-bold">
                          <Star className="w-3 h-3 fill-accent-blue" />
                          COVER
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#5D536B] truncate mt-0.5">
                      Alt: {img.altText || "No alt text set"}
                    </span>
                    {img.caption && (
                      <span className="text-[11px] text-[#5D536B]/70 italic truncate mt-0.5">
                        &quot;{img.caption}&quot;
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions: Reorder, Set Cover, Edit Metadata, Delete */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                  {/* Reorder Up/Down */}
                  <button
                    type="button"
                    onClick={() => moveImage(idx, "up")}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg bg-[#F7F8FC] hover:bg-[#EEF0F8] text-[#5D536B] hover:text-[#272838] border border-[#7D6B91]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move up in gallery order"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveImage(idx, "down")}
                    disabled={idx === images.length - 1}
                    className="p-1.5 rounded-lg bg-[#F7F8FC] hover:bg-[#EEF0F8] text-[#5D536B] hover:text-[#272838] border border-[#7D6B91]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move down in gallery order"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Set Cover Toggle */}
                  <button
                    type="button"
                    onClick={() => setCoverImage(idx)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                      img.isCover
                        ? "bg-accent-blue text-white shadow-sm"
                        : "bg-[#F7F8FC] text-[#5D536B] hover:text-[#272838] hover:bg-[#EEF0F8] border border-[#7D6B91]/20"
                    }`}
                    title="Set as main cover image"
                  >
                    <Star className={`w-3.5 h-3.5 ${img.isCover ? "fill-white" : ""}`} />
                    <span className="hidden sm:inline">Cover</span>
                  </button>

                  {/* Edit Metadata Toggle */}
                  <button
                    type="button"
                    onClick={() => setEditingImageIdx(editingImageIdx === idx ? null : idx)}
                    className="p-1.5 rounded-lg bg-[#F7F8FC] hover:bg-[#EEF0F8] text-[#5D536B] hover:text-[#272838] border border-[#7D6B91]/20 transition-colors"
                    title="Edit image title, alt text, and caption"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete Image */}
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors"
                    title="Remove image from project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Expanded Metadata Editor Panel */}
                {editingImageIdx === idx && (
                  <div className="w-full pt-4 mt-3 border-t border-[#7D6B91]/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-[#5D536B] font-semibold mb-1">
                        Image Title
                      </label>
                      <input
                        type="text"
                        value={img.title || ""}
                        onChange={(e) => updateMetadata(idx, "title", e.target.value)}
                        placeholder="e.g. Student Timetable Screen"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/25 text-xs text-[#272838] focus:outline-none focus:border-accent-blue focus:bg-white font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#5D536B] font-semibold mb-1">
                        Accessibility Alt Text
                      </label>
                      <input
                        type="text"
                        value={img.altText}
                        onChange={(e) => updateMetadata(idx, "altText", e.target.value)}
                        placeholder="e.g. Student dashboard schedule interface"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/25 text-xs text-[#272838] focus:outline-none focus:border-accent-blue focus:bg-white font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#5D536B] font-semibold mb-1">
                        Public Gallery Caption
                      </label>
                      <input
                        type="text"
                        value={img.caption || ""}
                        onChange={(e) => updateMetadata(idx, "caption", e.target.value)}
                        placeholder="e.g. Weekly schedule collision prevention matrix."
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/25 text-xs text-[#272838] focus:outline-none focus:border-accent-blue focus:bg-white font-medium"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

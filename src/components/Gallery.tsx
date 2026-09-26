"use client";

import React, { useState } from "react";
import Image from "next/image";
import { gallery } from "@/config/siteConfig";
import { GalleryItem } from "@/types";
import {
  Sparkles,
  ZoomIn,
  X,
  Camera,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";

export const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = ["all", "Makkah", "Madinah", "Ibadah", "Transportasi"];

  const filteredPhotos = gallery.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category.toLowerCase() === activeFilter.toLowerCase();
  });

  const handleOpenPhoto = (item: GalleryItem) => {
    setSelectedPhoto(item);
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

  return (
    <section id="galeri" className="py-20 lg:py-28 bg-ivory-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-950 border border-emerald-200">
            <Camera className="w-3.5 h-3.5 text-gold-600" />
            <span>Dokumentasi Visual</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Galeri Suasana Ibadah
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Gambaran keagungan Tanah Suci, momen kekhusyukan jamaah, serta kesiapan
            fasilitas yang menyertai setiap langkah perjalanan ibadah.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold capitalize transition-all ${
                activeFilter === cat
                  ? "bg-emerald-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat === "all" ? "Semua Dokumentasi" : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => handleOpenPhoto(photo)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-card border border-slate-200/80 cursor-pointer bg-slate-900"
            >
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Dark Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent opacity-80 sm:opacity-60 group-hover:opacity-90 transition-opacity" />

              {/* Category Pill Top Left */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm border border-white/20">
                  {photo.category}
                </span>
              </div>

              {/* Zoom Icon Top Right */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Caption Bottom Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 text-white transform sm:translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="font-serif text-base font-bold leading-snug group-hover:text-gold-300 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-emerald-100/80 mt-1 line-clamp-2 leading-relaxed">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Disclaimer */}
        <div className="mt-10 max-w-xl mx-auto p-3.5 rounded-xl bg-white border border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            Foto dokumentasi bersifat ilustratif untuk kebutuhan demo presentasi website.
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full bg-emerald-950 rounded-3xl overflow-hidden shadow-2xl border border-gold-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              aria-label="Tutup gambar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation buttons */}
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              aria-label="Gambar sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              aria-label="Gambar berikutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Large Image */}
            <div className="relative h-[400px] sm:h-[500px] w-full bg-black">
              <Image
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1000px"
                className="object-contain"
              />
            </div>

            {/* Modal Caption */}
            <div className="p-6 bg-emerald-950 text-white border-t border-emerald-900">
              <span className="text-xs uppercase tracking-wider text-gold-400 font-bold block mb-1">
                {selectedPhoto.category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

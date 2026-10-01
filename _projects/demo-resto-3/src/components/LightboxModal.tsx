"use client";

import React, { useEffect, useCallback } from "react";
import { useModal } from "@/context/ModalContext";
import { GALLERY_ITEMS } from "@/data/gallery";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function LightboxModal() {
  const {
    isLightboxOpen,
    activeGalleryIndex,
    closeLightbox,
    nextLightboxImage,
    prevLightboxImage,
  } = useModal();

  const total = GALLERY_ITEMS.length;
  const currentItem = GALLERY_ITEMS[activeGalleryIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightboxImage(total);
      if (e.key === "ArrowLeft") prevLightboxImage(total);
    },
    [isLightboxOpen, closeLightbox, nextLightboxImage, prevLightboxImage, total]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isLightboxOpen || !currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-jawa-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 text-cream-50 animate-fade-in"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-sans">
            {currentItem.categoryLabel}
          </span>
          <span className="text-xs text-cream-300/50">•</span>
          <span className="text-xs font-sans text-cream-200/80">
            {activeGalleryIndex + 1} / {total}
          </span>
        </div>

        <button
          onClick={closeLightbox}
          className="p-2 rounded-full bg-jawa-900/80 hover:bg-jawa-800 text-cream-100 hover:text-white transition-colors border border-gold-500/20"
          aria-label="Tutup tampilan foto"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Center Image Container with Prev/Next buttons */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={() => prevLightboxImage(total)}
          className="absolute left-2 sm:left-4 z-10 p-2.5 sm:p-3 rounded-full bg-jawa-900/80 hover:bg-jawa-800 text-cream-100 hover:text-white border border-gold-500/30 transition-all shadow-heritage"
          aria-label="Foto sebelumnya"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* The Fullscreen Image */}
        <div className="max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentItem.imageUrl}
            alt={currentItem.title}
            className="max-w-full max-h-[72vh] object-contain rounded-sm shadow-2xl border border-gold-500/20"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={() => nextLightboxImage(total)}
          className="absolute right-2 sm:right-4 z-10 p-2.5 sm:p-3 rounded-full bg-jawa-900/80 hover:bg-jawa-800 text-cream-100 hover:text-white border border-gold-500/30 transition-all shadow-heritage"
          aria-label="Foto selanjutnya"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Caption */}
      <div className="text-center max-w-2xl mx-auto z-10">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-50">
          {currentItem.title}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-cream-200/80 font-light mt-1">
          {currentItem.description}
        </p>
      </div>
    </div>
  );
}

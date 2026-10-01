"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  Layers,
  Image as ImageIcon,
} from "lucide-react";

export interface GalleryImage {
  id: string;
  fileUrl: string;
  fileName: string;
  title?: string | null;
  altText: string;
  caption?: string | null;
  isCover?: boolean;
}

interface ProjectGalleryLightboxProps {
  images: GalleryImage[];
  projectTitle: string;
}

export default function ProjectGalleryLightbox({
  images,
  projectTitle,
}: ProjectGalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const activeImage = images[activeIndex] || images[0];

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") {
        setLightboxOpen(false);
        setIsZoomed(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    },
    [lightboxOpen, handlePrev, handleNext]
  );

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, handleKeyDown]);

  if (!images || images.length === 0) {
    return (
      <div className="rounded-2xl border border-[#7D6B91]/20 bg-white p-12 text-center text-[#5D536B] shadow-card-subtle">
        <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-30 text-accent-blue" />
        <p className="text-sm font-medium">No documentation images uploaded for this project yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Showcase Frame */}
      <div className="relative rounded-2xl border border-[#7D6B91]/20 bg-white overflow-hidden shadow-card-subtle group">
        {/* Top Info Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#7D6B91]/15 bg-white text-xs font-mono text-[#5D536B]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
            <span className="text-[#272838] font-bold">
              {activeImage.title || activeImage.fileName}
            </span>
            {activeImage.isCover && (
              <span className="px-2 py-0.5 rounded bg-accent-blue/15 text-accent-blue text-[10px] font-bold uppercase">
                Cover
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#5D536B]">
              {activeIndex + 1} / {images.length}
            </span>
            <button
              onClick={() => setLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F7F8FC] hover:bg-[#EEF0F8] text-[#5D536B] hover:text-[#272838] border border-[#7D6B91]/20 transition-colors cursor-pointer font-medium"
              title="Expand fullscreen lightbox"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="text-[11px]">Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Featured Image Viewer */}
        <div
          onClick={() => setLightboxOpen(true)}
          className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#F7F8FC] cursor-pointer overflow-hidden flex items-center justify-center p-2 sm:p-4"
        >
          <img
            src={activeImage.fileUrl}
            alt={activeImage.altText || activeImage.title || projectTitle}
            className="w-full h-full object-contain transform group-hover:scale-[1.01] transition-transform duration-300"
          />

          {/* Quick Floating Next/Prev on Hover */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-[#7D6B91]/30 text-[#272838] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-card-elevated"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-[#272838]" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-[#7D6B91]/30 text-[#272838] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-card-elevated"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-[#272838]" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#7D6B91]/20 text-xs font-mono text-accent-blue font-bold flex items-center gap-1.5 shadow-card-subtle">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Click to Enlarge</span>
          </div>
        </div>

        {/* Caption Banner */}
        {activeImage.caption && (
          <div className="p-4 bg-white border-t border-[#7D6B91]/15 text-sm text-[#5D536B]">
            <p className="font-mono text-xs text-[#272838] mb-1 uppercase tracking-wider font-bold">
              Architecture &amp; Documentation Note
            </p>
            <p>{activeImage.caption}</p>
          </div>
        )}
      </div>

      {/* Thumbnails Navigation Row */}
      {images.length > 1 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#989FCE]">
            <span className="flex items-center gap-1.5 font-bold text-[#F7F8FC]">
              <Layers className="w-3.5 h-3.5 text-accent-blue" />
              Documentation Gallery ({images.length} frames)
            </span>
            <span>Select frame to view</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {images.map((img, idx) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-[16/10] rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer bg-[#161722] p-1 ${
                  idx === activeIndex
                    ? "border-accent-blue ring-2 ring-accent-blue/30 scale-[1.02]"
                    : "border-[#7D6B91]/25 opacity-70 hover:opacity-100 hover:border-accent-blue/50"
                }`}
              >
                <img
                  src={img.fileUrl}
                  alt={img.altText || `Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                {img.isCover && (
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-accent-blue text-white text-[9px] font-mono font-bold shadow-sm">
                    COVER
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Interactive Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between"
        >
          {/* Lightbox Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 z-10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-accent-blue/20 text-accent-blue border border-accent-blue/30 font-semibold">
                {activeIndex + 1} of {images.length}
              </span>
              <h4 className="text-sm font-medium text-white truncate max-w-md hidden sm:block">
                {activeImage.title || activeImage.fileName}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsZoomed((prev) => !prev)}
                className="p-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white transition-colors cursor-pointer"
                title={isZoomed ? "Zoom out" : "Zoom in"}
              >
                {isZoomed ? (
                  <ZoomOut className="w-4 h-4" />
                ) : (
                  <ZoomIn className="w-4 h-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setLightboxOpen(false);
                  setIsZoomed(false);
                }}
                className="p-2 rounded-lg bg-white/[0.08] hover:bg-red-500/20 hover:text-red-400 text-white transition-colors cursor-pointer"
                title="Close lightbox (Escape)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image Viewport */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-auto select-none"
          >
            {/* Prev Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/[0.08] hover:bg-white/[0.2] border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/[0.08] hover:bg-white/[0.2] border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Main Stage Image */}
            <div
              onClick={() => setIsZoomed((prev) => !prev)}
              className={`transition-transform duration-300 max-h-[75vh] max-w-[90vw] cursor-${
                isZoomed ? "zoom-out" : "zoom-in"
              } ${isZoomed ? "scale-150 cursor-grab" : "scale-100"}`}
            >
              <img
                src={activeImage.fileUrl}
                alt={activeImage.altText || activeImage.title || projectTitle}
                className="max-h-[75vh] max-w-[90vw] object-contain rounded-lg shadow-2xl mx-auto"
              />
            </div>
          </div>

          {/* Lightbox Footer Bar with Caption and Thumbnails */}
          <div className="border-t border-white/10 bg-black/60 px-6 py-4 z-10 space-y-3">
            {activeImage.caption && (
              <p className="text-xs sm:text-sm text-neutral-300 text-center max-w-3xl mx-auto">
                <span className="font-mono text-accent-blue mr-2 font-semibold">
                  DOCUMENTATION:
                </span>
                {activeImage.caption}
              </p>
            )}

            {/* Bottom thumbnail strip */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 max-w-2xl mx-auto">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => {
                      setIsZoomed(false);
                      setActiveIndex(idx);
                    }}
                    className={`w-14 h-10 rounded-md overflow-hidden border transition-all flex-shrink-0 cursor-pointer ${
                      idx === activeIndex
                        ? "border-accent-blue ring-2 ring-accent-blue/40 opacity-100 scale-105"
                        : "border-white/15 opacity-50 hover:opacity-90"
                    }`}
                  >
                    <img
                      src={img.fileUrl}
                      alt={img.altText || `Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

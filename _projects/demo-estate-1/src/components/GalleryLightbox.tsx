"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  title: string;
}

export default function GalleryLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
  title,
}: GalleryLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md animate-in fade-in duration-200 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white z-10 py-2 border-b border-white/10">
        <div>
          <h3 className="font-editorial text-lg sm:text-xl text-white tracking-wide truncate max-w-xs sm:max-w-md">
            {title}
          </h3>
          <p className="text-xs text-white/60">
            Image {currentIndex + 1} of {images.length}
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={onNext}
              className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Display Image */}
        <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
          <Image
            src={images[currentIndex]}
            alt={`${title} - View ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1200px"
            priority
          />
        </div>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (idx < currentIndex) {
                for (let i = 0; i < currentIndex - idx; i++) onPrev();
              } else if (idx > currentIndex) {
                for (let i = 0; i < idx - currentIndex; i++) onNext();
              }
            }}
            className={`relative w-16 h-12 rounded overflow-hidden transition-all shrink-0 border-2 ${
              idx === currentIndex
                ? "border-lumea-accent opacity-100 scale-105"
                : "border-transparent opacity-50 hover:opacity-80"
            }`}
            aria-label={`Jump to photo ${idx + 1}`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

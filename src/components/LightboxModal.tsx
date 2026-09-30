"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function LightboxModal() {
  const { lightboxImage, closeLightbox } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    };
    if (lightboxImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [lightboxImage, closeLightbox]);

  const imageUrl = lightboxImage ? lightboxImage.image || (lightboxImage as any).imageUrl : "";

  return (
    <AnimatePresence>
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 bg-olive-950/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-4xl w-full flex flex-col items-center"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 p-2 text-cream-200 hover:text-white bg-olive-900/90 rounded-full border border-cream-200/20 hover:border-cream-100 transition-colors cursor-pointer"
              aria-label="Tutup foto"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Box */}
            <div className="relative w-full max-h-[75vh] h-[65vh] rounded-lg overflow-hidden border border-cream-200/20 shadow-editorial bg-olive-900">
              <Image
                src={imageUrl}
                alt={lightboxImage.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-contain"
              />
            </div>

            {/* Caption */}
            <div className="w-full mt-4 text-center">
              <span className="inline-block px-3 py-1 rounded-sm bg-olive-900 border border-cream-200/20 text-cream-300 font-mono text-[10px] uppercase tracking-widest mb-2">
                {lightboxImage.category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-cream-50 font-normal">
                {lightboxImage.title}
              </h3>
              <p className="text-xs sm:text-sm text-cream-200/80 mt-1 max-w-lg mx-auto font-light">
                {lightboxImage.description}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

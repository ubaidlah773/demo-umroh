"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
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
            className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-4xl w-full flex flex-col items-center"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 p-2 text-ivory-300 hover:text-white bg-charcoal-800/80 rounded-full border border-white/10 hover:border-gold-500/40 transition-colors"
              aria-label="Tutup foto"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Box */}
            <div className="relative w-full max-h-[75vh] h-[65vh] rounded-2xl overflow-hidden border border-gold-500/20 shadow-2xl bg-charcoal-900">
              <Image
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-contain"
              />
            </div>

            {/* Caption */}
            <div className="w-full mt-4 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                {lightboxImage.categoryLabel}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-ivory-100 font-medium">
                {lightboxImage.title}
              </h3>
              <p className="text-sm text-ivory-400 mt-1 max-w-lg mx-auto">
                {lightboxImage.description}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

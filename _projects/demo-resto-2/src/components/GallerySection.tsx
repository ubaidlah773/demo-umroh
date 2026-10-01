"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Sparkles, ArrowRight } from "lucide-react";
import { GALLERY_CATEGORIES, GALLERY_IMAGES, GalleryCategory } from "@/data/gallery";
import { useModal } from "@/context/ModalContext";

interface GallerySectionProps {
  isFullPage?: boolean;
}

export default function GallerySection({ isFullPage = false }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const { openLightbox } = useModal();

  const filteredImages =
    activeCategory === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  // If on homepage, limit to top 8 items with a link to full gallery
  const displayImages = isFullPage ? filteredImages : filteredImages.slice(0, 8);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-charcoal-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            CINEMATIC MOMENTS
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ivory-100 tracking-tight mb-4">
            Atmosphere & <span className="gold-gradient-text">Visual Gallery</span>
          </h2>
          <p className="text-base sm:text-lg text-ivory-300 font-light leading-relaxed">
            Tangkap kehangatan sudut interior, hidangan penuh cita rasa, dan serunya kebersamaan di D’Sultan Cafe Tuban.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gold-500 text-charcoal-950 font-semibold shadow-gold-glow"
                    : "bg-charcoal-800 text-ivory-300 hover:text-white hover:bg-charcoal-750 border border-charcoal-700"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid (Editorial / Masonry Style) */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence>
            {displayImages.map((image, idx) => (
              <motion.div
                layout
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => openLightbox(image)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-gold-500/15 hover:border-gold-500/50 shadow-charcoal-card ${
                  // Dynamic height based on aspect ratio for editorial feeling
                  image.aspect === "portrait"
                    ? "h-[360px] sm:h-[400px]"
                    : image.aspect === "square"
                    ? "h-[280px] sm:h-[320px]"
                    : "h-[260px] sm:h-[300px]"
                }`}
              >
                {/* Image */}
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-cinematic"
                />

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  {/* Top Category Badge */}
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-semibold tracking-wider uppercase text-gold-400">
                      {image.categoryLabel}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Title */}
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif text-lg text-ivory-100 font-medium leading-snug drop-shadow-md">
                      {image.title}
                    </h3>
                    <p className="text-xs text-ivory-400 font-light mt-1 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View Full Gallery Link if on Home */}
        {!isFullPage && (
          <div className="mt-14 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-charcoal-850 hover:bg-gold-500 text-ivory-100 hover:text-charcoal-950 border border-gold-500/30 font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm group"
            >
              <span>Explore Complete Gallery</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

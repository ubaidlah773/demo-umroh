"use client";

import React, { useState } from "react";
import { GALLERY_ITEMS } from "@/data/gallery";
import { useModal } from "@/context/ModalContext";
import { Maximize2, Sparkles, Image as ImageIcon } from "lucide-react";

export default function Gallery() {
  const { openLightbox } = useModal();
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "Semua Foto" },
    { id: "suasana", label: "Suasana Joglo" },
    { id: "kuliner", label: "Hidangan Autentik" },
    { id: "arsitektur", label: "Detail Arsitektur" },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    filter === "all" ? true : item.category === filter
  );

  return (
    <section id="galeri" className="py-20 sm:py-28 bg-cream-100 pattern-heritage relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-terracotta-500 text-xs font-sans uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dokumentasi Visual</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-jawa-950 tracking-tight">
            Galeri Suasana & Hidangan
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto my-3" />
          <p className="font-sans text-jawa-800/80 text-sm sm:text-base font-light leading-relaxed">
            Menangkap setiap sudut estetik arsitektur Joglo dan kelezatan hidangan khas Bale Rasa Tuban.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-1.5 rounded-sm text-xs font-sans uppercase tracking-wider font-medium transition-all ${
                filter === cat.id
                  ? "bg-jawa-900 text-cream-50 shadow-sm border border-gold-500/40"
                  : "bg-cream-50 text-jawa-800 hover:bg-cream-200 border border-jawa-900/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid: 2 columns on mobile, 3 columns on tablet/desktop */}
        <div className="columns-2 md:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {filteredItems.map((item, index) => {
            const originalIndex = GALLERY_ITEMS.findIndex((g) => g.id === item.id);
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(originalIndex)}
                className="group relative break-inside-avoid rounded-sm overflow-hidden bg-jawa-950 cursor-pointer border border-gold-500/20 hover:border-gold-500/60 shadow-heritage transition-all duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 block"
                />

                {/* Hover Editorial Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-jawa-950/90 via-jawa-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-5">
                  <div className="flex items-center justify-between text-gold-300 text-xs mb-1">
                    <span className="uppercase tracking-widest text-[10px] font-sans">
                      {item.categoryLabel}
                    </span>
                    <Maximize2 className="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="font-serif text-sm sm:text-lg font-bold text-cream-50 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="font-sans text-[11px] sm:text-xs text-cream-200/80 font-light line-clamp-2 mt-0.5 hidden sm:block">
                    {item.description}
                  </p>
                </div>

                {/* Mobile Tap Cue */}
                <div className="sm:hidden absolute bottom-2 right-2 p-1.5 rounded-full bg-jawa-950/60 text-cream-200 backdrop-blur-sm pointer-events-none">
                  <Maximize2 className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Prompt */}
        <div className="mt-10 text-center">
          <p className="text-xs text-jawa-700/70 font-sans inline-flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-terracotta-500" />
            <span>Klik gambar mana saja untuk melihat tampilan layar penuh (Lightbox).</span>
          </p>
        </div>

      </div>
    </section>
  );
}

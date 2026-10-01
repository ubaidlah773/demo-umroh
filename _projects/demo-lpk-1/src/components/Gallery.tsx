"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import { Camera, X } from "lucide-react";
import { GalleryItem } from "@/types";

export default function Gallery() {
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  return (
    <section id="dokumentasi" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
            {siteConfig.gallery.badge}
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 tracking-tight leading-tight mb-3">
            {siteConfig.gallery.headline}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {siteConfig.gallery.subheadline}
          </p>
        </div>

        {/* 6 Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.gallery.items.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group bg-slate-50 rounded-lg border border-slate-200 overflow-hidden cursor-pointer hover:border-navy-950 transition-colors"
            >
              <div className="relative h-56 w-full bg-slate-200 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 text-left">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 mb-1.5">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-navy-950">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-sm">
            <div className="relative max-w-3xl w-full bg-white rounded-lg overflow-hidden shadow-2xl">
              <button
                onClick={() => setActivePhoto(null)}
                aria-label="Tutup gambar"
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-navy-950 text-white hover:bg-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative h-80 sm:h-96 w-full bg-slate-100">
                <Image
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <div className="p-5 bg-white">
                <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 mb-2">
                  {activePhoto.category}
                </span>
                <h4 className="text-base font-bold text-navy-950 mb-1">
                  {activePhoto.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  {activePhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

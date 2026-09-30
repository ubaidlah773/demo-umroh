"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, Sparkles } from "lucide-react";
import { useModal } from "@/context/ModalContext";

interface GalleryPhoto {
  id: string;
  title: string;
  category: "Food" | "Space" | "People" | "Atmosphere";
  image: string;
  span: string; // Tailwind grid span
}

const GALLERY_ITEMS: GalleryPhoto[] = [
  {
    id: "gal-1",
    title: "Signature Gurame Madu Legit Over Open Fire",
    category: "Food",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    id: "gal-2",
    title: "Air-Conditioned Dining Hall & Table Setting",
    category: "Space",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: "gal-3",
    title: "Mie Goreng Seafood Wok Preparation",
    category: "Food",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: "gal-4",
    title: "Communal Table Conversations Across Generations",
    category: "People",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 md:col-span-1 row-span-2",
  },
  {
    id: "gal-5",
    title: "Rajungan Kare Tuban Coastal Flavors",
    category: "Food",
    image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: "gal-6",
    title: "Intimate Evening Ambient Lighting",
    category: "Atmosphere",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const { openLightbox } = useModal();

  const filtered =
    activeFilter === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.category === activeFilter);

  return (
    <section id="gallery" className="py-24 sm:py-36 bg-ivory-100 text-espresso-900 border-t border-espresso-900/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-600 block mb-3 font-medium">
              VISUAL CHRONICLES
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-espresso-900">
              MOMENTS & SPACES.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {["All", "Food", "Space", "People", "Atmosphere"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === cat
                    ? "bg-espresso-900 text-ivory-100 font-semibold shadow-sm"
                    : "bg-ivory-50 text-espresso-800 hover:bg-ivory-200 border border-espresso-900/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                openLightbox({
                  id: item.id,
                  title: item.title,
                  category: item.category,
                  image: item.image,
                  description: item.title,
                })
              }
              className={`relative rounded-3xl overflow-hidden border border-espresso-900/10 shadow-luxury group cursor-pointer bg-ivory-200 ${item.span}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Vignette on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-champagne-300 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl text-ivory-50 font-normal leading-snug max-w-sm">
                    {item.title}
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-full bg-ivory-100/20 backdrop-blur-md text-ivory-100 flex items-center justify-center flex-shrink-0">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

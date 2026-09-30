"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Maximize2 } from "lucide-react";
import { useModal } from "@/context/ModalContext";

type MagazineFilter = "ALL" | "FOOD" | "SPACE" | "PEOPLE" | "MOMENTS";

interface MagazinePhoto {
  id: string;
  title: string;
  category: MagazineFilter;
  layoutType: "large" | "small" | "portrait" | "wide";
  image: string;
  caption: string;
}

const MAGAZINE_PHOTOS: MagazinePhoto[] = [
  {
    id: "mag-1",
    title: "Sajian Ikan Bakar & Gurame Madu Legit",
    category: "FOOD",
    layoutType: "large",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    caption: "Olahan gurami segar bumbu madu karamel bakaran arang.",
  },
  {
    id: "mag-2",
    title: "Mie Goreng Seafood Wok",
    category: "FOOD",
    layoutType: "small",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    caption: "Mie kenyal dengan udang dan cumi segar.",
  },
  {
    id: "mag-3",
    title: "Rajungan Kare Khas Tuban",
    category: "FOOD",
    layoutType: "small",
    image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80",
    caption: "Kuah kare gurih kental beraroma rempah.",
  },
  {
    id: "mag-4",
    title: "Kebersamaan Meja Santap Keluarga",
    category: "PEOPLE",
    layoutType: "portrait",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
    caption: "Tawa dan obrolan hangat lintas generasi.",
  },
  {
    id: "mag-5",
    title: "Ruang Makan Luas & Nyaman Ber-AC",
    category: "SPACE",
    layoutType: "wide",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    caption: "Kapasitas tempat duduk fleksibel untuk berbagai acara.",
  },
  {
    id: "mag-6",
    title: "Momen Gathering Rekan Kerja",
    category: "MOMENTS",
    layoutType: "wide",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
    caption: "Jamuan makan siang dan santap malam bersama tim.",
  },
];

export default function Gallery() {
  const [filter, setFilter] = useState<MagazineFilter>("ALL");
  const { openLightbox } = useModal();

  const filtered =
    filter === "ALL"
      ? MAGAZINE_PHOTOS
      : MAGAZINE_PHOTOS.filter((p) => p.category === filter);

  return (
    <section id="gallery" className="py-24 sm:py-36 bg-cream-100 border-b border-olive-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-xs tracking-[0.24em] uppercase text-terracotta-500 font-semibold block mb-3">
              VISUAL JOURNAL
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-olive-900 tracking-tight leading-[0.96]">
              A LOOK INSIDE <br />
              <span className="italic font-serif text-sage-600">KAYU MANIS</span>
            </h2>
          </div>

          {/* Magazine Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {(["ALL", "FOOD", "SPACE", "PEOPLE", "MOMENTS"] as MagazineFilter[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-mono text-xs tracking-wider uppercase px-3.5 py-1.5 rounded-sm transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-olive-900 text-cream-50 font-semibold"
                    : "bg-cream-50 hover:bg-beige-100 text-olive-900/70 border border-olive-900/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Magazine Asymmetric Layout:
            Row 1: Large image (2 cols) + 2 small images (1 col stacked) + 1 portrait image
            Row 2: Wide image + wide image
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Large Image (col-span-6) */}
          {filtered[0] && (
            <div
              onClick={() => openLightbox(filtered[0] as any)}
              className="md:col-span-6 group relative rounded-sm overflow-hidden border border-olive-900/12 bg-cream-200 h-[380px] sm:h-[460px] cursor-pointer"
            >
              <Image
                src={filtered[0].image}
                alt={filtered[0].title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute top-4 left-4 font-mono text-[10px] text-olive-900 uppercase tracking-widest bg-cream-100/90 px-2.5 py-1 rounded-sm">
                {filtered[0].category}
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-cream-100/95 backdrop-blur-sm p-4 border-t border-olive-900/10 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg text-olive-900 font-medium">
                    {filtered[0].title}
                  </h3>
                  <p className="text-xs text-olive-900/60 font-light">
                    {filtered[0].caption}
                  </p>
                </div>
                <Maximize2 className="w-4 h-4 text-terracotta-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          )}

          {/* 2 Small Images Stacked (col-span-3) */}
          <div className="md:col-span-3 flex flex-col gap-6">
            {filtered.slice(1, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => openLightbox(item as any)}
                className="group relative rounded-sm overflow-hidden border border-olive-900/12 bg-cream-200 h-[180px] sm:h-[218px] cursor-pointer flex-1"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 left-3 font-mono text-[9px] text-olive-900 uppercase tracking-widest bg-cream-100/90 px-2 py-0.5 rounded-sm">
                  {item.category}
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-cream-100/90 p-2.5 border-t border-olive-900/10">
                  <h4 className="font-serif text-sm text-olive-900 truncate">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Portrait Image (col-span-3) */}
          {filtered[3] && (
            <div
              onClick={() => openLightbox(filtered[3] as any)}
              className="md:col-span-3 group relative rounded-sm overflow-hidden border border-olive-900/12 bg-cream-200 h-[380px] sm:h-[460px] cursor-pointer"
            >
              <Image
                src={filtered[3].image}
                alt={filtered[3].title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute top-4 left-4 font-mono text-[10px] text-olive-900 uppercase tracking-widest bg-cream-100/90 px-2.5 py-1 rounded-sm">
                {filtered[3].category}
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-cream-100/95 backdrop-blur-sm p-4 border-t border-olive-900/10">
                <h3 className="font-serif text-base text-olive-900 font-medium">
                  {filtered[3].title}
                </h3>
                <p className="text-xs text-olive-900/60 font-light truncate">
                  {filtered[3].caption}
                </p>
              </div>
            </div>
          )}

          {/* Wide Image (col-span-12) */}
          {filtered[4] && (
            <div
              onClick={() => openLightbox(filtered[4] as any)}
              className="md:col-span-12 group relative rounded-sm overflow-hidden border border-olive-900/12 bg-cream-200 h-[280px] sm:h-[340px] cursor-pointer"
            >
              <Image
                src={filtered[4].image}
                alt={filtered[4].title}
                fill
                sizes="100vw"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute top-4 left-4 font-mono text-[10px] text-olive-900 uppercase tracking-widest bg-cream-100/90 px-2.5 py-1 rounded-sm">
                {filtered[4].category}
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-cream-100/95 backdrop-blur-sm p-4 sm:p-5 border-t border-olive-900/10 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl text-olive-900 font-medium">
                    {filtered[4].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-olive-900/65 font-light">
                    {filtered[4].caption}
                  </p>
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-terracotta-500">
                  View Photo →
                </span>
              </div>
            </div>
          )}
        </div>

        {/* View Full Gallery Link */}
        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-olive-900 hover:text-terracotta-500 font-semibold group transition-colors"
          >
            <span>VIEW COMPLETE MAGAZINE ARCHIVE</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

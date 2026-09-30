"use client";

import React from "react";
import Image from "next/image";

export default function RestaurantStory() {
  const STORIES = [
    {
      label: "FAMILY",
      caption: "Moments worth sharing.",
      image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
      description: "Meja lapang yang menyatukan obrolan hangat lintas generasi.",
    },
    {
      label: "SEAFOOD",
      caption: "Fresh flavors from the sea.",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
      description: "Hasil tangkapan segar diolah dengan bumbu rempah Nusantara autentik.",
    },
    {
      label: "GATHER",
      caption: "Good food, good company.",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
      description: "Ruangan sejuk dan nyaman untuk makan bersama rekan kerja & rombongan.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-cream-50 border-t border-b border-olive-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="font-mono text-xs tracking-[0.24em] uppercase text-terracotta-500 font-semibold block mb-2">
              OUR ESSENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-olive-900 tracking-tight">
              A TABLE FOR EVERY STORY
            </h2>
          </div>
          <p className="font-mono text-xs text-olive-900/60 uppercase tracking-widest max-w-xs">
            TRADISI BERKUMPUL DAN MENIKMATI CITA RASA PESISIR TUBAN
          </p>
        </div>

        {/* 3 Images Horizontal Layout (No heavy card/shadow) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {STORIES.map((item, idx) => (
            <div key={idx} className="group flex flex-col">
              {/* Image Frame */}
              <div className="relative h-80 sm:h-96 w-full rounded-sm overflow-hidden bg-cream-200 border border-olive-900/10">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>

              {/* Caption */}
              <div className="mt-5">
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-terracotta-500 font-semibold block">
                  {item.label}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-olive-900 mt-1 mb-1.5">
                  {item.caption}
                </h3>
                <p className="text-xs sm:text-sm text-olive-900/65 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

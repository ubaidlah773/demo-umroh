"use client";

import React, { useState } from "react";
import { MENU_CATEGORIES, MENU_ITEMS, MenuCategory, MenuItem } from "@/data/menu";
import { RESTAURANT_INFO } from "@/data/restaurant";
import { Star, Search, Sparkles, MessageCircle } from "lucide-react";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-20 sm:py-28 bg-cream-100 pattern-heritage relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-terracotta-500 text-xs font-sans uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Daftar Hidangan</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-jawa-950 tracking-tight">
            Menu Khas Bale Rasa
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto my-3" />
          <p className="font-sans text-jawa-800/80 text-sm sm:text-base font-light leading-relaxed">
            Sajian kuliner tradisional Jawa pilihan yang diolah dari bahan segar dan bumbu rempah autentik.
          </p>
        </div>

        {/* Category Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-jawa-900/10">
          {/* Categories */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-sm text-xs font-sans uppercase tracking-wider font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-jawa-900 text-cream-50 shadow-sm border border-gold-500/40"
                    : "bg-cream-50 text-jawa-800 hover:bg-cream-200/80 border border-jawa-900/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-jawa-700/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari hidangan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-cream-50 border border-jawa-900/15 rounded-sm text-xs text-jawa-900 placeholder-jawa-700/50 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-cream-50 rounded-sm border border-gold-500/20 hover:border-gold-500/50 overflow-hidden shadow-heritage hover:shadow-heritage-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-jawa-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jawa-950/60 via-transparent to-transparent" />
                  
                  {/* Favorit Badge */}
                  {item.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-sm bg-terracotta-500 text-cream-50 text-[11px] font-sans uppercase tracking-wider font-semibold shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-cream-50" />
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 sm:p-6 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-terracotta-600 font-sans uppercase tracking-wider font-medium">
                    <span>{item.categoryLabel}</span>
                    {item.isFavorite && (
                      <span className="text-gold-600 font-serif italic text-xs">Paling Diminati</span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-jawa-950 group-hover:text-terracotta-600 transition-colors">
                    {item.name}
                  </h3>

                  <p className="font-sans text-jawa-800/80 text-sm font-light leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Price & Action Footer */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-jawa-900/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-jawa-700/60 font-sans block">
                    Harga
                  </span>
                  <span className="font-serif text-sm sm:text-base font-semibold text-terracotta-600">
                    {item.price}
                  </span>
                </div>

                <a
                  href={`https://wa.me/6285236473110?text=${encodeURIComponent(
                    `Halo Bale Rasa, saya ingin menanyakan ketersediaan menu: ${item.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-jawa-900/5 hover:bg-terracotta-500 hover:text-cream-50 text-jawa-800 text-xs font-sans font-medium transition-colors border border-jawa-900/10"
                  aria-label={`Tanya menu ${item.name} via WhatsApp`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Tanya Menu</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search Result */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-cream-50 rounded-sm border border-gold-500/20">
            <p className="font-serif text-xl text-jawa-800 mb-2">
              Tidak ada menu yang sesuai dengan pencarian Anda.
            </p>
            <p className="text-xs text-jawa-700/70 font-sans">
              Silakan coba kata kunci lain atau pilih kategori lain.
            </p>
          </div>
        )}

        {/* Price Transparency Note */}
        <div className="mt-12 text-center text-xs text-jawa-700/70 font-sans max-w-xl mx-auto border-t border-jawa-900/10 pt-6">
          * Kisaran harga rata-rata santap di Bale Rasa berkisar antara <strong>Rp25.000 – Rp50.000 / orang</strong>. Menu dapat berubah sesuai ketersediaan bahan segar harian.
        </div>

      </div>
    </section>
  );
}

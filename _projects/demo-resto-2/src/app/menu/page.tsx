"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Star, Utensils, ArrowLeft, MessageSquare } from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS, MenuCategory, MenuItem } from "@/data/menu";
import { useModal } from "@/context/ModalContext";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { openReservation } = useModal();

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-charcoal-950 text-ivory-100 pt-28 pb-24">
      {/* Top Banner & Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-5xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold-400 hover:text-gold-300 mb-6 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4 block mx-auto w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            EDITORIAL RESTAURANT MENU
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-ivory-100 tracking-tight mb-4">
            Taste the <span className="gold-gradient-text">D’Sultan Experience</span>
          </h1>

          <p className="text-base sm:text-lg text-ivory-300 font-light max-w-2xl mx-auto leading-relaxed">
            Koleksi hidangan nusantara, racikan kopi istimewa, panggangan steak, dan dessert manis. Seluruh menu diracik segar setiap hari dengan standar mutu terbaik di Tuban.
          </p>

          <p className="text-xs text-gold-400/90 mt-3 font-medium">
            Kisaran Harga: Rp25.000 – Rp95.000 / porsi • Bebas biaya pemesanan meja
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="sticky top-20 z-30 bg-charcoal-950/90 backdrop-blur-xl border-y border-charcoal-800/80 py-4 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gold-500 text-charcoal-950 font-semibold shadow-gold-glow"
                      : "bg-charcoal-850 text-ivory-300 hover:text-white hover:bg-charcoal-800 border border-charcoal-700/80"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-ivory-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari menu atau bahan..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-charcoal-850 border border-charcoal-700 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-xs text-ivory-100 placeholder-ivory-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Menu Cards List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-charcoal-900/50 rounded-3xl border border-charcoal-800 p-8">
            <Utensils className="w-12 h-12 text-gold-400 mx-auto mb-4 opacity-50" />
            <h3 className="font-serif text-2xl text-ivory-200 font-medium mb-2">
              Menu tidak ditemukan
            </h3>
            <p className="text-sm text-ivory-400 mb-6">
              Tidak ada menu yang sesuai dengan pencarian “{searchQuery}”. Coba kata kunci lain atau pilih kategori Semua Menu.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full bg-gold-500 text-charcoal-950 text-xs font-semibold uppercase tracking-wider"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.35 }}
                  className="group bg-charcoal-900 border border-gold-500/15 hover:border-gold-500/40 rounded-2xl overflow-hidden shadow-charcoal-card transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Food Image */}
                    <div className="relative h-56 w-full overflow-hidden bg-charcoal-800">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-cinematic"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-black/30" />

                      {/* Badges */}
                      <div className="absolute top-3.5 left-3.5 flex gap-2">
                        {item.isPopular && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-500 text-charcoal-950 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                            <Star className="w-3 h-3 fill-charcoal-950" />
                            Popular
                          </span>
                        )}
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-medium tracking-wide uppercase text-ivory-300">
                          {item.categoryLabel}
                        </span>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-charcoal-950/85 backdrop-blur-md border border-gold-500/30 text-gold-300 font-serif font-semibold text-sm">
                        {item.priceFormatted}
                      </div>
                    </div>

                    {/* Content Box */}
                    <div className="p-6">
                      <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ivory-100 group-hover:text-gold-300 transition-colors mb-2">
                        {item.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-ivory-400 font-light leading-relaxed line-clamp-3 mb-4">
                        {item.description}
                      </p>

                      {/* Tags */}
                      {item.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] text-ivory-400 bg-charcoal-800 px-2 py-0.5 rounded border border-charcoal-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="px-6 pb-6 pt-0 border-t border-charcoal-800/60 mt-2 flex items-center justify-between">
                    <span className="text-xs text-ivory-500 font-light">Freshly Prepared</span>
                    <button
                      onClick={() => openReservation(`Ingin menikmati: ${item.name}`)}
                      className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 font-medium cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Pesan untuk Meja →
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Bottom Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-charcoal-900 border border-gold-500/25 text-center max-w-4xl mx-auto shadow-elevated-card">
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ivory-100 mb-3">
            Ingin Mengadakan Jamuan Bersama di D'Sultan?
          </h3>
          <p className="text-sm text-ivory-300 max-w-xl mx-auto mb-6 font-light">
            Kami melayani reservasi rombongan arisan, pesta keluarga, reuni, dan gathering kantor dengan opsi paket prasmanan atau set menu spesial.
          </p>
          <button
            onClick={() => openReservation("Paket Gathering / Rombongan")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-wider transition-all shadow-gold-glow cursor-pointer"
          >
            Konsultasikan Reservasi Rombongan
          </button>
        </div>
      </main>
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { MENU_ITEMS } from "@/data/menu";

export default function SignatureMenuPreview() {
  // Filter popular signature items highlighted in prompt
  const popularDishes = MENU_ITEMS.filter((item) =>
    [
      "nasi-iga-bakar",
      "nasi-goreng-sultan",
      "nasi-campur-bali",
      "steak-sirloin",
      "nasi-lemak",
      "es-kopi-sultan",
      "gelato-artisan",
    ].includes(item.id)
  );

  return (
    <section id="menu-preview" className="py-20 sm:py-28 bg-charcoal-950 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              TASTE THE D’SULTAN EXPERIENCE
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ivory-100 tracking-tight">
              Pilihan Hidangan <span className="gold-gradient-text">Favorit Tamu</span>
            </h2>
            <p className="text-base sm:text-lg text-ivory-300 font-light mt-3 max-w-xl">
              Pilihan hidangan untuk setiap suasana — diracik dari bahan segar berkualitas tinggi dengan cita rasa istimewa.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal-850 hover:bg-gold-500 text-ivory-100 hover:text-charcoal-950 border border-gold-500/30 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm w-fit group"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDishes.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-charcoal-900 border border-gold-500/15 hover:border-gold-500/40 rounded-2xl overflow-hidden shadow-charcoal-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Food Image Container */}
                <div className="relative h-60 w-full overflow-hidden bg-charcoal-800">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-cinematic"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-black/30" />

                  {/* Category / Popular Badge */}
                  <div className="absolute top-4 left-4 flex gap-2">
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

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 right-4 px-3 py-1 rounded-lg bg-charcoal-950/80 backdrop-blur-md border border-gold-500/30 text-gold-300 font-serif font-semibold text-sm">
                    {item.priceFormatted}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6">
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ivory-100 group-hover:text-gold-300 transition-colors mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-ivory-400 font-light leading-relaxed line-clamp-2 mb-4">
                    {item.description}
                  </p>

                  {/* Tags */}
                  {item.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
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

              {/* Bottom CTA within card */}
              <div className="px-6 pb-6 pt-0 border-t border-charcoal-800/60 mt-2 flex items-center justify-between">
                <span className="text-xs text-ivory-500 font-light">Tersedia Setiap Hari</span>
                <Link
                  href="/menu"
                  className="text-xs text-gold-400 hover:text-gold-300 font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  Detail Menu →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner to Full Menu */}
        <div className="mt-16 text-center">
          <p className="text-sm text-ivory-400 mb-4">
            Ingin melihat varian masakan lain, racikan kopi, steak, dan hidangan penutup lengkap?
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-gold-glow"
          >
            Buka Halaman Menu Lengkap
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

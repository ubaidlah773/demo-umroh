"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Utensils, Flame, CheckCircle } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function FeaturedFood() {
  const { openReservation } = useModal();

  return (
    <section className="py-20 sm:py-28 bg-charcoal-900 border-y border-gold-500/10 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-coffee-900/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Food Description & CTA (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              <Flame className="w-3.5 h-3.5 text-gold-400" />
              CHEF’S MASTERPIECE
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ivory-100 leading-[1.15] mb-6">
              Made to be <span className="gold-gradient-text">Enjoyed</span>
            </h2>

            <div className="mb-6">
              <span className="font-serif text-2xl sm:text-3xl font-medium text-gold-300 block mb-2">
                Nasi IGA Bakar Sultan
              </span>
              <p className="text-base text-ivory-300 font-light leading-relaxed">
                Potongan iga sapi premium dengan kelembutan daging yang meleleh di mulut, dimarinasi rempah tradisional selama berjam-jam lalu dipanggang karamelisasi di atas arang menyala.
              </p>
            </div>

            {/* Flavor Attributes */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-ivory-200">
                  <strong className="text-ivory-100">Bumbu Karamelisasi Gurih-Manis:</strong> Lapisan kecap rempah pilihan meresap sempurna hingga ke serat tulang terdalam.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-ivory-200">
                  <strong className="text-ivory-100">Sambal Terasi Bakar & Lalapan Segar:</strong> Tingkat kepedasan pas yang memicu nafsu makan, dilengkapi emping melinjo renyah.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-ivory-200">
                  <strong className="text-ivory-100">Kuah Kaldu Gurih Hangat:</strong> Disajikan dengan semangkuk sup kaldu bening kaya aroma rempah pala dan daun bawang.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => openReservation("Indoor Dining (AC)")}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-gold-glow cursor-pointer"
              >
                <Utensils className="w-4 h-4" />
                Reserve Table for Dinner
              </button>
              <div className="text-left">
                <span className="text-xs text-ivory-500 block">Harga Sajian</span>
                <span className="font-serif text-xl text-gold-300 font-semibold">Rp68.000</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Large Food Photography Hero (7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <div className="relative h-[380px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden border border-gold-500/25 shadow-elevated-card group">
              <Image
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=85"
                alt="Nasi Iga Bakar Sultan Tuban"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-cinematic"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-black/20" />

              {/* Floating Chef Tag */}
              <div className="absolute top-6 right-6 px-4 py-2 rounded-xl glass-panel text-right">
                <div className="inline-flex items-center gap-1.5 text-gold-400 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Most Ordered Dish
                </div>
                <p className="text-[11px] text-ivory-300">Rekomendasi Utama Pengunjung</p>
              </div>

              {/* Floating Taste Quote */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel text-ivory-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gold-300 font-medium">Autentik & Lembut</p>
                  <p className="text-xs text-ivory-300">Daging empuk lepas dari tulang tanpa perlawanan.</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30">
                  Rating 4.9/5
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

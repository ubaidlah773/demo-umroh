"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurant";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-charcoal-950 relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-forest-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-wood-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Large Image 60% (col-span-7) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="relative h-[380px] sm:h-[480px] lg:h-[560px] rounded-lg overflow-hidden border border-gold-500/20 shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85"
                alt="Suasana Resto Kayu Manis Tuban"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-black/20" />

              {/* Location Badge on Image */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs bg-forest-950/90 backdrop-blur-md border border-gold-500/30 p-4 rounded-md">
                <p className="text-[11px] font-semibold text-gold-400 uppercase tracking-widest">
                  Lokasi Strategis Tuban
                </p>
                <p className="text-xs text-ivory-200 mt-1 leading-snug">
                  Jl. Basuki Rachmad (Satu kawasan dengan Favehotel Tuban).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text 40% (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold mb-3">
              MORE THAN A MEAL
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ivory-100 leading-tight mb-6">
              A PLACE TO GATHER
            </h2>

            <p className="text-base sm:text-lg text-ivory-200/90 leading-relaxed font-light mb-4">
              Resto Kayu Manis menghadirkan beragam hidangan seafood dan menu Nusantara dalam suasana yang nyaman untuk keluarga, teman, maupun rekan kerja.
            </p>

            <p className="text-sm sm:text-base text-sand-300/90 leading-relaxed mb-8">
              With spacious dining areas, comfortable rooms, and a convenient location in Tuban, every visit is made for good food and good company.
            </p>

            {/* Small Stats Grid (Exact 3 items required by prompt) */}
            <div className="grid grid-cols-3 gap-4 border-t border-b border-white/10 py-6 mb-8">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-gold-400">
                  1,900+
                </p>
                <p className="text-xs text-sand-300 mt-0.5 uppercase tracking-wider">
                  Guest Reviews
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <p className="font-serif text-2xl sm:text-3xl font-semibold text-gold-400">
                    4.4
                  </p>
                  <Star className="w-4 h-4 fill-gold-400 text-gold-400 -mt-1" />
                </div>
                <p className="text-xs text-sand-300 mt-0.5 uppercase tracking-wider">
                  Google Rating
                </p>
              </div>

              <div>
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-gold-400">
                  Daily
                </p>
                <p className="text-xs text-sand-300 mt-0.5 uppercase tracking-wider">
                  Dining Experience
                </p>
              </div>
            </div>

            {/* Link to Menu */}
            <div>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-gold-400 hover:text-gold-300 group transition-colors"
              >
                <span>Lihat Aneka Pilihan Hidangan</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

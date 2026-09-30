"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FeaturedDish() {
  return (
    <section className="py-24 sm:py-32 bg-wood-950/60 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Text Content (Left, 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-terracotta-500/20 border border-terracotta-500/40 text-terracotta-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE TASTE OF THE SEA</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ivory-100 leading-[1.1] mb-6">
              Gurami <br />
              <span className="copper-gradient-text">Asam Manis</span>
            </h2>

            <p className="text-base sm:text-lg text-ivory-200/90 leading-relaxed font-light mb-4">
              Freshly prepared with rich flavors, balanced sweetness, and the comforting taste of Indonesian dining.
            </p>

            <p className="text-sm sm:text-base text-sand-300/80 leading-relaxed mb-8">
              Ikan gurami segar digoreng hingga renyah keemasan, disajikan dengan saus asam manis spesial bertabur potongan nanas segar, paprika renyah, dan irisan bawang bombay yang menggugah selera keluarga.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-md bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-sm uppercase tracking-wider transition-all duration-200 shadow-gold-glow hover:shadow-gold-glow-lg group"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Large Asymmetric Image (Right, 7 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 order-1 lg:order-2 relative"
          >
            <div className="relative h-[360px] sm:h-[460px] lg:h-[540px] rounded-lg overflow-hidden border border-gold-500/25 shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1400&q=85"
                alt="Gurami Asam Manis - Resto Kayu Manis Tuban"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-black/20" />

              {/* Floating Culinary Tag */}
              <div className="absolute bottom-6 right-6 bg-wood-950/90 backdrop-blur-md border border-gold-500/30 px-5 py-3 rounded-md shadow-xl text-right">
                <p className="text-[11px] font-semibold text-gold-400 uppercase tracking-widest">
                  Seafood Specialty
                </p>
                <p className="text-sm font-serif text-ivory-100 font-medium">
                  Fresh Catch • Hidangan Terfavorit
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

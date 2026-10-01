"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Utensils, Star } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { CAFE_INFO } from "@/data/cafeInfo";

export default function Hero() {
  const { openReservation } = useModal();

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-charcoal-950 pt-20 pb-16">
      {/* Background Image with Slow Zoom Animation & Subtle Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
            alt="D'Sultan Cafe Tuban atmosphere"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.4] contrast-[1.1]"
          />
        </motion.div>

        {/* Cinematic Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-charcoal-950/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-charcoal-950/90 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            Modern Tropical Dining
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-charcoal-900/60 border border-white/10 text-ivory-300 text-xs font-medium backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
            Ronggomulyo, Tuban
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-charcoal-900/60 border border-white/10 text-ivory-300 text-xs font-medium backdrop-blur-md">
            <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
            {CAFE_INFO.googleReviews.rating} / 5 ({CAFE_INFO.googleReviews.totalReviews})
          </span>
        </motion.div>

        {/* Small Cafe Label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif italic text-lg sm:text-xl text-gold-400 tracking-wide mb-2"
        >
          D’SULTAN CAFE & RESTO
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-ivory-100 leading-[1.12] mb-6 max-w-4xl"
        >
          Good Food. <br className="hidden sm:inline" />
          <span className="gold-gradient-text">Great Atmosphere.</span> <br />
          Memorable Moments.
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg text-ivory-300 max-w-2xl font-light leading-relaxed mb-10 text-balance"
        >
          {CAFE_INFO.subTagline} Nikmati perpaduan kuliner istimewa, racikan kopi artisan, ruang indoor & outdoor yang asri, serta live music yang menghidupkan malam Anda.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-sm uppercase tracking-wider transition-all duration-200 shadow-gold-glow hover:shadow-gold-glow-lg group"
          >
            <Utensils className="w-4 h-4" />
            Explore Menu
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            onClick={() => openReservation()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-charcoal-900/80 hover:bg-charcoal-800 text-ivory-100 border border-gold-500/30 hover:border-gold-500 font-medium text-sm tracking-wide transition-all backdrop-blur-md cursor-pointer"
          >
            Reserve a Table
          </button>
        </motion.div>

        {/* Subtle Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-14 sm:mt-16 flex flex-col items-center"
        >
          <a
            href="#quick-info"
            className="text-[11px] uppercase tracking-[0.25em] text-ivory-400 hover:text-gold-400 transition-colors flex flex-col items-center gap-1.5"
          >
            <span>Scroll to explore</span>
            <span className="text-gold-400 animate-bounce">↓</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

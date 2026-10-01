"use client";

import React from "react";
import Link from "next/link";
import { RESTAURANT_INFO } from "@/data/restaurant";
import { useModal } from "@/context/ModalContext";
import { MapPin, Clock, ArrowRight, Utensils, Calendar } from "lucide-react";

export default function Hero() {
  const { openReservation } = useModal();

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-jawa-950"
    >
      {/* Background Image with slow cinematic zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=2000&q=85"
          alt="Suasana Joglo Tradisional Bale Rasa Tuban Sore Hari"
          fetchPriority="high"
          className="w-full h-full object-cover object-center animate-slow-zoom"
        />

        {/* Multi-layered Dark Vignette & Gradient Overlay for pristine editorial legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-jawa-950 via-jawa-950/65 to-jawa-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-jawa-950/80 via-transparent to-jawa-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-jawa-950/30 to-jawa-950/90" />
      </div>

      {/* Subtle warm light glow particles / ambient bokeh */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-gold-400/15 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-terracotta-500/15 blur-3xl" />
      </div>

      {/* Editorial Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 flex flex-col items-center">
        {/* Top Badges / Micro Pill Information */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-jawa-900/80 backdrop-blur-md border border-gold-500/30 text-cream-100 text-xs sm:text-sm font-sans mb-6 sm:mb-8 animate-fade-in shadow-lg">
          <div className="flex items-center gap-1.5 text-gold-300">
            <MapPin className="w-3.5 h-3.5 text-terracotta-400" />
            <span className="font-medium">Merakurak, Tuban</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-gold-400/50" />
          <div className="flex items-center gap-1.5 text-cream-200">
            <Clock className="w-3.5 h-3.5 text-gold-400" />
            <span>Open Today · 10.00–21.00</span>
          </div>
        </div>

        {/* Brand Name Headline */}
        <div className="space-y-2 mb-4">
          <span className="block text-xs sm:text-sm uppercase tracking-[0.35em] text-gold-300 font-sans font-medium">
            Restoran Tradisional Jawa
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-cream-50 uppercase drop-shadow-md">
            {RESTAURANT_INFO.name}
          </h1>
        </div>

        {/* Tagline & Subheading */}
        <div className="max-w-2xl mx-auto space-y-3 mb-8 sm:mb-10">
          <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-blue-400 font-normal tracking-wide drop-shadow-sm">
            “{RESTAURANT_INFO.tagline}”
          </p>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto my-3" />
          <p className="font-sans text-cream-200/90 text-sm sm:text-base md:text-lg font-light tracking-wide max-w-xl mx-auto leading-relaxed">
            “{RESTAURANT_INFO.taglineSub}”
          </p>
        </div>

        {/* Dual Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto">
          <Link
            href="#menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm bg-gradient-to-r from-cream-100 to-cream-200 text-jawa-950 font-sans text-xs uppercase tracking-widest font-semibold hover:from-white hover:to-cream-100 transition-all duration-300 shadow-md hover:shadow-heritage active:scale-[0.98] border border-gold-300/40 group"
          >
            <Utensils className="w-4 h-4 text-terracotta-600 transition-transform group-hover:scale-110" />
            <span>Lihat Menu</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <button
            onClick={openReservation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-cream-50 font-sans text-xs uppercase tracking-widest font-semibold hover:from-terracotta-600 hover:to-terracotta-700 transition-all duration-300 shadow-md hover:shadow-heritage active:scale-[0.98] border border-gold-400/30"
          >
            <Calendar className="w-4 h-4" />
            <span>Reservasi Meja</span>
          </button>
        </div>

        {/* Quick Social Proof Footer Strip */}
        <div className="mt-12 sm:mt-16 flex items-center justify-center gap-6 text-xs text-cream-200/70 border-t border-gold-500/20 pt-6 max-w-lg w-full">
          <div className="flex items-center gap-1.5">
            <span className="text-gold-400 font-bold">★ 4.7</span>
            <span>Google Rating</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-cream-200/30" />
          <div>422+ Ulasan Pelanggan</div>
          <span className="w-1 h-1 rounded-full bg-cream-200/30" />
          <div className="text-gold-300">Suasana Joglo Asri</div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 text-cream-200/60 hover:text-gold-300 transition-colors">
        <span className="text-[10px] uppercase tracking-[0.2em] font-sans">Gulir ke bawah</span>
        <div className="w-4 h-7 rounded-full border border-cream-200/30 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-gold-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Utensils, Sparkles } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import HeroBookingShortcut from "./HeroBookingShortcut";

export default function Hero() {
  const { openReservation } = useModal();

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-32 pb-12 sm:pb-16 bg-espresso-950 text-ivory-100 overflow-hidden">
      {/* Cinematic Background Image with Editorial Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85"
          alt="Resto Kayu Manis Luxury Dining"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-102 filter brightness-[0.42] contrast-[1.08]"
        />
        {/* Subtle vignette gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/40 to-espresso-950/70" />
        <div className="absolute inset-0 pattern-texture opacity-30 pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory-100/10 border border-champagne-500/30 backdrop-blur-md mb-8">
          <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
          <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-champagne-300 font-medium">
            EST. 2026 · FINE DINING EXPERIENCE
          </span>
        </div>

        {/* Hero Headline (Cormorant Garamond 72 - 110px) */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-normal tracking-tight text-ivory-50 leading-[0.94] mb-8 text-balance">
          WHERE <br />
          EVERY MEAL <br />
          <span className="italic font-serif text-champagne-400">BECOMES A MEMORY.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-ivory-200/85 font-light leading-relaxed max-w-2xl mx-auto mb-10 text-balance">
          An elevated dining experience crafted around exceptional food, warm hospitality, and unforgettable moments in Tuban, East Java.
        </p>

        {/* Hero Primary & Secondary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={() => openReservation()}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-champagne-500 hover:bg-champagne-400 text-espresso-950 font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-champagne-glow cursor-pointer active:scale-95 flex items-center justify-center gap-2.5"
          >
            <Utensils className="w-4 h-4" />
            <span>BOOK A TABLE</span>
          </button>

          <Link
            href="/menu"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-ivory-100/10 hover:bg-ivory-100/20 text-ivory-100 border border-ivory-100/20 font-mono text-xs uppercase tracking-[0.2em] font-medium transition-colors backdrop-blur-sm flex items-center justify-center gap-2 group"
          >
            <span>EXPLORE MENU</span>
            <ArrowRight className="w-3.5 h-3.5 text-champagne-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Hero Booking Shortcut (Section 08) */}
      <div className="relative z-20 w-full mt-4">
        <HeroBookingShortcut />
      </div>
    </section>
  );
}

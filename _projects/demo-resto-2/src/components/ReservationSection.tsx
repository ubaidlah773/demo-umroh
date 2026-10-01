"use client";

import React from "react";
import Image from "next/image";
import { Phone, UtensilsCrossed, Sparkles } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { CAFE_INFO } from "@/data/cafeInfo";

export default function ReservationSection() {
  const { openReservation } = useModal();

  return (
    <section className="relative py-24 sm:py-32 bg-charcoal-950 overflow-hidden">
      {/* Background Image with Dark Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
          alt="Suasana malam D'Sultan Cafe"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/80 to-charcoal-950" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-[0.25em] uppercase mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          HOSPITALITY AWAITS
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ivory-100 leading-[1.15] mb-6">
          Your Table is <span className="gold-gradient-text">Waiting</span>
        </h2>

        <p className="text-base sm:text-xl text-ivory-300 font-light leading-relaxed max-w-2xl mx-auto mb-10 text-balance">
          Plan your next meal, gathering, or special evening at D’Sultan. Baik untuk santap keluarga, arisan, rapat kerja, maupun nongkrong menikmati musik.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openReservation()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-gold-glow hover:shadow-gold-glow-lg cursor-pointer transform hover:-translate-y-0.5"
          >
            <UtensilsCrossed className="w-4 h-4" />
            Reserve a Table
          </button>

          <a
            href={CAFE_INFO.contact.phone}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-charcoal-900/80 hover:bg-charcoal-800 text-ivory-200 hover:text-white border border-gold-500/30 font-medium text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
          >
            <Phone className="w-4 h-4 text-gold-400" />
            Call {CAFE_INFO.contact.phoneFormatted}
          </a>
        </div>

        <p className="text-xs text-ivory-500 mt-6">
          Reservasi via WhatsApp otomatis tanpa biaya pemesanan muka • Konfirmasi cepat oleh tim D’Sultan
        </p>
      </div>
    </section>
  );
}

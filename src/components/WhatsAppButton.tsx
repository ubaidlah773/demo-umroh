"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RESTAURANT_INFO } from "@/data/restaurant";
import { useModal } from "@/context/ModalContext";
import { MessageCircle, Calendar, Utensils, MapPin, X } from "lucide-react";

export default function WhatsAppButton() {
  const { openReservation } = useModal();
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* 1. FLOATING WHATSAPP BUTTON (DESKTOP & TABLET / ALWAYS VISIBLE) */}
      <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-6 z-40 flex items-end flex-col gap-2">
        {/* Subtle Chat Greeting Tooltip */}
        {showTooltip && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-sm bg-jawa-950 text-cream-50 text-xs font-sans border border-gold-500/40 shadow-heritage animate-fade-in relative max-w-xs">
            <span className="font-serif italic text-gold-300">
              Ada yang bisa dibantu? Tanya atau reservasi meja di sini.
            </span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-cream-300 hover:text-white ml-1"
              aria-label="Tutup petunjuk"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* The Button */}
        <a
          href={RESTAURANT_INFO.links.whatsappReservation}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-heritage-lg hover:shadow-gold-glow transition-all duration-300 active:scale-95"
          aria-label="Hubungi WhatsApp Bale Rasa Tuban"
        >
          {/* Subtle Ping Animation */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white"></span>
          </span>

          <MessageCircle className="w-7 h-7 fill-white text-white group-hover:scale-110 transition-transform" />
        </a>
      </div>

      {/* 2. STICKY BOTTOM NAVIGATION BAR FOR MOBILE */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-jawa-950/95 backdrop-blur-md border-t border-gold-500/25 px-2 py-2 shadow-2xl flex items-center justify-around">
        <Link
          href="#menu"
          className="flex flex-col items-center justify-center py-1 px-3 text-cream-200/80 hover:text-gold-300 transition-colors"
        >
          <Utensils className="w-4 h-4 text-gold-400 mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider font-sans font-medium">Menu</span>
        </Link>

        <button
          onClick={openReservation}
          className="flex flex-col items-center justify-center py-1 px-4 text-cream-50 bg-terracotta-500 rounded-sm font-sans shadow-sm"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">Reservasi</span>
        </button>

        <Link
          href="#lokasi"
          className="flex flex-col items-center justify-center py-1 px-3 text-cream-200/80 hover:text-gold-300 transition-colors"
        >
          <MapPin className="w-4 h-4 text-terracotta-400 mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider font-sans font-medium">Rute</span>
        </Link>

        <a
          href={RESTAURANT_INFO.links.whatsappReservation}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-3 text-[#25D366] transition-colors"
        >
          <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366] mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider font-sans font-medium">Chat</span>
        </a>
      </div>
    </>
  );
}

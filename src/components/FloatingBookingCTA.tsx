"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Utensils, BookOpen, Phone, Calendar } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { RESTAURANT_INFO } from "@/data/restaurant";

export default function FloatingBookingCTA() {
  const { openReservation } = useModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating CTA after scrolling past hero (approx 350px)
      setVisible(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Desktop Bottom-Right Floating CTA */}
      <div className="hidden lg:block fixed bottom-8 right-8 z-40">
        <button
          onClick={() => openReservation()}
          className="px-7 py-4 rounded-full bg-espresso-900 hover:bg-champagne-600 text-ivory-100 font-mono text-xs uppercase tracking-[0.2em] font-semibold shadow-2xl hover:shadow-champagne-glow border border-champagne-500/30 transition-all duration-300 flex items-center gap-3 cursor-pointer group active:scale-95"
        >
          <div className="w-2 h-2 rounded-full bg-champagne-400 group-hover:scale-125 transition-transform" />
          <span>BOOK A TABLE</span>
        </button>
      </div>

      {/* Mobile Sticky Bottom Navigation (Section 30 Requirements: MENU | BOOK A TABLE | CONTACT) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-4 inset-x-4 z-40 pointer-events-none"
      >
        <div className="max-w-md mx-auto pointer-events-auto p-2 rounded-full bg-espresso-950/95 backdrop-blur-xl border border-champagne-500/30 shadow-2xl grid grid-cols-3 gap-1.5 items-center">
          {/* Menu Link */}
          <Link
            href="/menu"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-ivory-200 hover:text-white hover:bg-espresso-800 font-mono text-[10px] uppercase tracking-wider transition-colors active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5 text-champagne-400" />
            <span>MENU</span>
          </Link>

          {/* Center Primary Action: BOOK A TABLE */}
          <button
            onClick={() => openReservation()}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-champagne-500 hover:bg-champagne-400 text-espresso-950 font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>BOOK A TABLE</span>
          </button>

          {/* Contact / Location Link */}
          <Link
            href="/#contact"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-ivory-200 hover:text-white hover:bg-espresso-800 font-mono text-[10px] uppercase tracking-wider transition-colors active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 text-champagne-400" />
            <span>CONTACT</span>
          </Link>
        </div>
      </nav>
    </>
  );
}

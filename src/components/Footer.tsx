"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, MapPin, Phone, Clock, Utensils, Sparkles } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurant";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-espresso-950 text-ivory-100 border-t border-espresso-900 pt-20 pb-28 sm:pb-16 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pattern-texture opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-ivory-100/10">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-ivory-50 block">
                KAYU MANIS
              </span>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-champagne-400 block mt-1">
                CONTEMPORARY INDONESIAN DINING · TUBAN
              </span>
            </Link>

            <p className="font-serif italic text-xl sm:text-2xl text-ivory-200/90 font-light">
              &ldquo;Where Every Meal Becomes a Memory.&rdquo;
            </p>

            <p className="text-sm text-warmgray-400 font-light leading-relaxed max-w-sm">
              An elevated dining experience crafted around exceptional seafood, local East Java produce, and effortless hospitality.
            </p>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-champagne-400 mb-6">
              EXPLORE
            </h4>
            <ul className="space-y-3 font-mono text-xs uppercase tracking-wider text-ivory-200/80">
              <li>
                <Link href="/menu" className="hover:text-champagne-400 transition-colors">
                  MENU
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-champagne-400 transition-colors">
                  OUR STORY
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-champagne-400 transition-colors">
                  THE EXPERIENCE
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-champagne-400 transition-colors">
                  GALLERY
                </Link>
              </li>
              <li>
                <Link href="/#events" className="hover:text-champagne-400 transition-colors">
                  PRIVATE EVENTS
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-champagne-400 transition-colors">
                  FIND US
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="hover:text-champagne-400 transition-colors text-champagne-400 font-semibold">
                  BOOK A TABLE →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-champagne-400 mb-6">
              LOCATION & CONTACT
            </h4>

            <div className="space-y-3.5 text-sm text-ivory-200/85 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-champagne-400 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {RESTAURANT_INFO.address.street} <br />
                  Ronggomulyo, Tuban, East Java 62315
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-champagne-400 flex-shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.contact.phoneRaw}`}
                  className="font-mono text-xs uppercase tracking-wider hover:text-champagne-400 transition-colors"
                >
                  {RESTAURANT_INFO.contact.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-champagne-400 flex-shrink-0" />
                <span className="font-mono text-xs uppercase tracking-wider">
                  DAILY 11:00 — 22:00 WIB
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/admin/reservations"
                className="inline-block px-3 py-1.5 rounded-full bg-espresso-900 text-[10px] font-mono text-warmgray-400 tracking-wider uppercase border border-ivory-100/10 hover:text-ivory-100 transition-colors"
              >
                ADMIN DASHBOARD →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-warmgray-500 gap-4">
          <p className="font-mono text-[11px] uppercase tracking-wider">
            © {new Date().getFullYear()} RESTO KAYU MANIS. ALL RIGHTS RESERVED.
          </p>

          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-champagne-400/80">
            TUBAN · EAST JAVA · INDONESIA
          </span>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-warmgray-400 hover:text-ivory-100 transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

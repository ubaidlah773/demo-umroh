"use client";

import React from "react";
import Link from "next/link";
import { Instagram, MapPin, Phone, ArrowUp } from "lucide-react";
import { CAFE_INFO } from "@/data/cafeInfo";
import { useModal } from "@/context/ModalContext";

export default function Footer() {
  const { openReservation } = useModal();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-charcoal-950 text-ivory-100 border-t border-charcoal-800/80 pt-16 pb-24 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-charcoal-850">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-wider text-ivory-100">
                D’SULTAN
              </span>
              <span className="block text-[11px] tracking-[0.25em] uppercase text-gold-400 font-semibold -mt-1">
                Cafe • Dining • Music
              </span>
            </Link>

            <p className="font-serif italic text-lg text-gold-300">
              Good Food. Great Atmosphere.
            </p>

            <p className="text-sm text-ivory-400 font-light leading-relaxed max-w-sm">
              Tempat terbaik menikmati hidangan istimewa, kopi pilihan, dan alunan live music dalam suasana modern tropical yang hangat di Ronggomulyo, Tuban.
            </p>

            <div className="pt-2">
              <button
                onClick={() => openReservation()}
                className="px-5 py-2.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 hover:bg-gold-500 hover:text-charcoal-950 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Reserve a Table
              </button>
            </div>
          </div>

          {/* Explore Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 mb-5">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-ivory-300 font-light">
              <li>
                <Link href="/" className="hover:text-gold-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-gold-300 transition-colors">
                  Menu & Prices
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-gold-300 transition-colors">
                  Experience & Ambience
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-300 transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-gold-300 transition-colors">
                  Live Music & Events
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-gold-300 transition-colors">
                  About D'Sultan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 mb-5">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-ivory-300 font-light">
              <p className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <a
                  href={CAFE_INFO.contact.phone}
                  className="hover:text-gold-300 hover:underline transition-colors"
                >
                  {CAFE_INFO.contact.phoneFormatted}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Ronggomulyo, Tuban, Jawa Timur</span>
              </p>
              <p className="text-xs text-ivory-500 pt-1">
                Open Daily: Until 22:00 WIB
              </p>
            </div>
          </div>

          {/* Social (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 mb-5">
              Social
            </h4>
            <div className="space-y-3 text-sm text-ivory-300 font-light">
              <div>
                <a
                  href={CAFE_INFO.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-gold-300 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-gold-400" />
                  <span>Instagram</span>
                </a>
              </div>
              <div>
                <a
                  href={CAFE_INFO.googleMaps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-gold-300 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-gold-400" />
                  <span>Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory-500 gap-4">
          <p>© 2026 D’Sultan Cafe Tuban. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-ivory-400 hover:text-gold-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

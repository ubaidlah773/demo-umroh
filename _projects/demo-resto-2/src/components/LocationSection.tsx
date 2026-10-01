"use client";

import React from "react";
import { MapPin, Phone, Clock, Navigation, ExternalLink, Sparkles } from "lucide-react";
import { CAFE_INFO } from "@/data/cafeInfo";

export default function LocationSection() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-charcoal-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            VISIT & CONNECT
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ivory-100 tracking-tight mb-4">
            Find <span className="gold-gradient-text">D’Sultan</span>
          </h2>
          <p className="text-base sm:text-lg text-ivory-300 font-light leading-relaxed">
            Terletak strategis di jalan protokol Basuki Rachmad, Ronggomulyo, Tuban — siap menyambut Anda dengan parkiran luas dan keramahan istimewa.
          </p>
        </div>

        {/* 2-Column: Map Embed (7 cols) + Details (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Interactive Google Maps Embed */}
          <div className="lg:col-span-7 h-[380px] sm:h-[460px] rounded-3xl overflow-hidden border border-gold-500/25 shadow-elevated-card relative group">
            <iframe
              src={CAFE_INFO.googleMaps.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "contrast(1.05) saturate(1.1)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi D'Sultan Cafe Tuban"
              className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-500"
            />
            {/* Quick Map Floating Link */}
            <div className="absolute top-4 left-4">
              <a
                href={CAFE_INFO.googleMaps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-charcoal-900/90 backdrop-blur-md border border-gold-500/30 text-gold-300 text-xs font-medium hover:bg-gold-500 hover:text-charcoal-950 transition-colors shadow-lg"
              >
                <Navigation className="w-3.5 h-3.5" />
                Buka di Aplikasi Google Maps
              </a>
            </div>
          </div>

          {/* Location Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Box */}
            <div className="p-6 rounded-2xl bg-charcoal-900 border border-gold-500/15">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-charcoal-800 border border-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ivory-100 mb-1">
                    Alamat Cafe
                  </h3>
                  <p className="text-sm text-ivory-300 leading-relaxed">
                    {CAFE_INFO.address.full}
                  </p>
                  <p className="text-xs text-gold-400/90 mt-1">
                    📍 Kawasan Ronggomulyo, Kota Tuban
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Hours Box */}
            <div className="p-6 rounded-2xl bg-charcoal-900 border border-gold-500/15">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-charcoal-800 border border-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ivory-100 mb-1">
                    Jam Operasional
                  </h3>
                  <p className="text-sm text-ivory-200 font-medium">
                    {CAFE_INFO.operational.days}
                  </p>
                  <p className="text-xs text-ivory-400 mt-0.5">
                    Buka setiap hari sampai pukul <strong>22.00 WIB</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Phone & Direct Reservation */}
            <div className="p-6 rounded-2xl bg-charcoal-900 border border-gold-500/15">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-charcoal-800 border border-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ivory-100 mb-1">
                    Kontak & Reservasi
                  </h3>
                  <a
                    href={CAFE_INFO.contact.phone}
                    className="text-base text-gold-400 hover:text-gold-300 font-semibold tracking-wide block hover:underline"
                  >
                    {CAFE_INFO.contact.phoneFormatted}
                  </a>
                  <p className="text-xs text-ivory-400 mt-0.5">
                    Tersedia panggilan telepon langsung & pesan WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            {/* Directions Button */}
            <div className="pt-2">
              <a
                href={CAFE_INFO.googleMaps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-gold-glow group"
              >
                <Navigation className="w-4 h-4 fill-charcoal-950" />
                <span>Get Directions (Petunjuk Arah)</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

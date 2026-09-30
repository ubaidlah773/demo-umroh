"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ArrowUpRight, Navigation } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurant";

export default function Location() {
  return (
    <section id="location" className="py-24 sm:py-32 bg-sage-700 text-cream-100 relative overflow-hidden">
      {/* Subtle background anyaman accent */}
      <div className="absolute inset-0 pattern-anyaman opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream-300">
              № 07 — LOCATION
            </span>
            <span className="h-px w-10 bg-cream-300/30" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream-300">
              TUBAN · EAST JAVA
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-cream-50 leading-[1.1]">
            FIND YOUR WAY TO KAYU MANIS.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-cream-200/90 font-light leading-relaxed">
            Terletak strategis di jalur utama Basuki Rachmad kota Tuban, dengan akses mudah dan fasilitas parkir luas untuk kendaraan pribadi maupun rombongan keluarga.
          </p>
        </div>

        {/* Split Grid: Map Embed (Left) + Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Map Embed (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 h-[400px] sm:h-[480px] rounded-lg overflow-hidden border border-cream-200/20 shadow-editorial bg-sage-800 relative group"
          >
            <iframe
              src={RESTAURANT_INFO.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Resto Kayu Manis Tuban"
              className="w-full h-full filter saturate-90 contrast-95 transition-all duration-500 group-hover:saturate-100"
            />
          </motion.div>

          {/* Details Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-6">
              {/* Address card */}
              <div className="p-6 rounded-lg bg-sage-800/80 border border-cream-200/15 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-sage-900/60 border border-cream-200/20 flex items-center justify-center flex-shrink-0 text-cream-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-300 block mb-1">
                      ADDRESS
                    </span>
                    <h3 className="font-serif text-xl text-cream-50 font-normal mb-1">
                      Jl. Basuki Rachmad No.215–217
                    </h3>
                    <p className="text-sm text-cream-200/85 leading-relaxed font-light">
                      Ronggomulyo, Kec. Tuban, Kabupaten Tuban, Jawa Timur 62315
                    </p>
                    <p className="text-xs text-mustard-400 mt-2 font-mono">
                      📍 Satu area dengan Hotel Fave Tuban
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone card */}
              <div className="p-6 rounded-lg bg-sage-800/80 border border-cream-200/15 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-sage-900/60 border border-cream-200/20 flex items-center justify-center flex-shrink-0 text-cream-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-300 block mb-1">
                      TELEPHONE
                    </span>
                    <a
                      href={`tel:${RESTAURANT_INFO.contact.phoneRaw}`}
                      className="font-serif text-2xl text-cream-50 hover:text-mustard-400 transition-colors inline-block tracking-wide"
                    >
                      (0356) 331114
                    </a>
                    <p className="text-xs text-cream-300/80 mt-1 font-light">
                      Reservasi meja, pesanan prasmanan, dan rombongan bus wisata.
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours card */}
              <div className="p-6 rounded-lg bg-sage-800/80 border border-cream-200/15 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-sage-900/60 border border-cream-200/20 flex items-center justify-center flex-shrink-0 text-cream-200">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-300 block mb-1">
                      OPERATING HOURS
                    </span>
                    <h3 className="font-serif text-xl text-cream-50 font-normal">
                      Buka Setiap Hari
                    </h3>
                    <p className="text-sm text-cream-200/85 font-light mt-0.5">
                      10.00 – Tutup sekitar pukul 22.00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Open in Google Maps */}
            <div className="pt-2">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-md bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 font-medium text-xs uppercase tracking-[0.16em] transition-all duration-200 shadow-editorial group cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>OPEN IN GOOGLE MAPS</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Clock, Navigation, ArrowUpRight, MessageSquare, Utensils } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurant";
import { useModal } from "@/context/ModalContext";

export default function ContactPage() {
  const { openReservation } = useModal();

  return (
    <div className="min-h-screen bg-cream-100 text-olive-900 pt-28 pb-24 relative">
      {/* Background subtle linen */}
      <div className="absolute inset-0 pattern-linen opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Breadcrumb & Title */}
        <div className="mb-12 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sage-600 hover:text-olive-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>KEMBALI KE BERANDA</span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-sage-600">
              № 09 — CONTACT & LOCATION
            </span>
            <span className="h-px w-8 bg-beige-300" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-terracotta-500">
              TUBAN · EAST JAVA
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-olive-900">
            Hubungi & Kunjungi Kami
          </h1>
          <p className="text-base sm:text-lg text-olive-800/80 font-light mt-3 leading-relaxed">
            Kami siap menyambut Anda dan keluarga. Hubungi kontak resmi kami untuk reservasi meja, pemesanan rombongan bus wisata, atau informasi menu seafood segar hari ini.
          </p>
        </div>

        {/* 2-Column Contact Layout (Left: Info, Right: Map) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: Contact Information Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Address Card */}
              <div className="p-6 rounded-lg bg-cream-50 border border-beige-300 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-sage-100 border border-sage-200 flex items-center justify-center flex-shrink-0 text-sage-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-sage-600 block mb-1">
                      LOKASI RESTORAN
                    </span>
                    <h2 className="font-serif text-xl font-normal text-olive-900 mb-1">
                      Jl. Basuki Rachmad No.215–217
                    </h2>
                    <p className="text-sm text-olive-800/85 leading-relaxed font-light">
                      Ronggomulyo, Kec. Tuban, Kabupaten Tuban, Jawa Timur 62315
                    </p>
                    <p className="text-xs text-terracotta-600 mt-2 font-mono">
                      📍 Satu area dengan Hotel Fave Tuban (Jalur Utama Kota Tuban)
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone & Direct Contacts */}
              <div className="p-6 rounded-lg bg-cream-50 border border-beige-300 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-sage-100 border border-sage-200 flex items-center justify-center flex-shrink-0 text-sage-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-sage-600 block mb-1">
                      TELEPON LANGSUNG
                    </span>
                    <a
                      href={`tel:${RESTAURANT_INFO.contact.phoneRaw}`}
                      className="font-serif text-2xl text-olive-900 hover:text-terracotta-500 font-normal tracking-wide transition-colors block"
                    >
                      {RESTAURANT_INFO.contact.phone}
                    </a>
                    <p className="text-xs text-olive-800/70 mt-1 font-light">
                      Tersedia sambungan telepon langsung untuk info meja dan jamuan rombongan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="p-6 rounded-lg bg-cream-50 border border-beige-300 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-sage-100 border border-sage-200 flex items-center justify-center flex-shrink-0 text-sage-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-sage-600 block mb-1">
                      WAKTU OPERASIONAL
                    </span>
                    <h3 className="font-serif text-xl font-normal text-olive-900">
                      Buka Setiap Hari (Senin – Minggu)
                    </h3>
                    <p className="text-sm text-olive-800/80 font-light mt-0.5">
                      10.00 – Tutup sekitar pukul 22.00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => openReservation()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 font-mono text-xs uppercase tracking-wider transition-colors shadow-editorial cursor-pointer"
              >
                <Utensils className="w-4 h-4" />
                <span>RESERVASI MEJA</span>
              </button>

              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-cream-50 hover:bg-cream-200/60 text-olive-900 border border-olive-900/20 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>PANDUAN RUTE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Map Embed (7 cols) */}
          <div className="lg:col-span-7 h-[420px] sm:h-[520px] rounded-lg overflow-hidden border border-beige-300 shadow-editorial bg-cream-200 relative group">
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
          </div>
        </div>
      </div>
    </div>
  );
}

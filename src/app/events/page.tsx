"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Utensils, MessageSquare, Phone, CheckCircle2 } from "lucide-react";
import { EVENT_PACKAGES } from "@/data/events";
import { RESTAURANT_INFO } from "@/data/restaurant";
import { useModal } from "@/context/ModalContext";

export default function EventsPage() {
  const { openReservation } = useModal();

  return (
    <div className="min-h-screen bg-cream-100 text-olive-900 pt-28 pb-24 relative">
      {/* Background subtle linen */}
      <div className="absolute inset-0 pattern-linen opacity-50 pointer-events-none" />

      {/* Top Banner & Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sage-600 hover:text-olive-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>KEMBALI KE BERANDA</span>
          </Link>

          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-sage-600">
              № 05 — GATHERINGS & EVENTS
            </span>
            <span className="h-px w-8 bg-beige-300" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-terracotta-500">
              SPACIOUS & ACCOMMODATING
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-olive-900 tracking-tight mb-4">
            Acara & Jamuan Bersama
          </h1>

          <p className="text-base sm:text-lg text-olive-800/80 font-light max-w-2xl mx-auto leading-relaxed">
            Fasilitas ruang ber-AC yang sejuk, tata meja fleksibel berkapasitas besar, dan area parkir luas untuk mobil maupun bus pariwisata di jalur utama Basuki Rachmad Tuban.
          </p>
        </div>
      </section>

      {/* Events / Gatherings Packages List */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {EVENT_PACKAGES.map((pkg, idx) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-cream-50 border border-beige-300 rounded-xl overflow-hidden shadow-sm hover:shadow-editorial grid grid-cols-1 lg:grid-cols-12 transition-all duration-300"
          >
            {/* Package Image (5 cols) */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-auto min-h-[280px]">
              <Image
                src={pkg.image}
                alt={pkg.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-sm bg-olive-900/90 text-cream-50 font-mono text-[10px] tracking-wider uppercase backdrop-blur-sm">
                  {pkg.capacity}
                </span>
              </div>
            </div>

            {/* Package Info (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-sage-600 block mb-1">
                  {pkg.subtitle}
                </span>

                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-olive-900 mb-3">
                  {pkg.title}
                </h2>

                <p className="text-sm sm:text-base text-olive-800/80 font-light leading-relaxed mb-6">
                  {pkg.description}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                  {pkg.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-2 text-xs font-mono text-olive-800 bg-cream-100 p-2.5 rounded-lg border border-beige-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sage-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-beige-200 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => openReservation(pkg.title)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 font-mono text-xs uppercase tracking-wider transition-colors shadow-editorial cursor-pointer"
                >
                  <Utensils className="w-4 h-4" />
                  <span>RESERVASI UNTUK {pkg.title.toUpperCase()}</span>
                </button>

                <a
                  href={`https://wa.me/${RESTAURANT_INFO.contact.whatsappNumber}?text=${encodeURIComponent(
                    `Halo Resto Kayu Manis Tuban, saya ingin konsultasi paket jamuan ${pkg.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-cream-100 hover:bg-cream-200 text-olive-900 border border-beige-300 font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-terracotta-500" />
                  <span>KONSULTASI VIA WHATSAPP</span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </main>

      {/* Bottom Assistance Strip */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center relative z-10">
        <div className="p-8 sm:p-10 rounded-xl bg-sage-50 border border-sage-200">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sage-600 block mb-2">
            DIRECT COORDINATION
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-olive-900 mb-2">
            Butuh Penawaran Khusus Rombongan?
          </h3>
          <p className="text-sm text-olive-800/80 font-light max-w-lg mx-auto mb-6">
            Tim kami siap membantu menyusun pilihan menu, alokasi jam tiba rombongan bus, dan tata letak meja terbaik.
          </p>
          <a
            href={`tel:${RESTAURANT_INFO.contact.phoneRaw}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-olive-900 hover:bg-olive-800 text-cream-50 font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <Phone className="w-4 h-4 text-cream-300" />
            <span>HUBUNGI (0356) 331114</span>
          </a>
        </div>
      </section>
    </div>
  );
}

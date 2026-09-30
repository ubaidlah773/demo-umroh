"use client";

import React from "react";
import { motion } from "framer-motion";
import { Utensils, Phone, Clock, Users, Calendar } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { RESTAURANT_INFO } from "@/data/restaurant";

export default function Reservation() {
  const { openReservation } = useModal();

  return (
    <section id="reservation" className="py-24 sm:py-32 bg-cream-100 text-olive-900 border-t border-beige-200/80 relative overflow-hidden">
      {/* Editorial Watermark background element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] font-serif text-[18vw] leading-none text-olive-900 font-bold whitespace-nowrap">
        KAYU MANIS
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Micro Category Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-sage-600">
            № 08 — RESERVATIONS
          </span>
          <span className="h-px w-8 bg-beige-300" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-sage-600">
            GATHERINGS & FAMILY MEALS
          </span>
        </motion.div>

        {/* Big Editorial Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-olive-900 leading-[1.05] mb-6"
        >
          LET&apos;S GET A TABLE.
        </motion.h2>

        {/* Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-xl text-olive-800/80 font-light max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Planning dinner with family or friends? We&apos;d love to have you. Reservasi meja Anda dengan mudah atau hubungi kami langsung untuk acara spesial rombongan.
        </motion.p>

        {/* 3 Quick Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12 text-left"
        >
          <div className="p-4 rounded-lg bg-cream-50 border border-beige-200/90 shadow-sm flex items-center gap-3">
            <Users className="w-5 h-5 text-terracotta-500 flex-shrink-0" />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-sage-600 block">KAPASITAS</span>
              <p className="text-xs text-olive-900 font-medium">Keluarga & Rombongan Besar</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-cream-50 border border-beige-200/90 shadow-sm flex items-center gap-3">
            <Clock className="w-5 h-5 text-terracotta-500 flex-shrink-0" />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-sage-600 block">OPERASIONAL</span>
              <p className="text-xs text-olive-900 font-medium">Buka Setiap Hari s/d 22.00</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-cream-50 border border-beige-200/90 shadow-sm flex items-center gap-3">
            <Calendar className="w-5 h-5 text-terracotta-500 flex-shrink-0" />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-sage-600 block">KONFIRMASI</span>
              <p className="text-xs text-olive-900 font-medium">Konfirmasi Cepat via WhatsApp</p>
            </div>
          </div>
        </motion.div>

        {/* Dual Actions: BOOK A TABLE + CALL US */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => openReservation()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-md bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 font-medium text-xs uppercase tracking-[0.16em] transition-all duration-200 shadow-editorial hover:shadow-editorial-hover cursor-pointer active:scale-98"
          >
            <Utensils className="w-4 h-4" />
            <span>BOOK A TABLE</span>
          </button>

          <a
            href={`tel:${RESTAURANT_INFO.contact.phoneRaw}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-md bg-cream-50 hover:bg-cream-200/60 text-olive-900 border border-olive-900/20 font-medium text-xs uppercase tracking-[0.16em] transition-colors"
          >
            <Phone className="w-4 h-4 text-terracotta-500" />
            <span>CALL US {RESTAURANT_INFO.contact.phone}</span>
          </a>
        </motion.div>

        <p className="font-mono text-[11px] text-sage-600 uppercase tracking-widest mt-8">
          NO HIDDEN CHARGES · FRESH SEAFOOD GUARANTEED · SPARK-CLEAN PREMISES
        </p>
      </div>
    </section>
  );
}

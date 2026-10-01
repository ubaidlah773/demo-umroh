"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function IntroStory() {
  const { openReservation } = useModal();

  return (
    <section id="about" className="py-20 sm:py-28 bg-charcoal-950 text-ivory-100 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Large Image (60% equivalent on desktop: 7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="relative h-[380px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden border border-gold-500/20 shadow-elevated-card group">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80"
                alt="Suasana ruang makan dan kumpul D'Sultan Cafe Tuban"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-cinematic"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-black/20" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-xs p-4 rounded-2xl glass-panel text-ivory-100">
                <p className="text-xs uppercase tracking-wider text-gold-400 font-semibold mb-1">
                  Est. Ronggomulyo, Tuban
                </p>
                <p className="text-sm font-medium leading-snug">
                  Dirancang hangat untuk setiap temu, tawa, dan cita rasa tak terlupakan.
                </p>
              </div>
            </div>

            {/* Decorative Offset Border Frame */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-full h-full rounded-3xl border border-gold-500/15 -z-10 pointer-events-none" />
          </motion.div>

          {/* Story Text (40% equivalent on desktop: 5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              WELCOME TO D’SULTAN
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ivory-100 leading-[1.2] mb-6">
              A Place Made for <span className="gold-gradient-text">Good Moments</span>
            </h2>

            <p className="text-base sm:text-lg text-ivory-300 font-light leading-relaxed mb-6">
              D’Sultan Cafe menghadirkan pengalaman bersantap yang nyaman dengan pilihan ruang indoor dan outdoor, hidangan yang beragam, serta suasana yang cocok untuk berkumpul bersama keluarga, teman, maupun kolega.
            </p>

            <p className="text-sm text-ivory-400 leading-relaxed mb-8">
              Bukan sekadar tempat singgah menikmati kopi, D’Sultan diciptakan sebagai ruang perjumpaan yang hidup. Dari aroma sedap iga bakar yang menggoda di siang hari, hingga gemerlap lampu malam ditemani alunan live music yang syahdu.
            </p>

            {/* Key Value Points */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="text-sm font-medium text-ivory-200">
                  Fleksibilitas Ruang: Indoor Sejuk Ber-AC & Outdoor Tropis Asri
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="text-sm font-medium text-ivory-200">
                  Pilihan Menu Komplit: Masakan Nusantara, Steak, Kopi Artisan & Gelato
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="text-sm font-medium text-ivory-200">
                  Live Music Terjadwal & Fasilitas Private Room yang Representatif
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/#experience"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-wider transition-all shadow-gold-glow"
              >
                Lihat Experience Cafe
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => openReservation()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold-500/30 hover:border-gold-500 text-ivory-200 hover:text-white font-medium text-xs tracking-wider uppercase transition-colors cursor-pointer"
              >
                Reservasi Meja
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

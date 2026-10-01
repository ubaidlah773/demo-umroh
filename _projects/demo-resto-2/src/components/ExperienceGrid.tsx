"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { EXPERIENCES } from "@/data/experiences";
import { useModal } from "@/context/ModalContext";

export default function ExperienceGrid() {
  const { openReservation } = useModal();

  return (
    <section id="experience" className="py-20 sm:py-28 bg-charcoal-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            THE D’SULTAN VIBE
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ivory-100 tracking-tight mb-4">
            More Than <span className="gold-gradient-text">Just a Cafe</span>
          </h2>
          <p className="text-base sm:text-lg text-ivory-300 font-light leading-relaxed">
            Dari santap siang akrab hingga denting musik akhir pekan, jelajahi setiap sudut kenyamanan yang disiapkan untuk Anda di Tuban.
          </p>
        </div>

        {/* 5 Experiences Layout: Asymmetric 2 on top, 3 on bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Top 2 Items (larger width: 6 cols each on lg) */}
          {EXPERIENCES.slice(0, 2).map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => openReservation(exp.title)}
              className="lg:col-span-6 group relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-gold-500/20 shadow-charcoal-card cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-cinematic"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent group-hover:via-charcoal-950/75 transition-colors duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-semibold tracking-wider uppercase text-gold-400">
                    {exp.badge}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-gold-500/20 group-hover:bg-gold-500 text-gold-400 group-hover:text-charcoal-950 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Bottom Title & Details */}
                <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ivory-100 mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-ivory-300 line-clamp-2 mb-3">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.features.slice(0, 2).map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[11px] text-ivory-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10"
                      >
                        • {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Bottom 3 Items (4 cols each on lg) */}
          {EXPERIENCES.slice(2, 5).map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx + 2) * 0.15, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => openReservation(exp.title)}
              className="lg:col-span-4 group relative h-[340px] sm:h-[380px] rounded-3xl overflow-hidden border border-gold-500/20 shadow-charcoal-card cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-cinematic"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent group-hover:via-charcoal-950/75 transition-colors duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-semibold tracking-wider uppercase text-gold-400">
                    {exp.badge}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-gold-500/20 group-hover:bg-gold-500 text-gold-400 group-hover:text-charcoal-950 flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Bottom Title & Details */}
                <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ivory-100 mb-1.5">
                    {exp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ivory-300 line-clamp-2 mb-2.5">
                    {exp.description}
                  </p>
                  <span className="text-[11px] text-gold-400 font-medium inline-flex items-center gap-1 group-hover:underline">
                    Pesan Meja Area Ini →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

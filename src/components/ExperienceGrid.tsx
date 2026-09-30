"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EXPERIENCES } from "@/data/experiences";
import { useModal } from "@/context/ModalContext";

export default function ExperienceGrid() {
  const { openReservation } = useModal();

  return (
    <section id="experience" className="py-20 sm:py-28 bg-charcoal-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold"
          >
            DINING EXPERIENCE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-ivory-100 tracking-tight mt-2 mb-4"
          >
            MADE FOR EVERY OCCASION
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-sand-300 font-light leading-relaxed"
          >
            Dari santap bersama keluarga hingga jamuan bisnis dan rombongan, temukan ruang yang tepat untuk setiap momen berharga Anda di Tuban.
          </motion.p>
        </div>

        {/* 4 Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => openReservation(exp.title)}
              className="group relative h-[400px] sm:h-[440px] rounded-lg overflow-hidden border border-gold-500/20 shadow-warm-card cursor-pointer"
            >
              {/* Background Image with Zoom Animation */}
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-black/30 group-hover:via-charcoal-950/80 transition-colors duration-300" />

              {/* Content Card Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Top Action Arrow */}
                <div className="flex justify-end">
                  <div className="w-10 h-10 rounded-md bg-forest-900/80 border border-gold-500/30 group-hover:bg-gold-500 text-gold-400 group-hover:text-charcoal-950 flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Bottom Text Reveal */}
                <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="font-serif text-2xl font-medium text-ivory-100 mb-1 group-hover:text-gold-300 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gold-400 font-medium italic mb-2">
                    &ldquo;{exp.tagline}&rdquo;
                  </p>
                  <p className="text-xs text-ivory-300/80 line-clamp-3 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                    {exp.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-sand-300">
                    <span className="uppercase tracking-wider">Reservasi Meja</span>
                    <span className="text-gold-400">Pilih Area →</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

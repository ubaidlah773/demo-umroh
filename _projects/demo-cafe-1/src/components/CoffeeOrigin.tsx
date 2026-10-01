"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { origins } from "@/config/coffeeData";
import { Mountain, MapPin, Sparkles, Wind, SunMedium } from "lucide-react";

export default function CoffeeOrigin() {
  const [selectedOrigin, setSelectedOrigin] = useState<string>("brazil");

  const currentOrigin = origins.find((o) => o.id === selectedOrigin) || origins[0];

  return (
    <section id="origin" className="py-24 md:py-36 bg-espresso-900 relative overflow-hidden">
      {/* Background Farm Landscape Ambient Layer with dynamic transition */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentOrigin.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.28, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-full"
          >
            <Image
              src={currentOrigin.image}
              alt={currentOrigin.country}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-900 via-espresso-900/80 to-espresso-900/90" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-gold-500">
            <Mountain size={13} />
            <span>TERROIR & SINGLE ORIGINS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream-100 font-normal tracking-tight">
            LAND OF THE HARVEST
          </h2>
          <p className="text-cream-200/70 text-sm sm:text-base font-light pt-1">
            Exceptional coffee begins thousands of meters above sea level, nurtured by volcanic soils, morning mountain mists, and sustainable stewardship.
          </p>
        </div>

        {/* Origin Selection Cards Grid (BRAZIL, ETHIOPIA, COLOMBIA) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {origins.map((origin) => {
            const isSelected = selectedOrigin === origin.id;

            return (
              <motion.div
                key={origin.id}
                onClick={() => setSelectedOrigin(origin.id)}
                whileHover={{ y: -6 }}
                className={`cursor-pointer rounded-2xl p-6 sm:p-8 transition-all duration-400 relative overflow-hidden backdrop-blur-xl border ${
                  isSelected
                    ? "bg-espresso-800/90 border-gold-500 shadow-gold-glow"
                    : "bg-espresso-950/60 border-white/10 hover:border-gold-500/40"
                }`}
              >
                {/* Active indicator bar */}
                {isSelected && (
                  <motion.div
                    layoutId="originIndicator"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-caramel-500 to-gold-400"
                  />
                )}

                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono tracking-widest text-gold-400 uppercase">
                    {origin.region}
                  </span>
                  <MapPin
                    size={16}
                    className={isSelected ? "text-gold-400" : "text-cream-100/40"}
                  />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-cream-100 font-normal mb-2 tracking-wide">
                  {origin.country}
                </h3>

                {/* Prompt specified key notes */}
                <p className="text-gold-400 font-serif text-sm tracking-wide mb-4">
                  {origin.notes}
                </p>

                <div className="space-y-1.5 text-xs text-cream-200/60 font-light">
                  <div className="flex items-center gap-1.5">
                    <SunMedium size={12} className="text-caramel-500" />
                    <span>Altitude: {origin.altitude}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wind size={12} className="text-gold-500" />
                    <span>Process: {origin.process}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Origin In-Depth Spotlight Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentOrigin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-10 rounded-3xl bg-espresso-950/80 border border-gold-500/25 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-gold-500 font-mono">
                TERROIR SPOTLIGHT • {currentOrigin.country}
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-cream-100 font-normal">
                {currentOrigin.notes}
              </h4>
              <p className="text-sm sm:text-base text-cream-200/80 font-light leading-relaxed">
                {currentOrigin.description}
              </p>

              <div className="pt-3">
                <span className="text-xs uppercase tracking-wider text-cream-100/50 block mb-2">
                  Tasting Notes Spectrum:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentOrigin.flavorProfile.map((note) => (
                    <span
                      key={note}
                      className="px-3 py-1 rounded-full text-xs bg-gold-500/10 text-gold-400 border border-gold-500/25"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={currentOrigin.image}
                alt={currentOrigin.country}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 to-transparent" />
              <div className="absolute bottom-3 left-3 text-[11px] font-mono tracking-widest text-cream-100 uppercase">
                {currentOrigin.altitude}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

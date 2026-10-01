"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, X, Award, Coffee, HeartHandshake, Sparkles } from "lucide-react";

export default function OurStory() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="story" className="py-24 md:py-36 bg-espresso-950 relative overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-caramel-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ================= LEFT: AI-GENERATED CINEMATIC CAFÉ INTERIOR ================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            {/* Ambient Border Glow Frame */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gold-500/20 group">
              <Image
                src="/images/cafe-interior.jpg"
                alt="AROMA Coffee House Roastery Interior"
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-espresso-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gold-500 block">
                    SANCTUARY OF FLAVOR
                  </span>
                  <span className="font-serif text-sm text-cream-100 font-medium">
                    Tuban Flagship Roastery & Espresso Lab
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                  <Coffee size={16} />
                </div>
              </div>
            </div>

            {/* Decorative Offset Golden Square */}
            <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-gold-500/40 rounded-tl-3xl pointer-events-none" />
          </motion.div>

          {/* ================= RIGHT: EDITORIAL TYPOGRAPHY & PHILOSOPHY ================= */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-gold-500">
              <Sparkles size={13} />
              <span>CRAFT & PHILOSOPHY</span>
            </div>

            {/* Large Typography Headline */}
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream-100 font-normal leading-[1.08] tracking-tight">
              MORE THAN <br />
              <span className="gold-gradient-text italic font-serif">COFFEE.</span>
            </h2>

            {/* Prompt exact text requirement */}
            <p className="font-serif text-xl sm:text-2xl text-cream-200/90 font-light leading-relaxed italic border-l-2 border-gold-500/50 pl-5">
              “Every cup begins with carefully selected beans, precise roasting, and a passion for creating something worth slowing down for.”
            </p>

            <p className="text-cream-200/70 text-sm sm:text-base font-light leading-relaxed">
              We founded AROMA on a singular obsession: to elevate the everyday ritual into a sensory pause. We work directly with generational growers across Brazil, Ethiopia, and Colombia, paying well above Fair Trade rates to preserve artisanal soil management and rare heritage cultivars.
            </p>

            {/* Feature Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-gold-400 block font-light">
                  88+
                </span>
                <span className="text-[11px] uppercase tracking-wider text-cream-100/60 mt-1 block">
                  SCA Cup Score
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-gold-400 block font-light">
                  100%
                </span>
                <span className="text-[11px] uppercase tracking-wider text-cream-100/60 mt-1 block">
                  Single Origin
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-gold-400 block font-light">
                  07:00
                </span>
                <span className="text-[11px] uppercase tracking-wider text-cream-100/60 mt-1 block">
                  Fresh Daily Roast
                </span>
              </div>
            </div>

            {/* Prompt CTA: DISCOVER OUR STORY → */}
            <div>
              <button
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] font-semibold text-gold-400 hover:text-gold-300 transition-colors pt-2"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Story Deep-Dive Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-espresso-950 border border-gold-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl z-10 space-y-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold-500 font-mono">
                    CHRONICLES • EST. 2024
                  </span>
                  <h3 className="font-serif text-2xl text-cream-100 mt-1">THE AROMA MANIFESTO</h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-cream-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 text-cream-200/80 text-sm leading-relaxed font-light">
                <p>
                  In a world measured by velocity and hurried commutes, AROMA was created as an antidote: a temple for the unhurried moment. Every bean that crosses our threshold has been vetted through dozens of cupping sessions.
                </p>
                <p>
                  Our roasting methodology pairs precision thermodynamic sensor arrays with the instinctive senses of master roasters who listen to the cracks and scent profiles of each individual batch.
                </p>
                <div className="grid grid-cols-2 gap-4 py-3">
                  <div className="p-4 rounded-xl bg-espresso-900 border border-white/5 space-y-1">
                    <Award size={18} className="text-gold-400" />
                    <h4 className="font-serif text-sm text-cream-100 pt-1">Ethical Direct Trade</h4>
                    <p className="text-xs text-cream-200/60">Direct partner relationships with family-owned estates.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-espresso-900 border border-white/5 space-y-1">
                    <HeartHandshake size={18} className="text-gold-400" />
                    <h4 className="font-serif text-sm text-cream-100 pt-1">Sensory Community</h4>
                    <p className="text-xs text-cream-200/60">Regular public cupping sessions and brewing workshops.</p>
                  </div>
                </div>
                <p>
                  Whether you step in for a quiet solo espresso at dawn, a creative afternoon session, or our velvety caramel latte, we welcome you to savor your sacred moment.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

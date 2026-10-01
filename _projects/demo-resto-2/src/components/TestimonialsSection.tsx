"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink, Sparkles } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { CAFE_INFO } from "@/data/cafeInfo";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 sm:py-28 bg-charcoal-950 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Real Rating Stat */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            GENUINE EXPERIENCES
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ivory-100 tracking-tight mb-6">
            Loved by <span className="gold-gradient-text">Our Guests</span>
          </h2>

          {/* Social Proof Metric Badge */}
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-charcoal-900 border border-gold-500/20 shadow-lg">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-2xl font-bold text-gold-400">
                {CAFE_INFO.googleReviews.rating}
              </span>
              <div className="flex text-gold-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
            </div>
            <div className="h-6 w-px bg-charcoal-700" />
            <span className="text-xs sm:text-sm text-ivory-300 font-medium">
              Berdasarkan <strong>{CAFE_INFO.googleReviews.totalReviews}</strong> di Google Maps
            </span>
          </div>
        </div>

        {/* Carousel Card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-charcoal-900 border border-gold-500/20 rounded-3xl p-8 sm:p-12 shadow-elevated-card relative overflow-hidden">
            {/* Big Decorative Quote Mark */}
            <Quote className="absolute -top-4 -left-4 w-28 h-28 text-gold-500/10 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                {/* Highlight Snippet */}
                <div className="mb-6 inline-block">
                  <span className="font-serif italic text-lg sm:text-2xl text-gold-300 font-normal">
                    “{current.highlight}”
                  </span>
                </div>

                {/* Full Quote */}
                <p className="text-base sm:text-lg text-ivory-300 font-light leading-relaxed mb-8">
                  {current.quote}
                </p>

                {/* Reviewer Details */}
                <div className="flex items-center justify-between pt-6 border-t border-charcoal-800">
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-ivory-100">
                      {current.name}
                    </h4>
                    <p className="text-xs text-gold-400/80">{current.role}</p>
                  </div>

                  <div className="flex gap-1 text-gold-400">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-4">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? "w-8 bg-gold-400" : "w-2 bg-charcoal-700 hover:bg-charcoal-600"
                    }`}
                    aria-label={`Lihat review ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevReview}
                  className="p-2.5 rounded-full bg-charcoal-800 hover:bg-gold-500 text-ivory-300 hover:text-charcoal-950 border border-charcoal-700 transition-colors"
                  aria-label="Ulasan sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextReview}
                  className="p-2.5 rounded-full bg-charcoal-800 hover:bg-gold-500 text-ivory-300 hover:text-charcoal-950 border border-charcoal-700 transition-colors"
                  aria-label="Ulasan berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA: See us on Google */}
        <div className="mt-12 text-center">
          <a
            href={CAFE_INFO.googleMaps.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal-850 hover:bg-gold-500 text-ivory-200 hover:text-charcoal-950 border border-gold-500/30 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm"
          >
            <span>See us on Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

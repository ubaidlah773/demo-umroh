"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/config/coffeeData";
import { Star, Quote, Sparkles } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-espresso-900 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-caramel-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-gold-500">
            <Sparkles size={13} />
            <span>COMMUNITY VOICES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-normal tracking-tight">
            WORDS FROM GUESTS
          </h2>
          <p className="text-cream-200/70 text-sm sm:text-base font-light pt-1">
            Moments shared over quiet sips and thoughtful conversations.
          </p>
        </div>

        {/* 3 Minimalist Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="relative p-8 rounded-3xl bg-espresso-950/70 border border-gold-500/20 backdrop-blur-xl shadow-glass-card flex flex-col justify-between hover:border-gold-500/40 transition-all duration-300"
            >
              {/* Top Quote Icon & 5 Stars */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 border border-gold-500/25">
                    <Quote size={18} />
                  </div>
                  <div className="flex gap-1 text-gold-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="#C9A66B" stroke="none" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="font-serif text-lg sm:text-xl text-cream-100 font-light leading-relaxed italic mb-8">
                  “{item.quote}”
                </p>
              </div>

              {/* Author & Origin */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold">
                    — {item.author}
                  </h4>
                  <p className="text-[11px] text-cream-200/50 mt-0.5">{item.role}</p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cream-100/40">
                  {item.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

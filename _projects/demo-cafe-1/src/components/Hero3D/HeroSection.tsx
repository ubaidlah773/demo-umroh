"use client";

import { motion } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import { ArrowDown, Sparkles, Compass } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#251711] via-[#1C130F] to-[#17110E] pt-24 pb-12 lg:pt-0 lg:pb-0"
    >
      {/* ================= ATMOSPHERIC ILLUMINATION & LIGHT RAYS ================= */}
      {/* Soft warm atmospheric glow directly behind the 3D cup to create separation */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[650px] h-[650px] bg-[radial-gradient(circle_at_center,rgba(201,166,107,0.16)_0%,rgba(184,121,69,0.1)_40%,transparent_72%)] pointer-events-none" />
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-caramel-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-[450px] h-[450px] bg-espresso-800/40 blur-[110px] pointer-events-none" />

      {/* Subtle fine texture overlay */}
      <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#C9A66B_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center relative z-10">
        {/* ================= LEFT CONTENT (42%) ================= */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 space-y-6 lg:space-y-8 text-center lg:text-left z-20"
        >
          {/* Small Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-espresso-800/80 border border-gold-500/30 text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase shadow-sm">
            <Sparkles size={12} className="text-gold-400" />
            <span>EST. 2024 • SPECIALTY COFFEE</span>
          </div>

          {/* Large Headline */}
          <div className="space-y-1">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.05] tracking-tight text-cream-100">
              CRAFTED <br />
              <span className="gold-gradient-text font-serif italic font-normal">
                FOR YOUR
              </span> <br />
              MOMENT.
            </h1>
          </div>

          {/* Supporting Text */}
          <p className="text-cream-200/80 text-sm sm:text-base md:text-lg max-w-md mx-auto lg:mx-0 font-light leading-relaxed">
            Premium coffee, carefully roasted and beautifully crafted for every moment. Experience the intersection of pure origin, sensory mastery, and true 3D craftsmanship.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              href="#menu"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold tracking-[0.25em] uppercase bg-gradient-to-r from-gold-500 via-gold-400 to-caramel-500 text-espresso-950 shadow-gold-glow hover:brightness-110 active:scale-95 transition-all text-center"
            >
              EXPLORE MENU
            </a>
            <a
              href="#story"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold tracking-[0.25em] uppercase border border-gold-500/35 text-cream-100 hover:bg-gold-500/10 hover:border-gold-500/60 transition-all text-center flex items-center justify-center gap-2"
            >
              <Compass size={14} className="text-gold-400" />
              <span>OUR STORY</span>
            </a>
          </div>

          {/* Micro Origin Indicators */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-center lg:justify-start gap-6 text-[11px] tracking-[0.2em] uppercase text-cream-100/60">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> BRAZIL
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> ETHIOPIA
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> COLOMBIA
            </span>
          </div>
        </motion.div>

        {/* ================= RIGHT 3D COFFEE CUP CANVAS (58%) ================= */}
        {/* Seamlessly blended with zero black borders */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 relative flex items-center justify-center w-full"
        >
          <HeroCanvas />
        </motion.div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-cream-100/40 text-[10px] tracking-[0.25em] uppercase pointer-events-none">
        <span>SCROLL TO DISCOVER</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-gold-500" />
        </motion.div>
      </div>
    </section>
  );
}

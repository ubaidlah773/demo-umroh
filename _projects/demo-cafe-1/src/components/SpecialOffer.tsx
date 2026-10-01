"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import CoffeeSplash3D from "./CoffeeSplash3D";
import { ArrowRight, Sparkles, Coffee, Box, Eye } from "lucide-react";

export default function SpecialOffer() {
  const { addToCart } = useCart();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<"3d" | "render">("3d");

  const handleOrderSpecial = () => {
    addToCart({
      id: "special-reserve-bundle",
      name: "AROMA RESERVE RITUAL SET",
      price: 65000,
      image: "/images/coffee-splash.jpg",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 2, y: y * 2 });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="py-24 md:py-36 bg-espresso-950 relative overflow-hidden"
    >
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gold-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-warmth opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ================= LEFT: 3D REAL-TIME COFFEE SPLASH / RENDER ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative flex flex-col items-center justify-center order-2 lg:order-1"
          >
            {/* Ambient Aura */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[420px] h-[420px] rounded-full bg-gold-500/15 blur-3xl pointer-events-none"
            />

            {/* View Mode Toggle Switch */}
            <div className="absolute top-3 right-3 z-30 flex items-center bg-espresso-950/85 p-1 rounded-full border border-gold-500/30 backdrop-blur-md">
              <button
                onClick={() => setViewMode("3d")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all ${
                  viewMode === "3d"
                    ? "bg-gold-500 text-espresso-950 font-semibold shadow-gold-sm"
                    : "text-cream-200/70 hover:text-cream-100"
                }`}
              >
                <Box size={11} />
                <span>3D FLUID</span>
              </button>
              <button
                onClick={() => setViewMode("render")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all ${
                  viewMode === "render"
                    ? "bg-gold-500 text-espresso-950 font-semibold shadow-gold-sm"
                    : "text-cream-200/70 hover:text-cream-100"
                }`}
              >
                <Eye size={11} />
                <span>PHOTO</span>
              </button>
            </div>

            {/* Main Interactive Container */}
            <div className="relative w-full rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl bg-espresso-900/60 backdrop-blur-md">
              {viewMode === "3d" ? (
                <CoffeeSplash3D mouse={mouseOffset} />
              ) : (
                <div className="relative w-full h-[400px] sm:h-[480px] md:h-[540px]">
                  <Image
                    src="/images/coffee-splash.jpg"
                    alt="AROMA Floating Coffee Splash"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-espresso-950/85 backdrop-blur-md border border-gold-500/40 text-[10px] font-mono tracking-widest text-gold-400">
                {viewMode === "3d" ? "PHYSICAL FLUID 3D SIMULATION" : "HIGH-SPEED FLASH MACRO"}
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT: HEADLINE & COPY ================= */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-gold-500">
              <Sparkles size={13} />
              <span>THE SIGNATURE EXPERIENCE</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-cream-100 font-normal leading-[1.05] tracking-tight">
              YOUR DAILY <br />
              <span className="gold-gradient-text italic font-serif">RITUAL.</span>
            </h2>

            <p className="font-serif text-2xl sm:text-3xl text-cream-200/90 font-light italic">
              “Good coffee deserves a good moment.”
            </p>

            <p className="text-cream-200/70 text-sm sm:text-base font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
              Begin each morning in mindful stillness. Our master baristas calibrate grind size, water minerality, and extraction pressure every dawn so your cup is consistently sublime.
            </p>

            <div className="pt-4">
              <button
                onClick={handleOrderSpecial}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.25em] bg-gradient-to-r from-gold-500 via-gold-400 to-caramel-500 text-espresso-950 shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
              >
                <Coffee size={16} />
                <span>ORDER YOUR COFFEE</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

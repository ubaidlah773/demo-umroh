"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { journeyStages } from "@/config/coffeeData";
import CoffeeJourney3D from "./CoffeeJourney3D";
import { ChevronRight, ChevronLeft, Sparkles, Box, Eye, Flame } from "lucide-react";

export default function CoffeeJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const [viewMode, setViewMode] = useState<"render" | "3d">("render");

  const currentStage = journeyStages[activeStep];

  return (
    <section id="journey" className="py-24 md:py-36 bg-espresso-900 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-gold-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-caramel-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-gold-500 mb-3">
              <Sparkles size={13} />
              <span>THE 6-STAGE ARTISAN PROCESS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream-100 font-normal leading-[1.1] tracking-tight">
              FROM BEAN <br />
              <span className="gold-gradient-text italic font-serif">TO CUP.</span>
            </h2>
          </div>

          {/* View Mode Toggle & Stepper Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {/* 3D vs Render Switch */}
            <div className="flex items-center bg-espresso-950/80 p-1 rounded-full border border-gold-500/25">
              <button
                onClick={() => setViewMode("render")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all ${
                  viewMode === "render"
                    ? "bg-gold-500 text-espresso-950 font-semibold shadow-gold-sm"
                    : "text-cream-200/70 hover:text-cream-100"
                }`}
              >
                <Eye size={12} />
                <span>RENDER</span>
              </button>
              <button
                onClick={() => setViewMode("3d")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all ${
                  viewMode === "3d"
                    ? "bg-gold-500 text-espresso-950 font-semibold shadow-gold-sm"
                    : "text-cream-200/70 hover:text-cream-100"
                }`}
              >
                <Box size={12} />
                <span>3D MODEL</span>
              </button>
            </div>

            {/* Step Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : journeyStages.length - 1))}
                className="p-2.5 rounded-full bg-espresso-800/80 border border-gold-500/20 text-cream-100 hover:border-gold-500 hover:bg-gold-500/10 transition-all"
                aria-label="Previous Stage"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-xs font-mono tracking-widest text-gold-400 px-1">
                0{activeStep + 1} / 0{journeyStages.length}
              </span>
              <button
                onClick={() => setActiveStep((prev) => (prev < journeyStages.length - 1 ? prev + 1 : 0))}
                className="p-2.5 rounded-full bg-espresso-800/80 border border-gold-500/20 text-cream-100 hover:border-gold-500 hover:bg-gold-500/10 transition-all"
                aria-label="Next Stage"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10 border-b border-white/10 pb-4">
          {journeyStages.map((stage, idx) => (
            <button
              key={stage.step}
              onClick={() => setActiveStep(idx)}
              className={`text-left py-3 px-3 rounded-lg transition-all ${
                activeStep === idx
                  ? "bg-espresso-800 border-l-2 border-gold-500 shadow-md"
                  : "hover:bg-espresso-850/50 opacity-60 hover:opacity-100"
              }`}
            >
              <span className="text-[10px] font-mono tracking-widest text-gold-500 block">
                STAGE 0{stage.step}
              </span>
              <span className="text-xs font-serif text-cream-100 font-medium truncate block mt-0.5">
                {stage.title}
              </span>
            </button>
          ))}
        </div>

        {/* Main Interactive Stage Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-espresso-950/70 border border-gold-500/20 rounded-3xl p-6 sm:p-10 lg:p-14 backdrop-blur-xl shadow-coffee-depth">
          {/* Left: Viewport (Render or Interactive 3D Model) */}
          <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-espresso-900 border border-white/5 flex items-center justify-center group">
            {viewMode === "3d" ? (
              <CoffeeJourney3D stage={currentStage.step} />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.step}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentStage.image}
                    alt={currentStage.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            )}

            {/* Stage badge watermark */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-espresso-950/85 backdrop-blur-md border border-gold-500/30 text-[10px] font-mono tracking-widest text-gold-400">
              {currentStage.badge}
            </div>
          </div>

          {/* Right: Stage Deep Story & Informational Labels */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.step}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Flame size={14} className="text-caramel-500" />
                  <span className="text-xs tracking-[0.25em] uppercase text-gold-500 font-semibold">
                    {currentStage.subtitle}
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-cream-100 font-normal">
                  {currentStage.title}
                </h3>

                <p className="text-cream-200/80 text-sm sm:text-base font-light leading-relaxed">
                  {currentStage.description}
                </p>

                {/* 4 Informational Labels required by prompt */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                  <div className="p-3.5 rounded-xl bg-espresso-900/80 border border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-cream-100/50 block">
                      ORIGIN
                    </span>
                    <span className="text-sm font-serif text-gold-400 font-medium mt-0.5 block">
                      {currentStage.origin || "Brazil • Ethiopia"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-espresso-900/80 border border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-cream-100/50 block">
                      ROAST
                    </span>
                    <span className="text-sm font-serif text-cream-100 font-medium mt-0.5 block">
                      {currentStage.roast || "Medium Roast"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-espresso-900/80 border border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-cream-100/50 block">
                      NOTES
                    </span>
                    <span className="text-sm font-serif text-cream-100 font-medium mt-0.5 block">
                      {currentStage.notes || "Chocolate • Caramel • Nutty"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-espresso-900/80 border border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-cream-100/50 block">
                      PROCESS
                    </span>
                    <span className="text-sm font-serif text-gold-400 font-medium mt-0.5 block">
                      {currentStage.process || "Washed & Natural"}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

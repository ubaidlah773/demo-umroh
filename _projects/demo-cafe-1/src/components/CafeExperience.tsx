"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cafeWalkthroughZones } from "@/config/coffeeData";
import CafeEnvironment3D from "./CafeEnvironment3D";
import { Compass, CheckCircle2, Box, Eye } from "lucide-react";

export default function CafeExperience() {
  const [activeZoneId, setActiveZoneId] = useState<string>("bar");
  const [viewType, setViewType] = useState<"3d" | "walkthrough">("3d");
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const activeZone = cafeWalkthroughZones.find((z) => z.id === activeZoneId) || cafeWalkthroughZones[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 18, y: y * 18 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section id="experience" className="py-24 md:py-36 bg-espresso-900 relative overflow-hidden">
      {/* Background radial warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-caramel-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header with View Type Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-gold-500">
              <Compass size={13} />
              <span>VIRTUAL SHOWROOM</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream-100 font-normal tracking-tight">
              THE CAFÉ EXPERIENCE
            </h2>
            <p className="text-cream-200/70 text-sm sm:text-base font-light pt-1 max-w-xl">
              Explore our architectural space—warm timber, polished concrete, sculptural pendant lighting, and the rich hum of master roasters.
            </p>
          </div>

          {/* Toggle between 3D Realtime Scene vs Walkthrough Hotspots */}
          <div className="flex items-center bg-espresso-950/80 p-1 rounded-full border border-gold-500/25 self-start md:self-end">
            <button
              onClick={() => setViewType("3d")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                viewType === "3d"
                  ? "bg-gold-500 text-espresso-950 font-semibold shadow-gold-sm"
                  : "text-cream-200/70 hover:text-cream-100"
              }`}
            >
              <Box size={13} />
              <span>3D ENVIRONMENT</span>
            </button>
            <button
              onClick={() => setViewType("walkthrough")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                viewType === "walkthrough"
                  ? "bg-gold-500 text-espresso-950 font-semibold shadow-gold-sm"
                  : "text-cream-200/70 hover:text-cream-100"
              }`}
            >
              <Eye size={13} />
              <span>HOTSPOTS</span>
            </button>
          </div>
        </div>

        {/* Viewport Area */}
        {viewType === "3d" ? (
          <CafeEnvironment3D />
        ) : (
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-gold-500/25 shadow-2xl bg-espresso-950 group"
          >
            {/* Main Panorama Image with 3D translation */}
            <motion.div
              animate={{
                x: mouseOffset.x,
                y: mouseOffset.y,
                scale: 1.05,
              }}
              transition={{ ease: "easeOut", duration: 0.4 }}
              className="relative w-full h-full"
            >
              <Image
                src="/images/cafe-interior.jpg"
                alt="AROMA Flagship Interior"
                fill
                priority
                className="object-cover"
              />
            </motion.div>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-transparent to-espresso-950/40 pointer-events-none" />

            {/* Floating Interactive Hotspots: COFFEE BAR, ROASTERY, LOUNGE, WORKSPACE */}
            {cafeWalkthroughZones.map((zone) => {
              const isActive = activeZoneId === zone.id;

              return (
                <div
                  key={zone.id}
                  style={{ top: zone.position.y, left: zone.position.x }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveZoneId(zone.id)}
                    className={`group/pin relative flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 ${
                      isActive
                        ? "bg-gold-500 text-espresso-950 shadow-gold-glow scale-110"
                        : "bg-espresso-950/80 text-cream-100 border border-gold-500/40 hover:border-gold-400 hover:bg-espresso-900"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? "bg-espresso-950 animate-ping" : "bg-gold-500 animate-pulse"
                      }`}
                    />
                    <span className="text-[11px] font-mono tracking-wider font-semibold uppercase">
                      {zone.title}
                    </span>
                  </button>
                </div>
              );
            })}

            {/* Bottom Overlay Detail Card for Selected Zone */}
            <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-auto md:max-w-md z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeZone.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-2xl bg-espresso-950/90 backdrop-blur-xl border border-gold-500/30 shadow-2xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold-500 font-mono">
                      EXPLORING ZONE
                    </span>
                    <span className="text-xs font-mono text-cream-100/40">0{cafeWalkthroughZones.findIndex(z => z.id === activeZone.id) + 1} / 04</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-cream-100 font-normal">
                    {activeZone.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-cream-200/80 font-light leading-relaxed">
                    {activeZone.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                    {activeZone.details.map((detail) => (
                      <span
                        key={detail}
                        className="inline-flex items-center gap-1 text-[10px] text-cream-100/70 bg-white/5 px-2.5 py-1 rounded-md"
                      >
                        <CheckCircle2 size={11} className="text-gold-400" />
                        <span>{detail}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

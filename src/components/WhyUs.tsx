"use client";

import React from "react";
import { whyUs } from "@/config/siteConfig";
import {
  FileCheck2,
  HeartHandshake,
  CalendarCheck,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export const WhyUs: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    "01": <FileCheck2 className="w-6 h-6 text-gold-500" />,
    "02": <HeartHandshake className="w-6 h-6 text-gold-500" />,
    "03": <CalendarCheck className="w-6 h-6 text-gold-500" />,
    "04": <MessageCircle className="w-6 h-6 text-gold-500" />,
  };

  return (
    <section className="py-20 lg:py-28 bg-emerald-950 text-white relative overflow-hidden">
      {/* Background Subtle Gradient & Pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 pattern-dark-subtle opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-800/80 text-gold-300 border border-gold-500/30">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Keunggulan Layanan</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Lebih Mudah Mempersiapkan Perjalanan
          </h2>

          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed text-balance">
            Kenyamanan ibadah dimulai dari transparansi informasi dan kemudahan
            berkonsultasi bersama tim yang siap mendampingi.
          </p>
        </div>

        {/* 4 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item) => (
            <div
              key={item.number}
              className="group relative rounded-2xl bg-emerald-900/40 border border-emerald-800/80 p-6 sm:p-7 hover:bg-emerald-900/70 hover:border-gold-400/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top row with index and icon */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-2xl font-black text-gold-400/70 tracking-wider">
                    {item.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-gold-500/20 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:border-gold-400/40 transition-transform">
                    {iconMap[item.number]}
                  </div>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-2.5 leading-snug group-hover:text-gold-200 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom decorative bar */}
              <div className="mt-6 pt-4 border-t border-emerald-800/60 flex items-center gap-1.5 text-[11px] text-gold-300/80 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span>Safara Umroh</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

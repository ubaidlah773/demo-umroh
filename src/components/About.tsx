"use client";

import React from "react";
import Image from "next/image";
import { aboutContent, siteConfig, getWhatsAppUrl } from "@/config/siteConfig";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Compass,
  MessageCircle,
} from "lucide-react";

export const About: React.FC = () => {
  return (
    <section id="tentang" className="py-20 lg:py-28 bg-ivory-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Frame */}
              <div className="p-3 rounded-3xl bg-white border border-slate-200 shadow-card">
                <div className="relative h-[360px] sm:h-[420px] w-full rounded-2xl overflow-hidden bg-emerald-950">
                  <Image
                    src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1000&auto=format&fit=crop"
                    alt="Suasana Perjalanan Ibadah Madinah Munawwarah"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />

                  {/* Badge floating on photo */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Compass className="w-5 h-5 text-emerald-800" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block font-serif">
                        {siteConfig.name}
                      </span>
                      <span className="text-[11px] text-slate-600 block">
                        {siteConfig.tagline}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-950 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Tentang Konsep Perjalanan</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {aboutContent.heading}
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {aboutContent.body}
            </p>

            {/* Core Values Points */}
            <div className="space-y-3 pt-2">
              {aboutContent.mission.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Consultation Callout */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-md hover:shadow-emerald-glow transition-all"
              >
                <MessageCircle className="w-4 h-4 text-gold-400" />
                <span>Konsultasi Perjalanan</span>
              </a>

              <span className="text-xs text-slate-500 text-center sm:text-left">
                Informasi terbuka • Tanpa komitmen tergesa-gesa
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

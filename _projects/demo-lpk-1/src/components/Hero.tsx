"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, CheckCircle, MessageCircle } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/config/siteConfig";

interface HeroProps {
  onOpenRegisterModal: () => void;
}

export default function Hero({ onOpenRegisterModal }: HeroProps) {
  return (
    <section id="beranda" className="bg-slate-50 border-b border-slate-200 py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Official Institution Messaging */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Formal Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-slate-300 text-navy-950 text-xs font-semibold tracking-wider uppercase mb-5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-crimson-600"></span>
              <span>{siteConfig.hero.badge}</span>
            </div>

            {/* Headline H1 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight mb-5">
              <span>{siteConfig.hero.headlineLine1}</span>{" "}
              <span className="text-crimson-700">{siteConfig.hero.headlineLine2}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mb-8">
              {siteConfig.hero.subheadline}
            </p>

            {/* Solid Institutional Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
              <button
                onClick={onOpenRegisterModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm text-white bg-crimson-700 hover:bg-crimson-800 border border-crimson-800 shadow-sm transition-colors cursor-pointer"
              >
                <span>{siteConfig.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm text-navy-950 bg-white border border-slate-300 hover:bg-slate-100 hover:border-slate-400 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>{siteConfig.hero.secondaryCta}</span>
              </a>

              <a
                href="#program"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg font-semibold text-sm text-slate-600 hover:text-navy-950 hover:bg-slate-100 border border-transparent transition-colors"
              >
                <BookOpen className="w-4 h-4 text-navy-800" />
                <span>Lihat Program</span>
              </a>
            </div>

            {/* Teks Kecil Trust Indicator */}
            <div className="w-full pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium flex-wrap">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  Pelatihan terarah
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  Pendampingan
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  Informasi pendaftaran
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Formal Photograph */}
          <div className="lg:col-span-5">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-md">
              <div className="relative h-72 sm:h-96 w-full rounded-lg overflow-hidden bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                  alt="Suasana kegiatan pelatihan dan pengembangan kompetensi"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                  className="object-cover object-center"
                />
              </div>

              {/* Dignified Caption Below Image */}
              <div className="p-3 text-left border-t border-slate-100">
                <p className="text-xs font-bold text-navy-950 uppercase tracking-wide">
                  Kegiatan Pelatihan & Pengembangan Keterampilan
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Mempersiapkan etos kerja, kedisiplinan, dan kompetensi peserta secara terarah.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

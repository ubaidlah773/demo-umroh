"use client";

import React from "react";
import { siteConfig, getWhatsAppUrl } from "@/config/siteConfig";
import { MessageCircle, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export const CTA: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white py-20 lg:py-28">
      {/* Background Decorative Glow & Pattern */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 pattern-dark-subtle opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        {/* Subtle pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/90 text-gold-300 border border-gold-500/30">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>MULAI DENGAN KONSULTASI MUDAH</span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Siap Mempersiapkan Perjalanan Anda?
        </h2>

        {/* Subheadline */}
        <p className="text-base sm:text-xl text-emerald-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
          Konsultasikan kebutuhan perjalanan Umroh Anda dengan admin.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-emerald-950 font-bold px-8 py-4 rounded-xl text-base shadow-lg shadow-gold-950/20 hover:shadow-gold-glow transition-all transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5 text-emerald-950" />
            <span>Konsultasi via WhatsApp</span>
          </a>

          <a
            href="#paket"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-900/80 hover:bg-emerald-800 text-white font-semibold px-8 py-4 rounded-xl text-base border border-emerald-700/80 hover:border-gold-400/50 backdrop-blur-sm transition-all"
          >
            <span>Lihat Paket</span>
            <ArrowRight className="w-4 h-4 text-emerald-300" />
          </a>
        </div>

        {/* Trust Note */}
        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-emerald-200/80">
          <ShieldCheck className="w-4 h-4 text-gold-400" />
          <span>Respon Cepat • Pelayanan Ramah • Informasi Transparan</span>
        </div>
      </div>
    </section>
  );
};

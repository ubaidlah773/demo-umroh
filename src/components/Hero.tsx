"use client";

import React from "react";
import Image from "next/image";
import { siteConfig, getWhatsAppUrl } from "@/config/siteConfig";
import {
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  MapPin,
} from "lucide-react";

interface HeroProps {
  onOpenInquiry?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white pt-10 pb-20 lg:pt-16 lg:pb-28"
    >
      {/* Decorative Background Lighting & Ambient Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 pattern-dark-subtle opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copywriting & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-800/80 text-gold-300 border border-gold-500/30 shadow-sm backdrop-blur-sm uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>CONTOH WEBSITE TRAVEL UMROH</span>
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/10 text-emerald-100 border border-white/10">
                {siteConfig.badge}
              </span>
            </div>

            {/* Main Headline (Single H1 on page) */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Persiapkan Perjalanan <br />
              <span className="gold-gradient-text drop-shadow-sm">
                Menuju Tanah Suci
              </span>{" "}
              dengan Lebih Mudah
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-emerald-100/90 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Contoh website Travel Umroh yang membantu calon jamaah melihat paket,
              jadwal, fasilitas, dan menghubungi admin dengan mudah.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#paket"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-emerald-950 font-bold px-7 py-4 rounded-xl text-base shadow-lg shadow-gold-900/30 hover:shadow-gold-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Lihat Paket Umroh</span>
                <ArrowRight className="w-4 h-4 text-emerald-950" />
              </a>

              <button
                type="button"
                onClick={onOpenInquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-900/70 hover:bg-emerald-800/90 text-white font-semibold px-6 py-4 rounded-xl text-base border border-emerald-700/80 hover:border-gold-400/50 shadow-md backdrop-blur-sm transition-all"
              >
                <MessageCircle className="w-5 h-5 text-gold-400" />
                <span>Konsultasi</span>
              </button>
            </div>

            {/* Trust Microcopy */}
            <div className="pt-3 flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-emerald-200/85">
              <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Informasi transparan • Fasilitas jelas • Konsultasi responsif</span>
            </div>

            {/* Quick preview highlights */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-emerald-800/60 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <span className="block text-xs text-emerald-300 font-medium">Paket Ibadah</span>
                <span className="text-sm font-semibold text-white">Transparan</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-xs text-emerald-300 font-medium">Jadwal</span>
                <span className="text-sm font-semibold text-white">Terstruktur</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-xs text-emerald-300 font-medium">Layanan</span>
                <span className="text-sm font-semibold text-white">WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Visual Showcase */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative p-2.5 rounded-3xl bg-gradient-to-tr from-gold-500/30 via-emerald-800/40 to-gold-400/20 shadow-2xl border border-gold-400/30 backdrop-blur-md">
                <div className="relative h-[380px] sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-inner bg-emerald-950">
                  <Image
                    src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200&auto=format&fit=crop"
                    alt="Suasana Ibadah di Masjidil Haram"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent" />
                  
                  {/* Photo Caption Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-emerald-950/80 backdrop-blur-md border border-white/10 text-xs text-emerald-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span className="font-medium text-white">Baitullah Makkah</span>
                    </div>
                    <span className="text-[10px] text-gold-300 font-mono">Tanah Suci</span>
                  </div>
                </div>

                {/* Floating Card 1 */}
                <div className="absolute -top-4 -right-2 sm:-right-4 bg-emerald-900/90 backdrop-blur-md border border-gold-400/40 shadow-xl rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 animate-bounce-gentle">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/20 border border-gold-400/30 flex items-center justify-center text-gold-300">
                    <Calendar className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gold-300 font-semibold block">
                      Jadwal &amp; Itinerary
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white block">
                      Terstruktur &amp; Jelas
                    </span>
                  </div>
                </div>

                {/* Floating Card 2 */}
                <div className="absolute -bottom-5 -left-2 sm:-left-5 bg-white/95 backdrop-blur-md border border-emerald-100 shadow-xl rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 text-slate-800">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">
                      Integrasi WhatsApp
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                      Konsultasi Cepat Jamaah
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import GallerySection from "@/components/GallerySection";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-charcoal-950 text-ivory-100 pt-28 pb-24">
      {/* Top Banner */}
      <section className="px-4 sm:px-6 lg:px-8 mb-4">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold-400 hover:text-gold-300 mb-6 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4 block mx-auto w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            EDITORIAL VISUAL ARCHIVE
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-ivory-100 tracking-tight mb-4">
            Visual Story of <span className="gold-gradient-text">D’Sultan</span>
          </h1>

          <p className="text-base sm:text-lg text-ivory-300 font-light max-w-2xl mx-auto leading-relaxed">
            Eksplorasi keindahan sudut ruang indoor ber-AC, taman tropis outdoor, racikan makanan dan minuman berkelas, serta dinamika malam live music kami.
          </p>
        </div>
      </section>

      {/* Full Gallery with Lightbox Integration */}
      <GallerySection isFullPage={true} />
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Gallery from "@/components/Gallery";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-cream-100 text-olive-900 pt-28 pb-24 relative">
      {/* Background subtle linen */}
      <div className="absolute inset-0 pattern-linen opacity-50 pointer-events-none" />

      {/* Top Banner */}
      <section className="px-4 sm:px-6 lg:px-8 mb-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sage-600 hover:text-olive-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>KEMBALI KE BERANDA</span>
          </Link>

          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-sage-600">
              № 06 — VISUAL ESSAY
            </span>
            <span className="h-px w-8 bg-beige-300" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-terracotta-500">
              MOMENTS & ATMOSPHERE
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-olive-900 tracking-tight mb-4">
            Galeri Resto Kayu Manis
          </h1>

          <p className="text-base sm:text-lg text-olive-800/80 font-light max-w-2xl mx-auto leading-relaxed">
            Menampilkan kesegaran sajian seafood pesisir Tuban, kenyamanan ruangan ber-AC, kehangatan meja makan keluarga, dan area restoran yang lapang.
          </p>
        </div>
      </section>

      {/* Gallery Component */}
      <Gallery />
    </div>
  );
}

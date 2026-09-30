"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SignatureDish() {
  return (
    <section className="py-24 sm:py-32 bg-sage-600 text-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* KIRI: Foto Gurami / Seafood Besar (col-span-7) */}
          <div className="lg:col-span-7 relative">
            <div className="relative h-[380px] sm:h-[480px] lg:h-[540px] w-full rounded-sm overflow-hidden border border-cream-100/20 shadow-2xl bg-sage-700 group">
              <Image
                src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1400&q=85"
                alt="Gurami Asam Manis - Resto Kayu Manis Tuban"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>
          </div>

          {/* KANAN: Detail Dish dengan Typography Cream (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs tracking-[0.24em] uppercase text-cream-200/80 font-semibold">
                THE SIGNATURE
              </span>
              <span className="font-mono text-2xl font-light text-cream-200/60">
                01
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-cream-100 leading-[1.05] mb-6">
              GURAMI <br />
              <span className="italic">ASAM MANIS</span>
            </h2>

            <p className="text-base sm:text-lg text-cream-200/90 font-light leading-relaxed mb-4">
              One of our popular choices for a comforting Indonesian dining experience.
            </p>

            <p className="text-sm text-cream-200/75 leading-relaxed font-light mb-8">
              Ikan gurami goreng garing disiram saus asam manis istimewa dengan potongan nanas segar, paprika renyah, dan bawang bombay. Pilihan favorit keluarga yang selalu hadir di meja makan.
            </p>

            <div>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-sm bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 font-mono text-xs tracking-wider uppercase font-medium transition-all group shadow-sm"
              >
                <span>VIEW MENU</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TableSection() {
  const CATEGORIES = [
    {
      num: "01",
      title: "SHARE",
      description: "Menu porsi tengah untuk dinikmati dan dicicipi bersama di meja makan.",
      tag: "IKAN BAKAR · KEPITING · UDANG",
    },
    {
      num: "02",
      title: "FAMILY",
      description: "Pilihan hidangan yang disukai seluruh anggota keluarga dari anak-anak hingga kakek-nenek.",
      tag: "GURAMI · MIE GORENG · AYAM",
    },
    {
      num: "03",
      title: "GROUP",
      description: "Sajian lengkap yang siap menyambut jamuan kantor, komunitas, arisan, maupun rombongan bus.",
      tag: "SET MENU · GATHERING",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-cream-50 border-t border-b border-olive-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Text & 3 Categories (col-span-5) */}
          <div className="lg:col-span-5">
            <span className="font-mono text-xs tracking-[0.24em] uppercase text-terracotta-500 font-semibold block mb-3">
              SHARING CULTURE
            </span>

            <h2 className="font-serif text-5xl sm:text-6xl font-normal text-olive-900 leading-[0.96] tracking-tight mb-4">
              MADE <br />
              <span className="italic font-serif text-sage-600">FOR THE TABLE</span>
            </h2>

            <p className="text-base sm:text-lg text-olive-900/80 font-light leading-relaxed mb-10">
              Some dishes are simply better when shared.
            </p>

            {/* 3 Categories List */}
            <div className="space-y-6 border-t border-olive-900/10 pt-6">
              {CATEGORIES.map((cat, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-serif text-2xl font-normal text-olive-900 group-hover:text-terracotta-500 transition-colors">
                      {cat.title}
                    </h3>
                    <span className="font-mono text-xs text-olive-900/40">
                      {cat.num}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-olive-900/70 font-light leading-relaxed mb-1.5">
                    {cat.description}
                  </p>
                  <span className="font-mono text-[10px] text-terracotta-500/90 tracking-wider uppercase block">
                    {cat.tag}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-olive-900/10">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-terracotta-500 hover:text-terracotta-600 font-semibold group"
              >
                <span>LIHAT PILIHAN MENU TENGAH</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Large Table Photography (col-span-7) */}
          <div className="lg:col-span-7">
            <div className="relative h-[420px] sm:h-[520px] lg:h-[580px] w-full rounded-sm overflow-hidden border border-olive-900/12 shadow-editorial bg-cream-200 group">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=85"
                alt="Meja Jamuan Makan Bersama di Resto Kayu Manis Tuban"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 bg-cream-100/95 backdrop-blur-sm px-4 py-2 rounded-sm border border-olive-900/10 font-mono text-[11px] text-olive-900 uppercase tracking-widest">
                SHARING TABLE · GATHERING READY
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

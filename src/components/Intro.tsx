"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section id="about" className="py-24 sm:py-36 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Large Typography (col-span-8) */}
          <div className="lg:col-span-8">
            <span className="font-mono text-xs tracking-[0.24em] uppercase text-terracotta-500 font-semibold block mb-4">
              ABOUT RESTO KAYU MANIS
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-olive-900 leading-[1.04] tracking-tight mb-8">
              GOOD FOOD <br />
              BRINGS PEOPLE <br />
              <span className="italic font-serif text-sage-600">TOGETHER.</span>
            </h2>

            <div className="max-w-xl">
              <p className="text-lg sm:text-xl text-olive-900/80 font-light leading-relaxed mb-6">
                Resto Kayu Manis adalah tempat untuk menikmati hidangan seafood dan menu Nusantara dalam suasana yang nyaman dan luas.
              </p>
              <p className="text-sm sm:text-base text-olive-900/60 leading-relaxed font-normal">
                Dirancang khusus untuk menghadirkan kenyamanan bagi seluruh generasi: meja makan panjang untuk keluarga, ruangan sejuk ber-AC, dan kemudahan akses parkir langsung di jalur protokol kota Tuban.
              </p>
            </div>
          </div>

          {/* Small Image & Atmosphere Capsule (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
            <div className="relative w-full max-w-sm h-72 sm:h-80 rounded-sm overflow-hidden border border-olive-900/15 shadow-editorial bg-cream-200">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="Suasana Resto Kayu Manis Tuban"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover object-center"
              />
            </div>
            <div className="mt-4 font-mono text-[11px] text-olive-900/50 uppercase tracking-widest text-left lg:text-right">
              SPACIOUS DINING · COMFORTABLE GATHERING
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { testimonials } from "@/config/siteConfig";
import { Star, Quote, Sparkles } from "lucide-react";

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-100 text-emerald-950 border border-gold-300">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Contoh Testimoni</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contoh Ulasan &amp; Testimoni
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Format tampilan ulasan jamaah untuk menunjukkan bagaimana biro travel dapat menampilkan kepuasan pelayanan.
          </p>
        </div>

        {/* 3 Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi) => (
            <div
              key={testi.id}
              className="relative p-7 sm:p-8 rounded-3xl bg-ivory-50/70 border border-slate-200 shadow-sm hover:shadow-card hover:border-gold-300/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-600 flex items-center justify-center">
                    <Quote className="w-5 h-5 text-gold-600" />
                  </div>
                  <div className="flex items-center gap-1 text-gold-500">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed mb-6">
                  &ldquo;{testi.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-slate-900">
                    {testi.name}
                  </h3>
                  <span className="text-xs text-emerald-800 font-medium block">
                    {testi.role}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white text-slate-600 border border-slate-200">
                  {testi.program}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-10 text-center text-xs text-slate-500">
          *Contoh Testimoni — Data dapat diisi sesuai ulasan riil jamaah biro travel Anda.
        </div>
      </div>
    </section>
  );
};

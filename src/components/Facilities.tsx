"use client";

import React from "react";
import { facilities } from "@/config/siteConfig";
import {
  Plane,
  Building,
  Bus,
  Utensils,
  Users,
  Luggage,
  Sparkles,
  Info,
} from "lucide-react";

export const Facilities: React.FC = () => {
  const iconComponents: Record<string, React.ReactNode> = {
    Plane: <Plane className="w-6 h-6 text-emerald-800" />,
    Hotel: <Building className="w-6 h-6 text-emerald-800" />,
    Bus: <Bus className="w-6 h-6 text-emerald-800" />,
    Utensils: <Utensils className="w-6 h-6 text-emerald-800" />,
    Users: <Users className="w-6 h-6 text-emerald-800" />,
    Luggage: <Luggage className="w-6 h-6 text-emerald-800" />,
  };

  return (
    <section id="fasilitas" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-950 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Kenyamanan Jamaah</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Fasilitas Selama Perjalanan
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Standar kelengkapan akomodasi dan pendampingan yang disiapkan untuk
            menjaga kenyamanan serta kekhusyukan ibadah di Tanah Suci.
          </p>
        </div>

        {/* 6 Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {facilities.map((fac) => (
            <div
              key={fac.id}
              className="group p-6 sm:p-7 rounded-2xl bg-ivory-50/70 border border-slate-200 hover:border-gold-400/80 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-emerald-100 shadow-sm flex items-center justify-center group-hover:scale-105 group-hover:bg-gold-50 transition-all">
                    {iconComponents[fac.icon] || <Sparkles className="w-6 h-6 text-emerald-800" />}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    {fac.tag}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-emerald-800 transition-colors">
                  {fac.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {fac.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center text-[11px] text-slate-400">
                <span>Terstandarisasi paket Safara</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Disclaimer */}
        <div className="mt-12 max-w-xl mx-auto p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Contoh fasilitas demo. Disesuaikan dengan paket yang dipilih.</span>
        </div>
      </div>
    </section>
  );
};

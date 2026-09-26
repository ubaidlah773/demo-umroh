"use client";

import React from "react";
import { legalityData } from "@/config/siteConfig";
import { ShieldCheck, FileCheck, Building2, AlertCircle } from "lucide-react";

export const Legality: React.FC = () => {
  const iconList = [ShieldCheck, Building2, FileCheck];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label and Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
            <span>Legalitas Travel</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Legalitas Travel
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Format penyajian informasi perizinan resmi untuk membangun kepercayaan penuh calon jamaah.
          </p>
        </div>

        {/* 3 Placeholder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {legalityData.map((item, idx) => {
            const Icon = iconList[idx] || ShieldCheck;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-ivory-50/70 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-800 mb-4 shadow-subtle">
                    <Icon className="w-5 h-5 text-emerald-800" />
                  </div>

                  <h3 className="font-serif text-base font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Structured Placeholder Box */}
                <div className="p-3 rounded-xl bg-white border border-dashed border-slate-300 text-center">
                  <span className="text-xs font-mono font-bold text-emerald-900 tracking-wide">
                    {item.placeholderValue}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-8 max-w-2xl mx-auto p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
            <strong className="block font-bold mb-0.5">Keterangan:</strong>
            Data dapat diisi sesuai dokumen resmi travel.
          </div>
        </div>
      </div>
    </section>
  );
};

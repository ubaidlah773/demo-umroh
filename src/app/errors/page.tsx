'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Search,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { EXCEL_ERRORS_DATA } from '@/data/errors';

export default function ErrorsPage() {
  const [search, setSearch] = useState('');

  const filtered = EXCEL_ERRORS_DATA.filter((err) => {
    return (
      !search ||
      err.code.toLowerCase().includes(search.toLowerCase()) ||
      err.name.toLowerCase().includes(search.toLowerCase()) ||
      err.meaning.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <header className="space-y-4 border-b border-[#E5E7EB] pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono font-bold">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>TROUBLESHOOTING ENCYCLOPEDIA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
          Ensiklopedia Kode Error Excel & Solusinya
        </h1>
        <p className="text-sm text-[#6B7280] max-w-2xl leading-relaxed">
          Jangan panik saat melihat tanda pagar atau teks aneh di spreadsheet. Temukan penyebab spesifik dari error #DIV/0!, #VALUE!, #REF!, #N/A, #NAME?, dan cara memperbaikinya dengan cepat.
        </p>

        {/* Search */}
        <div className="pt-2 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kode error (cth: #VALUE!, #REF!, #DIV/0!)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E5E7EB] rounded-[6px] focus:outline-none focus:border-[#171717]"
            />
          </div>
        </div>
      </header>

      {/* Grid of Errors */}
      <section className="space-y-6">
        {filtered.map((err) => (
          <div
            key={err.code}
            className="bg-white border border-[#E5E7EB] rounded-[6px] p-6 space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F3F4F6] pb-3">
              <div className="flex items-center gap-3">
                <span className="text-lg font-mono font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded border border-rose-200">
                  {err.code}
                </span>
                <h2 className="text-base font-bold text-[#171717]">
                  {err.name}
                </h2>
              </div>
            </div>

            <p className="text-sm text-[#374151] leading-relaxed">
              {err.meaning}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Causes */}
              <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] space-y-2">
                <h3 className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                  Penyebab Utama:
                </h3>
                <ul className="space-y-1.5 text-xs text-[#4B5563]">
                  {err.causes.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fixes */}
              <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-[6px] space-y-2">
                <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Cara Memperbaiki (Fix):
                </h3>
                <ul className="space-y-1.5 text-xs text-[#4B5563]">
                  {err.fixSteps.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Formula comparison */}
            {(err.badFormula || err.goodFormula) && (
              <div className="pt-2 border-t border-[#F3F4F6] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {err.badFormula && (
                  <div className="space-y-1">
                    <span className="text-rose-700 font-semibold block">Formula yang Bermasalah:</span>
                    <code className="block bg-rose-50 p-2 rounded border border-rose-200 font-mono text-rose-900">
                      {err.badFormula}
                    </code>
                  </div>
                )}
                {err.goodFormula && (
                  <div className="space-y-1">
                    <span className="text-emerald-700 font-semibold block">Formula Solusi yang Benar:</span>
                    <code className="block bg-emerald-50 p-2 rounded border border-emerald-200 font-mono text-emerald-900">
                      {err.goodFormula}
                    </code>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

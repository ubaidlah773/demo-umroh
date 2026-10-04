'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Lightbulb,
  Search,
  Filter,
  CheckCircle2,
  Keyboard,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { TIPS_DATA } from '@/data/tips';

export default function TipsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const categories = ['all', 'general', 'word', 'excel', 'powerpoint'];

  const filtered = TIPS_DATA.filter((tip) => {
    const matchCat = selectedCategory === 'all' || tip.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch =
      !search ||
      tip.title.toLowerCase().includes(search.toLowerCase()) ||
      tip.description.toLowerCase().includes(search.toLowerCase()) ||
      tip.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <header className="space-y-4 border-b border-[#E5E7EB] pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-bold">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>100+ TIPS & TRICKS RESMI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
          Koleksi Tips & Trik Rahasia Pengguna Mahir
        </h1>
        <p className="text-sm text-[#6B7280] max-w-2xl leading-relaxed">
          Trik-trik praktis yang jarang diketahui pengguna biasa untuk mempercepat alur kerja dokumen, rumus spreadsheet, dan presentasi Anda.
        </p>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-[6px] text-xs capitalize transition-colors ${
                  selectedCategory === c
                    ? 'bg-[#171717] text-white font-medium'
                    : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#171717]'
                }`}
              >
                {c === 'all' ? 'Semua Tips' : c}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari tips..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E5E7EB] rounded-[6px] focus:outline-none focus:border-[#171717]"
            />
          </div>
        </div>
      </header>

      {/* Grid of Tips */}
      <section className="space-y-3">
        <div className="text-xs text-[#6B7280]">
          Menampilkan {filtered.length} tips praktis
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tip) => (
            <div
              key={tip.id}
              className="bg-white border border-[#E5E7EB] rounded-[6px] p-5 hover:border-[#9CA3AF] transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F3F4F6] text-[#4B5563] uppercase">
                    {tip.category}
                  </span>
                  {tip.shortcut && (
                    <kbd className="px-1.5 py-0.5 rounded bg-[#F9FAFB] border border-[#E5E7EB] font-mono text-[10px] text-[#171717]">
                      {tip.shortcut}
                    </kbd>
                  )}
                </div>

                <h3 className="text-sm font-bold text-[#171717] leading-snug">
                  {tip.number}. {tip.title}
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  {tip.description}
                </p>

                {tip.steps && (
                  <div className="space-y-1 pt-2 border-t border-[#F3F4F6]">
                    <span className="text-[11px] font-semibold text-[#6B7280] block">
                      Langkah Eksekusi:
                    </span>
                    <ol className="space-y-1 text-[11px] text-[#4B5563]">
                      {tip.steps.map((st, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-1.5">
                          <span className="font-mono text-[#9CA3AF]">{sIdx + 1}.</span>
                          <span>{st}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {tip.tags && (
                <div className="flex flex-wrap gap-1 pt-2 border-t border-[#F3F4F6]">
                  {tip.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] text-[#6B7280] bg-[#F9FAFB] px-1.5 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

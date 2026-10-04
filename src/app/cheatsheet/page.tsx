'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileCode,
  Search,
  Copy,
  Check,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { CHEATSHEET_ITEMS } from '@/data/cheatsheet';

export default function CheatsheetPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['all', 'Matematika Dasar', 'Statistik Dasar', 'Logika', 'Pencarian & Referensi', 'Manipulasi Teks'];

  const filtered = CHEATSHEET_ITEMS.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.syntax.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCopy = (id: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <header className="space-y-4 border-b border-[#E5E7EB] pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-green-50 border border-green-200 text-green-800 text-xs font-mono font-bold">
          <FileCode className="w-3.5 h-3.5" />
          <span>OFFICE FORMULA CHEATSHEET</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
          Lembar Sontekan Rumus & Fungsi Excel
        </h1>
        <p className="text-sm text-[#6B7280] max-w-2xl leading-relaxed">
          Koleksi sintaksis rumus Microsoft Excel paling sering digunakan di dunia kerja. Klik tombol salin untuk menyalin rumus langsung ke clipboard Anda.
        </p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-[6px] text-xs transition-colors shrink-0 ${
                  selectedCategory === c
                    ? 'bg-[#171717] text-white font-medium'
                    : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#171717]'
                }`}
              >
                {c === 'all' ? 'Semua Kategori' : c}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari rumus (cth: VLOOKUP)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E5E7EB] rounded-[6px] focus:outline-none focus:border-[#171717]"
            />
          </div>
        </div>
      </header>

      {/* Cheatsheet Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white border border-[#E5E7EB] rounded-[6px] p-5 hover:border-green-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold font-mono text-green-700">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F3F4F6] text-[#4B5563]">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs text-[#4B5563] leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] uppercase font-mono text-[#9CA3AF] block">
                    Sintaksis Resmi:
                  </span>
                  <code className="block bg-[#F9FAFB] p-2 rounded border border-[#E5E7EB] font-mono text-[11px] text-[#171717]">
                    {item.syntax}
                  </code>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] uppercase font-mono text-[#9CA3AF] block">
                    Contoh Penerapan:
                  </span>
                  <code className="block bg-emerald-50/50 p-2 rounded border border-emerald-200 font-mono text-[11px] text-emerald-900">
                    {item.example}
                  </code>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F3F4F6] flex items-center justify-between">
                <button
                  onClick={() => handleCopy(item.id, item.copyValue)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#4B5563] hover:text-[#171717] transition-colors"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Tersalin ke Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Formula</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

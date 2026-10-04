'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Keyboard,
  Search,
  Filter,
  Zap,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import ShortcutTrainer from '@/components/ShortcutTrainer';
import { SHORTCUTS_DATA } from '@/data/shortcuts';

export default function ShortcutsPage() {
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState<'all' | 'word' | 'excel' | 'powerpoint'>('all');

  const filtered = SHORTCUTS_DATA.filter((s) => {
    const matchApp = selectedApp === 'all' || s.app === selectedApp || s.app === 'all';
    const matchSearch =
      !search ||
      s.action.toLowerCase().includes(search.toLowerCase()) ||
      (s.description || '').toLowerCase().includes(search.toLowerCase()) ||
      s.keys.join('+').toLowerCase().includes(search.toLowerCase());
    return matchApp && matchSearch;
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <header className="space-y-4 border-b border-[#E5E7EB] pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold">
          <Keyboard className="w-3.5 h-3.5" />
          <span>KEYBOARD REFLEX & DIRECTORY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
          Pusat Shortcut & Keyboard Trainer
        </h1>
        <p className="text-sm text-[#6B7280] max-w-2xl leading-relaxed">
          Kuasai tombol pintas paling penting di Word, Excel, dan PowerPoint. Latih refleks mengetik Anda di simulator bawah ini agar pekerjaan selesai 3x lebih cepat!
        </p>
      </header>

      {/* 1. Interactive Reflex Trainer Component */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
          <h2 className="text-lg font-bold text-[#171717] flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Reflex Trainer: Tekan Tombol di Keyboard Anda!</span>
          </h2>
          <span className="text-xs font-mono text-[#6B7280]">Mode Latihan Interaktif</span>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-6">
          <ShortcutTrainer />
        </div>
      </section>

      {/* 2. Searchable Shortcut Directory */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
          <div>
            <h2 className="text-lg font-bold text-[#171717]">
              Direktori Lengkap Shortcut Office
            </h2>
            <p className="text-xs text-[#6B7280]">
              Cari tombol kombinasi untuk berbagai tugas administrasi.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* App filter */}
            <div className="flex items-center gap-1">
              {(['all', 'word', 'excel', 'powerpoint'] as const).map((app) => (
                <button
                  key={app}
                  onClick={() => setSelectedApp(app)}
                  className={`px-2.5 py-1 rounded text-xs capitalize transition-colors ${
                    selectedApp === app
                      ? 'bg-[#171717] text-white font-medium'
                      : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#171717]'
                  }`}
                >
                  {app === 'all' ? 'Semua' : app}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-48">
              <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1 text-xs bg-white border border-[#E5E7EB] rounded-[6px] focus:outline-none focus:border-[#171717]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filtered.map((s, idx) => (
            <div
              key={idx}
              className="p-4 bg-white border border-[#E5E7EB] rounded-[6px] hover:border-[#9CA3AF] transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F3F4F6] text-[#4B5563] uppercase">
                    {s.app}
                  </span>
                  <span className="text-[11px] text-[#9CA3AF] font-mono">
                    {s.category}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-[#171717]">
                  {s.action}
                </h3>
                <p className="text-[11px] text-[#6B7280] leading-snug">
                  {s.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#F3F4F6] flex flex-wrap gap-1">
                {s.keys.map((k, kIdx) => (
                  <kbd
                    key={kIdx}
                    className="px-2 py-1 rounded bg-[#F8F9FA] border border-[#E5E7EB] font-mono text-xs text-[#171717] font-semibold"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

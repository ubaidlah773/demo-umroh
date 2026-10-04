'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Search,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { DASHBOARD_CHEATSHEET_SECTIONS } from '@/data/dashboardCheatsheetData';

export default function DashboardCheatsheetPage() {
  const [search, setSearch] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedText(txt);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <header className="space-y-4 border-b border-[#E5E7EB] pb-6">
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="text-xs text-[#6B7280] hover:text-[#171717] inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard Academy Hub</span>
          </Link>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>RINGKASAN TEKNIS LENGKAP</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight mt-2">
            Dashboard Formula & Design Cheatsheet
          </h1>
          <p className="text-sm text-[#6B7280] max-w-2xl mt-1 leading-relaxed">
            Kompilasi praktis formula Excel wajib (SUMIFS, XLOOKUP, INDEX-MATCH), pohon keputusan pemilihan grafik (Chart Decision Tree), palet warna UI, dan prinsip desain eksekutif.
          </p>
        </div>

        {/* Search */}
        <div className="pt-2 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari formula atau aturan (cth: SUMIFS, palet warna, pie chart)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E5E7EB] rounded-[6px] focus:outline-none focus:border-[#171717]"
            />
          </div>
        </div>
      </header>

      {/* Cheatsheet Sections */}
      <div className="space-y-8">
        {DASHBOARD_CHEATSHEET_SECTIONS.map((section) => {
          const matchingItems = section.items.filter(
            (it) =>
              !search ||
              it.title.toLowerCase().includes(search.toLowerCase()) ||
              it.description.toLowerCase().includes(search.toLowerCase()) ||
              it.exampleOrRule.toLowerCase().includes(search.toLowerCase())
          );

          if (matchingItems.length === 0) return null;

          return (
            <section
              key={section.id}
              className="bg-white border border-[#E5E7EB] rounded-[6px] p-6 space-y-4"
            >
              <div className="border-b border-[#F3F4F6] pb-3">
                <h2 className="text-base font-bold text-[#171717]">
                  {section.title}
                </h2>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  {section.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {matchingItems.map((item, idx) => {
                  const isCopied = copiedText === item.exampleOrRule;

                  return (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-bold text-[#171717]">
                            {item.title}
                          </h3>
                          {item.tag && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB] text-[#4B5563]">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#4B5563] leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between gap-2">
                        <code className="text-[11px] font-mono text-sky-800 bg-white px-2 py-1 rounded border border-[#E5E7EB] truncate flex-1">
                          {item.exampleOrRule}
                        </code>
                        <button
                          onClick={() => handleCopy(item.exampleOrRule)}
                          className="p-1 text-[#6B7280] hover:text-[#171717] transition-colors shrink-0"
                          title="Salin teks"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

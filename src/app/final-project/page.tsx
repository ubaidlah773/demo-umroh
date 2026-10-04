'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Download,
  CheckCircle2,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Star,
} from 'lucide-react';
import { MINI_PROJECTS } from '@/data/projects';
import { downloadPracticeFile } from '@/lib/downloadHelper';

export default function FinalProjectPage() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleDownload = (proj: typeof MINI_PROJECTS[0]) => {
    setDownloadingId(proj.id);
    downloadPracticeFile(proj.downloadFile);
    setTimeout(() => setDownloadingId(null), 2500);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <header className="space-y-4 border-b border-[#E5E7EB] pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>CAPSTONE PROJECT PORTFOLIO</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
          Proyek Akhir & Portofolio Dunia Kerja
        </h1>
        <p className="text-sm text-[#6B7280] max-w-2xl leading-relaxed">
          Terapkan semua kombinasi skill Word, Excel, dan PowerPoint yang telah Anda pelajari dalam skenario bisnis terpadu: sistem kasir, laporan keuangan, surat massal, dan pitch deck eksekutif.
        </p>
      </header>

      {/* Grid of Mini Projects */}
      <section className="space-y-4">
        {MINI_PROJECTS.map((proj) => {
          const isExpanded = expandedId === proj.id;
          const isDownloading = downloadingId === proj.id;

          return (
            <div
              key={proj.id}
              className="bg-white border border-[#E5E7EB] rounded-[6px] p-6 space-y-4 hover:border-[#9CA3AF] transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#F3F4F6] text-[#4B5563]">
                      {proj.app} • {proj.level}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-[#171717]">
                    {proj.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4B5563] max-w-2xl leading-relaxed">
                    {proj.scenario}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDownload(proj)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-[6px] bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    {isDownloading ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Tersimpan</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh Starter File</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : proj.id)}
                    className="p-2 border border-[#E5E7EB] rounded-[6px] text-[#4B5563] hover:text-[#171717] hover:bg-[#F9FAFB] transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#F3F4F6]">
                <span className="text-[11px] font-semibold text-[#6B7280] mr-1">
                  Kompetensi Teruji:
                </span>
                {proj.skills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-[#F9FAFB] border border-[#E5E7EB] text-[#374151] px-2 py-0.5 rounded"
                  >
                    {sk}
                  </span>
                ))}
              </div>

              {/* Detailed Steps (Accordion) */}
              {isExpanded && (
                <div className="pt-4 border-t border-[#E5E7EB] space-y-3 animate-in fade-in">
                  <h3 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                    Langkah Pengerjaan Portofolio:
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {proj.steps.map((st, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] text-xs space-y-1"
                      >
                        <span className="font-bold text-[#171717] block">
                          {st.title}
                        </span>
                        <p className="text-[#4B5563] leading-relaxed">
                          {st.description}
                        </p>
                        {st.hint && (
                          <p className="text-emerald-700 font-mono text-[11px]">
                            💡 {st.hint}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}

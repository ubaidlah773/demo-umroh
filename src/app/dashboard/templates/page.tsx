'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  Check,
  Sparkles,
  BarChart3,
  Layers,
} from 'lucide-react';
import { DASHBOARD_TEMPLATES } from '@/data/dashboardTemplates';
import { downloadPracticeFile } from '@/lib/downloadHelper';

export default function DashboardTemplatesPage() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (tpl: typeof DASHBOARD_TEMPLATES[0]) => {
    setDownloadingId(tpl.id);
    downloadPracticeFile(tpl.downloadFile);
    setTimeout(() => setDownloadingId(null), 2500);
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
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>12 TEMPLATE EXCEL RESMI SIAP PAKAI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight mt-2">
            Template Dashboard Microsoft Excel (.xlsx)
          </h1>
          <p className="text-sm text-[#6B7280] max-w-2xl mt-1 leading-relaxed">
            Template spreadsheet profesional yang dirancang dengan arsitektur 5-sheet standar industri:
            <code className="text-[#171717] font-mono text-xs mx-1">RAW_DATA</code>,
            <code className="text-[#171717] font-mono text-xs mx-1">LOOKUP</code>,
            <code className="text-[#171717] font-mono text-xs mx-1">CALC</code>,
            <code className="text-[#171717] font-mono text-xs mx-1">DASHBOARD</code>, dan
            <code className="text-[#171717] font-mono text-xs mx-1">README</code>. Siap diisi data perusahaan Anda!
          </p>
        </div>
      </header>

      {/* Grid of Templates */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DASHBOARD_TEMPLATES.map((tpl) => {
          const isDownloading = downloadingId === tpl.id;

          return (
            <div
              key={tpl.id}
              className="bg-white border border-[#E5E7EB] rounded-[6px] p-5 hover:border-sky-400 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-semibold">
                    {tpl.category}
                  </span>
                  <span className="text-[11px] font-mono text-[#9CA3AF]">
                    {tpl.difficulty}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#171717] leading-snug">
                    {tpl.title}
                  </h3>
                  <p className="text-xs text-[#4B5563] mt-1.5 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                {/* Preview summary */}
                <div className="p-2.5 bg-[#F9FAFB] rounded border border-[#E5E7EB] text-[11px] text-[#374151]">
                  <strong className="text-[#171717] block mb-0.5">Komposisi Layout:</strong>
                  {tpl.preview}
                </div>

                {/* Skills & KPIs */}
                <div className="space-y-2 pt-2 border-t border-[#F3F4F6] text-[11px]">
                  <div>
                    <span className="text-[#6B7280] font-semibold block">Fitur & Formula:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tpl.requiredSkills.map((sk, idx) => (
                        <span key={idx} className="bg-white px-1.5 py-0.5 rounded border border-[#E5E7EB] text-[#4B5563]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[#6B7280] font-semibold block">KPI Terkalkulasi:</span>
                    <span className="text-[#4B5563]">
                      {tpl.kpis.slice(0, 3).join(', ')}...
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB]">
                <button
                  onClick={() => handleDownload(tpl)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-[6px] bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  {isDownloading ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Mengunduh File...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Unduh Template .xlsx</span>
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

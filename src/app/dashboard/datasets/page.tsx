'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  Database,
  CheckCircle2,
  Check,
  Table,
  Filter,
} from 'lucide-react';
import { DASHBOARD_DATASETS } from '@/data/dashboardDatasets';
import { downloadPracticeFile } from '@/lib/downloadHelper';

export default function DashboardDatasetsPage() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Sales', 'Finance', 'HR', 'Supply Chain', 'Marketing', 'Customer Support'];

  const filtered = DASHBOARD_DATASETS.filter((ds) =>
    selectedCategory === 'all' ? true : ds.category.toLowerCase().includes(selectedCategory.toLowerCase())
  );

  const handleDownload = (ds: typeof DASHBOARD_DATASETS[0]) => {
    setDownloadingId(ds.id);
    downloadPracticeFile(ds.downloadFile);
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
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-mono font-bold">
            <Database className="w-3.5 h-3.5" />
            <span>12 DATASET BISNIS RIIL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight mt-2">
            Dataset Latihan Mandiri Pembuatan Dashboard
          </h1>
          <p className="text-sm text-[#6B7280] max-w-2xl mt-1 leading-relaxed">
            Data mentah yang realistis dan siap dibersihkan (data cleaning), dimodelkan dengan PivotTable, serta divisualisasikan menjadi executive dashboard.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                selectedCategory === c
                  ? 'bg-[#171717] text-white font-medium'
                  : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#171717]'
              }`}
            >
              {c === 'all' ? 'Semua Dataset' : c}
            </button>
          ))}
        </div>
      </header>

      {/* Grid of Datasets */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((ds) => {
          const isDownloading = downloadingId === ds.id;

          return (
            <div
              key={ds.id}
              className="bg-white border border-[#E5E7EB] rounded-[6px] p-5 hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold">
                    {ds.category}
                  </span>
                  <span className="text-xs font-mono text-[#171717] font-bold">
                    {ds.rowCount.toLocaleString()} Baris Data
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#171717] leading-snug">
                    {ds.title}
                  </h3>
                  <p className="text-xs text-[#4B5563] mt-1.5 leading-relaxed">
                    {ds.description}
                  </p>
                </div>

                {/* Columns Preview */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-[#6B7280] block">
                    Atribut Kolom ({ds.columns.length} Kolom):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {ds.columns.map((col, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 bg-[#F9FAFB] rounded border border-[#E5E7EB] font-mono text-[10px] text-[#4B5563]"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Learning Objectives */}
                <div className="space-y-1 pt-2 border-t border-[#F3F4F6]">
                  <span className="text-[11px] font-semibold text-[#6B7280] block">
                    Target Latihan Praktik:
                  </span>
                  <ul className="space-y-1 text-xs text-[#4B5563]">
                    {ds.learningObjectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB]">
                <button
                  onClick={() => handleDownload(ds)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-[6px] bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  {isDownloading ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Berhasil Mengunduh</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Unduh File Excel .xlsx ({ds.rowCount} Baris)</span>
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

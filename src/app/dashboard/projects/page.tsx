'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  Layers,
  CheckCircle2,
  Filter,
  BarChart2,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  Check,
} from 'lucide-react';
import { DASHBOARD_PROJECTS } from '@/data/dashboardProjects';
import { downloadPracticeFile } from '@/lib/downloadHelper';

export default function DashboardProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const categories = ['all', 'Sales & Commercial', 'Human Resources', 'Finance & Accounting', 'Operations & Logistics', 'Marketing & Digital', 'Healthcare & Services'];

  const filteredProjects = DASHBOARD_PROJECTS.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchDiff = selectedDifficulty === 'all' || p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchCat && matchDiff;
  });

  const handleDownload = (p: typeof DASHBOARD_PROJECTS[0]) => {
    setDownloadingId(p.id);
    downloadPracticeFile({
      filename: p.datasetInfo.name,
      fileType: 'xlsx',
      title: p.title,
      size: '35 KB',
      description: `Dataset resmi untuk ${p.title} (${p.datasetInfo.rows} baris data).`,
    });
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
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>15 STUDI KASUS BISNIS NYATA</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight mt-2">
            15 Proyek Real Executive Dashboard
          </h1>
          <p className="text-sm text-[#6B7280] max-w-2xl mt-1 leading-relaxed">
            Bangun portofolio profesional berstandar industri. Setiap proyek dilengkapi brief bisnis nyata, dataset Excel, metrik KPI wajib, tipe grafik, konfigurasi slicer, dan panduan langkah demi langkah.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          <div className="flex items-center gap-1.5 text-xs text-[#4B5563]">
            <Filter className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span className="font-semibold">Kategori:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
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
                {c === 'all' ? 'Semua Kategori' : c}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#6B7280]">
          <span>Menampilkan {filteredProjects.length} dari 15 Proyek Portofolio</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredProjects.map((project) => {
            const isExpanded = expandedId === project.id;
            const isDownloading = downloadingId === project.id;

            return (
              <div
                key={project.id}
                className="bg-white border border-[#E5E7EB] rounded-[6px] p-5 sm:p-6 hover:border-[#D1D5DB] transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#F3F4F6] text-[#4B5563]">
                        PROYEK #{project.number.toString().padStart(2, '0')}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-medium">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-[#9CA3AF]">
                        Tingkat: {project.difficulty}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-[#171717]">
                      {project.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-3xl">
                      {project.brief}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <button
                      onClick={() => handleDownload(project)}
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
                          <span>Unduh Dataset .xlsx</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : project.id)}
                      className="flex items-center gap-1 text-xs text-[#4B5563] hover:text-[#171717] px-2 py-1"
                    >
                      <span>{isExpanded ? 'Tutup Rincian' : 'Lihat Rincian'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Quick Info Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#F3F4F6] text-xs text-[#4B5563]">
                  <div>
                    <strong className="text-[#171717] block">Dataset:</strong>
                    <span className="font-mono text-[11px] text-[#6B7280]">
                      {project.datasetInfo.name} ({project.datasetInfo.rows} baris)
                    </span>
                  </div>
                  <div>
                    <strong className="text-[#171717] block">Target KPI:</strong>
                    <span className="text-[11px] text-[#6B7280]">
                      {project.requiredKpis.length} Metrik Utama
                    </span>
                  </div>
                  <div>
                    <strong className="text-[#171717] block">Komponen Visual:</strong>
                    <span className="text-[11px] text-[#6B7280]">
                      {project.requiredCharts.length} Visual & {project.requiredFilters.length} Slicer
                    </span>
                  </div>
                </div>

                {/* Expanded Full Specifications */}
                {isExpanded && (
                  <div className="pt-4 border-t border-[#E5E7EB] space-y-6 animate-in fade-in">
                    {/* 1. KPIs */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                        1. Metrik KPI yang Wajib Dihitung:
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.requiredKpis.map((kpi, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] text-xs text-[#374151] flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{kpi}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 2. Charts & Visuals */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                        2. Grafik & Visual yang Harus Dibuat:
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.requiredCharts.map((ch, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] text-xs text-[#374151] flex items-center gap-2"
                          >
                            <BarChart2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                            <span>{ch}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. Filters / Slicers */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                        3. Slicer & Kontrol Interaktif:
                      </h3>
                      <ul className="space-y-1.5 text-xs text-[#4B5563]">
                        {project.requiredFilters.map((fl, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="font-mono text-sky-600 font-bold">•</span>
                            <span>{fl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 4. Checklist & Expected Insights */}
                    {project.checklist && project.checklist.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                          4. Checklist Kriteria Penyelesaian Proyek:
                        </h3>
                        <div className="space-y-1.5">
                          {project.checklist.map((item, idx) => (
                            <div key={idx} className="p-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] text-xs text-[#374151] flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.expectedInsights && project.expectedInsights.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                          5. Insight Bisnis yang Diharapkan:
                        </h3>
                        <ul className="space-y-1 text-xs text-[#4B5563]">
                          {project.expectedInsights.map((ins, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-sky-600 font-bold">•</span>
                              <span>{ins}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

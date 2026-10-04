'use client';

import React from 'react';
import Link from 'next/link';
import {
  BarChart3,
  Layers,
  FileSpreadsheet,
  Database,
  Award,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Download,
} from 'lucide-react';
import { DASHBOARD_LESSONS } from '@/data/dashboardCurriculum';
import InteractiveDashboardSimulator from '@/components/InteractiveDashboardSimulator';

export default function DashboardAcademyHub() {
  const quickResources = [
    {
      title: '15 Proyek Real Dashboard',
      desc: 'Studi kasus nyata: Sales Executive, HR Turnover, Financial KPI, Supply Chain, dll.',
      icon: Layers,
      href: '/dashboard/projects',
      count: '15 Kasus Riil',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      title: '12 Template Dashboard .xlsx',
      desc: 'File spreadsheet siap pakai dengan layout standar industri, rumus otomatis, & slicer.',
      icon: FileSpreadsheet,
      href: '/dashboard/templates',
      count: '12 File Siap Pakai',
      color: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      title: '12 Dataset Latihan Bisnis',
      desc: 'Data mentah 1.000+ baris transaksi, logistik, & operasional untuk latihan mandiri.',
      icon: Database,
      href: '/dashboard/datasets',
      count: '12 Dataset Lengkap',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      title: 'Dashboard Cheatsheet',
      desc: 'Ringkasan rumus penting (SUMIFS, XLOOKUP), chart decision tree, & aturan 5 detik.',
      icon: BookOpen,
      href: '/dashboard/cheatsheet',
      count: 'Panduan Lengkap',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      title: 'Sertifikasi Dashboard Specialist',
      desc: 'Uji kompetensi Anda dengan ujian sertifikasi resmi berstandar industri.',
      icon: Award,
      href: '/dashboard/certification',
      count: 'Sertifikat Digital',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Editorial Header */}
      <header className="space-y-4 border-b border-[#E5E7EB] pb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>LEARNING TRACK SPESIALISASI EXCEL</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
          📊 Dashboard Academy
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280] max-w-2xl leading-relaxed">
          Kuasai cara mengubah data mentah ribuan baris menjadi dashboard interaktif satu layar yang rapi, informatif, dan siap dipresentasikan ke manajemen eksekutif.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#4B5563]">
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            16 Level Terstruktur
          </span>
          <span className="text-[#D1D5DB]">•</span>
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            15 Proyek Portofolio
          </span>
          <span className="text-[#D1D5DB]">•</span>
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Simulator Interaktif Langsung di Browser
          </span>
        </div>
      </header>

      {/* Quick Access Resource Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {quickResources.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="p-4 bg-white border border-[#E5E7EB] rounded-[6px] hover:border-[#9CA3AF] transition-all flex flex-col justify-between group space-y-3"
            >
              <div className="space-y-2">
                <div className={`w-8 h-8 rounded-[6px] flex items-center justify-center border ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-[#171717] group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#6B7280] leading-snug">
                  {item.desc}
                </p>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#9CA3AF] pt-2 border-t border-[#F3F4F6]">
                <span>{item.count}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </section>

      {/* Live Interactive Simulator Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E7EB] pb-3">
          <div>
            <h2 className="text-xl font-bold text-[#171717]">
              Simulator Interaktif Executive Dashboard
            </h2>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Coba langsung pengalaman interaksi dashboard: klik tombol filter wilayah & kategori di bawah untuk melihat kartu KPI dan visual berganti secara dinamis.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 self-start sm:self-auto">
            Live Browser Demo
          </span>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-4 sm:p-6">
          <InteractiveDashboardSimulator />
        </div>
      </section>

      {/* 16 Levels Comprehensive Curriculum Roadmap */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
          <div>
            <h2 className="text-xl font-bold text-[#171717]">
              Kurikulum 16 Level Dashboard Academy
            </h2>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Mulai dari level 1 jika Anda belum pernah membuat dashboard sama sekali, atau pilih level yang ingin Anda perdalam.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DASHBOARD_LESSONS.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/dashboard/level/${lesson.slug}`}
              className="p-5 bg-white border border-[#E5E7EB] rounded-[6px] hover:border-sky-400 hover:shadow-sm transition-all flex flex-col justify-between group space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-100">
                    LEVEL {lesson.levelNumber}
                  </span>
                  <span className="text-[11px] text-[#9CA3AF] flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {lesson.estimatedTime}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#171717] group-hover:text-sky-600 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-xs font-medium text-[#4B5563]">
                  {lesson.subtitle}
                </p>
                <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                  {lesson.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F3F4F6] flex items-center justify-between text-xs text-[#171717] font-semibold group-hover:text-sky-600">
                <span>Pelajari Materi Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

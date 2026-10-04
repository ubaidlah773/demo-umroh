'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Laptop,
  FileText,
  Table,
  Presentation,
  BarChart3,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ArrowRight,
  Search,
} from 'lucide-react';
import { CURRICULUM } from '@/data/curriculum';
import { DASHBOARD_LESSONS } from '@/data/dashboardCurriculum';
import { useProgress } from '@/context/ProgressContext';
import { AppType } from '@/types';

export default function LearnPage() {
  const { isHydrated, isLessonCompleted, getAppProgress } = useProgress();
  const [selectedApp, setSelectedApp] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tracks = [
    {
      id: 'fundamentals',
      name: 'Dasar Komputer & Office',
      icon: Laptop,
      color: '#4F46E5',
      accent: 'text-indigo-600',
      badge: 'Level 0 — Pondasi Mutlak',
      summary: 'Mengenal komputer, manajemen file/folder, OS, ekstensi file, dan 13 shortcut wajib.',
      levelsCount: 1,
      lessonsCount: CURRICULUM.fundamentals.levels[0].lessons.length,
      href: '/fundamentals',
    },
    {
      id: 'word',
      name: 'Microsoft Word',
      icon: FileText,
      color: '#2563EB',
      accent: 'text-blue-600',
      badge: 'Level 1 – 5: Mahir Dokumen',
      summary: 'Pembuatan surat dinas, skripsi/laporan, penomoran romawi/arab, mail merge massal, & template.',
      levelsCount: CURRICULUM.word.levels.length,
      lessonsCount: CURRICULUM.word.levels.reduce((acc, lvl) => acc + lvl.lessons.length, 0),
      href: '/word',
    },
    {
      id: 'excel',
      name: 'Microsoft Excel',
      icon: Table,
      color: '#16A34A',
      accent: 'text-green-600',
      badge: 'Level 1 – 5: Master Rumus & Data',
      summary: 'Formula dasar (SUM, AVERAGE), logika (IF/IFS), lookup (VLOOKUP, XLOOKUP), PivotTable, & audit.',
      levelsCount: CURRICULUM.excel.levels.length,
      lessonsCount: CURRICULUM.excel.levels.reduce((acc, lvl) => acc + lvl.lessons.length, 0),
      href: '/excel',
    },
    {
      id: 'powerpoint',
      name: 'Microsoft PowerPoint',
      icon: Presentation,
      color: '#EA580C',
      accent: 'text-orange-600',
      badge: 'Level 1 – 5: Presentasi Profesional',
      summary: 'Slide master perusahaan, transisi morph sinematik, visual hierarchy, infografis data, & export.',
      levelsCount: CURRICULUM.powerpoint.levels.length,
      lessonsCount: CURRICULUM.powerpoint.levels.reduce((acc, lvl) => acc + lvl.lessons.length, 0),
      href: '/powerpoint',
    },
    {
      id: 'dashboard',
      name: 'Dashboard Academy',
      icon: BarChart3,
      color: '#0284C7',
      accent: 'text-sky-600',
      badge: 'Level 1 – 16: Business Intelligence',
      summary: 'Dari data mentah hingga executive dashboard interaktif dengan slicer dinamis dan 15 proyek riil.',
      levelsCount: 16,
      lessonsCount: DASHBOARD_LESSONS.length,
      href: '/dashboard',
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Editorial Header */}
      <header className="space-y-4 border-b border-[#E5E7EB] pb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#F3F4F6] text-[#4B5563] text-xs font-mono">
          <span>KURIKULUM LENGKAP OFFICEMASTER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
          Peta Belajar Terstruktur dari Nol hingga Mahir
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280] max-w-2xl leading-relaxed">
          Pilih jalur belajar sesuai kebutuhan Anda. Setiap modul dilengkapi penjelasan konsep,
          studi kasus dunia kerja, simulator interaktif langsung di browser, kuis, dan file latihan gratis.
        </p>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedApp('all')}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors ${
                selectedApp === 'all'
                  ? 'bg-[#171717] text-white'
                  : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#171717]'
              }`}
            >
              Semua Modul
            </button>
            {tracks.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedApp(t.id)}
                className={`px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors shrink-0 ${
                  selectedApp === t.id
                    ? 'bg-[#171717] text-white'
                    : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#171717]'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari materi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E5E7EB] rounded-[6px] focus:outline-none focus:border-[#171717]"
            />
          </div>
        </div>
      </header>

      {/* Track Cards Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tracks
          .filter((t) => selectedApp === 'all' || selectedApp === t.id)
          .map((track) => {
            const Icon = track.icon;
            const progress =
              track.id !== 'dashboard'
                ? getAppProgress(track.id as AppType)
                : { completed: 0, total: DASHBOARD_LESSONS.length, percentage: 0 };

            return (
              <div
                key={track.id}
                className="bg-white border border-[#E5E7EB] rounded-[6px] p-6 hover:border-[#D1D5DB] transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-[6px] flex items-center justify-center text-white"
                      style={{ backgroundColor: track.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F3F4F6] text-[#4B5563]">
                      {track.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#171717]">{track.name}</h3>
                    <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed line-clamp-2">
                      {track.summary}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-[#F3F4F6]">
                    <div className="flex justify-between text-[11px] text-[#6B7280]">
                      <span>{track.lessonsCount} Materi Pelajaran</span>
                      <span>{track.levelsCount} Level Pembelajaran</span>
                    </div>
                    {isHydrated && progress.total > 0 && (
                      <div className="w-full h-1 bg-[#F3F4F6] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#171717]"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6">
                  <Link
                    href={track.href}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-[6px] bg-[#F8F9FA] hover:bg-[#171717] hover:text-white border border-[#E5E7EB] text-xs font-semibold text-[#171717] transition-all"
                  >
                    <span>Masuk ke Jalur Belajar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
      </section>

      {/* Detailed Lesson Lists per Application */}
      <section className="space-y-12 pt-6">
        {/* 1. Fundamentals */}
        {(selectedApp === 'all' || selectedApp === 'fundamentals') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <div className="flex items-center gap-2">
                <Laptop className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-[#171717]">Dasar Komputer & Office (Level 0)</h2>
              </div>
              <Link href="/fundamentals" className="text-xs text-indigo-600 hover:underline">
                Buka Detail &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CURRICULUM.fundamentals.levels[0].lessons
                .filter((l) => !searchQuery || l.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((lesson) => {
                  const completed = isHydrated && isLessonCompleted(`fundamentals-beginner-${lesson.slug}`);
                  return (
                    <Link
                      key={lesson.slug}
                      href={`/fundamentals/beginner/${lesson.slug}`}
                      className="p-3.5 bg-white border border-[#E5E7EB] rounded-[6px] hover:border-indigo-300 transition-all flex items-start justify-between gap-3 group"
                    >
                      <div className="space-y-1 min-w-0">
                        <span className="text-[11px] font-mono text-[#9CA3AF]">
                          {lesson.order.toString().padStart(2, '0')}
                        </span>
                        <h4 className="text-xs font-semibold text-[#171717] group-hover:text-indigo-600 transition-colors truncate">
                          {lesson.title}
                        </h4>
                        <p className="text-[11px] text-[#6B7280] line-clamp-1">
                          {lesson.description}
                        </p>
                      </div>
                      <div className="shrink-0 pt-0.5">
                        {completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Circle className="w-4 h-4 text-[#D1D5DB]" />
                        )}
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        )}

        {/* 2. Word */}
        {(selectedApp === 'all' || selectedApp === 'word') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-[#171717]">Microsoft Word (Level 1 – 5)</h2>
              </div>
              <Link href="/word" className="text-xs text-blue-600 hover:underline">
                Buka Detail &rarr;
              </Link>
            </div>
            <div className="space-y-6">
              {CURRICULUM.word.levels.map((lvl) => (
                <div key={lvl.level} className="space-y-2.5">
                  <span className="text-xs font-semibold text-[#4B5563] uppercase tracking-wider">
                    {lvl.title}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {lvl.lessons
                      .filter((l) => !searchQuery || l.title.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((lesson) => {
                        const completed = isHydrated && isLessonCompleted(`word-${lvl.level}-${lesson.slug}`);
                        return (
                          <Link
                            key={lesson.slug}
                            href={`/word/${lvl.level}/${lesson.slug}`}
                            className="p-3.5 bg-white border border-[#E5E7EB] rounded-[6px] hover:border-blue-300 transition-all flex items-start justify-between gap-3 group"
                          >
                            <div className="space-y-1 min-w-0">
                              <span className="text-[11px] font-mono text-[#9CA3AF]">
                                {lesson.order.toString().padStart(2, '0')}
                              </span>
                              <h4 className="text-xs font-semibold text-[#171717] group-hover:text-blue-600 transition-colors truncate">
                                {lesson.title}
                              </h4>
                              <p className="text-[11px] text-[#6B7280] line-clamp-1">
                                {lesson.description}
                              </p>
                            </div>
                            <div className="shrink-0 pt-0.5">
                              {completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Circle className="w-4 h-4 text-[#D1D5DB]" />
                              )}
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Excel */}
        {(selectedApp === 'all' || selectedApp === 'excel') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <div className="flex items-center gap-2">
                <Table className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-bold text-[#171717]">Microsoft Excel (Level 1 – 5)</h2>
              </div>
              <Link href="/excel" className="text-xs text-green-600 hover:underline">
                Buka Detail &rarr;
              </Link>
            </div>
            <div className="space-y-6">
              {CURRICULUM.excel.levels.map((lvl) => (
                <div key={lvl.level} className="space-y-2.5">
                  <span className="text-xs font-semibold text-[#4B5563] uppercase tracking-wider">
                    {lvl.title}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {lvl.lessons
                      .filter((l) => !searchQuery || l.title.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((lesson) => {
                        const completed = isHydrated && isLessonCompleted(`excel-${lvl.level}-${lesson.slug}`);
                        return (
                          <Link
                            key={lesson.slug}
                            href={`/excel/${lvl.level}/${lesson.slug}`}
                            className="p-3.5 bg-white border border-[#E5E7EB] rounded-[6px] hover:border-green-300 transition-all flex items-start justify-between gap-3 group"
                          >
                            <div className="space-y-1 min-w-0">
                              <span className="text-[11px] font-mono text-[#9CA3AF]">
                                {lesson.order.toString().padStart(2, '0')}
                              </span>
                              <h4 className="text-xs font-semibold text-[#171717] group-hover:text-green-600 transition-colors truncate">
                                {lesson.title}
                              </h4>
                              <p className="text-[11px] text-[#6B7280] line-clamp-1">
                                {lesson.description}
                              </p>
                            </div>
                            <div className="shrink-0 pt-0.5">
                              {completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Circle className="w-4 h-4 text-[#D1D5DB]" />
                              )}
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. PowerPoint */}
        {(selectedApp === 'all' || selectedApp === 'powerpoint') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <div className="flex items-center gap-2">
                <Presentation className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-bold text-[#171717]">Microsoft PowerPoint (Level 1 – 5)</h2>
              </div>
              <Link href="/powerpoint" className="text-xs text-orange-600 hover:underline">
                Buka Detail &rarr;
              </Link>
            </div>
            <div className="space-y-6">
              {CURRICULUM.powerpoint.levels.map((lvl) => (
                <div key={lvl.level} className="space-y-2.5">
                  <span className="text-xs font-semibold text-[#4B5563] uppercase tracking-wider">
                    {lvl.title}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {lvl.lessons
                      .filter((l) => !searchQuery || l.title.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((lesson) => {
                        const completed = isHydrated && isLessonCompleted(`powerpoint-${lvl.level}-${lesson.slug}`);
                        return (
                          <Link
                            key={lesson.slug}
                            href={`/powerpoint/${lvl.level}/${lesson.slug}`}
                            className="p-3.5 bg-white border border-[#E5E7EB] rounded-[6px] hover:border-orange-300 transition-all flex items-start justify-between gap-3 group"
                          >
                            <div className="space-y-1 min-w-0">
                              <span className="text-[11px] font-mono text-[#9CA3AF]">
                                {lesson.order.toString().padStart(2, '0')}
                              </span>
                              <h4 className="text-xs font-semibold text-[#171717] group-hover:text-orange-600 transition-colors truncate">
                                {lesson.title}
                              </h4>
                              <p className="text-[11px] text-[#6B7280] line-clamp-1">
                                {lesson.description}
                              </p>
                            </div>
                            <div className="shrink-0 pt-0.5">
                              {completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Circle className="w-4 h-4 text-[#D1D5DB]" />
                              )}
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Dashboard Academy */}
        {(selectedApp === 'all' || selectedApp === 'dashboard') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg font-bold text-[#171717]">Dashboard Academy (16 Level)</h2>
              </div>
              <Link href="/dashboard" className="text-xs text-sky-600 hover:underline">
                Buka Academy Hub &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {DASHBOARD_LESSONS
                .filter((l) => !searchQuery || l.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((dLesson) => (
                  <Link
                    key={dLesson.id}
                    href={`/dashboard/level/${dLesson.slug}`}
                    className="p-3.5 bg-white border border-[#E5E7EB] rounded-[6px] hover:border-sky-300 transition-all flex items-start justify-between gap-3 group"
                  >
                    <div className="space-y-1 min-w-0">
                      <span className="text-[11px] font-mono text-sky-600 font-semibold">
                        LEVEL {dLesson.levelNumber}
                      </span>
                      <h4 className="text-xs font-semibold text-[#171717] group-hover:text-sky-600 transition-colors truncate">
                        {dLesson.title}
                      </h4>
                      <p className="text-[11px] text-[#6B7280] line-clamp-1">
                        {dLesson.subtitle}
                      </p>
                    </div>
                    <div className="shrink-0 pt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

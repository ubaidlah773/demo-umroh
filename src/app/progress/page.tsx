'use client';

import React from 'react';
import Link from 'next/link';
import {
  Trophy,
  CheckCircle2,
  Clock,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Download,
  Flame,
} from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { ACHIEVEMENTS_DATA } from '@/data/achievements';

export default function ProgressPage() {
  const {
    isHydrated,
    state,
    getAppProgress,
    resetProgress,
  } = useProgress();

  const fundamentalsProgress = getAppProgress('fundamentals');
  const wordProgress = getAppProgress('word');
  const excelProgress = getAppProgress('excel');
  const powerpointProgress = getAppProgress('powerpoint');

  const totalCompleted = state?.completedLessons?.length || 0;
  const downloadCount = state?.downloadedFiles?.length || 0;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <header className="space-y-4 border-b border-[#E5E7EB] pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
          <Trophy className="w-3.5 h-3.5" />
          <span>PROGRESS & GAMIFICATION DASHBOARD</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
          Laporan Kemajuan Belajar Anda
        </h1>
        <p className="text-sm text-[#6B7280] max-w-2xl leading-relaxed">
          Semua progres disimpan secara aman di LocalStorage browser Anda. Tidak perlu registrasi akun atau login kata sandi.
        </p>

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5 pt-4">
          <div className="p-4 bg-white border border-[#E5E7EB] rounded-[6px]">
            <span className="text-xs text-[#6B7280] block">Materi Terselesaikan</span>
            <span className="text-2xl font-bold text-[#171717]">
              {isHydrated ? totalCompleted : 0}
            </span>
            <span className="text-[11px] text-[#9CA3AF] block mt-0.5">Materi & Latihan</span>
          </div>

          <div className="p-4 bg-white border border-[#E5E7EB] rounded-[6px]">
            <span className="text-xs text-[#6B7280] block">Streak Belajar</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-2xl font-bold text-[#171717]">
                {isHydrated && totalCompleted > 0 ? 1 : 0}
              </span>
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            </div>
            <span className="text-[11px] text-[#9CA3AF] block mt-0.5">Hari Berturut-turut</span>
          </div>

          <div className="p-4 bg-white border border-[#E5E7EB] rounded-[6px]">
            <span className="text-xs text-[#6B7280] block">File Diunduh</span>
            <span className="text-2xl font-bold text-[#171717]">
              {isHydrated ? downloadCount : 0}
            </span>
            <span className="text-[11px] text-[#9CA3AF] block mt-0.5">Dataset & Template</span>
          </div>

          <div className="p-4 bg-white border border-[#E5E7EB] rounded-[6px] flex flex-col justify-between">
            <span className="text-xs text-[#6B7280] block">Aksi Data</span>
            <button
              onClick={() => {
                if (confirm('Apakah Anda yakin ingin mereset seluruh progres belajar?')) {
                  resetProgress();
                }
              }}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 mt-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Progres Saya</span>
            </button>
            <span className="text-[10px] text-[#9CA3AF] block mt-0.5">Hapus data lokal</span>
          </div>
        </div>
      </header>

      {/* Progress per App */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-[#171717]">
          Progres per Modul Aplikasi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Dasar Komputer & Office', prog: fundamentalsProgress, color: 'bg-indigo-600', link: '/fundamentals' },
            { name: 'Microsoft Word', prog: wordProgress, color: 'bg-blue-600', link: '/word' },
            { name: 'Microsoft Excel', prog: excelProgress, color: 'bg-green-600', link: '/excel' },
            { name: 'Microsoft PowerPoint', prog: powerpointProgress, color: 'bg-orange-600', link: '/powerpoint' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E5E7EB] rounded-[6px] p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#171717]">{item.name}</h3>
                <span className="text-xs font-mono font-semibold text-[#171717]">
                  {isHydrated ? item.prog.completed : 0} / {item.prog.total} ({isHydrated ? item.prog.percentage : 0}%)
                </span>
              </div>

              <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color}`}
                  style={{ width: `${isHydrated ? item.prog.percentage : 0}%` }}
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  href={item.link}
                  className="text-xs text-[#4B5563] hover:text-[#171717] font-medium flex items-center gap-1"
                >
                  <span>Lanjutkan Belajar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Badges & Achievements */}
      <section className="space-y-4 pt-4">
        <h2 className="text-base font-bold text-[#171717]">
          Lencana & Pencapaian (Badges)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {ACHIEVEMENTS_DATA.map((ach) => {
            const isUnlocked =
              ach.id === 'first-lesson' ? totalCompleted >= 1 : totalCompleted >= 5;

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-[6px] border transition-all flex flex-col justify-between space-y-2 ${
                  isUnlocked
                    ? 'bg-white border-[#E5E7EB] shadow-xs'
                    : 'bg-[#F9FAFB] border-[#E5E7EB] opacity-60'
                }`}
              >
                <div className="space-y-1.5">
                  <span className="text-2xl block">{ach.icon}</span>
                  <h3 className="text-xs font-bold text-[#171717]">{ach.title}</h3>
                  <p className="text-[11px] text-[#6B7280] leading-snug">
                    {ach.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F3F4F6] flex items-center justify-between text-[10px] font-mono">
                  <span className={isUnlocked ? 'text-emerald-600 font-bold' : 'text-[#9CA3AF]'}>
                    {isUnlocked ? '✓ Terbuka' : 'Terkunci'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

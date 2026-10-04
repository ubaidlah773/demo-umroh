'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Download,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Check,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { DASHBOARD_LESSONS } from '@/data/dashboardCurriculum';
import { downloadPracticeFile } from '@/lib/downloadHelper';

export default function DashboardLessonPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const currentIndex = DASHBOARD_LESSONS.findIndex((l) => l.slug === slug);
  const lesson = DASHBOARD_LESSONS[currentIndex];

  if (!lesson) {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold">Materi Tidak Ditemukan</h1>
        <p className="text-sm text-[#6B7280]">
          Level yang Anda tuju belum tersedia atau tautan salah.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-sky-600 underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Dashboard Academy Hub
        </Link>
      </div>
    );
  }

  const prevLesson = currentIndex > 0 ? DASHBOARD_LESSONS[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < DASHBOARD_LESSONS.length - 1
      ? DASHBOARD_LESSONS[currentIndex + 1]
      : null;

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadDataset = () => {
    if (lesson.downloadFile) {
      downloadPracticeFile(lesson.downloadFile);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb & Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
        <div className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link href="/dashboard" className="hover:text-[#171717] transition-colors">
            Dashboard Academy
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#D1D5DB]" />
          <span className="font-semibold text-sky-600 font-mono">
            Level {lesson.levelNumber}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#D1D5DB]" />
          <span className="text-[#171717] truncate max-w-[200px] sm:max-w-none">
            {lesson.title}
          </span>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-[#4B5563] hover:text-[#171717] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Daftar Level</span>
        </Link>
      </div>

      {/* Main Title Banner */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold">
          <span>LEVEL {lesson.levelNumber} OF 16</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#171717] tracking-tight">
          {lesson.title}
        </h1>
        <p className="text-sm sm:text-base text-[#4B5563] font-medium">
          {lesson.subtitle}
        </p>
        <div className="flex items-center gap-4 text-xs text-[#6B7280] pt-1">
          <span className="flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5" />
            Estimasi: {lesson.estimatedTime}
          </span>
        </div>
      </header>

      {/* 1. Pengantar & Tujuan Pembelajaran */}
      <section className="bg-white border border-[#E5E7EB] rounded-[6px] p-6 space-y-4">
        <h2 className="text-base font-bold text-[#171717] flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sky-600" />
          <span>1. Definisi & Kapan Menggunakannya</span>
        </h2>
        <p className="text-sm text-[#374151] leading-relaxed">
          {lesson.whatIsIt}
        </p>

        <div className="bg-[#F9FAFB] border-l-4 border-sky-500 p-4 rounded-r-[6px] text-xs text-[#4B5563] space-y-1">
          <strong className="text-[#171717] block">Kapan fitur ini diterapkan?</strong>
          <p>{lesson.whenToUse}</p>
        </div>

        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
            Tujuan Pembelajaran:
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4B5563]">
            {lesson.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Before vs After Comparison */}
      {lesson.beforeAfterComparison && (
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#171717]">
            2. Perbandingan: Cara Biasa vs Standar Dashboard Profesional
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-rose-50/50 border border-rose-200 rounded-[6px] p-5 space-y-3">
              <span className="text-xs font-mono font-bold text-rose-700 uppercase">
                ✕ {lesson.beforeAfterComparison.badTitle}
              </span>
              <ul className="space-y-2 text-xs text-[#4B5563]">
                {lesson.beforeAfterComparison.badPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-200 rounded-[6px] p-5 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">
                ✓ {lesson.beforeAfterComparison.goodTitle}
              </span>
              <ul className="space-y-2 text-xs text-[#4B5563]">
                {lesson.beforeAfterComparison.goodPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 3. Konsep & Langkah Kerja */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-[#171717]">
          3. Langkah-Langkah & Prinsip Teknis
        </h2>
        <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-6 space-y-4">
          <div className="space-y-3">
            {lesson.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#374151]">
                <span className="w-5 h-5 rounded-full bg-[#171717] text-white flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {lesson.concepts && lesson.concepts.length > 0 && (
            <div className="pt-4 border-t border-[#F3F4F6] space-y-4">
              <h3 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                Penjelasan Konsep Kunci:
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {lesson.concepts.map((c, idx) => (
                  <div key={idx} className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] space-y-2">
                    <h4 className="text-xs font-bold text-[#171717]">{c.title}</h4>
                    <p className="text-xs text-[#4B5563] leading-relaxed">{c.explanation}</p>
                    {c.example && (
                      <p className="text-[11px] text-[#6B7280] italic">
                        Contoh: {c.example}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {lesson.keyFormulas && lesson.keyFormulas.length > 0 && (
            <div className="pt-4 border-t border-[#F3F4F6] space-y-3">
              <h3 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                Formula Esensial:
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {lesson.keyFormulas.map((kf, idx) => (
                  <div key={idx} className="p-3 bg-white border border-[#E5E7EB] rounded-[6px] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#171717]">{kf.purpose}</span>
                      <code className="text-sky-700 font-mono text-xs font-bold">{kf.formula}</code>
                    </div>
                    <code className="block text-[11px] font-mono text-[#6B7280]">{kf.syntax}</code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Tips & Kesalahan Umum */}
      {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
        <section className="bg-white border border-[#E5E7EB] rounded-[6px] p-5 space-y-3">
          <h3 className="text-xs font-bold text-amber-800 uppercase flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Kesalahan Umum & Solusinya</span>
          </h3>
          <div className="space-y-3">
            {lesson.commonMistakes.map((m, idx) => (
              <div key={idx} className="text-xs space-y-1 border-b border-[#F3F4F6] pb-2.5 last:border-0 last:pb-0">
                <p className="font-semibold text-rose-700">⚠️ {m.mistake}</p>
                <p className="text-emerald-700 font-medium">💡 Solusi: {m.solution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Dataset Download */}
      {lesson.downloadFile && (
        <section className="bg-sky-50/60 border border-sky-200 rounded-[6px] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-sky-800 font-bold uppercase">
              FILE LATIHAN RESMI .XLSX
            </span>
            <h3 className="text-base font-bold text-[#171717]">
              {lesson.downloadFile.title}
            </h3>
            <p className="text-xs text-[#4B5563] max-w-lg">
              {lesson.downloadFile.description} ({lesson.downloadFile.size})
            </p>
          </div>

          <button
            onClick={handleDownloadDataset}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-[6px] bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition-all shrink-0"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Berhasil Mengunduh</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Unduh File Excel Latihan</span>
              </>
            )}
          </button>
        </section>
      )}

      {/* 6. Quiz Interaktif */}
      {lesson.quiz && (
        <section className="bg-white border border-[#E5E7EB] rounded-[6px] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <h3 className="text-sm font-bold text-[#171717] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-sky-600" />
              <span>Kuis Pemahaman Level {lesson.levelNumber}</span>
            </h3>
            <span className="text-[11px] text-[#6B7280]">1 Pertanyaan Uji Konsep</span>
          </div>

          <p className="text-sm font-medium text-[#171717]">
            {lesson.quiz.question}
          </p>

          <div className="space-y-2 pt-1">
            {lesson.quiz.options.map((opt, idx) => {
              const isSelected = selectedQuizAnswer === idx;
              const isCorrect = idx === lesson.quiz?.correctIndex;

              let btnClass = 'bg-[#F9FAFB] border-[#E5E7EB] text-[#374151] hover:bg-white';
              if (showQuizResult) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold';
                } else if (isSelected) {
                  btnClass = 'bg-rose-50 border-rose-500 text-rose-800';
                }
              } else if (isSelected) {
                btnClass = 'bg-sky-50 border-sky-500 text-sky-900 font-medium';
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedQuizAnswer(idx);
                    setShowQuizResult(true);
                  }}
                  className={`w-full text-left p-3 rounded-[6px] border text-xs transition-all flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt}</span>
                  {showQuizResult && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {showQuizResult && (
            <div className="p-3.5 bg-[#F9FAFB] rounded-[6px] border border-[#E5E7EB] text-xs text-[#4B5563] space-y-1 animate-in fade-in">
              <strong className="text-[#171717] block">Penjelasan Jawaban:</strong>
              <p>{lesson.quiz.explanation}</p>
            </div>
          )}
        </section>
      )}

      {/* Prev / Next Pagination */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E5E7EB]">
        {prevLesson ? (
          <Link
            href={`/dashboard/level/${prevLesson.slug}`}
            className="flex items-center gap-2 text-xs font-semibold text-[#4B5563] hover:text-[#171717] p-2 rounded hover:bg-[#F3F4F6] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Level {prevLesson.levelNumber}: {prevLesson.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/dashboard/level/${nextLesson.slug}`}
            className="flex items-center gap-2 text-xs font-semibold text-white bg-[#171717] hover:bg-black px-4 py-2.5 rounded-[6px] transition-all"
          >
            <span>Lanjut ke Level {nextLesson.levelNumber}: {nextLesson.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <Link
            href="/dashboard/projects"
            className="flex items-center gap-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 rounded-[6px] transition-all"
          >
            <span>Selesai Seluruh Level! Buka 15 Proyek Real</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </footer>
    </div>
  );
}

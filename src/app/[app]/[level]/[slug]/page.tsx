'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Download,
  ArrowLeft,
  ArrowRight,
  Check,
  Circle,
  Target,
  AlertTriangle,
  Lightbulb,
  Keyboard,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { AppType, LevelType } from '@/types';
import { getOrCreateLesson } from '@/data/curriculum';
import { getAdjacentLessons } from '@/data/courses';
import { useProgress } from '@/context/ProgressContext';
import { downloadPracticeFile } from '@/lib/downloadHelper';
import FormulaCard from '@/components/FormulaCard';
import ExcelSimulator from '@/components/ExcelSimulator';
import PracticeSection from '@/components/PracticeSection';
import QuizSection from '@/components/QuizSection';

export default function LessonDetailPage() {
  const params = useParams();

  const app = (params.app as AppType) || 'excel';
  const level = (params.level as LevelType) || 'beginner';
  const slug = (params.slug as string) || 'sum';

  const [showMiniHint, setShowMiniHint] = useState(false);

  const {
    isHydrated,
    isLessonCompleted,
    toggleLessonCompleted,
    setLastActive,
    recordDownload,
  } = useProgress();

  const lesson = getOrCreateLesson(app, level, slug);
  const isCompleted = isHydrated && isLessonCompleted(lesson.id);

  // Update last active lesson
  useEffect(() => {
    if (lesson) {
      setLastActive(lesson.app, lesson.level, lesson.slug, lesson.title);
    }
  }, [lesson, setLastActive]);

  // Find previous and next lessons
  const { prev, next } = getAdjacentLessons(lesson.id);

  const handleDownload = () => {
    downloadPracticeFile(lesson.downloadFile);
    recordDownload(lesson.downloadFile.filename);
  };

  return (
    <div className="w-full max-w-[760px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* 1. BREADCRUMB */}
      <nav className="flex items-center gap-1.5 text-xs text-[#6B7280]">
        <Link href={`/${app}`} className="hover:text-[#171717] capitalize">
          {app}
        </Link>
        <span>→</span>
        <Link href={`/${app}/${level}`} className="hover:text-[#171717] capitalize">
          {level}
        </Link>
        <span>→</span>
        <span className="text-[#171717] font-medium">{lesson.title}</span>
      </nav>

      {/* 2. ARTICLE HEADER */}
      <header className="space-y-3 border-b border-[#E5E7EB] pb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-[#F3F4F6] text-[#6B7280]">
              {lesson.level}
            </span>
            <span className="text-xs font-mono text-[#6B7280]">
              · {lesson.estimatedTime}
            </span>
          </div>

          {/* Quick Mark Complete Button */}
          <button
            onClick={() => toggleLessonCompleted(lesson.id)}
            className={`h-7 px-2.5 rounded-[4px] font-medium text-xs transition-colors flex items-center gap-1.5 ${
              isCompleted
                ? 'bg-[#16A34A] text-white hover:bg-[#15803d]'
                : 'border border-[#D1D5DB] bg-white text-[#171717] hover:bg-[#F9FAFB]'
            }`}
          >
            {isCompleted ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Selesai ✓</span>
              </>
            ) : (
              <>
                <Circle className="w-3 h-3 text-[#9CA3AF]" />
                <span>Tandai Selesai</span>
              </>
            )}
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
          {lesson.title}
        </h1>
        <p className="text-sm text-[#4B5563]">
          {lesson.summary}
        </p>
      </header>

      {/* 3. 14 EDITORIAL CONTENT SECTIONS */}
      <article className="space-y-10 text-[#171717] leading-relaxed">
        {/* 1. PENJELASAN KONSEP */}
        <section className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
            1. Konsep & Definisi
          </h2>
          <p className="text-base text-[#374151] leading-relaxed font-normal">
            {lesson.whatIsIt}
          </p>
        </section>

        {/* 2. TUJUAN PEMBELAJARAN */}
        {lesson.objectives && lesson.objectives.length > 0 && (
          <section className="space-y-3 bg-[#F8F9FA] border border-[#E5E7EB] rounded-[6px] p-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-sm font-bold text-[#171717] uppercase tracking-wider">
                2. Tujuan Pembelajaran
              </h3>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#374151]">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] mt-0.5 shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 3. KAPAN DIGUNAKAN & SKENARIO NYATA */}
        <section className="space-y-3 border-t border-[#E5E7EB] pt-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
            3. Kapan Fitur Digunakan?
          </h2>
          <p className="text-base text-[#374151] leading-relaxed">
            {lesson.whenToUse}
          </p>
          <div className="mt-3 p-3 bg-white border border-[#E5E7EB] rounded-[6px] text-xs text-[#6B7280] space-y-1">
            <span className="font-semibold text-[#171717] block">
              Contoh Kasus Nyata di Kantor:
            </span>
            <p className="text-[#374151]">{lesson.realWorldScenario}</p>
          </div>
        </section>

        {/* 4. LANGKAH-LANGKAH PENGGUNAAN */}
        <section className="space-y-3 border-t border-[#E5E7EB] pt-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
            4. Langkah-Langkah Penggunaan
          </h2>
          <ol className="space-y-2 list-decimal list-inside text-sm text-[#374151]">
            {lesson.howToUse.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 5. CONTOH & SYNTAX (FORMULA CARD / CONTOH TABEL) */}
        {lesson.formulaCard && (
          <section className="space-y-3 border-t border-[#E5E7EB] pt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
              5. Contoh Syntax & Penerapan
            </h2>
            <FormulaCard data={lesson.formulaCard} />
          </section>
        )}

        {/* 6. TIPS PRAKTIS PRO */}
        {lesson.keyTips && lesson.keyTips.length > 0 && (
          <section className="space-y-3 border-t border-[#E5E7EB] pt-6">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#EA580C]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
                6. Tips Praktisi Profesional
              </h2>
            </div>
            <div className="space-y-2">
              {lesson.keyTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-[6px] text-xs sm:text-sm text-[#92400E] flex items-start gap-2"
                >
                  <span className="font-bold text-[#B45309]">Pro Tip:</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. KESALAHAN UMUM & SOLUSI */}
        {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
          <section className="space-y-3 border-t border-[#E5E7EB] pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
                7. Kesalahan Umum & Solusinya
              </h2>
            </div>
            <div className="space-y-2.5">
              {lesson.commonMistakes.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-white border border-[#FCA5A5] rounded-[6px] text-xs sm:text-sm space-y-1"
                >
                  <div className="font-semibold text-[#DC2626] flex items-center gap-1.5">
                    <span>✗ Kesalahan:</span>
                    <span className="font-normal text-[#171717]">{item.mistake}</span>
                  </div>
                  <div className="text-[#16A34A] flex items-center gap-1.5 pt-1 border-t border-[#F3F4F6]">
                    <span className="font-semibold">✓ Solusi:</span>
                    <span className="text-[#374151]">{item.solution}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. SHORTCUT JIKA TERSEDIA */}
        {lesson.shortcuts && lesson.shortcuts.length > 0 && (
          <section className="space-y-3 border-t border-[#E5E7EB] pt-6">
            <div className="flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-[#4F46E5]" />
              <h2 className="text-lg sm:text-xl font-bold text-[#171717]">
                8. Shortcut Pintasan Keyboard
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {lesson.shortcuts.map((sc, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-white border border-[#CBD5E1] rounded text-xs font-mono font-semibold text-[#171717] shadow-sm"
                >
                  {sc}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* 9. INTERACTIVE PRACTICE (SPREADSHEET SIMULATOR) */}
        <section className="space-y-4 border-t border-[#E5E7EB] pt-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
              9. Latihan Interaktif Langsung
            </h2>
            <p className="text-xs text-[#6B7280]">
              Uji formula atau coba ubah data langsung di antarmuka berikut.
            </p>
          </div>

          {app === 'excel' && (
            <ExcelSimulator
              initialCells={lesson.simulatorConfig?.initialCells}
              initialFormula={lesson.simulatorConfig?.targetFormula || lesson.formulaCard?.formula}
            />
          )}

          <PracticeSection practice={lesson.practice} lessonId={lesson.id} />
        </section>

        {/* 10. QUIZ PEMAHAMAN */}
        <section className="border-t border-[#E5E7EB] pt-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#171717] mb-3">
            10. Kuis Pemahaman Materi
          </h2>
          <QuizSection quiz={lesson.quiz} lessonId={lesson.id} />
        </section>

        {/* 11. MINI EXERCISE */}
        {lesson.miniExercise && (
          <section className="space-y-3 border-t border-[#E5E7EB] pt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
              11. Mini Exercise Cepat
            </h2>
            <div className="p-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-[6px] space-y-3">
              <p className="text-xs sm:text-sm text-[#171717] font-medium">
                {lesson.miniExercise.task}
              </p>
              <div>
                <button
                  onClick={() => setShowMiniHint(!showMiniHint)}
                  className="text-xs text-[#2563EB] hover:underline flex items-center gap-1 font-medium"
                >
                  {showMiniHint ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5" /> Sembunyikan Bantuan
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5" /> Tampilkan Petunjuk Langkah
                    </>
                  )}
                </button>
                {showMiniHint && (
                  <p className="mt-2 text-xs text-[#6B7280] p-2.5 bg-white border border-[#E5E7EB] rounded-[4px]">
                    💡 {lesson.miniExercise.hint}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 12. FILE LATIHAN ASLI */}
        <section className="space-y-3 border-t border-[#E5E7EB] pt-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
            12. Unduh File Latihan Kerja
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white border border-[#E5E7EB] rounded-[6px] text-xs">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded text-[11px] uppercase">
                {lesson.downloadFile.fileType}
              </span>
              <div>
                <span className="font-medium text-[#171717] block">
                  {lesson.downloadFile.filename}
                </span>
                <span className="text-[#6B7280]">
                  {lesson.downloadFile.title} · {lesson.downloadFile.size}
                </span>
              </div>
            </div>
            <button
              onClick={handleDownload}
              className="h-8 px-3 rounded-[6px] border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] text-[#171717] font-medium transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </section>

        {/* 13. CHALLENGE */}
        {lesson.challenge && (
          <section className="space-y-3 border-t border-[#E5E7EB] pt-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#EA580C]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
                13. Challenge Tambahan
              </h2>
            </div>
            <div className="p-4 bg-white border border-[#E5E7EB] rounded-[6px] space-y-2">
              <h4 className="font-semibold text-sm text-[#171717]">
                {lesson.challenge.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#4B5563]">
                {lesson.challenge.description}
              </p>
              {lesson.challenge.expectedOutput && (
                <div className="text-xs text-[#6B7280] pt-2 border-t border-[#F3F4F6]">
                  <strong>Target Output:</strong> {lesson.challenge.expectedOutput}
                </div>
              )}
            </div>
          </section>
        )}
      </article>

      {/* 14. FOOTER CONTROLS & COMPLETION */}
      <div className="pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => toggleLessonCompleted(lesson.id)}
          className={`h-9 px-4 rounded-[6px] font-medium text-xs transition-colors flex items-center gap-2 ${
            isCompleted
              ? 'bg-[#16A34A] text-white hover:bg-[#15803d]'
              : 'border border-[#D1D5DB] bg-white text-[#171717] hover:bg-[#F9FAFB]'
          }`}
        >
          {isCompleted ? (
            <>
              <Check className="w-4 h-4" />
              <span>14. Sudah Selesai ✓</span>
            </>
          ) : (
            <>
              <Circle className="w-3.5 h-3.5 text-[#9CA3AF]" />
              <span>14. Tandai Selesai</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-2">
          {prev && (
            <Link
              href={`/${prev.app}/${prev.level}/${prev.slug}`}
              className="h-9 px-3 rounded-[6px] border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] text-xs font-medium text-[#171717] flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </Link>
          )}

          {next ? (
            <Link
              href={`/${next.app}/${next.level}/${next.slug}`}
              className="h-9 px-4 rounded-[6px] bg-[#171717] hover:bg-[#262626] text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <span>Lanjut: {next.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href="/learn"
              className="h-9 px-4 rounded-[6px] bg-[#171717] hover:bg-[#262626] text-white text-xs font-medium flex items-center gap-1 transition-colors"
            >
              <span>Kembali ke Kurikulum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

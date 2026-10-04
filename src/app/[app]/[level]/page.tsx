'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckCircle2, Circle } from 'lucide-react';
import { AppType, LevelType } from '@/types';
import { CURRICULUM } from '@/data/curriculum';
import { useProgress } from '@/context/ProgressContext';

export default function LevelOverviewPage() {
  const params = useParams();
  const app = (params.app as AppType) || 'excel';
  const level = (params.level as LevelType) || 'beginner';

  const { isHydrated, isLessonCompleted } = useProgress();
  const curriculum = CURRICULUM[app];
  const levelData = curriculum?.levels.find((l) => l.level === level);

  if (!levelData) {
    return (
      <div className="max-w-[760px] mx-auto px-4 py-16 text-center space-y-3">
        <h1 className="text-xl font-bold">Level Tidak Ditemukan</h1>
        <Link href={`/${app}`} className="text-xs text-[#2563EB] underline">
          Kembali ke {app}
        </Link>
      </div>
    );
  }

  const completedCount = levelData.lessons.filter((l) =>
    isLessonCompleted(`${app}-${level}-${l.slug}`)
  ).length;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#6B7280]">
        <Link href="/" className="hover:text-[#171717]">
          Home
        </Link>
        <span>→</span>
        <Link href={`/${app}`} className="hover:text-[#171717] capitalize">
          {app}
        </Link>
        <span>→</span>
        <span className="text-[#171717] font-medium capitalize">{level}</span>
      </nav>

      {/* Header */}
      <header className="space-y-2 border-b border-[#E5E7EB] pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono uppercase text-[#6B7280]">
              {curriculum.name} · {level}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] mt-0.5">
              {levelData.title}
            </h1>
            <p className="text-sm text-[#6B7280] mt-1 max-w-xl">
              {levelData.description}
            </p>
          </div>

          <div className="text-xs text-[#6B7280] font-mono bg-white border border-[#E5E7EB] px-3.5 py-2 rounded-[6px] shrink-0 self-start sm:self-auto">
            <span>Progress: </span>
            <strong className="text-[#171717]">
              {completedCount} / {levelData.lessons.length}
            </strong>
          </div>
        </div>
      </header>

      {/* Lesson List Table */}
      <div className="divide-y divide-[#E5E7EB] border border-[#E5E7EB] rounded-[8px] bg-white text-xs">
        {levelData.lessons.map((lesson) => {
          const lessonId = `${app}-${level}-${lesson.slug}`;
          const isDone = isHydrated && isLessonCompleted(lessonId);

          return (
            <Link
              key={lesson.slug}
              href={`/${app}/${level}/${lesson.slug}`}
              className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-[#F9FAFB] transition-colors group"
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-[#9CA3AF] w-5 text-center">
                  {String(lesson.order).padStart(2, '0')}
                </span>
                <div>
                  <span className="font-medium text-sm text-[#171717] group-hover:text-[#2563EB] transition-colors block">
                    {lesson.title}
                  </span>
                  <span className="text-[#6B7280] text-xs line-clamp-1">
                    {lesson.description}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <span className="font-mono text-[#9CA3AF]">
                  {lesson.estimatedMinutes}m
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                ) : (
                  <Circle className="w-4 h-4 text-[#D1D5DB]" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

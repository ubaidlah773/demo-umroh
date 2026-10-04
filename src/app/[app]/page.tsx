'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckCircle2, Circle } from 'lucide-react';
import { AppType } from '@/types';
import { CURRICULUM } from '@/data/curriculum';
import { useProgress } from '@/context/ProgressContext';

export default function AppOverviewPage() {
  const params = useParams();
  const app = (params.app as AppType) || 'excel';

  const { isHydrated, isLessonCompleted, getAppProgress } = useProgress();
  const curriculum = CURRICULUM[app];

  if (!curriculum) {
    return (
      <div className="max-w-[760px] mx-auto px-4 py-16 text-center space-y-3">
        <h1 className="text-xl font-bold">Kategori Tidak Ditemukan</h1>
        <Link href="/learn" className="text-xs text-[#2563EB] underline">
          Kembali ke Learning Dashboard
        </Link>
      </div>
    );
  }

  const appProgress = getAppProgress(app);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <header className="space-y-3 border-b border-[#E5E7EB] pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-[#6B7280] uppercase">
              Kurikulum Resmi
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] mt-0.5">
              {curriculum.name}
            </h1>
            <p className="text-sm text-[#6B7280] mt-1 max-w-xl">
              {curriculum.summary}
            </p>
          </div>

          <div className="text-xs text-[#6B7280] bg-white border border-[#E5E7EB] px-3.5 py-2 rounded-[6px] shrink-0 self-start sm:self-auto space-y-1">
            <div className="flex justify-between gap-4">
              <span>Progres Selesai:</span>
              <strong className="text-[#171717]">
                {appProgress.completed} / {appProgress.total}
              </strong>
            </div>
            <div className="w-36 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#171717]"
                style={{ width: `${appProgress.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Levels list */}
      <div className="space-y-10">
        {curriculum.levels.map((lvl) => {
          const completedInLevel = lvl.lessons.filter((l) =>
            isLessonCompleted(`${app}-${lvl.level}-${l.slug}`)
          ).length;

          return (
            <section key={lvl.level} className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2 text-xs">
                <div>
                  <h2 className="text-base font-bold text-[#171717]">{lvl.title}</h2>
                  <p className="text-[#6B7280] text-xs mt-0.5">{lvl.description}</p>
                </div>
                <span className="font-mono text-[#6B7280]">
                  {completedInLevel} / {lvl.lessons.length}
                </span>
              </div>

              {/* Clean rows of lessons */}
              <div className="divide-y divide-[#E5E7EB] border border-[#E5E7EB] rounded-[8px] bg-white text-xs">
                {lvl.lessons.map((lesson) => {
                  const lessonId = `${app}-${lvl.level}-${lesson.slug}`;
                  const isDone = isHydrated && isLessonCompleted(lessonId);

                  return (
                    <Link
                      key={lesson.slug}
                      href={`/${app}/${lvl.level}/${lesson.slug}`}
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
            </section>
          );
        })}
      </div>
    </div>
  );
}

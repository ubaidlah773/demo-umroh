'use client';

import React, { useState } from 'react';
import { Quiz } from '@/types';
import { useProgress } from '@/context/ProgressContext';
import { Check, X } from 'lucide-react';

interface QuizSectionProps {
  quiz: Quiz;
  lessonId: string;
}

export default function QuizSection({ quiz, lessonId }: QuizSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { saveQuizScore } = useProgress();

  const isCorrect = selectedIndex === quiz.correctIndex;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex === null) return;
    setSubmitted(true);
    saveQuizScore(lessonId, isCorrect ? 100 : 0);
  };

  const handleRetry = () => {
    setSelectedIndex(null);
    setSubmitted(false);
  };

  return (
    <div className="w-full my-6 bg-white border border-[#E5E7EB] rounded-[8px] p-5 sm:p-6 text-sm space-y-4">
      {/* Exam Header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 text-xs">
        <span className="font-mono text-[#6B7280] uppercase tracking-wider font-semibold">
          Question 01 / 01
        </span>
        {submitted && (
          <span
            className={`font-semibold font-mono ${
              isCorrect ? 'text-[#16A34A]' : 'text-[#DC2626]'
            }`}
          >
            {isCorrect ? '✓ Correct · Score: 100%' : '✗ Incorrect · Score: 0%'}
          </span>
        )}
      </div>

      {/* Question Title */}
      <div className="font-medium text-[#171717] text-sm sm:text-base leading-relaxed">
        {quiz.question}
      </div>

      {/* Radio Options List */}
      <form onSubmit={handleSubmit} className="space-y-2.5 pt-1">
        <div className="space-y-2">
          {quiz.options.map((option, idx) => {
            const isChosen = selectedIndex === idx;
            const isActual = idx === quiz.correctIndex;

            return (
              <label
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-[6px] border text-xs sm:text-sm cursor-pointer transition-colors ${
                  submitted
                    ? isActual
                      ? 'border-[#16A34A] bg-[#F0FDF4] text-[#16A34A] font-medium'
                      : isChosen && !isActual
                      ? 'border-[#DC2626] bg-[#FEF2F2] text-[#DC2626]'
                      : 'border-[#E5E7EB] text-[#6B7280] opacity-70'
                    : isChosen
                    ? 'border-[#171717] bg-[#F9FAFB] text-[#171717] font-medium'
                    : 'border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#374151]'
                }`}
              >
                <input
                  type="radio"
                  name="quiz-option"
                  disabled={submitted}
                  checked={isChosen}
                  onChange={() => setSelectedIndex(idx)}
                  className="sr-only"
                />
                <span
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isChosen
                      ? 'border-[#171717] bg-[#171717]'
                      : 'border-[#D1D5DB] bg-white'
                  }`}
                >
                  {isChosen && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
                <span>{option}</span>
              </label>
            );
          })}
        </div>

        {/* Action Button */}
        {!submitted ? (
          <button
            type="submit"
            disabled={selectedIndex === null}
            className={`h-9 px-4 rounded-[6px] text-xs font-medium transition-colors ${
              selectedIndex === null
                ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                : 'bg-[#171717] hover:bg-[#262626] text-white'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <div className="pt-2 flex items-center justify-between">
            <p className="text-xs text-[#6B7280]">{quiz.explanation}</p>
            {!isCorrect && (
              <button
                type="button"
                onClick={handleRetry}
                className="text-xs font-semibold text-[#171717] underline shrink-0 ml-3"
              >
                Try Again
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

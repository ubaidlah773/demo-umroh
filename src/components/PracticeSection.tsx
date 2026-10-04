'use client';

import React, { useState } from 'react';
import { PracticeChallenge } from '@/types';
import { useProgress } from '@/context/ProgressContext';
import { Check, X } from 'lucide-react';

interface PracticeSectionProps {
  practice: PracticeChallenge;
  lessonId: string;
}

export default function PracticeSection({ practice, lessonId }: PracticeSectionProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showHint, setShowHint] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = userAnswer.trim().replace(/\s+/g, '').toUpperCase();
    const expected = Array.isArray(practice.expectedFormula)
      ? practice.expectedFormula
      : [practice.expectedFormula];

    const isMatch = expected.some((exp) => {
      const cleanExp = exp.trim().replace(/\s+/g, '').toUpperCase();
      const withEqual = cleanExp.startsWith('=') ? cleanExp : `=${cleanExp}`;
      const withoutEqual = cleanExp.startsWith('=') ? cleanExp.substring(1) : cleanExp;
      return cleanUser === withEqual || cleanUser === withoutEqual;
    });

    setStatus(isMatch ? 'correct' : 'incorrect');
  };

  return (
    <div className="w-full my-6 bg-white border border-[#E5E7EB] rounded-[8px] p-5 sm:p-6 text-sm space-y-4">
      <div className="space-y-1">
        <h4 className="font-semibold text-sm text-[#171717]">Latihan Mandiri</h4>
        <p className="text-xs text-[#6B7280]">{practice.question}</p>
      </div>

      {/* Dataset Table */}
      {practice.tableData && (
        <div className="border border-[#E5E7EB] rounded-[6px] overflow-hidden bg-white text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#6B7280] font-medium">
                {practice.tableData.headers.map((h, i) => (
                  <th key={i} className="px-3 py-2 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {practice.tableData.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 text-[#374151]">
                      {typeof cell === 'number'
                        ? `Rp${cell.toLocaleString('id-ID')}`
                        : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Input Formula Form */}
      <form onSubmit={handleCheck} className="space-y-2 pt-1">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => {
              setUserAnswer(e.target.value);
              if (status !== 'idle') setStatus('idle');
            }}
            placeholder="Ketik formula di sini (contoh: =SUM(B2:B4))"
            className="flex-1 h-9 px-3 rounded-[6px] border border-[#D1D5DB] bg-[#F9FAFB] focus:bg-white focus:outline-none focus:border-[#171717] font-mono text-xs"
          />
          <button
            type="submit"
            className="h-9 px-4 rounded-[6px] bg-[#171717] hover:bg-[#262626] text-white text-xs font-medium transition-colors shrink-0"
          >
            Periksa Jawaban
          </button>
        </div>

        {/* Feedback message */}
        {status === 'correct' && (
          <div className="p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-[6px] text-xs text-[#16A34A] flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>
              <strong>Benar!</strong> {practice.explanation}
            </span>
          </div>
        )}

        {status === 'incorrect' && (
          <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-[6px] text-xs text-[#DC2626] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 shrink-0" />
              <span>Belum tepat. Coba periksa kembali tanda kurung dan range cell.</span>
            </div>
            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="underline font-semibold ml-2 text-xs hover:text-red-800"
            >
              Lihat petunjuk
            </button>
          </div>
        )}

        {showHint && (
          <div className="p-2.5 bg-[#FFFBEB] border border-[#FDE68A] rounded-[6px] text-xs text-[#B45309]">
            <strong>Petunjuk: </strong> {practice.hint}
          </div>
        )}
      </form>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Star,
  Check,
  RotateCcw,
} from 'lucide-react';
import { EXCEL_CHALLENGES } from '@/data/challenges';

export default function ChallengesPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [evaluatedStatus, setEvaluatedStatus] = useState<Record<string, 'correct' | 'wrong'>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const filteredChallenges = EXCEL_CHALLENGES.filter((ch) =>
    selectedDifficulty === 'all' ? true : ch.difficulty === selectedDifficulty
  );

  const handleCheck = (ch: typeof EXCEL_CHALLENGES[0]) => {
    const rawInput = (userAnswers[ch.id] || '').trim().toUpperCase();
    const expected = ch.expectedFormula.map((f) => f.toUpperCase().replace(/\s+/g, ''));
    const isCorrect = expected.includes(rawInput.replace(/\s+/g, ''));

    setEvaluatedStatus({
      ...evaluatedStatus,
      [ch.id]: isCorrect ? 'correct' : 'wrong',
    });
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <header className="space-y-4 border-b border-[#E5E7EB] pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-bold">
          <Trophy className="w-3.5 h-3.5" />
          <span>CHALLENGE ARENA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
          Tantangan Formula & Logika Excel
        </h1>
        <p className="text-sm text-[#6B7280] max-w-2xl leading-relaxed">
          Uji ketajaman logika Anda dalam menyusun formula Excel secara langsung. Ketik formula dimulai dengan simbol sama dengan (=) untuk memverifikasi jawaban.
        </p>

        {/* Filter */}
        <div className="flex items-center gap-2 pt-2">
          {['all', 'easy', 'medium', 'hard'].map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDifficulty(d)}
              className={`px-3 py-1.5 rounded-[6px] text-xs capitalize transition-colors ${
                selectedDifficulty === d
                  ? 'bg-[#171717] text-white font-medium'
                  : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#171717]'
              }`}
            >
              {d === 'all' ? 'Semua Tantangan' : d}
            </button>
          ))}
        </div>
      </header>

      {/* Grid of Challenges */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChallenges.map((ch) => {
          const status = evaluatedStatus[ch.id];
          const hasHint = showHints[ch.id];

          return (
            <div
              key={ch.id}
              className="bg-white border border-[#E5E7EB] rounded-[6px] p-5 sm:p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#F3F4F6] text-[#4B5563]">
                    CHALLENGE #{ch.number.toString().padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: ch.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[11px] font-mono text-[#9CA3AF] ml-1 uppercase">
                      {ch.difficulty}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#171717]">
                    {ch.title}
                  </h3>
                  <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                    {ch.prompt}
                  </p>
                </div>

                {/* Table Data Preview */}
                {ch.tableData && (
                  <div className="overflow-x-auto border border-[#E5E7EB] rounded-[4px]">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#6B7280]">
                        <tr>
                          {ch.tableData.headers.map((h, idx) => (
                            <th key={idx} className="p-2 font-medium">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E7EB]">
                        {ch.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="bg-white">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2 font-mono text-[11px] text-[#171717]">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Input Formula & Test */}
              <div className="space-y-3 pt-3 border-t border-[#F3F4F6]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ketik rumus (cth: =B2*C2)..."
                    value={userAnswers[ch.id] || ''}
                    onChange={(e) =>
                      setUserAnswers({ ...userAnswers, [ch.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCheck(ch);
                    }}
                    className="flex-1 px-3 py-2 text-xs font-mono bg-white border border-[#E5E7EB] rounded-[6px] focus:outline-none focus:border-[#171717]"
                  />
                  <button
                    onClick={() => handleCheck(ch)}
                    className="px-4 py-2 bg-[#171717] hover:bg-black text-white text-xs font-semibold rounded-[6px] transition-colors"
                  >
                    Uji
                  </button>
                </div>

                {/* Status alert */}
                {status === 'correct' && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-[6px] text-xs text-emerald-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Hebat! Formula Anda Benar.</span>
                    </div>
                  </div>
                )}

                {status === 'wrong' && (
                  <div className="p-2.5 bg-rose-50 border border-rose-300 rounded-[6px] text-xs text-rose-800 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Formula belum tepat. Coba periksa kembali sel referensi.</span>
                  </div>
                )}

                {/* Hint toggle */}
                <div className="flex items-center justify-between text-[11px]">
                  <button
                    onClick={() =>
                      setShowHints({ ...showHints, [ch.id]: !hasHint })
                    }
                    className="text-[#6B7280] hover:text-[#171717] flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{hasHint ? 'Sembunyikan Petunjuk' : 'Lihat Petunjuk'}</span>
                  </button>

                  {hasHint && (
                    <span className="text-[#4B5563] italic">
                      Petunjuk: {ch.hint}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

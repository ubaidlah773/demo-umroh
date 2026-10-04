'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  Clock,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  Download,
  Filter,
} from 'lucide-react';
import { EXAM_QUESTIONS } from '@/data/examQuestions';

export default function OfficeExamPage() {
  const [userName, setUserName] = useState('');
  const [appFilter, setAppFilter] = useState<'all' | 'word' | 'excel' | 'powerpoint'>('all');
  const [examStarted, setExamStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeQuestions = EXAM_QUESTIONS.filter((q) =>
    appFilter === 'all' ? true : q.app === appFilter
  );

  const calculateScore = () => {
    let correct = 0;
    activeQuestions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correct += 1;
      }
    });
    return Math.round((correct / activeQuestions.length) * 100);
  };

  const score = isSubmitted ? calculateScore() : 0;
  const isPassed = score >= 70;

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <header className="space-y-4 border-b border-[#E5E7EB] pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold">
          <Award className="w-3.5 h-3.5" />
          <span>OFFICIAL CERTIFICATION EXAM</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
          Ujian Sertifikasi Kompetensi Microsoft Office
        </h1>
        <p className="text-sm text-[#6B7280] max-w-2xl leading-relaxed">
          Evaluasi kemampuan Anda secara menyeluruh dalam Word, Excel, dan PowerPoint. Selesaikan ujian dengan nilai minimal 70% untuk memperoleh sertifikat digital resmi OfficeMaster.
        </p>
      </header>

      {!examStarted ? (
        /* Pre-Exam Setup */
        <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-[#171717]">
              Konfigurasi Ujian Sertifikasi
            </h2>
            <p className="text-xs text-[#4B5563]">
              Pilih bidang keahlian yang ingin Anda uji atau ikuti ujian komprehensif lengkap.
            </p>
          </div>

          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-xs font-semibold text-[#171717] block mb-1">
                Pilih Kategori Ujian:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'all', label: 'Komprehensif (Semua Aplikasi)' },
                  { id: 'excel', label: 'Khusus Excel' },
                  { id: 'word', label: 'Khusus Word' },
                  { id: 'powerpoint', label: 'Khusus PowerPoint' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setAppFilter(opt.id as any)}
                    className={`p-2.5 rounded-[6px] text-xs text-left border transition-all ${
                      appFilter === opt.id
                        ? 'bg-[#171717] text-white font-medium border-[#171717]'
                        : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#374151] hover:bg-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <label className="text-xs font-semibold text-[#171717] block mb-1">
                Nama Lengkap Anda (untuk pencetakan sertifikat):
              </label>
              <input
                type="text"
                placeholder="Contoh: Muhammad Ubaidillah"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white border border-[#E5E7EB] rounded-[6px] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div className="text-[11px] text-[#6B7280] font-mono">
              Total Soal Terpilih: <strong>{activeQuestions.length} Soal</strong> | Batas Kelulusan: 70%
            </div>
          </div>

          <button
            onClick={() => setExamStarted(true)}
            disabled={!userName.trim()}
            className="px-6 py-2.5 rounded-[6px] bg-[#171717] hover:bg-black disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-all"
          >
            Mulai Ujian ({activeQuestions.length} Soal)
          </button>
        </div>
      ) : !isSubmitted ? (
        /* Active Questions */
        <div className="space-y-6">
          <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#4B5563]">
            <div>
              Peserta: <strong className="text-[#171717]">{userName}</strong> | Kategori:{' '}
              <span className="uppercase font-mono text-[#2563EB] font-semibold">{appFilter}</span>
            </div>
            <div>
              Terjawab:{' '}
              <strong className="text-[#171717]">
                {Object.keys(answers).length} / {activeQuestions.length}
              </strong>
            </div>
          </div>

          <div className="space-y-4">
            {activeQuestions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white border border-[#E5E7EB] rounded-[6px] p-5 sm:p-6 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#171717] text-white flex items-center justify-center text-xs font-mono shrink-0">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280]">
                      {q.app} • {q.difficulty}
                    </span>
                    <p className="text-sm font-semibold text-[#171717] leading-snug">
                      {q.question}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-1 pl-9">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = answers[q.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => setAnswers({ ...answers, [q.id]: optIdx })}
                        className={`w-full text-left p-3 rounded-[6px] border text-xs transition-all ${
                          isSelected
                            ? 'bg-blue-50 border-blue-600 text-blue-950 font-medium'
                            : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#374151] hover:bg-white'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setIsSubmitted(true)}
              className="px-6 py-2.5 rounded-[6px] bg-[#171717] hover:bg-black text-white text-xs font-semibold shadow-sm transition-all"
            >
              Kirim Semua Jawaban
            </button>
          </div>
        </div>
      ) : (
        /* Results & Certificate */
        <div className="space-y-8 animate-in fade-in">
          <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-6 sm:p-8 text-center space-y-4">
            <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center ${
              isPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
            }`}>
              {isPassed ? <ShieldCheck className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
            </div>

            <h2 className="text-2xl font-bold text-[#171717]">
              {isPassed ? 'Selamat! Anda Dinyatakan Lulus' : 'Belum Memenuhi Batas Kelulusan'}
            </h2>

            <p className="text-sm text-[#4B5563]">
              Nilai Anda: <strong className="text-lg text-[#171717]">{score}%</strong> (Batas: 70%)
            </p>

            {isPassed ? (
              <div className="max-w-xl mx-auto pt-4 space-y-6">
                <div className="p-8 border-4 border-double border-blue-800 rounded-[8px] bg-gradient-to-b from-white to-blue-50/40 text-center space-y-4 shadow-md">
                  <div className="flex justify-center">
                    <Award className="w-12 h-12 text-blue-700" />
                  </div>
                  <span className="text-xs font-mono text-blue-900 uppercase tracking-widest block font-bold">
                    OFFICEMASTER CERTIFICATE OF PROFICIENCY
                  </span>
                  <p className="text-xs text-[#6B7280]">Diberikan kepada:</p>
                  <h3 className="text-2xl font-bold text-[#171717] border-b border-[#E5E7EB] pb-2 inline-block px-8">
                    {userName}
                  </h3>
                  <p className="text-xs text-[#4B5563] max-w-md mx-auto leading-relaxed">
                    Atas kelulusan evaluasi uji kompetensi profesional <strong>Microsoft Office Specialist</strong> (Word, Excel, PowerPoint) dengan standar predikat sangat memuaskan.
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-[#9CA3AF] font-mono pt-4 border-t border-[#E5E7EB]">
                    <span>Kredensial: OM-CERT-{Date.now().toString().slice(-6)}</span>
                    <span>Status: Terverifikasi Digital</span>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-[6px] bg-[#171717] hover:bg-black text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Cetak Sertifikat (PDF)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-2">
                <p className="text-xs text-[#6B7280] max-w-md mx-auto mb-4">
                  Anda dapat mempelajari kembali materi yang belum dikuasai lalu mengulang ujian kapan saja tanpa biaya.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setAnswers({});
                  }}
                  className="px-4 py-2 rounded-[6px] bg-[#171717] hover:bg-black text-white text-xs font-semibold transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Ujian</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

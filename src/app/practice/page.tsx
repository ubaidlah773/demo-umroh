'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Code,
  Table,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import ExcelSimulator from '@/components/ExcelSimulator';

interface Scenario {
  id: string;
  title: string;
  desc: string;
  config: {
    initialCells: Record<string, string | number>;
    targetFormula: string;
    instructions: string;
  };
}

export default function PracticeLabPage() {
  const practiceScenarios: Scenario[] = [
    {
      id: 'sum',
      title: '1. Menjumlahkan Omzet Penjualan (SUM)',
      desc: 'Hitung total seluruh omzet penjualan laptop dan aksesoris pada cell B6.',
      config: {
        initialCells: {
          A1: 'Produk',
          B1: 'Penjualan (Rp)',
          A2: 'Laptop Asus',
          B2: '12000000',
          A3: 'Monitor LG',
          B3: '4500000',
          A4: 'Keyboard Mech',
          B4: '1200000',
          A5: 'Mouse Gaming',
          B5: '650000',
          A6: 'TOTAL',
          B6: '',
        },
        targetFormula: '=SUM(B2:B5)',
        instructions: 'Ketik formula =SUM(B2:B5) pada cell B6 lalu tekan Enter.',
      },
    },
    {
      id: 'average',
      title: '2. Menghitung Rata-rata Nilai Siswa (AVERAGE)',
      desc: 'Cari rata-rata nilai ujian matematika kelas 12 pada cell B6.',
      config: {
        initialCells: {
          A1: 'Nama Siswa',
          B1: 'Nilai Ujian',
          A2: 'Budi Santoso',
          B2: '85',
          A3: 'Siti Rahma',
          B3: '92',
          A4: 'Andi Pratama',
          B4: '78',
          A5: 'Dewi Lestari',
          B5: '95',
          A6: 'RATA-RATA',
          B6: '',
        },
        targetFormula: '=AVERAGE(B2:B5)',
        instructions: 'Ketik formula =AVERAGE(B2:B5) pada cell B6 lalu tekan Enter.',
      },
    },
    {
      id: 'if',
      title: '3. Logika Kelulusan Siswa (IF)',
      desc: 'Jika nilai pada B2 >= 75 maka siswa dinyatakan "LULUS", jika tidak "REMEDIAL".',
      config: {
        initialCells: {
          A1: 'Siswa',
          B1: 'Nilai',
          C1: 'Status',
          A2: 'Ahmad Fauzi',
          B2: '82',
          C2: '',
        },
        targetFormula: '=IF(B2>=75,"LULUS","REMEDIAL")',
        instructions: 'Ketik formula =IF(B2>=75,"LULUS","REMEDIAL") pada cell C2.',
      },
    },
  ];

  const [activeScenario, setActiveScenario] = useState(0);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <header className="space-y-4 border-b border-[#E5E7EB] pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-green-50 border border-green-200 text-green-800 text-xs font-mono font-bold">
          <Code className="w-3.5 h-3.5" />
          <span>INTERACTIVE PRACTICE LAB</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
          Laboratorium Interaktif Spreadsheet Excel
        </h1>
        <p className="text-sm text-[#6B7280] max-w-2xl leading-relaxed">
          Praktikkan langsung rumus-rumus Microsoft Excel langsung di peramban Anda tanpa perlu membuka software Excel. Masukkan formula pada formula bar atau klik dua kali pada sel.
        </p>

        {/* Scenario selector tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          {practiceScenarios.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => setActiveScenario(idx)}
              className={`px-3 py-1.5 rounded-[6px] text-xs transition-colors ${
                activeScenario === idx
                  ? 'bg-[#171717] text-white font-medium'
                  : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#171717]'
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>
      </header>

      {/* Main Interactive Simulator */}
      <section className="bg-white border border-[#E5E7EB] rounded-[6px] p-6 space-y-6">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-[#171717]">
            {practiceScenarios[activeScenario].title}
          </h2>
          <p className="text-xs text-[#4B5563]">
            {practiceScenarios[activeScenario].desc}
          </p>
        </div>

        <div className="p-3 bg-[#F9FAFB] rounded-[6px] border border-[#E5E7EB] text-xs text-[#4B5563] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-green-600 shrink-0" />
          <span>
            Instruksi: {practiceScenarios[activeScenario].config.instructions}
          </span>
        </div>

        <ExcelSimulator
          key={practiceScenarios[activeScenario].id}
          initialCells={practiceScenarios[activeScenario].config.initialCells}
          initialFormula={practiceScenarios[activeScenario].config.targetFormula}
          title={practiceScenarios[activeScenario].title}
          description={practiceScenarios[activeScenario].desc}
        />
      </section>
    </div>
  );
}

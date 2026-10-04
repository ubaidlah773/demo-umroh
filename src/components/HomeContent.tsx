"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Table,
  Presentation,
  ArrowRight,
  Download,
  ChevronDown,
  Check,
  RotateCcw,
} from 'lucide-react';
import { downloadPracticeFile } from '@/lib/downloadHelper';
import { useProgress } from '@/context/ProgressContext';

export default function HomeContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { recordDownload } = useProgress();

  // Interactive mini spreadsheet mockup on the right side of Hero
  const [heroItems, setHeroItems] = useState([
    { name: 'Laptop', sales: 12500000 },
    { name: 'Monitor', sales: 5200000 },
    { name: 'Keyboard', sales: 1200000 },
  ]);

  const handlePriceChange = (index: number, val: string) => {
    const num = Number(val);
    setHeroItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], sales: isNaN(num) ? 0 : num };
      return copy;
    });
  };

  const heroTotal = heroItems.reduce((acc, curr) => acc + curr.sales, 0);

  const resetHeroData = () => {
    setHeroItems([
      { name: 'Laptop', sales: 12500000 },
      { name: 'Monitor', sales: 5200000 },
      { name: 'Keyboard', sales: 1200000 },
    ]);
  };

  const faqs = [
    {
      q: 'Apakah materi di OfficeMaster gratis?',
      a: 'Ya, seluruh materi dari tingkat Beginner hingga Advanced dapat diakses secara gratis tanpa biaya langganan.',
    },
    {
      q: 'Apakah saya perlu menginstall Microsoft Office untuk belajar?',
      a: 'Tidak. Anda bisa langsung mempraktikkan konsep formula melalui spreadsheet interaktif di browser. Kami juga menyediakan file latihan (.xlsx, .docx, .pptx) jika ingin latihan langsung di software Office.',
    },
    {
      q: 'Bagaimana progres belajar saya disimpan?',
      a: 'Progres belajar, kuis, dan checklist materi otomatis disimpan pada browser Anda (LocalStorage) tanpa perlu registrasi akun.',
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION (EDITORIAL 2-COLUMN LAYOUT) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left column: Typography & CTA */}
        <div className="lg:col-span-6 space-y-5">
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#171717] tracking-tight leading-[1.2]">
            Semua Tools Administrasi,<br />
            dalam Satu Tempat.
          </h1>
          <p className="text-base text-[#6B7280] leading-relaxed max-w-lg">
            Gabungkan PDF, convert file, kompres dokumen, buat QR Code, dan selesaikan pekerjaan administrasi tanpa install software.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/pdf/merge"
              className="inline-flex items-center justify-center h-10 px-5 rounded-[6px] bg-[#2563EB] hover:bg-[#1e4db5] text-white font-medium text-sm transition-colors"
            >
              Mulai Menggunakan
            </Link>
            <Link
              href="#popular-tools"
              className="inline-flex items-center justify-center h-10 px-5 rounded-[6px] bg-white border border-[#E5E7EB] hover:bg-[#F8FAFC] text-[#171717] font-medium text-sm transition-colors"
            >
              Lihat Tools
            </Link>
          </div>
        </div>
        {/* Right column: Realistic Spreadsheet mockup */}
        <div className="lg:col-span-6">
          <div className="bg-white border border-[#D1D5DB] rounded-[8px] shadow-sm overflow-hidden text-xs">
            {/* Window title bar */}
            <div className="bg-[#F3F4F6] px-3 py-2 border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] border border-[#D1D5DB]" />
                <span className="font-semibold text-[#171717] text-xs">Excel Practice — Sales.xlsx</span>
              </div>
              <button
                onClick={resetHeroData}
                className="text-[11px] text-[#6B7280] hover:text-[#171717] flex items-center gap-1"
                title="Reset data"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
            {/* Formula Bar */}
            <div className="bg-[#F9FAFB] px-3 py-1.5 border-b border-[#E5E7EB] flex items-center gap-2 font-mono text-[11px]">
              <span className="text-[#6B7280] font-bold">B5</span>
              <span className="text-[#9CA3AF]">|</span>
              <span className="italic font-serif font-bold text-[#6B7280]">fx</span>
              <span className="text-[#171717] font-semibold">=SUM(B2:B4)</span>
            </div>
            {/* Data Grid */}
            <table className="w-full border-collapse table-fixed text-left">
              <thead>
                <tr className="bg-[#F9FAFB] text-[#6B7280] font-medium border-b border-[#E5E7EB] text-[11px]">
                  <th className="w-8 py-1.5 text-center border-r border-[#E5E7EB] font-mono">#</th>
                  <th className="px-3 py-1.5 border-r border-[#E5E7EB] font-mono">A (Product)</th>
                  <th className="px-3 py-1.5 text-right font-mono">B (Sales)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {heroItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#F9FAFB]">
                    <td className="py-2 text-center text-[#9CA3AF] border-r border-[#E5E7EB] font-mono text-[11px]">
                      {idx + 2}
                    </td>
                    <td className="px-3 py-2 font-medium text-[#171717] border-r border-[#E5E7EB]">
                      {item.name}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <input
                        type="text"
                        value={item.sales}
                        onChange={(e) => handlePriceChange(idx, e.target.value)}
                        className="w-full text-right bg-transparent border-0 focus:outline-none focus:ring-1 focus:ring-[#16A34A] rounded px-1 font-mono text-[#171717]"
                      />
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-[#F0FDF4] font-semibold border-t-2 border-[#16A34A]">
                  <td className="py-2 text-center text-[#16A34A] border-r border-[#BBF7D0] font-mono text-[11px]">5</td>
                  <td className="px-3 py-2 text-[#16A34A] border-r border-[#BBF7D0]">Total</td>
                  <td className="px-3 py-2 text-right font-mono font-bold text-[#16A34A]">
                    Rp{heroTotal.toLocaleString('id-ID')}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* Interactive hint */}
            <div className="bg-[#F9FAFB] px-3 py-2 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#6B7280]">
              <span>Ketik angka di kolom B untuk melihat rumus terhitung otomatis.</span>
              <span className="font-mono text-[#16A34A] font-semibold">Live Formula ✓</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR TOOLS QUICK LINKS */}
      <section id="popular-tools" className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#111827]">Popular Tools</h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <li>
            <Link href="/pdf/merge" className="block text-center p-4 border rounded hover:border-primary transition">
              Merge PDF
            </Link>
          </li>
          <li>
            <Link href="/pdf/split" className="block text-center p-4 border rounded hover:border-primary transition">
              Split PDF
            </Link>
          </li>
          <li>
            <Link href="/image/compress" className="block text-center p-4 border rounded hover:border-primary transition">
              Image Compressor
            </Link>
          </li>
          <li>
            <Link href="/qr" className="block text-center p-4 border rounded hover:border-primary transition">
              QR Code Generator
            </Link>
          </li>
        </ul>
      </section>

      {/* 3. FAQ SECTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#111827]">Frequently Asked Questions</h2>
        {faqs.map((item, idx) => (
          <div key={idx} className="border-b pb-2">
            <button
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full flex justify-between items-center text-left py-2"
            >
              <span className="font-medium">{item.q}</span>
              {openFaq === idx ? <ChevronDown className="w-4 h-4 transform rotate-180" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openFaq === idx && (
              <p className="mt-1 text-sm text-[#6B7280]">{item.a}</p>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

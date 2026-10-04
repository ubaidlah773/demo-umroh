'use client';

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
  Sparkles,
  Award,
  Layers,
  LayoutDashboard,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { downloadPracticeFile } from '@/lib/downloadHelper';
import { useProgress } from '@/context/ProgressContext';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { recordDownload } = useProgress();

  // Interactive mini spreadsheet mockup on the right side of Hero
  const [heroItems, setHeroItems] = useState([
    { name: 'Laptop', sales: 12500000 },
    { name: 'Monitor', sales: 5200000 },
    { name: 'Keyboard', sales: 1200000 },
  ]);

  const handlePriceChange = (index: number, val: string) => {
    const num = Number(val.replace(/[^0-9]/g, ''));
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
      q: 'Apakah materi di OfficeMaster benar-benar dari nol?',
      a: 'Ya, kami menyediakan Level 0 Fundamentals untuk pemula yang benar-benar baru belajar komputer dan Microsoft Office, dilanjutkan ke Beginner, Intermediate, Advanced, hingga Mastery.',
    },
    {
      q: 'Apakah saya perlu menginstall Microsoft Office untuk mulai belajar?',
      a: 'Tidak wajib. Anda dapat memahami rumus dan konsep melalui simulator interaktif langsung di browser. Kami juga menyediakan file latihan resmi (.xlsx, .docx, .pptx) yang dapat diunduh gratis untuk dipraktikkan di laptop Anda.',
    },
    {
      q: 'Apa itu Module 11 Dashboard Academy?',
      a: 'Dashboard Academy adalah learning track khusus 16 level untuk mengajarkan cara mengubah ribuan data mentah Excel menjadi interactive executive dashboard dengan Slicer, PivotTable, KPI, dan 15 proyek bisnis nyata.',
    },
    {
      q: 'Bagaimana progres belajar saya disimpan?',
      a: 'Progres belajar, skor kuis, dan pencapaian tersimpan otomatis di browser Anda (LocalStorage) tanpa perlu registrasi akun atau login yang rumit.',
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION (CLEAN EDITORIAL 2-COLUMN LAYOUT) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left column: Typography & CTA */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
            <Sparkles className="w-3.5 h-3.5" />
            Platform Belajar Microsoft Office Modern
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#171717] tracking-tight leading-[1.2]">
            Belajar Microsoft Office dari Nol sampai Bisa.
          </h1>

          <p className="text-base text-[#4B5563] leading-relaxed max-w-lg">
            Pelajari Word, Excel, PowerPoint, dan Dashboard melalui materi sederhana, contoh nyata, latihan interaktif, dan file latihan yang bisa langsung digunakan.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/learn"
              className="inline-flex items-center justify-center h-10 px-5 rounded-[6px] bg-[#171717] hover:bg-[#262626] text-white font-medium text-sm transition-colors shadow-xs"
            >
              Mulai Belajar
            </Link>
            <Link
              href="#courses"
              className="inline-flex items-center justify-center h-10 px-5 rounded-[6px] bg-white border border-[#E5E7EB] hover:bg-[#F8F9FA] text-[#171717] font-medium text-sm transition-colors"
            >
              Lihat Materi
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center h-10 px-4 rounded-[6px] bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] font-semibold text-xs hover:bg-[#D1FAE5] transition-colors"
            >
              📊 Dashboard Academy
            </Link>
          </div>
        </div>

        {/* Right column: Realistic Microsoft Office-Style Spreadsheet Mockup */}
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
                className="text-[11px] text-[#6B7280] hover:text-[#171717] flex items-center gap-1 transition-colors"
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
                        value={item.sales.toLocaleString('id-ID')}
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

      {/* 2. COURSE TRACKS (APA YANG BISA KAMU PELAJARI?) */}
      <section id="courses" className="space-y-6">
        <div className="border-b border-[#E5E7EB] pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
              Kurikulum Lengkap
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
              Apa yang bisa kamu pelajari?
            </h2>
          </div>
          <Link href="/learn" className="text-xs font-semibold text-[#4B5563] hover:text-[#171717]">
            Buka Kurikulum Interaktif →
          </Link>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-[8px] divide-y divide-[#E5E7EB] overflow-hidden">
          {/* Track 0: Fundamentals */}
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F9FAFB] transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]"></span>
                <h3 className="font-bold text-base text-[#171717]">Level 0 — Computer & Office Fundamentals</h3>
                <span className="text-[11px] font-mono text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded">
                  6 Modul
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Mengenal komputer, hardware & software, kelola folder ZIP, format file .docx/.xlsx/.pptx, dan 13 shortcut keyboard esensial.
              </p>
            </div>
            <Link
              href="/fundamentals"
              className="text-xs sm:text-sm font-semibold text-[#4F46E5] hover:underline flex items-center gap-1 shrink-0"
            >
              Mulai belajar <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Track 1: Word */}
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F9FAFB] transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                <h3 className="font-bold text-base text-[#171717]">📝 Microsoft Word</h3>
                <span className="text-[11px] font-mono text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded">
                  38 Lessons
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Formatting dokumen, surat resmi, CV ATS-Friendly, laporan skripsi, Mail Merge, gambar & tabel, dan tips profesional.
              </p>
            </div>
            <Link
              href="/word"
              className="text-xs sm:text-sm font-semibold text-[#2563EB] hover:underline flex items-center gap-1 shrink-0"
            >
              Mulai belajar <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Track 2: Excel */}
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F9FAFB] transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
                <h3 className="font-bold text-base text-[#171717]">📊 Microsoft Excel</h3>
                <span className="text-[11px] font-mono text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded">
                  46 Lessons
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Formula dasar, SUMIF/COUNTIF, VLOOKUP & XLOOKUP, PivotTable, visualisasi grafik, olah data, dan fungsi lanjutan.
              </p>
            </div>
            <Link
              href="/excel"
              className="text-xs sm:text-sm font-semibold text-[#16A34A] hover:underline flex items-center gap-1 shrink-0"
            >
              Mulai belajar <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Track 3: PowerPoint */}
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F9FAFB] transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]"></span>
                <h3 className="font-bold text-base text-[#171717]">📽️ Microsoft PowerPoint</h3>
                <span className="text-[11px] font-mono text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded">
                  31 Lessons
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Desain slide modern, Slide Master, layouting profesional, transisi halus, Pitch Deck bisnis, dan teknik presentasi eksekutif.
              </p>
            </div>
            <Link
              href="/powerpoint"
              className="text-xs sm:text-sm font-semibold text-[#EA580C] hover:underline flex items-center gap-1 shrink-0"
            >
              Mulai belajar <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Track 4: Module 11 Dashboard Academy */}
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#ECFDF5] transition-colors bg-[#F0FDF4]/40">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#059669]"></span>
                <h3 className="font-bold text-base text-[#171717]">📊 Module 11 — Dashboard Academy</h3>
                <span className="text-[11px] font-mono text-[#065F46] bg-[#D1FAE5] px-2 py-0.5 rounded font-bold">
                  16 Levels · 15 Real Projects
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#4B5563]">
                Ubah data mentah menjadi interactive executive dashboard di Excel dari nol. PivotTable, KPI, Slicers, 8 Master Templates, dan Sertifikasi.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="text-xs sm:text-sm font-bold text-[#059669] hover:underline flex items-center gap-1 shrink-0"
            >
              Buka Dashboard Academy <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. POPULAR LESSONS (EDITORIAL CARDS) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">Materi Terpopuler</h2>
          <Link href="/learn" className="text-xs sm:text-sm text-[#6B7280] hover:text-[#171717]">
            Lihat semua materi →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            {
              title: 'SUM & Statistik Dasar',
              app: 'excel',
              level: 'beginner',
              slug: 'sum',
              desc: 'Penjumlahan otomatis sekumpulan cell angka dan rata-rata.',
            },
            {
              title: 'IF & Logika Bersyarat',
              app: 'excel',
              level: 'intermediate',
              slug: 'if',
              desc: 'Fungsi logika penentu keputusan otomatis bersyarat.',
            },
            {
              title: 'XLOOKUP Modern',
              app: 'excel',
              level: 'intermediate',
              slug: 'vlookup-xlookup',
              desc: 'Pencarian data multi-arah pengganti VLOOKUP klasik.',
            },
            {
              title: 'CV ATS-Friendly',
              app: 'word',
              level: 'advanced',
              slug: 'professional-cv',
              desc: 'Format resume profesional lolos sistem bot rekrutmen HRD.',
            },
            {
              title: 'Daftar Isi Otomatis',
              app: 'word',
              level: 'intermediate',
              slug: 'table-of-contents',
              desc: 'Daftar isi skripsi rapi dalam hitungan detik dengan Heading Styles.',
            },
            {
              title: 'Pitch Deck Guy Kawasaki',
              app: 'powerpoint',
              level: 'advanced',
              slug: 'pitch-deck',
              desc: 'Struktur presentasi 10 slide standar pendanaan modal usaha.',
            },
          ].map((item, i) => (
            <Link
              key={i}
              href={`/${item.app}/${item.level}/${item.slug}`}
              className="p-4 bg-white border border-[#E5E7EB] rounded-[8px] hover:border-[#2563EB] transition-all flex flex-col justify-between space-y-2 group shadow-2xs"
            >
              <div>
                <span className="text-[11px] font-mono text-[#6B7280] uppercase">
                  {item.app} · {item.level}
                </span>
                <h4 className="font-bold text-sm text-[#171717] group-hover:text-[#2563EB] transition-colors mt-0.5">
                  {item.title}
                </h4>
                <p className="text-xs text-[#6B7280] mt-1 line-clamp-2 leading-relaxed">{item.desc}</p>
              </div>
              <span className="text-xs text-[#2563EB] font-semibold pt-2">Pelajari materi →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. PRACTICE FILES DOWNLOAD CALLOUT */}
      <section className="bg-white border border-[#E5E7EB] rounded-[8px] p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
          <div>
            <h2 className="text-xl font-bold text-[#171717]">
              File Latihan Praktik Langsung
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
              Unduh berkas latihan resmi (.xlsx, .docx, .pptx) yang dapat langsung dibuka dan dipraktikkan di laptop Anda.
            </p>
          </div>
          <Link
            href="/downloads"
            className="text-xs font-semibold text-[#2563EB] hover:underline shrink-0"
          >
            Buka Library Download Lengkap →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-[#F8F9FA] rounded-[6px] border border-[#E5E7EB] flex items-center justify-between">
            <div>
              <div className="font-bold text-xs text-[#171717]">Latihan Formula Excel</div>
              <div className="text-[11px] text-[#6B7280]">Latihan_Dasar_Excel.xlsx</div>
            </div>
            <button
              onClick={() => downloadPracticeFile({
                filename: 'Latihan_Dasar_Excel.xlsx',
                fileType: 'xlsx',
                title: 'Latihan Formula Excel',
                size: '25 KB',
                description: 'File latihan resmi formula Excel'
              })}
              className="p-2 rounded bg-white border border-[#E5E7EB] hover:bg-[#E5E7EB] text-[#16A34A] transition-colors"
              title="Unduh file"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-[#F8F9FA] rounded-[6px] border border-[#E5E7EB] flex items-center justify-between">
            <div>
              <div className="font-bold text-xs text-[#171717]">Format Dokumen Word</div>
              <div className="text-[11px] text-[#6B7280]">Template_Surat_Resmi.docx</div>
            </div>
            <button
              onClick={() => downloadPracticeFile({
                filename: 'Template_Surat_Resmi.docx',
                fileType: 'docx',
                title: 'Template Surat Resmi Word',
                size: '22 KB',
                description: 'File latihan resmi dokumen Word'
              })}
              className="p-2 rounded bg-white border border-[#E5E7EB] hover:bg-[#E5E7EB] text-[#2563EB] transition-colors"
              title="Unduh file"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-[#F8F9FA] rounded-[6px] border border-[#E5E7EB] flex items-center justify-between">
            <div>
              <div className="font-bold text-xs text-[#171717]">Slide Pitch Deck PPT</div>
              <div className="text-[11px] text-[#6B7280]">Pitch_Deck_Master.pptx</div>
            </div>
            <button
              onClick={() => downloadPracticeFile({
                filename: 'Pitch_Deck_Master.pptx',
                fileType: 'pptx',
                title: 'Pitch Deck Master PowerPoint',
                size: '30 KB',
                description: 'File latihan presentasi PowerPoint'
              })}
              className="p-2 rounded bg-white border border-[#E5E7EB] hover:bg-[#E5E7EB] text-[#EA580C] transition-colors"
              title="Unduh file"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
          Pertanyaan yang Sering Diajukan (FAQ)
        </h2>
        <div className="bg-white border border-[#E5E7EB] rounded-[8px] divide-y divide-[#E5E7EB]">
          {faqs.map((item, idx) => (
            <div key={idx} className="p-4 sm:p-5">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="font-bold text-sm text-[#171717]">{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6B7280] transition-transform ${
                    openFaq === idx ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

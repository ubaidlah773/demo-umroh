'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  FileSpreadsheet,
  FileText,
  Presentation,
  Check,
  Search,
  Filter,
} from 'lucide-react';
import { downloadPracticeFile } from '@/lib/downloadHelper';
import { DownloadItem } from '@/types';

export default function DownloadsLibraryPage() {
  const [downloadingName, setDownloadingName] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [search, setSearch] = useState('');

  const libraryFiles: DownloadItem[] = [
    {
      filename: 'Latihan_Excel_Formula_Dasar_SUM_AVERAGE.xlsx',
      fileType: 'xlsx',
      title: 'Latihan Rumus Dasar: SUM, AVERAGE, MIN, MAX',
      size: '22 KB',
      description: 'Dataset latihan transaksi toko untuk melatih rumus matematika dasar dan statistik.',
    },
    {
      filename: 'Latihan_Excel_Logika_IF_dan_IFS.xlsx',
      fileType: 'xlsx',
      title: 'Latihan Rumus Logika: IF Tunggal & IF Bertingkat',
      size: '25 KB',
      description: 'Data nilai siswa dan penilaian bonus karyawan untuk melatih logika kondisi IF.',
    },
    {
      filename: 'Latihan_Excel_Lookup_VLOOKUP_XLOOKUP.xlsx',
      fileType: 'xlsx',
      title: 'Latihan Pencarian Data: VLOOKUP & XLOOKUP Modern',
      size: '28 KB',
      description: 'Tabel master harga produk dan lookup kode pesanan kasir.',
    },
    {
      filename: 'Latihan_Excel_PivotTable_dan_Slicer.xlsx',
      fileType: 'xlsx',
      title: 'Latihan PivotTable & Slicer Interaktif',
      size: '35 KB',
      description: '1.000 baris data penjualan retail untuk latihan rekap PivotTable otomatis.',
    },
    {
      filename: 'Template_Executive_Dashboard_Sales.xlsx',
      fileType: 'xlsx',
      title: 'Template Dashboard Penjualan Eksekutif',
      size: '48 KB',
      description: 'Template dashboard lengkap 5 sheet dengan kalkulasi KPI dan grafik terintegrasi.',
    },
    {
      filename: 'Latihan_Word_Surat_Resmi_dan_Kop.docx',
      fileType: 'docx',
      title: 'Template Surat Dinas Resmi & Kop Surat Word',
      size: '18 KB',
      description: 'Format surat dinas berstandar administrasi perkantoran dengan margin standar.',
    },
    {
      filename: 'Latihan_Word_Format_Skripsi_Makalah.docx',
      fileType: 'docx',
      title: 'Template Makalah & Skripsi dengan Heading Styles',
      size: '30 KB',
      description: 'Dokumen berformat halaman romawi di kata pengantar dan angka arab di bab utama.',
    },
    {
      filename: 'Latihan_Word_Mail_Merge_Massal.docx',
      fileType: 'docx',
      title: 'Template Surat Undangan Mail Merge Massal',
      size: '19 KB',
      description: 'Format surat dengan placeholder merge tags siap dihubungkan ke sumber data Excel.',
    },
    {
      filename: 'Latihan_PowerPoint_Corporate_Master.pptx',
      fileType: 'pptx',
      title: 'Slide Master Korporat & Desain Minimalis',
      size: '45 KB',
      description: 'Template presentasi 16:9 dengan palet warna profesional dan typography terstandar.',
    },
    {
      filename: 'Latihan_PowerPoint_Transisi_Morph.pptx',
      fileType: 'pptx',
      title: 'Demo Latihan Animasi Transisi Morph PowerPoint',
      size: '40 KB',
      description: 'Slide interaktif untuk mempraktikkan efek zoom in dan transformasi bentuk halus.',
    },
  ];

  const filtered = libraryFiles.filter((item) => {
    const matchType = selectedType === 'all' || item.fileType === selectedType;
    const matchSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.filename.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const handleDownload = (item: DownloadItem) => {
    setDownloadingName(item.filename);
    downloadPracticeFile(item);
    setTimeout(() => setDownloadingName(null), 2500);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <header className="space-y-4 border-b border-[#E5E7EB] pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold">
          <Download className="w-3.5 h-3.5" />
          <span>FILE DOWNLOAD CENTER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
          Perpustakaan File Latihan & Template Gratis
        </h1>
        <p className="text-sm text-[#6B7280] max-w-2xl leading-relaxed">
          Semua file latihan (.xlsx, .docx, .pptx) dibuat siap pakai langsung di komputer Anda. Cukup klik tombol unduh untuk mendapatkan berkas latihan asli.
        </p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-1.5">
            {[
              { id: 'all', label: 'Semua Format' },
              { id: 'xlsx', label: 'Excel (.xlsx)' },
              { id: 'docx', label: 'Word (.docx)' },
              { id: 'pptx', label: 'PowerPoint (.pptx)' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1.5 rounded-[6px] text-xs transition-colors ${
                  selectedType === t.id
                    ? 'bg-[#171717] text-white font-medium'
                    : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#171717]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari file latihan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E5E7EB] rounded-[6px] focus:outline-none focus:border-[#171717]"
            />
          </div>
        </div>
      </header>

      {/* Grid of Files */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isDownloading = downloadingName === item.filename;

          let iconBg = 'bg-green-50 text-green-700 border-green-200';
          let IconComp = FileSpreadsheet;
          if (item.fileType === 'docx') {
            iconBg = 'bg-blue-50 text-blue-700 border-blue-200';
            IconComp = FileText;
          } else if (item.fileType === 'pptx') {
            iconBg = 'bg-orange-50 text-orange-700 border-orange-200';
            IconComp = Presentation;
          }

          return (
            <div
              key={item.filename}
              className="bg-white border border-[#E5E7EB] rounded-[6px] p-5 hover:border-[#9CA3AF] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-[6px] flex items-center justify-center border ${iconBg}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-[#9CA3AF]">
                    {item.size} • .{item.fileType}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#171717] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="p-2 bg-[#F9FAFB] rounded border border-[#E5E7EB] font-mono text-[11px] text-[#6B7280] truncate">
                  {item.filename}
                </div>
              </div>

              <div className="pt-2 border-t border-[#F3F4F6]">
                <button
                  onClick={() => handleDownload(item)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-[6px] bg-[#171717] hover:bg-black text-white text-xs font-semibold shadow-sm transition-all"
                >
                  {isDownloading ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Berhasil Mengunduh</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh Berkas Gratis</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

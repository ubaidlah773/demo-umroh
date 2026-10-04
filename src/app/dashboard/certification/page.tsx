'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  RotateCcw,
  ShieldCheck,
  Download,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const DASHBOARD_EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    question: 'Apa perbedaan mendasar antara Spreadsheet biasa dengan Executive Dashboard?',
    options: [
      'Dashboard berisi semua kolom raw data, sedangkan spreadsheet biasa hanya total akhir.',
      'Dashboard disajikan dalam 1 layar visual tanpa scroll untuk memandu keputusan cepat, sedangkan spreadsheet berisi baris data mentah.',
      'Dashboard hanya bisa dibuat menggunakan Power BI, tidak bisa di Microsoft Excel.',
      'Dashboard tidak boleh menggunakan rumus matematika sama sekali.'
    ],
    correctIndex: 1,
    explanation: 'Dashboard dirancang satu layar (single-screen) ringkas untuk memberikan gambaran performa dalam hitungan detik tanpa memaksa audiens scroll ribuan baris data.'
  },
  {
    id: 2,
    question: 'Mengapa penggunaan format Excel Table resmi (Ctrl+T) sangat dianjurkan saat membuat dashboard?',
    options: [
      'Agar ukuran file Excel menjadi lebih kecil 90%.',
      'Karena Excel Table otomatis memperluas referensi range (dynamic expansion) saat ada data transaksi baru dimasukkan.',
      'Karena Excel Table otomatis menghapus data duplikat tanpa konfirmasi.',
      'Karena tabel biasa tidak bisa diberi warna font biru.'
    ],
    correctIndex: 1,
    explanation: 'Excel Table memiliki sifat dynamic range. Ketika data transaksi baru ditambahkan di baris bawah, PivotTable dan formula otomatis menyertakannya saat direfresh.'
  },
  {
    id: 3,
    question: 'Berapa batasan rekomendasi jumlah kartu KPI utama yang sebaiknya ditampilkan pada bagian atas dashboard?',
    options: [
      'Sebanyak mungkin, minimal 15 hingga 20 kartu.',
      'Tepat 1 kartu saja.',
      'Antara 3 hingga 5 kartu metrik paling esensial.',
      'Tidak boleh menampilkan angka sama sekali di bagian atas.'
    ],
    correctIndex: 2,
    explanation: 'Aturan kognitif dashboard merekomendasikan 3–5 kartu KPI teratas agar audiens tidak mengalami cognitive overload dan fokus pada metrik krusial.'
  },
  {
    id: 4,
    question: 'Jika Anda ingin menampilkan tren data penjualan dari bulan Januari hingga Desember, tipe grafik manakah yang paling ideal?',
    options: [
      '3D Pie Chart',
      'Line Chart (Grafik Garis) atau Column Chart',
      'Scatter Plot tanpa garis',
      'Radar Chart 12 dimensi'
    ],
    correctIndex: 1,
    explanation: 'Untuk data time-series (tren berurutan waktu), Line Chart atau Column Chart adalah pilihan standar industri yang paling mudah dibaca arah perubahannya.'
  },
  {
    id: 5,
    question: 'Apa fungsi utama dari fitur "Report Connections" pada Slicer PivotTable?',
    options: [
      'Menghubungkan spreadsheet ke printer jaringan kantor.',
      'Menghubungkan satu tombol slicer ke beberapa PivotTable sekaligus sehingga semua grafik bergerak bersamaan saat tombol diklik.',
      'Mengirimkan laporan dashboard otomatis ke email atasan.',
      'Mengunci file Excel dengan kata sandi tingkat tinggi.'
    ],
    correctIndex: 1,
    explanation: 'Report Connections memungkinkan 1 Slicer mengendalikan banyak PivotTable berbeda di sheet CALC secara bersamaan, menciptakan interaktivitas multi-grafik yang mulus.'
  },
  {
    id: 6,
    question: 'Mengapa grafik Pie Chart dengan lebih dari 7 irisan sangat dilarang dalam standar dashboard profesional?',
    options: [
      'Karena Excel akan mengalami crash jika pie chart memiliki lebih dari 5 irisan.',
      'Mata manusia sulit membedakan sudut dan proporsi area lingkaran yang terpotong tipis-tipis, lebih baik gunakan Bar Chart horizontal.',
      'Karena pie chart tidak mendukung format persentase (%).',
      'Karena pie chart hanya berfungsi di PowerPoint.'
    ],
    correctIndex: 1,
    explanation: 'Persepsi visual manusia terhadap sudut lingkaran sangat lemah dibandingkan panjang batang (Bar Chart). Bar Chart horizontal jauh lebih superior untuk ranking banyak kategori.'
  },
  {
    id: 7,
    question: 'Dalam arsitektur spreadsheet dashboard profesional, sheet manakah yang sebaiknya disembunyikan (Hide) saat dikirim ke pengguna eksekutif?',
    options: [
      'Sheet DASHBOARD',
      'Sheet RAW_DATA dan CALC (kalkulasi perantara)',
      'Semua sheet harus dihapus.',
      'Tidak ada sheet yang boleh disembunyikan karena dilarang oleh Microsoft.'
    ],
    correctIndex: 1,
    explanation: 'Sheet CALC dan RAW_DATA disembunyikan (atau dilindungi) agar tampilan bersih dan formula perantara tidak diubah secara sengaja maupun tidak sengaja oleh pengguna.'
  },
  {
    id: 8,
    question: 'Formula apa yang digunakan untuk menghitung total penjualan pada wilayah "DKI Jakarta" yang terjadi pada kuartal 1 saja?',
    options: [
      '=SUM(penjualan)',
      '=COUNTIF(wilayah, "DKI Jakarta")',
      '=SUMIFS(kolom_omzet, kolom_wilayah, "DKI Jakarta", kolom_kuartal, "Q1")',
      '=VLOOKUP("DKI Jakarta", tabel, 2, FALSE)'
    ],
    correctIndex: 2,
    explanation: 'SUMIFS digunakan untuk menjumlahkan nilai berdasarkan 2 atau lebih kriteria sekaligus (multi-criteria aggregation).'
  },
  {
    id: 9,
    question: 'Apa arti dari aturan "Rule of 5 Seconds" dalam perancangan dashboard?',
    options: [
      'Dashboard harus selesai dibuat dalam waktu 5 detik.',
      'Audiens harus mampu memahami status utama performa bisnis dan arah tren dalam 5 detik pertama melihat dashboard.',
      'File Excel harus terbuka kurang dari 5 detik di komputer.',
      'Animasi transisi slide tidak boleh melebihi 5 detik.'
    ],
    correctIndex: 1,
    explanation: 'Rule of 5 Seconds menyatakan bahwa efektivitas dashboard diukur dari seberapa cepat eksekutif memahami apakah bisnis sedang sehat atau bermasalah dalam 5 detik pertama.'
  },
  {
    id: 10,
    question: 'Langkah pertama yang benar untuk membersihkan tampilan kanvas Excel sebelum mendesain dashboard adalah:',
    options: [
      'Mengubah font menjadi Comic Sans.',
      'Menonaktifkan Gridlines melalui tab View → uncheck Gridlines.',
      'Menghapus semua tombol pada Ribbon.',
      'Menutup aplikasi Excel dan membukanya di Notepad.'
    ],
    correctIndex: 1,
    explanation: 'Menghilangkan garis grid bawaan (View → Gridlines di-uncheck) memberikan latar belakang kanvas bersih putih yang profesional menyerupai aplikasi web modern.'
  }
];

export default function DashboardCertificationPage() {
  const [userName, setUserName] = useState('');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

  const calculateScore = () => {
    let correct = 0;
    DASHBOARD_EXAM_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correct += 1;
      }
    });
    return Math.round((correct / DASHBOARD_EXAM_QUESTIONS.length) * 100);
  };

  const score = isSubmitted ? calculateScore() : 0;
  const isPassed = score >= 70;

  return (
    <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <header className="space-y-4 border-b border-[#E5E7EB] pb-6">
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="text-xs text-[#6B7280] hover:text-[#171717] inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard Academy Hub</span>
          </Link>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-purple-50 border border-purple-200 text-purple-800 text-xs font-mono font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>SERTIFIKASI KOMPETENSI RESMI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight mt-2">
            Ujian Sertifikasi: Excel Dashboard Specialist
          </h1>
          <p className="text-sm text-[#6B7280] max-w-2xl mt-1 leading-relaxed">
            Buktikan keahlian Anda dalam merancang, memodelkan data, dan membangun executive dashboard interaktif dengan Microsoft Excel. Raih sertifikat digital dengan batas kelulusan 70%.
          </p>
        </div>
      </header>

      {!examStarted ? (
        /* Pre-Exam Registration Card */
        <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#171717]">
              Ketentuan Ujian Sertifikasi
            </h2>
            <ul className="space-y-2 text-xs text-[#4B5563]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                <span>10 Soal Pilihan Ganda tentang data preparation, formula, visualisasi, dan UI layout.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Batas kelulusan minimal: <strong>70% (7 jawaban benar)</strong>.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Sertifikat digital terverifikasi dapat diunduh langsung setelah lulus.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#F3F4F6] max-w-md">
            <label className="text-xs font-semibold text-[#171717] block">
              Masukkan Nama Lengkap Anda untuk Sertifikat:
            </label>
            <input
              type="text"
              placeholder="Contoh: Muhammad Ubaidillah"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-[#E5E7EB] rounded-[6px] focus:outline-none focus:border-purple-600"
            />
          </div>

          <button
            onClick={() => setExamStarted(true)}
            disabled={!userName.trim()}
            className="px-6 py-2.5 rounded-[6px] bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-all"
          >
            Mulai Ujian Sekarang
          </button>
        </div>
      ) : !isSubmitted ? (
        /* Active Exam Questions */
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-[6px] p-4 flex items-center justify-between text-xs text-purple-900 font-medium">
            <span>Peserta: <strong>{userName}</strong></span>
            <span>Total Soal: {DASHBOARD_EXAM_QUESTIONS.length} Soal</span>
          </div>

          <div className="space-y-6">
            {DASHBOARD_EXAM_QUESTIONS.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white border border-[#E5E7EB] rounded-[6px] p-5 sm:p-6 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#171717] text-white flex items-center justify-center text-xs font-mono shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-sm font-semibold text-[#171717] leading-snug">
                    {q.question}
                  </p>
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
                            ? 'bg-purple-50 border-purple-600 text-purple-950 font-medium shadow-xs'
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

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => setIsSubmitted(true)}
              className="px-6 py-2.5 rounded-[6px] bg-[#171717] hover:bg-black text-white text-xs font-semibold shadow-sm transition-all"
            >
              Kirim Jawaban & Lihat Hasil
            </button>
          </div>
        </div>
      ) : (
        /* Results & Certificate Display */
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
              Nilai Akhir: <strong className="text-lg text-[#171717]">{score}%</strong> (Batas: 70%)
            </p>

            {isPassed ? (
              <div className="max-w-xl mx-auto pt-4 space-y-6">
                {/* Visual Certificate Card */}
                <div className="p-8 border-4 border-double border-purple-700 rounded-[8px] bg-gradient-to-b from-white to-purple-50/40 text-center space-y-4 shadow-md">
                  <div className="flex justify-center">
                    <Award className="w-12 h-12 text-purple-600" />
                  </div>
                  <span className="text-xs font-mono text-purple-800 uppercase tracking-widest block font-bold">
                    OFFICEMASTER CERTIFICATE OF COMPETENCE
                  </span>
                  <p className="text-xs text-[#6B7280]">Diberikan dengan bangga kepada:</p>
                  <h3 className="text-2xl font-bold text-[#171717] border-b border-[#E5E7EB] pb-2 inline-block px-8">
                    {userName}
                  </h3>
                  <p className="text-xs text-[#4B5563] max-w-md mx-auto leading-relaxed">
                    Atas keberhasilan menyelesaikan evaluasi komprehensif dan menguasai kompetensi pembuatan <strong>Interactive Executive Dashboard</strong> menggunakan Microsoft Excel.
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-[#9CA3AF] font-mono pt-4 border-t border-[#E5E7EB]">
                    <span>Kredensial: OM-DASH-{Date.now().toString().slice(-6)}</span>
                    <span>Status: Terverifikasi Resmi</span>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-[6px] bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Cetak / Simpan Sertifikat (PDF)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-2">
                <p className="text-xs text-[#6B7280] max-w-md mx-auto mb-4">
                  Jangan berkecil hati. Anda dapat membaca kembali materi di level 1–16 dan mengulang ujian kapan saja.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setAnswers({});
                  }}
                  className="px-4 py-2 rounded-[6px] bg-[#171717] hover:bg-black text-white text-xs font-semibold transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Coba Ulang Ujian</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

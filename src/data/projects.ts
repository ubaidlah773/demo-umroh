import { MiniProject } from '@/types';

export const MINI_PROJECTS: MiniProject[] = [
  {
    id: 'excel-kasir-warung',
    title: 'Project 1: Sistem Kasir Warung Sederhana',
    app: 'excel',
    level: 'beginner',
    description: 'Bangun sistem kasir toko kelontong otomatis dengan penghitungan total belanja, diskon bertingkat, dan rekap grand total.',
    scenario: 'Ibu Siti pemilik Warung Berkah ingin membuat sistem kasir otomatis di laptopnya agar pelanggan mendapat struk rincian dan kalkulasi diskon tidak pernah salah hitung.',
    skills: ['SUM', 'IF (Diskon)', 'SUMIF (Kategori)', 'Formatting Rupiah', 'Border Tabel'],
    steps: [
      {
        title: 'Langkah 1: Susun Tabel Master Produk',
        description: 'Buat kolom: No, Nama Barang, Kategori, Harga Satuan, Qty Terjual, dan Subtotal.',
        hint: 'Ketik rumus Subtotal di kolom F: =D2*E2',
      },
      {
        title: 'Langkah 2: Terapkan Rumus Diskon Logika IF',
        description: 'Berikan diskon 5% jika total belanja di atas Rp 100.000, jika tidak maka diskon Rp 0.',
        hint: 'Gunakan formula: =IF(Subtotal>100000, Subtotal*5%, 0)',
      },
      {
        title: 'Langkah 3: Hitung Grand Total Penjualan',
        description: 'Gunakan fungsi SUM untuk menjumlahkan seluruh subtotal lalu kurangi dengan total diskon.',
        hint: 'Formula: =SUM(Subtotal_Range) - SUM(Diskon_Range)',
      },
      {
        title: 'Langkah 4: Rekap Penjualan Kategori dengan SUMIF',
        description: 'Ketahui berapa total penjualan khusus untuk kategori "Sembako" vs "Minuman".',
        hint: 'Formula: =SUMIF(Kategori_Range, "Sembako", Subtotal_Range)',
      },
    ],
    downloadFile: {
      filename: 'project-kasir-warung-berkah.xlsx',
      fileType: 'xlsx',
      title: 'Starter File Project Kasir Warung Excel',
      size: '24.5 KB',
      description: 'Template project kasir lengkap dengan sheet lembar kerja dan sheet kunci solusi formula.',
    },
  },
  {
    id: 'excel-dashboard-penjualan',
    app: 'excel',
    level: 'intermediate',
    title: 'Project 2: Dashboard Penjualan Interaktif',
    description: 'Ubah ribuan data transaksi menjadi dashboard ringkas eksekutif dengan Pivot Table, Slicer, dan Visual Chart dinamis.',
    scenario: 'Direktur penjualan meminta laporan ringkasan performa 4 cabang toko selama 1 tahun terakhir yang bisa difilter per kuartal secara interaktif.',
    skills: ['Pivot Table', 'Pivot Chart', 'Slicer Interaktif', 'Conditional Formatting Heatmap', 'Summary KPI Cards'],
    steps: [
      {
        title: 'Langkah 1: Format Data Mentah Menjadi Excel Table',
        description: 'Blok data transaksi dan tekan Ctrl + T agar data dinamis saat ada penambahan transaksi baru.',
      },
      {
        title: 'Langkah 2: Buat Pivot Table Rekap Cabang',
        description: 'Tarik Cabang ke Rows, Bulan ke Columns, dan Nilai Penjualan ke Values.',
      },
      {
        title: 'Langkah 3: Tambahkan Slicer Interaktif',
        description: 'Gunakan fitur Insert Slicer untuk tombol filter klik cepat per Kategori dan Wilayah.',
      },
      {
        title: 'Langkah 4: Hubungkan Visualisasi Chart',
        description: 'Buat Combo Chart untuk menampilkan tren pendapatan sekaligus target pencapaian.',
      },
    ],
    downloadFile: {
      filename: 'project-dashboard-penjualan.xlsx',
      fileType: 'xlsx',
      title: 'Starter File Project Dashboard Penjualan',
      size: '38.2 KB',
      description: 'Dataset 1.500 transaksi ritel siap olah dengan lembar panduan pembuatan dashboard.',
    },
  },
  {
    id: 'word-cv-profesional',
    app: 'word',
    level: 'advanced',
    title: 'Project 3: Membuat CV ATS-Friendly Profesional',
    description: 'Rancang berkas Curriculum Vitae standar industri modern yang ramah mesin Applicant Tracking System perusahaan ternama.',
    scenario: 'Mempersiapkan dokumen lamaran kerja profesional satu halaman yang bersih, terstruktur dengan metode STAR, dan lolos seleksi otomatis HRD.',
    skills: ['Margin Baku', 'Tipografi Formal', 'STAR Method Bullets', 'Styles Hierarki', 'Export PDF Sempurna'],
    steps: [
      {
        title: 'Langkah 1: Atur Margin dan Font Utama',
        description: 'Pilih margin Normal (2.54 cm), jenis font Arial atau Calibri ukuran 10.5pt untuk body.',
      },
      {
        title: 'Langkah 2: Buat Header Kontak Bersih',
        description: 'Tulis Nama Lengkap, Lokasi Domisili, Nomor WhatsApp aktif, Email profesional, dan URL LinkedIn.',
      },
      {
        title: 'Langkah 3: Tulis Ringkasan Karir (Summary)',
        description: 'Tulis 3-4 baris ringkas tentang keahlian utama dan nilai tambah unik yang kamu tawarkan.',
      },
      {
        title: 'Langkah 4: Struktur Pengalaman dengan Angka Pencapaian',
        description: 'Gunakan rumus: [Kata Kerja Aksi] + [Tugas/Proyek] + [Hasil Terukur/Persentase].',
      },
    ],
    downloadFile: {
      filename: 'project-template-cv-ats.docx',
      fileType: 'docx',
      title: 'Template Panduan Project CV ATS Word',
      size: '26.8 KB',
      description: 'Template CV standar internasional yang siap disesuaikan dengan data pengalaman kamu.',
    },
  },
  {
    id: 'powerpoint-company-profile',
    app: 'powerpoint',
    level: 'intermediate',
    title: 'Project 4: Slide Company Profile Perusahaan Modern',
    description: 'Mendesain 10 slide profil perusahaan yang elegan, meyakinkan investor, dan menampilkan keunggulan produk secara visual.',
    scenario: 'Perusahaan jasa konsultan ingin membuat presentasi pengenalan profil bisnis untuk dikirimkan kepada calon klien korporat berskala besar.',
    skills: ['Slide Master Korporat', 'Aturan 6x6', 'SmartArt Bagan Struktur', 'Palet Warna 60-30-10', 'Transisi Halus'],
    steps: [
      {
        title: 'Langkah 1: Konfigurasi Slide Master',
        description: 'Kunci warna brand utama, jenis font judul, dan logo perusahaan pada Slide Master.',
      },
      {
        title: 'Langkah 2: Slide Cover & Nilai Unggulan',
        description: 'Buat cover dengan foto beresolusi tinggi, overlay gradasi gelap, dan satu kalimat tagline tajam.',
      },
      {
        title: 'Langkah 3: Visualisasikan Visi Misi & Layanan',
        description: 'Ubah teks poin menjadi kartu visual dengan icon modern dan ruang kosong yang lega.',
      },
      {
        title: 'Langkah 4: Tampilkan Portofolio & Klien',
        description: 'Sajikan logo klien dalam grid simetris dan testimoni dengan foto nyata.',
      },
    ],
    downloadFile: {
      filename: 'project-company-profile-modern.pptx',
      fileType: 'pptx',
      title: 'Template Project Company Profile PPT',
      size: '41.5 KB',
      description: 'Template 10 slide profil korporat modern dengan layout minimalis dan kartu visual elegan.',
    },
  },
];

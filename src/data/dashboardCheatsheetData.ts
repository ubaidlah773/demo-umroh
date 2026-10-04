export interface CheatsheetSection {
  id: string;
  title: string;
  description: string;
  items: {
    title: string;
    description: string;
    exampleOrRule: string;
    tag?: string;
  }[];
}

export const DASHBOARD_CHEATSHEET_SECTIONS: CheatsheetSection[] = [
  {
    id: 'kpi-matrix',
    title: '1. KPI Selection Matrix (Apa yang Harus Ditampilkan?)',
    description: 'Panduan menentukan metrik esensial berdasarkan fungsi dan departemen bisnis.',
    items: [
      {
        title: 'Sales Dashboard',
        description: 'Fokus pada pertumbuhan omzet, likuiditas pesanan, dan produktivitas penjualan.',
        exampleOrRule: 'KPI Wajib: Total Revenue (Rp), Net Profit Margin (%), Total Orders, Average Order Value (AOV), MoM Sales Growth (%).',
        tag: 'Sales'
      },
      {
        title: 'Corporate Finance Dashboard',
        description: 'Fokus pada profitabilitas perusahaan, kepatuhan anggaran, dan likuiditas kas.',
        exampleOrRule: 'KPI Wajib: Gross Revenue, Gross Profit Margin, Operating Expense (Opex), EBITDA, Net Profit, Budget Variance (%).',
        tag: 'Finance'
      },
      {
        title: 'HR & People Analytics',
        description: 'Fokus pada stabilitas jumlah staf, retensi talenta, dan efisiensi biaya ketenagakerjaan.',
        exampleOrRule: 'KPI Wajib: Active Headcount, Turnover Rate (%), Absenteeism Rate (%), Average Tenure (Tahun), Total Overtime Cost.',
        tag: 'HR'
      },
      {
        title: 'Warehouse & Inventory',
        description: 'Fokus pada ketersediaan stok, nilai aset tertahan, dan pencegahan kekosongan barang.',
        exampleOrRule: 'KPI Wajib: Total Stock Asset Value (Rp), Low Stock SKU Alert, Out of Stock SKU, Dead Stock Ratio (%), Days of Inventory.',
        tag: 'Supply Chain'
      },
      {
        title: 'Digital Marketing & Growth',
        description: 'Fokus pada efisiensi biaya akuisisi dan pengembalian belanja iklan komersial.',
        exampleOrRule: 'KPI Wajib: Total Ad Spend, Attributed Revenue, Return on Ad Spend (ROAS), Click-Through Rate (CTR %), CPA / CAC.',
        tag: 'Marketing'
      },
      {
        title: 'School Academic Dashboard',
        description: 'Fokus pada pencapaian ketuntasan kurikulum dan evaluasi daya serap siswa.',
        exampleOrRule: 'KPI Wajib: Rata-rata Nilai Ujian, KKM Passing Rate (%), Siswa Nilai A, Jumlah Siswa Butuh Remedial.',
        tag: 'Education'
      }
    ]
  },
  {
    id: 'chart-selection',
    title: '2. Chart Selection Decision Tree (Kapan Menggunakan Grafik Tertentu?)',
    description: 'Aturan baku visualisasi data: Not every data needs a chart. Pilih grafik sesuai pesan data.',
    items: [
      {
        title: 'Line Chart (Grafik Garis)',
        description: 'Gunakan ketika data memiliki sumbu waktu kronologis (Hari, Bulan, Kuartal, Tahun).',
        exampleOrRule: 'Cocok: Tren omzet Januari-Desember, Fluktuasi kurs mata uang, Tren kehadiran mingguan. JANGAN untuk perbandingan kategori tanpa urutan waktu.',
        tag: 'Tren Waktu'
      },
      {
        title: 'Horizontal Bar Chart (Grafik Batang Mendatar)',
        description: 'Gunakan ketika membandingkan peringkat (ranking) banyak kategori dengan label nama panjang.',
        exampleOrRule: 'Cocok: Ranking 10 Cabang Toko, 15 Produk Terlaris, Daftar Nama Karyawan. Keunggulan: Label teks mudah dibaca tanpa perlu dimiringkan.',
        tag: 'Ranking & Kategori'
      },
      {
        title: 'Vertical Column Chart (Grafik Kolom)',
        description: 'Gunakan untuk membandingkan 3 sampai 7 kategori terpisah atau data diskrit.',
        exampleOrRule: 'Cocok: Penjualan 4 Kuartal (Q1, Q2, Q3, Q4), Perbandingan 3 tipe layanan berlangganan. Selalu mulai sumbu Y dari angka 0.',
        tag: 'Perbandingan Diskrit'
      },
      {
        title: 'Combo Chart (Kolom + Garis Sumbu Ganda)',
        description: 'Gunakan ketika menampilkan dua metrik dengan satuan unit atau skala angka yang berbeda.',
        exampleOrRule: 'Cocok: Kolom = Total Omzet (Rupiah Ratusan Juta) & Garis = Margin Keuntungan (Persentase 0-100%).',
        tag: 'Multi-Metrik'
      },
      {
        title: 'Donut Chart (Bukan Pie 3D)',
        description: 'Gunakan HANYA untuk memperlihatkan proporsi bagian dari total dengan maksimal 2-3 kategori.',
        exampleOrRule: 'Cocok: Rasio Pembayaran QRIS vs Tunai (2 kategori), Komposisi Gender (2 kategori). JANGAN gunakan jika ada lebih dari 4 kategori.',
        tag: 'Proporsi Sederhana'
      },
      {
        title: 'Scatter Plot (Diagram Sebar)',
        description: 'Gunakan untuk melihat hubungan atau korelasi antara dua variabel angka kontinu.',
        exampleOrRule: 'Cocok: Matriks Menu Engineering (Popularitas vs Margin Laba), Hubungan Biaya Iklan vs Jumlah Pembeli.',
        tag: 'Korelasi'
      },
      {
        title: 'Waterfall Chart (Grafik Air Terjun)',
        description: 'Gunakan untuk memperlihatkan perubahan kumulatif nilai awal ke nilai akhir dengan faktor penambah dan pengurang.',
        exampleOrRule: 'Cocok: Laporan Laba Rugi (Pendapatan Kotor → -HPP → -Beban Operasional → -Pajak → Laba Bersih Akhir).',
        tag: 'Arus Nilai'
      }
    ]
  },
  {
    id: 'dashboard-layout',
    title: '3. Dashboard Layout Blueprint & Ergonomi Visual',
    description: 'Arsitektur kisi standar industri yang terbukti nyaman bagi mata dan mudah dipahami dalam 5-10 detik.',
    items: [
      {
        title: 'Zona 1: Header & Control Bar (Baris 1-4)',
        description: 'Terdiri dari Nama Dashboard (H1), Logo Perusahaan, Tanggal Terakhir Data Diperbarui, dan Tombol Slicer/Dropdown Filter utama.',
        exampleOrRule: 'Contoh: [ SALES DASHBOARD 2026 ] | Diperbarui: 04 Okt 2026 | Filter: [ Wilayah: Semua ▼ ] [ Kuartal: Q3 ▼ ]'
      },
      {
        title: 'Zona 2: KPI Metric Cards (Baris 5-9)',
        description: 'Tepat 3 sampai 5 kartu persegi panjang simetris berjejer horizontal. Setiap kartu memuat Label, Nilai Utama Bold, Delta % vs Target/Prior, dan Micro-Sparkline.',
        exampleOrRule: 'Contoh: [ Total Omzet: Rp245.8M ↑ 18.4% ] [ Net Profit: Rp81.2M ↑ 12.1% ] [ Orders: 4,230 ↑ 5.2% ] [ AOV: Rp580Rb ↓ 2.1% ]'
      },
      {
        title: 'Zona 3: Trend & Macro Analysis (Baris 10-24 Kiri)',
        description: 'Grafik utama berukuran besar yang menampilkan pergerakan performa sepanjang waktu (Line Chart atau Combo Chart bulanan).',
        exampleOrRule: 'Contoh: Grafik Tren Penjualan & Margin Keuntungan Januari s/d Desember 2026.'
      },
      {
        title: 'Zona 4: Category Breakdown & Share (Baris 10-24 Kanan)',
        description: 'Grafik komparasi kategori produk atau wilayah (Horizontal Bar Chart atau Donut Chart) untuk melihat kontributor terbesar.',
        exampleOrRule: 'Contoh: Grafik Kontribusi Penjualan per Kategori Produk dan Sebaran Wilayah Cabang.'
      },
      {
        title: 'Zona 5: Detail & Actionable Insights (Baris 25-35)',
        description: 'Tabel ringkas Top 5 Performa Terbaik / Terburuk disertai kotak teks Catatan Rekomendasi Eksekutif (Smart Commentary).',
        exampleOrRule: 'Contoh: Tabel 5 Produk Terlaris + Kotak Teks Ringkasan 3 Tindakan Bisnis yang Harus Diambil Direksi.'
      }
    ]
  },
  {
    id: 'semantic-colors',
    title: '4. Semantic Color System (Aturan Baku Warna Dashboard)',
    description: 'Warna pada dashboard bisnis harus fungsional dan konsisten, bukan hiasan dekoratif semata.',
    items: [
      {
        title: 'Primary Brand Color (Biru / Navy / Hijau Botol)',
        description: 'Digunakan untuk judul utama, batas header, tombol aktif, dan batang grafik seri data utama.',
        exampleOrRule: 'Kode HEX: #1E3A8A (Navy Blue) atau #0F172A (Slate Dark) atau #047857 (Emerald Dark).'
      },
      {
        title: 'Neutral Palette (Latar & Batas Sel)',
        description: 'Warna latar kanvas, garis kartu pemisah, teks label sekunder, dan garis sumbu gridline halus.',
        exampleOrRule: 'Kanvas: #F8F9FA | Kartu: #FFFFFF | Border Kartu: #E5E7EB | Teks Label: #6B7280.'
      },
      {
        title: 'Success / Positive (Hijau Zamrud)',
        description: 'Digunakan HANYA untuk kenaikan yang menguntungkan, pencapaian di atas target, atau status selesai.',
        exampleOrRule: 'Kode HEX: #16A34A (Green 600). Digunakan pada panah naik ↑ dan badge persentase surplus.'
      },
      {
        title: 'Danger / Alert (Merah Lembut)',
        description: 'Digunakan HANYA untuk penurunan performa, biaya membengkak, komplain pelanggan, atau stok kritis.',
        exampleOrRule: 'Kode HEX: #DC2626 (Red 600). Digunakan pada panah turun ↓ dan status darurat.'
      },
      {
        title: 'Warning / Attention (Kuning Amber)',
        description: 'Digunakan untuk menandai metrik yang mendekati batas toleransi atau membutuhkan pengawasan.',
        exampleOrRule: 'Kode HEX: #D97706 (Amber 600). Digunakan pada status Reorder Persediaan dan Deadline mendekat.'
      }
    ]
  },
  {
    id: 'professional-workflow',
    title: '5. End-to-End Professional Workflow Pipeline',
    description: 'Urutan baku 11 tahap membangun dashboard profesional dari baris data mentah pertama.',
    items: [
      {
        title: 'Tahap 1: Business Discovery & KPI Defining',
        description: 'Pahami siapa audiens dashboard dan tentukan 3-5 KPI utama yang paling kritikal untuk bisnis.',
        exampleOrRule: 'Keluaran: Dokumen requirement dan kesepakatan rumus KPI.'
      },
      {
        title: 'Tahap 2: Data Audit & Flat Table Structuring',
        description: 'Periksa baris data mentah. Hilangkan merged cells, pastikan ada baris header tunggal, dan ubah ke Ctrl+T.',
        exampleOrRule: 'Keluaran: Sheet "01_RAW_DATA" dan "02_CLEAN_DATA" berformat flat table.'
      },
      {
        title: 'Tahap 3: Wireframe Sketching di Kertas',
        description: 'Gambar sketsa kasar tata letak kotak KPI, posisi chart, dan Slicer di kertas sebelum membuka Excel.',
        exampleOrRule: 'Keluaran: Sketsa wireframe 1 layar siap eksekusi.'
      },
      {
        title: 'Tahap 4: Data Modeling & PivotTable Construction',
        description: 'Buat seluruh PivotTable ringkasan dan simpan rapi di sheet khusus "04_PIVOT". Beri nama tiap PivotTable.',
        exampleOrRule: 'Keluaran: PivotTable tren, pivot ranking kategori, dan calculated fields.'
      },
      {
        title: 'Tahap 5: Visualization & Slicer Connections',
        description: 'Bangun grafik PivotChart, pindahkan ke sheet "05_DASHBOARD", pasang Slicer, dan sambungkan via Report Connections.',
        exampleOrRule: 'Keluaran: Seluruh chart merespons klik tombol Slicer secara serempak.'
      },
      {
        title: 'Tahap 6: Quality Control & Stress Testing',
        description: 'Klik semua variasi tombol filter. Pastikan tidak ada pesan error #DIV/0!, #N/A, atau angka yang meleset.',
        exampleOrRule: 'Keluaran: File terkunci (Protected) rapi dan siap dipresentasikan di ruang rapat.'
      }
    ]
  }
];

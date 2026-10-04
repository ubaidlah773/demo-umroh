import { DashboardProject } from '@/types';

export const DASHBOARD_PROJECTS: DashboardProject[] = [
  {
    id: 'proj-01',
    number: 1,
    title: 'Sales Performance Dashboard',
    category: 'Sales & Commercial',
    difficulty: 'Intermediate',
    stars: 2,
    brief: 'Perusahaan ritel multinasional memiliki 10.000+ baris transaksi tahun 2026 yang tersebar di 5 pulau besar di Indonesia. Direktur Penjualan kesulitan mengetahui cabang mana yang underperforming dan produk apa yang menjadi penopang utama omzet.',
    datasetInfo: {
      name: 'Retail_Sales_Transactions_2026.xlsx',
      rows: 8500,
      columns: ['Trans_ID', 'Date', 'Customer_Type', 'Product', 'Category', 'Region', 'Units', 'Unit_Price', 'Total_Sales', 'Cost', 'Profit']
    },
    objective: 'Membangun 1-screen executive sales dashboard yang memperlihatkan performa omzet dan profit bulanan, performa per wilayah, serta ranking produk unggulan.',
    requiredKpis: [
      'Total Revenue (Rp Juta/Miliar)',
      'Total Net Profit & Margin %',
      'Total Transactions (Jumlah Pesanan)',
      'Average Order Value (AOV)',
      'MoM Sales Growth %'
    ],
    requiredCharts: [
      'Monthly Sales & Profit Trend (Combo Chart: Clustered Column + Line)',
      'Sales by Category (Horizontal Bar Chart)',
      'Regional Contribution (Donut Chart atau Segmented Bar)',
      'Top 5 Best-Selling Products Table'
    ],
    requiredFilters: [
      'Slicer Region: [ All ] [ DKI Jakarta ] [ Jawa Barat ] [ Jawa Timur ] [ Luar Jawa ]',
      'Slicer Kategori Produk: [ Elektronik ] [ Fashion ] [ F&B ] [ Home Appliances ]',
      'Timeline Filter: Rentang Bulan / Kuartal'
    ],
    designRequirements: [
      'Format kanvas 1 layar tanpa scroll (1920x1080). Nonaktifkan View → Gridlines.',
      'Gunakan palet warna korporat: Primary Deep Blue (#1E3A8A) dengan aksen Emerald Green (#16A34A).',
      'Kartu KPI teratas diletakkan dengan padding dan alignment simetris.'
    ],
    challenges: [
      'Berapa kontribusi profit wilayah DKI Jakarta dibandingkan total profit nasional?',
      'Bulan apakah yang mencatatkan margin profit terendah dan apa penyebab utamanya?',
      'Apakah kategori produk dengan omzet tertinggi juga menghasilkan profit tertinggi?'
    ],
    expectedInsights: [
      'Kategori Elektronik menghasilkan omzet tertinggi (48%), tetapi margin profit tertinggi justru disumbang oleh kategori Aksesoris & Fashion (34% margin).',
      'Wilayah Jawa Timur mengalami penurunan omzet pada Q2 akibat keterlambatan pengiriman stok.'
    ],
    checklist: [
      'Dataset diubah menjadi Excel Table resmi (tbl_Sales)',
      'Sheet terpisah: 01_RAW, 02_CLEAN, 03_CALC, 04_PIVOT, 05_DASHBOARD',
      '5 Kartu KPI terhitung otomatis dengan formula dinamis / PivotTable',
      'Slicer Region dan Kategori terhubung ke seluruh PivotChart',
      'Tidak ada formula yang menghasilkan #DIV/0! atau #N/A',
      'Insight dan rekomendasi tertulis rapi di kotak teks eksekutif'
    ],
    downloadFile: {
      filename: 'Project_01_Sales_Performance_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Project 01 - Sales Performance Dashboard Starter File',
      size: '52 KB',
      description: 'Dataset 8.500 transaksi ritel, template layout kanvas, dan petunjuk pengerjaan.'
    }
  },
  {
    id: 'proj-02',
    number: 2,
    title: 'UMKM Retail & POS Sales Dashboard',
    category: 'Small Business & Retail',
    difficulty: 'Beginner',
    stars: 1,
    brief: 'Toko sembako dan kelontong modern "Berkah Jaya" ingin memantau omzet harian dari mesin kasir POS, memantau produk cepat laku, dan mengetahui jam sibuk pelanggan.',
    datasetInfo: {
      name: 'UMKM_POS_Register_Daily.xlsx',
      rows: 2400,
      columns: ['Receipt_No', 'Tanggal', 'Jam_Transaksi', 'Nama_Barang', 'Kategori', 'Qty', 'Harga_Jual', 'Modal', 'Laba', 'Metode_Bayar']
    },
    objective: 'Membuat dashboard kasir harian yang praktis, mudah dibaca di laptop pemilik toko, dan memperlihatkan keuntungan bersih harian.',
    requiredKpis: [
      'Omzet Penjualan Hari Ini & Bulan Ini',
      'Keuntungan Bersih (Total Laba Kotor)',
      'Total Struk / Pembeli',
      'Rata-rata Belanja per Konsumen'
    ],
    requiredCharts: [
      'Tren Penjualan Harian (Line Chart)',
      'Komposisi Metode Pembayaran: QRIS vs Tunai vs Transfer (Donut Chart)',
      'Top 10 Barang Paling Laris (Bar Chart)'
    ],
    requiredFilters: [
      'Dropdown Pemilihan Bulan',
      'Slicer Metode Pembayaran (Tunai, QRIS, Debit)'
    ],
    designRequirements: [
      'Layout sederhana dan bersih dengan kartu KPI berukuran besar.',
      'Warna dominan Hijau Segar (#15803D) dan Netral Abu-abu.',
      'Sertakan ringkasan total uang tunai yang harus disetor ke bank.'
    ],
    challenges: [
      'Berapa persentase transaksi yang sudah beralih menggunakan pembayaran non-tunai (QRIS)?',
      'Pada jam berapa toko mengalami lonjakan transaksi tertinggi?'
    ],
    expectedInsights: [
      'Pembayaran QRIS telah mencakup 62% transaksi, mempercepat antrean kasir sebesar 25%.',
      'Jam sibuk terjadi pukul 16:00 - 19:00 WIB saat jam pulang kantor.'
    ],
    checklist: [
      'Data kasir dibersihkan dari struk void/batal',
      'Perhitungan laba per barang tervalidasi akurat',
      'Metode bayar QRIS vs Tunai terbagi jelas',
      'Format Rupiah rapi tanpa desimal berlebihan'
    ],
    downloadFile: {
      filename: 'Project_02_UMKM_Retail_POS_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Project 02 - UMKM Retail POS Starter File',
      size: '40 KB',
      description: 'Data kasir 2.400 struk, rumus keuntungan otomatis, dan template rekap harian.'
    }
  },
  {
    id: 'proj-03',
    number: 3,
    title: 'Corporate Financial Performance Dashboard',
    category: 'Finance & Accounting',
    difficulty: 'Advanced',
    stars: 3,
    brief: 'Departemen Keuangan korporasi membutuhkan dashboard evaluasi Laba Rugi (P&L) bulanan untuk membandingkan Realisasi Anggaran (Actual) vs Target Budget (Budget) serta mendeteksi pemborosan biaya operasional.',
    datasetInfo: {
      name: 'Corporate_GL_Financial_Data.xlsx',
      rows: 4200,
      columns: ['Month', 'Cost_Center', 'Account_Code', 'Account_Name', 'Category_Type', 'Actual_Amount', 'Budget_Amount', 'Variance']
    },
    objective: 'Menyajikan dashboard keuangan tingkat dewan direksi yang menampilkan EBITDA, Gross Margin, Net Profit, dan analisis deviasi anggaran (Variance Analysis).',
    requiredKpis: [
      'Total Revenue (Actual vs Budget)',
      'Gross Profit & Gross Margin %',
      'Total Opex (Operating Expenses)',
      'Net Profit & Net Margin %',
      'Budget Variance %'
    ],
    requiredCharts: [
      'Monthly Revenue vs Opex vs Profit (Grouped Column with Net Profit Line)',
      'Opex Breakdown by Cost Center (Stacked Bar Chart)',
      'Waterfall Chart Analisis Perubahan Saldo Laba',
      'Variance Table dengan Conditional Formatting Icon Sets'
    ],
    requiredFilters: [
      'Slicer Cost Center: [ HQ ] [ Operations ] [ Marketing ] [ R&D ] [ Sales ]',
      'Timeline Kuartal / Semester'
    ],
    designRequirements: [
      'Kesan elegan dan terpercaya: Palet Navy Slate (#0F172A) dengan garis pembatas halus.',
      'Sertakan indikator status deviasi (Merah jika Opex melebihi Budget >5%).',
      'Gunakan format akuntansi resmi (negatif dalam kurung atau warna merah).'
    ],
    challenges: [
      'Departemen manakah yang mengalami pembengkakan anggaran Opex tertinggi?',
      'Apakah pencapaian target profitabilitas tertolong oleh penghematan biaya atau pertumbuhan pendapatan?'
    ],
    expectedInsights: [
      'Departemen Marketing mengalami overbudget sebesar 14% di Q3 karena peluncuran produk baru.',
      'Gross margin perusahaan stabil di angka 42%, namun kenaikan biaya logistik menurunkan net margin sebesar 3%.'
    ],
    checklist: [
      'Klasifikasi akun P&L (Pendapatan, HPP, Opex) terstruktur rapi',
      'Formula Variance (Actual - Budget) dan % Variance akurat',
      'Waterfall chart laba rugi terhubung dinamis',
      'Format angka accounting konsisten'
    ],
    downloadFile: {
      filename: 'Project_03_Corporate_Finance_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Project 03 - Corporate Finance Dashboard Starter File',
      size: '48 KB',
      description: 'Dataset buku besar umum (General Ledger), template P&L statement, dan varian budget.'
    }
  },
  {
    id: 'proj-04',
    number: 4,
    title: 'Personal Finance & Wealth Dashboard',
    category: 'Personal Wealth',
    difficulty: 'Beginner',
    stars: 1,
    brief: 'Seseorang ingin mengelola keuangan pribadi secara cerdas: mencatat arus kas pemasukan dan pengeluaran, memantau alokasi tabungan dan investasi (aturan 50/30/20), serta melacak pertumbuhan kekayaan bersih (Net Worth).',
    datasetInfo: {
      name: 'Personal_Cashflow_Records.xlsx',
      rows: 1100,
      columns: ['Tanggal', 'Akun_Bank', 'Arus', 'Kategori_Besar', 'Sub_Kategori', 'Catatan', 'Nominal', 'Tipe_Kebutuhan']
    },
    objective: 'Merancang lembar pelacak keuangan mandiri yang otomatis menghitung sisa tabungan bulanan dan mendeteksi kategori pengeluaran yang boros.',
    requiredKpis: [
      'Total Pemasukan Bulan Ini',
      'Total Pengeluaran Bulan Ini',
      'Tingkat Tabungan (Savings Rate %)',
      'Total Kekayaan Bersih (Net Worth)'
    ],
    requiredCharts: [
      'Tren Arus Kas Pemasukan vs Pengeluaran Bulanan (Line Chart)',
      'Proporsi Pengeluaran 50/30/20: Kebutuhan vs Keinginan vs Tabungan (Donut Chart)',
      'Breakdown Pengeluaran Terbesar (Horizontal Bar Chart)'
    ],
    requiredFilters: [
      'Dropdown Pemilih Bulan (Januari - Desember)',
      'Slicer Akun Keuangan: [ Rekening Utama ] [ Dompet Digital ] [ Reksadana/Saham ]'
    ],
    designRequirements: [
      'Desain ramah pengguna, modern, bersih, dengan warna Indigo (#4F46E5) dan Emerald.',
      'Sertakan progress bar tujuan keuangan (Financial Goals Tracker).'
    ],
    challenges: [
      'Berapa rasio tabungan aktual dibandingkan target ideal minimal 20%?',
      'Kategori pengeluaran gaya hidup mana yang paling sering melampaui batas batas bulanan?'
    ],
    expectedInsights: [
      'Pengeluaran pesan antar makanan (Food Delivery) menyumbang 22% dari total pengeluaran kebutuhan hidup.',
      'Savings rate berhasil ditingkatkan dari 12% menjadi 28% setelah penghematan langganan digital.'
    ],
    checklist: [
      'Rumus kalkulasi tabungan otomatis (Pemasukan - Pengeluaran)',
      'Rasio 50/30/20 terhitung dengan formula conditional',
      'Tabel budget vs realisasi pengeluaran bulanan terintegrasi'
    ],
    downloadFile: {
      filename: 'Project_04_Personal_Finance_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Project 04 - Personal Finance Dashboard Starter File',
      size: '34 KB',
      description: 'Template pelacak arus kas pribadi, target dana darurat, dan visualisasi alokasi 50/30/20.'
    }
  },
  {
    id: 'proj-05',
    number: 5,
    title: 'HR & Headcount Analytics Dashboard',
    category: 'Human Resources',
    difficulty: 'Intermediate',
    stars: 2,
    brief: 'Head of HR ingin memonitor dinamika ketenagakerjaan perusahaan beranggotakan 600 karyawan: melacak headcount per departemen, distribusi gender dan usia, masa kerja, serta tingkat perputaran karyawan (Turnover Rate).',
    datasetInfo: {
      name: 'HR_Employee_Master_Directory.xlsx',
      rows: 750,
      columns: ['Emp_ID', 'Full_Name', 'Department', 'Position_Level', 'Gender', 'Join_Date', 'Status', 'Resign_Date', 'Salary', 'Performance_Score']
    },
    objective: 'Membangun people analytics dashboard yang menyajikan demografi staf, retensi talenta, dan efisiensi struktur organisasi.',
    requiredKpis: [
      'Total Karyawan Aktif (Active Headcount)',
      'Karyawan Baru Masuk (New Hires YTD)',
      'Karyawan Keluar (Turnover Rate %)',
      'Rata-rata Masa Kerja (Tenure in Years)',
      'Rata-rata Skor Kinerja (Performance Rating)'
    ],
    requiredCharts: [
      'Headcount per Departemen (Horizontal Bar Chart)',
      'Piramida Distribusi Usia & Masa Kerja (Column Chart)',
      'Tren Turnover Bulanan (Line Chart dengan Garis Ambang Batas 5%)',
      'Distribusi Tingkat Jabatan: Staff vs Spv vs Manager (Donut Chart)'
    ],
    requiredFilters: [
      'Slicer Departemen: [ IT ] [ HR ] [ Marketing ] [ Operasional ] [ Finance ]',
      'Slicer Status Karyawan: [ Tetap ] [ Kontrak ] [ Probation ]'
    ],
    designRequirements: [
      'Desain bersih bertema human resources profesional dengan warna Teal (#0D9488) dan Slate.',
      'Sertakan catatan kerahasiaan data (Strictly Confidential HR).'
    ],
    challenges: [
      'Departemen manakah yang mengalami tingkat turnover tertinggi dalam 6 bulan terakhir?',
      'Apakah ada korelasi antara masa kerja karyawan dengan nilai evaluasi kinerja tahunan?'
    ],
    expectedInsights: [
      'Turnover tertinggi terkonsentrasi pada staf divisi IT dengan masa kerja di bawah 1.5 tahun.',
      'Rata-rata skor kinerja karyawan tetap 18% lebih tinggi dibandingkan karyawan kontrak.'
    ],
    checklist: [
      'Rumus perhitungan headcount aktif berbasis tanggal resign terverifikasi',
      'Formula turnover rate bulanan: (Resigned / Avg Headcount) * 100%',
      'Slicer departemen responsif ke semua chart demografi'
    ],
    downloadFile: {
      filename: 'Project_05_HR_Headcount_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Project 05 - HR Headcount Dashboard Starter File',
      size: '42 KB',
      description: 'Master data 750 karyawan, rumus DATEDIF tenure, dan template demografi HR.'
    }
  },
  {
    id: 'proj-06',
    number: 6,
    title: 'Employee Attendance & Overtime Dashboard',
    category: 'Human Resources & Operations',
    difficulty: 'Intermediate',
    stars: 2,
    brief: 'Pabrik manufaktur dengan 3 shift kerja mengalami pembengkakan biaya lembur (Overtime) dan penurunan rasio kehadiran saat hari kerja kejepit.',
    datasetInfo: {
      name: 'Factory_Attendance_Log_Q1.xlsx',
      rows: 5600,
      columns: ['Log_ID', 'Emp_ID', 'Shift', 'Departemen', 'Tanggal', 'Jam_Masuk', 'Jam_Pulang', 'Status_Hadir', 'Keterlambatan_Menit', 'Jam_Lembur']
    },
    objective: 'Merancang dashboard pengawasan absensi harian dan lembur mingguan untuk mengidentifikasi divisi yang paling boros lembur.',
    requiredKpis: [
      'Tingkat Kehadiran Rata-rata (% Attendance)',
      'Total Jam Lembur Pabrik (Total Overtime Hours)',
      'Biaya Estimasi Lembur (Rp)',
      'Rata-rata Keterlambatan Masuk (Menit)'
    ],
    requiredCharts: [
      'Tren Kehadiran Harian (Line Chart)',
      'Jam Lembur per Departemen (Bar Chart)',
      'Alasan Ketidakhadiran: Sakit, Izin, Cuti, Alpa (Donut Chart)',
      'Tabel Top 10 Karyawan dengan Lembur Terbanyak'
    ],
    requiredFilters: [
      'Slicer Shift Kerja: [ Shift 1 Pagi ] [ Shift 2 Sore ] [ Shift 3 Malam ]',
      'Slicer Departemen Produksi'
    ],
    designRequirements: [
      'Warna peringatan Amber (#D97706) untuk lembur dan Hijau untuk rasio kehadiran.',
      'Sertakan indikator KPI alert jika total lembur melebihi batas legal Depnaker.'
    ],
    challenges: [
      'Berapa jam lembur rata-rata per pekerja pada shift malam?',
      'Hari apakah dalam seminggu yang mencatatkan tingkat keterlambatan paling tinggi?'
    ],
    expectedInsights: [
      'Shift malam menyumbang 58% dari total beban jam lembur akibat kendala mesin pada sore hari.',
      'Keterlambatan melonjak tajam pada hari Senin pagi rata-rata 24 menit per staf.'
    ],
    checklist: [
      'Kalkulasi jam lembur tervalidasi menggunakan formula waktu Excel',
      'Rasio absensi terhitung per departemen tanpa celah error',
      'Format tabel alert lembur berfungsi dengan conditional formatting'
    ],
    downloadFile: {
      filename: 'Project_06_Attendance_Overtime_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Project 06 - Attendance & Overtime Starter File',
      size: '44 KB',
      description: 'Log absensi 5.600 baris, formula kalkulasi jam lembur, dan dashboard pengawasan shift.'
    }
  },
  {
    id: 'proj-07',
    number: 7,
    title: 'Warehouse & Inventory Stock Dashboard',
    category: 'Supply Chain & Logistics',
    difficulty: 'Advanced',
    stars: 3,
    brief: 'Gudang distribusi logistik mengelola 1.200 SKU barang. Manajemen membutuhkan sistem deteksi dini untuk stok yang menipis (Low Stock Alert), barang kedaluwarsa, dan barang yang tidak bergerak sama sekali (Dead Stock).',
    datasetInfo: {
      name: 'Logistics_Inventory_Master.xlsx',
      rows: 1500,
      columns: ['SKU_Code', 'Item_Name', 'Category', 'Warehouse_Location', 'Qty_On_Hand', 'Safety_Stock', 'Reorder_Point', 'Unit_Cost', 'Total_Value', 'Days_in_Warehouse']
    },
    objective: 'Membangun dashboard kesehatan persediaan gudang yang menampilkan status stok aman vs kritis dan estimasi nilai aset persediaan.',
    requiredKpis: [
      'Total Nilai Persediaan (Inventory Asset Value)',
      'Total SKU Terkelola',
      'Jumlah SKU Kritis / Low Stock Alert',
      'SKU Habis / Out of Stock',
      'Nilai Persediaan Macet (Dead Stock Value)'
    ],
    requiredCharts: [
      'Status Kesehatan Persediaan: Aman, Perlu Reorder, Kritis, Kosong (Stacked Column)',
      'Nilai Stok per Kategori Barang (Treemap atau Horizontal Bar)',
      'Top 10 Barang dengan Nilai Persediaan Tertinggi',
      'Tabel Tindakan Cepat (Actionable Reorder List)'
    ],
    requiredFilters: [
      'Slicer Lokasi Gudang: [ Gudang Utama Jakarta ] [ Gudang Surabaya ] [ Gudang Medan ]',
      'Slicer Status Stok: [ Aman ] [ Perlu Reorder ] [ Kritis ]'
    ],
    designRequirements: [
      'Gunakan kartu alert merah menyala untuk SKU Out of Stock.',
      'Sertakan tombol filter cepat "Tampilkan Hanya Stok Kritis".'
    ],
    challenges: [
      'Berapa total modal kerja yang tertahan pada barang yang tidak bergerak lebih dari 90 hari (Dead Stock)?',
      'Gudang manakah yang memiliki risiko kehabisan stok barang farmasi paling tinggi?'
    ],
    expectedInsights: [
      'Sebesar Rp 140 Juta modal tertahan di kategori aksesoris yang tidak terjual dalam 120 hari.',
      'Gudang Medan memiliki 14 SKU kritis yang memerlukan pengiriman pasokan darurat dalam waktu 48 jam.'
    ],
    checklist: [
      'Formula status stok otomatis: =IF(Stok<=0, "Habis", IF(Stok<=Reorder, "Kritis", "Aman"))',
      'Kalkulasi nilai aset persediaan akurat (Qty * Unit Cost)',
      'Tabel daftar reorder otomatis terfilter dinamis'
    ],
    downloadFile: {
      filename: 'Project_07_Warehouse_Inventory_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Project 07 - Warehouse Inventory Starter File',
      size: '46 KB',
      description: 'Master inventaris 1.500 SKU, formula reorder alert, dan dashboard status pergudangan.'
    }
  },
  {
    id: 'proj-08',
    number: 8,
    title: 'School Academic & Performance Dashboard',
    category: 'Education & Academic',
    difficulty: 'Intermediate',
    stars: 2,
    brief: 'Kepala Sekolah sebuah SMA unggulan ingin menganalisis rekapitulasi nilai rapor 450 siswa: distribusi nilai ujian, tingkat kelulusan per mata pelajaran, dan perbandingan performa antar kelas.',
    datasetInfo: {
      name: 'School_Grade_Records_2026.xlsx',
      rows: 2700,
      columns: ['NIS', 'Nama_Siswa', 'Kelas', 'Jurusan', 'Mata_Pelajaran', 'Tugas', 'UTS', 'UAS', 'Nilai_Akhir', 'Predikat', 'Status_Lulus']
    },
    objective: 'Merancang dashboard akademik sekolah yang memudahkan dewan guru mengevaluasi mata pelajaran yang paling membutuhkan bimbingan tambahan.',
    requiredKpis: [
      'Rata-rata Nilai Ujian Sekolah',
      'Persentase Kelulusan (% Passing Rate)',
      'Total Siswa Berprestasi (Predikat A)',
      'Jumlah Siswa Butuh Remedial'
    ],
    requiredCharts: [
      'Distribusi Nilai Rata-rata per Mata Pelajaran (Bar Chart)',
      'Perbandingan Rata-rata Nilai Antar Kelas (Column Chart)',
      'Komposisi Predikat Nilai A, B, C, D (Donut Chart)',
      'Daftar Top 10 Siswa Peraih Peringkat Tertinggi'
    ],
    requiredFilters: [
      'Slicer Kelas: [ X-IPA 1 ] [ X-IPA 2 ] [ X-IPS 1 ] [ X-IPS 2 ]',
      'Slicer Mata Pelajaran: [ Matematika ] [ Bahasa Inggris ] [ Fisika ] [ Ekonomi ]'
    ],
    designRequirements: [
      'Nuansa akademis formal: Palet Biru Royal (#1D4ED8) dan Emas (#CA8A04) untuk juara.',
      'Sertakan batas KKM (Kriteria Ketuntasan Minimal) 75 pada grafik.'
    ],
    challenges: [
      'Mata pelajaran manakah yang mencatatkan persentase remedial tertinggi?',
      'Apakah kelas IPA memiliki rata-rata nilai Bahasa Inggris yang lebih tinggi daripada kelas IPS?'
    ],
    expectedInsights: [
      'Mata pelajaran Matematika memiliki tingkat remedial 28%, terkonsentrasi pada materi kalkulus.',
      'Kelas X-IPA 1 mencatatkan rata-rata nilai keseluruhan tertinggi yaitu 86.4.'
    ],
    checklist: [
      'Rumus Nilai Akhir berbobot: =(Tugas*20%)+(UTS*30%)+(UAS*50%)',
      'Formula Predikat otomatis menggunakan IFS atau VLOOKUP bertingkat',
      'Conditional formatting penanda siswa di bawah KKM berfungsi'
    ],
    downloadFile: {
      filename: 'Project_08_School_Academic_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Project 08 - School Academic Dashboard Starter File',
      size: '41 KB',
      description: 'Rekap nilai 2.700 catatan ujian, formula predikat otomatis, dan template rapor digital.'
    }
  },
  {
    id: 'proj-09',
    number: 9,
    title: 'University Student Retention Dashboard',
    category: 'Higher Education',
    difficulty: 'Advanced',
    stars: 3,
    brief: 'Universitas swasta ingin memantau tingkat kelulusan tepat waktu, Indeks Prestasi Kumulatif (IPK) mahasiswa, dan memprediksi risiko putus kuliah (Drop Out) pada semester awal.',
    datasetInfo: {
      name: 'University_Student_Registry.xlsx',
      rows: 3200,
      columns: ['NIM', 'Nama_Mahasiswa', 'Fakultas', 'Program_Studi', 'Angkatan', 'Semester', 'IPK_Kumulatif', 'SKS_Lulus', 'Tunggakan_SPP', 'Status_Akademik']
    },
    objective: 'Membangun dashboard retensi mahasiswa untuk tim dekanat guna mencegah mahasiswa drop out melalui sistem peringatan dini.',
    requiredKpis: [
      'Rata-rata IPK Universitas',
      'Persentase Mahasiswa Berisiko DO (IPK < 2.00)',
      'Tingkat Mahasiswa Aktif Registrasi %',
      'Rata-rata SKS Terselesaikan'
    ],
    requiredCharts: [
      'Distribusi IPK Mahasiswa per Fakultas (Boxplot / Grouped Bar)',
      'Tren Penurunan Jumlah Mahasiswa per Semester (Funnel Chart)',
      'Korelasi Tunggakan SPP dengan IPK (Scatter Plot)',
      'Tabel Mahasiswa Early Warning System'
    ],
    requiredFilters: [
      'Slicer Fakultas: [ Teknik ] [ Ekonomi & Bisnis ] [ Ilmu Komputer ] [ Psikologi ]',
      'Slicer Tahun Angkatan'
    ],
    designRequirements: [
      'Warna peringatan merah untuk mahasiswa IPK < 2.00 dan SPP menunggak.',
      'Tampilan ringkas dengan navigasi tab per fakultas.'
    ],
    challenges: [
      'Fakultas manakah yang memiliki mahasiswa dengan risiko DO tertinggi?',
      'Berapa persentase mahasiswa berisiko yang juga memiliki masalah tunggakan administrasi?'
    ],
    expectedInsights: [
      '68% mahasiswa dengan IPK di bawah 2.00 memiliki tunggakan SPP lebih dari 2 semester.',
      'Semester 3 dan 4 merupakan titik kritis paling rawan mahasiswa mengundurkan diri.'
    ],
    checklist: [
      'Formula deteksi status risiko DO otomatis',
      'Kalkulasi retensi angkatan per semester',
      'Integrasi Slicer fakultas dengan grafik funnel'
    ],
    downloadFile: {
      filename: 'Project_09_University_Retention_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Project 09 - University Student Retention Starter File',
      size: '47 KB',
      description: 'Data registrasi 3.200 mahasiswa, matriks IPK kumulatif, dan dashboard early warning.'
    }
  },
  {
    id: 'proj-10',
    number: 10,
    title: 'Digital Marketing & Campaign Dashboard',
    category: 'Marketing & Growth',
    difficulty: 'Intermediate',
    stars: 2,
    brief: 'Digital Marketing Lead mengelola iklan berbayar lintas channel (Meta Ads, Google Ads, TikTok Ads, dan Email Blast). Tim membutuhkan evaluasi Return on Ad Spend (ROAS) dan Customer Acquisition Cost (CAC).',
    datasetInfo: {
      name: 'Digital_Ads_Campaign_Performance.xlsx',
      rows: 1800,
      columns: ['Campaign_ID', 'Platform', 'Campaign_Name', 'Date', 'Impressions', 'Clicks', 'Ad_Spend', 'Leads', 'Conversions', 'Attributed_Revenue']
    },
    objective: 'Merancang performance marketing dashboard yang menampilkan efektivitas anggaran promosi dan perbandingan ROAS antar saluran iklan.',
    requiredKpis: [
      'Total Biaya Iklan (Total Ad Spend)',
      'Total Revenue Teratribusi',
      'Overall ROAS (Revenue / Spend)',
      'Click-Through Rate (CTR %)',
      'Cost per Acquisition (CPA / CAC)'
    ],
    requiredCharts: [
      'ROAS & Revenue per Platform Iklan (Grouped Bar Chart)',
      'Tren Harian Ad Spend vs Revenue (Dual Axis Line & Area Chart)',
      'Marketing Conversion Funnel: Impressions → Clicks → Leads → Sales',
      'Bubble Chart: Spend vs ROAS vs Conversions'
    ],
    requiredFilters: [
      'Slicer Platform: [ Meta Ads ] [ Google Search ] [ TikTok Ads ] [ Email Newsletter ]',
      'Timeline Tanggal Kampanye'
    ],
    designRequirements: [
      'Tampilan modern berenergi dengan warna Ungu Digital (#7C3AED) dan Hijau Emerald.',
      'Sertakan kartu KPI ROAS dengan conditional formatting warna hijau jika >3.0x.'
    ],
    challenges: [
      'Platform iklan mana yang menghasilkan ROAS paling efisien?',
      'Apakah peningkatan biaya iklan harian di TikTok berkorelasi positif dengan kenaikan penjualan nyata?'
    ],
    expectedInsights: [
      'Google Search menghasilkan ROAS tertinggi yaitu 4.2x dengan konversi sangat targeted.',
      'TikTok Ads memberikan volume impresi tertinggi namun memiliki nilai CPA konversi termahal.'
    ],
    checklist: [
      'Rumus perhitungan ROAS, CTR, dan CPA terverifikasi tanpa error',
      'Visualisasi funnel marketing tersusun runtut dari impressi ke checkout',
      'Filter platform otomatis mengkalkulasi ulang biaya iklan'
    ],
    downloadFile: {
      filename: 'Project_10_Digital_Marketing_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Project 10 - Digital Marketing Campaign Starter File',
      size: '43 KB',
      description: 'Data iklan 1.800 baris, rumus ROAS & CPA otomatis, dan template perbandingan platform.'
    }
  },
  {
    id: 'proj-11',
    number: 11,
    title: 'Customer Satisfaction & Churn Dashboard',
    category: 'Customer Success',
    difficulty: 'Intermediate',
    stars: 2,
    brief: 'Perusahaan SaaS berbasis langganan ingin memantau skor kepuasan pelanggan (CSAT & Net Promoter Score - NPS), volume tiket bantuan masuk, serta mengidentifikasi klien yang berisiko churn (berhenti berlangganan).',
    datasetInfo: {
      name: 'Customer_Support_Tickets_NPS.xlsx',
      rows: 2900,
      columns: ['Ticket_ID', 'Customer_Name', 'Plan_Tier', 'Issue_Category', 'First_Response_Time_Min', 'Resolution_Time_Hours', 'CSAT_Rating', 'NPS_Score', 'Churn_Status']
    },
    objective: 'Membangun dashboard customer health yang menyajikan kecepatan layanan tim CS dan sentimen kepuasan pelanggan.',
    requiredKpis: [
      'Net Promoter Score (NPS) Global',
      'Rata-rata Rating CSAT (Skala 1-5)',
      'First Response Time (Menit)',
      'Customer Churn Rate %',
      'Total Tiket Terselesaikan'
    ],
    requiredCharts: [
      'NPS Gauge / Segment Meter: Promoters vs Passives vs Detractors',
      'Volume Tiket berdasarkan Kategori Masalah (Bar Chart)',
      'Tren Waktu Respons Layanan per Minggu (Line Chart)',
      'Churn Rate berdasarkan Paket Berlangganan (Donut Chart)'
    ],
    requiredFilters: [
      'Slicer Paket Pelanggan: [ Free ] [ Starter ] [ Professional ] [ Enterprise ]',
      'Slicer Kategori Kendala: [ Billing ] [ Teknis ] [ Onboarding ] [ Fitur ]'
    ],
    designRequirements: [
      'Palet warna ramah: Sky Blue (#0284C7) dengan highlight Oranye untuk tiket tertunda.',
      'Sertakan ringkasan verbatim testimoni pelanggan di panel samping.'
    ],
    challenges: [
      'Masalah teknis apa yang paling banyak menghasilkan penilaian Detractor pada survei NPS?',
      'Apakah paket Enterprise memiliki waktu penanganan tiket yang lebih cepat sesuai SLA?'
    ],
    expectedInsights: [
      'Kendala integrasi API merupakan penyebab utama nilai CSAT rendah dan memicu 40% churn.',
      'Pelanggan dengan First Response Time < 15 menit memberikan rating 4.8 bintang.'
    ],
    checklist: [
      'Rumus perhitungan Net Promoter Score: % Promoters - % Detractors',
      'Perhitungan rata-rata SLA waktu respons tervalidasi',
      'Slicer paket langganan terhubung dinamis'
    ],
    downloadFile: {
      filename: 'Project_11_Customer_Satisfaction_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Project 11 - Customer CSAT & Churn Starter File',
      size: '42 KB',
      description: 'Log 2.900 tiket bantuan, kalkulator NPS otomatis, dan template kesehatan pelanggan.'
    }
  },
  {
    id: 'proj-12',
    number: 12,
    title: 'Restaurant & F&B Operations Dashboard',
    category: 'Hospitality & F&B',
    difficulty: 'Intermediate',
    stars: 2,
    brief: 'Restoran keluarga dengan 3 cabang ingin menganalisis menu makanan mana yang paling diminati (Menu Engineering Matrix: Stars, Plowhorses, Puzzles, Dogs), efisiensi biaya bahan baku (Food Cost %), dan performa meja makan.',
    datasetInfo: {
      name: 'Restaurant_POS_Menu_Engineering.xlsx',
      rows: 3500,
      columns: ['Bill_ID', 'Cabang', 'Tanggal', 'Jam', 'Nama_Menu', 'Kategori_Menu', 'Qty_Terjual', 'Harga_Menu', 'Harga_Pokok_Bahan', 'Margin_Kontribusi', 'Tipe_Order']
    },
    objective: 'Merancang dashboard operasional restoran yang membantu manajer menentukan strategi harga menu dan evaluasi biaya makanan.',
    requiredKpis: [
      'Total Omzet Restoran (Gross Sales)',
      'Food Cost Percentage (HPP Bahan / Omzet %)',
      'Total Porsi Terjual',
      'Rata-rata Tagihan Meja (Average Ticket Size)'
    ],
    requiredCharts: [
      'Menu Engineering Matrix: Popularitas vs Margin Profit (Scatter Plot)',
      'Omzet per Jam Operasional Restoran (Column Chart)',
      'Performa Penjualan Antar Cabang (Grouped Bar Chart)',
      'Komposisi Dine-in vs Takeaway vs Ojek Online (Donut Chart)'
    ],
    requiredFilters: [
      'Slicer Cabang: [ Cabang Pusat ] [ Cabang Mall ] [ Cabang Pantai ]',
      'Slicer Kategori Menu: [ Makanan Utama ] [ Minuman ] [ Dessert ] [ Snack ]'
    ],
    designRequirements: [
      'Tema hangat dan profesional: Palet Oranye Bata (#C2410C) dan Abu-abu Hangat.',
      'Tampilkan matriks Stars (Laris & Untung Tinggi) dengan badge bintang emas.'
    ],
    challenges: [
      'Menu apa saja yang masuk ke kuadran "Stars" yang harus dipertahankan dan dipromosikan?',
      'Menu apa yang masuk kuadran "Dogs" (tidak laku dan margin rendah) yang perlu dihapus dari buku menu?'
    ],
    expectedInsights: [
      'Menu Nasi Goreng Spesial dan Es Teh Leci adalah Stars utama dengan kontribusi laba 32%.',
      'Food Cost cabang Mall membengkak menjadi 41% karena sisa bahan makanan yang kedaluwarsa.'
    ],
    checklist: [
      'Kalkulasi Food Cost % otomatis: (Total HPP Bahan / Total Penjualan) * 100%',
      'Matriks Scatter Plot Menu Engineering terpasang kuadran garis tengah',
      'Filter cabang otomatis merangkum pendapatan per meja'
    ],
    downloadFile: {
      filename: 'Project_12_Restaurant_Operations_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Project 12 - Restaurant F&B Operations Starter File',
      size: '45 KB',
      description: 'Data kasir resto 3.500 pesanan, template Menu Engineering Matrix, dan dashboard F&B.'
    }
  },
  {
    id: 'proj-13',
    number: 13,
    title: 'E-Commerce Marketplace Dashboard',
    category: 'E-Commerce & Digital Commerce',
    difficulty: 'Advanced',
    stars: 3,
    brief: 'Brand Direct-to-Consumer (D2C) yang berjualan di Shopee, Tokopedia, dan TikTok Shop memerlukan dashboard terintegrasi untuk melacak status pesanan, tingkat pengembalian barang (Return Rate), dan efisiensi logistik kurir.',
    datasetInfo: {
      name: 'Omnichannel_Ecommerce_Orders.xlsx',
      rows: 6200,
      columns: ['Order_SN', 'Channel', 'Order_Date', 'Buyer_Province', 'SKU', 'GMV_Rupiah', 'Shipping_Carrier', 'Shipping_Fee', 'Status_Pesanan', 'Return_Reason']
    },
    objective: 'Membangun dashboard omnichannel e-commerce untuk memantau Gross Merchandise Value (GMV), SLA pengiriman, dan pembatalan pesanan.',
    requiredKpis: [
      'Gross Merchandise Value (Total GMV)',
      'Net Completed GMV (Pesanan Berhasil)',
      'Tingkat Retur Barang (Order Return Rate %)',
      'Rata-rata Ongkir per Pesanan',
      'Total Pesanan Selesai'
    ],
    requiredCharts: [
      'GMV Contribution by Marketplace Channel (Donut / 100% Stacked Bar)',
      'Tren Harian Penjualan Kampanye Tanggal Kembar (Line Chart)',
      'Alasan Utama Pengembalian Barang / Retur (Horizontal Bar Chart)',
      'Peta Sebaran Pesanan per Provinsi di Indonesia'
    ],
    requiredFilters: [
      'Slicer Channel: [ Shopee ] [ Tokopedia ] [ TikTok Shop ] [ Website Resmi ]',
      'Slicer Status: [ Selesai ] [ Dibatalkan ] [ Dikembalikan ]'
    ],
    designRequirements: [
      'Desain dinamis berlatar putih bersih dengan warna aksen masing-masing marketplace.',
      'Sertakan counter peringatan untuk paket yang tertahan di gudang logistik >2 hari.'
    ],
    challenges: [
      'Channel marketplace mana yang memiliki persentase retur barang tertinggi?',
      'Berapa lonjakan GMV saat tanggal kembar (Payday & Double Day) dibandingkan hari biasa?'
    ],
    expectedInsights: [
      'TikTok Shop menyumbang lonjakan GMV terbesar saat Live Shopping, namun memiliki tingkat retur 8.4% (lebih tinggi dari rata-rata 3.2%).',
      'Kurir X mencatatkan SLA pengiriman tercepat ke wilayah Jawa Barat dengan rata-rata 1.4 hari.'
    ],
    checklist: [
      'Rumus perhitungan Net GMV (Hanya pesanan berstatus Selesai)',
      'Persentase retur terhitung otomatis per ekspedisi pengiriman',
      'Slicer channel mengontrol seluruh chart tren penjualan'
    ],
    downloadFile: {
      filename: 'Project_13_Ecommerce_Omnichannel_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Project 13 - E-Commerce Omnichannel Starter File',
      size: '50 KB',
      description: 'Data pesanan 6.200 baris dari 3 marketplace, kalkulasi retur, dan dashboard GMV.'
    }
  },
  {
    id: 'proj-14',
    number: 14,
    title: 'Executive C-Level Board Dashboard',
    category: 'Corporate Strategy & Executive',
    difficulty: 'Expert',
    stars: 4,
    brief: 'Chief Executive Officer (CEO) dan jajaran Direksi membutuhkan dashboard ringkas satu halaman (A4 Landscape / Full Screen) yang menyatukan performa Keuangan, Operasional, Kepuasan Pelanggan, dan Karyawan secara seimbang (Balanced Scorecard).',
    datasetInfo: {
      name: 'Enterprise_Strategic_Metrics_Summary.xlsx',
      rows: 1200,
      columns: ['Period', 'Pillar', 'Strategic_Objective', 'KPI_Name', 'Target_Value', 'Actual_Value', 'Achievement_Pct', 'Owner_Director', 'Status_Color']
    },
    objective: 'Merancang Executive Scorecard satu layar berstandar dewan komisaris yang merangkum 4 pilar bisnis: Financial, Customer, Internal Process, dan Learning & Growth.',
    requiredKpis: [
      'Net Revenue Growth % vs Target',
      'EBITDA Margin %',
      'Customer NPS Global',
      'Project Milestone Completion Rate %'
    ],
    requiredCharts: [
      '4-Pillar Balanced Scorecard Summary Cards with Sparklines',
      'Revenue vs EBITDA Trajectory (Combo Bar & Line)',
      'Strategic Initiatives Status Matrix (Traffic Light Status: Red/Amber/Green)',
      'Executive Commentary & Key Risk Factors Callout'
    ],
    requiredFilters: [
      'Dropdown Pemilihan Tahun & Kuartal Evaluasi',
      'Slicer Pilar Balanced Scorecard: [ Financial ] [ Customer ] [ Internal ] [ People ]'
    ],
    designRequirements: [
      'Desain ultra-minimalis, mewah, dan bebas gangguan. Palet Navy Monokrom (#0F172A) dan Slate.',
      'Sertakan panel ringkasan eksekutif 3 poin rekomendasi tindakan direksi.'
    ],
    challenges: [
      'Pilar manakah yang mencatatkan pencapaian target paling rendah di kuartal berjalan?',
      'Apakah pencapaian finansial diimbangi dengan stabilitas retensi karyawan dan kepuasan pelanggan?'
    ],
    expectedInsights: [
      'Perusahaan berhasil melampaui target finansial (104%), namun pilar Internal Process mengalami keterlambatan pada peluncuran infrastruktur IT.',
      'Tingkat kepuasan pelanggan tetap stabil di zona hijau (NPS +54).'
    ],
    checklist: [
      'Struktur Balanced Scorecard 4 kuadran tersusun simetris sempurna',
      'Indikator warna lampu lalu lintas (Traffic Light RAG) dinamis sesuai target %',
      'Layout pas dicetak atau diekspor ke format PDF satu halaman'
    ],
    downloadFile: {
      filename: 'Project_14_Executive_Board_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Project 14 - Executive C-Level Board Starter File',
      size: '46 KB',
      description: 'Template Balanced Scorecard direksi, formula traffic light RAG, dan kartu ringkasan CEO.'
    }
  },
  {
    id: 'proj-15',
    number: 15,
    title: 'Cross-Department Enterprise Performance Dashboard',
    category: 'Enterprise Intelligence',
    difficulty: 'Expert',
    stars: 4,
    brief: 'Perusahaan holding mengintegrasikan 4 anak perusahaan (Logistik, Ritel, Teknologi, Properti). Manajemen puncak ingin membandingkan kontribusi pendapatan, margin keuntungan, efisiensi anggaran, dan tingkat pertumbuhan antar anak usaha.',
    datasetInfo: {
      name: 'Holding_Enterprise_Consolidated_Data.xlsx',
      rows: 9500,
      columns: ['Entity_Code', 'Subsidiary_Name', 'Business_Unit', 'Month', 'Gross_Revenue', 'Cost_of_Goods', 'Operating_Cost', 'Net_Profit', 'Employee_Count', 'CapEx']
    },
    objective: 'Membangun enterprise master dashboard terkonsolidasi dengan navigasi antar anak perusahaan dan visualisasi kontribusi portofolio bisnis.',
    requiredKpis: [
      'Holding Consolidated Revenue',
      'Consolidated Net Profit & Group Margin %',
      'Revenue per Employee (Produktivitas SDM)',
      'Holding YoY Growth Rate %'
    ],
    requiredCharts: [
      'Anak Perusahaan Revenue & Margin Comparison (Grouped Bar Chart)',
      'Portofolio Contribution Tree / Marimekko Style Breakdown',
      'Konsolidasi Tren Keuangan Bulanan Seluruh Grup (Stacked Area Chart)',
      'Tabel Matriks Efisiensi Belanja Modal (CapEx vs ROI)'
    ],
    requiredFilters: [
      'Slicer Entitas Anak Usaha: [ PT Logistik Nusantara ] [ PT Ritel Makmur ] [ PT Tekno Solusi ] [ PT Graha Properti ]',
      'Timeline Tahun / Kuartal'
    ],
    designRequirements: [
      'Navigasi tab terintegrasi di bagian atas untuk berpindah antara tampilan Holding vs Anak Usaha.',
      'Tipografi tajam berstandar presentasi tahunan investor (Annual Report style).'
    ],
    challenges: [
      'Anak perusahaan mana yang memberikan kontribusi laba terbesar bagi holding?',
      'Unit bisnis mana yang memiliki rasio pendapatan per karyawan paling produktif?'
    ],
    expectedInsights: [
      'PT Tekno Solusi menyumbang margin profit tertinggi (38%) dengan jumlah staf paling ramping.',
      'PT Ritel Makmur menyumbang 60% total omzet namun membutuhkan optimasi biaya operasional pergudangan.'
    ],
    checklist: [
      'Konsolidasi data multi-entitas tervalidasi tanpa duplikasi antar sheet',
      'Navigasi tombol interaktif antar lembar kerja anak usaha berfungsi lancar',
      'Slicer holding tersinkronisasi ke seluruh tabel Pivot'
    ],
    downloadFile: {
      filename: 'Project_15_Enterprise_Holding_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Project 15 - Enterprise Holding Performance Starter File',
      size: '58 KB',
      description: 'Dataset konsolidasi 9.500 baris, template laporan holding, dan navigasi multi-sheet.'
    }
  }
];

export function getDashboardProjectById(id: string): DashboardProject | undefined {
  return DASHBOARD_PROJECTS.find((p) => p.id === id);
}

import { DashboardLesson } from '@/types';

export const DASHBOARD_LESSONS: DashboardLesson[] = [
  {
    id: 'dash-lvl-1',
    levelNumber: 1,
    title: 'Dashboard Fundamentals',
    slug: 'dashboard-fundamentals',
    subtitle: 'Memahami Esensi, Fungsi, dan Perbedaan Dashboard vs Report',
    estimatedTime: '20 Menit',
    summary: 'Fondasi awal memahami apa itu dashboard bisnis, perbedaan mendasarnya dengan laporan biasa, serta rantai nilai Data ke Keputusan bisnis.',
    whatIsIt: 'Dashboard adalah antarmuka visual satu layar (single-screen) yang merangkum metrik performa utama (KPI), status operasional, dan tren bisnis secara sekilas agar pengambil keputusan dapat memahami kondisi organisasi dalam hitungan detik.',
    objectives: [
      'Memahami definisi dan tujuan utama pembuatan dashboard di tempat kerja.',
      'Membedakan spreadsheet biasa, laporan tabular (report), dan executive dashboard.',
      'Menguasai rantai transformasi Data → Information → Insight → Decision.',
      'Mengidentifikasi 4 tipe dashboard utama: Operational, Tactical, Strategic, dan Analytical.'
    ],
    whenToUse: 'Dibutuhkan ketika atasan atau tim manajemen membutuhkan gambaran umum performa bisnis tanpa harus membaca ribuan baris data mentah atau spreadsheet yang rumit.',
    steps: [
      'Identifikasi audiens utama: Siapa yang akan membaca dashboard ini (Staf operasional, Manajer divisi, atau Direktur/C-Level)?',
      'Tentukan pertanyaan bisnis utama yang harus dijawab oleh dashboard tersebut.',
      'Pilih jenis dashboard yang sesuai dengan frekuensi pembaruan data dan kedalaman detail.',
      'Susun kerangka Data → Information → Insight → Action sebelum membuka Microsoft Excel.'
    ],
    concepts: [
      {
        title: 'Report vs Spreadsheet vs Dashboard',
        explanation: 'Spreadsheet biasa berisi ribuan baris data mentah tanpa struktur visual. Report (Laporan) menyajikan data dalam jumlah banyak untuk dokumentasi audit. Sedangkan Dashboard hanya menampilkan intisari metrik penting dalam format visual ringkas yang langsung dapat dipahami.',
        example: 'Report: Tabel 10.000 transaksi penjualan Q3. Dashboard: 4 kartu KPI (Total Omzet, Profit Margin, MoM Growth, Target Achievement) + 2 grafik tren dan ranking produk.'
      },
      {
        title: 'Konsep Rantai Nilai Data',
        explanation: 'Dashboard yang baik tidak berhenti pada data visual yang cantik, tetapi memandu tindakan nyata: Data (10.000 baris) → Information (Penjualan September Rp250 Juta) → Insight (Produk Laptop naik 18%, Aksesoris turun 12%) → Decision (Tingkatkan stok laptop dan evaluasi diskon aksesoris).',
      },
      {
        title: '4 Kategori Utama Dashboard',
        explanation: '1. Operational: Monitoring harian/real-time (misal: antrean tiket CS, absensi shift). 2. Tactical: Monitoring mingguan/bulanan performa departemen. 3. Strategic: Evaluasi kuartalan/tahunan eksekutif (Revenue, EBITDA, Market Share). 4. Analytical: Eksplorasi korelasi data mendalam dengan filter kompleks.'
      }
    ],
    beforeAfterComparison: {
      badTitle: 'Laporan Spreadsheet Biasa (Boring & Rumit)',
      badPoints: [
        'Berisi 50 kolom dan 8.000 baris angka mentah.',
        'Pembaca harus scroll ke bawah dan samping mencari total.',
        'Warna cell acak-acakan (kuning, merah terang, biru mencolok).',
        'Tidak ada kesimpulan visual langsung.'
      ],
      goodTitle: 'Dashboard Eksekutif (Clean & Berwawasan)',
      goodPoints: [
        'Semua informasi inti termuat dalam satu layar monitor tanpa scroll.',
        '4 Kartu KPI teratas menunjukkan pencapaian target dan pertumbuhan.',
        'Grafik tren waktu sederhana memudahkan melihat arah bisnis.',
        'Warna netral dan aksen fungsional memfokuskan mata ke poin krusial.'
      ]
    },
    bestPractices: [
      'Terapkan "Rule of 5 Seconds": Audiens harus mengerti status utama bisnis dalam 5 detik pertama.',
      'Jangan memuat semua data ke dashboard, prioritaskan 4-6 metrik paling kritikal.',
      'Pastikan definisi metrik disepakati bersama oleh tim sebelum kalkulasi dibuat.'
    ],
    commonMistakes: [
      {
        mistake: 'Menganggap dashboard hanyalah sekumpulan chart warna-warni yang ditumpuk di satu sheet.',
        solution: 'Fokuskan pada cerita data (data storytelling) dan metrik yang menjawab pertanyaan bisnis strategis.'
      },
      {
        mistake: 'Membuat dashboard yang membutuhkan scroll horizontal dan vertikal sangat panjang.',
        solution: 'Batasi layout dashboard agar pas dalam 1 layar standar 1920x1080 atau 1366x768 piksel.'
      }
    ],
    quiz: {
      question: 'Manakah transformasi yang benar dalam prinsip pembuatan dashboard profesional?',
      options: [
        'Data → Chart → Design → Print',
        'Data → Information → Insight → Decision',
        'Raw Data → PivotTable → Slicer → Excel File',
        'Information → Data → Target → Rekap'
      ],
      correctIndex: 1,
      explanation: 'Dashboard profesional bertujuan mengubah sekumpulan Data mentah menjadi Informasi ringkas, menemukan Insight mendalam, dan menghasilkan Keputusan (Decision) bisnis yang nyata.'
    },
    downloadFile: {
      filename: '01_Dashboard_Fundamentals_Overview.xlsx',
      fileType: 'xlsx',
      title: 'Panduan & Contoh Konsep Dashboard vs Report',
      size: '28 KB',
      description: 'Workbook perbandingan langsung antara Raw Spreadsheet, Detailed Report, dan Executive Dashboard.'
    }
  },
  {
    id: 'dash-lvl-2',
    levelNumber: 2,
    title: 'Data Preparation & Structuring',
    slug: 'data-preparation',
    subtitle: 'Membangun Struktur Flat Table yang Ideal untuk Analisis',
    estimatedTime: '25 Menit',
    summary: 'Pelajari anatomi dataset yang sehat, aturan baku tabular, dan cara menghindari malapetaka merged cells yang merusak analisis data.',
    whatIsIt: 'Data Preparation adalah proses menata data mentah ke dalam format tabular datar (Flat Table) di mana setiap kolom mewakili satu variabel unik (Field) dan setiap baris mewakili satu kejadian transaksi tunggal (Record).',
    objectives: [
      'Memahami anatomi Flat Table: Header, Row, Column, Record, Field, dan Unique ID.',
      'Mengetahui alasan mutlak mengapa data dashboard TIDAK BOLEH mengandung merged cells.',
      'Membedakan Good Data (Data Siap Olah) vs Bad Data (Data Laporan Manual).',
      'Menerapkan format resmi Excel Table (Ctrl + T) untuk data dinamis otomatis.'
    ],
    whenToUse: 'Wajib dilakukan sebelum membuat rumus, PivotTable, atau chart apa pun. Tanpa data yang terstruktur benar, PivotTable akan menghasilkan error dan rumus tidak dapat diperbarui secara dinamis.',
    steps: [
      'Pastikan baris pertama (Row 1) hanya berisi nama Header kolom yang unik dan jelas.',
      'Hapus semua baris kosong (empty rows) dan kolom kosong pemisah.',
      'Pastikan setiap record memiliki Unique ID (misal: ID_Transaksi atau No_Invoice).',
      'Hilangkan semua sel gabungan (Merged Cells) pada area dataset.',
      'Ubah rentang data menjadi tabel terstruktur resmi dengan shortcut Ctrl + T.'
    ],
    concepts: [
      {
        title: 'Anatomi Struktur Data Ideal (Flat Table)',
        explanation: 'Setiap kolom hanya menyimpan 1 tipe data yang sama (misal: Tanggal semua, Angka semua, atau Teks semua). Baris tidak boleh mengandung subtotal di tengah-tengah transaksi.',
        example: '| Trans_ID | Tanggal | Cabang | Kategori | Produk | Qty | Harga | Total |'
      },
      {
        title: 'Bahaya Merged Cells',
        explanation: 'Ketika sel di-merge (misal cell A2:A5 digabung), Excel hanya menyimpan nilai pada sel kiri atas (A2), sedangkan cell A3, A4, dan A5 dianggap KOSONG (blank). Hal ini merusak filter, pengurutan (sort), dan kalkulasi PivotTable.',
      }
    ],
    tablePreview: {
      headers: ['Trans_ID', 'Tanggal', 'Kategori', 'Region', 'Sales (Rp)', 'Qty', 'Profit (Rp)'],
      rows: [
        ['TRX-1001', '2026-01-15', 'Elektronik', 'DKI Jakarta', 12500000, 1, 2500000],
        ['TRX-1002', '2026-01-15', 'Aksesoris', 'Surabaya', 450000, 3, 120000],
        ['TRX-1003', '2026-01-16', 'Gadget', 'Bandung', 8200000, 2, 1640000],
        ['TRX-1004', '2026-01-17', 'Elektronik', 'Medan', 5600000, 1, 980000],
        ['TRX-1005', '2026-01-18', 'Office Supply', 'DKI Jakarta', 1200000, 10, 300000]
      ]
    },
    beforeAfterComparison: {
      badTitle: 'Bad Data (Struktur Rusak)',
      badPoints: [
        'Banyak merged cells pada kolom Kategori dan Tanggal.',
        'Ada baris subtotal "Total Januari" di baris ke-20 di tengah data.',
        'Ada sel kosong yang sengaja dibiarkan untuk estetika tampilan cetak.',
        'Angka tersimpan sebagai teks dengan tanda petik (\'12500000).'
      ],
      goodTitle: 'Good Data (Tabular Siap Olah)',
      goodPoints: [
        'Tepat 1 baris header tunggal di bagian paling atas.',
        'Setiap baris adalah 1 kejadian transaksi utuh tanpa sel kosong.',
        'Tidak ada subtotal di dalam tabel data mentah.',
        'Tipe data angka diformat resmi sebagai Number / Currency.'
      ]
    },
    bestPractices: [
      'Gunakan Excel Table (Ctrl + T) agar formula dan range PivotTable otomatis meluas saat baris baru ditambahkan.',
      'Beri nama tabel yang jelas di tab Table Design (misal: "tbl_Sales" atau "tbl_Transaksi").',
      'Pisahkan sheet data mentah dengan sheet visualisasi dashboard sejak awal.'
    ],
    commonMistakes: [
      {
        mistake: 'Memasukkan baris Grand Total di bagian bawah tabel data mentah yang dijadikan sumber PivotTable.',
        solution: 'Hapus Grand Total manual pada raw data; biarkan PivotTable yang menghitung grand total secara otomatis.'
      }
    ],
    quiz: {
      question: 'Mengapa penggunaan Merged Cells sangat dilarang pada dataset sumber dashboard?',
      options: [
        'Karena ukuran file Excel akan membengkak hingga 10 kali lipat.',
        'Karena Excel hanya menyimpan nilai pada sel kiri-atas, sehingga sel lain terbaca kosong dan merusak PivotTable serta filter.',
        'Karena warna background pada merged cells tidak bisa diganti.',
        'Karena merged cells otomatis menghapus baris di bawahnya.'
      ],
      correctIndex: 1,
      explanation: 'Merged cells membuat sel-sel bawah dan sampingnya bernilai BLANK, sehingga operasi sorting, grouping tanggal, dan formula lookup akan menghasilkan data yang keliru.'
    },
    downloadFile: {
      filename: '02_Data_Preparation_Template.xlsx',
      fileType: 'xlsx',
      title: 'Latihan Memperbaiki Bad Data Menjadi Flat Table',
      size: '32 KB',
      description: 'Latihan langsung unmerge data, membersihkan subtotal tengah, dan mengubah rentang menjadi Excel Table resmi.'
    }
  },
  {
    id: 'dash-lvl-3',
    levelNumber: 3,
    title: 'Data Cleaning Techniques',
    slug: 'data-cleaning',
    subtitle: '12 Jurus Membersihkan Data Mentah dari Duplikat dan Spasi Liar',
    estimatedTime: '30 Menit',
    summary: 'Pelajari alur kerja data cleaning profesional menggunakan fungsi TRIM, CLEAN, PROPER, Text to Columns, Find & Replace, dan Data Validation.',
    whatIsIt: 'Data Cleaning adalah proses mendeteksi, memperbaiki, atau menghapus data yang korup, tidak akurat, tidak konsisten, atau duplikat dari dataset agar hasil perhitungan dashboard 100% valid dan dapat diandalkan.',
    objectives: [
      'Menguasai alur kerja: Raw Data → Inspect → Clean → Validate → Transform → Analyze → Visualize.',
      'Menghilangkan spasi ganda dan karakter tak terlihat dengan TRIM dan CLEAN.',
      'Menyeragamkan kapitalisasi teks inkonsisten menggunakan PROPER, UPPER, atau LOWER.',
      'Memisahkan teks gabungan dengan fitur Text to Columns.',
      'Memperbaiki tanggal dan angka yang keliru terbaca sebagai format teks.'
    ],
    whenToUse: 'Dijalankan setiap kali Anda mengunduh data mentah dari sistem ERP, POS kasir, database internal, atau file CSV ekspor yang sering mengandung spasi liar atau format tanggal acak.',
    steps: [
      'Inspect: Lakukan audit data, cek baris kosong, duplikasi ID, dan keanehan penulisan.',
      'Hapus data duplikat menggunakan menu Data → Remove Duplicates.',
      'Gunakan helper column dengan formula =TRIM(CLEAN(A2)) untuk membuang spasi tak terlihat.',
      'Gunakan Text to Columns dengan separator (koma, titik koma, tab) untuk memecah kolom gabungan.',
      'Validasi format angka menggunakan formula =ISNUMBER() dan format tanggal dengan =ISDATE() / =DATEVALUE().'
    ],
    concepts: [
      {
        title: 'Formula TRIM, CLEAN, dan PROPER',
        explanation: 'TRIM menghapus spasi berlebih di awal, akhir, dan spasi ganda di tengah teks. CLEAN menghapus karakter non-printable (ASCII 0-31) dari hasil copy paste web/sistem. PROPER mengubah huruf awal setiap kata menjadi kapital.',
        example: '=PROPER(TRIM(CLEAN(B2))) akan mengubah "  jAkArTa  sElAtAn " menjadi "Jakarta Selatan".'
      },
      {
        title: 'Masalah Inkonsistensi Kategori',
        explanation: 'Di Excel, "Jakarta", "jakarta", "JAKARTA", dan "Jakarta " (dengan spasi di akhir) dianggap sebagai entitas berbeda jika tidak dibersihkan, sehingga laporan PivotTable akan menampilkan kategori yang berulang.',
      }
    ],
    keyFormulas: [
      { formula: '=TRIM(A2)', purpose: 'Membuang spasi liar di awal dan akhir teks', syntax: 'TRIM(text)' },
      { formula: '=CLEAN(A2)', purpose: 'Menghapus karakter sistem yang tidak bisa dicetak', syntax: 'CLEAN(text)' },
      { formula: '=PROPER(A2)', purpose: 'Mengubah huruf awal menjadi kapital seragam', syntax: 'PROPER(text)' },
      { formula: '=VALUE(A2)', purpose: 'Mengubah teks berformat angka menjadi nilai numerik asli', syntax: 'VALUE(text)' }
    ],
    beforeAfterComparison: {
      badTitle: 'Data Kotor (Sebelum Cleaning)',
      badPoints: [
        'Kategori: "Bandung", " bandung ", "BANDUNG" terpecah menjadi 3 entitas.',
        'Nomor HP dan ID memiliki tanda petik dan spasi acak.',
        'Ada 14 transaksi duplikat dengan nomor invoice yang sama persis.',
        'Kolom Nama Depan dan Belakang tergabung dalam 1 baris tanpa pemisah rapi.'
      ],
      goodTitle: 'Data Bersih (Sesudah Cleaning)',
      goodPoints: [
        'Kategori seragam menjadi "Bandung" terstandarisasi.',
        'Duplikat berhasil dihilangkan secara otomatis.',
        'Spasi liar tereliminasi 100% menggunakan fungsi TRIM.',
        'Tipe data angka dan tanggal terverifikasi valid.'
      ]
    },
    bestPractices: [
      'Jangan pernah membersihkan data langsung di sheet master mentah; selalu buat salinan sheet 02_CLEAN_DATA.',
      'Gunakan Find & Replace (Ctrl + H) untuk membersihkan tanda titik atau koma pemisah ribuan yang keliru.',
      'Terapkan Data Validation pada kolom input manual untuk mencegah kesalahan input di masa depan.'
    ],
    commonMistakes: [
      {
        mistake: 'Mengira fungsi TRIM di Excel bisa menghapus spasi non-breaking space (char 160) hasil ekspor web.',
        solution: 'Gunakan kombinasi =TRIM(SUBSTITUTE(A2, CHAR(160), " ")) untuk mengatasi spasi web yang membandel.'
      }
    ],
    quiz: {
      question: 'Formula manakah yang paling ampuh membersihkan teks dari spasi berlebih sekaligus menyeragamkan huruf awal setiap kata?',
      options: [
        '=UPPER(LOWER(A2))',
        '=PROPER(TRIM(A2))',
        '=CLEAN(LEN(A2))',
        '=FIND(REPLACE(A2))'
      ],
      correctIndex: 1,
      explanation: 'Kombinasi =PROPER(TRIM(A2)) akan membuang spasi di awal/akhir serta spasi ganda, kemudian mengubah huruf pertama setiap kata menjadi huruf kapital yang rapi.'
    },
    downloadFile: {
      filename: '03_Data_Cleaning_Lab.xlsx',
      fileType: 'xlsx',
      title: 'Workbook Latihan 12 Teknik Data Cleaning',
      size: '35 KB',
      description: 'Latihan data kotor lengkap dengan formula pembersih teks, tanggal teks ke date asli, dan pemecah kolom.'
    }
  },
  {
    id: 'dash-lvl-4',
    levelNumber: 4,
    title: 'Excel Formula for Dashboard',
    slug: 'formulas-for-dashboard',
    subtitle: 'Kompilasi Rumus Agregasi, Logika, Lookup, dan Dynamic Array',
    estimatedTime: '35 Menit',
    summary: 'Kuasai formula esensial yang menggerakkan kartu KPI dan visualisasi dinamis: SUMIFS, COUNTIFS, XLOOKUP, FILTER, UNIQUE, serta formula tanggal.',
    whatIsIt: 'Formula for Dashboard adalah kumpulan rumus kalkulasi matematis, kondisional, dan pencarian yang bekerja di balik layar (calculation layer) untuk menghasilkan angka metrik ringkas yang ditampilkan pada kartu KPI dashboard.',
    objectives: [
      'Menghitung metrik dasar (SUM, AVERAGE, MIN, MAX, COUNT, COUNTA).',
      'Menghitung metrik dengan banyak kriteria menggunakan SUMIFS dan COUNTIFS.',
      'Mengambil data parameter secara fleksibel menggunakan XLOOKUP dan INDEX/MATCH.',
      'Memanfaatkan rumus Dynamic Array modern (FILTER, UNIQUE, SORT).',
      'Menghitung analisis tanggal bisnis: EOMONTH, DATEDIF, dan MoM Growth.'
    ],
    whenToUse: 'Digunakan pada sheet perhitungan (Calculation Sheet) untuk menghitung angka-angka spesifik yang akan dihubungkan ke kartu KPI dan grafik dinamis.',
    steps: [
      'Buat blok parameter kriteria (misal sel terpilih: Region di B2, Bulan di B3).',
      'Gunakan SUMIFS untuk menghitung total penjualan berdasarkan parameter sel tersebut.',
      'Hitung metrik periode sebelumnya (Previous Month) untuk mencari Growth persentase.',
      'Bungkus formula dengan IFERROR untuk mencegah munculnya kode #DIV/0! atau #N/A pada dashboard.'
    ],
    concepts: [
      {
        title: 'Formula SUMIFS Multi-Kriteria',
        explanation: 'Sintaks: =SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, ...). Sangat cocok untuk menghitung total nilai berdasarkan filter yang dipilih pengguna.',
        example: '=SUMIFS(tbl_Sales[Total], tbl_Sales[Region], "Jakarta", tbl_Sales[Kategori], "Elektronik")'
      },
      {
        title: 'Kalkulasi MoM (Month-over-Month) Growth',
        explanation: 'Rumus persentase pertumbuhan: (Current - Previous) / Previous. Di Excel dibuat dengan perlindungan IFERROR.',
        example: '=IFERROR((Total_Bulan_Ini - Total_Bulan_Lalu) / Total_Bulan_Lalu, 0)'
      },
      {
        title: 'Dynamic Array (FILTER & UNIQUE)',
        explanation: 'Fungsi modern Office 365 yang secara otomatis mengekstrak daftar unik tanpa perlu macro atau pivot table rumit.',
        example: '=SORT(UNIQUE(tbl_Sales[Region]))'
      }
    ],
    keyFormulas: [
      { formula: '=SUMIFS(C2:C100, A2:A100, "Surabaya")', purpose: 'Menjumlahkan data dengan 1 atau lebih kriteria', syntax: 'SUMIFS(sum_range, crit_range1, crit1, ...)' },
      { formula: '=COUNTIFS(A2:A100, "Elektronik", B2:B100, ">1000000")', purpose: 'Menghitung banyaknya transaksi bersyarat', syntax: 'COUNTIFS(crit_range1, crit1, ...)' },
      { formula: '=XLOOKUP(D2, A2:A100, B2:B100, "Tidak Ditemukan")', purpose: 'Mencari nilai target dengan aman tanpa batas arah', syntax: 'XLOOKUP(lookup_val, lookup_arr, return_arr)' },
      { formula: '=FILTER(tbl_Sales, tbl_Sales[Region]="Bandung")', purpose: 'Menyaring baris data secara dinamis ke sheet dashboard', syntax: 'FILTER(array, include, [if_empty])' }
    ],
    bestPractices: [
      'Gunakan Structured Reference bawaan Excel Table (misal tbl_Sales[Omzet]) daripada range absolut seperti $F$2:$F$1000.',
      'Selalu lindungi formula pembagian dengan IFERROR atau fungsi IF(Previous=0, 0, ...) untuk menghindari #DIV/0!.',
      'Gunakan formula EOMONTH(Date, -1) untuk mencari tanggal akhir bulan lalu secara otomatis.'
    ],
    commonMistakes: [
      {
        mistake: 'Salah urutan argumen antara SUMIF dan SUMIFS.',
        solution: 'Ingat bahwa pada SUMIFS, argumen sum_range ditaruh paling depan, sedangkan pada SUMIF lama sum_range ditaruh paling akhir.'
      }
    ],
    quiz: {
      question: 'Bagaimana rumus Excel yang tepat untuk menghitung persentase pertumbuhan (Growth) antara sel B5 (Bulan Ini) dan B4 (Bulan Lalu) dengan aman?',
      options: [
        '=B5 - B4',
        '=IFERROR((B5 - B4) / B4, 0)',
        '=SUM(B5 : B4) * 100%',
        '=(B4 / B5) - 100%'
      ],
      correctIndex: 1,
      explanation: 'Rumus growth adalah (Current - Previous) / Previous, dan wajib dibungkus =IFERROR(..., 0) agar tidak error saat nilai bulan lalu kosong atau bernilai nol.'
    },
    downloadFile: {
      filename: '04_Dashboard_Formula_Mastery.xlsx',
      fileType: 'xlsx',
      title: 'Koleksi 10 Latihan Formula Dashboard Excel',
      size: '38 KB',
      description: 'Latihan lengkap kalkulasi 10 formula challenge: Revenue, Profit, Transaksi, AOV, MoM Growth, hingga Kontribusi %.'
    }
  },
  {
    id: 'dash-lvl-5',
    levelNumber: 5,
    title: 'KPI & Metrics Architecture',
    slug: 'kpi-and-metrics',
    subtitle: 'Merancang Kartu Metrik Kunci untuk Berbagai Departemen Bisnis',
    estimatedTime: '25 Menit',
    summary: 'Pahami perbedaan mendasar Metric vs KPI, cara menyusun anatomi KPI card modern, dan katalog metrik standar untuk Sales, HR, Finance, dan Inventory.',
    whatIsIt: 'KPI (Key Performance Indicator) adalah indikator terukur yang paling kritikal untuk mengevaluasi keberhasilan organisasi dalam mencapai target strategis yang telah ditetapkan.',
    objectives: [
      'Membedakan konsep Metric, KPI, Target, Actual, dan Variance.',
      'Merancang anatomi KPI Card profesional (Label, Angka Utama, Indikator Delta %, dan Periode).',
      'Menguasai metrik standar departemen Sales (Revenue, AOV, Conversion, Margin).',
      'Menguasai metrik HR (Headcount, Turnover, Absenteeism, Cost per Hire).',
      'Menguasai metrik Keuangan (Gross Profit, Opex, Net Margin, Cash Runway).'
    ],
    whenToUse: 'Diterapkan pada baris paling atas (Header KPI Row) di setiap dashboard bisnis untuk memberikan gambaran performa instan bagi pengambil keputusan.',
    steps: [
      'Pilih maksimal 3 sampai 5 KPI utama yang paling relevan dengan tujuan bisnis.',
      'Hitung nilai aktual (Actual) dan bandingkan dengan target atau periode sebelumnya (Target/Prior).',
      'Buat kartu persegi panjang berlatar belakang putih bersih dengan border halus (#E5E7EB).',
      'Tampilkan angka utama dengan ukuran font tegas (24-28pt bold).',
      'Tambahkan badge hijau untuk kenaikan positif (↑ +12.4%) atau badge merah untuk penurunan negatif (↓ -4.2%).'
    ],
    concepts: [
      {
        title: 'Metric vs KPI vs Target vs Variance',
        explanation: 'Metric adalah segala sesuatu yang bisa dihitung (misal: jumlah pengunjung web). KPI adalah metrik paling kritikal yang berdampak langsung ke profit/kelangsungan (misal: rasio konversi checkout). Target adalah sasaran (misal: 3.5%). Variance adalah selisih Actual vs Target.',
      },
      {
        title: 'Anatomi Visual KPI Card',
        explanation: '1. Label Kategori (Font kecil abu-abu: TOTAL REVENUE). 2. Nilai Utama (Font besar tebal: Rp 245.8 Juta). 3. Indikator Perubahan (Ikon panah & persentase: ↑ 18.4% vs bulan lalu). 4. Micro-sparkline atau progress bar tipis di bagian bawah.',
      }
    ],
    beforeAfterComparison: {
      badTitle: 'Kartu KPI Buruk',
      badPoints: [
        'Hanya menuliskan angka tanpa keterangan periode pembanding.',
        'Menggunakan warna latar belakang neon menyilaukan (merah membara atau hijau silau).',
        'Tidak ada informasi apakah angka tersebut melampaui target atau gagal mencapai target.'
      ],
      goodTitle: 'Kartu KPI Editorial Modern',
      goodPoints: [
        'Latar belakang putih bersih dengan border netral #E5E7EB.',
        'Tipografi jelas: Title 12px uppercase, Value 24px bold, Subtext 11px gray.',
        'Badge delta persen halus (+18.4% vs bulan lalu) berwarna hijau zamrud lembut.'
      ]
    },
    bestPractices: [
      'Jangan menaruh lebih dari 5 kartu KPI di baris teratas agar audiens tidak mengalami cognitive overload.',
      'Gunakan format mata uang yang disingkat (Rp 2.4 Miliar atau Rp 240 Juta) agar angka mudah dibaca tanpa deretan angka nol yang panjang.',
      'Pastikan warna hijau selalu melambangkan hal baik dan merah melambangkan hal yang memerlukan perhatian.'
    ],
    commonMistakes: [
      {
        mistake: 'Menganggap semua kenaikan harus berwarna hijau.',
        solution: 'Untuk metrik Biaya (Cost), Komplain Pelanggan, atau Turnover Pegawai, kenaikan justru bernilai buruk sehingga harus diberi indikator merah!'
      }
    ],
    quiz: {
      question: 'Jika metrik Biaya Operasional (Opex) perusahaan meningkat 25% melampaui anggaran, warna indikator apa yang paling tepat digunakan?',
      options: [
        'Hijau, karena nilainya naik lebih tinggi.',
        'Merah / Oranye, karena kenaikan biaya berdampak negatif terhadap profitabilitas perusahaan.',
        'Biru muda, agar terkesan netral.',
        'Hitam pekat tanpa indikator.'
      ],
      correctIndex: 1,
      explanation: 'Pewarnaan indikator KPI harus berdasarkan dampak bisnis, bukan arah nilai numerik semata. Kenaikan biaya adalah performa buruk, sehingga harus ditandai merah.'
    },
    downloadFile: {
      filename: '05_KPI_Card_Components.xlsx',
      fileType: 'xlsx',
      title: 'Template & Komponen KPI Card Excel Siap Pakai',
      size: '30 KB',
      description: 'Template kartu KPI modern dengan format angka dinamis, ikon panah delta, dan conditional formatting.'
    }
  },
  {
    id: 'dash-lvl-6',
    levelNumber: 6,
    title: 'PivotTable for Dashboard',
    slug: 'pivottable-for-dashboard',
    subtitle: 'Mesin Agregasi Terkuat dari Pengelompokan Data Hingga Slicer',
    estimatedTime: '30 Menit',
    summary: 'Manfaatkan PivotTable sebagai mesin kalkulasi dashboard: grouping tanggal kuartal/bulan, calculated field, % of total, dan menghubungkan multiple PivotTable ke satu slicer.',
    whatIsIt: 'PivotTable adalah fitur analisis data interaktif di Excel yang memungkinkan pengguna meringkas, mengelompokkan, dan memfilter ribuan baris data dalam hitungan detik tanpa harus menulis rumus manual yang rumit.',
    objectives: [
      'Membuat PivotTable yang terhubung dengan Excel Table resmi.',
      'Mengelompokkan data tanggal menjadi Bulan, Kuartal, dan Tahun secara instan.',
      'Menampilkan data dalam format persentase (% of Column Total, % of Grand Total).',
      'Membuat Calculated Field (misal: menghitung Profit Margin di dalam PivotTable).',
      'Mengaktifkan fitur Report Filter Connections agar 1 Slicer mengontrol banyak PivotTable sekaligus.'
    ],
    whenToUse: 'Merupakan motor penggerak utama grafik dan tabel ringkasan pada 90% dashboard profesional di Microsoft Excel.',
    steps: [
      'Klik salah satu sel di dalam tabel sumber, lalu pilih Insert → PivotTable.',
      'Tempatkan PivotTable di sheet terpisah bernama "04_PIVOT".',
      'Tarik field kategori ke baris (Rows) dan field angka ke nilai (Values).',
      'Klik kanan pada tanggal lalu pilih Group untuk membuat agregasi bulanan atau kuartalan.',
      'Buat PivotChart dari PivotTable tersebut, lalu pindahkan visual grafiknya ke sheet "05_DASHBOARD".'
    ],
    concepts: [
      {
        title: 'Report Filter Connections',
        explanation: 'Kunci interaktivitas dashboard: satu Slicer (misal Slicer Wilayah) dapat dihubungkan ke 5 PivotTable berbeda secara bersamaan melalui menu Slicer → Report Connections.',
      },
      {
        title: 'Calculated Field vs Helper Column',
        explanation: 'Calculated Field memungkinkan Anda menghitung formula baru di dalam PivotTable tanpa menambah kolom baru di data mentah, misalnya formula =Sales - Cost untuk menghasilkan Profit.',
      }
    ],
    bestPractices: [
      'Selalu beri nama setiap PivotTable (misal: "pt_SalesByRegion", "pt_MonthlyTrend") agar mudah dikenali di jendela Report Connections.',
      'Matikan opsi "Autofit column widths on update" di opsi PivotTable agar lebar kolom tidak berubah berantakan saat Slicer diklik.',
      'Selalu simpan semua PivotTable di sheet kalkulasi khusus tersembunyi agar sheet dashboard tetap rapi.'
    ],
    commonMistakes: [
      {
        mistake: 'Membuat chart langsung di atas sheet PivotTable sehingga tampilan dashboard bercampur dengan daftar filter pivot.',
        solution: 'Gunakan sheet terpisah: letakkan PivotTable di sheet "04_PIVOT" dan salin grafik PivotChart ke sheet utama "05_DASHBOARD".'
      }
    ],
    quiz: {
      question: 'Bagaimana cara agar satu tombol Slicer dapat memfilter 3 PivotChart sekaligus di dashboard?',
      options: [
        'Menggabungkan ketiga file Excel menjadi satu file CSV.',
        'Klik kanan Slicer → Report Connections → Centang ketiga PivotTable yang bersangkutan.',
        'Membuat rumus VLOOKUP di dalam Slicer.',
        'Menyalin Slicer sebanyak 3 kali di setiap chart.'
      ],
      correctIndex: 1,
      explanation: 'Fitur Report Connections pada Slicer memungkinkan satu filter mengendalikan banyak PivotTable dan PivotChart sekaligus secara tersinkronisasi.'
    },
    downloadFile: {
      filename: '06_PivotTable_Dashboard_Engine.xlsx',
      fileType: 'xlsx',
      title: 'Workbook Latihan PivotTable Dashboard',
      size: '36 KB',
      description: 'Latihan grouping tanggal, Calculated Field margin profit, dan konfigurasi Slicer multi-koneksi.'
    }
  },
  {
    id: 'dash-lvl-7',
    levelNumber: 7,
    title: 'Data Visualization & Chart Selection',
    slug: 'data-visualization',
    subtitle: 'Prinsip Memilih dan Mendesain Grafik yang Informatif',
    estimatedTime: '25 Menit',
    summary: 'Pelajari aturan emas "Not every data needs a chart", panduan memilih antara Bar, Column, Line, Area, Doughnut, dan perbandingan Bad Chart vs Good Chart.',
    whatIsIt: 'Data Visualization adalah representasi grafis dari informasi dan data angka. Tujuannya adalah mengomunikasikan wawasan penting secara jelas dan efisien menggunakan grafik, diagram, dan plot yang tepat sasaran.',
    objectives: [
      'Memahami kapan harus menggunakan Column Chart vs Bar Chart vs Line Chart.',
      'Menghindari penyalahgunaan Pie Chart 3D yang menyesatkan persepsi visual.',
      'Mengatur komponen grafik: Judul informatif, sumbu (axis), label nilai, dan gridline halus.',
      'Menghilangkan visual noise (chart clutter) agar pesan data terlihat tajam.'
    ],
    whenToUse: 'Diterapkan saat memvisualisasikan tren waktu, peringkat kategori produk, komposisi persentase, atau perbandingan antar wilayah.',
    steps: [
      'Identifikasi pesan yang ingin disampaikan: Apakah Tren Waktu, Ranking Kategori, Komposisi Bagian, atau Korelasi?',
      'Jika tren waktu: Pilih Line Chart atau Column Chart.',
      'Jika perbandingan peringkat banyak kategori: Pilih Horizontal Bar Chart terurut dari terbesar ke terkecil.',
      'Hapus elemen yang tidak perlu: Hapus garis grid tebal, hapus legend jika hanya ada 1 seri data, dan atur warna netral.'
    ],
    concepts: [
      {
        title: 'Decision Tree Pemilihan Chart',
        explanation: '1. Tren Waktu (Waktu di sumbu X) → Line Chart. 2. Peringkat Kategori (Nama teks panjang) → Horizontal Bar Chart. 3. Perbandingan Sedikit Kategori (3-5 item) → Column Chart. 4. Komposisi Sederhana (2-3 item) → Donut Chart. 5. Dua Metrik Berbeda (Omzet vs Margin %) → Combo Chart.'
      },
      {
        title: 'Bahaya Grafik 3D',
        explanation: 'Grafik 3D membiaskan sudut pandang mata manusia sehingga irisan atau batang di bagian depan terlihat lebih besar daripada kenyataan sebenarnya. Hindari grafik 3D dalam presentasi bisnis formal.',
      }
    ],
    beforeAfterComparison: {
      badTitle: 'Bad Chart (Cluttered & Menyesatkan)',
      badPoints: [
        'Pie chart 3D dengan 12 irisan kecil yang tidak terbaca.',
        'Warna pelangi acak tanpa tujuan hierarki.',
        'Garis gridline hitam tebal mendominasi layar.',
        'Judul hanya bertuliskan "Grafik 1" tanpa konteks unit atau tahun.'
      ],
      goodTitle: 'Good Chart (Clean & Focused)',
      goodPoints: [
        'Horizontal Bar Chart terurut rapi dari omzet terbesar.',
        'Warna batang abu-abu netral dengan highlight hijau zamrud pada produk nomor 1.',
        'Data labels diletakkan langsung di ujung batang sehingga sumbu X dapat disederhanakan.',
        'Judul jelas: "Top 5 Kategori Berdasarkan Kontribusi Omzet (Juta Rp) - 2026".'
      ]
    },
    bestPractices: [
      'Urutkan data batang dari yang tertinggi ke terendah agar audiens tidak perlu membandingkan ketinggian secara manual.',
      'Gunakan warna aksen hanya untuk menyorot item yang ingin diceritakan (focal point).',
      'Pastikan sumbu angka dimulai dari nol (0) pada grafik batang agar tidak memanipulasi proporsi perbandingan.'
    ],
    commonMistakes: [
      {
        mistake: 'Menggunakan Pie Chart untuk data yang memiliki lebih dari 5 kategori.',
        solution: 'Ganti dengan Horizontal Bar Chart agar label nama kategori yang panjang dapat terbaca dengan nyaman dari kiri ke kanan.'
      }
    ],
    quiz: {
      question: 'Grafik apa yang paling tepat untuk menampilkan peringkat 10 cabang toko dengan nama cabang yang relatif panjang?',
      options: [
        'Pie Chart 3D dengan rotasi miring',
        'Horizontal Bar Chart yang diurutkan dari penjualan terbesar',
        'Radar Chart melingkar',
        'Bubble Chart multi-dimensi'
      ],
      correctIndex: 1,
      explanation: 'Horizontal Bar Chart adalah pilihan terbaik untuk menampilkan banyak kategori dengan nama panjang, karena label teks horizontal mudah dibaca tanpa perlu dimiringkan.'
    },
    downloadFile: {
      filename: '07_Chart_Selection_Guide.xlsx',
      fileType: 'xlsx',
      title: 'Katalog Template Visualisasi Grafik Excel Profesional',
      size: '34 KB',
      description: 'Workbook perbandingan langsung Bad vs Good charts, template combo chart, dan formatting grafik profesional.'
    }
  },
  {
    id: 'dash-lvl-8',
    levelNumber: 8,
    title: 'Dashboard Layout & UI Grid',
    slug: 'dashboard-layout',
    subtitle: 'Menyusun Tata Letak, Grid Alignment, dan Hierarki Visual',
    estimatedTime: '25 Menit',
    summary: 'Pelajari arsitektur layout standar industri: F-Pattern, susunan grid kartu, konsistensi margin, dan hierarki informasi dari ringkasan hingga detail.',
    whatIsIt: 'Dashboard Layout & UI Grid adalah teknik penataan komponen (header, kartu KPI, grafik, dan tabel) ke dalam kisi-kisi terstruktur sehingga mata audiens dapat menelusuri data secara alami, teratur, dan tanpa kebingungan.',
    objectives: [
      'Menerapkan pola baca alami manusia (F-Pattern dan Z-Pattern) pada spreadsheet.',
      'Menyusun layout berbasis kartu (Card-based Layout) dengan margin dan padding seragam.',
      'Mengatur struktur 4 zona: Header & Filter → KPI Row → Visual Trend/Breakdown → Data Detail Table.',
      'Menghilangkan gridlines default Excel untuk menciptakan kanvas bersih profesional.'
    ],
    whenToUse: 'Diterapkan sebelum menempatkan chart dan kartu metrik ke sheet visualisasi utama.',
    steps: [
      'Pilih sheet baru dan beri nama "05_DASHBOARD".',
      'Hapus centang View → Gridlines untuk mendapatkan latar belakang putih bersih tanpa garis kotak-kotak.',
      'Buat baris Header elegan di baris 2-4 untuk Judul Laporan, Periode Data, dan Logo Perusahaan.',
      'Buat 4 kartu KPI di baris 6-9 menggunakan shape rounded rectangle atau border sel halus.',
      'Tempatkan 2 grafik utama berdampingan di baris 11-25 dengan lebar yang simetris.'
    ],
    concepts: [
      {
        title: 'Blueprint Layout Standar Eksekutif',
        explanation: 'Zona 1 (Atas): Judul + Tanggal Refresh + Dropdown/Slicer Global. Zona 2: 4 Kartu KPI Utama. Zona 3 (Tengah Kiri): Grafik Tren Waktu (Line Chart). Zona 3 (Tengah Kanan): Grafik Breakdown Kategori (Bar Chart). Zona 4 (Bawah): Tabel Detail Top 5 Item.',
      },
      {
        title: 'Prinsip Alignment & Spacing',
        explanation: 'Semua kartu dan chart harus memiliki celah (gutter) yang sama, misal 1 kolom kosong (lebar 20px) sebagai pemisah. Gunakan fitur Page Layout → Align to Grid agar semua elemen terkunci simetris.',
      }
    ],
    bestPractices: [
      'Gunakan batas sel abu-abu sangat tipis (#E5E7EB) atau warna latar belakang kartu putih di atas kanvas abu-abu sangat muda (#F8F9FA).',
      'Kunci tampilan agar pas dalam 1 layar standar monitor tanpa perlu scroll.',
      'Gunakan jenis font yang seragam di seluruh dashboard (misal: Aptos, Calibri, atau Segoe UI).'
    ],
    commonMistakes: [
      {
        mistake: 'Membiarkan Gridlines bawaan Excel tetap aktif di latar belakang dashboard.',
        solution: 'Wajib nonaktifkan View → Gridlines agar dashboard terlihat seperti aplikasi mandiri, bukan lembar kerja data mentah.'
      }
    ],
    quiz: {
      question: 'Di posisi manakah komponen KPI paling penting sebaiknya diletakkan pada layout dashboard?',
      options: [
        'Di pojok kanan bawah setelah semua tabel detail.',
        'Di bagian atas tepat di bawah header, karena mengikuti pola pandang alami mata manusia (F-Pattern).',
        'Tersembunyi di sheet terpisah.',
        'Di tengah-tengah antara dua grafik besar.'
      ],
      correctIndex: 1,
      explanation: 'Sesuai prinsip hierarki visual dan F-Pattern, informasi paling esensial (KPI Utama) harus selalu berada di bagian atas agar langsung terlihat saat pertama kali dibuka.'
    },
    downloadFile: {
      filename: '08_Dashboard_Layout_Blueprint.xlsx',
      fileType: 'xlsx',
      title: 'Template Kisi Layout Dashboard Excel Siap Pakai',
      size: '29 KB',
      description: 'Template kanvas bersih tanpa gridlines dengan struktur kartu KPI, slot grafik simetris, dan area filter rapi.'
    }
  },
  {
    id: 'dash-lvl-9',
    levelNumber: 9,
    title: 'Interactive Dashboard with Slicers & Timelines',
    slug: 'interactive-dashboard',
    subtitle: 'Membangun Filter Interaktif yang Responsif dan Menawan',
    estimatedTime: '30 Menit',
    summary: 'Ubah spreadsheet statis menjadi aplikasi interaktif menggunakan Slicer tombol, Timeline periode, dan Dropdown Data Validation.',
    whatIsIt: 'Interactive Dashboard adalah dashboard yang memungkinkan pengguna memilih kriteria filter (seperti wilayah, divisi, kategori, atau rentang bulan) dengan sekali klik, dan seluruh angka serta grafik otomatis diperbarui seketika.',
    objectives: [
      'Membuat dan menata tampilan Slicer tombol yang elegan.',
      'Membuat Timeline filter untuk navigasi waktu kuartalan dan bulanan.',
      'Mengatur Report Filter Connections agar satu filter mengendalikan seluruh visual.',
      'Mendesain Dropdown menu menggunakan Data Validation untuk alternatif filter hemat ruang.'
    ],
    whenToUse: 'Dibutuhkan ketika audiens dashboard terdiri dari beberapa pemangku kepentingan yang ingin melihat data divisi atau wilayah mereka masing-masing tanpa harus membuat file terpisah.',
    steps: [
      'Pilih PivotTable atau PivotChart, lalu klik menu Insert → Slicer.',
      'Pilih field yang ingin dijadikan filter (misal: "Region" dan "Kategori Produk").',
      'Format tampilan Slicer: Ubah jumlah kolom (Columns) menjadi 3 atau 4 agar tombol berjejer horizontal.',
      'Kustomisasi warna Slicer agar senada dengan palet warna dashboard.',
      'Gunakan menu Insert → Timeline untuk field tanggal agar pengguna dapat memilih rentang waktu dengan klik dan seret.'
    ],
    concepts: [
      {
        title: 'Slicer Horizontal vs Vertikal',
        explanation: 'Secara default Slicer berbentuk daftar vertikal panjang. Pada menu Slicer Options, ubah nilai "Columns" menjadi 3 atau 4 agar tombol Slicer berbentuk tab horizontal yang rapi di baris atas dashboard.',
      },
      {
        title: 'Timeline Filter untuk Waktu Dinamis',
        explanation: 'Timeline mengenali data berformat tanggal secara cerdas dan menyediakan tombol pintas untuk berpindah antara skala Tahun, Kuartal, Bulan, dan Hari secara mulus.',
      }
    ],
    bestPractices: [
      'Sembunyikan item Slicer yang tidak memiliki data dengan mencentang "Hide items with no data" di Slicer Settings.',
      'Letakkan panel Slicer di bagian atas dashboard sejajar dengan judul, atau di bilah navigasi samping kiri (Sidebar).',
      'Beri judul Slicer yang jelas, misal "Pilih Wilayah Cabang:".'
    ],
    commonMistakes: [
      {
        mistake: 'Membuat terlalu banyak Slicer (lebih dari 5 buah) sehingga memenuhi separuh layar dashboard.',
        solution: 'Batasi Slicer utama maksimal 2-3 buah untuk filter paling sering digunakan; gunakan dropdown untuk filter sekunder.'
      }
    ],
    quiz: {
      question: 'Fitur Excel apa yang memungkinkan pemilihan rentang waktu berbasis bulan, kuartal, dan tahun secara visual dan intuitif?',
      options: [
        'Data Validation biasa',
        'Timeline Filter',
        'Macro VBA',
        'Conditional Formatting'
      ],
      correctIndex: 1,
      explanation: 'Timeline Filter secara khusus dirancang untuk memfilter PivotTable dan PivotChart berbasis field tanggal dengan opsi navigasi Tahun, Kuartal, Bulan, atau Hari.'
    },
    downloadFile: {
      filename: '09_Interactive_Slicer_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Workbook Latihan Filter Slicer & Timeline Interaktif',
      size: '37 KB',
      description: 'Latihan menghubungkan Slicer regional, kategori produk, dan Timeline bulanan ke 4 komponen visual sekaligus.'
    }
  },
  {
    id: 'dash-lvl-10',
    levelNumber: 10,
    title: 'Advanced Dynamic Dashboard Architecture',
    slug: 'advanced-dashboard',
    subtitle: 'Judul Dinamis, Dynamic Charts, dan Formula Parameter Cell',
    estimatedTime: '30 Menit',
    summary: 'Tingkatkan kualitas dashboard dengan judul grafik yang otomatis berubah mengikuti filter, metrik dinamis yang dapat dipilih via radio button, dan formula interaktif.',
    whatIsIt: 'Advanced Dynamic Dashboard adalah tingkat implementasi di mana teks judul, label angka, batas sumbu grafik, dan target metrik secara cerdas beradaptasi sesuai dengan kriteria yang sedang aktif dipilih oleh pengguna.',
    objectives: [
      'Membuat Dynamic Chart Title yang terhubung ke sel rumus teks penggabung.',
      'Merancang grafik yang bisa berganti metrik (misal beralih antara melihat Omzet, Jumlah Unit, atau Profit).',
      'Menggunakan formula INDEX dan MATCH bersama Form Controls untuk memilih seri data.',
      'Menampilkan status target dinamis (Di Atas Target vs Di Bawah Target).'
    ],
    whenToUse: 'Digunakan saat membuat dashboard canggih yang hemat ruang di mana 1 grafik dapat menggantikan 3 grafik berbeda dengan tombol pilihan metrik.',
    steps: [
      'Siapkan sel parameter pilihan (misal sel C1 berisi angka 1 untuk Omzet, 2 untuk Profit, 3 untuk Qty).',
      'Gunakan formula =CHOOSE(C1, Total_Omzet, Total_Profit, Total_Qty) untuk mengambil data dinamis.',
      'Buat sel formula judul dinamis: ="Tren Performa " & IF(C1=1, "Penjualan", "Keuntungan") & " - " & Selected_Region.',
      'Hubungkan judul chart ke sel formula tersebut dengan mengklik judul chart, ketik "=" di formula bar, lalu klik sel teks.'
    ],
    concepts: [
      {
        title: 'Menghubungkan Judul Chart ke Sel Formula',
        explanation: 'Klik kotak judul pada chart → Ketik tanda sama dengan (=) langsung pada Formula Bar di atas ribbon Excel → Klik sel yang berisi teks dinamis → Tekan Enter. Judul chart kini akan otomatis berubah setiap kali sel tersebut berubah!',
      },
      {
        title: 'Dynamic Series Switcher',
        explanation: 'Dengan bantuan Radio Button (Option Button) dari tab Developer, pengguna dapat memilih metrik apa yang ingin ditampilkan pada grafik tanpa memadati layar dengan banyak grafik terpisah.',
      }
    ],
    bestPractices: [
      'Gunakan formula teks penggabung seperti ="Performa Wilayah: " & B2 & " (" & TEXT(TODAY(), "mmmm yyyy") & ")" agar laporan selalu relevan.',
      'Kunci rumus dengan tanda dolar ($) saat menghubungkan judul grafik.',
      'Pastikan format angka pada sumbu Y menyesuaikan (Rupiah vs Persen) saat metrik berganti.'
    ],
    commonMistakes: [
      {
        mistake: 'Mengetik teks rumus langsung di dalam kotak judul chart bukan di Formula Bar.',
        solution: 'Wajib mengetik tanda sama dengan di Formula Bar di atas, bukan di dalam kotak teks grafik itu sendiri.'
      }
    ],
    quiz: {
      question: 'Bagaimana cara resmi menghubungkan judul grafik Excel agar selalu mengikuti teks dinamis di sel D2?',
      options: [
        'Klik kanan judul chart → Pilih Add Hyperlink ke D2.',
        'Klik elemen judul chart, ketik = di Formula Bar, klik sel D2, lalu tekan Enter.',
        'Ketik rumus =D2 langsung di lembar kerja.',
        'Gunakan kombinasi shortcut Ctrl + F.'
      ],
      correctIndex: 1,
      explanation: 'Formula Bar adalah tempat resmi untuk menyambungkan judul chart ke sel eksternal: klik judul chart, ketik = di formula bar, klik sel sasaran, dan tekan Enter.'
    },
    downloadFile: {
      filename: '10_Dynamic_Dashboard_Techniques.xlsx',
      fileType: 'xlsx',
      title: 'Latihan Dynamic Chart & Switcher Metrik Excel',
      size: '39 KB',
      description: 'Latihan membuat judul dinamis, chart multi-metrik dengan radio button, dan perhitungan target kondisional.'
    }
  },
  {
    id: 'dash-lvl-11',
    levelNumber: 11,
    title: 'Business Dashboard Blueprints (7 Core Types)',
    slug: 'business-dashboard-types',
    subtitle: 'Studi Kasus Desain untuk Sales, Finance, HR, Inventory, Marketing, Sekolah, dan UMKM',
    estimatedTime: '35 Menit',
    summary: 'Bedah tuntas cetak biru (blueprint) 7 jenis dashboard bisnis populer: metrik wajib, susunan grafik, filter utama, dan target audiens.',
    whatIsIt: 'Business Dashboard Blueprints adalah panduan arsitektur visual dan analitis spesifik untuk masing-masing bidang industri dan fungsi manajemen di dunia kerja nyata.',
    objectives: [
      'Menguasai struktur Sales Dashboard (Revenue, Growth, AOV, Pipeline, Top Products).',
      'Menguasai struktur Finance Dashboard (P&L, Opex Breakdown, Net Margin, Cash Flow).',
      'Menguasai struktur HR Dashboard (Headcount, Turnover, Absenteeism, Demografi).',
      'Menguasai struktur Inventory Dashboard (Stock Health, Dead Stock, Days of Inventory).',
      'Menguasai struktur Marketing, School, dan UMKM Dashboard.'
    ],
    whenToUse: 'Gunakan sebagai referensi standar saat Anda diminta membuat dashboard dari nol untuk divisi tertentu di perusahaan Anda.',
    steps: [
      'Pilih jenis dashboard yang sesuai dengan kebutuhan stakeholder bisnis.',
      'Terapkan formula KPI spesifik sesuai blueprint divisi.',
      'Pilih grafik yang tepat untuk menyajikan metrik operasional dan strategis.',
      'Susun tata letak sesuai panduan F-Pattern standar industri.'
    ],
    concepts: [
      {
        title: '1. Sales Performance Dashboard',
        explanation: 'KPI Utama: Total Omzet, Profit Bersih, Total Order, Rata-rata Nilai Order (AOV), MoM Growth. Grafik: Tren Omzet Bulanan (Line), Penjualan per Kategori (Bar), Distribusi Wilayah (Donut/Map), Tabel Top 5 Sales Rep.',
      },
      {
        title: '2. Corporate Finance Dashboard',
        explanation: 'KPI Utama: Total Pendapatan, Total Pengeluaran (Opex), Laba Bersih (Net Profit), Net Profit Margin %. Grafik: Komparasi Pendapatan vs Pengeluaran per Bulan (Grouped Column), Komposisi Biaya Operasional (Bar Chart Terurut).',
      },
      {
        title: '3. HR & People Analytics Dashboard',
        explanation: 'KPI Utama: Total Karyawan Aktif, Rasio Turnover Bulanan, Tingkat Kehadiran %, Rata-rata Biaya Lembur. Grafik: Karyawan per Departemen (Bar), Tren Absensi Bulanan (Line), Komposisi Level Jabatan (Donut).',
      },
      {
        title: '4. Inventory & Stock Health Dashboard',
        explanation: 'KPI Utama: Total Nilai Persediaan, Jumlah SKU Menipis (Low Stock), SKU Habis (Out of Stock), Stock Turnover Ratio. Grafik: Nilai Stok per Gudang, Produk dengan Perputaran Tercepat (Fast Moving).',
      }
    ],
    bestPractices: [
      'Selalu diskusikan definisi KPI dengan kepala departemen terkait sebelum menyusun file.',
      'Sesuaikan frekuensi update: Sales & Inventory harian/mingguan, Finance & HR bulanan.',
      'Sediakan ringkasan eksekutif satu halaman sebelum masuk ke lembar rincian.'
    ],
    commonMistakes: [
      {
        mistake: 'Menggabungkan semua data divisi (Sales, HR, Pajak, Gudang) ke dalam 1 dashboard yang sesak.',
        solution: 'Pisahkan dashboard per fungsi bisnis atau gunakan sheet terpisah dengan tema yang konsisten.'
      }
    ],
    quiz: {
      question: 'Manakah kombinasi KPI yang paling tepat untuk sebuah HR People Analytics Dashboard?',
      options: [
        'Total Omzet, Profit Margin, Rata-rata Diskon',
        'Total Headcount, Tingkat Turnover, Rasio Kehadiran, Biaya Lembur',
        'Stok Opname, Dead Stock, Reorder Point',
        'Harga Pokok Penjualan, Kas Bersih, Piutang Usaha'
      ],
      correctIndex: 1,
      explanation: 'Headcount (jumlah staf), tingkat perputaran (turnover), absensi, dan lembur merupakan metrik paling esensial dalam operasional sumber daya manusia.'
    },
    downloadFile: {
      filename: '11_Business_Dashboard_Blueprints.xlsx',
      fileType: 'xlsx',
      title: 'Paket 7 Blueprint Dashboard Bisnis Excel',
      size: '45 KB',
      description: 'Template struktur dan rancangan data untuk 7 jenis dashboard: Sales, Finance, HR, Inventory, Marketing, Sekolah, UMKM.'
    }
  },
  {
    id: 'dash-lvl-12',
    levelNumber: 12,
    title: 'Dashboard UX / UI & Design Principles',
    slug: 'dashboard-ux-ui',
    subtitle: '5 Golden Rules, Konsistensi Warna, dan Ergonomi Visual',
    estimatedTime: '25 Menit',
    summary: 'Kuasai kaidah desain profesional: Aturan 5-10 detik, sistem warna fungsional (Semantic Colors), tipografi berjenjang, dan cara membuang visual clutter.',
    whatIsIt: 'Dashboard UX / UI adalah penerapan prinsip User Experience dan User Interface design pada lembar kerja spreadsheet untuk memastikan dashboard tidak hanya enak dilihat, tetapi juga nyaman digunakan dan mudah diinterpretasikan tanpa kebingungan.',
    objectives: [
      'Menerapkan 5 Golden Rules desain dashboard bisnis.',
      'Memahami sistem warna fungsional: Primary, Neutral, Success (Hijau), Warning (Kuning), Danger (Merah).',
      'Mengatur hierarki tipografi: H1 20-24pt, KPI Value 24-28pt bold, Body/Labels 11-12pt.',
      'Mengeliminasi dekorasi yang tidak memiliki nilai informasi (No 3D, No gradient silau).'
    ],
    whenToUse: 'Diterapkan pada tahap akhir perapian tampilan visual (finishing touch) sebelum membagikan file kepada manajemen.',
    steps: [
      'Pilih 1 warna brand utama (misal: Navy Blue untuk perusahaan formal, Emerald Green untuk tema keuangan).',
      'Gunakan warna abu-abu netral (#6B7280) untuk teks label dan sumbu grafik.',
      'Simpan warna hijau dan merah HANYA untuk status performa baik vs buruk.',
      'Pastikan jarak (whitespace) antar kartu konsisten 1-2 baris/kolom kosong.',
      'Cek kontras warna agar mudah dibaca di layar laptop maupun proyektor ruang rapat.'
    ],
    concepts: [
      {
        title: '5 Golden Rules of Dashboard Design',
        explanation: 'Rule 1: Dapat dipahami dalam 5-10 detik. Rule 2: KPI paling kritikal selalu berada di bagian teratas. Rule 3: Konsistensi warna di setiap elemen. Rule 4: Batasi maksimal 4-5 chart di satu layar. Rule 5: Hilangkan semua elemen dekoratif yang tidak menyampaikan data (KISS principle).',
      },
      {
        title: 'Sistem Pewarnaan Semantik (Semantic Colors)',
        explanation: 'Warna menyampaikan makna langsung tanpa perlu membaca teks: Emerald (#16A34A) = Surplus / Capai Target. Rose (#DC2626) = Defisit / Alert. Amber (#D97706) = Perhatian / Mendekati Batas. Slate (#64748B) = Netral / Historical.',
      }
    ],
    bestPractices: [
      'Gunakan maksimal 3 variasi ukuran font di seluruh lembar dashboard.',
      'Hindari menggunakan latar belakang gelap (dark mode) jika dashboard sering dicetak ke kertas PDF atau proyektor redup.',
      'Pastikan teks angka menggunakan font proporsional yang rapi dan rata kanan (right-aligned).'
    ],
    commonMistakes: [
      {
        mistake: 'Menggunakan warna pelangi yang berbeda untuk setiap batang grafik di satu kategori.',
        solution: 'Gunakan satu warna tunggal yang konsisten untuk seri data yang sama; gunakan warna berbeda hanya jika membandingkan kategori pembeda.'
      }
    ],
    quiz: {
      question: 'Apa fungsi utama dari prinsip "Whitespace" (ruang kosong) pada desain dashboard?',
      options: [
        'Membuat file Excel lebih cepat diunduh.',
        'Memberikan ruang istirahat bagi mata audiens sehingga informasi penting lebih menonjol dan tidak terasa sesak.',
        'Memperbesar ukuran sel agar bisa memuat lebih banyak rumus.',
        'Menyembunyikan rumus yang salah.'
      ],
      correctIndex: 1,
      explanation: 'Whitespace yang cukup mencegah rasa sesak (cognitive overload), memandu fokus mata, dan menciptakan kesan produk digital yang elegan dan profesional.'
    },
    downloadFile: {
      filename: '12_Dashboard_UI_Style_Guide.xlsx',
      fileType: 'xlsx',
      title: 'Panduan Gaya Desain & Palet Warna Dashboard Excel',
      size: '28 KB',
      description: 'Panduan kode warna HEX, template kartu berpenampilan modern, dan checklist audit UI dashboard.'
    }
  },
  {
    id: 'dash-lvl-13',
    levelNumber: 13,
    title: 'Dashboard Storytelling & Actionable Insights',
    slug: 'dashboard-storytelling',
    subtitle: 'Mengubah Sekumpulan Grafik Menjadi Cerita Bisnis yang Menghasilkan Solusi',
    estimatedTime: '25 Menit',
    summary: 'Pelajari kerangka kerja Data Storytelling: Pertanyaan Bisnis → Metrik Kunci → Visualisasi → Wawasan Nyata → Keputusan Strategis.',
    whatIsIt: 'Dashboard Storytelling adalah kemampuan menghubungkan visual data dengan narasi konteks bisnis sehingga audiens tidak hanya melihat angka masa lalu, tetapi memahami mengapa hal itu terjadi dan tindakan apa yang harus diambil selanjutnya.',
    objectives: [
      'Menerapkan framework 5 langkah: Question → Metric → Visualization → Insight → Decision.',
      'Menuliskan callout box wawasan singkat (Executive Summary Snippets) di atas dashboard.',
      'Menghubungkan pola visual dengan anomali bisnis nyata.',
      'Membantu manajemen beralih dari pelaporan pasif ke pengambilan tindakan proaktif.'
    ],
    whenToUse: 'Diterapkan saat mempresentasikan dashboard di hadapan manajer, direksi, klien, atau investor.',
    steps: [
      'Rumuskan pertanyaan bisnis utama (misal: "Mengapa profit kuartal ini turun padahal omzet naik?").',
      'Cari metrik pendukung (misal: Biaya Logistik dan Diskon Penjualan).',
      'Visualisasikan hubungan kedua metrik tersebut (misal Combo Chart Omzet vs Beban Promo).',
      'Temukan wawasan (Insight: "Diskon 30% pada produk kategori A menggerus margin kotor hingga 8%").',
      'Tuliskan rekomendasi tindakan (Decision: "Hentikan diskon produk A dan alihkan subsidi promo ke produk B dengan margin tinggi").'
    ],
    concepts: [
      {
        title: 'Framework Question to Decision',
        explanation: 'Question: Apa produk yang paling banyak menghasilkan laba? Metric: Net Margin by SKU. Visualization: Ranked Bar Chart. Insight: Laptop tipe X menyumbang 42% total laba meskipun hanya 15% dari total unit terjual. Decision: Prioritaskan alokasi modal kerja dan space display untuk Laptop tipe X.',
      },
      {
        title: 'Callout Insight Card',
        explanation: 'Tambahkan 1 kotak teks ringkas (Smart Commentary) di sudut atas dashboard yang merangkum 3 poin penemuan utama pada periode tersebut agar pembaca sibuk tidak perlu menganalisis chart sendiri.',
      }
    ],
    bestPractices: [
      'Selalu tanyakan: "Lalu apa tindakan kita setelah melihat angka ini?" (So what?).',
      'Gunakan anotasi panah atau penanda pada titik chart saat terjadi peristiwa khusus (misal: Promo Harbolnas).',
      'Jadikan dashboard sebagai dasar diskusi rapat pemecahan masalah, bukan sekadar pajangan dinding.'
    ],
    commonMistakes: [
      {
        mistake: 'Hanya menyajikan angka tanpa penjelasan mengapa angka tersebut naik atau turun.',
        solution: 'Sediakan panel catatan ringkas (Executive Commentary) yang menjelaskan faktor pemicu di balik data.'
      }
    ],
    quiz: {
      question: 'Dalam kerangka Data Storytelling, apa tujuan akhir setelah menemukan "Insight" dari sebuah grafik?',
      options: [
        'Membuat grafik baru yang lebih rumit.',
        'Mengambil Keputusan (Decision) atau tindakan bisnis nyata untuk menyelesaikan masalah atau memanfaatkan peluang.',
        'Mengganti warna tema Excel.',
        'Menyimpan file ke format ZIP.'
      ],
      correctIndex: 1,
      explanation: 'Tujuan utama seluruh siklus analisis data bisnis adalah memicu Keputusan dan Tindakan nyata (Decision & Actionable Next Steps) demi kemajuan organisasi.'
    },
    downloadFile: {
      filename: '13_Dashboard_Storytelling_Guide.xlsx',
      fileType: 'xlsx',
      title: 'Panduan Praktik Dashboard Storytelling & Executive Notes',
      size: '31 KB',
      description: 'Template kotak komentar eksekutif otomatis, penanda anotasi data, dan contoh kasus bisnis nyata.'
    }
  },
  {
    id: 'dash-lvl-14',
    levelNumber: 14,
    title: 'Dashboard Performance & Optimization',
    slug: 'dashboard-performance',
    subtitle: 'Menjaga File Tetap Ringan, Cepat, dan Struktur 5 Sheet Standar',
    estimatedTime: '25 Menit',
    summary: 'Optimasi file Excel agar tidak lemot: Hindari fungsi volatile (OFFSET, INDIRECT), manfaatkan Excel Table, dan terapkan arsitektur 5 sheet profesional.',
    whatIsIt: 'Dashboard Performance & Optimization adalah kumpulan teknik konfigurasi teknis untuk menjaga performa file spreadsheet tetap responsif, ringan, berukuran kecil, dan tidak mudah mengalami crash meskipun memproses puluhan ribu baris data.',
    objectives: [
      'Menerapkan struktur 5 sheet standar industri: RAW, CLEAN, CALC, PIVOT, DASHBOARD.',
      'Mengurangi ketergantungan pada fungsi Volatile (OFFSET, INDIRECT, TODAY liar).',
      'Mengoptimalkan ukuran file Excel menggunakan format biner (.xlsb).',
      'Mengamankan lembar dashboard dengan fitur Protect Sheet agar formula tidak terhapus tidak sengaja.'
    ],
    whenToUse: 'Diterapkan ketika file Excel mulai terasa lambat, lag saat mengklik Slicer, atau berukuran di atas 20 MB.',
    steps: [
      'Strukturkan lembar kerja secara ketat ke dalam 5 sheet berurutan.',
      'Ganti rumus referensi dinamis berbasis OFFSET dengan kombinasi INDEX atau Excel Table resmi.',
      'Hapus format sel kosong yang tidak terpakai hingga baris ke 1 juta untuk membuang beban memori.',
      'Kunci sel formula dan sembunyikan sheet kalkulasi teknis.',
      'Simpan file ke format Excel Binary Workbook (.xlsb) untuk kompresi ukuran hingga 50% lebih kecil.'
    ],
    concepts: [
      {
        title: 'Arsitektur 5 Sheet Standar Industri',
        explanation: 'Sheet 01_RAW_DATA (Data mentah tanpa edit) → Sheet 02_CLEAN_DATA (Data bersih siap olah) → Sheet 03_CALCULATION (Kumpulan rumus pendukung & parameter) → Sheet 04_PIVOT (Seluruh PivotTable tersimpan rapi di sini) → Sheet 05_DASHBOARD (Kanvas visual utama yang disajikan ke pimpinan).',
      },
      {
        title: 'Bahaya Fungsi Volatile',
        explanation: 'Fungsi seperti OFFSET, INDIRECT, dan NOW() dihitung ulang setiap kali Anda mengklik sel mana pun di Excel, bahkan jika datanya tidak berubah. Hal ini menyebabkan lag parah pada dashboard besar.',
      }
    ],
    bestPractices: [
      'Jangan pernah memformat seluruh kolom hingga ke baris 1.048.576 dengan warna background tebal.',
      'Sembunyikan sheet 01 sampai 04 saat membagikan file ke pengguna akhir agar mereka hanya fokus pada sheet 05_DASHBOARD.',
      'Lindungi (Protect) sheet dashboard dengan mengizinkan pengguna hanya mengklik Slicer dan sel input yang ditentukan.'
    ],
    commonMistakes: [
      {
        mistake: 'Menggabungkan data mentah, rumus bantuan, PivotTable, dan chart di dalam satu sheet yang sama.',
        solution: 'Wajib pisahkan ke dalam sheet terdedikasi sesuai perannya (Data vs Calc vs Visual) agar file mudah dipelihara.'
      }
    ],
    quiz: {
      question: 'Manakah susunan struktur sheet yang paling rapi dan sesuai standar industri pembuatan dashboard Excel?',
      options: [
        'Sheet1, Sheet2, Sheet3 tanpa nama',
        '01_RAW_DATA, 02_CLEAN_DATA, 03_CALCULATION, 04_PIVOT, 05_DASHBOARD',
        'Grafik, Gambar, Rumus, Tulisan',
        'Database_Semua_Jadi_Satu'
      ],
      correctIndex: 1,
      explanation: 'Pemisahan 5 sheet (Raw Data, Clean Data, Calculation, Pivot, dan Dashboard) memisahkan antara lapisan data, lapisan logika perhitungan, dan lapisan tampilan antarmuka visual.'
    },
    downloadFile: {
      filename: '14_Optimized_Workbook_Template.xlsx',
      fileType: 'xlsx',
      title: 'Template Struktur 5 Sheet Excel Teroptimasi',
      size: '30 KB',
      description: 'Template kosong 5 sheet siap pakai dengan setting gridline nonaktif, proteksi cell, dan navigasi sheet rapi.'
    }
  },
  {
    id: 'dash-lvl-15',
    levelNumber: 15,
    title: 'Professional Dashboard Workflow',
    slug: 'professional-workflow',
    subtitle: 'Pipeline 11 Tahap dari Data Mentah Hingga Dashboard Final Siap Rapat',
    estimatedTime: '30 Menit',
    summary: 'Rangkuman lengkap metodologi kerja profesional: Mulai dari memahami brief bisnis, pembersihan data, kalkulasi, uji filter, hingga presentasi.',
    whatIsIt: 'Professional Dashboard Workflow adalah panduan metodologis langkah-demi-langkah yang diikuti oleh para konsultan Business Intelligence dan Data Analyst saat membangun proyek dashboard di perusahaan berskala global.',
    objectives: [
      'Menguasai 11 tahapan pipeline pembuatan dashboard secara berurutan.',
      'Membuat sketsa wireframe di atas kertas sebelum membuka aplikasi Excel.',
      'Melakukan User Acceptance Testing (UAT) untuk memastikan semua filter berfungsi tanpa error.',
      'Mendokumentasikan kamus data (Data Dictionary) untuk pemeliharaan jangka panjang.'
    ],
    whenToUse: 'Gunakan sebagai panduan langkah kerja setiap kali Anda menerima penugasan proyek pembuatan dashboard baru di kantor.',
    steps: [
      'Tahap 1: Business Discovery & Requirement (Tentukan pertanyaan bisnis & KPI).',
      'Tahap 2: Data Sourcing & Audit (Kumpulkan dan periksa kesehatan data mentah).',
      'Tahap 3: Wireframe Sketching (Gambar tata letak kasar di kertas/Figma).',
      'Tahap 4: Data Cleaning & Structuring (Terapkan flat table & bersihkan inkonsistensi).',
      'Tahap 5: Data Modeling & Calculations (Buat PivotTable dan rumus pembantu).',
      'Tahap 6: KPI Formulation (Hitung metrik inti dan pembanding periode sebelumnya).',
      'Tahap 7: Chart Selection & Construction (Bangun visualisasi grafik yang tepat).',
      'Tahap 8: Layout Assembly (Tata seluruh elemen di sheet dashboard).',
      'Tahap 9: Interactivity & Connections (Pasang Slicer dan hubungkan filter).',
      'Tahap 10: Quality Control & Stress Testing (Uji semua kombinasi filter dan pastikan bebas #DIV/0!).',
      'Tahap 11: Deployment & Presentation (Kunci lembar kerja dan sajikan ke stakeholder).'
    ],
    concepts: [
      {
        title: 'Pentingnya Wireframing di Kertas',
        explanation: 'Jangan langsung mendesain di Excel. Menggambar kotak-kotak kasar di selembar kertas selama 10 menit akan menghemat 3 jam waktu revisi karena Anda sudah tahu di mana posisi KPI, chart tren, dan filter diletakkan.',
      },
      {
        title: 'Checklist Uji Kualitas (Quality Control)',
        explanation: 'Sebelum membagikan file: 1. Cek semua Slicer pada opsi "All" apakah totalnya cocok dengan master data. 2. Coba klik satu per satu tombol Slicer apakah ada grafik yang hilang. 3. Pastikan tidak ada pesan #N/A atau #VALUE! yang lolos.',
      }
    ],
    bestPractices: [
      'Selalu simpan cadangan file sebelum melakukan perubahan formula besar (misal gunakan penomoran v1.0, v1.1).',
      'Sertakan sheet informasi "Tentang Dashboard" yang mencantumkan nama pembuat, tanggal update, dan sumber data.',
      'Mintalah rekan kerja untuk mencoba mengklik filter dashboard untuk menguji apakah tampilan mudah dipahami orang awam.'
    ],
    commonMistakes: [
      {
        mistake: 'Langsung membuat chart di Excel tanpa mengetahui pertanyaan bisnis apa yang ingin dijawab.',
        solution: 'Mulai selalu dari Tahap 1: Pahami tujuan bisnis dan tentukan metrik target terlebih dahulu.'
      }
    ],
    quiz: {
      question: 'Mengapa tahap Wireframing (membuat sketsa kasar) sangat disarankan sebelum mulai membangun chart di Excel?',
      options: [
        'Karena Excel mewajibkan scan gambar wireframe.',
        'Karena menghemat waktu dan mencegah bongkar-pasang layout yang memakan waktu di dalam spreadsheet.',
        'Agar ukuran file Excel menjadi lebih kecil.',
        'Untuk menghitung jumlah rumus secara otomatis.'
      ],
      correctIndex: 1,
      explanation: 'Sketsa tata letak menentukan hierarki visual dan tata ruang sebelum teknis pembuatan di Excel dimulai, sehingga meminimalisir bongkar-pasang layout di tengah jalan.'
    },
    downloadFile: {
      filename: '15_Professional_Workflow_Checklist.xlsx',
      fileType: 'xlsx',
      title: 'Checklist & Template Manajemen Proyek Dashboard Excel',
      size: '27 KB',
      description: 'Checklist 11 tahapan kerja, formulir requirement bisnis, dan lembar verifikasi Quality Control.'
    }
  },
  {
    id: 'dash-lvl-16',
    levelNumber: 16,
    title: 'Real-World Projects & Mastery Challenge',
    slug: 'real-world-projects',
    subtitle: 'Implementasi 15 Proyek Nyata Lintas Industri & Ujian Sertifikasi',
    estimatedTime: '40 Menit',
    summary: 'Gerbang menuju 15 proyek dashboard dunia nyata dari Sales hingga Eksekutif Board, serta persiapan ujian sertifikasi Excel Dashboard Specialist.',
    whatIsIt: 'Real-World Projects adalah kumpulan studi kasus komprehensif di mana pengguna mempraktikkan seluruh ilmu dari Level 1 sampai 15 untuk membangun dashboard utuh dari dataset mentah bisnis nyata.',
    objectives: [
      'Menyelesaikan minimal 5 proyek dashboard dari 15 portofolio industri yang disediakan.',
      'Menerapkan sistem penilaian Review System (Skor / 100) berbasis 6 pilar audit.',
      'Mempersiapkan diri menghadapi tantangan Master Project (10.000 transaksi bisnis).',
      'Meraih sertifikat kelulusan resmi Excel Dashboard Specialist.'
    ],
    whenToUse: 'Dikerjakan sebagai portofolio kerja nyata untuk melamar pekerjaan atau meningkatkan kompetensi profesional di kantor.',
    steps: [
      'Kunjungi halaman Dashboard Projects (/dashboard/projects).',
      'Pilih salah satu dari 15 proyek (misal Project 01: Sales Performance Dashboard).',
      'Unduh dataset latihan dan baca brief skenario bisnis yang diberikan.',
      'Bangun dashboard di Excel mengikuti instruksi KPI, Chart, dan Filter wajib.',
      'Gunakan sistem verifikasi mandiri untuk mengecek skor kelengkapan dashboard Anda.'
    ],
    concepts: [
      {
        title: '6 Pilar Audit Dashboard Review System',
        explanation: '1. Data (Clean & Tabular). 2. KPI (Akurat & Relevan). 3. Visualization (Tepat Guna & Informatif). 4. Design (Konsisten, Rapi, & Bersih). 5. Interaction (Slicer & Filter Bekerja Mulus). 6. Insight (Menghasilkan Rekomendasi Nyata).',
      },
      {
        title: 'Portofolio Siap Kerja',
        explanation: 'Menyelesaikan 15 proyek ini memberikan Anda portofolio nyata yang mencakup hampir seluruh kebutuhan pelaporan bisnis modern: Ritel, Restoran, HR, Finansial, Sekolah, dan Perusahaan Multinasional.',
      }
    ],
    bestPractices: [
      'Dokumentasikan hasil dashboard Anda dalam bentuk tangkapan layar (screenshot) beresolusi tinggi untuk portofolio LinkedIn.',
      'Sertakan ringkasan masalah dan dampak bisnis yang berhasil diselesaikan oleh dashboard Anda.',
      'Uji coba dashboard dengan dataset baru di bulan berikutnya untuk memastikan otomatisasi bekerja lancar.'
    ],
    commonMistakes: [
      {
        mistake: 'Berhenti hanya pada membaca teori tanpa pernah membuka Excel untuk menyelesaikan minimal 1 proyek utuh.',
        solution: 'Buka proyek pertama sekarang dan buat dashboard Anda dari baris data mentah pertama hingga selesai!'
      }
    ],
    quiz: {
      question: 'Berapakah skor kelulusan standar industri pada sistem Dashboard Review System OfficeMaster?',
      options: [
        '50 / 100',
        '85 / 100 atau lebih dengan pemenuhan seluruh 6 pilar audit kualitas',
        '10 / 100',
        '100 / 100 tanpa toleransi'
      ],
      correctIndex: 1,
      explanation: 'Standar kelulusan portofolio profesional adalah minimal 85/100, di mana data bersih, KPI akurat, visualisasi tepat, UI konsisten, filter bekerja, dan insight teridentifikasi.'
    },
    downloadFile: {
      filename: '16_Master_Projects_Starter_Pack.xlsx',
      fileType: 'xlsx',
      title: 'Starter Pack Proyek Dashboard & Kriteria Penilaian',
      size: '48 KB',
      description: 'Panduan lengkap 15 proyek, dataset latihan awal, dan rubrik penilaian portofolio dashboard.'
    }
  }
];

export function getDashboardLessonBySlug(slug: string): DashboardLesson | undefined {
  return DASHBOARD_LESSONS.find((l) => l.slug === slug);
}

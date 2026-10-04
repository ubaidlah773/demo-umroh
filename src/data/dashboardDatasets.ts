import { DashboardDataset } from '@/types';

export const DASHBOARD_DATASETS: DashboardDataset[] = [
  {
    id: 'ds-sales',
    title: 'Retail Store Sales Transaction Dataset',
    category: 'Sales',
    rowCount: 1200,
    columns: ['Invoice_ID', 'Date', 'Customer_ID', 'Region', 'Category', 'Product_Name', 'Unit_Price', 'Quantity', 'Discount', 'Total_Amount', 'Cost_Amount', 'Net_Profit'],
    description: 'Dataset transaksi penjualan ritel tahun 2026 yang mencakup 5 wilayah regional di Indonesia, 4 kategori produk, diskon, biaya pokok, dan margin laba.',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Membangun PivotTable tren penjualan bulanan dan kuartalan.',
      'Menghitung Average Order Value (AOV) dan kontribusi profit wilayah.',
      'Membuat Slicer regional dan kategori produk interaktif.'
    ],
    downloadFile: {
      filename: 'Dataset_01_Retail_Sales_1200_Rows.xlsx',
      fileType: 'xlsx',
      title: 'Dataset Transaksi Penjualan Ritel (1.200 Baris)',
      size: '56 KB',
      description: 'Dataset penjualan bersih siap olah dalam format Excel Table resmi dengan 12 kolom atribut.'
    }
  },
  {
    id: 'ds-finance',
    title: 'Corporate General Ledger & Expense Dataset',
    category: 'Finance',
    rowCount: 850,
    columns: ['Entry_No', 'Posting_Date', 'Cost_Center', 'GL_Account_Code', 'Account_Description', 'Expense_Category', 'Budget_Allocated', 'Actual_Spent', 'Variance_Amount', 'Approval_Status'],
    description: 'Data pembukuan buku besar biaya operasional perusahaan yang membandingkan alokasi anggaran (budget) vs realisasi pengeluaran (actual) per divisi.',
    difficulty: 'Advanced',
    learningObjectives: [
      'Menghitung persentase deviasi anggaran (Variance %) per departemen.',
      'Membuat grafik komparasi Actual vs Budget dan mendeteksi pos boros.',
      'Menyusun laporan laba rugi (P&L) menggunakan formula conditional SUMIFS.'
    ],
    downloadFile: {
      filename: 'Dataset_02_Corporate_Expenses_850_Rows.xlsx',
      fileType: 'xlsx',
      title: 'Dataset Biaya Operasional & Anggaran (850 Baris)',
      size: '48 KB',
      description: 'Data buku besar biaya operasional korporat dengan kode akun dan perbandingan budget.'
    }
  },
  {
    id: 'ds-hr',
    title: 'Employee Directory & Demographics Dataset',
    category: 'Human Resources',
    rowCount: 520,
    columns: ['Employee_ID', 'Full_Name', 'Department', 'Job_Title', 'Grade_Level', 'Gender', 'Join_Date', 'Birth_Date', 'Employment_Status', 'Salary', 'Performance_Rating', 'Last_Promotion_Year'],
    description: 'Master data direktori 520 karyawan perusahaan aktif yang berisi informasi demografi, masa kerja, level jabatan, dan riwayat evaluasi performa.',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Menghitung masa kerja (tenure) menggunakan formula DATEDIF.',
      'Membuat grafik demografi piramida usia dan komposisi gender.',
      'Menganalisis hubungan antara level jabatan dengan skor evaluasi tahunan.'
    ],
    downloadFile: {
      filename: 'Dataset_03_HR_Employee_Master_520_Rows.xlsx',
      fileType: 'xlsx',
      title: 'Dataset Direktori & Demografi HR (520 Baris)',
      size: '42 KB',
      description: 'Data karyawan terstruktur rapi untuk latihan pembuatan HR headcount & demographic dashboard.'
    }
  },
  {
    id: 'ds-inventory',
    title: 'Warehouse Inventory & Stock Movement Dataset',
    category: 'Supply Chain',
    rowCount: 640,
    columns: ['SKU_Code', 'Item_Name', 'Category', 'Warehouse_Location', 'Current_Stock', 'Safety_Stock_Threshold', 'Reorder_Point', 'Unit_Cost_Rp', 'Selling_Price_Rp', 'Last_Restock_Date', 'Days_Unmoved'],
    description: 'Daftar master stok 640 SKU barang pergudangan lengkap dengan ambang batas keamanan (safety stock), nilai aset, dan status barang bergerak.',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Membuat formula status persediaan otomatis (Aman, Reorder, Kritis, Habis).',
      'Menghitung total valuasi aset persediaan di masing-masing gudang cabang.',
      'Membangun tabel daftar pemesanan ulang (Reorder Action List) dinamis.'
    ],
    downloadFile: {
      filename: 'Dataset_04_Warehouse_Stock_640_Rows.xlsx',
      fileType: 'xlsx',
      title: 'Dataset Inventaris Gudang & Stok (640 Baris)',
      size: '45 KB',
      description: 'Dataset SKU gudang lengkap dengan nilai aset persediaan dan parameter reorder point.'
    }
  },
  {
    id: 'ds-marketing',
    title: 'Digital Advertising Multi-Platform Dataset',
    category: 'Marketing',
    rowCount: 1100,
    columns: ['Campaign_Code', 'Date', 'Ad_Network', 'Campaign_Objective', 'Target_Audience', 'Impressions', 'Clicks', 'Cost_Rp', 'Leads_Generated', 'Purchases', 'Revenue_Generated_Rp'],
    description: 'Data performa iklan berbayar harian dari Meta Ads, Google Ads, TikTok Ads, dan LinkedIn Ads dengan tracking konversi dan revenue nyata.',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Menghitung rumus efisiensi iklan: CTR %, CPC, CPA, dan ROAS.',
      'Membuat grafik visualisasi tahapan corong konversi (Funnel Marketing).',
      'Membandingkan performa antar jaringan iklan menggunakan Slicer platform.'
    ],
    downloadFile: {
      filename: 'Dataset_05_Digital_Ads_1100_Rows.xlsx',
      fileType: 'xlsx',
      title: 'Dataset Iklan Digital & ROAS (1.100 Baris)',
      size: '54 KB',
      description: 'Data harian iklan berbayar lintas saluran dengan metrik impresi, klik, biaya, dan omzet teratribusi.'
    }
  },
  {
    id: 'ds-school',
    title: 'Student Academic Grades & Examination Dataset',
    category: 'Education',
    rowCount: 480,
    columns: ['Student_ID', 'Student_Name', 'Grade_Level', 'Classroom', 'Subject_Name', 'Assignment_Avg', 'Midterm_Exam', 'Final_Exam', 'Overall_Score', 'Letter_Grade', 'Passing_Status'],
    description: 'Data rekap nilai akademik 480 siswa sekolah untuk berbagai mata pelajaran (Matematika, Sains, Bahasa, Sosial) dengan rincian tugas dan ujian.',
    difficulty: 'Beginner',
    learningObjectives: [
      'Menghitung nilai akhir berbobot persentase menggunakan formula matematika.',
      'Menentukan predikat huruf (A, B, C, D) dengan fungsi IFS bertingkat.',
      'Membuat chart perbandingan tingkat kelulusan KKM antar ruang kelas.'
    ],
    downloadFile: {
      filename: 'Dataset_06_School_Grades_480_Rows.xlsx',
      fileType: 'xlsx',
      title: 'Dataset Nilai Akademik Sekolah (480 Baris)',
      size: '38 KB',
      description: 'Dataset nilai tugas dan ujian siswa untuk latihan dashboard sekolah dan ranking kelas.'
    }
  },
  {
    id: 'ds-restaurant',
    title: 'Restaurant F&B POS Orders Dataset',
    category: 'Hospitality',
    rowCount: 950,
    columns: ['Order_ID', 'Branch', 'Order_Timestamp', 'Table_Number', 'Server_Name', 'Menu_Item', 'Menu_Category', 'Portion_Qty', 'Item_Price_Rp', 'Food_Cost_Rp', 'Gross_Profit_Rp', 'Dining_Type'],
    description: 'Data pesanan kasir restoran keluarga 3 cabang yang mencakup makanan utama, minuman, dessert, food cost per menu, dan tipe santap (Dine-in vs Ojek Online).',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Menganalisis matriks Menu Engineering (Popularitas vs Margin Keuntungan).',
      'Menghitung rasio Food Cost % dan jam sibuk operasional restoran.',
      'Membuat perbandingan omzet dan rata-rata tagihan meja (AOV) antar cabang.'
    ],
    downloadFile: {
      filename: 'Dataset_07_Restaurant_POS_950_Rows.xlsx',
      fileType: 'xlsx',
      title: 'Dataset Pesanan Restoran & F&B (950 Baris)',
      size: '50 KB',
      description: 'Data pesanan kasir resto untuk latihan Menu Engineering dan analisis biaya makanan.'
    }
  },
  {
    id: 'ds-ecommerce',
    title: 'Omnichannel E-Commerce Orders Dataset',
    category: 'E-Commerce',
    rowCount: 1500,
    columns: ['Order_Number', 'Marketplace_Platform', 'Order_Datetime', 'Customer_Province', 'SKU_Product', 'Product_Category', 'Order_Value_Rp', 'Shipping_Courier', 'Delivery_Days', 'Order_Status', 'Is_Returned'],
    description: 'Data 1.500 transaksi marketplace online (Shopee, Tokopedia, TikTok Shop) dengan status pengiriman kurir, SLA waktu tiba, dan riwayat retur produk.',
    difficulty: 'Advanced',
    learningObjectives: [
      'Menghitung Gross Merchandise Value (GMV) bersih dan rasio pengembalian (Return Rate).',
      'Membuat visualisasi peta persebaran pesanan konsumen di seluruh provinsi.',
      'Menganalisis SLA durasi pengiriman masing-masing ekspedisi kurir.'
    ],
    downloadFile: {
      filename: 'Dataset_08_Ecommerce_Omnichannel_1500_Rows.xlsx',
      fileType: 'xlsx',
      title: 'Dataset Pesanan E-Commerce (1.500 Baris)',
      size: '62 KB',
      description: 'Dataset transaksi marketplace lengkap dengan informasi logistik dan tracking status pesanan.'
    }
  },
  {
    id: 'ds-umkm',
    title: 'UMKM Retail POS Daily Register Dataset',
    category: 'Small Business',
    rowCount: 750,
    columns: ['Receipt_No', 'Date', 'Time_Slot', 'Cashier_Name', 'Product_Name', 'Category', 'Units_Sold', 'Unit_Price_Rp', 'Unit_Cost_Rp', 'Total_Income_Rp', 'Profit_Rp', 'Payment_Method'],
    description: 'Buku kasir harian toko kelontong dan ritel UMKM dengan catatan metode pembayaran tunai vs dompet digital (QRIS) dan laba harian.',
    difficulty: 'Beginner',
    learningObjectives: [
      'Menghitung total omzet harian dan keuntungan bersih kasir toko.',
      'Melihat proporsi pembayaran tunai vs digital QRIS untuk rekonsiliasi bank.',
      'Mengidentifikasi 5 barang paling laris yang wajib selalu tersedia di etalase.'
    ],
    downloadFile: {
      filename: 'Dataset_09_UMKM_Retail_POS_750_Rows.xlsx',
      fileType: 'xlsx',
      title: 'Dataset Kasir Ritel UMKM (750 Baris)',
      size: '41 KB',
      description: 'Data catatan kasir UMKM untuk latihan pembukuan harian dan pelacakan omzet tunai vs QRIS.'
    }
  }
];

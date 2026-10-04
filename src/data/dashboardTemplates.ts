import { DashboardTemplate } from '@/types';

export const DASHBOARD_TEMPLATES: DashboardTemplate[] = [
  {
    id: 'tpl-sales',
    title: 'Executive Sales Dashboard Template',
    category: 'Sales & Commercial',
    preview: '4 Kartu KPI + Combo Tren Bulanan + Bar Ranking Produk + Slicer Wilayah & Kategori',
    description: 'Template dashboard penjualan siap pakai dengan kalkulasi otomatis MoM Growth, Average Order Value (AOV), breakdown wilayah, dan format rupiah rapi.',
    difficulty: 'Intermediate',
    requiredSkills: ['Excel Table', 'PivotTable', 'Slicers', 'Combo Chart', 'SUMIFS'],
    kpis: ['Total Revenue', 'Net Profit Margin %', 'Total Orders', 'Average Order Value (AOV)', 'MoM Growth %'],
    charts: ['Monthly Sales Trend (Line & Column)', 'Product Category Ranking (Bar)', 'Regional Share (Donut)', 'Top 5 Reps Table'],
    downloadFile: {
      filename: 'Template_Executive_Sales_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Template Executive Sales Dashboard Excel',
      size: '48 KB',
      description: 'Template Excel lengkap 5 sheet dengan kalkulasi otomatis, formula MoM Growth, dan Slicer interaktif.'
    }
  },
  {
    id: 'tpl-finance',
    title: 'Corporate Financial P&L Dashboard Template',
    category: 'Finance & Accounting',
    preview: 'Balanced P&L Statement + Variance Actual vs Budget + Opex Breakdown + Waterfall Chart',
    description: 'Template laporan keuangan terstandarisasi untuk monitoring laba rugi, evaluasi pembengkakan biaya operasional (Opex), dan rasio profitabilitas.',
    difficulty: 'Advanced',
    requiredSkills: ['Financial Formulas', 'Variance Analysis', 'Waterfall Chart', 'Conditional Formatting'],
    kpis: ['Gross Revenue', 'EBITDA', 'Net Profit Margin %', 'Budget Variance %', 'Cash Flow Run Rate'],
    charts: ['Actual vs Budget Trajectory', 'Opex by Department (Stacked Bar)', 'Profit Waterfall Chart', 'Variance RAG Table'],
    downloadFile: {
      filename: 'Template_Corporate_Finance_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Template Corporate Financial P&L Dashboard Excel',
      size: '52 KB',
      description: 'Template P&L eksekutif lengkap dengan formula varian anggaran dan grafik waterfall interaktif.'
    }
  },
  {
    id: 'tpl-hr',
    title: 'HR People Analytics Dashboard Template',
    category: 'Human Resources',
    preview: 'Headcount Tracker + Turnover Rate + Demografi Usia/Masa Kerja + Absensi Bulanan',
    description: 'Template analisis SDM untuk memantau retensi talenta, efisiensi penempatan karyawan per divisi, dan evaluasi masa kerja (tenure).',
    difficulty: 'Intermediate',
    requiredSkills: ['DATEDIF', 'PivotTable Grouping', 'Donut Charts', 'Conditional Alert'],
    kpis: ['Total Active Headcount', 'New Hires YTD', 'Annual Turnover Rate %', 'Average Employee Tenure', 'Attendance Rate %'],
    charts: ['Headcount by Department (Bar)', 'Age & Tenure Pyramid (Column)', 'Turnover Trend (Line with SLA)', 'Contract Type Distribution'],
    downloadFile: {
      filename: 'Template_HR_People_Analytics_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Template HR People Analytics Dashboard Excel',
      size: '44 KB',
      description: 'Template pelacak headcount, turnover bulanan, dan demografi tim berbasis Excel Table.'
    }
  },
  {
    id: 'tpl-inventory',
    title: 'Warehouse & Stock Health Dashboard Template',
    category: 'Supply Chain',
    preview: 'Inventory Asset Value + Reorder Alert System + Stock Ageing + Out-of-Stock Counter',
    description: 'Template manajemen persediaan logistik dengan deteksi dini barang menipis (Low Stock Alert) dan valuasi persediaan di berbagai gudang cabang.',
    difficulty: 'Intermediate',
    requiredSkills: ['Nested IF', 'VLOOKUP / XLOOKUP', 'Inventory Formulas', 'Alert Formatting'],
    kpis: ['Total Stock Asset Value', 'Active SKU Count', 'Low Stock Alert Items', 'Out of Stock Count', 'Dead Stock %'],
    charts: ['Stock Health Status (Stacked Column)', 'Inventory Value by Category (Bar)', 'Warehouse Location Share', 'Actionable Reorder List'],
    downloadFile: {
      filename: 'Template_Warehouse_Stock_Health_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Template Warehouse & Stock Health Dashboard Excel',
      size: '46 KB',
      description: 'Template pengawasan stok gudang otomatis dengan sistem peringatan dini barang habis.'
    }
  },
  {
    id: 'tpl-marketing',
    title: 'Digital Marketing & ROAS Dashboard Template',
    category: 'Marketing',
    preview: 'Multi-Channel Ad Spend + Attributed Revenue + Funnel Conversion + ROAS Gauge',
    description: 'Template pelacakan efisiensi iklan berbayar (Meta, Google, TikTok, Email) untuk menghitung ROAS dan biaya per akuisisi pelanggan (CPA).',
    difficulty: 'Intermediate',
    requiredSkills: ['Funnel Visual', 'Dual Axis Combo', 'Calculated Fields', 'Slicers'],
    kpis: ['Total Ad Spend', 'Attributed Revenue', 'Overall Blended ROAS', 'Conversion Rate %', 'Cost Per Acquisition (CPA)'],
    charts: ['ROAS by Ad Platform (Bar)', 'Spend vs Revenue Trajectory (Dual Axis)', 'Full Marketing Funnel', 'Campaign Performance Table'],
    downloadFile: {
      filename: 'Template_Digital_Marketing_ROAS_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Template Digital Marketing & ROAS Dashboard Excel',
      size: '45 KB',
      description: 'Template evaluasi belanja iklan digital lintas saluran dengan rumus ROAS dan CPA otomatis.'
    }
  },
  {
    id: 'tpl-school',
    title: 'School Academic & Performance Dashboard Template',
    category: 'Education',
    preview: 'Rata-rata Nilai Sekolah + KKM Compliance % + Distribusi Predikat + Remedial Tracker',
    description: 'Template evaluasi akademik untuk sekolah dan universitas guna memantau distribusi nilai rapor, tingkat kelulusan, dan ranking siswa.',
    difficulty: 'Beginner',
    requiredSkills: ['AVERAGEIFS', 'IFS / VLOOKUP', 'Conditional Formatting', 'Rank Formula'],
    kpis: ['Average School Grade', 'Passing Rate (% Lulus KKM)', 'Top Honor Students (A)', 'Remedial Required Students'],
    charts: ['Subject Grade Comparison (Bar)', 'Class Average Comparison (Column)', 'Grade Predicate Distribution (Donut)', 'Honor Roll Table'],
    downloadFile: {
      filename: 'Template_School_Academic_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Template School Academic & Grade Dashboard Excel',
      size: '42 KB',
      description: 'Template rekap nilai rapor sekolah otomatis dengan formula predikat huruf dan grafik KKM.'
    }
  },
  {
    id: 'tpl-umkm',
    title: 'UMKM POS & Cash Register Dashboard Template',
    category: 'Small Business',
    preview: 'Omzet Harian + Laba Bersih + Metode Bayar QRIS vs Tunai + Top 10 Produk Laris',
    description: 'Template kasir sederhana namun powerful untuk pelaku UMKM toko, kafe, dan warung kelontong agar laporan keuangan tercatat rapi setiap hari.',
    difficulty: 'Beginner',
    requiredSkills: ['Excel Table', 'SUMIFS', 'Simple Pivot', 'Date Filtering'],
    kpis: ['Omzet Hari Ini', 'Total Laba Kotor', 'Jumlah Transaksi / Struk', 'Rata-rata Belanja (AOV)', 'Setoran Tunai Fisik'],
    charts: ['Tren Omzet Harian (Line)', 'Metode Pembayaran QRIS/Tunai (Donut)', '10 Produk Terlaris (Bar)', 'Jam Ramai Pengunjung'],
    downloadFile: {
      filename: 'Template_UMKM_POS_Register_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Template UMKM POS & Cash Register Dashboard Excel',
      size: '38 KB',
      description: 'Template pembukuan kasir harian UMKM dengan kalkulator laba otomatis dan rekap metode bayar.'
    }
  },
  {
    id: 'tpl-executive',
    title: 'Executive C-Level Board Dashboard Template',
    category: 'Executive & Strategy',
    preview: 'Balanced Scorecard 4 Pilar + RAG Traffic Light Status + Sparklines + Executive Summary',
    description: 'Template dashboard dewan direksi 1 layar berstandar dewan komisaris yang mengintegrasikan metrik Finansial, Pelanggan, Proses Internal, dan SDM.',
    difficulty: 'Advanced',
    requiredSkills: ['Balanced Scorecard', 'Sparklines', 'Icon Sets', 'Executive Layout'],
    kpis: ['Net Revenue YoY Growth %', 'EBITDA Margin %', 'Customer NPS Score', 'Strategic Milestone Completion %', 'Risk Index'],
    charts: ['4-Pillar Scorecard Cards', 'Revenue & Profit Trajectory', 'Traffic Light Strategic Initiatives', 'CEO Executive Commentary'],
    downloadFile: {
      filename: 'Template_Executive_CLevel_Board_Dashboard.xlsx',
      fileType: 'xlsx',
      title: 'Template Executive C-Level Board Dashboard Excel',
      size: '50 KB',
      description: 'Template Balanced Scorecard direksi 1 layar siap presentasi dengan format bersih dan elegan.'
    }
  }
];

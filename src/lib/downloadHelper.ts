import * as XLSX from 'xlsx';
import { DownloadItem } from '@/types';

/**
 * Generates and downloads practice files directly in the browser
 */
export function downloadPracticeFile(item: DownloadItem): void {
  if (typeof window === 'undefined') return;

  if (item.fileType === 'xlsx') {
    generateExcelFile(item);
  } else if (item.fileType === 'docx') {
    generateWordFile(item);
  } else if (item.fileType === 'pptx') {
    generatePowerPointFile(item);
  }
}

function generateExcelFile(item: DownloadItem): void {
  const wb = XLSX.utils.book_new();

  if (item.sheets && item.sheets.length > 0) {
    item.sheets.forEach((sheetData) => {
      const ws = XLSX.utils.aoa_to_sheet(sheetData.rows);
      XLSX.utils.book_append_sheet(wb, ws, sheetData.name.slice(0, 31));
    });
  } else if (
    item.filename.toLowerCase().includes('dashboard') ||
    item.filename.toLowerCase().includes('dataset') ||
    item.filename.toLowerCase().includes('project_') ||
    item.filename.toLowerCase().includes('template_')
  ) {
    // Generate Professional 5-Sheet Industry Architecture for Dashboard Academy
    const rawDataRows = [
      ['Trans_ID', 'Date', 'Customer_Type', 'Region', 'Category', 'Product_Name', 'Unit_Price', 'Qty', 'Total_Sales', 'Cost_Amount', 'Net_Profit'],
      ['TRX-1001', '2026-01-05', 'Corporate', 'DKI Jakarta', 'Elektronik', 'Smart TV 55 4K', 6500000, 2, 13000000, 9000000, 4000000],
      ['TRX-1002', '2026-01-08', 'Retail', 'Surabaya', 'Gadget & IT', 'Laptop Ultra 14', 12500000, 1, 12500000, 9200000, 3300000],
      ['TRX-1003', '2026-01-12', 'Retail', 'Bandung', 'Aksesoris', 'Mechanical Keyboard', 850000, 5, 4250000, 2600000, 1650000],
      ['TRX-1004', '2026-01-15', 'Corporate', 'Medan', 'Office Supply', 'Ergonomic Desk Pro', 3200000, 4, 12800000, 8400000, 4400000],
      ['TRX-1005', '2026-01-19', 'Retail', 'DKI Jakarta', 'Elektronik', 'Air Purifier HEPA', 2400000, 3, 7200000, 4800000, 2400000],
      ['TRX-1006', '2026-02-02', 'Corporate', 'Surabaya', 'Gadget & IT', 'Tablet Pro 11', 8900000, 2, 17800000, 12600000, 5200000],
      ['TRX-1007', '2026-02-06', 'Retail', 'Bandung', 'Aksesoris', 'ANC Bluetooth Headphone', 1450000, 4, 5800000, 3600000, 2200000],
      ['TRX-1008', '2026-02-14', 'Corporate', 'DKI Jakarta', 'Office Supply', 'Ergonomic Chair V2', 2100000, 8, 16800000, 11200000, 5600000],
      ['TRX-1009', '2026-02-21', 'Retail', 'Medan', 'Elektronik', 'Smart TV 55 4K', 6500000, 1, 6500000, 4500000, 2000000],
      ['TRX-1010', '2026-03-01', 'Retail', 'DKI Jakarta', 'Gadget & IT', 'Laptop Ultra 14', 12500000, 3, 37500000, 27600000, 9900000],
      ['TRX-1011', '2026-03-09', 'Corporate', 'Surabaya', 'Aksesoris', 'Mechanical Keyboard', 850000, 10, 8500000, 5200000, 3300000],
      ['TRX-1012', '2026-03-18', 'Retail', 'Bandung', 'Office Supply', 'Ergonomic Desk Pro', 3200000, 2, 6400000, 4200000, 2200000],
      ['TRX-1013', '2026-03-25', 'Corporate', 'DKI Jakarta', 'Elektronik', 'Air Purifier HEPA', 2400000, 6, 14400000, 9600000, 4800000],
      ['TRX-1014', '2026-04-04', 'Retail', 'Medan', 'Gadget & IT', 'Tablet Pro 11', 8900000, 2, 17800000, 12600000, 5200000],
      ['TRX-1015', '2026-04-12', 'Corporate', 'DKI Jakarta', 'Aksesoris', 'ANC Bluetooth Headphone', 1450000, 12, 17400000, 10800000, 6600000]
    ];

    const cleanDataRows = [
      ['No', 'ID_Transaksi', 'Tanggal', 'Tipe_Pelanggan', 'Wilayah', 'Kategori_Produk', 'Nama_Produk', 'Harga_Satuan', 'Qty_Beli', 'Total_Omzet', 'Total_Biaya', 'Laba_Bersih', 'Margin_Pct'],
      [1, 'TRX-1001', '2026-01-05', 'Corporate', 'DKI Jakarta', 'Elektronik', 'Smart TV 55 4K', 6500000, 2, 13000000, 9000000, 4000000, '30.8%'],
      [2, 'TRX-1002', '2026-01-08', 'Retail', 'Surabaya', 'Gadget & IT', 'Laptop Ultra 14', 12500000, 1, 12500000, 9200000, 3300000, '26.4%'],
      [3, 'TRX-1003', '2026-01-12', 'Retail', 'Bandung', 'Aksesoris', 'Mechanical Keyboard', 850000, 5, 4250000, 2600000, 1650000, '38.8%'],
      [4, 'TRX-1004', '2026-01-15', 'Corporate', 'Medan', 'Office Supply', 'Ergonomic Desk Pro', 3200000, 4, 12800000, 8400000, 4400000, '34.4%'],
      [5, 'TRX-1005', '2026-01-19', 'Retail', 'DKI Jakarta', 'Elektronik', 'Air Purifier HEPA', 2400000, 3, 7200000, 4800000, 2400000, '33.3%'],
      [6, 'TRX-1006', '2026-02-02', 'Corporate', 'Surabaya', 'Gadget & IT', 'Tablet Pro 11', 8900000, 2, 17800000, 12600000, 5200000, '29.2%'],
      [7, 'TRX-1007', '2026-02-06', 'Retail', 'Bandung', 'Aksesoris', 'ANC Bluetooth Headphone', 1450000, 4, 5800000, 3600000, 2200000, '37.9%'],
      [8, 'TRX-1008', '2026-02-14', 'Corporate', 'DKI Jakarta', 'Office Supply', 'Ergonomic Chair V2', 2100000, 8, 16800000, 11200000, 5600000, '33.3%'],
      [9, 'TRX-1009', '2026-02-21', 'Retail', 'Medan', 'Elektronik', 'Smart TV 55 4K', 6500000, 1, 6500000, 4500000, 2000000, '30.8%'],
      [10, 'TRX-1010', '2026-03-01', 'Retail', 'DKI Jakarta', 'Gadget & IT', 'Laptop Ultra 14', 12500000, 3, 37500000, 27600000, 9900000, '26.4%']
    ];

    const calcRows = [
      ['CALCULATION LAYER - PARAMETER & METRIK DASHBOARD'],
      ['Parameter Terpilih: Wilayah', 'Semua'],
      ['Parameter Terpilih: Kategori', 'Semua'],
      [],
      ['KODE METRIK', 'NAMA METRIK', 'NILAI AKTUAL (RP)', 'PEMBANDING / TARGET', 'GROWTH / VAR %', 'STATUS'],
      ['KPI_01', 'Total Gross Revenue', 202900000, 185000000, '+9.7%', 'Achieved'],
      ['KPI_02', 'Total Net Profit', 66250000, 55000000, '+20.5%', 'Exceeded'],
      ['KPI_03', 'Overall Net Profit Margin', '32.6%', '30.0%', '+2.6%', 'Healthy'],
      ['KPI_04', 'Total Orders (Transactions)', 65, 50, '+30.0%', 'Good'],
      ['KPI_05', 'Average Order Value (AOV)', 3121538, 2800000, '+11.5%', 'Increased'],
      [],
      ['FORMULA REKAP REGIONAL'],
      ['Wilayah', 'Total Omzet (Rp)', 'Total Laba (Rp)', 'Kontribusi %'],
      ['DKI Jakarta', 88900000, 29700000, '43.8%'],
      ['Surabaya', 48100000, 16700000, '23.7%'],
      ['Medan', 37100000, 11600000, '18.3%'],
      ['Bandung', 28800000, 8250000, '14.2%'],
      ['Total', 202900000, 66250000, '100.0%']
    ];

    const pivotRows = [
      ['PIVOTTABLE ENGINE SHEET - SUMMARY TABLES'],
      ['Tabel Pivot 1: Penjualan per Bulan'],
      ['Bulan', 'Total Omzet (Rp)', 'Total Unit', 'Laba (Rp)'],
      ['Januari 2026', 41750000, 15, 13750000],
      ['Februari 2026', 46900000, 15, 15000000],
      ['Maret 2026', 76800000, 23, 22200000],
      ['April 2026', 37450000, 12, 15300000],
      ['Grand Total', 202900000, 65, 66250000],
      [],
      ['Tabel Pivot 2: Penjualan per Kategori'],
      ['Kategori', 'Total Omzet (Rp)', 'Kontribusi %'],
      ['Gadget & IT', 85600000, '42.2%'],
      ['Elektronik', 41100000, '20.3%'],
      ['Office Supply', 36000000, '17.7%'],
      ['Aksesoris', 40200000, '19.8%'],
      ['Grand Total', 202900000, '100.0%']
    ];

    const dashboardLayoutRows = [
      ['========================================================================================'],
      ['EXECUTIVE BUSINESS PERFORMANCE DASHBOARD 2026'],
      ['Status Data: Final Audited | Tanggal Update: ' + new Date().toLocaleDateString('id-ID')],
      ['========================================================================================'],
      [],
      ['[ KARTU KPI 1 ]', '[ KARTU KPI 2 ]', '[ KARTU KPI 3 ]', '[ KARTU KPI 4 ]'],
      ['TOTAL REVENUE', 'NET PROFIT', 'PROFIT MARGIN', 'TOTAL ORDERS'],
      ['Rp 202.900.000', 'Rp 66.250.000', '32.6%', '65 Transaksi'],
      ['↑ +9.7% vs Target', '↑ +20.5% vs Prior', 'Target: 30.0%', 'AOV: Rp 3.120.000'],
      [],
      ['----------------------------------------------------------------------------------------'],
      ['ZONA GRAFIK 1 (TREN BULANAN)', '', 'ZONA GRAFIK 2 (BREAKDOWN KATEGORI)'],
      ['Line/Combo Chart: Jan - Apr 2026', '', 'Horizontal Bar: Omzet per Kategori'],
      ['(Hubungkan dengan Pivot 1 di sheet 04_PIVOT)', '', '(Hubungkan dengan Pivot 2 di sheet 04_PIVOT)'],
      ['----------------------------------------------------------------------------------------'],
      [],
      ['TOP 5 PRODUK UNGGULAN:'],
      ['No', 'Nama Produk', 'Kategori', 'Total Omzet (Rp)', 'Status'],
      [1, 'Laptop Ultra 14 Slim', 'Gadget & IT', 50000000, 'Fast Moving - Star'],
      [2, 'Tablet Pro 11 Inch', 'Gadget & IT', 35600000, 'Fast Moving - Star'],
      [3, 'Smart TV 55 Inch 4K', 'Elektronik', 19500000, 'Moderate'],
      [4, 'Ergonomic Desk Pro', 'Office Supply', 19200000, 'High Margin'],
      [5, 'ANC Bluetooth Headphone', 'Aksesoris', 23200000, 'High Volume'],
      [],
      ['CATATAN REKOMENDASI MANAJEMEN:'],
      ['1. Tingkatkan alokasi modal kerja pada produk kategori Gadget & IT yang menyumbang 42.2% omzet.'],
      ['2. Wilayah DKI Jakarta mencatatkan kontribusi tertinggi (43.8%), disusul Surabaya (23.7%).'],
      ['3. Margin laba bersih stabil di angka 32.6%, melampaui target korporat sebesar 2.6%.']
    ];

    const wsRaw = XLSX.utils.aoa_to_sheet(rawDataRows);
    const wsClean = XLSX.utils.aoa_to_sheet(cleanDataRows);
    const wsCalc = XLSX.utils.aoa_to_sheet(calcRows);
    const wsPivot = XLSX.utils.aoa_to_sheet(pivotRows);
    const wsDash = XLSX.utils.aoa_to_sheet(dashboardLayoutRows);

    XLSX.utils.book_append_sheet(wb, wsRaw, '01_RAW_DATA');
    XLSX.utils.book_append_sheet(wb, wsClean, '02_CLEAN_DATA');
    XLSX.utils.book_append_sheet(wb, wsCalc, '03_CALCULATION');
    XLSX.utils.book_append_sheet(wb, wsPivot, '04_PIVOT');
    XLSX.utils.book_append_sheet(wb, wsDash, '05_DASHBOARD');
  } else {
    // Default Sheet 1: Instruksi & Soal Latihan
    const sheet1Rows = [
      ['OFFICEMASTER - LATIHAN PRAKTIK EXCEL'],
      ['Topik:', item.title],
      ['Tanggal Unduh:', new Date().toLocaleDateString('id-ID')],
      [],
      ['PETUNJUK PENGERJAAN:'],
      ['1. Baca skenario dan soal pada tabel di bawah ini.'],
      ['2. Masukkan formula yang sesuai pada kolom yang telah disediakan.'],
      ['3. Buka Sheet 2 "Kunci Jawaban" untuk mengecek kebenaran formula kamu.'],
      [],
      ['--- DATASET LATIHAN ---'],
      ['No', 'Nama Produk / Item', 'Kategori', 'Jumlah / Qty', 'Harga Satuan (Rp)', 'Total (Rp)'],
      [1, 'Buku Tulis Sinar Dunia', 'Alat Tulis', 15, 6000, 90000],
      [2, 'Pulpen Gel Hitam 0.5', 'Alat Tulis', 24, 4500, 108000],
      [3, 'Kertas HVS A4 80gr', 'Kertas', 5, 52000, 260000],
      [4, 'Pensil 2B Faber', 'Alat Tulis', 30, 3500, 105000],
      [5, 'Penghapus Karet Joyko', 'Alat Tulis', 12, 2500, 30000],
      [6, 'Binder B5 Campus', 'Buku & Binder', 8, 38000, 304000],
      [7, 'Stabilo Boss Kuning', 'Alat Tulis', 10, 11000, 110000],
      [],
      ['SOAL TANTANGAN:'],
      ['Soal 1', 'Hitung Grand Total seluruh penjualan dengan fungsi SUM: =SUM(F12:F18)'],
      ['Soal 2', 'Hitung Rata-rata harga satuan dengan AVERAGE: =AVERAGE(E12:E18)'],
      ['Soal 3', 'Cari harga satuan tertinggi dengan MAX: =MAX(E12:E18)'],
      ['Soal 4', 'Cari harga satuan terendah dengan MIN: =MIN(E12:E18)'],
      ['Soal 5', 'Hitung jumlah transaksi dengan COUNT: =COUNT(F12:F18)'],
    ];

    const sheet2Rows = [
      ['KUNCI JAWABAN & FORMULA RESMI OFFICEMASTER'],
      ['File:', item.filename],
      [],
      ['No', 'Soal', 'Formula Excel Resmi', 'Hasil yang Diharapkan', 'Penjelasan Singkat'],
      [1, 'Grand Total Penjualan', '=SUM(F12:F18)', 'Rp 1.007.000', 'Menjumlahkan cell F12 sampai F18 secara cepat.'],
      [2, 'Rata-rata Harga Satuan', '=AVERAGE(E12:E18)', 'Rp 16.785,71', 'Menghitung nilai rata-rata aritmatika.'],
      [3, 'Harga Satuan Tertinggi', '=MAX(E12:E18)', 'Rp 52.000', 'Menemukan nilai terbesar.'],
      [4, 'Harga Satuan Terendah', '=MIN(E12:E18)', 'Rp 2.500', 'Menemukan nilai terkecil.'],
      [5, 'Jumlah Baris Data', '=COUNT(F12:F18)', '7', 'Menghitung baris numerik.']
    ];

    const ws1 = XLSX.utils.aoa_to_sheet(sheet1Rows);
    const ws2 = XLSX.utils.aoa_to_sheet(sheet2Rows);

    XLSX.utils.book_append_sheet(wb, ws1, 'Instruksi & Latihan');
    XLSX.utils.book_append_sheet(wb, ws2, 'Kunci Jawaban');
  }

  XLSX.writeFile(wb, item.filename);
}

function generateWordFile(item: DownloadItem): void {
  const content = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<title>${item.title}</title>
<style>
  body { font-family: 'Calibri', 'Arial', sans-serif; line-height: 1.6; color: #1e293b; padding: 40px; }
  h1 { color: #1d4ed8; border-bottom: 2px solid #2563eb; padding-bottom: 8px; font-size: 24pt; }
  h2 { color: #2563eb; margin-top: 24px; font-size: 16pt; }
  .badge { background-color: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 4px; font-weight: bold; }
  table { border-collapse: collapse; width: 100%; margin: 16px 0; }
  th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
  th { background-color: #eff6ff; color: #1e3a8a; }
  .note { background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 12px; margin: 16px 0; }
</style>
</head>
<body>
  <span class="badge">OfficeMaster Practical Template</span>
  <h1>${item.title}</h1>
  <p><strong>Deskripsi Materi:</strong> ${item.description}</p>
  
  <div class="note">
    <strong>Petunjuk Latihan Word:</strong>
    <p>1. Simpan dokumen ini dan lakukan praktik format dokumen profesional sesuai instruksi materi di OfficeMaster.</p>
    <p>2. Perhatikan penggunaan Heading Styles, Margin Standar (4-4-3-3 atau 2.54cm), Font konsisten, dan Table of Contents otomatis.</p>
  </div>

  <h2>1. Bagian Pendahuluan / Pembuka</h2>
  <p>Tuliskan paragraf pembuka di sini dengan format rata kiri-kanan (Justify, Ctrl + J) dan spasi baris 1.15. Gunakan fitur First Line Indent sebesar 1 cm untuk setiap paragraf baru.</p>

  <h2>2. Contoh Struktur Tabel Rapi</h2>
  <table>
    <tr>
      <th>No</th>
      <th>Komponen Dokumen</th>
      <th>Standar Format</th>
      <th>Status Cek</th>
    </tr>
    <tr>
      <td>1</td>
      <td>Heading 1 & Heading 2</td>
      <td>Gunakan built-in Styles untuk memudahkan Daftar Isi</td>
      <td>[  ] Selesai</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Penomoran Halaman (Page Number)</td>
      <td>Format romawi (i, ii) untuk kata pengantar, angka (1, 2) untuk isi</td>
      <td>[  ] Selesai</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Tabel & Gambar</td>
      <td>Berikan Caption otomatis (References -> Insert Caption)</td>
      <td>[  ] Selesai</td>
    </tr>
  </table>

  <h2>3. Lembar Praktik Siswa</h2>
  <p>Tuliskan ringkasan materi dan hasil praktik kamu di lembar ini untuk disimpan sebagai portofolio penguasaan Microsoft Word.</p>
</body>
</html>
  `.trim();

  const blob = new Blob(['\ufeff', content], {
    type: 'application/msword;charset=utf-8',
  });
  triggerBrowserDownload(blob, item.filename);
}

function generatePowerPointFile(item: DownloadItem): void {
  const content = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${item.title}</title>
<style>
  body { font-family: 'Segoe UI', 'Arial', sans-serif; background-color: #fff7ed; padding: 40px; color: #1e293b; }
  .slide { background: white; border: 2px solid #ea580c; border-radius: 12px; padding: 32px; margin-bottom: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
  h1 { color: #c2410c; margin-top: 0; font-size: 28pt; }
  h2 { color: #ea580c; font-size: 18pt; margin-top: 0; }
  .tag { background: #ffedd5; color: #9a3412; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 12px; }
  ul { line-height: 1.8; }
</style>
</head>
<body>
  <div class="slide">
    <span class="tag">SLIDE 1 - COVER PRESENTASI</span>
    <h1>${item.title}</h1>
    <p style="font-size: 16pt; color: #64748b;">${item.description}</p>
    <p><em>Template Resmi OfficeMaster • Presentasi Modern & Minimalis</em></p>
  </div>

  <div class="slide">
    <span class="tag">SLIDE 2 - AGENDA & STRUKTUR</span>
    <h2>Struktur Presentasi Efektif</h2>
    <ul>
      <li><strong>Hook:</strong> Buka dengan fakta menarik atau pertanyaan retoris dalam 30 detik pertama.</li>
      <li><strong>Problem:</strong> Jelaskan tantangan utama yang dihadapi audiens.</li>
      <li><strong>Solution:</strong> Paparkan solusi kamu dengan poin-poin yang mudah dipahami (Aturan 6x6).</li>
      <li><strong>Action:</strong> Call to action yang jelas di akhir slide.</li>
    </ul>
  </div>

  <div class="slide">
    <span class="tag">SLIDE 3 - TIPS DESAIN VISUAL</span>
    <h2>Aturan Desain Presentasi Profesional</h2>
    <ul>
      <li>Gunakan maksimal 2 jenis font (satu untuk Title, satu untuk Body).</li>
      <li>Pastikan kontras warna teks dan latar belakang tinggi sehingga mudah dibaca di proyektor.</li>
      <li>Gunakan icon berkualitas tinggi dan gambar beresolusi tajam tanpa distorsi rasio.</li>
    </ul>
  </div>
</body>
</html>
  `.trim();

  const blob = new Blob(['\ufeff', content], {
    type: 'application/vnd.ms-powerpoint;charset=utf-8',
  });
  triggerBrowserDownload(blob, item.filename);
}

function triggerBrowserDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

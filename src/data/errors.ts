import { ErrorGuide } from '@/types';

export const EXCEL_ERRORS_DATA: ErrorGuide[] = [
  {
    code: '#DIV/0!',
    name: 'Division by Zero Error',
    meaning: 'Error ini terjadi saat rumus Excel mencoba membagi sebuah angka dengan angka nol (0) atau dengan cell kosong.',
    causes: [
      'Cell pembagi (denominator) berisi nilai 0.',
      'Cell pembagi masih kosong / belum diinput nilainya.',
      'Range yang dihitung pada fungsi AVERAGE semuanya bernilai 0 atau tidak ada data numerik sama sekali.',
    ],
    fixSteps: [
      'Pastikan cell pembagi tidak bernilai 0 atau kosong.',
      'Bungkus rumus dengan fungsi IF untuk mengecek apakah pembagi nol: =IF(B2=0, 0, A2/B2).',
      'Gunakan fungsi IFERROR untuk menampilkan alternatif yang lebih bersih: =IFERROR(A2/B2, 0) atau =IFERROR(A2/B2, "-").',
    ],
    badFormula: '=A2/B2 (di mana B2 adalah 0 atau kosong)',
    goodFormula: '=IF(B2=0, 0, A2/B2) atau =IFERROR(A2/B2, 0)',
    tableData: {
      headers: ['Produk', 'Total Omzet (A)', 'Jumlah Unit (B)', 'Harga Rata-rata'],
      rows: [
        ['Buku Tulis', 150000, 25, 6000],
        ['Spidol Papan', 90000, 0, '#DIV/0!'],
        ['Kertas HVS', 260000, 5, 52000],
      ],
    },
    simulatorConfig: {
      initialCells: {
        A1: 'Total Omzet',
        B1: 'Jumlah Unit',
        C1: 'Harga Rata-rata',
        A2: 90000,
        B2: 0,
        C2: '=A2/B2',
      },
      targetFormula: '=IF(B2=0, 0, A2/B2)',
      instructions: 'Perbaiki formula di cell C2 agar tidak memunculkan #DIV/0! jika B2 bernilai 0.',
    },
  },
  {
    code: '#N/A',
    name: 'Value Not Available Error',
    meaning: 'Error ini berarti "Not Available" (Tidak Tersedia). Artinya fungsi pencarian (seperti VLOOKUP, HLOOKUP, XLOOKUP, atau MATCH) tidak dapat menemukan nilai yang kamu cari di dalam tabel referensi.',
    causes: [
      'Nilai yang dicari (lookup value) memang tidak ada di dalam tabel data sumber.',
      'Terdapat perbedaan spasi yang tak kasat mata (misal "Budi " dengan spasi di ujung vs "Budi").',
      'Format data berbeda: satu cell berformat Teks (ada tanda kutip) sedangkan di tabel referensi berformat Number.',
      'Pada VLOOKUP kolom pencarian bukan berada di kolom paling kiri.',
    ],
    fixSteps: [
      'Periksa apakah kata kunci benar-benar ada di tabel sumber data.',
      'Gunakan fungsi TRIM untuk membuang spasi liar: =VLOOKUP(TRIM(A2), Data!A:C, 3, FALSE).',
      'Bungkus dengan IFERROR untuk menampilkan pesan ramah: =IFERROR(VLOOKUP(A2, Data!A:C, 3, FALSE), "Data Tidak Ditemukan").',
      'Atau gunakan fungsi modern XLOOKUP dengan parameter fallback: =XLOOKUP(A2, Data!A:A, Data!C:C, "Tidak Ditemukan").',
    ],
    badFormula: '=VLOOKUP("ID-999", A2:C50, 2, FALSE) (jika ID-999 tidak terdaftar)',
    goodFormula: '=IFERROR(VLOOKUP(A2, A2:C50, 2, FALSE), "Tidak Terdaftar")',
    tableData: {
      headers: ['Kode Barang', 'Nama di Kasir', 'Harga di Master', 'Status'],
      rows: [
        ['BRG-01', 'Buku Tulis', 6000, 'Tersedia'],
        ['BRG-99', 'Item Misterius', '#N/A', 'Tidak Ditemukan di Database'],
      ],
    },
    simulatorConfig: {
      initialCells: {
        A1: 'Kode',
        B1: 'Nama',
        C1: 'Harga',
        A2: 'BRG-99',
        B2: 'Unknown',
        C2: '=IFERROR(VLOOKUP(A2, A5:B10, 2, FALSE), 0)',
      },
      targetFormula: '=IFERROR(VLOOKUP(A2, A5:B10, 2, FALSE), 0)',
      instructions: 'Gunakan IFERROR untuk mengatasi pencarian kode yang tidak terdaftar.',
    },
  },
  {
    code: '#VALUE!',
    name: 'Wrong Data Type Error',
    meaning: 'Excel memunculkan #VALUE! jika ada ketidakcocokan tipe data, paling sering saat kamu mencoba melakukan operasi matematika pada cell yang berisi huruf teks.',
    causes: [
      'Menjumlahkan cell teks dengan operator tambah (+), contoh: =A1+B1 di mana B1 berisi tulisan "Kosong" atau "N/A".',
      'Angka ditulis dengan pemisah manual yang keliru (misal mengetik "Rp 50,000" dengan spasi dan huruf Rp di cell).',
      'Argumen fungsi salah diisi rentang cell di mana seharusnya hanya menerima satu nilai tunggal.',
    ],
    fixSteps: [
      'Gunakan fungsi =SUM(A1, B1) alih-alih operator =A1+B1. Fungsi SUM secara cerdas akan mengabaikan cell teks tanpa menyebabkan error!',
      'Pastikan angka murni numerik tanpa simbol mata uang manual (gunakan Format Cells Currency untuk memunculkan Rp).',
      'Periksa apakah pengaturan regional komputer kamu menggunakan koma (,) atau titik (.) sebagai pemisah desimal.',
    ],
    badFormula: '=A2+B2 (jika B2 berisi tulisan "Belum Bayar")',
    goodFormula: '=SUM(A2, B2) atau =A2 + IF(ISNUMBER(B2), B2, 0)',
    tableData: {
      headers: ['Transaksi', 'Nominal Tagihan', 'Denda', 'Total Bayar'],
      rows: [
        ['TRX-01', 500000, 25000, 525000],
        ['TRX-02', 750000, 'Nihil', '#VALUE!'],
      ],
    },
    simulatorConfig: {
      initialCells: {
        A1: 'Tagihan',
        B1: 'Denda',
        C1: 'Total',
        A2: 750000,
        B2: 'Nihil',
        C2: '=SUM(A2, B2)',
      },
      targetFormula: '=SUM(A2, B2)',
      instructions: 'Ganti rumus penambahan operator "+" dengan fungsi SUM() agar teks diabaikan secara aman.',
    },
  },
  {
    code: '#REF!',
    name: 'Invalid Cell Reference Error',
    meaning: 'Error #REF! (Reference) muncul ketika rumus merujuk ke cell yang sudah tidak ada lagi karena baris atau kolomnya telah terhapus (deleted) dari lembar kerja.',
    causes: [
      'Kamu menghapus (Delete Row / Delete Column) baris atau kolom yang dijadikan acuan perhitungan rumus.',
      'Menyalin rumus dengan referensi relatif ke lokasi yang berada di luar batas lembar kerja (melebihi batas kiri kolom A atau baris 1).',
      'Menggunakan VLOOKUP dengan nomor kolom (col_index_num) yang lebih besar dari jumlah kolom tabel array yang disediakan.',
    ],
    fixSteps: [
      'Jika baru saja menghapus baris, segera tekan Ctrl + Z (Undo) untuk membatalkan penghapusan.',
      'Ganti referensi yang rusak dengan mengklik cell data pengganti yang benar.',
      'Gunakan Excel Table atau fungsi INDEX/XLOOKUP yang lebih kebal terhadap penghapusan dan pergeseran kolom.',
    ],
    badFormula: '=A2 + #REF! (akibat kolom B sebelumnya dihapus)',
    goodFormula: '=A2 + C2 (arahkan kembali ke cell yang valid)',
    tableData: {
      headers: ['Produk', 'Harga Beli', 'Margin (Dihapus)', 'Harga Jual'],
      rows: [
        ['Kemeja Putih', 120000, 'DELETED', '#REF!'],
      ],
    },
    simulatorConfig: {
      initialCells: {
        A1: 'Harga Beli',
        B1: 'Margin',
        C1: 'Harga Jual',
        A2: 120000,
        B2: 30000,
        C2: '=A2+B2',
      },
      targetFormula: '=A2+B2',
      instructions: 'Sambungkan kembali rumus harga jual dengan cell A2 dan B2 yang sah.',
    },
  },
  {
    code: '#NAME?',
    name: 'Unrecognized Name / Typo Error',
    meaning: 'Excel tidak mengenali nama fungsi atau teks yang kamu ketik di dalam rumus. Sembilan puluh sembilan persen kasus ini disebabkan oleh salah ketik (typo).',
    causes: [
      'Salah ketik nama fungsi, misalnya mengetik =SMU(A1:A10) alih-alih =SUM(A1:A10) atau =VLOKUP alih-alih =VLOOKUP.',
      'Lupa memberikan tanda petik ganda ("") pada teks di dalam rumus, contoh: =IF(A1=Lulus, 1, 0) seharusnya =IF(A1="Lulus", 1, 0).',
      'Lupa menulis tanda titik dua (:) pada rentang range, misalnya mengetik =SUM(A1 A10).',
    ],
    fixSteps: [
      'Periksa kembali ejaan nama fungsi. Manfaatkan fitur AutoComplete Excel: saat mengetik huruf awal fungsi, tekan tombol Tab untuk memilihnya.',
      'Pastikan setiap teks di dalam rumus selalu diapit tanda petik ganda ("teks").',
      'Pastikan tanda titik dua (:) terpasang dengan benar pada range cell.',
    ],
    badFormula: '=VLOKUP(A2, B:C, 2, 0) atau =IF(A1=Lulus, 100, 0)',
    goodFormula: '=VLOOKUP(A2, B:C, 2, 0) atau =IF(A1="Lulus", 100, 0)',
    tableData: {
      headers: ['Siswa', 'Nilai', 'Status (Rumus Typo)', 'Status Benar'],
      rows: [
        ['Ahmad', 85, '#NAME?', 'LULUS'],
      ],
    },
    simulatorConfig: {
      initialCells: {
        A1: 'Nilai',
        B1: 'Status',
        A2: 85,
        B2: '=IF(A2>=75, "LULUS", "REMIDI")',
      },
      targetFormula: '=IF(A2>=75, "LULUS", "REMIDI")',
      instructions: 'Beri tanda petik dua pada teks "LULUS" dan "REMIDI" agar tidak memicu #NAME?.',
    },
  },
  {
    code: '#NUM!',
    name: 'Invalid Numeric Calculation Error',
    meaning: 'Error ini terjadi jika rumus kamu menghasilkan angka yang tidak masuk akal secara matematika atau nilainya melebihi kapasitas perhitungan Excel.',
    causes: [
      'Mencoba mencari akar kuadrat dari angka minus: =SQRT(-25). Bilangan negatif tidak memiliki akar real.',
      'Hasil perhitungan terlalu raksasa melebihi batas batas Excel (angka lebih besar dari 1 x 10^308), misal: =1000^1000.',
      'Fungsi iterasi finansial (seperti IRR atau RATE) gagal menemukan solusi konvergen.',
    ],
    fixSteps: [
      'Gunakan fungsi ABS untuk memastikan angka tidak bernilai negatif sebelum ditarik akar: =SQRT(ABS(A1)).',
      'Pastikan angka pangkat berada dalam rentang wajar matematika.',
      'Periksa nilai tebakan (guess) pada fungsi bunga finansial.',
    ],
    badFormula: '=SQRT(-16)',
    goodFormula: '=SQRT(ABS(-16)) -> menghasilkan 4',
    tableData: {
      headers: ['Input Nilai', 'Rumus Salah', 'Rumus Koreksi', 'Hasil'],
      rows: [
        [-16, '=SQRT(-16)', '=SQRT(ABS(-16))', 4],
      ],
    },
    simulatorConfig: {
      initialCells: {
        A1: 'Angka',
        B1: 'Akar Kuadrat',
        A2: 25,
        B2: '=SQRT(A2)',
      },
      targetFormula: '=SQRT(A2)',
      instructions: 'Pastikan angka yang ditarik akar kuadrat bernilai positif.',
    },
  },
  {
    code: '#SPILL!',
    name: 'Spill Range Blocked Error',
    meaning: 'Error ini khas pada Microsoft 365 / Excel modern ketika sebuah formula array dinamis (seperti FILTER, UNIQUE, SEQUENCE, SORT) ingin menuangkan hasilnya ke banyak cell di bawahnya, tetapi jalurnya terhalang oleh cell yang tidak kosong.',
    causes: [
      'Ada teks, angka, spasi, atau format lain yang mengisi salah satu cell di dalam area tumpahan (spill range).',
      'Rumus yang menghasilkan array tak terhingga atau bertabrakan dengan tabel Excel (Dynamic array tidak bisa tumpah di dalam Excel Table resmi).',
    ],
    fixSteps: [
      'Klik pada cell yang memunculkan #SPILL!. Excel akan menampilkan kotak garis putus-putus biru di area tumpahan.',
      'Periksa cell di dalam kotak tersebut, hapus teks atau angka yang menghalangi jalan tumpahan.',
      'Begitu cell penghalang dibersihkan, rumus otomatis langsung tumpah menampilkan seluruh datanya!',
    ],
    badFormula: '=UNIQUE(A2:A100) (tetapi di cell bawahnya sudah terisi ketikan teks manual)',
    goodFormula: '=UNIQUE(A2:A100) (setelah area di bawahnya dikosongkan)',
    tableData: {
      headers: ['Data Asal', 'Rumus Dinamis', 'Penyebab Halangan'],
      rows: [
        ['Jakarta, Surabaya, Jakarta', '=UNIQUE(A2:A4)', 'Cell di bawahnya terisi angka lama'],
      ],
    },
    simulatorConfig: {
      initialCells: {
        A1: 'Kota',
        B1: 'Kota Unik',
        A2: 'Surabaya',
        A3: 'Jakarta',
        A4: 'Surabaya',
        B2: '=UNIQUE(A2:A4)',
      },
      targetFormula: '=UNIQUE(A2:A4)',
      instructions: 'Pastikan ruang di bawah cell B2 kosong agar rumus dinamis bisa tumpah sempurna.',
    },
  },
];

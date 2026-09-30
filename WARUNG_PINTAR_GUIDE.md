# 🏪 WARUNG MAK WI — APLIKASI KASIR & PEMBUKUAN OFFLINE 100%

Aplikasi mobile produksi berbasis **Flutter**, **Dart**, dan **SQLite** yang dirancang khusus untuk mempermudah pemilik warung dan toko kelontong di Indonesia mengelola barang, stok, penjualan, pembelian, serta menghitung laba bersih otomatis tanpa memerlukan internet atau server.

---

## 🌟 FITUR UTAMA

### 1. 📴 100% Offline-First
* Tidak memerlukan koneksi internet, backend server, atau akun cloud.
* Berjalan lancar saat mode pesawat (Airplane Mode), tanpa Wi-Fi, dan tanpa data seluler.
* Seluruh data operasional warung tersimpan aman di database lokal perangkat (**SQLite**).

### 2. 🏠 Beranda & Dashboard Pintar (Data Riil SQLite)
* **Omzet Hari Ini**: Total nilai penjualan riil hari ini.
* **Transaksi**: Jumlah transaksi lunas hari ini.
* **Laba Hari Ini**: Keuntungan bersih riil hari ini (`Harga Jual - Harga Modal`).
* **Produk Menipis**: Peringatan otomatis jika ada barang dengan stok di bawah batas minimum (`stock <= minimum_stock`).
* **Tombol Cepat `+ Transaksi Baru`**: Langsung membuka Kasir untuk memproses pembeli.
* **Aksi Cepat**: Kasir, Tambah Barang, Stok Masuk, Pembelian.
* **Grafik Penjualan 7 Hari**: Visualisasi omzet harian 7 hari terakhir.
* **Produk Terlaris**: Peringkat 5 produk paling laris berdasarkan kuantitas terjual.
* **Aksi Cepat Tambah Stok**: Tombol langsung untuk menambah stok barang yang menipis dari beranda.

### 3. 🛒 Kasir / POS Super Cepat
* Pencarian cepat berdasarkan **Nama Barang**, **Barcode**, dan **Kategori**.
* Penambahan barang ke keranjang hanya dengan 1 sentuhan.
* Indikator stok aman, menipis, atau habis (out of stock dicegah masuk keranjang).
* Keranjang belanja interaktif dengan pengatur kuantitas `[-] 1 [+]` dan hapus barang.
* Bar transaksi sticky bawah dengan jumlah barang, total harga, dan tombol **Bayar**.

### 4. 💵 Pembayaran & Perhitungan Kembalian Otomatis
* Pilihan metode pembayaran: **Tunai** dan **Non-tunai** (Transfer / QRIS).
* Tombol cepat nominal uang: **Uang Pas**, **Rp 10.000**, **Rp 20.000**, **Rp 50.000**, **Rp 100.000**.
* **Perhitungan Kembalian Otomatis**: Menghitung uang kembali seketika saat nominal dibayar dimasukkan.
* **Validasi Uang Kurang**: Jika uang pembayaran kurang, aplikasi menampilkan peringatan merah `Uang pembayaran kurang Rp X.XXX` dan menonaktifkan tombol simpan transaksi.
* **Integritas Transaksi Atomik (SQLite Transaction)**:
  1. Validasi kecukupan stok seluruh barang.
  2. Simpan master transaksi penjualan (`sales`).
  3. Simpan rincian barang dan laba (`sale_details`).
  4. Kurangi stok barang di tabel `products`.
  5. Catat mutasi stok di tabel `stock_movements`.
  6. Jika terjadi kesalahan, otomatis **ROLLBACK** sehingga data tidak pernah korup.

### 5. 🧾 Struk Pembayaran Format Thermal
* Format struk standar printer kasir Bluetooth (58mm / 80mm).
* Menampilkan nama warung, alamat, no telepon, nomor struk (`TRX-YYYYMMDD-XXX`), daftar barang, total belanja, uang dibayar, kembalian, dan ucapan terima kasih.
* Tombol **Salin Teks Struk** untuk dibagikan via WhatsApp, SMS, atau dicetak ke printer termal.

### 6. 📦 Manajemen Master Barang (Produk)
* Filter: **Semua**, **Stok Menipis**, **Stok Habis**.
* Menampilkan nama barang, kategori, satuan, harga modal, harga jual, dan stok saat ini.
* **Perhitungan Margin Keuntungan Langsung**:
  * Menghitung nilai margin (`Rp Jual - Rp Modal`).
  * Menghitung persentase margin laba (`(Jual - Modal) / Modal * 100%`).
  * Peringatan jika harga jual lebih rendah dari harga modal.
* Tambah kategori dan satuan langsung dari form produk.
* Hapus barang aman dengan dialog konfirmasi dan proteksi riwayat transaksi.

### 7. 📊 Manajemen Stok & Riwayat Mutasi
* Penambahan stok masuk, pengurangan stok keluar, dan **Stok Opname**.
* **Alasan Penyesuaian Wajib**:
  * Barang rusak
  * Barang hilang
  * Stok opname
  * Kesalahan input
  * Kadaluarsa (Expired)
  * Pemakaian pribadi
* **Audit Trail Lengkap**: Setiap perpindahan stok tercatat di `stock_movements` dengan informasi jumlah sebelum dan sesudah mutasi.

### 8. 🚚 Pembelian & Kulakan dari Supplier
* Pencatatan barang kulakan masuk dari supplier / agen grosir.
* Otomatis menambah stok barang di database secara atomik.
* Pengelolaan data supplier: Nama, Nomor HP, Alamat, dan Catatan.

### 9. 📈 Laporan Keuangan Lengkap
* Filter periode: **Hari ini**, **Kemarin**, **7 Hari Terakhir**, **Bulan ini**, dan **Pilih Tanggal Bebas (Date Range)**.
* Ringkasan KPI Finansial:
  * **Total Penjualan (Omzet)**
  * **Total Modal (HPP)**
  * **Total Laba Bersih**
  * **Total Pembelian (Kulakan)**
  * **Jumlah Transaksi & Rata-rata Nilai Belanja**
* Rincian omzet harian.
* Riwayat seluruh transaksi penjualan dengan detail laba per item.
* Peringkat produk terlaris dalam periode yang dipilih.

### 10. 💾 Backup & Restore Data Mandiri
* **Cadangkan Data (Backup)**: Ekspor seluruh database (10 tabel) ke file JSON lokal atau salin ke clipboard.
* **Pulihkan Data (Restore)**: Memulihkan database dari teks/file backup dengan validasi skema dan konfirmasi keamanan.
* **Muat Data Sampel**: Opsi untuk memuat data awal produk warung Indonesia (Indomie, Aqua, Minyak, Telur, Kopi, dsb).
* **Reset Transaksi**: Opsi membersihkan riwayat transaksi dengan tetap mempertahankan katalog barang.

---

## 🏗️ ARSITEKTUR KODE (CLEAN ARCHITECTURE)

```
lib/
├── main.dart                          # Entry point aplikasi & MultiProvider setup
├── core/
│   ├── constants/
│   │   ├── app_colors.dart            # Palet warna Material 3 Warung Green & Amber
│   │   ├── app_constants.dart         # Nama db, satuan standar, alasan mutasi stok
│   │   └── app_strings.dart           # String Bahasa Indonesia konsisten
│   ├── database/
│   │   ├── app_database.dart          # Helper SQLite sqflite dengan foreign keys ON
│   │   └── seed_data.dart             # Data awal produk warung Indonesia & utilitas reset
│   ├── theme/
│   │   └── app_theme.dart             # Tema Material 3 Light & Dark mode
│   └── utils/
│       ├── currency_formatter.dart    # Format Rupiah (Rp 10.000) & parse input
│       └── date_formatter.dart        # Format tanggal & waktu Bahasa Indonesia
├── models/
│   ├── category_model.dart            # Model kategori barang
│   ├── unit_model.dart                # Model satuan barang (pcs, kg, bungkus, dsb)
│   ├── product_model.dart             # Model produk dengan getter margin & stok tipis
│   ├── supplier_model.dart            # Model supplier pemasok
│   ├── purchase_model.dart            # Model transaksi pembelian / kulakan
│   ├── purchase_detail_model.dart     # Rincian barang pembelian
│   ├── sale_model.dart                # Model transaksi penjualan kasir
│   ├── sale_detail_model.dart         # Rincian barang penjualan dengan laba per item
│   ├── stock_movement_model.dart      # Audit trail mutasi stok barang
│   ├── cart_item_model.dart           # Item keranjang kasir
│   └── dashboard_summary_model.dart   # Model agregasi statistik beranda & laporan
├── repositories/
│   ├── product_repository.dart        # CRUD produk & pencarian cepat
│   ├── category_repository.dart       # Pengelolaan kategori
│   ├── unit_repository.dart           # Pengelolaan satuan
│   ├── supplier_repository.dart       # Pengelolaan supplier
│   ├── purchase_repository.dart       # Transaksi pembelian & penambahan stok atomik
│   ├── sale_repository.dart           # Transaksi penjualan, pengurangan stok & hitung laba
│   ├── stock_repository.dart          # Penyesuaian stok opname & pencatatan mutasi
│   ├── report_repository.dart         # Kueri agregasi omzet, laba, dan produk terlaris
│   └── settings_repository.dart       # Profil warung & informasi ukuran database
├── services/
│   ├── backup_restore_service.dart    # Ekspor dan impor JSON database lokal
│   └── receipt_service.dart           # Generator teks struk kasir termal 58mm/80mm
├── providers/
│   ├── app_provider.dart              # State navigasi bawah & tema
│   ├── cart_provider.dart             # State keranjang belanja kasir & batas stok
│   ├── product_provider.dart          # State produk, kategori, dan filter
│   ├── sale_provider.dart             # State transaksi kasir & riwayat penjualan
│   ├── purchase_provider.dart         # State pembelian barang
│   ├── stock_provider.dart            # State mutasi stok
│   ├── report_provider.dart           # State laporan & filter tanggal
│   └── settings_provider.dart         # State profil warung & backup
├── screens/
│   ├── main_navigation_screen.dart    # 5 Tab Navigasi Bawah (Beranda, Kasir, Barang, Laporan, Pengaturan)
│   ├── dashboard/
│   │   ├── dashboard_screen.dart      # Beranda ringkasan omzet, laba, grafik, produk menipis
│   │   └── widgets/
│   │       ├── low_stock_section.dart # Widget daftar stok menipis
│   │       ├── sales_chart_widget.dart# Widget grafik penjualan 7 hari
│   │       └── top_products_section.dart # Widget produk terlaris
│   ├── cashier/
│   │   ├── cashier_screen.dart        # Kasir POS cepat & drawer keranjang
│   │   ├── payment_modal.dart         # Modal input bayar, preset uang, dan hitung kembalian
│   │   ├── payment_success_dialog.dart# Dialog sukses transaksi lunas
│   │   └── receipt_preview_dialog.dart# Preview struk belanja kertas termal
│   ├── products/
│   │   ├── products_screen.dart       # Daftar master barang, pencarian & filter
│   │   └── add_edit_product_screen.dart# Form tambah/edit barang dengan live margin %
│   ├── stock/
│   │   ├── stock_management_screen.dart # Layar kelola stok per barang
│   │   ├── stock_adjustment_dialog.dart# Dialog penyesuaian stok masuk/keluar/opname
│   │   └── stock_movement_history_screen.dart # Riwayat audit mutasi stok
│   ├── purchases/
│   │   ├── purchases_screen.dart      # Daftar riwayat pembelian barang
│   │   ├── add_purchase_screen.dart   # Form catat pembelian & stok masuk
│   │   └── suppliers_screen.dart      # Kelola data supplier pemasok
│   ├── reports/
│   │   ├── reports_screen.dart        # Laporan keuangan, riwayat transaksi & ranking produk
│   │   └── transaction_detail_screen.dart # Rincian per invoice dan cetak struk
│   └── settings/
│       ├── settings_screen.dart       # Pengaturan warung, info db, dan maintenance
│       ├── store_profile_screen.dart  # Form profil toko (nama, alamat, telp, kaki struk)
│       └── backup_restore_screen.dart # Halaman cadangkan & pulihkan database
└── widgets/
    ├── app_card.dart                  # Kartu rounded responsif
    ├── primary_button.dart            # Tombol utama dengan indikator loading
    ├── secondary_button.dart          # Tombol outlined
    ├── money_text.dart                # Teks angka Rupiah otomatis
    ├── stat_card.dart                 # Kartu metrik beranda & laporan
    ├── empty_state.dart               # Tampilan ramah saat data kosong
    ├── low_stock_badge.dart           # Badge status stok (Aman / Menipis / Habis)
    ├── custom_search_bar.dart         # Kolom pencarian dengan tombol hapus & scan
    ├── quantity_stepper.dart          # Pengatur jumlah kuantitas [-] 1 [+]
    └── confirmation_dialog.dart       # Dialog konfirmasi aksi penting
```

---

## 🚀 CARA MENJALANKAN APLIKASI DI ANDROID

### 1. Prasyarat
* Pasang **Flutter SDK** (versi >= 3.0.0).
* Pasang **Android Studio** atau **VS Code** dengan ekstensi Flutter & Dart.

### 2. Mengambil Dependensi
Jalankan perintah berikut di terminal:
```bash
flutter pub get
```

### 3. Menjalankan di Perangkat / Emulator Android
Hubungkan ponsel Android fisik via USB (dengan USB Debugging aktif) atau jalankan Android Emulator:
```bash
flutter run
```

### 4. Menjalankan Unit Tests
```bash
flutter test
```

### 5. Membangun File APK Android Siap Pakai
Untuk membuat file installer APK rilis yang dapat langsung dipasang di HP warung:
```bash
flutter build apk --release
```
File APK akan berada di: `build/app/outputs/flutter-apk/app-release.apk`.

---

## 📋 DAFTAR SKEMA DATABASE SQLITE

1. **`products`**: `id`, `name`, `category_id`, `unit_id`, `barcode`, `purchase_price`, `selling_price`, `stock`, `minimum_stock`, `created_at`, `updated_at`.
2. **`categories`**: `id`, `name`.
3. **`units`**: `id`, `name`.
4. **`suppliers`**: `id`, `name`, `phone`, `address`, `notes`, `created_at`.
5. **`purchases`**: `id`, `invoice_number`, `supplier_id`, `date`, `total`, `notes`, `created_at`.
6. **`purchase_details`**: `id`, `purchase_id`, `product_id`, `quantity`, `purchase_price`, `subtotal`.
7. **`sales`**: `id`, `invoice_number`, `date`, `total`, `paid`, `change`, `payment_method`, `created_at`.
8. **`sale_details`**: `id`, `sale_id`, `product_id`, `quantity`, `purchase_price`, `selling_price`, `subtotal`, `profit`.
9. **`stock_movements`**: `id`, `product_id`, `type`, `quantity`, `before_stock`, `after_stock`, `reason`, `reference_id`, `created_at`.
10. **`settings`**: `key`, `value`.

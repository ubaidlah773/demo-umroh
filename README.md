# Safara Umroh — Website Demo Profesional Biro Travel Umroh & Haji

> **“Teman Perjalanan Menuju Tanah Suci”**  
> *Website Demo Premium Siap Jual untuk Kebutuhan Sales & Prospek Biro Travel Umroh*

---

## 🌟 Tentang Proyek

Website ini adalah **demo website komersial premium** yang dirancang khusus untuk memprospek biro perjalanan ibadah Umroh dan Haji yang belum memiliki website atau ingin memperbarui tampilan website mereka agar lebih modern, terpercaya, dan menghasilkan konversi tinggi ke WhatsApp.

### 💎 Karakteristik & Filosofi Desain:
- **Brand Demo Terpercaya**: Menggunakan identitas fiktif yang elegan: **“Safara Umroh”** dengan tagline *“Teman Perjalanan Menuju Tanah Suci”*.
- **Aman & Transparan**: Tidak mengklaim nomor izin PPIU palsu, tidak mengarang angka pencapaian jamaah fiktif, serta tidak mencantumkan data kemitraan hotel/maskapai tanpa verifikasi. Seluruh data belum diketahui disajikan dalam format placeholder terstruktur `[Harga]`, `[Tanggal]`, `[Nomor Izin / Legalitas Travel]`.
- **Desain Islami Modern & Elegan**: Menggunakan palet *Deep Emerald Green*, *Warm Gold Accent*, *Ivory/Cream*, serta tipografi mewah (*Playfair Display* + *Plus Jakarta Sans*) dengan banyak whitespace dan tanpa ornamen berlebihan.
- **Conversion-First (Fokus WhatsApp)**: Setiap paket, jadwal, tombol navigasi, floating button, dan modal konsultasi terhubung langsung dengan generator pesan WhatsApp otomatis yang sopan dan terstruktur.
- **Konfigurasi Terpusat (`src/config/siteConfig.ts`)**: Saat Anda mendapatkan klien travel Umroh nyata, Anda **hanya perlu mengganti 1 file** tanpa perlu coding ulang!

---

## 🚀 Fitur & Komponen Utama

1. **Sticky Navbar Translucent**:
   - Logo kompas & tipografi serif emas SAFARA UMROH & HAJI.
   - Badge halus `DEMO WEBSITE`.
   - Navigasi lengkap (Beranda, Paket Umroh, Jadwal, Fasilitas, Alur, Tentang Kami, Galeri, FAQ, Kontak).
   - Drawer navigasi mobile yang ramah sentuhan.

2. **Hero Section Mewah**:
   - Single semantic H1: *“Langkahkan Niat. Kami Bantu Persiapkan Perjalanannya.”*
   - Subheadline ramah & meyakinkan.
   - Dual CTA: *“Lihat Paket Umroh”* dan *“Konsultasi WhatsApp”*.
   - Microcopy kepercayaan: *“Informasi transparan • Konsultasi mudah • Pendampingan jamaah”*.
   - Visual premium Ka'bah & Masjidil Haram dengan highlight floating card interaktif.

3. **Trust Strip (4 Indikator Nyata)**:
   - *Paket Jelas*, *Jadwal Terstruktur*, *Informasi Transparan*, dan *Admin Responsif*.

4. **Section Paket Umroh (3 Pilihan Utama)**:
   - **Paket Umroh Reguler** (Standar fasilitas nyaman)
   - **Paket Umroh Premium** (Badge: *REKOMENDASI* - Bintang 5 Ring 1)
   - **Paket Umroh Ramadhan** (Badge: *SPESIAL RAMADHAN* - I'tikaf Lailatul Qadar)
   - Tombol *“Lihat Detail”* membuka **Modal Detail Interaktif**:
     - Itinerary harian terstruktur
     - Fasilitas termasuk (Included) & belum termasuk (Excluded)
     - Persyaratan dokumen pendaftaran
     - Tombol langsung tanya paket via WhatsApp

5. **Section Kenapa Safara (Why Us)**:
   - 4 kartu keunggulan bernomor (*01 Informasi Paket Jelas, 02 Pendampingan Sebelum Keberangkatan, 03 Informasi Jadwal Terstruktur, 04 Konsultasi Mudah via WhatsApp*).

6. **Section Jadwal Keberangkatan**:
   - Filter tab kategori paket.
   - Tabel responsif desktop & kartu list mobile.
   - Status ketersediaan kursi (*Tersedia, Seat Terbatas, Segera Penuh*).
   - CTA WhatsApp: *“Dapatkan Jadwal Terbaru”*.

7. **Section Alur Pendaftaran (5 Langkah)**:
   - *01 Konsultasi* ➔ *02 Pilih Paket* ➔ *03 Lengkapi Data* ➔ *04 Konfirmasi* ➔ *05 Persiapan Keberangkatan*.

8. **Section Fasilitas**:
   - Grid 6 fasilitas utama: *Tiket Pesawat, Hotel Akomodasi, Transportasi Bus, Konsumsi Nusantara 3x, Pembimbing Muthawwif, Perlengkapan Lengkap*.
   - Disertai disclaimer demo.

9. **Section Galeri Dokumentasi**:
   - Foto kurasi bertema Makkah, Madinah, Ibadah, dan Transportasi.
   - Efek hover zoom, overlay caption, dan **Lightbox modal** saat foto diklik.

10. **Section Testimoni Demo**:
    - Format ulasan calon jamaah (*Peserta Demo 01, 02, 03*) dengan bintang emas dan quote.

11. **Section Tentang Kami & Legalitas**:
    - Penjelasan konsep *“Pendampingan Dimulai Sejak Konsultasi”*.
    - Section Informasi Legalitas dengan placeholder `[Nomor Izin / Legalitas Travel]` dan catatan verifikasi resmi.

12. **Section FAQ**:
    - 7 pertanyaan umum dengan accordion interaktif.

13. **Section CTA Besar**:
    - Background deep emerald dengan aksen gold elegan dan ajakan konsultasi.

14. **Floating WhatsApp Button**:
    - Tombol WhatsApp mengapung di kanan bawah dengan animasi pulse dan tooltip *“Chat Admin”*.

15. **Modal Konsultasi Cepat (Quick Inquiry Form)**:
    - Memungkinkan calon jamaah memilih paket, perkiraan bulan, jumlah orang, dan otomatis memformat pesan WhatsApp yang rapi saat dikirim.

---

## 🛠️ Panduan Kustomisasi untuk Klien Travel Nyata

Ketika Anda menjual website ini ke biro travel tertentu, cukup buka dan sesuaikan file:
📂 `src/config/siteConfig.ts`

```typescript
export const siteConfig = {
  name: "Nama Travel Klien",            // Ganti nama travel asli
  shortName: "NamaKlien",
  tagline: "Tagline Travel Klien",
  category: "UMROH & HAJI",
  badge: "DEMO WEBSITE",                // Hapus atau ganti sesuai kebutuhan
  whatsapp: "6281234567890",            // Ganti dengan nomor WhatsApp aktif klien
  email: "info@travelklien.com",
  address: "Alamat kantor fisik klien",
  city: "Kota Klien",
  // ...
};
```

Seluruh link WhatsApp otomatis mengarah ke nomor klien dengan pesan pre-filled yang sudah diformat rapi!

---

## 💻 Cara Menjalankan Project

### 1. Menjalankan di Komputer Lokal (Development):
```bash
npm run dev
```
Buka browser di: [http://localhost:3000](http://localhost:3000)

### 2. Membangun Versi Produksi (Production Build):
```bash
npm run build
npm run start
```

### 3. Deploy ke Vercel (Gratis & Cepat):
```bash
npx vercel --prod
```
Atau hubungkan repository GitHub Anda ke dashboard [Vercel](https://vercel.com) untuk automatic deployment.

---

## 📱 Responsivitas Teruji
- **Desktop**: 1440px, 1280px, 1024px
- **Tablet**: 768px
- **Mobile**: 430px, 390px, 375px (iPhone & Android modern)
- Zero horizontal overflow, fast LCP, accessible keyboard & ARIA attributes.

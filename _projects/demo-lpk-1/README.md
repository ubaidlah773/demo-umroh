# Website Demo Resmi LPK NusaSkill
> **Pusat Pelatihan Kerja & Pengembangan Kompetensi**  
> *Template & Solusi Website Profesional Berstandar Industri untuk Lembaga Pelatihan Kerja*

---

## 🌟 Tentang Proyek

Website ini merupakan **website demo dan template universal** untuk **LPK NusaSkill** (Pusat Pelatihan Kerja & Pengembangan Kompetensi). Dirancang dengan prinsip modern web: clean design, mobile-first, aksesibilitas tinggi, serta arsitektur kode modular berbasis komponen yang mudah di-rebranding (white-label) untuk berbagai lembaga pelatihan kerja.

### 🎯 Karakteristik Website:
- **Identitas Demo Universal**: Menggunakan brand netral **LPK NusaSkill** sehingga siap dipresentasikan kepada calon klien pemilik LPK mana pun tanpa terikat pada bisnis tertentu.
- **Bukan Template AI / Generik**: Menggunakan tipografi berwibawa (*Plus Jakarta Sans*), palet warna institusi pendidikan formal (*Deep Navy & Crimson Red*), dan tata letak yang bersih dan tenang.
- **Transparansi & Akurasi Konten**: Angka rekam jejak menggunakan placeholder `[XX]` yang terstruktur tanpa klaim sepihak. Testimoni ditandai sebagai `Konten Demo`.
- **Pusat Konfigurasi Tunggal (`siteConfig.ts`)**: Seluruh data lembaga (nama, alamat, WhatsApp, email, program, durasi, jadwal, biaya, FAQ) dapat disesuaikan dari **satu file saja**.

---

## 🛠️ Panduan Kustomisasi (Untuk Klien LPK Baru)

Cukup buka dan edit file:
📂 `src/config/siteConfig.ts`

```typescript
// 1. Ganti Nomor WhatsApp Resmi Klien (Format: 628xxxxxxxxxx)
export const WHATSAPP_NUMBER: string = "6281234567890";

// 2. Ganti Nama Lembaga & Tagline
export const siteConfig = {
  institution: {
    fullName: "LPK NamaKlien",
    shortName: "NamaKlien",
    tagline: "Pusat Pelatihan Kerja & Pengembangan Kompetensi",
    subTitle: "Lembaga Pelatihan Kerja",
    // ...
  },
  
  // 3. Masukkan Data Statistik Riil Klien
  stats: [
    { value: "1.200+", label: "Peserta" },
    { value: "5", label: "Program" },
    { value: "48+", label: "Kegiatan" },
    { value: "15", label: "Instruktur" },
  ],
  
  // 4. Sesuaikan Program, Biaya, & Jadwal
  programs: [
    // ...
  ]
};
```

---

## 💻 Menjalankan Project

### 1. Mode Development:
```bash
npm run dev
```
Buka browser di: [http://localhost:3000](http://localhost:3000)

### 2. Build Produksi:
```bash
npm run build
```

### 3. Deploy ke Vercel:
```bash
vercel --name demo-lpk --prod
```

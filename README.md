# AdminTools

**AdminTools** – sebuah aplikasi web SaaS yang menggabungkan beragam utilitas administrasi digital dalam satu tempat. Semua proses utama dijalankan **di browser** (lokal‑first) untuk privasi, kecepatan, dan tidak memerlukan instalasi.

---

## 🎯 Visi & Prinsip
- **Function > Clarity > Speed > Decoration** – UI bersih, kontrol intuitif, tanpa efek visual berlebihan.
- **Browser‑first** – PDF, gambar, QR, barcode, dan konversi file diproses di client menggunakan library JavaScript modern.
- **Privasi** – file tidak dikirim ke server kecuali fitur secara eksplisit memerlukan backend.
- **Extensible** – arsitektur modular memungkinkan penambahan tool fase berikutnya tanpa refactor besar.

---

## 📚 Teknologi (sudah terinstal)
- **Next.js 14 (App Router)** – React 18, file‑based routing, SSR untuk SEO, eksport statik.
- **TypeScript** – static typing.
- **Tailwind CSS 3** – utility‑first styling, palette warna khusus.
- **Lucide React** – koleksi ikon ringan.
- **pdf‑lib**, **pdfjs‑dist**, **browser‑image‑compression**, **JSZip**, **qrcode**, **JsBarcode**, **Tesseract.js**, **xlsx**, **zod** – perpustakaan inti (semua dapat dijalankan di browser).
- **PostCSS / Autoprefixer** – pemrosesan CSS.

---

## 📁 Struktur Proyek (Phase 1)
```
admin-tools/
├─ public/                 # aset statik (favicon, logo, dll.)
├─ src/
│  ├─ app/                 # Next.js App Router entry
│  │   ├─ layout.tsx       # Layout global (Navbar, Footer)
│  │   └─ page.tsx         # Homepage (hero, search, popular tools)
│  ├─ pages/               # halaman tradisional (untuk tooling legacy)
│  │   ├─ pdf/
│  │   │   ├─ merge.tsx    # Merge PDF (Phase 1)
│  │   │   ├─ split.tsx    # Split PDF
│  │   │   └─ compress.tsx # Compress PDF
│  │   ├─ image/
│  │   │   ├─ compress.tsx # Image Compressor
│  │   │   └─ resize.tsx   # Image Resizer
│  │   ├─ qr/
│  │   │   └─ index.tsx    # QR Code Generator
│  │   ├─ barcode/
│  │   │   └─ index.tsx    # Barcode Generator
│  │   ├─ utils/
│  │   │   ├─ case-converter.tsx # Text Case Converter
│  │   │   └─ word-counter.tsx   # Word / Character Counter
│  │   └─ _app.tsx          # (fallback, tidak dipakai ketika app router aktif)
│  ├─ components/          # komponen UI yang dapat dipakai ulang
│  │   ├─ Navbar.tsx
│  │   ├─ Footer.tsx
│  │   ├─ ToolCard.tsx
│  │   └─ UploadArea.tsx
│  └─ styles/
│      └─ globals.css      # import Tailwind base utilities
├─ tailwind.config.js      # palette warna sesuai spesifikasi
├─ postcss.config.js
├─ tsconfig.json
└─ package.json            # sudah ada
``` 

---

## 🚀 Memulai
```bash
# 1. Install dependencies (jika baru clone)
npm install

# 2. Jalankan development server
npm run dev   # buka http://localhost:3000
```

Semua tool fase 1 sudah dapat diuji di localhost.

---

## 🎨 Design Tokens (Tailwind)
`tailwind.config.js` menambahkan warna yang Anda definisikan:
```js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        background: "#F8FAFC",
        text: "#111827",
        secondary: "#6B7280",
        border: "#E5E7EB",
        success: "#16A34A",
        warning: "#F59E0B",
        danger: "#DC2626",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
```

---

## 📖 Langkah Selanjutnya
1. **Konfirmasi stack** – apakah Next.js + TypeScript sudah cocok, atau ingin alternatif (Vite, Remix, dll.).
2. **SEO** – saya dapat menambahkan meta‑tag dinamis untuk setiap tool page serta sitemap.
3. **Deploy** – Vercel, Netlify, atau static export ke bucket. Pilihan mana yang Anda inginkan?
4. **Konten & Dokumentasi** – deskripsi tiap tool, FAQ, dan halaman “Why AdminTools?”.

Silakan beri masukan atau arahkan ke bagian mana yang ingin Anda selesaikan dulu.

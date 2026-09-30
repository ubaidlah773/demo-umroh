# RESTO KAYU MANIS — TUBAN
### Official Premium Restaurant Website

**Website Resmi Resto Kayu Manis — Tuban**  
*Seafood & Family Restaurant • Elegant Tropical Indonesian Dining*

📍 **Alamat**: Jl. Basuki Rachmad No.215–217, Ronggomulyo, Kec. Tuban, Kabupaten Tuban, Jawa Timur 62315  
📞 **Telepon**: (0356) 331114  
⏰ **Jam Operasional**: Buka setiap hari, tutup sekitar pukul 22.00 WIB  
💰 **Kisaran Harga**: Rp50.000 – Rp125.000 / orang  
⭐ **Google Maps Rating**: 4.4 / 5 dari 1.943+ ulasan nyata  

---

## 🌟 Brand Positioning & Concept

> **"A Taste of Tuban, Made for Every Gathering."**  
> Menikmati hidangan Nusantara dan seafood pilihan dalam suasana nyaman bersama orang-orang terdekat.

Resto Kayu Manis diposisikan secara konsisten dan autentik sebagai tempat makan keluarga, rekan kerja, gathering, dan rombongan wisata:
- **Seafood Segar & Masakan Nusantara**: Ikan bakar, gurami asam manis, gurame madu legit, rajungan kare khas Tuban, ayam telur asin, sop buntut, dan aneka tumis sayuran.
- **Fasilitas Nyaman**: Ruangan ber-AC sejuk, area santap lapang, meja berkapasitas besar, dan akses parkir luas untuk mobil pribadi maupun bus rombongan.
- **Lokasi Strategis**: Berada di jalan utama Basuki Rachmad, satu kawasan dengan Hotel Fave Tuban.

---

## 🎨 Visual Direction & Design System

Sesuai spesifikasi resmi di [`DESIGN.md`](./DESIGN.md):
- **Concept**: *Elegant Tropical Indonesian Dining* (bukan coffee shop, bukan template SaaS generik).
- **Color System**:
  - **Primary**: Deep Forest Green (`#131E16`), Dark Wood Brown (`#2A1C15`), Warm Charcoal (`#0F1110`)
  - **Secondary**: Warm Ivory (`#FAF7F2`), Sand (`#E2D7C3`), Natural Cream
  - **Accent**: Muted Gold (`#C5A059`), Terracotta / Warm Copper (`#BD5E38`)
- **Typography**:
  - **Headings**: Editorial Serif (*Playfair Display*)
  - **Body**: Highly legible Sans-Serif (*Plus Jakarta Sans*)
- **Animation System**: Framer Motion dengan kurva `cubic-bezier(0.22, 1, 0.36, 1)`, durasi halus (0.6s–1.0s), tanpa animasi berlebihan.

---

## 🗺️ User Journey & Storytelling Architecture

### 1. Home Page (`/`)
1. **Hero Section**: Full-screen cinematic dining photography, slow zoom animation, dark gradient overlay, headline *"GOOD FOOD. GREAT GATHERINGS."*, badge lokasi 📍 Tuban, Jawa Timur, CTA *Explore Our Menu* dan *Reserve a Table*.
2. **Quick Info Bar**: 4 pilar ringkas (*SEAFOOD - Fresh & flavorful*, *FAMILY DINING - Comfortable space*, *SPACIOUS PARKING - Easy access*, *OPEN DAILY - Until 22.00*).
3. **About Section**: Layout asimetris 60% Foto Suasana Luas vs 40% Narasi, heading *"MORE THAN A MEAL - A PLACE TO GATHER"*, dan 3 statistik terverifikasi (*1,900+ Guest Reviews*, *4.4 Google Rating*, *Daily Dining Experience*).
4. **Signature Menu**: Section *"FROM OUR KITCHEN"*, 9 menu unggulan resmi (*Mie Goreng Seafood*, *Gurami Asam Manis*, *Gurame Madu Legit*, *Rajungan Kare*, *Ayam Goreng Saus Telor Asin*, *Sop Buntut*, *Sate Ayam Bumbu Kacang*, *Ca Brokoli*, *Ca Kangkung*) tanpa harga fiktif.
5. **Featured Dish**: Spotlight sinematik asimetris *"THE TASTE OF THE SEA"* untuk hidangan legendaris **Gurami Asam Manis**.
6. **Dining Experience**: 4 kartu pengalaman bersantap (*Family Dining*, *Business Dining*, *Group Dining*, *Special Occasions*) dengan efek hover zoom, reveal, dan link reservasi instan.
7. **Restaurant Features**: Section *"EVERYTHING YOU NEED FOR A COMFORTABLE MEAL"* menampilkan 5 fasilitas utama dengan ikon minimal (*Spacious Dining Area*, *Air-Conditioned Rooms*, *Large Parking Area*, *Family Friendly*, *Strategic Location*).
8. **Editorial Gallery Preview**: Masonry layout dengan kategori foto dan fullscreen Lightbox interaktif.
9. **Customer Reviews**: Section *"HEARD FROM OUR GUESTS"*, skor 4.4/5 dari 1,943 ulasan nyata Google Maps, 3 kutipan asli pelanggan, dan tautan langsung ke Google Maps.
10. **Interactive Location**: Section *"FIND US IN TUBAN"*, alamat lengkap Jl. Basuki Rachmad No.215–217, telepon (0356) 331114, jam buka, Google Maps embed, dan CTA *Get Directions*.
11. **Reservation CTA**: Section *"YOUR TABLE AWAITS"*, latar belakang elegan, tombol *Reserve a Table* (WhatsApp modal) dan *Call (0356) 331114*.
12. **Footer**: Identitas resmi, kutipan *"Good Food. Good Company."*, tautan navigasi, kontak, dan hak cipta © 2026 Resto Kayu Manis.

### 2. Menu Page (`/menu`)
- Kategori Filter: *All, Seafood, Fish, Chicken, Rice & Noodles, Vegetables, Soup, Snacks, Beverages*.
- Search Bar real-time untuk mencari masakan atau bahan.
- Card Menu: Foto makanan, nama, kategori, deskripsi rasa, badge status.
- CTA Utama: **Ask About Today's Menu** yang langsung membuka WhatsApp resmi Resto Kayu Manis.

### 3. Gallery Page (`/gallery`)
- Kategori foto: *All, Food, Restaurant, Family, Events, Interior*.
- Editorial Masonry Grid dengan variasi rasio foto *featured*, *tall*, *wide*, dan *normal*.
- Fullscreen Lightbox dengan navigasi escape key dan penutup overlay.

### 4. Events & Gatherings Page (`/events`)
- Paket jamuan resmi: *Gathering & Acara Keluarga*, *Jamuan Rekan Kerja & Business Dinner*, *Rombongan Wisata & Transit Perjalanan*.
- Informasi kapasitas, fasilitas penataan meja, dan konsultasi cepat via WhatsApp atau telepon.

### 5. Contact Page (`/contact`)
- Layout 2 Kolom:
  - **Kiri**: Informasi alamat lengkap, landmark bersebelahan Hotel Fave Tuban, nomor telepon (0356) 331114, jam buka, dan tombol reservasi meja.
  - **Kanan**: Google Maps interaktif dan tombol *Get Directions*.

### 6. Mobile Experience
- Navigasi Drawer layar penuh dengan transisi halus.
- Sticky Floating Action Bar di bagian bawah layar: tombol **Reserve**, **Call** `(0356) 331114`, dan **Menu**.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS dengan custom design tokens Resto Kayu Manis
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **SEO & Structured Data**:
  - JSON-LD `@type: ["Restaurant", "LocalBusiness"]`
  - OpenGraph & Twitter Card metadata
  - Dynamic `sitemap.xml` & `robots.txt`
  - Canonical URL support

---

## 🚀 Menjalankan Project

### Development Server
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

### Production Build & Test
```bash
npm run build
npm run start
```

---
*Dokumentasi ini disusun sebagai acuan teknis resmi implementasi website Resto Kayu Manis Tuban.*

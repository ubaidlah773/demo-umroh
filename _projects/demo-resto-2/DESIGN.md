# D’SULTAN CAFE TUBAN — DESIGN SYSTEM & ARCHITECTURE SPECIFICATION
**Version:** 1.0.0  
**Concept:** Modern Tropical Dining & Entertainment Experience  
**Brand Identity:** Luxury but Approachable • Family & Youth Friendly • Live Music & Culinary Destination  
**Location:** Jl. Basuki Rachmad No.282, Ronggomulyo, Kec. Tuban, Kabupaten Tuban, Jawa Timur 62315  
**Contact:** 0813-3230-3128 | Instagram: @dsultan.id | Google Rating: 4.5 / 5 (699+ reviews)  

---

## 1. BRAND ESSENCE & CORE CONCEPT

### Core Manifesto
> *"Ini bukan cuma tempat ngopi. Ini tempat untuk menikmati makanan, suasana, dan pengalaman."*

D’Sultan Cafe Tuban memadukan kehangatan budaya santai pesisir Jawa Timur dengan estetika **Modern Tropical Dining & Entertainment**. Tempat ini dirancang untuk melayani berbagai momen hidup:
- **Dining**: Santap siang dan malam bersama keluarga dengan masakan autentik premium (Nasi Iga Bakar, Steak Sirloin, Nasi Campur Bali, Nasi Goreng Sultan).
- **Social & Youth**: Nongkrong sore, racikan kopi artisan, gelato, dan live acoustic performances.
- **Meeting & Private Dining**: Ruang private yang tenang untuk rapat bisnis, arisan, maupun perayaan ulang tahun.
- **Weekend Nightlife**: Hiburan musik live yang menghidupkan malam di Tuban dalam atmosfer berkelas dan ramah keluarga.

### Brand Tone & Persona
- **Warm & Welcoming**: Hangat, tidak mengintimidasi (bukan fine dining kaku).
- **Cinematic & Editorial**: Mengutamakan fotografi hidangan dan arsitektur cafe yang menggugah selera.
- **Refined & Contemporary**: Garis desain bersih, tipografi anggun, sentuhan emas hangat (warm gold) dan arang pekat (deep charcoal).

---

## 2. COLOR PALETTE SYSTEM

Warna dirancang untuk menciptakan kedalaman visual, kontras tinggi yang nyaman bagi mata, serta kesan mewah berselera tinggi tanpa gradien norak atau elemen neon.

### 2.1 Primary Colors
| Color Name | Hex Code | Tailwind Token | Application & Role |
| :--- | :--- | :--- | :--- |
| **Deep Charcoal** | `#0D0E11` | `bg-charcoal-950` | Primary site background, hero base, dark sections |
| **Charcoal Surface** | `#15171C` | `bg-charcoal-900` | Card containers, navigation background, modal backgrounds |
| **Charcoal Elevated** | `#1D2027` | `bg-charcoal-800` | Hover states, elevated surfaces, dropdown menus |
| **Warm Ivory** | `#F9F6F0` | `text-ivory-100` | Primary high-contrast text, headings on dark backdrops |
| **Muted Ivory** | `#E5DEC9` | `text-ivory-300` | Secondary copy, subheadings, metadata labels |
| **Dark Olive / Forest** | `#1C241E` | `bg-olive-900` | Organic tropical accent surfaces, experience badges |

### 2.2 Accent Colors
| Color Name | Hex Code | Tailwind Token | Application & Role |
| :--- | :--- | :--- | :--- |
| **Warm Gold (Primary Accent)** | `#C5A880` | `text-gold-400` / `bg-gold-500` | Primary CTA buttons, key highlights, star ratings, borders |
| **Antique Gold Hover** | `#D8BC95` | `bg-gold-400` | Button hover state, active links |
| **Soft Sand / Beige** | `#EDE6DB` | `text-sand-200` | Supporting text, badge backgrounds |
| **Coffee Roast Brown** | `#34271F` | `bg-coffee-900` | Subtle warm overlays, beverage accents |
| **WhatsApp Green** | `#25D366` | `bg-emerald-500` | Floating booking action & direct chat indicator |

### 2.3 Borders & Glassmorphism
- `border-gold-subtle`: `rgba(197, 168, 128, 0.2)`
- `border-white-faint`: `rgba(255, 255, 255, 0.08)`
- `glass-surface`: `background: rgba(21, 23, 28, 0.82); backdrop-filter: blur(14px);`

---

## 3. TYPOGRAPHY SYSTEM

Kombinasi klasik elegan dan fungsionalitas modern:

### 3.1 Display & Heading: Serif
- **Family:** `Playfair Display` & `Cormorant Garamond`
- **Characteristics:** Anggun, berwibawa, mencerminkan nama "D'Sultan" yang mulia namun ramah.
- **Hierarchy:**
  - `Hero H1`: `font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]`
  - `Section H2`: `font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-normal text-ivory-100`
  - `Card H3 / Menu Title`: `font-serif text-xl sm:text-2xl font-medium text-ivory-100`
  - `Label / Kicker`: `font-sans text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold`

### 3.2 Body & UI: Sans-Serif
- **Family:** `Plus Jakarta Sans` / `Inter`
- **Characteristics:** Sangat terbaca di layar mobile, modern, netral, geometric rhythm seimbang.
- **Hierarchy:**
  - `Body Lead`: `text-base sm:text-lg text-ivory-300 leading-relaxed font-light`
  - `Body Regular`: `text-sm sm:text-base text-ivory-400 leading-normal`
  - `Meta / Footnote`: `text-xs text-ivory-500`
  - `Button CTA`: `text-sm font-semibold tracking-wide uppercase`

---

## 4. SPACING, GRID & LAYOUT ARCHITECTURE

### 4.1 Grid Foundation
- Container max-width: `1280px` (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`)
- Vertical section spacing: `py-16 sm:py-24 lg:py-32`
- Gap standard: `gap-6` (cards), `gap-12` to `gap-16` (content split)

### 4.2 Editorial Asymmetry
- Menghindari tata letak kartu yang monoton (ala template SaaS).
- Menggunakan rasio 60/40 (Image besar vs Story text) pada *Welcome Section*.
- Menggunakan komposisi majalah kuliner pada *Featured Dish Section (Nasi Iga Bakar)* dengan detail bahan dan fotografi fokus.

---

## 5. COMPONENT SYSTEM SPECIFICATIONS

### 5.1 Navigation Bar (`Navbar.tsx`)
- **State Top**: Transparan sempurna di atas hero dengan teks putih bersih dan logo beraksen emas.
- **State Scrolled**: Mengubah background menjadi `rgba(15, 16, 20, 0.92)` dengan `backdrop-blur-md` dan garis bawah tipis `rgba(197, 168, 128, 0.15)`.
- **Links**: Home, Menu, Experience, Gallery, Events, About, Contact.
- **CTA**: "Reserve a Table" tombol emas dengan hover glow halus.
- **Mobile Menu**: Fullscreen overlay dengan animasi stagger item menu, alamat cepat, dan tombol direct booking WhatsApp.

### 5.2 Quick Information Bar (`QuickInfoBar.tsx`)
Horizontal ribbon tepat di bawah hero:
1. **Open Daily**: Until 22:00
2. **Price Range**: Rp25K – Rp100K / person
3. **Location**: Ronggomulyo, Tuban
4. **Reservation**: 0813-3230-3128
*Responsive: 4-column bar pada desktop, 2x2 grid rapi pada tablet & mobile.*

### 5.3 Experience Section (`ExperienceGrid.tsx`)
5 Fasilitas & Suasana D'Sultan:
1. **Indoor Dining** — Ruang ber-AC yang sejuk, nyaman untuk santap siang, makan malam keluarga, maupun working space santai.
2. **Outdoor Area** — Area terbuka rimbun bergaya tropis modern, sempurna untuk menikmati semilir angin sore dan malam hari di Tuban.
3. **Live Music & Entertainment** — Panggung pertunjukan akustik & band mingguan yang menghadirkan energi positif setiap malam.
4. **Private Room** — Ruang privat eksklusif untuk rapat kerja, presentasi bisnis, perayaan keluarga, atau gathering komunitas.
5. **Spacious Parking** — Area parkir kendaraan roda 4 dan roda 2 yang luas, aman, dan mudah diakses di jalan utama Basuki Rachmad.

### 5.4 Menu Experience (`MenuSection.tsx` & `/menu` page)
- Kategori lengkap: **All, Main Course, Rice Specialties, Steak, Coffee, Non Coffee, Dessert, Snacks**.
- Setiap item menyajikan: Nama menu, deskripsi bahan/rasa, kisaran harga aktual (Rp25k - Rp95k), badge rekomendasi (*Chef's Pick / Popular*), dan foto kualitas tinggi.
- Tab filter interaktif dengan transisi halus tanpa reload.
- Quick search bar untuk mempermudah pencarian makanan/minuman favorit.

### 5.5 Featured Food Showcase (`FeaturedFood.tsx`)
- Spotlight khusus untuk mahakarya D'Sultan: **Nasi IGA Bakar**.
- Fotografi close-up menggugah selera dengan bumbu karamelisasi gurih dan sambal khas Tuban.
- Quick booking button: "Pesan Meja untuk Makan Malam".

### 5.6 Live Music / Events Section (`EventsSection.tsx` & `/events` page)
- Menampilkan jadwal acara mingguan (*Acoustic Sessions, Weekend Live Band, Special Guest Performances*).
- Informasi: Tanggal, Waktu (e.g. 19:30 - 21:45 WIB), Nama Penampil, Genre musik, Area stage.
- Instagram CTA integrasi agar pengunjung selalu update jadwal terbaru.

### 5.7 Gallery & Lightbox (`Gallery.tsx` & `/gallery` page)
- Kategori foto: All, Food, Drinks, Interior, Outdoor, Events.
- Masonry grid layout dengan aspect ratio dinamis.
- Interaksi klik membuka **Fullscreen Lightbox** dengan navigasi Next/Prev, judul, dan kategori.

### 5.8 Social Proof & Testimonials (`Testimonials.tsx`)
- Skor rating Google Maps nyata: **4.5 / 5** dari **699+ ulasan**.
- Kutipan ulasan asli: kenyamanan tempat, keramahan pelayanan, kemudahan parkir, dan kualitas live music.
- Tombol direct link ke ulasan Google Maps cafe.

### 5.9 Interactive Location & Hours (`LocationSection.tsx`)
- Google Maps embed terintegrasi presisi untuk Jl. Basuki Rachmad No.282.
- Quick action: "Buka Google Maps / Get Directions".
- Detail jam buka harian dan kontak telpon langsung `tel:+6281332303128`.

### 5.10 Direct Reservation Modal & WhatsApp Engine (`ReservationModal.tsx`)
- Formulir interaktif elegan:
  - Nama Pemesan
  - Nomor WhatsApp
  - Tanggal & Waktu Kunjungan
  - Jumlah Orang (Pax)
  - Pilihan Area Meja: *Indoor AC, Outdoor Garden, Live Music View, Private VIP Room*
  - Catatan Khusus (e.g. Ulang Tahun, Meja Bayi)
- Menghasilkan tautan WhatsApp resmi otomatis dengan format pesan rapi:
  ```
  Halo D’Sultan Cafe Tuban, saya ingin melakukan reservasi meja:
  - Nama: [Nama]
  - Tanggal: [Tanggal]
  - Jam: [Jam]
  - Jumlah: [Pax] Orang
  - Area: [Indoor / Outdoor / Private Room]
  - Catatan: [Catatan]
  Mohon informasi ketersediaan tempat. Terima kasih!
  ```

### 5.11 Floating Mobile Actions (`MobileFloatingActions.tsx`)
- Bottom-docked subtle bar pada layar mobile (di bawah 768px):
  - Tombol 1: **WhatsApp Reservasi** (Aksen Emas/Emerald)
  - Tombol 2: **Hubungi Kami (Call)** `tel:+6281332303128`
  - Tombol 3: **Lihat Menu** (Shortcut cepat)
- Didesain ringkas dan tidak menutupi konten penting website.

---

## 6. MOTION & ANIMATION GUIDELINES

Sesuai arahan teknis:
- **Style:** Fade up, fade in, slow cinematic zoom, stagger container children.
- **Easing Curve:** `[0.22, 1, 0.36, 1]` (cubic-bezier mewah dan organik).
- **Duration:** 0.6s – 0.8s untuk content reveals, 0.3s untuk interaksi hover.
- **Rules:**
  - Dilarang efek memantul berlebihan (spring bouncing).
  - Dilarang rotasi 3D berputar-putar yang membingungkan pengunjung.
  - Memastikan *Zero Layout Shift* (CLS < 0.05).
  - Menghormati `prefers-reduced-motion`.

---

## 7. SEO & STRUCTURED DATA (JSON-LD)

Menggunakan standar schema Google untuk **Restaurant** dan **LocalBusiness**:
- `@type`: `Restaurant` / `CafeOrCoffeeShop`
- `name`: D'Sultan Cafe Tuban
- `address`: Jl. Basuki Rachmad No.282, Ronggomulyo, Kec. Tuban, Kabupaten Tuban, Jawa Timur 62315
- `telephone`: +6281332303128
- `priceRange`: Rp25.000 - Rp100.000
- `servesCuisine`: Indonesian, Coffee, Western, Desserts
- `aggregateRating`: 4.5 based on 699 reviews
- `openingHoursSpecification`: Mo-Su 10:00-22:00

Target kata kunci utama Tuban:
* D'Sultan Cafe Tuban, Cafe Tuban, Resto Tuban, Cafe di Tuban, Tempat makan Tuban, Cafe live music Tuban, Restaurant Tuban, Cafe outdoor Tuban, Cafe keluarga Tuban.

---

## 8. UX CHECKLIST (1–2 CLICK PRINCIPLE)
1. **Temukan Menu**: 1 klik dari Navbar desktop/mobile atau Hero button.
2. **Lihat Lokasi & Rute**: 1 klik via quick bar atau section lokasi.
3. **Reservasi Meja via WhatsApp**: 1 klik via tombol "Reserve a Table" yang membuka modal atau langsung menghubungkan ke WhatsApp dengan template otomatis.
4. **Cek Jadwal Live Music**: 1 klik menuju tab Events.

---
*Dokumen ini merupakan referensi tunggal kebenaran (Source of Truth) untuk implementasi arsitektur dan antarmuka web D'Sultan Cafe Tuban.*

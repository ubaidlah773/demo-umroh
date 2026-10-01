# ASSETS.md — Complete Asset Inventory & Choreography Plan
# Cinematic Traditional Javanese Wedding Invitation Experience

---

## 1. INVENTORY OF ALL REQUIRED ASSETS

| Asset File & Path | Cultural & Visual Role | Format | Native Dimensions | Animated Properties | Target Layer & Z-Index | Fallback / CSS Alternative |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`assets/cover/cover_background_scene.jpg`** | Latar aula pendopo utama (Desktop 16:9) | JPG | 1920 × 1080 | Subtle camera breathing zoom (`scale: 1.0 -> 1.025`) | Layer 0 (z-0) | CSS Radial Gradient Maroon & Candle Warmth |
| **`assets/cover/cover_bg_mobile.jpg`** | Latar aula pendopo vertikal (Mobile 9:16) | JPG | 1080 × 1920 | Slow vertical pan & scale (`scale: 1.0 -> 1.03`) | Layer 0 (z-0) | Dark Keraton Radial Glow |
| **`assets/cover/cover_gate_left.png`** | Daun pintu ukir jati kiri (Desktop) | PNG-24 (Transparan) | 960 × 1080 | `translateX(-100%)`, 3D rotate perspective swing | Layer 20 (z-20) | CSS Teak Wood Shutter with gold borders |
| **`assets/cover/cover_gate_right.png`** | Daun pintu ukir jati kanan (Desktop) | PNG-24 (Transparan) | 960 × 1080 | `translateX(100%)`, 3D rotate perspective swing | Layer 20 (z-20) | CSS Teak Wood Shutter with gold borders |
| **`assets/cover/cover_gate_left_mobile.png`** | Daun pintu ukir jati kiri vertikal (Mobile) | PNG-24 (Transparan) | 540 × 1920 | `translateX(-100%)` | Layer 20 (z-20) | CSS Vertical Teak Wood Shutter |
| **`assets/cover/cover_gate_right_mobile.png`** | Daun pintu ukir jati kanan vertikal (Mobile) | PNG-24 (Transparan) | 540 × 1920 | `translateX(100%)` | Layer 20 (z-20) | CSS Vertical Teak Wood Shutter |
| **`assets/cover/cover_button_plaque_only.png`** | Plakat kuningan antik penutup gerbang | PNG-24 (Transparan) | 438 × 130 | Fade & scale out on click (`opacity: 0, scale: 0.9`) | Layer 30 (z-30) | Gold Glassmorphic Plaque with Brass Border |
| **`assets/intro_cinematic/cinematic_bg_landscape.jpg`** | Pemandangan senja Bromo pegunungan Jawa Timur (Desktop) | JPG | 1920 × 1080 | Forward camera dolly zoom (`scale: 1.08 -> 1.20`) | Layer 0 (z-0) | Golden Twilight Sunset Gradient |
| **`assets/intro_cinematic/cinematic_bg_mobile.jpg`** | Pemandangan senja pegunungan vertikal (Mobile) | JPG | 1080 × 1920 | Vertical camera push (`scale: 1.05 -> 1.15`) | Layer 0 (z-0) | Golden Twilight Sunset Gradient |
| **`assets/intro_cinematic/cinematic_joglo.png`** | Siluet atap pendopo tumpangsari kayu jati kuno | PNG-24 (Transparan) | 1200 × 600 | Fade-in & upward floating scale (`scale: 0.95 -> 1.05`) | Layer 15 (z-15) | SVG Siluet Joglo Wayang |
| **`assets/intro_cinematic/groom_intro_cutout.png`** | Siluet foto mempelai pria (tanpa background) di intro kiri | PNG-24 (Transparan) | 600 × 900 | Horizontal slide & fade-in (`translateX(-40px -> 0), opacity: 0 -> 1`) | Layer 25 (z-25) | Groom Portrait with circular gold frame |
| **`assets/intro_cinematic/bride_intro_cutout.png`** | Siluet foto mempelai putri (tanpa background) di intro kanan | PNG-24 (Transparan) | 600 × 900 | Horizontal slide & fade-in (`translateX(40px -> 0), opacity: 0 -> 1`) | Layer 25 (z-25) | Bride Portrait with circular gold frame |
| **`assets/intro_cinematic/cinematic_bird.png`** | Siluet burung kuntul/sriti terbang melintasi senja | PNG-24 (Transparan) | 180 × 120 | Parallax linear traversal (`translateX: 120vw -> -40vw`) | Layer 10 (z-10) | SVG Bird Path Animation |
| **`assets/intro_cinematic/cinematic_firefly.png`** | Pendar kunang-kunang malam keemasan (*candikala*) | PNG-24 (Transparan) | 48 × 48 | Sinusoidal floating (`sin(t)` drift) + pulse opacity | Layer 12 (z-12) | CSS Box-shadow Radial Particle |
| **`assets/intro/groom.png`** | Foto profil resmi mempelai pria (Section Profil Mempelai) | PNG / JPG | 800 × 1100 | Stagger reveal on scroll (`opacity: 0 -> 1, translateY: 30px -> 0`) | Layer 20 (z-20) | Fallback Anonymous Groom Illustration |
| **`assets/intro/bride.png`** | Foto profil resmi mempelai putri (Section Profil Mempelai) | PNG / JPG | 800 × 1100 | Stagger reveal on scroll (`opacity: 0 -> 1, translateY: 30px -> 0`) | Layer 20 (z-20) | Fallback Anonymous Bride Illustration |
| **`assets/intro/couple_pelaminan.jpg`** | Foto bersanding di pelaminan adat (Hero Desktop) | JPG | 1600 × 1000 | Parallax scroll reveal with gold frame border | Layer 20 (z-20) | Ceremonial Pelaminan Illustration |
| **`assets/intro/couple_portrait_mobile.jpg`** | Foto bersanding potret vertikal (Hero Mobile) | JPG | 1000 × 1400 | Parallax vertical reveal | Layer 20 (z-20) | Ceremonial Pelaminan Illustration |
| **`assets/intro/pendopo.png`** | Ilustrasi pendopo agung soko guru jati | PNG-24 (Transparan) | 900 × 600 | Subtle scale on hover | Layer 20 (z-20) | SVG Pendopo Icon |
| **`assets/intro/guestbook_jawa.png`** | Ilustrasi buku tamu kayu jati kuno berukir | PNG-24 (Transparan) | 600 × 600 | Micro-rotation on scroll | Layer 20 (z-20) | SVG Ledger Icon |
| **`assets/intro/gift_box_jawa.png`** | Kotak kado kayu jati berhias pita emas | PNG-24 (Transparan) | 500 × 500 | Floating micro-bounce | Layer 20 (z-20) | SVG Gift Box Icon |
| **`assets/intro/location_marker_jawa.png`** | Pin penanda lokasi berornamen ukiran emas keraton | PNG-24 (Transparan) | 400 × 400 | Pulse & bounce on map focus | Layer 20 (z-20) | SVG Map Pin Icon |
| **`assets/batik/batik_kawung_seamless.svg`** | Tekstur latar belakang motif batik Kawung & Truntum | SVG (Vector) | Seamless tile | Fixed background attachment, 18% opacity, mix-blend-multiply | Canvas background (z-0) | Pure Warm Parchment `#FBF6EE` |

---

## 2. PROCEDURAL ACOUSTIC ASSETS (WEB AUDIO API)

No heavy external MP3 downloads are needed for core ceremonial audio effects:

| Sound Identifier | Synthesizer Architecture | Harmonic Frequencies | Duration | Cultural Function |
| :--- | :--- | :--- | :--- | :--- |
| **`Gong Ageng`** | Low-frequency sine wave + triangle subharmonic + exponential gain decay | 65.4 Hz fundamental (C2), 130.8 Hz (C3), 196 Hz (G3) | 5.5s resonance | Bunyi sakral saat gerbang pembuka terbuka |
| **`Gamelan Pelog Bell`** | Dual frequency FM synthesis with ceramic resonance filter | Laras Pelog (Nem: 440Hz, Barang: 494Hz, Bem: 262Hz) | 2.8s chime | Mengiringi langkah intro sinematik |
| **`Wood Creak (Derit Pintu)`**| Filtered brown noise burst with modulation sweep | Bandpass filter 120Hz – 600Hz | 0.85s friction | Gesekan fisik daun pintu kayu jati |
| **`Paper Flip (Buka Surat)`**| High-pass white noise with rapid envelope attack | 1200Hz – 8000Hz | 0.25s rustle | Transisi saat membuka rincian ulem |

---

## 3. ASSET OPTIMIZATION STANDARDS

1. **Resolution & Density**:
   - Desktop Hero & Backgrounds: Max width 1920px, quality 82% WebP / JPEG (~180KB – 260KB).
   - Mobile Backgrounds: Max width 1080px, quality 80% WebP / JPEG (~110KB – 160KB).
   - Transparent PNG Cutouts: Run through pngquant / oxipng compression to eliminate alpha channel artifacts while staying under 150KB.
2. **Responsive Delivery**:
   - Components select `cinematic_bg_mobile.jpg` when `viewport.width < 768px`, bypassing desktop landscape textures entirely on mobile networks.
3. **Admin Upload Compression**:
   - The integrated `compressImageFile()` utility handles all client uploads via HTML5 canvas, downscaling oversized camera raw photos (e.g. 4000×3000px 12MB) to 1200px max edge at 82% quality, ensuring local storage remains resilient and under 250KB per photo.

# Wedding Invitation Design System
# Cinematic Javanese Wedding Invitation (Pawiwahan Ageng Adat Jawa Timuran)

---

## 1. Design Vision

The primary design vision is:
> **"A cinematic Javanese wedding ceremony transformed into an interactive digital experience."**

The experience conveys:
- **Atmospheric Solemnity (*Khidmat & Ayem-Tentrem*)**: Entering a sacred traditional pendopo during the golden hour (*candikala*) with incense mist, antique brass lanterns, and warm flickering candlelights.
- **Architectural Prestige**: Solid teakwood pillars (*Soko Guru*), tiered ceiling joinery (*Tumpangsari*), and monumental carved entrance gates (*Regol Kencana*).
- **Cultural Honesty**: Authentic Javanese ceremonial etiquette (*Tata Krama Inggil*), honoring lineage (*Nasab Ageng & Sesepuh*), sacred wedding verses, and authentic traditional motifs (Kawung, Truntum, Gunungan Wayang).
- **Cinematic Pacing**: Multi-plane depth, smooth camera dolly zooms, physical gate inertia, and staged typography reveals where motion serves the narrative rather than competing with it.

---

## 2. Reference Website Analysis

Analysis of the reference interaction at `https://oldweddingproject.vercel.app/`:

### Visual & Structural Components
1. **Interactive Opening Regol (Cover)**: Symmetrical carved teakwood gate with a central antique brass plaque button (*"Buka Undangan"*).
2. **Physical Gate Parting**: Simultaneous bilateral panel slide with 3D perspective swing, volumetric golden god rays, and procedural Web Audio **Gong Ageng** resonance.
3. **10-Second Continuous Cinematic Intro**:
   - Depth Layer 1: Candikala dusk landscape of Mount Bromo footlands under an amber-magenta sunset.
   - Depth Layer 2: Swallows gliding across the sky in horizontal parallax.
   - Depth Layer 3: Ambient fireflies (*kunang-kunang*) oscillating with organic sinusoidal drift.
   - Depth Layer 4: Carved Joglo pavilion silhouette with glowing central chandelier.
   - Depth Layer 5: Standing couple cutouts flanking the stage (Satriya Groom left, Kusumaning Asmara Bride right).
   - Depth Layer 6: Center-stage grand typography hierarchy (Bismillah, Assalamu'alaikum, Couple Names, Date, Venue, Guest Name Badge).
4. **Dissolve Transition**: 0.8s blur-out and scale-up transitioning into the 10 ceremonial sections of the main invitation.
5. **Main Invitation Page**: Rich narrative sections (Hero, Serat Ulem, Profil Mempelai, Silsilah, Acara & Countdown, Lokasi & Peta, Narahubung, Tanda Kasih, Buku Tamu & RSVP, Panutup).
6. **Management Suite**: Integrated Admin suite for real-time visitor logging, RSVP tracking, personalized WhatsApp link generation, and in-place content/photo editing.

---

## 3. Javanese Visual Language

| Reference Motif | Javanese Cultural Equivalent | Symbolic Meaning & Philosophy |
| :--- | :--- | :--- |
| Modern entrance arch | **Regol Kencana (Kori Ageng Jati)** | Sacred boundary dividing worldly life from holy matrimony (*wiwitaning balewisnu*). |
| Modern floral bouquet | **Ronce Melati Tibo Dodo & Janur Kuning** | Purity of noble intention (*aruming asma*) and divine beacon of light (*nur hidayah*). |
| Geometric polygon symbol | **Gunungan / Kayon Wayang Kulit** | The cosmic tree of life, harmony of nature, and dawn of a blessed beginning. |
| Ambient particle glow | **Kunang-kunang Malam & Kelopak Melati** | Serenity of dusk (*candikala*) and fragrance of royal ceremony. |
| Contemporary card frames | **Ukiran Lung-lungan Jepara & Prada Emas** | Boundless growth of affection, resilience, and flourishing fortune. |
| Electronic modern score | **Gamelan Laras Pelog & Gong Ageng** | Inner peace (*tentrem*), solemn prayer, and spiritual resonance. |

---

## 4. Color System

The palette derives from royal Javanese keraton aesthetics, combining deep natural pigments, aged velvet, and antique gold leaf:

```css
:root {
  /* Brand Primary: Deep Royal Maroon (Beludru Kasultanan) */
  --color-primary: #5A1F2B;
  --color-primary-dark: #3A141C;
  --color-primary-deep: #1F0B10;
  --color-primary-surface: #2B0E14;

  /* Brand Secondary: Sacred Java Forest / Olive */
  --color-secondary: #2C3E2D;
  --color-secondary-dark: #1A261B;

  /* Accent: Antique Keraton Gold (Prada Emas) */
  --color-gold-light: #E8DCC4;
  --color-gold-base: #D4BD91;
  --color-gold-deep: #B89A68;
  --color-gold-antique: #8B6E3D;

  /* Canvas: Warm Parchment (Dluwang Gedhog) */
  --color-parchment: #FBF6EE;
  --color-parchment-card: #FFFFFF;
  --color-parchment-cream: #F7EFE4;
  --color-parchment-muted: #EFE1CE;

  /* Typography */
  --color-text-main: #3A141C;
  --color-text-body: #4A3A35;
  --color-text-muted: #755243;
  --color-text-gold: #D4BD91;
  --color-text-light: #FBF6EE;
}
```

### Color Balance Ratio
- **60% Canvas & Neutral Ground**: Warm Ivory `#FBF6EE` with 18% opacity tileable Kawung batik texture in main sections; Deep Maroon `#1F0B10` in cinematic intro.
- **30% Structural Cards**: 100% Solid Opaque cards in `#FFFFFF` and `#F7EFE4` with antique gold hairline borders `#B89A68`, preventing background bleed-through.
- **10% Accents & Controls**: Antique Keraton Gold `#D4BD91` / `#B89A68` strictly for action buttons, monogram badges, icons, and dividers.

---

## 5. Typography System

Typography balances royal dignity with contemporary screen legibility across four distinct typefaces:

1. **Display Heading — `Cinzel` (Weights: 700, 800)**
   - Used for: Monogram, Couple Names, Section Titles, Ceremony Headers.
   - Scale: Mobile `text-3xl` to `text-4xl`; Desktop `text-5xl` to `text-7xl`.
   - Letter Spacing: `tracking-[0.08em]` to `tracking-[0.15em]`.
2. **Editorial Serif — `Cormorant Garamond` (Weights: 500, 600, 700, italic)**
   - Used for: Serat Ulem letter text, Quranic verses, Javanese pitutur, and family genealogy.
   - Scale: `text-base` to `text-xl`; Line Height: `leading-relaxed` (1.6 – 1.8).
3. **Flourish Accent — `Pinyon Script` (Weight: 400)**
   - Used exclusively for: Ampersand `&` in titles and decorative monogram flourishes. Never for body copy or buttons.
4. **Interface & Metadata — `Plus Jakarta Sans` (Weights: 500, 600, 700)**
   - Used for: Event times, dates, countdown numbers, bank accounts, form inputs, button labels, and navigation.
   - Scale: `text-xs` to `text-base`; High-contrast weights only.

---

## 6. Typography Readability Rules

Readability is the **absolute highest priority** of the application:
1. **Strict Hierarchy Levels**:
   - **Level 1 (Couple Names)**: Maximum display size, highest contrast, central prominence.
   - **Level 2 (Wedding Date & Venue)**: Sub-heading prominence, clean spacing.
   - **Level 3 (Section Titles)**: Symmetrical serif headers with decorative gold hairlines.
   - **Level 4 (Body Copy & Serat Ulem)**: High contrast `#3A141C` on `#FFFFFF` (Contrast ratio > 12:1).
   - **Level 5 (Metadata & Action Buttons)**: Crisp sans-serif labels in `#FBF6EE` on `#5A1F2B`.
2. **Text Safe Zones**:
   - Never place essential text directly on busy batik textures or photographic backgrounds.
   - Main page: Encapsulate all text within 100% solid opaque cards (`#FFFFFF` or `#F7EFE4`).
   - Cinematic Intro: A localized soft radial vignette (`radial-gradient(ellipse at center, rgba(22, 6, 10, 0.75) 0%, rgba(22, 6, 10, 0.4) 65%, transparent 100%)`) sits behind the centered typography, protecting readability while keeping couple cutouts vivid.
3. **Face Protection Rule**:
   - Typography is strictly prohibited from overlapping the faces of the bride or groom.
   - In intro: Cutouts flank the extreme left and right borders; typography occupies the central safe channel.
   - In hero: Arched portrait sits in its own dedicated column/container with clear boundary spacing.
4. **No Decorative Buttons**: All action buttons (*"Buka Undangan"*, *"Lihat Rangkaian Acara"*, *"Kirim RSVP"*, *"Salin Rekening"*) must use legible, bold, sans-serif or clean serif font—never script fonts.

---

## 7. Animation System

The animation system adheres to cinematic principles rather than interface gimmickry:
- **Pacing**: Deliberate, graceful durations (800ms – 1500ms).
- **Easing Formulas**:
  - Gate Open: `cubic-bezier(0.25, 1, 0.5, 1)` (physical inertia).
  - Content Reveal: `cubic-bezier(0.16, 1, 0.3, 1)` (expo.out).
  - Continuous Camera: Linear slow push-in (`scale: 1.00 -> 1.06` over 10s).
- **Prohibited Effects**:
  - `elastic.out` or bouncy spring dynamics.
  - Continuous floating/bobbing on essential text.
  - Aggressive 3D rotations or text fly-ins from screen edges.

---

## 8. Opening Sequence Choreography

The opening operates as an unbroken temporal progression:

```text
T+0.0s  : Regol Kencana gate resting, button plaque glowing with gold breathing pulse.
T+click : Button plaque fades & scales down (scale: 0.96, opacity: 0 over 350ms).
T+0.4s  : Gong Ageng (65.4 Hz) chimes; physical teakwood latch breaks friction.
T+0.48s : Gate panels slide outward (left to -100%, right to +100%); golden volumetric god rays burst through center seam.
T+2.1s  : Gates fully recessed; 10-second continuous cinematic intro begins.
T+2.5s  : Candikala sunset background illuminates; swallows glide across horizon.
T+3.5s  : Fireflies drift organically in atmospheric mist.
T+4.0s  : Joglo ceiling tumpangsari silhouette rises into view with interior chandelier glow.
T+5.0s  : Bilateral couple reveal: Groom slides from left, Bride slides from right.
T+6.2s  : Salam & Eyebrow reveal ("Assalamu'alaikum...").
T+6.8s  : Grand Couple Names reveal with blur dissipation (filter: blur(8px -> 0px)).
T+7.5s  : Wedding Date and Venue details settle into view.
T+8.4s  : Personalized guest badge settles ("Katur Dhumateng: [Guest Name]").
T+9.4s  : Warm golden dissolve glow builds.
T+10.0s : Transition into main invitation page; body scroll unlocked.
```

---

## 9. Transition System

- **Cover to Intro**: Physical gate parting with volumetric god rays expansion.
- **Intro to Main Page**: 800ms exit transition (`scale: 1.06, filter: blur(8px), opacity: 0`). Main page automatically resets window scroll to `(0, 0)` with smooth behavior.
- **Section-to-Section**: Seamless vertical scroll connected by ornamental gold hairline dividers (`w-24 h-[1px] bg-gradient-to-r from-transparent via-[#B89A68]/50 to-transparent`).

---

## 10. Scroll Animation System

All main page sections utilize an `IntersectionObserver` reveal system:
- **Trigger**: Sections become visible when intersecting 15% of viewport.
- **Staggered Progression**:
  1. Background card shadow & border materialize.
  2. Section eyebrow & decorative icon fade in (`translateY(15px -> 0px)`).
  3. Main section heading reveals (`translateY(20px -> 0px)`).
  4. Core content grid / cards stagger sequentially (120ms delay).
  5. Secondary action buttons settle into position.

---

## 11. Layer / Z-Index System

```text
z-[10000] : Global notification toasts & clipboard alerts
z-[9999]  : Admin Login Modal & Admin Dashboard Fullscreen Overlay
z-[9000]  : Admin Floating Trigger Medallion (bottom-left)
z-[8000]  : Interactive Modals (Detail Acara & Detail Lokasi)
z-[7000]  : Floating Audio Controller & Fullscreen Buttons
z-[60]    : Primary Heading Typography & Guest Badge
z-[50]    : HUD Skip Button & Scene Switchers
z-[40]    : Bride & Groom Cutout PNGs (flanking sides)
z-[30]    : Button Plaque & Architectural Silhouettes (Joglo)
z-[20]    : Gate doors (Left & Right panels)
z-[10]    : Parallax elements (Birds & Fireflies)
z-[0]     : Photographic backgrounds & seamless Batik Kawung canvas
```

---

## 12. Responsive Rules

- **Target Benchmark**: `390 × 844px` (Standard modern mobile).
- **Full Viewport Range**: Fully responsive from `320px` to `1920px+`.
- **Desktop Strategy**: Full left-to-right panoramic layout utilizing multi-column grids (`lg:grid-cols-12`) so widescreen monitors are immersive rather than empty.
- **Mobile Strategy**: Pure vertical flow. The mobile version is **never** a shrunken desktop; every typography block, button, and card is specifically formatted for one-handed portrait viewing.

---

## 13. Mobile Animation Rules

1. **Safe Margins**: Minimum horizontal safe padding of `24px` on mobile screens (`px-4 sm:px-6`).
2. **Touch Targets**: Minimum `44 × 44px` for all interactive elements.
3. **Typography Wrap**: Couple names wrap gracefully (`text-3xl xs:text-4xl sm:text-5xl`) with zero horizontal overflow (`overflow-x-hidden`).
4. **Reduced Asset Weight**: Mobile automatically loads optimized vertical background assets (`cinematic_bg_mobile.jpg`, `cover_bg_mobile.jpg`), bypassing heavy 1920px textures.

---

## 14. Accessibility / Reduced Motion

When `@media (prefers-reduced-motion: reduce)` is enabled:
- Gate opening transitions immediately without 3D swing.
- Camera push-in scale loops are disabled.
- Parallax birds and floating firefly loops are paused.
- All fade/slide durations are reduced to `<= 150ms`.
- Contrast ratios strictly satisfy WCAG AAA for headings (> 7:1) and AA for body text (> 4.5:1).

---

## 15. Performance Rules

1. **GPU Acceleration Only**: Animations use strictly `transform`, `opacity`, and `filter`. No animated `width`, `height`, `top`, or `margin`.
2. **Client-side Image Compression**: Host uploads are processed through HTML5 canvas (`compressImageFile.js`) downscaled to max 1200px at 82% JPEG quality (~120KB – 220KB), ensuring local storage never crashes.
3. **Zero Layout Thrashing**: Dimensions and viewport ratios are calculated via `resize` listeners with passive event listeners.

---

## 16. Component Architecture

```
src/
├── App.jsx                       # Root container, scene router, audio & admin providers
├── index.css                     # Design tokens, responsive root font scaling, batik patterns
├── main.jsx                      # Vite React entrypoint
├── components/
│   ├── JawaTimurOpening.jsx      # Cover Regol gate + 10s cinematic intro experience
│   ├── JawaTimurMainPage.jsx     # 10 core invitation sections & interactive modals
│   └── Admin/
│       ├── AdminDashboard.jsx    # Fullscreen administrative management suite
│       ├── AdminLoginModal.jsx   # PIN-protected security authentication
│       ├── AdminFloatingButton.jsx # Discreet bottom-left trigger medallion
│       └── Tabs/
│           ├── TabGuests.jsx     # Visitor log, RSVP table, WhatsApp link generator
│           ├── TabContent.jsx    # Visual editor for couple details, dates, venues, gifts
│           ├── TabMedia.jsx      # Photo upload & background replacement
│           └── TabSettings.jsx   # PIN change, JSON backup/restore, default reset
├── context/
│   └── WeddingDataContext.jsx   # Global state, localStorage synchronization, visit tracking
├── data/
│   └── weddingData.js            # Single source of truth default wedding data
└── utils/
    ├── imageCompressor.js        # Canvas-based client image downsampler
    ├── javaneseAudio.js          # Procedural Web Audio API Gamelan & Gong Ageng
    └── fullscreenHelper.js       # Native browser fullscreen toggle helper
```

---

## 17. Asset Architecture

All decorative assets are decoupled into transparent PNG overlays and photographic environments:

```
public/assets/
├── cover/                        # Regol gate doors, brass plaque, hall backgrounds
├── intro_cinematic/              # Bromo sunset, Joglo silhouette, couple cutouts, birds, fireflies
├── intro/                        # Formal couple portraits, pelaminan photo, carved icons
└── batik/                        # Seamless SVG Kawung & Surya Majapahit watermarks
```

---

## 18. Do / Don't Rules

### DO:
- ✅ Keep couple names instantly readable with highest optical hierarchy and contrast.
- ✅ Use solid opaque card backgrounds (`#FFFDF9`) to insulate text from batik patterns.
- ✅ Stagger typography reveals sequentially (`Background -> Ornaments -> Visual -> Names -> Date -> Details`).
- ✅ Maintain physical weight and dignified deceleration curves on Javanese gate animations.
- ✅ Protect faces of bride and groom from any text or ornament overlap.
- ✅ Test thoroughly across mobile (390px), tablet (768px), and widescreen desktop (1440px+).

### DON'T:
- ❌ Do NOT place text directly over unshielded busy artwork without a text-safe zone.
- ❌ Do NOT use bouncy or spring easing (`elastic.out`) in traditional Javanese ceremonies.
- ❌ Do NOT use decorative script fonts for buttons, dates, or body text.
- ❌ Do NOT allow couple names or titles to cause horizontal scroll overflow on mobile.
- ❌ Do NOT turn the website into a static, flat invitation.
- ❌ Do NOT use neon golds, aggressive glows, or harsh black card boxes.

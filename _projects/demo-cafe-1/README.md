# AROMA — 3D Specialty Coffee Interactive Experience

An ultra-premium, immersive 3D digital showroom and specialty coffee web application crafted for **AROMA Coffee Roasters**.

---

## ☕ Core Brand Concept

- **Brand**: AROMA SPECIALTY COFFEE (EST. 2024)
- **Aesthetic**: Modern, warm, sophisticated, artistic, cinematic lighting, physically based materials
- **Color Palette**:
  - **Espresso**: `#241510`
  - **Dark Coffee**: `#38231A`
  - **Cream**: `#F4E9D8`
  - **Caramel**: `#B87945`
  - **Gold Accent**: `#C9A66B`
  - **Background**: `#17110E`

---

## 🌟 Key Sections & Features

1. **Cinematic Loading Screen**:
   - 3D rotating coffee bean with ambient gold rim glow
   - "ROASTING EXPERIENCE..." progress counter (0 → 100%)
   - Smooth curtain fade transition under 2 seconds

2. **Custom Interactive Cursor**:
   - Precision pinpoint with outer halo ring
   - Magnetic expansion and glow on clickable elements & 3D canvas
   - Non-intrusive, disabled automatically on coarse touch displays

3. **Sticky Minimalist Navigation**:
   - Transparent header over hero with AROMA logo
   - Transitions into a blurred glassmorphic dark backdrop upon scrolling
   - Real-time cart badge counter and "ORDER NOW" CTA trigger

4. **3D Interactive Hero Section**:
   - Real-time Three.js / React Three Fiber canvas
   - Centerpiece 3D matte ceramic coffee cup with procedural rosette latte art
   - Rising volumetric steam particles
   - 12 floating 3D coffee beans with realistic seam crease, responding to mouse coordinates with parallax
   - Golden aroma dust particles orbiting in 3D space
   - Cinematic volumetric spotlights (warm key light, caramel fill, golden rim backlight)
   - Graceful static AI-generated fallback for devices without WebGL

5. **Section 2 — Signature Coffee**:
   - "THE ART OF COFFEE"
   - 3 Signature drinks:
     - `01 — SIGNATURE ESPRESSO` (Rp 25.000)
     - `02 — CARAMEL LATTE` (Rp 32.000)
     - `03 — COLD BREW RESERVE` (Rp 30.000)
   - 3D hover rotation, dynamic shadow transformation, and golden particle emission
   - Instant "ADD TO ORDER" button connected to shopping cart

6. **Section 3 — 3D Product Showcase (From Bean to Cup)**:
   - Interactive 6-stage journey:
     1. The Coffee Cherry (High-Altitude Botanical Ripening)
     2. Purity & Separation (Fermentation & Washing)
     3. Artisanal Roast Profile (Convective Thermodynamics)
     4. Precision Micron Grind (Uniform Particle Distribution)
     5. Golden Naked Extraction (9-Bar Hydraulic Pressure)
     6. The Masterpiece Cup (Crafted For Your Sacred Moment)
   - Technical specifications for each stage: Origin, Roast, Notes, Process

7. **Section 4 — Our Story**:
   - Editorial split layout with AI-generated cinematic café interior
   - "MORE THAN COFFEE."
   - "Every cup begins with carefully selected beans, precise roasting, and a passion for creating something worth slowing down for."
   - Interactive "DISCOVER OUR STORY →" modal featuring the AROMA Manifesto & Direct Trade ethics

8. **Section 5 — Coffee Origin (Terroir)**:
   - Immersive farm visualization with morning fog and sunrise
   - Interactive origin cards: **BRAZIL**, **ETHIOPIA**, **COLOMBIA**
   - Dynamic altitude, tasting notes spectrum, and background mood shifts

9. **Section 6 — Specialty Menu**:
   - Categorized tabs: `ESPRESSO`, `MILK`, `COLD`, `NON-COFFEE`, `PASTRY`
   - Detailed product cards with tags, descriptions, and IDR prices
   - Quick add with visual confirmation

10. **Section 7 — Café Experience (3D Virtual Walkthrough)**:
    - Mouse movement 3D parallax viewport
    - Interactive hotspots with zone inspection:
      - `COFFEE BAR`
      - `ROASTERY`
      - `LOUNGE`
      - `WORKSPACE`

11. **Section 8 — Special Offer**:
    - Floating 3D coffee cup surrounded by a spiral liquid coffee splash
    - Headline: "YOUR DAILY RITUAL."
    - Copy: "Good coffee deserves a good moment."
    - Direct "ORDER YOUR COFFEE" CTA

12. **Section 9 — Testimonials**:
    - Minimalist glass cards with 5-star ratings and guest quotes

13. **Section 10 — Location & Hours**:
    - AI-generated modern AROMA café storefront at dusk
    - Address: *Jl. Example No. 21, Tuban, Jawa Timur*
    - Hours: *OPEN DAILY • 07:00 — 22:00*
    - "GET DIRECTIONS" Google Maps integration

14. **Dark Espresso Footer**:
    - Brand manifesto, newsletter subscription, social links (Instagram, TikTok, WhatsApp, Email), and copyright © 2026.

15. **Full Cart & Order Drawer System**:
    - Slide-over drawer with item list, quantity adjusters, Dine-in vs Takeaway selector, subtotal calculation, simulated checkout with confetti celebrations.

---

## 🎨 AI-Generated Assets

All visual assets were generated using custom prompts adhering to the studio luxury aesthetic:
- `hero-cup.jpg`: Matte ceramic cup with delicate rosette latte art and steam
- `espresso.jpg`: Demitasse cup with thick golden crema
- `caramel-latte.jpg`: Layered latte glass with rich caramel drizzle
- `cold-brew.jpg`: Crystal tumbler with clear ice sphere and amber coffee
- `single-bean.jpg`: Macro 3D roasted coffee bean with golden rim lighting
- `beans-pile.jpg`: Heap of glistening dark roasted beans
- `coffee-cherries.jpg`: Ripe red coffee cherries on botanical branch
- `coffee-extraction.jpg`: Bottomless naked portafilter 9-bar extraction
- `coffee-bag.jpg`: Luxury black stand-up pouch bag with gold foil branding
- `cafe-interior.jpg`: Ultra-luxury 16:9 roastery and lounge interior
- `coffee-plantation.jpg`: High-altitude terraced mountain plantation at sunrise
- `coffee-splash.jpg`: Floating cup with dynamic spiral liquid coffee splash
- `cafe-exterior.jpg`: Modern architectural AROMA storefront at dusk

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- **3D Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Confetti**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run local development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

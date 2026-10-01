# BALE RASA TUBAN — DESIGN SYSTEM & ARCHITECTURE SPECIFICATION
**Version:** 1.0.0  
**Concept:** Javanese Heritage × Modern Editorial × Warm Restaurant  
**Tagline:** *“Andum Roso, Nambah Bolo”*  
**Secondary Tagline:** *“Rasa Jawa, Suasana yang Membawa Pulang.”*  
**Location:** Jl. Bahagia, Jl. Bogorejo I, Mulung, Bogorejo, Kec. Merakurak, Kabupaten Tuban, Jawa Timur 62355  
**Contact:** 0852-3647-3110 | Google Rating: 4.7 / 5 (422 ulasan)  
**Operating Hours:** 10.00 – 21.00 WIB  
**Price Range:** Rp25.000 – Rp50.000 / orang  

---

## 1. BRAND ESSENCE & POSITIONING

Bale Rasa Tuban menghadirkan pengalaman kuliner tradisional Jawa dengan suasana Joglo yang autentik, asri, hangat, dan estetik. Mengangkat filosofi Jawa luhur *“Andum Roso, Nambah Bolo”* (Berbagi rasa, menambah saudara dan sahabat), restoran ini dirancang sebagai ruang temu keluarga, kawan lama, pasangan, maupun perjamuan hangat.

Website dirancang dengan prinsip:
- **Bukan sekadar template restoran biasa**, melainkan majalah kuliner Jawa modern yang bertransformasi menjadi platform restoran interaktif (*"Modern Javanese Culinary Editorial Magazine"*).
- Menonjolkan fotografi hidangan autentik dan arsitektur Joglo kayu jati tua sebagai pahlawan visual utama.
- Menjaga kehangatan, keanggunan, dan kesederhanaan berselera tinggi tanpa elemen neon, gradien berlebihan, atau kesan corporate/dashboard yang kaku.

---

## 2. COLOR PALETTE SYSTEM

| Tone Name | Hex Code | Tailwind Token | Application & Role |
| :--- | :--- | :--- | :--- |
| **Deep Teakwood (Kayu Jati)** | `#140D08` | `bg-jawa-950` | Primary dark surface, hero vignette, footer |
| **Teak Shadow** | `#1D140E` | `bg-jawa-900` | Section backgrounds, elevated cards |
| **Warm Linen (Cream)** | `#F4EFE6` | `bg-cream-100` | Light section backgrounds, editorial page body |
| **Parchment Cream** | `#FAF7F2` | `bg-cream-50` | Menu cards, review cards, elevated white-space surfaces |
| **Terracotta (Gerabah)** | `#B84E29` | `bg-terracotta-500` | Primary conversion buttons, signature badges |
| **Soft Antique Gold** | `#C19C4A` | `text-gold-500` | Subtitle highlights, rating stars, fine borders |
| **Forest Green (Asri)** | `#1A281E` | `bg-forest-800` | Environmental accent, tropical courtyard glow |

---

## 3. TYPOGRAPHY SYSTEM

- **Headings & Quotes:** `Cormorant Garamond` & `Playfair Display`  
  Serif berkarakter Jawa klasik yang anggun, melambangkan warisan kraton dan estetika sastra nusantara.
- **Body & Controls:** `Plus Jakarta Sans`  
  Sans-serif modern karya desainer Indonesia yang sangat readable, proporsional, dan nyaman dibaca di berbagai resolusi layar.
- **Micro Labels:** Uppercase tracking dengan spasi lebar (`tracking-[0.25em]`).

---

## 4. SIGNATURE DISHES & MENU

1. **Becek Buwohan (Signature Dish Utama):**  
   Olahan daging sapi dengan kuah kaya rempah khas Tuban, menghadirkan cita rasa gurih, hangat, dan autentik.
2. **Garang Asem:**  
   Masakan tradisional dengan rasa gurih, segar, dan kaya rempah.
3. **Sop Iga Sapi:**  
   Kuah hangat dengan iga sapi yang kaya rasa.
4. **Ayam Goreng Sambel Joglo:**  
   Ayam goreng dengan sambal khas yang cocok untuk teman makan nasi.
5. **Nasi Jagung:**  
   Sajian tradisional yang melengkapi pengalaman kuliner Jawa.
6. **Tempe Mendoan:**  
   Camilan klasik yang cocok dinikmati bersama teh atau kopi.
7. **Es Kencono Wungu:**  
   Minuman segar bunga telang dan jeruk nipis khas Bale Rasa.

---

## 5. TECHNICAL STACK & ARCHITECTURE

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom Javanese heritage theme
- **SEO & Structured Data:** Semantic HTML5 + Schema.org `Restaurant` & `LocalBusiness` JSON-LD
- **Interactions:**
  - Interactive Masonry Gallery with Fullscreen Lightbox
  - Direct WhatsApp reservation message builder
  - Sticky mobile quick action navigation
  - Floating WhatsApp helper button
- **Deployment Target:** Vercel (`demo-resto-3`)

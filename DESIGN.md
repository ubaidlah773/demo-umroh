# DESIGN SYSTEM — MODERN LUXURY RESTAURANT & RESERVATION SYSTEM

> **Vision**: Luxury Visual + Excellent UX + Seamless Reservation.  
> **Core Principle**: *"Luxury should feel effortless."*  
> **Aesthetic Balance**: Luxury Restaurant + Boutique Hospitality + Editorial Design.

---

## 01. COLOR PALETTE

The color system creates a warm, sophisticated, and high-end dining ambiance. Champagne gold is used strictly as a refined accent, avoiding loud or overly yellow golds.

| Role | Color Name | Hex Code | Tailwind Token | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Foundation** | Deep Espresso | `#211C18` | `espresso-950` / `espresso-900` | Rich dark grounding color for text, dark sections, and contrast elements |
| **Secondary Surface** | Warm Ivory | `#F7F3EC` | `ivory-100` / `ivory-50` | Primary warm background surface; soft, welcoming, and high readability |
| **Luxury Accent** | Muted Champagne | `#C8A96B` | `champagne-500` / `champagne-400` | Refined metallic accent for eyebrows, active states, borders, and highlight CTAs |
| **Supporting Depth** | Olive | `#55584B` | `olive-700` / `olive-600` | Natural heritage accent representing botany, ingredients, and warmth |
| **Neutral Subtlety** | Warm Gray | `#AAA39A` | `warmgray-400` / `warmgray-300` | Subtle borders, secondary copy, muted badges, and unselected states |

---

## 02. TYPOGRAPHY SYSTEM

Typography pairs classic literary elegance with modern, clean legibility and monospaced technical precision.

| Role | Font Family | Weights | Usage |
| :--- | :--- | :--- | :--- |
| **Headings (Display)** | `Cormorant Garamond` | Light (300), Regular (400), SemiBold (600), Italic | Section titles, hero headlines, dish names, pull quotes |
| **Body & UI (Sans)** | `Manrope` | Light (300), Regular (400), Medium (500), SemiBold (600) | Body paragraphs, buttons, navigation links, form inputs |
| **Micro-labels (Mono)** | `DM Mono` | Regular (400), Medium (500) | Eyebrows, time slots, date badges, step numbers, booking codes |

### Scale & Hierarchy
* **Hero Headline**: `72px – 110px` desktop / `42px – 54px` mobile (`font-serif font-normal leading-[0.98] tracking-tight`)
* **Section Heading**: `48px – 72px` desktop / `32px – 44px` mobile (`font-serif font-normal tracking-tight`)
* **Card / Dish Title**: `24px – 32px` (`font-serif`)
* **Body Text**: `16px – 18px` (`font-sans font-light leading-relaxed`)
* **Eyebrow / Small Labels**: `11px – 13px` (`font-mono uppercase tracking-[0.25em]`)

---

## 03. COMPONENT ARCHITECTURE & SPACING

* **Grid Max Width**: `1280px` (`max-w-7xl`)
* **Section Spacing**: `py-24 sm:py-32`
* **Container Padding**: `px-4 sm:px-6 lg:px-8`
* **Border Radius**:
  * Micro buttons / pills: `rounded-full` or `rounded-sm` (sharp luxury feel)
  * Cards & Containers: `rounded-lg` / `rounded-xl`
  * Modals: `rounded-xl`
* **Shadows**: Soft editorial ambient shadows (`0 20px 40px -15px rgba(33, 28, 24, 0.08)`)

---

## 04. RESERVATION SYSTEM WORKFLOW

User journey adheres to strict intuitive progression:

```text
HERO SHORTCUT / CTA
        ↓
STEP 1: SELECT DATE (Interactive Calendar, unavailable dates disabled)
        ↓
STEP 2: SELECT GUESTS (Counter 1 to 20+, large party trigger)
        ↓
STEP 3: SELECT TIME (17:30 to 20:30 with live Available/Limited/Full indicators)
        ↓
STEP 4: SEATING PREFERENCE (Indoor / Outdoor / Private Room)
        ↓
STEP 5: GUEST INFORMATION (Name, Phone, Email, Special Requests, Occasions)
        ↓
STEP 6: SUMMARY & CONFIRMATION (Review details, Edit capability)
        ↓
CONFIRMED: Instant Booking ID, Add to Calendar, WhatsApp Confirmation, PDF Download
```

---

## 05. AVAILABILITY & DOUBLE-BOOKING PROTECTION

* **Capacity Engine**: Total restaurant capacity 100 seats; per-timeslot allocation limits.
* **Server-side validation**: Zod schema checks for valid date, time, party size, email, phone.
* **Race Condition Prevention**: Prisma transaction verifies current confirmed seats before writing reservation.
* **Status Lifecycle**: `pending` → `confirmed` → `completed` / `cancelled` / `no_show`.

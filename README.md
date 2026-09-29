# Ahmad Ubai Dullah — Personal Portfolio & Content Management System

A production-ready, dynamic personal portfolio website and integrated Content Management System (CMS) designed for **Ahmad Ubai Dullah** (Full Stack Developer based in Tuban, Indonesia).

Built strictly according to Ahmad's authentic curriculum vitae (CV) and professional experience.

---

## 🌟 Key Architecture & Interfaces

The application consists of two seamlessly connected interfaces:

### 1. Public Portfolio (`/` & `/projects/[slug]`)
- **Aesthetic**: Premium dark developer aesthetic, modern minimalism, technical typography, high-end SaaS feel.
- **Hero Section**: Eyebrow indicator, professional title, location pill, download CV CTA, view projects trigger, and interactive system status terminal.
- **About Ahmad**: Engineering philosophy, core architectural competencies, and structured career summary paragraphs.
- **Selected Projects**: Interactive architecture preview cards with direct links to dedicated case study pages.
- **Dedicated Project Case Study (`/projects/[slug]`)**:
  - Detailed narrative breakdown, technology pills, and key deliverables.
  - **Visual Documentation Gallery & Lightbox**: Interactive gallery featuring mockups, screenshots, thumbnail strip, zoom in/out, keyboard controls (`ArrowLeft`, `ArrowRight`, `Escape`), and image captions.
  - Previous and Next case study navigation.
- **Experience Timeline**: Career history with interactive expand/collapse cards and detailed technical contributions.
- **Technology Stack**: Filterable technology ecosystem covering Programming Languages, Frameworks & Runtimes, Relational Databases, Tools, and Web Architecture.
- **Education & Credentials**: Detailed academic history (Universitas Negeri Semarang, GPA 3.80 / 4.00, 7 published machine learning research articles) and RevoU Tech Academy credentials.
- **Contact & Channels**: Fast email copy button, direct inquiry form, social profiles (LinkedIn, GitHub), and discrete contact area.

### 2. Admin Content Management System (`/admin`)
- **Authentication**: Secure HMAC-SHA256 session token system with HTTP-only cookies and Authorization Bearer header support.
- **Dashboard Overview (`/admin`)**: Real-time project counts, published items, media stats, quick action shortcuts, and recent project list.
- **Project Editor (`/admin/projects`)**:
  - Full CRUD operations with instant publish/draft toggles.
  - Drag-and-drop reordering with visual rank indicators.
  - Tabbed editor: Core Info, Deliverables & Features, Engineering Highlights.
  - **Project Media Uploader**: Drag & drop multi-file uploader, cover image selector, caption and alt-text editor, and image deletion.
- **Experience Editor (`/admin/experience`)**: Add, edit, reorder, or toggle publication status of employment history.
- **Skills & Categories (`/admin/skills`)**: Manage technical skills, tags, experience levels, and skill categories.
- **Education & Honors (`/admin/education`)**: Add academic credentials, honors, coursework, and scores.
- **Hero & About Editor (`/admin/about`)**: Edit hero headline, eyebrow, supporting copy, and about summary points.
- **Media Library (`/admin/media`)**: Centralized repository for all uploaded screenshots, mockups, and documents with copyable URLs.
- **Site Settings & SEO (`/admin/settings`)**: Personal identity, location, contact channels, LinkedIn/GitHub links, CV PDF upload, and OpenGraph/SEO metadata.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router, Server Components & Route Handlers)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom dark technical palette (`tech-grid`, `tech-dots`)
- **Database & ORM**: SQLite via Prisma ORM (`prisma@5.21.1`) — easily switchable to PostgreSQL or Supabase
- **Icons**: Lucide React
- **Authentication**: Native HMAC-SHA256 cryptographic session tokens & bcrypt password hashing
- **File Storage**: Local persistent uploads (`public/uploads/`) with pluggable cloud adapter support (AWS S3 / Supabase Storage)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or pnpm

### Installation

1. **Clone or navigate to the repository:**
   ```bash
   cd "membuat web"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file (copied from `.env.example`):
   ```env
   DATABASE_URL="file:./dev.db"
   AUTH_SECRET="ahmad-ubai-dullah-secret-2026-key-ultra-secure"
   ```

4. **Initialize and Seed Database:**
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the public portfolio.

6. **Production Build:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🔐 Admin Dashboard Credentials

Default credentials created during database seeding:

- **Login URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Username**: `admin` *(or `ahm.idlah773@gmail.com`)*
- **Password**: `admin123password`

---

## 📁 Project Structure

```
├── prisma/
│   ├── schema.prisma        # Prisma database models (User, Project, ProjectImage, etc.)
│   ├── dev.db               # SQLite database
│   ├── generate-mockups.js  # Script to generate project SVG mockups
│   └── seed.js              # Database seed script with verified CV data
├── public/
│   ├── uploads/             # Uploaded images, mockups, and CV document
│   ├── profile.png          # Ahmad Ubai Dullah profile portrait
│   └── Ahmad_Ubai_Dullah_CV.pdf
├── src/
│   ├── app/
│   │   ├── admin/           # Admin dashboard pages
│   │   │   ├── about/       # Hero & About Me editor
│   │   │   ├── education/   # Academic credentials manager
│   │   │   ├── experience/  # Experience timeline manager
│   │   │   ├── login/       # Authentication page
│   │   │   ├── media/       # Media library grid
│   │   │   ├── projects/    # Projects CRUD, reordering & image uploader
│   │   │   ├── settings/    # Profile, Contact & SEO settings
│   │   │   └── skills/      # Technical skills & category manager
│   │   ├── api/             # 20 secure API routes for CRUD & upload operations
│   │   ├── projects/
│   │   │   └── [slug]/      # Dedicated dynamic Project Case Study & Lightbox
│   │   ├── page.tsx         # Live dynamic public portfolio homepage
│   │   ├── layout.tsx       # Root layout with font configuration & metadata
│   │   └── globals.css      # Dark theme styling and animations
│   ├── components/          # Reusable UI & section components
│   │   ├── admin/           # Admin forms & media uploader components
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectDetailModal.tsx
│   │   ├── ProjectGalleryLightbox.tsx
│   │   └── ...
│   ├── data/
│   │   └── portfolioData.ts # Fallback verified CV data
│   ├── lib/
│   │   ├── auth.ts          # Auth token creation & verification
│   │   ├── prisma.ts        # PrismaClient singleton
│   │   └── storage.ts       # File upload & storage management
│   └── types/
│       └── portfolio.ts     # TypeScript interfaces
```

---

## 📄 License

Created for Ahmad Ubai Dullah. All rights reserved.

import {
  ProgramItem,
  StatItem,
  FeatureItem,
  StepItem,
  GalleryItem,
  TestimonialItem,
  FAQItem,
} from "@/types";

/**
 * ============================================================================
 * KONFIGURASI PUSAT WEBSITE DEMO LPK NUSASKILL
 * ============================================================================
 * File konfigurasi utama untuk seluruh data lembaga, kontak, program,
 * statistik, testimoni, dokumentasi, dan teks website.
 * Cukup ubah data di file ini saat mengkustomisasi website untuk klien baru.
 */

// Konstanta WhatsApp - Ganti dengan nomor WhatsApp resmi klien (format internasional: 628xxxxxxxxxx)
export const WHATSAPP_NUMBER: string = "[WHATSAPP_NUMBER]";

// Pesan WhatsApp standar
export const DEFAULT_WHATSAPP_MESSAGE =
  "Halo Admin, saya ingin mendapatkan informasi mengenai program pelatihan.";

// Helper untuk URL WhatsApp
export const getWhatsAppUrl = (customMessage?: string, programName?: string) => {
  const message =
    customMessage ||
    (programName
      ? `Halo Admin, saya tertarik dan ingin konsultasi mengenai "${programName}" di LPK NusaSkill.`
      : DEFAULT_WHATSAPP_MESSAGE);

  const cleanNumber =
    WHATSAPP_NUMBER === "[WHATSAPP_NUMBER]"
      ? "6281234567890"
      : WHATSAPP_NUMBER.replace(/[^0-9]/g, "");

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
};

export const siteConfig = {
  // 1. Informasi Utama Lembaga
  institution: {
    fullName: "LPK NusaSkill",
    shortName: "NusaSkill",
    tagline: "Pusat Pelatihan Kerja & Pengembangan Kompetensi",
    subTitle: "Pusat Pelatihan Kerja & Pengembangan Kompetensi",
    badgeLabel: "PROGRAM PELATIHAN KERJA",
    demoBadgeText: "DEMO WEBSITE",
    demoDisclaimer:
      "Website ini merupakan demo/template dan seluruh informasi dapat disesuaikan dengan data lembaga.",
  },

  // 2. Kontak & Alamat
  contact: {
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappDisplay: "[Nomor WhatsApp]",
    phoneDisplay: "[Nomor Telepon]",
    email: "[Email LPK]",
    address: "[Alamat LPK]",
    googleMapsUrl: "#",
    officeHours: "[Jam Operasional]",
  },

  // 3. Media Sosial
  socials: {
    instagram: "[Instagram LPK]",
    facebook: "[Facebook LPK]",
    tiktok: "[TikTok LPK]",
  },

  // 4. Navigasi Website
  navLinks: [
    { label: "Beranda", href: "#beranda" },
    { label: "Tentang", href: "#tentang" },
    { label: "Program", href: "#program" },
    { label: "Alur Pendaftaran", href: "#alur-pendaftaran" },
    { label: "Dokumentasi", href: "#dokumentasi" },
    { label: "Testimoni", href: "#testimoni" },
    { label: "FAQ", href: "#faq" },
  ],

  // 5. Hero Section
  hero: {
    badge: "PROGRAM PELATIHAN KERJA",
    headlineLine1: "Bekali Diri.",
    headlineLine2: "Siapkan Masa Depan.",
    subheadline:
      "Program pelatihan dan pengembangan kompetensi untuk membantu peserta mempersiapkan langkah menuju dunia kerja.",
    trustIndicator: "Pelatihan terarah • Pendampingan • Informasi pendaftaran",
    primaryCta: "Daftar Pelatihan",
    secondaryCta: "Konsultasi",
  },

  // 6. Statistik / Trust Indicators
  // CATATAN PENTING: Ganti angka placeholder di bawah ini dengan data riil klien saat website dikustomisasi
  stats: [
    {
      value: "[XX]+", // Ganti dengan data riil klien (contoh: "1.200+")
      label: "Peserta",
      description: "Peserta terdaftar dalam program pelatihan",
    },
    {
      value: "[XX]", // Ganti dengan data riil klien (contoh: "4")
      label: "Program",
      description: "Pilihan kurikulum terarah",
    },
    {
      value: "[XX]+", // Ganti dengan data riil klien (contoh: "45+")
      label: "Kegiatan",
      description: "Sesi intensif & simulasi kelas",
    },
    {
      value: "[XX]", // Ganti dengan data riil klien (contoh: "12")
      label: "Instruktur",
      description: "Tenaga pengajar & pembimbing kompeten",
    },
  ] as StatItem[],

  // 7. Section: Tentang Lembaga
  about: {
    badge: "TENTANG LEMBAGA",
    headline: "Tempat Mempersiapkan Langkah Berikutnya",
    copy: "LPK NusaSkill merupakan konsep lembaga pelatihan kerja yang berfokus pada pembelajaran terarah, pengembangan keterampilan, dan persiapan peserta menghadapi dunia kerja.",
    values: [
      {
        number: "01",
        title: "Pembelajaran Terarah",
        description:
          "Metode pembelajaran yang terstruktur dari pengenalan materi dasar, keterampilan fungsional, hingga simulasi praktik kerja.",
        icon: "BookOpenCheck",
      },
      {
        number: "02",
        title: "Pendampingan Peserta",
        description:
          "Bimbingan belajar intensif oleh instruktur dengan evaluasi kemajuan berkala agar setiap peserta memahami materi secara optimal.",
        icon: "UsersRound",
      },
      {
        number: "03",
        title: "Fokus Kesiapan Kerja",
        description:
          "Pembekalan etos kerja, kedisiplinan, pengenalan budaya profesional, serta kesiapan mental menghadapi proses seleksi kerja.",
        icon: "BriefcaseBusiness",
      },
    ] as FeatureItem[],
  },

  // 8. Section: Program Pelatihan
  programsSection: {
    badge: "PROGRAM PELATIHAN",
    headline: "Pilih Program yang Sesuai dengan Targetmu",
    subheadline:
      "Pilihan program pelatihan bahasa asing dan keterampilan kerja dengan kurikulum terarah.",
    disclaimer: "Program demo — dapat disesuaikan dengan kurikulum lembaga.",
  },

  programs: [
    {
      id: "bahasa-jepang",
      title: "Bahasa Jepang",
      category: "Program Bahasa",
      tagline:
        "Program pembelajaran bahasa Jepang untuk kebutuhan komunikasi dan persiapan kerja.",
      badge: "Program Demo",
      description:
        "Pelatihan bahasa Jepang mulai dari aksara dasar, pola kalimat fungsional, percakapan praktis, hingga materi pendukung kesiapan kerja.",
      suitableFor: [
        "Pemula yang ingin belajar bahasa Jepang dari dasar",
        "Peserta yang mempersiapkan kompetensi komunikasi kerja",
        "Pencari kerja yang ingin menambah keahlian bahasa asing",
      ],
      duration: "[isi durasi]",
      schedule: "[isi jadwal]",
      fee: "[isi biaya]",
      requirements: [
        "[isi persyaratan - Usia minimal]",
        "[Pendidikan minimal]",
        "[Sehat jasmani dan rohani]",
        "[Komitmen belajar]",
      ],
      syllabus: [
        "Pengenalan aksara & tata bahasa dasar",
        "Percakapan situasional & komunikasi kerja",
        "Etika budaya kerja & kedisiplinan",
        "Latihan evaluasi & simulasi berkala",
      ],
      image:
        "https://images.unsplash.com/photo-1528164344705-475426879c0d?q=80&w=800&auto=format&fit=crop",
      featured: true,
    },
    {
      id: "bahasa-korea",
      title: "Bahasa Korea",
      category: "Program Bahasa",
      tagline:
        "Program pembelajaran bahasa Korea untuk kebutuhan komunikasi dan persiapan kerja.",
      badge: "Program Demo",
      description:
        "Pelatihan bahasa Korea dari tingkat dasar aksara Hangeul, kosakata praktis, tata bahasa percakapan, serta latihan pendukung komunikasi kerja.",
      suitableFor: [
        "Pemula yang ingin belajar bahasa Korea dari dasar",
        "Peserta yang mempersiapkan kompetensi komunikasi kerja",
        "Pencari kerja yang ingin menambah keahlian bahasa asing",
      ],
      duration: "[isi durasi]",
      schedule: "[isi jadwal]",
      fee: "[isi biaya]",
      requirements: [
        "[isi persyaratan - Usia minimal]",
        "[Pendidikan minimal]",
        "[Kondisi fisik sesuai ketentuan program]",
        "[Dokumen administrasi dasar]",
      ],
      syllabus: [
        "Penguasaan aksara Hangeul & fonetik",
        "Kosakata dasar & komunikasi harian",
        "Latihan pemahaman membaca & mendengar",
        "Pembekalan etika kerja & budaya profesional",
      ],
      image:
        "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=800&auto=format&fit=crop",
      featured: true,
    },
    {
      id: "persiapan-kerja",
      title: "Persiapan Kerja",
      category: "Pengembangan Keterampilan",
      tagline:
        "Materi pendukung untuk meningkatkan kesiapan menghadapi proses kerja.",
      badge: "Program Demo",
      description:
        "Modul pembekalan karakter, kedisiplinan, teknik wawancara kerja (interview), penyusunan berkas lamaran profesional, serta ketahanan mental sebelum memasuki lingkungan kerja.",
      suitableFor: [
        "Peserta yang telah menyelesaikan materi dasar",
        "Calon kandidat yang sedang mempersiapkan proses wawancara kerja",
        "Peserta yang ingin meningkatkan rasa percaya diri & profesionalisme",
      ],
      duration: "[isi durasi]",
      schedule: "[isi jadwal]",
      fee: "[isi biaya]",
      requirements: [
        "[isi persyaratan - Terdaftar sebagai peserta LPK]",
        "[Mengikuti tata tertib lembaga]",
      ],
      syllabus: [
        "Teknik wawancara kerja & simulasi interview",
        "Penyusunan dokumen profil & riwayat hidup",
        "Pembentukan karakter disiplin & manajemen waktu",
        "Etika kerja & komunikasi profesional",
      ],
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
      featured: false,
    },
    {
      id: "program-intensif",
      title: "Program Intensif",
      category: "Kelas Akselerasi",
      tagline:
        "Program pembelajaran intensif dengan materi yang dapat disesuaikan dengan kebutuhan peserta.",
      badge: "Program Demo",
      description:
        "Program akselerasi dengan jadwal belajar lebih padat, pendampingan instruktur secara terfokus, dan evaluasi hasil belajar berkala.",
      suitableFor: [
        "Peserta dengan target waktu belajar tertentu",
        "Peserta yang membutuhkan fokus intensif dan bimbingan terarah",
      ],
      duration: "[isi durasi]",
      schedule: "[isi jadwal]",
      fee: "[isi biaya]",
      requirements: [
        "[isi persyaratan - Komitmen waktu penuh]",
        "[Mengikuti asesmen awal]",
      ],
      syllabus: [
        "Materi pembelajaran terfokus & terukur",
        "Evaluasi berkala & pendampingan intensif",
        "Simulasi dan praktik komunikasi rutin",
        "Bimbingan terarah sesuai target peserta",
      ],
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
      featured: false,
    },
  ] as ProgramItem[],

  // 9. Section: Kenapa Memilih Kami
  whyUs: {
    badge: "KEUNGGULAN LEMBAGA",
    headline: "Komitmen Mendampingi Langkah Anda",
    subheadline:
      "Fokus memberikan suasana belajar yang kondusif, kurikulum terstruktur, dan pelayanan informasi yang transparan bagi setiap peserta.",
    features: [
      {
        number: "01",
        title: "Instruktur Berpengalaman",
        description:
          "Tenaga pengajar yang kompeten di bidangnya, membimbing dengan pendekatan komunikatif dan terarah.",
        icon: "GraduationCap",
      },
      {
        number: "02",
        title: "Materi Terstruktur",
        description:
          "Modul disusun sistematis dari level dasar hingga bertahap mencapai target kompetensi yang dibutuhkan.",
        icon: "FileText",
      },
      {
        number: "03",
        title: "Pendampingan Peserta",
        description:
          "Pemantauan kemajuan belajar, evaluasi berkala, dan ruang tanya jawab untuk memastikan pemahaman materi.",
        icon: "HeartHandshake",
      },
      {
        number: "04",
        title: "Informasi Pendaftaran Jelas",
        description:
          "Transparansi alur pendaftaran, persyaratan berkas, serta jadwal pelatihan yang jelas bagi calon peserta.",
        icon: "ShieldCheck",
      },
    ] as FeatureItem[],
  },

  // 10. Section: Alur Pendaftaran
  registrationSteps: {
    badge: "TAHAPAN PENDAFTARAN",
    headline: "Alur Pendaftaran Mudah & Transparan",
    subheadline:
      "Empat langkah sederhana untuk memulai proses pembelajaran bersama LPK NusaSkill.",
    steps: [
      {
        step: "01",
        title: "Konsultasi",
        description: "Calon peserta menghubungi admin.",
        detail:
          "Konsultasikan minat pelatihan, rencana target, dan tanyakan informasi kelas melalui kontak admin.",
      },
      {
        step: "02",
        title: "Pilih Program",
        description: "Tentukan program sesuai kebutuhan.",
        detail:
          "Pilih program pelatihan yang sesuai dengan target dan kebutuhan kompetensi Anda.",
      },
      {
        step: "03",
        title: "Lengkapi Data",
        description: "Isi informasi pendaftaran.",
        detail:
          "Mengisi formulir biodata pendaftaran dan melengkapi dokumen administratif yang dibutuhkan.",
      },
      {
        step: "04",
        title: "Mulai Pelatihan",
        description: "Peserta mengikuti program yang dipilih.",
        detail:
          "Mengikuti orientasi program, menerima materi panduan belajar, dan mulai pembelajaran sesuai jadwal.",
      },
    ] as StepItem[],
  },

  // 11. Section: Dokumentasi Kegiatan (Generik)
  gallery: {
    badge: "DOKUMENTASI KEGIATAN",
    headline: "Aktivitas Belajar & Kegiatan Pelatihan",
    subheadline:
      "Gambaran suasana pembelajaran interaktif dan kegiatan pelatihan peserta dalam lingkungan yang kondusif.",
    items: [
      {
        id: "doc-1",
        title: "Suasana Pelatihan Kelas",
        category: "Pembelajaran",
        image:
          "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
        caption: "Sesi penyampaian materi pembelajaran di ruang kelas yang fokus dan kondusif.",
      },
      {
        id: "doc-2",
        title: "Diskusi & Pembelajaran Kelompok",
        category: "Studi Kelompok",
        image:
          "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
        caption: "Praktik dialog dan diskusi kelompok untuk melatih pemahaman dan komunikasi.",
      },
      {
        id: "doc-3",
        title: "Simulasi & Sesi Evaluasi",
        category: "Evaluasi",
        image:
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
        caption: "Sesi evaluasi berkala untuk mengukur kemajuan kompetensi peserta.",
      },
      {
        id: "doc-4",
        title: "Pembekalan & Sesi Pengenalan",
        category: "Pengenalan",
        image:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
        caption: "Sesi pembekalan mengenai etika kerja, kedisiplinan, dan persiapan profesional.",
      },
      {
        id: "doc-5",
        title: "Bimbingan & Konsultasi Belajar",
        category: "Pendampingan",
        image:
          "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop",
        caption: "Pendampingan oleh instruktur untuk memastikan pemahaman materi optimal.",
      },
      {
        id: "doc-6",
        title: "Kebersamaan & Kolaborasi Peserta",
        category: "Kolaborasi",
        image:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
        caption: "Membangun semangat kerja sama, kedisiplinan, dan motivasi belajar peserta.",
      },
    ] as GalleryItem[],
  },

  // 12. Section: Testimoni (Sesuai Ketentuan Prompt Revisi)
  testimonials: {
    badge: "CONTOH TESTIMONI",
    headline: "Tanggapan Peserta Pelatihan",
    subheadline:
      "Contoh tanggapan peserta yang mengikuti proses pembelajaran dan bimbingan.",
    visualBadge: "Konten Demo",
    items: [
      {
        id: "testi-1",
        name: "Peserta Demo 01",
        role: "Contoh Testimoni",
        program: "Kelas Bahasa Jepang",
        content:
          "Materi pelatihan yang terstruktur membantu saya memahami langkah yang perlu dipersiapkan sebelum memasuki dunia kerja.",
        avatarText: "01",
      },
      {
        id: "testi-2",
        name: "Peserta Demo 02",
        role: "Contoh Testimoni",
        program: "Kelas Bahasa Korea",
        content:
          "Materi pelatihan yang terstruktur membantu saya memahami langkah yang perlu dipersiapkan sebelum memasuki dunia kerja.",
        avatarText: "02",
      },
      {
        id: "testi-3",
        name: "Peserta Demo 03",
        role: "Contoh Testimoni",
        program: "Kelas Persiapan Kerja",
        content:
          "Materi pelatihan yang terstruktur membantu saya memahami langkah yang perlu dipersiapkan sebelum memasuki dunia kerja.",
        avatarText: "03",
      },
    ] as TestimonialItem[],
  },

  // 13. Section: FAQ
  faq: {
    badge: "TANYA JAWAB (FAQ)",
    headline: "Pertanyaan yang Sering Diajukan",
    subheadline:
      "Temukan jawaban cepat untuk pertanyaan umum seputar program pelatihan dan pendaftaran.",
    items: [
      {
        question: "Apa saja program yang tersedia?",
        answer:
          "Program pelatihan yang tersedia mencakup Bahasa Jepang, Bahasa Korea, Persiapan Kerja, serta Program Intensif. Rincian materi dan kurikulum dapat disesuaikan dengan kebutuhan lembaga dan peserta.",
      },
      {
        question: "Siapa yang bisa mengikuti pelatihan?",
        answer:
          "Pelatihan terbuka untuk umum, mulai dari lulusan baru hingga profesional muda yang ingin mengembangkan kompetensi bahasa dan kesiapan kerja.",
      },
      {
        question: "Berapa lama durasi pelatihan?",
        answer:
          "Durasi pelatihan bervariasi sesuai program yang dipilih. Hubungi admin untuk mendapatkan jadwal dan durasi program angkatan terbaru.",
      },
      {
        question: "Berapa biaya pelatihan?",
        answer:
          "Rincian biaya pelatihan mencakup materi pembelajaran, bimbingan instruktur, serta fasilitas pendukung. Hubungi admin untuk rincian pembiayaan terbaru.",
      },
      {
        question: "Bagaimana cara mendaftar?",
        answer:
          "Pendaftaran dapat dilakukan secara online melalui tombol 'Daftar Pelatihan' atau dengan menghubungi kontak admin untuk panduan berkas persyaratan.",
      },
      {
        question: "Apakah tersedia konsultasi sebelum mendaftar?",
        answer:
          "Ya, calon peserta dapat berkonsultasi terlebih dahulu dengan tim admin mengenai pilihan program yang paling sesuai dengan target kompetensi.",
      },
    ] as FAQItem[],
  },

  // 14. Section: CTA Akhir
  cta: {
    headline: "Sudah Siap Mempersiapkan Masa Depan?",
    subheadline:
      "Dapatkan informasi program dan proses pendaftaran melalui admin. Konsultasi terbuka untuk semua calon peserta.",
    primaryButton: "Chat WhatsApp",
    secondaryButton: "Lihat Program",
  },
};

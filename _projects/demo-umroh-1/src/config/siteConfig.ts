import {
  PackageItem,
  ScheduleItem,
  WhyUsItem,
  StepItem,
  FacilityItem,
  GalleryItem,
  TestimonialItem,
  FAQItem,
  LegalityItem,
  SiteConfig,
} from "@/types";

/**
 * =======================================================================
 * DEMO UMROH - CENTRAL CONFIGURATION FILE (UNIVERSAL TEMPLATE)
 * =======================================================================
 * File konfigurasi universal untuk demo sales biro travel Umroh & Haji.
 * Pemilik travel dapat melihat bagaimana data bisnis mereka dapat
 * diterapkan ke dalam website ini dengan mengganti nilai di bawah ini.
 */

export const siteConfig: SiteConfig = {
  name: "DEMO UMROH",
  shortName: "DEMO UMROH",
  tagline: "Contoh Website Travel Umroh & Haji",
  category: "Website Travel Umroh & Haji",
  badge: "CONTOH WEBSITE",
  whatsapp: "[WHATSAPP_NUMBER]", // Ganti dengan nomor WhatsApp travel (contoh: "6281234567890")
  defaultWhatsAppMessage:
    "Halo Admin, saya ingin mendapatkan informasi mengenai paket Umroh.",
  email: "[EMAIL]", // Contoh: info@namatravel.com
  address: "[ALAMAT TRAVEL]", // Contoh: Jl. Protokol No. 123, Jakarta
  city: "[KOTA]",
  workingHours: "Senin - Sabtu: 08.30 - 17.00 WIB",
  socials: [
    {
      name: "Instagram",
      url: "https://instagram.com",
      handle: "@demoumroh",
    },
    {
      name: "Facebook",
      url: "https://facebook.com",
      handle: "Demo Umroh Official",
    },
    {
      name: "TikTok",
      url: "https://tiktok.com",
      handle: "@demoumroh",
    },
  ],
};

/**
 * Helper generator URL WhatsApp.
 * Otomatis menangani format demo [WHATSAPP_NUMBER] maupun nomor riil travel.
 */
export function getWhatsAppUrl(customMessage?: string, packageName?: string): string {
  let message = customMessage || siteConfig.defaultWhatsAppMessage;
  if (packageName) {
    message = `Halo Admin, saya tertarik dan ingin berkonsultasi mengenai ${packageName}. Mohon informasi detail jadwal dan ketersediaan kursinya. Terima kasih.`;
  }
  const encodedText = encodeURIComponent(message);
  const cleanNumber = siteConfig.whatsapp.replace(/[^0-9]/g, "");

  if (!cleanNumber || siteConfig.whatsapp.includes("[") || siteConfig.whatsapp.includes("NUMBER")) {
    return `https://api.whatsapp.com/send?text=${encodedText}`;
  }

  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

/**
 * 4 Indikator Trust Utama (Trust Section)
 * Sesuai arahan: Informasi Paket Jelas, Jadwal Terstruktur, Fasilitas Transparan, Konsultasi Mudah
 */
export const trustIndicators = [
  {
    title: "Informasi Paket Jelas",
    desc: "Rincian akomodasi, biaya, dan fasilitas disajikan terbuka sejak awal",
  },
  {
    title: "Jadwal Terstruktur",
    desc: "Perjalanan dan itinerary hari demi hari tersusun rapi",
  },
  {
    title: "Fasilitas Transparan",
    desc: "Pemberian informasi apa adanya tanpa biaya terselubung",
  },
  {
    title: "Konsultasi Mudah",
    desc: "Layanan konsultasi ramah dan responsif melalui WhatsApp",
  },
];

/**
 * DATA PAKET UMROH
 * 3 package cards: Reguler, Premium, Ramadhan dengan placeholder [Harga Paket] & [Durasi] Hari
 */
export const packages: PackageItem[] = [
  {
    id: "reguler",
    name: "Paket Umroh Reguler",
    subtitle: "Pilihan nyaman dan terencana dengan fasilitas terstandarisasi untuk ibadah khusyuk.",
    price: "Rp [Harga Paket]",
    priceNote: "Estimasi per jamaah",
    duration: "[Durasi] Hari",
    departure: "[Tanggal Keberangkatan]",
    badge: "POPULER",
    isRecommended: false,
    hotelMakkah: "[Isi sesuai data travel] (Hotel Bintang Makkah)",
    hotelMadinah: "[Isi sesuai data travel] (Hotel Bintang Madinah)",
    airline: "[Isi sesuai data travel] (Maskapai Penerbangan)",
    highlights: [
      "Tiket Pesawat Pulang-Pergi",
      "Hotel Akomodasi Makkah & Madinah",
      "Transportasi Bus AC selama di Arab Saudi",
      "Konsumsi Makanan 3x Sehari (Menu Nusantara)",
      "Pembimbing Ibadah (Muthawwif) Berpengalaman",
    ],
    itinerary: [
      {
        day: "Hari 1",
        title: "Keberangkatan Menuju Tanah Suci",
        desc: "[Isi sesuai data travel] - Kumpul di bandara keberangkatan, briefing teknis, dan penerbangan menuju Jeddah/Madinah.",
      },
      {
        day: "Hari 2-4",
        title: "Ibadah & Ziarah di Madinah",
        desc: "[Isi sesuai data travel] - Sholat berjamaah di Masjid Nabawi, ziarah ke Raudhah, Makam Rasulullah SAW, dan ziarah kota Madinah.",
      },
      {
        day: "Hari 5",
        title: "Mengambil Miqat & Menuju Makkah",
        desc: "[Isi sesuai data travel] - Mengenakan ihram, miqat di Bir Ali, perjalanan menuju Makkah dan pelaksanaan ibadah Umroh pertama.",
      },
      {
        day: "Hari 6-8",
        title: "Ibadah & Ziarah di Makkah",
        desc: "[Isi sesuai data travel] - Memperbanyak thawaf sunnah di Masjidil Haram, ziarah Jabal Tsur, Arafah, Muzdalifah, dan Mina.",
      },
      {
        day: "Hari Terakhir",
        title: "Thawaf Wada' & Kepulangan",
        desc: "[Isi sesuai data travel] - Thawaf perpisahan, perjalanan ke bandara Jeddah dan kepulangan ke tanah air.",
      },
    ],
    facilitiesIncluded: [
      "[Isi sesuai data travel] - Tiket pesawat PP kelas ekonomi",
      "[Isi sesuai data travel] - Akomodasi hotel di Makkah & Madinah",
      "[Isi sesuai data travel] - Visa Umroh & asuransi perjalanan resmi",
      "[Isi sesuai data travel] - Makan 3x sehari cita rasa Indonesia (Full Board)",
      "[Isi sesuai data travel] - Transportasi bus AC eksekutif pariwisata",
      "[Isi sesuai data travel] - Pembimbing ibadah (Muthawwif) berpengalaman",
      "[Isi sesuai data travel] - Handling bandara kedatangan dan kepulangan",
    ],
    facilitiesExcluded: [
      "[Isi sesuai data travel] - Biaya pembuatan paspor & vaksinasi",
      "[Isi sesuai data travel] - Pengeluaran pribadi (laundry, telepon, kelebihan bagasi)",
      "[Isi sesuai data travel] - Keperluan pribadi di luar jadwal program resmi",
    ],
    requirements: [
      "[Isi sesuai data travel] - Paspor asli dengan masa berlaku minimal 7 bulan",
      "[Isi sesuai data travel] - Fotokopi KTP dan Kartu Keluarga",
      "[Isi sesuai data travel] - Buku nikah asli (bagi pasangan suami-istri)",
      "[Isi sesuai data travel] - Pas foto terbaru ukuran 4x6 latar belakang putih",
      "[Isi sesuai data travel] - Sertifikat vaksinasi sesuai regulasi resmi",
    ],
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "premium",
    name: "Paket Umroh Premium",
    subtitle: "Kenyamanan maksimal dengan hotel bintang lima sedekat pelataran masjid dan penerbangan langsung.",
    price: "Rp [Harga Paket]",
    priceNote: "Estimasi per jamaah",
    duration: "[Durasi] Hari",
    departure: "[Tanggal Keberangkatan]",
    badge: "REKOMENDASI",
    isRecommended: true,
    hotelMakkah: "[Isi sesuai data travel] (Hotel Bintang 5 Pelataran Makkah)",
    hotelMadinah: "[Isi sesuai data travel] (Hotel Bintang 5 Pelataran Madinah)",
    airline: "[Isi sesuai data travel] (Maskapai Direct Flight)",
    highlights: [
      "Hotel Bintang 5 Dekat Pelataran Masjid",
      "Transportasi Bus VIP / Kereta Cepat",
      "Konsumsi Prasmanan Hotel Bintang 5",
      "Pembimbing Ibadah (Asatidz Rujukan)",
      "Perlengkapan Umroh Eksklusif & Executive Lounge",
    ],
    itinerary: [
      {
        day: "Hari 1",
        title: "Layanan Lounge & Direct Flight",
        desc: "[Isi sesuai data travel] - Layanan executive lounge bandara sebelum penerbangan langsung menuju Tanah Suci.",
      },
      {
        day: "Hari 2-4",
        title: "Kekhusyukan di Ring 1 Masjid Nabawi",
        desc: "[Isi sesuai data travel] - Menginap di hotel bintang lima depan pelataran, ziarah Raudhah, dan kajian keislaman.",
      },
      {
        day: "Hari 5",
        title: "Perjalanan Menuju Makkah Al-Mukarramah",
        desc: "[Isi sesuai data travel] - Mengambil miqat, perjalanan dengan transportasi berstandar eksekutif, dan ibadah Umroh.",
      },
      {
        day: "Hari 6-8",
        title: "Ibadah Intensif di Masjidil Haram",
        desc: "[Isi sesuai data travel] - Akses sangat dekat ke pelataran Ka'bah memudahkan sholat fardhu berjamaah dan thawaf sunnah.",
      },
      {
        day: "Hari Terakhir",
        title: "Thawaf Wada' & Kepulangan Nyaman",
        desc: "[Isi sesuai data travel] - Thawaf perpisahan, istirahat sebelum check-out, transfer ke bandara dan kepulangan ke tanah air.",
      },
    ],
    facilitiesIncluded: [
      "[Isi sesuai data travel] - Tiket pesawat direct flight maskapai ternama",
      "[Isi sesuai data travel] - Hotel bintang 5 ring 1 sedekat pelataran masjid",
      "[Isi sesuai data travel] - Transportasi bus VIP eksekutif / Kereta Cepat",
      "[Isi sesuai data travel] - Visa Umroh & asuransi perjalanan internasional",
      "[Isi sesuai data travel] - Makan full-board prasmanan menu hotel bintang 5",
      "[Isi sesuai data travel] - Bimbingan ibadah intensif bersama Asatidz rujukan",
      "[Isi sesuai data travel] - Perlengkapan eksklusif koper hardcase & lounge bandara",
    ],
    facilitiesExcluded: [
      "[Isi sesuai data travel] - Biaya pembuatan paspor & medical check-up",
      "[Isi sesuai data travel] - Pengeluaran pribadi dan kelebihan bagasi",
      "[Isi sesuai data travel] - Upgrade kamar private suite di luar paket",
    ],
    requirements: [
      "[Isi sesuai data travel] - Paspor asli berlaku minimal 7 bulan",
      "[Isi sesuai data travel] - Dokumen identitas (KTP, KK, Buku Nikah/Akta)",
      "[Isi sesuai data travel] - Pas foto 4x6 latar belakang putih",
      "[Isi sesuai data travel] - Keterangan medis / vaksinasi resmi",
    ],
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "ramadhan",
    name: "Paket Umroh Ramadhan",
    subtitle: "Meraih keutamaan pahala berlipat ganda dan kekhusyukan malam-malam Lailatul Qadar.",
    price: "Rp [Harga Paket]",
    priceNote: "Estimasi per jamaah",
    duration: "[Durasi] Hari",
    departure: "[Tanggal Keberangkatan]",
    badge: "SPESIAL RAMADHAN",
    isRecommended: false,
    hotelMakkah: "[Isi sesuai data travel] (Akomodasi Ramadhan Makkah)",
    hotelMadinah: "[Isi sesuai data travel] (Akomodasi Ramadhan Madinah)",
    airline: "[Isi sesuai data travel] (Penerbangan Ramadhan)",
    highlights: [
      "Akomodasi Strategis Bulan Ramadhan",
      "Transportasi Bus AC Antar Kota Suci",
      "Konsumsi Menu Sahur & Buka Puasa (Ifthar)",
      "Pembimbing Ibadah Pendampingan Spiritual",
      "Program Sholat Tarawih & I'tikaf Lailatul Qadar",
    ],
    itinerary: [
      {
        day: "Hari 1-3",
        title: "Suasana Suci Ramadhan di Madinah",
        desc: "[Isi sesuai data travel] - Berbuka puasa di pelataran Masjid Nabawi dan sholat Tarawih berjamaah di masjid Rasulullah SAW.",
      },
      {
        day: "Hari 4-6",
        title: "Ziarah Sejarah & Penguatan Ruhani",
        desc: "[Isi sesuai data travel] - Ziarah napak tilas perjuangan Islam, bimbingan tadarus harian, dan persiapan miqat.",
      },
      {
        day: "Hari 7-10",
        title: "Pelaksanaan Umroh Ramadhan di Makkah",
        desc: "[Isi sesuai data travel] - Mengambil miqat dan beribadah Umroh di Masjidil Haram dengan nuansa Ramadhan yang agung.",
      },
      {
        day: "Hari Terakhir",
        title: "I'tikaf Lailatul Qadar & Penutupan",
        desc: "[Isi sesuai data travel] - Fokus iktikaf dan munajat doa bersama hingga persiapan teknis kepulangan ke tanah air.",
      },
    ],
    facilitiesIncluded: [
      "[Isi sesuai data travel] - Tiket pesawat PP sesuai program",
      "[Isi sesuai data travel] - Akomodasi hotel strategis selama bulan Ramadhan",
      "[Isi sesuai data travel] - Penyediaan menu Sahur dan Berbuka Puasa harian",
      "[Isi sesuai data travel] - Visa Umroh Ramadhan & asuransi resmi",
      "[Isi sesuai data travel] - Bimbingan ibadah dan muthawwif berpengalaman",
      "[Isi sesuai data travel] - Transportasi ziarah dan bus AC antar kota",
      "[Isi sesuai data travel] - Perlengkapan Umroh lengkap",
    ],
    facilitiesExcluded: [
      "[Isi sesuai data travel] - Biaya pembuatan paspor",
      "[Isi sesuai data travel] - Kebutuhan dan pengeluaran pribadi",
      "[Isi sesuai data travel] - Dam / denda manasik mandiri",
    ],
    requirements: [
      "[Isi sesuai data travel] - Paspor aktif minimal 7 bulan",
      "[Isi sesuai data travel] - Pendaftaran lebih awal (kuota visa Ramadhan terbatas)",
      "[Isi sesuai data travel] - Kesiapan fisik untuk beribadah di bulan puasa",
    ],
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1000&auto=format&fit=crop",
  },
];

/**
 * JADWAL KEBERANGKATAN
 * Contoh card / tabel: [Tanggal] - Umroh Reguler / Premium / Ramadhan
 */
export const departureSchedules: ScheduleItem[] = [
  {
    id: "sch-1",
    date: "[Tanggal]",
    packageType: "Umroh Reguler",
    duration: "[Durasi] Hari",
    airline: "[Maskapai]",
    seatsLeft: "[Sisa Kursi]",
    status: "Tersedia",
    statusVariant: "available",
  },
  {
    id: "sch-2",
    date: "[Tanggal]",
    packageType: "Umroh Premium",
    duration: "[Durasi] Hari",
    airline: "[Maskapai]",
    seatsLeft: "[Sisa Kursi]",
    status: "Seat Terbatas",
    statusVariant: "limited",
  },
  {
    id: "sch-3",
    date: "[Tanggal]",
    packageType: "Umroh Ramadhan",
    duration: "[Durasi] Hari",
    airline: "[Maskapai]",
    seatsLeft: "[Sisa Kursi]",
    status: "Pendaftaran Dibuka",
    statusVariant: "available",
  },
  {
    id: "sch-4",
    date: "[Tanggal]",
    packageType: "Umroh Reguler",
    duration: "[Durasi] Hari",
    airline: "[Maskapai]",
    seatsLeft: "[Sisa Kursi]",
    status: "Tersedia",
    statusVariant: "available",
  },
  {
    id: "sch-5",
    date: "[Tanggal]",
    packageType: "Umroh Premium",
    duration: "[Durasi] Hari",
    airline: "[Maskapai]",
    seatsLeft: "[Sisa Kursi]",
    status: "Seat Terbatas",
    statusVariant: "limited",
  },
  {
    id: "sch-6",
    date: "[Tanggal]",
    packageType: "Umroh Ramadhan",
    duration: "[Durasi] Hari",
    airline: "[Maskapai]",
    seatsLeft: "[Sisa Kursi]",
    status: "Segera Penuh",
    statusVariant: "closing",
  },
];

/**
 * 5-STEP ALUR PENDAFTARAN
 */
export const registrationSteps: StepItem[] = [
  {
    step: "01",
    title: "Konsultasi",
    description: "Hubungi admin dan tentukan kebutuhan perjalanan Anda.",
    detail: "Calon jamaah dapat menanyakan ketersediaan paket, jadwal, serta estimasi biaya melalui WhatsApp.",
  },
  {
    step: "02",
    title: "Pilih Paket",
    description: "Pilih paket Umroh yang paling sesuai.",
    detail: "Tentukan pilihan akomodasi, durasi hari, dan tipe kamar sesuai preferensi dan anggaran keluarga.",
  },
  {
    step: "03",
    title: "Lengkapi Dokumen",
    description: "Siapkan data diri dan dokumen perjalanan.",
    detail: "Kumpulkan paspor, kartu identitas, dan berkas persyaratan sesuai panduan resmi dari tim travel.",
  },
  {
    step: "04",
    title: "Konfirmasi",
    description: "Admin memverifikasi dan memproses pendaftaran.",
    detail: "Verifikasi dokumen, proses pendaftaran visa umroh, serta penerbitan manifes jamaah.",
  },
  {
    step: "05",
    title: "Persiapan Keberangkatan",
    description: "Pembekalan manasik dan pembagian perlengkapan.",
    detail: "Peserta menerima perlengkapan ibadah, mengikuti pembekalan teknis manasik, dan siap berangkat ke Tanah Suci.",
  },
];

/**
 * FASILITAS PERJALANAN (6 Fasilitas Utama)
 */
export const facilities: FacilityItem[] = [
  {
    id: "fac-flight",
    title: "Tiket Pesawat",
    description:
      "Penerbangan berjadwal dengan maskapai terpercaya kelas ekonomi atau direct flight sesuai ketentuan paket.",
    icon: "Plane",
    tag: "Penerbangan Nyaman",
  },
  {
    id: "fac-hotel",
    title: "Hotel",
    description:
      "Penginapan terstandarisasi bintang 3, 4, atau 5 di Makkah dan Madinah dengan akses yang memudahkan ke masjid.",
    icon: "Hotel",
    tag: "Dekat Pelataran",
  },
  {
    id: "fac-transport",
    title: "Transportasi",
    description:
      "Bus AC eksekutif pariwisata berstandar Arab Saudi untuk rute ziarah dan mobilitas antar kota suci.",
    icon: "Bus",
    tag: "AC Eksekutif",
  },
  {
    id: "fac-food",
    title: "Konsumsi",
    description:
      "Penyediaan makan 3 kali sehari dengan menu cita rasa Nusantara (Full Board) untuk menjaga stamina ibadah.",
    icon: "Utensils",
    tag: "Menu Nusantara 3x",
  },
  {
    id: "fac-guide",
    title: "Pembimbing",
    description:
      "Didampingi Muthawwif berpengalaman yang membimbing langsung setiap rukun ibadah dan doa sesuai sunnah.",
    icon: "Users",
    tag: "Muthawwif Khidmat",
  },
  {
    id: "fac-kit",
    title: "Perlengkapan",
    description:
      "Set perlengkapan ibadah mencakup koper, kain ihram / mukena, tas paspor, seragam, dan buku panduan doa.",
    icon: "Luggage",
    tag: "Paket Lengkap",
  },
];

/**
 * GALERI DOKUMENTASI (Generik)
 * Badge: "Contoh Galeri"
 */
export const gallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Masjidil Haram",
    category: "Makkah",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000&auto=format&fit=crop",
    caption: "Keagungan Ka'bah dan suasana ibadah thawaf di Masjidil Haram.",
  },
  {
    id: "gal-2",
    title: "Masjid Nabawi",
    category: "Madinah",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1000&auto=format&fit=crop",
    caption: "Pesona payung hidrolik dan kedamaian sholat di Masjid Nabawi.",
  },
  {
    id: "gal-3",
    title: "Suasana Jamaah",
    category: "Jamaah",
    image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?q=80&w=1000&auto=format&fit=crop",
    caption: "Momen kekhusyukan dan kebersamaan para jamaah saat berdoa.",
  },
  {
    id: "gal-4",
    title: "Perjalanan Ibadah",
    category: "Perjalanan",
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1000&auto=format&fit=crop",
    caption: "Kenyamanan dan ketertiban perjalanan ziarah di Tanah Suci.",
  },
  {
    id: "gal-5",
    title: "Briefing & Manasik",
    category: "Briefing",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop",
    caption: "Sesi pembekalan tata cara ibadah dan persiapan teknis peserta.",
  },
  {
    id: "gal-6",
    title: "Kegiatan Ziarah",
    category: "Kegiatan",
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1000&auto=format&fit=crop",
    caption: "Kunjungan napak tilas ke situs-situs bersejarah Islam.",
  },
  {
    id: "gal-7",
    title: "Akomodasi Hotel",
    category: "Akomodasi",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    caption: "Gambaran fasilitas kamar hotel yang bersih dan nyaman untuk istirahat.",
  },
  {
    id: "gal-8",
    title: "Armada Transportasi",
    category: "Transportasi",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop",
    caption: "Armada bus pariwisata eksekutif untuk mobilitas selama ziarah.",
  },
];

/**
 * TESTIMONI (Label: "Contoh Testimoni")
 */
export const testimonials: TestimonialItem[] = [
  {
    id: "testi-1",
    name: "Peserta Demo 01",
    role: "Contoh Calon Jamaah",
    quote:
      "Penyajian informasi paket sangat jelas dan mudah dipahami. Proses konsultasi via WhatsApp juga sangat cepat dan membantu.",
    rating: 5,
    program: "Paket Umroh Reguler",
  },
  {
    id: "testi-2",
    name: "Peserta Demo 02",
    role: "Contoh Calon Jamaah",
    quote:
      "Tampilan jadwal dan rincian fasilitas sangat terbuka. Penjelasan admin sangat runtut saat menanyakan persiapan untuk keluarga.",
    rating: 5,
    program: "Paket Umroh Premium",
  },
  {
    id: "testi-3",
    name: "Peserta Demo 03",
    role: "Contoh Calon Jamaah",
    quote:
      "Struktur itinerary hari demi hari sangat teratur sehingga kami mendapatkan gambaran yang jelas sebelum mendaftar.",
    rating: 5,
    program: "Paket Umroh Ramadhan",
  },
];

/**
 * LEGALITAS TRAVEL
 * Placeholder: [Nomor Izin / Legalitas], [Nama Badan Usaha], [Dokumen Legalitas]
 */
export const legalityData: LegalityItem[] = [
  {
    title: "Izin Resmi Penyelenggara",
    placeholderValue: "[Nomor Izin / Legalitas]",
    description: "Nomor registrasi resmi izin operasional sebagai Penyelenggara Perjalanan Ibadah Umroh.",
  },
  {
    title: "Identitas Perusahaan",
    placeholderValue: "[Nama Badan Usaha]",
    description: "Nama resmi badan usaha / perseroan pemilik biro travel Umroh.",
  },
  {
    title: "Kelengkapan Legalitas",
    placeholderValue: "[Dokumen Legalitas]",
    description: "NIB (Nomor Induk Berusaha), akta pendirian, dan dokumen perizinan instansi terkait.",
  },
];

/**
 * FREQUENTLY ASKED QUESTIONS (FAQ)
 */
export const faqData: FAQItem[] = [
  {
    id: "faq-1",
    question: "Apa saja paket Umroh yang tersedia?",
    answer:
      "Kami menyediakan contoh program seperti Paket Umroh Reguler, Paket Umroh Premium, serta Paket Ramadhan. Setiap paket dapat disesuaikan dengan program travel Anda. Hubungi admin untuk mendapatkan informasi terbaru.",
  },
  {
    id: "faq-2",
    question: "Bagaimana jadwal keberangkatannya?",
    answer:
      "Jadwal keberangkatan ditampilkan secara berkala pada bagian jadwal. Untuk update ketersediaan kursi dan kepastian tanggal per bulan, hubungi admin untuk mendapatkan informasi terbaru.",
  },
  {
    id: "faq-3",
    question: "Apa saja fasilitas yang termasuk?",
    answer:
      "Fasilitas umumnya mencakup tiket pesawat pulang-pergi, akomodasi hotel di Makkah dan Madinah, visa umroh, transportasi bus AC, makan 3x sehari menu Indonesia, pembimbing ibadah, serta perlengkapan umroh. Hubungi admin untuk mendapatkan informasi terbaru.",
  },
  {
    id: "faq-4",
    question: "Bagaimana proses pendaftaran?",
    answer:
      "Proses pendaftaran melalui 5 langkah mudah: (1) Konsultasi via WhatsApp, (2) Memilih paket yang sesuai, (3) Melengkapi dokumen pendaftaran, (4) Konfirmasi berkas, dan (5) Persiapan keberangkatan serta bimbingan manasik.",
  },
  {
    id: "faq-5",
    question: "Dokumen apa yang diperlukan?",
    answer:
      "Dokumen utama yang dipersiapkan mencakup paspor dengan masa berlaku minimal 7 bulan, KTP, Kartu Keluarga, buku nikah (jika suami-istri), dan pas foto. Hubungi admin untuk mendapatkan informasi terbaru mengenai persyaratan visa.",
  },
  {
    id: "faq-6",
    question: "Bagaimana cara konsultasi?",
    answer:
      "Anda dapat langsung mengklik tombol 'Konsultasi' atau ikon WhatsApp di website ini. Admin akan segera menyapa dan membantu menjawab pertanyaan Anda dengan ramah.",
  },
  {
    id: "faq-7",
    question: "Apakah tersedia paket Ramadhan?",
    answer:
      "Ya, tersedia contoh program Umroh Ramadhan untuk awal, pertengahan, ataupun 10 malam terakhir Ramadhan. Hubungi admin untuk mendapatkan informasi terbaru mengenai kuota dan jadwalnya.",
  },
];

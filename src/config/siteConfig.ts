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
 * SAFARA UMROH - CENTRAL CONFIGURATION FILE
 * =======================================================================
 * File konfigurasi utama untuk mempermudah kustomisasi ketika website
 * digunakan untuk klien biro travel Umroh nyata. Cukup perbarui data di bawah ini.
 */

export const siteConfig: SiteConfig = {
  name: "Safara Umroh",
  shortName: "Safara",
  tagline: "Teman Perjalanan Menuju Tanah Suci",
  category: "UMROH & HAJI",
  badge: "DEMO WEBSITE",
  whatsapp: "[WHATSAPP_NUMBER]", // Ganti dengan nomor WhatsApp resmi, contoh: "6281234567890"
  defaultWhatsAppMessage:
    "Halo Admin Safara Umroh, saya ingin mendapatkan informasi mengenai paket Umroh.",
  email: "[EMAIL]", // Contoh: info@safaraumroh.com
  address: "[ALAMAT]", // Contoh: Jl. Sudirman No. 123, Jakarta Selatan
  city: "Jakarta",
  workingHours: "Senin - Sabtu: 08.30 - 17.00 WIB",
  socials: [
    {
      name: "Instagram",
      url: "https://instagram.com",
      handle: "@safaraumroh",
    },
    {
      name: "Facebook",
      url: "https://facebook.com",
      handle: "Safara Umroh Official",
    },
    {
      name: "TikTok",
      url: "https://tiktok.com",
      handle: "@safara.umroh",
    },
  ],
};

/**
 * Helper generator URL WhatsApp.
 * Jika nomor masih berupa placeholder "[WHATSAPP_NUMBER]", link tetap valid (wa.me)
 * dengan pesan yang sudah terisi otomatis.
 */
export function getWhatsAppUrl(customMessage?: string, packageName?: string): string {
  let message = customMessage || siteConfig.defaultWhatsAppMessage;
  if (packageName) {
    message = `Halo Admin Safara Umroh, saya tertarik dan ingin berkonsultasi mengenai ${packageName}. Mohon informasi detail jadwal dan ketersediaan kursinya. Terima kasih.`;
  }
  const encodedText = encodeURIComponent(message);
  const cleanNumber = siteConfig.whatsapp.replace(/[^0-9]/g, "");

  if (!cleanNumber || siteConfig.whatsapp.includes("[") || siteConfig.whatsapp.includes("NUMBER")) {
    // Demo fallback: link share text wa.me
    return `https://api.whatsapp.com/send?text=${encodedText}`;
  }

  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

/**
 * 4 Indikator Trust Utama (Trust Strip)
 * Tanpa angka fiktif / klaim palsu
 */
export const trustIndicators = [
  {
    title: "Paket Jelas",
    desc: "Rincian akomodasi, biaya, dan fasilitas terbuka sejak awal",
  },
  {
    title: "Jadwal Terstruktur",
    desc: "Perjalanan dan itinerary hari demi hari tersusun rapi",
  },
  {
    title: "Informasi Transparan",
    desc: "Pemberian informasi apa adanya tanpa biaya terselubung",
  },
  {
    title: "Admin Responsif",
    desc: "Konsultasi ramah dan sigap via WhatsApp untuk calon jamaah",
  },
];

/**
 * DATA PAKET UMROH
 * Harga dan tanggal menggunakan placeholder terstruktur sesuai panduan demo
 */
export const packages: PackageItem[] = [
  {
    id: "reguler",
    name: "Paket Umroh Reguler",
    subtitle: "Pilihan nyaman dan terencana dengan fasilitas terstandarisasi untuk ibadah khusyuk.",
    price: "Rp [Harga]",
    priceNote: "Mulai dari / perkiraan per jamaah",
    duration: "[9–12] Hari",
    departure: "[Tanggal / Bulan]",
    badge: "POPULER",
    isRecommended: false,
    hotelMakkah: "[Hotel Bintang 3/4 - Makkah] (±350-500m dari Masjidil Haram)",
    hotelMadinah: "[Hotel Bintang 3/4 - Madinah] (±200-350m dari Masjid Nabawi)",
    airline: "[Maskapai Penerbangan / Sesuai Jadwal]",
    highlights: [
      "Hotel bintang terstandar dekat masjid",
      "Transportasi bus AC eksekutif pariwisata",
      "Makan 3x sehari cita rasa Nusantara",
      "Pembimbing ibadah (Muthawwif) bersertifikat",
      "Perlengkapan Umroh lengkap & eksklusif",
    ],
    itinerary: [
      {
        day: "Hari 1",
        title: "Keberangkatan Menuju Tanah Suci",
        desc: "Berkumpul di bandara keberangkatan, briefing teknis manasik singkat, dan take-off menuju bandara Jeddah/Madinah.",
      },
      {
        day: "Hari 2-4",
        title: "Ibadah & Ziarah di Madinah Munawwarah",
        desc: "Check-in hotel, sholat fardhu berjamaah di Masjid Nabawi, ziarah ke Raudhah Syarif, Makam Rasulullah SAW, serta city tour ke Masjid Quba dan Jabal Uhud.",
      },
      {
        day: "Hari 5",
        title: "Mengambil Miqat & Perjalanan ke Makkah",
        desc: "Mengenakan pakaian ihram dari hotel, mengambil miqat di Masjid Bir Ali, dan melanjutkan perjalanan menuju Makkah untuk melaksanakan Umroh pertama.",
      },
      {
        day: "Hari 6-8",
        title: "Ibadah & Ziarah di Makkah Al-Mukarramah",
        desc: "Memperbanyak thawaf sunnah dan sholat berjamaah di Masjidil Haram. Agenda ziarah ke Jabal Tsur, Jabal Rahmah (Arafah), Muzdalifah, dan Mina.",
      },
      {
        day: "Hari 9",
        title: "Thawaf Wada' & Kepulangan ke Tanah Air",
        desc: "Pelaksanaan thawaf perpisahan (wada'), perjalanan menuju bandara Jeddah, dan penerbangan kembali ke tanah air.",
      },
    ],
    facilitiesIncluded: [
      "Tiket pesawat PP kelas ekonomi [Maskapai Sesuai Program]",
      "Akomodasi hotel di Makkah & Madinah (sekamar ber-4/ber-3/ber-2)",
      "Visa Umroh & asuransi perjalanan",
      "Makan 3x sehari menu masakan Indonesia (Full Board)",
      "Transportasi bus AC eksekutif selama di Arab Saudi",
      "Bimbingan Muthawwif berpengalaman & tour leader",
      "City tour ziarah Makkah & Madinah",
      "Handling bandara kedatangan dan kepulangan",
      "Air Zamzam (kondisional sesuai regulasi maskapai)",
      "Perlengkapan Umroh (Koper, kain ihram/mukena, tas paspor, batik, buku doa)",
    ],
    facilitiesExcluded: [
      "Biaya pembuatan paspor & medical check-up",
      "Vaksinasi meningitis/sesuai regulasi yang berlaku",
      "Pengeluaran pribadi (laundry, roaming telepon, kelebihan bagasi)",
      "Biaya kursi roda / muthawwif khusus lansia jika diperlukan",
      "Ziarah / tour di luar jadwal program resmi",
    ],
    requirements: [
      "Paspor asli dengan masa berlaku minimal 7 bulan sebelum keberangkatan",
      "Nama di paspor minimal terdiri dari 2 kata (contoh: Muhammad Fikri)",
      "Buku nikah asli (bagi pasangan suami-istri)",
      "Akta kelahiran / Kartu Keluarga asli (bagi peserta anak-anak)",
      "Pas foto terbaru ukuran 4x6 latar belakang putih (fokus wajah 80%)",
      "Sertifikat vaksinasi sesuai regulasi resmi otoritas penerbangan",
    ],
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "premium",
    name: "Paket Umroh Premium",
    subtitle: "Kenyamanan maksimal dengan hotel bintang lima sedekat pelataran masjid dan penerbangan langsung.",
    price: "Rp [Harga]",
    priceNote: "Mulai dari / perkiraan per jamaah",
    duration: "[9–12] Hari",
    departure: "[Tanggal / Bulan]",
    badge: "REKOMENDASI",
    isRecommended: true,
    hotelMakkah: "[Hotel Bintang 5 Pelataran Makkah] (±50m dari pelataran Masjidil Haram)",
    hotelMadinah: "[Hotel Bintang 5 Pelataran Madinah] (±50m dari pelataran Masjid Nabawi)",
    airline: "[Maskapai Full Service / Direct Flight]",
    highlights: [
      "Hotel bintang 5 premium ring 1 pelataran",
      "Penerbangan direct tanpa transit maskapai ternama",
      "Makan prasmanan hotel bintang 5 (full board)",
      "Pembimbing ibadah asatidz rujukan",
      "Perlengkapan koper hardcase eksklusif & lounge bandara",
    ],
    itinerary: [
      {
        day: "Hari 1",
        title: "Layanan Lounge & Direct Flight",
        desc: "Fasilitas executive lounge di bandara sebelum keberangkatan. Penerbangan langsung tanpa transit menuju Madinah/Jeddah.",
      },
      {
        day: "Hari 2-4",
        title: "Ibadah Khusyuk di Ring 1 Masjid Nabawi",
        desc: "Menginap di hotel bintang 5 langsung menghadap pelataran. Akses ziarah Raudhah dengan tasreh resmi, sholat di shaf utama, dan kajian tematik.",
      },
      {
        day: "Hari 5",
        title: "Kereta Cepat Haramain Menuju Makkah",
        desc: "Mengambil miqat di Bir Ali, menempuh perjalanan Madinah - Makkah dengan Kereta Cepat Haramain (High Speed Train) yang nyaman dan cepat.",
      },
      {
        day: "Hari 6-8",
        title: "Ibadah Intensif di Masjidil Haram",
        desc: "Jarak hotel hanya beberapa langkah dari pelataran Ka'bah. Memudahkan sholat 5 waktu di masjid, thawaf sunnah, serta ziarah eksklusif.",
      },
      {
        day: "Hari 9-10",
        title: "Thawaf Wada' & Kepulangan Nyaman",
        desc: "Thawaf perpisahan, istirahat sebelum check-out, diantar dengan bus VIP menuju bandara Jeddah dan kepulangan direct flight ke tanah air.",
      },
    ],
    facilitiesIncluded: [
      "Tiket pesawat PP direct flight kelas ekonomi/bisnis [Maskapai Full Service]",
      "Akomodasi Hotel Bintang 5 Ring 1 (Makkah & Madinah depan pelataran)",
      "Tiket Kereta Cepat Haramain (Madinah - Makkah)",
      "Visa Umroh & asuransi perjalanan internasional komprehensif",
      "Makan full-board prasmanan menu hotel bintang 5",
      "Pembimbing ibadah (Asatidz) berpengalaman & pendampingan intensif",
      "Akses executive lounge di bandara saat keberangkatan",
      "Transportasi bus VIP eksekutif selama ziarah",
      "Set perlengkapan premium (Koper hardcase fiber, batik eksklusif, mukena/ihram katun premium)",
      "Handling bagasi prioritas bandara & hotel",
    ],
    facilitiesExcluded: [
      "Biaya pembuatan paspor & MCU pribadi",
      "Pengeluaran belanja pribadi di Tanah Suci",
      "Upgrade kamar khusus (Double / Single private suite)",
      "Kelebihan kuota bagasi penerbangan pribadi",
    ],
    requirements: [
      "Paspor asli berlaku minimal 7 bulan sebelum keberangkatan",
      "Fotokopi KTP, KK, dan Buku Nikah (bagi suami-istri)",
      "Pas foto 4x6 latar belakang putih sebanyak 4 lembar",
      "Surat keterangan sehat/vaksinasi resmi",
    ],
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "ramadhan",
    name: "Paket Umroh Ramadhan",
    subtitle: "Meraih keutamaan pahala setara haji dan kekhusyukan malam-malam Lailatul Qadar.",
    price: "Rp [Harga]",
    priceNote: "Mulai dari / perkiraan per jamaah",
    duration: "[Durasi]",
    departure: "[Awal / Pertengahan / Akhir Ramadhan]",
    badge: "SPESIAL RAMADHAN",
    isRecommended: false,
    hotelMakkah: "[Hotel Bintang 4/5 - Makkah] (Akses strategis ke pelataran)",
    hotelMadinah: "[Hotel Bintang 4/5 - Madinah] (Dekat pintu masuk utama)",
    airline: "[Maskapai Terpilih / Penyesuaian Jadwal]",
    highlights: [
      "Akomodasi strategis di bulan suci Ramadhan",
      "Menu Sahur & Ifthar harian disiapkan",
      "Program sholat Tarawih & Qiyamul Lail berjamaah",
      "Pembimbing ibadah fokus pendampingan spiritual",
      "Program tadabbur Al-Qur'an & i'tikaf sepuluh malam akhir",
    ],
    itinerary: [
      {
        day: "Hari 1-3",
        title: "Suasana Awal Ramadhan di Madinah",
        desc: "Tiba di Madinah, merasakan syahdunya buka puasa bersama di pelataran Masjid Nabawi, dan sholat Tarawih berjamaah di masjid Rasulullah SAW.",
      },
      {
        day: "Hari 4-6",
        title: "Ziarah Sejarah & Penguatan Ruhani",
        desc: "Ziarah napak tilas perjuangan Nabi, bimbingan tadarus harian, dan persiapan mental menjelang perpindahan ke Baitullah.",
      },
      {
        day: "Hari 7-10",
        title: "Umroh Ramadhan di Masjidil Haram",
        desc: "Mengambil miqat dan melaksanakan ibadah Umroh Ramadhan. Menghidupkan sholat Tarawih 20 rakaat, doa qunut witir, dan munajat di Multazam.",
      },
      {
        day: "Hari 11+",
        title: "I'tikaf Lailatul Qadar & Penutupan",
        desc: "Fokus iktikaf dan doa bersama pada malam-malam ganjil di sepuluh hari terakhir Ramadhan, hingga persiapan kepulangan.",
      },
    ],
    facilitiesIncluded: [
      "Tiket pesawat PP [Maskapai Sesuai Program]",
      "Akomodasi hotel strategis di Makkah & Madinah selama Ramadhan",
      "Paket menu Sahur dan Berbuka Puasa (Ifthar) harian",
      "Visa Umroh Ramadhan resmi",
      "Bimbingan ibadah, kajian kultum, & muthawwif berpengalaman",
      "Transportasi ziarah dan bus AC antar kota",
      "Handling kedatangan dan kepulangan",
      "Perlengkapan Umroh lengkap",
    ],
    facilitiesExcluded: [
      "Biaya paspor & medical check-up",
      "Kebutuhan pribadi dan laundry",
      "Dam / denda manasik mandiri (jika ada pelanggaran ihram)",
    ],
    requirements: [
      "Paspor aktif minimal 7 bulan",
      "Pendaftaran seawal mungkin (kuota visa Ramadhan sangat ketat)",
      "Kesiapan fisik dan kesehatan untuk ibadah puasa di Tanah Suci",
    ],
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1000&auto=format&fit=crop",
  },
];

/**
 * JADWAL KEBERANGKATAN
 * Placeholder tanggal dan kursi tanpa klaim data nyata
 */
export const departureSchedules: ScheduleItem[] = [
  {
    id: "sch-1",
    date: "[15 Okt 2026]",
    packageType: "Umroh Reguler",
    duration: "9 Hari",
    airline: "[Maskapai Demo]",
    seatsLeft: "[Sisa 8 Kursi]",
    status: "Tersedia",
    statusVariant: "available",
  },
  {
    id: "sch-2",
    date: "[05 Nov 2026]",
    packageType: "Umroh Premium",
    duration: "10 Hari",
    airline: "[Direct Flight]",
    seatsLeft: "[Sisa 4 Kursi]",
    status: "Seat Terbatas",
    statusVariant: "limited",
  },
  {
    id: "sch-3",
    date: "[20 Des 2026]",
    packageType: "Umroh Akhir Tahun",
    duration: "12 Hari",
    airline: "[Maskapai Demo]",
    seatsLeft: "[Sisa 12 Kursi]",
    status: "Pendaftaran Dibuka",
    statusVariant: "available",
  },
  {
    id: "sch-4",
    date: "[14 Jan 2027]",
    packageType: "Umroh Reguler",
    duration: "9 Hari",
    airline: "[Maskapai Demo]",
    seatsLeft: "[Sisa 15 Kursi]",
    status: "Tersedia",
    statusVariant: "available",
  },
  {
    id: "sch-5",
    date: "[10 Feb 2027]",
    packageType: "Umroh Isra Mi'raj",
    duration: "10 Hari",
    airline: "[Direct Flight]",
    seatsLeft: "[Sisa 5 Kursi]",
    status: "Seat Terbatas",
    statusVariant: "limited",
  },
  {
    id: "sch-6",
    date: "[10 Mar 2027]",
    packageType: "Umroh Ramadhan",
    duration: "[Durasi]",
    airline: "[Maskapai Demo]",
    seatsLeft: "[Sisa 3 Kursi]",
    status: "Segera Penuh",
    statusVariant: "closing",
  },
];

/**
 * 4 ALASAN KENAPA MEMILIH SAFARA (Why Us)
 */
export const whyUs: WhyUsItem[] = [
  {
    number: "01",
    title: "Informasi Paket Jelas",
    description:
      "Rincian hotel, maskapai, durasi hari, dan apa saja yang didapat disajikan secara transparan sejak awal tanpa biaya yang disembunyikan.",
    icon: "FileCheck",
  },
  {
    number: "02",
    title: "Pendampingan Sebelum Keberangkatan",
    description:
      "Mulai dari panduan pembuatan dokumen, persiapan fisik, hingga bimbingan manasik yang terstruktur agar jamaah siap lahir dan batin.",
    icon: "HeartHandshake",
  },
  {
    number: "03",
    title: "Informasi Jadwal Terstruktur",
    description:
      "Rencana perjalanan disusun hari demi hari dengan jelas, memberi gambaran waktu ibadah dan ziarah yang tertib dan nyaman.",
    icon: "CalendarCheck",
  },
  {
    number: "04",
    title: "Konsultasi Mudah via WhatsApp",
    description:
      "Kemudahan menghubungi admin secara cepat dan santun untuk bertanya seputar paket, ketersediaan jadwal, maupun estimasi biaya perjalanan.",
    icon: "MessageSquareHeart",
  },
];

/**
 * 5-STEP ALUR PENDAFTARAN
 */
export const registrationSteps: StepItem[] = [
  {
    step: "01",
    title: "Konsultasi",
    description: "Hubungi admin dan tentukan kebutuhan.",
    detail:
      "Sampaikan rencana waktu keberangkatan, jumlah anggota keluarga yang berangkat, serta preferensi paket yang diinginkan melalui WhatsApp.",
  },
  {
    step: "02",
    title: "Pilih Paket",
    description: "Pilih paket yang sesuai.",
    detail:
      "Pilih paket Umroh yang selaras dengan kenyamanan akomodasi, tipe kamar (Quad/Triple/Double), serta jadwal yang paling pas untuk Anda.",
  },
  {
    step: "03",
    title: "Lengkapi Data",
    description: "Siapkan data dan dokumen.",
    detail:
      "Kumpulkan paspor aktif, identitas diri, foto, dan dokumen penunjang lainnya sesuai checklist resmi yang diberikan admin.",
  },
  {
    step: "04",
    title: "Konfirmasi",
    description: "Admin membantu proses berikutnya.",
    detail:
      "Admin melakukan verifikasi kelengkapan berkas, pemrosesan visa, dan pendaftaran manifes resmi peserta.",
  },
  {
    step: "05",
    title: "Persiapan Keberangkatan",
    description: "Peserta mendapatkan informasi persiapan perjalanan.",
    detail:
      "Peserta menerima perlengkapan ibadah, panduan briefing manasik, informasi teknis bagasi, dan pendampingan hingga hari keberangkatan.",
  },
];

/**
 * FASILITAS PERJALANAN (Grid 6 Fasilitas)
 */
export const facilities: FacilityItem[] = [
  {
    id: "fac-flight",
    title: "Tiket Pesawat",
    description:
      "Penerbangan berjadwal dengan maskapai terpercaya kelas ekonomi atau direct flight sesuai program paket.",
    icon: "Plane",
    tag: "Penerbangan Nyaman",
  },
  {
    id: "fac-hotel",
    title: "Hotel Akomodasi",
    description:
      "Penginapan terstandarisasi bintang 3, 4, atau 5 di Makkah dan Madinah dengan akses yang memudahkan ke masjid.",
    icon: "Hotel",
    tag: "Dekat Pelataran",
  },
  {
    id: "fac-transport",
    title: "Transportasi",
    description:
      "Bus AC eksekutif pariwisata berstandar Arab Saudi untuk rute ziarah kota dan perjalanan antar kota suci.",
    icon: "Bus",
    tag: "AC Eksekutif",
  },
  {
    id: "fac-food",
    title: "Konsumsi",
    description:
      "Penyediaan makan 3 kali sehari dengan menu cita rasa Nusantara (Full Board) untuk menjaga stamina jamaah.",
    icon: "Utensils",
    tag: "Menu Nusantara 3x",
  },
  {
    id: "fac-guide",
    title: "Pembimbing",
    description:
      "Didampingi Muthawwif berpengalaman yang membimbing langsung setiap rukun ibadah dan doa sesuai tuntunan sunnah.",
    icon: "Users",
    tag: "Muthawwif Khidmat",
  },
  {
    id: "fac-kit",
    title: "Perlengkapan",
    description:
      "Set perlengkapan ibadah lengkap mencakup koper, kain ihram / mukena, tas paspor, seragam batik, dan buku doa.",
    icon: "Luggage",
    tag: "Paket Lengkap",
  },
];

/**
 * GALERI DOKUMENTASI
 * Foto representatif bertema Makkah, Madinah, jamaah, hotel, bus, dan briefing
 */
export const gallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Masjidil Haram & Baitullah",
    category: "Makkah",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000&auto=format&fit=crop",
    caption: "Keagungan Ka'bah dan suasana thawaf yang khusyuk di Masjidil Haram.",
  },
  {
    id: "gal-2",
    title: "Masjid Nabawi Madinah",
    category: "Madinah",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1000&auto=format&fit=crop",
    caption: "Pesona payung hidrolik dan ketenangan sholat di Masjid Nabawi.",
  },
  {
    id: "gal-3",
    title: "Kekhusyukan Jamaah",
    category: "Ibadah",
    image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?q=80&w=1000&auto=format&fit=crop",
    caption: "Potret kebersamaan jamaah saat beribadah dan memanjatkan doa bersama.",
  },
  {
    id: "gal-4",
    title: "Suasana Perjalanan Ibadah",
    category: "Perjalanan",
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1000&auto=format&fit=crop",
    caption: "Kenyamanan dan ketertiban perjalanan ibadah di setiap titik rute ziarah.",
  },
  {
    id: "gal-5",
    title: "Akomodasi Hotel Nyaman",
    category: "Akomodasi",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    caption: "Gambaran fasilitas kamar hotel yang bersih dan nyaman untuk istirahat jamaah.",
  },
  {
    id: "gal-6",
    title: "Transportasi Bus Eksekutif",
    category: "Transportasi",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop",
    caption: "Armada bus pariwisata berpendingin udara untuk mobilitas selama ziarah.",
  },
  {
    id: "gal-7",
    title: "Kegiatan Briefing & Manasik",
    category: "Bimbingan",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop",
    caption: "Sesi edukasi tata cara ibadah dan persiapan teknis bersama calon jamaah.",
  },
  {
    id: "gal-8",
    title: "Kesejukan Kota Madinah",
    category: "Ziarah",
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1000&auto=format&fit=crop",
    caption: "Suasana damai di pelataran makam Rasulullah SAW dan situs bersejarah.",
  },
];

/**
 * TESTIMONI
 * Contoh testimoni demo tanpa klaim fiktif
 */
export const testimonials: TestimonialItem[] = [
  {
    id: "testi-1",
    name: "Peserta Demo 01",
    role: "Calon Jamaah Keluarga",
    quote:
      "Informasi paket dibuat lebih mudah dipahami dan proses konsultasinya terasa praktis.",
    rating: 5,
    program: "Paket Umroh Reguler",
  },
  {
    id: "testi-2",
    name: "Peserta Demo 02",
    role: "Calon Jamaah Mandiri",
    quote:
      "Pemaparan jadwal dan rincian fasilitas sangat terbuka. Penjelasan admin sangat runtut saat saya menanyakan kebutuhan khusus untuk orang tua.",
    rating: 5,
    program: "Paket Umroh Premium",
  },
  {
    id: "testi-3",
    name: "Peserta Demo 03",
    role: "Calon Jamaah Grup",
    quote:
      "Struktur itinerary hari demi hari sangat jelas sehingga keluarga kami merasa lebih mantap dalam mempersiapkan perjalanan.",
    rating: 5,
    program: "Paket Umroh Ramadhan",
  },
];

/**
 * TENTANG KAMI
 */
export const aboutContent = {
  heading: "Pendampingan Dimulai Sejak Konsultasi",
  body: "Safara Umroh adalah konsep travel Umroh yang mengutamakan penyajian informasi perjalanan secara jelas serta memudahkan calon jamaah mendapatkan informasi dan berkonsultasi.",
  mission: [
    "Menyajikan rincian paket ibadah dengan transparansi penuh tanpa keraguan.",
    "Memberikan layanan konsultasi yang ramah, santun, dan solutif bagi calon jamaah.",
    "Membantu persiapan administrasi dan pembekalan manasik secara terarah.",
  ],
};

/**
 * INFORMASI LEGALITAS (Trust / Safety Notice)
 * Menggunakan placeholder terstruktur tanpa mengarang nomor izin palsu
 */
export const legalityData: LegalityItem[] = [
  {
    title: "Izin Penyelenggara Umroh (PPIU)",
    placeholderValue: "[Nomor Izin / Legalitas Travel]",
    description: "Nomor registrasi resmi izin operasional sebagai Penyelenggara Perjalanan Ibadah Umroh.",
  },
  {
    title: "Legalitas Badan Hukum",
    placeholderValue: "[Dokumen Legalitas Perusahaan]",
    description: "Akta pendirian perseroan, NIB (Nomor Induk Berusaha), dan izin instansi terkait.",
  },
  {
    title: "Informasi Identitas Usaha",
    placeholderValue: "[Informasi Perusahaan / Alamat Kantor]",
    description: "Lokasi kantor operasional dan domisili usaha yang dapat diverifikasi langsung.",
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
      "Kami menyediakan pilihan program seperti Paket Umroh Reguler, Paket Umroh Premium, serta Paket Khusus Ramadhan. Setiap paket dirancang dengan variasi fasilitas hotel, durasi perjalanan, dan maskapai yang dapat disesuaikan dengan kebutuhan travel Anda. Hubungi admin untuk mendapatkan informasi terbaru.",
  },
  {
    id: "faq-2",
    question: "Bagaimana cara mengetahui jadwal keberangkatan?",
    answer:
      "Jadwal keberangkatan terangkum pada bagian tabel jadwal di website ini. Untuk ketersediaan sisa kursi terkini dan update kepastian tanggal per bulan, silakan hubungi admin untuk mendapatkan informasi terbaru.",
  },
  {
    id: "faq-3",
    question: "Apa saja fasilitas yang termasuk dalam paket?",
    answer:
      "Secara umum paket mencakup tiket pesawat pulang-pergi, akomodasi hotel di Makkah dan Madinah, visa umroh, transportasi bus AC selama di Tanah Suci, makan 3 kali sehari cita rasa Indonesia, pembimbing ibadah (muthawwif), serta perlengkapan umroh lengkap. Hubungi admin untuk rincian fasilitas spesifik tiap paket.",
  },
  {
    id: "faq-4",
    question: "Bagaimana proses pendaftaran?",
    answer:
      "Proses pendaftaran melalui 5 langkah mudah: (1) Konsultasi via WhatsApp dengan admin, (2) Memilih paket dan waktu keberangkatan, (3) Melengkapi dokumen identitas dan paspor, (4) Konfirmasi berkas oleh tim travel, dan (5) Mengikuti manasik serta pembekalan teknis menjelang hari keberangkatan.",
  },
  {
    id: "faq-5",
    question: "Dokumen apa saja yang diperlukan?",
    answer:
      "Dokumen utama yang perlu dipersiapkan antara lain: Paspor asli dengan masa berlaku minimal 7 bulan, fotokopi KTP, Kartu Keluarga, Buku Nikah (bagi suami-istri), dan pas foto terbaru sesuai standar visa. Hubungi admin untuk mendapatkan informasi terbaru mengenai persyaratan regulasi dokumen.",
  },
  {
    id: "faq-6",
    question: "Bagaimana cara konsultasi dengan admin?",
    answer:
      "Anda dapat langsung mengklik tombol 'Konsultasi via WhatsApp' di website ini atau menggunakan tombol WhatsApp mengapung di pojok kanan bawah. Admin kami siap membantu menjawab pertanyaan Anda dengan ramah dan informatif.",
  },
  {
    id: "faq-7",
    question: "Apakah tersedia paket khusus Ramadhan?",
    answer:
      "Ya, tersedia program Umroh Ramadhan yang dirancang khusus bagi jamaah yang menghendaki keutamaan ibadah di bulan suci Ramadhan, baik di awal bulan, pertengahan, maupun sepuluh hari terakhir (i'tikaf). Hubungi admin untuk mendapatkan informasi terbaru mengenai kuota dan jadwalnya.",
  },
];

export interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  badge: string;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "indoor-dining",
    title: "Indoor Dining",
    subtitle: "Kesejukan & Kenyamanan Maksimal",
    description:
      "Ruang ber-AC yang sejuk dan nyaman dengan tata meja luas, ideal untuk santap bersama keluarga besar, jamuan resmi, maupun santai bekerja dengan koneksi stabil.",
    features: ["Full AC & Non-Smoking", "Colokan Listrik & High-speed WiFi", "Meja Luas untuk Rombongan"],
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    badge: "Comfort & Chill",
  },
  {
    id: "outdoor-area",
    title: "Outdoor Area",
    subtitle: "Suasana Terbuka Tropis Alami",
    description:
      "Suasana terbuka yang asri dengan pencahayaan hangat di bawah langit malam Tuban. Tempat terbaik untuk bersantai, ngobrol hangat bersama sahabat, dan menikmati semilir angin.",
    features: ["Lush Tropical Plants", "Warm Ambient Lighting", "Smoking Friendly Area"],
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    badge: "Open Air Vibe",
  },
  {
    id: "live-music",
    title: "Live Music & Stage",
    subtitle: "Hiburan Musik Berkualitas Setiap Pekan",
    description:
      "Nikmati suasana malam semakin hidup dengan penampilan musik akustik hingga live band terbaik. Alunan melodi merdu menyempurnakan setiap suapan hidangan Anda.",
    features: ["Acoustic & Full Band Schedule", "Sound System Jernih & Warm", "Interactive Song Request"],
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    badge: "Entertainment",
  },
  {
    id: "private-room",
    title: "Private Room",
    subtitle: "Eksklusivitas untuk Rapat & Acara Spesial",
    description:
      "Pilihan ruang yang lebih private dan hening untuk kebutuhan meeting perusahaan, arisan keluarga, perayaan ulang tahun, atau jamuan makan malam intim.",
    features: ["Privasi Terjaga & Kedap Suara", "Fasilitas Screen / Meeting Ready", "Dedicated Service Staff"],
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
    badge: "VIP & Gathering",
  },
  {
    id: "spacious-parking",
    title: "Spacious Parking",
    subtitle: "Parkir Luas, Aman & Terorganisir",
    description:
      "Area parkir lapang tepat di tepi jalan protokol Basuki Rachmad yang dapat menampung puluhan mobil dan motor sekaligus, dijaga oleh petugas keamanan yang sigap.",
    features: ["Kapasitas Puluhan Mobil & Motor", "Akses Masuk & Keluar Mudah", "Keamanan Sigap Terpantau"],
    image:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80",
    badge: "Convenience",
  },
];

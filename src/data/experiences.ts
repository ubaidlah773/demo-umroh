export interface ExperienceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "family-dining",
    title: "Family Dining",
    tagline: "Comfortable dining for the whole family.",
    description:
      "Suasana hangat dan bersahabat untuk dinikmati seluruh generasi keluarga, dilengkapi ruangan ber-AC yang sejuk dan penataan meja lapang.",
    features: [
      "Meja makan luas untuk keluarga besar",
      "Pilihan menu ramah anak hingga lansia",
      "Ruangan dingin ber-AC yang tenang",
    ],
    image:
      "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "business-dining",
    title: "Business Dining",
    tagline: "An inviting place for meetings and professional gatherings.",
    description:
      "Pilihan ideal untuk jamuan makan siang klien, diskusi kerja, hingga jamuan makan malam bisnis dengan kenyamanan dan privasi terjaga.",
    features: [
      "Suasana kondusif untuk diskusi penting",
      "Pelayanan sigap dan profesional",
      "Lokasi strategis di pusat kota Tuban",
    ],
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "group-dining",
    title: "Group Dining",
    tagline: "Spacious seating for friends, teams, and larger groups.",
    description:
      "Kapasitas tempat duduk luas dan area parkir besar yang memudahkan rombongan teman, komunitas, instansi, maupun bus wisata.",
    features: [
      "Area makan luas berkapasitas besar",
      "Parkiran luas untuk mobil & bus rombongan",
      "Kemudahan paket menu sajian bersama",
    ],
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "special-occasions",
    title: "Special Occasions",
    tagline: "Celebrate meaningful moments over great food.",
    description:
      "Rayakan momen istimewa seperti ulang tahun, arisan, syukuran, atau reuni bersama kelezatan hidangan seafood segar khas Tuban.",
    features: [
      "Pengaturan meja khusus perayaan",
      "Pilihan hidangan seafood istimewa",
      "Layanan reservasi grup terorganisir",
    ],
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80",
  },
];

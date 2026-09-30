export interface EventPackage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  suitableFor: string;
  capacity: string;
  features: string[];
  image: string;
}

export const EVENT_PACKAGES: EventPackage[] = [
  {
    id: "family-gathering",
    title: "Gathering & Acara Keluarga",
    subtitle: "Kebersamaan hangat dengan sajian Nusantara istimewa",
    description:
      "Ruangan ber-AC luas dan meja makan panjang yang nyaman untuk perayaan ulang tahun, arisan, syukuran, hingga temu kangen keluarga besar.",
    suitableFor: "Keluarga besar, arisan, syukuran, ulang tahun",
    capacity: "10 – 100+ Orang",
    features: [
      "Penataan meja keluarga khusus",
      "Pilihan set menu seafood & Nusantara lengkap",
      "Ruangan sejuk ber-AC dan nyaman",
      "Kemudahan koordinasi lewat WhatsApp",
    ],
    image:
      "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "corporate-meeting",
    title: "Jamuan Rekan Kerja & Business Dinner",
    subtitle: "Suasana profesional dan bersahaja untuk kemitraan",
    description:
      "Fasilitas ruang makan yang representatif untuk jamuan makan siang mitra kerja, rapat evaluasi, hingga jamuan makan malam instansi.",
    suitableFor: "Perusahaan, instansi pemerintah, BUMN, mitra bisnis",
    capacity: "10 – 60 Orang",
    features: [
      "Suasana kondusif dan tenang untuk berdiskusi",
      "Pelayanan sigap dan efisien",
      "Lokasi strategis di Jl. Basuki Rachmad",
      "Tersedia invoice / kuitansi resmi",
    ],
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "tour-groups",
    title: "Rombongan Wisata & Transit Perjalanan",
    subtitle: "Solusi jamuan rombongan bus dengan parkir luas",
    description:
      "Berada tepat di kawasan utama kota Tuban bersebelahan dengan Hotel Fave Tuban, memiliki area parkir lapang yang memuat bus pariwisata dan mobil rombongan.",
    suitableFor: "Biro travel, bus pariwisata, rombongan ziarah, transit perjalanan",
    capacity: "Hingga 150+ Orang",
    features: [
      "Area parkir luas untuk bus besar & mobil",
      "Penyajian makanan tepat waktu dan serentak",
      "Akses mudah langsung di tepi jalan utama",
      "Daftar paket menu rombongan fleksibel",
    ],
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
  },
];

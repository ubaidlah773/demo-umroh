export type GalleryCategory =
  | "all"
  | "food"
  | "drinks"
  | "interior"
  | "outdoor"
  | "events";

export interface GalleryImage {
  id: string;
  title: string;
  category: GalleryCategory;
  categoryLabel: string;
  imageUrl: string;
  aspect: "landscape" | "portrait" | "square";
  description: string;
}

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "All Photos" },
  { id: "food", label: "Signature Food" },
  { id: "drinks", label: "Coffee & Drinks" },
  { id: "interior", label: "Indoor Dining" },
  { id: "outdoor", label: "Outdoor Garden" },
  { id: "events", label: "Live Music & Events" },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "gal-1",
    title: "Nasi Iga Bakar Karamelisasi",
    category: "food",
    categoryLabel: "Signature Food",
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
    description: "Iga sapi bakar dengan bumbu kecap rempah pilihan dan sambal bajak khas.",
  },
  {
    id: "gal-2",
    title: "Suasana Hangat Outdoor di Malam Hari",
    category: "outdoor",
    categoryLabel: "Outdoor Garden",
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    aspect: "portrait",
    description: "Pendar lampu gantung temaram di bawah rimbun pepohonan tropis.",
  },
  {
    id: "gal-3",
    title: "Artisan Coffee & Latte Art",
    category: "drinks",
    categoryLabel: "Coffee & Drinks",
    imageUrl:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1200&q=80",
    aspect: "square",
    description: "Secangkir kopi hangat diseduh dengan presisi oleh barista D'Sultan.",
  },
  {
    id: "gal-4",
    title: "Ruang Indoor Dining Nyaman & Elegan",
    category: "interior",
    categoryLabel: "Indoor Dining",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
    description: "Desain interior modern yang lega, sejuk ber-AC, dan cocok untuk keluarga.",
  },
  {
    id: "gal-5",
    title: "Live Acoustic Session Penuh Kehangatan",
    category: "events",
    categoryLabel: "Live Music & Events",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    aspect: "portrait",
    description: "Musisi lokal membawakan tembang favorit pengunjung di panggung terbuka.",
  },
  {
    id: "gal-6",
    title: "Steak Sirloin Australia Panggang",
    category: "food",
    categoryLabel: "Signature Food",
    imageUrl:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
    description: "Daging sirloin empuk dengan saus mushroom kental dan sayuran segar.",
  },
  {
    id: "gal-7",
    title: "Sunset Mocktail Segar Berwarna Eksotis",
    category: "drinks",
    categoryLabel: "Coffee & Drinks",
    imageUrl:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80",
    aspect: "square",
    description: "Mocktail buah segar dengan bulir jeruk dan mint untuk melepas dahaga.",
  },
  {
    id: "gal-8",
    title: "Area Private Room Eksklusif",
    category: "interior",
    categoryLabel: "Indoor Dining",
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
    description: "Ruang rapat tertutup dengan meja panjang untuk keperluan bisnis dan perayaan intim.",
  },
  {
    id: "gal-9",
    title: "Kebersamaan Teman & Komunitas di Sore Hari",
    category: "outdoor",
    categoryLabel: "Outdoor Garden",
    imageUrl:
      "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
    description: "Momen bercengkerama dan diskusi santai di area semi-outdoor cafe.",
  },
  {
    id: "gal-10",
    title: "Saturday Band Performance Meriah",
    category: "events",
    categoryLabel: "Live Music & Events",
    imageUrl:
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
    aspect: "portrait",
    description: "Energi panggung musik akhir pekan yang dinanti-nanti pecinta musik Tuban.",
  },
  {
    id: "gal-11",
    title: "Nasi Goreng Sultan Istimewa",
    category: "food",
    categoryLabel: "Signature Food",
    imageUrl:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80",
    aspect: "square",
    description: "Nasi goreng gurih harum dengan sate ayam dan telur mata sapi.",
  },
  {
    id: "gal-12",
    title: "Gelato Artisan Aneka Rasa",
    category: "food",
    categoryLabel: "Signature Food",
    imageUrl:
      "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=1200&q=80",
    aspect: "portrait",
    description: "Manisnya gelato autentik penutup sempurna santap malam Anda.",
  },
];

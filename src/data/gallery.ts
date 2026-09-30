export type GalleryCategory =
  | "All"
  | "Food"
  | "Restaurant"
  | "Family"
  | "Events"
  | "Interior"
  | "People"
  | "Space"
  | "Atmosphere";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  description: string;
  image: string;
  span?: "tall" | "wide" | "featured" | "normal";
}

export type GalleryImage = GalleryItem;

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "All",
  "Food",
  "Restaurant",
  "Family",
  "Events",
  "Interior",
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Sajian Gurami Asam Manis & Seafood Segar",
    category: "Food",
    description: "Kombinasi hidangan khas Nusantara dengan bumbu asam manis gurih dan sajian seafood segar.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80",
    span: "featured",
  },
  {
    id: "gal-2",
    title: "Suasana Hangat Ruang Makan Keluarga",
    category: "Family",
    description: "Area santap yang lapang, sejuk, dan ramah untuk kebersamaan seluruh generasi keluarga.",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
    span: "tall",
  },
  {
    id: "gal-3",
    title: "Interior Elegan Sentuhan Kayu Nusantara",
    category: "Interior",
    description: "Desain arsitektur modern beraksen kayu jati hangat dan pencahayaan temaram yang nyaman.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
    span: "wide",
  },
  {
    id: "gal-4",
    title: "Rajungan Kare & Masakan Tradisional",
    category: "Food",
    description: "Rajungan khas pesisir Tuban diolah bumbu kare medok bercita rasa autentik.",
    image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80",
    span: "normal",
  },
  {
    id: "gal-5",
    title: "Gathering & Jamuan Rombongan Luar Kota",
    category: "Events",
    description: "Kapasitas tempat duduk luas siap menyambut rombongan kantor, komunitas, dan keluarga besar.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80",
    span: "wide",
  },
  {
    id: "gal-6",
    title: "Ruangan Ber-AC yang Sejuk & Nyaman",
    category: "Restaurant",
    description: "Fasilitas dining room ber-AC menjamin kenyamanan maksimal saat bersantap di tengah cuaca Tuban.",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
    span: "normal",
  },
  {
    id: "gal-7",
    title: "Ikan Bakar Madu Legit & Aneka Sambal",
    category: "Food",
    description: "Gurami bakar bumbu madu karamel dengan aroma arang menggugah selera dan sambal terasi.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    span: "tall",
  },
  {
    id: "gal-8",
    title: "Makan Malam Bersama Kerabat & Mitra",
    category: "Events",
    description: "Momen hangat berbincang santai di meja jamuan dengan hidangan seafood istimewa.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80",
    span: "normal",
  },
  {
    id: "gal-9",
    title: "Area Makan Lapang & Nyaman",
    category: "Restaurant",
    description: "Sirkulasi udara lega, penataan meja fleksibel, dan akses parkir depan restoran yang luas.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    span: "wide",
  },
  {
    id: "gal-10",
    title: "Mie Goreng Seafood & Tumis Sayuran Hijau",
    category: "Food",
    description: "Olahan mie telur kenyal dan ca brokoli / kangkung segar pelengkap santap keluarga.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    span: "normal",
  },
  {
    id: "gal-11",
    title: "Momen Ceria Keluarga di Meja Makan",
    category: "Family",
    description: "Tawa dan kebersamaan menjadi semakin bermakna ditemani sajian Nusantara favorit.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    span: "tall",
  },
  {
    id: "gal-12",
    title: "Detail Tekstur Kayu & Suasana Malam",
    category: "Interior",
    description: "Harmoni pencahayaan hangat dan material kayu alami menciptakan ambience tenang dan berkelas.",
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=800&q=80",
    span: "normal",
  },
];

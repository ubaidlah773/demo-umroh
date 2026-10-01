export interface GalleryItem {
  id: string;
  title: string;
  category: "suasana" | "kuliner" | "arsitektur";
  categoryLabel: string;
  imageUrl: string;
  description: string;
  aspect: "landscape" | "portrait" | "square";
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-exterior-joglo",
    title: "Exterior Joglo Bale Rasa",
    category: "suasana",
    categoryLabel: "Suasana Joglo",
    imageUrl:
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80",
    description:
      "Keanggunan atap Joglo Jawa klasik di tengah rindangnya pepohonan tropis Merakurak yang teduh.",
    aspect: "landscape",
  },
  {
    id: "gal-becek-buwohan",
    title: "Becek Buwohan Khas Tuban",
    category: "kuliner",
    categoryLabel: "Kuliner Tradisional",
    imageUrl:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=80",
    description:
      "Signature utama olahan daging sapi dengan kuah rempah gurih hangat yang autentik dan kaya aroma.",
    aspect: "portrait",
  },
  {
    id: "gal-interior-kayu",
    title: "Interior Joglo Kayu Jati",
    category: "arsitektur",
    categoryLabel: "Arsitektur Jawa",
    imageUrl:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    description:
      "Struktur tiang soko guru kayu jati alami dengan pendar lampu gantung temaram yang hangat.",
    aspect: "landscape",
  },
  {
    id: "gal-garang-asem",
    title: "Garang Asem Tradisional",
    category: "kuliner",
    categoryLabel: "Kuliner Tradisional",
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80",
    description:
      "Perpaduan rasa gurih, segar, dan pedas harum dengan balutan bumbu rempah Jawa tempo dulu.",
    aspect: "square",
  },
  {
    id: "gal-sop-iga",
    title: "Sop Iga Sapi Rempah",
    category: "kuliner",
    categoryLabel: "Kuliner Tradisional",
    imageUrl:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    description:
      "Iga sapi lembut dengan kuah kaldu rempah bening yang menghangatkan suasana santap bersama.",
    aspect: "landscape",
  },
  {
    id: "gal-nasi-jagung",
    title: "Nasi Jagung Tradisional",
    category: "kuliner",
    categoryLabel: "Kuliner Tradisional",
    imageUrl:
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1200&q=80",
    description:
      "Sajian nasi jagung pulen khas pesisir Jawa yang melengkapi kenikmatan lauk tradisional.",
    aspect: "portrait",
  },
  {
    id: "gal-tempe-mendoan",
    title: "Tempe Mendoan Hangat",
    category: "kuliner",
    categoryLabel: "Kuliner Tradisional",
    imageUrl:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
    description:
      "Gorengan tempe mendoan renyah gurih dengan cocolan sambal kecap cabai rawit yang pas.",
    aspect: "square",
  },
  {
    id: "gal-suasana-malam",
    title: "Suasana Sore & Malam Hari",
    category: "suasana",
    categoryLabel: "Suasana Joglo",
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    description:
      "Nuansa senja temaram dengan cahaya hangat lentera gantung yang menciptakan atmosfer damai dan syahdu.",
    aspect: "landscape",
  },
  {
    id: "gal-arsitektur-jawa",
    title: "Detail Arsitektur Jawa",
    category: "arsitektur",
    categoryLabel: "Arsitektur Jawa",
    imageUrl:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    description:
      "Ornamen kayu jati dan detail sambungan tradisional yang sarat filosofi ketenangan hidup Jawa.",
    aspect: "portrait",
  },
  {
    id: "gal-kebersamaan",
    title: "Pengunjung Sedang Menikmati Santap",
    category: "suasana",
    categoryLabel: "Suasana Joglo",
    imageUrl:
      "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80",
    description:
      "Momen kehangatan canda tawa dan berbagi cerita dalam tradisi Andum Roso, Nambah Bolo.",
    aspect: "landscape",
  },
];

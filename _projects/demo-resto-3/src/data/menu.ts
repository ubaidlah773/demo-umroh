export type MenuCategory = "all" | "utama" | "nasi" | "camilan" | "minuman";

export interface MenuItem {
  id: string;
  name: string;
  category: "utama" | "nasi" | "camilan" | "minuman";
  categoryLabel: string;
  description: string;
  price: string;
  badge?: string;
  isFavorite?: boolean;
  isHero?: boolean;
  imageUrl: string;
}

export const MENU_CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: "all", label: "Semua Sajian" },
  { id: "utama", label: "Menu Utama" },
  { id: "nasi", label: "Nasi" },
  { id: "camilan", label: "Camilan" },
  { id: "minuman", label: "Minuman" },
];

export const SIGNATURE_ITEMS: MenuItem[] = [
  {
    id: "sig-becek",
    name: "Becek Buwohan",
    category: "utama",
    categoryLabel: "Menu Utama",
    description:
      "Olahan daging sapi dengan kuah kaya rempah khas Tuban, menghadirkan cita rasa gurih, hangat, dan autentik.",
    price: "Harga tersedia di restoran",
    badge: "Signature Utama Tuban",
    isFavorite: true,
    isHero: true,
    imageUrl:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "sig-garang-asem",
    name: "Garang Asem",
    category: "utama",
    categoryLabel: "Menu Utama",
    description:
      "Masakan tradisional dengan rasa gurih, segar, dan kaya rempah dibalut kehangatan kuah beraroma khas.",
    price: "Harga tersedia di restoran",
    badge: "Favorit",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sig-sop-iga",
    name: "Sop Iga Sapi",
    category: "utama",
    categoryLabel: "Menu Utama",
    description:
      "Kuah kaldu hangat berempah dengan potongan iga sapi empuk yang kaya rasa dan memanjakan lidah.",
    price: "Harga tersedia di restoran",
    badge: "Favorit",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sig-ayam-joglo",
    name: "Ayam Goreng Sambel Joglo",
    category: "utama",
    categoryLabel: "Menu Utama",
    description:
      "Ayam goreng dengan racikan sambal khas yang cocok menjadi teman santap nasi hangat bersama keluarga.",
    price: "Harga tersedia di restoran",
    badge: "Favorit",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sig-nasi-jagung",
    name: "Nasi Jagung",
    category: "nasi",
    categoryLabel: "Nasi",
    description:
      "Sajian tradisional yang melengkapi pengalaman kuliner Jawa dengan cita rasa khas tempo dulu.",
    price: "Harga tersedia di restoran",
    badge: "Tradisional",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sig-tempe-mendoan",
    name: "Tempe Mendoan",
    category: "camilan",
    categoryLabel: "Camilan",
    description:
      "Camilan klasik yang cocok dinikmati bersama teh atau kopi di beranda Joglo yang teduh.",
    price: "Harga tersedia di restoran",
    badge: "Favorit",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // Menu Utama
  {
    id: "menu-becek",
    name: "Becek Buwohan Daging Sapi",
    category: "utama",
    categoryLabel: "Menu Utama",
    description:
      "Olahan daging sapi pilihan dengan kuah santan kaya rempah khas Tuban, beraroma hangat dan gurih meresap.",
    price: "Harga tersedia di restoran",
    badge: "Signature",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "menu-garang-asem",
    name: "Garang Asem",
    category: "utama",
    categoryLabel: "Menu Utama",
    description:
      "Masakan tradisional dengan rasa gurih, segar asam belimbing wuluh, dan kaya rempah wangi.",
    price: "Harga tersedia di restoran",
    badge: "Favorit",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "menu-sop-iga",
    name: "Sop Iga Sapi",
    category: "utama",
    categoryLabel: "Menu Utama",
    description:
      "Kuah kaldu bening gurih dengan potongan iga sapi lembut berpadu wortel, kentang, dan taburan bawang goreng.",
    price: "Harga tersedia di restoran",
    badge: "Favorit",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "menu-ayam-sambel-joglo",
    name: "Ayam Goreng Sambel Joglo",
    category: "utama",
    categoryLabel: "Menu Utama",
    description:
      "Ayam goreng empuk berbumbu rempah ungkep tradisional, disajikan dengan sambal khas Joglo dan lalapan.",
    price: "Harga tersedia di restoran",
    badge: "Favorit",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80",
  },

  // Nasi
  {
    id: "menu-nasi-jagung",
    name: "Nasi Jagung",
    category: "nasi",
    categoryLabel: "Nasi",
    description:
      "Sajian nasi jagung tradisional yang harum dan gurih, pelengkap sempurna santapan masakan Jawa.",
    price: "Harga tersedia di restoran",
    badge: "Khas Jawa",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "menu-nasi-putih",
    name: "Nasi Putih",
    category: "nasi",
    categoryLabel: "Nasi",
    description:
      "Nasi putih pulen hangat disajikan dalam bakul tradisional berbalut daun pisang aromatis.",
    price: "Harga tersedia di restoran",
    imageUrl:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1200&q=80",
  },

  // Camilan
  {
    id: "menu-tempe-mendoan",
    name: "Tempe Mendoan",
    category: "camilan",
    categoryLabel: "Camilan",
    description:
      "Tempe berbalut adonan daun bawang digoreng setengah matang renyah, nikmat dengan cocolan kecap rawit pedas.",
    price: "Harga tersedia di restoran",
    badge: "Favorit",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "menu-gedang-goreng",
    name: "Pisang / Gedang Goreng",
    category: "camilan",
    categoryLabel: "Camilan",
    description:
      "Gedang kepok matang pohon digoreng keemasan dengan tepung renyah harum, manis alami dan legit.",
    price: "Harga tersedia di restoran",
    imageUrl:
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "menu-kentang-cekli",
    name: "Kentang Goreng Cekli",
    category: "camilan",
    categoryLabel: "Camilan",
    description:
      "Potongan kentang gurih digoreng renyah dengan taburan rempah khas yang pas untuk dinikmati kapan saja.",
    price: "Harga tersedia di restoran",
    imageUrl:
      "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=80",
  },

  // Minuman
  {
    id: "menu-es-kencono-wungu",
    name: "Es Kencono Wungu",
    category: "minuman",
    categoryLabel: "Minuman",
    description:
      "Minuman signature bernuansa ungu alami dari seduhan bunga telang dengan perasan jeruk nipis segar pelepas dahaga.",
    price: "Harga tersedia di restoran",
    badge: "Favorit",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "menu-kopi",
    name: "Kopi Tradisional",
    category: "minuman",
    categoryLabel: "Minuman",
    description:
      "Seduhan biji kopi lokal Tuban dengan aroma sangrai khas yang kuat, disajikan dalam cangkir tradisional.",
    price: "Harga tersedia di restoran",
    imageUrl:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "menu-teh",
    name: "Teh Kampul / Teh Tuban",
    category: "minuman",
    categoryLabel: "Minuman",
    description:
      "Teh tuban wangi melati pekat dengan irisan jeruk segar yang memberi sentuhan aroma citrus menyejukkan.",
    price: "Harga tersedia di restoran",
    imageUrl:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "menu-wedang-rempah",
    name: "Minuman Tradisional (Wedang Rempah)",
    category: "minuman",
    categoryLabel: "Minuman",
    description:
      "Seduhan rempah herbal alami jahe emprit, serai, cengkih, kapulaga, dan kayu manis penambah kehangatan raga.",
    price: "Harga tersedia di restoran",
    badge: "Tradisional",
    isFavorite: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80",
  },
];

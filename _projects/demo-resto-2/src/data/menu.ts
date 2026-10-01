export type MenuCategory =
  | "all"
  | "main-course"
  | "rice"
  | "steak"
  | "coffee"
  | "non-coffee"
  | "dessert"
  | "snacks";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  categoryLabel: string;
  description: string;
  price: number;
  priceFormatted: string;
  image: string;
  isPopular?: boolean;
  isFeatured?: boolean;
  isChefSpecial?: boolean;
  tags?: string[];
}

export const MENU_CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: "all", label: "All Menu" },
  { id: "main-course", label: "Main Course" },
  { id: "rice", label: "Rice Specialties" },
  { id: "steak", label: "Steak & Grill" },
  { id: "coffee", label: "Artisan Coffee" },
  { id: "non-coffee", label: "Non Coffee & Refreshers" },
  { id: "dessert", label: "Dessert & Sweet" },
  { id: "snacks", label: "Snacks & Bites" },
];

export const MENU_ITEMS: MenuItem[] = [
  // --- SIGNATURE HIGHLIGHTS (as required in prompt) ---
  {
    id: "nasi-iga-bakar",
    name: "Nasi IGA Bakar Sultan",
    category: "rice",
    categoryLabel: "Rice Specialties",
    description:
      "Iga sapi pilihan dibakar perlahan dengan bumbu rempah karamelisasi gurih manis khas Nusantara, disajikan dengan nasi hangat, lalapan segar, emping, dan sambal terasi bakar pedas mantap.",
    price: 68000,
    priceFormatted: "Rp68.000",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isPopular: true,
    isChefSpecial: true,
    tags: ["Signature Dish", "Best Seller", "Chef Recommended"],
  },
  {
    id: "nasi-goreng-sultan",
    name: "Nasi Goreng Sultan",
    category: "rice",
    categoryLabel: "Rice Specialties",
    description:
      "Nasi goreng wangi wok-tossed dengan rempah istimewa, potongan ayam fillet juicy, udang segar, telur mata sapi, sate ayam bumbu kacang, serta kerupuk udang renyah.",
    price: 45000,
    priceFormatted: "Rp45.000",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isChefSpecial: true,
    tags: ["Popular Choice", "Wok Hei", "Crowd Favorite"],
  },
  {
    id: "nasi-campur-bali",
    name: "Nasi Campur Bali",
    category: "rice",
    categoryLabel: "Rice Specialties",
    description:
      "Sajian komplit cita rasa Pulau Dewata: nasi gurih harum dengan ayam suwir betutu, sate lilit aroma sereh, lawar kacang panjang, telur bumbu bali, dan sambal matah otentik segar.",
    price: 52000,
    priceFormatted: "Rp52.000",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    tags: ["Authentic Flavor", "Sambal Matah"],
  },
  {
    id: "steak-sirloin",
    name: "Steak Sirloin Australia",
    category: "steak",
    categoryLabel: "Steak & Grill",
    description:
      "Daging sapi sirloin Australia pilihan 180gr yang dipanggang sempurna, disajikan dengan pilihan saus mushroom atau blackpepper lembut, kentang goreng keemasan, dan tumis sayuran mentega.",
    price: 88000,
    priceFormatted: "Rp88.000",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    tags: ["Premium Meat", "Blackpepper / Mushroom", "Tender & Juicy"],
  },
  {
    id: "nasi-lemak",
    name: "Nasi Lemak Melayu Royal",
    category: "rice",
    categoryLabel: "Rice Specialties",
    description:
      "Nasi gurih santan harum daun pandan, dilengkapi ayam goreng rempah berempah renyah, sambal bilis pedas legit, ikan teri kacang garing, telur rebus, dan irisan mentimun dingin.",
    price: 48000,
    priceFormatted: "Rp48.000",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    tags: ["Fragrant Coconut Rice", "Crispy Spiced Chicken"],
  },
  {
    id: "es-kopi-sultan",
    name: "Es Kopi Susu Sultan",
    category: "coffee",
    categoryLabel: "Artisan Coffee",
    description:
      "Signature double-shot espresso dari biji kopi Arabika pilihan berpadu dengan susu creamy segar dan sirup gula aren organik premium khas D’Sultan.",
    price: 28000,
    priceFormatted: "Rp28.000",
    image:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    tags: ["Signature Coffee", "Palm Sugar", "Creamy & Smooth"],
  },
  {
    id: "gelato-artisan",
    name: "Artisan Gelato Tuban",
    category: "dessert",
    categoryLabel: "Dessert & Sweet",
    description:
      "Gelato lembut buatan tangan dengan cita rasa autentik dan tekstur creamy padat. Pilihan varian: Dark Chocolate Belgian, Madagascar Vanilla, Salted Caramel, atau Matcha Green Tea.",
    price: 32000,
    priceFormatted: "Rp32.000",
    image:
      "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    tags: ["Handcrafted", "2 Scoops", "Rich & Creamy"],
  },

  // --- ADDITIONAL MAIN COURSES & STEAKS ---
  {
    id: "ayam-bakar-taliwang",
    name: "Ayam Bakar Madu Rempah",
    category: "main-course",
    categoryLabel: "Main Course",
    description:
      "Ayam pejantan utuh dimarinasi madu hutan dan rempah nusantara, dipanggang dengan olesan karamel aromatik, disajikan bersama nasi putih dan sambal bajak.",
    price: 49000,
    priceFormatted: "Rp49.000",
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    tags: ["Honey Glazed", "Savory Spiced"],
  },
  {
    id: "tenderloin-steak",
    name: "Australian Tenderloin Steak",
    category: "steak",
    categoryLabel: "Steak & Grill",
    description:
      "Potongan tenderloin Australia tanpa lemak yang sangat lembut, dipanggang sesuai tingkat kematangan pilihan, disajikan dengan mashed potato creamy dan saus demiglace kental.",
    price: 95000,
    priceFormatted: "Rp95.000",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    tags: ["Melt In Mouth", "Prime Cut"],
  },
  {
    id: "chicken-cordon-bleu",
    name: "Crispy Chicken Cordon Bleu",
    category: "main-course",
    categoryLabel: "Main Course",
    description:
      "Dada ayam fillet renyah berbalut tepung roti emas, diisi keju mozzarella leleh dan smoked beef gurih, disajikan dengan saus keju creamy dan french fries.",
    price: 46000,
    priceFormatted: "Rp46.000",
    image:
      "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=800&q=80",
    tags: ["Melted Mozzarella", "Crispy Golden"],
  },
  {
    id: "dory-sambal-matah",
    name: "Pan-Seared Dory Sambal Matah",
    category: "main-course",
    categoryLabel: "Main Course",
    description:
      "Fillet ikan dori lembut dipanggang wangi butter, disiram limpahan sambal matah khas bali yang segar pedas beraroma minyak kelapa murni, nasi hangat dan kailan crispy.",
    price: 44000,
    priceFormatted: "Rp44.000",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    tags: ["Fresh Fish", "Gluten Conscious"],
  },

  // --- ARTISAN COFFEE & NON COFFEE ---
  {
    id: "caramel-macchiato",
    name: "Iced Caramel Macchiato",
    category: "coffee",
    categoryLabel: "Artisan Coffee",
    description:
      "Espresso shot pekat dituangkan di atas susu vanilla dingin dengan lapisan sirup karamel bakar bertekstur kental nan manis seimbang.",
    price: 34000,
    priceFormatted: "Rp34.000",
    image:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=800&q=80",
    tags: ["Caramel Swirl", "Layered Espresso"],
  },
  {
    id: "manual-brew-v60",
    name: "Manual Brew V60 Single Origin",
    category: "coffee",
    categoryLabel: "Artisan Coffee",
    description:
      "Seduhan pour-over menggunakan biji kopi nusantara pilihan (Gayo / Ijen / Flores) menghasilkan seduhan bersih beraroma floral dan fruity menyegarkan.",
    price: 30000,
    priceFormatted: "Rp30.000",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    tags: ["Specialty Beans", "Clean Notes"],
  },
  {
    id: "matcha-latte",
    name: "Kyoto Matcha Cream Latte",
    category: "non-coffee",
    categoryLabel: "Non Coffee & Refreshers",
    description:
      "Bubuk matcha Jepang murni grade premium dipadukan dengan steamed fresh milk dan sentuhan busa lembut, menghadirkan aroma teh hijau otentik menenangkan.",
    price: 32000,
    priceFormatted: "Rp32.000",
    image:
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80",
    tags: ["Pure Kyoto Matcha", "Calming Green"],
  },
  {
    id: "tropical-dragon-fruit-mocktail",
    name: "Sunset Sultan Mocktail",
    category: "non-coffee",
    categoryLabel: "Non Coffee & Refreshers",
    description:
      "Mocktail segar racikan buah leci, sirup mawar, air soda dingin, dan perasan jeruk nipis segar dengan garnish daun mint serta biji selasih.",
    price: 29000,
    priceFormatted: "Rp29.000",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    tags: ["Refreshing Soda", "Fruity Sparkler"],
  },

  // --- SNACKS & DESSERT ---
  {
    id: "truffle-fries",
    name: "Parmesan Truffle Fries",
    category: "snacks",
    categoryLabel: "Snacks & Bites",
    description:
      "Kentang goreng impor garing beraroma truffle oil aromatik yang mewah, ditaburi parutan keju parmesan gurih dan rempah peterseli segar.",
    price: 29000,
    priceFormatted: "Rp29.000",
    image:
      "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
    tags: ["Aromatic Truffle", "Parmesan Melt"],
  },
  {
    id: "churros-chocolate",
    name: "Classic Cinnamon Churros",
    category: "dessert",
    categoryLabel: "Dessert & Sweet",
    description:
      "Churros spanyol renyah keemasan dibalut gula bubuk kayu manis harum, disajikan dengan dipping sauce cokelat belgian pekat hangat.",
    price: 28000,
    priceFormatted: "Rp28.000",
    image:
      "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=800&q=80",
    tags: ["Warm Dipping Chocolate", "Sweet Cinnamon"],
  },
  {
    id: "chicken-wings-bbq",
    name: "Smokey BBQ Chicken Wings",
    category: "snacks",
    categoryLabel: "Snacks & Bites",
    description:
      "Sayap ayam goreng renyah yang dimandikan saus smokey barbecue khas D'Sultan, ditaburi wijen sangrai dan disajikan dengan dipping mayo bawang putih.",
    price: 36000,
    priceFormatted: "Rp36.000",
    image:
      "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    tags: ["Smokey BBQ", "Crispy & Sticky"],
  },
];

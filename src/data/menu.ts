export type MenuCategory =
  | "Signature"
  | "Starters"
  | "Main Course"
  | "Seafood"
  | "Grill"
  | "Dessert"
  | "Drinks";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: string;
  description: string;
  tag?: string;
  image?: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  "Signature",
  "Starters",
  "Main Course",
  "Seafood",
  "Grill",
  "Dessert",
  "Drinks",
];

export const EDITORIAL_MENU: MenuItem[] = [
  // 1. Signature
  {
    id: "sig-1",
    name: "Gurami Asam Manis Kayu Manis",
    category: "Signature",
    price: "Rp 65.000",
    description: "Crispy fried gurami glazed in heritage sweet-sour reduction with fresh pineapple, capsicum, and shallots.",
    tag: "Chef's Signature",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sig-2",
    name: "Gurame Madu Legit Arang",
    category: "Signature",
    price: "Rp 75.000",
    description: "Charcoal-grilled freshwater gurami coated with wild forest honey, sweet soy glaze, and charred chili sambal.",
    tag: "House Special",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sig-3",
    name: "Rajungan Kare Tuban Pesisir",
    category: "Signature",
    price: "Rp 95.000",
    description: "Fresh coastal blue swimmer crab simmered in golden turmeric broth with crushed candlenut, kaffir lime, and coconut cream.",
    tag: "Tuban Heritage",
    image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80",
  },

  // 2. Starters
  {
    id: "sta-1",
    name: "Lumpia Seafood Semarang",
    category: "Starters",
    price: "Rp 32.000",
    description: "Crispy hand-rolled spring rolls filled with fresh prawns, bamboo shoots, and scallions, served with sweet garlic tauco.",
  },
  {
    id: "sta-2",
    name: "Tahu Kipas Udang",
    category: "Starters",
    price: "Rp 28.000",
    description: "Golden stuffed bean curd pillows filled with minced prawns, carrots, and wood ear mushrooms.",
  },
  {
    id: "sta-3",
    name: "Cumi Goreng Tepung Crispy",
    category: "Starters",
    price: "Rp 38.000",
    description: "Lightly dredged calamari rings fried crisp with crushed sea salt, lime zest, and sweet chili dip.",
  },
  {
    id: "sta-4",
    name: "Sup Jagung Kepiting",
    category: "Starters",
    price: "Rp 35.000",
    description: "Silky sweet corn velouté folded with shredded fresh crab meat and egg ribbons.",
  },

  // 3. Main Course
  {
    id: "mai-1",
    name: "Ayam Goreng Telur Asin Creamy",
    category: "Main Course",
    price: "Rp 48.000",
    description: "Crisp chicken fillets tossed in molten duck egg yolk sauce with aromatic curry leaves and bird's eye chili.",
  },
  {
    id: "mai-2",
    name: "Sop Buntut Rempah Spesial",
    category: "Main Course",
    price: "Rp 85.000",
    description: "Tender slow-simmered Australian oxtail in clear cardamom and nutmeg broth, served with melinjo crackers and lime.",
  },
  {
    id: "mai-3",
    name: "Mie Goreng Seafood Wok Hei",
    category: "Main Course",
    price: "Rp 45.000",
    description: "Wok-seared egg noodles with wild tiger prawns, squid rings, fish cakes, bean sprouts, and chives.",
  },
  {
    id: "mai-4",
    name: "Nasi Goreng Seafood Babat",
    category: "Main Course",
    price: "Rp 42.000",
    description: "Smoky jasmine rice tossed with fresh seafood, spiced tripe, homemade sweet soy, and sunny side up egg.",
  },

  // 4. Seafood
  {
    id: "sea-1",
    name: "Udang Bakar Madu Pedas",
    category: "Seafood",
    price: "Rp 85.000",
    description: "Jumbo ocean prawns skewered and char-grilled with honey butter and crushed red chili paste.",
  },
  {
    id: "sea-2",
    name: "Cumi Bakar Bumbu Rujak",
    category: "Seafood",
    price: "Rp 55.000",
    description: "Fresh whole calamari charred over coconut shell charcoal with spicy-sweet tamarind chili glaze.",
  },
  {
    id: "sea-3",
    name: "Kepiting Saus Padang",
    category: "Seafood",
    price: "Rp 98.000",
    description: "Whole coastal crab braised in piquant Padang chili reduction with beaten egg and scallions.",
  },
  {
    id: "sea-4",
    name: "Kerang Dara Rebus Saus Nanas",
    category: "Seafood",
    price: "Rp 35.000",
    description: "Fresh blood cockles steamed with ginger and lemongrass, accompanied by crushed chili pineapple dip.",
  },

  // 5. Grill
  {
    id: "gri-1",
    name: "Ikan Kerapu Bakar Jimbaran",
    category: "Grill",
    price: "Rp 85.000",
    description: "Whole fresh sea grouper charcoal-roasted with Balinese shallot, garlic, and tomato sambal paste.",
  },
  {
    id: "gri-2",
    name: "Ayam Bakar Bumbu Rujak",
    category: "Grill",
    price: "Rp 42.000",
    description: "Free-range chicken slow-braised in coconut milk and spices before being fire-charred to order.",
  },
  {
    id: "gri-3",
    name: "Sate Ayam Madura Daging Pilihan",
    category: "Grill",
    price: "Rp 38.000",
    description: "Ten skewers of tender chicken thigh glazed with toasted peanut reduction and sweet soy.",
  },

  // 6. Dessert
  {
    id: "des-1",
    name: "Es Kelapa Muda Jeruk Nipis",
    category: "Dessert",
    price: "Rp 22.000",
    description: "Chilled young coconut flesh and water served with freshly squeezed calamansi lime and pandan syrup.",
  },
  {
    id: "des-2",
    name: "Pisang Goreng Madu Wijen",
    category: "Dessert",
    price: "Rp 25.000",
    description: "Caramelized honey-battered Raja bananas fried crisp and dusted with toasted white sesame.",
  },
  {
    id: "des-3",
    name: "Es Campur Kayu Manis",
    category: "Dessert",
    price: "Rp 28.000",
    description: "Crushed ice bowl with avocado, jackfruit, toddy palm seeds, coconut jelly, and fragrant rose syrup.",
  },

  // 7. Drinks
  {
    id: "dri-1",
    name: "Wedang Kayu Manis Rempah",
    category: "Drinks",
    price: "Rp 18.000",
    description: "Traditional hot herbal infusion of Ceylon cinnamon bark, ginger root, cloves, and palm sugar crystals.",
  },
  {
    id: "dri-2",
    name: "Jus Alpukat Kental Cokelat",
    category: "Drinks",
    price: "Rp 24.000",
    description: "Thick fresh butter avocado smoothie drizzled with Belgian dark chocolate ganache.",
  },
  {
    id: "dri-3",
    name: "Es Teh Manis Jasmine",
    category: "Drinks",
    price: "Rp 10.000",
    description: "Fragrant Java jasmine tea brewed fresh daily and served over crushed crystal ice.",
  },
  {
    id: "dri-4",
    name: "Kopi Tuban Gilingan Halus",
    category: "Drinks",
    price: "Rp 16.000",
    description: "Traditional fine-ground Tuban robusta brewed directly with piping water.",
  },
];

export const SIGNATURE_DISHES = EDITORIAL_MENU;
export const FULL_MENU = EDITORIAL_MENU;

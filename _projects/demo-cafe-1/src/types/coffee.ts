export interface MenuItem {
  id: string;
  name: string;
  category: "ESPRESSO" | "MILK" | "COLD" | "NON-COFFEE" | "PASTRY";
  description: string;
  price: number;
  priceFormatted: string;
  image: string;
  tags?: string[];
  notes?: string;
  featured?: boolean;
}

export interface SignatureDrink {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  notes: string[];
  price: number;
  priceFormatted: string;
  image: string;
  origin: string;
  roast: string;
}

export interface CoffeeJourneyStage {
  step: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  origin?: string;
  roast?: string;
  notes?: string;
  process?: string;
}

export interface OriginRegion {
  id: string;
  country: string;
  region: string;
  altitude: string;
  notes: string;
  flavorProfile: string[];
  process: string;
  description: string;
  color: string;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  quantity: number;
  image: string;
  temp?: "HOT" | "ICED";
  size?: "Regular" | "Large";
}

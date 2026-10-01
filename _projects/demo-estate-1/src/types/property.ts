export type PropertyType = "House" | "Villa" | "Apartment" | "Land" | "Commercial";
export type PropertyStatus = "For Sale" | "For Rent";
export type CityLocation = "Bali" | "Jakarta" | "Surabaya" | "Malang" | "Yogyakarta" | "Semarang";

export interface NearbyPlace {
  category: "Airport" | "Beach" | "School" | "Hospital" | "Shopping" | "Business Hub";
  name: string;
  distance: string;
}

export interface PropertyAgent {
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
  email: string;
  avatar: string;
  experienceYears?: number;
  propertiesSold?: number;
  clientSatisfaction?: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  tagline?: string;
  location: string;
  city: CityLocation;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  priceDisplay: string;
  pricePeriod?: string;
  bedrooms: number;
  bathrooms: number;
  buildingArea: number; // in m²
  landArea: number;     // in m²
  parking: string;
  yearBuilt: number;
  certificate: string;
  images: string[];
  description: string[];
  features: string[];
  amenities: string[];
  nearby: NearbyPlace[];
  featured: boolean;
  tag?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  agent: PropertyAgent;
}

export interface PropertyFilterState {
  type: string;
  city: string;
  priceRange: string;
  status: string;
  bedrooms: string;
  search: string;
}

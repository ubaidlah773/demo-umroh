export interface PackageItineraryDay {
  day: string;
  title: string;
  desc: string;
}

export interface PackageItem {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  priceNote: string;
  duration: string;
  departure: string;
  badge?: string;
  isRecommended?: boolean;
  hotelMakkah: string;
  hotelMadinah: string;
  airline: string;
  highlights: string[];
  itinerary: PackageItineraryDay[];
  facilitiesIncluded: string[];
  facilitiesExcluded: string[];
  requirements: string[];
  image: string;
}

export interface ScheduleItem {
  id: string;
  date: string;
  packageType: string;
  duration: string;
  airline: string;
  seatsLeft: string;
  status: string;
  statusVariant: "available" | "limited" | "closing";
}

export interface WhyUsItem {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
  detail: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  program: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface LegalityItem {
  title: string;
  placeholderValue: string;
  description: string;
}

export interface SiteSocial {
  name: string;
  url: string;
  handle: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  category: string;
  badge: string;
  whatsapp: string;
  defaultWhatsAppMessage: string;
  email: string;
  address: string;
  city: string;
  workingHours: string;
  socials: SiteSocial[];
}

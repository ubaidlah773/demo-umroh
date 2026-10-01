export interface LocationData {
  id: string;
  name: string;
  province: string;
  headline: string;
  description: string;
  image: string;
  propertyCount: number;
  popularAreas: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const locationsData: LocationData[] = [
  {
    id: "bali",
    name: "Bali",
    province: "Bali",
    headline: "Tropical sanctuaries, oceanfront cliffs, and spiritual highlands.",
    description:
      "From the vibrant coastal energy of Canggu and Uluwatu's dramatic oceanfront horizons to the contemplative jungle valleys of Ubud, Bali remains Southeast Asia's prime lifestyle and villa investment capital.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    propertyCount: 5,
    popularAreas: ["Canggu", "Pererenan", "Ubud", "Uluwatu", "Seminyak", "Tabanan"],
    coordinates: { lat: -8.4095, lng: 115.1889 },
  },
  {
    id: "jakarta",
    name: "Jakarta",
    province: "DKI Jakarta",
    headline: "Diplomatic heritage manors and high-flying financial district penthouses.",
    description:
      "As Indonesia's primary metropolis, Jakarta delivers unmatched capital appreciation, trophy colonial residences in leafy Menteng, and architectural penthouses towering above the golden triangle of SCBD.",
    image: "https://images.unsplash.com/photo-1555899434-94d1338c7f22?auto=format&fit=crop&w=1200&q=80",
    propertyCount: 2,
    popularAreas: ["Menteng", "SCBD", "Pondok Indah", "Kuningan", "Senopati"],
    coordinates: { lat: -6.2088, lng: 106.8456 },
  },
  {
    id: "surabaya",
    name: "Surabaya",
    province: "Jawa Timur",
    headline: "Premier golf course estates and dynamic commercial hubs.",
    description:
      "East Java's commercial engine combines structured master-planned luxury townships in West Surabaya with expansive family estates, elite private schools, and prestigious country clubs.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    propertyCount: 1,
    popularAreas: ["CitraLand", "Graha Famili", "Pakuwon Indah", "Dharmahusada"],
    coordinates: { lat: -7.2575, lng: 112.7521 },
  },
  {
    id: "malang",
    name: "Malang",
    province: "Jawa Timur",
    headline: "Crisp mountain air, colonial heritage villas, and pine retreats.",
    description:
      "Set against the majestic backdrop of Mount Panderman and Mount Arjuno, Malang and the Batu highlands offer cool European-style mountain residences and peaceful countryside escapes.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    propertyCount: 1,
    popularAreas: ["Batu", "Ijen Boulevard", "Araya", "Tidar"],
    coordinates: { lat: -7.9666, lng: 112.6326 },
  },
  {
    id: "yogyakarta",
    name: "Yogyakarta",
    province: "DI Yogyakarta",
    headline: "Cultural sophistication, artisanal heritage, and tranquil nature.",
    description:
      "Yogyakarta's architectural landscape balances royal heritage with contemporary organic dwellings along the serene slopes of Mount Merapi and artisanal artisan quarters.",
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80",
    propertyCount: 1,
    popularAreas: ["Kaliurang", "Palagan", "Prawirotaman", "Seturan"],
    coordinates: { lat: -7.7956, lng: 110.3695 },
  },
  {
    id: "semarang",
    name: "Semarang",
    province: "Jawa Tengah",
    headline: "Historic hilltop residences commanding sweeping harbor vistas.",
    description:
      "The prestigious uphill district of Candi offers refreshing microclimates, historic architecture, and modern luxury apartments overlooking the Java Sea and active maritime harbor.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    propertyCount: 1,
    popularAreas: ["Candi Sari", "Bukit Sari", "Gombel", "Simpang Lima"],
    coordinates: { lat: -6.9667, lng: 110.4167 },
  },
];

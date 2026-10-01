export interface EventItem {
  id: string;
  title: string;
  genre: string;
  artist: string;
  date: string;
  dayOfWeek: string;
  time: string;
  area: string;
  description: string;
  image: string;
  isUpcoming: boolean;
  ticketInfo: string;
  tags: string[];
}

export const EVENTS_DATA: EventItem[] = [
  {
    id: "sultan-acoustic-friday",
    title: "Friday Warm Acoustic Session",
    genre: "Pop Acoustic & Indonesian Nostalgia",
    artist: "The Senandung Project ft. Arya",
    date: "Setiap Jumat Malam",
    dayOfWeek: "Friday Evening",
    time: "19.30 – 21.45 WIB",
    area: "Outdoor Tropical Stage",
    description:
      "Lepaskan penat setelah sepekan bekerja bersama alunan akustik merdu, petikan gitar hangat, dan lagu-lagu pop pilihan di bawah semilir angin malam kota Tuban.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    isUpcoming: true,
    ticketInfo: "Free Entry / Regular Dining",
    tags: ["Acoustic Night", "Romantic Vibe", "Song Request Open"],
  },
  {
    id: "saturday-night-groove",
    title: "Saturday Night Rhythm & Soul",
    genre: "Soul, Pop Hits & Light Jazz",
    artist: "D'Sultan All-Stars Band",
    date: "Setiap Sabtu Malam",
    dayOfWeek: "Saturday Night",
    time: "19.45 – 22.00 WIB",
    area: "Main Stage & Indoor Lounge",
    description:
      "Puncak malam akhir pekan yang meriah bersama full band performance. Nikmati sajian makan malam lezat ditemani aransemen lagu terpopuler yang menggetarkan suasana.",
    image:
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
    isUpcoming: true,
    ticketInfo: "Free Entry / Reservation Recommended",
    tags: ["Weekend Highlight", "Full Band", "Family & Friends Friendly"],
  },
  {
    id: "sunday-sunset-jazz",
    title: "Sunday Sunset Jazz & Chill",
    genre: "Smooth Jazz & Bossa Nova",
    artist: "Tuban Jazz Collective",
    date: "Minggu Sore",
    dayOfWeek: "Sunday Sunset",
    time: "16.30 – 19.00 WIB",
    area: "Garden Pergola Area",
    description:
      "Tutup akhir pekan Anda dengan ketenangan nada Bossa Nova dan jazzy beats sambil menikmati seduhan es kopi susu gula aren dan angin senja Tuban.",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    isUpcoming: true,
    ticketInfo: "Free Entry / Coffee & Chill",
    tags: ["Sunset Session", "Bossa Nova", "Relaxing Atmosphere"],
  },
  {
    id: "special-guest-night",
    title: "Monthly Showcase: East Java Indie Night",
    genre: "Indie Pop & Folk",
    artist: "Special Guest from Surabaya & Malang",
    date: "Pekan Terakhir Tiap Bulan",
    dayOfWeek: "Special Showcase",
    time: "19.30 – 22.00 WIB",
    area: "D'Sultan Main Stage",
    description:
      "Penampilan panggung eksklusif musisi independen regional Jawa Timur. Menghadirkan karya orisinil dan suasana panggung yang akrab dan hangat.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
    isUpcoming: true,
    ticketInfo: "Free Entry / RSVP Table First",
    tags: ["Monthly Special", "Guest Artist", "Limited Seating"],
  },
];

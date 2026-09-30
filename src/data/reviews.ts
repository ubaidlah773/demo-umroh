export interface ReviewItem {
  id: string;
  author: string;
  source: string;
  rating: number;
  date: string;
  quote: string;
  highlight: string;
}

export const RESTAURANT_REVIEWS_META = {
  score: "4.4",
  scale: "5.0",
  totalReviews: "1,943",
  googleMapsReviewUrl:
    "https://www.google.com/maps/search/?api=1&query=Resto+Kayu+Manis+Jl+Basuki+Rachmad+Tuban",
};

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Tamu Google Maps",
    source: "Google Maps Review",
    rating: 5,
    date: "Ulasan Terverifikasi",
    quote:
      "Menu makanannya variasi, ada ikan, udang, sayur, kepiting, sup, nasi dll.",
    highlight: "Variasi menu lengkap mulai dari ikan, kepiting hingga sup",
  },
  {
    id: "rev-2",
    author: "Pengunjung Luar Kota",
    source: "Google Maps Review",
    rating: 5,
    date: "Ulasan Terverifikasi",
    quote:
      "Satu area dengan Hotel Fave Tuban dan lokasinya strategis, parkir luas.",
    highlight: "Lokasi strategis satu area hotel & parkir luas untuk kendaraan",
  },
  {
    id: "rev-3",
    author: "Rombongan Keluarga",
    source: "Google Maps Review",
    rating: 5,
    date: "Ulasan Terverifikasi",
    quote:
      "Cocok untuk makan bersama keluarga atau rekan kerja. Parkiran luas, ruangan dingin ber AC dan masakan lezat.",
    highlight: "Nyaman untuk keluarga & rekan kerja, ruangan AC dingin & masakan lezat",
  },
];

// Compatibility export
export const TESTIMONIALS = REVIEWS;

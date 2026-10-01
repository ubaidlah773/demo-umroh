export interface CustomerReview {
  id: string;
  author: string;
  source: string;
  rating: number;
  date: string;
  reviewText: string;
  highlightDish?: string;
  avatarInitial: string;
}

export const REVIEW_STATS = {
  averageRating: 4.7,
  maxRating: 5.0,
  totalReviews: 422,
  platform: "Google Reviews",
  googleMapsReviewUrl:
    "https://maps.google.com/?q=Bale+Rasa+Merakurak+Tuban+Bogorejo",
};

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    author: "Pelanggan Google Maps",
    source: "Google Local Guide",
    rating: 5,
    date: "Ulasan Terverifikasi",
    reviewText:
      "Enak, mantab nemu tempat makan estetik di tengah perumahan, suka dengan masakannya, suasananya, harganya juga gak terlalu mahal.",
    highlightDish: "Suasana & Harga Terjangkau",
    avatarInitial: "P",
  },
  {
    id: "rev-2",
    author: "Pengunjung Tuban",
    source: "Google Local Guide",
    rating: 5,
    date: "Ulasan Terverifikasi",
    reviewText:
      "Salah satu resto yang wajib dikunjungi di Tuban! Suasananya nyaman dengan konsep Joglo yang asri.",
    highlightDish: "Konsep Joglo Asri",
    avatarInitial: "R",
  },
  {
    id: "rev-3",
    author: "Pecinta Kuliner Jawa",
    source: "Google Local Guide",
    rating: 5,
    date: "Ulasan Terverifikasi",
    reviewText:
      "Becek Buwohan-nya maknyuss, bumbunya pas dan dagingnya juga banyak.",
    highlightDish: "Becek Buwohan",
    avatarInitial: "B",
  },
];

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  date: string;
  quote: string;
  highlight: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "testi-1",
    name: "Rizky Firmansyah",
    role: "Local Guide • Google Review",
    rating: 5,
    date: "Ulasan Google Terverifikasi",
    quote:
      "Tempat luas bisa pilih indoor atau outdoor. Suasananya enak banget buat makan malam bareng keluarga, menu makanannya juga bervariasi dan rasanya mantap. Nasi iga bakarnya juara!",
    highlight: "Tempat luas bisa pilih indoor atau outdoor.",
  },
  {
    id: "testi-2",
    name: "Anindya Putri",
    role: "Pengunjung Setia • Google Review",
    rating: 5,
    date: "Ulasan Google Terverifikasi",
    quote:
      "Live music, parkiran luas, pilihan tempat duduk banyak. Cocok banget buat nongkrong sama temen-temen pas weekend. Sound musiknya pas nggak bikin bising buat ngobrol.",
    highlight: "Live music, parkiran luas, pilihan tempat duduk banyak.",
  },
  {
    id: "testi-3",
    name: "Bambang Soeharto",
    role: "Kunjungan Bisnis • Google Review",
    rating: 5,
    date: "Ulasan Google Terverifikasi",
    quote:
      "Good service, parkiran luas. Lokasinya strategis di Basuki Rachmad. Pelayanannya cepat dan ramah, ruang private-nya sangat mendukung untuk meeting bareng klien.",
    highlight: "Good service, parkiran luas.",
  },
  {
    id: "testi-4",
    name: "Dewi Lestari",
    role: "Food Explorer • Google Review",
    rating: 5,
    date: "Ulasan Google Terverifikasi",
    quote:
      "Pilihan tepat kalau lagi di Tuban pengen cari tempat makan yang estetik tapi porsinya mengenyangkan. Kopi aren dan steaknya enak, anak-anak suka banget gelatonya.",
    highlight: "Rasa makanan konsisten enak dan ramah keluarga.",
  },
];

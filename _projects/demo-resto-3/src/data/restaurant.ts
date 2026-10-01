export interface RestaurantInfo {
  name: string;
  tagline: string;
  taglineSub: string;
  concept: string;
  storyHeading: string;
  storyText: string;
  address: {
    full: string;
    street: string;
    village: string;
    district: string;
    regency: string;
    province: string;
    postalCode: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    whatsappFormatted: string;
  };
  hours: {
    open: string;
    close: string;
    display: string;
    status: string;
  };
  pricing: {
    range: string;
    perPerson: string;
  };
  rating: {
    score: number;
    totalReviews: number;
    platform: string;
  };
  positioning: string;
  links: {
    whatsappReservation: string;
    googleMaps: string;
    googleMapsEmbed: string;
  };
}

export const RESTAURANT_INFO: RestaurantInfo = {
  name: "BALE RASA",
  tagline: "Andum Roso, Nambah Bolo",
  taglineSub: "Rasa Jawa, Suasana yang Membawa Pulang.",
  concept:
    "Restoran tradisional Jawa dengan suasana Joglo yang asri, hangat, estetik, dan cocok untuk makan bersama keluarga, pasangan, teman, maupun acara kecil.",
  storyHeading: "Bukan Sekadar Makan. Ini Tentang Rasa dan Kebersamaan.",
  storyText:
    "Bale Rasa menghadirkan cita rasa masakan tradisional Jawa dalam suasana Joglo yang hangat dan asri. Tempat untuk menikmati makanan, berbagi cerita, dan berkumpul bersama orang-orang tercinta.",
  address: {
    full: "Jl. Bahagia, Jl. Bogorejo I, Mulung, Bogorejo, Kec. Merakurak, Kabupaten Tuban, Jawa Timur 62355",
    street: "Jl. Bahagia, Jl. Bogorejo I, Mulung",
    village: "Bogorejo",
    district: "Kec. Merakurak",
    regency: "Kabupaten Tuban",
    province: "Jawa Timur",
    postalCode: "62355",
  },
  contact: {
    phone: "085236473110",
    phoneFormatted: "0852-3647-3110",
    whatsapp: "6285236473110",
    whatsappFormatted: "0852-3647-3110",
  },
  hours: {
    open: "10:00",
    close: "21:00",
    display: "10.00 – 21.00 WIB",
    status: "Buka Setiap Hari",
  },
  pricing: {
    range: "Rp25.000 – Rp50.000",
    perPerson: "Rp25K–50K / orang",
  },
  rating: {
    score: 4.7,
    totalReviews: 422,
    platform: "Google Maps",
  },
  positioning:
    "Kuliner tradisional Jawa dengan pengalaman makan di suasana Joglo yang autentik dan nyaman.",
  links: {
    whatsappReservation:
      "https://wa.me/6285236473110?text=" +
      encodeURIComponent(
        "Halo Bale Rasa, saya ingin melakukan reservasi meja. Apakah masih tersedia?"
      ),
    googleMaps:
      "https://maps.google.com/?q=Bale+Rasa+Merakurak+Tuban+Bogorejo",
    googleMapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15842.128796859346!2d112.0051284!3d-6.8996417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e779836e4f3a74b%3A0x7d2be73ad9194ec8!2sMerakurak%2C%20Tuban%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1711900000000!5m2!1sen!2sid",
  },
};

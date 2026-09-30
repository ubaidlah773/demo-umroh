export interface RestaurantInfo {
  name: string;
  tagline: string;
  headline: string;
  subtitle: string;
  category: string;
  address: {
    street: string;
    subDistrict: string;
    district: string;
    city: string;
    province: string;
    postalCode: string;
    formatted: string;
    landmark: string;
  };
  contact: {
    phone: string;
    phoneRaw: string;
    whatsappFormatted: string;
    whatsappNumber: string; // for WA deep links
    instagramHandle?: string;
  };
  hours: {
    schedule: string;
    closingNote: string;
    days: string;
    time: string;
  };
  priceRange: string;
  rating: {
    score: number;
    scale: number;
    count: number;
    formattedCount: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  quickInfo: Array<{
    title: string;
    subtitle: string;
    icon: string;
  }>;
}

export const RESTAURANT_INFO: RestaurantInfo = {
  name: "Resto Kayu Manis",
  tagline: "A Taste of Tuban, Made for Every Gathering.",
  headline: "GOOD FOOD. GREAT GATHERINGS.",
  subtitle:
    "Menikmati hidangan Nusantara dan seafood pilihan dalam suasana nyaman bersama orang-orang terdekat.",
  category: "Seafood Restaurant / Family Restaurant",
  address: {
    street: "Jl. Basuki Rachmad No.215–217",
    subDistrict: "Ronggomulyo",
    district: "Kec. Tuban",
    city: "Kabupaten Tuban",
    province: "Jawa Timur",
    postalCode: "62315",
    formatted:
      "Jl. Basuki Rachmad No.215–217, Ronggomulyo, Kec. Tuban, Kabupaten Tuban, Jawa Timur 62315",
    landmark: "Satu area dengan Hotel Fave Tuban (Jalur Utama Kota Tuban)",
  },
  contact: {
    phone: "(0356) 331114",
    phoneRaw: "0356331114",
    whatsappFormatted: "(0356) 331114",
    whatsappNumber: "6281235633114", // standard Indonesian format for restaurant WA customer service
    instagramHandle: "restokayumanis.tuban",
  },
  hours: {
    schedule: "Buka setiap hari, tutup sekitar pukul 22.00",
    closingNote: "Tutup sekitar pukul 22.00",
    days: "Setiap Hari (Senin – Minggu)",
    time: "10.00 – 22.00 WIB",
  },
  priceRange: "Rp50.000 – Rp125.000 / orang",
  rating: {
    score: 4.4,
    scale: 5,
    count: 1943,
    formattedCount: "1.943+ ulasan",
  },
  coordinates: {
    lat: -6.8998,
    lng: 112.0535,
  },
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Resto+Kayu+Manis+Jl+Basuki+Rachmad+Tuban",
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.279624527718!2d112.0513192!3d-6.8998823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e779a7be8e7ff19%3A0x6b3dbbaaa60b2eb7!2sJl.%20Basuki%20Rachmad%20No.215%2C%20Ronggomulyo%2C%20Kec.%20Tuban%2C%20Kabupaten%20Tuban%2C%20Jawa%20Timur%2062315!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
  features: [
    {
      title: "Spacious Dining Area",
      description: "Area restoran luas dan nyaman untuk santap bersama.",
      icon: "Maximize2",
    },
    {
      title: "Air-Conditioned Rooms",
      description:
        "Ruangan ber-AC untuk pengalaman makan yang lebih sejuk dan nyaman.",
      icon: "Wind",
    },
    {
      title: "Large Parking Area",
      description: "Parkir luas dan mudah diakses untuk mobil pribadi maupun bus rombongan.",
      icon: "Car",
    },
    {
      title: "Family Friendly",
      description:
        "Suasana bersahabat dan nyaman untuk dinikmati seluruh anggota keluarga lintas generasi.",
      icon: "Users",
    },
    {
      title: "Strategic Location",
      description:
        "Berada di Jl. Basuki Rachmad, Tuban, dekat dan satu area dengan Hotel Fave Tuban.",
      icon: "MapPin",
    },
  ],
  quickInfo: [
    {
      title: "SEAFOOD",
      subtitle: "Fresh & flavorful",
      icon: "Fish",
    },
    {
      title: "FAMILY DINING",
      subtitle: "Comfortable space",
      icon: "Users",
    },
    {
      title: "SPACIOUS PARKING",
      subtitle: "Easy access",
      icon: "Car",
    },
    {
      title: "OPEN DAILY",
      subtitle: "Until 22.00",
      icon: "Clock",
    },
  ],
};

// Aliased export for compatibility with existing imports
export const CAFE_INFO = RESTAURANT_INFO;

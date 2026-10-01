export interface CafeInfo {
  name: string;
  shortName: string;
  tagline: string;
  subTagline: string;
  address: {
    street: string;
    subdistrict: string;
    district: string;
    regency: string;
    province: string;
    postalCode: string;
    full: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    whatsappFormatted: string;
    instagram: string;
    instagramUrl: string;
  };
  operational: {
    hours: string;
    days: string;
    closingHour: string;
  };
  priceRange: {
    min: string;
    max: string;
    display: string;
  };
  googleReviews: {
    rating: number;
    totalReviews: string;
    reviewUrl: string;
  };
  googleMaps: {
    embedUrl: string;
    directionsUrl: string;
  };
}

export const CAFE_INFO: CafeInfo = {
  name: "D’Sultan Cafe Tuban",
  shortName: "D’Sultan",
  tagline: "Good Food. Great Atmosphere. Memorable Moments.",
  subTagline: "Tempat menikmati hidangan, kopi, dan suasana terbaik di Tuban.",
  address: {
    street: "Jl. Basuki Rachmad No.282",
    subdistrict: "Ronggomulyo",
    district: "Kec. Tuban",
    regency: "Kabupaten Tuban",
    province: "Jawa Timur",
    postalCode: "62315",
    full: "Jl. Basuki Rachmad No.282, Ronggomulyo, Kec. Tuban, Kabupaten Tuban, Jawa Timur 62315",
  },
  contact: {
    phone: "tel:+6281332303128",
    phoneFormatted: "0813-3230-3128",
    whatsapp: "https://wa.me/6281332303128",
    whatsappFormatted: "0813-3230-3128",
    instagram: "@dsultan.id",
    instagramUrl: "https://www.instagram.com/dsultan.id",
  },
  operational: {
    hours: "10.00 – 22.00 WIB",
    days: "Buka Setiap Hari (Open Daily)",
    closingHour: "22:00",
  },
  priceRange: {
    min: "Rp25.000",
    max: "Rp100.000",
    display: "Rp25K – Rp100K",
  },
  googleReviews: {
    rating: 4.5,
    totalReviews: "699+ ulasan",
    reviewUrl: "https://maps.app.goo.gl/d-sultan-tuban",
  },
  googleMaps: {
    // Official coordinate embed for Jl. Basuki Rachmad Tuban
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.3168864703554!2d112.0526084758784!3d-6.899882293099351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e779a528148e657%3A0xeae0b37082e6669!2sJl.%20Basuki%20Rachmad%20No.282%2C%20Ronggomulyo%2C%20Kec.%20Tuban%2C%20Kabupaten%20Tuban%2C%20Jawa%20Timur%2062315!5e0!3m2!1sid!2sid!4v1711800000000!5m2!1sid!2sid",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Jl.+Basuki+Rachmad+No.282,+Ronggomulyo,+Kec.+Tuban,+Kabupaten+Tuban,+Jawa+Timur+62315",
  },
};

export const createReservationWhatsAppUrl = (data: {
  name: string;
  phone?: string;
  date: string;
  time: string;
  pax: string;
  seatingArea: string;
  notes?: string;
}): string => {
  const text = `Halo D’Sultan Cafe Tuban, saya ingin melakukan reservasi meja:

- Nama: ${data.name}
- No. WhatsApp: ${data.phone || "-"}
- Tanggal Kunjungan: ${data.date}
- Waktu / Jam: ${data.time}
- Jumlah Orang: ${data.pax} Pax
- Area Pilihan: ${data.seatingArea}
- Catatan Khusus: ${data.notes || "Tidak ada"}

Mohon informasi ketersediaan tempat. Terima kasih!`;

  return `https://wa.me/6281332303128?text=${encodeURIComponent(text)}`;
};

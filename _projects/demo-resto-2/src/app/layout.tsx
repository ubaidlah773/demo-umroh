import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationModal from "@/components/ReservationModal";
import LightboxModal from "@/components/LightboxModal";
import MobileFloatingActions from "@/components/MobileFloatingActions";
import { CAFE_INFO } from "@/data/cafeInfo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#090A0D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dsultan.id"),
  title: "D’Sultan Cafe Tuban | Restaurant, Coffee & Live Music",
  description:
    "Nikmati makanan, coffee, suasana nyaman, indoor & outdoor dining, live music, dan berbagai pilihan hidangan di D’Sultan Cafe Tuban. Tempat makan, nongkrong, dan gathering terbaik di Ronggomulyo, Tuban.",
  keywords: [
    "D'Sultan Cafe Tuban",
    "Cafe Tuban",
    "Resto Tuban",
    "Cafe di Tuban",
    "Tempat makan Tuban",
    "Cafe live music Tuban",
    "Restaurant Tuban",
    "Cafe outdoor Tuban",
    "Cafe keluarga Tuban",
    "Kuliner Tuban",
    "Basuki Rachmad Tuban",
  ],
  authors: [{ name: "D'Sultan Cafe Tuban" }],
  creator: "D'Sultan Cafe Tuban",
  alternates: {
    canonical: "https://dsultan.id",
  },
  openGraph: {
    title: "D’Sultan Cafe Tuban | Restaurant, Coffee & Live Music",
    description:
      "Nikmati makanan, coffee, suasana nyaman, indoor & outdoor dining, live music, dan berbagai pilihan hidangan di D’Sultan Cafe Tuban.",
    url: "https://dsultan.id",
    siteName: "D’Sultan Cafe Tuban",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "D'Sultan Cafe Tuban Atmosphere",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "D’Sultan Cafe Tuban | Restaurant, Coffee & Live Music",
    description:
      "Nikmati makanan, coffee, suasana nyaman, indoor & outdoor dining, live music, dan berbagai pilihan hidangan di D’Sultan Cafe Tuban.",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness & Restaurant Schema
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "CafeOrCoffeeShop", "LocalBusiness"],
    "@id": "https://dsultan.id/#restaurant",
    name: CAFE_INFO.name,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    url: "https://dsultan.id",
    telephone: "+6281332303128",
    priceRange: "Rp25.000 - Rp100.000",
    servesCuisine: [
      "Indonesian",
      "Coffee",
      "Western",
      "Steak",
      "Gelato",
      "Desserts",
    ],
    menu: "https://dsultan.id/menu",
    address: {
      "@type": "PostalAddress",
      streetAddress: CAFE_INFO.address.street,
      addressLocality: "Tuban",
      addressRegion: "Jawa Timur",
      postalCode: CAFE_INFO.address.postalCode,
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.8998823,
      longitude: 112.0526085,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "22:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "699",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [CAFE_INFO.contact.instagramUrl],
  };

  return (
    <html lang="id" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-charcoal-950 text-ivory-100 antialiased selection:bg-gold-500/30 selection:text-white">
        <ModalProvider>
          <Navbar />
          {children}
          <Footer />
          <ReservationModal />
          <LightboxModal />
          <MobileFloatingActions />
        </ModalProvider>
      </body>
    </html>
  );
}

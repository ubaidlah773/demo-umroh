import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationModal from "@/components/ReservationModal";
import LightboxModal from "@/components/LightboxModal";
import FloatingBookingCTA from "@/components/FloatingBookingCTA";
import { RESTAURANT_INFO } from "@/data/restaurant";

export const viewport: Viewport = {
  themeColor: "#211C18",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://restokayumanistuban.com"),
  title: "Resto Kayu Manis | Luxury Dining & Reservations",
  description:
    "Experience exceptional food, elegant surroundings, and effortless reservations at Resto Kayu Manis Tuban.",
  keywords: [
    "Resto Kayu Manis",
    "Resto Kayu Manis Tuban",
    "Luxury Restaurant Tuban",
    "Fine Dining Tuban",
    "Restaurant Reservations Tuban",
    "Seafood Restaurant Tuban",
    "Contemporary Indonesian Cuisine",
    "Family Gathering Tuban",
    "Culinary Tuban",
  ],
  authors: [{ name: "Resto Kayu Manis Tuban" }],
  creator: "Resto Kayu Manis Tuban",
  alternates: {
    canonical: "https://restokayumanistuban.com",
  },
  openGraph: {
    title: "Resto Kayu Manis | Luxury Dining & Reservations",
    description:
      "Experience exceptional food, elegant surroundings, and effortless reservations at Resto Kayu Manis Tuban.",
    url: "https://restokayumanistuban.com",
    siteName: "Resto Kayu Manis",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Resto Kayu Manis - Luxury Dining Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resto Kayu Manis | Luxury Dining & Reservations",
    description:
      "Experience exceptional food, elegant surroundings, and effortless reservations at Resto Kayu Manis Tuban.",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
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
  // Restaurant & LocalBusiness JSON-LD Schema (Section 36)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    "@id": "https://restokayumanistuban.com/#restaurant",
    name: "Resto Kayu Manis",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    url: "https://restokayumanistuban.com",
    telephone: "+62356331114",
    priceRange: "$$",
    servesCuisine: ["Contemporary Indonesian", "Seafood", "Nusantara"],
    menu: "https://restokayumanistuban.com/menu",
    acceptsReservations: "True",
    address: {
      "@type": "PostalAddress",
      streetAddress: RESTAURANT_INFO.address.street,
      addressLocality: "Tuban",
      addressRegion: "Jawa Timur",
      postalCode: RESTAURANT_INFO.address.postalCode,
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: RESTAURANT_INFO.coordinates.lat,
      longitude: RESTAURANT_INFO.coordinates.lng,
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
        opens: "11:00",
        closes: "22:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1940",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-ivory-100 text-espresso-900 antialiased selection:bg-champagne-500/25 selection:text-espresso-950 font-sans">
        <ModalProvider>
          <Navbar />
          {children}
          <Footer />
          <ReservationModal />
          <LightboxModal />
          <FloatingBookingCTA />
        </ModalProvider>
      </body>
    </html>
  );
}

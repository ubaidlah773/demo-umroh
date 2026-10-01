import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LightboxModal from "@/components/LightboxModal";
import ReservationModal from "@/components/ReservationModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { RESTAURANT_INFO } from "@/data/restaurant";

export const viewport: Viewport = {
  themeColor: "#140D08",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://demo-resto-3.vercel.app"),
  title: "Bale Rasa Tuban | Kuliner Tradisional Jawa & Suasana Joglo",
  description:
    "Nikmati kuliner tradisional Jawa di Bale Rasa Tuban. Sajian Becek Buwohan, Garang Asem, Sop Iga dan menu rumahan dalam suasana Joglo yang nyaman.",
  keywords: [
    "Bale Rasa Tuban",
    "restoran Tuban",
    "kuliner Tuban",
    "restoran Jawa Tuban",
    "tempat makan Tuban",
    "kuliner tradisional Tuban",
    "restoran Joglo Tuban",
    "tempat makan keluarga Tuban",
    "Becek Buwohan Tuban",
    "Andum Roso Nambah Bolo",
  ],
  authors: [{ name: "Bale Rasa Tuban" }],
  creator: "Bale Rasa Tuban",
  alternates: {
    canonical: "https://demo-resto-3.vercel.app",
  },
  openGraph: {
    title: "Bale Rasa Tuban | Kuliner Tradisional Jawa & Suasana Joglo",
    description:
      "Nikmati kuliner tradisional Jawa di Bale Rasa Tuban. Sajian Becek Buwohan, Garang Asem, Sop Iga dan menu rumahan dalam suasana Joglo yang nyaman.",
    url: "https://demo-resto-3.vercel.app",
    siteName: "Bale Rasa Tuban",
    images: [
      {
        url: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Bale Rasa Tuban - Restoran Tradisional Jawa & Suasana Joglo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bale Rasa Tuban | Kuliner Tradisional Jawa & Suasana Joglo",
    description:
      "Nikmati kuliner tradisional Jawa di Bale Rasa Tuban. Sajian Becek Buwohan, Garang Asem, Sop Iga dan menu rumahan dalam suasana Joglo yang nyaman.",
    images: [
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80",
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
  // LocalBusiness / Restaurant Schema Markup (Section 16)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    "@id": "https://demo-resto-3.vercel.app/#restaurant",
    name: "Bale Rasa Tuban",
    alternateName: "Bale Rasa Merakurak",
    slogan: "Andum Roso, Nambah Bolo",
    image:
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80",
    url: "https://demo-resto-3.vercel.app",
    telephone: "+6285236473110",
    priceRange: "Rp25.000 - Rp50.000",
    servesCuisine: [
      "Javanese",
      "Traditional Indonesian",
      "Kuliner Khas Tuban",
      "Becek Buwohan",
    ],
    acceptsReservations: "True",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Jl. Bahagia, Jl. Bogorejo I, Mulung, Bogorejo, Kec. Merakurak",
      addressLocality: "Tuban",
      addressRegion: "Jawa Timur",
      postalCode: "62355",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.8996,
      longitude: 112.0125,
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
        closes: "21:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "422",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-cream-100 text-jawa-950 antialiased font-sans">
        <ModalProvider>
          <Navbar />
          {children}
          <Footer />
          <LightboxModal />
          <ReservationModal />
          <WhatsAppButton />
        </ModalProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { InquiryProvider } from "@/context/InquiryContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FavoritesDrawer from "@/components/FavoritesDrawer";
import InquiryModal from "@/components/InquiryModal";
import ToastContainer from "@/components/ToastContainer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F7F5F0",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lumeaproperty.com"),
  title: {
    default: "LUMÉA • Premium Property Advisory | Luxury Real Estate",
    template: "%s | LUMÉA Property",
  },
  description:
    "Property, curated for your next chapter. Discover prime residential sanctuaries, modern tropical villas, colonial heritage estates, and trophy penthouses across Bali, Jakarta, and Indonesia.",
  keywords: [
    "LUMÉA Property",
    "Luxury Real Estate Indonesia",
    "Bali Luxury Villas",
    "Canggu Freehold Villa",
    "Menteng Heritage Manor",
    "SCBD Penthouse Jakarta",
    "Ahmad Ubaid Property Consultant",
    "High-End Property Advisor",
    "Indonesia Real Estate Investment",
  ],
  authors: [{ name: "LUMÉA Property Advisory" }],
  openGraph: {
    title: "LUMÉA • Premium Property Advisory",
    description: "Property, curated for your next chapter. Exclusive real estate advisory in Indonesia.",
    url: "https://lumeaproperty.com",
    siteName: "LUMÉA Property",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "LUMÉA Curated Luxury Property",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMÉA • Premium Property Advisory",
    description: "Property, curated for your next chapter.",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=630&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for RealEstateAgent
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "LUMÉA Property Advisory",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Bespoke property consultancy curating exceptional real estate across Indonesia.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Pantai Batu Bolong No. 88, Canggu",
      addressLocality: "Badung",
      addressRegion: "Bali",
      postalCode: "80351",
      addressCountry: "ID",
    },
    telephone: "+62-812-8890-4521",
    priceRange: "Rp 3.000.000.000 - Rp 50.000.000.000",
    founder: {
      "@type": "Person",
      name: "Ahmad Ubaid",
      jobTitle: "Senior Property Consultant",
    },
  };

  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-lumea-bg text-lumea-primary font-sans antialiased flex flex-col selection:bg-lumea-accent selection:text-white">
        <FavoritesProvider>
          <InquiryProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FavoritesDrawer />
            <InquiryModal />
            <ToastContainer />
          </InquiryProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}

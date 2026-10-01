import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CustomCursor from "@/components/CustomCursor";
import CartDrawer from "@/components/CartDrawer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#17110e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aromacoffee.id"),
  title: "AROMA • Specialty Coffee House | 3D Interactive Digital Showroom",
  description:
    "Premium specialty coffee, carefully roasted and beautifully crafted for every moment. Explore our 3D interactive showroom, single-origin terroir, and artisanal coffee menu.",
  keywords: [
    "AROMA Coffee",
    "Specialty Coffee",
    "3D Coffee Experience",
    "Single Origin Espresso",
    "Cold Brew Reserve",
    "Caramel Latte",
    "Tuban Coffee Shop",
    "Artisanal Coffee Roasters",
  ],
  authors: [{ name: "AROMA Coffee Roasters" }],
  openGraph: {
    title: "AROMA • Specialty Coffee House",
    description: "Premium coffee, carefully roasted and beautifully crafted for every moment.",
    url: "https://aromacoffee.id",
    siteName: "AROMA SPECIALTY COFFEE",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/hero-cup.jpg",
        width: 1200,
        height: 630,
        alt: "AROMA Specialty Coffee Cup",
      },
    ],
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
  return (
    <html
      lang="en"
      className={`scroll-smooth ${plusJakartaSans.variable} ${playfairDisplay.variable}`}
    >
      <body className="min-h-screen bg-espresso-900 text-cream-100 font-sans antialiased flex flex-col selection:bg-gold-500/30 selection:text-cream-50">
        <CartProvider>
          <CustomCursor />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

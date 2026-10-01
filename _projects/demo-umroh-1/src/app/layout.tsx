import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";

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
  themeColor: "#064e3b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Demo Website Travel Umroh & Haji",
  description: "Contoh website profesional untuk bisnis Travel Umroh & Haji.",
  keywords: [
    "Demo Website Travel Umroh & Haji",
    "Website Travel Umroh",
    "Contoh Website Umroh",
    "Paket Umroh",
    "Jadwal Keberangkatan Umroh",
    "Konsultasi Umroh",
    "Travel Haji dan Umroh",
  ],
  authors: [{ name: "DEMO UMROH" }],
  openGraph: {
    title: "Demo Website Travel Umroh & Haji",
    description: "Contoh website profesional untuk bisnis Travel Umroh & Haji.",
    url: "https://demo-umroh.vercel.app",
    siteName: "DEMO UMROH",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Demo Website Travel Umroh & Haji",
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
      lang="id"
      className={`scroll-smooth ${plusJakartaSans.variable} ${playfairDisplay.variable}`}
    >
      <body className="min-h-screen bg-ivory-50 text-slate-800 font-sans antialiased flex flex-col selection:bg-gold-100 selection:text-emerald-950">
        {children}
      </body>
    </html>
  );
}

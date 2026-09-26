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
  title: "Safara Umroh | Paket Umroh & Konsultasi Perjalanan",
  description:
    "Website demo travel Umroh untuk menampilkan paket, jadwal, fasilitas, informasi pendaftaran, dan konsultasi WhatsApp.",
  keywords: [
    "Safara Umroh",
    "Paket Umroh",
    "Jadwal Keberangkatan Umroh",
    "Umroh Reguler",
    "Umroh Premium",
    "Umroh Ramadhan",
    "Konsultasi Umroh",
    "Travel Umroh Terpercaya",
    "Biro Perjalanan Haji dan Umroh",
  ],
  authors: [{ name: "Safara Umroh" }],
  openGraph: {
    title: "Safara Umroh | Paket Umroh & Konsultasi Perjalanan",
    description:
      "Website demo travel Umroh untuk menampilkan paket, jadwal, fasilitas, informasi pendaftaran, dan konsultasi WhatsApp.",
    url: "https://safara-umroh.demo",
    siteName: siteConfig.name,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Safara Umroh - Teman Perjalanan Menuju Tanah Suci",
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

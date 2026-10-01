import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LPK NusaSkill | Pusat Pelatihan Kerja & Pengembangan Kompetensi",
  description:
    "Website demo LPK NusaSkill untuk menampilkan program pelatihan, informasi pendaftaran, dokumentasi, dan konsultasi.",
  keywords: [
    "LPK NusaSkill",
    "Lembaga Pelatihan Kerja",
    "Pelatihan Kerja",
    "Pengembangan Kompetensi",
    "Kursus Bahasa Jepang",
    "Kursus Bahasa Korea",
    "Persiapan Kerja",
    "Pelatihan Vokasi",
  ],
  authors: [{ name: "LPK NusaSkill" }],
  openGraph: {
    title: "LPK NusaSkill | Pusat Pelatihan Kerja & Pengembangan Kompetensi",
    description:
      "Website demo LPK NusaSkill untuk menampilkan program pelatihan, informasi pendaftaran, dokumentasi, dan konsultasi.",
    url: "https://demo-lpk.vercel.app",
    siteName: siteConfig.institution.fullName,
    locale: "id_ID",
    type: "website",
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
    <html lang="id" className={`scroll-smooth ${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}

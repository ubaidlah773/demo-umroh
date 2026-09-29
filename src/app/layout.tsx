import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F7F8FC",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ubaitech.my.id"),
  title: "Ahmad Ubai Dullah — Full Stack Developer",
  description:
    "Full Stack Developer based in Tuban, Indonesia. Experienced in building and maintaining web applications using Laravel, JavaScript, Node.js, and MySQL, with additional experience in data analysis and machine learning.",
  keywords: [
    "Ahmad Ubai Dullah",
    "UBAI",
    "Full Stack Developer",
    "Laravel Developer Indonesia",
    "Web Developer Tuban",
    "MySQL",
    "JavaScript",
    "Node.js",
    "Database-driven systems",
    "Belajar Cerdas",
    "Lapas Tuban",
  ],
  authors: [{ name: "Ahmad Ubai Dullah", url: "https://github.com/ubaidlah773" }],
  creator: "Ahmad Ubai Dullah",
  alternates: {
    canonical: "https://ubaitech.my.id",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Ahmad Ubai Dullah — Full Stack Developer",
    description:
      "Building practical web systems that solve real-world problems. Full Stack Developer based in Tuban, Indonesia.",
    url: "https://ubaitech.my.id",
    siteName: "Ahmad Ubai Dullah — UBAI Portfolio",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/brand/ubai-logo-gradient.png",
        width: 931,
        height: 636,
        alt: "UBAI — Ahmad Ubai Dullah Brand Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Ubai Dullah — Full Stack Developer",
    description: "Building practical web systems that solve real-world problems.",
    images: ["/brand/ubai-logo-gradient.png"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ahmad Ubai Dullah",
    alternateName: "UBAI",
    jobTitle: "Full Stack Developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tuban",
      addressRegion: "Jawa Timur",
      addressCountry: "ID",
    },
    email: "ahm.idlah773@gmail.com",
    telephone: "+62 819-1200-1721",
    url: "https://ubaitech.my.id",
    sameAs: [
      "https://github.com/ubaidlah773",
      "https://linkedin.com/in/ahmadubai",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Universitas Negeri Semarang",
    },
    knowsAbout: [
      "Full Stack Development",
      "Laravel",
      "JavaScript",
      "Node.js",
      "MySQL",
      "REST API",
      "Data Analysis",
      "Machine Learning",
    ],
  };

  return (
    <html
      lang="en"
      className={`scroll-smooth ${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#F7F8FC] text-[#272838] font-sans antialiased flex flex-col selection:bg-[#347FC4]/20 selection:text-[#272838]">
        {children}
      </body>
    </html>
  );
}

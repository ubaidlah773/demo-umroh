import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ProgressProvider } from '@/context/ProgressContext';

export const metadata: Metadata = {
  title: 'OfficeMaster — Belajar Microsoft Office dari Nol sampai Mahir',
  description:
    'Pelajari Microsoft Word, Excel, PowerPoint, dan Dashboard Academy dari level paling dasar hingga mahir dengan materi terstruktur, latihan interaktif, dan file latihan asli.',
  keywords: [
    'belajar excel',
    'belajar word',
    'belajar powerpoint',
    'microsoft office tutorial',
    'excel formula',
    'dashboard excel',
    'pivottable',
    'vlookup xlookup',
    'officemaster',
  ],
  authors: [{ name: 'OfficeMaster Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="bg-[#F8F9FA] text-[#171717]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#F8F9FA] text-[#171717] antialiased flex flex-col font-sans">
        <ProgressProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </ProgressProvider>
      </body>
    </html>
  );
}

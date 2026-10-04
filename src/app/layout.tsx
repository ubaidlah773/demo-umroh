import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { ToolsProvider } from '@/context/ToolsContext';
import { ProgressProvider } from '@/context/ProgressContext';

export const metadata: Metadata = {
  title: 'AdminTools — Tools administrasi, tanpa ribet.',
  description:
    'Gabungkan dokumen, kompres file, convert format, buat QR dan selesaikan pekerjaan administratif langsung dari browser.',
  keywords: [
    'merge pdf',
    'compress pdf',
    'compress image',
    'qr code generator',
    'barcode generator',
    'csv converter',
    'admin utilities',
  ],
  authors: [{ name: 'AdminTools Team' }],
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
    <html lang="id" className="bg-white text-body">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-body antialiased flex flex-col">
        <ToolsProvider>
          <ProgressProvider>
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <MobileBottomNav />
          </ProgressProvider>
        </ToolsProvider>
      </body>
    </html>
  );
}

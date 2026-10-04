import HomeView from '@/components/home/HomeView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AdminTools — Tools administrasi, tanpa ribet.',
  description:
    'Gabungkan dokumen, kompres file, convert format, buat QR dan selesaikan pekerjaan administratif langsung dari browser.',
};

export default function HomePage() {
  return <HomeView />;
}

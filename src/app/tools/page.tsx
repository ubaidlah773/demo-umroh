import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ToolsCatalogView from './ToolsCatalogView';

export const metadata: Metadata = {
  title: 'All Tools — AdminTools',
  description: 'Daftar lengkap utilitas dokumen, konversi data, gambar, QR code, dan teks.',
};

export default function ToolsCatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-muted">Memuat direktori tools...</div>}>
      <ToolsCatalogView />
    </Suspense>
  );
}

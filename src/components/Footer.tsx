import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-20 pb-20 md:pb-12 pt-12 text-xs text-muted">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          {/* Brand & Privacy Statement */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-bold tracking-wider text-dark block text-sm">
              ADMINTOOLS
            </span>
            <p className="text-body max-w-sm leading-relaxed">
              Platform utilitas digital untuk mempercepat administrasi harian: gabungkan dokumen, kompres file, buat kode QR, dan convert format tanpa instalasi aplikasi.
            </p>
            <div className="flex items-center gap-2 text-dark font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span>Privasi penuh: File diproses secara lokal di browser Anda.</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-dark text-xs uppercase tracking-wider">
              Kategori Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tools?category=pdf" className="hover:text-dark transition-colors">
                  PDF Tools
                </Link>
              </li>
              <li>
                <Link href="/tools?category=convert" className="hover:text-dark transition-colors">
                  Convert Dokumen & Data
                </Link>
              </li>
              <li>
                <Link href="/tools?category=images" className="hover:text-dark transition-colors">
                  Image Utilities
                </Link>
              </li>
              <li>
                <Link href="/tools?category=qr" className="hover:text-dark transition-colors">
                  QR & Barcode Generator
                </Link>
              </li>
              <li>
                <Link href="/tools?category=text" className="hover:text-dark transition-colors">
                  Text Tools
                </Link>
              </li>
              <li>
                <Link href="/tools?category=utilities" className="hover:text-dark transition-colors">
                  File & System Utilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Productivity & Info */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-dark text-xs uppercase tracking-wider">
              Informasi
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/history" className="hover:text-dark transition-colors">
                  Riwayat Aktivitas
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-dark transition-colors">
                  Tools Favorit
                </Link>
              </li>
              <li>
                <span className="text-muted/80">Versi 2.0 (Utility Core)</span>
              </li>
              <li>
                <span className="text-muted/80">Zero Data Storage Policy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-muted text-[11px]">
          <p>© {new Date().getFullYear()} AdminTools. Dirancang untuk efisiensi kerja cepat.</p>
          <div className="flex items-center gap-4">
            <span>Client-side Processing Engine</span>
            <span>•</span>
            <span>No Account Required</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

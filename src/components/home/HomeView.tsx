'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  ChevronDown,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  Clock,
  Star,
  Check,
} from 'lucide-react';
import { TOOLS, CATEGORIES, ToolCategory, getPopularTools } from '@/data/tools';
import ToolListItem from '@/components/ui/ToolListItem';
import ToolIcon from '@/components/ui/ToolIcon';
import { useTools } from '@/context/ToolsContext';

export default function HomeView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ToolCategory>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { getRecentToolItems, getFavoriteToolItems } = useTools();
  const recentToolItems = getRecentToolItems();
  const favoriteToolItems = getFavoriteToolItems();

  const popularTools = useMemo(() => getPopularTools(), []);

  // Filter tools based on category and search query
  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const faqs = [
    {
      q: 'Bagaimana AdminTools menjaga keamanan dokumen saya?',
      a: 'Mayoritas operasi utilitas (seperti Merge PDF, Kompres Gambar, QR & Barcode Generator, konversi teks) diproses 100% secara lokal langsung di dalam browser perangkat Anda. File Anda tidak pernah diunggah atau disimpan di server luar.',
    },
    {
      q: 'Apakah ada batasan jumlah file atau biaya berlangganan?',
      a: 'Tidak. AdminTools dirancang untuk penggunaan praktis harian tanpa registrasi akun, tanpa batasan antrean buatan, dan tanpa biaya langganan.',
    },
    {
      q: 'Mengapa beberapa fitur converter bertuliskan "Coming soon"?',
      a: 'Kami memegang prinsip kejujuran produk. Operasi seperti konversi PDF kompleks ke Word memerlukan mesin tata letak dokumen tingkat server. Kami tidak menyediakan tombol konversi palsu jika mesin resminya belum siap diproduksi.',
    },
    {
      q: 'Dapatkah AdminTools digunakan pada smartphone atau tablet?',
      a: 'Ya, seluruh layout telah dioptimalkan secara responsif untuk smartphone dan tablet dengan navigasi bawah yang mudah dijangkau satu tangan.',
    },
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION (Compact, quiet, practical) */}
      <section className="w-full max-w-[900px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8 text-center sm:text-left space-y-5">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-dark tracking-tight leading-[1.15]">
            Tools administrasi, tanpa ribet.
          </h1>
          <p className="text-sm sm:text-base text-body leading-relaxed max-w-2xl">
            Gabungkan dokumen, kompres file, convert format, buat QR dan selesaikan pekerjaan administratif langsung dari browser.
          </p>
        </div>

        {/* UTILITY SEARCH (56px Height, section 9) */}
        <div className="relative w-full pt-2">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search a tool... (e.g. merge, compress, qr, csv)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-4 pr-12 text-sm sm:text-base bg-white text-dark placeholder:text-muted/70 border border-border rounded-lg shadow-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
            <div className="absolute right-4 text-muted pointer-events-none">
              <Search className="w-5 h-5" />
            </div>
          </div>
          {searchQuery && (
            <div className="text-xs text-muted mt-2 flex justify-between items-center px-1">
              <span>Menemukan {filteredTools.length} tool</span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-primary hover:underline cursor-pointer"
              >
                Hapus pencarian
              </button>
            </div>
          )}
        </div>

        {/* 2. POPULAR TOOLS STRIP (Section 10) */}
        <div className="pt-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider mr-1">
              Popular:
            </span>
            {popularTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-subtle border border-border hover:border-gray-400 hover:bg-white text-xs text-dark transition-colors"
              >
                <ToolIcon name={tool.icon} className="w-3.5 h-3.5 text-muted" />
                <span className="font-medium">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TOOL DIRECTORY (Main section: Sidebar + 2-Column list) */}
      <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar categories */}
          <aside className="w-full lg:w-56 shrink-0 space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted px-3 pb-2">
              Categories
            </h2>
            <div className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
              {CATEGORIES.map((cat) => {
                const count =
                  cat.key === 'all'
                    ? TOOLS.length
                    : TOOLS.filter((t) => t.category === cat.key).length;
                const isSelected = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap text-left ${
                      isSelected
                        ? 'bg-primary text-white'
                        : 'text-body hover:bg-subtle hover:text-dark'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[11px] ml-2 ${
                        isSelected ? 'text-white/80' : 'text-muted'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick favorites link in sidebar if available */}
            {favoriteToolItems.length > 0 && (
              <div className="pt-6 hidden lg:block">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted px-3 pb-2 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>My Favorites ({favoriteToolItems.length})</span>
                </h3>
                <div className="space-y-1">
                  {favoriteToolItems.slice(0, 5).map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.slug}`}
                      className="block px-3 py-1.5 text-xs text-body hover:text-primary truncate"
                    >
                      ★ {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Directory Content (2-Column max, clean utility items) */}
          <div className="flex-1 w-full space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-baseline gap-2">
                <h2 className="text-lg font-bold text-dark">
                  {selectedCategory === 'all'
                    ? 'All Tools'
                    : CATEGORIES.find((c) => c.key === selectedCategory)?.label || 'Tools'}
                </h2>
                <span className="text-xs text-muted">
                  ({filteredTools.length} {filteredTools.length === 1 ? 'utility' : 'utilities'})
                </span>
              </div>
            </div>

            {filteredTools.length === 0 ? (
              <div className="p-12 text-center border border-border rounded-lg bg-subtle text-muted text-sm">
                Tidak ada tools yang sesuai dengan pencarian "{searchQuery}".
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredTools.map((tool) => (
                  <ToolListItem
                    key={tool.id}
                    tool={tool}
                    showCategory={selectedCategory === 'all'}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. RECENTLY USED SECTION (Section 22) */}
      {recentToolItems.length > 0 && (
        <section className="w-full bg-subtle border-y border-border py-12">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted" />
                <h3 className="text-sm font-bold text-dark uppercase tracking-wider">
                  Recently Used
                </h3>
              </div>
              <Link
                href="/history"
                className="text-xs text-primary hover:underline font-medium"
              >
                Lihat semua riwayat →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {recentToolItems.slice(0, 4).map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="p-3 bg-white border border-border rounded hover:border-gray-400 transition-colors flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <ToolIcon name={tool.icon} className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-xs font-semibold text-dark truncate">
                      {tool.name}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. WHY ADMINTOOLS SECTION (Editorial & Trust, Section 8) */}
      <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-2xl text-left space-y-2 mb-10">
          <h2 className="text-2xl font-bold text-dark tracking-tight">
            Dibuat untuk produktivitas murni.
          </h2>
          <p className="text-sm text-body leading-relaxed">
            AdminTools dirancang oleh praktisi untuk menyelesaikan tugas administratif secepat mungkin tanpa beban pemasaran, popup, atau komputasi bayangan di cloud.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-5 border border-border rounded-lg bg-white space-y-2.5">
            <div className="w-8 h-8 rounded border border-border bg-subtle flex items-center justify-center text-dark">
              <ShieldCheck className="w-4 h-4 text-success" />
            </div>
            <h3 className="text-sm font-semibold text-dark">Privasi di Perangkat Anda</h3>
            <p className="text-xs text-body leading-relaxed">
              Semua pengolahan berkas PDF, kompresi foto, QR code, dan formatting teks dieksekusi secara lokal di mesin browser menggunakan WebAssembly. Dokumen Anda tidak mampir ke server mana pun.
            </p>
          </div>

          <div className="p-5 border border-border rounded-lg bg-white space-y-2.5">
            <div className="w-8 h-8 rounded border border-border bg-subtle flex items-center justify-center text-dark">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-dark">Kecepatan Tanpa Antrean</h3>
            <p className="text-xs text-body leading-relaxed">
              Tidak ada hitung mundur buatan, tidak ada pembatasan kecepatan unduhan, dan tidak ada formulir pendaftaran. Anda buka halaman, lakukan pekerjaan, unduh, dan selesai.
            </p>
          </div>

          <div className="p-5 border border-border rounded-lg bg-white space-y-2.5">
            <div className="w-8 h-8 rounded border border-border bg-subtle flex items-center justify-center text-dark">
              <Lock className="w-4 h-4 text-dark" />
            </div>
            <h3 className="text-sm font-semibold text-dark">Keterbukaan & Akurasi</h3>
            <p className="text-xs text-body leading-relaxed">
              Statistik pengurangan ukuran berkas dihitung dari byte riil file Anda. Kami tidak menampilkan tombol converter bohongan untuk fungsi yang membutuhkan backend terpisah.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION (Clean accordion) */}
      <section className="w-full max-w-[900px] mx-auto px-4 sm:px-6 pb-16 text-left">
        <h2 className="text-xl font-bold text-dark tracking-tight mb-6">
          Pertanyaan Umum
        </h2>
        <div className="divide-y divide-border border-y border-border">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-dark">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="text-xs text-body leading-relaxed mt-2.5 pr-8">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

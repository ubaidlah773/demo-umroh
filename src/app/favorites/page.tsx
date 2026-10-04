'use client';

import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { useTools } from '@/context/ToolsContext';
import ToolListItem from '@/components/ui/ToolListItem';

export default function FavoritesPage() {
  const { getFavoriteToolItems } = useTools();
  const favoriteTools = getFavoriteToolItems();

  return (
    <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 text-left">
      <div className="border-b border-border pb-5">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          <h1 className="text-2xl font-bold text-dark">Tools Favorit Saya</h1>
        </div>
        <p className="text-xs text-muted mt-1">
          Akses cepat ke utilitas yang paling sering Anda gunakan dalam pekerjaan harian.
        </p>
      </div>

      {favoriteTools.length === 0 ? (
        <div className="p-12 text-center border border-border rounded-lg bg-subtle text-muted text-xs space-y-2">
          <Star className="w-6 h-6 mx-auto text-muted/60" />
          <p className="font-medium text-dark">Belum ada tool yang ditandai bintang</p>
          <p className="max-w-xs mx-auto">
            Klik ikon bintang (★) pada card tool mana pun untuk menyematkannya di halaman ini.
          </p>
          <div className="pt-2">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center h-8 px-3 rounded text-xs font-medium bg-primary text-white"
            >
              Lihat Semua Tools
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {favoriteTools.map((tool) => (
            <ToolListItem key={tool.id} tool={tool} showCategory={true} />
          ))}
        </div>
      )}
    </div>
  );
}

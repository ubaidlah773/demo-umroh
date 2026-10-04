'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { TOOLS, CATEGORIES, ToolCategory } from '@/data/tools';
import ToolListItem from '@/components/ui/ToolListItem';

export default function ToolsCatalogView() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('category') as ToolCategory | null;

  const [selectedCategory, setSelectedCategory] = useState<'all' | ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (catParam && CATEGORIES.some((c) => c.key === catParam)) {
      setSelectedCategory(catParam);
    }
  }, [catParam]);

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

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 text-left">
      <div className="space-y-2 border-b border-border pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-dark tracking-tight">
          Direktori Utilitas Digital
        </h1>
        <p className="text-xs sm:text-sm text-muted max-w-xl leading-relaxed">
          Pilih dari kumpulan tools administratif untuk memproses dokumen, foto, teks, dan data tanpa instalasi perangkat lunak.
        </p>

        {/* Search */}
        <div className="pt-4 max-w-md">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Cari tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-3 pr-10 text-sm bg-white text-dark placeholder:text-muted/70 border border-border rounded focus:border-primary focus:outline-none"
            />
            <Search className="w-4 h-4 text-muted absolute right-3 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Categories sidebar */}
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
        </aside>

        {/* Directory List (2 Column max) */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h2 className="text-sm font-bold text-dark">
              {selectedCategory === 'all'
                ? 'Semua Tools'
                : CATEGORIES.find((c) => c.key === selectedCategory)?.label}
            </h2>
            <span className="text-xs text-muted">
              {filteredTools.length} alat tersedia
            </span>
          </div>

          {filteredTools.length === 0 ? (
            <div className="p-12 text-center border border-border rounded-lg bg-subtle text-muted text-xs">
              Tidak ada tools yang sesuai dengan kriteria filter.
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
    </div>
  );
}

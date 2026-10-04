'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';
import { CURRICULUM } from '@/data/curriculum';
import { CHEATSHEET_ITEMS } from '@/data/cheatsheet';
import { SHORTCUTS_DATA } from '@/data/shortcuts';
import { AppType, LevelType } from '@/types';

interface SearchResult {
  title: string;
  app: AppType;
  level?: LevelType;
  slug?: string;
  url: string;
  description: string;
  type: 'lesson' | 'formula' | 'shortcut';
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  // Close on Escape, toggle on Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search index
  const allSearchable = useMemo<SearchResult[]>(() => {
    const list: SearchResult[] = [];

    (['word', 'excel', 'powerpoint'] as AppType[]).forEach((app) => {
      const appCurriculum = CURRICULUM[app];
      appCurriculum.levels.forEach((lvl) => {
        lvl.lessons.forEach((les) => {
          list.push({
            title: les.title,
            app,
            level: lvl.level,
            slug: les.slug,
            url: `/${app}/${lvl.level}/${les.slug}`,
            description: les.description,
            type: 'lesson',
          });
        });
      });
    });

    CHEATSHEET_ITEMS.forEach((ch) => {
      list.push({
        title: `${ch.name} - ${ch.syntax}`,
        app: ch.app,
        url: `/cheatsheet`,
        description: ch.description,
        type: 'formula',
      });
    });

    SHORTCUTS_DATA.forEach((sc) => {
      const appKey: AppType = sc.app === 'all' ? 'excel' : (sc.app as AppType);
      list.push({
        title: `${sc.keys.join(' + ')} : ${sc.action}`,
        app: appKey,
        url: `/shortcuts`,
        description: `Shortcut: ${sc.action}`,
        type: 'shortcut',
      });
    });

    return list;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allSearchable
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.slug && item.slug.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [query, allSearchable]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/30 backdrop-blur-[2px]">
      <div className="w-full max-w-xl bg-white rounded-[8px] border border-[#D1D5DB] shadow-lg overflow-hidden flex flex-col text-xs">
        {/* Search Input Bar */}
        <div className="flex items-center px-3.5 py-2.5 border-b border-[#E5E7EB] bg-[#F9FAFB]">
          <Search className="w-4 h-4 text-[#9CA3AF] shrink-0 mr-2.5" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, formulas, shortcuts..."
            className="w-full bg-transparent text-[#171717] text-xs sm:text-sm font-normal placeholder-[#9CA3AF] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#9CA3AF] hover:text-[#171717]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="text-[10px] font-mono text-[#9CA3AF] px-1.5 py-0.5 border border-[#E5E7EB] rounded bg-white ml-2">
            ESC
          </span>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto divide-y divide-[#E5E7EB]">
          {query.trim() === '' ? (
            <div className="p-6 text-center text-[#9CA3AF]">
              Type a keyword like <span className="font-mono text-[#171717]">SUM</span>,{' '}
              <span className="font-mono text-[#171717]">VLOOKUP</span>, or{' '}
              <span className="font-mono text-[#171717]">CV</span>
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center text-[#9CA3AF]">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            results.map((res, index) => (
              <Link
                key={index}
                href={res.url}
                onClick={onClose}
                className="p-3 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors group"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-mono px-1 bg-[#F3F4F6] text-[#6B7280] rounded">
                      {res.app}
                    </span>
                    <span className="font-medium text-[#171717] group-hover:text-[#2563EB] text-xs">
                      {res.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B7280] mt-0.5 line-clamp-1">
                    {res.description}
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#D1D5DB] group-hover:text-[#171717] shrink-0 ml-2" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

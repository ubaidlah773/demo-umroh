'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Clock, Star, X } from 'lucide-react';
import { TOOLS } from '@/data/tools';
import { useTools } from '@/context/ToolsContext';

export default function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { recentTools, favorites } = useTools();

  const filteredTools = searchQuery.trim()
    ? TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-border h-16 flex items-center">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Left: Brand Wordmark & Main Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-base font-bold tracking-wider text-dark hover:text-primary transition-colors select-none"
            >
              ADMINTOOLS
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                href="/tools"
                className={`transition-colors ${
                  pathname === '/tools' ? 'text-primary' : 'text-body hover:text-dark'
                }`}
              >
                Tools
              </Link>
              <Link
                href="/tools?category=pdf"
                className={`transition-colors ${
                  pathname.includes('category=pdf') ? 'text-primary' : 'text-body hover:text-dark'
                }`}
              >
                PDF
              </Link>
              <Link
                href="/tools?category=convert"
                className={`transition-colors ${
                  pathname.includes('category=convert') ? 'text-primary' : 'text-body hover:text-dark'
                }`}
              >
                Convert
              </Link>
              <Link
                href="/tools?category=utilities"
                className={`transition-colors ${
                  pathname.includes('category=utilities') ? 'text-primary' : 'text-body hover:text-dark'
                }`}
              >
                Utilities
              </Link>
            </nav>
          </div>

          {/* Right: Quick actions */}
          <div className="flex items-center gap-2 sm:gap-4 text-sm">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded text-xs text-muted hover:text-dark hover:bg-subtle border border-transparent hover:border-border transition-colors cursor-pointer"
              aria-label="Quick search tools"
            >
              <Search className="w-4 h-4 text-muted" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-muted bg-subtle border border-border rounded">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/history"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs transition-colors ${
                pathname === '/history'
                  ? 'text-primary bg-primary/5 font-medium'
                  : 'text-body hover:text-dark hover:bg-subtle'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>History</span>
              {recentTools.length > 0 && (
                <span className="text-[10px] font-mono px-1 rounded-sm bg-subtle border border-border text-muted">
                  {recentTools.length}
                </span>
              )}
            </Link>

            <Link
              href="/favorites"
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs transition-colors ${
                pathname === '/favorites'
                  ? 'text-primary bg-primary/5 font-medium'
                  : 'text-body hover:text-dark hover:bg-subtle'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500" />
              <span>Favorites</span>
              {favorites.length > 0 && (
                <span className="text-[10px] font-mono px-1 rounded-sm bg-subtle border border-border text-muted">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-dark/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg bg-white border border-border rounded-lg shadow-subtle overflow-hidden">
            <div className="flex items-center px-4 border-b border-border bg-white">
              <Search className="w-4 h-4 text-muted shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search tools (e.g. merge, compress, qr, csv)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 px-3 text-sm text-dark placeholder:text-muted/70 bg-transparent focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded text-muted hover:text-dark"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-border/60">
              {searchQuery.trim() === '' ? (
                <div className="p-4 text-center text-xs text-muted">
                  Type tool name or keywords to quickly jump to any utility.
                </div>
              ) : filteredTools.length === 0 ? (
                <div className="p-4 text-center text-xs text-muted">
                  No tools found for "{searchQuery}".
                </div>
              ) : (
                filteredTools.map((t) => (
                  <Link
                    key={t.id}
                    href={`/tools/${t.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded hover:bg-subtle text-left transition-colors"
                  >
                    <div>
                      <p className="text-xs font-semibold text-dark">{t.name}</p>
                      <p className="text-[11px] text-muted truncate max-w-xs">{t.description}</p>
                    </div>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-subtle border border-border text-muted">
                      {t.categoryLabel}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

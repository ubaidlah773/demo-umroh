'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import SearchModal from './SearchModal';

export default function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const mainLinks = [
    { href: '/learn', label: 'Kurikulum' },
    { href: '/dashboard', label: '📊 Dashboard Academy' },
    { href: '/practice', label: 'Practice Lab' },
    { href: '/challenges', label: 'Challenges' },
    { href: '/shortcuts', label: 'Shortcuts' },
  ];

  const moreLinks = [
    { href: '/dashboard/projects', label: '15 Proyek Real Dashboard' },
    { href: '/dashboard/templates', label: 'Template Dashboard (.xlsx)' },
    { href: '/dashboard/datasets', label: 'Dataset Latihan Bisnis' },
    { href: '/dashboard/cheatsheet', label: 'Dashboard Cheatsheet' },
    { href: '/dashboard/certification', label: 'Sertifikasi Dashboard Specialist' },
    { href: '/tips', label: 'Tips & Tricks (100+)' },
    { href: '/errors', label: 'Error & Troubleshooting' },
    { href: '/exam', label: 'Ujian Sertifikasi Office (100 Soal)' },
    { href: '/final-project', label: 'Grand Final Project' },
    { href: '/cheatsheet', label: 'Cheatsheet Rumus Office' },
    { href: '/downloads', label: 'Library Download File' },
    { href: '/progress', label: 'Progress Belajar' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Subtitle */}
          <Link href="/" className="flex flex-col group shrink-0">
            <span className="font-bold text-lg text-[#171717] tracking-tight leading-tight group-hover:text-[#2563EB] transition-colors">
              OfficeMaster
            </span>
            <span className="text-[11px] text-[#6B7280] font-normal leading-tight">
              Learn Microsoft Office
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-medium">
            {mainLinks.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors py-1 ${
                    isActive
                      ? 'font-bold text-[#171717] border-b-2 border-[#171717]'
                      : 'text-[#4B5563] hover:text-[#171717]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* More Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
                className="flex items-center gap-1 text-[#4B5563] hover:text-[#171717] py-1 transition-colors"
              >
                <span>Modul Lainnya</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {moreDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-[#E5E7EB] rounded-[6px] shadow-lg py-1.5 z-50 animate-in fade-in">
                  {moreLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-3.5 py-2 text-xs transition-colors ${
                        pathname.startsWith(item.href)
                          ? 'bg-[#F3F4F6] text-[#171717] font-semibold'
                          : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#171717]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action: Search Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 h-9 px-3 rounded-[6px] bg-[#F8F9FA] border border-[#E5E7EB] text-xs text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#171717] transition-all"
              title="Cari materi atau rumus"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cari materi...</span>
              <kbd className="hidden sm:inline text-[10px] font-mono bg-white border border-[#E5E7EB] px-1.5 py-0.5 rounded text-[#9CA3AF]">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#6B7280] hover:text-[#171717]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E5E7EB] bg-white px-4 py-3 space-y-1 text-xs">
            <div className="font-bold text-[#9CA3AF] uppercase text-[10px] tracking-wider py-1">
              Menu Utama
            </div>
            {mainLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 font-medium ${
                  pathname.startsWith(item.href)
                    ? 'text-[#171717] font-bold'
                    : 'text-[#4B5563] hover:text-[#171717]'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="font-bold text-[#9CA3AF] uppercase text-[10px] tracking-wider pt-3 pb-1 border-t border-[#E5E7EB]">
              Modul Tambahan & Sertifikasi
            </div>
            {moreLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-1.5 font-medium ${
                  pathname.startsWith(item.href)
                    ? 'text-[#171717] font-bold'
                    : 'text-[#6B7280] hover:text-[#171717]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

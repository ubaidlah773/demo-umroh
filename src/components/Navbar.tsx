"use client";

import React, { useState, useEffect } from "react";
import { siteConfig, getWhatsAppUrl } from "@/config/siteConfig";
import {
  Compass,
  Menu,
  X,
  MessageCircle,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface NavbarProps {
  onOpenInquiry?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Beranda", href: "#hero" },
    { label: "Paket Umroh", href: "#paket" },
    { label: "Jadwal", href: "#jadwal" },
    { label: "Fasilitas", href: "#fasilitas" },
    { label: "Alur", href: "#alur" },
    { label: "Tentang Kami", href: "#tentang" },
    { label: "Galeri", href: "#galeri" },
    { label: "FAQ", href: "#faq" },
    { label: "Kontak", href: "#kontak" },
  ];

  return (
    <>
      {/* Top Demo Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gold-500/20 text-gold-300 border border-gold-400/30">
              {siteConfig.badge}
            </span>
            <span className="hidden sm:inline text-emerald-200/80">
              Template website siap pakai untuk biro travel Umroh & Haji
            </span>
            <span className="sm:hidden text-emerald-200/80">
              Demo Travel Umroh
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-emerald-200/90">
            <span className="hidden md:inline">
              Hubungi Admin: {siteConfig.whatsapp}
            </span>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gold-400 hover:text-gold-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-emerald-950/95 backdrop-blur-md shadow-md py-3 border-b border-gold-500/20"
            : "bg-emerald-950/90 backdrop-blur-sm py-4 border-b border-emerald-900/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Brand */}
            <a
              href="#hero"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-gold-400 rounded-lg p-1"
              aria-label="Safara Umroh - Beranda"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-emerald-950 shadow-md group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-emerald-950" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
                  SAFARA
                </span>
                <span className="text-[10px] tracking-[0.25em] text-gold-300 font-semibold uppercase mt-0.5">
                  {siteConfig.category}
                </span>
              </div>
            </a>

            {/* Desktop Menu */}
            <nav className="hidden xl:flex items-center gap-1" aria-label="Menu Utama">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-medium text-emerald-100 hover:text-gold-300 hover:bg-emerald-900/50 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Tablet Menu (Shorter links) */}
            <nav className="hidden lg:flex xl:hidden items-center gap-1" aria-label="Menu Tablet">
              {navLinks.slice(0, 6).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-2.5 py-1.5 text-xs font-medium text-emerald-100 hover:text-gold-300 hover:bg-emerald-900/50 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button Desktop */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-emerald-950 px-4 py-2 rounded-full font-semibold text-sm hover:from-gold-400 hover:to-gold-300 shadow-sm hover:shadow-gold-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-4 h-4 text-emerald-950" />
                <span>Konsultasi</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-1 bg-gold-400 text-emerald-950 px-2.5 py-1.5 rounded-full font-semibold text-xs shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Konsultasi</span>
              </button>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 focus:outline-none focus:ring-2 focus:ring-gold-400"
                aria-label={isMobileMenuOpen ? "Tutup Menu" : "Buka Menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gold-400" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Tablet hamburger toggle (between sm and lg) */}
            <div className="hidden sm:flex lg:hidden items-center">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 focus:outline-none focus:ring-2 focus:ring-gold-400"
                aria-label={isMobileMenuOpen ? "Tutup Menu" : "Buka Menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gold-400" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-emerald-950 border-l border-gold-500/20 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-fade-in">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-emerald-900">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gold-400 flex items-center justify-center text-emerald-950 font-bold">
                    <Compass className="w-4 h-4 text-emerald-950" />
                  </div>
                  <div>
                    <span className="font-serif text-lg font-bold text-white block">
                      SAFARA
                    </span>
                    <span className="text-[9px] tracking-widest text-gold-400 uppercase font-semibold">
                      {siteConfig.category}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-emerald-300 hover:text-white rounded-lg hover:bg-emerald-900"
                  aria-label="Tutup menu navigasi"
                >
                  <X className="w-5 h-5 text-gold-400" />
                </button>
              </div>

              {/* Links */}
              <div className="py-6 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 text-base font-medium text-emerald-100 hover:text-gold-300 hover:bg-emerald-900/60 rounded-lg transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-emerald-900/80 space-y-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-emerald-950 py-3 rounded-xl font-bold text-sm shadow-md hover:from-gold-400 hover:to-gold-300 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-950" />
                <span>Konsultasi WhatsApp</span>
              </a>

              <div className="p-3 rounded-lg bg-emerald-900/40 border border-emerald-800 text-[11px] text-emerald-200/80 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Demo Website</strong>
                  Informasi paket dan jadwal dapat disesuaikan untuk biro travel Anda.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

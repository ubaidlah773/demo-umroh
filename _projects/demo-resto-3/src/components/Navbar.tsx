"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RESTAURANT_INFO } from "@/data/restaurant";
import { useModal } from "@/context/ModalContext";
import { Menu, X, Phone, Utensils, MapPin, Calendar } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openReservation } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Beranda", href: "#hero" },
    { label: "Cerita", href: "#cerita" },
    { label: "Signature", href: "#signature" },
    { label: "Menu", href: "#menu" },
    { label: "Suasana", href: "#suasana" },
    { label: "Galeri", href: "#galeri" },
    { label: "Ulasan", href: "#ulasan" },
    { label: "Lokasi", href: "#lokasi" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-jawa-950/90 backdrop-blur-md py-3 shadow-heritage border-b border-gold-500/15"
            : "bg-gradient-to-b from-jawa-950/80 via-jawa-950/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="#hero"
              className="group flex flex-col items-start focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-cream-50 group-hover:text-gold-400 transition-colors">
                  {RESTAURANT_INFO.name}
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                <span className="hidden sm:inline-block text-xs uppercase tracking-[0.25em] text-cream-200/80 font-sans">
                  Tuban
                </span>
              </div>
              <span className="font-serif italic text-xs tracking-wider text-gold-300/90">
                “{RESTAURANT_INFO.tagline}”
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.16em] text-cream-100/90 hover:text-gold-300 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 hover:after:w-full after:transition-all after:duration-300 font-sans"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Action */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={RESTAURANT_INFO.links.whatsappReservation}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex items-center gap-1.5 text-xs text-cream-200/80 hover:text-gold-300 transition-colors px-3 py-1.5 rounded-full border border-gold-500/20 hover:border-gold-500/50"
              >
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>{RESTAURANT_INFO.contact.phoneFormatted}</span>
              </a>

              <button
                onClick={openReservation}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-cream-50 font-sans text-xs uppercase tracking-wider font-semibold hover:from-terracotta-600 hover:to-terracotta-700 transition-all duration-300 shadow-sm hover:shadow-heritage active:scale-[0.98] border border-gold-400/20"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reservasi Meja</span>
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={openReservation}
                className="px-3 py-1.5 rounded-sm bg-terracotta-500 text-cream-50 text-[11px] font-sans uppercase tracking-wider font-medium"
              >
                Reservasi
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-sm text-cream-100 hover:text-gold-400 transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-30 bg-jawa-950/95 backdrop-blur-lg transition-all duration-500 sm:hidden flex flex-col justify-between pt-24 pb-8 px-6 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="space-y-4">
          <div className="border-b border-gold-500/20 pb-4 mb-4">
            <span className="font-serif text-2xl text-cream-50 font-bold block">
              {RESTAURANT_INFO.name}
            </span>
            <span className="font-serif italic text-sm text-gold-300">
              “{RESTAURANT_INFO.tagline}”
            </span>
          </div>

          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base uppercase tracking-wider text-cream-100/90 hover:text-gold-400 font-sans py-2 border-b border-jawa-800/60"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-6 border-t border-gold-500/20">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openReservation();
            }}
            className="w-full py-3 rounded-sm bg-terracotta-500 text-cream-50 font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Reservasi Meja via WhatsApp
          </button>
          <a
            href={RESTAURANT_INFO.links.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-sm border border-gold-500/30 text-gold-300 font-sans text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Buka Petunjuk Arah
          </a>
        </div>
      </div>
    </>
  );
}

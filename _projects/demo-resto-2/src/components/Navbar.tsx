"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, UtensilsCrossed } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { CAFE_INFO } from "@/data/cafeInfo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/#experience", label: "Experience" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openReservation } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-charcoal-950/85 backdrop-blur-md border-b border-gold-500/15 py-3.5 shadow-lg shadow-black/40"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex flex-col items-start focus:outline-none"
            aria-label="D’Sultan Cafe Tuban Home"
          >
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-ivory-100 group-hover:text-gold-400 transition-colors">
              D’SULTAN
            </span>
            <span className="text-[10px] tracking-[0.28em] uppercase text-gold-400 font-medium -mt-1 group-hover:text-ivory-200 transition-colors">
              Cafe • Dining • Music
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href) && !link.href.includes("#");

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm tracking-wide transition-all duration-200 hover:text-gold-400 relative py-1 ${
                    isActive ? "text-gold-400 font-medium" : "text-ivory-200 font-light"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => openReservation()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-gold-glow hover:shadow-gold-glow-lg transform hover:-translate-y-0.5 cursor-pointer"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              Reserve a Table
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => openReservation()}
              className="px-3.5 py-1.5 rounded-full bg-gold-500 text-charcoal-950 text-xs font-semibold uppercase tracking-wider"
            >
              Reserve
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-charcoal-850/80 border border-charcoal-700 text-ivory-200 hover:text-white focus:outline-none"
              aria-label={isMobileMenuOpen ? "Tutup Menu" : "Buka Menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-gold-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-8 lg:hidden animate-in fade-in duration-200">
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between border-b border-charcoal-800 pb-5">
            <div>
              <span className="font-serif text-2xl font-semibold tracking-wider text-ivory-100">
                D’SULTAN
              </span>
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold-400 font-medium">
                Cafe • Dining • Music
              </p>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-full bg-charcoal-850 border border-charcoal-700 text-ivory-200 hover:text-white"
              aria-label="Tutup menu navigasi"
            >
              <X className="w-6 h-6 text-gold-400" />
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="flex flex-col gap-4 py-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-2xl text-ivory-200 hover:text-gold-400 py-1 transition-colors flex items-center justify-between border-b border-charcoal-800/40 pb-2.5"
              >
                <span>{link.label}</span>
                <span className="text-xs font-sans tracking-widest text-gold-400/60 uppercase">→</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Bottom Info & Reservation CTA */}
          <div className="space-y-4 pt-4 border-t border-charcoal-800">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openReservation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-sm uppercase tracking-wider shadow-gold-glow"
            >
              <UtensilsCrossed className="w-4 h-4" />
              Reserve a Table
            </button>

            <div className="flex items-center justify-between text-xs text-ivory-400 px-1 pt-1">
              <span>📍 {CAFE_INFO.address.subdistrict}, Tuban</span>
              <a
                href={CAFE_INFO.contact.phone}
                className="text-gold-400 hover:underline flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                {CAFE_INFO.contact.phoneFormatted}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

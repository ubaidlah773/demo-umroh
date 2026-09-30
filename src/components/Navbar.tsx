"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Utensils, Menu, X, ArrowUpRight } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openReservation } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "MENU", href: "/menu" },
    { name: "ABOUT", href: "/#about" },
    { name: "EXPERIENCE", href: "/#experience" },
    { name: "GALLERY", href: "/#gallery" },
    { name: "CONTACT", href: "/#contact" },
  ];

  const isDarkInitial = pathname === "/" && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-ivory-100/95 backdrop-blur-md border-b border-espresso-900/10 shadow-sm py-4"
          : "bg-gradient-to-b from-espresso-950/80 via-espresso-950/30 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-baseline gap-2">
          <span
            className={`font-serif text-2xl sm:text-3xl tracking-tight transition-colors ${
              scrolled ? "text-espresso-900 font-medium" : "text-ivory-50 font-normal"
            }`}
          >
            KAYU MANIS
          </span>
          <span
            className={`font-mono text-[9px] uppercase tracking-[0.25em] transition-colors ${
              scrolled ? "text-champagne-700" : "text-champagne-300"
            }`}
          >
            TUBAN
          </span>
        </Link>

        {/* Desktop Center Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:text-champagne-500 relative py-1 ${
                scrolled
                  ? "text-espresso-900/80 font-medium"
                  : "text-ivory-100/85 font-light"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Action: BOOK A TABLE Button */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => openReservation()}
            className={`px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 active:scale-95 ${
              scrolled
                ? "bg-espresso-900 hover:bg-champagne-600 text-ivory-100 shadow-sm"
                : "bg-champagne-500 hover:bg-champagne-400 text-espresso-950 shadow-champagne-glow"
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>BOOK A TABLE</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`p-2 rounded-lg md:hidden transition-colors cursor-pointer ${
            scrolled ? "text-espresso-900" : "text-ivory-100"
          }`}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-ivory-100/98 backdrop-blur-xl border-b border-espresso-900/10 p-6 shadow-2xl transition-all">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm uppercase tracking-[0.2em] text-espresso-900 py-2 border-b border-espresso-900/5 hover:text-champagne-600"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openReservation();
                }}
                className="w-full py-3.5 rounded-full bg-espresso-900 text-ivory-100 font-mono text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Utensils className="w-4 h-4 text-champagne-400" />
                <span>BOOK A TABLE</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

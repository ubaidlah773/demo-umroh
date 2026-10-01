"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";
import { useInquiry } from "@/context/InquiryContext";
import MobileMenu from "./MobileMenu";
import { Heart, Menu, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { favoriteIds, setIsDrawerOpen } = useFavorites();
  const { openInquiry } = useInquiry();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On home page at top, transparent with white text for contrast against hero image
  // Once scrolled or on other pages, solid background #F7F5F0 with charcoal text
  const isTransparent = isHome && !scrolled;

  const navLinks = [
    { label: "Properties", href: "/properties" },
    { label: "Locations", href: "/locations" },
    { label: "About", href: "/about" },
    { label: "Journal", href: "/journal" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isTransparent
            ? "bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5 sm:py-6 text-white"
            : "glass-nav-scrolled py-3.5 sm:py-4 text-lumea-primary shadow-sm"
        }`}
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 select-none min-h-[44px] min-w-[44px]"
            aria-label="LUMÉA Property Advisory Homepage"
          >
            <span
              className={`font-editorial text-2xl sm:text-3xl tracking-[0.22em] font-semibold transition-colors ${
                isTransparent ? "text-white" : "text-lumea-primary"
              }`}
            >
              LUMÉA
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors relative py-1 min-h-[44px] flex items-center ${
                    isActive
                      ? isTransparent
                        ? "text-white font-semibold after:absolute after:bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-white"
                        : "text-lumea-accent font-semibold after:absolute after:bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-lumea-accent"
                      : isTransparent
                      ? "text-white/85 hover:text-white"
                      : "text-lumea-secondary hover:text-lumea-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Saved properties button with badge */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className={`relative p-2.5 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isTransparent
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-white border border-lumea-border text-lumea-primary hover:text-lumea-accent shadow-sm"
              }`}
              aria-label={`View ${favoriteIds.length} saved properties`}
              title="Saved Properties"
            >
              <Heart className={`w-4 h-4 ${favoriteIds.length > 0 ? "fill-lumea-accent text-lumea-accent" : ""}`} />
              {favoriteIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-lumea-accent text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {favoriteIds.length}
                </span>
              )}
            </button>

            {/* Desktop Contact Agent CTA */}
            <button
              onClick={() => openInquiry()}
              className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-200 min-h-[44px] ${
                isTransparent
                  ? "bg-white text-lumea-primary hover:bg-lumea-bg shadow-md"
                  : "bg-lumea-primary text-white hover:bg-lumea-accent shadow-sm"
              }`}
            >
              <span>Contact Agent</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle (44px target) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`md:hidden p-2.5 rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isTransparent
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-white border border-lumea-border text-lumea-primary hover:bg-lumea-surface"
              }`}
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}

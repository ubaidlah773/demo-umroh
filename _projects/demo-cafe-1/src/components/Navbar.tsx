"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu as MenuIcon, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsOpen: setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "#hero" },
    { name: "SIGNATURE", href: "#signature" },
    { name: "JOURNEY", href: "#journey" },
    { name: "STORY", href: "#story" },
    { name: "ORIGIN", href: "#origin" },
    { name: "MENU", href: "#menu" },
    { name: "EXPERIENCE", href: "#experience" },
    { name: "LOCATION", href: "#location" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-espresso-950/80 backdrop-blur-md border-b border-gold-500/15 py-3.5 shadow-2xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="group flex flex-col items-start tracking-[0.25em] select-none"
          >
            <span className="font-serif text-2xl md:text-3xl font-light text-cream-100 group-hover:text-gold-400 transition-colors">
              AROMA
            </span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-gold-500 font-medium -mt-1">
              SPECIALTY COFFEE
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-cream-200/80 hover:text-gold-400 transition-colors font-medium relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-gold-500 to-caramel-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full bg-espresso-800/80 border border-gold-500/20 text-gold-400 hover:border-gold-500/50 hover:bg-gold-500/10 transition-all"
              aria-label="View Cart"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold-500 text-espresso-950 font-bold text-[10px] flex items-center justify-center shadow-gold-sm animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* ORDER NOW CTA button */}
            <button
              onClick={() => setCartOpen(true)}
              className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-gold-500 via-gold-400 to-caramel-500 text-espresso-950 hover:brightness-110 active:scale-95 shadow-gold-glow transition-all"
            >
              ORDER NOW
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-espresso-800/80 border border-white/10 text-cream-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] z-30 lg:hidden bg-espresso-950/95 backdrop-blur-xl border-b border-gold-500/20 p-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium tracking-[0.2em] uppercase text-cream-200 hover:text-gold-400 py-2 border-b border-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCartOpen(true);
                }}
                className="w-full mt-4 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-gold-500 text-espresso-950 text-center shadow-gold-glow"
              >
                ORDER NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

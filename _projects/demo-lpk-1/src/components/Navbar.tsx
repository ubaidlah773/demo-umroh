"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap, Menu, X, ArrowRight, MapPin, Clock, Phone } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/config/siteConfig";

interface NavbarProps {
  onOpenRegisterModal: () => void;
}

export default function Navbar({ onOpenRegisterModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = siteConfig.navLinks.map((link) =>
        link.href.replace("#", "")
      );
      for (const sectionId of sections.reverse()) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
      {/* Top Utility Info Bar */}
      <div className="hidden lg:block bg-navy-950 text-slate-300 text-xs border-b border-navy-900 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-crimson-400 shrink-0" />
              <span>{siteConfig.contact.address}</span>
            </span>
            <span className="text-navy-700">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{siteConfig.contact.officeHours}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Pusat Informasi & Pendaftaran:</span>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-emerald-400 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{siteConfig.contact.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-200 border-b border-slate-200 ${
          isScrolled ? "py-3 bg-white/98 backdrop-blur-md shadow-sm" : "py-4 bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Official Logo Brand */}
            <a href="#beranda" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-lg bg-navy-950 text-white flex items-center justify-center border border-navy-800 shadow-xs">
                <GraduationCap className="w-6 h-6 text-crimson-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-navy-950 uppercase leading-tight font-sans">
                  {siteConfig.institution.fullName}
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-wider font-semibold text-slate-500 uppercase">
                  {siteConfig.institution.subTitle}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {siteConfig.navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`px-3.5 py-2 text-sm font-medium transition-colors border-b-2 ${
                      isActive
                        ? "text-crimson-700 font-semibold border-crimson-600"
                        : "text-slate-600 hover:text-navy-950 border-transparent hover:border-slate-300"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* CTA Pendaftaran */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={onOpenRegisterModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-navy-950 hover:bg-navy-900 border border-navy-900 shadow-sm transition-all duration-150 cursor-pointer"
              >
                <span>Daftar Pelatihan</span>
                <ArrowRight className="w-4 h-4 text-crimson-400" />
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenRegisterModal}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-navy-950 hover:bg-navy-900"
              >
                Daftar Pelatihan
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
                aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {siteConfig.navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded text-sm font-medium ${
                    isActive
                      ? "bg-slate-100 text-crimson-700 font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegisterModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm text-white bg-navy-950"
              >
                <span>Daftar Pelatihan</span>
                <ArrowRight className="w-4 h-4 text-crimson-400" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

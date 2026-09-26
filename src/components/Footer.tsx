"use client";

import React from "react";
import { siteConfig, getWhatsAppUrl } from "@/config/siteConfig";
import {
  Compass,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  ShieldCheck,
  ArrowUp,
  MessageCircle,
} from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="kontak" className="bg-emerald-950 text-white border-t border-gold-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-emerald-900">
          {/* Column 1: DEMO UMROH & Description */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-emerald-950 shadow-md">
                <Compass className="w-5 h-5 text-emerald-950" />
              </div>
              <div>
                <span className="font-serif text-2xl font-black tracking-tight text-white block">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] tracking-wider text-gold-400 font-semibold uppercase block">
                  {siteConfig.tagline}
                </span>
              </div>
            </div>

            <p className="font-serif italic text-gold-300 text-sm">
              &ldquo;Contoh Website Travel Umroh &amp; Haji&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
              Solusi sistem website profesional untuk biro perjalanan ibadah Umroh dan Haji.
              Menyajikan informasi paket secara transparan, jadwal terstruktur, dan konversi cepat ke WhatsApp.
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              {siteConfig.socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-emerald-900/80 border border-emerald-800 hover:border-gold-400/50 hover:bg-gold-500/20 flex items-center justify-center text-emerald-200 hover:text-gold-300 transition-colors"
                  aria-label={soc.name}
                >
                  {soc.name === "Instagram" && <Instagram className="w-4 h-4" />}
                  {soc.name === "Facebook" && <Facebook className="w-4 h-4" />}
                  {soc.name === "TikTok" && (
                    <span className="text-xs font-bold font-mono">TT</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Menu Links */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white tracking-wide border-b border-emerald-900 pb-2">
              Menu Navigasi
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-200/90">
              <li>
                <a href="#paket" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span>Paket</span>
                </a>
              </li>
              <li>
                <a href="#jadwal" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span>Jadwal</span>
                </a>
              </li>
              <li>
                <a href="#fasilitas" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span>Fasilitas</span>
                </a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span>Galeri</span>
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span>FAQ</span>
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span>Kontak</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Kontak Travel Placeholders */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white tracking-wide border-b border-emerald-900 pb-2">
              Kontak Travel
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-emerald-200/90">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-emerald-400">WhatsApp / Telepon:</span>
                  <span className="font-mono font-medium text-white">{siteConfig.whatsapp}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-emerald-400">Email:</span>
                  <span className="font-mono font-medium text-white">{siteConfig.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-emerald-400">Alamat Kantor:</span>
                  <span className="font-medium text-white">{siteConfig.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-emerald-400">Jam Layanan:</span>
                  <span className="text-white">{siteConfig.workingHours}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi Admin WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="py-6 border-b border-emerald-900/60">
          <div className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-800 text-xs text-emerald-200/90 leading-relaxed text-center sm:text-left flex flex-col sm:flex-row items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
            <p>
              <strong>Disclaimer:</strong> {` `}
              Website ini merupakan contoh/demo. Seluruh data paket, harga, jadwal, legalitas, fasilitas, galeri, dan kontak dapat disesuaikan dengan data travel.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/80">
          <div>
            &copy; {new Date().getFullYear()} {siteConfig.name} — Contoh Website Travel Umroh &amp; Haji.
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-gold-500/20 text-gold-300 border border-gold-400/30 font-semibold">
              {siteConfig.badge}
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-emerald-200 hover:text-white transition-colors"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

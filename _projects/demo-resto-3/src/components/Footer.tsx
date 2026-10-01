import React from "react";
import Link from "next/link";
import { RESTAURANT_INFO } from "@/data/restaurant";
import { Phone, MapPin, Clock, MessageCircle, Instagram } from "lucide-react";

export default function Footer() {
  const footerNav = [
    { label: "Home", href: "#hero" },
    { label: "Tentang Kami", href: "#cerita" },
    { label: "Signature", href: "#signature" },
    { label: "Menu", href: "#menu" },
    { label: "Gallery", href: "#galeri" },
    { label: "Review", href: "#ulasan" },
    { label: "Lokasi", href: "#lokasi" },
  ];

  return (
    <footer className="bg-jawa-950 text-cream-100 border-t border-gold-500/20 pt-16 pb-24 sm:pb-12 relative overflow-hidden">
      {/* Subtle top heritage border highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-jawa-900">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-bold tracking-wider text-cream-50 uppercase block">
                {RESTAURANT_INFO.name}
              </span>
              <span className="font-serif italic text-base text-gold-300 block">
                “{RESTAURANT_INFO.tagline}”
              </span>
            </div>
            
            <p className="font-sans text-cream-200/75 text-sm font-light leading-relaxed max-w-sm">
              {RESTAURANT_INFO.concept}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESTAURANT_INFO.links.whatsappReservation}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-jawa-900 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:text-cream-50 hover:bg-terracotta-500 hover:border-terracotta-500 transition-colors"
                aria-label="WhatsApp Bale Rasa"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${RESTAURANT_INFO.contact.phone}`}
                className="w-9 h-9 rounded-sm bg-jawa-900 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:text-cream-50 hover:bg-terracotta-500 hover:border-terracotta-500 transition-colors"
                aria-label="Telepon Bale Rasa"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.links.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-jawa-900 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:text-cream-50 hover:bg-terracotta-500 hover:border-terracotta-500 transition-colors"
                aria-label="Google Maps Bale Rasa"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-400 font-sans font-semibold">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5">
              {footerNav.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-cream-200/80 hover:text-gold-300 transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-400 font-sans font-semibold">
              Hubungi Kami
            </h4>

            <div className="space-y-3 text-xs sm:text-sm font-sans text-cream-200/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-terracotta-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address.full}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.contact.phone}`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {RESTAURANT_INFO.contact.phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Buka Setiap Hari: {RESTAURANT_INFO.hours.display}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-300/60 font-sans gap-4">
          <p>© 2026 Bale Rasa Tuban. All Rights Reserved.</p>
          <p className="font-serif italic text-gold-300/80">
            “Andum Roso, Nambah Bolo” — Tuban, Jawa Timur
          </p>
        </div>

      </div>
    </footer>
  );
}

import React from "react";
import { RESTAURANT_INFO } from "@/data/restaurant";
import { MapPin, Clock, Phone, Navigation, ExternalLink, Sparkles } from "lucide-react";

export default function Location() {
  return (
    <section id="lokasi" className="py-20 sm:py-28 bg-jawa-950 text-cream-50 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-forest-800/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-jawa-900 border border-gold-500/30 text-gold-300 text-xs uppercase tracking-[0.25em] font-sans">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
            <span>Alamat & Rute Perjalanan</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream-50 tracking-tight">
            Temukan Bale Rasa
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto my-3" />
          <p className="font-sans text-cream-200/80 text-sm sm:text-base font-light leading-relaxed">
            Terletak strategis di Merakurak, Tuban dengan akses mudah, lingkungan tenang, dan parkir luas.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Information Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Card 1: Alamat Lengkap */}
              <div className="bg-jawa-900/90 rounded-sm border border-gold-500/25 p-6 shadow-heritage space-y-2">
                <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-wider font-sans font-semibold">
                  <MapPin className="w-4 h-4 text-terracotta-400 shrink-0" />
                  <span>Merakurak, Tuban</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-cream-50">
                  Alamat Lengkap
                </h3>
                <p className="font-sans text-cream-200/85 text-sm leading-relaxed font-light">
                  {RESTAURANT_INFO.address.full}
                </p>
              </div>

              {/* Card 2: Jam Operasional */}
              <div className="bg-jawa-900/90 rounded-sm border border-gold-500/25 p-6 shadow-heritage space-y-2">
                <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-wider font-sans font-semibold">
                  <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Jam Buka</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-cream-50">
                  {RESTAURANT_INFO.hours.display}
                </h3>
                <p className="font-sans text-cream-200/85 text-xs leading-relaxed font-light">
                  {RESTAURANT_INFO.hours.status} — Siap menyajikan makan siang keluarga, santap sore, hingga santap malam bersama.
                </p>
              </div>

              {/* Card 3: Kontak & Telepon */}
              <div className="bg-jawa-900/90 rounded-sm border border-gold-500/25 p-6 shadow-heritage space-y-2">
                <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-wider font-sans font-semibold">
                  <Phone className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Kontak & WhatsApp</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-cream-50">
                  {RESTAURANT_INFO.contact.phoneFormatted}
                </h3>
                <p className="font-sans text-cream-200/85 text-xs leading-relaxed font-light">
                  Hubungi kami untuk tanya arah jalan, pemesanan rombongan, atau reservasi meja khusus.
                </p>
              </div>
            </div>

            {/* Action Button: Buka Google Maps */}
            <div className="pt-2">
              <a
                href={RESTAURANT_INFO.links.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-sm bg-gradient-to-r from-cream-100 to-cream-200 text-jawa-950 font-sans text-xs uppercase tracking-widest font-semibold hover:from-white hover:to-cream-100 transition-all duration-300 shadow-md hover:shadow-heritage active:scale-[0.98] border border-gold-300/40 group"
              >
                <Navigation className="w-4 h-4 text-terracotta-600 transition-transform group-hover:scale-110" />
                <span>Buka Google Maps</span>
                <ExternalLink className="w-4 h-4 ml-1 text-jawa-700" />
              </a>
            </div>

          </div>

          {/* Map Column */}
          <div className="lg:col-span-7 rounded-sm overflow-hidden border border-gold-500/30 shadow-heritage-lg min-h-[380px] lg:min-h-full relative bg-jawa-900">
            <iframe
              src={RESTAURANT_INFO.links.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Bale Rasa Merakurak Tuban"
              className="w-full h-full grayscale-[25%] contrast-[1.05]"
            />
            <div className="absolute top-4 right-4 bg-jawa-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-gold-500/30 text-[11px] text-gold-300 font-sans tracking-wide shadow-md">
              📍 Merakurak, Tuban
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

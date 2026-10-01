import React from "react";
import { SIGNATURE_ITEMS } from "@/data/menu";
import { RESTAURANT_INFO } from "@/data/restaurant";
import { Sparkles, Utensils, ArrowUpRight } from "lucide-react";

export default function SignatureDish() {
  const heroDish = SIGNATURE_ITEMS[0]; // Becek Buwohan (Paling besar)
  const otherDishes = SIGNATURE_ITEMS.slice(1);

  return (
    <section id="signature" className="py-20 sm:py-28 bg-jawa-950 text-cream-50 relative overflow-hidden">
      {/* Ambient background warm glows */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-jawa-900 border border-gold-500/30 text-gold-300 text-xs uppercase tracking-[0.25em] font-sans">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
            <span>Pilihan Istimewa Bale Rasa</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-cream-50 tracking-tight">
            Rasa yang Jadi Cerita
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto my-3" />
          <p className="font-sans text-cream-200/80 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Dihidangkan dari resep turun-temurun tanah Tuban dengan perpaduan rempah asli nusantara yang meresap sempurna.
          </p>
        </div>

        {/* 1. HERO SIGNATURE DISH: BECEK BUWOHAN (Berukuran Paling Besar) */}
        <div className="mb-14 sm:mb-16">
          <div className="bg-jawa-900/90 rounded-sm border border-gold-500/30 overflow-hidden shadow-heritage-lg grid grid-cols-1 lg:grid-cols-12 group hover:border-gold-400/60 transition-all duration-500">
            {/* Image Column */}
            <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[500px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroDish.imageUrl}
                alt={heroDish.name}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jawa-950 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded-sm bg-terracotta-500 text-cream-50 text-xs font-sans uppercase tracking-widest font-semibold shadow-md">
                  {heroDish.badge}
                </span>
                <span className="px-3.5 py-1.5 rounded-sm bg-jawa-950/80 backdrop-blur-md text-gold-300 text-xs font-sans tracking-wide border border-gold-500/30">
                  Kuliner Legendaris Tuban
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-jawa-900 via-jawa-850 to-jawa-950">
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] text-gold-400 font-sans font-medium">
                  Signature Dish Utama
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream-50 leading-tight">
                  {heroDish.name}
                </h3>
                <div className="w-12 h-[2px] bg-terracotta-500 my-2" />
                <p className="font-sans text-cream-200/90 text-base sm:text-lg font-light leading-relaxed">
                  {heroDish.description}
                </p>
                <div className="pt-2 text-sm text-gold-300/80 font-sans italic">
                  * Dimasak perlahan dengan rempah kluwek pilihan, cabai rawit pedas nikmat, dan potongan daging sapi lembut yang lumer di mulut.
                </div>
              </div>

              <div className="pt-8 border-t border-jawa-800 flex items-center justify-between mt-6">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-cream-300/70 font-sans block">
                    Penetapan Harga
                  </span>
                  <span className="font-serif text-base text-gold-300 font-medium">
                    {heroDish.price}
                  </span>
                </div>
                <a
                  href={RESTAURANT_INFO.links.whatsappReservation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 text-xs font-sans uppercase tracking-wider font-semibold border border-gold-500/30 transition-colors"
                >
                  <span>Pesan Sekarang</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. THE REMAINING 5 SIGNATURE DISHES (Editorial Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {otherDishes.map((dish) => (
            <div
              key={dish.id}
              className="group bg-jawa-900/80 rounded-sm border border-gold-500/20 hover:border-gold-400/50 overflow-hidden shadow-heritage transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Hover Zoom */}
                <div className="relative aspect-[16/10] overflow-hidden bg-jawa-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jawa-950 via-transparent to-transparent opacity-80" />
                  {dish.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-sm bg-jawa-950/80 backdrop-blur-md text-gold-300 text-[11px] font-sans tracking-wide border border-gold-500/30">
                      {dish.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-2.5">
                  <span className="text-[10px] uppercase tracking-widest text-gold-400/90 font-sans block">
                    {dish.categoryLabel}
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-cream-50 group-hover:text-gold-300 transition-colors">
                    {dish.name}
                  </h4>
                  <p className="font-sans text-cream-200/80 text-sm font-light leading-relaxed line-clamp-3">
                    {dish.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-jawa-800/80 flex items-center justify-between text-xs text-cream-200/70 font-sans">
                <span className="text-gold-300/90 font-medium">
                  {dish.price}
                </span>
                <span className="text-cream-300/60 text-[11px] group-hover:text-gold-400 transition-colors flex items-center gap-1">
                  Autentik Jawa <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

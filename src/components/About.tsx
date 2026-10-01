import React from "react";
import { RESTAURANT_INFO } from "@/data/restaurant";
import { Star, MessageSquareQuote, Wallet, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="cerita" className="py-20 sm:py-28 bg-cream-100 pattern-heritage relative overflow-hidden">
      {/* Decorative Javanese floral motif accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Typography */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-terracotta-500 text-xs font-sans uppercase tracking-[0.25em] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cerita & Filosofi Kami</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-jawa-950 leading-tight tracking-tight">
                Bukan Sekadar Makan. <br />
                <span className="text-terracotta-600 italic font-normal">
                  Ini Tentang Rasa dan Kebersamaan.
                </span>
              </h2>
            </div>

            <div className="space-y-4 text-jawa-800/85 font-sans leading-relaxed text-base sm:text-lg font-light">
              <p className="border-l-2 border-gold-500/50 pl-4 py-1 text-jawa-900 font-serif italic text-lg sm:text-xl">
                “{RESTAURANT_INFO.storyText}”
              </p>
              <p className="text-sm sm:text-base text-jawa-800/80">
                Dalam falsafah Jawa, filosofi <em className="text-blue-600 font-medium">“Andum Roso, Nambah Bolo”</em> mengajarkan bahwa sebuah hidangan bukan semata untuk memuaskan rasa lapar. Ia adalah jembatan yang menghubungkan hati, menyatukan keluarga, mempererat persahabatan, dan menghadirkan kenangan hangat yang dibawa pulang.
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="pt-4 border-t border-jawa-900/10 grid grid-cols-3 gap-3 sm:gap-6">
              {/* Stat 1: Google Rating */}
              <div className="bg-cream-50 p-4 sm:p-5 rounded-sm border border-gold-500/25 shadow-heritage">
                <div className="flex items-center gap-1 text-gold-600 mb-1">
                  <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-jawa-950">
                    4.7★
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-jawa-700/80 uppercase tracking-wider font-sans">
                  Rating Google
                </p>
              </div>

              {/* Stat 2: Customer Reviews */}
              <div className="bg-cream-50 p-4 sm:p-5 rounded-sm border border-gold-500/25 shadow-heritage">
                <div className="flex items-center gap-1 text-terracotta-600 mb-1">
                  <MessageSquareQuote className="w-4 h-4 text-terracotta-500" />
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-jawa-950">
                    400+
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-jawa-700/80 uppercase tracking-wider font-sans">
                  Ulasan Pelanggan
                </p>
              </div>

              {/* Stat 3: Price Range */}
              <div className="bg-cream-50 p-4 sm:p-5 rounded-sm border border-gold-500/25 shadow-heritage">
                <div className="flex items-center gap-1 text-forest-700 mb-1">
                  <Wallet className="w-4 h-4 text-forest-600" />
                  <span className="font-serif text-xl sm:text-2xl font-bold text-jawa-950">
                    Rp25K–50K
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-jawa-700/80 uppercase tracking-wider font-sans">
                  Harga per Orang
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Photography & Heritage Framing */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Primary Large Image: Joglo Atmosphere & Dining Table */}
              <div className="relative z-10 rounded-sm overflow-hidden shadow-heritage-lg border border-gold-500/30 aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                  alt="Suasana Ruang Joglo Kayu Tradisional Bale Rasa Tuban"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jawa-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-cream-50 font-serif text-sm italic">
                  “Kehangatan kayu jati tua dan keramahan tanah Jawa.”
                </div>
              </div>

              {/* Secondary Floating Card: Traditional Dish Accent */}
              <div className="hidden sm:block absolute -bottom-8 -left-6 z-20 w-52 sm:w-60 bg-jawa-950 text-cream-50 p-3 rounded-sm shadow-heritage-lg border border-gold-400/40">
                <div className="aspect-[4/3] rounded-sm overflow-hidden mb-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=600&q=80"
                    alt="Becek Buwohan Khas Tuban"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-1">
                  <span className="text-[10px] uppercase tracking-widest text-gold-400 font-sans block">
                    Resep Warisan
                  </span>
                  <p className="font-serif text-sm font-semibold text-cream-100">
                    Becek Buwohan Tuban
                  </p>
                </div>
              </div>

              {/* Decorative Heritage Frame Background element */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-gold-500/20 rounded-sm -z-0 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

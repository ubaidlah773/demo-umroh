import React from "react";
import { Sparkles, Home, Trees, Soup, Users } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      id: "exp-joglo",
      icon: Home,
      title: "Joglo Jawa",
      description:
        "Bangunan dan interior bernuansa Jawa yang memberikan pengalaman makan berbeda dengan kayu jati dan pencahayaan hangat.",
      imageUrl:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "exp-asri",
      icon: Trees,
      title: "Suasana Asri",
      description:
        "Lingkungan hijau dan tenang untuk bersantai dari hiruk-pikuk kesibukan, ditemani hembusan semilir angin sejuk.",
      imageUrl:
        "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "exp-rumahan",
      icon: Soup,
      title: "Kuliner Rumahan",
      description:
        "Masakan dengan karakter rasa tradisional dan familiar, diolah dengan ketulusan bumbu rempah asli Jawa.",
      imageUrl:
        "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "exp-kumpul",
      icon: Users,
      title: "Tempat Berkumpul",
      description:
        "Ruang luas dan nyaman yang sangat cocok untuk keluarga, sahabat, reuni, maupun perayaan acara bersama.",
      imageUrl:
        "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="suasana" className="py-20 sm:py-28 bg-jawa-950 text-cream-50 relative overflow-hidden">
      {/* Decorative Warm Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-jawa-900 border border-gold-500/30 text-gold-300 text-xs uppercase tracking-[0.25em] font-sans">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
            <span>Pengalaman Menyeluruh</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream-50 tracking-tight">
            Nikmati Rasa Jawa dalam Suasana yang Berbeda
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto my-3" />
          <p className="font-sans text-cream-200/80 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
            Menyajikan bukan sekadar kelezatan santapan di atas meja, melainkan ketenangan batin dalam balutan arsitektur tradisi.
          </p>
        </div>

        {/* Feature Cards: Horizontal Scrolling on Mobile, Grid on Desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto sm:overflow-visible pb-6 sm:pb-0 scrollbar-none snap-x snap-mandatory">
          {experiences.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="min-w-[280px] sm:min-w-0 snap-center bg-jawa-900/90 rounded-sm border border-gold-500/25 hover:border-gold-400/60 overflow-hidden shadow-heritage transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Photo with zoom effect */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-jawa-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-jawa-950 via-jawa-950/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 p-2 rounded-sm bg-jawa-950/80 backdrop-blur-md border border-gold-500/30 text-gold-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <span className="text-[10px] uppercase tracking-widest text-gold-400 font-sans block">
                      0{index + 1} • Keunggulan
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-cream-50 group-hover:text-gold-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-cream-200/80 text-sm font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-jawa-800/80 text-[11px] text-cream-300/60 font-sans">
                  Nuansa Tradisional Autentik
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

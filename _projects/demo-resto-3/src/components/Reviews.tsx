import React from "react";
import { CUSTOMER_REVIEWS, REVIEW_STATS } from "@/data/reviews";
import { Star, Quote, ArrowUpRight, MessageSquareQuote } from "lucide-react";

export default function Reviews() {
  return (
    <section id="ulasan" className="py-20 sm:py-28 bg-jawa-950 text-cream-50 relative overflow-hidden">
      {/* Warm Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-terracotta-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-jawa-900 border border-gold-500/30 text-gold-300 text-xs uppercase tracking-[0.25em] font-sans">
            <MessageSquareQuote className="w-3.5 h-3.5 text-terracotta-400" />
            <span>Kepuasan Pengunjung</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream-50 tracking-tight">
            Cerita dari Mereka yang Pernah Mampir
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto my-3" />
        </div>

        {/* Rating Overview Badge Card */}
        <div className="max-w-md mx-auto mb-12 sm:mb-16 bg-jawa-900/90 border border-gold-500/30 rounded-sm p-6 sm:p-8 text-center shadow-heritage">
          <div className="flex items-center justify-center gap-1.5 mb-2 text-gold-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-gold-400 text-gold-400" />
            ))}
          </div>
          <div className="font-serif text-4xl sm:text-5xl font-bold text-cream-50 mb-1">
            {REVIEW_STATS.averageRating} <span className="text-xl sm:text-2xl text-cream-300/70 font-normal">/ {REVIEW_STATS.maxRating}</span>
          </div>
          <p className="text-xs uppercase tracking-widest text-gold-300 font-sans font-medium">
            Berdasarkan {REVIEW_STATS.totalReviews} Ulasan Pelanggan di Google Maps
          </p>
        </div>

        {/* Review Cards (Exact real customer reviews from prompt) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-jawa-900/80 rounded-sm border border-gold-500/20 hover:border-gold-400/50 p-6 sm:p-8 flex flex-col justify-between shadow-heritage transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Top: Quote Icon and Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gold-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-gold-500/25 group-hover:text-gold-500/50 transition-colors" />
                </div>

                {/* Review Text */}
                <p className="font-sans text-cream-100 text-sm sm:text-base font-light leading-relaxed italic">
                  “{rev.reviewText}”
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-6 mt-6 border-t border-jawa-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-terracotta-500/20 border border-terracotta-500/40 text-terracotta-300 flex items-center justify-center font-serif font-bold text-xs">
                    {rev.avatarInitial}
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-cream-50">
                      {rev.author}
                    </h4>
                    <span className="text-[11px] text-cream-300/60 font-sans block">
                      {rev.source}
                    </span>
                  </div>
                </div>

                {rev.highlightDish && (
                  <span className="text-[10px] uppercase tracking-wider text-gold-300/80 font-sans px-2 py-0.5 rounded-sm bg-jawa-950 border border-gold-500/20">
                    {rev.highlightDish}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA: Lihat Semua Ulasan di Google */}
        <div className="text-center">
          <a
            href={REVIEW_STATS.googleMapsReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-sm bg-gradient-to-r from-cream-100 to-cream-200 text-jawa-950 font-sans text-xs uppercase tracking-widest font-semibold hover:from-white hover:to-cream-100 transition-all duration-300 shadow-md hover:shadow-heritage border border-gold-300/40 group active:scale-[0.98]"
          >
            <span>Lihat Semua Ulasan di Google</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

      </div>
    </section>
  );
}

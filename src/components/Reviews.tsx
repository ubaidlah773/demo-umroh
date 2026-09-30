"use client";

import React from "react";
import { Star, ExternalLink } from "lucide-react";
import { RESTAURANT_REVIEWS_META } from "@/data/reviews";

export default function Reviews() {
  const EDITORIAL_REVIEWS = [
    {
      quote: "Menu makanannya variasi, ada ikan, udang, sayur, kepiting, sup, nasi dll.",
      source: "Google Review",
      author: "Pengunjung Terverifikasi",
    },
    {
      quote: "Cocok untuk makan bersama keluarga atau rekan kerja. Parkiran luas, ruangan dingin ber AC dan masakan lezat.",
      source: "Google Review",
      author: "Rombongan Keluarga",
    },
    {
      quote: "Satu area dengan Hotel Fave Tuban dan lokasinya strategis, parkir luas.",
      source: "Google Review",
      author: "Tamu Perjalanan",
    },
  ];

  return (
    <section className="py-24 sm:py-36 bg-cream-50 border-t border-b border-olive-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-18 items-start">
          {/* LEFT: 1,943+ PEOPLE HAVE SOMETHING TO SAY (col-span-5) */}
          <div className="lg:col-span-5 sticky top-28">
            <span className="font-mono text-xs tracking-[0.24em] uppercase text-terracotta-500 font-semibold block mb-3">
              GUEST EXPERIENCES
            </span>

            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-olive-900 leading-[0.94] tracking-tight mb-6">
              1,943+ <br />
              PEOPLE HAVE <br />
              <span className="italic font-serif text-terracotta-500">SOMETHING</span> <br />
              TO SAY.
            </h2>

            {/* Rating Indicator */}
            <div className="flex items-center gap-3 pt-2 pb-6 border-t border-b border-olive-900/10 mb-6">
              <div className="flex items-center gap-1 text-mustard-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-mustard-500" />
                ))}
              </div>
              <span className="font-mono text-sm font-semibold text-olive-900">
                4.4 Google Rating
              </span>
            </div>

            <div>
              <a
                href={RESTAURANT_REVIEWS_META.googleMapsReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-olive-900 hover:text-terracotta-500 font-semibold transition-colors group"
              >
                <span>VIEW ALL REVIEWS ON GOOGLE</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* RIGHT: Editorial Blockquotes with Large Typography (col-span-7) */}
          <div className="lg:col-span-7 space-y-12 sm:space-y-16">
            {EDITORIAL_REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="pb-10 border-b border-olive-900/10 last:border-b-0"
              >
                <span className="font-mono text-xs text-olive-900/40 block mb-3">
                  0{idx + 1}
                </span>

                <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-olive-900 leading-snug tracking-tight mb-4">
                  &ldquo;{rev.quote}&rdquo;
                </blockquote>

                <div className="flex items-center justify-between font-mono text-xs text-olive-900/60 uppercase tracking-widest pt-2">
                  <span>{rev.author}</span>
                  <span className="text-terracotta-500 font-medium">— {rev.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

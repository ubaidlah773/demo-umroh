"use client";

import React from "react";
import { Star, CheckCircle2, Quote } from "lucide-react";

export default function ReviewsSection() {
  const reviews = [
    {
      author: "Hendra Wijaya & Keluarga",
      source: "Google Local Guide",
      date: "September 2026",
      rating: 5,
      comment:
        "Gurami asam manis dan gurame madu legitnya luar biasa enak. Bumbunya meresap sampai ke serat daging ikan. Tempatnya sangat bersih, AC dingin, dan ruangannya luas sekali. Parkir bus dan mobil sangat lapang tepat di tepi jalan protokol Basuki Rachmad.",
    },
    {
      author: "Ibu Ratna Dewi",
      source: "Verified Guest",
      date: "Agustus 2026",
      rating: 5,
      comment:
        "Sangat cocok untuk makan bersama keluarga besar. Pelayanannya cepat dan ramah, anak-anak suka sekali sop buntut dan mie goreng seafoodnya. Reservasi mejanya praktis tanpa ribet.",
    },
    {
      author: "Bambang Triyono",
      source: "Corporate Guest",
      date: "Juli 2026",
      rating: 5,
      comment:
        "Tempat langganan kami kalau ada tamu dinas dari luar kota di Tuban. Menu rajungan kare dan olahan seafoodnya selalu segar dengan cita rasa autentik. Sangat representatif untuk jamuan makan malam.",
    },
  ];

  return (
    <section id="reviews" className="py-24 sm:py-36 bg-ivory-50 text-espresso-900 border-t border-espresso-900/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with 4.8 / 5 Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-600 block mb-3 font-medium">
              GUEST EXPERIENCES
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-espresso-900">
              HEARD AT THE TABLE.
            </h2>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-ivory-100 border border-espresso-900/10">
            <div className="flex items-center gap-1 text-champagne-600">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-champagne-500 text-champagne-500" />
              ))}
            </div>
            <div className="h-6 w-px bg-espresso-900/15" />
            <div>
              <span className="font-serif text-xl font-bold text-espresso-900 block leading-none">
                4.8 / 5.0
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-warmgray-500">
                1,940+ GOOGLE REVIEWS
              </span>
            </div>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-ivory-100 border border-espresso-900/10 shadow-luxury flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-champagne-500/40 mb-4" />
                <p className="font-serif text-lg text-espresso-900 font-light leading-relaxed mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-espresso-900/10 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-normal text-espresso-900">
                    {rev.author}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-olive-700" />
                    <span className="font-mono text-[10px] text-warmgray-500 uppercase tracking-wider">
                      {rev.source}
                    </span>
                  </div>
                </div>

                <div className="flex text-champagne-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-champagne-500" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

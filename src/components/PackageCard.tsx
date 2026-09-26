"use client";

import React from "react";
import Image from "next/image";
import { PackageItem } from "@/types";
import { getWhatsAppUrl } from "@/config/siteConfig";
import {
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";

interface PackageCardProps {
  item: PackageItem;
  onSelect: (item: PackageItem) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ item, onSelect }) => {
  const isRecommended = item.isRecommended;

  return (
    <div
      className={`group relative rounded-3xl bg-white transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        isRecommended
          ? "border-2 border-gold-400 shadow-xl shadow-emerald-950/10 scale-[1.02] lg:-translate-y-2 z-10"
          : "border border-slate-200/90 shadow-card hover:shadow-card-hover hover:border-emerald-300"
      }`}
    >
      {/* Recommended Ribbon */}
      {isRecommended && (
        <div className="bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 py-1.5 px-4 text-center text-xs font-extrabold uppercase tracking-wider text-emerald-950 flex items-center justify-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-950" />
          <span>REKOMENDASI</span>
        </div>
      )}

      <div>
        {/* Package Image Banner */}
        <div className="relative h-52 w-full overflow-hidden bg-slate-900">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Badges on Image */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            {!isRecommended && item.badge ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-900/90 text-gold-300 border border-gold-400/40 backdrop-blur-sm">
                {item.badge}
              </span>
            ) : (
              <span />
            )}

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-sm">
              <Clock className="w-3 h-3 text-gold-400" />
              <span>{item.duration}</span>
            </span>
          </div>

          {/* Estimated Departure on Image Bottom */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              <span>Keberangkatan: {item.departure}</span>
            </div>
          </div>
        </div>

        {/* Card Body Content */}
        <div className="p-6 sm:p-7 space-y-5">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
              {item.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2 leading-relaxed">
              {item.subtitle}
            </p>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-ivory-100 border border-gold-200/60">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
              Mulai dari
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-900">
                {item.price}
              </span>
              <span className="text-xs text-slate-500">/ pax</span>
            </div>
            <span className="text-[11px] text-slate-500 block mt-1">
              *Contoh harga — disesuaikan program travel
            </span>
          </div>

          {/* Highlights List */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Fasilitas Termasuk:
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {item.highlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-6 pt-0 sm:p-7 sm:pt-0 space-y-2.5">
        <button
          type="button"
          onClick={() => onSelect(item)}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            isRecommended
              ? "bg-emerald-900 text-white hover:bg-emerald-800 shadow-md hover:shadow-emerald-glow"
              : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200"
          }`}
        >
          <span>Lihat Detail</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href={getWhatsAppUrl(undefined, item.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-600 hover:text-emerald-900 flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tanya Paket via WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

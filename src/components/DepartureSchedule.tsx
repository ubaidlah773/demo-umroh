"use client";

import React, { useState } from "react";
import { departureSchedules, getWhatsAppUrl } from "@/config/siteConfig";
import {
  Calendar,
  Clock,
  Plane,
  Users,
  MessageCircle,
  Filter,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export const DepartureSchedule: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filterOptions = [
    { id: "all", label: "Semua Jadwal" },
    { id: "Reguler", label: "Umroh Reguler" },
    { id: "Premium", label: "Umroh Premium" },
    { id: "Ramadhan", label: "Umroh Ramadhan" },
  ];

  const filteredList = departureSchedules.filter((item) => {
    if (selectedFilter === "all") return true;
    return item.packageType.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  return (
    <section id="jadwal" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-100 text-emerald-950 border border-gold-300">
            <Calendar className="w-3.5 h-3.5 text-gold-600" />
            <span>Estimasi Waktu Ibadah</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Jadwal Keberangkatan
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Informasi rencana keberangkatan untuk memudahkan penjadwalan ibadah
            keluarga. Tanggal dan ketersediaan kursi diperbarui secara berkala.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedFilter(opt.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedFilter === opt.id
                  ? "bg-emerald-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Desktop Table View (Hidden on Small screens) */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 shadow-card bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-950 text-white text-xs uppercase tracking-wider">
                <th className="py-4 px-6 font-semibold">Tanggal Berangkat</th>
                <th className="py-4 px-6 font-semibold">Paket Umroh</th>
                <th className="py-4 px-6 font-semibold">Durasi</th>
                <th className="py-4 px-6 font-semibold">Penerbangan</th>
                <th className="py-4 px-6 font-semibold">Ketersediaan</th>
                <th className="py-4 px-6 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredList.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-ivory-50/80 transition-colors group"
                >
                  <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-700" />
                    <span>{row.date}</span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-950">
                    {row.packageType}
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {row.duration}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <Plane className="w-3.5 h-3.5 text-slate-400" />
                      {row.airline}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          row.statusVariant === "available"
                            ? "bg-emerald-100 text-emerald-800"
                            : row.statusVariant === "limited"
                            ? "bg-amber-100 text-amber-900 font-bold"
                            : "bg-rose-100 text-rose-800 font-bold"
                        }`}
                      >
                        {row.status}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        ({row.seatsLeft})
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <a
                      href={getWhatsAppUrl(
                        `Halo Admin Safara Umroh, saya ingin menanyakan detail jadwal keberangkatan ${row.packageType} tanggal ${row.date}. Apakah masih tersedia?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-900 text-emerald-900 hover:text-white font-semibold text-xs border border-emerald-200 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Tanya Jadwal</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List View (Visible on small screens) */}
        <div className="md:hidden space-y-4">
          {filteredList.map((card) => (
            <div
              key={card.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {card.date}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    {card.packageType}
                  </h3>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    card.statusVariant === "available"
                      ? "bg-emerald-100 text-emerald-800"
                      : card.statusVariant === "limited"
                      ? "bg-amber-100 text-amber-900"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {card.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Durasi: {card.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-slate-400" />
                  <span>{card.airline}</span>
                </div>
                <div className="col-span-2 flex items-center gap-1.5 text-slate-700 font-medium">
                  <Users className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Ketersediaan: {card.seatsLeft}</span>
                </div>
              </div>

              <a
                href={getWhatsAppUrl(
                  `Halo Admin Safara Umroh, saya ingin menanyakan ketersediaan jadwal ${card.packageType} pada ${card.date}. Terima kasih.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-800 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-gold-300" />
                <span>Tanya Jadwal Ini</span>
              </a>
            </div>
          ))}
        </div>

        {/* Big CTA for Schedule Section */}
        <div className="mt-12 text-center">
          <a
            href={getWhatsAppUrl(
              "Halo Admin Safara Umroh, saya ingin mendapatkan informasi jadwal keberangkatan terbaru untuk tahun ini."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-800 to-emerald-950 hover:from-emerald-900 hover:to-black text-white font-bold px-8 py-4 rounded-full text-sm sm:text-base shadow-lg shadow-emerald-950/20 hover:shadow-emerald-glow transition-all transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5 text-gold-400" />
            <span>Dapatkan Jadwal Terbaru</span>
          </a>
          <p className="text-xs text-slate-500 mt-2">
            *Konsultasikan tanggal keberangkatan yang sesuai dengan agenda keluarga Anda via WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
};

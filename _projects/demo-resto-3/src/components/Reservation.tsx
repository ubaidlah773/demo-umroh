"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RESTAURANT_INFO } from "@/data/restaurant";
import { useModal } from "@/context/ModalContext";
import {
  MessageCircle,
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function Reservation() {
  const { openReservation } = useModal();

  // Quick reservation form state
  const [guestCount, setGuestCount] = useState("4");
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [seatingArea, setSeatingArea] = useState("Joglo Utama");

  const buildWhatsAppUrl = () => {
    const text = `Halo Bale Rasa, saya ingin melakukan reservasi meja untuk ${guestCount} orang pada jam ${selectedTime} (${seatingArea}). Apakah masih tersedia?`;
    return `https://wa.me/6285236473110?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="reservasi" className="py-20 sm:py-28 bg-cream-100 pattern-heritage relative overflow-hidden">
      {/* Decorative Javanese Arch Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-terracotta-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grand Reservation Card */}
        <div className="bg-jawa-950 text-cream-50 rounded-sm border border-gold-500/30 p-8 sm:p-14 lg:p-16 shadow-heritage-lg relative overflow-hidden">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Heading & Storytelling */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-jawa-900 border border-gold-500/30 text-gold-300 text-xs uppercase tracking-[0.25em] font-sans">
                <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
                <span>Reservasi & Meja Santap</span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-cream-50 leading-tight">
                Mau Makan Hari Ini?
              </h2>

              <p className="font-serif italic text-xl sm:text-2xl text-gold-200 font-normal leading-relaxed">
                “Datang, duduk, dan nikmati rasa Jawa bersama orang-orang tersayang.”
              </p>

              <div className="w-16 h-0.5 bg-terracotta-500 my-4" />

              <p className="font-sans text-cream-200/85 text-sm sm:text-base font-light leading-relaxed max-w-lg">
                Kami siap menyambut Anda dengan kehangatan arsitektur Joglo dan sajian rempah tradisional yang dimasak dengan ketulusan. Untuk kenyamanan keluarga besar atau acara spesial, kami sarankan melakukan reservasi lebih awal.
              </p>

              {/* Direct Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                {/* Primary CTA: Reservasi via WhatsApp with prompt template */}
                <a
                  href={RESTAURANT_INFO.links.whatsappReservation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-sm bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-cream-50 font-sans text-xs uppercase tracking-widest font-semibold hover:from-terracotta-600 hover:to-terracotta-700 transition-all duration-300 shadow-md hover:shadow-heritage active:scale-[0.98] border border-gold-400/30 group"
                >
                  <MessageCircle className="w-4 h-4 text-cream-50 group-hover:scale-110 transition-transform" />
                  <span>Reservasi via WhatsApp</span>
                </a>

                {/* Secondary CTA: Lihat Lokasi */}
                <Link
                  href="#lokasi"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-sm border border-gold-500/40 text-cream-100 hover:text-gold-300 hover:border-gold-400 font-sans text-xs uppercase tracking-widest font-medium transition-all duration-300"
                >
                  <MapPin className="w-4 h-4 text-gold-400" />
                  <span>Lihat Lokasi</span>
                </Link>
              </div>

              {/* Benefits checklist */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-cream-200/75 font-sans">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" /> Tanpa Biaya Reservasi
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" /> Area Parkir Luas & Aman
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" /> Cocok untuk Acara & Keluarga
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Quick Booking Box */}
            <div className="lg:col-span-5 bg-jawa-900/90 rounded-sm border border-gold-500/30 p-6 sm:p-8 space-y-5 shadow-heritage">
              <div className="border-b border-jawa-800 pb-3">
                <h3 className="font-serif text-xl font-bold text-cream-50">
                  Rencanakan Kunjungan
                </h3>
                <p className="text-xs text-cream-300/70 font-sans mt-0.5">
                  Pilih preferensi meja Anda untuk format pesan WhatsApp instan.
                </p>
              </div>

              {/* Jumlah Tamu */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-gold-300/90 font-sans font-medium flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-terracotta-400" />
                  Jumlah Orang
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {["2 Orang", "4 Orang", "6 Orang", "8+ Orang"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setGuestCount(option.replace(" Orang", ""))}
                      className={`py-2 px-1 text-xs rounded-sm font-sans transition-all text-center ${
                        guestCount === option.replace(" Orang", "")
                          ? "bg-terracotta-500 text-cream-50 font-semibold shadow-sm"
                          : "bg-jawa-950 text-cream-200 hover:bg-jawa-800 border border-jawa-800"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pilihan Waktu */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-gold-300/90 font-sans font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-terracotta-400" />
                  Jam Kunjungan (10.00 – 21.00 WIB)
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-jawa-950 border border-gold-500/20 rounded-sm py-2 px-3 text-xs text-cream-100 focus:outline-none focus:border-gold-500 font-sans"
                >
                  <option value="11:30">11.30 WIB (Makan Siang Awal)</option>
                  <option value="12:00">12.00 WIB (Makan Siang Utama)</option>
                  <option value="13:00">13.00 WIB (Santap Siang)</option>
                  <option value="16:00">16.00 WIB (Sore Nyaman)</option>
                  <option value="18:30">18.30 WIB (Makan Malam Senja)</option>
                  <option value="19:30">19.30 WIB (Makan Malam Bersama)</option>
                  <option value="20:00">20.00 WIB (Santap Malam)</option>
                </select>
              </div>

              {/* Area Tempat Duduk */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-gold-300/90 font-sans font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
                  Pilihan Area Suasana
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Joglo Utama", "Lesehan", "Area Taman"].map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => setSeatingArea(area)}
                      className={`py-2 px-2 text-xs rounded-sm font-sans transition-all text-center ${
                        seatingArea === area
                          ? "bg-gold-500 text-jawa-950 font-semibold shadow-sm"
                          : "bg-jawa-950 text-cream-200 hover:bg-jawa-800 border border-jawa-800"
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-sm bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kirim Reservasi Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

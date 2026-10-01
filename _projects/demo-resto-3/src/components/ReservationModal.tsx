"use client";

import React, { useState } from "react";
import { useModal } from "@/context/ModalContext";
import { RESTAURANT_INFO } from "@/data/restaurant";
import {
  X,
  Calendar,
  Clock,
  Users,
  MessageCircle,
  Sparkles,
  MapPin,
  CheckCircle,
} from "lucide-react";

export default function ReservationModal() {
  const { isReservationOpen, closeReservation } = useModal();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [time, setTime] = useState("12:00");
  const [guests, setGuests] = useState("4 Orang");
  const [area, setArea] = useState("Joglo Utama");
  const [notes, setNotes] = useState("");

  if (!isReservationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      `Halo Bale Rasa, saya ingin melakukan reservasi meja:`,
      `• Nama: ${customerName || "Tamu Bale Rasa"}`,
      phone ? `• Kontak: ${phone}` : null,
      `• Tanggal: ${date}`,
      `• Jam: ${time} WIB`,
      `• Jumlah: ${guests}`,
      `• Pilihan Area: ${area}`,
      notes ? `• Catatan: ${notes}` : null,
      `Apakah meja masih tersedia? Terima kasih.`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/6285236473110?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    closeReservation();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-jawa-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-jawa-900 border border-gold-500/30 rounded-sm shadow-2xl p-6 sm:p-8 text-cream-50 my-8">
        {/* Close Button */}
        <button
          onClick={closeReservation}
          className="absolute top-4 right-4 p-2 rounded-full text-cream-300 hover:text-white hover:bg-jawa-800 transition-colors"
          aria-label="Tutup form reservasi"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 space-y-1.5 border-b border-jawa-800 pb-4 pr-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-400 font-sans">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
            <span>Bale Rasa Merakurak Tuban</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50">
            Form Reservasi Meja
          </h2>
          <p className="text-xs text-cream-200/80 font-sans font-light">
            Silakan lengkapi detail santap Anda. Pesan akan langsung diteruskan ke WhatsApp resmi Bale Rasa.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
          {/* Nama */}
          <div className="space-y-1">
            <label className="text-cream-200 uppercase tracking-wider text-[11px] font-medium block">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Bpk. Haryono"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-jawa-950 border border-gold-500/25 rounded-sm py-2.5 px-3 text-cream-50 placeholder-cream-300/40 focus:outline-none focus:border-gold-400"
            />
          </div>

          {/* Nomor WhatsApp */}
          <div className="space-y-1">
            <label className="text-cream-200 uppercase tracking-wider text-[11px] font-medium block">
              Nomor WhatsApp / HP
            </label>
            <input
              type="tel"
              placeholder="Contoh: 081234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-jawa-950 border border-gold-500/25 rounded-sm py-2.5 px-3 text-cream-50 placeholder-cream-300/40 focus:outline-none focus:border-gold-400"
            />
          </div>

          {/* Tanggal & Waktu (2 kolom) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-cream-200 uppercase tracking-wider text-[11px] font-medium block">
                Tanggal Kunjungan
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-jawa-950 border border-gold-500/25 rounded-sm py-2.5 px-3 text-cream-50 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-cream-200 uppercase tracking-wider text-[11px] font-medium block">
                Jam Kedatangan (10.00 – 21.00)
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-jawa-950 border border-gold-500/25 rounded-sm py-2.5 px-3 text-cream-50 focus:outline-none focus:border-gold-400"
              >
                <option value="11:00">11.00 WIB</option>
                <option value="11:30">11.30 WIB</option>
                <option value="12:00">12.00 WIB</option>
                <option value="12:30">12.30 WIB</option>
                <option value="13:00">13.00 WIB</option>
                <option value="16:00">16.00 WIB</option>
                <option value="17:00">17.00 WIB</option>
                <option value="18:30">18.30 WIB</option>
                <option value="19:00">19.00 WIB</option>
                <option value="20:00">20.00 WIB</option>
              </select>
            </div>
          </div>

          {/* Jumlah Tamu & Pilihan Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-cream-200 uppercase tracking-wider text-[11px] font-medium block">
                Jumlah Tamu
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-jawa-950 border border-gold-500/25 rounded-sm py-2.5 px-3 text-cream-50 focus:outline-none focus:border-gold-400"
              >
                <option value="2 Orang">2 Orang (Pasangan / Teman)</option>
                <option value="4 Orang">4 Orang (Keluarga Kecil)</option>
                <option value="6 Orang">6 Orang (Keluarga)</option>
                <option value="8 Orang">8 Orang (Rombongan)</option>
                <option value="10+ Orang">10+ Orang (Acara / Reuni)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-cream-200 uppercase tracking-wider text-[11px] font-medium block">
                Area Duduk
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-jawa-950 border border-gold-500/25 rounded-sm py-2.5 px-3 text-cream-50 focus:outline-none focus:border-gold-400"
              >
                <option value="Joglo Utama">Joglo Utama (Meja Kayu Tradisional)</option>
                <option value="Lesehan Asri">Lesehan Santai</option>
                <option value="Area Taman Semi-Outdoor">Area Taman Semi-Outdoor</option>
              </select>
            </div>
          </div>

          {/* Catatan Khusus */}
          <div className="space-y-1">
            <label className="text-cream-200 uppercase tracking-wider text-[11px] font-medium block">
              Catatan / Permintaan Khusus (Opsional)
            </label>
            <input
              type="text"
              placeholder="Misal: Siapkan Becek Buwohan 4 porsi, bawa balita, dll."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-jawa-950 border border-gold-500/25 rounded-sm py-2.5 px-3 text-cream-50 placeholder-cream-300/40 focus:outline-none focus:border-gold-400"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-sm bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-cream-50 font-sans text-xs uppercase tracking-widest font-semibold hover:from-terracotta-600 hover:to-terracotta-700 transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Kirim ke WhatsApp Bale Rasa</span>
            </button>
          </div>
        </form>

        {/* Direct Template Fallback */}
        <div className="mt-4 pt-4 border-t border-jawa-800 text-center">
          <a
            href={RESTAURANT_INFO.links.whatsappReservation}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeReservation}
            className="text-[11px] text-gold-300/80 hover:text-gold-300 underline font-sans"
          >
            Atau klik di sini untuk kirim template pesan langsung
          </a>
        </div>
      </div>
    </div>
  );
}

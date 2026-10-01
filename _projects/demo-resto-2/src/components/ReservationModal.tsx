"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Users, MapPin, MessageSquare, PhoneCall, Sparkles } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { createReservationWhatsAppUrl, CAFE_INFO } from "@/data/cafeInfo";

const SEATING_OPTIONS = [
  { id: "Indoor Dining (AC)", label: "Indoor Dining (Full AC)" },
  { id: "Outdoor Garden (Open Air)", label: "Outdoor Garden (Tropis)" },
  { id: "Live Music View (Dekat Stage)", label: "Live Music View (Stage)" },
  { id: "Private Room (VIP / Meeting)", label: "Private VIP Room" },
];

export default function ReservationModal() {
  const { isReservationOpen, closeReservation, defaultArea } = useModal();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [pax, setPax] = useState("4");
  const [seatingArea, setSeatingArea] = useState(defaultArea);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (defaultArea) {
      setSeatingArea(defaultArea);
    }
  }, [defaultArea]);

  // Set default date to tomorrow or today formatted
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Mohon masukkan nama Anda untuk reservasi.");
      return;
    }

    const waUrl = createReservationWhatsAppUrl({
      name,
      phone,
      date,
      time,
      pax,
      seatingArea,
      notes,
    });

    window.open(waUrl, "_blank", "noopener,noreferrer");
    closeReservation();
  };

  return (
    <AnimatePresence>
      {isReservationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeReservation}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl bg-charcoal-900 border border-gold-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-ivory-100 z-10 my-8 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reservation-title"
          >
            {/* Subtle background glow */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={closeReservation}
              className="absolute top-5 right-5 p-2 rounded-full bg-charcoal-800 text-ivory-400 hover:text-ivory-100 hover:bg-charcoal-700 transition-colors"
              aria-label="Tutup form reservasi"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                D’Sultan Table Booking
              </div>
              <h2
                id="reservation-title"
                className="font-serif text-2xl sm:text-3xl font-semibold text-ivory-100 tracking-tight"
              >
                Reserve Your Table
              </h2>
              <p className="text-sm text-ivory-400 mt-1">
                Isi detail kunjungan Anda. Sistem kami akan meneruskan data langsung ke WhatsApp resmi D’Sultan Cafe Tuban.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-ivory-300 mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm text-ivory-100 placeholder-ivory-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-ivory-300 mb-1.5">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="0812-xxxx-xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm text-ivory-100 placeholder-ivory-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-ivory-300 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold-400" />
                    Tanggal
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm text-ivory-100 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-ivory-300 mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    Waktu (Jam)
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm text-ivory-100 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-ivory-300 mb-1.5">
                    <Users className="w-3.5 h-3.5 text-gold-400" />
                    Jumlah Orang
                  </label>
                  <select
                    value={pax}
                    onChange={(e) => setPax(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm text-ivory-100 transition-colors"
                  >
                    <option value="1-2">1 - 2 Pax</option>
                    <option value="3-4">3 - 4 Pax</option>
                    <option value="5-8">5 - 8 Pax</option>
                    <option value="9-15">9 - 15 Pax (Grup)</option>
                    <option value="16+">16+ Pax (Rombongan)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-ivory-300 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  Pilihan Area Duduk
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {SEATING_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSeatingArea(opt.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium text-left border transition-all ${
                        seatingArea === opt.id
                          ? "bg-gold-500/15 border-gold-500 text-gold-300 shadow-sm"
                          : "bg-charcoal-800 border-charcoal-700 text-ivory-300 hover:border-charcoal-600"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-ivory-300 mb-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-gold-400" />
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Perayaan ulang tahun, request baby chair, dll."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm text-ivory-100 placeholder-ivory-500 transition-colors"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-sm tracking-wide transition-all shadow-gold-glow cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-charcoal-950" />
                  Kirim Reservasi ke WhatsApp
                </button>

                <a
                  href={CAFE_INFO.contact.phone}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 text-ivory-300 hover:text-ivory-100 text-sm font-medium transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-gold-400" />
                  Telpon Langsung
                </a>
              </div>

              <p className="text-[11px] text-center text-ivory-400/80 pt-1">
                Reservasi gratis tanpa biaya pemesanan awal. Konfirmasi meja akan diproses via WhatsApp {CAFE_INFO.contact.phoneFormatted}.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

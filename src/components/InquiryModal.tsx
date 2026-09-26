"use client";

import React, { useState, useEffect } from "react";
import { siteConfig, packages, getWhatsAppUrl } from "@/config/siteConfig";
import {
  X,
  MessageCircle,
  Send,
  User,
  Sparkles,
} from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackageName?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultPackageName,
}) => {
  const [name, setName] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(
    defaultPackageName || "Paket Umroh Reguler"
  );
  const [month, setMonth] = useState("Menyesuaikan Jadwal");
  const [participants, setParticipants] = useState("2 Orang");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (defaultPackageName) {
      setSelectedPackage(defaultPackageName);
    }
  }, [defaultPackageName]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = `Halo Admin, perkenalkan saya ${
      name || "Calon Jamaah"
    }. Saya ingin berkonsultasi mengenai rencana perjalanan Umroh dengan rincian:
- Pilihan Paket: ${selectedPackage}
- Rencana Waktu: ${month}
- Jumlah Peserta: ${participants}
${message ? `- Catatan: ${message}` : ""}

Mohon informasi jadwal dan ketersediaannya. Terima kasih.`;

    const waUrl = getWhatsAppUrl(formattedMessage);
    window.open(waUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-emerald-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div
          className="relative w-full max-w-lg transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all border border-emerald-900/10 p-6 sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            aria-label="Tutup form konsultasi"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-950">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Konsultasi Paket</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Konsultasi Perjalanan Umroh
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Sampaikan rencana perjalanan Anda, admin akan segera membantu memberikan penjelasan terbaik melalui WhatsApp.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Nama Calon Jamaah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-slate-900 placeholder-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Pilihan Paket
                </label>
                <select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-slate-900 bg-white"
                >
                  {packages.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value="Paket Custom / Rombongan">
                    Paket Kustom / Lainnya
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Rencana Keberangkatan
                </label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-slate-900 bg-white"
                >
                  <option value="Bulan Ini / Segera">Bulan Ini / Segera</option>
                  <option value="Menyesuaikan Jadwal">Menyesuaikan Jadwal</option>
                  <option value="Paket Umroh Ramadhan">Paket Ramadhan</option>
                  <option value="Musim Liburan">Musim Liburan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Estimasi Jumlah Peserta
              </label>
              <select
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-slate-900 bg-white"
              >
                <option value="1 Orang (Sendiri)">1 Orang (Sendiri)</option>
                <option value="2 Orang (Suami Istri)">2 Orang (Suami Istri)</option>
                <option value="3 - 4 Orang (Keluarga)">3 - 4 Orang (Keluarga)</option>
                <option value="Rombongan / Grup (> 5 Orang)">Rombongan / Grup (&gt; 5 Orang)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Pertanyaan / Catatan (Opsional)
              </label>
              <textarea
                rows={2}
                placeholder="Tulis pertanyaan seputar paket atau fasilitas..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-slate-900 placeholder-slate-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-950 hover:from-emerald-900 hover:to-black text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-glow transition-all"
            >
              <MessageCircle className="w-4 h-4 text-gold-400" />
              <span>Kirim via WhatsApp</span>
            </button>
          </form>

          {/* Direct Link */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="text-xs text-emerald-800 hover:text-emerald-950 font-medium inline-flex items-center gap-1"
            >
              <span>Atau langsung chat WhatsApp tanpa form</span>
              <Send className="w-3 h-3 text-gold-600" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

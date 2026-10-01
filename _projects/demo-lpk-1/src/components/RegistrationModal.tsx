"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, User, Phone, BookOpen, GraduationCap, MessageSquare } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/config/siteConfig";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgram?: string;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  defaultProgram,
}: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    program: defaultProgram || siteConfig.programs[0]?.title || "Bahasa Jepang",
    education: "SMA/SMK Sederajat",
    notes: "",
  });

  const [isSubmittedDemo, setIsSubmittedDemo] = useState(false);

  useEffect(() => {
    if (defaultProgram) {
      setFormData((prev) => ({ ...prev, program: defaultProgram }));
    }
  }, [defaultProgram]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      setIsSubmittedDemo(false);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `*FORMULIR PENDAFTARAN & KONSULTASI LPK NUSASKILL*
    
Nama Lengkap: ${formData.name || "-"}
Nomor WA: ${formData.phone || "-"}
Program Minat: ${formData.program}
Pendidikan Terakhir: ${formData.education}
Catatan/Pertanyaan: ${formData.notes || "-"}

_Mohon informasi persyaratan dan tahapan pendaftaran selanjutnya. Terima kasih._`;

    const waUrl = getWhatsAppUrl(message);
    window.open(waUrl, "_blank");
    setIsSubmittedDemo(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative bg-white rounded-lg max-w-lg w-full p-6 sm:p-7 shadow-xl border border-slate-200 z-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reg-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Tutup formulir pendaftaran"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmittedDemo ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950">
              Data Terhubung ke WhatsApp
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Format konsultasi telah disiapkan. Admin LPK NusaSkill akan segera menindaklanjuti permohonan Anda.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded bg-navy-950 text-white text-xs font-semibold hover:bg-navy-900"
              >
                Selesai
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 mb-1.5 inline-block">
                Pendaftaran & Konsultasi
              </span>
              <h3 id="reg-modal-title" className="text-xl font-bold text-navy-950">
                Formulir Peminatan Pelatihan
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Lengkapi formulir berikut untuk konsultasi jadwal dan biaya langsung ke admin.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Nama */}
              <div>
                <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Nama calon peserta"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 text-xs sm:text-sm focus:border-navy-950 focus:ring-1 focus:ring-navy-950 transition-colors"
                  />
                </div>
              </div>

              {/* Nomor WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                  Nomor WhatsApp / HP
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 text-xs sm:text-sm focus:border-navy-950 focus:ring-1 focus:ring-navy-950 transition-colors"
                  />
                </div>
              </div>

              {/* Pilihan Program */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                    Pilihan Program
                  </label>
                  <div className="relative">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={formData.program}
                      onChange={(e) =>
                        setFormData({ ...formData, program: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 text-xs sm:text-sm focus:border-navy-950 focus:ring-1 focus:ring-navy-950 transition-colors bg-white"
                    >
                      {siteConfig.programs.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                    Pendidikan Terakhir
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={formData.education}
                      onChange={(e) =>
                        setFormData({ ...formData, education: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 text-xs sm:text-sm focus:border-navy-950 focus:ring-1 focus:ring-navy-950 transition-colors bg-white"
                    >
                      <option value="SMA/SMK Sederajat">SMA/SMK Sederajat</option>
                      <option value="Diploma (D3/D4)">Diploma (D3/D4)</option>
                      <option value="Sarjana (S1)">Sarjana (S1)</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Catatan Tambahan */}
              <div>
                <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1">
                  Pertanyaan / Catatan (Opsional)
                </label>
                <div className="relative">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    placeholder="Pertanyaan seputar jadwal, biaya, atau persyaratan..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 text-xs sm:text-sm focus:border-navy-950 focus:ring-1 focus:ring-navy-950 transition-colors resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded font-bold text-xs sm:text-sm text-white bg-crimson-700 hover:bg-crimson-800 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Formulir ke WhatsApp Admin</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-400">
                Data Anda aman dan hanya dipergunakan untuk keperluan informasi pendaftaran.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PackageItem } from "@/types";
import { getWhatsAppUrl, siteConfig } from "@/config/siteConfig";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageCircle,
  ChevronRight,
  Plane,
  Building,
  Bus,
  Utensils,
  Users,
  Luggage,
} from "lucide-react";

interface PackageDetailModalProps {
  packageItem: PackageItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  packageItem,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"itinerary" | "facilities" | "requirements">(
    "itinerary"
  );

  // Close modal on Escape key
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

  if (!isOpen || !packageItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Dark overlay backdrop with blur */}
      <div
        className="fixed inset-0 bg-emerald-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="flex min-h-screen items-center justify-center p-3 sm:p-4 md:p-6 text-center">
        {/* Modal Window */}
        <div
          className="relative w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all border border-emerald-900/10 flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Background Visual & Badges */}
          <div className="relative bg-emerald-950 text-white p-5 sm:p-8 shrink-0 overflow-hidden">
            {/* Background Image Accent */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <Image
                src={packageItem.image}
                alt={packageItem.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/95 to-emerald-900/80 pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:ring-2 focus:ring-gold-400"
              aria-label="Tutup detail paket"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="relative z-10 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {packageItem.badge && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gold-500 text-emerald-950 shadow-sm">
                    {packageItem.badge}
                  </span>
                )}
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs bg-emerald-800 text-emerald-200 border border-emerald-700">
                  {siteConfig.badge}
                </span>
              </div>

              <h2
                id="modal-title"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight"
              >
                {packageItem.name}
              </h2>
              <p className="text-emerald-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
                {packageItem.subtitle}
              </p>

              {/* Quick Info Strip */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-emerald-900/60 border border-emerald-700/50 rounded-xl p-2.5">
                  <span className="text-[11px] text-emerald-300 block font-medium">Estimasi Biaya</span>
                  <span className="text-base sm:text-lg font-bold text-gold-300 block">
                    {packageItem.price}
                  </span>
                </div>

                <div className="bg-emerald-900/60 border border-emerald-700/50 rounded-xl p-2.5">
                  <span className="text-[11px] text-emerald-300 block font-medium">Durasi Ibadah</span>
                  <span className="text-base sm:text-lg font-bold text-white block">
                    {packageItem.duration}
                  </span>
                </div>

                <div className="bg-emerald-900/60 border border-emerald-700/50 rounded-xl p-2.5">
                  <span className="text-[11px] text-emerald-300 block font-medium">Keberangkatan</span>
                  <span className="text-base sm:text-lg font-bold text-white block">
                    {packageItem.departure}
                  </span>
                </div>

                <div className="bg-emerald-900/60 border border-emerald-700/50 rounded-xl p-2.5">
                  <span className="text-[11px] text-emerald-300 block font-medium">Akomodasi</span>
                  <span className="text-xs sm:text-sm font-bold text-white block truncate">
                    Bintang Terstandar
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-slate-200 bg-slate-50 px-5 sm:px-8 shrink-0">
            <div className="flex gap-2 sm:gap-6 overflow-x-auto py-2">
              <button
                type="button"
                onClick={() => setActiveTab("itinerary")}
                className={`py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                  activeTab === "itinerary"
                    ? "bg-emerald-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-emerald-900 hover:bg-slate-200/60"
                }`}
              >
                Rencana Perjalanan (Itinerary)
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("facilities")}
                className={`py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                  activeTab === "facilities"
                    ? "bg-emerald-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-emerald-900 hover:bg-slate-200/60"
                }`}
              >
                Fasilitas & Layanan
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("requirements")}
                className={`py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                  activeTab === "requirements"
                    ? "bg-emerald-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-emerald-900 hover:bg-slate-200/60"
                }`}
              >
                Persyaratan Pendaftaran
              </button>
            </div>
          </div>

          {/* Modal Body Content (Scrollable) */}
          <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
            {/* TAB 1: ITINERARY */}
            {activeTab === "itinerary" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-base">
                    Itinerary Ringkas Perjalanan
                  </h3>
                  <span className="text-xs text-slate-500">
                    *Jadwal dapat disesuaikan dengan kondisi di lapangan
                  </span>
                </div>

                <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-slate-200">
                  {packageItem.itinerary.map((item, idx) => (
                    <div key={idx} className="relative flex items-start gap-4 pl-1">
                      <div className="w-8 h-8 rounded-full bg-emerald-700 text-gold-300 font-bold text-xs flex items-center justify-center shrink-0 border-2 border-white shadow-sm z-10">
                        {idx + 1}
                      </div>
                      <div className="bg-ivory-50 rounded-xl p-3.5 border border-slate-200/80 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                            {item.day}
                          </span>
                          <span className="text-xs font-semibold text-slate-900">
                            {item.title}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: FASILITAS */}
            {activeTab === "facilities" && (
              <div className="space-y-6">
                {/* Fasilitas Hotel & Penerbangan Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-2xl p-4">
                    <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-sm mb-2">
                      <Building className="w-4 h-4 text-emerald-700" />
                      <span>Estimasi Akomodasi Hotel</span>
                    </div>
                    <ul className="text-xs space-y-1.5 text-slate-700">
                      <li>• <strong>Makkah:</strong> {packageItem.hotelMakkah}</li>
                      <li>• <strong>Madinah:</strong> {packageItem.hotelMadinah}</li>
                    </ul>
                  </div>

                  <div className="bg-gold-50/60 border border-gold-200/70 rounded-2xl p-4">
                    <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-sm mb-2">
                      <Plane className="w-4 h-4 text-emerald-700" />
                      <span>Maskapai Penerbangan</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {packageItem.airline} (Penerbangan berjadwal sesuai ketentuan paket).
                    </p>
                  </div>
                </div>

                {/* Termasuk & Belum Termasuk */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Termasuk */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Fasilitas Termasuk (Included):</span>
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                      {packageItem.facilitiesIncluded.map((fac, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{fac}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Belum Termasuk */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-rose-900 text-sm flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-rose-500" />
                      <span>Belum Termasuk (Excluded):</span>
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                      {packageItem.facilitiesExcluded.map((fac, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>{fac}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PERSYARATAN */}
            {activeTab === "requirements" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Ketentuan Persyaratan:</strong>
                    Seluruh persyaratan dapat disesuaikan dengan ketentuan regulasi visa dan biro travel bersangkutan.
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">
                    Dokumen & Persyaratan Calon Jamaah:
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    {packageItem.requirements.map((req, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Disclaimer Bar */}
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-center text-xs text-slate-500">
              *Informasi paket dapat disesuaikan dengan program travel. Jangan ragu berkonsultasi dengan admin mengenai penyesuaian fasilitas.
            </div>
          </div>

          {/* Footer Modal with Action */}
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left w-full sm:w-auto">
              <span className="text-xs text-slate-500 block">Konsultasi Paket Ini</span>
              <span className="text-sm font-bold text-slate-900 block">
                {packageItem.name} • {packageItem.price}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors"
              >
                Tutup
              </button>

              <a
                href={getWhatsAppUrl(undefined, packageItem.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md hover:shadow-emerald-glow transition-all"
              >
                <MessageCircle className="w-4 h-4 text-gold-300" />
                <span>Tanya Paket via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

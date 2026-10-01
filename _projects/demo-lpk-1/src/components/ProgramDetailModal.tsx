"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { ProgramItem } from "@/types";
import {
  X,
  Clock,
  Calendar,
  CreditCard,
  CheckCircle,
  Users,
  BookOpen,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import { getWhatsAppUrl } from "@/config/siteConfig";

interface ProgramDetailModalProps {
  program: ProgramItem | null;
  onClose: () => void;
}

export default function ProgramDetailModal({
  program,
  onClose,
}: ProgramDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (program) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [program, onClose]);

  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div
        className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-slate-200 z-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header Image */}
        <div className="relative h-44 sm:h-48 w-full bg-slate-100 border-b border-slate-200">
          <Image
            src={program.image}
            alt={program.title}
            fill
            sizes="(max-width: 768px) 100vw, 650px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded bg-navy-950/70 text-white hover:bg-black transition-colors z-20"
            aria-label="Tutup jendela rincian program"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Category Tag */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white text-navy-950">
              {program.category}
            </span>
            {program.badge && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-crimson-700 text-white">
                {program.badge}
              </span>
            )}
          </div>

          {/* Title on image banner */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h3 id="modal-title" className="text-xl sm:text-2xl font-bold tracking-tight">
              {program.title}
            </h3>
            <p className="text-xs text-slate-200 mt-0.5">
              {program.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Deskripsi */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Deskripsi Kurikulum
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {program.description}
            </p>
          </div>

          {/* Key facts table */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-0.5">
                Durasi Program
              </span>
              <span className="font-bold text-navy-950">
                {program.duration}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-0.5">
                Jadwal Belajar
              </span>
              <span className="font-bold text-navy-950">
                {program.schedule}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-0.5">
                Biaya Pelatihan
              </span>
              <span className="font-bold text-navy-950">
                {program.fee}
              </span>
            </div>
          </div>

          {/* Cocok untuk Siapa */}
          <div>
            <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
              Target Peserta
            </h4>
            <ul className="space-y-1.5">
              {program.suitableFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Persyaratan */}
          <div>
            <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
              Persyaratan Pendaftaran
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              {program.requirements.map((req, idx) => (
                <li key={idx} className="bg-slate-50 p-2.5 rounded border border-slate-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson-600 shrink-0"></span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Silabus Ringkas */}
          {program.syllabus && program.syllabus.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                Materi Pokok Pembelajaran
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {program.syllabus.map((topic, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer Demo */}
          <div className="p-3 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Catatan Demo:</strong> Jadwal, durasi, dan rincian biaya dapat disesuaikan dengan ketentuan riil angkatan terbaru.
            </span>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Tutup
            </button>
            <a
              href={getWhatsAppUrl(undefined, program.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded font-bold text-xs text-white bg-emerald-700 hover:bg-emerald-800 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Konsultasi Program via WhatsApp</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

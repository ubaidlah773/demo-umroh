import React from "react";
import { siteConfig, getWhatsAppUrl } from "@/config/siteConfig";
import { MessageCircle, ArrowRight, BookOpen } from "lucide-react";

interface CTAProps {
  onOpenRegisterModal: () => void;
}

export default function CTA({ onOpenRegisterModal }: CTAProps) {
  return (
    <section className="bg-navy-950 text-white py-16 lg:py-20 border-t border-navy-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="inline-block px-3 py-1 rounded bg-navy-900 border border-navy-800 text-crimson-400 text-xs font-bold uppercase tracking-wider mb-4">
          PENDAFTARAN & KONSULTASI
        </span>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
          {siteConfig.cta.headline}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl mx-auto">
          {siteConfig.cta.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm text-white bg-emerald-700 hover:bg-emerald-600 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{siteConfig.cta.primaryButton}</span>
          </a>

          <button
            onClick={onOpenRegisterModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm text-navy-950 bg-white hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span>Daftar Pelatihan Online</span>
            <ArrowRight className="w-4 h-4 text-crimson-700" />
          </button>

          <a
            href="#program"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg font-semibold text-sm text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Lihat Program</span>
          </a>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          Pelayanan informasi resmi, konsultasi terbuka bagi calon peserta dan orang tua.
        </p>

      </div>
    </section>
  );
}

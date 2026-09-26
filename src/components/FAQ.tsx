"use client";

import React, { useState } from "react";
import { faqData, getWhatsAppUrl } from "@/config/siteConfig";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export const FAQ: React.FC = () => {
  // First item open by default
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-ivory-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-950 border border-emerald-200">
            <HelpCircle className="w-3.5 h-3.5 text-gold-600" />
            <span>Pertanyaan Umum</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Jawaban atas pertanyaan seputar program perjalanan, fasilitas, tata cara
            pendaftaran, dan konsultasi bersama Safara Umroh.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqData.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl transition-all duration-200 overflow-hidden border ${
                  isOpen
                    ? "bg-white border-emerald-300 shadow-md"
                    : "bg-white/80 border-slate-200/90 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-sm font-bold text-gold-600 w-6">
                      0{idx + 1}
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-slate-900">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-800 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-gold-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fade-in pl-14">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Prompt below FAQ */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-3">
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Punya Pertanyaan Lain yang Belum Terjawab?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Admin Safara Umroh siap membantu memberikan penjelasan detail mengenai paket, persyaratan, dan ketersediaan kursi.
          </p>
          <div className="pt-2">
            <a
              href={getWhatsAppUrl("Halo Admin Safara Umroh, saya ingin menanyakan hal lain seputar program Umroh.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-gold-400" />
              <span>Tanya Admin Langsung</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

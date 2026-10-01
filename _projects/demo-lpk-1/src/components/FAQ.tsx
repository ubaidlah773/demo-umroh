"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { ChevronDown, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/config/siteConfig";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-block px-3 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
            {siteConfig.faq.badge}
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 tracking-tight leading-tight mb-3">
            {siteConfig.faq.headline}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {siteConfig.faq.subheadline}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {siteConfig.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-lg border border-slate-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-navy-950">
                    {item.question}
                  </span>
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-navy-950" : "text-slate-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Consultation Prompt */}
        <div className="mt-10 p-5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-navy-950">
              Pertanyaan Anda belum tercantum di atas?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Admin LPK NusaSkill siap membantu menjawab pertanyaan seputar program pelatihan.
            </p>
          </div>
          <a
            href={getWhatsAppUrl("Halo Admin, saya ingin menanyakan informasi mengenai program pelatihan di LPK NusaSkill.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs text-white bg-emerald-700 hover:bg-emerald-800 transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Hubungi Admin Langsung</span>
          </a>
        </div>

      </div>
    </section>
  );
}

import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface RegistrationStepsProps {
  onOpenRegisterModal: () => void;
}

export default function RegistrationSteps({
  onOpenRegisterModal,
}: RegistrationStepsProps) {
  return (
    <section id="alur-pendaftaran" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
            {siteConfig.registrationSteps.badge}
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 tracking-tight leading-tight mb-3">
            {siteConfig.registrationSteps.headline}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {siteConfig.registrationSteps.subheadline}
          </p>
        </div>

        {/* 4 Steps Sequential Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.registrationSteps.steps.map((item, idx) => (
            <div
              key={item.step}
              className="bg-white rounded-lg p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold font-mono text-crimson-700">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Langkah {idx + 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-navy-950 mb-1">
                  {item.title}
                </h3>

                <p className="text-xs font-semibold text-slate-700 mb-2">
                  {item.description}
                </p>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Tahap Terpadu</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={onOpenRegisterModal}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-white bg-crimson-700 hover:bg-crimson-800 transition-colors cursor-pointer"
          >
            <span>Daftar / Konsultasi Online Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

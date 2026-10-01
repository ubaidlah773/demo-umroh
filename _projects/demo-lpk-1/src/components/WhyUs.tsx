import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { GraduationCap, FileText, HeartHandshake, ShieldCheck } from "lucide-react";

export default function WhyUs() {
  const iconMap: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="w-5 h-5 text-crimson-700" />,
    FileText: <FileText className="w-5 h-5 text-navy-800" />,
    HeartHandshake: <HeartHandshake className="w-5 h-5 text-crimson-700" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-navy-800" />,
  };

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
            {siteConfig.whyUs.badge}
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 tracking-tight leading-tight mb-3">
            {siteConfig.whyUs.headline}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {siteConfig.whyUs.subheadline}
          </p>
        </div>

        {/* 4 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.whyUs.features.map((feature) => (
            <div
              key={feature.number}
              className="p-6 rounded-lg bg-slate-50/60 border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded bg-white border border-slate-200 flex items-center justify-center">
                    {iconMap[feature.icon] || (
                      <GraduationCap className="w-5 h-5 text-crimson-700" />
                    )}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {feature.number}
                  </span>
                </div>

                <h3 className="text-base font-bold text-navy-950 mb-2">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 text-[11px] font-semibold text-slate-400">
                Standar Pelatihan Resmi LPK
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

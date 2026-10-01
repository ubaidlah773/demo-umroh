import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="testimoni" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block px-3 py-1 rounded bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
              {siteConfig.testimonials.badge}
            </span>
            <span className="inline-block px-2.5 py-1 rounded bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase tracking-wider">
              Konten Demo
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 tracking-tight leading-tight mb-3">
            {siteConfig.testimonials.headline}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {siteConfig.testimonials.subheadline}
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.testimonials.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-5 h-5 text-slate-300" />
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                    Konten Demo
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-navy-950 text-white font-bold text-xs flex items-center justify-center font-mono">
                  {item.avatarText}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-navy-950">
                    {item.name}
                  </h3>
                  <div className="text-xs text-crimson-700 font-medium">
                    {item.role}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {item.program}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

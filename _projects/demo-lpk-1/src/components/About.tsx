import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";

export default function About() {
  return (
    <section id="tentang" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Clean Institutional Photo */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative h-80 sm:h-96 w-full rounded-lg overflow-hidden bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1000&auto=format&fit=crop"
                  alt="Kegiatan pembelajaran dan pendampingan peserta pelatihan"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-3 text-left">
                <p className="text-xs font-bold text-navy-950 uppercase tracking-wide">
                  Pembelajaran & Pendampingan Terarah
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Proses bimbingan bertahap dari pemahaman materi dasar hingga kesiapan praktik.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & 3 Core Values */}
          <div className="lg:col-span-7 flex flex-col items-start order-1 lg:order-2">
            
            <div className="inline-block px-3 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-4">
              {siteConfig.about.badge}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 tracking-tight leading-tight mb-4">
              {siteConfig.about.headline}
            </h2>

            <p className="text-base text-slate-600 font-normal leading-relaxed mb-8">
              {siteConfig.about.copy}
            </p>

            {/* 3 Core Pillars in Clean Academic Style */}
            <div className="w-full space-y-3.5">
              {siteConfig.about.values.map((val) => (
                <div
                  key={val.number}
                  className="p-4 sm:p-5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 text-navy-950 font-mono font-bold text-sm">
                    {val.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-navy-950">
                        {val.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

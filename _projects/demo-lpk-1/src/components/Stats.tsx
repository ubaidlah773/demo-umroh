import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { Users, BookOpen, CalendarCheck, Award, Info } from "lucide-react";

/**
 * ============================================================================
 * SECTION STATISTIK LEMBAGA (PLACEHOLDER DEMO)
 * ============================================================================
 * CATATAN UNTUK PENGEMBANG / KLIEN:
 * Angka statistik di bawah ini menggunakan placeholder "[XX]" dan TIDAK BOLEH
 * diklaim sebagai fakta riil sebelum diverifikasi.
 * Saat website ini dikustomisasi untuk klien LPK tertentu, ganti nilai ini
 * dengan data riil lembaga di file: `src/config/siteConfig.ts` pada bagian `stats`.
 */

export default function Stats() {
  const iconList = [
    <Users key="1" className="w-5 h-5 text-crimson-700" />,
    <BookOpen key="2" className="w-5 h-5 text-navy-800" />,
    <CalendarCheck key="3" className="w-5 h-5 text-crimson-700" />,
    <Award key="4" className="w-5 h-5 text-navy-800" />,
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          {siteConfig.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                idx > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-3">
                {iconList[idx % iconList.length]}
              </div>

              {/* Angka statistik placeholder: [XX]+ Peserta, [XX] Program, [XX]+ Kegiatan, [XX] Instruktur */}
              <div className="text-3xl lg:text-4xl font-extrabold text-navy-950 font-sans tracking-tight mb-1">
                {stat.value}
              </div>

              <div className="text-sm font-bold text-slate-800 mb-0.5">
                {stat.label}
              </div>

              {stat.description && (
                <div className="text-xs text-slate-500 max-w-[200px]">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Catatan Transparansi Demo */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>
            Data statistik di atas merupakan format placeholder demo dan harus disesuaikan dengan data riil klien lembaga.
          </span>
        </div>

      </div>
    </section>
  );
}

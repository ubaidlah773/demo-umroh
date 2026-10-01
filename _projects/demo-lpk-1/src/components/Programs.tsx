"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { ProgramItem } from "@/types";
import ProgramCard from "./ProgramCard";
import ProgramDetailModal from "./ProgramDetailModal";
import { Info } from "lucide-react";

export default function Programs() {
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  return (
    <section id="program" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
            {siteConfig.programsSection.badge}
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 tracking-tight leading-tight mb-3">
            {siteConfig.programsSection.headline}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-4">
            {siteConfig.programsSection.subheadline}
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-200/60 text-slate-600 text-xs font-medium">
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span>{siteConfig.programsSection.disclaimer}</span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.programs.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onSelect={(p) => setSelectedProgram(p)}
            />
          ))}
        </div>

        {/* Modal */}
        <ProgramDetailModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />

      </div>
    </section>
  );
}

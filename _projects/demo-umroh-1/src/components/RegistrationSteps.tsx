"use client";

import React from "react";
import { registrationSteps } from "@/config/siteConfig";
import {
  MessageSquare,
  Compass,
  FileCheck,
  CheckCircle,
  Luggage,
  Sparkles,
} from "lucide-react";

export const RegistrationSteps: React.FC = () => {
  const stepIcons = [
    MessageSquare,
    Compass,
    FileCheck,
    CheckCircle,
    Luggage,
  ];

  return (
    <section id="alur" className="py-20 lg:py-28 bg-ivory-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-950 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Alur Pendaftaran</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Alur Pendaftaran
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Gambaran alur tahapan pendaftaran ibadah yang mudah dipahami bagi calon jamaah.
          </p>
        </div>

        {/* 5-Step Visual Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          <div className="hidden md:block absolute top-14 left-10 right-10 h-0.5 bg-gradient-to-r from-gold-300 via-emerald-600 to-gold-400 z-0 opacity-50" />

          {registrationSteps.map((step, idx) => {
            const IconComponent = stepIcons[idx] || MessageSquare;
            return (
              <div
                key={step.step}
                className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left group"
              >
                {/* Step Circle */}
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gold-400/80 shadow-card flex items-center justify-center text-emerald-950 mb-5 group-hover:scale-110 group-hover:border-emerald-600 transition-all duration-300">
                  <IconComponent className="w-7 h-7 text-emerald-800" />
                </div>

                {/* Step Number */}
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-1">
                  {step.step}
                </span>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2 leading-tight">
                  {step.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

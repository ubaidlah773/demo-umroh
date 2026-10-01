"use client";

import React from "react";
import { trustIndicators } from "@/config/siteConfig";
import { CheckCircle2, Calendar, FileText, MessageSquare } from "lucide-react";

export const TrustStrip: React.FC = () => {
  const icons = [CheckCircle2, Calendar, FileText, MessageSquare];

  return (
    <div className="relative z-20 -mt-8 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-card border border-emerald-950/5 p-4 sm:p-6 lg:p-7">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {trustIndicators.map((item, idx) => {
            const Icon = icons[idx] || CheckCircle2;
            return (
              <div
                key={item.title}
                className={`flex items-start gap-3 sm:gap-4 ${
                  idx > 0 ? "pt-4 sm:pt-0 sm:pl-4 lg:pl-6" : ""
                }`}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100 shadow-subtle group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

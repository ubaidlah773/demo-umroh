"use client";

import React, { useState } from "react";
import { Info, X } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-block px-2 py-0.5 rounded font-semibold bg-crimson-700 text-white text-[10px] tracking-wider uppercase">
            DEMO PREVIEW
          </span>
          <span className="text-slate-400 text-xs">
            {siteConfig.institution.demoDisclaimer}
          </span>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          aria-label="Tutup pemberitahuan"
          className="text-slate-400 hover:text-white transition-colors p-0.5"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

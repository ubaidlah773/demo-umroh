"use client";

import React, { useState } from "react";
import { siteConfig, getWhatsAppUrl } from "@/config/siteConfig";
import { MessageCircle, X } from "lucide-react";

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
      {/* Tooltip Chat Admin */}
      {showTooltip && (
        <div className="flex items-center gap-2 bg-white text-slate-800 px-3.5 py-2 rounded-xl shadow-lg border border-slate-200 text-xs font-semibold animate-fade-in">
          <span>Chat Admin</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 ml-1"
            aria-label="Tutup tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button with Subtle Pulse */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Admin WhatsApp"
        className="relative group w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:shadow-emerald-glow transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />
        <span className="absolute -inset-2 rounded-full bg-emerald-400/20 animate-pulse pointer-events-none" />

        <MessageCircle className="w-7 h-7 text-white relative z-10" />
      </a>
    </div>
  );
};

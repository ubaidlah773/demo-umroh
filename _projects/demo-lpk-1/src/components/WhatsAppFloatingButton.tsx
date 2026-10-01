"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/config/siteConfig";

export default function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const waUrl = getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

  return (
    <aside aria-label="Bantuan WhatsApp" className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      {/* Tooltip on hover/focus */}
      <div
        className={`bg-navy-950 text-white text-xs font-semibold py-1.5 px-3 rounded shadow-md border border-navy-800 transition-all duration-200 pointer-events-none hidden sm:block ${
          showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        Chat Admin LPK
      </div>

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-label="Hubungi Admin LPK via WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg transition-transform transform hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
    </aside>
  );
}

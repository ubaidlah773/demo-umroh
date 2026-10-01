"use client";

import React from "react";
import { Property } from "@/types/property";
import { defaultAgent } from "@/data/agent";
import { useInquiry } from "@/context/InquiryContext";
import { MessageSquare, Calendar } from "lucide-react";

interface MobileStickyBarProps {
  property: Property;
}

export default function MobileStickyBar({ property }: MobileStickyBarProps) {
  const { openInquiry } = useInquiry();

  // Shorten price for mobile space: e.g. Rp 4.800.000.000 -> Rp 4.8 B
  const formatShortPrice = (price: number) => {
    if (price >= 1000000000) {
      const billions = (price / 1000000000).toFixed(1).replace(/\.0$/, "");
      return `Rp ${billions} Miliar`;
    }
    const millions = (price / 1000000).toFixed(0);
    return `Rp ${millions} Juta`;
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Ahmad, I'm interested in the "${property.title}" in ${property.location}.`
  );
  const whatsappUrl = `https://wa.me/${defaultAgent.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-lumea-border p-3 sm:px-6 shadow-2xl safe-area-bottom">
      <div className="flex items-center justify-between gap-3">
        {/* Price column */}
        <div className="min-w-0">
          <span className="text-[10px] uppercase tracking-wider text-lumea-secondary block leading-none">
            Price
          </span>
          <div className="font-bold text-base sm:text-lg text-lumea-primary truncate leading-tight mt-0.5">
            {formatShortPrice(property.price)}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 sm:px-3.5 bg-[#25D366]/15 text-lumea-primary border border-[#25D366]/40 rounded-sm text-xs font-semibold flex items-center justify-center gap-1.5 min-h-[44px]"
            aria-label="WhatsApp agent"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <button
            onClick={() => openInquiry(property)}
            className="py-2.5 px-4 bg-lumea-primary text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-lumea-accent transition-colors flex items-center justify-center gap-1.5 min-h-[44px] shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Visit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { MessageSquare, Phone, Utensils } from "lucide-react";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";
import { CAFE_INFO } from "@/data/cafeInfo";

export default function MobileFloatingActions() {
  const { openReservation } = useModal();

  return (
    <aside
      aria-label="Aksi Cepat Mobile"
      className="fixed bottom-4 left-4 right-4 z-30 lg:hidden pointer-events-none"
    >
      <div className="max-w-md mx-auto pointer-events-auto flex items-center justify-between gap-2 p-2 rounded-2xl bg-charcoal-900/95 backdrop-blur-xl border border-gold-500/30 shadow-2xl">
        {/* WhatsApp Reservation Button */}
        <button
          onClick={() => openReservation()}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-wider shadow-gold-glow transition-all active:scale-95 cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-charcoal-950" />
          <span>Reservasi WA</span>
        </button>

        {/* Direct Call Button */}
        <a
          href={CAFE_INFO.contact.phone}
          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-ivory-200 border border-charcoal-700 font-medium text-xs transition-colors active:scale-95"
        >
          <Phone className="w-3.5 h-3.5 text-gold-400" />
          <span>Call</span>
        </a>

        {/* Quick Menu Button */}
        <Link
          href="/menu"
          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-ivory-200 border border-charcoal-700 font-medium text-xs transition-colors active:scale-95"
        >
          <Utensils className="w-3.5 h-3.5 text-gold-400" />
          <span>Menu</span>
        </Link>
      </div>
    </aside>
  );
}

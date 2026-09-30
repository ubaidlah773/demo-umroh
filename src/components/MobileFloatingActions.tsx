"use client";

import React from "react";
import Link from "next/link";
import { Utensils, BookOpen } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function MobileFloatingActions() {
  const { openReservation } = useModal();

  return (
    <aside
      aria-label="Mobile Quick Actions"
      className="fixed bottom-4 left-4 right-4 z-40 lg:hidden pointer-events-none"
    >
      <div className="max-w-xs mx-auto pointer-events-auto flex items-center justify-between gap-2 p-1.5 rounded-full bg-olive-900/95 backdrop-blur-md border border-cream-200/20 shadow-editorial">
        {/* Menu Link */}
        <Link
          href="/menu"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full text-cream-100 hover:text-white hover:bg-olive-800 font-mono text-[11px] uppercase tracking-wider transition-colors active:scale-95"
        >
          <BookOpen className="w-3.5 h-3.5 text-cream-300" />
          <span>MENU</span>
        </Link>

        {/* Reserve Action Button */}
        <button
          onClick={() => openReservation()}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 font-mono text-[11px] font-semibold uppercase tracking-wider transition-all active:scale-95 shadow-sm cursor-pointer"
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>RESERVE</span>
        </button>
      </div>
    </aside>
  );
}

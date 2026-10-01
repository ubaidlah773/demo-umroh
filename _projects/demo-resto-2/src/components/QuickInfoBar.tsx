"use client";

import React from "react";
import { Clock, Wallet, MapPin, PhoneCall } from "lucide-react";
import { CAFE_INFO } from "@/data/cafeInfo";
import { useModal } from "@/context/ModalContext";

export default function QuickInfoBar() {
  const { openReservation } = useModal();

  const INFO_ITEMS = [
    {
      icon: Clock,
      label: "Open Daily",
      value: `Until ${CAFE_INFO.operational.closingHour}`,
      sub: "Buka Setiap Hari",
    },
    {
      icon: Wallet,
      label: "Price Range",
      value: CAFE_INFO.priceRange.display,
      sub: "Per Orang / Porsi",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Ronggomulyo, Tuban",
      sub: "Jl. Basuki Rachmad No.282",
    },
    {
      icon: PhoneCall,
      label: "Reservation",
      value: CAFE_INFO.contact.phoneFormatted,
      sub: "WhatsApp Booking",
      isAction: true,
    },
  ];

  return (
    <section id="quick-info" className="relative z-20 -mt-6 sm:-mt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-charcoal-900/90 backdrop-blur-xl border border-gold-500/25 rounded-2xl shadow-2xl p-4 sm:p-6 divide-y sm:divide-y-0 sm:divide-x divide-charcoal-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {INFO_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-3.5 px-2 py-1 ${
                  item.isAction ? "cursor-pointer group" : ""
                }`}
                onClick={item.isAction ? () => openReservation() : undefined}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-charcoal-800/80 border border-gold-500/20 flex items-center justify-center flex-shrink-0 group-hover:border-gold-500 group-hover:bg-gold-500/10 transition-colors">
                  <Icon className="w-5 h-5 text-gold-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-ivory-400 font-medium">
                    {item.label}
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-ivory-100 truncate group-hover:text-gold-300 transition-colors">
                    {item.value}
                  </p>
                  <p className="text-[11px] text-ivory-500 truncate hidden sm:block">
                    {item.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

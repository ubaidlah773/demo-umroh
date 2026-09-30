"use client";

import React from "react";
import { Minus, Plus, Users, MessageSquare } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurant";

interface GuestSelectorProps {
  guestCount: number;
  onChangeGuestCount: (count: number) => void;
}

export default function GuestSelector({
  guestCount,
  onChangeGuestCount,
}: GuestSelectorProps) {
  const minGuests = 1;
  const maxGuests = 20;

  const handleDecrement = () => {
    if (guestCount > minGuests) {
      onChangeGuestCount(guestCount - 1);
    }
  };

  const handleIncrement = () => {
    if (guestCount < maxGuests) {
      onChangeGuestCount(guestCount + 1);
    }
  };

  const quickOptions = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20];

  return (
    <div className="w-full max-w-md mx-auto text-center">
      {/* Primary Counter Box */}
      <div className="p-8 rounded-2xl bg-ivory-50 border border-espresso-900/10 shadow-sm mb-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-600 block mb-3">
          PARTY SIZE
        </span>

        <div className="flex items-center justify-center gap-8 my-4">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={guestCount <= minGuests}
            className="w-14 h-14 rounded-full border border-espresso-900/20 bg-ivory-100 hover:bg-espresso-900 hover:text-ivory-100 hover:border-espresso-900 text-espresso-900 flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer active:scale-95 shadow-sm"
            aria-label="Decrease guest count"
          >
            <Minus className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center">
            <span className="font-serif text-6xl sm:text-7xl font-light text-espresso-900 tracking-tight leading-none">
              {guestCount}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-warmgray-500 mt-2">
              {guestCount === 1 ? "GUEST" : "GUESTS"}
            </span>
          </div>

          <button
            type="button"
            onClick={handleIncrement}
            disabled={guestCount >= maxGuests}
            className="w-14 h-14 rounded-full border border-espresso-900/20 bg-ivory-100 hover:bg-espresso-900 hover:text-ivory-100 hover:border-espresso-900 text-espresso-900 flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer active:scale-95 shadow-sm"
            aria-label="Increase guest count"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-warmgray-500 font-light mt-4">
          {guestCount >= 8
            ? "For parties of 8 or more, we prepare a dedicated seating arrangement."
            : "Standard dining reservation with full seating comfort."}
        </p>
      </div>

      {/* Quick Select Buttons */}
      <div className="mb-8">
        <span className="font-mono text-[11px] uppercase tracking-wider text-warmgray-400 block mb-3">
          QUICK SELECT
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {quickOptions.map((num) => {
            const isSelected = guestCount === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => onChangeGuestCount(num)}
                className={`w-10 h-10 rounded-full font-mono text-xs transition-all cursor-pointer ${
                  isSelected
                    ? "bg-espresso-900 text-ivory-100 font-semibold shadow"
                    : "bg-ivory-200/70 text-espresso-900 hover:bg-champagne-500/20 border border-espresso-900/10"
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Large Parties Note */}
      <div className="p-4 rounded-xl bg-ivory-200/50 border border-espresso-900/10 flex items-center justify-between gap-3 text-left">
        <div>
          <h4 className="font-serif text-base text-espresso-900">
            Planning a gathering of 20+ guests?
          </h4>
          <p className="text-xs text-warmgray-500 mt-0.5">
            We offer bespoke banquet menus & private hall arrangements.
          </p>
        </div>
        <a
          href={`https://wa.me/${RESTAURANT_INFO.contact.whatsappNumber}?text=${encodeURIComponent(
            "Halo Resto Kayu Manis Tuban, saya ingin konsultasi reservasi rombongan besar (di atas 20 orang)."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-espresso-900 text-ivory-100 font-mono text-[10px] uppercase tracking-wider hover:bg-champagne-600 transition-colors flex-shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>CONTACT</span>
        </a>
      </div>
    </div>
  );
}

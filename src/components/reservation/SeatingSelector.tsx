"use client";

import React from "react";
import { Wind, Trees, DoorClosed, CheckCircle2 } from "lucide-react";
import { SEATING_OPTIONS } from "@/lib/validations/reservation";

interface SeatingSelectorProps {
  selectedSeating: "Indoor" | "Outdoor" | "Private Room";
  onSelectSeating: (seating: "Indoor" | "Outdoor" | "Private Room") => void;
  guestCount: number;
}

export default function SeatingSelector({
  selectedSeating,
  onSelectSeating,
  guestCount,
}: SeatingSelectorProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case "Indoor":
        return <Wind className="w-6 h-6" />;
      case "Outdoor":
        return <Trees className="w-6 h-6" />;
      case "Private Room":
        return <DoorClosed className="w-6 h-6" />;
      default:
        return <Wind className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {SEATING_OPTIONS.map((opt) => {
        const isSelected = selectedSeating === opt.id;

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelectSeating(opt.id as any)}
            className={`w-full p-6 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-5 relative group ${
              isSelected
                ? "bg-espresso-900 border-espresso-900 text-ivory-100 shadow-luxury"
                : "bg-ivory-50 border-espresso-900/10 text-espresso-900 hover:border-champagne-500/50 hover:bg-ivory-200/50"
            }`}
          >
            {/* Icon Box */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                isSelected
                  ? "bg-champagne-500/20 text-champagne-400 border border-champagne-400/30"
                  : "bg-ivory-200/80 text-espresso-800 border border-espresso-900/5 group-hover:text-champagne-600"
              }`}
            >
              {getIcon(opt.id)}
            </div>

            {/* Description Text */}
            <div className="flex-1 pr-6">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-serif text-2xl font-normal tracking-tight">
                  {opt.name}
                </h3>
                {opt.id === "Private Room" && (
                  <span
                    className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-champagne-500/30 text-champagne-300"
                        : "bg-champagne-500/15 text-champagne-700"
                    }`}
                  >
                    EXECUTIVE
                  </span>
                )}
              </div>
              <p
                className={`text-sm font-light leading-relaxed ${
                  isSelected ? "text-ivory-200/85" : "text-warmgray-500"
                }`}
              >
                {opt.description}
              </p>
            </div>

            {/* Selection Checkmark */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border transition-colors ${
                isSelected
                  ? "bg-champagne-500 border-champagne-500 text-espresso-950"
                  : "border-espresso-900/20 bg-transparent text-transparent"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </button>
        );
      })}

      <p className="text-center font-mono text-[11px] text-warmgray-400 uppercase tracking-widest pt-2">
        SEATING ARRANGEMENTS ARE GUARANTEED UPON CONFIRMATION
      </p>
    </div>
  );
}

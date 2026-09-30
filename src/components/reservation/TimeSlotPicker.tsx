"use client";

import React, { useState, useEffect } from "react";
import { Clock, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { TIME_SLOTS } from "@/lib/validations/reservation";
import { SlotAvailability } from "@/lib/availability";

interface TimeSlotPickerProps {
  date: string;
  partySize: number;
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

export default function TimeSlotPicker({
  date,
  partySize,
  selectedTime,
  onSelectTime,
}: TimeSlotPickerProps) {
  const [slots, setSlots] = useState<SlotAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchAvailability() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/reservations?date=${date}&guests=${partySize}`);
        const data = await res.json();
        if (isMounted) {
          if (data.success && data.data?.slots) {
            setSlots(data.data.slots);
          } else {
            // Fallback default slots
            setSlots(
              TIME_SLOTS.map((t) => ({
                time: t,
                totalCapacity: 30,
                bookedGuests: 0,
                availableSeats: 30,
                status: "Available",
              }))
            );
          }
        }
      } catch (err) {
        console.error("Failed to load slot availability:", err);
        if (isMounted) {
          setError("Unable to sync live capacity. Showing standard dining slots.");
          setSlots(
            TIME_SLOTS.map((t) => ({
              time: t,
              totalCapacity: 30,
              bookedGuests: 0,
              availableSeats: 30,
              status: "Available",
            }))
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (date) {
      fetchAvailability();
    }
  }, [date, partySize]);

  // Split into Lunch (11:30 - 13:30) and Dinner (17:30 - 20:30)
  const lunchSlots = slots.filter((s) => s.time <= "14:00");
  const dinnerSlots = slots.filter((s) => s.time >= "17:00");

  const renderSlotGroup = (title: string, groupSlots: SlotAvailability[]) => {
    return (
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-champagne-600 font-medium">
            {title}
          </span>
          <span className="h-px flex-1 bg-espresso-900/10" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {groupSlots.map((slot) => {
            const isSelected = selectedTime === slot.time;
            const isUnavailable = slot.status === "Unavailable";
            const isLimited = slot.status === "Limited";

            return (
              <button
                key={slot.time}
                type="button"
                disabled={isUnavailable}
                onClick={() => onSelectTime(slot.time)}
                className={`py-3.5 px-3 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center relative ${
                  isUnavailable
                    ? "bg-ivory-200/40 border-espresso-900/5 text-warmgray-400 opacity-40 cursor-not-allowed"
                    : isSelected
                    ? "bg-espresso-900 border-espresso-900 text-ivory-100 shadow-md scale-102"
                    : "bg-ivory-50 border-espresso-900/10 text-espresso-900 hover:border-champagne-500/60 hover:bg-champagne-500/10"
                }`}
              >
                <span className="font-mono text-base font-medium tracking-tight">
                  {slot.time}
                </span>

                {/* Subtitle status badge */}
                <span
                  className={`font-mono text-[9px] uppercase tracking-wider mt-1 ${
                    isSelected
                      ? "text-champagne-400"
                      : isUnavailable
                      ? "text-warmgray-400"
                      : isLimited
                      ? "text-amber-700 font-semibold"
                      : "text-olive-700"
                  }`}
                >
                  {isUnavailable
                    ? "FULL"
                    : isLimited
                    ? "LIMITED"
                    : "AVAILABLE"}
                </span>

                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 absolute top-2 right-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {loading ? (
        <div className="py-16 text-center">
          <Clock className="w-8 h-8 text-champagne-500 animate-spin mx-auto mb-3" />
          <p className="font-mono text-xs uppercase tracking-widest text-warmgray-500">
            CHECKING LIVE TABLE AVAILABILITY...
          </p>
        </div>
      ) : (
        <>
          {error && (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {lunchSlots.length > 0 && renderSlotGroup("LUNCH SERVICE", lunchSlots)}
          {dinnerSlots.length > 0 && renderSlotGroup("DINNER SERVICE", dinnerSlots)}

          {/* Selected Summary Pill */}
          {selectedTime && (
            <div className="p-3.5 rounded-xl bg-ivory-200/60 border border-espresso-900/10 flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 text-xs font-mono text-espresso-900">
                <CheckCircle2 className="w-4 h-4 text-olive-700" />
                <span>
                  SELECTED TIME: <strong className="text-espresso-950 font-bold">{selectedTime} WIB</strong>
                </span>
              </div>
              <span className="font-mono text-[10px] text-warmgray-500 uppercase tracking-widest">
                TABLE RESERVED 2 HOURS
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

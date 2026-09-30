"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Clock, DoorClosed, ArrowRight, Sparkles } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function HeroBookingShortcut() {
  const router = useRouter();
  const { openReservation } = useModal();

  const getTomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const [date, setDate] = useState(getTomorrowStr());
  const [guests, setGuests] = useState("2");
  const [time, setTime] = useState("19:30");
  const [seating, setSeating] = useState("Indoor");

  const formattedDisplayDate = () => {
    try {
      return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
    } catch {
      return date;
    }
  };

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/reservation?date=${encodeURIComponent(date)}&guests=${encodeURIComponent(
        guests
      )}&time=${encodeURIComponent(time)}&seating=${encodeURIComponent(seating)}`
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <form
        onSubmit={handleCheckAvailability}
        className="p-3 sm:p-4 rounded-3xl bg-ivory-100/95 backdrop-blur-xl border border-champagne-500/30 shadow-2xl grid grid-cols-2 md:grid-cols-5 gap-3 items-center text-espresso-900"
      >
        {/* 1. DATE */}
        <div className="p-3 rounded-2xl bg-ivory-50/80 hover:bg-ivory-50 border border-espresso-900/5 transition-colors relative group">
          <div className="flex items-center gap-1.5 text-champagne-600 mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
              DATE
            </span>
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full font-serif text-sm sm:text-base font-medium bg-transparent text-espresso-900 outline-none cursor-pointer"
          />
        </div>

        {/* 2. GUESTS */}
        <div className="p-3 rounded-2xl bg-ivory-50/80 hover:bg-ivory-50 border border-espresso-900/5 transition-colors relative group">
          <div className="flex items-center gap-1.5 text-champagne-600 mb-1">
            <Users className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
              GUESTS
            </span>
          </div>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full font-serif text-sm sm:text-base font-medium bg-transparent text-espresso-900 outline-none cursor-pointer"
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5">5 Guests</option>
            <option value="6">6 Guests</option>
            <option value="8">8 Guests</option>
            <option value="10">10 Guests</option>
            <option value="12">12+ Guests</option>
          </select>
        </div>

        {/* 3. TIME */}
        <div className="p-3 rounded-2xl bg-ivory-50/80 hover:bg-ivory-50 border border-espresso-900/5 transition-colors relative group">
          <div className="flex items-center gap-1.5 text-champagne-600 mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
              TIME
            </span>
          </div>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full font-serif text-sm sm:text-base font-medium bg-transparent text-espresso-900 outline-none cursor-pointer"
          >
            <option value="12:00">12:00 (Lunch)</option>
            <option value="12:30">12:30 (Lunch)</option>
            <option value="13:00">13:00 (Lunch)</option>
            <option value="17:30">17:30 (Dinner)</option>
            <option value="18:00">18:00 (Dinner)</option>
            <option value="18:30">18:30 (Dinner)</option>
            <option value="19:00">19:00 (Dinner)</option>
            <option value="19:30">19:30 (Dinner)</option>
            <option value="20:00">20:00 (Dinner)</option>
            <option value="20:30">20:30 (Late)</option>
          </select>
        </div>

        {/* 4. SEATING */}
        <div className="p-3 rounded-2xl bg-ivory-50/80 hover:bg-ivory-50 border border-espresso-900/5 transition-colors relative group">
          <div className="flex items-center gap-1.5 text-champagne-600 mb-1">
            <DoorClosed className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
              SEATING
            </span>
          </div>
          <select
            value={seating}
            onChange={(e) => setSeating(e.target.value)}
            className="w-full font-serif text-sm sm:text-base font-medium bg-transparent text-espresso-900 outline-none cursor-pointer"
          >
            <option value="Indoor">Indoor (Air-Con)</option>
            <option value="Outdoor">Outdoor Garden</option>
            <option value="Private Room">Private Room</option>
          </select>
        </div>

        {/* 5. ACTION BUTTON */}
        <div className="col-span-2 md:col-span-1 h-full flex items-center">
          <button
            type="submit"
            className="w-full py-4 sm:py-3.5 px-6 rounded-2xl bg-espresso-900 hover:bg-champagne-600 text-ivory-100 font-mono text-[11px] uppercase tracking-[0.16em] font-semibold transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 group"
          >
            <span>AVAILABILITY</span>
            <ArrowRight className="w-3.5 h-3.5 text-champagne-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
}

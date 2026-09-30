"use client";

import React from "react";
import { Clock, MapPin, Utensils, CalendarCheck } from "lucide-react";

export default function QuickInfo() {
  const items = [
    {
      icon: Clock,
      label: "OPEN DAILY",
      value: "11:00 — 22:00",
      subtext: "Continuous Dining Service",
    },
    {
      icon: MapPin,
      label: "LOCATION",
      value: "Tuban, East Java",
      subtext: "Basuki Rachmad 215–217",
    },
    {
      icon: Utensils,
      label: "CUISINE",
      value: "Contemporary Indonesian",
      subtext: "Seafood & Archipelago Flavors",
    },
    {
      icon: CalendarCheck,
      label: "RESERVATION",
      value: "Available Online",
      subtext: "Instant Confirmation",
    },
  ];

  return (
    <section className="bg-ivory-50 border-b border-espresso-900/10 py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-espresso-900/10">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center ${
                  idx > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-champagne-500/15 border border-champagne-500/30 text-champagne-700 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne-700 font-semibold mb-1">
                  {item.label}
                </span>
                <p className="font-serif text-lg sm:text-xl text-espresso-900 font-normal">
                  {item.value}
                </p>
                <span className="text-xs text-warmgray-500 font-light mt-0.5">
                  {item.subtext}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

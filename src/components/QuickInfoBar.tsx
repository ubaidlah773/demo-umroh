"use client";

import React from "react";
import { Fish, Users, Car, Clock } from "lucide-react";

export default function QuickInfoBar() {
  const INFO_ITEMS = [
    {
      icon: Fish,
      title: "SEAFOOD",
      subtitle: "Fresh & flavorful",
    },
    {
      icon: Users,
      title: "FAMILY DINING",
      subtitle: "Comfortable space",
    },
    {
      icon: Car,
      title: "SPACIOUS PARKING",
      subtitle: "Easy access",
    },
    {
      icon: Clock,
      title: "OPEN DAILY",
      subtitle: "Until 22.00",
    },
  ];

  return (
    <section id="quick-info" className="relative z-20 -mt-6 sm:-mt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-forest-950/95 backdrop-blur-xl border border-gold-500/25 rounded-lg shadow-2xl p-4 sm:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {INFO_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-3.5 px-3 py-2 ${
                  index > 0 ? "pt-3 sm:pt-0" : ""
                }`}
              >
                <div className="w-11 h-11 rounded-md bg-forest-900 border border-gold-500/30 flex items-center justify-center flex-shrink-0 text-gold-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold tracking-wider text-ivory-100 uppercase">
                    {item.title}
                  </p>
                  <p className="text-xs text-sand-300 font-normal truncate">
                    {item.subtitle}
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

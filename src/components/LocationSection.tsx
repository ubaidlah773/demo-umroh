"use client";

import React from "react";
import { MapPin, Phone, Clock, Car, Navigation, ArrowUpRight } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurant";

export default function LocationSection() {
  return (
    <section id="contact" className="py-24 sm:py-36 bg-ivory-100 text-espresso-900 border-t border-espresso-900/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-600 block mb-3 font-medium">
            DESTINATION & ARRIVAL
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-espresso-900 leading-[1.02]">
            FIND US.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-warmgray-500 font-light leading-relaxed">
            Conveniently situated along the primary Basuki Rachmad boulevard in Tuban, adjacent to Hotel Fave with dedicated coach and car parking.
          </p>
        </div>

        {/* 2-Column Layout: Left Map, Right Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Map Embed (7 cols) */}
          <div className="lg:col-span-7 h-[420px] sm:h-[500px] rounded-3xl overflow-hidden border border-espresso-900/10 shadow-luxury bg-ivory-200 relative group">
            <iframe
              src={RESTAURANT_INFO.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map Resto Kayu Manis Tuban"
              className="w-full h-full filter saturate-90 contrast-95 transition-all duration-500 group-hover:saturate-100"
            />
          </div>

          {/* Location Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Address */}
              <div className="p-6 rounded-2xl bg-ivory-50 border border-espresso-900/10 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-champagne-500/15 text-champagne-700 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-champagne-600 block mb-1">
                      ADDRESS
                    </span>
                    <h3 className="font-serif text-xl font-normal text-espresso-900 mb-1">
                      Jl. Basuki Rachmad No.215–217
                    </h3>
                    <p className="text-sm text-warmgray-500 font-light leading-relaxed">
                      Ronggomulyo, Kec. Tuban, Kabupaten Tuban, Jawa Timur 62315
                    </p>
                    <p className="text-xs text-olive-700 font-mono mt-1.5">
                      📍 Same complex with Hotel Fave Tuban
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-ivory-50 border border-espresso-900/10 shadow-sm">
                  <Clock className="w-5 h-5 text-champagne-600 mb-2" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-warmgray-500 block mb-1">
                    OPENING HOURS
                  </span>
                  <p className="font-serif text-lg text-espresso-900">
                    11:00 — 22:00
                  </p>
                  <p className="text-xs text-warmgray-400 mt-0.5">Every Day (Mon – Sun)</p>
                </div>

                <div className="p-6 rounded-2xl bg-ivory-50 border border-espresso-900/10 shadow-sm">
                  <Phone className="w-5 h-5 text-champagne-600 mb-2" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-warmgray-500 block mb-1">
                    TELEPHONE
                  </span>
                  <a
                    href={`tel:${RESTAURANT_INFO.contact.phoneRaw}`}
                    className="font-serif text-lg text-espresso-900 hover:text-champagne-600 transition-colors block"
                  >
                    (0356) 331114
                  </a>
                  <p className="text-xs text-warmgray-400 mt-0.5">Direct Line</p>
                </div>
              </div>

              {/* Parking Information */}
              <div className="p-6 rounded-2xl bg-ivory-50 border border-espresso-900/10 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-champagne-500/15 text-champagne-700 flex items-center justify-center flex-shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-champagne-600 block mb-1">
                    PARKING ACCOMMODATION
                  </span>
                  <p className="text-sm text-espresso-900 font-medium">
                    Expansive Private Parking Lot
                  </p>
                  <p className="text-xs text-warmgray-500 font-light mt-0.5">
                    Safe, shaded parking easily accommodating up to 30+ passenger cars and multiple tourist buses.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Get Directions */}
            <div className="pt-2">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-8 rounded-full bg-espresso-900 hover:bg-champagne-600 text-ivory-100 font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 shadow-luxury flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-champagne-400" />
                <span>GET DIRECTIONS ON GOOGLE MAPS</span>
                <ArrowUpRight className="w-4 h-4 text-champagne-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

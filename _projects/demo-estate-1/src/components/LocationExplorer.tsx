"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { locationsData, LocationData } from "@/data/locations";
import { ArrowRight, MapPin, Compass } from "lucide-react";

export default function LocationExplorer() {
  const [activeLocation, setActiveLocation] = useState<LocationData>(locationsData[0]);

  return (
    <section className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-[1px] w-6 bg-lumea-accent" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-lumea-accent">
              REGIONAL ENCLAVES
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-lumea-primary font-normal leading-tight">
            DISCOVER THE RIGHT LOCATION
          </h2>
          <p className="text-sm sm:text-base text-lumea-secondary mt-2 max-w-xl">
            Explore Indonesia&apos;s most coveted residential sanctuaries and investment corridors.
          </p>
        </div>

        <Link
          href="/locations"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-lumea-primary hover:text-lumea-accent transition-colors pb-1 border-b border-lumea-primary hover:border-lumea-accent w-fit min-h-[44px]"
        >
          <span>Explore All Enclaves</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Popular Area Quick Chips */}
      <div className="mb-10 flex flex-wrap items-center gap-2 sm:gap-3">
        <span className="text-xs uppercase tracking-wider font-semibold text-lumea-primary flex items-center gap-1.5 mr-2">
          <Compass className="w-4 h-4 text-lumea-accent" />
          Popular Areas:
        </span>
        {[
          { name: "Canggu, Bali", city: "Bali" },
          { name: "Ubud, Bali", city: "Bali" },
          { name: "Uluwatu, Bali", city: "Bali" },
          { name: "Menteng, Jakarta", city: "Jakarta" },
          { name: "SCBD, Jakarta", city: "Jakarta" },
          { name: "CitraLand, Surabaya", city: "Surabaya" },
          { name: "Batu, Malang", city: "Malang" },
          { name: "Kaliurang, Yogyakarta", city: "Yogyakarta" },
          { name: "Candi Sari, Semarang", city: "Semarang" },
        ].map((area) => (
          <Link
            key={area.name}
            href={`/properties?city=${encodeURIComponent(area.city)}`}
            className="px-3.5 py-1.5 bg-white border border-lumea-border rounded-full text-xs font-medium text-lumea-secondary hover:text-lumea-primary hover:border-lumea-accent transition-colors shadow-2xs min-h-[38px] flex items-center"
          >
            {area.name}
          </Link>
        ))}
      </div>

      {/* Interactive Location Feature: Split Interactive Map / Spotlight Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Interactive City Selector List */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            {locationsData.map((loc) => {
              const isSelected = activeLocation.id === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocation(loc)}
                  className={`w-full text-left p-4 sm:p-5 rounded-lg border transition-all duration-300 flex items-center justify-between min-h-[48px] ${
                    isSelected
                      ? "bg-white border-lumea-accent shadow-lumea-card translate-x-1"
                      : "bg-white/60 hover:bg-white border-lumea-border hover:border-lumea-secondary/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        isSelected ? "bg-lumea-accent" : "bg-lumea-border"
                      }`}
                    />
                    <div>
                      <h4
                        className={`font-editorial text-xl transition-colors ${
                          isSelected ? "text-lumea-primary font-medium" : "text-lumea-secondary"
                        }`}
                      >
                        {loc.name}
                      </h4>
                      <p className="text-xs text-lumea-secondary">{loc.province}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-lumea-bg text-lumea-primary">
                      {loc.propertyCount} listings
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? "text-lumea-accent translate-x-1" : "text-lumea-secondary opacity-40"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4">
            <Link
              href={`/properties?city=${encodeURIComponent(activeLocation.name)}`}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-lumea-primary text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-lumea-accent transition-colors min-h-[44px]"
            >
              <span>Explore All {activeLocation.name} Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column: Active Location Photographic Showcase */}
        <div className="lg:col-span-7 bg-white border border-lumea-border rounded-xl overflow-hidden shadow-lumea-card flex flex-col justify-between">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-lumea-surface">
            <Image
              src={activeLocation.image}
              alt={`${activeLocation.name}, Indonesia`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm text-lumea-primary text-xs uppercase tracking-wider font-semibold rounded-sm">
                <MapPin className="w-3.5 h-3.5 text-lumea-accent" />
                {activeLocation.name}, {activeLocation.province}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
              <h3 className="font-editorial text-3xl sm:text-4xl font-normal leading-tight mb-1 text-white">
                {activeLocation.name}
              </h3>
              <p className="text-sm sm:text-base text-white/90 font-light max-w-lg">
                {activeLocation.headline}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-sm text-lumea-secondary leading-relaxed">
              {activeLocation.description}
            </p>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-lumea-accent font-semibold block mb-2">
                Prime Neighborhoods & Enclaves:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeLocation.popularAreas.map((subArea) => (
                  <Link
                    key={subArea}
                    href={`/properties?city=${encodeURIComponent(activeLocation.name)}`}
                    className="px-3 py-1 bg-lumea-bg border border-lumea-border rounded text-xs text-lumea-primary hover:border-lumea-accent transition-colors"
                  >
                    {subArea}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

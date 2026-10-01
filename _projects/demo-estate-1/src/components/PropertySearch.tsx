"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, DollarSign, ArrowRight } from "lucide-react";

interface PropertySearchProps {
  onSearch?: (filters: {
    status: string;
    city: string;
    type: string;
    priceRange: string;
  }) => void;
  standalone?: boolean;
}

export default function PropertySearch({ onSearch, standalone = false }: PropertySearchProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"Buy" | "Rent" | "Commercial">("Buy");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const locationsList = [
    "All Locations",
    "Bali",
    "Jakarta",
    "Surabaya",
    "Malang",
    "Yogyakarta",
    "Semarang",
  ];

  const typesList = [
    "All Property Types",
    "Villa",
    "House",
    "Apartment",
    "Land",
    "Commercial",
  ];

  const priceRanges = [
    { label: "All Price Ranges", value: "" },
    { label: "Under Rp 5 Miliar", value: "under-5b" },
    { label: "Rp 5M – Rp 10 Miliar", value: "5b-10b" },
    { label: "Rp 10M – Rp 25 Miliar", value: "10b-25b" },
    { label: "Above Rp 25 Miliar", value: "above-25b" },
  ];

  const handleExecuteSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const filterPayload = {
      status: activeTab === "Buy" ? "For Sale" : activeTab === "Rent" ? "For Rent" : "Commercial",
      city: city === "All Locations" ? "" : city,
      type: propertyType === "All Property Types" ? "" : propertyType,
      priceRange: priceRange,
    };

    if (onSearch) {
      onSearch(filterPayload);
    } else {
      // Navigate to /properties with query parameters
      const params = new URLSearchParams();
      if (filterPayload.status) params.set("status", filterPayload.status);
      if (filterPayload.city) params.set("city", filterPayload.city);
      if (filterPayload.type) params.set("type", filterPayload.type);
      if (filterPayload.priceRange) params.set("price", filterPayload.priceRange);

      router.push(`/properties?${params.toString()}`);
    }
  };

  return (
    <section
      id="property-search-section"
      className={`relative z-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8 ${
        standalone ? "py-12" : "-mt-10 sm:-mt-14 mb-16 sm:mb-24"
      }`}
    >
      <div className="bg-white border border-lumea-border rounded-lg shadow-lumea-card p-4 sm:p-6 lg:p-8">
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-lumea-border">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-lumea-accent font-semibold">
              FIND YOUR PLACE
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl text-lumea-primary mt-0.5">
              Refined Property Search
            </h2>
          </div>

          {/* Mode Tabs: Buy | Rent | Commercial */}
          <div className="inline-flex p-1 bg-lumea-bg border border-lumea-border rounded-md w-full sm:w-auto">
            {(["Buy", "Rent", "Commercial"] as const).map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 sm:flex-none px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all duration-200 min-h-[40px] ${
                    active
                      ? "bg-lumea-primary text-white shadow-sm"
                      : "text-lumea-secondary hover:text-lumea-primary"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Fields Form */}
        <form onSubmit={handleExecuteSearch} className="pt-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Location field */}
          <div className="space-y-1.5">
            <label htmlFor="search-location" className="block text-xs uppercase tracking-wider font-semibold text-lumea-secondary">
              Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-lumea-accent absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="search-location"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-lumea-bg border border-lumea-border rounded-sm text-sm text-lumea-primary focus:border-lumea-accent transition-colors cursor-pointer min-h-[48px]"
              >
                <option value="">Where are you looking?</option>
                {locationsList.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Property Type field */}
          <div className="space-y-1.5">
            <label htmlFor="search-type" className="block text-xs uppercase tracking-wider font-semibold text-lumea-secondary">
              Property Type
            </label>
            <div className="relative">
              <Home className="w-4 h-4 text-lumea-accent absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="search-type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-lumea-bg border border-lumea-border rounded-sm text-sm text-lumea-primary focus:border-lumea-accent transition-colors cursor-pointer min-h-[48px]"
              >
                <option value="">Property Type</option>
                {typesList.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Range field */}
          <div className="space-y-1.5">
            <label htmlFor="search-price" className="block text-xs uppercase tracking-wider font-semibold text-lumea-secondary">
              Price Range
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-lumea-accent absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="search-price"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-lumea-bg border border-lumea-border rounded-sm text-sm text-lumea-primary focus:border-lumea-accent transition-colors cursor-pointer min-h-[48px]"
              >
                {priceRanges.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-lumea-primary text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-lumea-accent transition-colors duration-200 flex items-center justify-center gap-2 min-h-[48px] shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>Search Properties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="mt-5 pt-4 border-t border-lumea-border/60 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-lumea-secondary font-medium">Popular Inquiries:</span>
          {["Canggu Freehold Villa", "Menteng Diplomatic Manor", "SCBD Sky Penthouse", "Uluwatu Oceanfront"].map(
            (tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  if (tag.includes("Canggu")) setCity("Bali");
                  if (tag.includes("Menteng") || tag.includes("SCBD")) setCity("Jakarta");
                  if (tag.includes("Villa")) setPropertyType("Villa");
                  if (tag.includes("Penthouse")) setPropertyType("Apartment");
                }}
                className="px-2.5 py-1 bg-lumea-bg hover:bg-lumea-surface border border-lumea-border/80 rounded-full text-lumea-secondary hover:text-lumea-primary transition-colors text-[11px]"
              >
                {tag}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import { Property, PropertyType } from "@/types/property";
import { propertiesData } from "@/data/properties";
import PropertyCard from "./PropertyCard";
import { Search, RotateCcw, SlidersHorizontal, LayoutGrid, List } from "lucide-react";

interface PropertyExplorerProps {
  initialType?: string;
  initialCity?: string;
  initialStatus?: string;
  initialPrice?: string;
  title?: string;
  subtitle?: string;
}

export default function PropertyExplorer({
  initialType = "All",
  initialCity = "All",
  initialStatus = "All",
  initialPrice = "All",
  title = "PROPERTY EXPLORER",
  subtitle = "Discover our comprehensive portfolio across Indonesia.",
}: PropertyExplorerProps) {
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [selectedStatus, setSelectedStatus] = useState<string>(initialStatus);
  const [selectedPrice, setSelectedPrice] = useState<string>(initialPrice);
  const [selectedBeds, setSelectedBeds] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const typeTabs = ["All", "House", "Villa", "Apartment", "Land", "Commercial"];
  const cities = ["All", "Bali", "Jakarta", "Surabaya", "Malang", "Yogyakarta", "Semarang"];
  const priceOptions = [
    { label: "All Prices", value: "All" },
    { label: "Under Rp 5B", value: "under-5b" },
    { label: "Rp 5B – Rp 10B", value: "5b-10b" },
    { label: "Rp 10B – Rp 25B", value: "10b-25b" },
    { label: "Above Rp 25B", value: "above-25b" },
  ];

  // Dynamic filter logic
  const filteredProperties = useMemo(() => {
    return propertiesData.filter((property) => {
      // Type filter
      if (selectedType !== "All" && property.type !== selectedType) {
        return false;
      }
      // City filter
      if (selectedCity !== "All" && property.city !== selectedCity) {
        return false;
      }
      // Status filter
      if (selectedStatus !== "All" && property.status !== selectedStatus) {
        return false;
      }
      // Bedrooms filter
      if (selectedBeds !== "All") {
        const bedNum = parseInt(selectedBeds);
        if (bedNum === 5 && property.bedrooms < 5) return false;
        if (bedNum < 5 && property.bedrooms !== bedNum) return false;
      }
      // Price range filter
      if (selectedPrice !== "All") {
        if (selectedPrice === "under-5b" && property.price >= 5000000000) return false;
        if (selectedPrice === "5b-10b" && (property.price < 5000000000 || property.price > 10000000000)) return false;
        if (selectedPrice === "10b-25b" && (property.price < 10000000000 || property.price > 25000000000)) return false;
        if (selectedPrice === "above-25b" && property.price <= 25000000000) return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(query);
        const matchesLocation = property.location.toLowerCase().includes(query);
        const matchesCity = property.city.toLowerCase().includes(query);
        const matchesDesc = property.description.some((d) => d.toLowerCase().includes(query));
        if (!matchesTitle && !matchesLocation && !matchesCity && !matchesDesc) {
          return false;
        }
      }
      return true;
    });
  }, [selectedType, selectedCity, selectedStatus, selectedPrice, selectedBeds, searchQuery]);

  const handleClearFilters = () => {
    setSelectedType("All");
    setSelectedCity("All");
    setSelectedStatus("All");
    setSelectedPrice("All");
    setSelectedBeds("All");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedType !== "All" ||
    selectedCity !== "All" ||
    selectedStatus !== "All" ||
    selectedPrice !== "All" ||
    selectedBeds !== "All" ||
    searchQuery.trim().length > 0;

  return (
    <section id="property-explorer-section" className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-[1px] w-6 bg-lumea-accent" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-lumea-accent">
              {title}
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-lumea-primary font-normal leading-tight">
            {subtitle}
          </h2>
        </div>

        {/* View Mode & Filter Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm border transition-colors min-h-[40px] ${
              showAdvanced
                ? "bg-lumea-primary text-white border-lumea-primary"
                : "bg-white text-lumea-primary border-lumea-border hover:border-lumea-accent"
            }`}
            aria-expanded={showAdvanced}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {hasActiveFilters && "•"}</span>
          </button>

          <div className="hidden sm:inline-flex p-1 bg-white border border-lumea-border rounded-md">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "grid" ? "bg-lumea-surface text-lumea-primary" : "text-lumea-secondary hover:text-lumea-primary"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "list" ? "bg-lumea-surface text-lumea-primary" : "text-lumea-secondary hover:text-lumea-primary"
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-lumea-border/80 mb-6">
        {typeTabs.map((type) => {
          const active = selectedType === type;
          return (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-sm whitespace-nowrap transition-all duration-200 min-h-[44px] ${
                active
                  ? "bg-lumea-primary text-white shadow-sm"
                  : "bg-white border border-lumea-border text-lumea-secondary hover:text-lumea-primary hover:border-lumea-accent/40"
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* Advanced Filter Panel */}
      {showAdvanced && (
        <div className="bg-white border border-lumea-border rounded-lg p-5 sm:p-6 mb-8 shadow-sm space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Location */}
            <div>
              <label htmlFor="filter-city" className="block text-xs uppercase tracking-wider font-semibold text-lumea-secondary mb-1">
                City / Region
              </label>
              <select
                id="filter-city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-lumea-bg border border-lumea-border rounded-sm text-lumea-primary focus:border-lumea-accent"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All Locations" : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label htmlFor="filter-price" className="block text-xs uppercase tracking-wider font-semibold text-lumea-secondary mb-1">
                Price Bracket
              </label>
              <select
                id="filter-price"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-lumea-bg border border-lumea-border rounded-sm text-lumea-primary focus:border-lumea-accent"
              >
                {priceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label htmlFor="filter-beds" className="block text-xs uppercase tracking-wider font-semibold text-lumea-secondary mb-1">
                Bedrooms
              </label>
              <select
                id="filter-beds"
                value={selectedBeds}
                onChange={(e) => setSelectedBeds(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-lumea-bg border border-lumea-border rounded-sm text-lumea-primary focus:border-lumea-accent"
              >
                <option value="All">Any Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="filter-status" className="block text-xs uppercase tracking-wider font-semibold text-lumea-secondary mb-1">
                Ownership / Status
              </label>
              <select
                id="filter-status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-lumea-bg border border-lumea-border rounded-sm text-lumea-primary focus:border-lumea-accent"
              >
                <option value="All">All Statuses</option>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </select>
            </div>
          </div>

          {/* Search bar inside filter */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-lumea-secondary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by neighborhood, architectural feature, or title..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-lumea-bg border border-lumea-border rounded-sm focus:border-lumea-accent text-lumea-primary placeholder:text-lumea-secondary/60"
              />
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-lumea-secondary hover:text-lumea-primary transition-colors whitespace-nowrap min-h-[44px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Results Header Counter */}
      <div className="flex items-center justify-between text-xs text-lumea-secondary mb-6">
        <span>
          Showing <strong className="text-lumea-primary">{filteredProperties.length}</strong> of{" "}
          {propertiesData.length} properties
        </span>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-lumea-accent hover:underline font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Property Results Stage */}
      {filteredProperties.length === 0 ? (
        /* Empty State */
        <div className="bg-white border border-lumea-border rounded-xl p-12 sm:p-16 text-center flex flex-col items-center justify-center my-6">
          <div className="w-16 h-16 rounded-full bg-lumea-bg border border-lumea-border flex items-center justify-center mb-4">
            <Search className="w-7 h-7 text-lumea-secondary/50" />
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl text-lumea-primary mb-2">
            No properties match your current filters.
          </h3>
          <p className="text-sm text-lumea-secondary max-w-md leading-relaxed mb-6">
            Try adjusting your location, property type, or price range. Alternatively, speak with our advisor to access confidential off-market listings.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-lumea-primary text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-lumea-accent transition-colors min-h-[44px]"
            >
              Clear Filters
            </button>
          </div>
        </div>
      ) : (
        /* Results Grid */
        <div
          className={`grid gap-6 sm:gap-8 transition-opacity duration-300 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
}

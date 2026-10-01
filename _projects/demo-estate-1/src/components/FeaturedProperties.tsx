"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types/property";
import { propertiesData } from "@/data/properties";
import PropertyCard from "./PropertyCard";
import { useFavorites } from "@/context/FavoritesContext";
import { useInquiry } from "@/context/InquiryContext";
import { ArrowRight, Heart, Bed, Bath, Maximize, MapPin, Sparkles } from "lucide-react";

export default function FeaturedProperties() {
  const featured = propertiesData.filter((p) => p.featured);
  const heroProperty = featured[0]; // Modern Tropical Villa
  const secondaryProperties = featured.slice(1, 4);

  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useInquiry();
  const heroFavorited = isFavorite(heroProperty.id);

  const handleHeroFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(heroProperty.id);
    addToast({
      type: "info",
      title: heroFavorited ? "Removed from Saved" : "Saved to Collection",
      message: heroFavorited
        ? `"${heroProperty.title}" removed from your curated list.`
        : `"${heroProperty.title}" added to your curated list.`,
    });
  };

  return (
    <section className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-[1px] w-6 bg-lumea-accent" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-lumea-accent">
              FEATURED PROPERTIES
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-lumea-primary font-normal leading-tight">
            Selected properties from our collection.
          </h2>
        </div>

        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-lumea-primary hover:text-lumea-accent transition-colors pb-1 border-b border-lumea-primary hover:border-lumea-accent w-fit min-h-[44px]"
        >
          <span>View All Properties ({propertiesData.length})</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Editorial Layout: Hero Feature Card + 3 Supporting Cards */}
      <div className="space-y-10 sm:space-y-12">
        {/* Flagship Hero Feature Card */}
        <div className="group bg-white border border-lumea-border rounded-xl overflow-hidden shadow-lumea-subtle hover:shadow-lumea-card transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Column */}
            <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto min-h-[340px] sm:min-h-[440px] overflow-hidden bg-lumea-surface">
              <Link href={`/properties/${heroProperty.slug}`} className="block w-full h-full">
                <Image
                  src={heroProperty.images[0]}
                  alt={heroProperty.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  priority
                />
              </Link>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 pointer-events-none">
                <span className="px-3 py-1 bg-lumea-primary/90 backdrop-blur-sm text-white text-[11px] uppercase tracking-widest font-semibold rounded-sm">
                  {heroProperty.status}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-lumea-accent text-white text-[11px] uppercase tracking-widest font-semibold rounded-sm shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  FLAGSHIP CURATION
                </span>
              </div>

              {/* Heart Toggle */}
              <button
                onClick={handleHeroFavorite}
                className={`absolute top-4 right-4 z-10 p-3 rounded-full transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  heroFavorited
                    ? "bg-white text-lumea-accent shadow-lg scale-105"
                    : "bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm"
                }`}
                aria-label={heroFavorited ? "Remove flagship from saved" : "Save flagship to collection"}
              >
                <Heart
                  className={`w-5 h-5 ${heroFavorited ? "fill-lumea-accent text-lumea-accent scale-110" : ""}`}
                />
              </button>

              <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/65 backdrop-blur-sm text-white text-xs rounded-sm">
                  <MapPin className="w-3.5 h-3.5 text-lumea-accent" />
                  {heroProperty.location}
                </span>
              </div>
            </div>

            {/* Editorial Narrative Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center justify-between text-xs text-lumea-secondary mb-3">
                  <span className="uppercase tracking-[0.2em] font-semibold text-lumea-accent">
                    {heroProperty.type} • {heroProperty.city}
                  </span>
                  <span className="text-lumea-secondary">{heroProperty.certificate}</span>
                </div>

                <h3 className="font-editorial text-3xl sm:text-4xl text-lumea-primary font-normal leading-tight mb-3">
                  <Link
                    href={`/properties/${heroProperty.slug}`}
                    className="hover:text-lumea-accent transition-colors"
                  >
                    {heroProperty.title}
                  </Link>
                </h3>

                <p className="text-sm text-lumea-secondary leading-relaxed line-clamp-3 mb-6">
                  {heroProperty.description[0]}
                </p>

                {/* Price Display */}
                <div className="mb-6 p-4 rounded-md bg-lumea-bg border border-lumea-border">
                  <span className="text-[11px] uppercase tracking-wider text-lumea-secondary block mb-1">
                    Offered At
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-lumea-primary">
                    {heroProperty.priceDisplay}
                  </div>
                </div>

                {/* Specifications Grid */}
                <div className="grid grid-cols-3 gap-3 text-center mb-8">
                  <div className="p-2.5 rounded bg-lumea-bg/60 border border-lumea-border/60">
                    <div className="flex items-center justify-center gap-1.5 text-lumea-primary font-semibold text-sm">
                      <Bed className="w-4 h-4 text-lumea-accent" />
                      <span>{heroProperty.bedrooms} Beds</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-lumea-bg/60 border border-lumea-border/60">
                    <div className="flex items-center justify-center gap-1.5 text-lumea-primary font-semibold text-sm">
                      <Bath className="w-4 h-4 text-lumea-accent" />
                      <span>{heroProperty.bathrooms} Baths</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-lumea-bg/60 border border-lumea-border/60">
                    <div className="flex items-center justify-center gap-1.5 text-lumea-primary font-semibold text-sm">
                      <Maximize className="w-4 h-4 text-lumea-accent" />
                      <span>{heroProperty.buildingArea} m²</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-lumea-border flex items-center justify-between">
                <Link
                  href={`/properties/${heroProperty.slug}`}
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-lumea-primary text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-lumea-accent transition-colors min-h-[44px]"
                >
                  <span>View Full Property</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-lumea-secondary hidden sm:inline">
                  Ref. #LUM-{heroProperty.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Secondary Editorial Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {secondaryProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </div>
    </section>
  );
}

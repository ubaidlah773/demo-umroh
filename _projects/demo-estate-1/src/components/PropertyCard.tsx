"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types/property";
import { useFavorites } from "@/context/FavoritesContext";
import { useInquiry } from "@/context/InquiryContext";
import { Heart, ArrowRight, Bed, Bath, Maximize, MapPin } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export default function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useInquiry();
  const favorited = isFavorite(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
    addToast({
      type: "info",
      title: favorited ? "Removed from Saved" : "Saved to Collection",
      message: favorited
        ? `"${property.title}" removed from your curated list.`
        : `"${property.title}" added to your curated list.`,
    });
  };

  return (
    <article className="group bg-white border border-lumea-border rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lumea-card hover:border-lumea-accent/40">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-lumea-surface">
        <Link href={`/properties/${property.slug}`} className="block w-full h-full" tabIndex={-1}>
          <Image
            src={property.images[0]}
            alt={`${property.title} in ${property.location}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority={priority}
          />
        </Link>

        {/* Status / Category Badge */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className="px-2.5 py-1 bg-lumea-primary/85 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest font-medium rounded-sm">
            {property.status}
          </span>
          {property.tag && (
            <span className="px-2.5 py-1 bg-lumea-accent text-white text-[10px] uppercase tracking-widest font-medium rounded-sm shadow-sm">
              {property.tag}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center ${
            favorited
              ? "bg-white text-lumea-accent shadow-md scale-105"
              : "bg-black/35 hover:bg-black/60 text-white backdrop-blur-sm"
          }`}
          aria-label={favorited ? `Remove ${property.title} from favorites` : `Save ${property.title} to favorites`}
          title={favorited ? "Saved" : "Save Property"}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              favorited ? "fill-lumea-accent text-lumea-accent scale-110" : ""
            }`}
          />
        </button>

        {/* City Location Tag */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white/95 text-[11px] rounded-sm">
            <MapPin className="w-3 h-3 text-lumea-accent" />
            {property.city}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Property Type & Specs Row */}
          <div className="flex items-center justify-between text-xs text-lumea-secondary mb-1.5">
            <span className="uppercase tracking-widest font-medium text-lumea-accent">
              {property.type}
            </span>
            <span>{property.certificate}</span>
          </div>

          {/* Title */}
          <h3 className="font-editorial text-xl sm:text-2xl text-lumea-primary font-medium group-hover:text-lumea-accent transition-colors leading-snug">
            <Link href={`/properties/${property.slug}`}>
              {property.title}
            </Link>
          </h3>

          {/* Sub Location */}
          <p className="text-xs text-lumea-secondary mt-1 line-clamp-1">
            {property.location}
          </p>

          {/* Price */}
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-lumea-primary">
              {property.priceDisplay}
            </span>
            {property.pricePeriod && (
              <span className="text-xs text-lumea-secondary">{property.pricePeriod}</span>
            )}
          </div>
        </div>

        {/* Key Specifications Grid */}
        <div className="pt-3 border-t border-lumea-border/60 grid grid-cols-3 gap-2 text-center text-xs text-lumea-secondary">
          <div className="flex flex-col items-center justify-center p-1.5 rounded bg-lumea-bg/60">
            <div className="flex items-center gap-1 text-lumea-primary font-medium">
              <Bed className="w-3.5 h-3.5 text-lumea-accent" />
              <span>{property.bedrooms > 0 ? property.bedrooms : "—"}</span>
            </div>
            <span className="text-[10px] mt-0.5 text-lumea-secondary">Beds</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1.5 rounded bg-lumea-bg/60">
            <div className="flex items-center gap-1 text-lumea-primary font-medium">
              <Bath className="w-3.5 h-3.5 text-lumea-accent" />
              <span>{property.bathrooms > 0 ? property.bathrooms : "—"}</span>
            </div>
            <span className="text-[10px] mt-0.5 text-lumea-secondary">Baths</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1.5 rounded bg-lumea-bg/60">
            <div className="flex items-center gap-1 text-lumea-primary font-medium">
              <Maximize className="w-3.5 h-3.5 text-lumea-accent" />
              <span>{property.buildingArea > 0 ? `${property.buildingArea}m²` : `${property.landArea}m²`}</span>
            </div>
            <span className="text-[10px] mt-0.5 text-lumea-secondary">
              {property.buildingArea > 0 ? "Building" : "Land"}
            </span>
          </div>
        </div>

        {/* View Property Action */}
        <div className="pt-1 flex items-center justify-between">
          <Link
            href={`/properties/${property.slug}`}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-lumea-primary group-hover:text-lumea-accent transition-colors min-h-[44px]"
          >
            <span>View Property</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 duration-200" />
          </Link>
        </div>
      </div>
    </article>
  );
}

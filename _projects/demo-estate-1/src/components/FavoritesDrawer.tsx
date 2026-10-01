"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { useInquiry } from "@/context/InquiryContext";
import { X, Trash2, ArrowRight, Heart } from "lucide-react";

export default function FavoritesDrawer() {
  const { isDrawerOpen, setIsDrawerOpen, favoriteProperties, toggleFavorite, clearFavorites } =
    useFavorites();
  const { openInquiry } = useInquiry();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, setIsDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Saved properties drawer">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-lumea-primary/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="relative w-full max-w-md bg-lumea-bg border-l border-lumea-border h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-lumea-border bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-lumea-accent fill-lumea-accent" />
            <h2 className="font-editorial text-2xl text-lumea-primary">Saved Properties</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-lumea-surface text-lumea-secondary font-medium">
              {favoriteProperties.length}
            </span>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 text-lumea-secondary hover:text-lumea-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close saved properties drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {favoriteProperties.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-lumea-secondary">
              <div className="w-16 h-16 rounded-full bg-white border border-lumea-border flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-lumea-secondary/40" />
              </div>
              <h3 className="font-editorial text-xl text-lumea-primary mb-1">Your Curated Collection is Empty</h3>
              <p className="text-sm leading-relaxed max-w-xs mb-6">
                Click the heart icon on any property to save listings for comparison and consultation.
              </p>
              <Link
                href="/properties"
                onClick={() => setIsDrawerOpen(false)}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-lumea-primary text-white text-xs uppercase tracking-widest font-medium hover:bg-lumea-accent transition-colors"
              >
                Browse Properties
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {favoriteProperties.map((property) => (
                <div
                  key={property.id}
                  className="group bg-white border border-lumea-border rounded-md p-3 flex gap-3 relative hover:border-lumea-accent/60 transition-colors shadow-sm"
                >
                  <div className="relative w-24 h-24 shrink-0 rounded overflow-hidden bg-lumea-surface">
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-lumea-accent font-medium">
                        {property.city} • {property.type}
                      </span>
                      <h4 className="font-editorial text-lg text-lumea-primary truncate leading-snug mt-0.5">
                        <Link
                          href={`/properties/${property.slug}`}
                          onClick={() => setIsDrawerOpen(false)}
                          className="hover:text-lumea-accent transition-colors"
                        >
                          {property.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-lumea-secondary truncate">{property.location}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-lumea-border/40">
                      <span className="text-xs font-semibold text-lumea-primary">
                        {property.priceDisplay}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleFavorite(property.id)}
                          className="p-1.5 text-lumea-secondary hover:text-red-600 transition-colors"
                          aria-label={`Remove ${property.title} from saved`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {favoriteProperties.length > 0 && (
          <div className="p-6 border-t border-lumea-border bg-white space-y-3">
            <button
              onClick={() => {
                setIsDrawerOpen(false);
                openInquiry();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-lumea-primary text-white text-xs uppercase tracking-widest font-medium hover:bg-lumea-accent transition-colors rounded-sm"
            >
              Inquire on Saved Listings
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={clearFavorites}
              className="w-full py-2 text-xs text-lumea-secondary hover:text-lumea-primary transition-colors text-center"
            >
              Clear All Saved
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

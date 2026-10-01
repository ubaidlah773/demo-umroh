import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { locationsData } from "@/data/locations";
import { ArrowRight, MapPin, ChevronRight, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Prime Regional Enclaves | LUMÉA",
  description:
    "Explore luxury residential enclaves across Bali, Jakarta, Surabaya, Malang, Yogyakarta, and Semarang curated by LUMÉA Property Advisory.",
};

export default function LocationsPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24">
      {/* Breadcrumb & Header */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <nav className="flex items-center gap-2 text-xs text-lumea-secondary mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-lumea-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-lumea-secondary/60" />
          <span className="text-lumea-primary font-medium">Locations</span>
        </nav>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-[1px] w-6 bg-lumea-accent" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-lumea-accent">
              REGIONAL ENCLAVES
            </span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-lumea-primary font-normal leading-tight">
            Discover Indonesia&apos;s Prime Destinations
          </h1>
          <p className="text-base sm:text-lg text-lumea-secondary mt-3 leading-relaxed">
            From the coastal sanctuaries of Bali to Jakarta&apos;s diplomatic avenues and cool mountain retreats, discover the character, zoning, and lifestyle of each location.
          </p>
        </div>
      </div>

      {/* Locations Editorial Cards Grid */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {locationsData.map((loc, index) => {
          const isReversed = index % 2 !== 0;
          return (
            <div
              key={loc.id}
              className="bg-white border border-lumea-border rounded-xl overflow-hidden shadow-lumea-subtle hover:shadow-lumea-card transition-all duration-300"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 ${isReversed ? "lg:flex-row-reverse" : ""}`}>
                <div className={`relative lg:col-span-7 aspect-[16/10] lg:aspect-auto min-h-[300px] sm:min-h-[400px] bg-lumea-surface ${isReversed ? "lg:order-2" : ""}`}>
                  <Image
                    src={loc.image}
                    alt={`${loc.name}, Indonesia`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-sm text-lumea-primary text-xs uppercase tracking-wider font-semibold rounded-sm">
                      <MapPin className="w-3.5 h-3.5 text-lumea-accent" />
                      {loc.name}, {loc.province}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-sm">
                      {loc.propertyCount} Active Curated Listings
                    </span>
                  </div>
                </div>

                <div className={`lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${isReversed ? "lg:order-1" : ""}`}>
                  <div>
                    <h2 className="font-editorial text-3xl sm:text-4xl text-lumea-primary font-normal leading-tight mb-2">
                      {loc.name}
                    </h2>
                    <p className="font-editorial text-lg text-lumea-secondary italic mb-4">
                      {loc.headline}
                    </p>
                    <p className="text-sm text-lumea-secondary leading-relaxed mb-6">
                      {loc.description}
                    </p>

                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-lumea-accent font-semibold block mb-2">
                        Key Neighborhoods:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {loc.popularAreas.map((area) => (
                          <span
                            key={area}
                            className="px-2.5 py-1 rounded bg-lumea-bg border border-lumea-border text-xs text-lumea-primary font-medium"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-lumea-border mt-8 flex items-center justify-between">
                    <Link
                      href={`/properties?city=${encodeURIComponent(loc.name)}`}
                      className="inline-flex items-center gap-2 py-3 px-6 bg-lumea-primary text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-lumea-accent transition-colors min-h-[44px]"
                    >
                      <span>View {loc.name} Listings</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

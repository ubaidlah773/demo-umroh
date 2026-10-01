import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { locationsData } from "@/data/locations";
import { propertiesData } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import { ArrowLeft, MapPin, ChevronRight, Compass } from "lucide-react";

interface CityPageProps {
  params: {
    city: string;
  };
}

export async function generateStaticParams() {
  return locationsData.map((loc) => ({
    city: loc.id,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const loc = locationsData.find(
    (l) => l.id.toLowerCase() === params.city.toLowerCase() || l.name.toLowerCase() === params.city.toLowerCase()
  );

  if (!loc) {
    return { title: "Location Not Found | LUMÉA" };
  }

  return {
    title: `${loc.name} Luxury Real Estate | LUMÉA Property`,
    description: loc.description,
    openGraph: {
      title: `${loc.name} Curated Properties`,
      description: loc.headline,
      images: [{ url: loc.image }],
    },
  };
}

export default function CityDetailPage({ params }: CityPageProps) {
  const loc = locationsData.find(
    (l) => l.id.toLowerCase() === params.city.toLowerCase() || l.name.toLowerCase() === params.city.toLowerCase()
  );

  if (!loc) {
    notFound();
  }

  const cityProperties = propertiesData.filter(
    (p) => p.city.toLowerCase() === loc.name.toLowerCase()
  );

  return (
    <div className="pt-28 sm:pt-36 pb-24">
      {/* Breadcrumb */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex items-center gap-2 text-xs text-lumea-secondary" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-lumea-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-lumea-secondary/60" />
          <Link href="/locations" className="hover:text-lumea-primary transition-colors">
            Locations
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-lumea-secondary/60" />
          <span className="text-lumea-primary font-medium">{loc.name}</span>
        </nav>
      </div>

      {/* Hero Showcase for Enclave */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative aspect-[21/9] sm:aspect-[24/9] min-h-[280px] w-full rounded-xl overflow-hidden bg-lumea-surface border border-lumea-border mb-8">
          <Image
            src={loc.image}
            alt={loc.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 z-10 text-white max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded text-xs uppercase tracking-wider mb-2 font-medium">
              <MapPin className="w-3.5 h-3.5 text-lumea-accent-light" />
              {loc.name}, {loc.province}
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-white mb-2">
              {loc.name} Properties
            </h1>
            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
              {loc.headline}
            </p>
          </div>
        </div>

        {/* Popular Areas Chips */}
        <div className="flex flex-wrap items-center gap-2 p-4 bg-white border border-lumea-border rounded-lg">
          <span className="text-xs uppercase tracking-wider font-semibold text-lumea-primary flex items-center gap-1.5 mr-2">
            <Compass className="w-4 h-4 text-lumea-accent" />
            Featured Neighborhoods:
          </span>
          {loc.popularAreas.map((area) => (
            <span
              key={area}
              className="px-3 py-1 bg-lumea-bg border border-lumea-border rounded text-xs text-lumea-secondary font-medium"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Properties List */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-lumea-border">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-lumea-accent font-semibold">
              CURATED LISTINGS
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl text-lumea-primary font-normal">
              Available Properties in {loc.name} ({cityProperties.length})
            </h2>
          </div>

          <Link
            href="/properties"
            className="text-xs uppercase tracking-widest font-semibold text-lumea-secondary hover:text-lumea-primary transition-colors flex items-center gap-1 min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Cities</span>
          </Link>
        </div>

        {cityProperties.length === 0 ? (
          <div className="p-12 text-center bg-white border border-lumea-border rounded-lg">
            <p className="font-editorial text-xl text-lumea-primary mb-2">
              New properties in {loc.name} coming soon.
            </p>
            <p className="text-xs text-lumea-secondary mb-4">
              Contact our private desk for off-market listings in this region.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-lumea-primary text-white text-xs uppercase tracking-wider font-medium rounded-sm"
            >
              Contact Advisor
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {cityProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

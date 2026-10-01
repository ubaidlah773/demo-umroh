import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { propertiesData } from "@/data/properties";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyDetailsGrid from "@/components/PropertyDetailsGrid";
import PropertyLocationMap from "@/components/PropertyLocationMap";
import StickyAgentContact from "@/components/StickyAgentContact";
import MobileStickyBar from "@/components/MobileStickyBar";
import PropertyCard from "@/components/PropertyCard";
import PropertyDescription from "./PropertyDescription";
import { ArrowLeft, MapPin, Bed, Bath, Maximize, Share2, Check } from "lucide-react";

interface PropertyDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return propertiesData.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({
  params,
}: PropertyDetailPageProps): Promise<Metadata> {
  const property = propertiesData.find((p) => p.slug === params.slug);
  if (!property) {
    return {
      title: "Property Not Found | LUMÉA",
    };
  }

  return {
    title: `${property.title} in ${property.location} | LUMÉA Property`,
    description: property.tagline || property.description[0],
    openGraph: {
      title: `${property.title} • ${property.priceDisplay}`,
      description: property.description[0],
      images: [
        {
          url: property.images[0],
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
  };
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const property = propertiesData.find((p) => p.slug === params.slug);

  if (!property) {
    notFound();
  }

  // Similar properties from same city or same type
  const similarProperties = propertiesData
    .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 3);

  // Schema.org RealEstateListing structured data
  const listingJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description.join(" "),
    url: `https://lumeaproperty.com/properties/${property.slug}`,
    image: property.images,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
    },
    geo: property.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: property.coordinates.lat,
          longitude: property.coordinates.lng,
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd) }}
      />

      <div className="pt-28 sm:pt-36 pb-24 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Back to Properties Link */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-lumea-secondary hover:text-lumea-primary transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Properties</span>
          </Link>

          <span className="text-xs text-lumea-secondary font-medium">
            Ref. #{property.id.toUpperCase()}
          </span>
        </div>

        {/* Property Header Row */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded bg-lumea-primary text-white text-[10px] uppercase tracking-wider font-semibold">
                {property.status}
              </span>
              <span className="px-2.5 py-1 rounded bg-lumea-accent text-white text-[10px] uppercase tracking-wider font-semibold">
                {property.type}
              </span>
              {property.tag && (
                <span className="px-2.5 py-1 rounded bg-lumea-surface text-lumea-primary border border-lumea-border text-[10px] uppercase tracking-wider font-semibold">
                  {property.tag}
                </span>
              )}
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-lumea-primary font-normal leading-tight">
              {property.title}
            </h1>

            <p className="flex items-center gap-1.5 text-sm sm:text-base text-lumea-secondary mt-1.5">
              <MapPin className="w-4 h-4 text-lumea-accent" />
              <span>{property.location}</span>
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs uppercase tracking-wider text-lumea-secondary block mb-0.5">
              Acquisition Price
            </span>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-lumea-primary">
              {property.priceDisplay}
            </div>
          </div>
        </div>

        {/* Large Image Gallery Component (1 primary + 2 supporting + Lightbox) */}
        <div className="mb-12">
          <PropertyGallery property={property} />
        </div>

        {/* Key Quick Specifications Banner */}
        <div className="bg-white border border-lumea-border rounded-lg p-5 sm:p-6 mb-12 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x-0 sm:divide-x divide-lumea-border/60">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-lumea-primary font-semibold text-lg">
                <Bed className="w-5 h-5 text-lumea-accent" />
                <span>{property.bedrooms > 0 ? property.bedrooms : "—"}</span>
              </div>
              <span className="text-xs text-lumea-secondary uppercase tracking-wider">Bedrooms</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-lumea-primary font-semibold text-lg">
                <Bath className="w-5 h-5 text-lumea-accent" />
                <span>{property.bathrooms > 0 ? property.bathrooms : "—"}</span>
              </div>
              <span className="text-xs text-lumea-secondary uppercase tracking-wider">Bathrooms</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-lumea-primary font-semibold text-lg">
                <Maximize className="w-5 h-5 text-lumea-accent" />
                <span>{property.buildingArea > 0 ? `${property.buildingArea} m²` : "—"}</span>
              </div>
              <span className="text-xs text-lumea-secondary uppercase tracking-wider">Building Area</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-lumea-primary font-semibold text-lg">
                <Maximize className="w-5 h-5 text-lumea-accent" />
                <span>{property.landArea > 0 ? `${property.landArea} m²` : "—"}</span>
              </div>
              <span className="text-xs text-lumea-secondary uppercase tracking-wider">Land Area</span>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Narrative & Grids (Left 8 Cols) + Sticky Agent (Right 4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Description, Specs, Amenities, Location */}
          <div className="lg:col-span-8 space-y-12">
            {/* ABOUT THE PROPERTY (Interactive Read More) */}
            <PropertyDescription property={property} />

            {/* PROPERTY DETAILS specification grid */}
            <PropertyDetailsGrid property={property} />

            {/* Architectural Features & Amenities */}
            <div className="bg-white border border-lumea-border rounded-lg p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-5 bg-lumea-accent" />
                <h3 className="font-editorial text-2xl text-lumea-primary font-normal">
                  FEATURES & APPOINTMENTS
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {property.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5 text-sm text-lumea-secondary">
                    <Check className="w-4 h-4 text-lumea-accent shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {property.amenities.length > 0 && (
                <div className="pt-6 border-t border-lumea-border/60">
                  <span className="text-xs uppercase tracking-wider text-lumea-secondary font-semibold block mb-3">
                    Lifestyle Amenities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 bg-lumea-bg border border-lumea-border rounded-full text-xs text-lumea-primary font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* LOCATION & NEIGHBORHOOD */}
            <PropertyLocationMap property={property} />
          </div>

          {/* Right Column: Desktop Sticky Agent Contact Card */}
          <div className="hidden lg:block lg:col-span-4">
            <StickyAgentContact property={property} />
          </div>
        </div>

        {/* Similar / Recommended Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-20 pt-16 border-t border-lumea-border">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-lumea-accent font-semibold block mb-1">
                  CURATED COMPLEMENTS
                </span>
                <h3 className="font-editorial text-3xl text-lumea-primary font-normal">
                  Similar Properties You May Like
                </h3>
              </div>
              <Link
                href="/properties"
                className="text-xs uppercase tracking-widest font-semibold text-lumea-primary hover:text-lumea-accent transition-colors"
              >
                Browse All Properties →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Persistent Sticky Bottom CTA */}
      <MobileStickyBar property={property} />
    </>
  );
}

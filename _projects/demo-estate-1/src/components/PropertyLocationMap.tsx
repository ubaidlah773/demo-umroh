import React from "react";
import { Property } from "@/types/property";
import { MapPin, Navigation, Plane, Waves, GraduationCap, Building2, ShoppingBag } from "lucide-react";

interface PropertyLocationMapProps {
  property: Property;
}

export default function PropertyLocationMap({ property }: PropertyLocationMapProps) {
  const getNearbyIcon = (category: string) => {
    switch (category) {
      case "Airport":
        return <Plane className="w-4 h-4 text-lumea-accent" />;
      case "Beach":
        return <Waves className="w-4 h-4 text-lumea-accent" />;
      case "School":
        return <GraduationCap className="w-4 h-4 text-lumea-accent" />;
      case "Hospital":
        return <Building2 className="w-4 h-4 text-lumea-accent" />;
      case "Shopping":
        return <ShoppingBag className="w-4 h-4 text-lumea-accent" />;
      default:
        return <Navigation className="w-4 h-4 text-lumea-accent" />;
    }
  };

  return (
    <div className="bg-white border border-lumea-border rounded-lg p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-[1px] w-5 bg-lumea-accent" />
          <h3 className="font-editorial text-2xl text-lumea-primary font-normal">
            LOCATION & NEIGHBORHOOD
          </h3>
        </div>
        <span className="inline-flex items-center gap-1 text-xs text-lumea-secondary">
          <MapPin className="w-3.5 h-3.5 text-lumea-accent" />
          {property.location}
        </span>
      </div>

      {/* Visually Integrated Interactive Map Canvas Placeholder */}
      <div className="relative w-full aspect-[16/8] sm:aspect-[16/7] rounded-lg overflow-hidden bg-lumea-surface border border-lumea-border flex items-center justify-center p-6 text-center group">
        {/* Subtle grid pattern for cartographic look */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(#171717 1px, transparent 1px), radial-gradient(#171717 1px, #EFECE6 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px",
          }}
        />

        {/* Center Pin Marker */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-lumea-accent opacity-25" />
            <div className="relative p-3 bg-lumea-primary text-white rounded-full shadow-lg border-2 border-white">
              <MapPin className="w-5 h-5 text-lumea-accent" />
            </div>
          </div>
          <div className="mt-3 px-4 py-2 bg-white/95 backdrop-blur-sm border border-lumea-border rounded shadow-md max-w-xs">
            <p className="font-editorial text-base text-lumea-primary font-medium">{property.title}</p>
            <p className="text-[11px] text-lumea-secondary">{property.location}</p>
          </div>
        </div>

        <div className="absolute bottom-3 right-3 z-10">
          <span className="px-2.5 py-1 bg-white/90 text-[10px] uppercase tracking-wider text-lumea-secondary rounded border border-lumea-border font-medium">
            Cartographic Blueprint Preview
          </span>
        </div>
      </div>

      {/* Nearby Amenities Distances Table */}
      <div>
        <h4 className="text-xs uppercase tracking-wider text-lumea-secondary font-semibold mb-4">
          Key Distances & Lifestyle Amenities
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {property.nearby.map((place) => (
            <div
              key={place.name}
              className="p-3.5 rounded bg-lumea-bg border border-lumea-border/60 flex items-start gap-3"
            >
              <div className="p-2 rounded bg-white border border-lumea-border/80 shrink-0">
                {getNearbyIcon(place.category)}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase tracking-wider text-lumea-accent font-semibold block">
                  {place.category}
                </span>
                <span className="text-xs font-medium text-lumea-primary block truncate">
                  {place.name}
                </span>
                <span className="text-[11px] text-lumea-secondary block mt-0.5">
                  {place.distance}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

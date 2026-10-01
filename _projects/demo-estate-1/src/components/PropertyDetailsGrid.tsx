import React from "react";
import { Property } from "@/types/property";

interface PropertyDetailsGridProps {
  property: Property;
}

export default function PropertyDetailsGrid({ property }: PropertyDetailsGridProps) {
  const specs = [
    { label: "Property Type", value: property.type },
    { label: "Land Area", value: property.landArea > 0 ? `${property.landArea} m²` : "—" },
    { label: "Building Area", value: property.buildingArea > 0 ? `${property.buildingArea} m²` : "—" },
    { label: "Bedrooms", value: property.bedrooms > 0 ? `${property.bedrooms}` : "—" },
    { label: "Bathrooms", value: property.bathrooms > 0 ? `${property.bathrooms}` : "—" },
    { label: "Parking", value: property.parking },
    { label: "Year Built", value: property.yearBuilt.toString() },
    { label: "Certificate", value: property.certificate },
  ];

  return (
    <div className="bg-white border border-lumea-border rounded-lg p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-6">
        <span className="h-[1px] w-5 bg-lumea-accent" />
        <h3 className="font-editorial text-2xl text-lumea-primary font-normal">
          PROPERTY DETAILS
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 border-t border-lumea-border/60 pt-6">
        {specs.map((item) => (
          <div key={item.label} className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-lumea-secondary font-medium block">
              {item.label}
            </span>
            <span className="text-base sm:text-lg font-medium text-lumea-primary block">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

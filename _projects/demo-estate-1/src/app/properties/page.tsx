import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PropertyExplorer from "@/components/PropertyExplorer";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Curated Property Collection | LUMÉA",
  description:
    "Explore our complete portfolio of hand-selected tropical villas, colonial heritage manors, sky penthouses, and prime land parcels across Indonesia.",
};

interface PropertiesPageProps {
  searchParams?: {
    type?: string;
    city?: string;
    status?: string;
    price?: string;
  };
}

export default function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const initialType = searchParams?.type || "All";
  const initialCity = searchParams?.city || "All";
  const initialStatus = searchParams?.status || "All";
  const initialPrice = searchParams?.price || "All";

  return (
    <div className="pt-28 sm:pt-36 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex items-center gap-2 text-xs text-lumea-secondary" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-lumea-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-lumea-secondary/60" />
          <span className="text-lumea-primary font-medium">Curated Properties</span>
        </nav>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-sm text-lumea-secondary">Loading properties...</div>}>
        <PropertyExplorer
          initialType={initialType}
          initialCity={initialCity}
          initialStatus={initialStatus}
          initialPrice={initialPrice}
          title="PROPERTY COLLECTION"
          subtitle="Discover curated residential and commercial investments."
        />
      </Suspense>
    </div>
  );
}

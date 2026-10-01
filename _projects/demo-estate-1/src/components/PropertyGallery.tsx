"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Property } from "@/types/property";
import GalleryLightbox from "./GalleryLightbox";
import { Images, Maximize2 } from "lucide-react";

interface PropertyGalleryProps {
  property: Property;
}

export default function PropertyGallery({ property }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = property.images;
  const mainImage = images[0];
  const supportingImage1 = images[1] || images[0];
  const supportingImage2 = images[2] || images[0];

  const openLightboxAt = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <div className="relative w-full rounded-xl overflow-hidden bg-lumea-surface border border-lumea-border">
        {/* Gallery Layout: 1 Large Primary + 2 Smaller Supporting Images */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 p-2">
          {/* Main Primary Image */}
          <div
            onClick={() => openLightboxAt(0)}
            className="relative md:col-span-8 aspect-[16/10] md:aspect-[16/11] rounded-lg overflow-hidden group cursor-pointer"
          >
            <Image
              src={mainImage}
              alt={`${property.title} - Main Exterior`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

            {/* Expand indicator */}
            <div className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>

          {/* Supporting Images Column */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-2">
            <div
              onClick={() => openLightboxAt(1)}
              className="relative aspect-[4/3] md:aspect-auto md:h-full rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={supportingImage1}
                alt={`${property.title} - Interior Detail`}
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>

            <div
              onClick={() => openLightboxAt(2)}
              className="relative aspect-[4/3] md:aspect-auto md:h-full rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={supportingImage2}
                alt={`${property.title} - Architectural View`}
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

              {/* View Gallery Badge Button */}
              <div className="absolute bottom-3 right-3 z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightboxAt(0);
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-black/75 hover:bg-black text-white text-xs uppercase tracking-wider font-semibold rounded backdrop-blur-md transition-colors shadow-lg min-h-[38px]"
                >
                  <Images className="w-3.5 h-3.5 text-lumea-accent" />
                  <span>View Gallery ({images.length})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <GalleryLightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={prevImage}
        onNext={nextImage}
        title={property.title}
      />
    </>
  );
}

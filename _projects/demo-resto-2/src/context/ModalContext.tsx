"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { GalleryImage } from "@/data/gallery";

interface ModalContextType {
  isReservationOpen: boolean;
  openReservation: (initialArea?: string) => void;
  closeReservation: () => void;
  defaultArea: string;
  lightboxImage: GalleryImage | null;
  openLightbox: (image: GalleryImage) => void;
  closeLightbox: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [defaultArea, setDefaultArea] = useState<string>("Indoor Dining (AC)");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const openReservation = (initialArea?: string) => {
    if (initialArea) {
      setDefaultArea(initialArea);
    }
    setIsReservationOpen(true);
  };

  const closeReservation = () => {
    setIsReservationOpen(false);
  };

  const openLightbox = (image: GalleryImage) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isReservationOpen,
        openReservation,
        closeReservation,
        defaultArea,
        lightboxImage,
        openLightbox,
        closeLightbox,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

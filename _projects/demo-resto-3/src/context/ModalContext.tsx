"use client";

import React, { createContext, useContext, useState } from "react";
import { GalleryItem } from "@/data/gallery";

interface ModalContextType {
  // Lightbox
  isLightboxOpen: boolean;
  activeGalleryIndex: number;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  nextLightboxImage: (total: number) => void;
  prevLightboxImage: (total: number) => void;

  // Reservation Modal
  isReservationOpen: boolean;
  openReservation: () => void;
  closeReservation: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const openLightbox = (index: number) => {
    setActiveGalleryIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextLightboxImage = (total: number) => {
    setActiveGalleryIndex((prev) => (prev + 1) % total);
  };

  const prevLightboxImage = (total: number) => {
    setActiveGalleryIndex((prev) => (prev - 1 + total) % total);
  };

  const openReservation = () => {
    setIsReservationOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeReservation = () => {
    setIsReservationOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <ModalContext.Provider
      value={{
        isLightboxOpen,
        activeGalleryIndex,
        openLightbox,
        closeLightbox,
        nextLightboxImage,
        prevLightboxImage,
        isReservationOpen,
        openReservation,
        closeReservation,
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

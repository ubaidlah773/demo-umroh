"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Property } from "@/types/property";
import { propertiesData } from "@/data/properties";

interface FavoritesContextType {
  favoriteIds: string[];
  favoriteProperties: Property[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  clearFavorites: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = "lumea_curated_favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavoriteIds(JSON.parse(stored));
      }
    } catch {
      // Graceful fallback if localStorage is unavailable
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Fallback
      }
      return next;
    });
  };

  const isFavorite = (id: string) => favoriteIds.includes(id);

  const clearFavorites = () => {
    setFavoriteIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Fallback
    }
  };

  const favoriteProperties = propertiesData.filter((p) => favoriteIds.includes(p.id));

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds: isMounted ? favoriteIds : [],
        favoriteProperties: isMounted ? favoriteProperties : [],
        isFavorite,
        toggleFavorite,
        clearFavorites,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

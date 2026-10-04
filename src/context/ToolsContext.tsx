'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { TOOLS, ToolItem } from '@/data/tools';

export interface RecentToolEntry {
  toolId: string;
  timestamp: number;
}

interface ToolsContextType {
  recentTools: RecentToolEntry[];
  favorites: string[];
  addRecent: (toolId: string) => void;
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  clearRecent: () => void;
  getRecentToolItems: () => ToolItem[];
  getFavoriteToolItems: () => ToolItem[];
}

const RECENT_KEY = 'admintools_recent_v1';
const FAVORITES_KEY = 'admintools_favorites_v1';

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export function ToolsProvider({ children }: { children: React.ReactNode }) {
  const [recentTools, setRecentTools] = useState<RecentToolEntry[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const storedRecent = localStorage.getItem(RECENT_KEY);
      if (storedRecent) {
        setRecentTools(JSON.parse(storedRecent));
      }
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch {
      // LocalStorage might be disabled or full
    }
    setMounted(true);
  }, []);

  const addRecent = (toolId: string) => {
    setRecentTools((prev) => {
      const filtered = prev.filter((item) => item.toolId !== toolId);
      const updated = [{ toolId, timestamp: Date.now() }, ...filtered].slice(0, 10);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(toolId);
      const updated = exists ? prev.filter((id) => id !== toolId) : [...prev, toolId];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isFavorite = (toolId: string) => {
    return favorites.includes(toolId);
  };

  const clearRecent = () => {
    setRecentTools([]);
    try {
      localStorage.removeItem(RECENT_KEY);
    } catch {}
  };

  const getRecentToolItems = (): ToolItem[] => {
    if (!mounted) return [];
    return recentTools
      .map((entry) => TOOLS.find((t) => t.id === entry.toolId))
      .filter((t): t is ToolItem => Boolean(t));
  };

  const getFavoriteToolItems = (): ToolItem[] => {
    if (!mounted) return [];
    return favorites
      .map((id) => TOOLS.find((t) => t.id === id))
      .filter((t): t is ToolItem => Boolean(t));
  };

  const value = useMemo(
    () => ({
      recentTools,
      favorites,
      addRecent,
      toggleFavorite,
      isFavorite,
      clearRecent,
      getRecentToolItems,
      getFavoriteToolItems,
    }),
    [recentTools, favorites, mounted]
  );

  return <ToolsContext.Provider value={value}>{children}</ToolsContext.Provider>;
}

export function useTools() {
  const context = useContext(ToolsContext);
  if (!context) {
    throw new Error('useTools must be used within a ToolsProvider');
  }
  return context;
}

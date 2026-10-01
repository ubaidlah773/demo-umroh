"use client";

import React, { createContext, useContext, useState } from "react";
import { Property } from "@/types/property";

interface ToastMessage {
  id: string;
  type: "success" | "info" | "error";
  title: string;
  message: string;
}

interface InquiryContextType {
  isOpen: boolean;
  selectedProperty: Property | null;
  openInquiry: (property?: Property) => void;
  closeInquiry: () => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const openInquiry = (property?: Property) => {
    setSelectedProperty(property || null);
    setIsOpen(true);
  };

  const closeInquiry = () => {
    setIsOpen(false);
    setSelectedProperty(null);
  };

  const addToast = (toast: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <InquiryContext.Provider
      value={{
        isOpen,
        selectedProperty,
        openInquiry,
        closeInquiry,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return context;
}

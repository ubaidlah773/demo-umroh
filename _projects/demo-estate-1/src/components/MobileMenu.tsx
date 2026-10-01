"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";
import { useInquiry } from "@/context/InquiryContext";
import { defaultAgent } from "@/data/agent";
import { X, Heart, MessageSquare, Phone, ArrowRight } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { favoriteIds, setIsDrawerOpen } = useFavorites();
  const { openInquiry } = useInquiry();

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navLinks = [
    { label: "Properties", href: "/properties" },
    { label: "Locations", href: "/locations" },
    { label: "About", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-lumea-bg flex flex-col justify-between p-6 sm:p-8 animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-lumea-border">
        <Link
          href="/"
          onClick={onClose}
          className="font-editorial text-2xl tracking-[0.2em] font-semibold text-lumea-primary"
        >
          LUMÉA
        </Link>
        <button
          onClick={onClose}
          className="p-3 text-lumea-primary hover:text-lumea-accent transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white border border-lumea-border"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Nav Links */}
      <div className="py-8 flex-1 flex flex-col justify-center space-y-6">
        <span className="text-[11px] uppercase tracking-widest text-lumea-accent font-semibold">
          Navigation
        </span>
        <nav className="flex flex-col space-y-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`font-editorial text-3xl sm:text-4xl transition-colors min-h-[44px] flex items-center justify-between ${
                  isActive ? "text-lumea-accent font-medium pl-2 border-l-2 border-lumea-accent" : "text-lumea-primary hover:text-lumea-accent"
                }`}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-5 h-5 text-lumea-secondary opacity-60" />
              </Link>
            );
          })}
        </nav>

        {/* Saved properties direct access */}
        <div className="pt-4 border-t border-lumea-border">
          <button
            onClick={() => {
              onClose();
              setIsDrawerOpen(true);
            }}
            className="w-full flex items-center justify-between py-3 text-lumea-primary hover:text-lumea-accent transition-colors min-h-[44px]"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-lumea-accent" />
              <span className="text-base font-medium">Saved Properties</span>
            </div>
            <span className="px-2 py-0.5 text-xs bg-lumea-surface rounded-full text-lumea-primary font-semibold">
              {favoriteIds.length}
            </span>
          </button>
        </div>
      </div>

      {/* Footer / Quick Contact */}
      <div className="pt-6 border-t border-lumea-border space-y-3">
        <button
          onClick={() => {
            onClose();
            openInquiry();
          }}
          className="w-full py-4 bg-lumea-primary text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-lumea-accent transition-colors min-h-[44px] flex items-center justify-center gap-2"
        >
          Contact Advisor
        </button>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <a
            href={`https://wa.me/${defaultAgent.whatsapp}?text=Hello%2C%20I%20would%20like%20to%20consult%20with%20LUM%C3%89A%20Property.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-3 bg-[#25D366]/10 text-lumea-primary border border-[#25D366]/30 rounded-sm text-xs font-semibold min-h-[44px]"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            WhatsApp
          </a>
          <a
            href={`tel:${defaultAgent.phone}`}
            className="flex items-center justify-center gap-2 py-3 px-3 bg-white border border-lumea-border rounded-sm text-xs font-semibold text-lumea-primary min-h-[44px]"
          >
            <Phone className="w-4 h-4 text-lumea-accent" />
            Direct Call
          </a>
        </div>
      </div>
    </div>
  );
}

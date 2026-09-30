"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Utensils, MessageSquare, Sparkles } from "lucide-react";
import { MENU_CATEGORIES, EDITORIAL_MENU, MenuCategory } from "@/data/menu";
import { RESTAURANT_INFO } from "@/data/restaurant";
import { useModal } from "@/context/ModalContext";

export default function MenuPage() {
  const { openReservation } = useModal();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("Signature");

  const scrollToCategory = (cat: MenuCategory) => {
    setActiveCategory(cat);
    const el = document.getElementById(`cat-${cat.toLowerCase().replace(/\s+/g, "-")}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-ivory-100 text-espresso-900 pt-28 sm:pt-36 pb-28 relative">
      {/* Background subtle luxury texture */}
      <div className="absolute inset-0 pattern-texture opacity-30 pointer-events-none" />

      {/* Top Banner & Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-warmgray-500 hover:text-espresso-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO RESTAURANT</span>
          </Link>

          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-600 font-medium">
              A LA CARTE & SIGNATURES
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-espresso-900 tracking-tight mb-4">
            The Dining Menu.
          </h1>

          <p className="text-base sm:text-lg text-warmgray-500 font-light max-w-xl mx-auto leading-relaxed mb-8">
            A thoughtfully curated culinary collection celebrating contemporary Indonesian seafood, coastal Tuban traditions, and heirloom spices.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openReservation()}
              className="px-8 py-3.5 rounded-full bg-espresso-900 hover:bg-champagne-600 text-ivory-100 font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-luxury cursor-pointer flex items-center gap-2"
            >
              <Utensils className="w-3.5 h-3.5 text-champagne-400" />
              <span>BOOK A TABLE</span>
            </button>

            <a
              href={`https://wa.me/${RESTAURANT_INFO.contact.whatsappNumber}?text=${encodeURIComponent(
                "Halo Resto Kayu Manis Tuban, saya ingin bertanya tentang menu spesial dan ketersediaan seafood segar hari ini."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-ivory-50 hover:bg-ivory-200 border border-espresso-900/15 text-espresso-900 font-mono text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-champagne-600" />
              <span>DAILY CATCH INQUIRIES</span>
            </a>
          </div>
        </div>
      </section>

      {/* Sticky Category Bar */}
      <section className="sticky top-16 sm:top-20 z-30 bg-ivory-100/95 backdrop-blur-md border-y border-espresso-900/10 py-3 px-4 sm:px-6 lg:px-8 mb-16 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-start md:justify-center gap-2 overflow-x-auto scrollbar-none py-1">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => scrollToCategory(cat)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-espresso-900 text-ivory-100 font-semibold shadow-sm"
                    : "bg-ivory-50 text-espresso-800 hover:bg-ivory-200 border border-espresso-900/10"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Editorial Menu Sections */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        {MENU_CATEGORIES.map((cat) => {
          const items = EDITORIAL_MENU.filter((item) => item.category === cat);
          if (items.length === 0) return null;

          const anchorId = `cat-${cat.toLowerCase().replace(/\s+/g, "-")}`;

          return (
            <section key={cat} id={anchorId} className="scroll-mt-36">
              {/* Category Header */}
              <div className="flex items-baseline justify-between border-b-2 border-espresso-900 pb-3 mb-8">
                <h2 className="font-serif text-3xl sm:text-4xl text-espresso-900 font-normal tracking-tight">
                  {cat.toUpperCase()}
                </h2>
                <span className="font-mono text-[11px] uppercase tracking-widest text-champagne-700 font-medium">
                  {items.length} {items.length === 1 ? "SELECTION" : "SELECTIONS"}
                </span>
              </div>

              {/* Classic Editorial Dish Rows (Not Boxes / Cards) */}
              <div className="space-y-8 divide-y divide-espresso-900/10">
                {items.map((dish, idx) => (
                  <div
                    key={dish.id}
                    className={`pt-6 first:pt-0 group`}
                  >
                    {/* Top Row: Dish Name .................... Price */}
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-serif text-xl sm:text-2xl text-espresso-900 font-normal group-hover:text-champagne-700 transition-colors">
                          {dish.name}
                        </h3>
                        {dish.tag && (
                          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-champagne-500/15 text-champagne-800 font-medium">
                            {dish.tag}
                          </span>
                        )}
                      </div>

                      {/* Dotted Leader Line for classic printed menu aesthetic */}
                      <div className="hidden sm:block flex-1 border-b border-dotted border-espresso-900/25 mx-2 relative top-[-4px]" />

                      <span className="font-mono text-base sm:text-lg font-semibold text-espresso-900 whitespace-nowrap">
                        {dish.price}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="font-sans text-sm text-warmgray-500 font-light leading-relaxed max-w-2xl">
                      {dish.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Bottom Reservation Callout */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-ivory-50 border border-espresso-900/10 shadow-luxury">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-600 block mb-2 font-medium">
            TABLE SERVICE
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-espresso-900 mb-3">
            Join Us for Dinner Tonight.
          </h3>
          <p className="text-sm sm:text-base text-warmgray-500 font-light max-w-lg mx-auto mb-8">
            Experience our signature Gurami Asam Manis and coastal seafood favorites in Tuban with instant table reservation.
          </p>
          <button
            onClick={() => openReservation()}
            className="px-9 py-4 rounded-full bg-espresso-900 hover:bg-champagne-600 text-ivory-100 font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-luxury cursor-pointer"
          >
            RESERVE A TABLE
          </button>
        </div>
      </section>
    </div>
  );
}

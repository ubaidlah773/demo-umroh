"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useModal } from "@/context/ModalContext";

interface DishItem {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
}

const SIGNATURE_LIST: DishItem[] = [
  {
    id: "gurami-asam-manis",
    name: "Gurami Asam Manis",
    category: "SEAFOOD & FRESHWATER",
    price: "Rp 65.000",
    description: "Crispy fried gurami dressed in our house sweet-sour reduction with fresh pineapple and capsicum.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "gurame-madu-legit",
    name: "Gurame Madu Legit",
    category: "SIGNATURE GRILL",
    price: "Rp 75.000",
    description: "Charcoal-grilled freshwater gurami brushed with raw forest honey and caramelized heritage glaze.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "rajungan-kare",
    name: "Rajungan Kare Tuban",
    category: "COASTAL HERITAGE",
    price: "Rp 95.000",
    description: "Local blue swimmer crab simmered in a rich, aromatic turmeric curry infused with kaffir lime leaves.",
    image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "mie-goreng-seafood",
    name: "Mie Goreng Seafood",
    category: "WOK SPECIALTY",
    price: "Rp 45.000",
    description: "Wok-heir heirloom noodles tossed with wild tiger prawns, tender squid, and seasonal crisp greens.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sop-buntut",
    name: "Sop Buntut Rempah",
    category: "SOUP & BROTH",
    price: "Rp 85.000",
    description: "Slow-braised Australian oxtail in a clear spiced broth with nutmeg, cinnamon, and root vegetables.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
  },
];

export default function SignatureMenu() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { openReservation } = useModal();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };

  return (
    <section id="menu" className="py-24 sm:py-36 bg-ivory-100 text-espresso-900 border-t border-espresso-900/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-600 block mb-3 font-medium">
              CULINARY HIGHLIGHTS
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-espresso-900">
              SIGNATURES.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-espresso-900 hover:text-champagne-600 transition-colors group"
            >
              <span>VIEW FULL MENU</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Navigation arrows for horizontal scroll */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full border border-espresso-900/20 hover:border-espresso-900 hover:bg-espresso-900 hover:text-ivory-100 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 rounded-full border border-espresso-900/20 hover:border-espresso-900 hover:bg-espresso-900 hover:text-ivory-100 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Showcase */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory"
        >
          {SIGNATURE_LIST.map((dish) => (
            <article
              key={dish.id}
              className="flex-shrink-0 w-[300px] sm:w-[380px] snap-start rounded-3xl bg-ivory-50 border border-espresso-900/10 overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with subtle zoom */}
              <div className="relative aspect-[4/3] overflow-hidden bg-ivory-200">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-espresso-900/80 backdrop-blur-md text-ivory-50 font-mono text-xs font-semibold">
                  {dish.price}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-champagne-600 block mb-2">
                    {dish.category}
                  </span>
                  <h3 className="font-serif text-2xl text-espresso-900 font-normal mb-3 group-hover:text-champagne-700 transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-sm text-warmgray-500 font-light leading-relaxed mb-6">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-espresso-900/10 flex items-center justify-between">
                  <button
                    onClick={() => openReservation()}
                    className="font-mono text-xs uppercase tracking-wider text-espresso-900 hover:text-champagne-600 font-medium inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>RESERVE TABLE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[10px] text-warmgray-400 uppercase tracking-widest">
                    FRESH DAILY
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

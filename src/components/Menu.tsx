"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SIGNATURE_DISHES } from "@/data/menu";

export default function Menu() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // Top 7 featured items requested in prompt
  const FEATURED_ITEMS = SIGNATURE_DISHES.slice(0, 7);

  return (
    <section className="py-24 sm:py-32 bg-cream-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Large Typography & Scroll Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="font-mono text-xs tracking-[0.24em] uppercase text-terracotta-500 font-semibold block mb-3">
              FROM OUR KITCHEN
            </span>
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-olive-900 leading-[0.96] tracking-tight">
              WHAT&apos;S <br />
              <span className="italic font-serif text-terracotta-500">COOKING?</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-olive-900 hover:text-terracotta-500 font-semibold transition-colors mr-2"
            >
              <span>EXPLORE ALL DISHES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full border border-olive-900/20 bg-cream-50 hover:bg-terracotta-500 hover:border-terracotta-500 hover:text-cream-50 text-olive-900 flex items-center justify-center transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full border border-olive-900/20 bg-cream-50 hover:bg-terracotta-500 hover:border-terracotta-500 hover:text-cream-50 text-olive-900 flex items-center justify-center transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Menu with Large Editorial Photography */}
        <div
          ref={scrollRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
        >
          {FEATURED_ITEMS.map((dish, idx) => (
            <div
              key={dish.id}
              className="flex-shrink-0 w-[290px] sm:w-[360px] snap-start group flex flex-col justify-between"
            >
              {/* Large Photography */}
              <div className="relative h-[340px] sm:h-[420px] w-full rounded-sm overflow-hidden bg-cream-200 border border-olive-900/10">
                <Image
                  src={dish.image || "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 640px) 290px, 360px"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />

                {/* Editorial Number Tag */}
                <div className="absolute top-4 left-4 font-mono text-xs tracking-widest text-cream-50 bg-olive-900/80 px-2.5 py-1 rounded-sm backdrop-blur-sm">
                  0{idx + 1}
                </div>

                {dish.tag && (
                  <div className="absolute top-4 right-4 font-mono text-[10px] tracking-wider uppercase text-terracotta-500 bg-cream-100/95 px-2.5 py-1 rounded-sm border border-terracotta-500/30">
                    {dish.tag}
                  </div>
                )}
              </div>

              {/* Text Information (No traditional heavy cards) */}
              <div className="pt-5">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-olive-900/50 block">
                  {dish.category}
                </span>
                <h3 className="font-serif text-2xl font-normal text-olive-900 mt-1 mb-2 group-hover:text-terracotta-500 transition-colors">
                  {dish.name}
                </h3>
                <p className="text-xs sm:text-sm text-olive-900/70 font-light leading-relaxed line-clamp-2">
                  {dish.description}
                </p>
                <div className="mt-3 pt-3 border-t border-olive-900/10 flex items-center justify-between text-xs font-mono text-olive-900/60">
                  <span>Authentic Recipe</span>
                  <Link href="/menu" className="text-terracotta-500 hover:underline">
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

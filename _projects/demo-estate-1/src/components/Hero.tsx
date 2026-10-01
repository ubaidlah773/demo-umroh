"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useInquiry } from "@/context/InquiryContext";
import { ArrowDown, ArrowRight, MessageSquare } from "lucide-react";

export default function Hero() {
  const { openInquiry } = useInquiry();

  const handleScrollToSearch = () => {
    const searchSection = document.getElementById("property-search-section");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-lumea-dark">
      {/* Background Cinematic Architectural Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
          alt="LUMÉA luxury architectural villa sanctuary"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 animate-in fade-in zoom-in duration-1000 motion-reduce:transform-none"
        />

        {/* Sophisticated Dual Gradient Overlay for Uncompromised Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/60" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content Stage */}
      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20 sm:pt-36 sm:pb-28 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <span className="h-[1px] w-8 sm:w-12 bg-lumea-accent" />
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-lumea-accent-light">
              PROPERTY, CURATED
            </span>
          </div>

          {/* Large Headline */}
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light leading-[1.05] tracking-tight mb-6 sm:mb-8 text-balance">
            FIND A PLACE <br />
            WORTH COMING <br />
            <span className="italic font-normal text-lumea-accent-light">HOME TO.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-xl text-white/80 font-light max-w-xl leading-relaxed mb-8 sm:mb-10 text-balance">
            Discover carefully selected properties designed around the way you want to live. Private homes, coastal pavilions, and trophy investments across Indonesia.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href="#property-search-section"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSearch();
              }}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-lumea-primary text-xs uppercase tracking-[0.18em] font-semibold rounded-sm hover:bg-lumea-accent hover:text-white transition-all duration-300 shadow-xl min-h-[48px]"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => openInquiry()}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm text-xs uppercase tracking-[0.18em] font-semibold rounded-sm transition-all duration-300 min-h-[48px]"
            >
              <MessageSquare className="w-4 h-4 text-lumea-accent-light" />
              <span>Talk to an Agent</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Scroll Indicator */}
      <button
        onClick={handleScrollToSearch}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors group cursor-pointer"
        aria-label="Scroll to property search"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 group-hover:text-white">
          Scroll to Discover
        </span>
        <ArrowDown className="w-4 h-4 text-lumea-accent-light animate-bounce" />
      </button>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useInquiry } from "@/context/InquiryContext";
import { ArrowRight, MessageSquare } from "lucide-react";

export default function FinalCTA() {
  const { openInquiry } = useInquiry();

  return (
    <section className="relative w-full py-28 sm:py-36 overflow-hidden bg-lumea-dark">
      {/* Background Photography with Calm Tonal Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=80"
          alt="LUMÉA luxury architectural residence at dusk"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/80" />
      </div>

      {/* Content Stage */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="h-[1px] w-6 bg-lumea-accent-light" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-lumea-accent-light">
            YOUR NEXT CHAPTER
          </span>
          <span className="h-[1px] w-6 bg-lumea-accent-light" />
        </div>

        <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-6 text-balance">
          YOUR NEXT PROPERTY <br />
          MIGHT BE CLOSER <br />
          <span className="italic font-normal text-lumea-accent-light">THAN YOU THINK.</span>
        </h2>

        <p className="text-base sm:text-xl text-white/80 font-light max-w-xl mx-auto mb-10 leading-relaxed text-balance">
          Tell us what you&apos;re looking for. <br className="hidden sm:inline" />
          We&apos;ll help you find it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/properties"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-lumea-primary text-xs uppercase tracking-[0.18em] font-semibold rounded-sm hover:bg-lumea-accent hover:text-white transition-all duration-300 min-h-[48px] shadow-lg"
          >
            <span>Start Your Property Search</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => openInquiry()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm text-xs uppercase tracking-[0.18em] font-semibold rounded-sm transition-all duration-300 min-h-[48px]"
          >
            <MessageSquare className="w-4 h-4 text-lumea-accent-light" />
            <span>Schedule Private Consultation</span>
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function RestaurantSpace() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { openReservation } = useModal();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const SPACES = [
    {
      title: "Spacious Dining Area",
      fact: "SPACIOUS DINING",
      description: "Tata ruang makan yang lapang dan sirkulasi udara lega untuk kenyamanan bersantap.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Air Conditioned Room",
      fact: "AIR CONDITIONED",
      description: "Ruangan sejuk ber-AC untuk pengalaman makan yang tenang dan nyaman di tengah terik Tuban.",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Atmospheric Dining Space",
      fact: "FAMILY FRIENDLY",
      description: "Suasana bersahabat dan ramah untuk santap bersama seluruh anggota keluarga lintas usia.",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Large Parking Area",
      fact: "LARGE PARKING",
      description: "Area parkir luas di tepi Jl. Basuki Rachmad yang memuat mobil pribadi hingga bus rombongan.",
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="space" className="py-24 sm:py-32 bg-cream-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: COME AS YOU ARE. STAY FOR THE MEAL. */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-xs tracking-[0.24em] uppercase text-terracotta-500 font-semibold block mb-3">
              RESTAURANT SPACE &amp; COMFORT
            </span>
            <h2 className="font-serif text-5xl sm:text-6xl font-normal text-olive-900 leading-[0.96] tracking-tight">
              COME AS YOU ARE. <br />
              <span className="italic font-serif text-sage-600">STAY FOR THE MEAL.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-olive-900/20 bg-cream-50 hover:bg-terracotta-500 hover:border-terracotta-500 hover:text-cream-50 text-olive-900 flex items-center justify-center transition-colors"
              aria-label="Scroll space left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-olive-900/20 bg-cream-50 hover:bg-terracotta-500 hover:border-terracotta-500 hover:text-cream-50 text-olive-900 flex items-center justify-center transition-colors"
              aria-label="Scroll space right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Mono Facts Pills */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-10 font-mono text-[11px] uppercase tracking-wider text-olive-900">
          <span className="px-3.5 py-1.5 rounded-sm bg-cream-50 border border-olive-900/12">
            SPACIOUS DINING
          </span>
          <span className="px-3.5 py-1.5 rounded-sm bg-cream-50 border border-olive-900/12">
            AIR CONDITIONED
          </span>
          <span className="px-3.5 py-1.5 rounded-sm bg-cream-50 border border-olive-900/12">
            LARGE PARKING
          </span>
          <span className="px-3.5 py-1.5 rounded-sm bg-cream-50 border border-olive-900/12">
            FAMILY FRIENDLY
          </span>
        </div>

        {/* Horizontal Scrolling Image Strip */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory mb-20"
        >
          {SPACES.map((space, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[280px] sm:w-[350px] snap-start group"
            >
              <div className="relative h-[320px] sm:h-[380px] w-full rounded-sm overflow-hidden bg-cream-200 border border-olive-900/10 mb-4">
                <Image
                  src={space.image}
                  alt={space.title}
                  fill
                  sizes="(max-width: 640px) 280px, 350px"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute top-3.5 left-3.5 bg-cream-100/90 backdrop-blur-sm px-2.5 py-1 rounded-sm border border-olive-900/10 font-mono text-[10px] uppercase tracking-wider text-olive-900">
                  {space.fact}
                </div>
              </div>
              <h3 className="font-serif text-xl font-normal text-olive-900 mb-1">
                {space.title}
              </h3>
              <p className="text-xs sm:text-sm text-olive-900/65 font-light leading-relaxed">
                {space.description}
              </p>
            </div>
          ))}
        </div>

        {/* 17 — FAMILY & GATHERING: BRING EVERYONE TO THE TABLE */}
        <div className="p-8 sm:p-14 rounded-sm bg-sage-50 border border-sage-500/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs tracking-[0.24em] uppercase text-terracotta-500 font-semibold block mb-2">
              FOR GATHERINGS &amp; GROUPS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-olive-900 tracking-tight mb-4">
              BRING EVERYONE TO THE TABLE
            </h3>
            <p className="text-base sm:text-lg text-olive-900/80 font-light leading-relaxed max-w-2xl">
              &ldquo;Whether it&apos;s a family dinner, gathering with friends, or a meal with colleagues, Kayu Manis gives everyone a reason to sit down together.&rdquo;
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              onClick={() => openReservation("Family / Group Gathering")}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-sm bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 font-mono text-xs tracking-wider uppercase font-medium transition-all group shadow-sm cursor-pointer"
            >
              <span>PLAN YOUR VISIT</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

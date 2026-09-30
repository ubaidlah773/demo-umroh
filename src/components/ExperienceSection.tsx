"use client";

import React from "react";
import Image from "next/image";

export default function ExperienceSection() {
  const experiences = [
    {
      num: "01",
      title: "THE FOOD",
      tagline: "Exceptional Flavors, Thoughtful Sourcing",
      description:
        "Exceptional dishes crafted with carefully selected ingredients — from fresh catches landed along the Tuban coastline to heirloom spices cooked with precision and heart.",
      image:
        "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80",
    },
    {
      num: "02",
      title: "THE SPACE",
      tagline: "An Atmosphere Tailored for Conversation",
      description:
        "An elegant atmosphere designed for intimate dinners and grand family celebrations alike. Spacious seating, climate-controlled comfort, and serene visual harmony.",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
    },
    {
      num: "03",
      title: "THE SERVICE",
      tagline: "Effortless Warmth Without Stiffness",
      description:
        "Warm, attentive hospitality without unnecessary formality. Our dedicated team anticipates your family's needs so you can focus entirely on savoring the moment.",
      image:
        "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <section id="experience" className="py-24 sm:py-36 bg-ivory-50 text-espresso-900 border-t border-espresso-900/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-600 block mb-3 font-medium">
            HOSPITALITY PILLARS
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-espresso-900 leading-[1.02]">
            THE EXPERIENCE.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-warmgray-500 font-light leading-relaxed">
            Dining at Resto Kayu Manis is guided by three principles that turn an ordinary evening into a memorable gathering.
          </p>
        </div>

        {/* 3 Editorial Horizontal Experience Rows */}
        <div className="space-y-20 sm:space-y-28">
          {experiences.map((exp, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={exp.num}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Image (7 cols) */}
                <div
                  className={`lg:col-span-7 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-espresso-900/10 shadow-luxury bg-ivory-200 group">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-espresso-900/80 backdrop-blur-md text-ivory-100 font-mono text-[11px] tracking-widest uppercase">
                      PILLAR {exp.num}
                    </div>
                  </div>
                </div>

                {/* Text Content (5 cols) */}
                <div
                  className={`lg:col-span-5 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <span className="font-mono text-sm tracking-widest text-champagne-600 font-medium block mb-2">
                    № {exp.num}
                  </span>

                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-espresso-900 tracking-tight mb-2">
                    {exp.title}
                  </h3>

                  <p className="font-serif italic text-lg sm:text-xl text-warmgray-600 font-light mb-4">
                    {exp.tagline}
                  </p>

                  <p className="text-sm sm:text-base text-warmgray-500 font-light leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

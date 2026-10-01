"use client";

import React, { useState } from "react";
import { testimonialsData } from "@/data/testimonials";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((i) => (i === 0 ? testimonialsData.length - 1 : i - 1));
  };

  const next = () => {
    setCurrentIndex((i) => (i === testimonialsData.length - 1 ? 0 : i + 1));
  };

  const current = testimonialsData[currentIndex];

  return (
    <section className="bg-white border-b border-lumea-border py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-[1px] w-6 bg-lumea-accent" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-lumea-accent">
            CLIENT EXPERIENCES
          </span>
          <span className="h-[1px] w-6 bg-lumea-accent" />
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl text-lumea-primary font-normal mb-12 sm:mb-16">
          WHAT OUR CLIENTS SAY
        </h2>

        {/* Testimonial Stage */}
        <div className="relative min-h-[220px] sm:min-h-[260px] flex flex-col justify-between">
          <Quote className="w-10 h-10 text-lumea-accent/30 mx-auto mb-4" />

          {/* Quote text */}
          <blockquote className="font-editorial text-2xl sm:text-3xl md:text-4xl text-lumea-primary font-light leading-relaxed mb-8 italic">
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          {/* Client attribution */}
          <div>
            <div className="font-editorial text-xl text-lumea-primary font-medium">
              {current.client}
            </div>
            <p className="text-xs uppercase tracking-wider text-lumea-secondary mt-1">
              {current.role} • {current.propertyType} ({current.location})
            </p>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="p-3 rounded-full border border-lumea-border bg-lumea-bg hover:bg-lumea-surface text-lumea-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === currentIndex ? "w-8 bg-lumea-accent" : "w-2 bg-lumea-border hover:bg-lumea-secondary"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 rounded-full border border-lumea-border bg-lumea-bg hover:bg-lumea-surface text-lumea-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

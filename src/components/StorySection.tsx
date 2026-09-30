"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function StorySection() {
  return (
    <section id="about" className="py-24 sm:py-36 bg-ivory-100 text-espresso-900 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pattern-texture opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetric Editorial Image Composition (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-espresso-900/10 shadow-luxury bg-ivory-200">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                alt="Crafted Dining Atmosphere"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            {/* Floating Inset Detail Image */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-56 h-56 rounded-2xl overflow-hidden border-4 border-ivory-100 shadow-2xl bg-espresso-900">
              <Image
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
                alt="Culinary Detail"
                fill
                sizes="250px"
                className="object-cover"
              />
            </div>

            {/* Subtle Origin Badge */}
            <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-espresso-900/85 backdrop-blur-md text-ivory-100 font-mono text-[10px] uppercase tracking-[0.25em] border border-champagne-500/30">
              ORIGIN · TUBAN COASTAL
            </div>
          </div>

          {/* Right Column: Editorial Typography (6 cols) */}
          <div className="lg:col-span-6 lg:pl-6">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-600 block mb-4 font-medium">
              OUR STORY
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-espresso-900 leading-[0.98] mb-8">
              CRAFTED WITH <br />
              <span className="italic font-serif text-champagne-600">INTENTION.</span>
            </h2>

            <div className="space-y-6 text-base sm:text-lg text-warmgray-500 font-light leading-relaxed max-w-xl">
              <p>
                Every detail is thoughtfully created — from carefully selected ingredients sourced from local East Java waters to the atmosphere that surrounds every table.
              </p>
              <p className="text-sm sm:text-base text-espresso-900/75">
                Resto Kayu Manis was established with a singular vision: to honor contemporary Indonesian gastronomy while ensuring hospitality feels warm, generous, and effortless.
              </p>
            </div>

            <div className="pt-8 border-t border-espresso-900/10 mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-espresso-900 font-normal block">
                  1,940+
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-warmgray-500">
                  VERIFIED GUEST REVIEWS
                </span>
              </div>
              <div className="h-10 w-px bg-espresso-900/15 hidden sm:block" />
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-champagne-600 font-normal block">
                  4.8 / 5.0
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-warmgray-500">
                  CULINARY EXCELLENCE RATING
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

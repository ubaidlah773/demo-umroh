"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/config/coffeeData";
import { MapPin, Clock, Phone, Navigation, ExternalLink, Sparkles } from "lucide-react";

export default function LocationSection() {
  return (
    <section id="location" className="py-24 md:py-36 bg-espresso-950 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gold-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-gold-500">
            <Sparkles size={13} />
            <span>FLAGSHIP DESTINATION</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-normal tracking-tight">
            VISIT THE HOUSE
          </h2>
          <p className="text-cream-200/70 text-sm sm:text-base font-light pt-1">
            An oasis of sensory calm. Step into the rich scent of freshly roasted beans and warm ambient light.
          </p>
        </div>

        {/* Two-Column Grid: AI-Generated Café Exterior + Location Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: AI-Generated Exterior Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative aspect-[16/10] rounded-3xl overflow-hidden border border-gold-500/25 shadow-2xl group"
          >
            <Image
              src="/images/cafe-exterior.jpg"
              alt="AROMA Coffee House Exterior Storefront"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Live Status Pill */}
            <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-espresso-950/85 backdrop-blur-md border border-gold-500/30 flex items-center gap-2 text-[11px] font-mono tracking-wider text-cream-100">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>NOW WELCOMING GUESTS</span>
            </div>
          </motion.div>

          {/* Right: Location Details Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-8 p-8 sm:p-10 rounded-3xl bg-espresso-900/80 border border-gold-500/20 backdrop-blur-xl shadow-glass-card"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold-500 font-semibold block mb-2">
                FLAGSHIP LOCATION
              </span>
              <h3 className="font-serif text-3xl text-cream-100 font-normal">
                AROMA COFFEE HOUSE
              </h3>
            </div>

            {/* Location Specs */}
            <div className="space-y-6 text-sm text-cream-200/80 font-light">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-gold-400 flex-shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-serif text-base text-cream-100 font-normal">Address</h4>
                  <p className="text-cream-200/70 pt-0.5">{siteConfig.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-gold-400 flex-shrink-0 mt-0.5">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="font-serif text-base text-cream-100 font-normal">Opening Hours</h4>
                  <p className="text-cream-200/70 pt-0.5">{siteConfig.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-gold-400 flex-shrink-0 mt-0.5">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-serif text-base text-cream-100 font-normal">Telephone</h4>
                  <p className="text-cream-200/70 pt-0.5">{siteConfig.phone}</p>
                </div>
              </div>
            </div>

            {/* Prompt Button: "GET DIRECTIONS" */}
            <div className="pt-2">
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.25em] bg-gradient-to-r from-gold-500 via-gold-400 to-caramel-500 text-espresso-950 shadow-gold-glow hover:brightness-110 active:scale-95 transition-all text-center"
              >
                <Navigation size={15} />
                <span>GET DIRECTIONS</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

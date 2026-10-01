"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Music, Calendar, Clock, MapPin, ArrowRight, Radio } from "lucide-react";
import { EVENTS_DATA } from "@/data/events";

export default function LiveMusicSection() {
  const featuredEvent = EVENTS_DATA[0];

  return (
    <section id="live-music" className="py-20 sm:py-28 bg-charcoal-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text & Highlight (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              <Radio className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              LIVE ENTERTAINMENT
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ivory-100 leading-[1.15] mb-4">
              Nights at <span className="gold-gradient-text">D’Sultan</span>
            </h2>

            <p className="font-serif italic text-xl text-gold-300 mb-6">
              “Good food hits different with good music.”
            </p>

            <p className="text-base text-ivory-300 font-light leading-relaxed mb-6">
              Malam di Tuban selalu terasa lebih hidup di D’Sultan. Panggung terbuka kami menghadirkan penampilan live acoustic hingga full band performance yang membawakan tembang-tembang hits, pop nostalgia, dan irama jazz hangat.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800">
                <Music className="w-5 h-5 text-gold-400 mb-2" />
                <h4 className="text-sm font-semibold text-ivory-100 mb-1">Weekend Atmosphere</h4>
                <p className="text-xs text-ivory-400">Jumat & Sabtu malam selalu meriah penuh kehangatan.</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800">
                <Clock className="w-5 h-5 text-gold-400 mb-2" />
                <h4 className="text-sm font-semibold text-ivory-100 mb-1">Evening Dining</h4>
                <p className="text-xs text-ivory-400">Makan malam nikmat tanpa biaya tiket masuk tambahan.</p>
              </div>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-gold-glow group"
            >
              <span>See Upcoming Events</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right Modern Event Poster Card (7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 bg-charcoal-900 shadow-elevated-card group">
              {/* Poster Image Container */}
              <div className="relative h-[340px] sm:h-[420px] w-full">
                <Image
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-cinematic"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/60 to-black/30" />

                {/* Top Poster Badges */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-gold-500/30 text-xs font-semibold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Upcoming Weekend Session
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gold-500 text-charcoal-950 text-xs font-bold uppercase tracking-wider">
                    {featuredEvent.ticketInfo}
                  </span>
                </div>
              </div>

              {/* Poster Content Bottom Details */}
              <div className="p-6 sm:p-8 -mt-16 relative z-10 bg-gradient-to-b from-charcoal-900/95 to-charcoal-900 backdrop-blur-md rounded-t-3xl border-t border-gold-500/20">
                <div className="flex flex-wrap items-center gap-3 text-xs text-gold-400 uppercase tracking-widest font-semibold mb-2">
                  <span>{featuredEvent.genre}</span>
                  <span>•</span>
                  <span>{featuredEvent.artist}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ivory-100 mb-3">
                  {featuredEvent.title}
                </h3>

                <p className="text-sm text-ivory-300 font-light leading-relaxed mb-6">
                  {featuredEvent.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-charcoal-800 text-xs text-ivory-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span>{featuredEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span>{featuredEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span>{featuredEvent.area}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

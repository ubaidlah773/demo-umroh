"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles, ArrowLeft, Instagram, Music, UtensilsCrossed } from "lucide-react";
import { EVENTS_DATA } from "@/data/events";
import { CAFE_INFO } from "@/data/cafeInfo";
import { useModal } from "@/context/ModalContext";

export default function EventsPage() {
  const { openReservation } = useModal();

  return (
    <div className="min-h-screen bg-charcoal-950 text-ivory-100 pt-28 pb-24">
      {/* Top Banner & Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold-400 hover:text-gold-300 mb-6 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4 block mx-auto w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            LIVE MUSIC & HAPPENINGS
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-ivory-100 tracking-tight mb-4">
            Upcoming Events at <span className="gold-gradient-text">D’Sultan</span>
          </h1>

          <p className="text-base sm:text-lg text-ivory-300 font-light max-w-2xl mx-auto leading-relaxed">
            Good food hits different with good music. Temukan jadwal pertunjukan akustik mingguan, weekend live band, dan guest artist spesial di panggung D'Sultan Cafe Tuban.
          </p>
        </div>
      </section>

      {/* Events List */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {EVENTS_DATA.length === 0 ? (
          <div className="text-center py-20 bg-charcoal-900 border border-charcoal-800 rounded-3xl p-8">
            <Music className="w-12 h-12 text-gold-400 mx-auto mb-4 opacity-50" />
            <h3 className="font-serif text-2xl text-ivory-200 font-medium mb-2">
              Stay tuned for our upcoming events.
            </h3>
            <p className="text-sm text-ivory-400 max-w-md mx-auto mb-6">
              Jadwal acara baru sedang dipersiapkan. Pantau selalu akun Instagram kami untuk pengumuman musisi dan jadwal terbaru.
            </p>
            <a
              href={CAFE_INFO.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold-500 text-charcoal-950 text-xs font-semibold uppercase tracking-wider"
            >
              <Instagram className="w-4 h-4" />
              Follow @dsultan.id
            </a>
          </div>
        ) : (
          EVENTS_DATA.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-charcoal-900 border border-gold-500/20 hover:border-gold-500/40 rounded-3xl overflow-hidden shadow-elevated-card grid grid-cols-1 lg:grid-cols-12 transition-all duration-300"
            >
              {/* Event Poster / Image (5 cols) */}
              <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-auto min-h-[280px]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-black/30" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-semibold tracking-wider uppercase text-gold-400">
                    {event.dayOfWeek}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gold-500 text-charcoal-950 text-[10px] font-bold uppercase tracking-wider">
                    {event.ticketInfo}
                  </span>
                </div>
              </div>

              {/* Event Info (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gold-400 uppercase tracking-widest font-semibold mb-2">
                    <span>{event.genre}</span>
                    <span>•</span>
                    <span>Performer: {event.artist}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ivory-100 mb-3">
                    {event.title}
                  </h2>

                  <p className="text-sm sm:text-base text-ivory-300 font-light leading-relaxed mb-6">
                    {event.description}
                  </p>

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-charcoal-850/60 border border-charcoal-800 text-xs text-ivory-300 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gold-400 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] text-ivory-500 uppercase block">Jadwal</span>
                        <span className="font-medium text-ivory-100">{event.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold-400 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] text-ivory-500 uppercase block">Waktu</span>
                        <span className="font-medium text-ivory-100">{event.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] text-ivory-500 uppercase block">Area Panggung</span>
                        <span className="font-medium text-ivory-100">{event.area}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {event.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs text-ivory-400 bg-charcoal-800 px-3 py-1 rounded-full border border-charcoal-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-charcoal-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => openReservation(`Live Music Event: ${event.title}`)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-wider transition-all shadow-gold-glow cursor-pointer"
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    Reserve Table for This Event
                  </button>

                  <a
                    href={CAFE_INFO.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-charcoal-800 hover:bg-charcoal-750 text-ivory-200 border border-charcoal-700 text-xs font-medium transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-gold-400" />
                    Update di Instagram
                  </a>
                </div>
              </div>
            </motion.div>
          ))
        )}

        {/* Instagram Announcement Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-charcoal-900 border border-gold-500/20 text-center max-w-3xl mx-auto">
          <Instagram className="w-8 h-8 text-gold-400 mx-auto mb-3" />
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ivory-100 mb-2">
            Ingin Mengisi Acara atau Kolaborasi Musisi di D'Sultan?
          </h3>
          <p className="text-xs sm:text-sm text-ivory-400 mb-6 max-w-lg mx-auto">
            D’Sultan Cafe selalu membuka panggung bagi talenta musisi, band indie, dan seniman lokal Tuban & sekitarnya. Hubungi tim kami via Instagram Direct Message.
          </p>
          <a
            href={CAFE_INFO.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-wider transition-all shadow-gold-glow"
          >
            Hubungi Kami @dsultan.id
          </a>
        </div>
      </main>
    </div>
  );
}

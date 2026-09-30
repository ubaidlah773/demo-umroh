"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Calendar, Users, MessageSquare, Check, X } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurant";

export default function PrivateEvents() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("Family Gathering");
  const [pax, setPax] = useState("20 - 50 Guests");
  const [phone, setPhone] = useState("");

  const eventTypes = [
    {
      title: "Family Gatherings & Arisan",
      capacity: "10 – 100+ Guests",
      desc: "Long communal tables, multi-course feasts, and dedicated attentive service.",
    },
    {
      title: "Corporate Dinners & Meetings",
      capacity: "10 – 60 Guests",
      desc: "Private air-conditioned halls, discreet service, and customized set menus.",
    },
    {
      title: "Birthdays & Anniversaries",
      capacity: "2 – 40 Guests",
      desc: "Custom table styling, celebratory desserts, and memorable dining pacing.",
    },
    {
      title: "Tour Bus & Travel Transit",
      capacity: "Up to 150+ Guests",
      desc: "Spacious bus and coach parking right by Basuki Rachmad with rapid simultaneous dining.",
    },
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Halo Resto Kayu Manis Tuban, saya ingin konsultasi rencana acara:\n- Jenis Acara: ${eventType}\n- Nama/Instansi: ${eventName}\n- Perkiraan Tamu: ${pax}\n- No. Kontak: ${phone}\nMohon info ketersediaan ruang dan paket menu. Terima kasih.`;
    const url = `https://wa.me/${RESTAURANT_INFO.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setInquiryModalOpen(false);
  };

  return (
    <section id="events" className="py-24 sm:py-36 bg-espresso-950 text-ivory-100 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
          alt="Private Events Space"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/80 to-espresso-950" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-400 block mb-3 font-medium">
            PRIVATE OCCASIONS
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-ivory-50 leading-[1.02]">
            MORE THAN DINNER.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ivory-200/80 font-light leading-relaxed">
            From intimate birthday celebrations to grand corporate dinners and tour group transit, our versatile spaces adapt to your gathering.
          </p>
        </div>

        {/* 4 Occasion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {eventTypes.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-espresso-900/80 border border-ivory-100/10 hover:border-champagne-500/40 backdrop-blur-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-champagne-400 block mb-3">
                  {t.capacity}
                </span>
                <h3 className="font-serif text-2xl text-ivory-50 font-normal mb-3">
                  {t.title}
                </h3>
                <p className="text-sm text-ivory-200/70 font-light leading-relaxed">
                  {t.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-ivory-100/10">
                <span className="font-mono text-[10px] text-warmgray-400 uppercase tracking-widest">
                  TAILORED ARRANGEMENTS
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="p-8 rounded-3xl bg-champagne-500/10 border border-champagne-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div>
            <h4 className="font-serif text-2xl sm:text-3xl text-ivory-50">
              Ready to host your next gathering?
            </h4>
            <p className="text-sm text-ivory-200/80 font-light mt-1">
              Speak directly with our events coordinator for custom tasting menus and floor plans.
            </p>
          </div>

          <button
            onClick={() => setInquiryModalOpen(true)}
            className="px-8 py-4 rounded-full bg-champagne-500 hover:bg-champagne-400 text-espresso-950 font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-champagne-glow cursor-pointer whitespace-nowrap active:scale-95"
          >
            PLAN YOUR EVENT
          </button>
        </div>
      </div>

      {/* Inquiry Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/80 backdrop-blur-md">
          <div className="bg-ivory-50 text-espresso-900 border border-espresso-900/15 rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-ivory-200 text-espresso-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-600 block mb-1">
              PRIVATE EVENTS INQUIRY
            </span>
            <h3 className="font-serif text-3xl font-normal text-espresso-900 mb-2">
              Plan Your Gathering
            </h3>
            <p className="text-xs text-warmgray-500 mb-6">
              Provide basic information and our team will prepare a tailored package for your event.
            </p>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-espresso-900 mb-1">
                  Name / Organization
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PT Bintang Nusantara / Ibu Dewi"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-espresso-900/15 text-sm text-espresso-900 outline-none focus:border-champagne-500"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-espresso-900 mb-1">
                  Event Category
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-espresso-900/15 text-sm text-espresso-900 outline-none cursor-pointer"
                >
                  <option value="Family Gathering & Arisan">Family Gathering & Arisan</option>
                  <option value="Corporate Dinner & Meeting">Corporate Dinner & Meeting</option>
                  <option value="Birthday / Anniversary">Birthday / Anniversary</option>
                  <option value="Tour Bus Transit (Rombongan)">Tour Bus Transit (Rombongan Wisata)</option>
                  <option value="Other Celebration">Other Celebration</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-espresso-900 mb-1">
                    Estimated Guests
                  </label>
                  <select
                    value={pax}
                    onChange={(e) => setPax(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-ivory-100 border border-espresso-900/15 text-sm text-espresso-900 outline-none cursor-pointer"
                  >
                    <option value="10 - 20 Guests">10 – 20 Guests</option>
                    <option value="20 - 50 Guests">20 – 50 Guests</option>
                    <option value="50 - 100 Guests">50 – 100 Guests</option>
                    <option value="100+ Guests">100+ Guests</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-espresso-900 mb-1">
                    WhatsApp Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="08xxxxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-espresso-900/15 text-sm text-espresso-900 outline-none focus:border-champagne-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-espresso-900 hover:bg-champagne-600 text-ivory-100 font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>CONSULT VIA WHATSAPP</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

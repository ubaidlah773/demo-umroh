"use client";

import React from "react";
import { Check, Calendar, Clock, Users, MapPin, Download, Navigation, MessageSquare, Printer, ArrowRight } from "lucide-react";
import Link from "next/link";
import { RESTAURANT_INFO } from "@/data/restaurant";

interface ConfirmationViewProps {
  reservation: {
    bookingCode: string;
    customerName: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    guestCount: number;
    seating: string;
    specialRequest?: string | null;
    occasion?: string | null;
  };
  onReset?: () => void;
}

export default function ConfirmationView({
  reservation,
  onReset,
}: ConfirmationViewProps) {
  const formattedDate = new Date(reservation.date + "T00:00:00").toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  // Generate .ics calendar download
  const handleDownloadICS = () => {
    const [hours, minutes] = reservation.time.split(":").map(Number);
    const [y, m, d] = reservation.date.split("-").map(Number);
    
    // Start date in UTC string
    const startDate = new Date(Date.UTC(y, m - 1, d, hours - 7, minutes)); // WIB is UTC+7
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours dining

    const pad = (n: number) => String(n).padStart(2, "0");
    const formatICSDate = (date: Date) =>
      `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(
        date.getUTCHours()
      )}${pad(date.getUTCMinutes())}00Z`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Resto Kayu Manis//Dining Reservation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${reservation.bookingCode}@restokayumanistuban.com`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:Dinner at Resto Kayu Manis (${reservation.bookingCode})`,
      `DESCRIPTION:Table reservation for ${reservation.guestCount} guests (${reservation.seating}). Booking Code: ${reservation.bookingCode}. Contact: (0356) 331114.`,
      `LOCATION:Jl. Basuki Rachmad No.215-217, Tuban, East Java`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Reservation-${reservation.bookingCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const whatsappMessage = `Halo Resto Kayu Manis Tuban, saya telah melakukan reservasi online dengan Booking ID: ${reservation.bookingCode} atas nama ${reservation.customerName} untuk ${reservation.guestCount} orang pada hari ${formattedDate} pukul ${reservation.time} WIB.`;
  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.contact.whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="w-full max-w-2xl mx-auto text-center py-6 sm:py-10">
      {/* Luxury Checkmark Badge */}
      <div className="w-20 h-20 rounded-full bg-champagne-500/20 border border-champagne-500/40 text-champagne-600 flex items-center justify-center mx-auto mb-6 shadow-champagne-glow">
        <Check className="w-10 h-10 stroke-[2.5]" />
      </div>

      <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-600 font-semibold block mb-2">
        ✓ RESERVATION CONFIRMED
      </span>

      <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-espresso-900 font-normal tracking-tight mb-4">
        YOUR TABLE IS RESERVED.
      </h1>

      <p className="text-base sm:text-lg text-warmgray-500 font-light max-w-md mx-auto mb-8 leading-relaxed">
        We look forward to welcoming you to Resto Kayu Manis for an exceptional dining experience.
      </p>

      {/* Booking Voucher Card */}
      <div className="p-8 sm:p-10 rounded-2xl bg-espresso-900 text-ivory-100 shadow-luxury text-left mb-8 relative overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute right-4 bottom-2 select-none opacity-5 font-serif text-8xl font-bold">
          KAYU MANIS
        </div>

        {/* Top Header of Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-ivory-100/10 gap-3 mb-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne-400 block mb-1">
              OFFICIAL BOOKING VOUCHER
            </span>
            <h3 className="font-serif text-2xl text-ivory-50">
              Resto Kayu Manis Tuban
            </h3>
          </div>
          <div className="text-left sm:text-right">
            <span className="font-mono text-[10px] uppercase tracking-wider text-warmgray-400 block">
              BOOKING ID
            </span>
            <span className="font-mono text-lg font-bold tracking-wider text-champagne-400">
              {reservation.bookingCode}
            </span>
          </div>
        </div>

        {/* Grid Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-warmgray-400 block mb-1">
              GUEST NAME
            </span>
            <p className="font-serif text-xl text-ivory-50">
              {reservation.customerName}
            </p>
            <p className="font-mono text-xs text-ivory-200/70 mt-0.5">
              {reservation.phone}
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-warmgray-400 block mb-1">
              DATE & TIME
            </span>
            <p className="font-serif text-xl text-ivory-50">
              {formattedDate}
            </p>
            <p className="font-mono text-xs text-champagne-400 mt-0.5">
              {reservation.time} WIB
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-warmgray-400 block mb-1">
              SEATING PREFERENCE
            </span>
            <p className="font-serif text-lg text-ivory-50">
              {reservation.seating}
            </p>
            {reservation.occasion && (
              <p className="font-mono text-xs text-champagne-300 mt-0.5">
                Occasion: {reservation.occasion}
              </p>
            )}
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-warmgray-400 block mb-1">
              PARTY SIZE
            </span>
            <p className="font-serif text-lg text-ivory-50">
              {reservation.guestCount} {reservation.guestCount === 1 ? "Guest" : "Guests"}
            </p>
            <p className="text-xs text-ivory-200/70 mt-0.5 font-light">
              Table reserved for 2 hours
            </p>
          </div>
        </div>

        {reservation.specialRequest && (
          <div className="mt-6 pt-4 border-t border-ivory-100/10">
            <span className="font-mono text-[10px] uppercase tracking-wider text-warmgray-400 block mb-1">
              SPECIAL INSTRUCTIONS
            </span>
            <p className="text-xs text-ivory-200/80 italic font-light">
              &ldquo;{reservation.specialRequest}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <button
          type="button"
          onClick={handleDownloadICS}
          className="p-3.5 rounded-xl bg-ivory-50 hover:bg-ivory-200/70 border border-espresso-900/15 text-espresso-900 font-mono text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Calendar className="w-4 h-4 text-champagne-600" />
          <span>ADD TO CALENDAR</span>
        </button>

        <a
          href={RESTAURANT_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-xl bg-ivory-50 hover:bg-ivory-200/70 border border-espresso-900/15 text-espresso-900 font-mono text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Navigation className="w-4 h-4 text-champagne-600" />
          <span>GET DIRECTIONS</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-xl bg-champagne-500 hover:bg-champagne-600 text-espresso-950 font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WHATSAPP VOUCHER</span>
        </a>
      </div>

      {/* Return home / new reservation link */}
      <div className="flex items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider text-warmgray-500">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 hover:text-espresso-900 transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>PRINT VOUCHER</span>
        </button>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="hover:text-espresso-900 transition-colors cursor-pointer"
          >
            MAKE ANOTHER RESERVATION →
          </button>
        )}
      </div>
    </div>
  );
}

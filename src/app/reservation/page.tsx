"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Sparkles, ShieldCheck, Clock, Users, Phone } from "lucide-react";
import ReservationWizard from "@/components/reservation/ReservationWizard";
import { RESTAURANT_INFO } from "@/data/restaurant";

function ReservationContent() {
  const searchParams = useSearchParams();
  const initialDate = searchParams.get("date") || undefined;
  const initialGuests = searchParams.get("guests")
    ? parseInt(searchParams.get("guests")!, 10)
    : undefined;
  const initialTime = searchParams.get("time") || undefined;
  const initialSeating = (searchParams.get("seating") as any) || undefined;

  return (
    <div className="min-h-screen bg-ivory-100 text-espresso-900 pt-28 sm:pt-32 pb-24 relative">
      {/* Background subtle luxury texture */}
      <div className="absolute inset-0 pattern-texture pointer-events-none opacity-40" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb / Return */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-warmgray-500 hover:text-espresso-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO RESTAURANT</span>
          </Link>
        </div>

        {/* Header Hero Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-600 block mb-3 font-medium">
            TABLE RESERVATION · RESTO KAYU MANIS
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-espresso-900 tracking-tight leading-[1.08] mb-4">
            An Effortless Booking Experience.
          </h1>

          <p className="text-base sm:text-lg text-warmgray-500 font-light leading-relaxed">
            Reserve your table in seconds. Instant confirmation and personalized seating for family dining, business dinners, and intimate celebrations.
          </p>
        </div>

        {/* Reservation Wizard Container */}
        <div className="p-6 sm:p-12 rounded-3xl bg-ivory-50 border border-espresso-900/10 shadow-luxury mb-12">
          <ReservationWizard
            initialParams={{
              date: initialDate,
              guests: initialGuests,
              time: initialTime,
              seating: initialSeating,
            }}
          />
        </div>

        {/* Trust & Policy Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-espresso-900/10 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-champagne-600 mb-2" />
            <h4 className="font-serif text-base text-espresso-900 mb-1">
              Guaranteed Seating
            </h4>
            <p className="text-xs text-warmgray-500 font-light leading-relaxed">
              Your table is prepared 15 minutes prior to your arrival time.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Clock className="w-5 h-5 text-champagne-600 mb-2" />
            <h4 className="font-serif text-base text-espresso-900 mb-1">
              Grace Period
            </h4>
            <p className="text-xs text-warmgray-500 font-light leading-relaxed">
              Reservations are held for 15 minutes past booking time.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Phone className="w-5 h-5 text-champagne-600 mb-2" />
            <h4 className="font-serif text-base text-espresso-900 mb-1">
              Direct Inquiries
            </h4>
            <p className="text-xs text-warmgray-500 font-light leading-relaxed">
              Need immediate changes? Call {RESTAURANT_INFO.contact.phone}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReservationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ivory-100 flex items-center justify-center">
          <p className="font-mono text-xs uppercase tracking-widest text-warmgray-500">
            LOADING RESERVATION SYSTEM...
          </p>
        </div>
      }
    >
      <ReservationContent />
    </Suspense>
  );
}

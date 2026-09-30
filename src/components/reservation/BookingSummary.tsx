"use client";

import React from "react";
import { Calendar, Clock, Users, MapPin, User, Phone, Mail, Edit3, Sparkles, CheckCircle2 } from "lucide-react";

interface BookingSummaryProps {
  data: {
    date: string;
    time: string;
    guestCount: number;
    seating: string;
    customerName: string;
    phone: string;
    email: string;
    occasion: string;
    specialRequest: string;
  };
  onEditStep: (stepNumber: number) => void;
  onConfirm: () => void;
  submitting: boolean;
  submitError: string | null;
}

export default function BookingSummary({
  data,
  onEditStep,
  onConfirm,
  submitting,
  submitError,
}: BookingSummaryProps) {
  const formattedDate = data.date
    ? new Date(data.date + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Luxury Summary Card */}
      <div className="p-8 sm:p-10 rounded-2xl bg-ivory-50 border border-espresso-900/10 shadow-luxury mb-8">
        <div className="flex items-center justify-between pb-6 border-b border-espresso-900/10 mb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-600 block mb-1">
              RESERVATION OVERVIEW
            </span>
            <h3 className="font-serif text-3xl text-espresso-900 font-normal">
              Review Your Booking
            </h3>
          </div>
          <span className="font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-champagne-500/20 text-champagne-700 font-medium">
            CONFIRMATION STEP
          </span>
        </div>

        {/* Details Grid */}
        <div className="space-y-5">
          {/* Date & Time */}
          <div className="flex items-start justify-between p-4 rounded-xl bg-ivory-100/70 border border-espresso-900/5">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-champagne-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-warmgray-500 block">
                  DATE & TIME
                </span>
                <p className="font-serif text-lg text-espresso-900 font-medium">
                  {formattedDate}
                </p>
                <p className="font-mono text-xs text-olive-700 mt-0.5">
                  {data.time} WIB (Dining Service)
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="text-xs font-mono uppercase tracking-wider text-champagne-700 hover:text-espresso-900 inline-flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>EDIT</span>
            </button>
          </div>

          {/* Party Size & Seating */}
          <div className="flex items-start justify-between p-4 rounded-xl bg-ivory-100/70 border border-espresso-900/5">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-champagne-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-warmgray-500 block">
                  PARTY & SEATING
                </span>
                <p className="font-serif text-lg text-espresso-900 font-medium">
                  {data.guestCount} {data.guestCount === 1 ? "Guest" : "Guests"}
                </p>
                <p className="text-xs text-warmgray-600 mt-0.5 font-light">
                  Seating: <strong className="font-medium text-espresso-900">{data.seating}</strong>
                  {data.occasion ? ` · ${data.occasion}` : ""}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="text-xs font-mono uppercase tracking-wider text-champagne-700 hover:text-espresso-900 inline-flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>EDIT</span>
            </button>
          </div>

          {/* Guest Contact Details */}
          <div className="flex items-start justify-between p-4 rounded-xl bg-ivory-100/70 border border-espresso-900/5">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-champagne-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-warmgray-500 block">
                  PRIMARY CONTACT
                </span>
                <p className="font-serif text-lg text-espresso-900 font-medium">
                  {data.customerName}
                </p>
                <p className="font-mono text-xs text-warmgray-600 mt-0.5">
                  {data.phone} · {data.email}
                </p>
                {data.specialRequest && (
                  <p className="text-xs text-warmgray-500 italic mt-1 font-light">
                    &ldquo;{data.specialRequest}&rdquo;
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(5)}
              className="text-xs font-mono uppercase tracking-wider text-champagne-700 hover:text-espresso-900 inline-flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>EDIT</span>
            </button>
          </div>
        </div>

        {/* Server Error Notice */}
        {submitError && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            {submitError}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-espresso-900/10 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            disabled={submitting}
            onClick={onConfirm}
            className="w-full sm:flex-1 py-4 px-8 rounded-full bg-espresso-900 hover:bg-champagne-600 text-ivory-100 font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 shadow-luxury flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span>CONFIRMING TABLE...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-champagne-400" />
                <span>CONFIRM RESERVATION</span>
              </>
            )}
          </button>
        </div>

        <p className="font-mono text-[10px] text-warmgray-400 text-center uppercase tracking-widest mt-4">
          INSTANT BOOKING CONFIRMATION · NO BOOKING FEES REQUIRED
        </p>
      </div>
    </div>
  );
}

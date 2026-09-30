"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import DatePicker from "./DatePicker";
import GuestSelector from "./GuestSelector";
import TimeSlotPicker from "./TimeSlotPicker";
import SeatingSelector from "./SeatingSelector";
import CustomerInfo from "./CustomerInfo";
import BookingSummary from "./BookingSummary";
import ConfirmationView from "./ConfirmationView";
import { reservationSchema } from "@/lib/validations/reservation";

export interface InitialBookingParams {
  date?: string;
  guests?: number;
  time?: string;
  seating?: "Indoor" | "Outdoor" | "Private Room";
}

interface ReservationWizardProps {
  initialParams?: InitialBookingParams;
  onSuccess?: (reservation: any) => void;
  isModal?: boolean;
}

export default function ReservationWizard({
  initialParams,
  onSuccess,
  isModal = false,
}: ReservationWizardProps) {
  // Default date: tomorrow
  const getTomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const [step, setStep] = useState<number>(1);
  const [date, setDate] = useState<string>(initialParams?.date || getTomorrowStr());
  const [guestCount, setGuestCount] = useState<number>(initialParams?.guests || 2);
  const [time, setTime] = useState<string>(initialParams?.time || "19:30");
  const [seating, setSeating] = useState<"Indoor" | "Outdoor" | "Private Room">(
    initialParams?.seating || "Indoor"
  );
  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [specialRequest, setSpecialRequest] = useState<string>("");
  const [occasion, setOccasion] = useState<string>("Dining");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedReservation, setConfirmedReservation] = useState<any | null>(null);

  const stepsList = [
    { num: 1, label: "DATE", title: "WHEN ARE YOU JOINING US?" },
    { num: 2, label: "GUESTS", title: "HOW MANY GUESTS?" },
    { num: 3, label: "TIME", title: "CHOOSE YOUR TIME" },
    { num: 4, label: "SEAT", title: "WHERE WOULD YOU LIKE TO SIT?" },
    { num: 5, label: "DETAILS", title: "PRIMARY CONTACT" },
    { num: 6, label: "REVIEW", title: "REVIEW & CONFIRM" },
  ];

  const handleNext = () => {
    setErrors({});
    setSubmitError(null);

    if (step === 1 && !date) {
      setErrors({ date: "Please select a reservation date." });
      return;
    }
    if (step === 2 && (!guestCount || guestCount < 1)) {
      setErrors({ guests: "Please specify at least 1 guest." });
      return;
    }
    if (step === 3 && !time) {
      setErrors({ time: "Please select a dining time slot." });
      return;
    }
    if (step === 4 && !seating) {
      setErrors({ seating: "Please select a seating preference." });
      return;
    }
    if (step === 5) {
      // Validate customer fields
      const validation = reservationSchema.safeParse({
        customerName,
        phone,
        email,
        date,
        time,
        guestCount,
        seating,
        specialRequest,
        occasion,
      });

      if (!validation.success) {
        const fieldErrors: Record<string, string> = {};
        validation.error.issues.forEach((err: any) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }

    if (step < 6) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setSubmitError(null);
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleConfirmReservation = async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          email,
          date,
          time,
          guestCount,
          seating,
          specialRequest,
          occasion,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        let msg = data.error || "Failed to confirm table. Please try again.";
        if (data.alternatives && data.alternatives.length > 0) {
          msg += ` Alternative slots available: ${data.alternatives.join(", ")}.`;
        }
        setSubmitError(msg);
        return;
      }

      setConfirmedReservation(data.data);
      if (onSuccess) onSuccess(data.data);
    } catch (err: any) {
      console.error("Booking submission error:", err);
      setSubmitError("We couldn't connect to the reservation system. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setConfirmedReservation(null);
    setCustomerName("");
    setPhone("");
    setEmail("");
    setSpecialRequest("");
    setOccasion("Dining");
  };

  // If already confirmed, render confirmation view
  if (confirmedReservation) {
    return (
      <ConfirmationView
        reservation={confirmedReservation}
        onReset={handleReset}
      />
    );
  }

  const currentStepInfo = stepsList.find((s) => s.num === step) || stepsList[0];

  return (
    <div className="w-full">
      {/* Step Indicator Bar */}
      <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="flex items-center justify-between relative">
          {/* Background Connecting Line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-espresso-900/10 z-0" />
          
          {stepsList.map((s) => {
            const isPassed = step > s.num;
            const isCurrent = step === s.num;

            return (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (s.num < step) setStep(s.num);
                }}
                disabled={s.num > step}
                className="relative z-10 flex flex-col items-center group cursor-pointer disabled:cursor-default"
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[11px] sm:text-xs transition-all duration-200 ${
                    isCurrent
                      ? "bg-espresso-900 text-ivory-100 font-bold ring-4 ring-champagne-500/30"
                      : isPassed
                      ? "bg-champagne-500 text-espresso-950 font-semibold"
                      : "bg-ivory-100 border border-espresso-900/20 text-warmgray-400"
                  }`}
                >
                  {isPassed ? "✓" : s.num}
                </div>
                <span
                  className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider mt-1.5 hidden sm:block ${
                    isCurrent
                      ? "text-espresso-900 font-semibold"
                      : isPassed
                      ? "text-champagne-700"
                      : "text-warmgray-400"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Header */}
      <div className="text-center mb-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-600 block mb-2 font-medium">
          STEP {step} OF 6
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-espresso-900 tracking-tight">
          {currentStepInfo.title}
        </h2>
      </div>

      {/* Step Content with Animated Switch */}
      <div className="mb-10 min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {step === 1 && (
              <DatePicker
                selectedDate={date}
                onSelectDate={(newDate) => {
                  setDate(newDate);
                }}
              />
            )}

            {step === 2 && (
              <GuestSelector
                guestCount={guestCount}
                onChangeGuestCount={setGuestCount}
              />
            )}

            {step === 3 && (
              <TimeSlotPicker
                date={date}
                partySize={guestCount}
                selectedTime={time}
                onSelectTime={setTime}
              />
            )}

            {step === 4 && (
              <SeatingSelector
                selectedSeating={seating}
                onSelectSeating={setSeating}
                guestCount={guestCount}
              />
            )}

            {step === 5 && (
              <CustomerInfo
                customerName={customerName}
                phone={phone}
                email={email}
                specialRequest={specialRequest}
                occasion={occasion}
                onChangeField={(f, v) => {
                  if (f === "customerName") setCustomerName(v);
                  if (f === "phone") setPhone(v);
                  if (f === "email") setEmail(v);
                  if (f === "specialRequest") setSpecialRequest(v);
                  if (f === "occasion") setOccasion(v);
                }}
                errors={errors}
              />
            )}

            {step === 6 && (
              <BookingSummary
                data={{
                  date,
                  time,
                  guestCount,
                  seating,
                  customerName,
                  phone,
                  email,
                  occasion,
                  specialRequest,
                }}
                onEditStep={(targetStep) => setStep(targetStep)}
                onConfirm={handleConfirmReservation}
                submitting={submitting}
                submitError={submitError}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls (Steps 1 to 5) */}
      {step < 6 && (
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4 pt-6 border-t border-espresso-900/10">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 rounded-full border border-espresso-900/20 text-espresso-900 hover:bg-ivory-200 font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-3.5 rounded-full bg-espresso-900 hover:bg-champagne-600 text-ivory-100 font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 shadow-md inline-flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>CONTINUE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

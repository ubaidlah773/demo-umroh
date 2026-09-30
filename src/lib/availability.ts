import { prisma } from "@/lib/prisma";
import { TIME_SLOTS } from "./validations/reservation";

export const TOTAL_RESTAURANT_CAPACITY = 100;
export const SLOT_MAX_CAPACITY = 30; // Max guests accepted per individual time slot to maintain service pacing

export interface SlotAvailability {
  time: string;
  totalCapacity: number;
  bookedGuests: number;
  availableSeats: number;
  status: "Available" | "Limited" | "Unavailable";
}

export interface DayAvailabilityResult {
  date: string;
  isFullyBooked: boolean;
  totalGuestsBooked: number;
  slots: SlotAvailability[];
}

/**
 * Generate a unique, professional luxury booking code e.g. KS-2026-00128
 */
export function generateBookingCode(): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  return `KS-${year}-${randomSuffix}`;
}

/**
 * Calculate availability for all time slots on a specific date
 */
export async function getDayAvailability(
  date: string,
  partySize: number = 2
): Promise<DayAvailabilityResult> {
  // Query active reservations for the requested date
  const activeReservations = await prisma.reservation.findMany({
    where: {
      date,
      status: {
        in: ["confirmed", "pending"],
      },
    },
    select: {
      time: true,
      guestCount: true,
    },
  });

  // Aggregate booked seats per time slot
  const slotBookings: Record<string, number> = {};
  let totalDayGuests = 0;

  for (const r of activeReservations) {
    slotBookings[r.time] = (slotBookings[r.time] || 0) + r.guestCount;
    totalDayGuests += r.guestCount;
  }

  const slots: SlotAvailability[] = TIME_SLOTS.map((time) => {
    const booked = slotBookings[time] || 0;
    const remaining = Math.max(0, SLOT_MAX_CAPACITY - booked);

    let status: "Available" | "Limited" | "Unavailable" = "Available";
    if (remaining < partySize) {
      status = "Unavailable";
    } else if (remaining <= 8) {
      status = "Limited";
    }

    return {
      time,
      totalCapacity: SLOT_MAX_CAPACITY,
      bookedGuests: booked,
      availableSeats: remaining,
      status,
    };
  });

  const availableSlotsCount = slots.filter((s) => s.status !== "Unavailable").length;

  return {
    date,
    isFullyBooked: availableSlotsCount === 0 || totalDayGuests >= TOTAL_RESTAURANT_CAPACITY,
    totalGuestsBooked: totalDayGuests,
    slots,
  };
}

/**
 * Suggest alternative time slots when the desired slot is full
 */
export async function getAlternativeSlots(
  date: string,
  requestedTime: string,
  partySize: number
): Promise<string[]> {
  const dayAvail = await getDayAvailability(date, partySize);
  return dayAvail.slots
    .filter((s) => s.time !== requestedTime && s.status !== "Unavailable")
    .map((s) => s.time)
    .slice(0, 3);
}

/**
 * Check if the customer already has an active reservation at the exact same date & time
 */
export async function checkDoubleBooking(
  phone: string,
  email: string,
  date: string,
  time: string
): Promise<boolean> {
  const existing = await prisma.reservation.findFirst({
    where: {
      date,
      time,
      status: { in: ["confirmed", "pending"] },
      OR: [
        { phone: phone.trim() },
        { email: email.trim().toLowerCase() },
      ],
    },
  });

  return existing !== null;
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { reservationSchema } from "@/lib/validations/reservation";
import {
  getDayAvailability,
  getAlternativeSlots,
  generateBookingCode,
  checkDoubleBooking,
  SLOT_MAX_CAPACITY,
} from "@/lib/availability";

export const dynamic = "force-dynamic";

/**
 * GET /api/reservations
 * Query params:
 * - ?date=YYYY-MM-DD&guests=N : Get availability breakdown for a given day
 * - ?admin=true&filterDate=YYYY-MM-DD : List reservations for admin management
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const guests = parseInt(searchParams.get("guests") || "2", 10);
    const isAdmin = searchParams.get("admin") === "true";
    const filterDate = searchParams.get("filterDate");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // Admin dashboard list
    if (isAdmin) {
      const where: any = {};
      if (filterDate) {
        where.date = filterDate;
      }
      if (status && status !== "all") {
        where.status = status;
      }
      if (search) {
        where.OR = [
          { customerName: { contains: search } },
          { bookingCode: { contains: search } },
          { phone: { contains: search } },
          { email: { contains: search } },
        ];
      }

      const reservations = await prisma.reservation.findMany({
        where,
        orderBy: [{ date: "asc" }, { time: "asc" }],
      });

      // Today's summary stats
      const todayStr = new Date().toISOString().split("T")[0];
      const todayReservations = await prisma.reservation.findMany({
        where: { date: todayStr, status: { in: ["confirmed", "pending"] } },
      });

      const todayGuests = todayReservations.reduce((sum, r) => sum + r.guestCount, 0);
      const todayAvailable = Math.max(0, 100 - todayGuests);

      return NextResponse.json({
        success: true,
        data: reservations,
        stats: {
          todayCount: todayReservations.length,
          todayGuests,
          todayAvailable,
        },
      });
    }

    // Availability lookup for user booking flow
    if (date) {
      const availability = await getDayAvailability(date, isNaN(guests) ? 2 : guests);
      return NextResponse.json({
        success: true,
        data: availability,
      });
    }

    return NextResponse.json(
      { success: false, error: "Please specify a date or admin parameter." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error in GET /api/reservations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve availability. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reservations
 * Creates a new reservation with Zod validation, double-booking check, and capacity enforcement
 */
export async function POST(request: NextRequest) {
  try {
    const json = await request.json();

    // 1. Zod Validation
    const parseResult = reservationSchema.safeParse(json);
    if (!parseResult.success) {
      const errors = parseResult.error.issues.map((e: any) => e.message);
      return NextResponse.json(
        {
          success: false,
          error: errors[0] || "Invalid reservation details provided.",
          details: errors,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 2. Prevent booking in the past
    const today = new Date().toISOString().split("T")[0];
    if (data.date < today) {
      return NextResponse.json(
        { success: false, error: "Reservations cannot be made for past dates." },
        { status: 400 }
      );
    }

    // 3. Double-Booking Protection (Section 22)
    const isDouble = await checkDoubleBooking(
      data.phone,
      data.email,
      data.date,
      data.time
    );

    if (isDouble) {
      return NextResponse.json(
        {
          success: false,
          error:
            "An active reservation under this contact already exists for the selected date and time. Please contact us directly if you need to adjust your booking.",
        },
        { status: 409 }
      );
    }

    // 4. Capacity & Availability Verification
    const activeInSlot = await prisma.reservation.findMany({
      where: {
        date: data.date,
        time: data.time,
        status: { in: ["confirmed", "pending"] },
      },
      select: { guestCount: true },
    });

    const currentBookedGuests = activeInSlot.reduce((sum, r) => sum + r.guestCount, 0);
    const remainingSeats = SLOT_MAX_CAPACITY - currentBookedGuests;

    if (remainingSeats < data.guestCount) {
      const alternatives = await getAlternativeSlots(data.date, data.time, data.guestCount);
      return NextResponse.json(
        {
          success: false,
          error: "Unfortunately, this time slot is fully booked.",
          alternatives,
        },
        { status: 409 }
      );
    }

    // 5. Generate unique booking ID and persist
    let bookingCode = generateBookingCode();
    // Ensure uniqueness
    let attempts = 0;
    while (attempts < 5) {
      const existingCode = await prisma.reservation.findUnique({
        where: { bookingCode },
      });
      if (!existingCode) break;
      bookingCode = generateBookingCode();
      attempts++;
    }

    const reservation = await prisma.reservation.create({
      data: {
        bookingCode,
        customerName: data.customerName.trim(),
        phone: data.phone.trim(),
        email: data.email.trim().toLowerCase(),
        date: data.date,
        time: data.time,
        guestCount: data.guestCount,
        seating: data.seating,
        specialRequest: data.specialRequest?.trim() || null,
        occasion: data.occasion?.trim() || null,
        status: "confirmed",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your table has been reserved successfully.",
        data: reservation,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { success: false, error: "A server error occurred. Please try again." },
      { status: 500 }
    );
  }
}

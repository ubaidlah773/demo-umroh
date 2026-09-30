import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * PATCH /api/reservations/[id]
 * Update status or details of a reservation (Admin actions)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const allowedStatuses = ["confirmed", "pending", "completed", "cancelled", "no_show"];
    if (body.status && !allowedStatuses.includes(body.status)) {
      return NextResponse.json(
        { success: false, error: "Invalid reservation status." },
        { status: 400 }
      );
    }

    const updated = await prisma.reservation.update({
      where: { id },
      data: {
        ...(body.status ? { status: body.status } : {}),
        ...(body.seating ? { seating: body.seating } : {}),
        ...(body.specialRequest !== undefined ? { specialRequest: body.specialRequest } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      message: `Reservation marked as ${updated.status}.`,
      data: updated,
    });
  } catch (error: any) {
    console.error("Error updating reservation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update reservation." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/reservations/[id]
 * Fetch single reservation by ID or bookingCode
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const reservation = await prisma.reservation.findFirst({
      where: {
        OR: [{ id }, { bookingCode: id }],
      },
    });

    if (!reservation) {
      return NextResponse.json(
        { success: false, error: "Reservation not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: reservation,
    });
  } catch (error: any) {
    console.error("Error fetching reservation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reservation." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/reservations/[id]
 * Cancels a reservation
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const cancelled = await prisma.reservation.update({
      where: { id },
      data: { status: "cancelled" },
    });

    return NextResponse.json({
      success: true,
      message: "Reservation cancelled.",
      data: cancelled,
    });
  } catch (error: any) {
    console.error("Error cancelling reservation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to cancel reservation." },
      { status: 500 }
    );
  }
}

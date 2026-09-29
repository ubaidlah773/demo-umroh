import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { items } = await req.json();
    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Items array is required." }, { status: 400 });
    }

    // Execute atomic update for each item order
    await prisma.$transaction(
      items.map((item: { id: string; displayOrder: number; number?: string }) =>
        prisma.project.update({
          where: { id: item.id },
          data: {
            displayOrder: item.displayOrder,
            number: item.number || String(item.displayOrder).padStart(2, "0"),
          },
        })
      )
    );

    return NextResponse.json({ success: true, message: "Projects reordered successfully." });
  } catch (error) {
    console.error("Reorder projects error:", error);
    return NextResponse.json({ error: "Failed to reorder projects." }, { status: 500 });
  }
}

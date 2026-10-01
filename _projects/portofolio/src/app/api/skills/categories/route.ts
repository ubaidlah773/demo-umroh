import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { category, description, displayOrder } = await req.json();
    if (!category) {
      return NextResponse.json({ error: "Category name is required." }, { status: 400 });
    }

    const count = await prisma.skillCategory.count();
    const created = await prisma.skillCategory.create({
      data: {
        category,
        description: description || "",
        displayOrder: typeof displayOrder === "number" ? displayOrder : count + 1,
      },
    });

    return NextResponse.json({ success: true, category: created }, { status: 201 });
  } catch (error) {
    console.error("Create skill category error:", error);
    return NextResponse.json({ error: "Failed to create category." }, { status: 500 });
  }
}

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

    await prisma.$transaction(
      items.map((item: { id: string; displayOrder: number }) =>
        prisma.skillCategory.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        })
      )
    );

    return NextResponse.json({ success: true, message: "Categories reordered successfully." });
  } catch (error) {
    console.error("Reorder categories error:", error);
    return NextResponse.json({ error: "Failed to reorder categories." }, { status: 500 });
  }
}

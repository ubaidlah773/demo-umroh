import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const categories = await prisma.skillCategory.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        skills: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Fetch skills error:", error);
    return NextResponse.json({ error: "Failed to fetch skills." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const { categoryId, name, tag, level, icon, displayOrder } = body;

    if (!categoryId || !name) {
      return NextResponse.json(
        { error: "Category ID and skill name are required." },
        { status: 400 }
      );
    }

    const count = await prisma.skill.count({ where: { categoryId } });
    const skill = await prisma.skill.create({
      data: {
        categoryId,
        name,
        tag: tag || null,
        level: level || null,
        icon: icon || null,
        displayOrder: typeof displayOrder === "number" ? displayOrder : count + 1,
      },
    });

    return NextResponse.json({ success: true, skill }, { status: 201 });
  } catch (error) {
    console.error("Create skill error:", error);
    return NextResponse.json({ error: "Failed to create skill." }, { status: 500 });
  }
}

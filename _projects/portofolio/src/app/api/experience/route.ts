import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get("publishedOnly") === "true";

    const where = publishedOnly ? { published: true } : {};

    const experiences = await prisma.experience.findMany({
      where,
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({ experiences });
  } catch (error) {
    console.error("Fetch experiences error:", error);
    return NextResponse.json({ error: "Failed to fetch experiences." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const { company, role, period, location, type, responsibilities, technologies, published } =
      body;

    if (!company || !role || !period) {
      return NextResponse.json(
        { error: "Company, role, and period are required." },
        { status: 400 }
      );
    }

    const count = await prisma.experience.count();

    const experience = await prisma.experience.create({
      data: {
        company,
        role,
        period,
        location: location || "Tuban, Indonesia",
        type: type || "Freelance",
        responsibilities:
          typeof responsibilities === "string"
            ? responsibilities
            : JSON.stringify(responsibilities || []),
        technologies:
          typeof technologies === "string"
            ? technologies
            : JSON.stringify(technologies || []),
        displayOrder: count + 1,
        published: published !== undefined ? !!published : true,
      },
    });

    return NextResponse.json({ success: true, experience }, { status: 201 });
  } catch (error) {
    console.error("Create experience error:", error);
    return NextResponse.json({ error: "Failed to create experience." }, { status: 500 });
  }
}

// PUT: Reorder experiences
export async function PUT(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { items } = await req.json();
    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Items array is required." }, { status: 400 });
    }

    await prisma.$transaction(
      items.map((item: { id: string; displayOrder: number }) =>
        prisma.experience.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        })
      )
    );

    return NextResponse.json({ success: true, message: "Experiences reordered successfully." });
  } catch (error) {
    console.error("Reorder experiences error:", error);
    return NextResponse.json({ error: "Failed to reorder experiences." }, { status: 500 });
  }
}

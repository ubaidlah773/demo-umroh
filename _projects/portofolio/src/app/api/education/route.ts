import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ education });
  } catch (error) {
    console.error("Fetch education error:", error);
    return NextResponse.json({ error: "Failed to fetch education entries." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const { institution, degree, period, gradeLabel, gradeValue, achievements, coursework, competencies, displayOrder } =
      body;

    if (!institution || !degree) {
      return NextResponse.json(
        { error: "Institution and degree are required." },
        { status: 400 }
      );
    }

    const count = await prisma.education.count();
    const entry = await prisma.education.create({
      data: {
        institution,
        degree,
        period: period || "2021 – 2025",
        gradeLabel: gradeLabel || "GPA",
        gradeValue: gradeValue || "",
        achievements:
          typeof achievements === "string" ? achievements : JSON.stringify(achievements || []),
        coursework:
          typeof coursework === "string" ? coursework : JSON.stringify(coursework || []),
        competencies:
          typeof competencies === "string" ? competencies : JSON.stringify(competencies || []),
        displayOrder: typeof displayOrder === "number" ? displayOrder : count + 1,
      },
    });

    return NextResponse.json({ success: true, education: entry }, { status: 201 });
  } catch (error) {
    console.error("Create education error:", error);
    return NextResponse.json({ error: "Failed to create education entry." }, { status: 500 });
  }
}

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
        prisma.education.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        })
      )
    );

    return NextResponse.json({ success: true, message: "Education entries reordered." });
  } catch (error) {
    console.error("Reorder education error:", error);
    return NextResponse.json({ error: "Failed to reorder education entries." }, { status: 500 });
  }
}

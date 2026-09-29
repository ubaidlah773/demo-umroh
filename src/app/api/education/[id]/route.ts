import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

interface Params {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const { institution, degree, period, gradeLabel, gradeValue, achievements, coursework, competencies, displayOrder } =
      body;

    const updateData: any = {};
    if (institution !== undefined) updateData.institution = institution;
    if (degree !== undefined) updateData.degree = degree;
    if (period !== undefined) updateData.period = period;
    if (gradeLabel !== undefined) updateData.gradeLabel = gradeLabel;
    if (gradeValue !== undefined) updateData.gradeValue = gradeValue;
    if (achievements !== undefined) {
      updateData.achievements =
        typeof achievements === "string" ? achievements : JSON.stringify(achievements);
    }
    if (coursework !== undefined) {
      updateData.coursework =
        typeof coursework === "string" ? coursework : JSON.stringify(coursework);
    }
    if (competencies !== undefined) {
      updateData.competencies =
        typeof competencies === "string" ? competencies : JSON.stringify(competencies);
    }
    if (displayOrder !== undefined) updateData.displayOrder = Number(displayOrder);

    const updated = await prisma.education.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, education: updated });
  } catch (error) {
    console.error("Update education error:", error);
    return NextResponse.json({ error: "Failed to update education." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = params;
    await prisma.education.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Education entry deleted." });
  } catch (error) {
    console.error("Delete education error:", error);
    return NextResponse.json({ error: "Failed to delete education." }, { status: 500 });
  }
}

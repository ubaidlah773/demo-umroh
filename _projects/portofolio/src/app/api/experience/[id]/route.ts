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
    const { company, role, period, location, type, responsibilities, technologies, published, displayOrder } =
      body;

    const updateData: any = {};
    if (company !== undefined) updateData.company = company;
    if (role !== undefined) updateData.role = role;
    if (period !== undefined) updateData.period = period;
    if (location !== undefined) updateData.location = location;
    if (type !== undefined) updateData.type = type;
    if (responsibilities !== undefined) {
      updateData.responsibilities =
        typeof responsibilities === "string" ? responsibilities : JSON.stringify(responsibilities);
    }
    if (technologies !== undefined) {
      updateData.technologies =
        typeof technologies === "string" ? technologies : JSON.stringify(technologies);
    }
    if (published !== undefined) updateData.published = !!published;
    if (displayOrder !== undefined) updateData.displayOrder = Number(displayOrder);

    const experience = await prisma.experience.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, experience });
  } catch (error) {
    console.error("Update experience error:", error);
    return NextResponse.json({ error: "Failed to update experience." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = params;
    await prisma.experience.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Experience deleted successfully." });
  } catch (error) {
    console.error("Delete experience error:", error);
    return NextResponse.json({ error: "Failed to delete experience." }, { status: 500 });
  }
}

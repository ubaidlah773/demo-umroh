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
    const { categoryId, name, tag, level, icon, displayOrder } = body;

    const updateData: any = {};
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (name !== undefined) updateData.name = name;
    if (tag !== undefined) updateData.tag = tag;
    if (level !== undefined) updateData.level = level;
    if (icon !== undefined) updateData.icon = icon;
    if (displayOrder !== undefined) updateData.displayOrder = Number(displayOrder);

    const skill = await prisma.skill.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, skill });
  } catch (error) {
    console.error("Update skill error:", error);
    return NextResponse.json({ error: "Failed to update skill." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = params;
    await prisma.skill.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Skill deleted successfully." });
  } catch (error) {
    console.error("Delete skill error:", error);
    return NextResponse.json({ error: "Failed to delete skill." }, { status: 500 });
  }
}

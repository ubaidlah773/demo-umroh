import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { deleteUploadedFile } from "@/lib/storage";

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
    const { altText, caption, projectId } = await req.json();

    const updateData: any = {};
    if (altText !== undefined) updateData.altText = altText;
    if (caption !== undefined) updateData.caption = caption;
    if (projectId !== undefined) updateData.projectId = projectId;

    const media = await prisma.mediaItem.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, media });
  } catch (error) {
    console.error("Update media item error:", error);
    return NextResponse.json({ error: "Failed to update media item." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = params;
    const media = await prisma.mediaItem.findUnique({ where: { id } });

    if (!media) {
      return NextResponse.json({ error: "Media item not found." }, { status: 404 });
    }

    await deleteUploadedFile(media.fileUrl);
    await prisma.mediaItem.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Media deleted successfully." });
  } catch (error) {
    console.error("Delete media error:", error);
    return NextResponse.json({ error: "Failed to delete media item." }, { status: 500 });
  }
}

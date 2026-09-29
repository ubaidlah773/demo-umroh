import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { deleteUploadedFile } from "@/lib/storage";

interface Params {
  params: { id: string; imageId: string };
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id, imageId } = params;
    const body = await req.json();
    const { title, altText, caption, sortOrder, isCover } = body;

    const existing = await prisma.projectImage.findUnique({
      where: { id: imageId },
    });

    if (!existing || existing.projectId !== id) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }

    if (isCover) {
      await prisma.projectImage.updateMany({
        where: { projectId: id, isCover: true },
        data: { isCover: false },
      });

      await prisma.project.update({
        where: { id },
        data: { coverImage: existing.fileUrl },
      });
    }

    const updated = await prisma.projectImage.update({
      where: { id: imageId },
      data: {
        title: title !== undefined ? title : existing.title,
        altText: altText !== undefined ? altText : existing.altText,
        caption: caption !== undefined ? caption : existing.caption,
        sortOrder: typeof sortOrder === "number" ? sortOrder : existing.sortOrder,
        isCover: isCover !== undefined ? !!isCover : existing.isCover,
      },
    });

    return NextResponse.json({ success: true, image: updated });
  } catch (error) {
    console.error("Update image error:", error);
    return NextResponse.json({ error: "Failed to update image." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id, imageId } = params;

    const existing = await prisma.projectImage.findUnique({
      where: { id: imageId },
    });

    if (!existing || existing.projectId !== id) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }

    await deleteUploadedFile(existing.fileUrl);

    await prisma.projectImage.delete({
      where: { id: imageId },
    });

    return NextResponse.json({ success: true, message: "Image deleted successfully." });
  } catch (error) {
    console.error("Delete image error:", error);
    return NextResponse.json({ error: "Failed to delete image." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

interface Params {
  params: { id: string };
}

// POST: Add new image to project gallery
export async function POST(req: NextRequest, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const { fileName, fileUrl, title, altText, caption, isCover, sortOrder, fileSize, fileType } =
      body;

    if (!fileUrl) {
      return NextResponse.json({ error: "fileUrl is required." }, { status: 400 });
    }

    const count = await prisma.projectImage.count({ where: { projectId: id } });
    const order = typeof sortOrder === "number" ? sortOrder : count + 1;

    // If this image is set as cover, unset any existing cover for this project
    if (isCover) {
      await prisma.projectImage.updateMany({
        where: { projectId: id, isCover: true },
        data: { isCover: false },
      });

      // Also update project.coverImage
      await prisma.project.update({
        where: { id },
        data: { coverImage: fileUrl },
      });
    }

    const image = await prisma.projectImage.create({
      data: {
        projectId: id,
        fileName: fileName || "image.png",
        fileUrl,
        title: title || null,
        altText: altText || title || "Project image",
        caption: caption || null,
        sortOrder: order,
        isCover: !!isCover,
        fileSize: fileSize || 0,
        fileType: fileType || "image/png",
      },
    });

    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch (error) {
    console.error("Add project image error:", error);
    return NextResponse.json({ error: "Failed to add image to project." }, { status: 500 });
  }
}

// PUT: Batch reorder gallery images
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { images } = await req.json();
    if (!Array.isArray(images)) {
      return NextResponse.json({ error: "Images array is required." }, { status: 400 });
    }

    await prisma.$transaction(
      images.map((img: { id: string; sortOrder: number }) =>
        prisma.projectImage.update({
          where: { id: img.id },
          data: { sortOrder: img.sortOrder },
        })
      )
    );

    return NextResponse.json({ success: true, message: "Gallery images reordered successfully." });
  } catch (error) {
    console.error("Reorder images error:", error);
    return NextResponse.json({ error: "Failed to reorder gallery images." }, { status: 500 });
  }
}

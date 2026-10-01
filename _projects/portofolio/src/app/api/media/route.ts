import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const projectId = searchParams.get("projectId");

    const where: any = {};
    if (search) {
      where.OR = [
        { fileName: { contains: search } },
        { altText: { contains: search } },
        { caption: { contains: search } },
      ];
    }
    if (projectId) {
      where.projectId = projectId;
    }

    const media = await prisma.mediaItem.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ media });
  } catch (error) {
    console.error("Fetch media error:", error);
    return NextResponse.json({ error: "Failed to fetch media." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const { fileName, fileUrl, fileType, fileSize, altText, caption, projectId } = body;

    if (!fileName || !fileUrl) {
      return NextResponse.json({ error: "fileName and fileUrl are required." }, { status: 400 });
    }

    const media = await prisma.mediaItem.create({
      data: {
        fileName,
        fileUrl,
        fileType: fileType || "image/png",
        fileSize: fileSize || 0,
        altText: altText || fileName,
        caption: caption || null,
        projectId: projectId || null,
      },
    });

    return NextResponse.json({ success: true, media }, { status: 201 });
  } catch (error) {
    console.error("Create media item error:", error);
    return NextResponse.json({ error: "Failed to register media item." }, { status: 500 });
  }
}

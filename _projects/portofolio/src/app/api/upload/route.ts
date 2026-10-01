import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { saveUploadedFile } from "@/lib/storage";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;
    const projectId = formData.get("projectId") as string | null;
    const altText = (formData.get("altText") as string) || "";
    const caption = (formData.get("caption") as string) || "";

    const uploadList: File[] = [];
    if (singleFile) uploadList.push(singleFile);
    if (files && files.length > 0) {
      for (const f of files) {
        if (!uploadList.includes(f)) uploadList.push(f);
      }
    }

    if (uploadList.length === 0) {
      return NextResponse.json({ error: "No file provided for upload." }, { status: 400 });
    }

    const results = [];
    for (const file of uploadList) {
      const saved = await saveUploadedFile(file);

      // Register in MediaItem table
      const media = await prisma.mediaItem.create({
        data: {
          fileName: saved.fileName,
          fileUrl: saved.fileUrl,
          fileType: saved.fileType,
          fileSize: saved.fileSize,
          altText: altText || saved.fileName,
          caption: caption || null,
          projectId: projectId || null,
        },
      });

      results.push(media);
    }

    return NextResponse.json({
      success: true,
      files: results,
      file: results[0], // for single upload ease
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to upload file." },
      { status: 500 }
    );
  }
}

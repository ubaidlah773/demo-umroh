import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

interface Params {
  params: { id: string };
}

export async function POST(req: NextRequest, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = params;

    const original = await prisma.project.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        images: true,
      },
    });

    if (!original) {
      return NextResponse.json({ error: "Source project not found." }, { status: 404 });
    }

    const count = await prisma.project.count();
    const newOrder = count + 1;
    const newNumber = String(newOrder).padStart(2, "0");
    const timestamp = Date.now().toString().slice(-4);
    const newSlug = `${original.slug}-copy-${timestamp}`;

    const duplicated = await prisma.project.create({
      data: {
        number: newNumber,
        title: `${original.title} (Copy)`,
        slug: newSlug,
        subtitle: original.subtitle,
        period: original.period,
        role: original.role,
        category: original.category,
        tools: original.tools,
        shortDescription: original.shortDescription,
        fullDescription: original.fullDescription,
        technologies: original.technologies,
        projectUrl: original.projectUrl,
        githubUrl: original.githubUrl,
        featured: false,
        published: false, // Start as draft
        displayOrder: newOrder,
        coverImage: original.coverImage,
        mockupType: original.mockupType,
        badgeText: original.badgeText,
        highlights: original.highlights,
        features: original.features,
        developmentHighlights: original.developmentHighlights,
        images: {
          create: original.images.map((img) => ({
            fileName: img.fileName,
            fileUrl: img.fileUrl,
            title: img.title ? `${img.title} (Copy)` : null,
            altText: img.altText,
            caption: img.caption,
            sortOrder: img.sortOrder,
            isCover: img.isCover,
            fileSize: img.fileSize,
            fileType: img.fileType,
          })),
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json({ success: true, project: duplicated }, { status: 201 });
  } catch (error) {
    console.error("Duplicate project error:", error);
    return NextResponse.json({ error: "Failed to duplicate project." }, { status: 500 });
  }
}

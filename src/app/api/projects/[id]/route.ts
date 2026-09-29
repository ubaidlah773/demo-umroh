import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { deleteUploadedFile } from "@/lib/storage";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;

    const project = await prisma.project.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        images: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Get project error:", error);
    return NextResponse.json({ error: "Failed to fetch project." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();

    const {
      number,
      title,
      slug,
      subtitle,
      period,
      role,
      category,
      shortDescription,
      fullDescription,
      technologies,
      projectUrl,
      githubUrl,
      featured,
      published,
      displayOrder,
      coverImage,
      mockupType,
      badgeText,
      highlights,
      features,
      developmentHighlights,
    } = body;

    const updateData: any = {};
    if (number !== undefined) updateData.number = number;
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (period !== undefined) updateData.period = period;
    if (role !== undefined) updateData.role = role;
    if (category !== undefined) updateData.category = category;
    if (shortDescription !== undefined) updateData.shortDescription = shortDescription;
    if (fullDescription !== undefined) updateData.fullDescription = fullDescription;
    if (technologies !== undefined) {
      updateData.technologies =
        typeof technologies === "string" ? technologies : JSON.stringify(technologies);
    }
    if (projectUrl !== undefined) updateData.projectUrl = projectUrl || null;
    if (githubUrl !== undefined) updateData.githubUrl = githubUrl || null;
    if (featured !== undefined) updateData.featured = !!featured;
    if (published !== undefined) updateData.published = !!published;
    if (displayOrder !== undefined) updateData.displayOrder = Number(displayOrder);
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (mockupType !== undefined) updateData.mockupType = mockupType;
    if (badgeText !== undefined) updateData.badgeText = badgeText;
    if (highlights !== undefined) {
      updateData.highlights =
        typeof highlights === "string" ? highlights : JSON.stringify(highlights);
    }
    if (features !== undefined) {
      updateData.features =
        typeof features === "string" ? features : JSON.stringify(features);
    }
    if (developmentHighlights !== undefined) {
      updateData.developmentHighlights =
        typeof developmentHighlights === "string"
          ? developmentHighlights
          : JSON.stringify(developmentHighlights);
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
      include: {
        images: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Update project error:", error);
    return NextResponse.json({ error: "Failed to update project." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = params;

    // Find project and its images to clean up files
    const project = await prisma.project.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    // Clean up local images
    for (const img of project.images) {
      await deleteUploadedFile(img.fileUrl);
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    console.error("Delete project error:", error);
    return NextResponse.json({ error: "Failed to delete project." }, { status: 500 });
  }
}

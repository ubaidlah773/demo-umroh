import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get("publishedOnly") === "true";

    const where = publishedOnly ? { published: true } : {};

    const projects = await prisma.project.findMany({
      where,
      orderBy: { displayOrder: "asc" },
      include: {
        images: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Fetch projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const {
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
      images,
    } = body;

    if (!title || !shortDescription) {
      return NextResponse.json(
        { error: "Title and short description are required." },
        { status: 400 }
      );
    }

    // Auto-generate slug if missing
    let finalSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    // Check slug collision
    const existing = await prisma.project.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now()}`;
    }

    // Count projects to set next display order if not provided
    const count = await prisma.project.count();
    const order = typeof displayOrder === "number" ? displayOrder : count + 1;
    const projectNumber = String(order).padStart(2, "0");

    const project = await prisma.project.create({
      data: {
        number: projectNumber,
        title,
        slug: finalSlug,
        subtitle: subtitle || "Web Platform",
        period: period || "2026",
        role: role || "Full Stack Developer",
        category: category || "Web Development",
        shortDescription,
        fullDescription: fullDescription || shortDescription,
        technologies:
          typeof technologies === "string" ? technologies : JSON.stringify(technologies || []),
        projectUrl: projectUrl || null,
        githubUrl: githubUrl || null,
        featured: !!featured,
        published: published !== undefined ? !!published : true,
        displayOrder: order,
        coverImage: coverImage || null,
        mockupType: mockupType || "custom",
        badgeText: badgeText || null,
        highlights: typeof highlights === "string" ? highlights : JSON.stringify(highlights || []),
        features: typeof features === "string" ? features : JSON.stringify(features || []),
        developmentHighlights:
          typeof developmentHighlights === "string"
            ? developmentHighlights
            : JSON.stringify(developmentHighlights || []),
        images: images && Array.isArray(images) && images.length > 0 ? {
          create: images.map((img: any, idx: number) => ({
            fileName: img.fileName || "image.png",
            fileUrl: img.fileUrl,
            title: img.title || null,
            altText: img.altText || title,
            caption: img.caption || null,
            sortOrder: typeof img.sortOrder === "number" ? img.sortOrder : idx + 1,
            isCover: !!img.isCover,
            fileSize: img.fileSize || 0,
            fileType: img.fileType || "image/png",
          })),
        } : undefined,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}

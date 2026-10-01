import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: "default",
          name: "AHMAD UBAI DULLAH",
          aboutSummary: JSON.stringify([]),
        },
      });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Fetch settings error:", error);
    return NextResponse.json({ error: "Failed to fetch settings." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const updateData: any = {};

    const fields = [
      "name",
      "eyebrow",
      "headline",
      "supportingCopy",
      "location",
      "email",
      "phone",
      "linkedin",
      "linkedinDisplay",
      "github",
      "githubDisplay",
      "cvUrl",
      "profileImage",
      "aboutEditorial",
      "metaTitle",
      "metaDescription",
      "ogImage",
    ];

    for (const field of fields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (body.aboutSummary !== undefined) {
      updateData.aboutSummary =
        typeof body.aboutSummary === "string"
          ? body.aboutSummary
          : JSON.stringify(body.aboutSummary);
    }

    const updated = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: updateData,
      create: {
        id: "default",
        aboutSummary: JSON.stringify([]),
        ...updateData,
      },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json({ error: "Failed to update settings." }, { status: 500 });
  }
}

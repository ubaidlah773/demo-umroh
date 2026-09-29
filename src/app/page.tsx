import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { prisma } from "@/lib/prisma";
import {
  personalInfo as fallbackPersonalInfo,
  projectsData as fallbackProjectsData,
  experienceData as fallbackExperienceData,
  skillCategories as fallbackSkillCategories,
  educationData as fallbackEducationData,
} from "@/data/portfolioData";
import {
  PersonalInfo,
  ProjectItem,
  ExperienceItem,
  SkillCategory,
  EducationItem,
} from "@/types/portfolio";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

function safeJsonParse<T>(jsonStr: string | null | undefined, fallback: T): T {
  if (!jsonStr) return fallback;
  try {
    return JSON.parse(jsonStr);
  } catch {
    return fallback;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });

    return {
      title:
        settings?.metaTitle ||
        "AHMAD UBAI DULLAH | Full Stack Developer | Tuban, Indonesia",
      description:
        settings?.metaDescription ||
        "Full Stack Developer based in Tuban, Indonesia. Experienced in building and maintaining web applications using Laravel, JavaScript, Node.js, and MySQL.",
      openGraph: {
        title: settings?.metaTitle || "AHMAD UBAI DULLAH | Full Stack Developer",
        description:
          settings?.metaDescription ||
          "Practical database-driven web systems and digital platforms.",
        images: settings?.ogImage ? [settings.ogImage] : ["/profile.png"],
      },
    };
  } catch {
    return {
      title: "AHMAD UBAI DULLAH | Full Stack Developer | Tuban, Indonesia",
      description:
        "Full Stack Developer based in Tuban, Indonesia. Experienced in building and maintaining web applications using Laravel, JavaScript, Node.js, and MySQL.",
      openGraph: {
        title: "AHMAD UBAI DULLAH | Full Stack Developer",
        description:
          "Practical database-driven web systems and digital platforms.",
        images: ["/profile.png"],
      },
    };
  }
}

export default async function PortfolioPage() {
  let personalInfo: PersonalInfo = fallbackPersonalInfo;
  let projects: ProjectItem[] = fallbackProjectsData;
  let experiences: ExperienceItem[] = fallbackExperienceData;
  let skillCategories: SkillCategory[] = fallbackSkillCategories;
  let education: EducationItem[] = fallbackEducationData;

  try {
    // Query all sections in parallel from database
    const [settings, projectsDb, experiencesDb, skillCategoriesDb, educationDb] =
      await Promise.all([
        prisma.siteSettings.findUnique({ where: { id: "default" } }),
        prisma.project.findMany({
          where: { published: true },
          orderBy: { displayOrder: "asc" },
          include: {
            images: {
              orderBy: { sortOrder: "asc" },
            },
          },
        }),
        prisma.experience.findMany({
          where: { published: true },
          orderBy: { displayOrder: "asc" },
        }),
        prisma.skillCategory.findMany({
          orderBy: { displayOrder: "asc" },
          include: {
            skills: {
              orderBy: { displayOrder: "asc" },
            },
          },
        }),
        prisma.education.findMany({
          orderBy: { displayOrder: "asc" },
        }),
      ]);

    if (settings) {
      personalInfo = {
        name: settings.name || fallbackPersonalInfo.name,
        eyebrow: settings.eyebrow || fallbackPersonalInfo.eyebrow,
        headline: settings.headline || fallbackPersonalInfo.headline,
        supportingCopy:
          settings.supportingCopy || fallbackPersonalInfo.supportingCopy,
        location: settings.location || fallbackPersonalInfo.location,
        email: settings.email || fallbackPersonalInfo.email,
        phone: settings.phone || fallbackPersonalInfo.phone,
        linkedin: settings.linkedin || fallbackPersonalInfo.linkedin,
        linkedinDisplay:
          settings.linkedinDisplay || fallbackPersonalInfo.linkedinDisplay,
        github: settings.github || fallbackPersonalInfo.github,
        githubDisplay:
          settings.githubDisplay || fallbackPersonalInfo.githubDisplay,
        cvUrl: settings.cvUrl || fallbackPersonalInfo.cvUrl,
        profileImage: settings.profileImage || fallbackPersonalInfo.profileImage,
        aboutEditorial:
          settings.aboutEditorial || fallbackPersonalInfo.aboutEditorial,
        aboutSummary: safeJsonParse<string[]>(
          settings.aboutSummary,
          fallbackPersonalInfo.aboutSummary
        ),
      };
    }

    if (projectsDb && projectsDb.length > 0) {
      projects = projectsDb.map((p) => ({
        id: p.id,
        slug: p.slug,
        number: p.number,
        title: p.title,
        subtitle: p.subtitle,
        period: p.period,
        role: p.role,
        category: p.category,
        tags: p.technologies
          ? p.technologies.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        description: p.shortDescription,
        highlights: safeJsonParse<string[]>(p.highlights, []),
        mockupType: p.mockupType as any,
        badgeText: p.badgeText || undefined,
        coverImage: p.coverImage,
        images: p.images,
        overview: p.fullDescription,
        technologies: {
          frontend: [],
          backend: [],
          database: [],
          infrastructure: [],
        },
        features: safeJsonParse<{ title: string; description: string }[]>(
          p.features,
          []
        ),
        developmentHighlights: safeJsonParse<string[]>(
          p.developmentHighlights,
          []
        ),
      }));
    }

    if (experiencesDb && experiencesDb.length > 0) {
      experiences = experiencesDb.map((e) => ({
        id: e.id,
        company: e.company,
        role: e.role,
        period: e.period,
        location: e.location,
        type: e.type,
        responsibilities: safeJsonParse<string[]>(e.responsibilities, []),
        techStack: safeJsonParse<string[]>(e.technologies, []),
      }));
    }

    if (skillCategoriesDb && skillCategoriesDb.length > 0) {
      skillCategories = skillCategoriesDb.map((sc) => ({
        category: sc.category,
        description: sc.description,
        skills: sc.skills.map((s) => ({
          name: s.name,
          level: s.level || undefined,
          icon: s.icon || undefined,
          tag: s.tag || undefined,
        })),
      }));
    }

    if (educationDb && educationDb.length > 0) {
      education = educationDb.map((ed) => ({
        id: ed.id,
        institution: ed.institution,
        degree: ed.degree,
        period: ed.period,
        gradeLabel: ed.gradeLabel,
        gradeValue: ed.gradeValue,
        achievements: safeJsonParse<string[]>(ed.achievements, []),
        coursework: safeJsonParse<string[]>(ed.coursework, []),
        competencies: safeJsonParse<string[]>(ed.competencies, []),
      }));
    }
  } catch (error) {
    console.error("Database query fallback engaged:", error);
  }

  return (
    <>
      {/* Subtle Desktop Interactive Cursor */}
      <CustomCursor />

      {/* Sticky Navigation */}
      <Navbar personalInfo={personalInfo} />

      {/* Main Semantic Content */}
      <main id="main-content" className="flex-1">
        {/* 1. Hero Section */}
        <Hero personalInfo={personalInfo} />

        {/* 2. About Section */}
        <About personalInfo={personalInfo} />

        {/* 3. Selected Projects (Horizontal Carousel) */}
        <Projects projects={projects} />

        {/* 4. Experience Timeline */}
        <Experience experiences={experiences} />

        {/* 5. Technical Stack / Skills */}
        <Skills skillCategories={skillCategories} />

        {/* 6. Education & Achievements */}
        <Education education={education} />

        {/* 7. Contact Section */}
        <Contact personalInfo={personalInfo} />
      </main>

      {/* Footer */}
      <Footer personalInfo={personalInfo} />
    </>
  );
}

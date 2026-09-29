import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProjectGalleryLightbox, { GalleryImage } from "@/components/ProjectGalleryLightbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { projectsData } from "@/data/portfolioData";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Calendar,
  UserCheck,
  Tag,
  CheckCircle2,
  Sparkles,
  Layers,
  Code2,
  Cpu,
  FolderKanban,
} from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  let project: any = null;
  try {
    project = await prisma.project.findUnique({
      where: { slug: params.slug },
    });
  } catch {
    // fallback
  }

  if (!project) {
    project = projectsData.find((p) => p.slug === params.slug || p.id === params.slug);
  }

  if (!project) {
    return {
      title: "Project Not Found | Ahmad Ubai Dullah",
    };
  }

  return {
    title: `${project.title} — Technical Case Study | Ahmad Ubai Dullah`,
    description: project.shortDescription || project.subtitle,
    openGraph: {
      title: `${project.title} — Ahmad Ubai Dullah`,
      description: project.shortDescription || project.subtitle,
      images: project.coverImage ? [project.coverImage] : [],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  let project: any = null;
  let allProjects: { slug: string; title: string; number: string }[] = [];

  try {
    project = await prisma.project.findUnique({
      where: { slug: params.slug },
      include: {
        images: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    allProjects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
      select: { slug: true, title: true, number: true },
    });
  } catch (error) {
    console.error("Prisma lookup failed, falling back to static project data:", error);
  }

  if (!project) {
    const fallback = projectsData.find((p) => p.slug === params.slug || p.id === params.slug);
    if (fallback) {
      project = {
        ...fallback,
        shortDescription: fallback.description,
        fullDescription: fallback.overview,
        technologies: fallback.tags.join(", "),
        published: true,
        images: [],
      };
    }
  }

  if (allProjects.length === 0) {
    allProjects = projectsData.map((p) => ({
      slug: p.slug || p.id,
      title: p.title,
      number: p.number,
    }));
  }

  if (!project || !project.published) {
    notFound();
  }

  // Parse JSON/Array fields safely
  let highlights: string[] = [];
  try {
    highlights = typeof project.highlights === "string" ? JSON.parse(project.highlights) : project.highlights || [];
  } catch {
    highlights = [];
  }

  let features: { title: string; description: string }[] = [];
  try {
    features = typeof project.features === "string" ? JSON.parse(project.features) : project.features || [];
  } catch {
    features = [];
  }

  let devHighlights: string[] = [];
  try {
    devHighlights = typeof project.developmentHighlights === "string" ? JSON.parse(project.developmentHighlights) : project.developmentHighlights || [];
  } catch {
    devHighlights = [];
  }

  const techList: string[] = project.technologies
    ? (Array.isArray(project.technologies) ? project.technologies : project.technologies.split(",").map((t: string) => t.trim()).filter(Boolean))
    : [];

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  // Format images for the lightbox component
  const galleryImages: GalleryImage[] = (project.images || []).map((img: any) => ({
    id: img.id,
    fileName: img.fileName,
    fileUrl: img.fileUrl,
    title: img.title,
    altText: img.altText,
    caption: img.caption,
    isCover: img.isCover,
  }));

  // If no additional gallery images, use cover image so lightbox can preview the architecture
  if (galleryImages.length === 0 && project.coverImage) {
    galleryImages.push({
      id: "cover-image",
      fileName: `${project.slug}-cover`,
      fileUrl: project.coverImage,
      title: `${project.title} Overview`,
      altText: `${project.title} cover architectural layout`,
      caption: `High-resolution overview and architecture for ${project.title}`,
      isCover: true,
    });
  }

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="min-h-screen bg-[#272838] text-[#989FCE] pt-28 pb-20 selection:bg-accent-blue/20 selection:text-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Breadcrumb Navigation */}
          <div className="mb-10">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#989FCE] hover:text-[#F7F8FC] transition-colors group px-3.5 py-2 rounded-xl bg-[#1E1F2D] border border-[#7D6B91]/30 font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Selected Projects</span>
            </Link>
          </div>

          {/* Project Header Hero */}
          <div className="border-b border-[#7D6B91]/20 pb-12 mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-md bg-accent-blue/15 border border-accent-blue/30 text-accent-blue text-xs font-mono font-bold">
                PROJECT {project.number}
              </span>
              <span className="text-[#7D6B91]/40">•</span>
              <span className="text-xs font-mono text-[#989FCE] uppercase tracking-wider font-semibold">
                {project.category}
              </span>
              {project.badgeText && (
                <>
                  <span className="text-[#7D6B91]/40">•</span>
                  <span className="px-2.5 py-0.5 rounded bg-[#1E1F2D] text-[#989FCE] border border-[#7D6B91]/30 text-xs font-mono font-medium">
                    {project.badgeText}
                  </span>
                </>
              )}
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F7F8FC] tracking-tight mb-4">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-[#989FCE] max-w-3xl leading-relaxed mb-8">
              {project.subtitle}
            </p>

            {/* Project Meta Metrics & Links Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#1E1F2D] border border-[#7D6B91]/25">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#989FCE] font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-accent-blue" />
                  Timeline
                </span>
                <p className="text-sm font-bold text-[#F7F8FC] font-mono">
                  {project.period}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#989FCE] font-semibold flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-accent-blue" />
                  Role
                </span>
                <p className="text-sm font-bold text-[#F7F8FC]">
                  {project.role}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#989FCE] font-semibold flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-accent-blue" />
                  Classification
                </span>
                <p className="text-sm font-bold text-[#F7F8FC]">
                  {project.category}
                </p>
              </div>

              <div className="flex items-center gap-2 lg:justify-end">
                {project.projectUrl && project.projectUrl.trim() !== "" && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold transition-all shadow-accent-sm"
                  >
                    <span>
                      {project.category?.toUpperCase() === "DESIGN" ? "View Design" : "View Demo"}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && project.githubUrl.trim() !== "" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#272838] hover:bg-[#2D2E42] text-[#F7F8FC] border border-[#7D6B91]/30 hover:border-accent-blue/50 text-xs font-semibold transition-all shadow-card-subtle"
                  >
                    <Github className="w-3.5 h-3.5 text-accent-blue" />
                    <span>Repository</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Section: Interactive Documentation Gallery */}
          <section className="mb-16" aria-label="Project Documentation Gallery">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-accent-blue" />
                  <span className="text-xs font-mono uppercase tracking-widest text-accent-blue font-bold">
                    Visual Documentation
                  </span>
                </div>
                <h2 className="font-display font-bold text-2xl text-[#F7F8FC]">
                  Interface &amp; System Screenshots
                </h2>
              </div>
              <span className="hidden sm:inline-block text-xs font-mono text-[#989FCE]">
                Click any image to inspect high-resolution architecture
              </span>
            </div>

            <ProjectGalleryLightbox
              images={galleryImages}
              projectTitle={project.title}
            />
          </section>

          {/* Grid Layout: Architecture Overview & Tech Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* Left 8 Cols: Narrative Breakdown */}
            <div className="lg:col-span-8 space-y-10">
              {/* Executive Overview */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-blue" />
                  <h3 className="font-display font-bold text-xl text-[#F7F8FC]">
                    Project Overview
                  </h3>
                </div>
                <div className="max-w-none text-[#989FCE] leading-relaxed space-y-4">
                  <p className="text-base sm:text-lg text-[#989FCE] leading-relaxed">
                    {project.fullDescription || project.shortDescription}
                  </p>
                </div>
              </section>

              {/* Core Feature Implementations */}
              {features.length > 0 && (
                <section className="space-y-6 pt-6 border-t border-[#7D6B91]/20">
                  <h3 className="font-display font-bold text-xl text-[#F7F8FC] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent-blue" />
                    Key Architectural Features
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-[#1E1F2D] border border-[#7D6B91]/25 hover:border-accent-blue/40 transition-all space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-accent-blue/15 text-accent-blue text-xs font-mono font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h4 className="font-bold text-[#F7F8FC] text-sm">
                            {feature.title}
                          </h4>
                        </div>
                        <p className="text-xs text-[#989FCE] leading-relaxed pl-8">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Engineering Highlights */}
              {devHighlights.length > 0 && (
                <section className="space-y-4 pt-6 border-t border-[#7D6B91]/20">
                  <h3 className="font-display font-bold text-xl text-[#F7F8FC] flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-accent-blue" />
                    Engineering &amp; Data Pipeline Highlights
                  </h3>
                  <div className="space-y-3">
                    {devHighlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-xl bg-[#1E1F2D] border border-[#7D6B91]/25"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                        <span className="text-sm text-[#989FCE] leading-relaxed font-medium">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right 4 Cols: Sidebar Tech Specs */}
            <div className="lg:col-span-4 space-y-8">
              {/* Technology Stack Pill Card */}
              <div className="p-6 rounded-2xl bg-[#1E1F2D] border border-[#7D6B91]/25 space-y-5">
                <div className="flex items-center gap-2 border-b border-[#7D6B91]/20 pb-4">
                  <Code2 className="w-4 h-4 text-accent-blue" />
                  <h4 className="font-display font-bold text-[#F7F8FC] text-sm uppercase tracking-wider">
                    Technologies Deployed
                  </h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  {techList.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-[#272838] border border-[#7D6B91]/30 text-xs font-mono text-[#F7F8FC] font-medium hover:border-accent-blue/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Deliverables Check */}
              {highlights.length > 0 && (
                <div className="p-6 rounded-2xl bg-[#1E1F2D] border border-[#7D6B91]/25 space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#7D6B91]/20 pb-4">
                    <FolderKanban className="w-4 h-4 text-accent-blue" />
                    <h4 className="font-display font-bold text-[#F7F8FC] text-sm uppercase tracking-wider">
                      Key Deliverables
                    </h4>
                  </div>

                  <ul className="space-y-2.5">
                    {highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-[#989FCE]"
                      >
                        <span className="text-accent-blue font-bold font-mono">
                          ›
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact CTA Card */}
              <div className="p-6 rounded-2xl bg-[#1E1F2D] border border-accent-blue/40 space-y-4">
                <h4 className="font-display font-bold text-[#F7F8FC] text-base">
                  Have a similar platform requirement?
                </h4>
                <p className="text-xs text-[#989FCE] leading-relaxed">
                  Let&apos;s collaborate to design scalable database architectures, responsive interfaces, and production workflows.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-blue hover:bg-[#2C6EA8] text-white font-semibold text-xs transition-all shadow-accent-sm cursor-pointer"
                >
                  <span>Initiate Discussion</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Adjacent Project Navigation Footer */}
          <div className="pt-12 border-t border-[#7D6B91]/20 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group p-5 rounded-2xl bg-[#1E1F2D] border border-[#7D6B91]/25 hover:border-accent-blue/40 transition-all flex flex-col justify-between"
              >
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#989FCE] flex items-center gap-1.5 mb-2 font-medium">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  Previous Case Study
                </span>
                <span className="font-display font-bold text-[#F7F8FC] group-hover:text-accent-blue transition-colors">
                  {prevProject.number} — {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group p-5 rounded-2xl bg-[#1E1F2D] border border-[#7D6B91]/25 hover:border-accent-blue/40 transition-all flex flex-col justify-between sm:items-end sm:text-right"
              >
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#989FCE] flex items-center gap-1.5 mb-2 font-medium">
                  Next Case Study
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="font-display font-bold text-[#F7F8FC] group-hover:text-accent-blue transition-colors">
                  {nextProject.number} — {nextProject.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

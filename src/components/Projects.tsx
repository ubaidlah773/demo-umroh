"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { projectsData } from "@/data/portfolioData";
import { ProjectItem } from "@/types/portfolio";
import ProjectMockup from "@/components/ProjectMockup";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar,
  UserCheck,
  ExternalLink,
  Palette,
  FolderKanban,
} from "lucide-react";

interface ProjectsProps {
  projects?: ProjectItem[];
}

export default function Projects({ projects: propProjects }: ProjectsProps = {}) {
  const allProjects =
    propProjects && propProjects.length > 0 ? propProjects : projectsData;

  const [filter, setFilter] = useState<"ALL" | "WEB" | "DESIGN">("ALL");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Resize listener to measure viewport width
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setIsMobile(window.innerWidth < 768);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Filter projects by category: ALL, WEB, DESIGN
  const filteredProjects = allProjects.filter((p) => {
    if (filter === "ALL") return true;
    const cat = (p.category || "").toUpperCase();
    if (filter === "WEB") {
      return (
        cat === "WEB" ||
        cat.includes("WEB") ||
        cat.includes("LMS") ||
        cat.includes("QUEUE") ||
        cat === ""
      );
    }
    if (filter === "DESIGN") {
      return cat === "DESIGN" || cat.includes("DESIGN");
    }
    return true;
  });

  const total = filteredProjects.length;
  const currentProject = filteredProjects[currentIndex] || filteredProjects[0];

  const handleFilterChange = (newFilter: "ALL" | "WEB" | "DESIGN") => {
    setFilter(newFilter);
    setCurrentIndex(0);
  };

  // Announce active project changes for screen readers
  useEffect(() => {
    if (currentProject) {
      setAnnouncement(
        `Project ${currentIndex + 1} of ${total}: ${currentProject.title}`
      );
    }
  }, [currentIndex, currentProject, total]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, total]);

  // Keyboard navigation when carousel or its elements have focus
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    },
    [handlePrev, handleNext]
  );

  // Drag and swipe handling
  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 45;
    const velocityThreshold = 350;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      if (currentIndex < total - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (
      info.offset.x > swipeThreshold ||
      info.velocity.x > velocityThreshold
    ) {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }

    setTimeout(() => setIsDragging(false), 50);
  };

  // Dimensions for carousel positioning
  const cardWidth = isMobile
    ? Math.min(Math.round(containerWidth * 0.9), 420)
    : containerWidth < 1024
    ? Math.round(containerWidth * 0.88)
    : Math.min(Math.round(containerWidth * 0.85), 1120);

  const gap = isMobile ? 16 : containerWidth < 1024 ? 24 : 36;
  const centerOffset = (containerWidth - cardWidth) / 2;
  const trackX = centerOffset - currentIndex * (cardWidth + gap);

  return (
    <section
      id="projects"
      ref={sectionRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected Projects Showcase"
      className="py-20 lg:py-28 bg-[#F7F8FC] relative border-t border-[#7D6B91]/15 tech-grid overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#347FC4]/50"
    >
      {/* Screen Reader Live Region */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading, Subtitle & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-14 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[#347FC4]"></div>
              <span className="text-xs font-mono tracking-widest text-[#347FC4] uppercase font-bold">
                Selected Portfolio
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#272838] tracking-tight">
              Featured Work
            </h2>
            <p className="text-sm sm:text-base text-[#5D536B] mt-2 max-w-xl">
              Production web applications, database-driven management platforms, and modern digital experiences.
            </p>
          </div>

          {/* Category Filter Tabs: [ ALL ] [ WEB ] [ DESIGN ] */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-[#7D6B91]/20 shadow-card-subtle self-start md:self-auto">
            {(
              [
                { id: "ALL", label: "ALL" },
                { id: "WEB", label: "WEB" },
                { id: "DESIGN", label: "DESIGN" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleFilterChange(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                  filter === tab.id
                    ? "bg-[#347FC4] text-white shadow-sm"
                    : "text-[#5D536B] hover:text-[#272838] hover:bg-[#EEF0F8]"
                }`}
              >
                [ {tab.label} ]
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Showcase Stage or Empty State */}
      {total === 0 ? (
        <div className="max-w-xl mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white border border-[#7D6B91]/20 text-[#347FC4] flex items-center justify-center mx-auto mb-4 shadow-card-subtle">
            <Palette className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-xl text-[#272838] mb-2">
            No Design Projects Published Yet
          </h3>
          <p className="text-sm text-[#5D536B] leading-relaxed max-w-md mx-auto mb-6">
            Design case studies and UI prototypes can be created and published directly from the CMS Admin dashboard.
          </p>
          <button
            type="button"
            onClick={() => handleFilterChange("ALL")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#347FC4] text-white text-xs font-semibold shadow-sm hover:bg-[#2C6EA8] transition-colors cursor-pointer"
          >
            <span>View All Projects</span>
          </button>
        </div>
      ) : (
        <>
          {/* Main Horizontal Showcase Track Viewport with Side Controls */}
          <div className="relative w-full">
            {/* Floating Desktop Side Nav Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous project"
              className={`hidden md:flex absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full items-center justify-center transition-all duration-200 border backdrop-blur-md shadow-md focus-visible:ring-2 focus-visible:ring-[#347FC4] focus-visible:outline-none ${
                currentIndex === 0
                  ? "opacity-20 cursor-not-allowed border-[#7D6B91]/15 bg-white/60 text-[#5D536B]"
                  : "text-[#272838] bg-white hover:bg-[#347FC4] hover:text-white hover:border-[#347FC4] border-[#7D6B91]/20 active:scale-95 cursor-pointer"
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === total - 1}
              aria-label="Next project"
              className={`hidden md:flex absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full items-center justify-center transition-all duration-200 border backdrop-blur-md shadow-md focus-visible:ring-2 focus-visible:ring-[#347FC4] focus-visible:outline-none ${
                currentIndex === total - 1
                  ? "opacity-20 cursor-not-allowed border-[#7D6B91]/15 bg-white/60 text-[#5D536B]"
                  : "text-[#272838] bg-white hover:bg-[#347FC4] hover:text-white hover:border-[#347FC4] border-[#7D6B91]/20 active:scale-95 cursor-pointer"
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              ref={containerRef}
              className="relative w-full overflow-hidden select-none py-4 cursor-grab active:cursor-grabbing"
            >
              <motion.div
                key={filter}
                className="flex items-stretch"
                style={{ gap: `${gap}px` }}
                animate={{ x: trackX }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                drag="x"
                dragConstraints={{ left: trackX, right: trackX }}
                dragElastic={0.15}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
              >
                {filteredProjects.map((project, idx) => {
                  const isActive = idx === currentIndex;
                  const projectSlug = project.slug || project.id;
                  const formattedNumber = `${String(idx + 1).padStart(2, "0")} / ${String(
                    total
                  ).padStart(2, "0")}`;

                  const isDesignProject =
                    (project.category || "").toUpperCase() === "DESIGN";
                  const hasLiveUrl = !!(project.projectUrl && project.projectUrl.trim() !== "");

                  return (
                    <motion.div
                      key={project.id || idx}
                      style={{ width: `${cardWidth}px` }}
                      animate={{
                        scale: isActive ? 1 : 0.94,
                        opacity: isActive ? 1 : 0.45,
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      onClick={() => {
                        if (isDragging) return;
                        if (idx !== currentIndex) {
                          setCurrentIndex(idx);
                        }
                      }}
                      className={`relative shrink-0 rounded-2xl md:rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col group ${
                        isActive
                          ? "bg-white border-[#7D6B91]/25 shadow-[0_20px_50px_-12px_rgba(39,40,56,0.12)] ring-1 ring-[#347FC4]/20"
                          : "bg-white/80 border-[#7D6B91]/15 hover:border-[#7D6B91]/30 hover:opacity-75 cursor-pointer shadow-sm"
                      }`}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`Project ${idx + 1} of ${total}: ${project.title}`}
                      aria-hidden={!isActive}
                    >
                      {/* Left Visual + Right Info Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch h-full">
                        {/* Visual Side (Left) */}
                        <div className="lg:col-span-7 xl:col-span-7 relative bg-[#F7F8FC] flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-[#7D6B91]/15">
                          {/* Browser / System Header */}
                          <div className="px-4 py-2.5 border-b border-[#7D6B91]/15 bg-[#EEF0F8]/80 backdrop-blur-sm flex items-center justify-between text-xs font-mono text-[#5D536B]">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#7D6B91]/40" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#989FCE]/50" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#347FC4]/70" />
                              <span className="ml-2 text-[11px] text-[#5D536B] hidden sm:inline truncate max-w-[200px]">
                                app.{projectSlug}.internal
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#347FC4]/10 text-[#347FC4] border border-[#347FC4]/25 font-semibold">
                                {project.badgeText || (isDesignProject ? "Design Showcase" : "Production System")}
                              </span>
                            </div>
                          </div>

                          {/* Image / Mockup Stage */}
                          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[460px] w-full p-4 sm:p-6 lg:p-8 flex items-center justify-center overflow-hidden">
                            {project.coverImage ? (
                              <img
                                src={project.coverImage}
                                alt={project.title}
                                className="w-full h-full object-contain object-center transform group-hover:scale-[1.02] transition-all duration-500 ease-out"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ProjectMockup type={project.mockupType as any} />
                              </div>
                            )}
                          </div>

                          {/* Bottom Metadata Bar in Visual */}
                          <div className="hidden sm:flex items-center justify-between px-6 py-3 border-t border-[#7D6B91]/15 bg-white/60 text-xs font-mono text-[#5D536B]">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#347FC4]" />
                              {project.period}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <UserCheck className="w-3.5 h-3.5 text-[#347FC4]" />
                              {project.role}
                            </span>
                          </div>
                        </div>

                        {/* Project Information Side (Right) */}
                        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-white space-y-6">
                          <div>
                            {/* Top Row: Number & Category */}
                            <div className="flex items-center justify-between gap-4 mb-4">
                              <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#347FC4] bg-[#347FC4]/10 border border-[#347FC4]/25 px-3 py-1 rounded-md">
                                {formattedNumber}
                              </span>

                              <span className="text-xs font-mono uppercase tracking-wider text-[#5D536B] truncate font-semibold">
                                {project.category || "Web Development"}
                              </span>
                            </div>

                            {/* Subtitle */}
                            <span className="text-xs font-mono uppercase tracking-wider text-[#5D536B] block mb-1.5 font-semibold">
                              {project.subtitle}
                            </span>

                            {/* Title */}
                            <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#272838] tracking-tight mb-4 group-hover:text-[#347FC4] transition-colors">
                              {project.title}
                            </h3>

                            {/* Short Description */}
                            <p className="text-sm sm:text-base text-[#5D536B] leading-relaxed mb-6">
                              {project.description}
                            </p>

                            {/* Technology / Tools Tags */}
                            <div className="space-y-2">
                              <span className="text-[11px] font-mono uppercase tracking-wider text-[#5D536B] block font-semibold">
                                {isDesignProject ? "Design Tools & Methods" : "Core Architecture"}
                              </span>
                              <div className="flex flex-wrap items-center gap-2">
                                {project.tags.slice(0, 5).map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-3 py-1 rounded-lg text-xs font-mono bg-[#EEF0F8] text-[#5D536B] border border-[#7D6B91]/15 group-hover:border-[#347FC4]/30 group-hover:text-[#272838] transition-colors"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Bottom CTA Buttons */}
                          <div className="pt-6 border-t border-[#7D6B91]/15 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-2.5">
                              {/* Primary Action: View Case Study */}
                              <Link
                                href={`/projects/${projectSlug}`}
                                onClick={(e) => {
                                  if (isDragging) {
                                    e.preventDefault();
                                  }
                                }}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#347FC4] hover:bg-[#2C6EA8] text-white font-medium text-sm transition-all duration-200 shadow-sm shadow-[#347FC4]/25 group/btn focus-visible:ring-2 focus-visible:ring-[#347FC4] focus-visible:outline-none cursor-pointer"
                              >
                                <span>View Case Study</span>
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-200" />
                              </Link>

                              {/* Dynamic Secondary Action: View Demo for WEB / View Design for DESIGN. Hidden completely if URL is empty */}
                              {hasLiveUrl && (
                                <a
                                  href={project.projectUrl!}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => {
                                    if (isDragging) {
                                      e.preventDefault();
                                    }
                                  }}
                                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#EEF0F8] hover:bg-[#347FC4]/10 text-[#347FC4] border border-[#347FC4]/30 font-semibold text-xs sm:text-sm transition-all shadow-2xs cursor-pointer"
                                >
                                  <span>{isDesignProject ? "View Design" : "View Demo"}</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>

                            <span className="text-xs font-mono text-[#5D536B] hidden sm:inline">
                              Architecture Overview ›
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Navigation Controls & Dynamic Indicator Bar */}
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 sm:p-5 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-sm">
              {/* Left: Dynamic Project Counter */}
              <div className="flex items-center gap-2.5 font-mono text-sm text-[#272838]">
                <span className="text-[#347FC4] font-bold">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-[#7D6B91]/30">/</span>
                <span className="text-[#5D536B]">
                  {String(total).padStart(2, "0")}
                </span>
                {currentProject && (
                  <span className="text-xs text-[#5D536B] ml-2 hidden md:inline truncate max-w-xs">
                    — {currentProject.title}
                  </span>
                )}
              </div>

              {/* Center: Dynamic Connected Visual Progress Indicator */}
              <div
                className="flex items-center gap-2 sm:gap-3"
                role="tablist"
                aria-label="Project selection indicators"
              >
                {filteredProjects.map((proj, idx) => {
                  const isActive = idx === currentIndex;
                  const isPast = idx < currentIndex;
                  return (
                    <React.Fragment key={proj.id || idx}>
                      {/* Step Dot */}
                      <button
                        type="button"
                        role="tab"
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to project ${idx + 1}: ${proj.title}`}
                        aria-selected={isActive}
                        className="group relative flex items-center justify-center p-1.5 cursor-pointer rounded-full focus-visible:ring-2 focus-visible:ring-[#347FC4] focus-visible:outline-none"
                      >
                        <span
                          className={`rounded-full transition-all duration-300 ${
                            isActive
                              ? "w-3.5 h-3.5 bg-[#347FC4] shadow-sm shadow-[#347FC4]/50 ring-4 ring-[#347FC4]/20"
                              : "w-2.5 h-2.5 bg-[#EEF0F8] border border-[#7D6B91]/30 group-hover:border-[#347FC4] group-hover:scale-110"
                          }`}
                        />
                      </button>

                      {/* Connecting Line Segment between dots */}
                      {idx < total - 1 && (
                        <div className="w-8 sm:w-12 md:w-16 h-[2px] bg-[#EEF0F8] overflow-hidden rounded-full">
                          <div
                            className={`h-full transition-all duration-500 ${
                              isPast || isActive
                                ? "w-full bg-[#347FC4]"
                                : "w-0 bg-transparent"
                            }`}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Right: Prev / Next Navigation Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  aria-label="Previous project"
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#347FC4] focus-visible:outline-none border ${
                    currentIndex === 0
                      ? "opacity-30 cursor-not-allowed border-[#7D6B91]/15 bg-[#EEF0F8] text-[#5D536B]"
                      : "text-[#272838] bg-[#EEF0F8] hover:bg-[#347FC4] hover:text-white hover:border-[#347FC4] border-[#7D6B91]/20 active:scale-95 shadow-2xs cursor-pointer"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex === total - 1}
                  aria-label="Next project"
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#347FC4] focus-visible:outline-none border ${
                    currentIndex === total - 1
                      ? "opacity-30 cursor-not-allowed border-[#7D6B91]/15 bg-[#EEF0F8] text-[#5D536B]"
                      : "text-[#272838] bg-[#EEF0F8] hover:bg-[#347FC4] hover:text-white hover:border-[#347FC4] border-[#7D6B91]/20 active:scale-95 shadow-2xs cursor-pointer"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

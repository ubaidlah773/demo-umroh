"use client";

import React from "react";
import Link from "next/link";
import { ProjectItem } from "@/types/portfolio";
import ProjectMockup from "@/components/ProjectMockup";
import { ArrowUpRight, Calendar, UserCheck, CheckCircle2, BookOpen } from "lucide-react";

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const projectSlug = project.slug || project.id;

  return (
    <article
      onClick={() => onSelect(project)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      className="group relative rounded-2xl bg-white border border-palette-secPurple/15 hover:border-palette-secPurple/30 shadow-card-subtle hover:shadow-card-elevated transition-all duration-300 overflow-hidden cursor-pointer flex flex-col focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none"
      aria-label={`View details for project: ${project.title}`}
    >
      {/* Top Media / Mockup Area with Hover Zoom */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border-b border-palette-secPurple/15 bg-palette-altBg p-3 sm:p-5">
        <div className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-300 ease-out flex items-center justify-center">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-contain rounded-xl"
            />
          ) : (
            <ProjectMockup type={project.mockupType as any} />
          )}
        </div>

        {/* Project Number Floating Badge */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-white/90 backdrop-blur-md border border-palette-secPurple/15 text-xs font-mono font-semibold text-accent-blue shadow-sm">
          {project.number}
        </div>

        {/* Optional Tag Badge */}
        {project.badgeText && (
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-md bg-white/90 backdrop-blur-md border border-palette-secPurple/15 text-xs font-mono text-palette-darkSec shadow-sm">
            {project.badgeText}
          </div>
        )}
      </div>

      {/* Card Content Information */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
        <div>
          {/* Timeline and Role metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-palette-darkSec/70 mb-3">
            <span className="flex items-center gap-1.5 text-accent-blue font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {project.period}
            </span>
            <span className="text-palette-secPurple/30">•</span>
            <span className="flex items-center gap-1.5 text-palette-darkSec">
              <UserCheck className="w-3.5 h-3.5 text-palette-secPurple" />
              {project.role}
            </span>
          </div>

          {/* Subtitle & Title with subtle hover shift */}
          <span className="text-xs font-mono uppercase tracking-wider text-palette-darkSec/70 block mb-1">
            {project.subtitle}
          </span>
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-palette-primary group-hover:text-accent-blue group-hover:translate-x-1 transition-all duration-200">
              {project.title}
            </h3>
            <div className="w-8 h-8 rounded-lg bg-palette-altBg border border-palette-secPurple/20 flex items-center justify-center text-palette-darkSec group-hover:text-white group-hover:bg-accent-blue group-hover:border-accent-blue transition-all duration-200 shrink-0">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-palette-darkSec leading-relaxed mb-6 font-medium">
            {project.description}
          </p>

          {/* Highlights checklist */}
          <div className="space-y-2 mb-6">
            {project.highlights.slice(0, 3).map((hl, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-palette-darkSec/90">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue shrink-0 mt-0.5" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags Row & Dedicated Case Study Link */}
        <div className="pt-4 border-t border-palette-secPurple/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-palette-altBg text-palette-darkSec border border-palette-secPurple/15 group-hover:border-palette-secPurple/30 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={`/projects/${projectSlug}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-blue hover:underline transition-colors py-1 shrink-0 font-semibold"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Case Study &amp; Gallery →</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

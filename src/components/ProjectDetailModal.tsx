"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ProjectItem } from "@/types/portfolio";
import ProjectMockup from "@/components/ProjectMockup";
import {
  X,
  Calendar,
  UserCheck,
  Layers,
  Sparkles,
  CheckCircle2,
  Database,
  Server,
  Code2,
  Cpu,
  ArrowRight,
} from "lucide-react";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-palette-primary/40 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-[#7D6B91]/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Sticky Header */}
        <div className="px-6 py-4 bg-white/95 border-b border-[#7D6B91]/15 flex items-center justify-between backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent-blue bg-accent-blue/10 px-2.5 py-1 rounded border border-accent-blue/20 font-bold">
              Project {project.number}
            </span>
            <span className="font-mono text-xs text-[#5D536B] hidden sm:inline">
              {project.period}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#5D536B] hover:text-[#272838] bg-[#F7F8FC] hover:bg-[#EEF0F8] border border-[#7D6B91]/20 transition-colors focus-visible:ring-2 focus-visible:ring-accent-blue cursor-pointer"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Main Title & Role Header */}
          <div>
            <span className="text-xs font-mono tracking-widest text-accent-blue uppercase font-semibold block mb-1">
              {project.subtitle}
            </span>
            <h2
              id="modal-project-title"
              className="font-display font-extrabold text-2xl sm:text-3xl text-[#272838] mb-3"
            >
              {project.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#5D536B]">
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-accent-blue" />
                <strong className="text-[#272838]">Role:</strong> {project.role}
              </span>
              <span className="text-[#7D6B91]/30">•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-accent-blue" />
                <strong className="text-[#272838]">Timeline:</strong> {project.period}
              </span>
            </div>
          </div>

          {/* Interactive Abstract UI Mockup Display */}
          <div className="rounded-xl overflow-hidden border border-[#7D6B91]/15 shadow-sm aspect-[16/9] max-h-[380px] w-full flex items-center justify-center bg-[#F7F8FC]">
            {project.coverImage ? (
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <ProjectMockup type={project.mockupType} />
            )}
          </div>

          {/* Overview Section */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg text-[#272838] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-blue" />
              <span>Project Overview</span>
            </h3>
            <p className="text-sm sm:text-base text-[#5D536B] leading-relaxed font-medium">
              {project.overview}
            </p>
          </div>

          {/* Categorized Technologies */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-[#272838] flex items-center gap-2">
              <Code2 className="w-4 h-4 text-accent-blue" />
              <span>Technology Architecture</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/15">
                <span className="text-xs font-mono text-[#5D536B] flex items-center gap-1.5 mb-2 font-bold">
                  <Layers className="w-3.5 h-3.5 text-accent-blue" />
                  Frontend
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.frontend.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white text-[#272838] border border-[#7D6B91]/15 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/15">
                <span className="text-xs font-mono text-[#5D536B] flex items-center gap-1.5 mb-2 font-bold">
                  <Cpu className="w-3.5 h-3.5 text-accent-blue" />
                  Backend
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.backend.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white text-[#272838] border border-[#7D6B91]/15 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/15">
                <span className="text-xs font-mono text-[#5D536B] flex items-center gap-1.5 mb-2 font-bold">
                  <Database className="w-3.5 h-3.5 text-accent-blue" />
                  Database
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.database.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white text-[#272838] border border-[#7D6B91]/15 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/15">
                <span className="text-xs font-mono text-[#5D536B] flex items-center gap-1.5 mb-2 font-bold">
                  <Server className="w-3.5 h-3.5 text-accent-blue" />
                  Infrastructure
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.infrastructure.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white text-[#272838] border border-[#7D6B91]/15 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-[#272838]">
              Key Functional Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/15 space-y-1.5"
                >
                  <h4 className="font-display font-bold text-sm text-[#272838] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-blue shrink-0" />
                    <span>{feat.title}</span>
                  </h4>
                  <p className="text-xs text-[#5D536B] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Development Highlights */}
          <div className="space-y-3 p-5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/15">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#272838]">
              Development &amp; Architecture Highlights
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5D536B]">
              {project.developmentHighlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 shrink-0"></span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-white border-t border-[#7D6B91]/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href={`/projects/${project.slug || project.id}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold transition-colors shadow-sm w-full sm:w-auto justify-center cursor-pointer"
          >
            <span>Open Dedicated Case Study &amp; Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#5D536B] hidden md:inline font-medium">
              Verified CV Data
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#F7F8FC] hover:bg-[#EEF0F8] text-[#272838] text-xs font-semibold border border-[#7D6B91]/20 transition-colors w-full sm:w-auto cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

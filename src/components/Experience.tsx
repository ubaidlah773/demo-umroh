"use client";

import React, { useState } from "react";
import { experienceData as fallbackExperienceData } from "@/data/portfolioData";
import { ExperienceItem } from "@/types/portfolio";
import {
  Calendar,
  MapPin,
  ChevronDown,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function Experience({
  experiences: propExperiences,
}: {
  experiences?: ExperienceItem[];
} = {}) {
  const experienceData =
    propExperiences && propExperiences.length > 0
      ? propExperiences
      : fallbackExperienceData;

  // Store expanded item IDs (default first two items expanded for instant scanning)
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    "belajar-cerdas-exp": true,
    "lapas-tuban-exp": true,
    "kelas-pintar-exp": true,
    "surya-hijau-exp": true,
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="experience"
      className="py-20 lg:py-28 bg-[#EEF0F8] relative border-t border-[#7D6B91]/15 tech-dots"
      aria-label="Professional Experience Timeline"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[#347FC4]"></div>
              <span className="text-xs font-mono tracking-widest text-[#347FC4] uppercase font-bold">
                Career History
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#272838] tracking-tight">
              Work Experience
            </h2>
            <p className="text-sm sm:text-base text-[#5D536B] mt-2 max-w-xl">
              Chronological track record of web development, institutional systems, and data roles.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#5D536B] bg-white px-3.5 py-2 rounded-xl border border-[#7D6B91]/15 shadow-2xs w-fit">
            <Sparkles className="w-3.5 h-3.5 text-[#347FC4]" />
            <span>Click or hover cards to reveal full contributions</span>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 border-l border-[#7D6B91]/25 space-y-10 sm:space-y-12">
          {experienceData.map((item) => {
            const isExpanded = expandedIds[item.id];
            return (
              <div key={item.id} className="relative group">
                {/* Timeline Node Dot */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-6 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                    isExpanded
                      ? "bg-[#347FC4] border-white shadow-sm ring-4 ring-[#347FC4]/20"
                      : "bg-white border-[#7D6B91]/40 group-hover:border-[#347FC4]"
                  }`}
                  aria-hidden="true"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      isExpanded ? "bg-white" : "bg-[#347FC4]"
                    }`}
                  ></div>
                </div>

                {/* Timeline Card */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleExpand(item.id);
                    }
                  }}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#347FC4] focus-visible:outline-none ${
                    isExpanded
                      ? "bg-white border-[#7D6B91]/25 shadow-card-elevated"
                      : "bg-white/80 border-[#7D6B91]/15 hover:border-[#347FC4]/40 hover:bg-white shadow-sm"
                  }`}
                >
                  {/* Top Bar: Role & Company */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-bold text-lg sm:text-xl text-[#272838] group-hover:text-[#347FC4] transition-colors">
                          {item.company}
                        </span>
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#EEF0F8] border border-[#7D6B91]/15 text-[#347FC4] font-semibold">
                          {item.type}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-[#5D536B] mt-1">
                        {item.role}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-[#5D536B] shrink-0">
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EEF0F8] border border-[#7D6B91]/15 text-[#347FC4] font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.period}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#5D536B] transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-[#347FC4]" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Location indicator */}
                  <div className="flex items-center gap-1.5 text-xs text-[#5D536B] font-mono mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#347FC4]" />
                    <span>{item.location}</span>
                  </div>

                  {/* Expandable Section: Responsibilities & Contributions */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? "max-h-[500px] opacity-100 mt-4 pt-4 border-t border-[#7D6B91]/15"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-[#5D536B] block mb-3 font-semibold">
                      Key Contributions &amp; Responsibilities:
                    </span>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-[#5D536B]">
                      {item.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#347FC4] shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {item.techStack && item.techStack.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-[#7D6B91]/15 flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-mono text-[#5D536B] mr-1">Stack:</span>
                        {item.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#EEF0F8] border border-[#7D6B91]/15 text-[#5D536B]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { skillCategories as fallbackSkillCategories } from "@/data/portfolioData";
import { SkillCategory } from "@/types/portfolio";
import {
  Code2,
  Palette,
  Users,
  Cpu,
  Database,
  Wrench,
  Globe,
  Terminal,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function Skills({
  skillCategories: propSkillCategories,
}: {
  skillCategories?: SkillCategory[];
} = {}) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const skillCategories =
    propSkillCategories && propSkillCategories.length > 0
      ? propSkillCategories
      : fallbackSkillCategories;

  const categoryIcons: Record<string, React.ElementType> = {
    Development: Code2,
    Design: Palette,
    "Soft Skills": Users,
    Programming: Code2,
    "Frameworks & Runtime": Cpu,
    Database: Database,
    "Tools & Ecosystem": Wrench,
    "Web & Architecture": Globe,
  };

  const filteredCategories =
    activeCategory === "All"
      ? skillCategories
      : skillCategories.filter((c) => c.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section
      id="skills"
      className="py-20 lg:py-28 bg-[#F7F8FC] relative border-t border-[#7D6B91]/15"
      aria-label="Technical Stack and Capabilities"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[#347FC4] rounded-full"></div>
              <span className="text-xs font-mono tracking-widest text-[#347FC4] uppercase font-bold">
                Capabilities &amp; Stack
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#272838] tracking-tight">
              Skills &amp; Expertise
            </h2>
            <p className="text-sm sm:text-base text-[#5D536B] mt-2 max-w-xl">
              Verified full-stack engineering tools, modern web design competencies, and collaborative execution skills from real projects.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-[#7D6B91]/20 shadow-card-subtle">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === "All"
                  ? "bg-[#347FC4] text-white shadow-sm"
                  : "text-[#5D536B] hover:text-[#272838] hover:bg-[#EEF0F8]"
              }`}
            >
              All Categories
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory.toLowerCase() === cat.category.toLowerCase()
                    ? "bg-[#347FC4] text-white shadow-sm"
                    : "text-[#5D536B] hover:text-[#272838] hover:bg-[#EEF0F8]"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Stack */}
        <div className="space-y-8">
          {filteredCategories.map((cat) => {
            const IconComponent = categoryIcons[cat.category] || Terminal;
            const isDesign = cat.category.toLowerCase().includes("design");
            const isSoft = cat.category.toLowerCase().includes("soft");

            return (
              <div
                key={cat.category}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-card-subtle hover:shadow-card-elevated transition-shadow"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-[#7D6B91]/10 gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#347FC4]/10 border border-[#347FC4]/20 flex items-center justify-center text-[#347FC4] shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-lg sm:text-xl text-[#272838]">
                          {cat.category}
                        </h3>
                        {isDesign && (
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-[#7D6B91]/10 text-[#7D6B91] border border-[#7D6B91]/20 font-semibold">
                            UI &amp; Visual
                          </span>
                        )}
                        {isSoft && (
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-[#989FCE]/15 text-[#5D536B] border border-[#989FCE]/30 font-semibold">
                            Team &amp; Process
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#5D536B] mt-0.5">{cat.description}</p>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-[#5D536B] font-semibold self-start sm:self-auto bg-[#EEF0F8] px-3.5 py-1.5 rounded-full border border-[#7D6B91]/15">
                    {cat.skills.length} {isSoft ? "Competencies" : isDesign ? "Skills" : "Technologies"}
                  </span>
                </div>

                {/* Skill Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-4 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/15 hover:border-[#347FC4]/40 hover:bg-[#EEF0F8] hover:shadow-2xs transition-all duration-200 group flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono text-[#5D536B] group-hover:text-[#347FC4] transition-colors font-medium">
                          {skill.tag || "Standard"}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#347FC4]/40 group-hover:bg-[#347FC4] transition-colors"></div>
                      </div>

                      <div className="flex items-center justify-between gap-1">
                        <span className="font-display font-bold text-sm sm:text-base text-[#272838] group-hover:text-[#347FC4] transition-colors">
                          {skill.name}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#347FC4] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

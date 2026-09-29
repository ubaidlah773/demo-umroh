"use client";

import React, { useState } from "react";
import { skillCategories as fallbackSkillCategories } from "@/data/portfolioData";
import { SkillCategory } from "@/types/portfolio";
import {
  Code2,
  Cpu,
  Database,
  Wrench,
  Globe,
  Terminal,
  Layers,
  Sparkles,
  Check,
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
    Programming: Code2,
    "Frameworks & Runtime": Cpu,
    Database: Database,
    "Tools & Ecosystem": Wrench,
    "Web & Architecture": Globe,
  };

  const filteredCategories =
    activeCategory === "All"
      ? skillCategories
      : skillCategories.filter((c) => c.category === activeCategory);

  return (
    <section
      id="skills"
      className="py-20 lg:py-28 bg-[#F7F8FC] relative border-t border-[#7D6B91]/15"
      aria-label="Technical Stack and Skills"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-accent-blue rounded-full"></div>
              <span className="text-xs font-mono tracking-widest text-accent-blue uppercase font-bold">
                Technical Stack
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#272838] tracking-tight">
              Technology Ecosystem
            </h2>
            <p className="text-sm sm:text-base text-[#5D536B] mt-2 max-w-xl">
              Languages, runtimes, relational databases, and architectural standards used in production.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-[#7D6B91]/20 shadow-card-subtle">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === "All"
                  ? "bg-accent-blue text-white shadow-sm"
                  : "text-[#5D536B] hover:text-[#272838] hover:bg-[#EEF0F8]"
              }`}
            >
              All Categories
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat.category
                    ? "bg-accent-blue text-white shadow-sm"
                    : "text-[#5D536B] hover:text-[#272838] hover:bg-[#EEF0F8]"
                }`}
              >
                {cat.category.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Stack */}
        <div className="space-y-8">
          {filteredCategories.map((cat) => {
            const IconComponent = categoryIcons[cat.category] || Terminal;
            return (
              <div
                key={cat.category}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-card-subtle hover:shadow-card-elevated transition-shadow"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-[#7D6B91]/10 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#272838]">
                        {cat.category}
                      </h3>
                      <p className="text-xs text-[#5D536B]">{cat.description}</p>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-[#7D6B91] font-medium self-start sm:self-auto bg-[#EEF0F8] px-3 py-1 rounded-full border border-[#7D6B91]/15">
                    {cat.skills.length} Technologies
                  </span>
                </div>

                {/* Skill Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-4 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/15 hover:border-accent-blue/50 hover:bg-[#EEF0F8] transition-all duration-200 group flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono text-[#5D536B] group-hover:text-accent-blue transition-colors">
                          {skill.tag || "Standard"}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-blue/60 group-hover:bg-accent-blue transition-colors"></div>
                      </div>

                      <span className="font-display font-bold text-sm sm:text-base text-[#272838] group-hover:text-accent-blue transition-colors">
                        {skill.name}
                      </span>
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

"use client";

import React from "react";
import { educationData as fallbackEducationData } from "@/data/portfolioData";
import { EducationItem } from "@/types/portfolio";
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Code2,
  FileCheck,
  Sparkles,
} from "lucide-react";

export default function Education({
  education: propEducation,
}: {
  education?: EducationItem[];
} = {}) {
  const items =
    propEducation && propEducation.length > 0
      ? propEducation
      : fallbackEducationData;

  return (
    <section
      id="education"
      className="py-20 lg:py-28 bg-[#EEF0F8] relative border-t border-[#7D6B91]/15"
      aria-label="Education and Academic Credentials"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-accent-blue rounded-full"></div>
              <span className="text-xs font-mono tracking-widest text-accent-blue uppercase font-bold">
                Education &amp; Credentials
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#272838] tracking-tight">
              Academic Background &amp; Honors
            </h2>
            <p className="text-sm sm:text-base text-[#5D536B] mt-2 max-w-xl">
              Formal informatics degree and intensive tech academy training in software engineering.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#5D536B] bg-white px-3.5 py-2 rounded-xl border border-[#7D6B91]/20 shadow-card-subtle w-fit">
            <Award className="w-3.5 h-3.5 text-accent-blue" />
            <span className="font-semibold">Honors &amp; Published Research</span>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-7 sm:p-9 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-card-subtle hover:shadow-card-elevated flex flex-col justify-between hover:border-accent-blue/40 transition-all duration-300 group"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue group-hover:scale-105 transition-transform">
                    {idx === 0 ? (
                      <GraduationCap className="w-6 h-6" />
                    ) : (
                      <Code2 className="w-6 h-6" />
                    )}
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-[#F7F8FC] border border-[#7D6B91]/15 text-xs font-mono text-[#5D536B] flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-accent-blue" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Institution & Degree */}
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#272838] group-hover:text-accent-blue transition-colors">
                  {item.institution}
                </h3>
                <span className="text-base text-[#5D536B] font-medium block mt-1">
                  {item.degree}
                </span>

                {/* Grade / GPA Indicator */}
                {item.gradeValue && (
                  <div className="mt-5 p-4 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/15 flex items-center justify-between">
                    <span className="text-xs font-mono text-[#5D536B] font-semibold uppercase tracking-wider">
                      {item.gradeLabel || "Grade"}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-extrabold text-2xl text-accent-blue">
                        {item.gradeValue}
                      </span>
                    </div>
                  </div>
                )}

                {/* Achievements List */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#272838] font-bold flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-accent-blue" />
                      Key Achievements
                    </span>
                    <div className="space-y-2.5">
                      {item.achievements.map((ach, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/15 flex items-start gap-2.5 text-xs sm:text-sm text-[#5D536B]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                          <span className="font-medium text-[#272838]">{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Coursework */}
                {item.coursework && item.coursework.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#272838] font-bold flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-accent-blue" />
                      Relevant Coursework
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.coursework.map((cw) => (
                        <span
                          key={cw}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#F7F8FC] border border-[#7D6B91]/15 text-[#5D536B] font-medium"
                        >
                          {cw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Competencies */}
                {item.competencies && item.competencies.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#272838] font-bold flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-accent-blue" />
                      Core Competencies
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      {item.competencies.map((comp) => (
                        <div
                          key={comp}
                          className="p-2.5 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/15 text-xs text-[#5D536B] font-medium flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0"></span>
                          <span className="truncate">{comp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-5 border-t border-[#7D6B91]/10 flex items-center justify-between text-xs font-mono text-[#7D6B91]">
                <span>Verified Academic Credential</span>
                <span className="text-accent-blue font-semibold">Official Record</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

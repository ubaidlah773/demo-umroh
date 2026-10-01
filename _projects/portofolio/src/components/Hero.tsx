"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { personalInfo as fallbackPersonalInfo } from "@/data/portfolioData";
import { PersonalInfo } from "@/types/portfolio";
import {
  ArrowRight,
  Download,
  FolderKanban,
  MapPin,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function Hero({
  personalInfo: propPersonalInfo,
}: {
  personalInfo?: PersonalInfo;
} = {}) {
  const personalInfo = propPersonalInfo || fallbackPersonalInfo;
  const coreStack = [
    { name: "Laravel", role: "Backend" },
    { name: "MySQL", role: "Relational DB" },
    { name: "JavaScript", role: "Frontend & DOM" },
    { name: "Node.js", role: "Runtime API" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden tech-grid bg-[#272838]"
      aria-label="Hero Introduction"
    >
      {/* Subtle abstract ambient shapes with low opacity */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] bg-[#347FC4]/[0.10] blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-[380px] h-[380px] bg-[#989FCE]/[0.08] blur-[110px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-[#7D6B91]/[0.10] blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D2E42] border border-[#7D6B91]/30 shadow-sm w-fit mb-6">
              <span className="w-2 h-2 rounded-full bg-[#347FC4]"></span>
              <span className="text-xs font-mono tracking-wider font-semibold text-[#347FC4] uppercase">
                FULL STACK DEVELOPER
              </span>
              <span className="text-[#989FCE]/50">|</span>
              <span className="text-xs font-mono text-[#989FCE] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#347FC4]" />
                Tuban, Indonesia
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-[#F7F8FC] tracking-tight leading-[1.15] mb-6">
              Building practical <span className="text-[#F7F8FC]">web systems</span>
              <br />
              that solve{" "}
              <span className="text-[#347FC4] font-extrabold">
                real-world problems.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#989FCE] leading-relaxed max-w-2xl mb-8">
              Full Stack Developer experienced in building and maintaining web applications using Laravel, JavaScript, Node.js, and MySQL, with additional experience in data analysis and machine learning.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#347FC4] hover:bg-[#2C6EA8] text-white font-medium text-sm transition-all duration-200 shadow-sm shadow-[#347FC4]/25 hover:shadow-md hover:shadow-[#347FC4]/30 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[#347FC4]"
              >
                <FolderKanban className="w-4 h-4" />
                <span>View Projects</span>
              </a>

              <a
                href={personalInfo.cvUrl}
                download="Ahmad_Ubai_Dullah_CV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#2D2E42] hover:bg-[#383A52] text-[#F7F8FC] font-medium text-sm border border-[#7D6B91]/30 hover:border-[#347FC4]/40 shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[#347FC4]"
              >
                <Download className="w-4 h-4 text-[#347FC4]" />
                <span>Download CV</span>
              </a>

              <Link
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#989FCE] hover:text-[#347FC4] transition-colors px-3 py-2 group"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#347FC4]" />
              </Link>
            </div>

            {/* Technical stack pill row */}
            <div className="pt-6 border-t border-[#7D6B91]/20 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-[#989FCE] mr-2">Core Technologies:</span>
              {["Laravel", "MySQL", "JavaScript", "Node.js", "REST API", "CRUD"].map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#2D2E42] border border-[#7D6B91]/25 text-[#989FCE] shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: UBAI Brand Mark & Architecture Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-white border border-[#7D6B91]/20 shadow-2xl overflow-hidden p-6 sm:p-8">
              {/* Subtle Decorative Concentric Ring Layer */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-[#989FCE]/20 pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-[#7D6B91]/15 pointer-events-none"></div>

              {/* Card Header Status */}
              <div className="flex items-center justify-between pb-5 border-b border-[#7D6B91]/15">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold tracking-wider text-[#272838] uppercase">
                    BRAND IDENTITY
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#347FC4]/10 border border-[#347FC4]/25 text-[#347FC4] text-[11px] font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#347FC4] animate-pulse"></span>
                  UBAI EMBLEM
                </div>
              </div>

              {/* Elegant Torii Gate Logo Showcase */}
              <div className="py-8 flex flex-col items-center justify-center text-center relative">
                <div className="relative w-56 sm:w-64 h-36 sm:h-44 transition-transform duration-500 hover:scale-105">
                  <Image
                    src="/brand/ubai-logo-gradient.png"
                    alt="UBAI Japanese Torii Gate Brand Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>

                <div className="mt-4 flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#272838]">
                    <span>Ahmad Ubai Dullah</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#347FC4]" />
                  </div>
                  <span className="text-xs text-[#5D536B] mt-0.5">
                    Full Stack Developer • Database Systems Architect
                  </span>
                </div>
              </div>

              {/* Stack Preview Grid */}
              <div className="pt-5 border-t border-[#7D6B91]/15 grid grid-cols-2 gap-2.5">
                {coreStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="p-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/15 flex items-center justify-between"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[#272838] truncate">
                        {tech.name}
                      </span>
                      <span className="text-[10px] text-[#5D536B] truncate">
                        {tech.role}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#347FC4] bg-white px-1.5 py-0.5 rounded border border-[#7D6B91]/15 shadow-2xs font-semibold">
                      Ready
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

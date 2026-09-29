"use client";

import React from "react";
import Image from "next/image";
import { personalInfo as fallbackPersonalInfo } from "@/data/portfolioData";
import { PersonalInfo } from "@/types/portfolio";
import {
  Database,
  Calendar,
  Users,
  LineChart,
  ShieldCheck,
  Server,
  MapPin,
  GraduationCap,
  Sparkles,
  ClipboardList,
  Cpu,
  Layers,
} from "lucide-react";

export default function About({
  personalInfo: propPersonalInfo,
}: {
  personalInfo?: PersonalInfo;
} = {}) {
  const personalInfo = propPersonalInfo || fallbackPersonalInfo;
  const coreCompetencies = [
    {
      icon: Layers,
      title: "Full Stack Development",
      desc: "Architecting end-to-end web applications combining robust backend services with modern reactive user interfaces.",
    },
    {
      icon: Server,
      title: "Web Applications",
      desc: "Building scalable and maintainable web applications using Laravel, JavaScript, Node.js, and modern MVC architecture.",
    },
    {
      icon: Database,
      title: "Database-Driven Systems",
      desc: "Designing normalized relational schemas in MySQL with strict transactional integrity and optimized indexing.",
    },
    {
      icon: ShieldCheck,
      title: "Public Information Platforms",
      desc: "Creating transparent, SEO-optimized official web portals that deliver accessible public information reliably.",
    },
    {
      icon: ClipboardList,
      title: "Online Registration",
      desc: "Building secure, user-friendly digital registration portals with real-time verification and automated document handling.",
    },
    {
      icon: Calendar,
      title: "Scheduling Systems",
      desc: "Developing conflict-free academic calendars, lesson scheduling matrices, and automated timetable management.",
    },
    {
      icon: Users,
      title: "Internal Administration",
      desc: "Segregating complex organizational workflows with role-based access control (RBAC) and audit-ready data pipelines.",
    },
    {
      icon: LineChart,
      title: "Data Analysis",
      desc: "Processing tabular data, extracting actionable metrics, and generating structured analytical reports for decision makers.",
    },
    {
      icon: Cpu,
      title: "Machine Learning",
      desc: "Implementing practical ML models backed by academic research and finalist recognition in data mining competitions.",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-[#EEF0F8] relative border-t border-[#7D6B91]/15 tech-dots"
      aria-label="About Ahmad Ubai Dullah"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-[2px] bg-[#347FC4]"></div>
          <span className="text-xs font-mono tracking-widest text-[#347FC4] uppercase font-bold">
            About Me
          </span>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* LEFT: Large Statement */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#272838] tracking-tight leading-[1.25] mb-6">
                Engineering reliable,{" "}
                <span className="text-[#347FC4]">
                  database-driven
                </span>{" "}
                web systems where software solves real-world human problems.
              </h2>

              <p className="text-base text-[#5D536B] leading-relaxed mb-8">
                Based in <strong className="text-[#272838] font-semibold">Tuban, Indonesia</strong>, I build practical software solutions that eliminate administrative friction and digitize manual operations. From multi-role school academic platforms to real-time public queue systems, I prioritize structural stability, normalized relational databases, and clean usability.
              </p>
            </div>

            {/* Profile Snapshot Card */}
            <div className="p-5 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#7D6B91]/20 bg-[#F7F8FC]">
                <Image
                  src={personalInfo.profileImage}
                  alt="Ahmad Ubai Dullah portrait"
                  width={64}
                  height={64}
                  className="object-cover object-top w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm text-[#272838]">
                  {personalInfo.name}
                </span>
                <span className="text-xs text-[#5D536B] flex items-center gap-1.5 mt-0.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#347FC4]" />
                  Universitas Negeri Semarang
                </span>
                <span className="text-[11px] font-mono text-[#5D536B] flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-[#347FC4]" />
                  Tuban, East Java, Indonesia
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Professional Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-sm space-y-5">
              <h3 className="font-display font-bold text-lg text-[#272838] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#347FC4]" />
                <span>Professional Background & Philosophy</span>
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-[#5D536B] leading-relaxed">
                <p>
                  As a Full Stack Developer, I specialize in architecting database-driven web platforms using Laravel, JavaScript, Node.js, and MySQL. My work centers on translating real operational workflows into intuitive digital systems that serve diverse stakeholders.
                </p>
                <p>
                  My engineering experience encompasses developing comprehensive school management solutions with granular role permissions, establishing public agency information platforms, and deploying automated visitor queue systems with real-time calling screens.
                </p>
                <p>
                  Complementing web engineering, my technical background includes academic data analysis and machine learning research, culminating in 7 published research articles and competitive finalist recognition in national data mining competitions.
                </p>
              </div>

              {/* Verified Key Highlights from CV */}
              <div className="pt-6 border-t border-[#7D6B91]/15 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/15">
                  <span className="text-xs font-mono text-[#5D536B] block">Academic GPA</span>
                  <span className="font-display font-bold text-lg text-[#272838] mt-1 block">
                    3.80 / 4.00
                  </span>
                  <span className="text-[11px] text-[#5D536B]">UNNES Informatics</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/15">
                  <span className="text-xs font-mono text-[#5D536B] block">RevoU Score</span>
                  <span className="font-display font-bold text-lg text-[#347FC4] mt-1 block">
                    92 / 100
                  </span>
                  <span className="text-[11px] text-[#5D536B]">Tech Academy</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/15 col-span-2 sm:col-span-1">
                  <span className="text-xs font-mono text-[#5D536B] block">Research Work</span>
                  <span className="font-display font-bold text-lg text-[#272838] mt-1 block">
                    7 Publications
                  </span>
                  <span className="text-[11px] text-[#5D536B]">Machine Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 9 Core Specializations Grid */}
        <div className="pt-6">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[#347FC4] font-semibold">
              Core Capabilities
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#272838] mt-1">
              Systems I Specialize In Building
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreCompetencies.map((comp, idx) => {
              const Icon = comp.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-[#7D6B91]/15 hover:border-[#347FC4]/40 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#347FC4]/10 border border-[#347FC4]/25 flex items-center justify-center text-[#347FC4] mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-base text-[#272838] mb-2 group-hover:text-[#347FC4] transition-colors">
                    {comp.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5D536B] leading-relaxed">
                    {comp.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

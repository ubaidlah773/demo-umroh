"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { personalInfo as fallbackPersonalInfo } from "@/data/portfolioData";
import { PersonalInfo } from "@/types/portfolio";
import { ArrowUp, Github, Linkedin, Mail, MapPin, Wrench, GraduationCap, ArrowUpRight } from "lucide-react";

export default function Footer({
  personalInfo: propPersonalInfo,
}: {
  personalInfo?: PersonalInfo;
} = {}) {
  const personalInfo = propPersonalInfo || fallbackPersonalInfo;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-[#161722] border-t border-[#7D6B91]/20 text-[#989FCE] pt-16 pb-12">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#7D6B91]/20 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1E1F2D] border border-[#7D6B91]/30 flex items-center justify-center p-1.5 shadow-card-subtle">
                <Image
                  src="/brand/ubai-logo-white.png"
                  alt="UBAI Logo"
                  width={36}
                  height={25}
                  className="w-auto h-6 object-contain"
                />
              </div>
              <div>
                <span className="font-display font-extrabold text-base text-[#F7F8FC] block tracking-tight">
                  {personalInfo.name}
                </span>
                <span className="text-xs font-mono text-[#989FCE] font-medium">
                  Full Stack Developer
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#989FCE] leading-relaxed max-w-sm">
              Engineering database-driven web applications and scalable digital platforms built with Laravel, JavaScript, Node.js, and MySQL.
            </p>

            <div className="flex items-center gap-1.5 text-xs font-mono text-[#989FCE]">
              <MapPin className="w-3.5 h-3.5 text-accent-blue" />
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#F7F8FC] font-bold block">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[#989FCE] hover:text-[#F7F8FC] transition-colors py-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Ecosystem / Apps */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#F7F8FC] font-bold block">
              Ecosystem
            </span>
            <div className="space-y-2 text-xs font-medium">
              <a
                href="https://tools.ubaitech.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#989FCE] hover:text-[#347FC4] transition-colors py-1 group"
              >
                <Wrench className="w-3.5 h-3.5 text-[#347FC4]" />
                <span>Tools Platform</span>
                <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://class.ubaitech.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#989FCE] hover:text-[#347FC4] transition-colors py-1 group"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#347FC4]" />
                <span>Office Class</span>
                <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Connect / Socials */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#F7F8FC] font-bold block">
              Connect
            </span>
            <div className="space-y-2 text-xs font-mono">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#989FCE] hover:text-[#F7F8FC] transition-colors py-1"
              >
                <Linkedin className="w-3.5 h-3.5 text-accent-blue" />
                <span>{personalInfo.linkedinDisplay}</span>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#989FCE] hover:text-[#F7F8FC] transition-colors py-1"
              >
                <Github className="w-3.5 h-3.5 text-[#F7F8FC]" />
                <span>{personalInfo.githubDisplay}</span>
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-[#989FCE] hover:text-[#F7F8FC] transition-colors py-1"
              >
                <Mail className="w-3.5 h-3.5 text-accent-blue" />
                <span>{personalInfo.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright + Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#989FCE]">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 {personalInfo.name}. All rights reserved.</span>
            <span>•</span>
            <span className="text-accent-blue font-semibold">ubaitech.my.id</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#989FCE] hover:text-[#F7F8FC] transition-colors group font-semibold cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}

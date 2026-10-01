"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { personalInfo as fallbackPersonalInfo } from "@/data/portfolioData";
import { PersonalInfo } from "@/types/portfolio";
import { Menu, X, Download, ArrowUpRight, Mail } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
];

export default function Navbar({
  personalInfo: propPersonalInfo,
}: {
  personalInfo?: PersonalInfo;
} = {}) {
  const personalInfo = propPersonalInfo || fallbackPersonalInfo;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section intersection detection
      const sections = [...navLinks.map((link) => link.href.substring(1)), "contact"];
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2.5 bg-[#272838]/90 backdrop-blur-md border-b border-[#7D6B91]/25 shadow-lg"
          : "py-5 bg-[#272838]/70 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand: UBAI Torii */}
          <Link
            href="#"
            className="group flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-[#347FC4] rounded-lg py-1 px-1 -ml-1 transition-opacity hover:opacity-90"
            aria-label="UBAI — Ahmad Ubai Dullah Portfolio Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
              <Image
                src="/brand/ubai-logo-white.png"
                alt="UBAI Torii Logo"
                fill
                priority
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-sm sm:text-base tracking-wider text-[#F7F8FC] leading-none group-hover:text-[#347FC4] transition-colors">
                UBAI
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#989FCE] tracking-tight mt-0.5">
                Full Stack Developer
              </span>
            </div>
          </Link>

          {/* Desktop Center Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 bg-[#1F202F]/80 p-1.5 rounded-full border border-[#7D6B91]/25 backdrop-blur-sm shadow-sm"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#347FC4] text-white font-semibold shadow-sm"
                      : "text-[#989FCE] hover:text-[#FFFFFF] hover:bg-[#7D6B91]/20"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions: Contact & Download CV */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              href="#contact"
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeSection === "contact"
                  ? "text-[#347FC4] font-semibold bg-[#347FC4]/15"
                  : "text-[#989FCE] hover:text-[#FFFFFF] hover:bg-[#7D6B91]/20"
              }`}
            >
              Contact
            </Link>

            <a
              href={personalInfo.cvUrl}
              download="Ahmad_Ubai_Dullah_CV.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#347FC4] hover:bg-[#2C6EA8] text-white text-xs font-semibold shadow-sm shadow-[#347FC4]/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[#347FC4]"
              aria-label="Download Ahmad Ubai Dullah CV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#2D2E42] border border-[#7D6B91]/30 text-[#F7F8FC] hover:border-[#347FC4]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#347FC4] shadow-sm transition-colors"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[60px] z-40 bg-[#272838]/98 backdrop-blur-xl md:hidden border-b border-[#7D6B91]/25 flex flex-col p-6 animate-fadeIn shadow-2xl overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="flex flex-col gap-1.5 pt-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-[#347FC4] text-white font-semibold shadow-sm"
                      : "text-[#989FCE] hover:text-[#FFFFFF] hover:bg-[#7D6B91]/20"
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                activeSection === "contact"
                  ? "bg-[#347FC4] text-white font-semibold shadow-sm"
                  : "text-[#989FCE] hover:text-[#FFFFFF] hover:bg-[#7D6B91]/20"
              }`}
            >
              <span>Contact</span>
              <Mail className="w-4 h-4 opacity-50" />
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-[#7D6B91]/25 flex flex-col gap-3">
            <a
              href={personalInfo.cvUrl}
              download="Ahmad_Ubai_Dullah_CV.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#347FC4] text-white text-sm font-semibold shadow-md shadow-[#347FC4]/25 transition-transform active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
            <div className="text-center text-xs font-mono text-[#989FCE] mt-1">
              Tuban, East Java, Indonesia
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

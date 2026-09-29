"use client";

import React, { useState } from "react";
import { personalInfo as fallbackPersonalInfo } from "@/data/portfolioData";
import { PersonalInfo } from "@/types/portfolio";
import {
  Mail,
  Linkedin,
  Github,
  Download,
  Phone,
  MapPin,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  MessageSquare,
} from "lucide-react";

export default function Contact({
  personalInfo: propPersonalInfo,
}: {
  personalInfo?: PersonalInfo;
} = {}) {
  const personalInfo = propPersonalInfo || fallbackPersonalInfo;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSent, setFormSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formState.subject || `Inquiry from ${formState.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    )}`;
    window.location.href = mailtoUrl;
    setFormSent(true);
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-[#F7F8FC] relative border-t border-[#7D6B91]/15 overflow-hidden"
      aria-label="Contact Ahmad Ubai Dullah"
    >
      {/* Ambient background glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-accent-blue/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#7D6B91]/20 shadow-card-subtle mb-4">
              <span className="w-2 h-2 rounded-full bg-accent-blue"></span>
              <span className="text-xs font-mono tracking-wider font-bold text-[#272838] uppercase">
                Direct Communication
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#272838] tracking-tight mb-4">
              Have a project in mind?
            </h2>
            <p className="text-base sm:text-lg text-[#5D536B] max-w-xl mx-auto font-medium">
              Let&apos;s build something useful together.
            </p>
          </div>

          {/* Primary Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent-blue hover:bg-[#2C6EA8] text-white font-semibold text-sm transition-all duration-200 shadow-accent-sm hover:shadow-accent-md hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4" />
              <span>Email Me</span>
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#EEF0F8] text-[#272838] font-semibold text-sm border border-[#7D6B91]/20 hover:border-accent-blue/50 shadow-card-subtle transition-all duration-200 hover:-translate-y-0.5"
            >
              <Linkedin className="w-4 h-4 text-accent-blue" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#5D536B]" />
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#EEF0F8] text-[#272838] font-semibold text-sm border border-[#7D6B91]/20 hover:border-accent-blue/50 shadow-card-subtle transition-all duration-200 hover:-translate-y-0.5"
            >
              <Github className="w-4 h-4 text-[#272838]" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#5D536B]" />
            </a>

            <a
              href={personalInfo.cvUrl}
              download="Ahmad_Ubai_Dullah_CV.pdf"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#EEF0F8] text-[#272838] font-semibold text-sm border border-[#7D6B91]/20 hover:border-accent-blue/50 shadow-card-subtle transition-all duration-200 hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4 text-accent-blue" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Detailed Contact Grid: Contact Channels + Quick Message Form */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct Contact Info Channels */}
            <div className="md:col-span-5 space-y-4">
              {/* Email Card with Copy Trigger */}
              <div className="p-5 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-card-subtle space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#5D536B] font-semibold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-accent-blue" />
                    Direct Email
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 text-[11px] font-mono text-accent-blue hover:text-[#2C6EA8] transition-colors font-semibold"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-accent-blue" />
                        <span className="text-accent-blue font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="font-mono text-sm text-[#272838] hover:text-accent-blue font-bold block transition-colors break-all"
                >
                  {personalInfo.email}
                </a>
              </div>

              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-card-subtle space-y-2">
                <span className="text-xs font-mono text-[#5D536B] font-semibold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-accent-blue" />
                  Phone / WhatsApp
                </span>
                <a
                  href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, "")}`}
                  className="font-mono text-sm text-[#272838] hover:text-accent-blue font-bold block transition-colors"
                >
                  {personalInfo.phone}
                </a>
              </div>

              {/* Location Card */}
              <div className="p-5 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-card-subtle space-y-2">
                <span className="text-xs font-mono text-[#5D536B] font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent-blue" />
                  Location
                </span>
                <span className="font-display font-bold text-sm text-[#272838] block">
                  {personalInfo.location}
                </span>
                <span className="text-xs text-[#5D536B] block">
                  UTC+7 (WIB) • Available for Remote &amp; On-Site Collaborations
                </span>
              </div>
            </div>

            {/* Right Column: Quick Message Form */}
            <div className="md:col-span-7 p-6 sm:p-8 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-card-subtle">
              <div className="flex items-center gap-2 mb-5">
                <MessageSquare className="w-4 h-4 text-accent-blue" />
                <h3 className="font-display font-bold text-base text-[#272838]">
                  Send a Direct Message
                </h3>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono text-[#5D536B] font-semibold mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-[#272838] placeholder-[#5D536B]/50 text-xs focus:border-accent-blue focus:bg-white focus:ring-1 focus:ring-accent-blue outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono text-[#5D536B] font-semibold mb-1"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-[#272838] placeholder-[#5D536B]/50 text-xs focus:border-accent-blue focus:bg-white focus:ring-1 focus:ring-accent-blue outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono text-[#5D536B] font-semibold mb-1"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState({ ...formState, subject: e.target.value })
                    }
                    placeholder="Project Inquiry: Web System Development"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-[#272838] placeholder-[#5D536B]/50 text-xs focus:border-accent-blue focus:bg-white focus:ring-1 focus:ring-accent-blue outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono text-[#5D536B] font-semibold mb-1"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    placeholder="Briefly describe your system requirements, scope, or timeline..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/25 text-[#272838] placeholder-[#5D536B]/50 text-xs focus:border-accent-blue focus:bg-white focus:ring-1 focus:ring-accent-blue outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-accent-blue hover:bg-[#2C6EA8] text-white font-semibold text-xs sm:text-sm shadow-accent-sm transition-all duration-200 active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send via Email Client</span>
                </button>

                {formSent && (
                  <p className="text-center text-xs text-accent-blue font-mono mt-2 font-semibold">
                    Email composer launched. Thank you for reaching out!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { defaultAgent, advisorBio } from "@/data/agent";
import { useInquiry } from "@/context/InquiryContext";
import { ArrowRight, MessageSquare, Instagram, Linkedin, ShieldCheck, Award } from "lucide-react";

export default function AgentProfile() {
  const { openInquiry } = useInquiry();

  return (
    <section className="bg-lumea-bg border-y border-lumea-border py-20 sm:py-28 overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto rounded-lg overflow-hidden border border-lumea-border shadow-lumea-card bg-white">
              <Image
                src={defaultAgent.avatar}
                alt={`${defaultAgent.name}, Senior Property Consultant at LUMÉA`}
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating Verified Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md border border-lumea-border rounded-md shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-editorial text-lg text-lumea-primary font-medium">
                      {defaultAgent.name}
                    </h4>
                    <p className="text-xs text-lumea-secondary">{defaultAgent.role}</p>
                  </div>
                  <div className="flex items-center gap-1 text-lumea-accent">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-[11px] font-semibold tracking-wider uppercase">Licensed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative architectural background element */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-lumea-accent/30 pointer-events-none hidden sm:block" />
          </div>

          {/* Narrative & Statistics Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-[1px] w-6 bg-lumea-accent" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-lumea-accent">
                MEET YOUR PROPERTY ADVISOR
              </span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-lumea-primary font-light leading-tight mb-4">
              A bespoke, discreet advisory partnership.
            </h2>

            <p className="font-editorial text-xl sm:text-2xl text-lumea-secondary italic mb-6">
              &ldquo;{advisorBio.headline}&rdquo;
            </p>

            <div className="space-y-4 text-sm sm:text-base text-lumea-secondary leading-relaxed mb-8">
              <p>{advisorBio.intro}</p>
              <p className="text-sm">{advisorBio.extendedBio}</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-lumea-border mb-8">
              {advisorBio.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-editorial text-3xl sm:text-4xl text-lumea-primary font-light mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-lumea-secondary">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Cluster & Social Links */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => openInquiry()}
                className="inline-flex items-center justify-center gap-2 py-3.5 px-8 bg-lumea-primary text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-lumea-accent transition-colors min-h-[44px]"
              >
                <span>Contact Ahmad</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${defaultAgent.whatsapp}?text=Hello%20Ahmad%2C%20I%20would%20like%20to%20consult%20regarding%20LUM%C3%89A%20properties.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-white border border-lumea-border text-lumea-primary hover:border-lumea-accent text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Consultation</span>
              </a>

              {/* Social Channels */}
              <div className="flex items-center justify-center gap-2 pt-2 sm:pt-0 sm:ml-auto">
                <a
                  href={advisorBio.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white border border-lumea-border text-lumea-secondary hover:text-lumea-primary hover:border-lumea-accent transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Instagram profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={advisorBio.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white border border-lumea-border text-lumea-secondary hover:text-lumea-primary hover:border-lumea-accent transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

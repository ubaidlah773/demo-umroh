import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AgentProfile from "@/components/AgentProfile";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialSection from "@/components/TestimonialSection";
import FinalCTA from "@/components/FinalCTA";
import { ChevronRight, ShieldCheck, Compass, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About LUMÉA • Bespoke Property Advisory",
  description:
    "Learn about LUMÉA's quiet luxury philosophy, architectural due diligence, and meet Senior Property Consultant Ahmad Ubaid.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-36">
      {/* Breadcrumb & Hero */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <nav className="flex items-center gap-2 text-xs text-lumea-secondary mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-lumea-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-lumea-secondary/60" />
          <span className="text-lumea-primary font-medium">About LUMÉA</span>
        </nav>

        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-[1px] w-6 bg-lumea-accent" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-lumea-accent">
              ABOUT OUR ADVISORY
            </span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-lumea-primary font-light leading-tight mb-6">
            A Discerning Approach to Prime Real Estate.
          </h1>
          <p className="font-editorial text-2xl sm:text-3xl text-lumea-secondary italic font-normal leading-relaxed mb-6">
            &ldquo;Property, curated for your next chapter.&rdquo;
          </p>
          <p className="text-base sm:text-lg text-lumea-secondary leading-relaxed max-w-2xl">
            LUMÉA is an independent luxury property consultancy founded to bridge the divide between world-class architectural discernment, ironclad legal due diligence, and discreet private client representation across Indonesia.
          </p>
        </div>
      </div>

      {/* Narrative Section with Architectural Visual */}
      <section className="bg-white border-y border-lumea-border py-16 sm:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] uppercase tracking-widest text-lumea-accent font-semibold block">
                The Origin
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-lumea-primary font-normal leading-tight">
                Beyond Generic Brokerage: Curated Advisory.
              </h2>
              <p className="text-sm sm:text-base text-lumea-secondary leading-relaxed">
                In an era dominated by high-volume listing aggregators and aggressive sales quotas, finding an authentic property partner has become increasingly rare. Most portals overwhelm buyers with thousands of duplicate, unvetted listings.
              </p>
              <p className="text-sm sm:text-base text-lumea-secondary leading-relaxed">
                LUMÉA operates as a fiduciary advisor. We preview every property in person, scrutinize land certificates (SHM/HGB) at the National Land Agency, evaluate structural bioclimatic suitability, and only represent homes that meet our exacting standards.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded bg-lumea-bg border border-lumea-border">
                  <ShieldCheck className="w-5 h-5 text-lumea-accent mb-2" />
                  <h4 className="font-editorial text-lg text-lumea-primary font-medium">Full Title Verification</h4>
                  <p className="text-xs text-lumea-secondary mt-1">Zero unvetted or disputed listings.</p>
                </div>
                <div className="p-4 rounded bg-lumea-bg border border-lumea-border">
                  <Award className="w-5 h-5 text-lumea-accent mb-2" />
                  <h4 className="font-editorial text-lg text-lumea-primary font-medium">Architectural Merit</h4>
                  <p className="text-xs text-lumea-secondary mt-1">Properties designed for living and longevity.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] rounded-xl overflow-hidden border border-lumea-border bg-lumea-surface">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                alt="Architectural sanctuary interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars Component */}
      <WhyChooseUs />

      {/* Advisor Profile Component */}
      <div id="advisor">
        <AgentProfile />
      </div>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Final Call to Action */}
      <FinalCTA />
    </div>
  );
}

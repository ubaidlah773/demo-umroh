"use client";

import React, { useState } from "react";
import DemoBanner from "@/components/DemoBanner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Programs from "@/components/Programs";
import WhyUs from "@/components/WhyUs";
import RegistrationSteps from "@/components/RegistrationSteps";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import RegistrationModal from "@/components/RegistrationModal";

export default function Home() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative selection:bg-rose-100 selection:text-navy-950">
      {/* Top Demo Banner */}
      <DemoBanner />

      {/* Sticky Header / Navbar */}
      <Navbar onOpenRegisterModal={() => setIsRegisterModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenRegisterModal={() => setIsRegisterModalOpen(true)} />

        {/* Trust / Stats Section */}
        <Stats />

        {/* Section: Tentang */}
        <About />

        {/* Section: Program Pelatihan */}
        <Programs />

        {/* Section: Kenapa Memilih Kami */}
        <WhyUs />

        {/* Section: Alur Pendaftaran */}
        <RegistrationSteps
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        />

        {/* Section: Dokumentasi */}
        <Gallery />

        {/* Section: Testimoni */}
        <Testimonials />

        {/* Section: FAQ */}
        <FAQ />

        {/* Section: CTA Besar */}
        <CTA onOpenRegisterModal={() => setIsRegisterModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Interactive Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
}

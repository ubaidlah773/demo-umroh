"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Packages } from "@/components/Packages";
import { WhyUs } from "@/components/WhyUs";
import { DepartureSchedule } from "@/components/DepartureSchedule";
import { RegistrationSteps } from "@/components/RegistrationSteps";
import { Facilities } from "@/components/Facilities";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { About } from "@/components/About";
import { Legality } from "@/components/Legality";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { InquiryModal } from "@/components/InquiryModal";

export default function Home() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const handleOpenInquiry = () => {
    setIsInquiryOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryOpen(false);
  };

  return (
    <main className="min-h-screen flex flex-col bg-ivory-50 text-slate-800">
      {/* 1. Sticky Navbar */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* 2. Hero Section */}
      <Hero onOpenInquiry={handleOpenInquiry} />

      {/* 3. Trust Strip (4 Indicators) */}
      <TrustStrip />

      {/* 4. Section: Paket Umroh (3 Package Cards + Detail Modal) */}
      <Packages />

      {/* 5. Section: Kenapa Safara (Why Us - 4 Features) */}
      <WhyUs />

      {/* 6. Section: Jadwal Keberangkatan (Table / Card List + Filters) */}
      <DepartureSchedule />

      {/* 7. Section: Alur Pendaftaran (5-Step Visual Timeline) */}
      <RegistrationSteps />

      {/* 8. Section: Fasilitas Selama Perjalanan (Grid 6 Amenities + Disclaimer) */}
      <Facilities />

      {/* 9. Section: Galeri Dokumentasi (Photo Grid with Lightbox) */}
      <Gallery />

      {/* 10. Section: Testimoni (3 Demo Cards) */}
      <Testimonials />

      {/* 11. Section: Tentang Kami (Concept & Values) */}
      <About />

      {/* 12. Section: Informasi Legalitas / Trust (3 Placeholders + Verification Note) */}
      <Legality />

      {/* 13. Section: FAQ (7 Accordion Items) */}
      <FAQ />

      {/* 14. Section: CTA Besar (Deep Emerald & Gold) */}
      <CTA />

      {/* 15. Footer (Links, Contact Placeholders, Socials & Disclaimer) */}
      <Footer />

      {/* 16. Floating WhatsApp Button */}
      <WhatsAppFloatingButton />

      {/* 17. Quick Consultation / Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={handleCloseInquiry}
      />
    </main>
  );
}

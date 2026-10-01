"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Packages } from "@/components/Packages";
import { DepartureSchedule } from "@/components/DepartureSchedule";
import { Facilities } from "@/components/Facilities";
import { RegistrationSteps } from "@/components/RegistrationSteps";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
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

      {/* 3. Trust Section (4 Indikator) */}
      <TrustStrip />

      {/* 4. Section: Pilihan Paket Umroh (3 Package Cards + Detail Modal) */}
      <Packages />

      {/* 5. Section: Jadwal Keberangkatan (Table / Card List + CTA Cek Jadwal) */}
      <DepartureSchedule />

      {/* 6. Section: Fasilitas Jamaah (6 Cards Grid + Catatan) */}
      <Facilities />

      {/* 7. Section: Alur Pendaftaran (5-Step Modern Timeline) */}
      <RegistrationSteps />

      {/* 8. Section: Galeri Suasana Ibadah (Generik + Badge Contoh Galeri) */}
      <Gallery />

      {/* 9. Section: Contoh Testimoni (Peserta Demo 01, 02, 03) */}
      <Testimonials />

      {/* 10. Section: Legalitas Travel (3 Placeholders + Keterangan) */}
      <Legality />

      {/* 11. Section: FAQ (7 Pertanyaan dengan Accordion) */}
      <FAQ />

      {/* 12. Section: CTA Besar (Siap Mempersiapkan Perjalanan Anda?) */}
      <CTA />

      {/* 13. Footer (DEMO UMROH, Navigasi, Kontak, Disclaimer) */}
      <Footer />

      {/* 14. Floating WhatsApp Button (Mobile & Desktop) */}
      <WhatsAppFloatingButton />

      {/* 15. Quick Consultation / Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={handleCloseInquiry}
      />
    </main>
  );
}

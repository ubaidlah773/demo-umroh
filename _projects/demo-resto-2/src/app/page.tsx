import React from "react";
import Hero from "@/components/Hero";
import QuickInfoBar from "@/components/QuickInfoBar";
import IntroStory from "@/components/IntroStory";
import ExperienceGrid from "@/components/ExperienceGrid";
import SignatureMenuPreview from "@/components/SignatureMenuPreview";
import FeaturedFood from "@/components/FeaturedFood";
import LiveMusicSection from "@/components/LiveMusicSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InstagramSection from "@/components/InstagramSection";
import LocationSection from "@/components/LocationSection";
import ReservationSection from "@/components/ReservationSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-charcoal-950 text-ivory-100 overflow-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Quick Information Bar */}
      <QuickInfoBar />

      {/* 3. Introduction Storytelling Section (60/40 Asymmetric) */}
      <IntroStory />

      {/* 4. Experience Section (5 Core Experiences) */}
      <ExperienceGrid />

      {/* 5. Signature Menu Highlights */}
      <SignatureMenuPreview />

      {/* 6. Featured Food Hero (Nasi Iga Bakar) */}
      <FeaturedFood />

      {/* 7. Live Music & Entertainment */}
      <LiveMusicSection />

      {/* 8. Cinematic Atmosphere Gallery */}
      <GallerySection isFullPage={false} />

      {/* 9. Guest Reviews & Social Proof (4.5/5 from 699+ Google Reviews) */}
      <TestimonialsSection />

      {/* 10. Instagram Visual Showcase */}
      <InstagramSection />

      {/* 11. Interactive Location, Maps & Directions */}
      <LocationSection />

      {/* 12. Reservation CTA Before Footer */}
      <ReservationSection />
    </main>
  );
}

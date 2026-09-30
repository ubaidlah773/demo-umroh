import React from "react";
import Hero from "@/components/Hero";
import QuickInfo from "@/components/QuickInfo";
import StorySection from "@/components/StorySection";
import ExperienceSection from "@/components/ExperienceSection";
import SignatureMenu from "@/components/SignatureMenu";
import PrivateEvents from "@/components/PrivateEvents";
import GallerySection from "@/components/GallerySection";
import ReviewsSection from "@/components/ReviewsSection";
import LocationSection from "@/components/LocationSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ivory-100 text-espresso-900 selection:bg-champagne-500/25 selection:text-espresso-950">
      {/* 1. Cinematic Hero with integrated Booking Shortcut */}
      <Hero />

      {/* 2. Quick Restaurant Information Horizontal Strip */}
      <QuickInfo />

      {/* 3. Story Section (Crafted with Intention) */}
      <StorySection />

      {/* 4. The Experience (The Food, The Space, The Service) */}
      <ExperienceSection />

      {/* 5. Signatures Horizontal Menu Showcase */}
      <SignatureMenu />

      {/* 6. Private Events (More Than Dinner) */}
      <PrivateEvents />

      {/* 7. Editorial Asymmetric Gallery */}
      <GallerySection />

      {/* 8. Verified Guest Reviews (Heard at the Table) */}
      <ReviewsSection />

      {/* 9. Location & Contact (Find Us) */}
      <LocationSection />
    </main>
  );
}

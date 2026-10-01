import React from "react";
import Hero from "@/components/Hero";
import PropertySearch from "@/components/PropertySearch";
import FeaturedProperties from "@/components/FeaturedProperties";
import PropertyExplorer from "@/components/PropertyExplorer";
import WhyChooseUs from "@/components/WhyChooseUs";
import LocationExplorer from "@/components/LocationExplorer";
import AgentProfile from "@/components/AgentProfile";
import TestimonialSection from "@/components/TestimonialSection";
import JournalSection from "@/components/JournalSection";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic Hero Section */}
      <Hero />

      {/* 2. Refined Property Search Bar */}
      <PropertySearch />

      {/* 3. Featured Properties Editorial Layout */}
      <FeaturedProperties />

      {/* 4. Interactive Property Explorer with Dynamic Filters */}
      <PropertyExplorer />

      {/* 5. Why Choose Us / "PROPERTY IS PERSONAL" */}
      <WhyChooseUs />

      {/* 6. Location Explorer / "DISCOVER THE RIGHT LOCATION" */}
      <LocationExplorer />

      {/* 7. Agent Profile / "MEET YOUR PROPERTY ADVISOR" */}
      <AgentProfile />

      {/* 8. Testimonials / "WHAT OUR CLIENTS SAY" */}
      <TestimonialSection />

      {/* 9. Property Journal / Editorial Articles */}
      <JournalSection />

      {/* 10. Final Call to Action */}
      <FinalCTA />
    </>
  );
}

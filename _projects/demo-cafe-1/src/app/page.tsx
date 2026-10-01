"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/Hero3D/HeroSection";
import SignatureCoffee from "@/components/SignatureCoffee";
import CoffeeJourney from "@/components/CoffeeJourney";
import OurStory from "@/components/OurStory";
import MacroCoffeeBean3D from "@/components/MacroCoffeeBean3D";
import CoffeeOrigin from "@/components/CoffeeOrigin";
import MenuSection from "@/components/MenuSection";
import CafeExperience from "@/components/CafeExperience";
import SpecialOffer from "@/components/SpecialOffer";
import Testimonials from "@/components/Testimonials";
import LocationSection from "@/components/LocationSection";

export default function Home() {
  const [loadingFinished, setLoadingFinished] = useState(false);

  return (
    <>
      {/* 3D Cinematic Loading Screen (transitions off within ~1.8s) */}
      <LoadingScreen onComplete={() => setLoadingFinished(true)} />

      {/* Main Experience Flow */}
      <div className={`transition-opacity duration-1000 ${loadingFinished ? "opacity-100" : "opacity-0"}`}>
        {/* Section 1: 3D Interactive Hero with Photorealistic Cup & Parallax Beans */}
        <HeroSection />

        {/* Section 2: Signature Coffee (The Art of Coffee with 3D Perspective Tilt) */}
        <SignatureCoffee />

        {/* Section 3: 3D Product Showcase (From Bean to Cup with 3D Bean Inspector) */}
        <CoffeeJourney />

        {/* Section 4: Our Story (More than Coffee) */}
        <OurStory />

        {/* Section 4.5: 3D Coffee Bean Extreme Macro Close-Up */}
        <MacroCoffeeBean3D />

        {/* Section 5: Coffee Origin (Terroir & Single Origins) */}
        <CoffeeOrigin />

        {/* Section 6: Specialty Menu (Espresso, Milk, Cold, Non-Coffee, Pastry) */}
        <MenuSection />

        {/* Section 7: Café Experience (True 3D Environment Scene & Virtual Walkthrough) */}
        <CafeExperience />

        {/* Section 8: Special Offer (Physical 3D Fluid Coffee Splash & Ritual Set) */}
        <SpecialOffer />

        {/* Section 9: Testimonials (Words From Guests) */}
        <Testimonials />

        {/* Section 10: Location & Hours (Visit the House) */}
        <LocationSection />
      </div>
    </>
  );
}

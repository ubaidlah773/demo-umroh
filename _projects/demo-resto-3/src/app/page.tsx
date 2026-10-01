import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SignatureDish from "@/components/SignatureDish";
import Menu from "@/components/Menu";
import Experience from "@/components/Experience";
import Reviews from "@/components/Reviews";
import Gallery from "@/components/Gallery";
import Reservation from "@/components/Reservation";
import Location from "@/components/Location";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream-100 text-jawa-950">
      {/* 1. Hero: Opening BALE RASA, Visual Joglo & Makanan, Andum Roso Nambah Bolo */}
      <Hero />

      {/* 2. Storytelling: Bukan Sekadar Makan. Ini Tentang Rasa dan Kebersamaan */}
      <About />

      {/* 3. Signature Food: Rasa yang Jadi Cerita (Becek Buwohan terbesar) */}
      <SignatureDish />

      {/* 4. Menu: Sajian Tradisional Jawa Data-Driven */}
      <Menu />

      {/* 5. Experience: Suasana Joglo (Nikmati Rasa Jawa dalam Suasana yang Berbeda) */}
      <Experience />

      {/* 6. Customer Reviews: Cerita dari Mereka yang Pernah Mampir (4.7★ / 422 Ulasan) */}
      <Reviews />

      {/* 7. Gallery: Masonry Cinematic Gallery & Lightbox */}
      <Gallery />

      {/* 8. Reservation: Mau Makan Hari Ini? */}
      <Reservation />

      {/* 9. Location: Temukan Bale Rasa (Merakurak, Tuban) */}
      <Location />
    </main>
  );
}

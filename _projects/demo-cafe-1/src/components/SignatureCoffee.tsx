"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { signatureDrinks } from "@/config/coffeeData";
import { useCart } from "@/context/CartContext";
import { Plus, Check, Sparkles, Flame } from "lucide-react";

interface ProductCardProps {
  drink: (typeof signatureDrinks)[0];
  idx: number;
  onAdd: (drink: (typeof signatureDrinks)[0]) => void;
  isAdded: boolean;
}

function SignatureCard({ drink, idx, onAdd, isAdded }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt calculation
    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.025 : 1}, ${isHovered ? 1.025 : 1}, 1)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      className="group relative rounded-3xl bg-gradient-to-b from-espresso-850/80 to-espresso-900/90 border border-gold-500/15 p-6 sm:p-8 flex flex-col justify-between overflow-hidden backdrop-blur-xl hover:border-gold-500/40 hover:shadow-coffee-depth"
    >
      {/* Dynamic Specular Glare following mouse */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 240px at ${glarePos.x}% ${glarePos.y}%, rgba(201, 166, 107, 0.14), transparent 80%)`,
          }}
        />
      )}

      {/* Floating particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <motion.div
            animate={{ y: [-10, -40], opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            className="absolute top-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-gold-400 blur-[0.5px]"
          />
          <motion.div
            animate={{ y: [-15, -45], opacity: [0, 0.9, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
            className="absolute top-1/2 right-1/4 w-1 h-1 rounded-full bg-caramel-400"
          />
        </div>
      )}

      {/* Card Header: Number & Origin */}
      <div className="relative z-10">
        <div className="flex items-center justify-between text-xs tracking-[0.25em] text-gold-500 font-mono mb-4">
          <span className="font-bold text-sm">{drink.number}</span>
          <span className="uppercase text-[11px] text-cream-200/60 font-sans">
            {drink.origin}
          </span>
        </div>

        {/* 3D Product Visual with Parallax Float */}
        <div className="relative w-full aspect-square my-4 rounded-2xl overflow-hidden bg-espresso-950/70 border border-white/5 flex items-center justify-center">
          {/* Dynamic contact shadow */}
          <div
            className={`absolute bottom-4 w-3/4 h-8 rounded-full bg-black/70 blur-md transition-all duration-400 ${
              isHovered ? "scale-90 opacity-40 blur-lg" : "scale-100 opacity-70"
            }`}
          />

          {/* Product Image */}
          <motion.div
            animate={{
              y: isHovered ? -10 : 0,
              scale: isHovered ? 1.08 : 1,
              rotateZ: isHovered ? (idx % 2 === 0 ? 3 : -3) : 0,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={drink.image}
              alt={drink.name}
              fill
              className="object-cover transition-transform duration-700"
            />
          </motion.div>

          {/* Roast Badge */}
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-espresso-950/85 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider text-cream-200 flex items-center gap-1.5">
            <Flame size={11} className="text-caramel-500" />
            <span>{drink.roast}</span>
          </div>
        </div>

        {/* Drink Details */}
        <div className="mt-4 space-y-2">
          <h3 className="font-serif text-xl sm:text-2xl text-cream-100 font-normal tracking-wide group-hover:text-gold-400 transition-colors">
            {drink.name}
          </h3>
          <p className="text-xs sm:text-sm text-cream-200/70 font-light leading-relaxed min-h-[40px]">
            {drink.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {drink.notes.map((note) => (
              <span
                key={note}
                className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-gold-500/10 text-gold-400 border border-gold-500/20"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Price & Add to Order */}
      <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-cream-100/50 block">Price</span>
          <span className="font-serif text-xl font-medium text-gold-400">
            {drink.priceFormatted}
          </span>
        </div>

        <button
          onClick={() => onAdd(drink)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-caramel-500 text-espresso-950 shadow-gold-sm hover:brightness-110 active:scale-95 transition-all"
        >
          {isAdded ? (
            <>
              <Check size={14} />
              <span>ADDED</span>
            </>
          ) : (
            <>
              <Plus size={14} />
              <span>ADD TO ORDER</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default function SignatureCoffee() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (drink: (typeof signatureDrinks)[0]) => {
    addToCart({
      id: drink.id,
      name: drink.name,
      price: drink.price,
      image: drink.image,
    });
    setAddedId(drink.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="signature" className="py-24 md:py-36 bg-espresso-950 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-caramel-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-gold-500">
            <Sparkles size={13} />
            <span>EXCLUSIVE CURATION</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream-100 font-normal tracking-tight">
            THE ART OF COFFEE
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
          <p className="text-cream-200/70 text-sm md:text-base font-light pt-2">
            Each recipe is an artisanal balance of roast profiling, water chemistry, and culinary expression.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {signatureDrinks.map((drink, idx) => (
            <SignatureCard
              key={drink.id}
              drink={drink}
              idx={idx}
              onAdd={handleAdd}
              isAdded={addedId === drink.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { fullMenu } from "@/config/coffeeData";
import { MenuItem } from "@/types/coffee";
import { useCart } from "@/context/CartContext";
import { Plus, Check, Sparkles } from "lucide-react";

const categories: Array<MenuItem["category"]> = [
  "ESPRESSO",
  "MILK",
  "COLD",
  "NON-COFFEE",
  "PASTRY",
];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuItem["category"]>("ESPRESSO");
  const { addToCart } = useCart();
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredItems = fullMenu.filter((item) => item.category === activeCategory);

  const handleAdd = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1400);
  };

  return (
    <section id="menu" className="py-24 md:py-36 bg-espresso-950 relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-caramel-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-gold-500">
            <Sparkles size={13} />
            <span>SPECIALTY MENU</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream-100 font-normal tracking-tight">
            CURATED SELECTION
          </h2>
          <p className="text-cream-200/70 text-sm sm:text-base font-light pt-1">
            Artisanal single-origins, silky microfoam creations, slow-extracted cold brew, and freshly baked viennoiserie.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 sm:px-7 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-gold-500 to-caramel-500 text-espresso-950 shadow-gold-sm"
                  : "bg-espresso-900/80 text-cream-200/70 border border-white/10 hover:border-gold-500/30 hover:text-cream-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group relative rounded-2xl bg-gradient-to-b from-espresso-850/70 to-espresso-900/80 border border-gold-500/15 p-5 sm:p-6 flex flex-col justify-between hover:border-gold-500/40 hover:shadow-coffee-depth transition-all duration-300"
              >
                <div>
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-espresso-950 mb-4 border border-white/5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {item.tags && item.tags.length > 0 && (
                      <div className="absolute top-2.5 left-2.5 flex gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-espresso-950/85 backdrop-blur-md text-[9px] uppercase tracking-wider text-gold-400 border border-gold-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Title & Notes */}
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg sm:text-xl text-cream-100 font-normal group-hover:text-gold-400 transition-colors">
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-cream-200/70 font-light leading-relaxed min-h-[36px]">
                      {item.description}
                    </p>

                    {item.notes && (
                      <p className="text-[11px] font-mono tracking-wider text-gold-500/80 pt-1">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Price & Add to Cart */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-serif text-lg font-medium text-gold-400">
                    {item.priceFormatted}
                  </span>

                  <button
                    onClick={() => handleAdd(item)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-espresso-800 border border-gold-500/30 text-gold-300 hover:bg-gold-500 hover:text-espresso-950 hover:border-gold-500 active:scale-95 transition-all shadow-sm"
                  >
                    {justAddedId === item.id ? (
                      <>
                        <Check size={13} />
                        <span>ADDED</span>
                      </>
                    ) : (
                      <>
                        <Plus size={13} />
                        <span>ADD</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

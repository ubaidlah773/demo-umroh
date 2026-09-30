"use client";

import React from "react";
import { motion } from "framer-motion";
import { Maximize2, Wind, Car, Users, MapPin } from "lucide-react";

export default function FeatureGrid() {
  const FEATURES = [
    {
      icon: Maximize2,
      title: "Spacious Dining Area",
      description: "Area restoran luas dan nyaman untuk menikmati hidangan.",
    },
    {
      icon: Wind,
      title: "Air-Conditioned Rooms",
      description: "Ruangan ber-AC untuk pengalaman makan yang lebih sejuk dan nyaman.",
    },
    {
      icon: Car,
      title: "Large Parking Area",
      description: "Parkir luas dan mudah diakses untuk kendaraan pribadi maupun bus rombongan.",
    },
    {
      icon: Users,
      title: "Family Friendly",
      description: "Cocok untuk makan bersama keluarga lintas generasi.",
    },
    {
      icon: MapPin,
      title: "Strategic Location",
      description: "Berada di Jl. Basuki Rachmad, Tuban, dekat dan satu area dengan Hotel Fave Tuban.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-forest-950/70 border-t border-b border-gold-500/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold"
          >
            COMFORT & CONVENIENCE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-ivory-100 tracking-tight mt-2 mb-4"
          >
            EVERYTHING YOU NEED FOR A COMFORTABLE MEAL
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-sand-300 font-light"
          >
            Fasilitas lengkap untuk kenyamanan santap bersama seluruh anggota keluarga dan rombongan Anda.
          </motion.p>
        </div>

        {/* 5 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-forest-900/60 p-6 rounded-lg border border-gold-500/15 hover:border-gold-500/35 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-md bg-forest-950 border border-gold-500/25 flex items-center justify-center text-gold-400 mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-medium text-ivory-100 mb-2 group-hover:text-gold-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-sand-300/80 leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

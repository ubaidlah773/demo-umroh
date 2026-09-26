"use client";

import React, { useState } from "react";
import { packages, siteConfig } from "@/config/siteConfig";
import { PackageItem } from "@/types";
import { PackageCard } from "./PackageCard";
import { PackageDetailModal } from "./PackageDetailModal";
import { Sparkles, Info } from "lucide-react";

export const Packages: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetail = (pkg: PackageItem) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="paket" className="py-20 lg:py-28 bg-ivory-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Pilihan Paket Umroh</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Pilih Perjalanan yang Sesuai Kebutuhan
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Bandingkan pilihan paket dan konsultasikan kebutuhan perjalanan Anda dengan admin.
          </p>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              item={pkg}
              onSelect={handleOpenDetail}
            />
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 max-w-2xl mx-auto p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-center gap-3 text-center text-xs sm:text-sm text-slate-600">
          <Info className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            <strong>Catatan:</strong> Informasi paket dapat disesuaikan dengan program travel.
          </span>
        </div>
      </div>

      {/* Package Detail Modal */}
      <PackageDetailModal
        packageItem={selectedPackage}
        isOpen={isModalOpen}
        onClose={handleCloseDetail}
      />
    </section>
  );
};

"use client";

import React from "react";
import { User, Phone, Mail, FileText, Sparkles } from "lucide-react";
import { OCCASION_OPTIONS } from "@/lib/validations/reservation";

interface CustomerInfoProps {
  customerName: string;
  phone: string;
  email: string;
  specialRequest: string;
  occasion: string;
  onChangeField: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export default function CustomerInfo({
  customerName,
  phone,
  email,
  specialRequest,
  occasion,
  onChangeField,
  errors,
}: CustomerInfoProps) {
  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* Name Input */}
      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-espresso-900 mb-2 font-medium">
          Full Name <span className="text-champagne-600">*</span>
        </label>
        <div className="relative">
          <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-warmgray-400 pointer-events-none" />
          <input
            type="text"
            required
            placeholder="e.g. Ahmad Hendra"
            value={customerName}
            onChange={(e) => onChangeField("customerName", e.target.value)}
            className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-ivory-50 border text-sm text-espresso-900 placeholder:text-warmgray-400 outline-none transition-colors ${
              errors.customerName
                ? "border-red-400 focus:border-red-500 ring-1 ring-red-400"
                : "border-espresso-900/15 focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500"
            }`}
          />
        </div>
        {errors.customerName && (
          <p className="text-xs text-red-600 mt-1.5 font-light">{errors.customerName}</p>
        )}
      </div>

      {/* Phone & Email Dual Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-espresso-900 mb-2 font-medium">
            Phone / WhatsApp <span className="text-champagne-600">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-warmgray-400 pointer-events-none" />
            <input
              type="tel"
              required
              placeholder="e.g. 0812-3456-7890"
              value={phone}
              onChange={(e) => onChangeField("phone", e.target.value)}
              className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-ivory-50 border text-sm text-espresso-900 placeholder:text-warmgray-400 outline-none transition-colors ${
                errors.phone
                  ? "border-red-400 focus:border-red-500 ring-1 ring-red-400"
                  : "border-espresso-900/15 focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-600 mt-1.5 font-light">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-espresso-900 mb-2 font-medium">
            Email Address <span className="text-champagne-600">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-warmgray-400 pointer-events-none" />
            <input
              type="email"
              required
              placeholder="e.g. ahmad@gmail.com"
              value={email}
              onChange={(e) => onChangeField("email", e.target.value)}
              className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-ivory-50 border text-sm text-espresso-900 placeholder:text-warmgray-400 outline-none transition-colors ${
                errors.email
                  ? "border-red-400 focus:border-red-500 ring-1 ring-red-400"
                  : "border-espresso-900/15 focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-600 mt-1.5 font-light">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Dining Occasion (Optional) */}
      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-espresso-900 mb-2 font-medium">
          Dining Occasion (Optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {OCCASION_OPTIONS.map((occ) => {
            const isSelected = occasion === occ;
            return (
              <button
                key={occ}
                type="button"
                onClick={() => onChangeField("occasion", occ)}
                className={`px-3.5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                  isSelected
                    ? "bg-espresso-900 text-ivory-100 font-semibold shadow-sm"
                    : "bg-ivory-50 text-espresso-800 hover:bg-ivory-200 border border-espresso-900/15"
                }`}
              >
                {occ}
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Requests / Dietary Notes */}
      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-espresso-900 mb-2 font-medium">
          Special Requests & Dietary Requirements (Optional)
        </label>
        <div className="relative">
          <textarea
            rows={3}
            placeholder="e.g. High chair needed, anniversary cake celebration, seafood allergy, etc."
            value={specialRequest}
            onChange={(e) => onChangeField("specialRequest", e.target.value)}
            className="w-full p-4 rounded-xl bg-ivory-50 border border-espresso-900/15 focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500 text-sm text-espresso-900 placeholder:text-warmgray-400 outline-none transition-colors resize-none font-light"
          />
        </div>
      </div>
    </div>
  );
}

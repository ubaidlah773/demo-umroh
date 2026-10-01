"use client";

import React from "react";
import Image from "next/image";
import { Property } from "@/types/property";
import { defaultAgent } from "@/data/agent";
import { useInquiry } from "@/context/InquiryContext";
import { MessageSquare, Calendar, Phone, ShieldCheck, Mail } from "lucide-react";

interface StickyAgentContactProps {
  property: Property;
}

export default function StickyAgentContact({ property }: StickyAgentContactProps) {
  const { openInquiry } = useInquiry();

  const whatsappMessage = encodeURIComponent(
    `Hello Ahmad, I'm interested in the "${property.title}" in ${property.location} listed for ${property.priceDisplay}. Could you share detailed inspection slots and legal documentation?`
  );
  const whatsappUrl = `https://wa.me/${defaultAgent.whatsapp}?text=${whatsappMessage}`;

  return (
    <aside className="sticky top-28 bg-white border border-lumea-border rounded-lg p-6 sm:p-7 shadow-lumea-card space-y-6">
      <div>
        <span className="text-[11px] uppercase tracking-widest text-lumea-accent font-semibold block mb-1">
          INTERESTED IN THIS PROPERTY?
        </span>
        <h3 className="font-editorial text-2xl text-lumea-primary font-normal leading-tight">
          Private Client Advisory
        </h3>
      </div>

      {/* Price Spotlight */}
      <div className="p-4 bg-lumea-bg border border-lumea-border rounded-md">
        <span className="text-[11px] uppercase tracking-wider text-lumea-secondary block mb-0.5">
          Acquisition Price
        </span>
        <div className="text-2xl font-bold tracking-tight text-lumea-primary">
          {property.priceDisplay}
          {property.pricePeriod && (
            <span className="text-xs font-normal text-lumea-secondary ml-1">
              {property.pricePeriod}
            </span>
          )}
        </div>
        <p className="text-[11px] text-lumea-secondary mt-1">
          {property.certificate} • Ready for Notarial Due Diligence
        </p>
      </div>

      {/* Agent Card */}
      <div className="flex items-center gap-3.5 pb-4 border-b border-lumea-border">
        <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-lumea-border">
          <Image
            src={defaultAgent.avatar}
            alt={defaultAgent.name}
            fill
            className="object-cover object-top"
            sizes="56px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-editorial text-lg text-lumea-primary font-medium truncate">
              {defaultAgent.name}
            </h4>
            <ShieldCheck className="w-4 h-4 text-lumea-accent shrink-0" />
          </div>
          <p className="text-xs text-lumea-secondary">{defaultAgent.role}</p>
          <p className="text-[11px] text-lumea-accent mt-0.5">8+ Yrs • 120+ Transactions</p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={() => openInquiry(property)}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-lumea-primary text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-lumea-accent transition-colors duration-200 min-h-[44px] shadow-sm"
        >
          <Calendar className="w-4 h-4" />
          <span>Schedule a Viewing</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366]/10 text-lumea-primary hover:bg-[#25D366]/20 border border-[#25D366]/30 text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors duration-200 min-h-[44px]"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
          <span>WhatsApp Agent</span>
        </a>
      </div>

      {/* Fast contact row */}
      <div className="pt-2 border-t border-lumea-border/60 flex items-center justify-between text-xs text-lumea-secondary">
        <a
          href={`tel:${defaultAgent.phone}`}
          className="inline-flex items-center gap-1 hover:text-lumea-primary transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-lumea-accent" />
          <span>{defaultAgent.phone}</span>
        </a>
        <a
          href={`mailto:${defaultAgent.email}?subject=Inquiry: ${encodeURIComponent(property.title)}`}
          className="inline-flex items-center gap-1 hover:text-lumea-primary transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-lumea-accent" />
          <span>Email</span>
        </a>
      </div>
    </aside>
  );
}

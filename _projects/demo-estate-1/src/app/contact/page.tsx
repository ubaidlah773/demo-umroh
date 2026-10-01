"use client";

import React, { useState } from "react";
import Link from "next/link";
import { defaultAgent } from "@/data/agent";
import { propertiesData } from "@/data/properties";
import { useInquiry } from "@/context/InquiryContext";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export default function ContactPage() {
  const { addToast } = useInquiry();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please provide your full name";
    if (!email.trim()) {
      errs.email = "Please provide your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!phone.trim()) {
      errs.phone = "Please provide a contact phone number";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      addToast({
        type: "success",
        title: "Inquiry Dispatched",
        message: "Thank you. Our property advisor will contact you shortly.",
      });
    }, 700);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Ahmad, I would like to schedule a private advisory consultation with LUMÉA Property.`
  );
  const whatsappUrl = `https://wa.me/${defaultAgent.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="pt-28 sm:pt-36 pb-24">
      {/* Breadcrumb & Header */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <nav className="flex items-center gap-2 text-xs text-lumea-secondary mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-lumea-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-lumea-secondary/60" />
          <span className="text-lumea-primary font-medium">Contact Advisory</span>
        </nav>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-[1px] w-6 bg-lumea-accent" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-lumea-accent">
              PRIVATE ADVISORY DESK
            </span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-lumea-primary font-normal leading-tight">
            Initiate a Private Consultation
          </h1>
          <p className="text-base sm:text-lg text-lumea-secondary mt-3 leading-relaxed">
            Whether seeking an off-market villa sanctuary or structuring a commercial portfolio in Indonesia, our senior advisors are ready to assist.
          </p>
        </div>
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-lumea-border rounded-xl p-6 sm:p-10 shadow-lumea-subtle">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-lumea-bg border border-lumea-accent flex items-center justify-center text-lumea-accent mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-3xl text-lumea-primary mb-2">
                  Inquiry Dispatched
                </h3>
                <p className="text-sm text-lumea-secondary max-w-md leading-relaxed mb-6">
                  Thank you, {name}. Our property advisor, <strong>{defaultAgent.name}</strong>, will review your requirements and connect with you via WhatsApp or phone shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setMessage("");
                  }}
                  className="px-6 py-3 bg-lumea-primary text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-lumea-accent transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 pb-4 border-b border-lumea-border">
                  <h3 className="font-editorial text-2xl text-lumea-primary font-medium">
                    Send Direct Inquiry
                  </h3>
                  <p className="text-xs text-lumea-secondary mt-1">
                    All inquiries are held in strict non-disclosure confidence.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="cnt-name" className="block text-xs uppercase tracking-wider font-semibold text-lumea-primary mb-1">
                      Full Name *
                    </label>
                    <input
                      id="cnt-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Richard Sterling"
                      className={`w-full px-4 py-3 text-sm bg-lumea-bg/60 border ${
                        errors.name ? "border-red-500" : "border-lumea-border"
                      } rounded-sm focus:border-lumea-accent transition-colors min-h-[48px]`}
                    />
                    {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cnt-email" className="block text-xs uppercase tracking-wider font-semibold text-lumea-primary mb-1">
                        Email Address *
                      </label>
                      <input
                        id="cnt-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="richard@domain.com"
                        className={`w-full px-4 py-3 text-sm bg-lumea-bg/60 border ${
                          errors.email ? "border-red-500" : "border-lumea-border"
                        } rounded-sm focus:border-lumea-accent transition-colors min-h-[48px]`}
                      />
                      {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="cnt-phone" className="block text-xs uppercase tracking-wider font-semibold text-lumea-primary mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="cnt-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+62 812 0000 0000"
                        className={`w-full px-4 py-3 text-sm bg-lumea-bg/60 border ${
                          errors.phone ? "border-red-500" : "border-lumea-border"
                        } rounded-sm focus:border-lumea-accent transition-colors min-h-[48px]`}
                      />
                      {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cnt-prop" className="block text-xs uppercase tracking-wider font-semibold text-lumea-primary mb-1">
                      Property of Interest (Optional)
                    </label>
                    <select
                      id="cnt-prop"
                      value={propertyId}
                      onChange={(e) => setPropertyId(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-lumea-bg/60 border border-lumea-border rounded-sm focus:border-lumea-accent text-lumea-primary min-h-[48px]"
                    >
                      <option value="">General Private Consultation</option>
                      {propertiesData.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} ({p.location}) - {p.priceDisplay}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cnt-message" className="block text-xs uppercase tracking-wider font-semibold text-lumea-primary mb-1">
                      Advisory Request or Inquiry Details
                    </label>
                    <textarea
                      id="cnt-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Outline target regions, timeline, capital allocation parameters, or specific property questions..."
                      className="w-full px-4 py-3 text-sm bg-lumea-bg/60 border border-lumea-border rounded-sm focus:border-lumea-accent text-lumea-primary"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-lumea-primary text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-lumea-accent transition-colors disabled:opacity-50 min-h-[48px] shadow-sm flex items-center justify-center"
                    >
                      {submitting ? "Transmitting..." : "Send Advisory Inquiry"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Direct Contact & Office Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Instant Action */}
            <div className="bg-white border border-lumea-border rounded-xl p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-lumea-accent font-semibold block mb-1">
                  IMMEDIATE CONNECTIVITY
                </span>
                <h3 className="font-editorial text-2xl text-lumea-primary font-normal">
                  WhatsApp & Direct Phone
                </h3>
                <p className="text-xs text-lumea-secondary mt-1">
                  For immediate viewing arrangements and urgent transactions.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:opacity-90 transition-opacity min-h-[44px] shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect on WhatsApp</span>
                </a>

                <a
                  href={`tel:${defaultAgent.phone}`}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-lumea-bg border border-lumea-border text-lumea-primary hover:border-lumea-accent text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-lumea-accent" />
                  <span>Call {defaultAgent.phone}</span>
                </a>
              </div>
            </div>

            {/* Office Coordinates */}
            <div className="bg-white border border-lumea-border rounded-xl p-6 sm:p-8 space-y-6">
              <h4 className="font-editorial text-xl text-lumea-primary font-normal">
                Regional Offices
              </h4>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-lumea-accent shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-lumea-primary">Bali Flagship Studio</h5>
                    <p className="text-xs text-lumea-secondary mt-0.5 leading-relaxed">
                      Jl. Pantai Batu Bolong No. 88, Canggu, Badung, Bali 80351
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-lumea-accent shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-lumea-primary">Jakarta Capital Suite</h5>
                    <p className="text-xs text-lumea-secondary mt-0.5 leading-relaxed">
                      One Pacific Place, Level 15, SCBD, Jakarta Selatan 12190
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-lumea-border/60">
                  <Clock className="w-4 h-4 text-lumea-accent shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-lumea-primary">Consultation Hours</h5>
                    <p className="text-xs text-lumea-secondary mt-0.5">
                      Monday – Saturday: 08:30 – 19:00 WITA / WIB <br />
                      Sunday: Private client appointments by advance arrangement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

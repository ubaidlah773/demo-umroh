"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useInquiry } from "@/context/InquiryContext";
import { propertiesData } from "@/data/properties";
import { defaultAgent } from "@/data/agent";
import { X, Calendar, MessageSquare, Check, Phone, ShieldCheck } from "lucide-react";

export default function InquiryModal() {
  const { isOpen, closeInquiry, selectedProperty, addToast } = useInquiry();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedProperty) {
      setPropertyId(selectedProperty.id);
      setMessage(`Hello, I would like to schedule a private viewing for "${selectedProperty.title}" in ${selectedProperty.location}.`);
    } else {
      setPropertyId("");
      setMessage("Hello, I would like to schedule a private consultation regarding prime residential acquisition.");
    }
    setSubmitted(false);
    setErrors({});
  }, [selectedProperty, isOpen]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeInquiry();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeInquiry]);

  if (!isOpen) return null;

  const currentProperty = propertiesData.find((p) => p.id === propertyId);

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
    } else if (phone.length < 8) {
      errs.phone = "Phone number is too short";
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
        title: "Inquiry Received",
        message: "Thank you. Our property advisor will contact you shortly.",
      });
    }, 800);
  };

  const generateWhatsAppUrl = () => {
    const propTitle = currentProperty ? currentProperty.title : "your curated listings";
    const propLoc = currentProperty ? ` in ${currentProperty.location}` : "";
    const text = encodeURIComponent(
      `Hello ${defaultAgent.name}, I'm interested in ${propTitle}${propLoc}. My name is ${name || "a private client"}.`
    );
    return `https://wa.me/${defaultAgent.whatsapp}?text=${text}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-lumea-primary/60 backdrop-blur-sm transition-opacity"
        onClick={closeInquiry}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white border border-lumea-border rounded-lg max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-lumea-border bg-lumea-bg">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-lumea-accent font-semibold">
              Private Consultation
            </span>
            <h2 id="inquiry-title" className="font-editorial text-2xl text-lumea-primary mt-0.5">
              {currentProperty ? "Schedule a Viewing" : "Contact Property Advisor"}
            </h2>
          </div>
          <button
            onClick={closeInquiry}
            className="p-2 text-lumea-secondary hover:text-lumea-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close consultation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-lumea-bg border border-lumea-accent/40 flex items-center justify-center text-lumea-accent mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-editorial text-2xl text-lumea-primary mb-2">
                Inquiry Successfully Submitted
              </h3>
              <p className="text-sm text-lumea-secondary max-w-md leading-relaxed mb-6">
                Thank you, {name}. Our property advisor, <strong>{defaultAgent.name}</strong>, will review your inquiry and connect via WhatsApp or phone within a few hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:opacity-90 transition-opacity"
                >
                  <MessageSquare className="w-4 h-4" />
                  Direct WhatsApp
                </a>
                <button
                  onClick={closeInquiry}
                  className="flex-1 py-3 px-4 bg-lumea-surface text-lumea-primary text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-lumea-border transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Optional Selected Property Banner */}
              {currentProperty && (
                <div className="mb-6 p-3 bg-lumea-bg border border-lumea-border rounded flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded overflow-hidden shrink-0">
                    <Image
                      src={currentProperty.images[0]}
                      alt={currentProperty.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-wider text-lumea-accent font-semibold">
                      Selected Listing
                    </p>
                    <h4 className="font-editorial text-base text-lumea-primary truncate font-medium">
                      {currentProperty.title}
                    </h4>
                    <p className="text-xs text-lumea-secondary">
                      {currentProperty.location} • {currentProperty.priceDisplay}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="inq-name" className="block text-xs uppercase tracking-wider font-semibold text-lumea-primary mb-1">
                    Full Name *
                  </label>
                  <input
                    id="inq-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alexander Thorne"
                    className={`w-full px-3.5 py-2.5 text-sm bg-lumea-bg/50 border ${
                      errors.name ? "border-red-500" : "border-lumea-border"
                    } rounded-sm focus:border-lumea-accent transition-colors`}
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inq-email" className="block text-xs uppercase tracking-wider font-semibold text-lumea-primary mb-1">
                      Email Address *
                    </label>
                    <input
                      id="inq-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alexander@domain.com"
                      className={`w-full px-3.5 py-2.5 text-sm bg-lumea-bg/50 border ${
                        errors.email ? "border-red-500" : "border-lumea-border"
                      } rounded-sm focus:border-lumea-accent transition-colors`}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="inq-phone" className="block text-xs uppercase tracking-wider font-semibold text-lumea-primary mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="inq-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+62 812 0000 0000"
                      className={`w-full px-3.5 py-2.5 text-sm bg-lumea-bg/50 border ${
                        errors.phone ? "border-red-500" : "border-lumea-border"
                      } rounded-sm focus:border-lumea-accent transition-colors`}
                    />
                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inq-prop" className="block text-xs uppercase tracking-wider font-semibold text-lumea-primary mb-1">
                      Target Property
                    </label>
                    <select
                      id="inq-prop"
                      value={propertyId}
                      onChange={(e) => setPropertyId(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-lumea-bg/50 border border-lumea-border rounded-sm focus:border-lumea-accent transition-colors text-lumea-primary"
                    >
                      <option value="">General Property Consultation</option>
                      {propertiesData.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} ({p.city})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="inq-date" className="block text-xs uppercase tracking-wider font-semibold text-lumea-primary mb-1">
                      Preferred Viewing Date
                    </label>
                    <div className="relative">
                      <input
                        id="inq-date"
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-lumea-bg/50 border border-lumea-border rounded-sm focus:border-lumea-accent transition-colors text-lumea-primary"
                      />
                      <Calendar className="w-4 h-4 text-lumea-secondary absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="inq-message" className="block text-xs uppercase tracking-wider font-semibold text-lumea-primary mb-1">
                    Special Requests or Questions
                  </label>
                  <textarea
                    id="inq-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide any timeline, capital allocation, or architectural requirements..."
                    className="w-full px-3.5 py-2.5 text-sm bg-lumea-bg/50 border border-lumea-border rounded-sm focus:border-lumea-accent transition-colors"
                  />
                </div>

                <div className="pt-2 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-lumea-primary text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-lumea-accent transition-colors disabled:opacity-50 min-h-[44px] flex items-center justify-center"
                  >
                    {submitting ? "Transmitting Request..." : "Send Viewing Request"}
                  </button>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-lumea-border"></div>
                    <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-lumea-secondary font-medium">or instant message</span>
                    <div className="flex-grow border-t border-lumea-border"></div>
                  </div>

                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 border border-[#25D366]/40 text-lumea-primary hover:bg-[#25D366]/10 text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    Direct WhatsApp to {defaultAgent.name}
                  </a>
                </div>

                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-lumea-secondary">
                  <ShieldCheck className="w-3.5 h-3.5 text-lumea-accent" />
                  <span>Strict confidentiality assured. Direct communication with senior advisor.</span>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

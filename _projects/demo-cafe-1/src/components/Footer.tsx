"use client";

import { siteConfig } from "@/config/coffeeData";
import { ArrowUp, Sparkles, Mail, Send } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-espresso-950 border-t border-gold-500/15 text-cream-100 relative overflow-hidden pt-20 pb-12">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-light text-cream-100 tracking-[0.2em] block">
                AROMA
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold-500 font-semibold block">
                SPECIALTY COFFEE ROASTERS
              </span>
            </div>

            {/* Prompt exact text */}
            <p className="font-serif text-lg text-cream-200/80 font-light italic">
              “Crafted coffee. Meaningful moments.”
            </p>

            <p className="text-xs text-cream-200/60 font-light leading-relaxed max-w-sm">
              Dedicated to the art of single-origin sourcing, thermodynamic roast profiling, and welcoming atmospheres where coffee becomes ritual.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-gold-400 font-mono">
              <Sparkles size={13} />
              <span>TUBAN • SURABAYA • JAKARTA</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold-500 font-semibold">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-[0.2em] text-cream-200/70 font-light">
              <li>
                <a href="#hero" className="hover:text-gold-400 transition-colors">
                  HOME
                </a>
              </li>
              <li>
                <a href="#signature" className="hover:text-gold-400 transition-colors">
                  SIGNATURE DRINKS
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-gold-400 transition-colors">
                  BEAN TO CUP
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-gold-400 transition-colors">
                  OUR STORY
                </a>
              </li>
              <li>
                <a href="#origin" className="hover:text-gold-400 transition-colors">
                  COFFEE ORIGINS
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-gold-400 transition-colors">
                  SPECIALTY MENU
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-gold-400 transition-colors">
                  EXPERIENCE SHOWROOM
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-gold-400 transition-colors">
                  LOCATION & HOURS
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Socials & Direct Contact */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold-500 font-semibold">
              CONNECT & JOURNAL
            </h4>
            <p className="text-xs text-cream-200/60 font-light leading-relaxed">
              Receive notifications when our seasonal microlots from Ethiopia and Colombia arrive at the roastery.
            </p>

            {/* Newsletter Subscription Form */}
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-espresso-900 border border-gold-500/25 rounded-full px-5 py-3 text-xs text-cream-100 placeholder:text-cream-100/30 focus:border-gold-500 focus:outline-none pr-12 transition-all"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 p-2 rounded-full bg-gold-500 text-espresso-950 hover:brightness-110 active:scale-95 transition-all"
              >
                <Send size={14} />
              </button>
            </form>
            {subscribed && (
              <span className="text-[11px] text-gold-400 font-mono block">
                ✓ Welcome to the AROMA circle.
              </span>
            )}

            {/* Required Social Links: Instagram, TikTok, WhatsApp, Email */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono tracking-wider text-cream-200/70">
              <a
                href={`https://instagram.com/${siteConfig.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-400 transition-colors"
              >
                Instagram
              </a>
              <span className="text-white/20">•</span>
              <a
                href={`https://tiktok.com/${siteConfig.tiktok}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-400 transition-colors"
              >
                TikTok
              </a>
              <span className="text-white/20">•</span>
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-400 transition-colors"
              >
                WhatsApp
              </a>
              <span className="text-white/20">•</span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-gold-400 transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-cream-100/50">
          <p className="font-mono text-[11px]">
            © 2026 AROMA COFFEE. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors py-1 px-3 rounded-full hover:bg-white/5"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

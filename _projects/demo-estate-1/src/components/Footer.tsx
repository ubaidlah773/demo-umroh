import React from "react";
import Link from "next/link";
import { defaultAgent } from "@/data/agent";
import { Instagram, Linkedin, MessageSquare, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const navLinks = [
    { label: "Properties", href: "/properties" },
    { label: "Locations", href: "/locations" },
    { label: "About", href: "/about" },
    { label: "Agents", href: "/about#advisor" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ];

  const cityLinks = [
    { label: "Bali Villas & Land", href: "/properties?city=Bali" },
    { label: "Jakarta Luxury Mansions", href: "/properties?city=Jakarta" },
    { label: "Surabaya Golf Estates", href: "/properties?city=Surabaya" },
    { label: "Malang Highland Sanctuaries", href: "/properties?city=Malang" },
    { label: "Yogyakarta Heritage Homes", href: "/properties?city=Yogyakarta" },
    { label: "Semarang Hilltop Penthouses", href: "/properties?city=Semarang" },
  ];

  return (
    <footer className="bg-lumea-primary text-white pt-16 sm:pt-24 pb-12 border-t border-lumea-primary">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="font-editorial text-3xl sm:text-4xl tracking-[0.22em] font-semibold text-white block select-none"
            >
              LUMÉA
            </Link>
            <p className="text-xs uppercase tracking-[0.2em] text-lumea-accent font-medium">
              Premium Property Advisory
            </p>
            <p className="text-sm text-white/70 max-w-sm leading-relaxed pt-2">
              Helping discerning private clients discover carefully selected homes, villas, apartments, land, and commercial properties across Indonesia.
            </p>

            <div className="pt-2">
              <span className="text-xs italic text-white/50">
                &ldquo;Property, curated for your next chapter.&rdquo;
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-lumea-accent">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-lumea-accent">
              Regional Enclaves
            </h4>
            <ul className="space-y-2.5 text-sm">
              {cityLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Advisory Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-lumea-accent">
              Private Advisory Desk
            </h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-lumea-accent shrink-0 mt-1" />
                <span className="text-xs leading-relaxed">
                  Jl. Pantai Batu Bolong No. 88, Canggu, Bali <br />
                  SCBD One Pacific Place, Level 15, Jakarta
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${defaultAgent.whatsapp}?text=Hello%20LUM%C3%89A%2C%20I%20would%20like%20to%20inquire.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/80 hover:text-white transition-colors"
                >
                  WhatsApp: +{defaultAgent.whatsapp}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-lumea-accent shrink-0" />
                <a
                  href={`mailto:${defaultAgent.email}`}
                  className="text-xs text-white/80 hover:text-white transition-colors"
                >
                  {defaultAgent.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-lumea-accent shrink-0" />
                <a
                  href={`tel:${defaultAgent.phone}`}
                  className="text-xs text-white/80 hover:text-white transition-colors"
                >
                  {defaultAgent.phone}
                </a>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/10"
                aria-label="Follow LUMÉA on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/10"
                aria-label="Connect with LUMÉA on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© 2026 LUMÉA Property. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy & Discretion
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Legal Disclaimer
            </Link>
            <span>Architectural Real Estate Consultancy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

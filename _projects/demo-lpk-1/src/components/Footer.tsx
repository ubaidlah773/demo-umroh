import React from "react";
import { siteConfig, getWhatsAppUrl } from "@/config/siteConfig";
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Share2,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-navy-900">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-navy-900 border border-navy-800 text-white flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-crimson-500" />
              </div>
              <div>
                <span className="font-extrabold text-base sm:text-lg text-white tracking-tight block uppercase">
                  {siteConfig.institution.fullName}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase block">
                  {siteConfig.institution.subTitle}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Lembaga Pelatihan Kerja yang berfokus membekali peserta dengan keterampilan kerja, kemahiran bahasa asing, dan persiapan karier terarah.
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram LPK"
                className="w-8 h-8 rounded bg-navy-900 border border-navy-800 hover:border-slate-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook LPK"
                className="w-8 h-8 rounded bg-navy-900 border border-navy-800 hover:border-slate-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok LPK"
                className="w-8 h-8 rounded bg-navy-900 border border-navy-800 hover:border-slate-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigasi Menu (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {siteConfig.navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Kontak & Alamat (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase">
              Informasi Kontak Resmi
            </h4>
            
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-crimson-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  {siteConfig.contact.address}
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-emerald-400 transition-colors inline-flex items-center gap-1 font-mono"
                >
                  <span>{siteConfig.contact.whatsappDisplay}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-400 font-mono">
                  {siteConfig.contact.email}
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-400">
                  {siteConfig.contact.officeHours}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.institution.fullName}. Seluruh hak cipta dilindungi.
          </p>

          <p className="text-center md:text-right text-slate-400 bg-navy-900 py-1 px-2.5 rounded border border-navy-800">
            {siteConfig.institution.demoDisclaimer}
          </p>
        </div>

      </div>
    </footer>
  );
}
